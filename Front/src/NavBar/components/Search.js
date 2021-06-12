import React, { Fragment, useState } from "react";
import NavBarChoose from "../../NavBar/components/NavBarChoose";
import Footer from "../../Footer/components/Footer";
import { Container, Row, Col } from "react-bootstrap";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function formatDate(string) {
  var options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(string).toLocaleDateString([], options);
}

function statusColor({ project }) {
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

function Search() {
  const [pjname, setpjname] = useState("");
  const [projects, setprojects] = useState([]);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        process.env.REACT_APP_SERVER_URL + `/db/search/?pjname=${pjname}`
      );
      const parseResponse = await response.json();
      setprojects(parseResponse);
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <NavBarChoose />
      <br />
      <h1 className="Omise__title">ค้นหา</h1>
      <br />
      <br />
      <Container>
        <div className="container text-center">
          <form className="d-flex" onSubmit={onSubmitForm}>
            <input
              type="text"
              name="name"
              placeholder="ค้นหา ..."
              className="form-control"
              value={pjname}
              onChange={(e) => setpjname(e.target.value)}
            />
            <button className="btn btn-success">ค้นหา</button>
          </form>
        </div>
        <br />
        <Row>
          {projects.map((project) => (
            <Col xs="4" key={project.pjid}>
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
                    {statusColor({ project })}
                    <Card.Text>
                      {formatDate(project.pjstartdate)} -{" "}
                      {formatDate(project.pjenddate)}
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
                            (window.location.href =
                              "/ProjectInfo/" + project.pjid)
                          }
                          className="CardView__button"
                          variant="warning"
                        >
                          ดูข้อมูล
                        </Button>
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
                <br />
                <br />
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </Fragment>
  );
}

export default Search;
