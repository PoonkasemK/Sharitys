import React from "react";
import ListProjects from "./ListProjects";
import ManageProjectAd from "./ManageProjectAd";
import Footer from "../../Footer/components/Footer";
import NavBarChoose from "../../NavBar/components/NavBarChoose";

export default function ManageProject() {
  function roleEdit() {
    console.log("check");
    if (sessionStorage.getItem("role") === "fd") {
      return <ListProjects />;
    } else if (sessionStorage.getItem("role") === "admin") {
      return <ManageProjectAd />;
    } else {
      return (
        <>
          <h1 className="Omise__title">จัดการโครงการ</h1>
          <br />
          <br />
          <h2 className="Omise__title">คุณไม่สามารถจัดการโครงการต่างๆได้</h2>
        </>
      );
    }
  }

  return (
    <>
      <NavBarChoose />
      {roleEdit()}
      <Footer />
    </>
  );
}
