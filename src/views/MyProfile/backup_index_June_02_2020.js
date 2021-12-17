import React, { Component } from "react";
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
} from "reactstrap";
import { connect } from "react-redux";
import axios from "axios";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import image1 from "~/assets/images/1.jpg";
import image2 from "~/assets/images/2.jpg";
import image3 from "~/assets/images/3.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { updateCartData } from "~/redux/action/cartDetails";
import { zwzurl, zwzapiurl, nodurl, nodapiurl } from "../../urls.json";

class MyProfile extends Component {
  constructor(props) {
    super(props);

    this.updateProfile = this.updateProfile.bind(this);
    this.changeGST = this.changeGST.bind(this);
    this.changeCompany = this.changeCompany.bind(this);
    this.changeMobile = this.changeMobile.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeBillingPincode = this.changeBillingPincode.bind(this);
    this.changeShippingpincode = this.changeShippingpincode.bind(this);
    this.changeBillingAddress = this.changeBillingAddress.bind(this);
    this.changeBillingState = this.changeBillingState.bind(this);
    this.changeBillingCity = this.changeBillingCity.bind(this);
    this.changeShippingAddress = this.changeShippingAddress.bind(this);
    this.changeShippingState = this.changeShippingState.bind(this);
    this.changeBillingCity = this.changeBillingCity.bind(this);

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
      error1: false,
      error2: false,
      error3: false,
      error4: false,
      error5: false,
      error6: false,
      error7: false,
      error8: false,
    };

