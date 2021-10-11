import React from "react";
import { Row, Col } from "reactstrap";
import "./AboutZWZ.styles.scss";

const ZWZChina = () => {
  return (
    <Row>
      <Col sm={9} style={{ padding: "0px" }}>
        <img
          src={require("~/assets/NewImages/BannerImage/ZWZ_China.png")}
          alt="ZWZ_China_Pic"
          style={{ width: "100%", height: "100%" }}
        />
      </Col>
      <Col
        sm={3}
        style={{
          backgroundImage:
            "linear-gradient(to right top, #0c629f, #105990, #135082, #144774, #143f66)",
        }}
      >
        <div style={{ margin: "10%", color: "#fefefe", paddingTop: "40px" }}>
          <h4>
            <strong>ZWZ China</strong>
          </h4>
          <p style={{ fontSize: "medium", color: "#ecf2f6" }}>
            ZWZ is the trademark of Wafangdian Bearing Group Co. Ltd. ZWZ is the
            largest domestic bearing manufacturer in china and #1 bearing
            manufacturer in the country for industrial bearings.
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default ZWZChina;
