import React, { Component } from "react";
import axios from "axios";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
// import firebase from "firebase";
import Spinner from "react-bootstrap/Spinner";
// import Divider from '@material-ui/core/Divider';
import Modal from "react-bootstrap/Modal";

import CheckoutCreditCard from "./creditcard";
import CheckoutInternetBanking from "./internetBanking";

class SuccessModal extends Component {
  render() {
    // console.log(this.props.res)
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
              <p>
                <i class="fas fa-check-circle"></i> บริจาคสำเร็จ
              </p>
            ) : (
              <p>
                <i class="fas fa-times-circle"></i> บริจาคล้มเหลว
              </p>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.res.object !== "error"
            ? this.props.res.charge.status
            : this.props.res.message}
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            class="btn btn-outline-dark"
            onClick={() => (window.location.href = "/PaymentSuccess")}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export class CheckoutWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: undefined,
      role: undefined,
      uid: undefined,
      name: undefined,
      custid: null,
      isAuthenticating: true,

      res: undefined,
      loading: true,
      amount: 20,
      pjid: "1",
      cards: [],
      show: false,
      remember: false,
    };

    this.createCreditCardCharge = this.createCreditCardCharge.bind(this);
    this.createInternetBankingCharge = this.createInternetBankingCharge.bind(
      this
    );
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleRememberChange = this.handleRememberChange.bind(this);
    this.creditCardWidget = this.createCreditCardCharge.bind(this);
    this.listCards = this.listCards.bind(this);
    this.signInasAnonymous = this.signInasAnonymous.bind(this);
    this.chargeWithCardid = this.chargeWithCardid.bind(this);
    this.authUser = this.authUser.bind(this);
  }

  componentDidMount() {
    this.authUser().then(
      (user) => {
        this.setState({ isAuthenticating: false });
        this.listCards();
      },
      (error) => {
        this.signInasAnonymous();
      }
    );
  }

  authUser() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user, error) => {
        if (user) {
          user.getIdTokenResult(true).then((idTokenResult) => {
            this.setState({
              role: idTokenResult.claims.role,
              email: user.email,
              uid: user.uid,
              name: user.displayName,
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

  signInasAnonymous() {
    // console.log(firebase.auth().currentUser == null)
    firebase
      .auth()
      .signInAnonymously()
      .then((token) => {
        // Signed in..
        console.log("signed in anonymously " + token.user.isAnonymous);
        firebase.auth().onAuthStateChanged((user) => {
          this.setState({
            uid: user.uid,
            isAuthenticating: false,
            loading: false,
          });
        });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode, errorMessage);
      });
  }

  async listCards() {
    const { custid } = this.state;
    console.log("custid: " + custid);
    if (custid) {
      const res = await axios.get(
        process.env.REACT_APP_SERVER_URL + "/omise/cards?custid=" + custid
      );
      console.log(res.data.data);
      this.setState({
        cards: res.data.data,
        loading: false,
      });
      if (!res.data) {
        window.alert(res);
      }
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  async chargeWithCardid(cardid) {
    try {
      const { amount, custid, name, uid } = this.state;
      const { pjid } = this.props;
      const res = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/omise/chargeWithCard",
        {
          amount: amount,
          cardid: cardid,
          custid: custid,
          uid: uid,
          name: name,
          pjid: pjid,
        }
      );
      console.log(res.data);
      this.setState({ res: res.data, show: true });
    } catch (error) {
      console.log(error);
    }
  }

  async createCreditCardCharge(amount, email, uid, name, custid, pjid, token) {
    try {
      console.log(email, name, amount, custid, token);
      console.log("1: " + token);
      if (this.state.remember === true) {
        const res = await axios.put(
          process.env.REACT_APP_SERVER_URL +
            "/omise/attachCard?custid=" +
            custid,
          {
            token: token,
          }
        );
        // console.log(res.data.cards.data.slice(-1)[0].id)
        token = res.data.cards.data.slice(-1)[0].id;
        this.chargeWithCardid(token);
      } else {
        const res = await axios.post(
          process.env.REACT_APP_SERVER_URL + "/omise/charge",
          {
            email: email,
            amount: amount,
            token: token,
            uid: uid,
            name: name,
            pjid: pjid,
          }
        );

        if (res.data) {
          console.log(res.data);
          this.setState({ res: res.data, show: true });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async createInternetBankingCharge(amount, uid, name, custid, pjid, source) {
    try {
      // console.log(amount, source, uid, pjid)
      const res = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/omise/checkout-internetbanking",
        {
          amount: amount,
          source: source,
          uid: uid,
          name: name,
          custid: custid,
          pjid: pjid,
        }
      );

      // console.log(res.data)
      const { authorizeUri } = res.data;
      if (res.data) {
        window.location.href = authorizeUri;
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleAmountChange(e) {
    this.setState({ amount: e.target.value });
  }

  handleRememberChange(e) {
    this.setState({ remember: e.target.checked });
  }

  render() {
    const {
      email,
      role,
      uid,
      name,
      custid,
      loading,
      amount,
      cards,
      show,
      res,
      isAuthenticating,
    } = this.state;
    const { pjid } = this.props;
    console.log(amount, role, email, uid, name, custid, pjid);
    console.log(cards);
    // console.log()

    if (isAuthenticating)
      return (
        <Spinner
          animation="border"
          role="loading status"
          variant="warning"
          style={{ position: "fixed", top: "50%", left: "50%" }}
        />
      );

    return (
      <div>
        <div>
          {/* <input type="number" value={this.state.amount} min={20} max={150000} onChange={this.handleAmountChange}/> */}
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">฿</span>
            </div>
            <input
              class="form-control"
              aria-label="Amount"
              type="number"
              value={this.state.amount}
              min={20}
              max={150000}
              onChange={this.handleAmountChange}
            />
            <div class="input-group-append">
              <span class="input-group-text">.00</span>
            </div>
          </div>

          {amount < 20 && (
            <div class="alert alert-warning m-3" role="alert">
              Amount must be between 20 and 150,000
            </div>
          )}

          {amount > 150000 && (
            <div class="alert alert-warning m-3" role="alert">
              Amount must be between 20 and 150,000
            </div>
          )}

          <div className="internetbanking-checkout">
            <CheckoutInternetBanking
              amount={amount}
              uid={uid}
              name={name}
              custid={custid}
              pjid={pjid}
              createInternetBankingCharge={this.createInternetBankingCharge}
            />
          </div>

          <div className="creditcard-checkout">
            <CheckoutCreditCard
              amount={amount}
              email={email}
              uid={uid}
              name={name}
              pjid={pjid}
              custid={custid}
              createCreditCardCharge={this.createCreditCardCharge}
            />

            {custid && (
              <div
                class="form-group form-check"
                style={{ textAlign: "center" }}
              >
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                  checked={this.state.remember}
                  onChange={this.handleRememberChange}
                />
                <label class="form-check-label" for="exampleCheck1">
                  จำข้อมูลบัตรเครดิต / เดบิตไว้ใช้ภายหลัง
                </label>
              </div>
            )}
          </div>

          {loading === true && (
            <Spinner
              animation="border"
              role="loading status"
              variant="warning"
              style={{ position: "fixed", top: "50%", left: "50%" }}
            />
          )}

          {loading === false && cards.length > 0 && (
            <div class="container">
              <div style={{ textAlign: "center" }}>
                <p>หรือ</p>
              </div>
              {/* <Divider/> */}
              <div class="list-group mlr-5">
                {cards.map((card) => (
                  <button
                    type="button"
                    class="list-group-item list-group-item-action"
                    onClick={() => this.chargeWithCardid(card.id)}
                  >
                    {card.brand === "MasterCard" ? (
                      <i class="fab fa-cc-mastercard"></i>
                    ) : card.brand === "Visa" ? (
                      <i class="fab fa-cc-visa"></i>
                    ) : card.brand === "JCB" ? (
                      <i class="fab fa-cc-jcb"></i>
                    ) : null}
                    **** **** **** {card.last_digits}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        {show && (
          <SuccessModal
            res={res}
            show={show}
            onHide={() => this.setState({ show: false })}
          />
        )}
      </div>
    );
  }
}

export default CheckoutWidget;
