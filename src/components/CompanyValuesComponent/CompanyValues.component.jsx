import React from "react";
import { Row, Col } from "reactstrap";
import data from "./Values.json";
import "./CompanyValues.styles.scss";

const CompanyValues = () => {
  return (
    <div className="container company-values-div">
      <Row>
        {data.map(({ id, name, imgurl }) => {
          return (
            <Col key={id} sm="3">
              <div>
                <img
                  className="company-values-img"
                  src={require(`~/assets/NewImages/ValuesImages/${imgurl}`)}
                  alt={name}
                />
              </div>
            </Col>
          );
        })}
      </Row>
      <div className="company-values-row">
        <img
          className="company-values-img"
          src={require("~/assets/NewImages/CautionImage/Fake.png")}
          alt="Fake"
        />
      </div>
    </div>
  );
};

export default CompanyValues;
