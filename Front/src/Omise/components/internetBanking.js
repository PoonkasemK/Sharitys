import React, { Component } from "react";
import Script from "react-load-script";

import { publicKey } from "../../key";

let OmiseCard;

class CheckoutInternetBanking extends Component {
  constructor(props) {
    super(props);

    this.handleLoadScript = this.handleLoadScript.bind(this);
    this.internetBankingconfigure = this.internetBankingconfigure.bind(this);
    this.omiseSourceHandler = this.omiseSourceHandler.bind(this);
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

  internetBankingconfigure() {
    OmiseCard.configure({
      defaultPaymentMethod: "internet_banking",
      otherPaymentMethods: [
        // "bill_payment_tesco_lotus",
        "alipay",
        "rabbit_linepay",
        "truemoney",
        // "pay_easy",
        // "net_banking",
        // "convenience_store"
      ],
    });
    OmiseCard.configureButton("#btn-internet-banking");
    OmiseCard.attach();
  }

  omiseSourceHandler() {
    let {
      amount,
      createInternetBankingCharge,
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
      onCreateTokenSuccess: (source) => {
        /* Handler on token or source creation.  Use this to submit form or send ajax request to server */
        createInternetBankingCharge(amount, uid, name, custid, pjid, source);
      },
      onFormClosed: () => {
        /* Handler on form closure. */
      },
    });
  }

  handleOnClick(e) {
    e.preventDefault();
    this.internetBankingconfigure();
    this.omiseSourceHandler();
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
            type="button"
            class="btn btn-outline-dark btn-lg btn-block mb-3"
            id="btn-internet-banking"
            onClick={this.handleOnClick}
          >
            บริจาคด้วย Internet Banking / True Money wallet / Rabbit Line Pay
          </button>
        </form>
      </div>
    );
  }
}

export default CheckoutInternetBanking;
