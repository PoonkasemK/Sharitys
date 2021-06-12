import React from "react";
import Footer from "../../Footer/components/Footer";
import NavBarChoose from "../../NavBar/components/NavBarChoose";
import ViewProgress from "./ViewProgress";
import UploadProgPic from "./uploadProgPic";
import InputProgress from "./InputProgress";
import { Container, Row, Col } from "react-bootstrap";
import Menu from "../../ProjectInfo/components/Menu";

export default function UpdateProgress({ project }) {
  //   console.log(pjid);
  function roleEdit() {
    console.log("check");
    if (sessionStorage.getItem("uid") === project.fdfirebaseid) {
      return (
        <>
          <UploadProgPic />
          <InputProgress id={project.pjid} />
        </>
      );
    }
  }

  return (
    <div>
      <NavBarChoose />
      <br />
      <br />
      <Container>
        <Row>
          <Col className="ProjectInfo__title">
            <h1>{project.pjname}</h1>
          </Col>
        </Row>
        <br />
        <br />
        <Menu project={project} page={"progress"} />
        {roleEdit()}
        <ViewProgress id={project.pjid} />
      </Container>
      <Footer />
    </div>
  );
}
