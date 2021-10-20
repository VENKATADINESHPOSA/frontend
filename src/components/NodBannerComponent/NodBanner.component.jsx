import React from "react";
import { Row } from "reactstrap";
import "./nodBanner.styles.scss";
const NodBannerImage = () => {
    return (
      <Row className="nod-banner-item">
        <img
          className="nod-banner-image"
          alt="pic"
          src={require(`~/assets/NewImages/BannerImage/NodBannerImage.png`)}
        />
      </Row>
    );
  };
  
  export default NodBannerImage;