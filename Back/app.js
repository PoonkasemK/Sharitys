const express = require("express");
const PORT = process.env.PORT || 8000;
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config;
// const http = require("http");
// const https = require("https");
const fs = require("fs");

const options = {
  key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "cert", "cert.crt")),
};

const app = express();

const auth = require("./auth");
const ad = require("./ad");
const omise_node = require("./omise-node");
const db = require("./index");

// const db = require("./models");
// const transaction = require("./routes/transaction.routes");
// const transfer = require("./routes/transfer.routes");

// db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/auth", auth);
app.use("/ad", ad);
app.use("/omise", omise_node);
app.use("/db", db);
// app.use("/transactions", transaction);
// app.use("/transfer", transfer);

app.use("/", (req, res) => {
  res.send("hi");
});

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});

// http.createServer(app).listen(80)

// https.createServer(options, app).listen(PORT, () => {
//   console.log(`Server is running on port : ${PORT}`);
// });

module.exports = app;
