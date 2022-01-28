import React from "react";
import Header from "~/components/Header";
import { connect } from "react-redux";
import ExistingUserFetchDetails from "../../components/ExistingUserFetchDetails/ExistingUserFetchDetails.component";

const ExistingCustomerRegister = (props) => {
  return (
    <div className="main_container_login">
      <Header {...props} />
      <ExistingUserFetchDetails {...props} />
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
}))(ExistingCustomerRegister);
