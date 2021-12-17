import React, { Component } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { connect } from "react-redux";
import "./styles.scss";
import logo from "~/assets/images/zwz-log-logo.png";
import NodLogo from "~/assets/images/trans_nod_logo.png";
import { Button, Row, Col } from "reactstrap";
import Header from "~/components/Header";
import axios from "axios";
import Footer from "~/components/Footer";
import { login } from "~/redux/helpers/user";
import { loginNod } from "~/redux/helpers/user";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { updateUserData } from "~/redux/action/user";
import { updateCartData } from "~/redux/action/cartDetails";
import { removeCartData } from "~/redux/action/cartDetails";
import { updateProductData } from "~/redux/action/productDetail";
import { updateCartItemData } from "~/redux/action/cartItemVal";
import { zwzurl, zwzapiurl, nodurl, nodapiurl } from "../../urls.json";

let hostname = window.location.hostname;
var LOGO = "";
var nodlogo = false;
if (hostname == "store.zwz.co.in") {
  LOGO = logo;
  nodlogo = false;
} else {
  LOGO = NodLogo;
  nodlogo = true;
}

var baseUrl = "";

class Login extends Component {
  constructor(props) {
    super(props);
    this.onClickFrgtpass = this.onClickFrgtpass.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleChange = this.toggleChange.bind(this);
    this.addLocalCartData = this.addLocalCartData.bind(this);
    this.DisplayAddItem = this.DisplayAddItem.bind(this);
    this.getStatus = this.getStatus.bind(this);

    this.state = {
      forgotPassword: false,
      captchaVerified: false,
      error: "",
      username: "",
      password: "",
      login_type: "",
      showError1: false,
      showError2: false,
      isChecked: false,
      passowrdType: "password",
      isLoggedInVal: false,
      locationURL: false,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    baseUrl = localStorage.getItem("url");

    console.log(this.props.match);
    if (this.reCaptchaEl) {
      console.log("started, just a second...");
      this.reCaptchaEl.reset();
    }
  }

  DisplayAddItem() {
    axios
      .get(
        baseUrl + "/api/display_additem/",

        {
          headers: {
            Authorization: "Token " + localStorage.getItem("auth_key"),
          },
        }
      )
      .then((response) => {
        console.log(response.data.itemdetails.length);
        this.setState({
          added_item: response.data.itemdetails,
          no_cart_data: response.data.itemdetails.length,
        });

        /*this.props.dispatch(updateProductData({
				cart: response.data.itemdetails.length,
			}))*/

        this.props.dispatch(
          updateCartItemData(response.data.itemdetails.length)
        );

        console.log(this.props.cartItemVal);

        localStorage.setItem("num_cart_data", response.data.itemdetails.length);
        console.log(localStorage.getItem("num_cart_data"));
      })
      .catch(function (error) {});
  }

  addLocalCartData() {
    var arr = [];

    console.log(this.props.cart);
    var url = "";

    if (hostname == "localhost" || hostname == "store.nodbearings.net") {
      url = "https://api.store.nodbearings.net/api/add_item/";
    } else {
      url = zwzapiurl + "api/add_item/";
    }

    for (var i = 0; i < this.props.cart.length; i++) {
      var orderData = {};
      if (hostname == "localhost" || hostname == "store.nodbearings.net") {
        orderData["item_id"] = this.props.cart[i].itemid.toString();
        orderData["item_name"] = this.props.cart[i].itemname;
        orderData["amount_per_unit"] = this.props.cart[i].Amount;
        orderData["quantity"] = this.props.cart[i].Quantity;
        orderData["flag"] = "add_cart";

        arr.push(orderData);
      } else {
        orderData["item_id"] = this.props.cart[i].itemid[0];
        orderData["item_name"] = this.props.cart[i].itemname[0];
        orderData["amount_per_unit"] = this.props.cart[i].Amount;
        orderData["quantity"] = this.props.cart[i].Quantity;
        orderData["flag"] = "add_cart";

        arr.push(orderData);
      }
    }

    axios
      .post(
        url,

        {
          item_info: arr,
        },
        {
          headers: {
            Authorization: "Token " + localStorage.getItem("auth_key"),
          },
        }
      )
      .then((response) => {
        console.log(response);

        /*this.props.history.push('/cart');
	    	if (window.location.href === 'https://store.nodbearings.net/cart' || window.location.href === zwzurl + 'cart' ){
	    			window.location.reload();
	    	}*/
        /*window.location.reload();*/
        this.DisplayAddItem();

        if (localStorage.getItem("redirectURL") == "orderHistory") {
          localStorage.removeItem("redirectURL");
          this.props.history.push("/order-history");
        } else if (localStorage.getItem("redirectURL") == "rfqHistory") {
          localStorage.removeItem("redirectURL");
          this.props.history.push("/rfq-history");
        } else {
          this.props.history.push("/");
        }
      })
      .catch(function (error) {});
  }

  componentWillMount() {
    if (
      window.location.href === "https://store.nodbearings.net/login" ||
      window.location.href === "https://localhost:3000/login"
    ) {
      this.setState({
        locationURL: true,
      });
    }
  }

  toggleChange() {
    this.setState({
      isChecked: !this.state.isChecked,
    });
    console.log(this.state.isChecked);

    if (this.state.isChecked === false) {
      this.setState({
        passowrdType: "text",
      });
    } else {
      this.setState({
        passowrdType: "password",
      });
    }
  }

  handleChange(e) {
    var newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  onClickFrgtpass() {
    this.props.history.push("/forget-password");
  }

  async getStatus(auth) {
    axios(baseUrl + "/authentication/user/CheckLoginUserStatus/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + auth,
      },
    }).then((response) => {
      console.log(response);
      localStorage.setItem("status", response.data.status);
    });
  }

