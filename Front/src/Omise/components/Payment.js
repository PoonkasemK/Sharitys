import React from "react";
import CheckoutWidget from "./checkoutWidget";
import NavBarChoose from "../../NavBar/components/NavBarChoose";
import Footer from "../../Footer/components/Footer";
import { Container } from "react-bootstrap";

export default function Payment({ pjid }) {
  //   console.log(pjid);

  function checkRole() {
    if (
      sessionStorage.getItem("role") !== "fd" &&
      sessionStorage.getItem("role") !== "admin"
    ) {
      return <CheckoutWidget pjid={pjid} />;
    } else {
      return (
        <>
          <h2 className="Omise__title">คุณไม่สามารถบริจาคได้</h2>
        </>
      );
    }
  }
  return (
    <div>
      <NavBarChoose />
      <h1 className="Omise__title">บริจาค</h1>
      <br />
      <br />
      <Container>{checkRole()}</Container>

      <Footer />
    </div>
  );
}
