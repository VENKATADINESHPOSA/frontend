import React, { Component } from 'react'
import './styles.scss'
import { Button, Row, Col,Card, CardImg, CardText, CardBody,CardTitle, Modal,ButtonToolbar ,CardSubtitle} from 'reactstrap';
import {connect} from 'react-redux';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import image1 from '~/assets/images/1.jpg';
import image2 from '~/assets/images/2.jpg';
import image3 from '~/assets/images/3.jpg';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import {updateCartData} from '~/redux/action/cartDetails';
import axios from 'axios';
import cogoToast from 'cogo-toast';



class Shipping extends Component {

	constructor(props){
		super(props)

		
		this.Successtoggle = this.Successtoggle.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.storedeliveryaddress = this.storedeliveryaddress.bind(this);
		this.goToCheckout = this.goToCheckout.bind(this);
		this.Failedtoggle =this.Failedtoggle.bind(this);
		this.goToProfile =this.goToProfile.bind(this); 
		this.goBackToCart = this.goBackToCart.bind(this);
		this.state = {
			state_val: '',
			gstNumber: '',
			companyName: '',
			gstval: '',
			customerDeliveryAddress : [],
			displayItems: [],
			state_name: '',
			billing_details_b_address : '',
            billing_details_b_state : '',
            billing_details_b_city :  '',
            billing_details_b_pincode : '',
            Failedmodal: false,
            Successmodal: false,
            TotalWeight: '',
            stateList: [],
            cityList : [],
            state_data : '',
            add_data : '',
            pin_data : '',
            city_id : '',
            subtotal : 0,
            estimated_total : 0,
            Totalprice: 0,
            estimated_standard_shipping : 0,
            cart_Items:[],
            radioValue : 0,
            checkout_type : 'disabled',
            isDisabled: false,
		}
	}


	goToProfile(){
		this.props.history.push('/my-profile');
	}
	goBackToCart(){
		this.props.history.push('/cart');
	}

	Successtoggle() {
    this.setState(prevState => ({ Successmodal: !prevState.Successmodal }));
  	}

  	getRadioValue(event) {
    const value = event.target.value;
    this.setState({ radioValue : value , checkout_type:"enabled"})
	}

