import React, { Component } from 'react'
import './styles.scss'
import { Button, Row, Col,Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Modal,ButtonToolbar, Tooltip} from 'reactstrap';
import {connect} from 'react-redux';
import axios from 'axios';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import image1 from '~/assets/images/1.jpg';
import image2 from '~/assets/images/2.jpg';
import emptyCart from '~/assets/images/empty_cart.png';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import {updateUserData} from '~/redux/action/user';
import {updateCartData} from '~/redux/action/cartDetails';
import {removeCartData} from '~/redux/action/cartDetails';
import {updateProductData} from '~/redux/action/productDetail';
import {updateCartItemData} from '~/redux/action/cartItemVal';
import {SessionModalData} from '../modal/session_modal';

var selectedItemVal = "";

class Cart extends Component {
constructor(props){
super(props)
this.goToLogin = this.goToLogin.bind(this);
this.goToShipping = this.goToShipping.bind(this);
this.removeItem = this.removeItem.bind(this);
/*this.removeItem1 = this.removeItem1.bind(this);*/
this.getCartData = this.getCartData.bind(this);
this.goToRFQ1 = this.goToRFQ1.bind(this);
this.goToRFQ2 = this.goToRFQ2.bind(this);
this.onUpdateQuantity = this.onUpdateQuantity.bind(this);
this.Successtoggle = this.Successtoggle.bind(this);
this.SuccesstoggleOk = this.SuccesstoggleOk.bind(this);
this.RFQMessagetoggle = this.RFQMessagetoggle.bind(this);
this.Failedtoggle = this.Failedtoggle.bind(this);
this.shippingToggle = this.shippingToggle.bind(this);
this.enableInput = this.enableInput.bind(this);
this.processData = this.processData.bind(this);
this.handleChangeGst = this.handleChangeGst.bind(this);
this.OnSaveGst = this.OnSaveGst.bind(this);
this.NoPlaceOrder = this.NoPlaceOrder.bind(this);
this.onChangeAvailability = this.onChangeAvailability.bind(this);
this.showupdateToggle = this.showupdateToggle.bind(this);
this.showfailedToggle = this.showfailedToggle.bind(this);
this.OnRFQMessagetoggle = this.OnRFQMessagetoggle.bind(this);
this.GoRFItoggle = this.GoRFItoggle.bind(this);
this.Checkouttoggle = this.Checkouttoggle.bind(this);
this.GoCheckouttoggle = this.GoCheckouttoggle.bind(this);
this.toggle = this.toggle.bind(this);
this.getPaymentData = this.getPaymentData.bind(this);


this.state = {
itemname: '',
categoryname: '',
categorycode: '',
categorytype: '',
productcode: '',
description: '',
price: '',
brandname: '',
itemtype: '',
totalAmount: '',
added_item: [],
no_cart_data: '',
date: '',
before_login_total_amount: '',
GoRFImodal: false,
after_login_amount: '',
Successmodal: false,
Failedmodal: false,
invalidPlaceOrderMessage: false,
GoCheckoutmodal: false,
showAlert: true,
showupdateModal: false,
showfailedModal: false,
isActive: false,
isSession: false,
isDisabled: true,
showEditBtn: true,
showSaveBtn: false,
showError: false,
showupdate: false,
invalidPlaceOrderMessage: false,
showAlert2: false,
GstVal: 0,
totalWeight: 0,
isChecked: false,
isDisabled: true,
isDisabledRFQ: true,
isloading: false,
RFQMessagemodal: false,
tooltipOpen: false,
payment_term: '',
credit_period: '',
available_balance: ''

}
}

toggle(){
  this.setState({
    tooltipOpen: !this.state.tooltipOpen
  })
}

enableInput(){
  this.setState({
    isDisabled: false,
    showSaveBtn: true,
    showEditBtn: false
  })
}

NoPlaceOrder(){
  this.setState({
    invalidPlaceOrderMessage: true
  })
}

GoCheckouttoggle() {
    var items = "";
    var totalItems = "";
     const checkedItem = this.state.added_item.filter(item => item.isChecked)


        
    for(var i = 0; i < checkedItem.length; i++) {
      
      /*if (this.state.added_item[i].isChecked == true) {*/
        if (i == 0) {
          items = checkedItem[i].itemname ;
          totalItems = totalItems  + items;
          selectedItemVal = totalItems;

        }else{
          items = checkedItem[i].itemname ;
          totalItems = totalItems + "," + " " + items;
          selectedItemVal = totalItems;
        }
     /*   
      }*/
    }
    this.setState(prevState => ({ GoCheckoutmodal: !prevState.GoCheckoutmodal }));
  }

GoRFItoggle() {
    var items = "";
    var totalItems = "";
     const checkedItem = this.state.added_item.filter(item => item.isChecked)


        
    for(var i = 0; i < checkedItem.length; i++) {
      
      /*if (this.state.added_item[i].isChecked == true) {*/
        if (i == 0) {
          items = checkedItem[i].itemname ;
          totalItems = totalItems  + items;
          selectedItemVal = totalItems;

        }else{
          items = checkedItem[i].itemname ;
          totalItems = totalItems + "," + " " + items;
          selectedItemVal = totalItems;
        }
     /*   
      }*/
    }
    this.setState(prevState => ({ GoRFImodal: !prevState.GoRFImodal }));
  }

handleChangeGst(e){

  this.setState({
    gstNumber: e.target.value
  })
}

SuccesstoggleOk(){
  this.setState({
    Successmodal: false
  })
 /* window.location.reload();*/
 window.location.href='';
}

showfailedToggle(){
  this.setState(prevState => ({ showfailedModal: !prevState.showfailedModal }));
}

showupdateToggle(){
  this.setState(prevState => ({ showupdateModal: !prevState.showupdateModal }));
}

checkAll(){
  if (this.state.isChecked === false) {
    this.setState({
      isChecked: true,
      isDisabledRFQ: false,
      showAlert: false,
      showAlert2: false
    })

    let newCartData =
      this.state.added_item.map(item => ({
        ...item,
        isChecked: true
      }))

      this.setState({
        added_item: newCartData, 
   
      })

      var subtotal_amount = 0;
      var subtotal_gst = 0;
      var subtotal_weight = 0;
        
      for (var i=0;i<this.state.added_item.length;i++){
      
        /*var amount_cal = this.state.added_item[i].total_amount*/
        var amount_cal = this.state.added_item[i].your_price * this.state.added_item[i].quantity
        subtotal_amount = subtotal_amount + amount_cal 
        var gst_cal = parseInt(this.state.added_item[i].gst_value) * this.state.added_item[i].quantity
        subtotal_gst = subtotal_gst + gst_cal
       if (this.state.added_item[i].weight) {
          var weight = Number(this.state.added_item[i].weight) * Number(this.state.added_item[i].quantity)
          subtotal_weight = subtotal_weight + weight 
          }
      }

      this.setState({
        after_login_amount : subtotal_amount,
        GstVal: subtotal_gst,
        totalWeight: subtotal_weight
      })

  } else if (this.state.isChecked === true) {
    this.setState({
      isChecked: false,
      isDisabledRFQ: true,
      showAlert: true,
      showAlert2: false
    })

     let newCartData =
      this.state.added_item.map(item => ({
        ...item,
        isChecked: false
      }))

      this.setState({
        added_item: newCartData
      })


      this.setState({
        after_login_amount : 0,
        GstVal : 0,
        totalWeight: 0,
      })
  }

  /*if (this.state.isChecked == false) {*/

    for(var i = 0; i< this.state.added_item.length ; i++){
      if (this.state.added_item[i].Availability == "Stock") {
        this.setState({
          isDisabled: false,
          showAlert2: false,
        })
      }else{
        this.setState({
          isDisabled: true,
          showAlert2: true
        })
        return false;
      }
    } 
 /* }*/

  if (this.state.isChecked == true) {
    this.setState({
      isDisabled: true,
      showAlert2: true
    })
  }
}

checkedSingle(index, item){
  this.setState({
    isChecked: false
  })
  console.log(this.state.added_item)
   
    
  
  
  let newCartData = this.state.added_item;
  if (newCartData[index].isChecked === false) {
    newCartData[index].isChecked  =  true;
    
  }else if (newCartData[index].isChecked === true) {
    newCartData[index].isChecked  =  false;

  }
  
  this.setState({  
    added_item: newCartData
  })
  var subtotal_amount = 0;
  var subtotal_gst = 0;
  var subtotal_weight = 0;
  for (var i=0;i<this.state.added_item.length;i++){
    if (this.state.added_item[i].isChecked == true) {
      /*var amount_cal = this.state.added_item[i].total_amount*/
      var amount_cal = this.state.added_item[i].your_price * this.state.added_item[i].quantity
      subtotal_amount = subtotal_amount + amount_cal 
      var gst_cal = parseInt(this.state.added_item[i].gst_value) * this.state.added_item[i].quantity
      subtotal_gst = subtotal_gst + gst_cal
      if (this.state.added_item[i].weight) {
          var weight = Number(this.state.added_item[i].weight) * Number(this.state.added_item[i].quantity)
          subtotal_weight = subtotal_weight + weight 
      }
    }
  }

  console.log("dstfydf");
  console.log(subtotal_weight);

  this.setState({
    after_login_amount : subtotal_amount,
    GstVal : subtotal_gst,
    totalWeight: subtotal_weight
  })


  const checkedItem = this.state.added_item.filter(item => item.isChecked)
  const stockItem = checkedItem.filter(item => item.Availability == "Stock")
  console.log("checkedItem", checkedItem, "stockItem", stockItem )
  if(checkedItem.length == stockItem.length) {
    this.setState({
      isDisabled: false,
      isDisabledRFQ: false,
      showAlert: false,
      showAlert2: false,
    })
  }
   else {
    this.setState({
      isDisabled: true,
      showAlert2: true,
      isDisabledRFQ: false,
      showAlert: false
    })
  }  

  if (checkedItem.length === 0) {
    this.setState({
      isDisabled: true,
      showAlert2: true,
      isDisabledRFQ: true,
      showAlert: true,
      showAlert2: false
    }, () => {
         console.log(this.state.isDisabled);    
        })
  }else{
    this.setState({
      showAlert: false
    })
  }
 
  /*for(var i = 0; i< this.state.added_item.length ; i++){
    if (this.state.added_item[i].isChecked == true && this.state.added_item[i].Availability == "STOCK") {
      console.log("inside");
      this.setState({
        isDisabled: false
      })
    }else if (this.state.added_item[i].isChecked == true && this.state.added_item[i].Availability == "BACK-ORDER"){
      console.log("outside");
      this.setState({
        isDisabled: true
      })
    }else if (this.state.added_item[i].isChecked == true && this.state.added_item[i].Availability == "BACK-ORDER") {
      this.setState({
        isDisabled: true
      })
    }else{
      this.setState({
        isDisabled: true
      })
    }
  }*/


   
      
}

onChangeAvailability(e){
  var current_amt = 0
  this.setState({
    isChecked: false
  })
 /* var TotalAmount;*/

 if (e.target.value == "0") {
    this.setState({
      isDisabledRFQ: true,
    })
   var new_added_item = this.state.added_item.map(item => {
      item.isChecked = false
      return item
    })
    this.setState({
      added_item: new_added_item,
      isDisabled: true,
      showAlert2: true,
    })

    

    var subtotal_amount = 0;
        
      this.setState({
        after_login_amount : subtotal_amount
      })
  }


  if (e.target.value == "1") {
    this.setState({
      isDisabledRFQ: true
    })
   var new_added_item = this.state.added_item.map(item => {
      if (item.Availability == "Stock") {
        item.isChecked = true

        console.log("asdfghj");
        this.setState({
          isDisabledRFQ: false,
        })

      }else{
        item.isChecked = false
      }

      return item
    })

    this.setState({
      added_item: new_added_item,
      isDisabled: false,
      showAlert2: false,
      
    })

    console.log(this.state.added_item);

    var filterData = this.state.added_item.filter(item => item.isChecked);
    console.log("filterData", filterData);
    console.log(filterData.length);
    if (filterData.length == 0) {
      this.setState({
        isDisabled: true,
        showAlert: true,
        showAlert2: true,
      })
    }else{
      this.setState({
        showAlert: false
      })
    }

    var subtotal_amount = 0;
    var subtotal_gst = 0;
    var subtotal_weight = 0;
        
      for (var i=0;i<this.state.added_item.length;i++){
        
        if (this.state.added_item[i].Availability == "Stock") {
          /*var amount_cal = this.state.added_item[i].total_amount*/
          var amount_cal = this.state.added_item[i].your_price * this.state.added_item[i].quantity
          subtotal_amount = subtotal_amount + amount_cal 

          var gst_cal = parseInt(this.state.added_item[i].gst_value) * this.state.added_item[i].quantity
          subtotal_gst = subtotal_gst + gst_cal 
          if (this.state.added_item[i].weight) {
          var weight = Number(this.state.added_item[i].weight) * Number(this.state.added_item[i].quantity)
          subtotal_weight = subtotal_weight + weight 
          }
        }
      }

      this.setState({
        after_login_amount : subtotal_amount,
        GstVal : subtotal_gst,
        totalWeight : subtotal_weight
      })
  }else  if (e.target.value == "2") {
    this.setState({
      isDisabledRFQ: true
    })
   var new_added_item = this.state.added_item.map(item => {
      if (item.Availability == "On Demand") {
        item.isChecked = true
        this.setState({
          isDisabledRFQ: false,
        })
      }else{
        item.isChecked = false
      }
      return item
    })
    this.setState({
      added_item: new_added_item,
      isDisabled: true,
      showAlert2: true,
    })

     var filterData = this.state.added_item.filter(item => item.isChecked);
    console.log("filterData", filterData);
    console.log(filterData.length);
    if (filterData.length == 0) {
      this.setState({
        isDisabled: true,
        showAlert: true,
        showAlert2: false
      })
    }else{
      this.setState({
        showAlert: false
      })
    }


    var subtotal_amount = 0;
    var subtotal_gst = 0;
    var subtotal_weight = 0;
        
      for (var i=0;i<this.state.added_item.length;i++){
        
        if (this.state.added_item[i].Availability == "On Demand") {
          /*var amount_cal = this.state.added_item[i].total_amount*/
          var amount_cal = this.state.added_item[i].your_price * this.state.added_item[i].quantity
          subtotal_amount = subtotal_amount + amount_cal 

          var gst_cal = parseInt(this.state.added_item[i].gst_value) * this.state.added_item[i].quantity
          subtotal_gst = subtotal_gst + gst_cal
          if (this.state.added_item[i].weight) {
            var weight = Number(this.state.added_item[i].weight) * Number(this.state.added_item[i].quantity)
            subtotal_weight = subtotal_weight + weight
          }

          
        }
      }

      this.setState({
        after_login_amount : subtotal_amount,
        GstVal: subtotal_gst,
        totalWeight: subtotal_weight
      })
  }else  if (e.target.value == "3") {
    this.setState({
      isDisabledRFQ: true
    })
   var new_added_item = this.state.added_item.map(item => {
      if (item.Availability == "Arriving Shortly") {
        item.isChecked = true

        this.setState({
          isDisabledRFQ: false,
        })

      }else{
        item.isChecked = false
      }
      return item
    })
    this.setState({
      added_item: new_added_item,
      isDisabled: true,
      showAlert2: true,
      
    })
    var filterData = this.state.added_item.filter(item => item.isChecked);
    if (filterData.length == 0) {
      this.setState({
        showAlert: true,
        showAlert2: false
      })
    }else{
      this.setState({
        showAlert: false
      })
    }

    var subtotal_amount = 0;
    var subtotal_gst = 0;
    var subtotal_weight = 0;
        
      for (var i=0;i<this.state.added_item.length;i++){
        
        if (this.state.added_item[i].Availability == "Arriving Shortly") {
          /*var amount_cal = this.state.added_item[i].total_amount*/
          var amount_cal = this.state.added_item[i].your_price * this.state.added_item[i].quantity
          subtotal_amount = subtotal_amount + amount_cal 

          var gst_cal = parseInt(this.state.added_item[i].gst_value) * this.state.added_item[i].quantity
          subtotal_gst = subtotal_gst + gst_cal

          if (this.state.added_item[i].weight) {
          var weight = Number(this.state.added_item[i].weight) * Number(this.state.added_item[i].quantity)
          subtotal_weight = subtotal_weight + weight 
          }
        }
      }

      this.setState({
        after_login_amount : subtotal_amount,
        GstVal: subtotal_gst,
        totalWeight: subtotal_weight
      })

  }else  if (e.target.value == "4") {
    this.setState({
      isDisabledRFQ: true
    })
   var new_added_item = this.state.added_item.map(item => {
      if (item.Availability == "PRODUCTION") {
        item.isChecked = true
        this.setState({
          isDisabledRFQ: false,
        })
      }else{
        item.isChecked = false
      }
      return item
    })
    this.setState({
      added_item: new_added_item,
      isDisabled: true,
      showAlert2: true,
    })
    var filterData = this.state.added_item.filter(item => item.isChecked);
    if (filterData.length == 0) {
      this.setState({
        showAlert: true,
        showAlert2: false
      })
    }else{
      this.setState({
        showAlert: false
      })
    }

      var subtotal_amount = 0;
      var subtotal_gst = 0;
      var subtotal_weight = 0;
        
      for (var i=0;i<this.state.added_item.length;i++){
        
        if (this.state.added_item[i].Availability == "PRODUCTION") {
         /* var amount_cal = this.state.added_item[i].total_amount*/
         var amount_cal = this.state.added_item[i].your_price * this.state.added_item[i].quantity

          subtotal_amount = subtotal_amount + amount_cal 

          var gst_cal = parseInt(this.state.added_item[i].gst_value) * this.state.added_item[i].quantity
          subtotal_gst = subtotal_gst + gst_cal
          if (this.state.added_item[i].weight) {
          var weight = Number(this.state.added_item[i].weight) * Number(this.state.added_item[i].quantity)
          subtotal_weight = subtotal_weight + weight 
          }
        }
      }

      this.setState({
        after_login_amount : subtotal_amount,
        GstVal: subtotal_gst,
        totalWeight : subtotal_weight
      })
  }else if (e.target.value == "5") {
    this.setState({
      isDisabledRFQ: true
    })
   var new_added_item = this.state.added_item.map(item => {
      if (item.Availability == "RFI Approved") {
        item.isChecked = true

        console.log("asdfghj");
        this.setState({
          isDisabledRFQ: false,
        })

      }else{
        item.isChecked = false
      }

      return item
    })

    this.setState({
      added_item: new_added_item,
      isDisabled: false,
      showAlert2: false,
      
    })

    console.log(this.state.added_item);

    var filterData = this.state.added_item.filter(item => item.isChecked);
    console.log("filterData", filterData);
    console.log(filterData.length);
    if (filterData.length == 0) {
      this.setState({
        isDisabled: true,
        showAlert: true,
        showAlert2: true,
      })
    }else{
      this.setState({
        showAlert: false
      })
    }

    var subtotal_amount = 0;
    var subtotal_gst = 0;
    var subtotal_weight = 0;
        
      for (var i=0;i<this.state.added_item.length;i++){
        
        if (this.state.added_item[i].Availability == "Stock") {
          /*var amount_cal = this.state.added_item[i].total_amount*/
          var amount_cal = this.state.added_item[i].your_price * this.state.added_item[i].quantity
          subtotal_amount = subtotal_amount + amount_cal 

          var gst_cal = parseInt(this.state.added_item[i].gst_value) * this.state.added_item[i].quantity
          subtotal_gst = subtotal_gst + gst_cal 
          if (this.state.added_item[i].weight) {
          var weight = Number(this.state.added_item[i].weight) * Number(this.state.added_item[i].quantity)
          subtotal_weight = subtotal_weight + weight 
          }
        }
      }

      this.setState({
        after_login_amount : subtotal_amount,
        GstVal : subtotal_gst,
        totalWeight : subtotal_weight
      })
  }
}

OnSaveGst(){
  
  if(window.location.href === "http://zwz.prtouch.com:8081/cart" || window.location.href === "http://zwz.prtouch.com:8081/cart#" || window.location.href=== "http://localhost:3000/cart#" || window.location.href=== "http://localhost:3000/cart") {

     axios.post('http://apizwz.prtouch.com:8081/authentication/update_get_info/' , 

     {
      
      "gst_update": this.state.gstNumber,
      "key":"place_order"
     },{
       headers: {
            'Authorization' : 'Token ' + localStorage.getItem('auth_key')
          } 

     }
     

     )
      .then((response) =>  {

        console.log(response.data.success);

        if(response.data.success === true){
          this.setState({
            isDisabled: true,
            showEditBtn: true,
            showSaveBtn: false,
            showError: false,
            showupdate: true,
            updateMessage:  response.data.message

          })
        }else if (response.data.success === false) {
          this.setState({
            ErrorMessage: response.data.message,
            showError: true,
            showupdate: false,
          })
        }

        /*if (response.data.success === false) {
          console.log("sdfghsdfghfalse");
          window.location.href = "http://zwz.prtouch.com:8081/login"
        }*/
      })
      .catch(function (error) {
        
        
      });

    }else if (window.location.href === "http://nod.prtouch.com:8081/cart" || window.location.href === "http://zwz.prtouch.com:8081/cart#" ) {

      axios.post('http://apinod.prtouch.com:8081/authentication/update_get_info/' , 

     {
      
      "gst_update": this.state.gstNumber,
      "key":"place_order"
     },{
       headers: {
            'Authorization' : 'Token ' + localStorage.getItem('auth_key')
          } 

     }
     

     )
      .then((response) =>  {

        console.log(response);
        if(response.data.success === true){
          this.setState({
            isDisabled: true,
            showEditBtn: true,
            showSaveBtn: false,
            showError: false
          })
        }else if (response.data.success === false) {
          this.setState({
            ErrorMessage: response.data.message,
            showError: true
          })
        }
        /*if (response.data.success === false) {
          window.location.href = "http://nod.prtouch.com:8081/login"
        }*/
      })
      .catch(function (error) {
        
        
      });
    }


  
}



Successtoggle() {
    this.setState(prevState => ({ Successmodal: !prevState.Successmodal }));
  }

