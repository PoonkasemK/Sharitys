import React from "react";
import NavBarChoose from "../../NavBar/components/NavBarChoose";
import InputProject from "./InputProject";
import Footer from "../../Footer/components/Footer";
import { Container } from "react-bootstrap";
// import UploadProjPic from "../../ManageProject/components/uploadProjPic";

export default function CreateProject() {
  function handleRole() {
    if (sessionStorage.getItem("role") === "fd") {
      return <InputProject />;
    } else {
      return <h2 className="Omise__title">คุณไม่สามารถสร้างโครงการได้</h2>;
    }
  }

  return (
    <div>
      <NavBarChoose />
      <Container>
        <h1 className="text-center mt-5">สร้างโครงการ</h1>
        <br />
        {handleRole()}
      </Container>

      <Footer />
    </div>
  );
}
