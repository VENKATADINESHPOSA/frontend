import React from "react";
import "./zwzDescription.styles.scss";

const ZwzDescription = () => {
  return (
    <div className="zwz-description-div">
      <h1 className="zwz-page-heading">ZWZ</h1>
      <p className="zwz-page-text">
        NOD Bearings Pvt. Ltd. are the authorised distributors Worldwide for ZWZ
        Bearings.
      </p>
      <p className="zwz-page-text">For further information Please visit :</p>
      <div
        style={{ textAlign: "center", fontWeight: "bold", fontSize: "x-large" }}
      >
        <a href="https://zwz.co.in/" target="_blank" rel="noopener noreferrer">
          https://zwz.co.in/
        </a>
      </div>
    </div>
  );
};

export default ZwzDescription;