  RFQMessagetoggle() {
    this.setState(prevState => ({ RFQMessagemodal: !prevState.RFQMessagemodal }));
  }

  OnRFQMessagetoggle(){
    this.setState({
      RFQMessagemodal: false
    })

    this.goToRFQ2();
  }

  Failedtoggle() {
    this.setState(prevState => ({ Failedmodal: !prevState.Failedmodal }));
  }

  Checkouttoggle(){
    var totalWeightRound = this.state.totalWeight.toFixed(2);
     this.props.history.push('/shipping'); 
     localStorage.setItem('subtotal', this.state.after_login_amount)
     localStorage.setItem('totalGst', this.state.GstVal)
     localStorage.setItem('totalWeight', totalWeightRound)
     localStorage.setItem('Estimated_Standard_Shipping', '0')
     localStorage.setItem('Estimated_Total', this.state.after_login_amount)
     var totalAmoutValue = this.state.after_login_amount + this.state.GstVal;
    localStorage.setItem('totalAmoutValue', totalAmoutValue)

     const checkedItem = this.state.added_item.filter(item => item.isChecked)
     localStorage.setItem('checkedItem', JSON.stringify(checkedItem));



     var arr = []

    for(var i = 0; i < this.state.added_item.length; i++) {
        if (this.state.added_item[i].isChecked == true) {
          var orderData  = {};
          orderData['exp_dod'] = this.state.added_item[i].exp_dod;
          orderData['Availability'] = this.state.added_item[i].Availability;
          orderData['item_detail_id'] = this.state.added_item[i].item_detail_id;
          orderData['itemname'] = this.state.added_item[i].itemname;
          orderData['cattype'] = this.state.added_item[i].cattype;
          orderData['catname'] = this.state.added_item[i].catname;
          orderData['itemcode'] = this.state.added_item[i].itemcode;
          orderData['descript'] = this.state.added_item[i].descript;
          orderData['quantity'] = this.state.added_item[i].quantity;
          orderData['amount_per_unit'] = this.state.added_item[i].amount_per_unit;
          /*orderData['total_amount'] = this.state.added_item[i].total_amount;*/
          orderData['total_amount'] = this.state.added_item[i].total_value1;
          orderData['added_on'] = this.state.added_item[i].added_on;
          orderData['brandname'] = this.state.added_item[i].brandname;
          arr.push(orderData);
         }
      }
      console.log(arr)
     localStorage.setItem('cartItems', JSON.stringify(arr))
     }

shippingToggle() {
  if (window.location.href === "http://zwz.prtouch.com:8081/cart" || window.location.href === "http://zwz.prtouch.com:8081/cart#" || window.location.href === "http://localhost:3000/cart") {

    axios.get('http://apizwz.prtouch.com:8081/authentication/get_info/',
      {
         headers: {
              'Content-Type': 'application/json',
              'Authorization' : 'Token ' + localStorage.getItem('auth_key')
            } 
        }
    )
       .then((response) =>  {
        this.setState({
          billingaddress: response.data.data.billing_details['b_address'],
          billingstate: response.data.data.billing_details['b_state'],
          billingcity: response.data.data.billing_details['b_city'],
          shippingaddress: response.data.data.shipping_details['s_address'],
          shippingstate: response.data.data.shipping_details['s_state'],
          shippingcity: response.data.data.shipping_details['s_city'],
          gstNumber: response.data.data.gst_no,
        })
       })
       .catch(function (error) {
    });

  } else  if (window.location.href === "http://nod.prtouch.com:8081/cart" || window.location.href === "http://nod.prtouch.com:8081/cart#") {
    axios.get('http://apizwz.prtouch.com:8081/authentication/get_info/',
      {
         headers: {
              'Content-Type': 'application/json',
              'Authorization' : 'Token ' + localStorage.getItem('auth_key')
            } 
        }
    )
       .then((response) =>  {
        this.setState({
          billingaddress: response.data.data.billing_details['b_address'],
          billingstate: response.data.data.billing_details['b_state'],
          billingcity: response.data.data.billing_details['b_city'],
          shippingaddress: response.data.data.shipping_details['s_address'],
          shippingstate: response.data.data.shipping_details['s_state'],
          shippingcity: response.data.data.shipping_details['s_city'],
          gstNumber: response.data.data.gst_no,

        })
       })
       .catch(function (error) {
    });
  }
  this.setState(prevState => ({ shippingModal: !prevState.shippingModal }));
}

