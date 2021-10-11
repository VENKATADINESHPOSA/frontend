import React, { useState } from "react";
import "./AboutBanner.styles.scss";
import { Button, Row, Col } from "reactstrap";
// import Modal from "../FooterModalComponent/FooterModal.component";
import ZWZIndiaHindu from "../../assets/documents/zwz_india_hindu.pdf";

const AboutBanner = () => {
  // const [showModal, setShowModal] = useState(false);
  // const [pdf, setPdf] = useState(null);
  // const bannerUrl =
  //   "https://www.thehindu.com/business/companies/Chinas-ZWZ-Bearings-plans-unit-in-India/article15595410.ece";

  // const handleBannerClick = (url) => {
  //   window.open(url, "_blank");
  // };

  // const handleClick = (pdf) => {
  //   setShowModal(true);
  //   setPdf(pdf);
  // };
  return (
    <div className="about-banner">
      <Row>
        <Col sm="6">
          <div className="about-banner-first-section">
            <div className="about-heading">
              <h4>
                <strong>ZWZ Bearings India Private Limited</strong>
              </h4>
            </div>
            <div>
              <p className="about-text">
                ZWZ Bearings India Private Limited was established in 2010 in
                collaboration with Wafangdian Bearing Co. Ltd. to promote and
                market the products of ZWZ within the Indian market. The company
                was established under the direction of the Chairman of
                Wafangdian Bearing Group Ltd and the inaugaration of the company
                was done by the General Manager of ZWZ and the Honorable Consul
                General of People's Republic of China during the visit of the
                chinese Premier Wen Jiabao to India.
              </p>
              <div>
                <a
                  href={ZWZIndiaHindu}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    color="primary"
                    // onClick={() => handleBannerClick(bannerUrl)}
                    // onClick={() => handleClick(ZWZIndiaHindu)}
                  >
                    Know More
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </Col>
        <Col sm="6">
          {" "}
          <img
            className="banner-image-about"
            src={require("~/assets/NewImages/BannerImage/AboutUsBanner.png")}
            alt="BannerImage"
          />
        </Col>
      </Row>
      {/* <Modal onClose={() => setShowModal(false)} show={showModal} pdf={pdf} /> */}
    </div>
  );
};

export default AboutBanner;
