import React, { Component } from "react";
import axios from "axios";
import UploadProjectPic from "../../ManageProject/components/uploadProjPic";
import { Container, Row, Col } from "react-bootstrap";

class EditProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pjimage: "",
      pjname: "",
      pjgoal: "",
      pjdesc: "",
      pjbenefit: "",
      pjbanktype: "",
      pjbankno: "",
      pjenddate: "",
      pjfb: "",
      pjtwt: "",
      pjig: "",
      pjownertype: "",
      pjownername: "",
      pjowneremail: "",
      pjsouvenir1: "",
      pjsouvenir2: "",
      pjsouvenir3: "",
      pjsprice1: "",
      pjsprice2: "",
      pjsprice3: "",
      pjamount: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    this.getAProject();
  }

  getAProject() {
    axios
      .get(process.env.REACT_APP_SERVER_URL + `/db/project/${this.props.pjid}`)

      // //Test
      // axios
      //   .get(`http://localhost:5000/project/5`)

      .then((response) => {
        this.setState(
          {
            pjname: response.data.pjname,
            pjimage: response.data.pjimage,
            pjgoal: response.data.pjgoal,
            pjdesc: response.data.pjdesc,
            pjbenefit: response.data.pjbenefit,
            pjbanktype: response.data.pjbanktype,
            pjbankname: response.data.pjbankname,
            pjbankno: response.data.pjbankno,
            pjenddate: response.data.pjenddate,
            pjfb: response.data.pjfb,
            pjtwt: response.data.pjtwt,
            pjig: response.data.pjig,
            pjownertype: response.data.pjownertype,
            pjownername: response.data.pjownername,
            pjowneremail: response.data.pjowneremail,
            pjtype: response.data.pjtype,
            pjid: response.data.pjid,
            pjamount: response.data.pjamount,
            pjsouvenir1: response.data.pjsouvenir1,
            pjsouvenir2: response.data.pjsouvenir2,
            pjsouvenir3: response.data.pjsouvenir3,
            pjsprice1: response.data.pjsprice1,
            pjsprice2: response.data.pjsprice2,
            pjsprice3: response.data.pjsprice3,
          },
          () => {
            console.log(this.state); //Successful
          }
        );
      })
      .catch((err) => console.log(err));
  }
  editProject(newProject) {
    console.log("Arrived here editProject(newProject)!"); //Got in here successfully

    axios
      .request({
        method: "put",
        url:
          process.env.REACT_APP_SERVER_URL + `/db/project/${this.props.pjid}`,
        // url: `http://localhost:5000/project/5`, //Test
        data: newProject,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      })
      // .then((response) => {
      //   window.location = "/";
      // })
      .catch((err) => console.log(err));
  }

  onSubmit(e) {
    console.log(this.state); //Successfully set state
    console.log(this.state.pjsprice1); //Successfully set in state

    console.log(sessionStorage.getItem("pjImage"));

    if (sessionStorage.getItem("pjImage")) {
      const newProject = {
        pjname: this.state.pjname,
        pjimage: sessionStorage.getItem("pjImage"),
        // pjimage:this.state.pjimage ,

        pjgoal: this.state.pjgoal,
        pjdesc: this.state.pjdesc,
        pjbenefit: this.state.pjbenefit,
        pjbanktype: this.state.pjbanktype,
        pjbankname: this.state.pjbankname,
        pjbankno: this.state.pjbankno,
        pjenddate: this.state.pjenddate,
        pjfb: this.state.pjfb,
        pjtwt: this.state.pjtwt,
        pjig: this.state.pjig,
        pjownertype: this.state.pjownertype,
        pjownername: this.state.pjownername,
        pjowneremail: this.state.pjowneremail,
        pjsouvenir1: this.state.pjsouvenir1,
        pjsouvenir2: this.state.pjsouvenir2,
        pjsouvenir3: this.state.pjsouvenir3,
        pjsprice1: this.state.pjsprice1,
        pjsprice2: this.state.pjsprice2,
        pjsprice3: this.state.pjsprice3,
        pjamount: this.state.pjamount,
      };

      console.log(newProject.pjimage);

      console.log("Submitted!" + JSON.stringify(newProject)); //Successful
      this.editProject(newProject);
      e.preventDefault();
      alert("แก้ไขโครงการสำเร็จ"); //Submit button works
      sessionStorage.removeItem("pjImage");
      window.location.href = "/ManageProject";
    } else {
      const newProject = {
        pjname: this.state.pjname,
        // pjimage: sessionStorage.getItem("pjImage"),
        pjimage: this.state.pjimage,

        pjgoal: this.state.pjgoal,
        pjdesc: this.state.pjdesc,
        pjbenefit: this.state.pjbenefit,
        pjbanktype: this.state.pjbanktype,
        pjbankname: this.state.pjbankname,
        pjbankno: this.state.pjbankno,
        pjenddate: this.state.pjenddate,
        pjfb: this.state.pjfb,
        pjtwt: this.state.pjtwt,
        pjig: this.state.pjig,
        pjownertype: this.state.pjownertype,
        pjownername: this.state.pjownername,
        pjowneremail: this.state.pjowneremail,
        pjsouvenir1: this.state.pjsouvenir1,
        pjsouvenir2: this.state.pjsouvenir2,
        pjsouvenir3: this.state.pjsouvenir3,
        pjsprice1: this.state.pjsprice1,
        pjsprice2: this.state.pjsprice2,
        pjsprice3: this.state.pjsprice3,
        pjamount: this.state.pjamount,
      };

      console.log(newProject.pjimage);

      console.log("Submitted!" + JSON.stringify(newProject)); //Successful
      this.editProject(newProject);
      e.preventDefault();
      alert("แก้ไขโครงการสำเร็จ"); //Submit button works
      sessionStorage.removeItem("pjImage");
      window.location.href = "/ManageProject";
    }
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div>
        <br />
        <Container>
          <Row>
            <img alt="" className="EditProject__Img" src={this.state.pjimage} />
          </Row>
          <br />
          <br />
        </Container>

        <div className="EditProject__Edit-image">
          <Container>
            <Row>
              <Col>
                <h3>แก้ไขรูปประกอบ</h3>
              </Col>
            </Row>
            <Row>
              <UploadProjectPic />
            </Row>
          </Container>
        </div>
        <br />
        <Container>
          <Row>
            <Col md="4">
              <p>หมายเลขโครงการ: </p>
            </Col>
            <Col>
              <p>{this.state.pjid}</p>
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <p>จุดประสงค์: </p>
            </Col>
            <Col>
              <p>{this.state.pjgoal}</p>
            </Col>
          </Row>

          <form onSubmit={this.onSubmit.bind(this)}>
            <Row>
              <Col md="4">
                <label htmlFor="pjdesc">แผนโครงการ*: </label>
              </Col>
              <Col md="8">
                <div className="EditProject__input">
                  <textarea
                    required
                    rows="10"
                    type="text"
                    name="pjdesc"
                    ref="pjdesc"
                    value={this.state.pjdesc}
                    onChange={this.handleInputChange}
                  />
                </div>
              </Col>
            </Row>
            <br />
            <Row>
              <Col md="4">
                <label htmlFor="pjbenefit">
                  ประโยชน์ที่จะได้รับจากการจัดตั้งโครงการนี้*:{" "}
                </label>
              </Col>
              <Col md="8">
                <div className="EditProject__input">
                  <textarea
                    required
                    rows="10"
                    type="text"
                    name="pjbenefit"
                    ref="pjbenefit"
                    value={this.state.pjbenefit}
                    onChange={this.handleInputChange}
                  />
                </div>
              </Col>
            </Row>
            <br />
            <Row>
              <Col md="4">
                <p>ประเภทโครงการ: </p>
              </Col>
              <Col>
                <p>{this.state.pjtype} </p>
              </Col>
            </Row>
            <br />
            <Row>
              <Col md="4">
                <p>ธนาคารของบัญชีโครงการ: </p>
              </Col>
              <Col>
                <p>{this.state.pjbanktype} </p>
              </Col>
            </Row>
            <br />
            <Row>
              <Col md="4">
                <p>ชื่อบัญชี: </p>
              </Col>
              <Col>
                <p>{this.state.pjbankname} </p>
              </Col>
            </Row>
            <br />
            <Row>
              <Col md="4">
                <p>เลขที่บัญชี: </p>
              </Col>
              <Col>
                <p>{this.state.pjbankno}</p>
              </Col>
            </Row>
            <br />
            <Row>
              <Col md="4">
                <label htmlFor="pjamount">จำนวนเงินที่คาดการณ์*: </label>
              </Col>
              <Col md="8">
                <div className="EditProject__input">
                  <input
                    required
                    type="text"
                    name="pjamount"
                    ref="pjamount"
                    value={this.state.pjamount}
                    onChange={this.handleInputChange}
                  />
                </div>
              </Col>
            </Row>
            <br />
            <Row>
              <Col md="4">
                <label htmlFor="pjfb">Facebook: </label>
              </Col>
              <Col md="8">
                <div className="EditProject__input">
                  <input
                    type="text"
                    name="pjfb"
                    ref="pjfb"
                    value={this.state.pjfb}
                    onChange={this.handleInputChange}
                  />
                </div>
              </Col>
            </Row>
            <br />
            <Row>
              <Col md="4">
                <label htmlFor="pjtwt">Twitter: </label>
              </Col>
              <Col md="8">
                <div className="EditProject__input">
                  <input
                    type="text"
                    name="pjtwt"
                    ref="pjtwt"
                    value={this.state.pjtwt}
                    onChange={this.handleInputChange}
                  />
                </div>
              </Col>
            </Row>
            <br />
            <Row>
              <Col md="4">
                <label htmlFor="pjig">Instagram: </label>
              </Col>
              <Col>
                <div className="EditProject__input">
                  <input
                    type="text"
                    name="pjig"
                    ref="pjig"
                    value={this.state.pjig}
                    onChange={this.handleInputChange}
                  />
                </div>
              </Col>
            </Row>
            <br />
            <br />
            <Row>
              <h5>เจ้าของโครงการ</h5>
            </Row>
            <br />
            <Row>
              <Col md="4">
                <p>ประเภทเจ้าของ: </p>
              </Col>
              <Col>
                <p>{this.state.pjownertype}</p>
              </Col>
            </Row>
            <br />
            <Row>
              <Col md="4">
                <p>นามเจ้าของ: </p>
              </Col>
              <Col>
                <p>{this.state.pjownername}</p>
              </Col>
            </Row>
            <br />
            <Row>
              <Col md="4">
                <label htmlFor="pjowneremail">อีเมลโครงการ*: </label>
              </Col>
              <Col md="8">
                <div className="EditProject__input">
                  <input
                    required
                    type="text"
                    name="pjowneremail"
                    ref="pjowneremail"
                    value={this.state.pjowneremail}
                    onChange={this.handleInputChange}
                  />
                </div>
              </Col>
            </Row>
            <br />
            <br />
            <Row>
              <h5>ของที่ระลึก</h5>
            </Row>
            <br />
            <Row>
              <Col md="3">
                <label htmlFor="pjsouvenir1">ของที่ระลึกระดับ 1* </label>
              </Col>
              <Col>
                <input
                  required
                  type="text"
                  name="pjsouvenir1"
                  ref="pjsouvenir1"
                  value={this.state.pjsouvenir1}
                  onChange={this.handleInputChange}
                />
              </Col>
              <Col md="3">
                <label htmlFor="pjsprice1">เมื่อบริจาคถึง* </label>
              </Col>
              <Col>
                <input
                  required
                  type="text"
                  name="pjsprice1"
                  ref="pjsprice1"
                  value={this.state.pjsprice1}
                  onChange={this.handleInputChange}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col md="3">
                <label htmlFor="pjsouvenir2">ของที่ระลึกระดับ 2* </label>
              </Col>
              <Col>
                {" "}
                <input
                  required
                  type="text"
                  name="pjsouvenir2"
                  ref="pjsouvenir2"
                  value={this.state.pjsouvenir2}
                  onChange={this.handleInputChange}
                />
              </Col>
              <Col md="3">
                <label htmlFor="pjsprice2">เมื่อบริจาคถึง* </label>
              </Col>
              <Col>
                {" "}
                <input
                  required
                  type="text"
                  name="pjsprice2"
                  ref="pjsprice2"
                  value={this.state.pjsprice2}
                  onChange={this.handleInputChange}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col md="3">
                <label htmlFor="pjsouvenir3">ของที่ระลึกระดับ 3* </label>
              </Col>
              <Col>
                <input
                  required
                  type="text"
                  name="pjsouvenir3"
                  ref="pjsouvenir3"
                  value={this.state.pjsouvenir3}
                  onChange={this.handleInputChange}
                />
              </Col>
              <Col md="3">
                <label htmlFor="pjsprice3">เมื่อบริจาคถึง* </label>
              </Col>
              <Col>
                <input
                  required
                  type="text"
                  name="pjsprice3"
                  ref="pjsprice3"
                  value={this.state.pjsprice3}
                  onChange={this.handleInputChange}
                />
              </Col>
            </Row>
            <br />
            <br />
            <Row>
              <input type="submit" value="บันทึก" className="btn btn-warning" />
            </Row>
          </form>
          <br />
        </Container>
      </div>
    );
  }
}

export default EditProject;