  processData(){
  this.setState({
  Successmodal: false
  })
  this.props.history.push('/shipping');
  }

  getPaymentData(){

    var url=''
    if (window.location.href === "http://zwz.prtouch.com:8081/cart"){
      url="http://apizwz.prtouch.com:8081/api/get_avlinfo/"
    }
    else if(window.location.href === "http://nod.prtouch.com:8081/cart" || window.location.href === "http://localhost:3000/cart"  || window.location.href === "http://nod.prtouch.com:8081/cart#"){
      url="http://apinod.prtouch.com:8081/api/get_avlinfo/"
    }else{
      url="http://apizwz.prtouch.com:8081/api/get_avlinfo/"
    }
      axios.get(url , 
      {
         headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Token ' + localStorage.getItem('auth_key')
            } 
      })
        .then((response) =>  {
          const toDecimalMark = num => num.toLocaleString('en-US');
         this.setState({
            available_balance: toDecimalMark(response.data.data.avl_balance),
            credit_period: response.data.data.creditperiod

         })
        })
        .catch(function (error) {
        }); 




 

  }

  componentDidMount(){
    window.scrollTo(0, 0)
  }

componentWillMount(){
  this.getPaymentData();

var today = new Date(),
date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        //console.log("currentDate" + date);
//console.log("cart_data"+this.props.cart);
this.setState({
date: date
})
let current_amt = 0;
let productAmt;
let totalAmount  = 0;
let totalAmount1 =0
this.getCartData();
//console.log(this.props.cart)
for (var i = 0; i < this.props.cart.length; i++) {
//console.log("amount_val" + this.props.cart[i].Amount)
totalAmount += this.props.cart[i].Amount;
}
this.setState({
before_login_total_amount: totalAmount
})
}
async onUpdateQuantity(e,itemId, Quantity){
/*if(e.key === 'Enter'){*/
if (window.location.href === "http://zwz.prtouch.com:8081/cart" || window.location.href === "http://localhost:3000/cart") {
axios.post('http://apizwz.prtouch.com:8081/api/update_item_quantity/' ,
{
"item_id": itemId,
"item_quantity": Quantity
}, 
{
headers: {
          'Authorization' : 'Token ' + localStorage.getItem('auth_key')
        } 
}
)
   .then((response) =>  {
    if (response.data.success == true) {
      if (response.data.backorder_flag == true) {
      this.setState({
        /*showupdateModal: true,*/
        showFailedModal: false,
        isChecked: false,
        successFailedMessage: 'Requested Quantity has different availability.'
      })
      this.Successtoggle();
      }else{
        this.getCartData();
        window.location.href= '';
      }
     /* this.getCartData();*/
    }else{
       this.setState({
        showupdateModal: false,
        isChecked: false,
        /*showFailedModal: true,*/
        successFailedMessage: response.data.message
      })
       this.Successtoggle();
       /*this.getCartData();*/
    }
     //this.getCartData();
     /*window.location.href= '';*/
   })
   .catch(function (error) {
     
     
   });
}else if (window.location.href === "http://nod.prtouch.com:8081/cart" ) {

axios.post('http://apinod.prtouch.com:8081/api/update_item_quantity/' ,
{

"item_id": itemId,
"item_quantity": Quantity
}, 

{
headers: {
          'Authorization' : 'Token ' + localStorage.getItem('auth_key')
        } 

}


)
   .then((response) =>  {

    //console.log(response);
    //this.getCartData();
     if (response.data.success == true) {
      if (response.data.backorder_flag == true) {
      this.setState({
        /*showupdateModal: true,*/
        showFailedModal: false,
        isChecked: false,
        successFailedMessage: 'Requested Quantity has different availability.'
      })
      this.Successtoggle();
      }else{
        this.getCartData();
       /* window.location.href= '';*/
      }
     /* this.getCartData();*/
    }else{
       this.setState({
        showupdateModal: false,
        isChecked: false,
        /*showFailedModal: true,*/
        successFailedMessage: response.data.message
      })
       this.Successtoggle();
       /*this.getCartData();*/
    }
     /*window.location.href= '';*/
     //his.getCartData();
    
    
   })
   .catch(function (error) {
     
     
   });
} 
/*}*/
}

