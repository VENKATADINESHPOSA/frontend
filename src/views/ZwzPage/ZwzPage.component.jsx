import React from "react";
import { connect } from "react-redux";
import "./zwzPage.styles.scss";
import Header from "~/components/Header";
import Copyright from "../../components/CopyrightComponent/Copyright.component";
import FooterNod from "../../components/FooterNodComponent/FooterNod.component";
import ZwzDescription from "../../components/ZwzDescriptionComponent/ZwzDescription.component";

const ZwzPage = (props) => {
  return (
    <div className="zwz-page-div">
      <Header {...props} />
      <ZwzDescription />
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
}))(ZwzPage);
