import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import Spinner from "react-bootstrap/Spinner";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import NavBarChoose from "../../NavBar/components/NavBarChoose";
import Footer from "../../Footer/components/Footer";
import { Container, Row, Col } from "react-bootstrap";

class DelModal extends Component {
  render() {
    return (
      <Modal.Dialog
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <div>
              <p>แน่ใจนะ?</p>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>ลบแอคเคาท์ของคุณหรือไม่ หากคุณเป็นผู้ระดมทุน กรุณาถอนเงินก่อนลบ</p>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            class="btn btn-outline-dark"
            onClick={this.props.onHide}
          >
            ยกเลิก
          </button>
          <button
            type="button"
            class="btn btn-danger"
            onClick={() => {
              this.props.deleteAccount(this.props.uid);
            }}
          >
            ลบเลย
          </button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  }
}

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        uid: undefined,
        name: undefined,
        email: undefined,
        photoURL: undefined,
        signedinwith: undefined,
      },
      loading: true,
      delShow: false,
    };
    this.deleteAccount = this.deleteAccount.bind(this);
  }

  componentDidMount() {
    this.authUser().then(
      (user) => {
        this.setState({ loading: false });
      },
      (error) => {
        this.setState({ loading: false });
      }
    );
  }

  authUser() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user, error) => {
        if (user) {
          user.getIdTokenResult().then((idTokenResult) => {
            this.setState({
              user: {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                signedinwith: user.providerData[0].providerId,
              },
            });
            // console.log(idTokenResult.claims.custid)
            resolve(user);
          });
        } else {
          reject(error);
        }
      });
    });
  }

  async deleteAccount(uid) {
    console.log("uid: " + uid);
    const res = await axios.delete(
      process.env.REACT_APP_SERVER_URL + "/auth/user?uid=" + uid
    );
    sessionStorage.clear();
    window.alert("ลบ Account สำเร็จ");
    window.location.href = "/";
  }

  render() {
    const { loading, user, delShow } = this.state;
    console.log(delShow);
    if (sessionStorage.getItem("role") === null) {
      return (
        <div>
          <NavBarChoose />
          <h1 className="Transfer__Title">บัญชีผู้ใช้</h1>
          <br />
          <br />
          <h2 className="Omise__title">คุณไม่มีบัญชีผู้ใช้</h2>
          <Footer />
        </div>
      );
    }
    return (
      <div>
        <NavBarChoose />
        <br />
        <Container>
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
              <div>
                <table class="table table-borderless ">
                  <tbody>
                    <tr>
                      <td colSpan={2}>
                        <img
                          src={user.photoURL}
                          alt=""
                          class="img-thumbnail rounded mx-auto d-block"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <Row>
                  <Col md={{ offset: 3 }}>Name</Col>
                  <Col>{user.name}</Col>
                </Row>
                <br />
                <Row>
                  <Col md={{ offset: 3 }}>Email</Col>
                  <Col>{user.email}</Col>
                </Row>
                <br />
                <Row>
                  <Col md={{ offset: 3 }}>Signed in with</Col>
                  <Col>{user.signedinwith}</Col>
                </Row>
                <br />
                <br />
                <Row>
                  <Col md={{ offset: 5 }}>
                    <button
                      type="button"
                      class="btn btn-danger mr-2"
                      onClick={() => this.setState({ delShow: true })}
                    >
                      ลบแอคเคาท์
                    </button>
                    &nbsp;
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col md={{ offset: 5 }}>
                    <button
                      type="button"
                      class="btn btn-light"
                      onClick={() => {
                        firebase.auth().signOut();
                        window.location.href = "/";
                      }}
                    >
                      ออกจากระบบ
                    </button>
                  </Col>
                </Row>
              </div>
              {delShow && (
                <DelModal
                  uid={user.uid}
                  deleteAccount={this.deleteAccount}
                  delShow={delShow}
                  onHide={() => this.setState({ delShow: false })}
                />
              )}
            </div>
          )}
        </Container>
        <Footer />
      </div>
    );
  }
}
export default Profile;
