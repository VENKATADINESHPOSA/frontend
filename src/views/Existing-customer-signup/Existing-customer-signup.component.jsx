import React from "react";
import Header from "~/components/Header";
import { connect } from "react-redux";
import ExistingCustomerSignUpForm from "../../components/Existing-customer-signup-form/Existing-customer-singup-form.component";

const ExistingCustomerSignUp = (props) => {
  return (
    <div className="main_container_login">
      <Header {...props} />
      <ExistingCustomerSignUpForm {...props} />
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
}))(ExistingCustomerSignUp);
