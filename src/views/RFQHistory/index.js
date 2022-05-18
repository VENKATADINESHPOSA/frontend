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
} from "reactstrap";
import { connect } from "react-redux";
import Header from "~/components/Header";
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
import LoadingOverlay from "react-loading-overlay";
import { zwzurl, zwzapiurl, nodurl, nodapiurl } from "../../urls.json";
import NewModal from "../modal/NewModal";
import { hostname } from "os";

class RFQHistory extends Component {
  constructor(props) {
    super(props);
    this.getItemData = this.getItemData.bind(this);
    this.getItemData1 = this.getItemData1.bind(this);
    this.onQuantityChange = this.onQuantityChange.bind(this);
    this.onQuantityChange1 = this.onQuantityChange1.bind(this);
    this.addToCartData = this.addToCartData.bind(this);
    this.checkAll = this.checkAll.bind(this);
    this.state = {
      itemname: "",
      isChecked: false,
      genloading: false,
      categoryname: "",
      categorycode: "",
      tableRows: [],
      posts: [],
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
      selectedItem: [],
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
      rfqCheckedAll: {},
      rfqChecked: {},
      isActive: false,
      showPannel: false,
      showModal: false,
    };
  }

  itemsArr = [];

  addItemToCart = () => {
    axios
      .post(
        zwzapiurl + "api/add_item/",
        {
          item_info: this.itemsArr,
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
      .catch(function (error) {
        if (error.response.status == 401) {
          window.location.href = "/login";
        }
      });
  };

  addItemToCart1 = () => {
    axios
      .post(
        "https://api.store.nodbearings.net/api/add_item/",
        {
          item_info: this.itemsArr,
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
      .catch(function (error) {
        if (error.response.status == 401) {
          window.location.href = "/login";
        }
      });
  };

  addToCartData() {
    const postData = this.state.posts.filter((data) => data.isChecked == true);

    if (
      window.location.href == zwzurl + "rfq-history" ||
      window.location.href == "https://localhost:3000/rfq-history"
    ) {
      this.itemsArr.length = 0;
      for (var i = 0; i < postData.length; i++) {
        var orderData = {};

        orderData["itemcode"] = postData[i].ItemCode.toString();
        orderData["rfq_id"] = postData[i].rfq_no;
        orderData["item_name"] = postData[i].ItemName;
        orderData["amount_per_unit"] = postData[i].Price;
        orderData["Purchase_Price"] = postData[i].Purchase_Price;
        orderData["flag"] = "rfq_history";
        orderData["quantity"] = postData[i].Qty;

        this.itemsArr.push(orderData);
      }
      const cartItemNames = JSON.parse(localStorage.getItem("cartItemNames"));
      const checkedItemsInCart = cartItemNames.map((itemname) =>
        postData.find((item) => item.ItemName === itemname)
      );

      const filteredCheckedItemsInCart = checkedItemsInCart.filter(
        (item) => item !== undefined
      );
      if (filteredCheckedItemsInCart.length > 0) {
        this.setState({ showModal: true });
      } else {
        this.addItemToCart();
      }
    } else if (
      window.location.href == "https://store.nodbearings.net/rfq-history"
    ) {
      this.itemsArr.length = 0;
      for (var i = 0; i < postData.length; i++) {
        var orderData = {};

        orderData["itemcode"] = postData[i].ItemCode.toString();
        orderData["rfq_id"] = postData[i].rfq_no;
        orderData["item_name"] = postData[i].ItemName;
        orderData["amount_per_unit"] = postData[i].Price;
        orderData["Purchase_Price"] = postData[i].Purchase_Price;
        orderData["flag"] = "rfq_history";
        orderData["quantity"] = postData[i].Qty;

        this.itemsArr.push(orderData);
      }

      const cartItemNames = JSON.parse(localStorage.getItem("cartItemNames"));

      const checkedItemsInCart = cartItemNames.map((itemObj) =>
        postData.find(
          (item) =>
            item.ItemName === itemObj.itemName &&
            item.BrandName === itemObj.brandName
        )
      );
      const filteredCheckedItemsInCart = checkedItemsInCart.filter(
        (item) => item !== undefined
      );

      if (filteredCheckedItemsInCart.length > 0) {
        this.setState({ showModal: true });
      } else {
        this.addItemToCart1();
      }
    }
  }

  checkRfqItem(rfq_no, StkTranNo) {
    const { rfqCheckedAll, rfqChecked } = this.state;
    rfqCheckedAll[rfq_no] = true;
    rfqChecked[rfq_no][StkTranNo] = !rfqChecked[rfq_no][StkTranNo];
    _.map(rfqChecked[rfq_no], (value) => {
      if (!value) {
        rfqCheckedAll[rfq_no] = false;
      }
    });
    this.setState({
      rfqCheckedAll: rfqCheckedAll,
      rfqChecked: rfqChecked,
    });
  }

  getInitialState() {
    var rowState = [];
    for (var i = 0; i < this.props.rows.length; i++) {
      rowState[i] = false;
    }
    return {
      checkAll: false,
      rowState: rowState,
    };
  }

  assemblePosts = () => {
    console.log(this.state.posts);

    let posts = this.state.posts.map((postVal, index) => {
      var value = postVal.your_price * postVal.Qty;
      var values = value.toFixed(2);
      var parts = values.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      var partsval = parts.join(".");

      var price = postVal.your_price.toString().split(".");
      price[0] = price[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      var priceVal = price.join(".");

      return {
        rfq_no: postVal.rfq_no,
        Category_Name: postVal.catname,
        Category_Type: postVal.cattype,
        Brand_Name: postVal.BrandName,
        Item_Name: postVal.ItemName,
        Quantity: postVal.Qty,
        listPrice: (
          <span style={{ fontSize: 12 }}>
            {" "}
            <s>
              {" "}
              <i
                class="fa fa-inr"
                style={{ fontSize: 12 }}
                aria-hidden="true"
              ></i>{" "}
              {postVal.list_price
                .toString()
                .replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
              .00{" "}
            </s>{" "}
            <br />{" "}
            <span style={{ color: "rgb(0, 115, 158)" }}>
              {" "}
              Savings: {postVal.calculate_discount_percentage.toString()} %
            </span>
            <br />{" "}
            <span>
              {" "}
              <i
                class="fa fa-inr"
                style={{ fontSize: 12 }}
                aria-hidden="true"
              ></i>{" "}
              {priceVal}{" "}
            </span>
          </span>
        ),
        /* discount: postVal.calculate_discount_percentage.toString(),*/
        totalPrice:
          postVal.your_price > 0 ? (
            <span style={{ fontSize: 12 }}>
              {" "}
              <i
                class="fa fa-inr"
                style={{ fontSize: 12 }}
                aria-hidden="true"
              ></i>{" "}
              {partsval}{" "}
            </span>
          ) : (
            <span style={{ color: "red", fontSize: 14 }}>
              {" "}
              Display on
              <br /> request{" "}
            </span>
          ),
        /*gst: <span style={{fontSize: 12}}> INR.  { postVal.Total_gst.toString() }  <br/> <span style={{color:'rgb(0, 115, 158)'}}> GST: { postVal.gst_percenatge.toString()} %</span></span>,*/
        gst:
          postVal.Total_gst && postVal.gst_percenatge ? (
            <span style={{ fontSize: 12 }}>
              {" "}
              <i
                class="fa fa-inr"
                style={{ fontSize: 12 }}
                aria-hidden="true"
              ></i>{" "}
              {postVal.Total_gst.toString().replace(
                /(\d)(?=(\d\d)+\d$)/g,
                "$1,"
              )}
              .00 <br />{" "}
              <span style={{ color: "rgb(0, 115, 158)" }}>
                {" "}
                GST: {postVal.gst_percenatge.toString()} %
              </span>
            </span>
          ) : (
            <span> NA </span>
          ),
        weight: postVal.weight ? (
          <span>
            {" "}
            {(postVal.weight * postVal.Qty).toFixed(2)} <span> kg </span>
          </span>
        ) : (
          <span> NA </span>
        ),
        gst_value: postVal.Total_gst ? (
          postVal.Total_gst
        ) : (
          <span style={{ fontSize: 12 }}> 0 </span>
        ),
        status: postVal.status,
        Origin: postVal.Country ? (
          postVal.Country
        ) : (
          <span style={{ fontSize: 12 }}> NA </span>
        ),
        Date: (
          <span>
            <span> {postVal.date} </span> <br /> <span> {postVal.time} </span>
          </span>
        ),
        Action:
          postVal.status == "Stock" ? (
            <input
              type="checkbox"
              checked={postVal.isChecked}
              disabled={postVal.isDisabled}
              onChange={() => this.checkedSingle(index)}
            />
          ) : (
            <span style={{ fontSize: 12, color: "red" }}> Out of stock </span>
          ),
      };
    });

    return posts;
  };

  checkedSingle(index) {
    let posts = this.state.posts;
    console.log(posts);

    console.log(index);

    if (posts[index].isChecked == false) {
      posts[index].isChecked = true;
    } else if (posts[index].isChecked == true) {
      posts[index].isChecked = false;
    }

    this.setState({
      posts: posts,
      genloading: !this.state.genloading,
    });

    console.log(this.state.posts);

    let selectedItem = this.state.posts.filter(
      (item) => item.isChecked == true
    );

    console.log("===>", selectedItem);

    if (selectedItem.length > 0) {
      const selectedItemRfq = selectedItem[0].rfq_no;
      console.log(selectedItemRfq);

      const updatedPosts = this.state.posts;

      for (var i = 0; i < updatedPosts.length; i++) {
        if (updatedPosts[i].rfq_no !== selectedItemRfq) {
          updatedPosts[i].isDisabled = true;
        } else {
          updatedPosts[i].isDisabled = false;
        }
      }

      this.setState(
        {
          posts: updatedPosts,
        },
        () => {
          this.setState({
            tableRows: this.assemblePosts(),
            selectedItem: selectedItem,
          });
        }
      );
    } else {
      const updatedPosts1 = this.state.posts.map((item) => ({
        ...item,
        isDisabled: false,
      }));

      this.setState(
        {
          posts: updatedPosts1,
        },
        () => {
          this.setState({
            tableRows: this.assemblePosts(),
            selectedItem: selectedItem,
          });
        }
      );
    }

    console.log("rfq disable testing", this.state.posts);

    // this.setState({
    //   tableRows: this.assemblePosts(),
    //   selectedItem: selectedItem,
    // });

    for (var i = 0; i < this.state.posts.length; i++) {
      if (this.state.posts[i].isChecked == true) {
        this.setState({
          showPannel: true,
        });
        return false;
      } else {
        this.setState({
          showPannel: false,
        });
      }
    }

    /*this.setState({
    selectedItem : selectedItem
  })*/
  }

  checkRow(id, value) {
    this.state.rowState[id] = value;
    if (this.state.checkAll) {
      this.state.checkAll = !this.state.checkAll;
    }
    this.setState({
      rowState: this.state.rowState,
      checkAll: this.state.checkAll,
    });
  }
  checkAll(rfq_no) {
    let { rfqChecked, rfqCheckedAll } = this.state;
    _.map(rfqChecked[rfq_no], (value, key) => {
      rfqChecked[rfq_no][key] = !rfqCheckedAll[rfq_no];
    });
    this.setState(
      {
        rfqCheckedAll: {
          ...rfqCheckedAll,
          [rfq_no]: !rfqCheckedAll[rfq_no],
        },
        rfqChecked: {
          ...rfqChecked,
          [rfq_no]: rfqChecked[rfq_no],
        },
      },
      () => console.log(this.state.rfqChecked)
    );
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    /*  var status = localStorage.getItem('status')
    this.setState({
      status: status
    })*/

    if (
      window.location.href == zwzurl + "rfq-history" ||
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
        })
        .catch(function (error) {
          if (error.response.status == 401) {
            window.location.href = "/login";
          }
        });
    } else if (
      window.location.href == "https://store.nodbearings.net/rfq-history"
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
      window.location.href === "https://localhost:3000/rfq-history" ||
      window.location.href === zwzurl + "rfq-history#"
    ) {
      this.setState({
        isActive: true,
      });

      console.log(this.state.isActive);

      axios
        .post(
          zwzapiurl + "api/all_rfq_history/",

          {
            item_detail_id: 3,
          },

          {
            headers: {
              Authorization: "Token " + localStorage.getItem("auth_key"),
            },
          }
        )
        .then((response) => {
          this.setState({
            posts: response.data.message.info,
          });

          let posts = this.state.posts.map((item) => ({
            ...item,
            isChecked: false,
            isDisabled: false,
          }));

          this.setState({
            posts: posts,
          });

          console.log(this.state.posts);

          this.setState({
            isActive: false,
            tableRows: this.assemblePosts(),
          });

          let rfqCheckedAll = {},
            rfqChecked = {};
          response.data.message.info.map((item) => {
            rfqCheckedAll[item.rfq_no] = false;
            item.data.map((rfqItem) => {
              if (!rfqChecked[item.rfq_no]) {
                rfqChecked[item.rfq_no] = {};
              }
              rfqChecked[item.rfq_no][rfqItem.StkTranNo] = true;
            });
          });

          this.setState(
            {
              rfqData: response.data.message.info,
              posts: response.data.message.info,
              rfqCheckedAll: rfqCheckedAll,
              rfqChecked: rfqChecked,
              isActive: false,
            },
            () => console.log(this.state.rfqChecked, this.state.rfqCheckedAll)
          );
        })
        .catch(function (error) {});
    } else if (
      window.location.href === "https://store.nodbearings.net/rfq-history" ||
      window.location.href === "https://store.nodbearings.net/rfq-history#"
    ) {
      this.setState({
        isActive: true,
      });

      console.log(this.state.isActive);

      axios
        .post(
          "https://api.store.nodbearings.net/api/all_rfq_history/",

          {
            item_detail_id: 3,
          },

          {
            headers: {
              Authorization: "Token " + localStorage.getItem("auth_key"),
            },
          }
        )
        .then((response) => {
          console.log(response);

          if (response.data.success == true) {
            this.setState({
              posts: response.data.message.info,
            });

            let posts = this.state.posts.map((item) => ({
              ...item,
              isChecked: false,
            }));

            this.setState({
              posts: posts,
            });

            console.log(this.state.posts);

            this.setState({
              isActive: false,
              tableRows: this.assemblePosts(),
            });

            var arr = [];

            for (var i = 0; i < response.data.message.info.length; i++) {
              for (
                var z = 0;
                z < response.data.message.info[i].data.length;
                z++
              ) {
                var newarr = [];

                var orderData = {};
                orderData["BrandName"] =
                  response.data.message.info[i].data[z].BrandName;
                orderData["ItemName"] =
                  response.data.message.info[i].data[z].ItemName;
                orderData["CatType"] =
                  response.data.message.info[i].data[z].cattype;
                orderData["CatName"] =
                  response.data.message.info[i].data[z].catname;
                orderData["Qty"] = response.data.message.info[i].data[z].Qty;
                orderData["Price"] =
                  response.data.message.info[i].data[z].Price;
                /*orderData['Availability'] = this.state.added_item[i].Availability;
          orderData['item_detail_id'] = this.state.added_item[i].item_detail_id;
          orderData['itemname'] = this.state.added_item[i].itemname;
          orderData['cattype'] = this.state.added_item[i].cattype;
          orderData['catname'] = this.state.added_item[i].catname;
          orderData['itemcode'] = this.state.added_item[i].itemcode;
          orderData['descript'] = this.state.added_item[i].descript;
          orderData['quantity'] = this.state.added_item[i].quantity;
          orderData['amount_per_unit'] = this.state.added_item[i].amount_per_unit;
          orderData['total_amount'] = this.state.added_item[i].total_amount;
          orderData['added_on'] = this.state.added_item[i].added_on;
          orderData['brandname'] = this.state.added_item[i].brandname;*/

                /*newarr.push(orderData);*/
              }

              arr.push(orderData);
            }
            let rfqCheckedAll = {},
              rfqChecked = {};
            response.data.message.info.map((item) => {
              rfqCheckedAll[item.rfq_no] = false;
              item.data.map((rfqItem) => {
                if (!rfqChecked[item.rfq_no]) {
                  rfqChecked[item.rfq_no] = {};
                }
                rfqChecked[item.rfq_no][rfqItem.StkTranNo] = false;
              });
            });
            this.setState(
              {
                rfqData: response.data.message.info,
                posts: response.data.message.info,

                rfqCheckedAll: rfqCheckedAll,
                rfqChecked: rfqChecked,
                rfqDataDetails: arr,
                isActive: false,
              },
              () => console.log(this.state.rfqChecked, this.state.rfqCheckedAll)
            );

            console.log(response.data.message.info);

            this.setState({
              tableRows: this.assemblePosts(),
            });
          } else {
            this.setState({
              isActive: false,
            });
          }
        })

        .catch(function (error) {});
    }
  }

  checkall() {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  }

  onQuantityChange(e) {
    /* var newState = {};
      newState[e.target.name] = e.target.value;
      this.setState(newState);*/

    this.setState({
      quantity: e.target.value,
    });
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

        orderData["itemcode"] = ProductData1.ItemCode[0].toString();
        orderData["item_name"] = ProductData1.ItemName[0];
        orderData["amount_per_unit"] = ProductData1.Price[0];
        orderData["flag"] = "rfq_history";
        orderData["quantity"] = this.state.Qty.toString();

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
  addTocart = (rfq_no) => {
    const rfqData = _.find(
      this.state.rfqData,
      (item) => item.rfq_no === rfq_no
    );
    const selectedData = rfqData.data.filter(
      (data) => this.state.rfqChecked[rfq_no][data.StkTranNo]
    );
    console.log(selectedData);
  };
  render() {
    const data = {
      columns: [
        {
          label: "RFI",
          field: "rfq_no",
          sort: "asc",
          width: 50,
        },
        /*{
          label:'Cat Type',
          field:'Category_Type',
          sort: 'asc',
          width: 100
        },
        {
          label:'Cat Name',
          field:'Category_Name',
          sort: 'asc',
          width: 30
        },*/

        {
          label: "Item",
          field: "Item_Name",
          sort: "asc",
          width: 50,
        },
        {
          label: "Brand",
          field: "Brand_Name",
          sort: "asc",
          width: 50,
        },

        {
          label: "Qty",
          field: "Quantity",
          sort: "asc",
          width: 50,
        },
        {
          label: "Price",
          field: "listPrice",
          sort: "asc",
          width: 200,
        },
        /*{
          label:'Disc(%)',
          field:'discount',
          sort: 'asc',
          width: 100
        },*/

        {
          label: "Total",
          field: "totalPrice",
          sort: "asc",
          width: 50,
        },
        {
          label: "GST",
          field: "gst",
          sort: "asc",
          width: 50,
        },
        {
          label: "Wt.",
          field: "weight",
          sort: "asc",
          width: 50,
        },
        /*{
          label:'GST Value',
          field:'gst_value',
          sort: 'asc',
          width: 100
        },*/

        {
          label: "Availability",
          field: "status",
          sort: "asc",
          width: 50,
        },
        {
          label: "Origin",
          field: "Origin",
          sort: "asc",
          width: 50,
        },

        {
          label: "Date",
          field: "Date",
          sort: "asc",
        },

        {
          label: "Action",
          field: "Action",
          sort: "asc",
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

          <div
            className="content-container wrapper"
            style={{
              backgroundColor: "rgb(199, 199, 199)",
              marginTop: 15,
              padding: 10,
              marginBottom: 5,
            }}
          >
            <div style={{ width: "100%" }}>
              <Row>
                <Col sm={12} style={{ marginTop: 15, marginBottom: 5 }}>
                  <span className="item-action" style={{ fontSize: 14 }}>
                    {" "}
                    <button
                      className="button"
                      type="button"
                      onClick={this.addToCartData}
                    >
                      Add To Cart
                    </button>{" "}
                  </span>
                </Col>
                <Col>
                  <div style={{ color: "red" }}>
                    * Selecting items from the different RFIs is disabled.
                  </div>
                </Col>

                {this.state.showPannel && (
                  <Col sm={12} style={{ marginTop: 15, marginBottom: 5 }}>
                    <Card>
                      <CardBody
                        className="customise_card_body"
                        style={{ padding: 18 }}
                      >
                        <span style={{ fontWeight: "bold", marginBottom: 20 }}>
                          {" "}
                          Selected Items ({this.state.selectedItem.length}){" "}
                        </span>

                        <div style={{ width: "100%", marginTop: 10 }}>
                          {this.state.posts.map(
                            (item, index) =>
                              item.isChecked == true && (
                                <span
                                  style={{
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    fontSize: 13,
                                    paddingVertical: 12,
                                    paddingHorizontal: 15,
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    float: "left",
                                    backgroundColor: "#ccc",
                                    borderRadius: 6,
                                    paddingTop: 4,
                                    paddingBottom: 4,
                                    marginRight: 8,
                                    marginBottom: 5,
                                  }}
                                >
                                  {" "}
                                  {item.ItemName}{" "}
                                </span>
                              )
                          )}
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                )}

                <Col sm={12} style={{ marginTop: 15, marginBottom: 5 }}>
                  <Card>
                    <CardBody
                      className="customise_card_body"
                      style={{ padding: 18 }}
                    >
                      <div className="rfq_table" style={{ width: "100%" }}>
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
        </div>
        <NewModal
          showModal={this.state.showModal}
          onContinue={() => {
            this.setState({ showModal: false });
            if (hostname === "store.zwz.co.in" || hostname === "localhost") {
              this.addItemToCart();
            } else {
              this.addItemToCart1();
            }
          }}
          onCancel={() => {
            this.setState({ showModal: false });
          }}
          message="The item you are adding is already present in the cart. You will lose any changes that are saved in the cart for the same item if you proceed ahead."
        />
      </div>
    );
  }
}

export default connect((state) => ({
  ...state.user,
  ...state.cartDetail,
  ...state.updateProductData,
}))(RFQHistory);
