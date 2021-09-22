import React from "react";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";
import "./EmailSubscription.styles.scss";

const EmailSubscription = () => {
  return (
    <div className="container email-subscription-div">
      <div className="email-subscription-text">
        Be the first to hear about our latest Products, news, sale previews and
        much more!
      </div>
      <InputGroup
        style={{
          width: "35%",
          margin: "20px auto 0 auto",
          minWidth: "fit-content",
        }}
      >
        <Input
          style={{
            borderRadius: "25px 0 0 25px",
            padding: "25px 0px 25px 30px",
            color: "#7e7e7e",
            border: "0",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.14), 0 6px 20px 0 rgba(0, 0, 0, 0.12)",
          }}
          placeholder="Enter Your Email Here!"
        />
        <InputGroupAddon addonType="append">
          <InputGroupText
            style={{
              background:
                "linear-gradient(90deg, rgba(12,98,159,1) 0%, rgba(26,87,140,1) 51%, rgba(81,44,68,1) 94%)",
              color: "white",
              fontSize: "13px",
              fontWeight: "bold",
              borderRadius: "0 25px 25px 0",
              paddingLeft: "25px",
              paddingRight: "25px",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.14), 0 6px 20px 0 rgba(0, 0, 0, 0.12)",
              border: "0",
            }}
          >
            SUBSCRIBE
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <div className="email-icon-div">
        <img
          src={require("~/assets/NewImages/Icons/img_489898.png")}
          alt="icon"
        />
      </div>
    </div>
  );
};

export default EmailSubscription;
