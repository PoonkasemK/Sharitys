import React, { useEffect, useState } from "react";
import CardView from "./CardView";
import { Container, Row, Col } from "react-bootstrap";
import NavBarChoose from "../../NavBar/components/NavBarChoose";
import Footer from "../../Footer/components/Footer";

const ViewUrgent = () => {
  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_SERVER_URL + "/db/allurgentpj"
      );
      const jsonData = await response.json();
      setProjects(jsonData);
      console.log(projects);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(projects);

  function compare(a, b) {
    if (a.pjstatus < b.pjstatus) {
      return -1;
    }
    if (a.pjstatus > b.pjstatus) {
      return 1;
    }
    return 0;
  }

  projects.sort(compare);

  return (
    <>
      <NavBarChoose />
      <h1 className="AllProject__Title">โครงการเร่งด่วน</h1>
      <br />
      <br />
      <Container>
        <Row>
          {projects.map((project) => (
            <Col xs="4">
              <CardView key={project.pjid} project={project} />
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ViewUrgent;
