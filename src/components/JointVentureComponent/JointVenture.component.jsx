import React from "react";
import "./JointVenture.styles.scss";
import { Col, Row } from "reactstrap";
import VentureContent from "./ventureData.json";

const JointVenture = () => {
  const handleClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="joint-venture-div">
      <Row className="joint-venture-row">
        <Col sm={3}>
          <div>
            <img
              className="venture-icon-pic"
              src={require("~/assets/NewImages/Icons/venture.png")}
              alt="icon-venture-pic"
            />
          </div>
          <h5 className="venture-heading">
            <strong>Joint Venture</strong>
          </h5>
          <div>
            <img
              className="venture-icon"
              src={require("~/assets/NewImages/Icons/Group 348.png")}
              alt="venture-icon-pic"
            />
          </div>
        </Col>
        {VentureContent.map(({ imgurl, heading, content, url }) => (
          <Col className="venture-company-names" sm={3}>
            <div className="venture-company-card">
              <img
                className="venture-images"
                src={require(`~/assets/NewImages/VentureImages/${imgurl}`)}
                alt="company-pic"
              />
              <div className="venture-name">
                <h5>
                  <strong>{heading}</strong>
                </h5>
                <p className="venture-text">{content}</p>
              </div>
              <div className="know-more-div" onClick={() => handleClick(url)}>
                <strong>Know More &#8594;</strong>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default JointVenture;
