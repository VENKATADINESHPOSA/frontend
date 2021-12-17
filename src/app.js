import React, { Component } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import Header from "~/components/Header";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";

import Login from "~/views/Login";
import Signup from "~/views/Signup";
import ForgotPassword from "~/views/ForgotPassword";
import Home from "~/views/Home";
import UpdatedNodHomeComponent from "./views/UpdatedNodHome/UpdatedNodHome.component";
import UpdatedNodAboutUsComponent from "./views/UpdatedNodAboutUs/UpdatedNodAboutUs.component";
import UpdatedHome from "./views/UpdatedHome/UpdatedHome.component";
import UpdatedAboutComponent from "./views/UpdatedAbout/UpdatedAbout.component";
import Home1 from "~/views/Home1";
import ProductCategory from "~/views/ProductCategory";
import RFQ from "~/views/RFQ";
import OrderPlaced from "~/views/placeOrder";
import OrderHistory from "~/views/OrderHistory";
import MyProfile from "~/views/MyProfile";
import OrderDetail from "~/views/OrderDetail";
import Wishlist from "~/views/Wishlist";
import ReviewRFI from "~/views/ReviewRFI";
import About from "~/views/About";
import privacyPolicy from "~/views/Privacy_policy";
import termsCondition from "~/views/Terms_condition";
import ProductCategory2 from "~/views/ProductCategory2";
import RFQHistory from "~/views/RFQHistory";
import Cart from "~/views/Cart";
import LoginType from "~/views/LoginType";
import LoginNOD from "~/views/LoginNOD";
import ForgotPasswordNOD from "~/views/ForgotPasswordNOD";
import HomeNOD from "~/views/HomeNOD";
import { updateUserData } from "~/redux/action/user";
import { updateCartData, addCartData } from "~/redux/action/cartDetails";
import Shipping from "~/views/Shipping";
import Emailverification from "~/views/Signup/emailverification";
import Registeraddress from "~/views/Signup/register";
import ListingPage from "~/views/ListingPage";

import "./app.scss";
import KoyoPage from "./views/KoyoPage/KoyoPage.component";
import DpiPageComponent from "./views/DpiPage/DpiPage.component";
import ZwzPageComponent from "./views/ZwzPage/ZwzPage.component";
import NodContactUsPageComponent from "./views/NodContactUsPage/NodContactUsPage.component";
import WzwnPageComponent from "./views/WzwnPage/WzwnPage.component";
import IkoPageComponent from "./views/IkoPage/IkoPage.component";
import UpdatedHomeComponent from "./views/UpdatedHome/UpdatedHome.component";
import { zwzurl, zwzapiurl, nodurl, nodapiurl } from "./urls.json"

var hostname = window.location.hostname;
let HomePage;
let AboutPage;
console.log("app.js", hostname);
hostname === "localhost" || hostname === "store.nodbearings.net"
  ? (HomePage = UpdatedNodHomeComponent)
  : (HomePage = UpdatedHomeComponent);

hostname === "localhost" || hostname === "store.nodbearings.net"
  ? (AboutPage = UpdatedNodAboutUsComponent)
  : (AboutPage = UpdatedAboutComponent);

class App extends Component {
  constructor(props) {
    super(props);
    this.AutoLogout = this.AutoLogout.bind(this);
    this.state = {
      login_type: "",
    };
  }

  async componentDidMount() {
    console.log(hostname);
    if (hostname == "localhost") {
      if ("condition") {
      }
      window.localStorage.setItem("url", "https://store.nodbearings.net");
      console.log("ifCondition", localStorage.getItem("url"));
    } else {
      window.localStorage.setItem("url", "https://" + hostname);
    }

    console.log(this.props.location.pathname);
    if (window.location.href === "https://localhost:3000/") {
      this.setState({
        login_type: false,
      });

      window.localStorage.setItem("login_type", this.state.login_type);
      console.log(this.state.login_type);
    } else if (window.location.href === "https://store.nodbearings.net/") {
      this.setState({
        login_type: true,
      });

      window.localStorage.setItem("login_type", this.state.login_type);
    }

    const userLoggedIn = localStorage.getItem("auth_key");

    const cartItems = window.localStorage.getItem("cartItems");
    const loginDetails = window.localStorage.getItem("loginData");

    /*this.AutoLogout();*/
    /*if(cartItems && JSON.stringify(cartItems).length > 0 && this.props.cart.length === 0) {
			JSON.parse(cartItems).map(item => this.props.dispatch(addCartData(item)))
		}*/
    if (userLoggedIn) {
      console.log("userLoggedIn");
      this.props.dispatch(
        updateUserData({
          isLoggedIn: true,
        })
      );
    }
    if (hostname === "store.zwz.co.in" || hostname === "localhost") {
      console.log("first if condition");
      console.log("path" + this.props.location.pathname);
    }
  }

