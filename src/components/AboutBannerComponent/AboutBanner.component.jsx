import React from "react";
import "./AboutBanner.styles.scss";
import { Button } from "reactstrap";

const AboutBanner = () => {
  const bannerUrl =
    "https://www.thehindu.com/business/companies/Chinas-ZWZ-Bearings-plans-unit-in-India/article15595410.ece";

  const handleBannerClick = (url) => {
    window.open(url, "_blank");
  };
  return (
    <div className="about-banner-div">
      <div className="about-banner-first-section">
        <div className="about-heading">
          <h5>
            <strong>ZWZ Bearings India Private Limited</strong>
          </h5>
        </div>
        <div>
          <p className="about-text">
            ZWZ Bearings India Private Limited was established in 2010 in
            collaboration with Wafangdian Bearing Co. Ltd. to promote and market
            the products of ZWZ within the Indian market. The company was
            established under the direction of the Chairman of Wafangdian
            Bearing Group Ltd and the inaugaration of the company was done by
            the General Manager of ZWZ and the Honorable Consul General of
            People's Republic of China during the visit of the chinese Premier
            Wen Jiabao to India.
          </p>
          <div>
            <Button
              color="primary"
              onClick={() => handleBannerClick(bannerUrl)}
            >
              Know More
            </Button>
          </div>
        </div>
      </div>
      <div className="about-banner-second-section">
        <img
          className="about-banner-image"
          src={require("~/assets/NewImages/BannerImage/AboutUsBanner.png")}
          alt="BannerImage"
        />
      </div>
    </div>
  );
};

export default AboutBanner;
