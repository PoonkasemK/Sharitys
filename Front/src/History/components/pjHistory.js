import React, { Component } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Footer from "../../Footer/components/Footer";
import NavBarChoose from "../../NavBar/components/NavBarChoose";
import { Container } from "react-bootstrap";
import Menu from "../../ProjectInfo/components/Menu";

class PjHistory extends Component {
  constructor(props) {
    super(props);

    this.charges = [];
    this.state = {
      loading: true,
    };

    this.listHistory = this.listHistory.bind(this);
  }

  componentDidMount() {
    this.listHistory();
  }

  async listHistory() {
    // const {pjid} = this.props
    // console.log(this.props.project.pjid);
    const pjid = this.props.project.pjid;
    console.log(pjid);
    const res = await axios.get(
      process.env.REACT_APP_SERVER_URL +
        "/omise/listSuccessfulChargesByPjid?pjid=" +
        pjid
    );
    if (res.data) {
      console.log(res.data);
      this.charges = res.data;
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        <NavBarChoose />
        <h1 className="login__Title">ประวัติการบริจาค</h1>
        <br />
        <br />

        <Container>
          <Menu project={this.props.project} page={"history"} />
          <br />
          <br />
          {loading === true && (
            <Spinner
              animation="border"
              role="loading status"
              variant="warning"
              style={{ position: "fixed", top: "50%", left: "50%" }}
            />
          )}
          {loading === false && (
            <div>
              <table class="table text-center">
                <thead class="thead-light text-center">
                  <tr>
                    <th>เมื่อวันที่</th>
                    <th>จาก</th>
                    <th>จำนวนเงิน</th>
                  </tr>
                </thead>
                <tbody>
                  {this.charges.map((charge) => (
                    <tr key={charge.id}>
                      <td>{new Date(charge.paid_at).toLocaleString()}</td>
                      <td>
                        {charge.metadata.name
                          ? charge.metadata.name.slice(0, 4) + "**********"
                          : "Anonymous"}
                      </td>
                      <td>{charge.amount / 100}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p>กำลังแสดง 100 รายการล่าสุด</p>
            </div>
          )}
        </Container>
        <Footer />
      </div>
    );
  }
}
export default PjHistory;
