import React, { Component } from 'react'
import './styles.scss'
import { Button, Row, Col,Card, CardImg, CardText, CardBody,CardTitle, Modal,ButtonToolbar ,CardSubtitle} from 'reactstrap';
import {connect} from 'react-redux';
import axios from 'axios';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import image1 from '~/assets/images/1.jpg';
import image2 from '~/assets/images/2.jpg';
import image3 from '~/assets/images/3.jpg';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import {updateCartData} from '~/redux/action/cartDetails';
import cogoToast from 'cogo-toast';

class MyProfile extends Component {

	constructor(props){
		super(props)

		this.Successtoggle = this.Successtoggle.bind(this);
		this.updateProfile = this.updateProfile.bind(this);
		this.changeGST = this.changeGST.bind(this);
		this.changeName = this.changeName.bind(this);
		this.changeBillingPincode = this.changeBillingPincode.bind(this);
		this.changeShippingpincode = this.changeShippingpincode.bind(this);
		this.changeBillingAddress = this.changeBillingAddress.bind(this);
		this.changeBillingState = this.changeBillingState.bind(this);
		this.changeBillingCity = this.changeBillingCity.bind(this);
		this.changeShippingAddress = this.changeShippingAddress.bind(this);
		this.changeShippingState = this.changeShippingState.bind(this);
		this.updateProfileInformation = this.updateProfileInformation.bind(this);
		this.updateBillingInformation = this.updateBillingInformation.bind(this);
		this.oncityList = this.oncityList.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.storedeliveryaddress = this.storedeliveryaddress.bind(this);

		this.state = {
			add_data:'',
			city_id: '',
			itemname: '',
			state_name: '',
			categoryname: '',
			categorycode: '',
			categorytype: '',
			productcode: '',
			description: '',
			pin_data: '',
			price: '',
			status:'',
			email:'',
			input_type:false,
			brandname: '',
			itemtype: '',
			Successmodal: false,
			first_name:'',
			billingpincode:'',
			billingaddress:'',
			state_val: '',
			CustomerDeliveryAddress:[],
			stateList: [],
			cityList : [],
			error1: false,
			error3: false,
			error5: false,
			error6: false,
			error7: false,
			error8: false,
			error9: false,
			error10: false,
			updateButton : false,
			updateBillingInformation:false,
			cityOption:[],
		}
		this.statelist();
	}

