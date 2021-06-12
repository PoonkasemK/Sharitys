import React from "react";
import NavBarChoose from "../../NavBar/components/NavBarChoose";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import SigninWidget from "./signin";
import Footer from "../../Footer/components/Footer";

export default function Login() {
  const [button, setButton] = React.useState(false);
  const [role, setRole] = React.useState();
  const [haveAccount, setHaveAccount] = React.useState(false);
  const handleClick = (r) => (e) => {
    e.preventDefault();
    setRole(r);
    setButton(true);
    // console.log(role);
    // console.log(button);
  };
  const handleLogin = (a) => (event) => {
    event.preventDefault();
    setHaveAccount(true);
  };

  if (haveAccount) {
    return (
      <div>
        <NavBarChoose />
        <SigninWidget />
        <Footer />
      </div>
    );
  } else if (button) {
    return (
      <div>
        <NavBarChoose />
        <SigninWidget role={role} />
        <Footer />
      </div>
    );
  } else {
    return (
      <>
        <NavBarChoose />
        <h1 className="login__Title">สมัครสมาชิก</h1>
        <br />
        <br />
        <div>
          <Container>
            <Row>
              <Col className="text-center">
                <button
                  className="login__register-button"
                  onClick={handleClick("dn")}
                >
                  <h5>สมัครเป็นผู้บริจาค (Donor)</h5>
                </button>
              </Col>
              <Col className="text-center">
                <button
                  className="login__register-button"
                  onClick={handleClick("fd")}
                >
                  <h5>สมัครเป็นผู้ระดมทุน (Fundraiser)</h5>
                </button>
              </Col>
            </Row>
            <br />
            <br />
            <br />
            <Row>
              <Col className="text-center">
                มีบัญชีอยู่แล้ว?
                <Link onClick={handleLogin(true)} to="#">
                  &nbsp;เข้าสู่ระบบ
                </Link>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </>
    );
  }
}
