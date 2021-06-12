const express = require("express");
const router = express.Router();

const transfer = require("../controllers/transfer.controller")

router.post("/", transfer.create)

module.exports = router