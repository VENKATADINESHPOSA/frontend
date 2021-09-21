import React from "react";
import { Row } from "reactstrap";
import "./BannerImage.styles.scss";

const BannerImage = () => {
  return (
    <Row>
      <img
        className="banner-image"
        alt="pic"
        src={require(`~/assets/NewImages/BannerImage/BannerImage.png`)}
      />
    </Row>
  );
};

export default BannerImage;
