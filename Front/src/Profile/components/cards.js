import React, { Component } from "react";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import NavBarChoose from "../../NavBar/components/NavBarChoose";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../../Footer/components/Footer";

class MyVerticallyCenteredModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.card.name,
      month: this.props.card.expiration_month,
      year: this.props.card.expiration_year,
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }
  handleMonthChange(e) {
    this.setState({ month: e.target.value });
  }
  handleYearChange(e) {
    this.setState({ year: e.target.value });
  }

  render() {
    let { name, month, year } = this.state;
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">แก้ไข</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {this.state.waiting && (
              <Spinner
                animation="border"
                role="loading status"
                variant="warning"
                style={{ position: "fixed", top: "50%", left: "50%" }}
              />
            )}
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon3">
                  **** **** ****{" "}
                </span>
              </div>
              <input
                type="text"
                value={this.props.card.last_digits}
                class="form-control"
                aria-describedby="basic-addon3"
                disabled
              />
            </div>

            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  ชื่อ
                </span>
              </div>
              <input
                type="text"
                class="form-control"
                defaultValue={name}
                onChange={this.handleNameChange}
                aria-label="name"
                aria-describedby="basic-addon1"
              />
            </div>

            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">วันหมดอายุ</span>
              </div>
              <input
                type="text"
                defaultValue={month}
                onChange={this.handleMonthChange}
                aria-label="month"
                class="form-control"
              />
              <input
                type="text"
                defaultValue={year}
                onChange={this.handleYearChange}
                class="form-control"
              />
            </div>
          </div>
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
            class="btn btn-warning"
            onClick={() => {
              this.props.editCard(
                this.props.custid,
                this.props.card.id,
                name,
                month,
                year
              );
            }}
          >
            แก้ไข
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

