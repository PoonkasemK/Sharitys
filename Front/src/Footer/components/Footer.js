import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  // console.log("footer");
  return (
    <>
      <br />
      <div className="Footer__title-container">
        <Container>
          <Row>
            <Col md="1"></Col>
            <Col md="10" className="Footer__title">
              <h6>© Sharitys</h6>
            </Col>
            <Col md="1"></Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
