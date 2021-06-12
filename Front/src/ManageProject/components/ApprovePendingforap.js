import React, { Fragment, useEffect, useState } from "react";
import NavBarChoose from "../../NavBar/components/NavBarChoose";
import Footer from "../../Footer/components/Footer";
import { Container, Row, Col, Card } from "react-bootstrap";

const ApproveProject = () => {
  const [projects, setProjects] = useState([]);

  //delete todo function

  const deleteProject = async (id) => {
    try {
      await fetch(process.env.REACT_APP_SERVER_URL + `/db/deletepj/${id}`, {
        method: "DELETE",
      });

      setProjects(projects.filter((project) => project.pjid !== id));
      alert("ปฏิเสธโครงการสำเร็จ");
    } catch (err) {
      console.error(err.message);
    }
  };

  const confirmProject = async (id) => {
    try {
      await fetch(process.env.REACT_APP_SERVER_URL + `/db/approvepj/${id}`, {
        method: "PUT",
      });

      setProjects(projects.filter((project) => project.pjid !== id));
      alert("ยืนยันโครงการสำเร็จ");
    } catch (err) {
      console.error(err.message);
    }
  };

  const getProjects = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_SERVER_URL + "/db/allpendingforap"
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

  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }

  function handleCheckImage(pjimage) {
    if (pjimage) {
      return (
        <>
          <br />
          <Card.Img className="CardView__image" variant="" src={pjimage} />
        </>
      );
    }
  }

  if (sessionStorage.getItem("role") !== "admin") {
    return (
      <Fragment>
        <NavBarChoose />
        <h1 className="text-center mt-5">อนุมัติโครงการที่ยื่นใหม่</h1>
        <br />
        <br />
        <h2 className="Omise__title">คุณไม่สามารถใช้งานส่วนนี้ได้</h2>

        <Footer />
      </Fragment>
    );
  }

  console.log(projects);
  return (
    <Fragment>
      <NavBarChoose />
      <h1 className="text-center mt-5">อนุมัติโครงการที่ยื่นใหม่</h1>
      <br />
      <Container>
        {projects.map((project) => (
          <Fragment key={project.pjid}>
            <Card className="CardView__progress-container">
              {handleCheckImage(project.pjimage)}
              <Card.Body>
                <Card.Title className="text-center CardView__title">
                  {project.pjname}
                </Card.Title>
                <br />
                <Row>
                  <Col md="4">No.</Col>
                  <Col md="8">{project.pjid}</Col>
                </Row>
                <br />
                <Row>
                  <Col md="4">สถานะ</Col>
                  <Col md="8">{project.pjstatus}</Col>
                </Row>
                <br />
                <Row>
                  <Col md="4">จุดประสงค์</Col>
                  <Col md="8">{project.pjgoal}</Col>
                </Row>
                <br />
                <Row>
                  <Col md="4">แผนโครงการ</Col>
                  <Col md="8">{project.pjdesc}</Col>
                </Row>
                <br />
                <Row>
                  <Col md="4">ประโยชน์ที่จะได้รับ</Col>
                  <Col md="8">{project.pjbenefit}</Col>
                </Row>
                <br />
                <Row>
                  <Col md="4">ธนาคาร</Col>
                  <Col md="8">{project.pjbanktype}</Col>
                </Row>
                <br />
                <Row>
                  <Col md="4">ชื่อบัญชี</Col>
                  <Col md="8">{project.pjbankname}</Col>
                </Row>
                <br />
                <Row>
                  <Col md="4">เลขที่บัญชี</Col>
                  <Col md="8">{project.pjbankno}</Col>
                </Row>
                <br />
                <Row>
                  <Col md="4">วันที่ปิดโครงการ</Col>
                  <Col md="8">{formatDate(project.pjenddate)}</Col>
                </Row>
                <br />
                <Row>
                  <Col md="4">Facebook</Col>
                  <Col md="8">{project.pjfb}</Col>
                </Row>
                <br />
                <Row>
                  <Col md="4">Twitter</Col>
                  <Col md="8">{project.pjtwt}</Col>
                </Row>
                <br />
                <Row>
                  <Col md="4">Instagram</Col>
                  <Col md="8">{project.pjig}</Col>
                </Row>
                <br />
                <Row>
                  <Col md="4">ประเภทเจ้าของ</Col>
                  <Col md="8">{project.pjownertype}</Col>
                </Row>
                <br />
                <Row>
                  <Col md="4">นามเจ้าของ</Col>
                  <Col md="8">{project.pjownername}</Col>
                </Row>
                <br />
                <Row>
                  <Col md="4">อีเมล</Col>
                  <Col md="8">{project.pjowneremail}</Col>
                </Row>
                <br />
                <Row>
                  <Col md="4">ของที่ระลึกระดับ 1</Col>
                  <Col md="8">{project.pjsouvenir1}</Col>
                </Row>
                <br />
                <Row>
                  <Col md="4">เมื่อบริจาคถึง</Col>
                  <Col md="8">{project.pjsprice1}</Col>
                </Row>
                <br />
                <Row>
                  <Col md="4">ของที่ระลึกระดับ 2</Col>
                  <Col md="8">{project.pjsouvenir2}</Col>
                </Row>
                <br />
                <Row>
                  <Col md="4">เมื่อบริจาคถึง</Col>
                  <Col md="8">{project.pjsprice2}</Col>
                </Row>
                <br />
                <Row>
                  <Col md="4">ของที่ระลึกระดับ 3</Col>
                  <Col md="8">{project.pjsouvenir3}</Col>
                </Row>
                <br />
                <Row>
                  <Col md="4">เมื่อบริจาคถึง</Col>
                  <Col md="8">{project.pjsprice3}</Col>
                </Row>
                <br />
                <Row>
                  <Col md="auto">
                    <button
                      className="btn btn-success"
                      onClick={() => confirmProject(project.pjid)}
                    >
                      อนุมัติ
                    </button>
                  </Col>
                  <Col md="auto">
                    <button
                      className="btn btn-secondary"
                      onClick={() => deleteProject(project.pjid)}
                    >
                      ไม่อนุมัติ
                    </button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <br />
          </Fragment>
        ))}
      </Container>

      <Footer />
    </Fragment>
  );
};

export default ApproveProject;
