import React from "react";
import { Navbar, Nav, NavDropdown, Form, FormControl } from "react-bootstrap";
import Icon from "@material-ui/core/Icon";

export default function NavBarFundraiser() {
  return (
    <div>
      <Navbar className="navBar__container">
        <Nav.Link href="/">
          <Navbar.Brand className="navBar__brand-name">Sharitys</Navbar.Brand>
        </Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Nav.Link className="navBar__menu-font-fundraiser" href="/">
              หน้าแรก
            </Nav.Link>

            <Nav.Link className="navBar__menu-font-fundraiser" href="/Blog">
              บทความชี้แนะ
            </Nav.Link>
            <NavDropdown className="navBar__menu-font" title="จัดการโครงการ">
              <NavDropdown.Item
                className="navBar__sub-menu-font"
                href="/ManageProject"
              >
                โครงการของคุณ
              </NavDropdown.Item>
              <NavDropdown.Item
                className="navBar__sub-menu-font"
                href="/CreateProject"
              >
                สร้างโครงการ
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link className="navBar__menu-font-fundraiser" href="/AboutUs">
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
