import React, { useEffect, useState } from "react";
import Edit from "../../EditProject/components/Edit";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "firebase/auth";

const ListProjects = () => {
  const [projects, setProjects] = useState([]);
  const [button, setButton] = React.useState(false);
  const [currentProj, setCurrentProj] = useState();

  const getProjects = async (id) => {
    try {
      const response = await fetch(
        // `http://localhost:5000/showallpjforfd/demofirebaseidxx`
        process.env.REACT_APP_SERVER_URL +
          `/db/showallpjforfd/${sessionStorage.getItem("uid")}`
      );
      const jsonData = await response.json();
      setProjects(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  //For Test
  // const getProjects = async (id) => {
  //   try {
  //     const response = await fetch(
  //       "http://localhost:5000/showallpjforfd/demofirebaseidxx"
  //     );
  //     const jsonData = await response.json();
  //     setProjects(jsonData);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

  useEffect(() => {
    getProjects();
  }, []);

  console.log(projects);

  function handleToEdit(project) {
    setButton(true);
    setCurrentProj(project);
  }

  if (button) {
    return (
      <div>
        <Edit project={currentProj} />
      </div>
    );
  }

  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }

  function handleCheckRole(project) {
    if (
      project.pjstatus === "fundraising" ||
      project.pjstatus === "pendingforap"
    ) {
      return (
        <>
          <Button
            className="btn btn-warning"
            onClick={() => handleToEdit(project)}
          >
            แก้ไข
          </Button>
          &nbsp;
        </>
      );
    }
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

  return (
    <>
      <h1 className="ManageProject__title">โครงการของคุณ</h1>
      <br />
      <br />

      <Container>
        <Row>
          {projects.map((project) => (
            <Col xs="4" key={project.pjid}>
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
                    <Button
                      className="btn btn-warning"
                      onClick={() =>
                        (window.location.href = "/ProjectInfo/" + project.pjid)
                      }
                    >
                      ดูข้อมูล
                    </Button>
                    &nbsp;
                    {handleCheckRole(project)}
                    <Button
                      className="btn btn-warning"
                      onClick={() =>
                        (window.location.href = "/Transfer/" + project.pjid)
                      }
                    >
                      ถอนเงิน
                    </Button>
                  </div>
                </Card.Body>
              </Card>
              <br />
              <br />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default ListProjects;
