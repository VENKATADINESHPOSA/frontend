import React, { Component } from "react";
import _ from "lodash";
import "./styles.scss";
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
  Modal,
  ButtonToolbar,
} from "reactstrap";
import { connect } from "react-redux";
import Header from "~/components/Header";
import Currency from "~/assets/images/currency.svg";
import share from "~/assets/images/share.png";
import axios from "axios";
import Footer from "~/components/Footer";
import image1 from "~/assets/images/1.jpg";
import image2 from "~/assets/images/2.jpg";
import image3 from "~/assets/images/3.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { updateCartData, addCartData } from "~/redux/action/cartDetails";
import { updateUserData } from "~/redux/action/user";
import { updateProductData } from "~/redux/action/productDetail";
import { zwzurl, zwzapiurl, nodurl, nodapiurl } from "../../urls.json";

class ProductCategory extends Component {
  constructor(props) {
    super(props);
    this.getItemData = this.getItemData.bind(this);
    this.getItemData1 = this.getItemData1.bind(this);
    this.onQuantityChange = this.onQuantityChange.bind(this);
    this.onQuantityChange1 = this.onQuantityChange1.bind(this);
    this.toggleActive = this.toggleActive.bind(this);
    this.toggleActive1 = this.toggleActive1.bind(this);
    this.shareToggel = this.shareToggel.bind(this);
    this.sendLink = this.sendLink.bind(this);
    this.copyText = this.copyText.bind(this);
    this.state = {
      itemname: "",
      categoryname: "",
      categorycode: "",
      categorytype: "",
      productcode: "",
      description: "",
      price: "",
      brandname: "",
      itemtype: "",
      quantity: "1",
      quantity1: "1",
      packing_type: "",
      qty_per_cartoon: "",
      stock: "",
      weight: "",
      dimension: "",
      country_association: "",
      country_origin: "",
      list_price: "",
      dimension_id: "",
      dimension_od: "",
      dimension_ow: "",
      display_zwz_product: false,
      display_nod_product: false,
      nod_itemName: "",
      push_nod_data: [],
      hover_nod_data: [],
      isCompleted: "",
      isCompleted1: false,
      shareModal: false,
      your_price: "",
    };
  }

