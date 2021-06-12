import React from "react";
import NavBarChoose from "../../NavBar/components/NavBarChoose";
import { Container, Row, Col } from "react-bootstrap";
import ProjectDescription from "../image/1.jpg";
import Gift from "../image/2.jpg";
import Promote from "../image/3.jpg";
import Footer from "../../Footer/components/Footer";
import Page from "../image/BlogPage.png";

export default function Blog() {
  return (
    <div>
      <NavBarChoose />
      <h1 className="Blog__Title">บทความชี้แนะสำหรับผู้สร้างโครงการ</h1>
      <br />
      <br />
      <Container>
        <Row>
          <img className="AboutUs__image" src={Page} alt="" />
        </Row>
      </Container>
      <Container fluid>
        <Row>
          <Col md="4">
            <img className="AboutUs__image" src={ProjectDescription} alt="" />
          </Col>
          <Col md="4">
            <img className="AboutUs__image" src={Gift} alt="" />
          </Col>
          <Col md="4">
            <img className="AboutUs__image" src={Promote} alt="" />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}
