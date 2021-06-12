import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CardView({ project }) {
  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }

  function handleRole() {
    if (
      sessionStorage.getItem("role") !== "fd" &&
      sessionStorage.getItem("role") !== "admin"
    ) {
      if (project.pjstatus === "fundraising") {
        return (
          <Button
            onClick={() => (window.location.href = "/Payment/" + project.pjid)}
            className="CardView__button"
            variant="warning"
          >
            บริจาค
          </Button>
        );
      }
    }
  }

  function statusColor() {
    if (project.pjstatus === "fundraising") {
      return (
        <Card.Text className="text-right ProjectInfo__status">
          {project.pjstatus}
        </Card.Text>
      );
    }
    return (
      <Card.Text className="text-right ProjectInfo__status-terminated">
        {project.pjstatus}
      </Card.Text>
    );
  }

  return (
    <div>
      <Card className="CardView__container">
        <Card.Img
          className="CardView__image"
          variant=""
          src={project.pjimage}
        />
        <Card.Body>
          <Card.Title className="text-center CardView__title">
            {project.pjname}
          </Card.Title>
          {statusColor()}
          <Card.Text>
            {formatDate(project.pjstartdate)} - {formatDate(project.pjenddate)}
          </Card.Text>
          <br />
          <Card.Text className="CardView__description">
            {project.pjdesc}
          </Card.Text>
          <br />
          <div className="CardView__button-container">
            <Link to="/ProjectInfo">
              <Button
                onClick={() =>
                  (window.location.href = "/ProjectInfo/" + project.pjid)
                }
                className="CardView__button"
                variant="warning"
              >
                ดูข้อมูล
              </Button>
            </Link>
            &nbsp;
            {handleRole()}
          </div>
        </Card.Body>
      </Card>
      <br />
      <br />
    </div>
  );
}
