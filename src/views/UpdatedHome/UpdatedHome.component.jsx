import React, { useState } from "react";
import { connect } from "react-redux";
import "./UpdatedHome.styles.scss";
import Header from "~/components/Header";
import BannerImage from "../../components/ImageComponent/BannerImage.component";
import AboutUs from "../../components/AboutUsComponent/AboutUs.component";
import FeaturedItems from "../../components/FeaturedItemsComponent/FeaturedItems.component";
import BearingDetails from "../../components/BearingDetailsComponent/BearingDetails.component";
import CompanyValues from "../../components/CompanyValuesComponent/CompanyValues.component";
import ClientLogos from "../../components/ClientLogosComponent/ClientLogos.component";
// import EmailSubscription from "../../components/EmailSubscriptionComponent/EmailSubscription.component";
import Footer from "../../components/UpdatedFooterComponent/UpdatedFooter.component";
import Copyright from "../../components/CopyrightComponent/Copyright.component";

const UpdatedHome = (props) => {
  const [showKnowmore, setshowKnowmore] = useState(false);
  const [heading, setHeading] = useState("");
  const [itemId, setItemId] = useState("");
  return showKnowmore ? (
    <div className="bearing-details-div">
      <Header {...props} />
      <div className="bearing-details-body-div">
        <BearingDetails
          itemId={itemId}
          setshowKnowmore={setshowKnowmore}
          header={heading}
        />
      </div>
    </div>
  ) : (
    <div className="home-div">
      <Header {...props} />
      <div className="content-container image-component-div">
        <BannerImage />
      </div>
      <div className="AboutUs-container content-container">
        <AboutUs />
      </div>
      <FeaturedItems
        setshowKnowmore={setshowKnowmore}
        setItemId={setItemId}
        setHeading={setHeading}
      />
      <CompanyValues />
      <ClientLogos />
      {/* <EmailSubscription /> */}
      <Footer />
      <Copyright />
    </div>
  );
};

export default connect((state) => ({
  ...state.user,
  ...state.cartDetail,
  ...state.updateProductData,
  ...state.cartItemVal,
  ...state.updateCartItemData,
  ...state.removeCartData,
}))(UpdatedHome);
