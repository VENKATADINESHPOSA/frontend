import React from "react";
import { connect } from "react-redux";
import "./UpdatedNodAboutUs.styles.scss";
import Header from "~/components/Header";
import NodAboutComponent from "../../components/NodAboutComponent/NodAbout.component";
import Copyright from "../../components/CopyrightComponent/Copyright.component";
import FooterNod from "../../components/FooterNodComponent/FooterNod.component";


const UpdatedNodAboutUs = (props) => {
    return (
      <div className="nod-aboutus-div">
        <Header {...props} />
        <NodAboutComponent />
        <FooterNod />
        <div style={{ backgroundColor: "#f3f3f3" }}>
          <Copyright />
        </div>
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
  }))(UpdatedNodAboutUs);