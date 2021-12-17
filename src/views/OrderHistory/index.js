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
  Table,
  Modal,
} from "reactstrap";
import { connect } from "react-redux";
import Header from "~/components/Header";
import ModalData from "~/components/modal";
import Currency from "~/assets/images/currency.svg";
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
import { MDBDataTable } from "mdbreact";
import { zwzurl, zwzapiurl, nodurl, nodapiurl } from "../../urls.json";

class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.getItemData = this.getItemData.bind(this);
    this.getItemData1 = this.getItemData1.bind(this);
    /*this.onQuantityChange = this.onQuantityChange.bind(this);*/
    this.openModal = this.openModal.bind(this);
    this.onQuantityChange1 = this.onQuantityChange1.bind(this);
    this.openInvoice = this.openInvoice.bind(this);
    this.state = {
      noData: false,
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
      reference_num: "",
      rfqData: [],
      rfqDataDetails: [],
      showModal: false,
      isActive: false,
      tableRows: [],
      posts: [],
    };
  }

  openModal() {
    console.log("dfghjk");
    this.setState({
      showModal: true,
    });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    /*var status = localStorage.getItem('status')
		this.setState({
			status: status
		})*/

    if (
      window.location.href == zwzurl + "order-history" ||
      window.location.href == "https://localhost:3000/order-history"
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
      window.location.href == "https://store.nodbearings.net/order-history"
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
        })
        .catch(function (error) {
          if (error.response.status == 401) {
            window.location.href = "/login";
          }
        });
    }

    if (
      window.location.href === zwzurl + "rfq-history" ||
      window.location.href === zwzurl + "order-history" ||
      window.location.href.indexOf("https://localhost:3000/order-history") > -1
    ) {
      this.setState({
        isActive: true,
      });

      axios
        .get(zwzapiurl + "api/my_order/", {
          headers: {
            Authorization: "Token " + localStorage.getItem("auth_key"),
          },
        })
        .then((response) => {
          this.setState({
            posts: response.data.message.data,
            rfqData: response.data.message.data,

            isActive: false,
          });
          // this.state.rfqData = response.data.message.data;
          // this.state.isActive = false;
          /*this.state.rfqData.map((item, index) => (
					
						item["action"] = <a href={item.href} onClick={this.openModal}> {item.status} </a>,
					
					 
					 console.log(item)

				));	*/

          this.setState({
            rfqData: this.state.rfqData,
            tableRows: this.assemblePosts(),
            isActive: false,
          });
        })
        .catch(function (error) {});
    } else if (
      window.location.href === "https://store.nodbearings.net/order-history" ||
      window.location.href === "https://store.nodbearings.net/order-history#"
    ) {
      this.setState({
        isActive: true,
      });
      axios
        .get("https://api.store.nodbearings.net/api/my_order/", {
          headers: {
            Authorization: "Token " + localStorage.getItem("auth_key"),
          },
        })
        .then((response) => {
          if (response.data.success == true) {
            var arr = [];
            /*	for(var i = 0; i < response.data.message.info.length; i++) {
					for(var z = 0; z < response.data.message.info[i].data.length; z++) {
			   			var newarr= [];
						var orderData  = {};
			    		orderData['BrandName'] = response.data.message.info[i].data[z].BrandName;
			    		orderData['ItemName'] = response.data.message.info[i].data[z].ItemName;
			    		orderData['CatType'] = response.data.message.info[i].data[z].cattype
			    		orderData['CatName'] = response.data.message.info[i].data[z].catname
						orderData['Qty'] = response.data.message.info[i].data[z].Qty
						orderData['Price'] = response.data.message.info[i].data[z].Price
						
			}
				arr.push(orderData);
			}*/
            console.log(arr);
            /*this.setState({
				rfqData: response.data.message.info,
				rfqDataDetails: arr,
				isActive: false
		    })*/
            this.setState({
              posts: response.data.message.data,
              rfqData: response.data.message.data,

              isActive: false,
            });
            this.setState({
              rfqData: this.state.rfqData,
              tableRows: this.assemblePosts(),
              isActive: false,
            });
          } else {
            this.setState({
              noData: true,
              isActive: false,
            });
          }
        })
        .catch(function (error) {
          /*if (error.response.status == 401) {
			    		window.location.href = "/login"
			    	}*/
        });
    }
  }

  assemblePosts = () => {
    let posts = this.state.posts.map((post) => {
      var invoice_id = post.mysc_order_no.split("I");
      var getInvoiceId = invoice_id[0];
      if (
        window.location.href == zwzurl + "order-history" ||
        window.location.href == zwzurl + "order-history#" ||
        window.location.href.indexOf("https://localhost:3000/order-history") >
          -1
      ) {
        var url = zwzapiurl + "api/print_sales_invoice/" + getInvoiceId + "/";
      } else if (
        window.location.href == "https://store.nodbearings.net/order-history" ||
        window.location.href == "https://store.nodbearings.net/order-history#"
      ) {
        var url =
          "https://api.store.nodbearings.net/api/print_sales_invoice/" +
          getInvoiceId +
          "/";
      }

      return {
        order_id: post.mysc_order_no,

        item: post.item_name,

        brand: post.brand_name,

        quantity: post.quantity,
        /* price: <span style={{fontSize: 13}}> INR.  { post.list_price.toString() } </span>,*/
        price: (
          <span style={{ fontSize: 12 }}>
            <s>
              {" "}
              <i
                class="fa fa-inr"
                style={{ fontSize: 12 }}
                aria-hidden="true"
              ></i>{" "}
              {post.list_price.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
              .00{" "}
            </s>{" "}
            <br />{" "}
            <span style={{ color: "rgb(0, 115, 158)" }}>
              {" "}
              Savings: {post.calculate_discount_percentage}%
            </span>
            <br />{" "}
            <span>
              {" "}
              <i
                class="fa fa-inr"
                style={{ fontSize: 12 }}
                aria-hidden="true"
              ></i>{" "}
              {post.your_price.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
              .00{" "}
            </span>
          </span>
        ),
        total:
          post.your_price > 0 ? (
            <span style={{ fontSize: 14 }}>
              {" "}
              <i
                class="fa fa-inr"
                style={{ fontSize: 12 }}
                aria-hidden="true"
              ></i>{" "}
              {(post.your_price * post.quantity)
                .toString()
                .replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
              .00{" "}
            </span>
          ) : (
            <span style={{ color: "red", fontSize: 12 }}>
              {" "}
              Display on request{" "}
            </span>
          ),
        gst: (
          <span style={{ fontSize: 12 }}>
            {" "}
            <i
              class="fa fa-inr"
              style={{ fontSize: 12 }}
              aria-hidden="true"
            ></i>{" "}
            {post.total_gst1.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
            .00 <br />{" "}
            <span style={{ color: "rgb(0, 115, 158)" }}>
              {" "}
              GST: {post.gst_percenatge.toString()} %
            </span>
          </span>
        ),
        weight: <span> {(post.weight * post.quantity).toFixed(2)} kg</span>,
        origin: post.Country ? (
          post.Country
        ) : (
          <span style={{ fontSize: 12 }}> NA </span>
        ),
        date: (
          <span>
            <span> {post.date} </span> <br /> <span> {post.time} </span>
          </span>
        ),
        action:
          post.status == "Awaiting Internal Approval" ? (
            <a> {post.status} </a>
          ) : (
            <a
              onClick={() => this.openInvoice(url)}
              style={{ color: "rgb(0, 115, 158)" }}
            >
              {" "}
              {post.status}{" "}
            </a>
          ),
      };
    });

    return posts;
  };

  openInvoice(data) {
    if (
      window.location.href == zwzurl + "order-history" ||
      window.location.href == "https://localhost:3000/order-history"
    ) {
      axios
        .get(data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + localStorage.getItem("auth_key"),
          },
        })
        .then((response) => {
          console.log(response.data);
          window.open(response.data);
        });
    } else if (
      window.location.href == "https://store.nodbearings.net/order-history"
    ) {
      axios
        .get(data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + localStorage.getItem("auth_key"),
          },
        })
        .then((response) => {
          window.open(response.data);
        });
    }
  }

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

    let { push_nod_data } = this.state;
    push_nod_data[index].quantity = value;
    this.setState({
      push_nod_data,
      quantity1: this.state.push_nod_data[0].quantity,
    });
  }

  async getItemData() {
    var ProductData = localStorage.getItem("product_data");

    var ProductData1 = JSON.parse(ProductData);
    console.log(ProductData1);
    console.log(ProductData1.itemid[0]);
    var price = parseInt(ProductData1.price[0]);
    var quantity = parseInt(this.state.quantity);
    var amount = price * quantity;
    console.log(amount);
    console.log(this.props.isLoggedIn);

    /*
		var new_quantity = parseInt(this.state.quantity);
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
		}*/

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
    var price = parseInt(Price);
    var quantity = 10;
    var amount = price * quantity;
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
    const { whenClicked, value } = this.props;
    //console.log(this.state.rfqData);
    const data = {
      columns: [
        {
          label: "Order ID",

          field: "order_id",
          width: 50,
        },

        {
          label: "Item",

          field: "item",
          width: 50,
        },

        {
          label: "Brand",

          field: "brand",
          width: 50,
        },

        {
          label: "Qty",

          field: "quantity",
          width: 50,
        },

        {
          label: "Price",

          field: "price",
          width: 50,
        },
        {
          label: "Total",

          field: "total",
          width: 50,
        },
        {
          label: "GST",

          field: "gst",
          width: 50,
        },
        {
          label: "Wt.",

          field: "weight",
          width: 50,
        },
        {
          label: "Origin",

          field: "origin",
          width: 50,
        },
        {
          label: "Date",

          field: "date",
          width: 50,
        },
        {
          label: "Status",

          field: "action",
          width: 50,
        },
      ],

      rows: this.state.tableRows,
    };

    return (
      <div>
        <Header {...this.props} typeaheadText={this.state.itemname}>
          {" "}
        </Header>
        <div className="profile_container" style={{ marginTop: 185 }}>
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
        </div>
        <div>
          {this.state.isActive && (
            <div
              className="content-container wrapper"
              style={{
                backgroundColor: "#fff",
                padding: 10,
                marginBottom: 5,
                height: 400,
                textAlign: "center",
              }}
            >
              <i
                className="fa fa-refresh fa-spin"
                style={{
                  marginRight: "5px",
                  fontWeight: "bold",
                  fontSize: 30,
                  color: "#00619f",
                  textAlign: "center",
                  marginTop: 200,
                }}
              />
            </div>
          )}
          {
            //this.state.rfqData.length>0 ? (
            //this.state.rfqData.map((item, index) => (
            <div
              className="content-container wrapper"
              style={{
                backgroundColor: "rgb(199, 199, 199)",
                padding: 10,
                marginBottom: 5,
              }}
            >
              <div style={{ width: "100%" }}>
                <Row>
                  <Col
                    sm={12}
                    style={{ marginTop: 15, marginBottom: 5, display: "none" }}
                  >
                    <span className="item-action" style={{ fontSize: 14 }}>
                      {" "}
                      <button
                        className="button"
                        type="button"
                        onClick={this.addToCartData}
                      >
                        Download Invoice
                      </button>{" "}
                    </span>
                  </Col>

                  <Col sm={12} style={{ marginTop: 15, marginBottom: 5 }}>
                    <Card>
                      <CardBody
                        className="customise_card_body"
                        style={{ padding: 18 }}
                      >
                        <div className="order_table" style={{ width: "100%" }}>
                          <MDBDataTable
                            striped
                            bordered
                            fixedHeader={true}
                            hover
                            data={data}
                            sorting={true}
                            searchLabel="Search by item"
                            order={["age", "asc"]}
                          />
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
            </div>

            //))
          }
        </div>
      </div>
    );
  }
}

export default connect((state) => ({
  ...state.user,
  ...state.cartDetail,
  ...state.updateProductData,
}))(OrderHistory);