	Successtoggle() {
    this.setState(prevState => ({ Successmodal: !prevState.Successmodal }));
  	}
  	storedeliveryaddress(e){
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
  		var url=''
		if ( window.location.href === "http://store.zwz.co.in/my-profile" || window.location.href === "http://store.zwz.co.in/my-profile#"){
			url="http://api.store.zwz.co.in/authentication/user/createDeliveryAddress/"
		}
		else if(window.location.href === "http://store.nodbearings.net/my-profile" || window.location.href === "http://store.nodbearings.net/my-profile#" || window.location.href === "http://localhost:3000/my-profile" || window.location.href === "http://localhost:3000/my-profile#"){
			url="http://api.store.nodbearings.net/authentication/user/createDeliveryAddress/"
		}else{
			url="http://api.store.zwz.co.in/authentication/user/createDeliveryAddress/"
		}
		
			axios(url,
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
					/*this.Successtoggle();
					window.location.reload();
					cogoToast.success(response.data.message);*/
					if (response.data.success == true) {
						this.Successtoggle();
						cogoToast.success(response.data.message);
						window.location.reload();
					}else{
						this.Successtoggle();
						cogoToast.success(response.data.message);

					}
				}
				).catch(function (error) {
	    			if (error.response.status == 401) {
			    		window.location.href = "/login"
			    	}
	      
	      
	    		});
		
	}
	changeGST(e){
		this.setState({
			gstNumber: e.target.value,
			updateButton : true	
		})
	}

	oncityList(statename){
		if (window.location.href === "http://store.zwz.co.in/shipping/" || window.location.href === "http://store.zwz.co.in/shipping" || window.location.href === "http://store.zwz.co.in/shipping#" || window.location.href === "http://localhost:3000/shipping/" || window.location.href === "http://localhost:3000/shipping#" || window.location.href === "http://localhost:3000/shipping" ) 
		{
			axios('http://api.store.zwz.co.in/authentication/city_list/',
				{
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Authorization' : 'Token ' + localStorage.getItem('auth_key')
				},
				data: {
					state_name: statename
				},
			})
			.then((response) =>
				this.setState({
					cityList : response.data.data
				})
				)
		}else if (window.location.href === "http://store.nodbearings.net/shipping/" || window.location.href === "http://store.nodbearings.net/shipping" || window.location.href === "http://store.nodbearings.net/shipping#") 
		{
			axios('http://api.store.nodbearings.net/authentication/city_list/',
				{
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Authorization' : 'Token ' + localStorage.getItem('auth_key')
				},
				data: {
					state_name: statename
				},
			})
			.then((response) =>
				this.setState({
					cityList : response.data.data
				})
				)
		}
	}

	
	Failedtoggle() {
    this.setState(prevState => ({ Failedmodal: !prevState.Failedmodal }));
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
	    		city_id : e.target.value,
	    		showError12: false
	    	})
	    	localStorage.setItem('del_city',e.target.value)
		}

	}

	changeBillingPincode(e){
		e.preventDefault()
		this.setState({
			billingpincode : e.target.value,
			updateBillingInformation : true
		})
	}

	changeShippingpincode(e){
		this.setState({
			shippingpincode : e.target.value
		})
	}

	changeName(e){
		e.preventDefault()
		this.setState({
			name: e.target.value,
			updateButton : true,
			error3:false
		})
	}

	changeBillingAddress(e){
		e.preventDefault()
		this.setState({
			billingaddress: e.target.value,
			updateBillingInformation:true,
		})
	}

	changeBillingState(e){
		e.preventDefault()
		this.setState({
			billingstate: e.target.value,
			updateBillingInformation:true,
			billingcityId:'',
		});
		var url=''
		if (window.location.href === "http://localhost:3000/my-profile" || window.location.href === "http://localhost:3000/my-profile#" || window.location.href === "http://store.zwz.co.in/my-profile" || window.location.href === "http://store.zwz.co.in/my-profile#"){
			url="http://api.store.zwz.co.in/authentication/city_list/"
		}
		else if(window.location.href === "http://localhost:3000/my-profile" || window.location.href === "http://localhost:3000/my-profile#" || window.location.href === "http://store.nodbearings.net/my-profile" || window.location.href === "http://store.nodbearings.net/my-profile#"){
			url="http://api.store.nodbearings.net/authentication/city_list/"
		}else{
			url="http://api.store.zwz.co.in/authentication/city_list/"
		}
			axios.post(url , 
		 	{
		 		"state_name" : e.target.value 		 	
		 	},{
		 		 headers: {
         	 	'Authorization' : 'Token ' + localStorage.getItem('auth_key')
        		} 
		 	})
	    	.then((response) =>  {
	    		if (response.data.success === true){
	    			cogoToast.success(response.data.message);
	    			 this.setState({ cityOption : response.data.data.map((data) =>    
						<option  value={data.ct_id} > {data.ct_name} </option>),
					
		   });
	    		}
	    		else{
	    			cogoToast.error(response.data.message);
	    		}
	    	})
	    	.catch(function (error) {
	    			if (error.response.status == 401) {
			    		window.location.href = "/login"
			    	}
	    		
	    	});	
		}
	

	changeBillingCity(e){
		e.preventDefault()
		var index = e.nativeEvent.target.selectedIndex;
		this.setState({
			billingcity: e.nativeEvent.target[index].text,
			updateBillingInformation:true,
			billingcityId: e.target.value
		})
	}

	changeShippingAddress(e){
		this.setState({
			shippingaddress: e.target.value
		})
	}

	changeShippingState(e){
		this.setState({
			shippingstate: e.target.value
		})
	}

	
	updateBillingInformation(e){
		e.preventDefault()
		var billing_url=""
		if(window.location.href === "http://store.zwz.co.in/my-profile" || window.location.href === "http://store.zwz.co.in/my-profile#" || window.location.href === "http://localhost:3000/my-profile" || window.location.href === "http://localhost:3000/my-profile#") {
			billing_url = "http://api.store.zwz.co.in/authentication/update_get_info/" 
		}else if(window.location.href === "http://store.nodbearings.net/my-profile" || window.location.href === "http://store.nodbearings.net/my-profile#" || window.location.href === "http://localhost:3000/my-profile" || window.location.href === "http://localhost:3000/my-profile#") {
			billing_url = "http://api.store.nodbearings.net/authentication/update_get_info/"
		}else{
			billing_url = "http://api.store.zwz.co.in/authentication/update_get_info/"
		}
			if (this.state.billingaddress == "") {
				 cogoToast.error('Please Enter Billing Address');
				return false;
			}else if (this.state.billingpincode == "") {
				cogoToast.error('Please Enter Billing Pincode');
				return false;
			}else if (this.state.billingstate == "") {
				cogoToast.error('Please Select Billing State');
				return false;
			}else if (this.state.billingcityId== "") {
				cogoToast.error('Please Select Billing City');
				return false;
			}	
		 var billing_deatils = {
		 	"billingaddress"	    : this.state.billingaddress,
	        "billingstate"			: this.state.billingstate,
	        "billingcity_id"	   	: this.state.billingcityId,
	        "billingpincode"		: this.state.billingpincode
		 }
		 axios.post(billing_url , 
		 {
		 	"key" : "BillingInformation",
		 	"billingDeatils" : billing_deatils
		 	
		 },{
		 	 headers: {
          	'Authorization' : 'Token ' + localStorage.getItem('auth_key')
        	} 

		 })
	    .then((response) =>  {
	    	if (response.data.success === true){
	    		cogoToast.success(response.data.message);
	    		this.setState({updateBillingInformation : false})

	    	}
	    	else{
	    		cogoToast.error(response.data.message);
	    	}
	    })
	    .catch(function (error) {
	    });
	}

	updateProfileInformation(e){
		e.preventDefault()
		var url=''
		if (window.location.href === "http://localhost:3000/my-profile" || window.location.href === "http://localhost:3000/my-profile#" || window.location.href === "http://store.zwz.co.in/my-profile" || window.location.href === "http://store.zwz.co.in/my-profile#"){
			url="http://api.store.zwz.co.in/authentication/update_get_info/"
		}
		else if(window.location.href === "http://localhost:3000/my-profile" || window.location.href === "http://localhost:3000/my-profile#" || window.location.href === "http://store.nodbearings.net/my-profile" || window.location.href === "http://store.nodbearings.net/my-profile#"){
			url="http://api.store.nodbearings.net/authentication/update_get_info/"
		}else{
			url="http://api.store.zwz.co.in/authentication/update_get_info/"
		}
		/*if(window.location.href === "http://store.zwz.co.in/my-profile" || window.location.href === "http://store.zwz.co.in/my-profile#" || window.location.href === "http://localhost:3000/my-profile" || window.location.href === "http://localhost:3000/my-profile#") {*/
			if (this.state.gstNumber == "") {
				this.setState({
					error1: true,
					errorMessage: 'Please Enter GST Number'
				})
				return false;
			}else if (this.state.name == "") {
				this.setState({
					error3: true,
					errorMessage: 'Please Enter Authorised Signatory'
				})
				return false;
			}	
		 var personal_deatils = {
		 	"gst_no"	    : this.state.gstNumber,
	        "name"			: this.state.name
		 }
		 axios.post(url , 
		 {
		 	"key" : "ProfileInformation",
		 	"personalDeatils" : personal_deatils
		 	
		 },{
		 	 headers: {
          	'Authorization' : 'Token ' + localStorage.getItem('auth_key')
        	} 

		 })
	    .then((response) =>  {
	    	if (response.data.success === true){
	    		cogoToast.success(response.data.message);
	    		this.setState({updateButton : false})

	    	}
	    	else{
	    		cogoToast.error(response.data.message);
	    	}
	    })
	    .catch(function (error) {
	    });

		/*}else if (window.location.href === "http://store.nodbearings.net/my-profile" || window.location.href === "http://store.nodbearings.net/my-profile#") {

			axios.post('http://api.store.nodbearings.net/authentication/update_get_info/' , 

		 {
		 	
		 	"tokenkey": sessionStorage.getItem('auth_key')
		 },{
		 	 headers: {
          	'Authorization' : 'Token ' + sessionStorage.getItem('auth_key')
        	} 
		 }
		 )
	    .then((response) =>  {
	    	console.log(response);
	    })
	    .catch(function (error) {
	    });
		}*/
	}

	updateProfile(){
		var url=''
		if (window.location.href === "http://localhost:3000/my-profile" || window.location.href === "http://localhost:3000/my-profile#" || window.location.href === "http://store.zwz.co.in/my-profile" || window.location.href === "http://store.zwz.co.in/my-profile#"){
			url="http://api.store.zwz.co.in/authentication/update_get_info/"
		}
		else if(window.location.href === "http://localhost:3000/my-profile" || window.location.href === "http://localhost:3000/my-profile#" || window.location.href === "http://store.nodbearings.net/my-profile" || window.location.href === "http://store.nodbearings.net/my-profile#"){
			url="http://api.store.nodbearings.net/authentication/update_get_info/"
		}else{
			url="http://api.store.zwz.co.in/authentication/update_get_info/"
		}
		/*if(window.location.href === "http://store.zwz.co.in/my-profile" || window.location.href === "http://store.zwz.co.in/my-profile#" || window.location.href === "http://localhost:3000/my-profile" || window.location.href === "http://localhost:3000/my-profile#") {*/
			if (this.state.gstNumber == "") {
				this.setState({
					error1: true,
					errorMessage: 'Please Enter GST Number'
				})
				return false;
			}else if (this.state.companyName == "") {
				this.setState({
					error2: true,
					errorMessage: 'Please Enter Company Name'
				})
				return false;
			}else if (this.state.name == "") {
				this.setState({
					error3: true,
					errorMessage: 'Please Enter Authorised Signatory'
				})
				return false;
			}else if (this.state.mobileNo == "") {
				this.setState({
					error4: true,
					errorMessage: 'Please Enter Mobile No'
				})
				return false;
			}else if (this.state.shippingaddress == "") {
				this.setState({
					error5: true,
					errorMessage: 'Please Enter Shipping Address'
				})
				return false;
			}else if (this.state.shippingpincode == "") {
				this.setState({
					error6: true,
					errorMessage: 'Please Enter Shipping Pincode'
				})
				return false;
			}else if (this.state.billingaddress == "") {
				this.setState({
					error7: true,
					errorMessage: 'Please Enter Billing Address'
				})
				return false;
			}else if (this.state.billingpincode == "") {
				this.setState({
					error8: true,
					errorMessage: 'Please Enter Billing Pincode'
				})
				return false;
			}
		 var person_deatils = {
		 	"gst_no": this.state.gstNumber,
	        "company_name": this.state.companyName,
	        "name": this.state.name,
	        "mobile_no": this.state.mobileNo,
		 }
		 var shipping_details = {
		 	"s_address": this.state.shippingaddress,
            "s_pincode": this.state.shippingpincode,
            "s_city_id": this.state.shippingcity
		 }
		 var city_deatils = {
		 	"b_address": "84/86 Nagdevi Cross Lane,2nd Floor, Mumbai - 400 003. India",
            "b_pincode":"",
            "b_city_id":1
		 }
		 axios.post(url , 
		 {
		 	"key" : "my_profile"
		 	
		 },{
		 	 headers: {
          	'Authorization' : 'Token ' + localStorage.getItem('auth_key')
        	} 
		 }
		 )
	    .then((response) =>  {
	    })
	    .catch(function (error) {
	    });
		/*}else if (window.location.href === "http://store.nodbearings.net/my-profile" || window.location.href === "http://store.nodbearings.net/my-profile#") {

			axios.post('http://api.store.nodbearings.net/authentication/update_get_info/' , 

		 {
		 	
		 	"tokenkey": sessionStorage.getItem('auth_key')
		 },{
		 	 headers: {
          	'Authorization' : 'Token ' + sessionStorage.getItem('auth_key')
        	} 
		 }
		 )
	    .then((response) =>  {
	    })
	    .catch(function (error) {     
	    });
		}*/
	}
	async statelist(e){	
		if (window.location.href === "http://store.zwz.co.in/my-profile#" || window.location.href === "http://store.zwz.co.in/my-profile" || window.location.href=="http://localhost:3000/my-profile" ) {
			var url = "http://api.store.zwz.co.in/authentication/state_list/";
		} else if (window.location.href === "http://store.nodbearings.net/my-profile#" || window.location.href === "http://store.nodbearings.net/my-profile" || window.location.href=="http://localhost:3000/my-profile" ) {
			var url = "http://api.store.nodbearings.net/authentication/state_list/";
		}else{
			var url = "http://api.store.zwz.co.in/authentication/state_list/";
		}
		var datastring = {
			url	:	url
		};
		const response = await axios(datastring.url,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Authorization' : 'Token ' + localStorage.getItem('auth_key'),
				},
				data: datastring
			});
		if (response.data.success == true){
		   this.setState({
			   state_options : response.data.data.map((data) =>		            
						<option 
			   				key={data.st_name}
			   				value={data.st_name}
		   				>
			   		{data.st_name}
		   		</option>
			   )
		   });
		}else{
		 	console.log(response.data.message);
		}
	}
	componentDidMount(){
		window.scrollTo(0, 0)
		if (window.location.href === "http://store.zwz.co.in/my-profile" || window.location.href === "http://store.zwz.co.in/my-profile#" || window.location.href === "http://localhost:3000/my-profile" ) {
			var stateData = '';
			axios.get('http://api.store.zwz.co.in/authentication/get_info/',
    	  		{
         		headers: {
              		'Content-Type': 'application/json',
              		'Authorization' : 'Token ' + localStorage.getItem('auth_key')
            			 } 
        		})
			.then((response) => {	
				
				stateData = response.data.data.CustomerDeliveryAddress.details[0].add_state_name;		
				this.setState({
					email    : response.data.data.email,
					gstNumber: response.data.data.gst_no,
                    companyName: response.data.data.company_name,
                    customerDeliveryAddress: response.data.data.CustomerDeliveryAddress.details,
                    state_name: response.data.data.CustomerDeliveryAddress.details[0].add_state_name,
                    billing_details_b_address : response.data.data.billing_details.b_address,
                    billing_details_b_state : response.data.data.billing_details.b_state,
                    billing_details_b_city :  response.data.data.billing_details.b_city,
                    billing_details_b_pincode : response.data.data.billing_details.b_pincode
				})

				axios('http://api.store.zwz.co.in/authentication/city_list/',
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
			}).catch(function (error) {
	    			if (error.response.status == 401) {
			    		window.location.href = "/login"
			    	}
	      
	      
	    	});


		axios.get('http://api.store.zwz.co.in/authentication/state_list/',
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
		if (window.location.href === "http://store.zwz.co.in/my-profile" || window.location.href === "http://store.zwz.co.in/my-profile#" || window.location.href === "http://localhost:3000/my-profile") {
    	axios.get('http://api.store.zwz.co.in/authentication/get_info/',
      {
         headers: {
              'Content-Type': 'application/json',
              'Authorization' : 'Token ' + localStorage.getItem('auth_key')
            } 
        }
    )
       .then((response) =>  {
       	var titile = response.data.data.tilte ? response.data.data.tilte : "";
       	var first_name = response.data.data.first_name ? response.data.data.first_name : "";
       	var last_name =response.data.data.last_name  ? response.data.data.last_name  : "";
       	console.log(titile, first_name, last_name)
       	var fullname =  titile+" "+first_name+ " "+last_name
       	console.log(fullname)
        this.setState({
          billingaddress : response.data.data.billing_details['b_address'],
          billingstate   : response.data.data.billing_details['b_state'],
          billingcity    : response.data.data.billing_details['b_city'],
          billingcityId  : response.data.data.billing_details['b_city_id'],
          billingpincode : response.data.data.billing_details['b_pincode'],
          shippingaddress: response.data.data.shipping_details['s_address'],
          shippingstate: response.data.data.shipping_details['s_state'],
          shippingcity: response.data.data.shipping_details['s_city'],
          shippingcityId: response.data.data.shipping_details['s_city_id'],
          gstNumber: response.data.data.gst_no,
          email: response.data.data.email,
          companyName: response.data.data.company_name,
          status: response.data.data.status,
          first_name: fullname,
          mobileNo: response.data.data.mobile_no,
          CustomerDeliveryAddress: response.data.data.CustomerDeliveryAddress['details']
        })
    	if (this.state.status === "Active"){
    		this.setState({input_type:true})
    	}
    	else{
    		this.setState({input_type:false})
    	}
       })
       .catch(function (error) {
    });
    
  } else  if (window.location.href === "http://store.nodbearings.net/my-profile"  || window.location.href === "http://store.nodbearings.net/my-profile#") {
    axios.get('http://api.store.nodbearings.net/authentication/get_info/',
      {
         headers: {
              'Content-Type': 'application/json',
              'Authorization' : 'Token ' + localStorage.getItem('auth_key')
            } 
        }
    )
       .then((response) =>  {
       		var stateData = response.data.data.CustomerDeliveryAddress.details[0].add_state_name;
       		var titile = response.data.data.tilte ? response.data.data.tilte : "";
       	var first_name = response.data.data.first_name ? response.data.data.first_name : "";
       	var last_name =response.data.data.last_name  ? response.data.data.last_name  : "";
       	console.log(titile, first_name, last_name)
       	var fullname =  titile+" "+first_name+ " "+last_name
       	console.log(fullname)
        this.setState({
          billingaddress : response.data.data.billing_details['b_address'],
          billingstate   : response.data.data.billing_details['b_state'],
          billingcity    : response.data.data.billing_details['b_city'],
          billingcityId  : response.data.data.billing_details['b_city_id'],
          billingpincode : response.data.data.billing_details['b_pincode'],
          shippingaddress: response.data.data.shipping_details['s_address'],
          shippingstate: response.data.data.shipping_details['s_state'],
          shippingcity: response.data.data.shipping_details['s_city'],
          shippingcityId: response.data.data.shipping_details['s_city_id'],
          gstNumber: response.data.data.gst_no,
          companyName: response.data.data.company_name,
          status: response.data.data.status,
          first_name: fullname,
          email: response.data.data.email,
          mobileNo: response.data.data.mobile_no,
          CustomerDeliveryAddress: response.data.data.CustomerDeliveryAddress['details'],
          state_name: response.data.data.CustomerDeliveryAddress.details[0].add_state_name,
        })

        axios('http://api.store.nodbearings.net/authentication/city_list/',
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
    	if (this.state.status === "Active"){
    		this.setState({input_type:true})
    	}
    	else{
    		this.setState({input_type:false})
    	}
    	
       })
       .catch(function (error) {
       	if (error.response.status == 401) {
			    		window.location.href = "/login"
			    	}
    });

    axios.get('http://api.store.nodbearings.net/authentication/state_list/',
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
		const { Successmodal } = this.state;
		return(
			<div>
				<Header {...this.props} > </Header>
				<div className="profile_container" style={{marginTop: 186}}>
					<span style={{fontWeight: 'bold', paddingLeft:2}}> Status :<span style={{color: this.state.status == "Active" ? 'green' : 'red', fontWeight: 200, paddingLeft: 4}}> {this.state.status}  </span> </span>
				</div>
				<div className="content-container wrapper" style={{backgroundColor: '#f4f4f4', marginTop: 12, padding: 10}}>
					<Row>					

						<Col sm={12} style={{marginTop: 10}}>
							<h4 style={{paddingLeft: 16, fontWeight:'bold', color: '#00619F', fontSize: 19}}> Profile Information </h4>
						</Col>

					</Row>

					<Row>
						<Col sm={12} style={{marginTop: 10}} >
							 <Card>
						        <CardBody className="customise_card_body" style={{padding: 18}}>
						        	<Row>

						        		<Col sm={12} style={{marginTop: 6}}>
						        			<Col sm={2} style={{ float: 'left'}}>
								          		<label className="checkbox_label">
										       		GST Number
										    	</label>
								            </Col>
								          <Col sm={4} style={{ float: 'left'}}>
								          	<input readOnly = {this.state.input_type} type="text" className={this.state.status  !== "Approval Pending" ? "address_input1" : !this.state.gstNumber ? "address_input1" : "address_input"} defaultValue ={this.state.gstNumber} onInput={this.changeGST} placeholder="Enter GST Number"/>
								          	{(this.state.status !== "Approval Pending" && this.state.gstNumber) ? (
								          		<span style={{color: 'green', fontWeight: 'bold'}}> Verified </span>
								          	):(
								          		<span style={{color: 'red', fontWeight: 'bold'}}> Not Verified </span>
								          	)
								          	}
								          	{
												this.state.error1 &&
												<div style={{width: '100%', textAlign: 'left'}}>
													<span style={{color: 'red', fontSize: 11}}> {this.state.errorMessage} </span>
												</div>	
											}
								          </Col>

								          <Col sm={2} style={{ float: 'left'}}>
								          	<label className="checkbox_label">
										       Company Name
										    </label>
								          </Col>
								           <Col sm={4} style={{ float: 'left'}}>
								          	<input type="text" defaultValue ={this.state.companyName} className="address_input" placeholder="Enter Company Name" readOnly />
								          </Col>
								        </Col>
						        		<Col sm={12} style={{marginTop: 6}}>
						        			 <Col sm={2} style={{ float: 'left'}}>
								          	<label className="checkbox_label">
										       Authorised Signatory
										    </label>
								          </Col>
								          <Col sm={4} style={{float: 'left'}}>
								          	<input type="text" readOnly = {this.state.input_type}  defaultValue ={this.state.first_name} onInput ={e => {this.changeName(e)}}  className="address_input" placeholder="Name" />
								          	{
												this.state.error3 &&
												<div style={{width: '100%', textAlign: 'left'}}>
													<span style={{color: 'red', fontSize: 11}}> {this.state.errorMessage} </span>
     											 </div>	
											}
								          </Col>

								          <Col sm={2} style={{ float: 'left'}}>
								          	<label className="checkbox_label">
										       Mobile No.
										    </label>
								          </Col>

								           <Col sm={4} style={{ float: 'left'}}>
								          	<input type="text"  defaultValue ={this.state.mobileNo} className={this.state.status !== "Approval Pending" ? "address_input1" : "address_input"} placeholder="Mobile No." readOnly/>
								          	{this.state.status !== "Approval Pending" &&
								          		<span style={{color: 'green', fontWeight: 'bold'}}> Verified </span>
								          	}
								          </Col>

								           <Col sm={2} style={{ float: 'left'}}>
								          	<label className="checkbox_label">
										       Administrator Email
										    </label>
								          </Col>

								           <Col sm={4} style={{ float: 'left'}}>
								          	<input type="text"  defaultValue ={this.state.email} className={this.state.status !== "Approval Pending" ? "address_input1" : "address_input"} placeholder="Email Address" readOnly/>
								          	{this.state.status !== "Approval Pending" &&
								          		<span style={{color: 'green', fontWeight: 'bold'}}> Verified </span>
								          	}
								          </Col>
								        </Col>
							        </Row>
						        </CardBody>
						    </Card>
						</Col>
						{ this.state.updateButton && <Col sm={12} style={{marginTop: 5, textAlign: 'center'}}>
				        	<input style={{width: 240}} type="button" onClick={ e=> {this.updateProfileInformation(e) }} value="Update Profile Information" className="login_btn" />
				        </Col>
				    }
					</Row>

					<Row>					

						<Col sm={12} style={{marginTop: 15}}>
							<h4 style={{paddingLeft: 16, fontWeight:'bold', color: '#00619F', fontSize: 19}}> Billing Information </h4>
						</Col>

					</Row>

					<Row>
						<Col sm={12} style={{marginTop: 10}}>
							<Card>

						        <CardBody className="customise_card_body" style={{padding: 18}}>
						        	<Row>
						        		
						        		<Col sm={12} style={{marginTop: 6}}>
						        			<Col sm={2} style={{ float: 'left'}}>
								          	<label className="checkbox_label">
										       Address
										    </label>

								          </Col>

								          <Col sm={4} style={{ float: 'left'}}>
								          	<input readOnly = {this.state.input_type} type="text" onInput={ e => {this.changeBillingAddress(e)}} className="address_input" defaultValue ={this.state.billingaddress} placeholder="Enter Address" />
								          	{
												this.state.error5 &&
												<div style={{width: '100%', textAlign: 'left'}}>
													<span style={{color: 'red', fontSize: 11}}> {this.state.errorMessage} </span>
												</div>	
											}
								          </Col>

								          <Col sm={2} style={{ float: 'left'}}>
								          	<label className="checkbox_label">
										       State
										    </label>
								          </Col>

								           <Col sm={4} style={{ float: 'left'}}>
								           <input  type="text" disabled className="address_input" defaultValue ={this.state.billingstate} placeholder="Enter state" />
								          	{/*<select disabled={this.state.input_type} className="form-control" name="state" value = {this.state.billingstate} onChange={e => {this.changeBillingState(e)} }>
											   <option value={this.state.billingstate} style={{fontWeight: 'bold'}}>{this.state.billingstate}</option>	
											   {this.state.state_options}
											</select>*/}
											{	
												this.state.error9 &&
												<div style={{width: '100%', textAlign: 'left'}}>
													<span style={{color: 'red', fontSize: 11}}> {this.state.errorMessage} </span>
												</div>	
											}
								          </Col>
								        </Col>
						        		<Col sm={12} style={{marginTop: 6}}>
						        			<Col sm={2} style={{ float: 'left'}}>
									          	<label className="checkbox_label">
											       City
											    </label>
								          	</Col>
									        <Col sm={4} style={{float: 'left'}}>
									          	{/*<select disabled={this.state.input_type} className="form-control" name="city" value = {this.state.billingcity} onChange={e => {this.changeBillingCity(e)} }>
												   <option value={this.state.billingcity} id={this.state.billingcityId} style={{fontWeight: 'bold'}}>{this.state.billingcity}</option>	
												   {this.state.cityOption}
												</select>*/}
												 <input  type="text" disabled className="address_input" defaultValue ={this.state.billingcity} placeholder="Enter city" />
												{
												this.state.error10 &&
												<div style={{width: '100%', textAlign: 'left'}}>
													<span style={{color: 'red', fontSize: 11}}> {this.state.errorMessage} </span>
												</div>	
											     }
									        </Col>


									        <Col sm={2} style={{ float: 'left'}}>
									          	<label className="checkbox_label">
											       Pincode
											    </label>
								          	</Col>
									        <Col sm={4} style={{float: 'left'}}>
									          	<input type="text" readOnly = {this.state.input_type} defaultValue ={this.state.billingpincode} onInput={e => {this.changeBillingPincode(e)}} className="address_input" placeholder="Enter Pincode" />
									          	{
												this.state.error6 &&
												<div style={{width: '100%', textAlign: 'left'}}>
													<span style={{color: 'red', fontSize: 11}}> {this.state.errorMessage} </span>
												</div>	
											}
									        </Col>
								        </Col>
							        </Row>
						        </CardBody>
						    </Card>
						</Col>
						{ this.state.updateBillingInformation && <Col sm={12} style={{marginTop: 5, textAlign: 'center'}}>
				        	<input style={{width: 240}} type="button" onClick={ e=> {this.updateBillingInformation(e) }} value="Update Billing Information" className="login_btn" />
				        </Col>
				    }
					</Row>

					<Row>					

						<Col sm={10} style={{marginTop: 15}}>
							<h4 style={{paddingLeft: 16, fontWeight:'bold', color: '#00619F' , fontSize: 19}}> Shipping Information </h4>
						</Col>
						<Col sm={2} style={{marginTop: 15}}>
						<input style={{width: 140}} type="button" onClick={this.Successtoggle} value="Add New Address" className="login_btn" />
						</Col>
					</Row>

					{
						this.state.CustomerDeliveryAddress.map((item, index) =>
					<Row>
						<Col sm={12} style={{marginTop: 10}}>
							<Card>
						        <CardBody className="customise_card_body" style={{padding: 18}}>
						        	<Row>
						        		{this.state.billingaddress == item.add_details ? (
						        		<Col sm={12} style={{marginTop: 6, paddingLeft: 25}}>
						        			<span style={{fontWeight: 'bold'}}>Default Address</span>
						        		</Col>):(
						        		<Col sm={12} style={{marginTop: 6, paddingLeft: 25}}>
						     
						        		</Col>
						        		)
						        		}
						        		{item.approval_status == 2 ? (
						        		<Col sm={12} style={{marginTop: 6, paddingLeft: 25}}>
						        			<span style={{fontWeight: 'bold', color: 'green'}}><i class="fa fa-check" aria-hidden="true" style={{marginRight: 5}}></i>Verified</span>
						        		</Col>):(
						        		<Col sm={12} style={{marginTop: 6, paddingLeft: 25}}>
						        			<span style={{fontWeight: 'bold', color: 'red'}}>Not Verified</span>
						        		</Col>
						        		)
						        		}
						        		<Col sm={12} style={{marginTop: 6}}>
						        			<Col sm={2} style={{ float: 'left'}}>
								          	<label className="checkbox_label">
										       Address
										    </label>
								          </Col>
								          <Col sm={4} style={{ float: 'left'}}>
								          	<input type="text" className="address_input" defaultValue ={item.add_details} placeholder="Enter Address" />
								          </Col>
								          <Col sm={2} style={{ float: 'left'}}>
								          	<label className="checkbox_label">
										       State
										    </label>
								          </Col>
								           <Col sm={4} style={{ float: 'left'}}>
								          	<input className="form-control" name="state" value = {item.add_state_name} onChange={this.changeShippingState} />
								          </Col>
								        </Col>
						        		<Col sm={12} style={{marginTop: 6}}>
						        			<Col sm={2} style={{ float: 'left'}}>
									          	<label className="checkbox_label">
											       City
											    </label>
								          	</Col>
								          	<Col sm={4} style={{float: 'left'}}>
								          		<input className="form-control" name="city" value = {item.add_city_name} onChange={this.changeShippingCity} />
								          	</Col>
								          	<Col sm={2} style={{ float: 'left'}}>
									          	<label className="checkbox_label">
											       Pincode
											    </label>
								          	</Col>
								          	<Col sm={4} style={{float: 'left'}}>
								          		<input type="text"  defaultValue ={item.add_pincode} onChange={this.changeShippingpincode}  className="address_input" placeholder="Enter Pincode" />
								          	</Col>
								        </Col> 
							        </Row>
						        </CardBody>
						      </Card>
						</Col>
						{/* <Col sm={12} style={{marginTop: 30, textAlign: 'center'}}>
				        	<input style={{width: 120}} type="button" onClick={this.updateProfile} value="Update" className="login_btn" />
				        </Col> */}
					</Row>
					)
								        }
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
              		    	<div style={{width: '80%' , float: 'left', textAlign: 'left'}}>
                				<span style={{fontSize: 15, textAlign: 'left' }}> <input type="text" className="form-control set_input"  name="add" onChange={this.handleChange}/>  </span>
                				{
								this.state.showError10 &&
									<div style={{width: '100%', textAlign: 'left'}}>
										<span style={{color: 'red', fontSize: 11}}> Please Enter Address </span>
									</div>	
								}
             				 </div>
             				 <div style={{width: '20%' , float: 'left', textAlign: 'left'}}>
                				<span style={{fontWeight: 'bold', fontSize: 16, textAlign: 'left' }}> State: </span>
              				</div>
               				<div style={{width: '80%' , float: 'left', textAlign: 'left', marginBottom: 12}}>
                				 <input type="text" class="form-control set_input" disabled value={this.state.state_name} name="state"/>
              				</div>
              				<div style={{width: '20%' , float: 'left', textAlign: 'left'}}>
                				<span style={{fontWeight: 'bold', fontSize: 16, textAlign: 'left' }}> City: </span>
              				</div>
               				<div style={{width: '80%' , float: 'left', textAlign: 'left', marginBottom: 12}}>
                				<span style={{fontSize: 15, textAlign: 'left' }}>
                				<select name="city_select" className="form-control"  id="" onChange={this.handleChange}>
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
                			  <Button style={{backgroundColor: 'rgb(0, 114, 188)', fontSize: 14, fontWeight: 'bold', color: '#fff' , height: 32}} className="modal_ok"  onClick={this.Successtoggle}>Cancel</Button>
                				  <Button style={{backgroundColor: 'rgb(0, 114, 188)', fontSize: 14, fontWeight: 'bold', color: '#fff', height: 32, marginLeft: 12}} className="modal_ok"  onClick={this.storedeliveryaddress}>
                  					{this.state.loadingupdatebtn && 
                  					  <i  className="fa fa-refresh fa-spin" style={{ marginRight: "5px" }} />
                  					}  
                  				Submit</Button>
            			</ButtonToolbar>
              		</div>

       			</Modal>
			</div>
		)
	}
}


export default connect(state => ({
	...state.cartDetail
}))(MyProfile)