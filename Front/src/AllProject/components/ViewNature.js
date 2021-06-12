import React, { useEffect, useState } from "react";
import CardView from "./CardView";
import { Container, Row, Col } from "react-bootstrap";
import NavBarChoose from "../../NavBar/components/NavBarChoose";
import Footer from "../../Footer/components/Footer";

const ViewNature = () => {
  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_SERVER_URL + "/db/projects/type/nature"
      );
      const jsonData = await response.json();

      setProjects(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProjects();
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
      <h1 className="AllProject__Title">โครงการช่วยเหลือธรรมชาติ</h1>
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

export default ViewNature;
