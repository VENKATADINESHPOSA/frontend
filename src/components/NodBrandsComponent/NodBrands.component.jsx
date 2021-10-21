import React from "react";
import "./NodBrands.styles.scss";
import { Row, Col, Button } from "reactstrap";

const NodBrandsSection = () => {
  return (
    <div className="nod-brands-section">
      <div style={{ paddingTop: "30px" }}>
        <h4
          style={{ color: "#0c629f", textAlign: "center", fontWeight: "bold" }}
        >
          Brands
        </h4>
      </div>
      <div
        style={{
          padding: "20px 0px 40px 0px",
          marginLeft: "6%",
          marginRight: "6%",
        }}
      >
        <Row>
          <Col sm>
            <img
              className="koyo-image"
              alt="koyo-pic"
              style={{ width: "75%", paddingTop: "13px" }}
              src={require(`~/assets/NewImages/brands/koyo.png`)}
            />
          </Col>
          <Col sm>
            <img
              className="dpi-image"
              alt="dpi-pic"
              style={{ width: "75%", paddingTop: "10px" }}
              src={require(`~/assets/NewImages/brands/dpi.png`)}
            />
          </Col>
          <Col sm>
            <img
              className="zwz-image"
              alt="zwz-pic"
              style={{ width: "75%", marginLeft: "13px" }}
              src={require(`~/assets/NewImages/brands/zwz.png`)}
            />
          </Col>
          <Col sm>
            <img
              className="iko-image"
              alt="iko-pic"
              style={{ width: "75%", paddingTop: "20px", marginLeft: "15px" }}
              src={require(`~/assets/NewImages/brands/iko.png`)}
            />
          </Col>
          <Col sm>
            <img
              className="wzwn-image"
              alt="wzwn-pic"
              style={{ width: "90%", paddingTop: "20px", marginLeft: "25px" }}
              src={require(`~/assets/NewImages/brands/wzwn.png`)}
            />
          </Col>
        </Row>
      </div>
      <div
        style={{ paddingBottom: "30px", marginLeft: "7%", marginRight: "7%" }}
      >
        <Row>
          <Col
            sm
            style={{
              backgroundColor: "white",
              borderRadius: "5px",
              marginRight: "5px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <img
                className="user-image"
                alt="user-icon"
                style={{ width: "20%", padding: "20px" }}
                src={require(`~/assets/NewImages/Icons/user.png`)}
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "#949494", fontSize: "smaller" }}>
                Actual users / Original equipment manufacturers can sign up with
                us to get a dedicated manager and direct support.
              </p>
            </div>
            <div style={{ textAlign: "center", paddingBottom: "20px" }}>
              <Button color="primary" style={{ textTransform: "none" }}>
                Sign Up
              </Button>
            </div>
          </Col>
          <Col
            sm
            style={{
              backgroundColor: "white",
              borderRadius: "5px",
              marginLeft: "5px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <img
                className="joinus-image"
                alt="joinus-icon"
                style={{ width: "20%", padding: "20px" }}
                src={require(`~/assets/NewImages/Icons/joinus.png`)}
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "#949494", fontSize: "smaller" }}>
                Interested in servicing our customers. Join us as an authorised
                channel partner to get access to reseller pricing and services.
              </p>
            </div>
            <div style={{ textAlign: "center", paddingBottom: "20px" }}>
              <Button color="primary" style={{ textTransform: "none" }}>
                Join Now
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default NodBrandsSection;
