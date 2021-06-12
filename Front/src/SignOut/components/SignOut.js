import React from "react";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import Main from "../../Main/components/Main";

export default function SignOut() {
  function handleLogOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {})
      .catch((error) => {});
    sessionStorage.clear();
  }

  return (
    <>
      {handleLogOut()}
      <Main />
    </>
  );
}
