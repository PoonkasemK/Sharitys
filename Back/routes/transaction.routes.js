const express = require("express");
const router = express.Router();

// module.exports = app => {
    const transactions = require("../controllers/transaction.controller");
  
    // var router = require("express").Router();
  
    // Create a new transactions
    router.post("/", transactions.create);
  
    // Retrieve all transactions
    // https://localhost:8000/transactions/?pjid=mock pjid
    router.get("/", transactions.findAll);
  
    // Retrieve all published transactions
    router.get("/transferable", transactions.findAllTransferable);

    // Retrieve all published transactions
    router.get("/transfered", transactions.findAllTransfered);
    
    // Retrieve all donation by uid
    router.get("/donationHistory", transactions.donationHistory);
  
    // Retrieve a single transactions with chargeId
    router.get("/:chargeId", transactions.findOne);
  
    // Update a transactions with id
    router.put("/:id", transactions.update);
  
    // Delete a transactions with id
    router.delete("/:id", transactions.delete);
  
    // Create a new transactions
    router.delete("/", transactions.deleteAll);
  
    // app.use('/api/transactions', router);
//   };
module.exports = router;