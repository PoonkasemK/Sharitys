import React from "react";
import { Navbar, Nav, NavDropdown, Form, FormControl } from "react-bootstrap";
import Icon from "@material-ui/core/Icon";

export default function NavBarAdmin() {
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
            <NavDropdown className="navBar__menu-font" title="จัดการโครงการ">
              <NavDropdown.Item
                className="navBar__sub-menu-font"
                href="/ApproveProject"
              >
                อนุมัติโครงการที่ยื่นใหม่
              </NavDropdown.Item>
              <NavDropdown.Item
                className="navBar__sub-menu-font"
                href="/ManageProject"
              >
                จัดการโครงการทั้งหมด
              </NavDropdown.Item>
              <NavDropdown.Item
                className="navBar__sub-menu-font"
                href="/TerminateExpProject"
              >
                ยุติโครงการที่ถึงกำหนด
              </NavDropdown.Item>
              <NavDropdown.Item
                className="navBar__sub-menu-font"
                href="/TerminateReqProject"
              >
                ยุติโครงการตามคำขอ
              </NavDropdown.Item>
              <NavDropdown.Item
                className="navBar__sub-menu-font"
                href="/SetUrgentAd"
              >
                ตั้งโครงการเร่งด่วน
              </NavDropdown.Item>
            </NavDropdown>
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
}
