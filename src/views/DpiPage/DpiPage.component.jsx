import React from "react";
import { connect } from "react-redux";
import "./DpiPage.styles.scss";
import Header from "~/components/Header";
import Copyright from "../../components/CopyrightComponent/Copyright.component";
import FooterNod from "../../components/FooterNodComponent/FooterNod.component";
import DpiDescription from "../../components/DpiDescription/DpiDescription.component";
import Iframe from "../../components/IframeComponent/Iframe.component";

const DpiPage = (props) => {
  return (
    <div className="dpi-page-div">
      <Header {...props} />
      <DpiDescription />
      <Iframe
        src="http://dpibearings.com/"
        height="500"
        width="100%"
        title="dpi"
      />
      <FooterNod />
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
}))(DpiPage);
