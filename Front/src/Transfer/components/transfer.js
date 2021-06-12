import React, { Component } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import BorderWrapper from "react-border-wrapper";

class Transfer extends Component {
  constructor(props) {
    super(props);

    this.totalNet = 0;
    this.totalFee = 0;
    this.totalAmount = 0;
    this.transferFee = 30;
    this.state = {
      loading: true,
      charges: [],
    };

    this.handleOnclick = this.handleOnclick.bind(this);
    this.listTransferable = this.listTransferable.bind(this);
    this.transfer = this.transfer.bind(this);
    this.updateTransferStatus = this.updateTransferStatus.bind(this);
  }

  componentDidMount() {
    this.listTransferable();
  }

  async listTransferable() {
    try {
      const { pjid } = this.props;
      // console.log(pjid);
      const res = await axios.get(
        process.env.REACT_APP_SERVER_URL +
          "/omise/listTransferableByPjid?pjid=" +
          pjid
      );
      // console.log(res.data)
      this.setState({
        loading: false,
        charges: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async transfer() {
    const { recpid, uid, pjid } = this.props;
    let { charges } = this.state;

    const transfer = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/omise/transfer",
      {
        amount: this.totalNet.toFixed(2) * 100,
        type: "individual",
        recpid: recpid,
        metadata: {
          pjid: pjid,
          uid: uid,
          charges: charges.map((charge) => charge.id),
        },
      }
    );
    console.log(transfer.data);
    const chargesRes = transfer.data.metadata.charges;

    const res = await Promise.all(
      chargesRes.map(async (chargeid) => {
        console.log("send req update, chargeid: " + chargeid);
        await this.updateTransferStatus(pjid, uid, chargeid)
          .then((update) => console.log(update))
          .catch((error) => console.log(error));
      })
    );
    alert("การโอนเสร็จสิ้น");
    window.location.href = "/transfer/" + pjid;
  }

  async updateTransferStatus(pjid, uid, chargeid) {
    await axios.put(
      axios
        .put(
          process.env.REACT_APP_SERVER_URL +
            "/omise/updateTransferedStatus?pjid=" +
            pjid +
            "&uid=" +
            uid +
            "&chargeid=" +
            chargeid
        )
        .then(
          (success) => {
            return success;
          }
          // resolve(success)
        )
        .catch((error) =>
          // reject(error)
          {
            return error;
          }
        )
    );
  }

  // const handleOnclick = (e) => {
  async handleOnclick(e) {
    e.preventDefault();

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h2>ยืนยัน</h2>
            <p>
              ถอนเงินจำนวน {(this.totalNet - 30).toFixed(2)}
              ไปยังบัญชีของแคมเปญ?
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button className="btn btn-outline-dark mr-2" onClick={onClose}>
                ยกเลิก
              </button>
              <button
                className="btn btn-warning"
                onClick={() => {
                  this.transfer();
                  onClose();
                }}
              >
                ถอน
              </button>
            </div>
          </div>
        );
      },
      closeOnEscape: true,
      closeOnClickOutside: true,
    });
  }

  render() {
    const { loading, charges } = this.state;

    return (
      // <BorderWrapper borderColour="#474747" topOffset="0px" bottomOffset="0px" leftOffset="0px" rightOffset="0px" borderWidth={2}>
      <div>
        {loading === true && (
          <div>
            <Spinner
              animation="border"
              role="loading status"
              variant="warning"
              style={{ position: "fixed", top: "50%", left: "50%" }}
            />
          </div>
        )}

        {loading === false && (
          <div>
            <table className="table text-center">
              <thead className="thead-light text-center">
                <tr>
                  {/* <th >#</th> */}
                  {/* <th >pjid</th> */}
                  <th>เมื่อวันที่</th>
                  <th>จาก</th>
                  <th>จำนวนเงิน</th>
                  <th>ค่าธรรมเนียม</th>
                  <th>จำนวนเงินหลังหักค่าธรรมเนียม</th>
                  {/* <th>transactionid</th> */}
                  {/* <th>transfered</th> */}
                </tr>
              </thead>
              <tbody>
                {charges.map((charge) => (
                  <tr
                    key={charge.id}
                    {...(this.totalNet += charge.net / 100)}
                    {...(this.totalFee += (charge.fee + charge.fee_vat) / 100)}
                    {...(this.totalAmount += charge.amount / 100)}
                  >
                    {/* <td>{charge.id}</td> */}
                    {/* <td>{charge.metadata.pjid}</td> */}
                    <td>{new Date(charge.paid_at).toLocaleString()}</td>
                    <td>
                      {charge.metadata.name
                        ? charge.metadata.name.slice(0, 4) + "**********"
                        : null}
                    </td>
                    <td>{charge.amount / 100}</td>
                    <td>{(charge.fee + charge.fee_vat) / 100}</td>
                    <td>{charge.net / 100}</td>
                    {/* <td>{charge.transaction}</td> */}
                    {/* <td>{charge.metadata.transfered.toString()}</td> */}
                  </tr>
                ))}
                <tr>
                  <td className="text-right" colSpan={4}>
                    จำนวนเงินทั้งหมด
                  </td>
                  <td>{this.totalAmount.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="text-right" colSpan={4}>
                    ค่าธรรมเนียมรวม
                  </td>
                  <td>{this.totalFee.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="text-right" colSpan={4}>
                    ค่าธรรมเนียมการถอน
                  </td>
                  <td>{this.transferFee}</td>
                </tr>
                <tr>
                  <td className="text-right font-weight-bold" colSpan={4}>
                    จำนวนเงินหลังหักค่าธรรมเนียมทั้งหมด
                  </td>
                  <td className="font-weight-bold">
                    {(this.totalNet - 30).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
            {(this.totalNet - 30).toFixed(2) <= 0 && (
              <div>
                <div className="row justify-content-center">
                  <div className="alert alert-warning m-3" role="alert">
                    ไม่สามารถถอนได้ เนื่องจากจำนวนเงินไม่เพียงพอ
                  </div>
                </div>
                <div className="row justify-content-center">
                  <button
                    type="button"
                    className="btn btn-warning mr-5"
                    onClick={this.handleOnclick}
                    disabled
                  >
                    ถอน
                  </button>
                </div>
              </div>
            )}
            {(this.totalNet - 30).toFixed(2) > 0 && (
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  className="btn btn-warning mr-5"
                  onClick={this.handleOnclick}
                >
                  ถอน
                </button>
              </div>
            )}
          </div>
        )}
        {/* </BorderWrapper> */}
      </div>
    );
  }
}

export default Transfer;
