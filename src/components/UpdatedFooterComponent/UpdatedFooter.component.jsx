import React from "react";
import { useState } from "react";
import { Col, Row } from "reactstrap";
import "./UpdatedFooter.styles.scss";
import Modal from "../FooterModalComponent/FooterModal.component";
import DisclaimerPDF from "../../assets/documents/Disclaimer.pdf";
import PrivacyPolicyPDF from "../../assets/documents/PrivacyPolicy.pdf";
import TermsAndConditionsPDF from "../../assets/documents/TermsAndConditons.pdf";

const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  const [pdf, setPdf] = useState(null);

  const handleClick = (pdf) => {
    setShowModal(true);
    setPdf(pdf);
  };

  return (
    <div className="footer-div">
      <div className="footer-inner-div">
        <Row>
          <Col sm>
            <img
              className="zwz-logo"
              src={require("~/assets/NewImages/Logo/zwz_logo.png")}
              alt="logo"
            />
          </Col>
          <Col sm>
            <ul className="page-list">
              <li>Home</li>
              <li>About Us</li>
              <li>RFI</li>
              <li>Orders</li>
              <li>Account</li>
            </ul>
          </Col>
          <Col sm>
            <strong className="company-name">
              ZWZ Bearings India Pvt. Ltd.
            </strong>
            <Row style={{ padding: "5px 0" }}>
              <Col sm="2" style={{ maxWidth: "11%", paddingTop: "2%" }}>
                <img
                  src={require("~/assets/NewImages/Icons/address.png")}
                  alt="address"
                />
              </Col>
              <Col sm="10" style={{ fontSize: "14px", color: "#7e7e7e" }}>
                615 Raheja Chambers 213 Nariman Point Mumbai, Maharashtra
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
                +91 22 22824239
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
                sales@zwz.co.in
              </Col>
            </Row>
          </Col>
          <Col sm>
            <ul className="page-list">
              <li>Mumbai</li>
              <li>Delhi</li>
              <li>Chennai</li>
              <li>Kolkata</li>
              <li>Ahmedabad</li>
            </ul>
          </Col>
          <Col sm>
            <ul className="page-list">
              <li
                className="hover-pointer"
                onClick={() => handleClick(DisclaimerPDF)}
              >
                Disclaimer
              </li>
              <li
                className="hover-pointer"
                onClick={() => handleClick(PrivacyPolicyPDF)}
              >
                Privacy Policy
              </li>
              <li
                className="hover-pointer"
                onClick={() => handleClick(TermsAndConditionsPDF)}
              >
                Terms & Conditions
              </li>
            </ul>
          </Col>
        </Row>
      </div>
      <Modal onClose={() => setShowModal(false)} show={showModal} pdf={pdf} />
    </div>
  );
};

export default Footer;