  async AutoLogout() {
    console.log(this.props.match);

    if (hostname === "store.zwz.co.in" || hostname === "localhost") {
      console.log("first if condition");
      console.log("path" + this.props.location.pathname);
      if (
        this.props.location.pathname !== "/" &&
        this.props.location.pathname !== "/login" &&
        this.props.location.pathname !== "/signup" &&
        this.props.location.pathname !== "/product-category" &&
        this.props.location.pathname !== "/productDetail"
      ) {
        console.log("second if condition");
        axios
          .post(
            zwzapiurl + "authentication/tokencheck/",

            {
              tokenkey: localStorage.getItem("auth_key"),
            },
            {
              headers: {
                Authorization: "Token " + localStorage.getItem("auth_key"),
              },
            }
          )
          .then((response) => {
            console.log(response.data.success);

            if (response.data.success === false) {
              console.log("sdfghsdfghfalse");
              window.location.href = "/login";
            }
          })
          .catch(function (error) {});
      }
    } else if (hostname === "store.nodbearings.net") {
      if (
        this.props.location.pathname !== "/" &&
        this.props.location.pathname !== "/login" &&
        this.props.location.pathname !== "/signup"
      ) {
        axios
          .post(
            "https://api.store.nodbearings.net/authentication/tokencheck/",

            {
              tokenkey: localStorage.getItem("auth_key"),
            },
            {
              headers: {
                Authorization: "Token " + localStorage.getItem("auth_key"),
              },
            }
          )
          .then((response) => {
            console.log(response);
            if (response.data.success === false) {
              window.location.href = "/login";
            }
          })
          .catch(function (error) {});
      }
    }
  }

  render() {
    var values = localStorage.getItem("itemId", this.state.itemId);
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login-type" component={LoginType} />
          /*
          <Route exact path="/home" component={HomePage} />
          */
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/forget-password" component={ForgotPassword} />
          <Route exact path="/login-nod" component={LoginNOD} />
          <Route exact path="/product-category" component={ProductCategory} />
          <Route exact path="/rfq" component={RFQ} />
          <Route exact path="/order-history" component={OrderHistory} />
          <Route exact path="/my-profile" component={MyProfile} />
          <Route exact path="/rfq-review" component={ReviewRFI} />
          <Route exact path="/rfq-history" component={RFQHistory} />
          <Route exact path="/order-detail" component={OrderDetail} />
          <Route exact path="/wishlist" component={Wishlist} />
          <Route exact path="/orderPlaced" component={OrderPlaced} />
          <Route
            exact
            path="/productDetail/ZWZ:itemId"
            component={ProductCategory2}
          />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/shipping" component={Shipping} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/privacy-policy" component={privacyPolicy} />
          <Route exact path="/terms-condition" component={termsCondition} />
          <Route
            exact
            path="/forget-password-nod"
            component={ForgotPasswordNOD}
          />
          <Route exact path="/home-nod" component={HomeNOD} />
          <Route exact path="/signup" component={Signup} />
          <Route
            exact
            path="/emailverification"
            component={Emailverification}
          />
          <Route exact path="/listing" component={ListingPage} />
          <Route exact path="/register" component={Registeraddress} />
          <Route exact path="/nodHome" component={UpdatedNodHomeComponent} />
          <Route
            exact
            path="/nodContact"
            component={NodContactUsPageComponent}
          />
          <Route
            exact
            path="/nodAbout"
            component={UpdatedNodAboutUsComponent}
          />
          <Route exact path="/koyo" component={KoyoPage} />
          <Route exact path="/dpi" component={DpiPageComponent} />
          <Route exact path="/zwz" component={ZwzPageComponent} />
          <Route exact path="/wzwn" component={WzwnPageComponent} />
          <Route exact path="/iko" component={IkoPageComponent} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default connect((state) => ({
  ...state.cartDetail,
  ...state.user,
}))(withRouter((props) => <App {...props} />));
