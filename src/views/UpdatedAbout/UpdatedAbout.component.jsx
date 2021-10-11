import React from "react";
import "./UpdatedAbout.styles.scss";
import { connect } from "react-redux";
import Header from "~/components/Header";
import Footer from "../../components/UpdatedFooterComponent/UpdatedFooter.component";
import Copyright from "../../components/CopyrightComponent/Copyright.component";
import ClientLogos from "../../components/ClientLogosComponent/ClientLogos.component";
import AboutBanner from "../../components/AboutBannerComponent/AboutBanner.component";
import ZWZChina from "../../components/AboutZWZComponent/AboutZWZ.component";
import JointVenture from "../../components/JointVentureComponent/JointVenture.component";
import ManufacturingZones from "../../components/ManufacturingZonesComponent/ManufacturingZones.component";

const UpdatedAbout = (props) => {
  return (
    <div className="about-div">
      <Header {...props} />
      <AboutBanner />
      <ZWZChina />
      <ManufacturingZones />
      <JointVenture />
      <ClientLogos />
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
}))(UpdatedAbout);
