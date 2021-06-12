import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import MainImage from "../image/MainImage.png";
import Member from "../image/Member.png";
import Contact from "../image/Contact.png";
import NavBarChoose from "../../NavBar/components/NavBarChoose";
import Footer from "../../Footer/components/Footer";

export default function AboutUs() {
  return (
    <>
      <NavBarChoose />
      <div className="AboutUs__title-container">
        <br />
        <Container>
          <Row>
            <Col md="1"></Col>
            <Col md="10" className="AboutUs__title">
              <h1>เกี่ยวกับ Sharitys</h1>
            </Col>
            <Col md="1"></Col>
          </Row>
        </Container>
        <br />
      </div>
      <br />
      <br />
      <br />
      <img className="AboutUs__main-image" src={MainImage} alt="" />
      <img className="AboutUs__member" src={Member} alt="" />
      <img className="AboutUs__contact" src={Contact} alt="" />
      <Footer />
    </>
  );
}
