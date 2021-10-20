import React from "react";
import "./aboutUsNod.styles.scss";
import { Button } from "reactstrap";
const AboutUsNod = () => {
  return (
    <div className="nod-about-us-div">
      <h4 className="nod-about-us-heading">About Us</h4>
      <p className="nod-about-us-text">
        Welcome to our Webstore. India's first authorised national distributor
        with an integrated online webstore. We are celebrating over 50 years
        with Koyo and working to bring several other engineering products to
        your doorstep 24 x 7 in the future. Please sign up and find what you are
        looking for.
      </p>
      <div className="nod-about-us-button-div">
        <Button color="primary" style={{ textTransform: "none" }}>
          Know More
        </Button>
      </div>
    </div>
  );
};

export default AboutUsNod;
