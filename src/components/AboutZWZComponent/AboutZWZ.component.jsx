import React from "react";
import "./AboutZWZ.styles.scss";

const ZWZChina = () => {
  return (
    <div className="zwz-china-div">
      <div className="zwz-china-first-section">
        <img
          className="zwz-china-pic"
          src={require("~/assets/NewImages/BannerImage/ZWZ_China.png")}
          alt="ZWZ_China_Pic"
        />
      </div>
      <div className="zwz-china-second-section">
        <div className="zwz-china-heading">
          <h5>
            <strong>ZWZ China</strong>
          </h5>
          <p className="zwz-china-text">
            ZWZ is the trademark of Wafangdian Bearing Group Co. Ltd. ZWZ is the
            largest domestic bearing manufacturer in china and #1 Bearing
            manufacturer in the Country for Industtrial Bearings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ZWZChina;
