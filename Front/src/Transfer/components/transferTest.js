import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import Transfer from "./transfer";
import NavBarChoose from "../../NavBar/components/NavBarChoose";
import Footer from "../../Footer/components/Footer";
import { Container } from "react-bootstrap";

class TransferTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recpid: this.props.project.recpid,
      uid: undefined,
      pjid: this.props.project.pjid,
    };
  }

  componentDidMount() {
    console.log(this.props.project.pjid);
    console.log(this.props.project.recpid);
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      user.getIdTokenResult().then((idTokenResult) => {
        this.setState({ role: idTokenResult.claims.role, uid: user.uid });
        // console.log(user.uid)
      });
    });
  }

  render() {
    const { recpid, pjid, uid } = this.state;
    if (sessionStorage.getItem("uid") !== this.props.project.fdfirebaseid) {
      return (
        <>
          <NavBarChoose />
          <h1 className="Transfer__Title">ถอนเงิน</h1>
          <br />
          <br />
          <Container>
            <h2 className="Omise__title">คุณไม่สามารถถอนเงินได้</h2>
          </Container>
          <br />
          <br />
          <Footer />
        </>
      );
    }
    return (
      <>
        <NavBarChoose />
        <h1 className="Transfer__Title">ถอนเงิน</h1>
        <br />
        <br />
        <Container>
          <Transfer recpid={recpid} uid={uid} pjid={pjid} />
        </Container>
        <br />
        <br />
        <Footer />
      </>
    );
  }
}
export default TransferTest;