async getCartData(){
  var ref = this;
  if ( window.location.href === "http://zwz.prtouch.com:8081/cart") {
    this.setState({
      isActive: true
    })
    
    axios.get('http://apizwz.prtouch.com:8081/api/display_additem/' , {
        headers: {'Authorization' : 'Token ' + localStorage.getItem('auth_key')} 
      }
    ).then((response) =>  {
      console.log(response);
      var subtotal_amount = 0;
            if (response.data.success === true) { 
        var item_length = response.data.itemdetails.length
        for (var i=0;i<item_length;i++){
          /*if(response.data.itemdetails[i].Availability == "STOCK" && response.data.itemdetails[i].amount_per_unit >0){*/
            /*var amount_cal = response.data.itemdetails[i].total_amount*/
            var amount_cal = response.data.itemdetails[i].total_value1
            subtotal_amount = subtotal_amount + amount_cal

          /*}else{
            count = count + 1                 
          }
          */
          /*if (count>0) {
            this.setState({
              hidePrice: false, 
              showPrice: true
            })
          }else{
            this.setState({
              showPrice: true,
              hidePrice:false
            })
          }*/
          
          this.setState({
            after_login_amount: 0
          })
      }
        }

        let newCartData =
        response.data.itemdetails.map(item => ({
          ...item,
          isChecked: false
        }))

        this.setState({
          isloading: !this.state.isloading,
          added_item: newCartData,
          no_cart_data: response.data.itemdetails.length,
          isActive: false
    })
    this.props.dispatch(updateCartItemData(response.data.itemdetails.length))
    localStorage.setItem('num_cart_data' , response.data.itemdetails.length);
   })
   .catch(function (error) {
    ref.setState({
      isSession: true,
      isActive : false
    })
   });
} else if (window.location.href === "http://localhost:3000/cart" || window.location.href === "http://nod.prtouch.com:8081/cart" || window.location.href === "http://localhost:3000/cart" ) {

this.setState({
isActive: true
})
axios.get('http://apinod.prtouch.com:8081/api/display_additem/' , 

{
headers: {
          'Authorization' : 'Token ' + localStorage.getItem('auth_key')
        } 

}


)
   .then((response) =>  {
    console.log(response);
      var subtotal_amount = 0;
            if (response.data.success === true) { 
        var item_length = response.data.itemdetails.length
        for (var i=0;i<item_length;i++){
          /*if(response.data.itemdetails[i].Availability == "STOCK" && response.data.itemdetails[i].amount_per_unit >0){*/
            /*var amount_cal = response.data.itemdetails[i].total_amount*/
            var amount_cal = response.data.itemdetails[i].total_value1
            subtotal_amount = subtotal_amount + amount_cal

          /*}else{
            count = count + 1                 
          }
          */
          /*if (count>0) {
            this.setState({
              hidePrice: false, 
              showPrice: true
            })
          }else{
            this.setState({
              showPrice: true,
              hidePrice:false
            })
          }*/
          
          this.setState({
            after_login_amount: 0
          })
      }
        }

        let newCartData =
        response.data.itemdetails.map(item => ({
          ...item,
          isChecked: false
        }))

        this.setState({
          isloading: !this.state.isloading,
          added_item: newCartData,
          no_cart_data: response.data.itemdetails.length,
          isActive: false
    })
    this.props.dispatch(updateCartItemData(response.data.itemdetails.length))
    localStorage.setItem('num_cart_data' , response.data.itemdetails.length);



    
    /*var subtotal_amount = 0
    var count = 0;

    if (response.data.success === true) { 
            var item_length = response.data.itemdetails.length
            for (var i=0;i<item_length;i++){
            if(response.data.itemdetails[i].Availability == "Stock" && response.data.itemdetails[i].amount_per_unit >0){
             
            var amount_cal = response.data.itemdetails[i].your_price * this.state.added_item[i].quantity
            subtotal_amount = subtotal_amount + amount_cal 
            }
            else{

              count = count +1;

           
                     
            }

            if (count>0) {
              this.setState({
                hidePrice: true, 
                showPrice: false
              })
            }
            else{
              this.setState({
                showPrice: true,
                hidePrice:false
              })
            }

            this.setState({
            after_login_amount: subtotal_amount
            })
            }
            }

    this.setState({
    added_item: response.data.itemdetails,
    no_cart_data: response.data.itemdetails.length,
    isActive: false
    })

    console.log("itemdata", this.state.itemdetails)
            
    



this.props.dispatch(updateCartItemData(response.data.itemdetails.length))
    localStorage.setItem('num_cart_data' , response.data.itemdetails.length);*/
   })
   .catch(function (error) {
     ref.setState({
      isSession: true,
      isActive : false
    })
   });

}


}

async removeItem1(itemCode1){ //console.log(this.props.cart);
var arrayCartData= this.props.cart.filter(item => item.itemid !== itemCode1.itemid); console.log(arrayCartData); 
this.props.dispatch(removeCartData([
...arrayCartData
]))




}



async removeItem(itemId){

if (window.location.href === "http://zwz.prtouch.com:8081/cart"  || window.location.href.indexOf("http://localhost:3000/cart") > -1) {

axios.post('http://apizwz.prtouch.com:8081/api/remove_item_cart/' , 

{

"item_detail_id": itemId
},{
headers: {
          'Authorization' : 'Token ' + localStorage.getItem('auth_key')
        } 

}


)
   .then((response) =>  {

    this.getCartData();
    window.location.reload();
    this.setState({
    
    no_cart_data: localStorage.getItem("num_cart_data"),
    
  })
    
   })
   .catch(function (error) {
     
     
   });
} else if(window.location.href === "http://nod.prtouch.com:8081/cart"){

axios.post('http://apinod.prtouch.com:8081/api/remove_item_cart/' , 

{

"item_detail_id": itemId
},{
headers: {
          'Authorization' : 'Token ' + localStorage.getItem('auth_key')
        } 

}


)
   .then((response) =>  {

    this.getCartData();
    window.location.reload();
    
    
   })
   .catch(function (error) {
     
     
   });



}

}



