import React from "react";
import { connect } from "react-redux";
import "./IkoPage.styles.scss";
import Header from "~/components/Header";
import Copyright from "../../components/CopyrightComponent/Copyright.component";
import FooterNod from "../../components/FooterNodComponent/FooterNod.component";
import Iframe from "../../components/IframeComponent/Iframe.component";
import IkoDescription from "../../components/IkoDescriptionComponent/IkoDescription.component";

const IkoPage = (props) => {
  return (
    <div className="iko-page-div">
      <Header {...props} />
      <IkoDescription />
      <Iframe
        src="https://www.ikont.com/"
        height="500"
        width="100%"
        title="koyo"
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
}))(IkoPage);
