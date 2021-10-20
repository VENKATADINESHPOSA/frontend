import React from "react";
import { connect } from "react-redux";
import "./updatedNodHome.styles.scss";
import Header from "~/components/Header";
import NodBannerImage from "../../components/NodBannerComponent/NodBanner.component";
import AboutUsNod from "../../components/AboutUsNodComponent/AboutUsNod.component";
import Copyright from "../../components/CopyrightComponent/Copyright.component";
import FooterNod from "../../components/FooterNodComponent/FooterNod.component";
import NodBrandsSection from "../../components/NodBrandsComponent/NodBrands.component";

const UpdatedNodHome = (props) => {
  return (
    <div className="nod-home-div">
      <Header {...props} />
      <NodBannerImage />
      <AboutUsNod />
      <NodBrandsSection />
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
}))(UpdatedNodHome);