class DelModal extends Component {
  render() {
    return (
      <Modal
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
          <p>
            คุณกำลังจะลบบัตร{this.props.card.brand} ลงท้ายด้วยหมายเลข{" "}
            {this.props.card.last_digits}
          </p>
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
              this.props.deleteCard(this.props.custid, this.props.card.id);
            }}
          >
            ลบเลย
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

class SuccessModal extends Component {
  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.props.res.object !== "error" ? (
              <div>
                <p>
                  <i class="fas fa-check-circle"></i> เรียบร้อย
                </p>
              </div>
            ) : (
              <p>
                <i class="fas fa-times-circle"></i> ไม่สำเร็จ
              </p>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.res.object !== "error"
            ? "เรียบร้อย"
            : this.props.res.message}
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            class="btn btn-outline-dark"
            onClick={() => {
              this.props.onHide();
              window.location.reload();
            }}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

class Cards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: undefined,
      custid: undefined,
      cards: [],
      loading: true,
      modalShow: false,
      delModalShow: false,
      selectedCard: null,
      resShow: false,
      res: undefined,
      isAuthenticating: true,
    };
    // this.handleOnclick = this.handleOnclick.bind(this)
    this.listCards = this.listCards.bind(this);
    this.editCard = this.editCard.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
  }

  componentDidMount() {
    this.authUser().then(
      (user) => {
        this.setState({ isAuthenticating: false });
        this.listCards();
      },
      (error) => {
        this.setState({ isAuthenticating: false });
      }
    );
  }

  authUser() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user, error) => {
        if (user) {
          user.getIdTokenResult().then((idTokenResult) => {
            this.setState({
              uid: user.uid,
              custid: idTokenResult.claims.custid,
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

  async listCards() {
    // const {custid} = this.props
    const { custid } = this.state;
    // console.log(custid)
    const res = await axios.get(
      process.env.REACT_APP_SERVER_URL + "/omise/cards?custid=" + custid
    );
    // console.log(res.data.data)
    this.setState({
      cards: res.data.data,
      loading: false,
    });
  }

  async editCard(custid, cardid, name, month, year) {
    // const {custid} = this.props
    // console.log(custid, cardid, name, month, year)
    const res = await axios.put(
      process.env.REACT_APP_SERVER_URL +
        "/omise/card?cardid=" +
        cardid +
        "&custid=" +
        custid,
      {
        name: name,
        expiration_month: month,
        expiration_year: year,
      }
    );
    // console.log(res)
    console.log(res.data);
    this.setState({ modalShow: false, resShow: true, res: res.data });
  }

  async deleteCard(custid, cardid) {
    // const {custid} = this.props
    // console.log(custid, cardid)
    const res = await axios.delete(
      process.env.REACT_APP_SERVER_URL +
        "/omise/card?cardid=" +
        cardid +
        "&custid=" +
        custid
    );
    // console.log(res)
    console.log(res.data);
    this.setState({ delModalShow: false, resShow: true, res: res.data });
  }

  render() {
    const {
      loading,
      cards,
      modalShow,
      delModalShow,
      resShow,
      res,
      // uid,
      custid,
      selectedCard,
      isAuthenticating,
    } = this.state;
    // console.log(uid, custid)
    // console.log(cards)
    if (isAuthenticating) return null;
    if (sessionStorage.getItem("role") !== "dn") {
      return (
        <div>
          <NavBarChoose />
          <h1 className="Omise__title">บัตรที่เคยใช้</h1>
          <br />
          <br />
          <h2 className="Omise__title">คุณไม่มีบัตร</h2>
          <Footer />
        </div>
      );
    }
    return (
      <div>
        <NavBarChoose />
        <h1 className="Omise__title">บัตรที่เคยใช้</h1>
        <br />
        <Container>
          <Row>
            <Col md="3"></Col>
            <Col md="9">
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
                  {cards === undefined && (
                    <div style={{ textAlign: "center" }}>
                      <p>ยังไม่มีบัตร</p>
                    </div>
                  )}
                  <div class="col-sm-8">
                    {cards !== undefined &&
                      cards.map((card) => (
                        <div class="card m-3" key={card.id}>
                          <div class="card-body">
                            <div class="card-text row">
                              <div class="col-sm-8">
                                <p>
                                  {card.brand === "MasterCard" ? (
                                    <i class="fab fa-cc-mastercard"></i>
                                  ) : card.brand === "Visa" ? (
                                    <i class="fab fa-cc-visa"></i>
                                  ) : card.brand === "JCB" ? (
                                    <i class="fab fa-cc-jcb"></i>
                                  ) : null}
                                  **** **** **** {card.last_digits}
                                </p>
                                <p>
                                  {card.expiration_month}/{card.expiration_year}{" "}
                                  {card.name}
                                </p>
                              </div>

                              <div
                                class="col-sm-4 h-25"
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                }}
                              >
                                <button
                                  type="button"
                                  class="btn btn-danger btn-sm mr-1"
                                  onClick={() =>
                                    this.setState({
                                      delModalShow: true,
                                      selectedCard: card,
                                    })
                                  }
                                >
                                  ลบ
                                </button>
                                <button
                                  type="button"
                                  class="btn btn-warning btn-sm"
                                  onClick={() =>
                                    this.setState({
                                      modalShow: true,
                                      selectedCard: card,
                                    })
                                  }
                                >
                                  แก้ไข
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    {/* <div class="card m-3">
                            <button type="button" class="btn btn-outline-dark col-sm-12" onClick={() => {this.setState({addModalShow: true})}}>+ เพิ่มบัตรใหม่</button>
                        </div> */}
                  </div>

                  {modalShow && (
                    <MyVerticallyCenteredModal
                      custid={custid}
                      card={selectedCard}
                      editCard={this.editCard}
                      show={modalShow}
                      onHide={() => this.setState({ modalShow: false })}
                    />
                  )}

                  {delModalShow && (
                    <DelModal
                      custid={custid}
                      card={selectedCard}
                      deleteCard={this.deleteCard}
                      show={delModalShow}
                      onHide={() => this.setState({ delModalShow: false })}
                    />
                  )}

                  {resShow && (
                    <SuccessModal
                      res={res}
                      show={resShow}
                      onHide={() => this.setState({ resShow: false })}
                    />
                  )}
                </div>
              )}
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    );
  }
}
export default Cards;
