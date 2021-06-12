import React, { Fragment, useEffect, useState } from "react";
import NavBarChoose from "../../NavBar/components/NavBarChoose";
import { Container, Row, Col, ProgressBar } from "react-bootstrap";
import Icon from "@material-ui/core/Icon";
import { Button } from "react-bootstrap";
import Footer from "../../Footer/components/Footer";
import Menu from "./Menu";
import SocialMediaButtons from "../../Share/components/share";
import axios from "axios";

function ProjectInfo({ pjid }) {
  const [project, setProject] = useState([]);

  // console.log("check " + pjid);
  //Real
  const getAProject = async (id) => {
    try {
      let total = 0;
      const res = await axios.get(
        process.env.REACT_APP_SERVER_URL +
          "/omise/listSuccessfulChargesByPjid?pjid=" +
          pjid
      );
      // console.log(res.data);
      res.data.map((charge) => (total += charge.amount / 100));
      // console.log(total);
      await axios.put(
        process.env.REACT_APP_SERVER_URL + "/db/pjcurrentamount/" + pjid,
        {
          pjcurrentamount: total,
        }
      );

      const response = await fetch(
        process.env.REACT_APP_SERVER_URL + `/db/project/${pjid}`,
        {
          method: "GET",
        }
      );

      const jsonData = await response.json();
      setProject(jsonData);
    } catch (err) {
      // console.error(err.message);
    }
  };

  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }

  function statusColor() {
    if (project.pjstatus === "fundraising") {
      return <h4 className="ProjectInfo__status">{project.pjstatus}</h4>;
    }
    return (
      <h4 className="ProjectInfo__status-terminated">{project.pjstatus}</h4>
    );
  }

  useEffect(() => {
    getAProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log("checkP" + project);
  // console.log((project.pjcurrentamount / project.pjamount) * 100);

  const terminateProject = async (id) => {
    try {
      await fetch(
        process.env.REACT_APP_SERVER_URL + `/db/terminatepjfd/${id}`,
        {
          method: "PUT",
        }
      );
      alert(
        "ส่งคำขอยุติโครงการแล้ว อย่าลืมถอนเงินทั้งหมด และโปรดรอแอดมินติดต่อกลับภายใน 3 วันทำการ"
      );
      setProject(project);
    } catch (err) {
      console.error(err.message);
    }
    window.location.href = "/ManageProject";
  };

  function handleCheckRole() {
    if (
      sessionStorage.getItem("role") === "fd" ||
      sessionStorage.getItem("role") === "admin"
    ) {
      console.log(project.fdfirebaseid);
      // if (project.fdfirebaseid === "demofirebaseidxx") {
      if (sessionStorage.getItem("uid") === project.fdfirebaseid) {
        if (
          project.pjstatus === "fundraising" ||
          project.pjstatus === "pendingforap"
        )
          return (
            <Button
              onClick={() => terminateProject(project.pjid)}
              size="lg"
              className="ProjectInfo__danger-button align-self-end"
              variant="danger"
            >
              ยุติโครงการ
            </Button>
          );
      }
    } else {
      return (
        <Button
          onClick={() => (window.location.href = "/Payment/" + project.pjid)}
          size="lg"
          className="ProjectInfo__button align-self-end"
          variant="warning"
        >
          บริจาค
        </Button>
      );
    }
  }

  return (
    <Fragment>
      <NavBarChoose />
      <br />
      <br />
      <Container>
        <Row>
          <Col className="ProjectInfo__title">
            <h1>{project.pjname}</h1>
          </Col>
        </Row>
        <br />
        <br />
        <Menu project={project} page={"info"} />
        <br />
        <br />
        <Row>
          <Col md="6">
            <img alt="" className="ProjectInfo__image" src={project.pjimage} />
          </Col>
          <Col md="6">
            <Row>{statusColor()}</Row>
            <br />
            <Row>
              <h4 className="ProjectInfo__owner">โดย {project.pjownername}</h4>
            </Row>
            <br />
            <Row>
              <h5 className="ProjectInfo__goal">{project.pjgoal}</h5>
            </Row>
            <Row>
              <Col md={{ offset: 7 }}>
                {/* temp / {project.pjamount} บาท */}
                {project.pjcurrentamount} / {project.pjamount} บาท
                <Icon
                  className="fa fa-flag ProjectInfo__flag"
                  fontSize="large"
                />
              </Col>
            </Row>
            <ProgressBar
              variant="success"
              now={(project.pjcurrentamount / project.pjamount) * 100}
            />
            <Row>
              {formatDate(project.pjstartdate)} -{formatDate(project.pjenddate)}
            </Row>
            <br />
            <Row>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Col md={"1"}>
                <a className="ProjectInfo__SNS" href={"http://" + project.pjfb}>
                  <Icon className="fa fa-facebook-square" fontSize="large" />
                </a>
              </Col>
              <Col md="1">
                <a
                  className="ProjectInfo__SNS"
                  href={"http://" + project.pjtwt}
                >
                  <Icon className="fa fa-twitter-square" fontSize="large" />
                </a>
              </Col>
              <Col md="1">
                <a className="ProjectInfo__SNS" href={"http://" + project.pjig}>
                  <Icon className="fa fa-instagram" fontSize="large" />
                </a>
              </Col>
              <Col md="5"></Col>
              <Col>{handleCheckRole()}</Col>
            </Row>
            <Row>
              <Col>Social Media ของโครงการนี้</Col>
            </Row>
          </Col>
        </Row>

        <br />
        <br />
        <Row>
          <Col className="ProjectInfo__gift align-items-end">
            <i className="fa fa-gift ProjectInfo__gift fa-3x" />
          </Col>
          <Col className="ProjectInfo__gift align-items-end">
            <i className="fa fa-gift ProjectInfo__gift fa-4x" />
          </Col>
          <Col className="ProjectInfo__gift align-items-end">
            <i className="fa fa-gift ProjectInfo__gift fa-5x" />
          </Col>
        </Row>
        <Row>
          <Col>
            <h4 className="ProjectInfo__gift">
              {project.pjsouvenir1} <br /> เมื่อบริจาคถึง {project.pjsprice1}
            </h4>
          </Col>
          <Col>
            <h4 className="ProjectInfo__gift">
              {project.pjsouvenir2} <br /> เมื่อบริจาคถึง {project.pjsprice2}
            </h4>
          </Col>
          <Col>
            <h4 className="ProjectInfo__gift">
              {project.pjsouvenir3} <br /> เมื่อบริจาคถึง {project.pjsprice3}
            </h4>
          </Col>
        </Row>
        <br />
        <Row>
          <Col md={{ offset: 2 }}>
            <p>
              หมายเหตุ: การให้ของขวัญเป็นความรับผิดชอบของผู้ระดมทุน Sharitys
              ไม่มีส่วนเกี่ยวข้องใด ๆ กับการส่งของขวัญ
            </p>
          </Col>
        </Row>
        <br />
        <Row>
          <p className="ProjectInfo__text">{project.pjdesc}</p>
        </Row>
        <br />
        <Row>
          <p className="ProjectInfo__text">{project.pjbenefit}</p>
        </Row>
        <br />
        <Row className="justify-content-center">
          <SocialMediaButtons
            projUrl={
              "https://sharitysfront.herokuapp.com/ProjectInfo/" + project.pjid
            }
            projName={project.pjname}
          />
        </Row>
        <br />
      </Container>
      <Footer />
    </Fragment>
  );
}

export default ProjectInfo;
