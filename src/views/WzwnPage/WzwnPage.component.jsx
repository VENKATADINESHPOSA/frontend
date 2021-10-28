import React from "react";
import { connect } from "react-redux";
import "./wzwnPage.styles.scss";
import Header from "~/components/Header";
import Copyright from "../../components/CopyrightComponent/Copyright.component";
import FooterNod from "../../components/FooterNodComponent/FooterNod.component";
import WzwnDescription from "../../components/WzwnDescriptionComponent/WzwnDescription.component";
const WzwnPage = (props) => {
  return (
    <div className="wzwn-page-div">
      <Header {...props} />
      <WzwnDescription />
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
}))(WzwnPage);