    this.statelist();
  }

  changeGST(e) {
    this.setState({
      gstNumber: e.target.value,
    });
  }

  changeBillingPincode(e) {
    this.setState({
      billingpincode: e.target.value,
    });
  }

  changeShippingpincode(e) {
    this.setState({
      shippingpincode: e.target.value,
    });
  }

  changeCompany(e) {
    this.setState({
      companyName: e.target.value,
    });
  }

  changeMobile(e) {
    this.setState({
      mobileNo: e.target.value,
    });
  }

  changeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  changeBillingAddress(e) {
    this.setState({
      billingaddress: e.target.value,
    });
  }

  changeBillingState(e) {
    this.setState({
      billingstate: e.target.value,
    });
  }

  changeBillingCity(e) {
    this.setState({
      billingcity: e.target.value,
    });
  }

  changeShippingAddress(e) {
    this.setState({
      shippingaddress: e.target.value,
    });
  }

  changeShippingState(e) {
    this.setState({
      shippingstate: e.target.value,
    });
  }

  changeBillingCity(e) {
    this.setState({
      shippingcity: e.target.value,
    });
  }

  updateProfile() {
    if (
      window.location.href === zwzurl + "my-profile" ||
      window.location.href === zwzurl + "my-profile#" ||
      window.location.href === "https://localhost:3000/my-profile" ||
      window.location.href === "https://localhost:3000/my-profile#"
    ) {
      console.log(this.state.gstNumber);
      if (this.state.gstNumber == "") {
        this.setState({
          error1: true,
          errorMessage: "Please Enter GST Number",
        });
        return false;
      } else if (this.state.companyName == "") {
        this.setState({
          error2: true,
          errorMessage: "Please Enter Company Name",
        });
        return false;
      } else if (this.state.name == "") {
        this.setState({
          error3: true,
          errorMessage: "Please Enter Name",
        });
        return false;
      } else if (this.state.mobileNo == "") {
        this.setState({
          error4: true,
          errorMessage: "Please Enter Mobile No",
        });
        return false;
      } else if (this.state.shippingaddress == "") {
        this.setState({
          error5: true,
          errorMessage: "Please Enter Shipping Address",
        });
        return false;
      } else if (this.state.shippingpincode == "") {
        this.setState({
          error6: true,
          errorMessage: "Please Enter Shipping Pincode",
        });
        return false;
      } else if (this.state.billingaddress == "") {
        this.setState({
          error7: true,
          errorMessage: "Please Enter Billing Address",
        });
        return false;
      } else if (this.state.billingpincode == "") {
        this.setState({
          error8: true,
          errorMessage: "Please Enter Billing Pincode",
        });
        return false;
      }

      var person_deatils = {
        gst_no: this.state.gstNumber,
        company_name: this.state.companyName,
        name: this.state.name,
        mobile_no: this.state.mobileNo,
      };

      var shipping_details = {
        s_address: this.state.shippingaddress,
        s_pincode: this.state.shippingpincode,
        s_city_id: this.state.shippingcity,
      };

      var city_deatils = {
        b_address:
          "84/86 Nagdevi Cross Lane,2nd Floor, Mumbai - 400 003. India",
        b_pincode: "",
        b_city_id: 1,
      };

      axios
        .post(
          zwzapiurl + "authentication/update_get_info/",

          {
            key: "my_profile",
          },
          {
            headers: {
              Authorization: "Token " + sessionStorage.getItem("auth_key"),
            },
          }
        )
        .then((response) => {
          console.log(response.data.success);

          /*if (response.data.success === false) {
	    		console.log("sdfghsdfghfalse");
	    		window.location.href = zwzurl + "login"
	    	}*/
        })
        .catch(function (error) {});
    } else if (
      window.location.href === "https://store.nodbearings.net/my-profile" ||
      window.location.href === "https://store.nodbearings.net/my-profile#"
    ) {
      axios
        .post(
          "https://api.store.nodbearings.net/authentication/update_get_info/",

          {
            tokenkey: sessionStorage.getItem("auth_key"),
          },
          {
            headers: {
              Authorization: "Token " + sessionStorage.getItem("auth_key"),
            },
          }
        )
        .then((response) => {
          console.log(response);
          /*if (response.data.success === false) {
	    		window.location.href = "https://store.nodbearings.net/login"
	    	}*/
        })
        .catch(function (error) {});
    }
  }

  async statelist(e) {
    if (
      window.location.href === zwzurl + "signup#" ||
      window.location.href === zwzurl + "signup"
    ) {
      var url = zwzapiurl + "authentication/state_list/";
    } else if (
      window.location.href === "https://store.nodbearings.net/signup#" ||
      window.location.href === "https://store.nodbearings.net/signup" ||
      window.location.href === "https://localhost:3000/login#" ||
      window.location.href === "https://localhost:3000/login"
    ) {
      var url = "https://api.store.nodbearings.net/authentication/state_list/";
    } else {
      var url = zwzapiurl + "authentication/state_list/";
    }

    var datastring = {
      url: url,
    };

    const response = await axios(datastring.url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token " + sessionStorage.getItem("auth_key"),
      },
      data: datastring,
    });

    if (response.data.success == true) {
      this.setState({
        state_options: response.data.data.map((data) => (
          <option key={data.st_name} value={data.st_name}>
            {data.st_name}
          </option>
        )),
      });
    } else {
      console.log(response.data.message);
    }
  }

  componentDidMount() {
    console.log("dfghxdcfvgbbbbbbbbbb");

    if (
      window.location.href === zwzurl + "my-profile" ||
      window.location.href === zwzurl + "my-profile#" ||
      window.location.href === "https://localhost:3000/my-profile"
    ) {
      axios
        .get(zwzapiurl + "authentication/get_info/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + sessionStorage.getItem("auth_key"),
          },
        })
        .then((response) => {
          this.setState({
            billingaddress: response.data.data.billing_details["b_address"],
            billingstate: response.data.data.billing_details["b_state"],
            billingcity: response.data.data.billing_details["b_city"],
            billingcityId: response.data.data.billing_details["b_city_id"],
            shippingaddress: response.data.data.shipping_details["s_address"],
            shippingstate: response.data.data.shipping_details["s_state"],
            shippingcity: response.data.data.shipping_details["s_city"],
            shippingcityId: response.data.data.shipping_details["s_city_id"],
            gstNumber: response.data.data.gst_no,
            companyName: response.data.data.company_name,
            status: response.data.data.status,
            name: response.data.data.name,
            mobileNo: response.data.data.mobile_no,
          });
        })
        .catch(function (error) {});
    } else if (
      window.location.href === "https://store.nodbearings.net/my-profile" ||
      window.location.href === "https://store.nodbearings.net/my-profile#"
    ) {
      axios
        .get(zwzapiurl + "authentication/get_info/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + sessionStorage.getItem("auth_key"),
          },
        })
        .then((response) => {
          this.setState({
            billingaddress: response.data.data.billing_details["b_address"],
            billingstate: response.data.data.billing_details["b_state"],
            billingcity: response.data.data.billing_details["b_city"],
            shippingaddress: response.data.data.shipping_details["s_address"],
            billingpincode: response.data.data.shipping_details["b_pincode"],
            shippingpincode: response.data.data.shipping_details["s_pincode"],
            shippingstate: response.data.data.shipping_details["s_state"],
            shippingcity: response.data.data.shipping_details["s_city"],
            gstNumber: response.data.data.gst_no,
            companyName: response.data.data.company_name,
            status: response.data.data.status,
            name: response.data.data.name,
            mobileNo: response.data.data.mobile_no,
          });
        })
        .catch(function (error) {});
    }
  }

  render() {
    return (
      <div>
        <Header {...this.props}> </Header>
        <div className="profile_container">
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
        <div
          className="content-container wrapper"
          style={{ backgroundColor: "#f4f4f4", marginTop: 12, padding: 10 }}
        >
          <Row>
            <Col sm={12} style={{ marginTop: 10 }}>
              <h4
                style={{
                  paddingLeft: 16,
                  fontWeight: "bold",
                  color: "#00619F",
                  fontSize: 19,
                }}
              >
                {" "}
                Profile Information{" "}
              </h4>
            </Col>
          </Row>

          <Row>
            <Col sm={12} style={{ marginTop: 10 }}>
              <Card>
                <CardBody
                  className="customise_card_body"
                  style={{ padding: 18 }}
                >
                  <Row>
                    <Col sm={12} style={{ marginTop: 6 }}>
                      <Col sm={2} style={{ float: "left" }}>
                        <label className="checkbox_label">GST Number</label>
                      </Col>

                      <Col sm={4} style={{ float: "left" }}>
                        <input
                          type="text"
                          className="address_input"
                          defaultValue={this.state.gstNumber}
                          onChange={this.changeGST}
                          placeholder="Enter GST Number"
                        />

                        {this.state.error1 && (
                          <div style={{ width: "100%", textAlign: "left" }}>
                            <span style={{ color: "red", fontSize: 11 }}>
                              {" "}
                              {this.state.errorMessage}{" "}
                            </span>
                          </div>
                        )}
                      </Col>

                      <Col sm={2} style={{ float: "left" }}>
                        <label className="checkbox_label">Company Name</label>
                      </Col>

                      <Col sm={4} style={{ float: "left" }}>
                        <input
                          type="text"
                          defaultValue={this.state.companyName}
                          onChange={this.changeCompany}
                          className="address_input"
                          placeholder="Enter Company Name"
                        />
                        {this.state.error2 && (
                          <div style={{ width: "100%", textAlign: "left" }}>
                            <span style={{ color: "red", fontSize: 11 }}>
                              {" "}
                              {this.state.errorMessage}{" "}
                            </span>
                          </div>
                        )}
                      </Col>
                    </Col>
                    <Col sm={12} style={{ marginTop: 6 }}>
                      <Col sm={2} style={{ float: "left" }}>
                        <label className="checkbox_label">Name</label>
                      </Col>
                      <Col sm={4} style={{ float: "left" }}>
                        <input
                          type="text"
                          defaultValue={this.state.name}
                          onChange={this.changeName}
                          className="address_input"
                          placeholder="Name"
                        />
                        {this.state.error3 && (
                          <div style={{ width: "100%", textAlign: "left" }}>
                            <span style={{ color: "red", fontSize: 11 }}>
                              {" "}
                              {this.state.errorMessage}{" "}
                            </span>
                          </div>
                        )}
                      </Col>

                      <Col sm={2} style={{ float: "left" }}>
                        <label className="checkbox_label">Mobile No.</label>
                      </Col>

                      <Col sm={4} style={{ float: "left" }}>
                        <input
                          type="text"
                          defaultValue={this.state.mobileNo}
                          onChange={this.changeMobile}
                          className="address_input"
                          placeholder="Mobile No."
                        />
                        {this.state.error4 && (
                          <div style={{ width: "100%", textAlign: "left" }}>
                            <span style={{ color: "red", fontSize: 11 }}>
                              {" "}
                              {this.state.errorMessage}{" "}
                            </span>
                          </div>
                        )}
                      </Col>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col sm={12} style={{ marginTop: 15 }}>
              <h4
                style={{
                  paddingLeft: 16,
                  fontWeight: "bold",
                  color: "#00619F",
                  fontSize: 19,
                }}
              >
                {" "}
                Billing Information{" "}
              </h4>
            </Col>
          </Row>

          <Row>
            <Col sm={12} style={{ marginTop: 10 }}>
              <Card>
                <CardBody
                  className="customise_card_body"
                  style={{ padding: 18 }}
                >
                  <Row>
                    <Col sm={12} style={{ marginTop: 6 }}>
                      <Col sm={2} style={{ float: "left" }}>
                        <label className="checkbox_label">Address</label>
                      </Col>

                      <Col sm={4} style={{ float: "left" }}>
                        <input
                          type="text"
                          onChange={this.changeBillingAddress}
                          className="address_input"
                          defaultValue={this.state.billingaddress}
                          placeholder="Enter Address"
                        />
                        {this.state.error5 && (
                          <div style={{ width: "100%", textAlign: "left" }}>
                            <span style={{ color: "red", fontSize: 11 }}>
                              {" "}
                              {this.state.errorMessage}{" "}
                            </span>
                          </div>
                        )}
                      </Col>

                      <Col sm={2} style={{ float: "left" }}>
                        <label className="checkbox_label">State</label>
                      </Col>

                      <Col sm={4} style={{ float: "left" }}>
                        <select
                          className="form-control"
                          name="state"
                          value={this.state.billingstate}
                          onChange={this.changeBillingState}
                        >
                          <option
                            value={this.state.billingstate}
                            style={{ fontWeight: "bold" }}
                          >
                            {this.state.billingstate}
                          </option>
                          {this.state.state_options}
                        </select>
                      </Col>
                    </Col>
                    <Col sm={12} style={{ marginTop: 6 }}>
                      <Col sm={2} style={{ float: "left" }}>
                        <label className="checkbox_label">City</label>
                      </Col>
                      <Col sm={4} style={{ float: "left" }}>
                        <select
                          className="form-control"
                          name="city"
                          value={this.state.billingcity}
                          onChange={this.changeBillingCity}
                        >
                          <option
                            value={this.state.billingcity}
                            style={{ fontWeight: "bold" }}
                          >
                            {this.state.billingcity}
                          </option>
                          {this.state.city_options}
                        </select>
                      </Col>

                      <Col sm={2} style={{ float: "left" }}>
                        <label className="checkbox_label">Pincode</label>
                      </Col>
                      <Col sm={4} style={{ float: "left" }}>
                        <input
                          type="text"
                          defaultValue={this.state.billingpincode}
                          onChange={this.changeBillingPincode}
                          className="address_input"
                          placeholder="Enter Pincode"
                        />
                        {this.state.error6 && (
                          <div style={{ width: "100%", textAlign: "left" }}>
                            <span style={{ color: "red", fontSize: 11 }}>
                              {" "}
                              {this.state.errorMessage}{" "}
                            </span>
                          </div>
                        )}
                      </Col>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col sm={12} style={{ marginTop: 15 }}>
              <h4
                style={{
                  paddingLeft: 16,
                  fontWeight: "bold",
                  color: "#00619F",
                  fontSize: 19,
                }}
              >
                {" "}
                Shipping Information{" "}
              </h4>
            </Col>
          </Row>

          <Row>
            <Col sm={12} style={{ marginTop: 10 }}>
              <Card>
                <CardBody
                  className="customise_card_body"
                  style={{ padding: 18 }}
                >
                  <Row>
                    <Col sm={12} style={{ marginTop: 6 }}>
                      <Col sm={2} style={{ float: "left" }}>
                        <label className="checkbox_label">Address</label>
                      </Col>

                      <Col sm={4} style={{ float: "left" }}>
                        <input
                          type="text"
                          className="address_input"
                          onChange={this.changeShippingAddress}
                          defaultValue={this.state.shippingaddress}
                          placeholder="Enter Address"
                        />
                        {this.state.error7 && (
                          <div style={{ width: "100%", textAlign: "left" }}>
                            <span style={{ color: "red", fontSize: 11 }}>
                              {" "}
                              {this.state.errorMessage}{" "}
                            </span>
                          </div>
                        )}
                      </Col>

                      <Col sm={2} style={{ float: "left" }}>
                        <label className="checkbox_label">State</label>
                      </Col>

                      <Col sm={4} style={{ float: "left" }}>
                        <select
                          className="form-control"
                          name="state"
                          value={this.state.shippingstate}
                          onChange={this.changeShippingState}
                        >
                          <option value="0">Select State</option>
                          {this.state.state_options}
                        </select>
                      </Col>
                    </Col>
                    <Col sm={12} style={{ marginTop: 6 }}>
                      <Col sm={2} style={{ float: "left" }}>
                        <label className="checkbox_label">City</label>
                      </Col>
                      <Col sm={4} style={{ float: "left" }}>
                        <select
                          className="form-control"
                          name="city"
                          value={this.state.shippingcity}
                          onChange={this.changeShippingCity}
                        >
                          <option
                            value={this.state.shippingcity}
                            style={{ fontWeight: "bold" }}
                          >
                            {this.state.shippingcity}
                          </option>
                          {this.state.city_options}
                        </select>
                      </Col>

                      <Col sm={2} style={{ float: "left" }}>
                        <label className="checkbox_label">Pincode</label>
                      </Col>
                      <Col sm={4} style={{ float: "left" }}>
                        <input
                          type="text"
                          defaultValue={this.state.shippingpincode}
                          onChange={this.changeShippingpincode}
                          className="address_input"
                          placeholder="Enter Pincode"
                        />
                        {this.state.error8 && (
                          <div style={{ width: "100%", textAlign: "left" }}>
                            <span style={{ color: "red", fontSize: 11 }}>
                              {" "}
                              {this.state.errorMessage}{" "}
                            </span>
                          </div>
                        )}
                      </Col>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>

            <Col sm={12} style={{ marginTop: 30, textAlign: "center" }}>
              <input
                style={{ width: 120 }}
                type="button"
                onClick={this.updateProfile}
                value="Update"
                className="login_btn"
              />
            </Col>
          </Row>
        </div>
        <Footer> </Footer>
      </div>
    );
  }
}

export default connect((state) => ({
  ...state.cartDetail,
}))(MyProfile);
