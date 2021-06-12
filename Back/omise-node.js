const express = require("express");
const router = express.Router();
require("dotenv").config();

const omise = require("omise")({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
  omiseVersion: "2019-05-29",
});

router.post("/chargeWithCard", async (req, res) => {
  try {
    // console.log('body: ',req.body)
    let { amount, cardid, custid, uid, name, pjid } = req.body;
    // console.log(amount, cardid, custid, uid, name, pjid)

    const charge = await omise.charges.create({
      amount: amount * 100,
      currency: "thb",
      customer: custid,
      card: cardid,
      description:
        new Date(Date.now()).toLocaleString() +
        ": " +
        uid +
        " donate to " +
        pjid,
      // 'platform_fee': {'percentage': 0.03},
      return_uri: "https://sharitysfront.herokuapp.com/PaymentSuccess",
      // return_uri: "https://localhost:3000/PaymentSuccess",
      metadata: {
        uid: uid,
        name: name,
        pjid: pjid,
        transfered: false,
      },
    });
    console.log("\ncharge: ", charge);

    res.send({
      charge,
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.post("/charge", async (req, res) => {
  try {
    // console.log('body: ',req.body)
    let { amount, email, uid, name, custid, pjid, token } = req.body;
    console.log(amount, email, uid, name, custid, pjid, token);
    // not signed-in user, no custid
    const charge = await omise.charges.create({
      amount: amount,
      currency: "thb",
      card: token,
      description:
        new Date(Date.now()).toLocaleString() +
        ": " +
        uid +
        " donate to " +
        pjid,
      // 'platform_fee': {'percentage': 0.03},
      return_uri: "https://sharitysfront.herokuapp.com/Paymentsuccess",
      // return_uri: "https://localhost:3000/Paymentsuccess",
      metadata: {
        uid: uid,
        name: name,
        pjid: pjid,
        transfered: false,
      },
    });
    console.log("charge: ", charge);

    res.send({
      charge,
    });
    console.log(custid);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.put("/customer", async (req, res) => {
  try {
    const { custid, token } = req.body;
    const cust = await omise.customers.update(
      custid,
      { card: token },
      function (error, customer) {
        /* Response. */
      }
    );
    console.log(cust);
    res.send(cust);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.post("/checkout-internetbanking", async (req, res, next) => {
  try {
    const { amount, source, uid, name, custid, pjid } = req.body;

    const charge = await omise.charges.create({
      amount: amount,
      source: source,
      currency: "thb",
      description:
        new Date(Date.now()).toLocaleString() +
        ": " +
        uid +
        " donate to " +
        pjid,
      // 'platform_fee': {'percentage': 0.03},
      return_uri: "https://sharitysfront.herokuapp.com/PaymentSuccess",
      // return_uri: "https://localhost:3000/",
      metadata: {
        uid: uid,
        name: name,
        pjid: pjid,
        transfered: false,
      },
    });
    console.log("charge: ", charge);

    res.send({
      authorizeUri: charge.authorize_uri,
      chargeId: charge.id,
    });
  } catch (error) {
    res.send(error);
  }
});

router.post("/checkChargeStatus", async (req, res) => {
  try {
    const { chargeId } = req.body;
    // console.log('chargeId: '+chargeId)
    await omise.charges.retrieve(chargeId, function (error, charge) {
      /* Response. */
      console.log(charge);
      res.send({ charge });
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/listSuccessfulCharges", async (req, res) => {
  try {
    var resCharges = [];
    const charges = await omise.charges.list({
      order: "reverse_chronological",
      limit: 100,
    });
    await Promise.all(
      charges.data.map((charge) =>
        charge.status == "successful" ? resCharges.push(charge) : null
      )
    );
    res.send(resCharges);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/listPendingCharges", async (req, res) => {
  try {
    var resCharges = [];
    const charges = await omise.charges.list({
      order: "reverse_chronological",
      limit: 100,
    });
    await Promise.all(
      charges.data.map((charge) =>
        charge.status == "pending" ? resCharges.push(charge) : null
      )
    );
    res.send(resCharges);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/listFailedCharges", async (req, res) => {
  try {
    var resCharges = [];
    const charges = await omise.charges.list({
      order: "reverse_chronological",
      limit: 100,
    });
    await Promise.all(
      charges.data.map((charge) =>
        charge.status == "failed" ? resCharges.push(charge) : null
      )
    );
    res.send(resCharges);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/listAllChargesByPjid", async (req, res) => {
  try {
    const { pjid } = req.query;
    var pjIdCharge = [];
    // console.log('pjid: '+pjid)

    const charges = await omise.charges.list({
      limit: 100,
      order: "reverse_chronological",
    });
    await Promise.all(
      charges.data.map((charge) =>
        charge.status == "successful" && charge.metadata.pjid == pjid
          ? pjIdCharge.push(charge)
          : null
      )
    );
    res.send(pjIdCharge);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/listSuccessfulChargesByPjid", async (req, res) => {
  try {
    const { pjid } = req.query;
    var pjidCharge = [];

    const charges = await omise.charges.list({
      limit: 100,
      order: "reverse_chronological",
    });
    await Promise.all(
      charges.data.map((charge) =>
        charge.metadata.pjid == pjid && charge.status == "successful"
          ? pjidCharge.push(charge)
          : null
      )
    );
    res.send(pjidCharge);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/listAllChargesByUid", async (req, res) => {
  try {
    const { uid } = req.query;
    var uIdCharge = [];
    // console.log('pjid: '+pjid)

    const charges = await omise.charges.list({
      limit: 100,
      order: "reverse_chronological",
    });
    await Promise.all(
      charges.data.map((charge) =>
        charge.metadata.uid == uid ? uIdCharge.push(charge) : null
      )
    );
    console.log(uIdCharge);
    res.send(uIdCharge);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/listSuccessfulChargesByUid", async (req, res) => {
  try {
    const { uid } = req.query;
    var uidCharge = [];
    // console.log('pjid: '+pjid)

    const charges = await omise.charges.list({
      limit: 20,
      order: "reverse_chronological",
    });
    await Promise.all(
      charges.data.map((charge) =>
        charge.metadata.uid == uid && charge.status == "successful"
          ? uidCharge.push(charge)
          : null
      )
    );
    res.send(uidCharge);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/listTransferableByPjid", async (req, res) => {
  try {
    const { pjid } = req.query;
    var pjIdCharge = [];
    // console.log('pjid: '+pjid)

    const charges = await omise.charges.list({
      limit: 100,
      order: "reverse_chronological",
    });
    await Promise.all(
      charges.data.map((charge) =>
        charge.status == "successful" &&
        charge.metadata.pjid == pjid &&
        charge.metadata.transfered == false
          ? pjIdCharge.push(charge)
          : null
      )
    );
    res.send(pjIdCharge);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/listTransferedByPjid", async (req, res) => {
  try {
    const { pjid } = req.query;
    var pjIdCharge = [];
    // console.log('pjid: '+pjid)

    const charges = await omise.charges.list({
      limit: 100,
      order: "reverse_chronological",
    });
    // console.log(charges.data)
    await Promise.all(
      charges.data.map((charge) =>
        charge.status == "successful" &&
        charge.metadata.pjid == pjid &&
        charge.metadata.transfered == true
          ? pjIdCharge.push(charge)
          : null
      )
    );
    res.send(pjIdCharge);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/listTransactions", async (req, res) => {
  try {
    omise.transactions.list(function (error, list) {
      /* Response. */
      res.send(list);
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/cards", async (req, res) => {
  try {
    const { custid } = req.query;
    const cards = await omise.customers.listCards(custid);
    // console.log(cards.data)
    res.send(cards);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.put("/card", async (req, res) => {
  try {
    const { cardid, custid } = req.query;
    const { expiration_month, expiration_year, name } = req.body;
    const card = await omise.customers.updateCard(custid, cardid, {
      expiration_month: expiration_month,
      expiration_year: expiration_year,
      name: name,
    });
    console.log(card);
    res.send(card);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.delete("/card", async (req, res) => {
  try {
    const { cardid, custid } = req.query;
    const card = await omise.customers.destroyCard(custid, cardid);
    console.log(card);
    res.send(card);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.post("/customer", async (req, res) => {
  try {
    const { name, email, uid } = req.body;
    console.log(req.body);
    const customer = await omise.customers.create({
      email: email,
      description: name,
      metadata: {
        uid: uid,
      },
    });
    console.log(customer);
    res.send(customer);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.put("/attachCard", async (req, res) => {
  try {
    const { custid } = req.query;
    const { token } = req.body;
    console.log(req.body);
    const customer = await omise.customers.update(custid, { card: token });
    console.log(customer);
    res.send(customer);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.post("/createRecpid", async (req, res) => {
  try {
    const { bank_account, name, pjid, uid } = req.body;

    const recp = await omise.recipients.create({
      name: name,
      type: "individual",
      bank_account: {
        bank_code: bank_account.bank_code,
        number: bank_account.number,
        name: bank_account.name,
      },
      metadata: {
        pjid: pjid,
        uid: uid,
      },
    });
    res.send(recp);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.post("/transfer", async (req, res) => {
  try {
    const { amount, recpid } = req.body;
    const { pjid, uid, charges } = req.body.metadata;
    // console.log(req.body)
    // console.log(pjid, uid, charges)

    const transfer = await omise.transfers.create({
      amount: amount,
      recipient: recpid,
      metadata: {
        pjid: pjid,
        uid: uid,
        charges: charges,
      },
    });

    // console.log(transfer)
    res.send(transfer);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.put("/updateTransferedStatus", async (req, res) => {
  try {
    const { pjid, uid, chargeid } = req.query;
    console.log("\n\nupdate pjid: " + pjid);
    console.log("update uid: " + uid);
    console.log("update chargeid: " + chargeid);
    const name = (await omise.charges.retrieve(chargeid)).metadata.name || null;
    const update = await omise.charges.update(chargeid, {
      metadata: {
        uid: uid,
        name: name,
        pjid: pjid,
        transfered: true,
      },
    });
    console.log("\nupdate: ");
    console.log(update);
    res.send(update);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// router.get('/', (req,res) => {
//     res.send('omise-node index page')
// })

module.exports = router;
