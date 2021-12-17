import React, { Component } from "react";
import { Button, Row, Col, Tooltip } from "reactstrap";
import _ from "lodash";
import logo from "~/assets/images/logo.svg";
import NodLogo from "~/assets/images/trans_nod_logo.png";
import axios, { CancelToken } from "axios";
import { connect } from "react-redux";
import "./styles.scss";
import { Redirect } from "react-router-dom";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { login } from "~/redux/helpers/user";
import { updateUserData } from "~/redux/action/user";
import { updateCartData, addCartData } from "~/redux/action/cartDetails";
import { updateProductData } from "~/redux/action/productDetail";
import { updateCartItemData } from "~/redux/action/cartItemVal";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { geolocated } from "react-geolocated";
import cookie from "react-cookies";
import { zwzurl, zwzapiurl, nodurl, nodapiurl } from "../../urls.json";

let ongoingGetOptionsAPI = null;
let hostname = window.location.hostname;
var LOGO = "";
var nodlogo = false;
var title = "";
if (hostname == "store.zwz.co.in") {
  LOGO = logo;
  nodlogo = false;
  title = "ZWZ";
} else {
  LOGO = NodLogo;
  nodlogo = true;
  title = "NOD";
}

class Header extends Component {
  constructor(props) {
    super(props);
    this.openLogin = this.openLogin.bind(this);
    this.openHome = this.openHome.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClick1 = this.handleClick1.bind(this);
    this.closeContainer = this.closeContainer.bind(this);
    this.goToCart = this.goToCart.bind(this);
    this.goHomePage = this.goHomePage.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.onHover = this.onHover.bind(this);
    this.getItemData = this.getItemData.bind(this);
    this.getItemData1 = this.getItemData1.bind(this);
    this.onQuantityChange = this.onQuantityChange.bind(this);
    this.onQuantityChange1 = this.onQuantityChange1.bind(this);
    this.closeContainer = this.closeContainer.bind(this);
    this.goToOrderHistory = this.goToOrderHistory.bind(this);
    this.goToRFQHistory = this.goToRFQHistory.bind(this);
    this.goToMyProfile = this.goToMyProfile.bind(this);
    this.openRegister = this.openRegister.bind(this);
    this.logoRedirection = this.logoRedirection.bind(this);
    this.showListing = this.showListing.bind(this);
    this.toggle = this.toggle.bind(this);
    this.AutoLogout = this.AutoLogout.bind(this);
    this.goToAbout = this.goToAbout.bind(this);
    this.goToPrivacy = this.goToPrivacy.bind(this);
    this.goToTermsCondition = this.goToTermsCondition.bind(this);

    this.state = {
      error: "",
      showTypeahead: false,
      tooltipOpen: false,
      typeaheadText: props.typeaheadText ? props.typeaheadText : "",
      total_data: "",
      login_details: "",
      login_values: "",
      login_values1: false,
      goToLogin: false,
      goToProduct: false,
      goToHome: false,
      suggestions: [],
      count: "3",
      description: [],
      data: [],
      inputVal: "",
      itemName: "",
      brandname: "",
      category: "",
      subCategory: "",
      itemCode: "",
      auth: "",
      universal_code: "",
      image_url: "",
      recommendation: false,
      quantity: "1",
      quantity1: "1",
      cart_num: "",
      locationUrl: hostname == "store.zwz.co.in" ? false : true,
      cart_withoutLogin: false,
      nod_hover_pannel: false,
      zwz_hover_pannel: false,
      zwz_search_pannel: false,
      nod_search_pannel: false,
      hover_nod_data: [],
      nod_item_name: "",
      latitude: "",
      longitude: "",
      userId: "",
      no_cart_data: "",
      showLoader: false,
    };
  }

