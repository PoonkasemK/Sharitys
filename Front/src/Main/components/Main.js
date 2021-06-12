import React from "react";
import NavBarChoose from "../../NavBar/components/NavBarChoose";
import { Container, Row, Col } from "react-bootstrap";
import TitlePage from "../image/TitlePage.png";
import { Button } from "react-bootstrap";
import Footer from "../../Footer/components/Footer";
import Introduction from "../image/Introduction.png";

export default function Main() {
  return (
    <div>
      <NavBarChoose />
      <Container>
        <img className="main__main-image" src={TitlePage} alt="" />
        <br />
        <Row>
          <img className="main__main-image" src={Introduction} alt="" />
        </Row>
        <br />
        <br />

        <Row>
          <Col className="main__main-container">
            <Button
              size="lg"
              variant="warning"
              color="#FF8C42"
              className="main__main-button "
              href="/AllProject"
            >
              ไปดูโครงการทั้งหมด
            </Button>
          </Col>
        </Row>
      </Container>
      <br />
      <br />
      <Footer />
    </div>
  );
}