	storedeliveryaddress(e){
		console.log("dfghdfghj");
		if (this.state.add_data == '') {
  			this.setState({
  				showError10: true
  			})
  			return false;
  		}else if (this.state.city_id == '') {
  			
  			this.setState({
  				showError12: true
  			})
  			return false;
  		}else if (this.state.pin_data == '') {
  			
  			this.setState({
  				showError13: true
  			})
  			return false;
  		}
		if (window.location.href === "http://localhost:3000/shipping" || window.location.href === "http://zwz.prtouch.com:8081/shipping" || window.location.href === "http://zwz.prtouch.com:8081/shipping#" || window.location.href === "http://localhost:3000/shipping/" ||  window.location.href === "http://localhost:3000/shipping#") 
		{
			console.log("sdfghdfgthyj");
			axios('http://apizwz.prtouch.com:8081/authentication/user/createDeliveryAddress/',
				{
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Authorization' : 'Token ' + localStorage.getItem('auth_key')
				},
				data: {
					delivery_address : this.state.add_data,
                    delivery_pincode : localStorage.getItem('del_pin'),
                    delivery_ciy_id  : localStorage.getItem('del_city')
				},
			})
			.then((response) =>
				{
					console.log(response);
					if (response.data.success == true) {
						this.Successtoggle();
						cogoToast.success(response.data.message);
						window.location.reload();
					}else{
						this.Successtoggle();
						cogoToast.success(response.data.message);

					}
					/*this.Successtoggle();
					window.location.reload();
					cogoToast.success(response.data.message);*/
				}
				)
		}else if ( window.location.href === "http://nod.prtouch.com:8081/shipping" || window.location.href === "http://nod.prtouch.com:8081/shipping#") 
		{
			console.log("sdfghdfgthyj");
			axios('http://apinod.prtouch.com:8081/authentication/user/createDeliveryAddress/',
				{
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Authorization' : 'Token ' + localStorage.getItem('auth_key')
				},
				data: {
					delivery_address : this.state.add_data,
                    delivery_pincode : localStorage.getItem('del_pin'),
                    delivery_ciy_id  : localStorage.getItem('del_city')
				},
			})
			.then((response) =>
				{
					console.log(response);
					if (response.data.success == true) {
						this.Successtoggle();
						cogoToast.success(response.data.message);
						window.location.reload();
					}else{
						this.Successtoggle();
						cogoToast.success(response.data.message);

					}
					/*this.Successtoggle();
					window.location.reload();
					cogoToast.success(response.data.message);*/
				}
				)
		}
	}
	
	handleChange(e){
		if(e.target.name == "state_select"){
			this.setState({
				showError11: false,
				state_val : e.target.value
			})
	    	this.oncityList(e.target.value)
		}
		else if(e.target.name == "add"){
			this.setState({
				showError10: false,
	    		add_data : e.target.value
	    	})
		}
		else if(e.target.name == "pin"){
			this.setState({
				showError13: false,
	    		pin_data : e.target.value
	    	})
	    	localStorage.setItem('del_pin',e.target.value)
		}
		else if(e.target.name == "city_select"){
			this.setState({
				showError12: false,
	    		city_id : e.target.value
	    	})
	    	localStorage.setItem('del_city',e.target.value)
		}

	}
	/*oncityList(cityName){
		if (window.location.href === "http://zwz.prtouch.com:8081/shipping/" || window.location.href === "http://zwz.prtouch.com:8081/shipping" || window.location.href === "http://zwz.prtouch.com:8081/shipping#" || window.location.href === "http://localhost:3000/shipping/" || window.location.href === "http://localhost:3000/shipping#" || window.location.href === "http://localhost:3000/shipping" ) 
		{
			axios('http://apizwz.prtouch.com/authentication/city_list/',
				{
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Authorization' : 'Token ' + sessionStorage.getItem('auth_key')
				},
				data: {
					state_name: cityName
				},
			})
			.then((response) =>
				this.setState({
					cityList : response.data.data
				})
				)
		}else if (window.location.href === "http://nod.prtouch.com:8081/shipping/" || window.location.href === "http://nod.prtouch.com:8081/shipping" || window.location.href === "http://nod.prtouch.com:8081/shipping#") 
		{
			axios('http://apinod.prtouch.com/authentication/city_list/',
				{
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Authorization' : 'Token ' + sessionStorage.getItem('auth_key')
				},
				data: {
					state_name: cityName
				},
			})
			.then((response) =>
				this.setState({
					cityList : response.data.data
				})
				)
		}
	}*/
	Failedtoggle() {
    this.setState(prevState => ({ Failedmodal: !prevState.Failedmodal }));
  }
	goToCheckout(){
		this.setState({
			isDisabled: true
		})
		console.log("before", this.state.customerDeliveryAddress[0].add_id)
		if (this.state.checkout_type === "disabled"){
			console.log("after", this.state.customerDeliveryAddress[0].add_id)
			var dataVal = this.state.customerDeliveryAddress[0].add_id;
			console.log("dataVal", dataVal);
			this.setState({
				radioValue: dataVal
			})
		}

		console.log("this.state.radioValue",this.state.radioValue)
	/*	else if (this.state.checkout_type === "enabled"){*/
		const cartItemsObjLength = localStorage.getItem('cartItems')
		const cartItemsObj = JSON.parse(cartItemsObjLength)
		var arr = []
		for(var i=0; i<cartItemsObj.length; i++){
			var orderData  = {};
          	orderData['exp_dod']             = cartItemsObj[i].exp_dod;
          	orderData['Availability']        = cartItemsObj[i].Availability;
          	orderData['item_detail_id']      = cartItemsObj[i].item_detail_id;
          	orderData['itemname']            = cartItemsObj[i].itemname;
          	orderData['cattype']             = cartItemsObj[i].cattype;
          	orderData['catname']             = cartItemsObj[i].catname;
          	orderData['itemcode']            = cartItemsObj[i].itemcode;
          	orderData['descript']            = cartItemsObj[i].descript;
          	orderData['quantity']            = cartItemsObj[i].quantity;
          	orderData['amount_per_unit']     = cartItemsObj[i].amount_per_unit;
          	orderData['total_amount']        = cartItemsObj[i].total_amount;
          	orderData['added_on']            = cartItemsObj[i].added_on;
          	orderData['brandname']           = cartItemsObj[i].brandname;

          	if (this.state.checkout_type === "disabled"){
				console.log("after", this.state.customerDeliveryAddress[0].add_id)
				orderData['delivery_address_id'] = this.state.customerDeliveryAddress[0].add_id;
				
			}else{
				orderData['delivery_address_id'] = this.state.radioValue;
			}

          	
          	arr.push(orderData);
		}
		if (window.location.href === "http://zwz.prtouch.com:8081/shipping/" || window.location.href === "http://zwz.prtouch.com:8081/shipping" || window.location.href === "http://zwz.prtouch.com:8081/shipping#" || window.location.href === "http://localhost:3000/shipping/" || window.location.href === "http://localhost:3000/shipping#" || window.location.href === "http://localhost:3000/shipping" ) 
		{
			axios('http://apizwz.prtouch.com:8081/api/sales_confirmation/',
				{
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Authorization' : 'Token ' + localStorage.getItem('auth_key')
				},
				data: {
					"item_info": arr
				},
			})
			.then((response) => {
				
				if (response.data.success === false) {
					/*alert(response.data.messge)*/
					this.setState({
						failedMessage: response.data.message
					})
				this.Failedtoggle();
					}else if (response.data.success === true) {
						
						localStorage.setItem('order_no' , response.data.myscno);
						localStorage.setItem('left_cart_data' , JSON.stringify(response.data.left_items));
						this.props.history.push('/orderPlaced');
						}
					this.setState({
						isDisabled: false
					})
			   }).catch(function (error) {});
		}else if (window.location.href === "http://nod.prtouch.com:8081/shipping/" || window.location.href === "http://nod.prtouch.com:8081/shipping" || window.location.href === "http://nod.prtouch.com:8081/shipping#"  ) 
		{
			axios('http://apinod.prtouch.com:8081/api/sales_confirmation/',
				{
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Authorization' : 'Token ' + localStorage.getItem('auth_key')
				},
				data: {
					"item_info": arr
				},
			})
			.then((response) => {
				
				if (response.data.success === false) {
					/*alert(response.data.messge)*/
					this.setState({
						failedMessage: response.data.message
					})
				this.Failedtoggle();
					}else if (response.data.success === true) {
						
						localStorage.setItem('order_no' , response.data.myscno);
						localStorage.setItem('left_cart_data' , JSON.stringify(response.data.left_items));
						this.props.history.push('/orderPlaced');
						}
					this.setState({
						isDisabled: false
					})
			   }).catch(function (error) {});
		}
	/*}
	*/
}
	componentDidMount(){
		window.scrollTo(0, 0)
		const cartItemsObjLength1 = localStorage.getItem('cartItems')
		const cartItemsObj1 = JSON.parse(cartItemsObjLength1)
		const gst = localStorage.getItem('totalGst')
		const totalWeight = localStorage.getItem('totalWeight')
		const totalPrice = localStorage.getItem('totalAmoutValue')
		const displayData = localStorage.getItem('checkedItem')
		const displayData1 = JSON.parse(displayData)
		console.log('cartItemsObj1', cartItemsObj1);
		this.setState({  subtotal : localStorage.getItem('subtotal'),
						 gstval : gst,
						 TotalWeight : totalWeight,
						 Totalprice: totalPrice,
			             estimated_standard_shipping :localStorage.getItem('Estimated_Standard_Shipping') ,
			             estimated_total: localStorage.getItem('Estimated_Total'),
			             cart_Items : localStorage.getItem('cartItems'),
			             displayItems: displayData1
			        })

		


		if (window.location.href === "http://zwz.prtouch.com:8081/shipping/" || window.location.href === "http://zwz.prtouch.com:8081/shipping" || window.location.href === "http://zwz.prtouch.com:8081/shipping#" || window.location.href === "http://localhost:3000/shipping" || window.location.href === "http://localhost:3000/shipping/" || window.location.href === "http://localhost:3000/shipping#") 
		{		
			axios.get('http://apizwz.prtouch.com:8081/authentication/get_info/',
    	  		{
         		headers: {
              		'Content-Type': 'application/json',
              		'Authorization' : 'Token ' + localStorage.getItem('auth_key')
            			 } 
        		})
			.then((response) => {	
				var stateData = response.data.data.CustomerDeliveryAddress.details[0].add_state_name;		
				this.setState({
					gstNumber: response.data.data.gst_no,
                    companyName: response.data.data.company_name,
                    customerDeliveryAddress: response.data.data.CustomerDeliveryAddress.details,
                    state_name: response.data.data.CustomerDeliveryAddress.details[0].add_state_name,
                    billing_details_b_address : response.data.data.billing_details.b_address,
                    billing_details_b_state : response.data.data.billing_details.b_state,
                    billing_details_b_city :  response.data.data.billing_details.b_city,
                    billing_details_b_pincode : response.data.data.billing_details.b_pincode
				})


				axios('http://apizwz.prtouch.com:8081/authentication/city_list/',
				{
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Authorization' : 'Token ' + localStorage.getItem('auth_key')
				},
				data: {
					state_name: stateData
				},
			})
			.then((response) =>
				this.setState({
					cityList : response.data.data
				})
				)
			})

			

		axios.get('http://apizwz.prtouch.com:8081/authentication/state_list/',
			{
				headers:{
					'Content-Type' : 'application/json',
					'Authorization' : 'Token '+ localStorage.getItem('auth_key')
				}
			})
		.then((response) => {
           this.setState({
           		stateList : response.data.data
           })
		})
		}else if (window.location.href === "http://nod.prtouch.com:8081/shipping/" || window.location.href === "http://nod.prtouch.com:8081/shipping" || window.location.href === "http://nod.prtouch.com:8081/shipping#") 
		{		
			axios.get('http://apinod.prtouch.com:8081/authentication/get_info/',
    	  		{
         		headers: {
              		'Content-Type': 'application/json',
              		'Authorization' : 'Token ' + localStorage.getItem('auth_key')
            			 } 
        		})
			.then((response) => {
				var stateData = response.data.data.CustomerDeliveryAddress.details[0].add_state_name;			
				this.setState({
					gstNumber: response.data.data.gst_no,
                    companyName: response.data.data.company_name,
                    customerDeliveryAddress: response.data.data.CustomerDeliveryAddress.details,
                    state_name: response.data.data.CustomerDeliveryAddress.details[0].add_state_name,
                    billing_details_b_address : response.data.data.billing_details.b_address,
                    billing_details_b_state : response.data.data.billing_details.b_state,
                    billing_details_b_city :  response.data.data.billing_details.b_city,
                    billing_details_b_pincode : response.data.data.billing_details.b_pincode
				})

				axios('http://apinod.prtouch.com:8081/authentication/city_list/',
				{
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Authorization' : 'Token ' + localStorage.getItem('auth_key')
				},
				data: {
					state_name: stateData
				},
			})
			.then((response) =>
				this.setState({
					cityList : response.data.data
				})
				)

			})

			
		axios.get('http://apinod.prtouch.com:8081/authentication/state_list/',
			{
				headers:{
					'Content-Type' : 'application/json',
					'Authorization' : 'Token '+ localStorage.getItem('auth_key')
				}
			})
		.then((response) => {
           this.setState({
           		stateList : response.data.data
           })
		})
		}



		
	}
	
	render(){
		const { Successmodal, Failedmodal } = this.state;
		return(
			<div>
				<Header {...this.props} > </Header>
				<div className="content-container wrapper" style={{backgroundColor: '#f4f4f4', padding: 10, marginTop: 195}}>
					<Row>					

						<Col sm={10} style={{marginTop: 6}}>
							<h4 style={{paddingLeft: 16, fontWeight:'bold', color: '#00619F'}}>  Review and confirm order </h4>
						</Col>
						<Col sm={2} style={{marginTop: 6}}>
							<input type="button" onClick={this.goBackToCart} value="Go back to cart" className="login_btn" />
						</Col>

					</Row>

					<Row>
						<Col sm={8} style={{marginTop: 25}}>


						      <Card>
							        <CardBody className="customise_card_body" style={{padding: 18}}>
							        	<table class="cart_data_table">
          <tbody style={{fontSize: 12}}>
          <tr className="cart-data-header" style={{backgroundColor: '#ddd'}}>
            <th style={{width: '10%'}}> Item Name </th>
            <th style={{width: '11%'}}> Brand Name </th>
            <th style={{width: '8%'}}> Qty </th>
            <th style={{width: '12%'}}> Price </th>
            <th style={{width: '12%'}}> Total</th>
            <th> GST</th>
            <th> Wt.</th>
            <th> Origin </th>
           
          </tr>

          {
          this.state.displayItems.length>0  && (
          this.state.displayItems.map((item, index) => (
          <tr className="cart-data">
            <td> <span style={{ color: '#00739E'}}> {item.itemname}  </span></td> 
            <td> <span style={{ color: '#00739E'}}> {item.brandname}  </span></td> 
            <td> {item.quantity} </td>
            
             <td> <i class="fa fa-inr" style={{fontSize: 12}} aria-hidden="true"></i> <s> {item.list_price.toLocaleString(navigator.language, { minimumFractionDigits: 0 })} </s>  <br/> <span style={{color: '#00739E'}}> Savings: {item.calculate_discount_percentage}%</span> <br/> <span style={{fontWeight: 'bold'}}> <i class="fa fa-inr" style={{fontSize: 12}} aria-hidden="true"></i> {item.your_price.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}.00 </span></td>
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

            
          
            { item.Country ?
              (
                <td>{item.Country} </td>
              ):(
                <td> NA</td>
              )
            }
          </tr>
            ))
          )
          }
          </tbody>
         </table>
							          	
						        	</CardBody>
									      	</Card>


							 <Card>
						        <CardBody className="customise_card_body" style={{padding: 18}}>
						        	<Row>
						        		<Col sm={12} style={{marginTop: 6}}>
								          <Col sm={12} xs={12} md={12} style={{ float: 'left'}}>
								            <Col  style={{ float: 'left',width: '19%'}}>

								            <b style={{ float: 'left', fontSize: 14}}>GST Number</b>
								            </Col>
								            <Col  style={{ float: 'left',width: '50%'}}>
								          	<input  className="address_input" placeholder="GST Number" value={this.state.gstNumber} readOnly/>
								          	</Col>
								          </Col>


								           <Col sm={12} xs={12} md={12} style={{ float: 'left'}}>
								             <Col  style={{ float: 'left',width: '19%'}}>
								            <b style={{ float: 'left', fontSize: 14}}>Company Name</b>
								            </Col>

								             <Col  style={{ float: 'left',width: '50%'}}>
								          	<input style={{ float: 'left'}}  className="address_input" placeholder="Company Name" value={this.state.companyName} readOnly />
								           </Col>
								          </Col>
								        </Col>
							        </Row>
						        </CardBody>
						      </Card>

							
						</Col>
						<Col sm={4} style={{marginTop: 25}}>
							 <Card>
							 	<Col sm={12} style={{paddingLeft: 6, paddingRight: 0, backgroundColor: '#00619F'}} >
						        	<h6 style={{color: '#fff', padding: 6, fontWeight:'bold', textAlign: 'center', paddingTop: 10}}> Order Summary </h6>
						        </Col> 
						        <CardBody className="customise_card_body" style={{padding: 18}}>
						        	<table style={{width: '100%'}}>
						        		<tbody style={{fontSize: 15}}>
						        			<tr>
						        				<td>
						        					<span>  Subtotal </span>
						        				</td>

						        				<td>
						        					<span> <strong> <i class="fa fa-inr" style={{fontSize: 12}} aria-hidden="true"></i> {this.state.subtotal.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}.00 </strong> </span>
						        				</td>
						        			</tr>
						        			<tr>
						        				<td>
						        					<span> <strong> GST Total </strong> </span>
						        				</td>

						        				<td>
						        					<span> <strong> <i class="fa fa-inr" style={{fontSize: 12}} aria-hidden="true"></i> {this.state.gstval.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}.00 </strong> </span>
						        				</td>
						        			</tr>

						        			<tr>
						        				<td>
						        					<span> <strong> Total Weight </strong> </span>
						        				</td>

						        				<td>
						        					<span> <strong>  {this.state.TotalWeight} Kg</strong> </span>
						        				</td>
						        			</tr>

						        			

						        			<tr className="est_total_row">
						        				<td>
						        					<span> <strong> Estimated Total </strong> </span>
						        				</td>

						        				<td>
						        					<span style={{color: '#19792F'}}> <strong> <i class="fa fa-inr" style={{fontSize: 12}} aria-hidden="true"></i> {this.state.Totalprice.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}.00 </strong> </span>
						        				</td>
						        			</tr>

						        			
						        			<tr>
						        				

						        				
						        				<td colSpan="3" style={{paddingLeft: 0, paddingRight: 0}}> <input type="button" onClick={this.goToCheckout} disabled= {this.state.isDisabled} style={{backgroundColor: this.state.isDisabled == false ? '#0072bc' : '#2f2f2f9e'}} value="Checkout" className="login_btn" /> </td>
						        				
						        			</tr>
						        			

						        		</tbody>
						        	</table>

						        
						        </CardBody>
						      </Card>
							
						</Col>

						<Col sm={8} style={{marginTop: 25}}>
							 <Card>
							 	<Col sm={12} style={{paddingLeft: 6, paddingRight: 0, backgroundColor: '#00619F'}} >
						        	<h6 style={{color: '#fff', padding: 6, fontWeight:'bold', paddingTop: 10}}> Billing Address </h6>
						        </Col> 
						        <CardBody className="customise_card_body" style={{padding: 18}}>
						        	{this.state.billing_details_b_address} <br /> {this.state.billing_details_b_city}<b> , </b>{this.state.billing_details_b_state}<b> - </b>{this.state.billing_details_b_pincode}
						        </CardBody>
						      </Card>
						</Col>
						
						<Col sm={8} style={{marginTop: 25}}>
							 <Card>
							 	<Col sm={12} style={{paddingLeft: 6, paddingRight: 0, backgroundColor: '#00619F'}} >
						        	<h6 style={{color: '#fff', padding: 6, fontWeight:'bold', paddingTop: 10}}> Delivery Address </h6>
						        </Col> 
						        <CardBody className="customise_card_body" style={{padding: 18}}>
						        	<table style={{width: '100%'}}>
						        		<tbody style={{fontSize: 15}}>
						        		

						        		{
						        			this.state.customerDeliveryAddress.map((item, index) =>
						        			
						        			 <tr className="delivery_add_row">
						        				    <td style={{width: '10%'}}>
						        					    <input type="radio"   defaultChecked= {index == 0 ? true : false} onClick={this.getRadioValue.bind(this)} value={item.add_id} name="selected_add" />
						        			    	</td>
						        			    	<td style={{width: '60%'}}>
						                               <span> {item.add_details} <br/> {item.add_csp}</span>
						        				    </td>

						        				    {index == 0 ? (
						        				    	<td style={{fontWeight: 'bold'}}>
										        			Default Address
										        		</td>):(
										        		<td>
										        			
										        		</td>

						        				    )}

						        				    {item.approval_status == 2 ? (
										        		<td>
										        			<span style={{fontWeight: 'bold', color: 'green'}}><i class="fa fa-check" aria-hidden="true" style={{marginRight: 5}}></i>Verified</span>
										        		</td>):(
										        		<td>
										        			<span style={{fontWeight: 'bold', color: 'red'}}>Not Verified</span>
										        		</td>
									        		)
									        		}
						        		    	</tr>
						        			)
						        		}
						        		<tr><td></td><td ><button style={{width: 140,fontWeight:'bold'}} onClick={this.Successtoggle} className="login_btn">Add New Address</button></td></tr>						        			
						        		</tbody>
						        	</table>
						        </CardBody>
						      </Card>
						</Col>

					</Row>
				</div>
				<Footer> </Footer>

				<Modal isOpen={Successmodal} toggle={this.Successtoggle} >
         			<div className="modal__header" style={{backgroundColor: '#0072bc'}}>
            			<h4 className="text-modal  modal__title" style={{color: '#fff', paddingTop: 10, fontSize: 17, fontWeight: 'bold'}}>Add New Delivery Address</h4>
          			</div>
         			<div className="modal__body" style={{padding: 12}}>
         			   <div style={{width: '100%'}}>
          		 		    <div style={{width: '20%' , float: 'left', textAlign: 'left'}}>
                			    <span style={{fontWeight: 'bold', fontSize: 16, textAlign: 'left' }}> Address: </span>
              		    	</div>
              		    	<div style={{width: '80%' , float: 'left', textAlign: 'left',}}>
                				<span style={{fontSize: 15, textAlign: 'left' }}> <input type="text" className="form-control set_input" name="add" onChange={this.handleChange}/>  </span>
                				{
								this.state.showError10 &&
									<div style={{width: '100%', textAlign: 'left'}}>
										<span style={{color: 'red', fontSize: 11}}> Please Enter Address </span>
									</div>	
								}
             				 </div>
             				 <div style={{width: '20%' , float: 'left', textAlign: 'left', marginBottom: 12 }}>
                				<span style={{fontWeight: 'bold', fontSize: 16, textAlign: 'left' }}> State: </span>
              				</div>
               				<div style={{width: '80%' , float: 'left', textAlign: 'left', marginBottom: 12 }}>
                				
                				
						        <input type="text" class="form-control set_input" value={this.state.state_name} name="state"/>
                				
      
              				</div>
              				<div style={{width: '20%' , float: 'left', textAlign: 'left', marginBottom: 12}}>
                				<span style={{fontWeight: 'bold', fontSize: 16, textAlign: 'left' }}> City: </span>
              				</div>
               				<div style={{width: '80%' , float: 'left', textAlign: 'left', marginBottom: 12}}>
                				<span style={{fontSize: 15, textAlign: 'left' }}>
                				<select name="city_select" className="form-control" id="" onChange={this.handleChange}>
                				<option value='city'>Select City</option>

                					{
                					this.state.cityList.length > 0 && ( 
						        	this.state.cityList.map((item) =>
  											<option value={item.ct_id}>{item.ct_name}</option>
						        	) )
						        	}
						        </select>
                				</span>
                				{
								this.state.showError12 &&
									<div style={{width: '100%', textAlign: 'left'}}>
										<span style={{color: 'red', fontSize: 11}}> Please Select City </span>
									</div>	
								}
              				</div>
			           </div>
			           <div style={{width: '20%' , float: 'left', textAlign: 'left'}}>
                			    <span style={{fontWeight: 'bold', fontSize: 16, textAlign: 'left' }}> Pincode: </span>
              		    </div>
              		    <div style={{width: '80%' , float: 'left', textAlign: 'left'}}>
                			<span style={{fontSize: 15, textAlign: 'left' }}> <input type="number" className="form-control set_input" name="pin" onChange={this.handleChange}/>  </span>
                			{
								this.state.showError13 &&
									<div style={{width: '100%', textAlign: 'left'}}>
										<span style={{color: 'red', fontSize: 11}}> Please Enter Pincode </span>
									</div>	
								}
             			 </div>
			        </div>   
			        <div style={{width: '100%' , float: 'left', textAlign: 'left', marginBottom: 20, marginTop: 10}}>
                		<ButtonToolbar className="modal__footer">
                			  <Button style={{backgroundColor: '#ccc', fontSize: 14, fontWeight: 'bold', color: '#fff' , height: 32}} className="modal_ok"  onClick={this.Successtoggle}>Cancel</Button>
                				  <Button style={{backgroundColor: '#0072bc', fontSize: 14, fontWeight: 'bold', color: '#fff', height: 32, marginLeft: 12, backgroundColor: '#3ea3fc'}} className="modal_ok"  onClick={this.storedeliveryaddress}>
                  					{this.state.loadingupdatebtn && 
                  					  <i  className="fa fa-refresh fa-spin" style={{ marginRight: "5px" }} />
                  					}  
                  				Submit</Button>
            			</ButtonToolbar>
              		</div>

       			</Modal>


       			<Modal
		         isOpen={Failedmodal}
		         toggle={this.Failedtoggle}

		        >
			         <div className="modal__header" style={{width: '100%',height: 35}}>
			           <button className="fa fa-times modal__close-btn" type="button" style={{right: 15}} onClick={this.Failedtoggle} />
			          
			          
			         </div>
			         <div className="modal__body" style={{paddingTop: 15, paddingBottom: 15}}>
			   
			           <h4 style={{fontSize: 18}}>{this.state.failedMessage}</h4>
			         </div>
			         <ButtonToolbar className="modal__footer" style={{marginTop: 0, height: 78}}>
			           <Button id='changeColor' style={{backgroundColor: '#0072bc !important', fontSize: 14, fontWeight: 'bold', color: '#fff', width: 100, height: 35}}  onClick={this.Failedtoggle}>Ok</Button>
			         	<Button id='changeColor' style={{backgroundColor: '#0072bc',  fontSize: 14, fontWeight: 'bold', color: '#fff', width: 160, height: 35}}   onClick={this.goToProfile}>Go to profile</Button>
			         </ButtonToolbar>
			         
			           
			         
			       </Modal>

			</div>
		)
	}
}


export default connect(state => ({
	...state.cartDetail
}))(Shipping)