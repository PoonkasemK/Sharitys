import React from "react";
import { Navbar, Nav, NavDropdown, Form, FormControl } from "react-bootstrap";
import { Button } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";

export default function NavBar() {
  const [userState, setUserState] = React.useState();
  firebase.auth().onAuthStateChanged(function (user) {
    // console.log(user);
    setUserState(user);
  });

  if (userState) {
    return (
      <div>
        <Navbar className="navBar__container">
          <Nav.Link href="/">
            <Navbar.Brand className="navBar__brand-name">Sharitys</Navbar.Brand>
          </Nav.Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="mr-auto">
              <Nav.Link className="navBar__menu-font" href="/">
                หน้าแรก
              </Nav.Link>
              <NavDropdown className="navBar__menu-font" title="ประเภทโครงการ">
                <NavDropdown.Item
                  className="navBar__sub-menu-font"
                  href="/AllProject"
                >
                  โครงการทั้งหมด
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="navBar__sub-menu-font"
                  href="/ViewUrgent"
                >
                  โครงการที่เร่งด่วน
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="navBar__sub-menu-font"
                  href="/ViewDisaster"
                >
                  ภัยพิบัติ
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="navBar__sub-menu-font"
                  href="/ViewNature"
                >
                  ธรรมชาติ
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="navBar__sub-menu-font"
                  href="/ViewAccident"
                >
                  อุบัติเหตุ
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="navBar__sub-menu-font"
                  href="/ViewAnimal"
                >
                  เกี่ยวกับสัตว์
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="navBar__sub-menu-font"
                  href="/ViewEducation"
                >
                  การศึกษา
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="navBar__sub-menu-font"
                  href="/ViewOthers"
                >
                  อื่นๆ
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link className="navBar__menu-font" href="/AboutUs">
                เกี่ยวกับเรา
              </Nav.Link>
            </Nav>
            <Nav className="mr">
              <Form inline>
                <Icon className="fa fa-search" />
                <FormControl
                  type="text"
                  placeholder="ค้นหา"
                  className="mr-sm-2"
                  onChange={() => (window.location.href = "/Search")}
                />
              </Form>
            </Nav>
            <Nav className="mr">
              <NavDropdown
                alignRight
                className="navBar__menu-font"
                title={<Icon className="fa fa-user-circle" />}
              >
                <NavDropdown.Item
                  className="navBar__sub-menu-font"
                  href="/Profile"
                >
                  ข้อมูลผู้ใช้
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="navBar__sub-menu-font"
                  href="/Cards"
                >
                  ช่องทางชำระเงิน
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="navBar__sub-menu-font"
                  href="/DonorHistory"
                >
                  ประวัติ
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="navBar__sub-menu-font"
                  href="/SignOut"
                >
                  ออกจากระบบ
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  } else {
    return (
      <div>
        <Navbar className="navBar__container">
          <Nav.Link href="/">
            <Navbar.Brand className="navBar__brand-name">Sharitys</Navbar.Brand>
          </Nav.Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="mr-auto">
              <Nav.Link className="navBar__menu-font" href="/">
                หน้าแรก
              </Nav.Link>
              <NavDropdown className="navBar__menu-font" title="ประเภทโครงการ">
                <NavDropdown.Item
                  className="navBar__sub-menu-font"
                  href="/AllProject"
                >
                  โครงการทั้งหมด
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="navBar__sub-menu-font"
                  href="/ViewUrgent"
                >
                  โครงการที่เร่งด่วน
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="navBar__sub-menu-font"
                  href="/ViewDisaster"
                >
                  ภัยพิบัติ
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="navBar__sub-menu-font"
                  href="/ViewNature"
                >
                  ธรรมชาติ
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="navBar__sub-menu-font"
                  href="/ViewAccident"
                >
                  อุบัติเหตุ
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="navBar__sub-menu-font"
                  href="/ViewAnimal"
                >
                  เกี่ยวกับสัตว์
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="navBar__sub-menu-font"
                  href="/ViewEducation"
                >
                  การศึกษา
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="navBar__sub-menu-font"
                  href="/ViewOthers"
                >
                  อื่นๆ
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link className="navBar__menu-font" href="/AboutUs">
                เกี่ยวกับเรา
              </Nav.Link>
            </Nav>
            <Nav className="mr">
              <Form inline>
                <Icon className="fa fa-search" />
                <FormControl
                  type="text"
                  placeholder="ค้นหา"
                  className="mr-sm-2"
                  onChange={() => (window.location.href = "/Search")}
                />
              </Form>
            </Nav>
            <Nav className="mr">
              <Button className="navBar__menu-font" href="/SignIn">
                เข้าสู่ระบบ
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
