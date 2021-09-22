import React from "react";
import { useState } from "react";
import { Col, Row } from "reactstrap";
import "./ManufacturingZones.styles.scss";
import content from "./zonesContent.json";

const ManufacturingZones = () => {
  const firstThreeZones = content.filter(
    ({ id }) => id === 1 || id === 2 || id === 3
  );
  const secondThreeZones = content.filter(
    ({ id }) => id === 4 || id === 5 || id === 6
  );

  const [renderedArray, setRenderedArrray] = useState(firstThreeZones);
  const [activeCircle, setActiveCircle] = useState(1);

  const handleClick = (arrayToBeRendered, activedot) => {
    setRenderedArrray(arrayToBeRendered);
    setActiveCircle(activedot);
  };

  return (
    <div className="manufacturing-zones-div">
      <Row>
        <Col sm={3}>
          <div>
            <img
              className="manufacturing-zones-icon"
              src={require("~/assets/NewImages/Icons/icon-power.png")}
              alt="icon-power-pic"
            />
          </div>
          <div className="zones-heading-div">
            <h5 className="zones-heading">
              <strong>ZWZ Manufacturing Zones</strong>
            </h5>
            <p className="zones-text">
              ZWZ manufacturing facilities are spread over 6 Industrial Zones in
              China. There are 22 production plants within these 6 zones. The
              six zones are as follows.
            </p>
          </div>
        </Col>
        {renderedArray.map(({ heading, content }) => (
          <Col className="zones-item-col" sm={3}>
            <div className="zones-background-div">
              <div className="zones-items-name">
                <h5>
                  <strong>{heading}</strong>
                </h5>
                <p className="zones-items-text">{content}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
      <div className="dots-div">
        <span
          className={activeCircle === 1 ? "active-slide" : "in-active-slide"}
          onClick={() => handleClick(firstThreeZones, 1)}
        ></span>
        <span
          className={activeCircle === 2 ? "active-slide" : "in-active-slide"}
          onClick={() => handleClick(secondThreeZones, 2)}
        ></span>
      </div>
    </div>
  );
};

export default ManufacturingZones;