async goToLogin(){
this.props.history.push('/login');

}





async goToRFQ1(){
if (window.location.href ==="http://zwz.prtouch.com:8081/cart" || window.location.href === "http://localhost:3000/cart") {
  var arr = []

//console.log(this.state.added_item);


for(var i = 0; i < this.state.added_item.length; i++) {
  
  if (this.state.added_item[i].isChecked == true) {
    var orderData  = {};
    orderData['item_id'] = this.state.added_item[i].item_detail_id;
     
     arr.push(orderData);
  }
}

axios.post('http://apizwz.prtouch.com:8081/api/check_rfq_status/',{

"item_info": arr
},{
headers: {
          'Authorization' : 'Token ' + localStorage.getItem('auth_key')
        } 
}
)
    .then((response) =>  {

     if (response.data.success == true) {
        this.setState({
          RFQMessage: response.data.message
        })
        this.RFQMessagetoggle();
        
      }else{

        this.goToRFQ2();

      }
    
    
    })
    .catch(function (error) {
     
     
    });

} else if (window.location.href ==="http://nod.prtouch.com:8081/cart" || window.location.href === "http://localhost:3000/cart") {
  var arr = []

//console.log(this.state.added_item);


for(var i = 0; i < this.state.added_item.length; i++) {
  
  if (this.state.added_item[i].isChecked == true) {
    var orderData  = {};
    orderData['item_id'] = this.state.added_item[i].item_detail_id;
     
     arr.push(orderData);
  }
}

axios.post('http://apinod.prtouch.com:8081/api/check_rfq_status/' , 

{

"item_info": arr
},

{
headers: {
          'Authorization' : 'Token ' + localStorage.getItem('auth_key')
        } 

}


)
    .then((response) =>  {

     if (response.data.success == true) {
        this.setState({
          RFQMessage: response.data.message
        })
        this.RFQMessagetoggle();
        
      }else{

        this.goToRFQ2();

      }
    
    
    })
    .catch(function (error) {
     
     
    });
}
/*this.props.history.push('/rfq');*/
}




async goToRFQ2(){
    var totalWeightRound = this.state.totalWeight.toFixed(2);
    localStorage.setItem('subtotal', this.state.after_login_amount)
     localStorage.setItem('totalGst', this.state.GstVal)
     localStorage.setItem('totalWeight', totalWeightRound)
     localStorage.setItem('Estimated_Standard_Shipping', '0')
     localStorage.setItem('Estimated_Total', this.state.after_login_amount)
     var totalAmoutValue = this.state.after_login_amount + this.state.GstVal;
    localStorage.setItem('totalAmoutValue', totalAmoutValue)

     const checkedItem = this.state.added_item.filter(item => item.isChecked)
     localStorage.setItem('checkedItem', JSON.stringify(checkedItem));
     var arr = []

//console.log(this.state.added_item);


for(var i = 0; i < this.state.added_item.length; i++) {
  
  if (this.state.added_item[i].isChecked == true) {
    var orderData  = {};
    orderData['item_id'] = this.state.added_item[i].item_detail_id;
     
     arr.push(orderData);
  }
}

localStorage.setItem('RFIArrayData', JSON.stringify(arr));

this.props.history.push('/rfq-review');
}

async goToShipping(){
if (window.location.href === "http://zwz.prtouch.com:8081/cart" || window.location.href === "http://localhost:3000/cart") {
var arr = []
for(var i = 0; i < this.state.added_item.length; i++) {
  if (this.state.added_item[i].isChecked == true) {
    var orderData  = {};
   orderData['exp_dod'] = this.state.added_item[i].exp_dod;
   orderData['Availability'] = this.state.added_item[i].Availability;
   orderData['item_detail_id'] = this.state.added_item[i].item_detail_id;
   orderData['itemname'] = this.state.added_item[i].itemname;
   orderData['cattype'] = this.state.added_item[i].cattype;
   orderData['catname'] = this.state.added_item[i].catname;
   orderData['itemcode'] = this.state.added_item[i].itemcode;
   orderData['descript'] = this.state.added_item[i].descript;
   orderData['quantity'] = this.state.added_item[i].quantity;
   orderData['amount_per_unit'] = this.state.added_item[i].amount_per_unit;
   /*orderData['total_amount'] = this.state.added_item[i].total_amount;*/
   orderData['total_amount'] = this.state.added_item[i].total_value1;
   orderData['added_on'] = this.state.added_item[i].added_on;
   orderData['brandname'] = this.state.added_item[i].brandname;
   arr.push(orderData);
  }
}

axios.post('http://apizwz.prtouch.com:8081/api/sales_confirmation/' , 
{
"item_info": arr
},{
headers: {
          'Authorization' : 'Token ' + localStorage.getItem('auth_key')
        } 
}
)
    .then((response) =>  {
if (response.data.success === false) {
this.setState({
failedMessage: response.data.message
})

this.Failedtoggle();
}else if (response.data.success === true) {
/*this.Successtoggle();*/


localStorage.setItem('order_no' , response.data.myscno);
localStorage.setItem('left_cart_data' , JSON.stringify(response.data.left_items));
this.props.history.push('/orderPlaced');
}
   })
   .catch(function (error) {
     
     
   });
} else if (window.location.href === "http://nod.prtouch.com:8081/cart"  ) {


var arr = []



for(var i = 0; i < this.state.added_item.length; i++) {
  
   
var orderData  = {};
   orderData['exp_dod'] = this.state.added_item[i].exp_dod;
   orderData['Availability'] = this.state.added_item[i].Availability;
   orderData['item_detail_id'] = this.state.added_item[i].item_detail_id;
   orderData['itemname'] = this.state.added_item[i].itemname;
   orderData['cattype'] = this.state.added_item[i].cattype;
   orderData['catname'] = this.state.added_item[i].catname;
   orderData['itemcode'] = this.state.added_item[i].itemcode;
   orderData['descript'] = this.state.added_item[i].descript;
   orderData['quantity'] = this.state.added_item[i].quantity;
   orderData['amount_per_unit'] = this.state.added_item[i].amount_per_unit;
   /*orderData['total_amount'] = this.state.added_item[i].total_amount;*/
   orderData['total_amount'] = this.state.added_item[i].total_value1;
   orderData['added_on'] = this.state.added_item[i].added_on;
   orderData['brandname'] = this.state.added_item[i].brandname;
   arr.push(orderData);
}
axios.post('http://apinod.prtouch.com:8081/api/sales_confirmation/' , 
{
"item_info": arr
},{
headers: {
          'Authorization' : 'Token ' + localStorage.getItem('auth_key')
        } 
}
)
    .then((response) =>  {  
if (response.data.success === false) {
this.setState({
failedMessage: response.data.message
})
this.Failedtoggle();
}else if (response.data.success === true) {
/*this.Successtoggle();*/
localStorage.setItem('order_no' , response.data.myscno);
this.props.history.push('/orderPlaced');
}  
   })
   .catch(function (error) {    
   });
}
/*this.props.history.push('/shipping');*/
}

