import React from "react";
import { connect } from "react-redux";
import "./NodContactUsPage.styles.scss";
import Header from "~/components/Header";
import Copyright from "../../components/CopyrightComponent/Copyright.component";
import FooterNod from "../../components/FooterNodComponent/FooterNod.component";


const NodContactUs = (props) => {
    return (
      <div className="nod-contactus-div">
        <Header {...props} />
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
  }))(NodContactUs);
