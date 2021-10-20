import React from "react";
import { Col, Row } from "reactstrap";
import "./FooterNod.styles.scss";

const FooterNod = () => {
  return (
    <div className="footer-div">
      <div className="footer-inner-div">
        <Row>
          <Col sm>
            <img
              className="nod-logo"
              src={require("~/assets/NewImages/Logo/nod_logo.png")}
              alt="logo"
            />
          </Col>
          <Col sm>
            <ul className="page-list">
              <li>Home</li>
              <li>About Us</li>
              <li>Products</li>
              <li>Contact Us</li>
            </ul>
          </Col>
          <Col sm>
            <strong className="company-name">NOD Bearings Pvt. Ltd.</strong>
            <Row style={{ padding: "5px 0" }}>
              <Col sm="2" style={{ maxWidth: "11%", paddingTop: "2%" }}>
                <img
                  src={require("~/assets/NewImages/Icons/address.png")}
                  alt="address"
                />
              </Col>
              <Col sm="10" style={{ fontSize: "14px", color: "#7e7e7e" }}>
                615 Raheja Chambers 213 Nariman Point, Mumbai, Maharashtra.
              </Col>
            </Row>
            <Row style={{ padding: "5px 0" }}>
              <Col sm="2" style={{ maxWidth: "11%", fontSize: "13px" }}>
                <img
                  src={require("~/assets/NewImages/Icons/phone.png")}
                  alt="address"
                />
              </Col>
              <Col
                sm="10"
                style={{
                  fontSize: "13px",
                  margin: "auto 0",
                  color: "#7e7e7e",
                }}
              >
                +9714 - 8814100
              </Col>
            </Row>
            <Row style={{ padding: "5px 0" }}>
              <Col sm="2" style={{ maxWidth: "11%", fontSize: "13px" }}>
                <img
                  src={require("~/assets/NewImages/Icons/email.png")}
                  alt="email"
                />
              </Col>
              <Col sm="10" className="email-item">
                sales@gulfworldwide.com
              </Col>
            </Row>
          </Col>
          <Col sm>
            <ul className="page-list">
              <li className="hover-pointer">Disclaimer</li>
              <li className="hover-pointer">Privacy Policy</li>
              <li className="hover-pointer">Terms & Conditions</li>
            </ul>
          </Col>
          <Col sm>
            <span style={{marginLeft:"20px"}}>
              <img
                src={require("~/assets/NewImages/Icons/linkedin.png")}
                alt="linkedin"
              />
            </span>
            <span style={{marginLeft:"10px"}}>
              <img
                src={require("~/assets/NewImages/Icons/watsapp.png")}
                alt="watsapp"
              />
            </span>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FooterNod;