  copyText() {
    var copyText = document.getElementById("myInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
  }

  sendLink() {
    if (window.location.href === zwzurl + "product-category") {
      this.setState({
        url: zwzurl + "productDetail/ZWZ:" + this.state.itemId,
      });

      localStorage.setItem("itemId", this.state.itemId);
      this.shareToggel();
    } else if (
      window.location.href === "https://localhost:3000/product-category"
    ) {
      this.setState({
        url: "https://localhost:3000/productDetail/ZWZ:" + this.state.itemId,
      });
      localStorage.setItem("itemId", this.state.itemId);
      this.shareToggel();
    } else if (
      window.location.href === "https://store.nodbearings.net/product-category"
    ) {
      this.setState({
        url:
          "https://store.nodbearings.net/productDetail/NOD:" +
          this.state.itemId,
      });
      localStorage.setItem("itemId", this.state.itemId);
      this.shareToggel();
    }
    /*if (window.location.href === zwzurl + "product-category" || window.location.href === "https://localhost:3000/product-category") {
			axios.get(zwzapiurl + 'api/ShareItem/ZWZ/'+this.state.itemId+"/" , 
				{
			 		headers: {
	          			'Authorization' : 'Token ' + sessionStorage.getItem('auth_key')
	        		} 

				 }
			)
		    .then((response) =>  {
		    	console.log(response);
		    })
		    .catch(function (error) {
		    });
		}*/
  }

  shareToggel() {
    this.setState((prevState) => ({ shareModal: !prevState.shareModal }));
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillMount() {
    /*var status = localStorage.getItem('status')
		this.setState({
			status: status
		})*/

    if (
      window.location.href == zwzurl + "product-category" ||
      window.location.href == "https://localhost:3000/rfq-history"
    ) {
      axios
        .get(zwzapiurl + "authentication/get_info/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + localStorage.getItem("auth_key"),
          },
        })
        .then((response) => {
          this.setState({
            status: response.data.data.status,
          });
        });
    } else if (
      window.location.href == "https://store.nodbearings.net/product-category"
    ) {
      axios
        .get("https://api.store.nodbearings.net/authentication/get_info/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + localStorage.getItem("auth_key"),
          },
        })
        .then((response) => {
          this.setState({
            status: response.data.data.status,
          });
        });
    }

    if (
      window.location.href === zwzurl + "product-category" ||
      window.location.href === "https://localhost:3000/product-category"
    ) {
      var ProductData = localStorage.getItem("product_data");
      var ProductData1 = JSON.parse(ProductData);
      var ProductVal = localStorage.getItem("product-val");
      console.log(ProductData1);

      this.setState({
        display_zwz_product: true,
        image: ProductData1.image_url,
        itemname: ProductData1.itemname[0],
        categoryname: ProductData1.catname[0],
        categorytype: ProductData1.cattype[0],
        productcode: ProductData1.itemcode[0],
        description: ProductData1.descript[0],
        price: ProductData1.price[0],
        brand: ProductData1.brandname[0],
        categorycode: ProductData1.catcode[0],
        itemtype: ProductData1.itemtype[0],
        itemId: ProductData1.itemid[0],
        country_origin: ProductData1.countryoforigin[0],
        universalNo: ProductData1.universalNo,
        competitorNo: 2098,
        your_price: ProductData1.your_price ? ProductData1.your_price : "",
        discount_percent: ProductData1.discount_percentage
          ? ProductData1.discount_percentage[0]
          : "",
      });

      if (this.state.your_price !== "") {
        console.log(this.state.your_price);
      }

      axios
        .post(zwzapiurl + "api/item_availability/", {
          searching_key: ProductData1.itemname[0],
        })
        .then((response) => {
          this.setState({
            packing_type: response.data.data_list.description[0].PackingType,
            qty_per_cartoon:
              response.data.data_list.description[0].QtyPerCarton,
            stock: response.data.data_list.description[0].Stock,
            weight: response.data.data_list.description[0].Weight,
            dimension: response.data.data_list.description[0].Dimension,
            // country_association: response.data.data.CA,
            list_price: response.data.data_list.description[0].price,
            dimension_id: response.data.data_list.description[0].Dimension_ID,
            dimension_od: response.data.data_list.description[0].Dimension_OD,
            dimension_ow: response.data.data_list.description[0].Dimension_OW,
          });
        })
        .catch(function (error) {});
    } else if (
      window.location.href ===
        "https://store.nodbearings.net/product-category" ||
      window.location.href === "https://localhost:3000/product-category"
    ) {
      var nod_product_name = localStorage.getItem("nod_product_name");
      var nod_product_data = localStorage.getItem("nod_product_data");
      var nod_selected_data = JSON.parse(nod_product_data);
      console.log("nod_selected_data", nod_selected_data);
      this.setState({
        display_nod_product: true,
        nod_itemName: nod_product_name,
        push_nod_data: nod_selected_data,
        itemname: nod_product_name,
      });
    }
  }

  toggleActive(wishId) {
    console.log(wishId);
    /*let newState = Object.assign({}, this.state)
	    let wish = _.find(newState.wishes, {id: wishId});
	    wish.have = !wish.have
	    this.setState(newState)*/
    this.setState({
      isCompleted: wishId,
    });
  }

  toggleActive1() {
    this.setState({
      isCompleted1: !this.state.isCompleted1,
    });
  }

  onQuantityChange(e) {
    this.setState({
      quantity: e.target.value,
    });
  }

  onQuantityChange1(index, value) {
    let { push_nod_data } = this.state;
    push_nod_data[index].quantity = value;
    this.setState({
      push_nod_data,
      quantity1: value,
    });

    /* let { hover_nod_data } = this.state
		hover_nod_data[index].quantity = value
		this.setState({
		hover_nod_data,
		quantity1: this.state.hover_nod_data[0].quantity

		})

		console.log(hover_nod_data);*/
  }

  async getItemData() {
    var ProductData = localStorage.getItem("product_data");
    var ProductData1 = JSON.parse(ProductData);
    var price = parseInt(ProductData1.price[0]);
    var quantity = parseInt(this.state.quantity);
    var amount = price * quantity;

    if (
      window.location.href === zwzurl + "product-category" ||
      window.location.href === "https://localhost:3000/product-category"
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
            this.props.history.push("/cart");
          })
          .catch(function (error) {});
      } else {
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
      }
    } else if (
      window.location.href === "https://store.nodbearings.net/product-category"
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
            this.props.history.push("/cart");
            /*window.location.reload();*/
          })
          .catch(function (error) {});
      } else {
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
      window.location.href ===
        "https://store.nodbearings.net/product-category" ||
      window.location.href === "https://localhost:3000/product-category"
    ) {
      if (this.props.isLoggedIn) {
        var arr = [];
        var orderData = {};

        orderData["item_id"] = itemId;
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
            this.props.history.push("/cart");
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
          console.log(this.state.push_nod_data[0].quantity);
          this.props.dispatch(
            addCartData({
              ...itemData,
              Quantity: this.state.quantity1,
              Amount: amount,
            })
          );
        }
        this.props.history.push("/cart");
      }
    }
  }

  render() {
    const { shareModal } = this.state;
    return (
      <div>
        <Header {...this.props} typeaheadText={this.state.itemname}>
          {" "}
        </Header>
        <div
          className="content-container wrapper"
          style={{ backgroundColor: "#f4f4f4", padding: 10, marginTop: 175 }}
        >
          {this.state.display_zwz_product && (
            <Row>
              <Col sm={12} style={{ marginTop: 6 }}>
                <h3> You Searched For {this.state.itemname} </h3>
                <span style={{ fontWeight: "bold", paddingLeft: 2 }}>
                  {" "}
                  Status :
                  <span
                    style={{
                      color: this.state.status == "Active" ? "green" : "red",
                      fontWeight: 200,
                      paddingLeft: 4,
                    }}
                  >
                    {" "}
                    {this.state.status}{" "}
                  </span>{" "}
                </span>
              </Col>
            </Row>
          )}

          {this.state.display_nod_product && (
            <Row>
              <Col sm={12} style={{ marginTop: 6 }}>
                <h3> You Searched For {this.state.nod_itemName} </h3>
              </Col>
            </Row>
          )}

          {this.state.display_zwz_product && (
            <Row>
              <Col sm={8} style={{ marginTop: 25 }}>
                <Card>
                  <CardBody
                    className="customise_card_body"
                    style={{ padding: 18 }}
                  >
                    <CardTitle style={{ marginBottom: 20 }}>
                      <div
                        style={{
                          width: "80%",
                          float: "left",
                          marginBottom: 12,
                        }}
                      >
                        <img
                          src={this.state.image}
                          style={{ height: "65px", width: "65px" }}
                        />
                      </div>
                      <div
                        style={{
                          width: "20%",
                          float: "left",
                          textAlign: "right",
                        }}
                      >
                        <span>
                          {" "}
                          <img
                            onClick={this.sendLink}
                            style={{ width: 25, height: 25 }}
                            src={share}
                          />{" "}
                        </span>
                      </div>
                      <h4
                        style={{
                          fontWeight: "bold",
                          width: "100%",
                          float: "left",
                        }}
                      >
                        {" "}
                        {this.state.itemname}{" "}
                      </h4>
                      {/*<span> Add to wishlist<i className="fa fa-heart" style={{ color: this.state.isCompleted1? '#DE5347': '#444', paddingLeft: 10, fontSize: 18}} onClick={() => this.toggleActive1()} ></i> </span>*/}
                    </CardTitle>

                    <CardSubtitle
                      style={{ fontSize: 14, width: "100%", float: "left" }}
                    >
                      <p>
                        <span style={{ fontWeight: "bold", paddingRight: 5 }}>
                          {" "}
                          Brand Name:{" "}
                        </span>{" "}
                        <span> {this.state.brand} </span>{" "}
                      </p>
                    </CardSubtitle>
                  </CardBody>
                </Card>
              </Col>
              <Col sm={4} style={{ marginTop: 25 }}>
                <Card>
                  <CardBody
                    className="customise_card_body"
                    style={{ padding: 18 }}
                  >
                    <CardSubtitle>
                      {this.state.price === 0 && (
                        <p className="list_price">
                          {" "}
                          List Price:{" "}
                          <a
                            style={{
                              fontWeight: "bold",
                              fontSize: 15,
                              paddingLeft: 4,
                              paddingBottom: 30,
                              borderBottom: 1,
                              color: "red",
                              fontSize: 13,
                              cursor: "pointer",
                            }}
                          >
                            {" "}
                            Display on request{" "}
                          </a>{" "}
                        </p>
                      )}

                      {this.state.price > 0 && (
                        <p className="list_price">
                          {" "}
                          List Price:{" "}
                          <a
                            style={{
                              fontWeight: "bold",
                              fontSize: 15,
                              paddingLeft: 4,
                              paddingBottom: 30,
                              borderBottom: 1,
                            }}
                          >
                            <i
                              class="fa fa-inr"
                              style={{ fontSize: 12 }}
                              aria-hidden="true"
                            ></i>{" "}
                            {this.state.price.toLocaleString(
                              navigator.language,
                              { minimumFractionDigits: 0 }
                            )}{" "}
                          </a>{" "}
                        </p>
                      )}

                      {this.state.your_price !== "" && (
                        <div>
                          <p className="list_price">
                            {" "}
                            Your Price:{" "}
                            <a
                              style={{
                                fontWeight: "bold",
                                fontSize: 15,
                                paddingLeft: 4,
                                paddingBottom: 30,
                                borderBottom: 1,
                              }}
                            >
                              {" "}
                              <i
                                class="fa fa-inr"
                                style={{ fontSize: 12 }}
                                aria-hidden="true"
                              ></i>{" "}
                              {this.state.your_price.toLocaleString(
                                navigator.language,
                                { minimumFractionDigits: 0 }
                              )}{" "}
                              ({this.state.discount_percent}% savings){" "}
                            </a>{" "}
                          </p>
                        </div>
                      )}

                      <p style={{ fontWeight: "bold" }}>
                        {" "}
                        Quantity:
                        <input
                          type="text"
                          value={this.state.quantity}
                          name="quantity"
                          placeholder="Quantity"
                          onChange={this.onQuantityChange}
                          className="setInput"
                        />
                      </p>

                      <input
                        type="button"
                        onClick={this.getItemData}
                        value="Add to cart"
                        className="login_btn"
                      />
                    </CardSubtitle>
                  </CardBody>
                </Card>
              </Col>
              <Col sm={8} style={{ marginTop: 25 }}>
                <Card>
                  <CardBody
                    className="customise_card_body"
                    style={{ padding: 18 }}
                  >
                    <h5 className="product_title_style"> Product Details </h5>
                    <div
                      style={{
                        width: "50%",
                        backgroundColor: "#f4f4f4",
                        padding: 18,
                        fontSize: 14,
                        float: "left",
                      }}
                    >
                      <p>
                        <span style={{ fontWeight: "bold", paddingRight: 5 }}>
                          Category:{" "}
                        </span>
                        <span style={{ textTransform: "capitalize" }}>
                          {" "}
                          {this.state.categorytype}{" "}
                        </span>{" "}
                      </p>
                      <p>
                        <span style={{ fontWeight: "bold", paddingRight: 5 }}>
                          {" "}
                          Sub Category:{" "}
                        </span>
                        {this.state.categoryname}{" "}
                      </p>
                      <p>
                        <span style={{ fontWeight: "bold", paddingRight: 5 }}>
                          {" "}
                          Brand Name:{" "}
                        </span>{" "}
                        <span> {this.state.brand} </span>{" "}
                      </p>
                      {this.state.qty_per_cartoon === "0" ? (
                        <p>
                          {" "}
                          <span style={{ fontWeight: "bold", paddingRight: 5 }}>
                            {" "}
                            Qty/Cartoon:
                          </span>{" "}
                          <span> NA </span>
                        </p>
                      ) : (
                        <p>
                          {" "}
                          <span style={{ fontWeight: "bold", paddingRight: 5 }}>
                            {" "}
                            Qty/Cartoon:
                          </span>{" "}
                          <span> {this.state.qty_per_cartoon} nos </span>
                        </p>
                      )}

                      <p>
                        <span style={{ fontWeight: "bold", paddingRight: 5 }}>
                          {" "}
                          Universal No.:{" "}
                        </span>{" "}
                        <span> {this.state.universalNo} </span>{" "}
                      </p>
                    </div>

                    <div
                      style={{
                        width: "50%",
                        paddingBottom: 55,
                        backgroundColor: "#f4f4f4",
                        padding: 18,
                        fontSize: 14,
                        float: "left",
                      }}
                    >
                      <p>
                        {" "}
                        <span style={{ fontWeight: "bold", paddingRight: 5 }}>
                          {" "}
                          Item Name:{" "}
                        </span>{" "}
                        <span> {this.state.itemname} </span>
                      </p>
                      <p>
                        {" "}
                        <span style={{ fontWeight: "bold", paddingRight: 5 }}>
                          {" "}
                          Packing Type:
                        </span>{" "}
                        <span> {this.state.packing_type} </span>
                      </p>

                      <p>
                        {" "}
                        <span style={{ fontWeight: "bold" }}>
                          {" "}
                          Country Association:{" "}
                        </span>{" "}
                        <span> {this.state.country_origin} </span>{" "}
                      </p>

                      {this.state.list_price === 0 && (
                        <p
                          className="list_price"
                          style={{ fontWeight: "bold" }}
                        >
                          {" "}
                          List Price:{" "}
                          <a
                            style={{
                              fontWeight: "bold",
                              paddingLeft: 4,
                              paddingBottom: 30,
                              borderBottom: 1,
                              color: "red",
                              cursor: "pointer",
                              fontSize: 12,
                            }}
                          >
                            {" "}
                            Display on request{" "}
                          </a>{" "}
                        </p>
                      )}

                      {this.state.list_price > 0 && (
                        <p
                          className="list_price"
                          style={{ fontWeight: "bold" }}
                        >
                          {" "}
                          List Price:{" "}
                          <a
                            style={{
                              fontWeight: "bold",
                              paddingLeft: 4,
                              paddingBottom: 30,
                              borderBottom: 1,
                            }}
                          >
                            {" "}
                            <i
                              class="fa fa-inr"
                              style={{ fontSize: 12 }}
                              aria-hidden="true"
                            ></i>{" "}
                            {this.state.list_price.toLocaleString(
                              navigator.language,
                              { minimumFractionDigits: 0 }
                            )}{" "}
                          </a>{" "}
                        </p>
                      )}

                      <p>
                        <span style={{ fontWeight: "bold", paddingRight: 5 }}>
                          {" "}
                          Competitors No.:{" "}
                        </span>{" "}
                        <span> {this.state.competitorNo} </span>{" "}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </Col>

              <Col sm={4} style={{ marginTop: 25 }}>
                <Card>
                  <CardBody
                    className="customise_card_body"
                    style={{ padding: 18 }}
                  >
                    <h5 className="product_title_style">
                      {" "}
                      Availability Details{" "}
                    </h5>

                    <div style={{ width: "100%" }}>
                      <table
                        className="product_detail_table"
                        style={{ width: "100%" }}
                      >
                        <tr style={{ backgroundColor: "#ccc" }}>
                          <th> Item Name </th>
                          <th> Availability </th>
                        </tr>

                        <tr>
                          <td> {this.state.itemname} </td>

                          {this.state.stock === "" ? (
                            <td> NA </td>
                          ) : (
                            <td> {this.state.stock} </td>
                          )}
                        </tr>
                      </table>
                    </div>
                  </CardBody>
                </Card>
              </Col>

              <Col sm={8} style={{ marginTop: 25 }}>
                <Card>
                  <CardBody
                    className="customise_card_body"
                    style={{ padding: 18 }}
                  >
                    <h5 className="product_title_style">
                      {" "}
                      Technical Specifications{" "}
                    </h5>
                    <div
                      style={{
                        width: "50%",
                        backgroundColor: "#f4f4f4",
                        padding: 18,
                        fontSize: 14,
                        float: "left",
                      }}
                    >
                      {this.state.dimension_id === "0.0" ? (
                        <p>
                          {" "}
                          <span style={{ fontWeight: "bold" }}>
                            {" "}
                            Dimension:{" "}
                          </span>{" "}
                          <span> ID: NA || OD: NA || OW: NA</span>{" "}
                        </p>
                      ) : (
                        <p>
                          {" "}
                          <span style={{ fontWeight: "bold" }}>
                            {" "}
                            Dimension:{" "}
                          </span>{" "}
                          <span>
                            {" "}
                            ID: {this.state.dimension_id} || OD:{" "}
                            {this.state.dimension_od} || OW:{" "}
                            {this.state.dimension_ow}
                          </span>{" "}
                        </p>
                      )}
                    </div>

                    <div
                      style={{
                        width: "50%",
                        paddingBottom: 55,
                        backgroundColor: "#f4f4f4",
                        padding: 18,
                        fontSize: 14,
                        float: "left",
                      }}
                    >
                      {this.state.weight === "0.000000" ? (
                        <p>
                          {" "}
                          <span style={{ fontWeight: "bold", paddingRight: 5 }}>
                            {" "}
                            Weight:
                          </span>{" "}
                          <span> NA </span>
                        </p>
                      ) : (
                        <p>
                          {" "}
                          <span style={{ fontWeight: "bold", paddingRight: 5 }}>
                            {" "}
                            Weight:
                          </span>{" "}
                          <span> {this.state.weight} kg </span>
                        </p>
                      )}
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}

          {this.state.display_nod_product &&
            this.state.push_nod_data.length > 0 &&
            this.state.push_nod_data.map((item, index) => (
              <Col sm={12} style={{ marginTop: 25 }}>
                <Card>
                  <CardBody
                    className="customise_card_body"
                    style={{ padding: 18 }}
                  >
                    <h5
                      className="product_title_style"
                      style={{ width: "85%", float: "left" }}
                    >
                      {" "}
                      {item.itemname} ({item.brandname}){" "}
                    </h5>
                    <div
                      style={{ width: "15%", float: "left", display: "none" }}
                      className="icon_container"
                    >
                      Add to wishlist{" "}
                      <span>
                        <i
                          className="fa fa-heart"
                          color={this.state.isCompleted ? "#1DA664" : "#DE5347"}
                          style={{
                            color:
                              this.state.isCompleted === item.itemid
                                ? "#DE5347"
                                : "#444",
                            paddingLeft: 10,
                            fontSize: 18,
                          }}
                          onClick={() => this.toggleActive(item.itemid)}
                        ></i>
                      </span>
                    </div>

                    <div
                      style={{
                        width: "25%",
                        backgroundColor: "#f4f4f4",
                        padding: 18,
                        fontSize: 14,
                        float: "left",
                      }}
                    >
                      <p>
                        <span style={{ fontWeight: "bold", paddingRight: 5 }}>
                          {" "}
                          Brand Name:{" "}
                        </span>{" "}
                        <span> {item.brandname} </span>{" "}
                      </p>
                      <p>
                        {" "}
                        <span style={{ fontWeight: "bold", paddingRight: 5 }}>
                          {" "}
                          Item Name:{" "}
                        </span>{" "}
                        <span> {item.itemname} </span>
                      </p>
                      <p>
                        {" "}
                        <span style={{ fontWeight: "bold", paddingRight: 5 }}>
                          {" "}
                          Packing Type:
                        </span>{" "}
                        <span> {item.PackingType} </span>
                      </p>
                      {item.Dimension_ID === "0.0" ? (
                        <p>
                          {" "}
                          <span style={{ fontWeight: "bold" }}>
                            {" "}
                            Dimension:{" "}
                          </span>{" "}
                          <span> ID: NA || OD: NA || OW: NA</span>{" "}
                        </p>
                      ) : (
                        <p>
                          {" "}
                          <span style={{ fontWeight: "bold" }}>
                            {" "}
                            Dimension:{" "}
                          </span>{" "}
                          <span>
                            {" "}
                            ID: {item.Dimension_ID} || OD: {item.Dimension_OD}{" "}
                            || OW: {item.Dimension_OW}
                          </span>{" "}
                        </p>
                      )}
                    </div>

                    <div
                      style={{
                        width: "25%",
                        backgroundColor: "#f4f4f4",
                        padding: 18,
                        fontSize: 14,
                        float: "left",
                        paddingBottom: 39,
                      }}
                    >
                      <p>
                        {" "}
                        <span style={{ fontWeight: "bold" }}>
                          {" "}
                          Category Name:{" "}
                        </span>{" "}
                        <span> {item.cattype} </span>{" "}
                      </p>
                      <p>
                        {" "}
                        <span style={{ fontWeight: "bold" }}>
                          {" "}
                          Sub Category:{" "}
                        </span>{" "}
                        <span> {item.catname} </span>{" "}
                      </p>

                      {item.QtyPerCarton === "0" ? (
                        <p>
                          {" "}
                          <span style={{ fontWeight: "bold", paddingRight: 5 }}>
                            {" "}
                            Qty/Cartoon:
                          </span>{" "}
                          <span> NA </span>
                        </p>
                      ) : (
                        <p>
                          {" "}
                          <span style={{ fontWeight: "bold", paddingRight: 5 }}>
                            {" "}
                            Qty/Cartoon:
                          </span>{" "}
                          <span> {item.QtyPerCarton} nos </span>
                        </p>
                      )}

                      {item.Stock === "" ? (
                        <p>
                          {" "}
                          <span style={{ fontWeight: "bold", paddingRight: 5 }}>
                            Availability:
                          </span>{" "}
                          <span> NA </span>
                        </p>
                      ) : (
                        <p>
                          {" "}
                          <span style={{ fontWeight: "bold", paddingRight: 5 }}>
                            Availability:
                          </span>{" "}
                          <span> {item.Stock} </span>
                        </p>
                      )}
                    </div>

                    <div
                      style={{
                        width: "25%",
                        backgroundColor: "#f4f4f4",
                        padding: 18,
                        fontSize: 14,
                        float: "left",
                        paddingBottom: 75,
                      }}
                    >
                      <p>
                        {" "}
                        <span style={{ fontWeight: "bold" }}>
                          {" "}
                          Country Association:{" "}
                        </span>{" "}
                        <span> {item.countryoforigin} </span>{" "}
                      </p>

                      {item.price === 0 ? (
                        <p>
                          {" "}
                          <span
                            style={{ fontWeight: "bold" }}
                            Rupees={"\u20B9"}
                          >
                            {" "}
                            List Price:{" "}
                          </span>{" "}
                          <span
                            style={{
                              fontWeight: "bold",
                              paddingLeft: 4,
                              paddingBottom: 30,
                              borderBottom: 1,
                              color: "red",
                              fontSize: 12,
                              cursor: "pointer",
                            }}
                          >
                            {" "}
                            Display on request{" "}
                          </span>{" "}
                        </p>
                      ) : (
                        <p>
                          {" "}
                          <span
                            style={{ fontWeight: "bold" }}
                            Rupees={"\u20B9"}
                          >
                            {" "}
                            List Price:{" "}
                          </span>{" "}
                          <span>
                            {" "}
                            <i
                              class="fa fa-inr"
                              style={{ fontSize: 12 }}
                              aria-hidden="true"
                            ></i>{" "}
                            {item.price}{" "}
                          </span>{" "}
                        </p>
                      )}

                      {item.Weight === "0.000000" ? (
                        <p>
                          {" "}
                          <span style={{ fontWeight: "bold", paddingRight: 5 }}>
                            {" "}
                            Weight:
                          </span>{" "}
                          <span> NA </span>
                        </p>
                      ) : (
                        <p>
                          {" "}
                          <span style={{ fontWeight: "bold", paddingRight: 5 }}>
                            {" "}
                            Weight:
                          </span>{" "}
                          <span>
                            {" "}
                            DecimalPrecision.round({item.Weight}) kg{" "}
                          </span>
                        </p>
                      )}

                      <p>
                        {" "}
                        <span style={{ fontWeight: "bold" }}>
                          {" "}
                          Universal No.:{" "}
                        </span>{" "}
                        <span> {item.UniversalNo} </span>{" "}
                      </p>
                    </div>

                    <div
                      style={{
                        width: "22%",
                        float: "left",
                        marginLeft: 30,
                        border: 1,
                        textAlign: "center",
                        paddingTop: 10,
                        paddingLeft: 10,
                      }}
                      className="add_cart_container"
                    >
                      {item.price === 0 && (
                        <p className="list_price" style={{ textAlign: "left" }}>
                          {" "}
                          List Price:{" "}
                          <a
                            style={{
                              fontWeight: "bold",
                              paddingLeft: 4,
                              paddingBottom: 30,
                              borderBottom: 1,
                              color: "red",
                              fontSize: 12,
                              cursor: "pointer",
                            }}
                          >
                            {" "}
                            Display on request{" "}
                          </a>{" "}
                        </p>
                      )}

                      {item.price > 0 && (
                        <p className="list_price" style={{ textAlign: "left" }}>
                          {" "}
                          List Price:{" "}
                          <a
                            style={{
                              fontWeight: "bold",
                              paddingLeft: 4,
                              paddingBottom: 30,
                              borderBottom: 1,
                            }}
                          >
                            {" "}
                            <i
                              class="fa fa-inr"
                              style={{ fontSize: 12 }}
                              aria-hidden="true"
                            ></i>{" "}
                            {item.price}{" "}
                          </a>{" "}
                        </p>
                      )}

                      {this.state.your_price !== "" && (
                        <p className="list_price" style={{ textAlign: "left" }}>
                          {" "}
                          Your Price:{" "}
                          <a
                            style={{
                              fontWeight: "bold",
                              paddingLeft: 4,
                              paddingBottom: 30,
                              borderBottom: 1,
                            }}
                          >
                            {" "}
                            <i
                              class="fa fa-inr"
                              style={{ fontSize: 12 }}
                              aria-hidden="true"
                            ></i>{" "}
                            {this.state.your_price}{" "}
                          </a>{" "}
                        </p>
                      )}

                      {item.your_price && (
                        <div>
                          <p className="list_price">
                            {" "}
                            Your Price:{" "}
                            <a
                              style={{
                                fontWeight: "bold",
                                fontSize: 15,
                                paddingLeft: 4,
                                paddingBottom: 30,
                                borderBottom: 1,
                              }}
                            >
                              {" "}
                              <i
                                class="fa fa-inr"
                                style={{ fontSize: 12 }}
                                aria-hidden="true"
                              ></i>{" "}
                              {item.your_price.toLocaleString(
                                navigator.language,
                                { minimumFractionDigits: 0 }
                              )}{" "}
                              ({item.discount_percentage}% savings){" "}
                            </a>{" "}
                          </p>
                        </div>
                      )}

                      <p
                        style={{
                          fontWeight: "bold",
                          textAlign: "left",
                          fontSize: 15,
                        }}
                      >
                        {" "}
                        Quantity:
                        <input
                          type="text"
                          onChange={(e) =>
                            this.onQuantityChange1(index, e.target.value)
                          }
                          style={{ height: 27, width: 73, marginBottom: 16 }}
                          defaultValue={item.quantity || 1}
                          name="quantity"
                          placeholder="Quantity"
                          className="setInput"
                        />{" "}
                        nos
                        <input
                          type="button"
                          onClick={() =>
                            this.getItemData1(
                              item.itemid,
                              item.itemname,
                              item.price,
                              item
                            )
                          }
                          style={{
                            width: "96%",
                            fontSize: 12,
                            fontWeight: "bold",
                            height: 28,
                          }}
                          value="Add to cart"
                          className="login_btn"
                        />
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
        </div>
        <Footer> </Footer>

        <Modal
          isOpen={shareModal}
          toggle={this.shareToggel}
          style={{ height: 200 }}
        >
          <div className="modal__header">
            <button
              className="fa fa-times modal__close-btn"
              type="button"
              style={{ right: 15 }}
              onClick={this.shareToggel}
            />
          </div>
          <div
            className="modal__body"
            style={{ paddingTop: 45, paddingBottom: 15 }}
          >
            <div style={{ flexDirection: "row", padding: 10 }}>
              <div style={{ width: "75%", float: "left" }}>
                <input
                  type="text"
                  id="myInput"
                  style={{ borderWidth: 1, borderColor: "black" }}
                  value={this.state.url}
                />
              </div>

              <div
                style={{
                  width: "20%",
                  float: "left",
                  textAlign: "left",
                  paddingTop: 5,
                  paddingLeft: 10,
                }}
              >
                {/*<button>Copy Text*/}{" "}
                <i
                  style={{ fontSize: 20 }}
                  className="fa fa-clipboard"
                  onClick={this.copyText}
                ></i>
                {/*</button>*/}
              </div>
            </div>
          </div>
          <ButtonToolbar
            className="modal__footer"
            style={{ marginTop: 0 }}
          ></ButtonToolbar>
        </Modal>
      </div>
    );
  }
}

export default connect((state) => ({
  ...state.user,
  ...state.cartDetail,
  ...state.updateProductData,
}))(ProductCategory);
