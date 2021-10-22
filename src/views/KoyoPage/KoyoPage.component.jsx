import React from "react";
import { connect } from "react-redux";
import "./KoyoPage.styles.scss";
import Header from "~/components/Header";
import Copyright from "../../components/CopyrightComponent/Copyright.component";
import FooterNod from "../../components/FooterNodComponent/FooterNod.component";
import KoyoDescription from "../../components/KoyoDescriptionComponent/KoyoDescription.component";
import Iframe from "../../components/IframeComponent/Iframe.component";

const KoyoPage = (props) => {
  return (
    <div className="koyo-page-div">
      <Header {...props} />
      <KoyoDescription />
      <Iframe
        src="https://koyo.jtekt.co.jp/en/"
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
}))(KoyoPage);
