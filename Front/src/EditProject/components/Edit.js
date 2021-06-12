import React from "react";
import EditProject from "./EditProject";
import EditProjectAd from "./EditProjectAd";

export default function Edit({ project }) {
  function roleEdit() {
    if (sessionStorage.getItem("role") === "fd") {
      return <EditProject pjid={project.pjid} />;
    } else if (sessionStorage.getItem("role") === "admin") {
      return <EditProjectAd pjid={project.pjid} />;
    }
  }

  return (
    <>
      <h1 className="EditProject__Title">แก้ไขโครงการ</h1>
      <h2 className="EditProject__Title">{project.pjname}</h2>
      <br />
      <br />

      {roleEdit()}
    </>
  );
}