render(){
const { Successmodal, showupdateModal, showFailedModal, RFQMessagemodal } = this.state;
const { Failedmodal, shippingModal, GoRFImodal, GoCheckoutmodal } = this.state;
return(
<div>
<Header {...this.props} cart_num={this.state.no_cart_data}> </Header>
{this.state.isActive && 
<div className="content-container wrapper" style={{backgroundColor: '#fff', padding: 10, marginBottom: 5, height: 400, textAlign: 'center'}}>
                      <i
                        className="fa fa-refresh fa-spin"
                        style={{ marginRight: "5px", fontWeight: 'bold', fontSize: 30, color:'#00619f', textAlign: 'center', marginTop: 200 }}
                      />
                    </div>
           }


<div className="content-container wrapper" style={{backgroundColor: '#f4f4f4', padding: 10, marginTop: 185}}>
<Row> 
{ (this.state.added_item.length > 0 || this.props.cart.length > 0 && !this.state.isActive) && 
<Col sm={12} style={{marginTop: 6}}>
  <span>
    <h4 style={{paddingLeft: 16, fontWeight:'bold', color: '#00619F'}}> My Cart </h4>
  </span>
</Col>
}
{
(this.state.added_item.length == 0  && this.props.isLoggedIn && !this.state.isActive) && 
<h3 style={{color: '#444', paddingLeft: 12}}> Your Cart is empty <img src={emptyCart} style={{width: 45, height: 45}}  /> </h3>
   
}
{
(this.props.cart.length == 0  && !this.props.isLoggedIn && !this.state.isActive) && 
<h3 style={{color: '#444', paddingLeft: 12}}> Your Cart is empty <img src={emptyCart} style={{width: 45, height: 45}}  /> </h3>
   
}
{ (this.state.added_item.length >0 && !this.state.isActive  )&& (
<Col sm={12} style={{marginTop: 6}}>
  <Col sm={2} style={{float: 'left'}}>
    <select style={{height: 32, fontSize: 14}} onChange={this.onChangeAvailability} className="form-control" name="city">
       <option value="0" style={{fontWeight: 'bold'}}>Select Availability</option>  
       <option value="1" style={{fontWeight: 'bold'}}>Stock</option>
       <option value="2" style={{fontWeight: 'bold'}}>On Demand</option>
       <option value="3" style={{fontWeight: 'bold'}}>Arriving Shortly</option>
       <option value="4" style={{fontWeight: 'bold', display: 'none'}}>PRODUCTION</option>
       <option value="5" style={{fontWeight: 'bold', display: 'none'}}>RFI Approved</option>
    </select>
  </Col>
</Col>
)}
</Row>

{this.props.isLoggedIn ? (
<Row>
<Col sm={9} style={{marginTop: 25}}>
       <Col sm={12} style={{marginBottom: 10}} key="item.itemcode" >
<Card style={{paddingRight: 0}}>
       <CardBody className="customise_card_body" style={{padding: 0}}>
         {
            this.state.added_item.length>0 ?(
         <table class="cart_data_table">
          <tbody style={{fontSize: 12}}>
          <tr className="cart-data-header" style={{backgroundColor: '#ddd'}}>
            <th> <input type  ="checkbox" name="checkbox" checked={this.state.isChecked} onChange={() => this.checkAll()} /> </th>
            <th style={{width: '10%'}}> Item Name </th>
            <th style={{width: '11%'}}> Brand Name </th>
            <th style={{width: '8%'}}> Qty </th>
            <th style={{width: '12%'}}> Price </th>
            <th style={{width: '12%'}}> Total</th>
            <th> GST</th>
            <th> Wt.</th>
            <th> Availability </th>
            <th> Origin </th>
            <th> Action </th>
          </tr>

          {
          this.state.added_item.length>0  && (
          this.state.added_item.map((item, index) => (
          <tr className="cart-data">
            <td> <input checked={item.isChecked}  onChange={() => this.checkedSingle(index, item)} type ="checkbox" name="checkbox" /> </td>
            <td> <span style={{ color: '#00739E'}}> {item.itemname}  </span></td> 
            <td> <span style={{ color: '#00739E'}}> {item.brandname}  </span></td> 
            <td>  <input style={{marginTop: 0}} type="text" defaultValue={item.quantity} onBlur = {(e)=>this.onUpdateQuantity(e,item.item_detail_id , e.target.value)} className="qty_input" /> </td>
            {item.your_price > 0 ? (
            <td> <i class="fa fa-inr" style={{fontSize: 12}} aria-hidden="true"></i> <s> {item.list_price.toLocaleString(navigator.language, { minimumFractionDigits: 0 })} </s>  <br/> <span style={{color: '#00739E'}}> Savings: {item.calculate_discount_percentage}%</span> <br/> <span style={{fontWeight: 'bold'}}> <i class="fa fa-inr" style={{fontSize: 12}} aria-hidden="true"></i> {item.your_price.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}.00 </span></td>
            ):(
              <td> </td>
            ) 
            }
            {item.your_price > 0 ? (
              <td>  <i class="fa fa-inr" style={{fontSize: 12}} aria-hidden="true"></i> {(item.your_price * item.quantity).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}.00 </td>
            ):(
              <td style={{fontSize: 12, color: 'red'}}> Price available only through RFI </td>
            ) 
            }
            {/*<td>{item.calculate_discount_percentage} % </td>*/}
            {item.your_price> 0 ? (
              <td> <i class="fa fa-inr" style={{fontSize: 12}} aria-hidden="true"></i> { (item.gst_value * item.quantity).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}.00 <br/> <span style={{color: '#00739E'}}> GST: {item.gst_percenatge}% </span> </td>
            ):(
              <td style={{fontSize: 13, color: 'red',}}> </td>
            ) 
            }
            { !item.weight ?
              (
              <td><span>  <strong> NA </strong> </span> </td>
              ):(
              <td> {(item.weight * item.quantity).toFixed(2)} kg</td>
              )
            }

            { item.Availability==="" ?
              (
                <td><span>  <strong> NA </strong> </span> </td>
              ):(
                <td style={{ color: item.Availability == "Stock" ? 'green' : item.Availability == "RFI Approved" ? '#00619F' : 'red'}}> {item.Availability} <br/> <span style={{color: 'black'}}> Exp Del: </span> <br/> <span style={{color: 'black'}}> {item.exp_dod} </span> </td>
              )
            }
          
            { item.Country ?
              (
                <td>{item.Country} </td>
              ):(
                <td> NA</td>
              )
            }
            <td> <span style={{fontWeight: 'bold', color: '#676464', cursor: 'pointer'}} onClick={() => this.removeItem(item.item_detail_id)}><i class="fa fa-trash" style={{fontSize: 18, fontWeight: 'bold'}} aria-hidden="true"></i> </span> </td>
          </tr>
            ))
          )
          }
          </tbody>
         </table>
         ):(
          <h3 style={{color: '#444', paddingLeft: 12}}> </h3>
         )}
       </CardBody>
   </Card>
</Col>

</Col>

{
this.state.added_item.length>0 && 
<Col sm={3} style={{marginTop: 25}}>
<Card>
<Col sm={12} style={{paddingLeft: 6, paddingRight: 0, backgroundColor: '#00619F'}} >
        <h6 style={{color: '#fff', padding: 6, fontWeight:'bold', textAlign: 'center', paddingTop: 10}}> Order Summary </h6>
       </Col> 
       <CardBody className="customise_card_body" style={{padding: 8}}>
        <table class="checkout_col" style={{margin: 'auto', width: '100%'}}>
        <tbody style={{fontSize: 13, fontWeight: 'bold'}}>
        <tr>
        <td>
        <span>  Subtotal </span>
        </td>

        <td>
        <span> <strong> <i class="fa fa-inr" style={{fontSize: 12}} aria-hidden="true"></i> {this.state.after_login_amount.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}.00 </strong> </span>
        </td>        
        </tr>


        <tr>
        <td>
        <span> GST Total</span>
        </td>

        <td>
        <span> <strong> <i class="fa fa-inr" style={{fontSize: 12}} aria-hidden="true"></i> {this.state.GstVal.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}.00 < /strong> </span>
        </td>
        </tr>

         <tr>
        <td>
        <span> Total Weight</span>
        </td>

        <td>
        <span> <strong>{this.state.totalWeight.toFixed(2)} kg < /strong> </span>
        </td>
        </tr>



        <tr className="est_total_row">
        <td>
        <span> <strong> Total </strong> </span>
        </td>
       
        <td>
        <span> <strong> <i class="fa fa-inr" style={{fontSize: 12}} aria-hidden="true"></i> {(this.state.after_login_amount + this.state.GstVal).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}.00 </strong> </span>
        </td>
        
        
        </tr>
        {!this.props.isLoggedIn ? (
        <tr>
        <td colspan="3" style={{paddingLeft: 0, paddingRight: 0}}> <input type="button" onClick={this.goToLogin} value="Sign in to Checkout" className="login_btn" /> </td>
        </tr>
        ): 
        (
        <tr>
          <td  style={{paddingLeft: 0, paddingRight: 0, width: '50%'}}> <input type="button"  style={{backgroundColor: this.state.isDisabled == false ? '#0072bc' : '#2f2f2f9e'}} disabled={this.state.isDisabled} onClick={this.Checkouttoggle} value="Checkout" className="login_btn" /> </td>
          <td id="TooltipExample1"  style={{paddingLeft: 0, paddingRight: 0, width: '36%', textAlign: 'right'}}> <input type="button"  style={{backgroundColor: this.state.isDisabledRFQ == false ? '#0072bc' : '#2f2f2f9e'}} onClick={this.goToRFQ1} disabled={this.state.isDisabledRFQ} value="RFI" className="login_btn" />  </td>
            <Tooltip placement="bottom" style={{fontSize: 13}} isOpen={this.state.tooltipOpen} target="TooltipExample1" toggle={this.toggle}>
              Request For Information
            </Tooltip>
        </tr>
        )}

        </tbody>
        </table>
        {this.state.showAlert2 &&
          <span style={{color: 'red', fontWeight: 'bold', fontSize: 13}}> * To Check out ONLY Select items showing availability as "stock" </span>
        }
        {this.state.showAlert &&
          <span style={{color: 'red', fontWeight: 'bold', fontSize: 13}}> * Please Select Item </span>
        }
       </CardBody>
     </Card>


     <Card style={{marginTop: 8}}>
       <CardBody className="customise_card_body" style={{padding: 18}}>
        <table class="checkout_col" style={{margin: 'auto', width: '100%'}}>
        <tbody style={{fontSize: 13, fontWeight: 'bold'}}>
        <tr style={{display: 'none'}}>
        <td>
        <span>  Payment Terms: </span>
        </td>

        <td>
        <span> <strong> {this.state.payment_term} </strong> </span>
        </td>        
        </tr>


        <tr>
        <td>
        <span>Available Balance:</span>
        </td>

        <td>
        <span> <strong> <i class="fa fa-inr" style={{fontSize: 12}} aria-hidden="true"></i> {this.state.available_balance} < /strong> </span>
        </td>
        </tr>

        {this.state.credit_period != '' &&

         <tr>
        <td>
        <span>Credit Period:</span>
        </td>


        <td>
        <span> <strong>{this.state.credit_period} < /strong> </span>
        </td>
        </tr>
        }
       

        </tbody>
        </table>
       
       </CardBody>
     </Card>
</Col>
}
</Row>
) : (
<Row>
<Col sm={9} style={{marginTop: 25}}>
      { this.props.cart.length>0 && ( 
       <Col sm={12} style={{marginBottom: 10}} key="item.itemcode" >
        <Card style={{paddingRight: 0}}>
       <CardBody className="customise_card_body" style={{padding: 0}}>
         <table>
          <tbody style={{fontSize: 13}}>
           <tr className="cart-data-header" style={{backgroundColor: '#ddd'}}>
            <th style={{width: '6%'}}> <input type  ="checkbox" name="checkbox" /> </th>
            <th style={{width: '15%'}}> #Item Detail </th>
            <th> Expected Delivery </th>
            <th> Availability </th>
            <th> Added on </th>
            <th style={{width: '10%'}}> Qty </th>
            <th style={{width: '15%'}}> Total price </th>
            <th> Action </th>
          </tr>

          {
            this.props.cart.length>0 && (
            this.props.cart.map((item, index) => (

          <tr className="cart-data">
          <td> <input type ="checkbox" name="checkbox" /> </td>
          <td> <span style={{fontWeight: 'bold', color: '#00739E'}}> {item.itemname} , <br/> {item.catname}  </span> <br/>  <span> Price : { item.price > 0 ? ( <strong> {item.price} / each </strong>):(  <strong style={{color: 'red'}}>Price available only through RFI </strong> ) } </span></td>

          {
          item.exp_dod=== "" ? (
          <td style={{fontWeight: 'bold'}}>  NA  </td>
          ):(

          <td style={{fontWeight: 'bold'}}>  {item.exp_dod ? item.exp_dod : item.Exp_dod ? item.Exp_dod : item.ExpTimeToDispatch }  </td>
          )
          }
          
          {
          item.Availability === "" ? (
          <td style={{fontWeight: "bold"}}>  NA </td> 
          ):(
          <td><span style={{color: item.Availability == "Stock" ? 'green' : item.Stock == "Stock" ? 'green' : 'red'}}>  <strong> {item.Availability ? item.Availability : item.Stock} </strong> </span> </td>
          )
          }
          
          <td style={{fontWeight: "bold"}}> {this.state.date} </td>
          <td> <input type="text" defaultValue={item.Quantity} className="qty_input" /> </td>
          {item.Amount > 0 ? (
              <td style={{fontWeight: 'bold'}}>  <i class="fa fa-inr" style={{fontSize: 12}} aria-hidden="true"></i> {item.Amount} </td>
            ):(
              <td style={{fontSize: 13, color: 'red', fontWeight: 'bold'}}> Price available only through RFI </td>
            )
            
          }
          <td> <span onClick={() => this.removeItem1(item)} style={{fontWeight: 'bold', color: '#676464', cursor: 'pointer'}} > <i class="fa fa-trash" style={{fontSize: 18, fontWeight: 'bold'}} aria-hidden="true"></i> </span> </td>
          </tr>
          )))}
          </tbody>

         </table>

       </CardBody>
   </Card>
</Col>
)}


</Col>

{
this.props.cart.length>0 &&
<Col sm={3} style={{marginTop: 25}}>
<Card>
<Col sm={12} style={{paddingLeft: 6, paddingRight: 0, backgroundColor: '#00619F'}} >
        <h6 style={{color: '#fff', padding: 6, fontWeight:'bold', textAlign: 'center', paddingTop: 10}}> Order Summary </h6>
       </Col> 
       <CardBody className="customise_card_body" style={{padding: 18}}>
        <table style={{margin: 'auto', width: '100%'}}>
        <tbody style={{fontSize: 15}}>
        <tr>
        <td>
        <span>  Subtotal </span>
        </td>

        <td>
        <span> <strong> <i class="fa fa-inr" style={{fontSize: 12}} aria-hidden="true"></i> {this.state.before_login_total_amount} </strong> </span>
        </td>
        </tr>


        <tr className="est_total_row">
        <td>
        <span> <strong>  Total </strong> </span>
        </td>

        <td>
        <span style={{color: '#19792F'}}> <strong> <i class="fa fa-inr" style={{fontSize: 12}} aria-hidden="true"></i> {this.state.before_login_total_amount} </strong> </span>
        </td>
        </tr>
        {!this.props.isLoggedIn ? (
        <tr>
        <td colspan="3" style={{paddingLeft: 0, paddingRight: 0}}> <input type="button" onClick={this.goToLogin} value="Sign in to Checkout" className="login_btn" /> </td>
        </tr>
        ): 
        (
        <tr>
        <td colspan="3" style={{paddingLeft: 0, paddingRight: 0}}> <input type="button" onClick={this.goToShipping} value="Checkout" className="login_btn" /> </td>
        </tr>
        )}
        </tbody>
        </table>
       </CardBody>
     </Card>
</Col>
}
</Row>
)}
</div>
<Footer> </Footer>

<Modal
         isOpen={Successmodal}
         toggle={this.Successtoggle}

        >
         <div className="modal__header" style={{width: '100%', height: 35}}>
           <button className="fa fa-times modal__close-btn" type="button" style={{right: 15}} onClick={this.Successtoggle} />
          
          
         </div>
         <div className="modal__body" style={{paddingTop: 15, paddingBottom: 15, height: 155,paddingRight: 8, paddingLeft:10}}>
           
           <h4 style={{fontSize: 18, marginTop: 6, marginBottom: 12,paddingRight: 6}}>{this.state.successFailedMessage}</h4>

          {/* <Button style={{backgroundColor: 'red', color: '#fff', width: 100}}   onClick={this.SuccesstoggleOk}>Ok</Button>*/}
          <input style={{width: 100,marginTop: 15}} type="button" onClick={this.SuccesstoggleOk} value="OK" className="login_btn" />
         </div>
         
       </Modal>

       <Modal
         isOpen={RFQMessagemodal}
         toggle={this.RFQMessagetoggle}

        >
         <div className="modal__header" style={{width: '100%', height: 35}}>
           <button className="fa fa-times modal__close-btn" type="button" style={{right: 15}} onClick={this.RFQMessagetoggle} />
          
          
         </div>
         <div className="modal__body" style={{paddingTop: 15, paddingBottom: 15, height: 155}}>
           
           <h4 style={{fontSize: 14, color: 'red', marginTop: 15, marginBottom: 45}}>{this.state.RFQMessage}</h4>

           <Button style={{backgroundColor: 'rgb(0, 97, 159)', color: '#fff', width: 100}} className="modal_ok"  onClick={this.OnRFQMessagetoggle}>Ok</Button>
         
         </div>
         
       </Modal>

       <Modal
         isOpen={showupdateModal}
         toggle={this.showupdateToggle}
        >
          <div className="modal__header">
           <button className="fa fa-times modal__close-btn" type="button" style={{right: 15}} onClick={this.showupdateToggle} />
          
          
         </div>
         <div className="modal__body" style={{paddingTop: 15, paddingBottom: 15}}>
           <span className="fa fa-thumbs-up modal__title-icon" style={{color: 'rgb(0, 97, 159)', paddingBottom: 10, fontSize:20}} />
           <h4 style={{fontSize: 18}}>{this.state.successUpdateMessage}</h4>
         </div>
         <ButtonToolbar className="modal__footer" style={{marginTop: 0}}>
           <Button style={{backgroundColor: 'rgb(0, 97, 159)', color: '#fff', width: 100}} className="modal_ok"  onClick={this.showupdateToggle}>Ok</Button>
         </ButtonToolbar>
       </Modal>

        <Modal
         isOpen={showFailedModal}
         toggle={this.showfailedToggle}
        >
          <div className="modal__header">
           <button className="fa fa-times modal__close-btn" type="button" style={{right: 15}} onClick={this.showfailedToggle} />
          
          
         </div>
         <div className="modal__body" style={{paddingTop: 15, paddingBottom: 15}}>
           <span className="fa fa-thumbs-up modal__title-icon" style={{color: 'rgb(0, 97, 159)', paddingBottom: 10, fontSize:20}} />
           <h4 style={{fontSize: 18}}>{this.state.successFailedMessage}</h4>
         </div>
         <ButtonToolbar className="modal__footer" style={{marginTop: 0}}>
           <Button style={{backgroundColor: 'rgb(0, 97, 159)', color: '#fff', width: 100}} className="modal_ok"  onClick={this.showfailedToggle}>Ok</Button>
         </ButtonToolbar>
       </Modal>


       


        <Modal
          isOpen={shippingModal}
          toggle={this.shippingToggle}
          >
          <div className="modal__header" style={{backgroundColor: '#0072bc'}}>
            <h4 className="text-modal  modal__title" style={{color: '#fff', paddingTop: 10, fontSize: 17, fontWeight: 'bold'}}>Checkout Address Detail</h4>
          </div>
          <div className="modal__body" style={{padding: 12}}>

            <div style={{width: '100%'}}>
              <div className="address_header" style={{width: '100%' , float: 'left'}}>
                <h5 style={{fontWeight: 'bold', fontSize: 16, textAlign: 'left' }}> Biiling Address </h5>

              </div>

              <div style={{width: '20%' , float: 'left', textAlign: 'left'}}>
                <span style={{fontWeight: 'bold', fontSize: 16, textAlign: 'left' }}> Address: </span>

              </div>

               <div style={{width: '80%' , float: 'left', textAlign: 'left'}}>
                <span style={{fontSize: 15, textAlign: 'left' }}> {this.state.billingaddress}  </span>

              </div>

              <div style={{width: '20%' , float: 'left', textAlign: 'left'}}>
                <span style={{fontWeight: 'bold', fontSize: 16, textAlign: 'left' }}> State: </span>

              </div>

               <div style={{width: '80%' , float: 'left', textAlign: 'left'}}>
                <span style={{fontSize: 15, textAlign: 'left' }}> {this.state.billingstate}  </span>

              </div>

              <div style={{width: '20%' , float: 'left', textAlign: 'left'}}>
                <span style={{fontWeight: 'bold', fontSize: 16, textAlign: 'left' }}> City: </span>

              </div>

               <div style={{width: '80%' , float: 'left', textAlign: 'left'}}>
                <span style={{fontSize: 15, textAlign: 'left' }}> {this.state.billingcity}  </span>

              </div>



            </div>



            <div style={{width: '100%', marginTop: 10}}>
              <div style={{width: '100%' , float: 'left'}} className="address_header">
                <h5 style={{fontWeight: 'bold', fontSize: 16, textAlign: 'left', marginTop: 35 }}> Shipping Address </h5>

              </div>

              <div style={{width: '20%' , float: 'left', textAlign: 'left'}}>
                <span style={{fontWeight: 'bold', fontSize: 16, textAlign: 'left' }}> Address: </span>

              </div>

               <div style={{width: '80%' , float: 'left', textAlign: 'left'}}>
                <span style={{fontSize: 15, textAlign: 'left' }}> {this.state.shippingaddress}  </span>

              </div>

              <div style={{width: '20%' , float: 'left', textAlign: 'left'}}>
                <span style={{fontWeight: 'bold', fontSize: 16, textAlign: 'left' }}> State: </span>

              </div>

               <div style={{width: '80%' , float: 'left', textAlign: 'left'}}>
                <span style={{fontSize: 15, textAlign: 'left' }}> {this.state.shippingstate}  </span>

              </div>

              <div style={{width: '20%' , float: 'left', textAlign: 'left'}}>
                <span style={{fontWeight: 'bold', fontSize: 16, textAlign: 'left' }}> City: </span>

              </div>

               <div style={{width: '80%' , float: 'left', textAlign: 'left'}}>
                  <span style={{fontSize: 15, textAlign: 'left' }}> {this.state.shippingcity}  </span>

                </div>

                 <div style={{width: '20%' , float: 'left', textAlign: 'left', marginTop: 15}}>
                 <span style={{fontWeight: 'bold', fontSize: 16, textAlign: 'left' }}> GST No. : </span>

                </div>

               <div style={{width: '50%' , float: 'left', textAlign: 'left' , marginTop: 15}}>
                 <input type="text" onChange={this.handleChangeGst} className="address_input" disabled={this.state.isDisabled} defaultValue={this.state.gstNumber}  />

                 {this.state.showError && (
                    <span style={{fontWeight: 'bold' , fontSize: 13, color: 'red'}}> {this.state.ErrorMessage} </span>
                  )}
                 {this.state.showupdate && (
                    <span style={{fontWeight: 'bold' , fontSize: 13, color: 'green'}}> {this.state.updateMessage} </span>
                  )}

                </div>

                { this.state.showEditBtn && (

                  <div style={{width: '20%' , float: 'left', textAlign: 'left' , marginTop: 18}}>
                    <a style={{fontWeight: 'bold' , marginLeft: 12, marginTop: 4, cursor: 'pointer' , color: 'rgb(0, 115, 158)'}} onClick={this.enableInput}> Edit </a>
                  </div>

                )}

                { this.state.showSaveBtn && (

                  <div style={{width: '20%' , float: 'left', textAlign: 'left' , marginTop: 18}}>
                    <a onClick={this.OnSaveGst}  style={{fontWeight: 'bold' , marginLeft: 12, marginTop: 4, cursor: 'pointer' , color: 'rgb(0, 115, 158)' }}> Save </a>
                  </div>
                )}

               <div style={{width: '40%' , float: 'left', textAlign: 'left', marginBottom: 20, marginTop: 10}}>
                <ButtonToolbar className="modal__footer">
                  <Button style={{backgroundColor: '#ccc', fontSize: 14, fontWeight: 'bold', color: '#fff' , height: 32}} className="modal_ok"  onClick={this.shippingToggle}>Cancel</Button>
                  <Button style={{backgroundColor: '#0072bc', fontSize: 14, fontWeight: 'bold', color: '#fff', height: 32, marginLeft: 12, backgroundColor: '#3ea3fc'}} className="modal_ok"  onClick={this.goToShipping}>
                  {this.state.loadingupdatebtn && 
                    <i
                      className="fa fa-refresh fa-spin"
                      style={{ marginRight: "5px" }}
                    />
                  }  
                  Place Order</Button>
            </ButtonToolbar>

              </div>

               



            </div>
            
             

          </div>
          
        </Modal>


       <Modal
         isOpen={Failedmodal}
         toggle={this.Failedtoggle}

        >
         <div className="modal__header">
           <button className="fa fa-times modal__close-btn" type="button" style={{right: 15}} onClick={this.Failedtoggle} />
          
          
         </div>
         <div className="modal__body" style={{paddingTop: 15, paddingBottom: 15}}>
           <span className="fa fa-times-circle-o modal__title-icon" style={{color: 'red', paddingBottom: 10, fontSize:25, fontWeight: 300}} />
           <h4 style={{fontSize: 18}}>{this.state.failedMessage}</h4>
         </div>
         <ButtonToolbar className="modal__footer" style={{marginTop: 0}}>
           <Button style={{backgroundColor: 'rgb(0, 97, 159)', color: '#fff', width: 100}} className="modal_ok"  onClick={this.Failedtoggle}>Ok</Button>
         </ButtonToolbar>
       </Modal>

       <Modal
             isOpen={GoRFImodal}
             toggle={this.GoRFItoggle}

            >
              <div className="modal__header" style={{backgroundColor: '#0072bc'}}>
                  <h4 className="text-modal  modal__title" style={{color: '#fff', paddingTop: 10, fontSize: 17, fontWeight: 'bold'}}>Review & Confirm RFI</h4>
                </div>
               <div className="modal__body" style={{paddingTop: 15, paddingBottom: 15, paddingRight: 8, paddingLeft: 8}}>
         
                 <h4 style={{fontSize: 18}}>Are you sure you want to proceed?</h4>
               </div>
               <ButtonToolbar className="modal__footer" style={{marginTop: 0, height: 78}}>
                 <Button id='changeColor' style={{backgroundColor: '#0072bc !important', fontSize: 14, fontWeight: 'bold', color: '#fff', width: 100, height: 35}}  onClick={this.GoRFItoggle}>No</Button>
                <Button id='changeColor' style={{backgroundColor: '#0072bc',  fontSize: 14, fontWeight: 'bold', color: '#fff', width: 160, height: 35}}   onClick={this.goToRFQ1}>Yes</Button>
               </ButtonToolbar>
               
                 
               
             </Modal>

              <Modal
             isOpen={GoCheckoutmodal}
             toggle={this.GoCheckouttoggle}

            >
                <div className="modal__header" style={{backgroundColor: '#0072bc'}}>
                  <h4 className="text-modal  modal__title" style={{color: '#fff', paddingTop: 10, fontSize: 17, fontWeight: 'bold'}}>Review & Confirm Checkout</h4>
                </div>
               <div className="modal__body" style={{paddingTop: 15, paddingBottom: 15, paddingRight: 8, paddingLeft: 8}}>
         
                 <h4 style={{fontSize: 18}}>Are you sure you want to proceed?</h4>
               </div>
               <ButtonToolbar className="modal__footer" style={{marginTop: 0, height: 78}}>
                 <Button id='changeColor' style={{backgroundColor: '#0072bc !important', fontSize: 14, fontWeight: 'bold', color: '#fff', width: 100, height: 35}}  onClick={this.GoCheckouttoggle}>No</Button>
                <Button id='changeColor' style={{backgroundColor: '#0072bc',  fontSize: 14, fontWeight: 'bold', color: '#fff', width: 160, height: 35}}   onClick={this.Checkouttoggle}>Yes</Button>
               </ButtonToolbar>
               
                 
               
             </Modal>
     
     {this.state.isSession && (
     <SessionModalData/>
     )}
     
</div>


)
}
}


export default connect(state => ({
...state.user,
...state.cartDetail,
...state.updateProductData,
...state.cartItemVal,
...state.updateCartItemData,
...state.removeCartData,
}))(Cart)