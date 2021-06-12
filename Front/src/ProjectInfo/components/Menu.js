import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Menu({ project, page }) {
  console.log(project.pjid);

  if (page === "info") {
    return (
      <Row>
        <Col>
          <Link to={"/ProjectInfo/" + project.pjid}>
            <h5 className="ProjectInfo__menu-current">รายละเอียดโครงการ</h5>
          </Link>
        </Col>
        <Col md="auto">|</Col>
        <Col>
          <Link to={"/UpdateProgress/" + project.pjid}>
            <h5 className="ProjectInfo__menu">ความคืบหน้าโครงการ</h5>
          </Link>
        </Col>
        <Col md="auto">|</Col>
        <Col>
          <Link to={"/ProjectHistory/" + project.pjid}>
            <h5 className="ProjectInfo__menu">สถานะการบริจาค</h5>
          </Link>
        </Col>
      </Row>
    );
  } else if (page === "progress") {
    return (
      <Row>
        <Col>
          <Link to={"/ProjectInfo/" + project.pjid}>
            <h5 className="ProjectInfo__menu">รายละเอียดโครงการ</h5>
          </Link>
        </Col>
        <Col md="auto">|</Col>
        <Col>
          <Link to={"/UpdateProgress/" + project.pjid}>
            <h5 className="ProjectInfo__menu-current">ความคืบหน้าโครงการ</h5>
          </Link>
        </Col>
        <Col md="auto">|</Col>
        <Col>
          <Link to={"/ProjectHistory/" + project.pjid}>
            <h5 className="ProjectInfo__menu">สถานะการบริจาค</h5>
          </Link>
        </Col>
      </Row>
    );
  }
  return (
    <Row>
      <Col>
        <Link to={"/ProjectInfo/" + project.pjid}>
          <h5 className="ProjectInfo__menu">รายละเอียดโครงการ</h5>
        </Link>
      </Col>
      <Col md="auto">|</Col>
      <Col>
        <Link to={"/UpdateProgress/" + project.pjid}>
          <h5 className="ProjectInfo__menu">ความคืบหน้าโครงการ</h5>
        </Link>
      </Col>
      <Col md="auto">|</Col>
      <Col>
        <Link to={"/ProjectHistory/" + project.pjid}>
          <h5 className="ProjectInfo__menu-current">สถานะการบริจาค</h5>
        </Link>
      </Col>
    </Row>
  );
}
