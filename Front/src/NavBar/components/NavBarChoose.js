import React from "react";
import NavBarFundraiser from "./NavBarFundraiser";
import NavBar from "./NavBar";
import NavBarAdmin from "./NavBarAdmin";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";

export default function NavBarChoose() {
  function handleAnonymous() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        if (user.isAnonymous) {
          user.delete();
          sessionStorage.clear();
        }
      }
    });
  }

  function roleNav() {
    if (sessionStorage.getItem("role") === "fd") {
      return <NavBarFundraiser />;
    } else if (sessionStorage.getItem("role") === "admin") {
      return <NavBarAdmin />;
    }
    return <NavBar />;
  }

  return (
    <>
      {roleNav()}
      {handleAnonymous()}
    </>
  );
}
