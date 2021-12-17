import React, { Component } from "react";
import {
  Button,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { connect } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import axios from "axios";
import Carousel1 from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { updateUserData } from "~/redux/action/user";
import { updateCartData } from "~/redux/action/cartDetails";
import { removeCartData } from "~/redux/action/cartDetails";
import { updateProductData } from "~/redux/action/productDetail";
import { updateCartItemData } from "~/redux/action/cartItemVal";
import { zwzurl, zwzapiurl, nodurl, nodapiurl } from "../../urls.json";

let hostname = window.location.hostname;
var Name = "";
var nodlogo = false;
if (hostname == "store.zwz.co.in") {
  Name = "ZWZ";
} else {
  Name = "NOD";
}

class About extends Component {
  constructor(props) {
    super(props);
    /*this.redirectProductCategory = this.redirectProductCategory.bind(this);*/
    this.AutoLogout = this.AutoLogout.bind(this);
    this.state = {
      new: true,
      best_seller: false,
      featured: false,
      special_offer: false,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillMount() {
    console.log(this.props.cart);
    this.AutoLogout();
    if (this.props.cart.length > 0) {
      this.goToShipping();
    }
  }

  async AutoLogout() {
    console.log(this.props.match);

    if (hostname === "store.zwz.co.in" || hostname === "localhost") {
      console.log("first if condition");
      console.log("path" + this.props.location.pathname);
      if (
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
            var username = localStorage.getItem("username");

            if (response.data.success === true) {
              this.props.dispatch(
                updateUserData({
                  username: username,
                })
              );
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

  async goToShipping() {
    var arr = [];

    for (var i = 0; i < this.props.cart.length; i++) {
      // <---- Move declaration inside loop
      var orderData = {};

      orderData["item_id"] = this.props.cart[i].itemid.toString();
      orderData["item_name"] = this.props.cart[i].itemname.toString();
      orderData["amount_per_unit"] = this.props.cart[i].price.toString();
      orderData["quantity"] = this.props.cart[i].Quantity.toString();
      arr.push(orderData);
    }

    //console.log(arr);

    if (window.location.href === "https://store.nodbearings.net/home") {
      axios
        .post(
          "https://api.store.nodbearings.net/api/add_item/",

          {
            item_info: arr,
          },
          {
            headers: {
              Authorization: "Token " + localStorage.getItem("auth_key"),
            },
          }
        )
        .then((response) => {})
        .catch(function (error) {});
    } else if (window.location.href === zwzurl + "home") {
      axios
        .post(
          zwzapiurl + "api/add_item/",

          {
            item_info: arr,
          },
          {
            headers: {
              Authorization: "Token " + localStorage.getItem("auth_key"),
            },
          }
        )
        .then((response) => {})
        .catch(function (error) {});
    }

    /*this.props.history.push('/shipping');*/
  }

  /*redirectProductCategory(){
		this.props.history.push('/product-category');
	}*/
  render() {
    return (
      <div>
        <Header {...this.props}> </Header>
        <div className="content-container wrapper" style={{ marginTop: 175 }}>
          <Row>
            <Col
              sm={12}
              className="home_about_container"
              style={{ display: "none" }}
            >
              <Col sm={12}>
                <h6
                  style={{
                    color: "#00619F",
                    textAlign: "left",
                    fontWeight: "bold",
                    padding: 12,
                    paddingBottom: 0,
                  }}
                >
                  {" "}
                  Rolling Bearing Lubrication{" "}
                </h6>
                <p style={{ textAlign: "left", fontSize: 13, paddingLeft: 12 }}>
                  {" "}
                  Electric motor kit for fast retrofitting{" "}
                </p>
              </Col>

              <Col
                sm={6}
                style={{ float: "left", textAlign: "left", fontSize: 13 }}
              >
                <p>
                  {Name}’s product range includes a plug-and-play solution for
                  retrofitting large electric motors (with more than 70 kW drive
                  power) with relubrication devices.
                </p>

                <p>
                  The electric motor kit, which includes all of the accessories
                  needed for problem-free installation in a very short space of
                  time, is especially designed for sales partners who wish to
                  use it to offer their industrial customers a fast and simple
                  solution.
                </p>

                <p>
                  Learn more about its application in practice in a forum
                  article. To find out more about the designs and content of the
                  kit, download the „Rolling bearing lubrication made easy“
                  flyer.
                </p>
              </Col>
            </Col>

            <Col
              sm={12}
              className="heading_s4 text-center"
              style={{ marginTop: 40, textAlign: "center" }}
            >
              <h2 style={{ fontWeight: "bold", color: "#444" }}> About ZWZ </h2>
            </Col>

            <Col
              sm={10}
              className="heading_s4 text-center"
              style={{ textAlign: "center", margin: "auto" }}
            >
              <p className="text-center leads">
                Since 1938 we have powered the world’s plants and machines with
                unmatched reliability and value. WIth over 10,000 types of
                bearing products look forward to meeting your expectations. We
                manufacture solutions for critical applications in power plants,
                steel and metal industries, gearboxes, paper mills and other
                demanding applications within heavy industries.
              </p>
            </Col>
          </Row>
        </div>
        <Footer />
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
}))(About);
