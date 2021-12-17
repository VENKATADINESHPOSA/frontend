import React, { Component } from "react";
import "./styles.scss";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { Button, Row, Col } from "reactstrap";
import logo from "~/assets/images/zwz-log-logo.png";
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

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.onForgotPassword = this.onForgotPassword.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.verifyUser = this.verifyUser.bind(this);
    this.submitOtp = this.submitOtp.bind(this);

    this.state = {
      showNewPassword: false,
      verifyDetails: false,
      showText: "",
      showTextError: "",
      notVerified: false,
      showOTPContainer: false,
      hide_email_verification: true,
      showPasswordContainer: false,
    };
  }

  verifyUser() {
    var ref = this;
    if (
      window.location.href === zwzurl + "forget-password#" ||
      window.location.href === zwzurl + "forget-password"
    ) {
      var url = zwzapiurl + "authentication/check_user/";
    } else if (
      window.location.href ===
        "https://store.nodbearings.net/forget-password#" ||
      window.location.href === "https://store.nodbearings.net/forget-password"
    ) {
      var url = "https://api.store.nodbearings.net/authentication/check_user/";
    } else {
      var url = zwzapiurl + "authentication/check_user/";
    }

    axios
      .post(
        url,
        {
          db_type: "zwz",
          user_name: this.state.username,
        },
        {
          "Content-Type": "application/json",
        }
      )
      .then(function (response) {
        console.log(response);

        if (response.data.success === true) {
          ref.setState({
            showOTPContainer: true,
            notVerified: false,
            hide_email_verification: false,
            showPasswordContainer: false,
            showText: "Email Validated",
          });

          console.log(ref.state.verifyDetails);
        } else {
          ref.setState({
            notVerified: true,
            showTextError: "Email doesn't exist",
            showOTPContainer: false,
            showPasswordContainer: false,
            hide_email_verification: true,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        ref.setState({
          error: "Invalid username and/or password",
        });
      });
  }

  submitOtp() {
    var ref = this;
    if (
      window.location.href === zwzurl + "forget-password#" ||
      window.location.href === zwzurl + "forget-password"
    ) {
      var url = zwzapiurl + "authentication/otp/verification/";
    } else if (
      window.location.href ===
        "https://store.nodbearings.net/forget-password#" ||
      window.location.href === "https://store.nodbearings.net/forget-password"
    ) {
      var url = zwzapiurl + "authentication/otp/verification/";
    } else {
      var url = zwzapiurl + "authentication/otp/verification/";
    }

    axios
      .post(
        url,
        {
          email: this.state.username,
          otp: this.state.otp,
        },
        {
          "Content-Type": "application/json",
        }
      )
      .then(function (response) {
        console.log(response);

        if (response.data.success === true) {
          ref.setState({
            showOTPContainer: false,
            notVerified: false,
            hide_email_verification: false,
            showPasswordContainer: true,
            showText: "Email Validated",
          });

          console.log(ref.state.verifyDetails);
        } else {
          ref.setState({
            notVerified: true,
            showTextError: "Please Enter Valid OTP",
            showOTPContainer: true,
            showPasswordContainer: false,
            hide_email_verification: false,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        ref.setState({
          error: "Invalid username and/or password",
        });
      });
  }

  onEmailChange(e) {
    var newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);

    /*if (event.key === 'Enter') {
			
			saveValue = event.target.value;
			console.log(event.target.value);
			console.log(saveValue);
			sessionStorage.setItem('usernameVal',saveValue);

			console.log(sessionStorage.getItem('usernameVal'));

			var ref = this;
		   	 ref.setState({
		   	 	emailVal: "vhhbjj"
		   	 })
		    console.log(ref.state.emailVal);

		    axios.post(zwzapiurl + 'authentication/check_user/', {
		    	db_type: "zwz",
		        user_name: event.target.value,

		    }, {
		    	'Content-Type': 'application/json',
		    })
		    .then(function (response) {
		    	console.log(response);

		    	if (response.data.success === true) {
		    		ref.setState({
		    			verifyDetails: true,
		    			showText: "Email Validated"
		    		})

		    		console.log(ref.state.verifyDetails);

		    	} else{
		    		ref.setState({
		    			notVerified: true,
		    			showTextError: "Please Enter Valid Email"
		    		})
	    	}
	    	})
			    .catch(function (error) {
			      console.log(error);
			      ref.setState({
			        error: "Invalid username and/or password"
			      })
		    });

      
    	}

		*/

    /* var ref = this;
	   	 ref.setState({
	   	 	emailVal: "vhhbjj"
	   	 })
	    console.log(ref.state.emailVal);

	    axios.post('https://apigwd.prtouch.com/authentication/check_user/', {
	    	db_type: sessionStorage.getItem('loginType'),
	        user_name: e.target.value,

	    }, {
	    	'Content-Type': 'application/json',
	    })
	    .then(function (response) {
	    	console.log(response);

	    	if (response.data.success === true) {
	    		ref.setState({
	    			verifyDetails: true,
	    			showText: "Email Validated"
	    		})

	    		console.log(ref.state.verifyDetails);

	    	} else{
	    		ref.setState({
	    			notVerified: true,
	    			showText: "Invalid Email"
	    		})
	    	}*/

    /*if (response.data.success == true){
	      	console.log('true');
	        sessionStorage.setItem('auth_key', response.auth_key);
	        ref.props.history.push('/home');
	        
	      }else{
	        alert(response.data.message);
	      }*/
    /* })
	    .catch(function (error) {
	      console.log(error);
	      ref.setState({
	        error: "Invalid username and/or password"
	      })
	    });*/
  }

  onPasswordChange(e) {
    var newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  onForgotPassword(event) {
    var ref = this;
    if (hostname === "store.zwz.co.in") {
      axios
        .post(
          zwzapiurl + "authentication/change_password/",
          {
            db_type: "zwz",
            user_name: ref.state.username,
            password1: ref.state.new_password,
            password2: ref.state.confirm_password,
          },
          {
            "Content-Type": "application/json",
          }
        )
        .then(function (response) {
          console.log(response);
          if (response.data.success === true) {
            alert(response.data.message);
            ref.props.history.push("/login");
          } else {
            alert(response.data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
          ref.setState({
            error: "Invalid username and/or password",
          });
        });
    } else if (hostname === "store.nodbearings.net") {
      axios
        .post(
          "https://api.store.nodbearings.net/authentication/change_password/",
          {
            db_type: "zwz",
            user_name: ref.state.username,
            password1: ref.state.new_password,
            password2: ref.state.confirm_password,
          },
          {
            "Content-Type": "application/json",
          }
        )
        .then(function (response) {
          console.log(response);
          if (response.data.success === true) {
            alert(response.data.message);
            ref.props.history.push("/login");
          } else {
            alert(response.data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
          ref.setState({
            error: "Invalid username and/or password",
          });
        });
    }
  }

  render() {
    return (
      <div className="main_container_forgot_password">
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

            <Col
              sm={12}
              xs={12}
              md={12}
              lg={12}
              className="login_title_container"
              style={{ paddingRight: 55 }}
            >
              <h1 className="forgot_pass_title_text"> Forgot Password </h1>
            </Col>

            <Col
              sm={12}
              xs={12}
              md={12}
              lg={12}
              className="login_subtitle_container"
            >
              <Col sm={8} xs={8} md={8} lg={8} style={{ float: "left" }}>
                {this.state.hide_email_verification && (
                  <div
                    className="login_detail_container"
                    style={{ float: "right" }}
                  >
                    <p className="forgot_content_title">
                      Enter registered email address you use to login on the
                      site and we will show you a link only if valid email is
                      entered.
                    </p>

                    <input
                      type="text"
                      style={{ marginBottom: 4 }}
                      name="username"
                      onChange={this.onEmailChange}
                      placeholder="Enter Registered Email Address"
                      className="placeholder_color"
                    />
                    {this.state.notVerified && (
                      <div
                        style={{
                          width: "100%",
                          textAlign: "left",
                          marginBottom: 20,
                        }}
                      >
                        <span style={{ color: "red", fontSize: 11 }}>
                          {" "}
                          {this.state.showTextError}{" "}
                        </span>
                      </div>
                    )}

                    <input
                      type="button"
                      value="Submit"
                      onClick={this.verifyUser}
                      style={{ marginTop: 10 }}
                      className="login_btn"
                    />
                  </div>
                )}

                {this.state.showOTPContainer && (
                  <div
                    className="login_detail_container"
                    style={{ float: "right" }}
                  >
                    <p className="forgot_content_title">
                      An OTP has been send to your registered email address.
                    </p>

                    <input
                      type="text"
                      style={{ marginBottom: 4 }}
                      onChange={this.onEmailChange}
                      placeholder="Enter OTP"
                      name="otp"
                      className="placeholder_color"
                    />
                    {this.state.notVerified && (
                      <div
                        style={{
                          width: "100%",
                          textAlign: "left",
                          marginBottom: 20,
                        }}
                      >
                        <span style={{ color: "red", fontSize: 11 }}>
                          {" "}
                          {this.state.showTextError}{" "}
                        </span>
                      </div>
                    )}

                    <input
                      type="button"
                      value="Submit"
                      onClick={this.submitOtp}
                      style={{ marginTop: 10 }}
                      className="login_btn"
                    />
                  </div>
                )}

                {this.state.showPasswordContainer && (
                  <div
                    className="login_detail_container"
                    style={{ float: "right" }}
                  >
                    <input
                      type="password"
                      style={{ marginBottom: 4 }}
                      onChange={this.onEmailChange}
                      placeholder="New password"
                      name="new_password"
                      className="placeholder_color"
                    />
                    <input
                      type="password"
                      style={{ marginBottom: 4, marginTop: 8 }}
                      onChange={this.onEmailChange}
                      placeholder="Confirm password"
                      name="confirm_password"
                      className="placeholder_color"
                    />

                    <input
                      type="button"
                      value="Submit"
                      onClick={this.onForgotPassword}
                      style={{ marginTop: 10 }}
                      className="login_btn"
                    />
                  </div>
                )}
              </Col>
              {this.state.showPasswordContainer && (
                <Col sm={4} xs={4} md={4} lg={4} style={{ float: "left" }}>
                  <div className="password_container" style={{ float: "left" }}>
                    <div style={{ flexDiection: "column", textAlign: "left" }}>
                      <span
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          color: "#0072bc",
                        }}
                      >
                        Password Hint:
                      </span>
                      <div style={{ marginTop: 10 }}>
                        <span style={{ fontSize: 13, fontWeight: "bold" }}>
                          Minimum 6 digits
                        </span>
                      </div>
                      <div>
                        <span style={{ fontSize: 13, fontWeight: "bold" }}>
                          Atleast 1 uppercase letters(A-Z)
                        </span>
                      </div>
                      <div>
                        <span style={{ fontSize: 13, fontWeight: "bold" }}>
                          Atleast 1 number letters(0-9)
                        </span>
                      </div>
                      <div>
                        <span style={{ fontSize: 13, fontWeight: "bold" }}>
                          Atleast 1 non-alphanumeric symbol letters(e.g.
                          '@#&%!')
                        </span>
                      </div>
                    </div>
                  </div>
                </Col>
              )}
            </Col>
          </Row>
        </div>

        <Footer> </Footer>
      </div>
    );
  }
}

export default ForgotPassword;
