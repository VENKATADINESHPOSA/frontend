import React from "react";
import "./DpiDescription.styles.scss";

const DpiDescription = () => {
  return (
    <div className="dpi-description-div">
      <h1 className="dpi-page-heading">DPI</h1>
      <p className="dpi-page-text">
        NOD Bearings Pvt. Ltd. are the Owners, Manufacturers and Exclusive
        Distributors Worldwide for DPI Bearings.
      </p>
      <p className="dpi-page-text">For further information Please visit :</p>
      <div
        style={{ textAlign: "center", fontWeight: "bold", fontSize: "x-large" }}
      >
        <a
          href="https://dpibearings.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.dpibearings.com
        </a>
      </div>
    </div>
  );
};

export default DpiDescription;
