import React from "react";
import axios from "axios";

import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import { firebaseConfig } from "../../key";

firebase.initializeApp(firebaseConfig);

const SigninWidget = (props) => {
  // console.log(props);
  console.log(props.role);

  const setCustid = async (name, email, uid) => {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/omise/customer",
      {
        name: name,
        email: email,
        uid: uid,
      }
    );
    console.log(res.data);
    return res.data.id;
  };

  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: async (authResult, redirectUrl) => {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        // console.log("in callback")
        var user = authResult.user;
        var custid = null;
        console.log(user);

        firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.SESSION)
          .then(async () => {
            if (authResult.additionalUserInfo.isNewUser) {
              console.log("CheckCheck");
              if (props.role !== "dn" && props.role !== "fd") {
                alert("คุณไม่มีบัญชีผู้ใช้ กรุณาสร้างบัญชีใหม่");
                user.delete().catch((error) => {
                  user.delete();
                });
                console.log("CheckCheck" + props.role);
                sessionStorage.clear();
              } else {
                if (props.role === "dn") {
                  // console.log(user.displayName, user.email, user.uid)
                  custid = await setCustid(
                    user.displayName,
                    user.email,
                    user.uid
                  );
                  // console.log("custid: "+custid)
                }
                console.log(props.role);
                sessionStorage.setItem("role", props.role);
                sessionStorage.setItem("uid", user.uid);
                console.log("new user");
                user
                  .getIdToken()
                  .then(async (idToken) => {
                    // .then((idToken) => {
                    // console.log(idToken, props.role)
                    // axios.post("https://localhost:8000/auth/setCustomClaims", {
                    const res = await axios.post(
                      process.env.REACT_APP_SERVER_URL +
                        "/auth/setCustomClaims",
                      {
                        idToken: idToken,
                        role: props.role,
                        custid: custid,
                      }
                    );
                    console.log(res.data);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            } else {
              user.getIdTokenResult().then((idTokenResult) => {
                if (props.role === "fd" || props.role === "dn") {
                  if (idTokenResult.claims.role === "fd") {
                    alert(
                      "คุณมีบัญชีนี้อยู่แล้ว คุณกำลังเข้าสู้ระบบเป็นผู้ระดมทุน"
                    );
                  } else if (idTokenResult.claims.role === "dn") {
                    alert(
                      "คุณมีบัญชีนี้อยู่แล้ว คุณกำลังเข้าสู้ระบบเป็นผู้บริจาค"
                    );
                  } else if (idTokenResult.claims.role === "admin") {
                    alert(
                      "คุณมีบัญชีนี้อยู่แล้ว คุณกำลังเข้าสู้ระบบเป็น Admin"
                    );
                  }
                }
                if (idTokenResult.claims.role === undefined) {
                  alert("ล้มเหลว กรุณาลองอีกครั้ง");
                  user.delete().catch((error) => {
                    user.delete();
                  });
                  console.log("CheckCheck" + props.role);
                  sessionStorage.clear();
                } else {
                  sessionStorage.setItem("role", idTokenResult.claims.role);
                  sessionStorage.setItem("uid", user.uid);
                }
              });
            }
            window.location.href = "/";
          });

        return false;
      },
    },

    // Opens IDP Providers sign-in flow in a popup.
    signInFlow: "popup",
    signInOptions: [
      // Google sign in option
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],

    // Terms of service url/callback.
    tosUrl: "<your-tos-url>",

    // Privacy policy url/callback.
    privacyPolicyUrl: function () {
      window.location.assign("/<your-privacy-policy-url>");
    },
  };

  return (
    <div className="container">
      {/* <h1>{props.role}</h1> */}
      <StyledFirebaseAuth
        uiConfig={uiConfig}
        firebaseAuth={firebase.auth()}
      ></StyledFirebaseAuth>
      <div id="loader"></div>
    </div>
  );
};

export default SigninWidget;