  async goToAbout() {
    this.props.history.push("/about");
  }
  async goToPrivacy() {
    this.props.history.push("/privacy-policy");
  }
  async goToTermsCondition() {
    this.props.history.push("/terms-condition");
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
        this.props.location.pathname !== "/login" &&
        this.props.location.pathname !== "/signup" &&
        this.props.location.pathname !== "/product-category" &&
        this.props.location.pathname !== "/productDetail"
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
    }
  }

  openRegister() {
    this.props.history.push("/signup");
    /*window.location.reload();*/
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen,
    });
  }

  showListing(e) {
    if (e.key === "Enter") {
      const { history } = this.props;

      if (
        window.location.href === zwzurl + "login#" ||
        hostname === "localhost" ||
        hostname === "store.zwz.co.in" ||
        window.location.href === zwzurl ||
        window.location.href === zwzurl + "home" ||
        window.location.href === zwzurl + "home#" ||
        window.location.href === zwzurl + "product-category" ||
        window.location.href === zwzurl + "product-category" ||
        window.location.href === zwzurl + "cart" ||
        window.location.href === "https://localhost:3000/home#" ||
        window.location.href === "https://localhost:3000/login#" ||
        window.location.href === "https://localhost:3000/login" ||
        window.location.href === "https://localhost:3000/product-category" ||
        window.location.href === "https://localhost:3000/cart" ||
        window.location.href === zwzurl + "rfq" ||
        window.location.href === zwzurl + "order-history" ||
        window.location.href === zwzurl + "order-detail" ||
        window.location.href === zwzurl + "rfq-history"
      ) {
        localStorage.setItem("set_key", e.target.value);
        this.setState({
          showLoader: true,
        });

        var ref = this;
        ref.setState({
          error: "",
        });

        if (e.target.value != 0) {
          var config = {};
          if (this.props.isLoggedIn) {
            config = {
              Authorization: "Token " + localStorage.getItem("auth_key"),
            };
          }

          axios
            .post(
              zwzapiurl + "api/multiSearch/",
              {
                searching_key: e.target.value,
              },
              {
                headers: config,
              }
            )
            .then(function (response) {
              console.log(response);
              /*this.setState({
	    					showLoader: false
	    				})*/
              localStorage.setItem(
                "search_key",
                JSON.stringify(response.data.search_key)
              );
              localStorage.setItem(
                "list_data",
                JSON.stringify(response.data.data)
              );
              /*const { history } = this.props;*/
              /*this.context.history.push('/listing')*/
              /*window.location.href = '/listing'	*/
              /*this.props.history.push('/listing')*/

              history.push("/listing");
            })
            .catch(function (error) {});
        }
      }
    }
  }

  logoRedirection() {
    this.props.history.push("/");
  }

  componentWillMount() {
    this.getMyLocation();
    this.AutoLogout();

    var login_detail_type = window.localStorage.getItem("login_type");
    document.addEventListener("mousedown", this.hideTypeahead, false);

    /*if (window.location.hostname==="store.zwz.co.in") {
			this.setState({
				locationUrl: false
			})
		}else if (window.location.hostname==="store.nodbearings.net") {
			this.setState({
				locationUrl: true
			})
		} else{

			this.setState({
				locationUrl: true
			})

		}*/
    if (!this.props.isLoggedIn && this.props.cart.length > 0) {
      this.setState({
        cart_withoutLogin: true,
      });
    }
    this.setState({
      login_details: localStorage.getItem("username"),
      login_values: localStorage.getItem("isLoggedInVal"),
      auth: localStorage.getItem("auth_key"),
      cart_num: localStorage.getItem("num_cart_data"),
    });
    this.getCartData();
  }

  async getCartData() {
    if (
      window.location.href === zwzurl + "cart" ||
      hostname === "store.zwz.co.in" ||
      window.location.href === zwzurl + "home" ||
      window.location.href === zwzurl + "product-category" ||
      window.location.href === zwzurl + "rfq" ||
      window.location.href === zwzurl + "order-detail" ||
      window.location.href === zwzurl + "rfq-history"
    ) {
      axios
        .get(
          zwzapiurl + "api/display_additem/",

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
          this.props.dispatch(
            updateCartItemData(response.data.itemdetails.length)
          );
          localStorage.setItem(
            "num_cart_data",
            response.data.itemdetails.length
          );
        })
        .catch(function (error) {});
    } else if (
      window.location.href === "https://store.nodbearings.net/cart" ||
      hostname === "localhost" ||
      hostname === "store.nodbearings.net" ||
      window.location.href === "https://store.nodbearings.net/home" ||
      window.location.href ===
        "https://store.nodbearings.net/product-category" ||
      window.location.href === "https://localhost:3000/cart" ||
      window.location.href === "https://localhost:3000/rfq-history#" ||
      window.location.href === "https://localhost:3000/home" ||
      window.location.href === "https://localhost:3000/rfq" ||
      window.location.href === "https://store.nodbearings.net/order-detail" ||
      window.location.href === "https://store.nodbearings.net/rfq" ||
      window.location.href === "https://store.nodbearings.net/order-history" ||
      window.location.href === "https://store.nodbearings.net/rfq-history"
    ) {
      axios
        .get(
          "https://api.store.nodbearings.net/api/display_additem/",

          {
            headers: {
              Authorization: "Token " + localStorage.getItem("auth_key"),
            },
          }
        )
        .then((response) => {
          this.setState({
            added_item: response.data.itemdetails,
            no_cart_data: response.data.itemdetails.length,
          });

          this.props.dispatch(
            updateCartItemData(response.data.itemdetails.length)
          );
          localStorage.setItem(
            "num_cart_data",
            response.data.itemdetails.length
          );
        })
        .catch(function (error) {});
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.hideTypeahead, false);
  }

  openLogin() {
    this.props.history.push("/login");
  }

  closeContainer() {
    this.setState({
      showTypeahead: false,
    });
  }

  goHomePage() {
    this.props.history.push("/");
  }

  goToRFQHistory() {
    if (
      this.props.match.path == "/login" ||
      this.props.match.path == "/signup"
    ) {
      localStorage.setItem("redirectURL", "rfqHistory");
      /*window.location.href="/login"*/
      this.props.history.push("/login");
    } else {
      /*window.location.href="/rfq-history"*/
      this.props.history.push("/rfq-history");
    }
  }

  goToOrderHistory() {
    if (
      this.props.match.path == "/login" ||
      this.props.match.path == "/signup"
    ) {
      localStorage.setItem("redirectURL", "orderHistory");
      /*window.location.href="/login"*/
      this.props.history.push("/login");
    } else {
      /*window.location.href="/order-history"*/
      this.props.history.push("/order-history");
    }
  }

  goToMyProfile() {
    if (
      this.props.match.path == "/login" ||
      this.props.match.path == "/signup"
    ) {
      /*window.location.href="/login"*/
      this.props.history.push("/login");
    } else {
      /*window.location.href="/my-profile"*/
      this.props.history.push("/my-profile");
    }
  }

  openHome() {
    this.setState({
      goToHome: true,
    });
  }

  closeContainer() {
    this.setState({
      showTypeahead: false,
    });
  }

  getMyLocation = (e) => {
    let location = null;
    let latitude = null;
    let longitude = null;
    if (window.navigator && window.navigator.geolocation) {
      location = window.navigator.geolocation;
    }
    if (location) {
      location.getCurrentPosition(function (position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        console.log(latitude);
        console.log(longitude);
      });
    }
    this.setState({ latitude: latitude, longitude: longitude });
  };

  onHover(productVal, itemName) {
    this.setState({
      error: "",
      showTypeahead: true,
    });

    if (
      window.location.href === zwzurl + "login#" ||
      hostname === "store.zwz.co.in" ||
      window.location.href === zwzurl ||
      window.location.href === zwzurl + "home" ||
      window.location.href === zwzurl + "product-category" ||
      window.location.href === zwzurl + "product-category" ||
      window.location.href === zwzurl + "cart" ||
      window.location.href === "https://localhost:3000/home#" ||
      window.location.href === "https://localhost:3000/login#" ||
      window.location.href === "https://localhost:3000" ||
      window.location.href === "https://localhost:3000/login" ||
      window.location.href === "https://localhost:3000/product-category" ||
      window.location.href === "https://localhost:3000/cart" ||
      window.location.href === zwzurl + "rfq" ||
      window.location.href === zwzurl + "order-history" ||
      window.location.href === zwzurl + "order-detail" ||
      window.location.href === zwzurl + "rfq-history"
    ) {
      this.setState({
        zwz_hover_pannel: true,
      });
      // ===========================================================================
      axios
        .post(
          zwzapiurl + "api/display_product/",
          {
            item_id: productVal,
            flag: "false",
          },
          {
            headers: {
              Authorization: this.props.isLoggedIn
                ? "Token " + localStorage.getItem("auth_key")
                : "",
            },
          }
        )
        .then((response) => {
          console.log(response);

          localStorage.setItem("product_data", JSON.stringify(response.data));

          var ProductData = localStorage.getItem("product_data");
          console.log(JSON.parse(ProductData));
          var ProductDataValue = JSON.parse(ProductData);
          console.log(ProductData);
          if (response.data.success === true) {
            this.setState({
              quantity: 1,
              quantity1: 1,
              itemName: ProductDataValue.itemname[0],
              category: ProductDataValue.catname[0],
              subCategory: ProductDataValue.cattype[0],
              itemCode: ProductDataValue.itemcode[0],
              image_url: ProductDataValue.image_url,
              brandname: ProductDataValue.brandname[0],
              recommendation: true,
            });
          }
        })
        .catch(function (error) {});
    } else if (
      window.location.href === "https://store.nodbearings.net/login#" ||
      hostname === "localhost" ||
      hostname === "store.nodbearings.net" ||
      hostname === "localhost" ||
      window.location.href === "https://localhost:3000/" ||
      window.location.href === "https://store.nodbearings.net/" ||
      window.location.href === "https://store.nodbearings.net/home" ||
      window.location.href ===
        "https://store.nodbearings.net/product-category" ||
      window.location.href ===
        "https://store.nodbearings.net/product-category" ||
      window.location.href === "https://store.nodbearings.net/cart" ||
      window.location.href === "https://store.nodbearings.net/rfq" ||
      window.location.href === "https://store.nodbearings.net/order-history" ||
      window.location.href === "https://store.nodbearings.net/order-detail" ||
      window.location.href === "https://store.nodbearings.net/rfq-history"
    ) {
      this.setState({
        nod_hover_pannel: true,
      });

      axios
        .post(
          "https://api.store.nodbearings.net/api/display_product/",
          {
            /*searching_key: itemName*/
            item_id: itemName,
            flag: "false",
          },
          {
            headers: {
              Authorization: this.props.isLoggedIn
                ? "Token " + localStorage.getItem("auth_key")
                : "",
            },
          }
        )
        .then((response) => {
          console.log(response);

          localStorage.setItem("product_data", JSON.stringify(response.data));
          /*var arrayCartData= response.data.description.filter(item => item.Item_Name == itemName); 
	    	console.log(arrayCartData[0].data_details);*/

          var arrayCartData = response.data.data_list.description;
          console.log(arrayCartData);

          var ProductData = localStorage.getItem("product_data");
          console.log(JSON.parse(ProductData));
          var ProductDataValue = JSON.parse(ProductData);
          console.log(ProductData);
          if (response.data.success === true) {
            this.setState({
              quantity: 1,
              /*hover_nod_data: arrayCartData[0].data_details,*/
              hover_nod_data: arrayCartData.map((item) => ({
                ...item,
                quantity: 1,
              })),
              recommendation: true,
              nod_item_name: arrayCartData[0].Item_Name,
            });

            console.log(this.state.hover_nod_data);

            /*window.location.reload();*/
          }
        })
        .catch(function (error) {});
    }
  }

  onLogout() {
    if (hostname === "store.zwz.co.in" || hostname === "localhost") {
      axios
        .post(
          zwzapiurl + "authentication/user/logout/",

          {
            user: this.state.login_details,
          },
          {
            headers: {
              Authorization: "Token " + localStorage.getItem("auth_key"),
            },
          }
        )
        .then((response) => {
          if (response.data.success === true) {
            localStorage.setItem("header_link", false);
            localStorage.removeItem("auth_key");
            localStorage.removeItem("username");
            this.setState({
              login_values1: true,
              login_details: "",
            });
            window.location.href = "/login";
          }
        })
        .catch(function (err) {
          console.log(err.response);
          if (err.response.status == 401) {
            window.location.href = "/login";
          }
        });
    } else if (hostname === "store.nodbearings.net") {
      axios
        .post(
          "https://api.store.nodbearings.net/authentication/user/logout/",
          {
            user: this.state.login_details,
          },
          {
            headers: {
              Authorization: "Token " + localStorage.getItem("auth_key"),
            },
          }
        )
        .then((response) => {
          console.log(response);
          if (response.data.success === true) {
            localStorage.setItem("header_link", false);
            localStorage.removeItem("auth_key");
            this.setState({
              login_values1: true,
            });
            this.props.history.push("/login");
          }
        })
        .catch(function (err) {
          console.log(err.response);
          if (err.response.status == 401) {
            window.location.href = "/login";
          }
        });
    }
  }

  handleClick1(productName) {
    this.setState({
      error: "",
    });

    localStorage.setItem("nod_product_name", productName);

    axios
      .post("https://api.store.nodbearings.net/api/item_availability/", {
        searching_key: productName,
      })
      .then((response) => {
        console.log(response);
        localStorage.setItem(
          "nod_product_data",
          JSON.stringify(response.data.data_list.description)
        );

        if (response.data.success === true) {
          console.log("response true");
          if (this.props.match.path === "/product-category") {
            window.location.reload();
          } else {
            this.props.history.push("/product-category");
          }
        }
      })
      .catch(function (error) {});
  }

  handleClick(productValue) {
    this.setState({
      error: "",
    });
    console.log(productValue);
    localStorage.setItem("product-val", productValue);

    if (
      window.location.href === zwzurl + "login#" ||
      hostname === "store.zwz.co.in" ||
      window.location.href === zwzurl ||
      window.location.href === zwzurl + "home" ||
      window.location.href === zwzurl + "product-category" ||
      window.location.href === zwzurl + "product-category" ||
      window.location.href === zwzurl + "cart" ||
      window.location.href === "https://localhost:3000/home#" ||
      window.location.href === "https://localhost:3000/login#" ||
      window.location.href === "https://localhost:3000" ||
      window.location.href === "https://localhost:3000/login" ||
      window.location.href === "https://localhost:3000/product-category" ||
      window.location.href === "https://localhost:3000/cart" ||
      window.location.href === zwzurl + "rfq" ||
      window.location.href === zwzurl + "order-history" ||
      window.location.href === zwzurl + "order-detail"
    ) {
      axios
        .post(
          zwzapiurl + "api/display_product/",
          {
            item_id: productValue,
            flag: "true",
          },
          {
            headers: {
              Authorization: this.props.isLoggedIn
                ? "Token " + localStorage.getItem("auth_key")
                : "",
            },
          }
        )
        .then((response) => {
          console.log(response);

          localStorage.setItem("product_data", JSON.stringify(response.data));

          var ProductData = localStorage.getItem("product_data");
          console.log(JSON.parse(ProductData));
          console.log(ProductData);
          if (response.data.success === true) {
            this.props.dispatch(
              updateProductData({
                product: ProductData,
              })
            );

            console.log(this.props.product);

            if (this.props.match.path === "/product-category") {
              window.location.reload();
            } else {
              this.props.history.push("/product-category");
            }
          }
        })
        .catch(function (error) {});
    } else if (
      window.location.href === "https://store.nodbearings.net/login#" ||
      hostname === "localhost" ||
      hostname === "store.nodbearings.net" ||
      window.location.href === "https://store.nodbearings.net/" ||
      window.location.href === "https://store.nodbearings.net/home" ||
      window.location.href ===
        "https://store.nodbearings.net/product-category" ||
      window.location.href ===
        "https://store.nodbearings.net/product-category" ||
      window.location.href === "https://store.nodbearings.net/cart" ||
      window.location.href === "https://store.nodbearings.net/rfq" ||
      window.location.href === "https://store.nodbearings.net/order-history" ||
      window.location.href === "https://store.nodbearings.net/order-detail" ||
      window.location.href === "https://localhost:3000/rfq" ||
      window.location.href === "https://localhost:3000/order-history" ||
      window.location.href === "https://localhost:3000/order-detail"
    ) {
      axios
        .post(
          "https://api.store.nodbearings.net/api/display_product/",
          {
            item_id: productValue,
            flag: "true",
          },
          {
            headers: {
              Authorization: this.props.isLoggedIn
                ? "Token " + localStorage.getItem("auth_key")
                : "",
            },
          }
        )
        .then((response) => {
          console.log(response);

          localStorage.setItem("product_data", JSON.stringify(response.data));

          var ProductData = localStorage.getItem("product_data");
          console.log(JSON.parse(ProductData));
          console.log(ProductData);
          if (response.data.success === true) {
            this.props.dispatch(
              updateProductData({
                product: ProductData,
              })
            );

            console.log(this.props.product);

            if (this.props.match.path === "/product-category") {
              window.location.reload();
            } else {
              this.props.history.push("/product-category");
            }
          }
        })
        .catch(function (error) {});
    }
  }

  goToCart() {
    this.props.history.push("/cart");
  }

  showTypeahead = (e) => {
    this.setState({ showTypeahead: true, typeaheadText: e.target.value });

    if (
      window.location.href === zwzurl + "login#" ||
      hostname === "store.zwz.co.in" ||
      window.location.href === zwzurl ||
      window.location.href === zwzurl + "home" ||
      window.location.href === zwzurl + "home#" ||
      window.location.href === zwzurl + "product-category" ||
      window.location.href === zwzurl + "product-category" ||
      window.location.href === zwzurl + "cart" ||
      window.location.href === "https://localhost:3000/home#" ||
      window.location.href === "https://localhost:3000/login#" ||
      window.location.href === "https://localhost:3000/login" ||
      window.location.href === "https://localhost:3000/product-category" ||
      window.location.href === "https://localhost:3000/cart" ||
      window.location.href === zwzurl + "rfq" ||
      window.location.href === zwzurl + "order-history" ||
      window.location.href === zwzurl + "order-detail" ||
      window.location.href === zwzurl + "rfq-history"
    ) {
      this.setState({
        zwz_search_pannel: true,
      });

      var ref = this;
      ref.setState({
        error: "",
      });

      if (e.target.value != 0) {
        axios
          .post(zwzapiurl + "api/search_product/", {
            searching_key: e.target.value,
          })
          .then(function (response) {
            console.log(response);
            if (response.data.data.length === 0) {
              ref.setState({
                suggestions: [],
                total_data: 0,
                data: response.data.data,
              });

              console.log(this.state.data);
            } else {
              ref.setState({
                data: response.data.data,
                suggestions: response.data.description,
                itemName: response.data.description[0].Item_Name,
                total_data: response.data.total_search_count,
              });
              console.log(this.state.itemName);
              console.log(this.state.total_data);
            }

            console.log(ref.state.suggestions);
          })
          .catch(function (error) {});
      } else {
        this.setState({
          suggestions: [],
        });
      }
    } else if (
      window.location.href === "https://localhost:3000/" ||
      hostname === "localhost" ||
      hostname === "store.nodbearings.net" ||
      window.location.href === "https://localhost:3000/home" ||
      window.location.href === "https://store.nodbearings.net/login#" ||
      window.location.href === "https://store.nodbearings.net/" ||
      window.location.href === "https://store.nodbearings.net/home" ||
      window.location.href ===
        "https://store.nodbearings.net/product-category" ||
      window.location.href ===
        "https://store.nodbearings.net/product-category" ||
      window.location.href === "https://store.nodbearings.net/cart" ||
      window.location.href === "https://store.nodbearings.net/rfq" ||
      window.location.href === "https://store.nodbearings.net/order-history" ||
      window.location.href === "https://store.nodbearings.net/order-detail" ||
      window.location.href === "https://localhost:3000/rfq" ||
      window.location.href === "https://localhost:3000/order-history" ||
      window.location.href === "https://localhost:3000/order-detail" ||
      window.location.href === "https://store.nodbearings.net/rfq-history"
    ) {
      this.setState({
        nod_search_pannel: true,
      });

      var ref = this;
      ref.setState({
        error: "",
      });

      if (ongoingGetOptionsAPI) {
        ongoingGetOptionsAPI();
      }

      if (e.target.value != 0) {
        /*axios.post('https://api.store.nodbearings.net/api/search_product/', {
	    	searching_key: e.target.value
	        

	    },

	    cancelToken: new CancelToken(function (cancel) {
		ongoingGetOptionsAPI = cancel
		})
	    )*/

        axios({
          url: "https://api.store.nodbearings.net/api/search_product/",
          method: "POST",
          data: {
            searching_key: e.target.value,
          },
          cancelToken: new CancelToken(function (cancel) {
            ongoingGetOptionsAPI = cancel;
          }),
        })
          .then(function (response) {
            console.log(response);
            if (response.data.description.length === 0) {
              ref.setState({
                suggestions: [],
                total_data: 0,
                data: response.data.description,
              });

              console.log(this.state.data);
            } else {
              ref.setState({
                data: response.data.description,
                suggestions: response.data.description,
                itemName: response.data.description[0].Item_Name,
                total_data: response.data.total_search_count,
              });
              console.log(this.state.suggestions);
              console.log(this.state.total_data);
            }

            console.log(ref.state.suggestions);
          })
          .catch(function (error) {});
      } else {
        this.setState({
          suggestions: [],
        });
      }
    }
  };

  onQuantityChange1(index, value) {
    /* var newState = {};
	    newState[e.target.name] = e.target.value;
	    this.setState(newState);*/
    /* var this.state.hover_nod_data

	    this.setState({
	    	quantity: e.target.value
	    })*/

    /*this.setState({
	    	hover_nod_data: [
		    	 ...this.state.hover_nod_data, 
		    	 [index]: value 	
	    	 ] 
	    })*/

    let { hover_nod_data } = this.state;
    hover_nod_data[index].quantity = value;
    this.setState({
      hover_nod_data,
      quantity1: this.state.hover_nod_data[0].quantity,
    });

    console.log(hover_nod_data);
  }

  onQuantityChange(e) {
    /* var newState = {};
	    newState[e.target.name] = e.target.value;
	    this.setState(newState);*/

    this.setState({
      quantity: e.target.value,
    });
  }

  async getItemData() {
    console.log("Error Message");
    var ProductData = localStorage.getItem("product_data");
    var ProductData1 = JSON.parse(ProductData);
    var price = parseInt(ProductData1.price[0]);
    var quantity = parseInt(this.state.quantity);
    var amount = price * quantity;
    console.log(amount);

    /*var new_quantity = parseInt(this.state.quantity);
		let itemExist = _.find(this.props.cart, item => item.itemcode[0] === ProductData1.itemcode[0])

		if(itemExist) {
			this.props.dispatch(updateCartData({
				...itemExist,
				Quantity: parseInt(itemExist.Quantity) + parseInt(new_quantity),
				Amount:  (parseInt(itemExist.Quantity) + parseInt(new_quantity)) * amount
			}))
		} else {
			this.props.dispatch(addCartData({
				...ProductData1,
				Quantity: this.state.quantity,
				Amount: amount
			}))
		}

		this.props.history.push('/cart');
		this.setState({
			showTypeahead: false,
			quantity: '',
			
		})*/

    if (
      window.location.href === zwzurl + "login#" ||
      hostname === "store.zwz.co.in" ||
      window.location.href === zwzurl ||
      window.location.href === zwzurl + "home" ||
      window.location.href === zwzurl + "product-category" ||
      window.location.href === zwzurl + "product-category" ||
      window.location.href === zwzurl + "cart" ||
      window.location.href === "https://localhost:3000/home#" ||
      window.location.href === "https://localhost:3000/login#" ||
      window.location.href === "https://localhost:3000" ||
      window.location.href === "https://localhost:3000/login" ||
      window.location.href === "https://localhost:3000/product-category" ||
      window.location.href === "https://localhost:3000/cart" ||
      window.location.href === zwzurl + "rfq" ||
      window.location.href === zwzurl + "order-history"
    ) {
      if (this.props.isLoggedIn) {
        console.log("ProductData1", ProductData1);
        var arr = [];
        var orderData = {};

        orderData["item_id"] = ProductData1.itemid[0].toString();
        orderData["item_name"] = ProductData1.itemname[0];
        orderData["amount_per_unit"] = ProductData1.price[0];
        orderData["quantity"] = this.state.quantity.toString();
        orderData["flag"] = "add_cart";

        arr.push(orderData);
        console.log("arr", arr);

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
          .then((response) => {
            console.log(response);
            this.setState({
              showTypeahead: false,
            });
            /*this.props.history.push('/cart');
	    	if ( ){
	    		window.location.reload();
	    	}else{
	    		this.props.history.push('/cart');
	    	}*/
            /*window.location.reload();*/

            if (this.props.match.path == "/cart") {
              window.location.reload();
            } else {
              this.props.history.push("/cart");
            }
          })
          .catch(function (error) {});
      } else {
        /*		var new_quantity = parseInt(this.state.quantity);
		let itemExist = _.find(this.props.cart, item => item.itemcode[0] === ProductData1.itemcode[0])

		if(itemExist) {
			this.props.dispatch(updateCartData({
				...itemExist,
				Quantity: parseInt(itemExist.Quantity) + parseInt(new_quantity),
				Amount:  (parseInt(itemExist.Quantity) + parseInt(new_quantity)) * amount
			}))
		} else {
			this.props.dispatch(addCartData({
				...ProductData1,
				Quantity: this.state.quantity,
				Amount: amount
			}))
		}
			this.setState({
				showTypeahead: false
			})
			this.props.history.push('/cart');*/

        var ProductData = localStorage.getItem("product_data");
        var ProductData1 = JSON.parse(ProductData);
        var price = parseInt(ProductData1.price);
        var quantity = parseInt(this.state.quantity);
        var amount = price * quantity;
        console.log(amount);

        var new_quantity = parseInt(this.state.quantity);
        let itemExist = _.find(
          this.props.cart,
          (item) => item.itemcode === ProductData1.itemcode
        );

        if (itemExist) {
          this.props.dispatch(
            updateCartData({
              ...itemExist,
              Quantity: parseInt(itemExist.Quantity) + parseInt(new_quantity),
              Amount:
                (parseInt(itemExist.Quantity) + parseInt(new_quantity)) *
                amount,
            })
          );
        } else {
          this.props.dispatch(
            addCartData({
              ...ProductData1,
              Quantity: this.state.quantity,
              Amount: amount,
            })
          );
        }

        this.setState({
          showTypeahead: false,
          quantity: "",
        });
        this.props.history.push("/cart");
      }
    } else if (
      window.location.href === "https://store.nodbearings.net/login#" ||
      hostname === "localhost" ||
      hostname === "store.nodbearings.net" ||
      window.location.href === "https://store.nodbearings.net/" ||
      window.location.href === "https://store.nodbearings.net/home" ||
      window.location.href ===
        "https://store.nodbearings.net/product-category" ||
      window.location.href ===
        "https://store.nodbearings.net/product-category" ||
      window.location.href === "https://store.nodbearings.net/cart" ||
      window.location.href === "https://store.nodbearings.net/rfq" ||
      window.location.href === "https://store.nodbearings.net/order-history" ||
      window.location.href === "https://localhost:3000/rfq" ||
      window.location.href === "https://localhost:3000/order-history"
    ) {
      if (this.props.isLoggedIn) {
        var arr = [];
        var orderData = {};

        orderData["item_id"] = ProductData1.itemid[0].toString();
        orderData["item_name"] = ProductData1.itemname[0];
        orderData["amount_per_unit"] = ProductData1.price[0];
        orderData["quantity"] = this.state.quantity.toString();
        orderData["flag"] = "add_cart";

        arr.push(orderData);

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
          .then((response) => {
            console.log(response);
            this.setState({
              showTypeahead: false,
            });

            /*if (window.location.href === 'https://store.nodbearings.net/cart' || window.location.href === zwzurl + 'cart' ){
	    			window.location.reload();
	    	}*/
            /*window.location.reload();*/

            if (this.props.match.path == "/cart") {
              window.location.reload();
            } else {
              this.props.history.push("/cart");
            }
          })
          .catch(function (error) {});
      } else {
        /*		var new_quantity = parseInt(this.state.quantity);
		let itemExist = _.find(this.props.cart, item => item.itemcode[0] === ProductData1.itemcode[0])

		if(itemExist) {
			this.props.dispatch(updateCartData({
				...itemExist,
				Quantity: parseInt(itemExist.Quantity) + parseInt(new_quantity),
				Amount:  (parseInt(itemExist.Quantity) + parseInt(new_quantity)) * amount
			}))
		} else {
			this.props.dispatch(addCartData({
				...ProductData1,
				Quantity: this.state.quantity,
				Amount: amount
			}))
		}
			this.setState({
				showTypeahead: false
			})
			this.props.history.push('/cart');*/

        var ProductData = localStorage.getItem("product_data");
        var ProductData1 = JSON.parse(ProductData);
        var price = parseInt(ProductData1.price);
        var quantity = parseInt(this.state.quantity);
        var amount = price * quantity;
        console.log(amount);

        var new_quantity = parseInt(this.state.quantity);
        let itemExist = _.find(
          this.props.cart,
          (item) => item.itemcode === ProductData1.itemcode
        );

        if (itemExist) {
          this.props.dispatch(
            updateCartData({
              ...itemExist,
              Quantity: parseInt(itemExist.Quantity) + parseInt(new_quantity),
              Amount:
                (parseInt(itemExist.Quantity) + parseInt(new_quantity)) *
                amount,
            })
          );
        } else {
          this.props.dispatch(
            addCartData({
              ...ProductData1,
              Quantity: this.state.quantity,
              Amount: amount,
            })
          );
        }

        this.props.history.push("/cart");
        this.setState({
          showTypeahead: false,
          quantity: "",
        });
      }
    }
  }

  async getItemData1(itemId, itemName, Price, itemData) {
    var nod_product_name = localStorage.getItem("nod_product_name");
    var nod_product_data = localStorage.getItem("nod_product_data");
    var nod_selected_data = JSON.parse(nod_product_data);

    /*var ProductData1 = JSON.parse(ProductData)
		console.log(ProductData1);
		console.log(ProductData1.itemid[0])*/
    var price = parseInt(Price);
    var quantity = 10;
    var amount = price * quantity;
    console.log(amount);
    console.log(this.props.isLoggedIn);
    console.log(itemId);
    console.log(itemName);
    console.log(Price);
    console.log(itemData);

    if (
      window.location.href === "https://store.nodbearings.net/login#" ||
      hostname === "localhost" ||
      hostname === "store.nodbearings.net" ||
      window.location.href === "https://store.nodbearings.net/" ||
      window.location.href === "https://store.nodbearings.net/home" ||
      window.location.href ===
        "https://store.nodbearings.net/product-category" ||
      window.location.href ===
        "https://store.nodbearings.net/product-category" ||
      window.location.href === "https://store.nodbearings.net/cart" ||
      window.location.href === "https://localhost:3000/" ||
      window.location.href === "https://store.nodbearings.net/rfq" ||
      window.location.href === "https://store.nodbearings.net/order-history"
    ) {
      if (this.props.isLoggedIn) {
        var arr = [];
        var orderData = {};

        orderData["item_id"] = itemId.toString();
        orderData["item_name"] = itemName;
        orderData["amount_per_unit"] = Price;
        orderData["quantity"] = this.state.quantity1;
        orderData["flag"] = "add_cart";

        arr.push(orderData);

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
          .then((response) => {
            console.log(response);
            this.setState({
              showTypeahead: false,
            });

            if (this.props.match.path == "/cart") {
              window.location.reload();
            } else {
              this.props.history.push("/cart");
            }

            /*window.location.reload();*/
          })
          .catch(function (error) {});
      } else {
        var new_quantity = 2;
        let itemExist = _.find(
          this.props.cart,
          (item) => item.itemcode === itemData.itemcode
        );

        if (itemExist) {
          this.props.dispatch(
            updateCartData({
              ...itemExist,
              Quantity: parseInt(itemExist.Quantity) + parseInt(new_quantity),
              Amount:
                (parseInt(itemExist.Quantity) + parseInt(new_quantity)) *
                amount,
            })
          );
        } else {
          console.log(this.state.hover_nod_data[0].quantity);
          this.props.dispatch(
            addCartData({
              ...itemData,
              Quantity: this.state.quantity1,
              Amount: amount,
            })
          );
        }
        this.setState({
          showTypeahead: false,
        });
        this.props.history.push("/cart");
      }
    }
  }

  hideTypeahead = (e) => {
    if (this.state.showTypeahead) {
      if (!this.typeahead.contains(e.target)) {
        this.setState({ showTypeahead: false });
      }
    }
  };
  render() {
    if (this.state.goToLogin) {
      return <Redirect to="/login" />;
    }

    if (this.state.goToHome) {
      return <Redirect to="/" />;
    }
    if (this.state.goToProduct) {
      return <Redirect to="/product-category" />;
    }

    return (
      <div className="header">
        <div className="header-main wrapper">
          {!nodlogo ? (
            <Col sm={1}>
              <div className="logo-container">
                <img
                  src={LOGO}
                  alt="Logo"
                  onClick={(e) =>
                    this.props.match.path === "/register" ||
                    this.props.match.path === "/emailverification" ||
                    !this.props.isLoggedIn
                      ? ""
                      : this.logoRedirection(e)
                  }
                  style={{ width: 80, cursor: "pointer" }}
                />
              </div>
            </Col>
          ) : (
            <Col sm={1}>
              <div className="logo-container">
                <img
                  src={LOGO}
                  onClick={(e) =>
                    this.props.match.path === "/register" ||
                    this.props.match.path === "/emailverification" ||
                    !this.props.isLoggedIn
                      ? ""
                      : this.logoRedirection(e)
                  }
                  alt="Logo"
                  style={{ width: 70, height: 70 }}
                />
              </div>
            </Col>
          )}

          <Col sm={8}>
            <div className="search-container">
              <div className="react-search-field test-class">
                <input
                  className="react-search-field-input text_val"
                  placeholder="Search by item"
                  type="text"
                  value={this.state.typeaheadText}
                  onKeyPress={(e) =>
                    this.props.match.path === "/register" ||
                    this.props.match.path === "/emailverification"
                      ? ""
                      : this.showListing(e)
                  }
                  onChange={(e) =>
                    this.props.match.path === "/register" ||
                    this.props.match.path === "/emailverification"
                      ? ""
                      : this.showTypeahead(e)
                  }
                />
                <button
                  className="react-search-field-button"
                  onClick={this.closeContainer}
                  type="button"
                >
                  {this.state.showLoader ? (
                    <Loader
                      visible={this.state.showLoader}
                      type="TailSpin"
                      color="#fff"
                      height={30}
                      width={30}
                      timeout={50000} //3 secs
                    />
                  ) : (
                    <i className="fa fa-search"> </i>
                  )}
                </button>
              </div>
              {this.state.showTypeahead && (
                <div
                  className="suggestions-container"
                  ref={(el) => (this.typeahead = el)}
                >
                  {this.state.zwz_search_pannel && (
                    <div className="suggestions" onClick={this.closeContainer}>
                      {this.state.data.length > 0 ? (
                        <p className="title">
                          Suggestions: {this.state.total_data}
                        </p>
                      ) : (
                        <p className="title">No Result Found</p>
                      )}

                      {this.state.suggestions.length > 0 &&
                        this.state.suggestions.map((item, index) => (
                          <p
                            key={index}
                            onMouseOver={() =>
                              this.onHover(item.id, item.Item_Name)
                            }
                            onClick={() => this.handleClick(item.id)}
                            className="typeahead-text"
                          >
                            {item.Item_Name},{item.cat_type},{item.cat_name} (
                            {item.universal_no}){" "}
                          </p>
                        ))}
                    </div>
                  )}

                  {this.state.nod_search_pannel && (
                    <div className="suggestions" onClick={this.closeContainer}>
                      {this.state.suggestions.length > 0 ? (
                        <p className="title">
                          Suggestions:{this.state.total_data}
                        </p>
                      ) : (
                        <p className="title">No Result Found</p>
                      )}

                      {this.state.suggestions.length > 0 &&
                        this.state.suggestions.map((item, index) => (
                          <p
                            key={index}
                            onMouseOver={() =>
                              this.onHover(item.id, item.Item_Name)
                            }
                            onClick={() => this.handleClick1(item.Item_Name)}
                            className="typeahead-text"
                          >
                            {item.Item_Name} | {item.cat_type} | {item.cat_name}{" "}
                            <br style={{ fontSize: 8 }} />{" "}
                            <p style={{ fontSize: 11, marginBottom: 8 }}>
                              {" "}
                              {item.universal_no}{" "}
                            </p>{" "}
                          </p>
                        ))}
                    </div>
                  )}

                  {this.state.zwz_hover_pannel && (
                    <div className="recommendation">
                      <p
                        className="title"
                        style={{ fontSize: 16, marginTop: 35 }}
                      >
                        Product Details
                      </p>
                      <div className="title-container">
                        <p className="title" style={{ fontSize: 15 }}>
                          Recommended Products {this.state.itemName}{" "}
                        </p>
                      </div>

                      {this.state.recommendation && (
                        <div className="recommended-item row">
                          <div class="col-sm-4">
                            <span className="item-description">
                              <span
                                style={{ fontWeight: "bold", color: "#00739E" }}
                              >
                                {" "}
                                {this.state.itemName},<br />
                                {this.state.subCategory},<br />
                                {this.state.category},{this.state.brandname}{" "}
                              </span>
                            </span>
                          </div>
                          <div
                            class="col-sm-2"
                            style={{ paddingRight: 0, paddingLeft: 25 }}
                          >
                            <img
                              src={this.state.image_url}
                              style={{ height: "65px", width: "65px" }}
                            />
                          </div>
                          <div
                            class="col-sm-2"
                            style={{
                              paddingRight: 0,
                              textAlign: "right",
                              paddingLeft: 35,
                            }}
                          >
                            <span>
                              <input
                                type="text"
                                value={this.state.quantity}
                                onChange={this.onQuantityChange}
                                className="recommendation_add_qty"
                                placeholder="Qty"
                                name="quantity"
                              />
                            </span>
                          </div>
                          <div
                            class="col-sm-4"
                            style={{ textAlign: "right", paddingLeft: 0 }}
                          >
                            <span className="item-action">
                              <button
                                className="button"
                                type="button"
                                onClick={this.getItemData}
                              >
                                Add To Cart
                              </button>
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {this.state.nod_hover_pannel && (
                    <div className="recommendation">
                      <p
                        className="title"
                        style={{ fontSize: 16, marginTop: 35 }}
                      >
                        Product Details
                      </p>
                      <div className="title-container">
                        <p className="title" style={{ fontSize: 15 }}>
                          Recommended Products {this.state.nod_item_name}{" "}
                        </p>
                      </div>

                      {this.state.recommendation &&
                        this.state.hover_nod_data.map((item, index) => (
                          <div className="recommended-item">
                            <span className="item-description">
                              <span
                                style={{ fontWeight: "bold", color: "#00739E" }}
                              >
                                {" "}
                                {item.itemname},{item.catname},{item.cattype}{" "}
                              </span>{" "}
                              <br />
                              <span
                                style={{ fontWeight: "bold", color: "#00739E" }}
                              >
                                {" "}
                                {item.brandname}{" "}
                              </span>
                            </span>

                            <span>
                              <input
                                type="text"
                                value={item.quantity}
                                className="recommendation_add_qty"
                                placeholder="Qty"
                                onChange={(e) =>
                                  this.onQuantityChange1(index, e.target.value)
                                }
                                name="quantity"
                              />
                            </span>

                            <span className="item-action">
                              <button
                                className="button"
                                type="button"
                                onClick={() =>
                                  this.getItemData1(
                                    item.itemid,
                                    item.itemname,
                                    item.price,
                                    item
                                  )
                                }
                              >
                                Add To Cart
                              </button>
                            </span>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </Col>

          <Col sm={3}>
            <div className="user-action">
              {!this.props.isLoggedIn ||
              this.props.match.path === "/register" ||
              this.props.match.path === "/login" ||
              this.props.match.path === "/register" ||
              this.props.match.path === "/emailverification" ? (
                <React.Fragment>
                  <a
                    className="text_style"
                    style={{ paddingLeft: 70 }}
                    onClick={this.openLogin}
                    href="#"
                  >
                    {" "}
                    SignIn{" "}
                  </a>
                  <span className="text_style"> / </span>
                  <a
                    style={{ color: "#fff", cursor: "pointer" }}
                    target="_blank"
                    className="text_style"
                    onClick={this.openRegister}
                  >
                    {" "}
                    SignUp{" "}
                  </a>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <a
                    className="text_style"
                    onClick={(e) =>
                      this.props.match.path === "/register"
                        ? ""
                        : this.goToMyProfile(e)
                    }
                    href="#"
                  >
                    {" "}
                    {this.state.login_details}{" "}
                  </a>
                  <span className="text_style"> / </span>
                  <a
                    style={{ color: "#fff", cursor: "pointer" }}
                    onClick={this.onLogout}
                    className="text_style"
                  >
                    {" "}
                    Logout{" "}
                  </a>
                </React.Fragment>
              )}

              {this.state.login_values1 && (
                <React.Fragment>
                  <a
                    className="text_style"
                    style={{ paddingLeft: 70 }}
                    onClick={this.openLogin}
                    href="#"
                  >
                    {" "}
                    SignIn{" "}
                  </a>
                  <span className="text_style"> / </span>
                  <a
                    style={{ color: "#fff", cursor: "pointer" }}
                    target="_blank"
                    className="text_style"
                    onClick={this.openRegister}
                  >
                    {" "}
                    SignUp{" "}
                  </a>
                </React.Fragment>
              )}

              <span className="text_style"> | </span>
              {this.props.isLoggedIn === true && (
                <i
                  className="fa fa-cart-arrow-down"
                  style={{ cursor: "pointer" }}
                  onClick={(e) =>
                    this.props.match.path === "/register" ||
                    this.props.match.path === "/emailverification" ||
                    !this.props.isLoggedIn
                      ? ""
                      : this.goToCart(e)
                  }
                >
                  <NotificationBadge
                    style={{ top: -38 }}
                    count={this.state.no_cart_data}
                    effect={Effect.SCALE}
                  />
                </i>
              )}

              {this.props.isLoggedIn === false && (
                <i
                  className="fa fa-cart-arrow-down"
                  style={{ cursor: "pointer" }}
                  onClick={(e) =>
                    this.props.match.path === "/register" ||
                    this.props.match.path === "/emailverification" ||
                    !this.props.isLoggedIn
                      ? ""
                      : this.goToCart(e)
                  }
                >
                  <NotificationBadge
                    style={{ top: -38 }}
                    effect={Effect.SCALE}
                  />
                </i>
              )}

              {this.state.cart_withoutLogin === true && (
                <i
                  className="fa fa-cart-arrow-down"
                  style={{ cursor: "pointer" }}
                  onClick={(e) =>
                    this.props.match.path === "/register" ||
                    this.props.match.path === "/emailverification"
                      ? ""
                      : this.goToCart(e)
                  }
                >
                  <NotificationBadge
                    style={{ top: -38 }}
                    count={this.props.cart.length}
                    effect={Effect.SCALE}
                  />
                </i>
              )}
            </div>
          </Col>
        </div>
        <div className="header-secondary">
          <Row className="wrapper">
            <Col sm={8}>
              <div className="nav-container">
                <ul className="navMenu" style={{ marginBottom: 0 }}>
                  <li>
                    <a
                      href=""
                      onClick={(e) =>
                        this.props.match.path === "/register" ||
                        this.props.match.path === "/emailverification"
                          ? ""
                          : this.goHomePage(e)
                      }
                      className={`${
                        this.props.match.path === "/" ? "active" : "inactive"
                      }`}
                    >
                      {" "}
                      Home{" "}
                    </a>
                  </li>

                  <li>
                    <a
                      href=""
                      onClick={(e) =>
                        this.props.match.path === "/register" ||
                        this.props.match.path === "/emailverification"
                          ? // ||
                            // !this.props.isLoggedIn
                            ""
                          : this.goToAbout(e)
                      }
                      className={`${
                        this.props.match.path === "/about"
                          ? "active"
                          : "inactive"
                      }`}
                    >
                      {" "}
                      About Us{" "}
                    </a>
                  </li>
                  <li style={{ display: "none" }}>
                    <a
                      href=""
                      onClick={(e) =>
                        this.props.match.path === "/register" ||
                        this.props.match.path === "/emailverification"
                          ? ""
                          : this.goToPrivacy(e)
                      }
                      className={`${
                        this.props.match.path === "/privacy-policy"
                          ? "active"
                          : "inactive"
                      }`}
                    >
                      {" "}
                      Privacy Policy{" "}
                    </a>
                  </li>
                  <li style={{ display: "none" }}>
                    <a
                      href=""
                      onClick={(e) =>
                        this.props.match.path === "/register" ||
                        this.props.match.path === "/emailverification"
                          ? ""
                          : this.goToTermsCondition(e)
                      }
                      className={`${
                        this.props.match.path === "/terms-condition"
                          ? "active"
                          : "inactive"
                      }`}
                    >
                      {" "}
                      Terms & Condition{" "}
                    </a>
                  </li>

                  {this.props.isLoggedIn && (
                    <li>
                      <a
                        href=""
                        id="TooltipExample"
                        onClick={(e) =>
                          this.props.match.path === "/register" ||
                          this.props.match.path === "/emailverification" ||
                          !this.props.isLoggedIn
                            ? ""
                            : this.goToRFQHistory(e)
                        }
                        className={`${
                          this.props.match.path === "/rfq-history"
                            ? "active"
                            : "inactive"
                        }`}
                      >
                        {" "}
                        RFI
                      </a>
                      <Tooltip
                        placement="bottom"
                        style={{ fontSize: 13 }}
                        isOpen={this.state.tooltipOpen}
                        target="TooltipExample"
                        toggle={this.toggle}
                      >
                        Request For Information
                      </Tooltip>
                    </li>
                  )}

                  {this.props.isLoggedIn && (
                    <li>
                      <a
                        href=""
                        onClick={(e) =>
                          this.props.match.path === "/register" ||
                          this.props.match.path === "/emailverification" ||
                          !this.props.isLoggedIn
                            ? ""
                            : this.goToOrderHistory(e)
                        }
                        className={`${
                          this.props.match.path === "/order-history"
                            ? "active"
                            : "inactive"
                        }`}
                      >
                        {" "}
                        Orders{" "}
                      </a>
                    </li>
                  )}

                  {this.props.isLoggedIn && (
                    <li>
                      <a
                        href=""
                        onClick={(e) =>
                          this.props.match.path === "/register" ||
                          this.props.match.path === "/emailverification" ||
                          !this.props.isLoggedIn
                            ? ""
                            : this.goToMyProfile(e)
                        }
                        className={`${
                          this.props.match.path === "/my-profile"
                            ? "active"
                            : "inactive"
                        }`}
                      >
                        {" "}
                        Account{" "}
                      </a>
                    </li>
                  )}

                  {this.props.match.path === "/product-category" && (
                    <li>
                      <a
                        href=""
                        className={`${
                          this.props.match.path === "/product-category"
                            ? "active"
                            : "inactive"
                        }`}
                      >
                        {" "}
                        Products{" "}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </Col>
            <Col sm={4}>
              <div
                className="language-selection-container"
                style={{ display: "none" }}
              >
                <ul className="navMenu">
                  <li style={{ width: 100 }}>
                    <span className="select-style">
                      <select style={{ width: "40%", paddingTop: 12 }}>
                        <option value="India">India</option>
                      </select>
                      <i
                        className="fa fa-caret-down"
                        style={{ color: "#fff" }}
                      ></i>
                    </span>
                  </li>

                  <li>
                    <span className="select-style">
                      <select style={{ width: "100%", paddingTop: 12 }}>
                        <option value="India">Select Languages</option>
                      </select>
                    </span>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default connect((state) => ({
  ...state.user,
  ...state.cartDetail,
  ...state.productDetail,
  ...state.updateProductData,
  ...state.cartItemVal,
  ...state.updateCartItemData,
}))(Header);
