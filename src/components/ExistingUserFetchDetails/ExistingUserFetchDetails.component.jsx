import React, { useState } from "react";
import { Button, Row, Col } from "reactstrap";
import logo from "~/assets/images/zwz-log-logo.png";
import NodLogo from "~/assets/images/trans_nod_logo.png";
import axios from "axios";
import { zwzapiurl, nodapiurl } from "../../urls.json";

const defaultValues = {
  GSTNumber: "",
  CustomerId: "",
};

const hostname = window.location.hostname;

const nodLogo =
  hostname === "store.nodbearings.net" || hostname === "localhost"
    ? true
    : false;

const gstVal = new RegExp(
  "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$"
);

const ExistingUserFetchDetails = (props) => {
  const [formValues, setFormValues] = useState(defaultValues);
  const [gsterror, setgsterror] = useState(false);
  const [error, setError] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [oldEmail, setOldEmail] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formValues.CustomerId !== "" && formValues.GSTNumber !== "") {
      setError(false);
      console.log(formValues);
      gstVal.test(formValues.GSTNumber) === false
        ? setgsterror(true)
        : setgsterror(false);

      if (gsterror === false) {
        if (hostname === "store.zwz.co.in") {
          const response = await axios(
            zwzapiurl + "authentication/user/exsignup/",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              data: {
                GSTNumber: formValues.GSTNumber,
                CustomerId: formValues.CustomerId,
              },
            }
          );
          console.log(response.data);
          if (response.data.success == true) {
            setCompanyName(response.data.company_name);
            setOldEmail(response.data.email);
            localStorage.setItem("GSTIN", formValues.GSTNumber);
            localStorage.setItem("CustomerId", formValues.CustomerId);
            localStorage.setItem("DBCompanyName", response.data.company_name);
            props.history.push("/existingCustomerSignUp");
          } else {
            alert(response.data.message);
          }
        } else {
          const response = await axios(
            nodapiurl + "authentication/user/exsignup/",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              data: {
                GSTNumber: formValues.GSTNumber,
                CustomerId: formValues.CustomerId,
              },
            }
          );
          console.log(response.data);
          if (response.data.success == true) {
            setCompanyName(response.data.company_name);
            setOldEmail(response.data.email);
            localStorage.setItem("GSTIN", formValues.GSTNumber);
            localStorage.setItem("CustomerId", formValues.CustomerId);
            localStorage.setItem("DBCompanyName", response.data.company_name);
            props.history.push("/existingCustomerSignUp");
          } else {
            alert(response.data.message);
          }
        }
      }
      setFormValues(defaultValues);
    } else {
      setError(true);
    }
  };

  return (
    <div className="content_container" style={{ marginTop: 175 }}>
      <Row>
        {nodLogo ? (
          <Col sm={12} xs={12} md={12} lg={12} className="logo_img_container">
            <img
              src={NodLogo}
              alt="Logo"
              className="logo_img"
              style={{ width: "100px" }}
            />
          </Col>
        ) : (
          <Col sm={12} xs={12} md={12} lg={12} className="logo_img_container">
            <img src={logo} alt="Logo" className="logo_img" />
          </Col>
        )}

        <Col sm={12} xs={12} md={12} lg={12} className="login_title_container">
          <h1 className="login_title_text"> Existing Customer Registration </h1>
        </Col>

        <Col sm={12} xs={12} md={12} lg={12} className="login_title_container">
          <p className="login_subtitle_container">
            Please obtain your customer ID from your account manager. If you
            need assistance, Please email us at <span> </span>
            {hostname === "store.zwz.co.in" ? (
              <b>sales.csc@zwz.co.in</b>
            ) : (
              <b>sales.csc@nodbearings.net</b>
            )}
          </p>
        </Col>

        <Col
          sm={12}
          xs={12}
          md={12}
          lg={12}
          className="login_subtitle_container"
        >
          <div className="login_detail_container">
            {error && (
              <p style={{ color: "red", fontSize: "small" }}>
                Please enter all fields
              </p>
            )}
            <input
              type="text"
              style={{ marginBottom: 6 }}
              name="GSTNumber"
              placeholder="GSTIN Number"
              value={formValues.GSTNumber}
              onChange={handleInputChange}
              autoComplete="off"
              required
            />
            {gsterror && (
              <p style={{ color: "red", fontSize: "small" }}>
                Please enter valid gst number
              </p>
            )}

            <input
              type="text"
              style={{ marginTop: 25 }}
              name="CustomerId"
              placeholder="Customer Id"
              value={formValues.CustomerId}
              onChange={handleInputChange}
              autoComplete="off"
              required
            />
            <Button color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ExistingUserFetchDetails;
