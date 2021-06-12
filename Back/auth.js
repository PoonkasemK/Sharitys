const express = require("express");
const admin = require("firebase-admin");
const router = express.Router();

var serviceAccount = require("./sharitys-d1b14-firebase-adminsdk-2mtlq-666e11d65a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sharitys-d1b14-default-rtdb.firebaseio.com",
});

// router.use(function timeLog(req,res,next){
//     console.log('Time: ', Date.now())
//     next()
// })

router.post("/setCustomClaims", (req, res) => {
  const { idToken, role, custid } = req.body;
  console.log(idToken, role, custid);
  admin
    .auth()
    .verifyIdToken(idToken)
    .then((claims) => {
      if (
        (typeof claims.email !== "undefined" &&
          typeof claims.email_verified !== "undefined" &&
          claims.email_verified &&
          role == "ad") ||
        claims.email === "sharitys.test@gmail.com"
      ) {
        admin
          .auth()
          .setCustomUserClaims(claims.sub, {
            role: "admin",
          })
          .then(() => {
            console.log("setCustomClaims ad success");
            res.end(
              JSON.stringify({
                status: "success",
              })
            );
          });
      } else if (
        typeof claims.email !== "undefined" &&
        typeof claims.email_verified !== "undefined" &&
        claims.email_verified &&
        role == "fd"
      ) {
        admin
          .auth()
          .setCustomUserClaims(claims.sub, {
            role: "fd",
          })
          .then(() => {
            console.log("setCustomClaims fd success");
            res.end(
              JSON.stringify({
                status: "success",
              })
            );
          });
      } else {
        // res.end(JSON.stringify({status: 'ineligible'}))
        admin
          .auth()
          .setCustomUserClaims(claims.sub, {
            role: "dn",
            custid: custid,
          })
          .then(() => {
            console.log("setCustomClaims dn success");
            res.end(
              JSON.stringify({
                status: "success",
              })
            );
          });
      }
    });
});

router.get("/user", async (req, res) => {
  const { uid } = req.query;
  admin
    .auth()
    .getUser(uid)
    .then((userRecord) => {
      console.log(userRecord);
      res.send(userRecord);
    });
});

router.delete("/user", async (req, res) => {
  const { uid } = req.query;
  admin
    .auth()
    .deleteUser(uid)
    .then(() => {
      console.log("Successfully deleted user");
      res.send("Successfully deleted");
    })
    .catch((error) => {
      console.log("Error deleting user:", error);
      res.send("Error deleting user:", error);
    });
});

// router.get("/", (req, res) => {
//   res.send("auth index page");
// });

module.exports = router;
