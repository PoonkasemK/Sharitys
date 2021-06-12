import React, { Component } from "react";
import axios from "axios";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import Spinner from "react-bootstrap/Spinner";
import Footer from "../../Footer/components/Footer";
import NavBarChoose from "../../NavBar/components/NavBarChoose";
import { Container } from "react-bootstrap";

class History extends Component {
  constructor(props) {
    super(props);

    this.charges = [];
    this.state = {
      loading: true,
      uid: undefined,
      role: undefined,
    };

    this.listHistory = this.listHistory.bind(this);
  }

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      user.getIdTokenResult().then((idTokenResult) => {
        this.setState({ role: idTokenResult.claims.role, uid: user.uid });
        // console.log(user.uid)
        this.listHistory();
      });
    });
  }

  async listHistory() {
    const { uid } = this.state;
    // console.log('uid: '+uid)

    const res = await axios.get(
      process.env.REACT_APP_SERVER_URL + "/omise/listAllChargesByUid?uid=" + uid
    );
    if (res.data) {
      // console.log(res.data)

      this.charges = res.data;
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading } = this.state;
    if (sessionStorage.getItem("role") !== "dn") {
      return (
        <div>
          <NavBarChoose />
          <h1 className="text-center mt-5">ประวัติการบริจาค</h1>
          <br />
          <br />
          <h2 className="Omise__title">คุณไม่สามารถดูประวัติการบริจาคได้</h2>
          <Footer />
        </div>
      );
    }
    return (
      <div>
        <NavBarChoose />
        <Container>
          <h1 className="text-center mt-5">ประวัติการบริจาค</h1>
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
                    <th>ไปยัง</th>
                    <th>จำนวนเงิน</th>
                    <th>สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  {this.charges.map((charge) => (
                    <tr key={charge.id}>
                      <td>{new Date(charge.paid_at).toLocaleString()}</td>
                      <td>{charge.metadata.pjid}</td>
                      <td>{charge.amount / 100}</td>
                      <td>{charge.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p>กำลังแสดง 20 รายการล่าสุด</p>
            </div>
          )}
        </Container>
        <Footer />
      </div>
    );
  }
}
export default History;
