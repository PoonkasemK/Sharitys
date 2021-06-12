import React, { Component } from "react";
import Script from "react-load-script";

import { publicKey } from "../../key";

let OmiseCard;

class CheckoutCreditCard extends Component {
  constructor(props) {
    super(props);

    this.handleLoadScript = this.handleLoadScript.bind(this);
    this.creditCardConfigure = this.creditCardConfigure.bind(this);
    this.omiseTokenHandler = this.omiseTokenHandler.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleLoadScript() {
    OmiseCard = window.OmiseCard;
    OmiseCard.configure({
      publicKey: publicKey,
      currency: "thb",
      frameLabel: "Sharitys",
      submitLabel: "Donate ",
    });
  }

  creditCardConfigure() {
    OmiseCard.configure({
      defaultPaymentMethod: "credit_card",
      otherPaymentMethods: [],
    });
    OmiseCard.configureButton("#btn-credit-card");
    OmiseCard.attach();
  }

  omiseTokenHandler() {
    let {
      amount,
      createCreditCardCharge,
      email,
      uid,
      name,
      custid,
      pjid,
    } = this.props;
    // convert from บาท to สตางค์
    amount = amount * 100;
    // const {user} = this.state
    OmiseCard.open({
      amount: amount,
      // submitFormTarget: '#checkout-form',
      onCreateTokenSuccess: (token) => {
        /* Handler on token or source creation.  Use this to submit form or send ajax request to server */
        createCreditCardCharge(amount, email, uid, name, custid, pjid, token);
      },
      onFormClosed: () => {
        /* Handler on form closure. */
      },
    });
  }

  handleOnClick(e) {
    e.preventDefault();
    this.creditCardConfigure();
    this.omiseTokenHandler();
  }

  render() {
    return (
      <div className="container">
        <Script
          url="https://cdn.omise.co/omise.js"
          onLoad={this.handleLoadScript}
        />
        <form>
          <button
            id="btn-credit-card"
            class="btn btn-outline-dark btn-lg btn-block mb-3"
            type="button"
            onClick={this.handleOnClick}
          >
            บริจาคด้วย Credit / Debit card
          </button>
        </form>
      </div>
    );
  }
}

export default CheckoutCreditCard;