  async onLogin(e) {
    console.log(window.location.href);
    if (this.state.username === "") {
      this.setState({
        showError1: true,
      });
      return false;
    } else if (this.state.password === "") {
      this.setState({
        showError2: true,
      });
      return false;
    }

    this.setState({
      error: "",
    });

    console.log(window.location.href);

    if (
      window.location.href === zwzurl + "login#" ||
      window.location.href === "https://localhost:3000/login" ||
      window.location.href === zwzurl + "login"
    ) {
      const response = await login({
        username: this.state.username,
        password: this.state.password,
      });

      if (response.success == true) {
        //console.log('true');
        localStorage.setItem("emailforverification", response.username);
        localStorage.setItem("auth_val", response.auth_key);

        localStorage.setItem("username", response.username);
        this.getStatus(response.auth_key);
        this.setState({
          isLoggedInVal: true,
        });

        localStorage.setItem("isLoggedInVal", this.state.isLoggedInVal);

        localStorage.setItem("auth_key", response.auth_key);

        if (response.email_status.toLowerCase() == "not verifed") {
          this.props.history.push("/emailverification");
          localStorage.setItem("header_link", false);
        } else {
          if (response.login_user_type == "existing") {
            localStorage.setItem("header_link", true);
            this.props.dispatch(
              updateUserData({
                username: response.username,
              })
            );
            console.log(this.props.cart);
            this.addLocalCartData();
            /*this.props.history.push('/home');*/
          } else if (response.login_user_type == "new") {
            localStorage.setItem("header_link", true);
            this.props.history.push("/register");
          } else {
            this.props.history.push("/register");
            localStorage.setItem("header_link", false);
          }
        }
      } else {
        alert(response.message);
      }
    } else if (
      window.location.href === "https://store.nodbearings.net/login#" ||
      window.location.href === "https://localhost:3000/login#" ||
      window.location.href === "https://store.nodbearings.net/login"
    ) {
      const response = await loginNod({
        username: this.state.username,
        password: this.state.password,
      });

      if (response.success == true) {
        console.log("true");
        localStorage.setItem("username", response.username);

        this.setState({
          isLoggedInVal: true,
        });

        localStorage.setItem("isLoggedInVal", this.state.isLoggedInVal);

        localStorage.setItem("auth_key", response.auth_key);

        localStorage.setItem("emailforverification", response.username);
        if (response.email_status.toLowerCase() == "not verifed") {
          this.props.history.push("/emailverification");
          localStorage.setItem("header_link", false);
        } else {
          if (response.login_user_type == "existing") {
            this.props.dispatch(
              updateUserData({
                username: response.username,
              })
            );
            localStorage.setItem("header_link", true);
            console.log(this.props.cart);
            this.addLocalCartData();
            /*this.props.history.push('/home');*/
          } else if (response.login_user_type == "new") {
            localStorage.setItem("header_link", true);
            console.log(this.props.cart);
            this.props.history.push("/register");
          } else {
            this.props.history.push("/register");
            localStorage.setItem("header_link", false);
          }
        }
      } else {
        alert(response.message);
      }
    }
  }

