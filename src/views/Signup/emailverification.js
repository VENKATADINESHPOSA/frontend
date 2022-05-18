import React, { Component } from "react";
import "./styles.scss";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import logo from "~/assets/images/zwz-log-logo.png";
import { Button, Row, Col, Modal } from "reactstrap";
import axios from "axios";
import NodLogo from "~/assets/images/trans_nod_logo.png";
import { zwzurl, zwzapiurl, nodurl, nodapiurl } from "../../urls.json";

let hostname = window.location.hostname;
var baseURL = localStorage.getItem("url");
var LOGO = "";
var nodlogo = false;
if (hostname == "store.zwz.co.in") {
  LOGO = logo;
  nodlogo = false;
} else {
  LOGO = NodLogo;
  nodlogo = true;
}

class Emailverification extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.emailverify = this.SetEmail.bind(this);
    this.onclickResendemail = this.onclickResendemail.bind(this);

    this.state = {
      api_url: "",
      email_verification: "",
    };
  }

  handleChange(e) {
    var newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  async onclickResendemail(e) {
    var baseurl = sessionStorage.getItem("url");
    if (
      window.location.href === zwzurl + "signup#" ||
      window.location.href === zwzurl + "signup" ||
      hostname === "store.zwz.co.in"
    ) {
      this.state.api_url = zwzapiurl + "authentication/resend_email/";
    } else if (
      window.location.href === "https://store.nodbearings.net/signup#" ||
      window.location.href === "https://store.nodbearings.net/signup" ||
      window.location.href === "https://localhost:3000/login#" ||
      window.location.href === "https://localhost:3000/login" ||
      hostname === "store.nodbearings.net"
    ) {
      this.state.api_url =
        " https://api.store.nodbearings.net/authentication/resend_email/";
    } else {
      this.state.api_url = zwzapiurl + "authentication/resend_email/";
    }
    var email = localStorage["emailforverification"];
    var url = this.state.api_url;
    const response = await axios(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        email: email,
      },
    });
    //console.log(response);
    if (response.data.success == true) {
      alert("Email sent sucessfully to your registered email ID.");
    } else {
      alert(response.data.message);
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.emailverify();
  }

  SetEmail() {
    this.setState({
      email_verification: localStorage.getItem("emailforverification"),
    });
  }
  render() {
    const {} = this.state;
    return (
      <div className="main_container_signup">
        <Header {...this.props}> </Header>

        <div className="content_container" style={{ marginTop: 175 }}>
          <Row>
            {!nodlogo ? (
              <Col
                sm={12}
                xs={12}
                md={12}
                lg={12}
                className="logo_img_container"
              >
                <img src={LOGO} alt="Logo" className="logo_img" />
              </Col>
            ) : (
              <Col
                sm={12}
                xs={12}
                md={12}
                lg={12}
                className="logo_img_container"
              >
                <img
                  src={LOGO}
                  alt="Logo"
                  style={{ width: 80, height: 80 }}
                  className="logo_img"
                />
              </Col>
            )}
          </Row>
          <br />
          <Row>
            <Col sm={12} xs={12} md={12} lg={12}>
              <div
                className="login_detail_container"
                style={{ textAlign: "center" }}
              >
                <h2
                  style={{
                    color: "#0072bc",
                    textAlign: "center",
                    fontSize: "23px",
                  }}
                >
                  Email Verification
                </h2>
                <p style={{ marginTop: "1rem" }}>
                  This action requires email verification.
                </p>
                <p>Please check your inbox and follow the instruction.</p>

                <p>
                  Email sent to :{" "}
                  <span
                    style={{ color: "#0072bc" }}
                    className="email_for_verification"
                  >
                    {this.state.email_verification}
                  </span>
                </p>
                <div className="otp_container">
                  <input
                    type="button"
                    value="Resent Email"
                    className="login_btn"
                    onClick={this.onclickResendemail}
                    style={{ width: "60%" }}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <Footer> </Footer>
      </div>
    );
  }
}
export default Emailverification;
