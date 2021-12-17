import React from "react";
import "./WzwnDescription.styles.scss";
const WzwnDescription = () => {
  return (
    <div className="wzwn-description-div">
      <h1 className="wzwn-page-heading">WZWN</h1>
      <p className="wzwn-page-text">
        NOD Bearings Pvt. Ltd. are the authorised distributors Worldwide for
        WZWN Bearings.
      </p>
      <p className="wzwn-page-text">For further information Please visit :</p>
      <div
        style={{ textAlign: "center", fontWeight: "bold", fontSize: "x-large" }}
      >
        <a
          href="https://www.wzwn.com/en/login.jsp?errno=13&url=https%3A%2F%2Fwww.wzwn.com%2Fen%2F"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.wzwn.com
        </a>
      </div>
    </div>
  );
};

export default WzwnDescription;