  render() {
    return (
      <div className="main_container_login">
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
            >
              <h1 className="login_title_text"> Sign In </h1>
            </Col>

            <Col
              sm={12}
              xs={12}
              md={12}
              lg={12}
              className="login_subtitle_container"
            >
              <div className="login_detail_container">
                {this.state.error && <p> {this.state.error}</p>}
                <input
                  type="text"
                  onChange={this.handleChange}
                  style={{ marginBottom: 6 }}
                  name="username"
                  placeholder="Email"
                />
                {this.state.showError1 && (
                  <div style={{ width: "100%", textAlign: "left" }}>
                    <span style={{ color: "red", fontSize: 11 }}>
                      {" "}
                      Please Enter Username{" "}
                    </span>
                  </div>
                )}

                <input
                  type={this.state.passowrdType}
                  style={{ marginTop: 25, marginBottom: 0 }}
                  onChange={this.handleChange}
                  name="password"
                  placeholder="Password"
                />

                {this.state.showError2 && (
                  <div style={{ width: "100%", textAlign: "left" }}>
                    <span style={{ color: "red", fontSize: 11 }}>
                      {" "}
                      Please Enter Password{" "}
                    </span>
                  </div>
                )}

                <Row>
                  <Col
                    sm={12}
                    xs={12}
                    md={12}
                    lg={12}
                    className="checkbox_main_container"
                  >
                    <Col sm={6} xs={6} md={6} lg={6} className="left_container">
                      <label className="checkbox_label">
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={this.state.isChecked}
                          onChange={this.toggleChange}
                        />
                        Show Password
                      </label>
                    </Col>

                    <Col
                      sm={6}
                      xs={6}
                      md={6}
                      lg={6}
                      className="right_container"
                    >
                      <a href="#" onClick={this.onClickFrgtpass}>
                        {" "}
                        Forgot Password?{" "}
                      </a>
                    </Col>
                  </Col>
                </Row>

                <Row>
                  <Col
                    sm={12}
                    xs={12}
                    md={12}
                    lg={12}
                    className="captcha-container"
                  >
                    <ReCAPTCHA
                      sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                      onChange={(value) => {
                        console.log(value);
                        this.setState({ captchaVerified: true });
                      }}
                    />
                  </Col>
                </Row>

                <input
                  onClick={this.onLogin}
                  disabled={!this.state.captchaVerified}
                  type="button"
                  value="Login"
                  className={`login_btn ${
                    !this.state.captchaVerified ? "disabled" : ""
                  }`}
                />
              </div>
            </Col>
          </Row>
        </div>

        <Footer> </Footer>
      </div>
    );
  }
}

export default connect((state) => ({
  ...state.user,
  ...state.cartDetail,
  ...state.updateProductData,
  ...state.cartItemVal,
  ...state.updateCartItemData,
  ...state.removeCartData,
}))(Login);
