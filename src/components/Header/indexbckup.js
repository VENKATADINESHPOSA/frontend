import React, { Component } from 'react'
import { Button, Row, Col } from 'reactstrap';
import _ from 'lodash'
import logo from '~/assets/images/logo.svg';
import NodLogo from '~/assets/images/trans_nod_logo.png';
import axios, {CancelToken} from 'axios';
import {connect} from 'react-redux';
import './styles.scss';
import { Redirect } from 'react-router-dom';
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
import {login} from '~/redux/helpers/user'
import {updateUserData} from '~/redux/action/user';
import {updateCartData,addCartData} from '~/redux/action/cartDetails';
import {updateProductData} from '~/redux/action/productDetail';
import {updateCartItemData} from '~/redux/action/cartItemVal';
import { geolocated } from "react-geolocated";
import cookie from 'react-cookies'



let ongoingGetOptionsAPI = null;
let hostname = window.location.hostname;


class Header extends Component {
    
	constructor(props){
		super(props);
		this.openLogin = this.openLogin.bind(this);
		this.openRegister = this.openRegister.bind(this);
		this.openHome = this.openHome.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleClick1 = this.handleClick1.bind(this);
		this.closeContainer = this.closeContainer.bind(this);
		this.goToCart = this.goToCart.bind(this);
		this.goHomePage = this.goHomePage.bind(this);
		this.onLogout = this.onLogout.bind(this);
		this.onHover = this.onHover.bind(this);
		this.getItemData = this.getItemData.bind(this);
		this.getItemData1 = this.getItemData1.bind(this);
		this.onQuantityChange = this.onQuantityChange.bind(this);
		this.onQuantityChange1 = this.onQuantityChange1.bind(this);
		this.closeContainer = this.closeContainer.bind(this);
		this.goToOrderHistory = this.goToOrderHistory.bind(this);
		this.goToMyProfile = this.goToMyProfile.bind(this);
		this.goToRFQHistory = this.goToRFQHistory.bind(this);
	    this.conditional_rendering = this.conditional_rendering.bind(this);
	    this.logoRedirection = this.logoRedirection.bind(this);
		
		this.state = {
			error: "",
			showTypeahead: false,
			typeaheadText: props.typeaheadText ? props.typeaheadText : '',
			total_data: '',
			login_details: '',
			login_values: '',
			login_values1: false,
			goToLogin: false,
			goToProduct: false,
			goToHome: false,
			suggestions: [],
			count: "3",
			description:[],
			data: [],
			inputVal: '',
			itemName: '',
			category:'',
			subCategory: '',
			itemCode: '',
			auth: '',
			universal_code: '',
			recommendation: false,
			quantity:'1',
			quantity1: '1',
			cart_num: '',
			locationUrl: '',
			cart_withoutLogin: false,
			nod_hover_pannel: false,
			zwz_hover_pannel: false,
			zwz_search_pannel: false,
			nod_search_pannel: false,
			hover_nod_data: [],
			nod_item_name: '',
			latitude: '',
        	longitude: '',
        	userId: '',
        	no_cart_data:'0',
		    home_href_text : '',
			rfq_href_text : '',
			about_href_text : '',
			myorder_href_text : '',
			products_href_text : '',
			cart_link: '',
			header_link_flag : ''
		}
	}
	componentDidMount(){
		this.setState({
			header_link_flag : localStorage.getItem("header_link"),
		})
		this.conditional_rendering();
	}

	logoRedirection(){
		this.props.history.push('/home')
	}
	
	componentWillMount(){
		console.log("path" + this.props.match.path);
		this.getMyLocation();
		

		var login_detail_type = window.sessionStorage.getItem("login_type");
		console.log(this.props.username);
		console.log( "checkLoginWith" + this.props.isLoggedIn);
		console.log( "checkLoginWithout" + this.state.cart_withoutLogin);
		/*console.log(this.props.cartItemVal.cartItemVal);*/
		console.log( "values" +this.props.cartItemVal);
		document.addEventListener('mousedown', this.hideTypeahead, false)


		/*if (login_detail_type) {
			this.setState({
				locationUrl: true
			})
			console.log("fygjgkjhkjlhkljk");
		} else if (!login_detail_type) {

			this.setState({
				locationUrl: false
			})
			console.log("fygjgkjhkjlhkljk");

		}*/



		/*if (window.location.href=== 'http://zwz.prtouch.com:8081/' || window.location.href === "http://localhost:3000/" ) {
			this.setState({
				locationUrl: false,
			})
			console.log('zwz');

		}

		else if (window.location.href=== 'http://nod.prtouch.com:8081/') {
			this.setState({
				locationUrl: true,
			})
			console.log('nod');

			
		} else if (window.location.href === 'http://nod.prtouch.com:8081/login#' || window.location.href === 'http://nod.prtouch.com:8081/login') {
			this.setState({
				locationUrl: true,
			})
			console.log('nod');
		}else if (window.location.href === 'http://zwz.prtouch.com:8081/home' || window.location.href==="http://localhost:3000/home#" ) {
			this.setState({
				locationUrl: false,
			})
			console.log('nod');
		}else if (window.location.href === 'http://nod.prtouch.com:8081/home') {
			this.setState({
				locationUrl: true,
			})
			console.log('nod');
		}else if (window.location.href === 'http://zwz.prtouch.com:8081/product-category' || window.location.href === 'http://localhost:3000/product-category') {
			this.setState({
				locationUrl: false,
			})
			console.log('nod');
		}else if (window.location.href === 'http://nod.prtouch.com:8081/product-category') {
			this.setState({
				locationUrl: true,
			})
			console.log('nod');
		}else if (window.location.href === 'http://nod.prtouch.com:8081/cart') {
			this.setState({
				locationUrl: true,
			})
			console.log('nod');
		}*/



		if (window.location.hostname==="zwz.prtouch.com") {
			this.setState({
				locationUrl: false
			})
		}else if (window.location.hostname==="nod.prtouch.com") {
			this.setState({
				locationUrl: true
			})
		} else{

			this.setState({
				locationUrl: false
			})

		}

		console.log("location_url");

		if (!this.props.isLoggedIn && this.props.cart.length > 0) {
			this.setState({
				cart_withoutLogin: true,
			})
		}

		this.setState({
			login_details: sessionStorage.getItem('username'),
			login_values: sessionStorage.getItem('isLoggedInVal'),
			auth: sessionStorage.getItem('auth_key'),
			cart_num: localStorage.getItem('num_cart_data'),

		})

		console.log(this.state.cart_num);

		this.getCartData();

		
		
	}
	
	openRegister(){
		
		this.props.history.push('/signup')
		window.location.reload();
		
	}


	async getCartData(){

		if (window.location.href === "http://zwz.prtouch.com:8081/cart" || 
			hostname === "zwz.prtouch.com" || hostname === "localhost" ||
			
			window.location.href === "http://zwz.prtouch.com:8081/home" || 
			window.location.href === "http://zwz.prtouch.com:8081/product-category" || 
			window.location.href==="http://zwz.prtouch.com:8081/rfq" || 
			window.location.href==="http://zwz.prtouch.com:8081/order-detail" || 
			window.location.href==="http://zwz.prtouch.com:8081/rfq-history" || 
			window.location.href.indexOf("http://localhost:3000/rfq" > -1) ||
			window.location.href.indexOf("http://localhost:3000/cart") > -1 || 
			window.location.href.indexOf("http://localhost:3000/home") > -1 ||
			window.location.href.indexOf("http://localhost:3000/order") > -1 ||
			window.location.href.indexOf("http://localhost:3000/product-category") > -1)  {

		axios.get('http://apizwz.prtouch.com/api/display_additem/' , 

		{
		 	 headers: {
          	'Authorization' : 'Token ' + sessionStorage.getItem('auth_key')
        	} 

		 }
		 

		 )
	    .then((response) =>  {
	    	this.setState({
	    		added_item: response.data.itemdetails,
	    		no_cart_data: response.data.itemdetails.length,
	    	})

	    	/*this.props.dispatch(updateProductData({
				cart: response.data.itemdetails.length,
			}))*/
			
			
			this.props.dispatch(updateCartItemData(response.data.itemdetails.length))
	    	localStorage.setItem('num_cart_data' , response.data.itemdetails.length);
	    })
	    .catch(function (error) {
	      
	      
	    });
		} else if (window.location.href === "http://nod.prtouch.com:8081/cart" || hostname === "nod.prtouch.com" || window.location.href === "http://nod.prtouch.com:8081/home" || window.location.href === "http://nod.prtouch.com:8081/product-category"   || window.location.href === "http://nod.prtouch.com:8081/order-detail" || window.location.href === "http://nod.prtouch.com:8081/rfq" || window.location.href === "http://nod.prtouch.com:8081/order-history" || window.location.href === "http://nod.prtouch.com:8081/rfq-history"  ) {


			axios.get('http://apinod.prtouch.com/api/display_additem/' , 

		{
		 	 headers: {
          	'Authorization' : 'Token ' + sessionStorage.getItem('auth_key')
        	} 

		 }
		 

		 )
	    .then((response) =>  {

	    	
	    	this.setState({
	    		added_item: response.data.itemdetails,
	    		no_cart_data: response.data.itemdetails.length,
	    	})

	    	/*this.props.dispatch(updateProductData({
				cart: response.data.itemdetails.length,
			}))*/
			

			this.props.dispatch(updateCartItemData(response.data.itemdetails.length))

            console.log(this.props.cartItemVal);

	    	

	    	localStorage.setItem('num_cart_data' , response.data.itemdetails.length);
	    	console.log(localStorage.getItem('num_cart_data'))
	    	
	    	

	    	
	    })
	    .catch(function (error) {
	      
	      
	    });

		}


	}




	componentWillUnmount(){
		document.removeEventListener('mousedown', this.hideTypeahead, false);
		localStorage.setItem('num_cart_data' , this.state.no_cart_data);
	}


	openLogin(){
		console.log('jhjkjk')
		/*this.setState({
			goToLogin: true
		})*/

		/*window.location.reload();*/
		
		/*window.location.href="/login"*/


		/*window.location.reload();*/
		this.props.history.push('/login');
		
	}

	closeContainer(){
		this.setState({
			showTypeahead: false
		})
	}

	goHomePage(){
		/*window.location.href="/home"*/
		this.props.history.push('/home');
	}

	goToRFQHistory(){
		/*this.props.history.push('/rfq-history');*/

		if (this.props.match.path == "/") {
			window.location.href="/login"

		}else{
			window.location.href="/rfq-history"
		}
		
	}

	goToOrderHistory(){
		if (this.props.match.path == "/") {
			window.location.href="/login"

		}else{
			window.location.href="/order-history"
		}
		
	}

	goToMyProfile(){
		window.location.href="/my-profile"
	}



	openHome(){
		console.log('jhjkjk')
		this.setState({
			goToHome: true
		})
		
	}

	closeContainer(){
		this.setState({
			showTypeahead: false
		})

	}


	getMyLocation = (e) => {
		let location = null;
		let latitude = null;
		let longitude = null;
		if (window.navigator && window.navigator.geolocation) {
		    location = window.navigator.geolocation
		}
		if (location){
		    location.getCurrentPosition(function (position) {
		        latitude = position.coords.latitude;
		        longitude= position.coords.longitude;
		        console.log(latitude);
		        console.log(longitude);
		    })
		}
		    this.setState({latitude: latitude, longitude: longitude})

	}

	onHover(productVal, itemName){

		this.setState({
	      error: '',
	      showTypeahead: true

	    });

	    if (window.location.href === "http://zwz.prtouch.com:8081/login#" || hostname === "zwz.prtouch.com" || hostname === "localhost" || window.location.href === "http://zwz.prtouch.com:8081/" || window.location.href === "http://zwz.prtouch.com:8081/home" || window.location.href === "http://zwz.prtouch.com:8081/product-category" || window.location.href === "http://zwz.prtouch.com:8081/product-category" || window.location.href === "http://zwz.prtouch.com:8081/cart" || window.location.href === "http://localhost:3000/home#" || window.location.href === "http://localhost:3000/login#"  || window.location.href === "http://localhost:3000" || window.location.href === "http://localhost:3000/login" || window.location.href === "http://localhost:3000/product-category" ||  window.location.href === "http://localhost:3000/cart" || window.location.href==="http://zwz.prtouch.com:8081/rfq" || window.location.href==="http://zwz.prtouch.com:8081/order-history" || window.location.href==="http://zwz.prtouch.com:8081/order-detail" ||window.location.href === "http://zwz.prtouch.com:8081/rfq-history" ) {
	    	this.setState({
				zwz_hover_pannel: true
	    	})

	    axios.post('http://apizwz.prtouch.com/api/display_product/', {
	    	item_id: productVal,
	    	flag: "false"
	    })
	    .then((response) =>  {
	    	console.log(response);
	    	

	    	sessionStorage.setItem('product_data', JSON.stringify(response.data))

	    	var ProductData = sessionStorage.getItem('product_data');
	    	console.log(JSON.parse(ProductData));
	    	var ProductDataValue = JSON.parse(ProductData);
	    	console.log(ProductData);
	    	if (response.data.success === true) {

	    		this.setState({
	    			quantity: 1,
	    			quantity1: 1,
	    			itemName: ProductDataValue.itemname[0],
	    			category: ProductDataValue.catname[0],
	    			subCategory: ProductDataValue.cattype[0],
	    			itemCode: ProductDataValue.itemcode[0],
	    			recommendation: true
	    		})

	    		console.log(this.state.recommendation);
	    		
	    		
	    		
	    		
	    		
	    	}

	    })
	    .catch(function (error) {
	      
	      
	    });

		}else if (window.location.href === "http://nod.prtouch.com:8081/login#" || hostname === "nod.prtouch.com" || window.location.href === "http://localhost:3000/"  || window.location.href === "http://nod.prtouch.com:8081/" || window.location.href === "http://nod.prtouch.com:8081/home" || window.location.href === "http://nod.prtouch.com:8081/product-category" || window.location.href === "http://nod.prtouch.com:8081/product-category" || window.location.href === "http://nod.prtouch.com:8081/cart" || window.location.href==="http://nod.prtouch.com:8081/rfq" || window.location.href==="http://nod.prtouch.com:8081/order-history" || window.location.href==="http://nod.prtouch.com:8081/order-detail" || window.location.href === "http://nod.prtouch.com:8081/rfq-history" ) {

			this.setState({
				nod_hover_pannel: true
			})

	    axios.post('http://apinod.prtouch.com/api/display_product/', {
	    	/*searching_key: itemName*/
	    	item_name: itemName,
	    	flag: "false"
	    })
	    .then((response) =>  {
	    	console.log(response);
	    	

	    	sessionStorage.setItem('product_data', JSON.stringify(response.data))
	    	/*var arrayCartData= response.data.description.filter(item => item.Item_Name == itemName); 
	    	console.log(arrayCartData[0].data_details);*/

	    	var arrayCartData = response.data.data_list.description
	    	console.log(arrayCartData);

	    	var ProductData = sessionStorage.getItem('product_data');
	    	console.log(JSON.parse(ProductData));
	    	var ProductDataValue = JSON.parse(ProductData);
	    	console.log(ProductData);
	    	if (response.data.success === true) {

	    		this.setState({
	    			quantity: 1,
	    			/*hover_nod_data: arrayCartData[0].data_details,*/
	    			hover_nod_data: arrayCartData.map(item => ({...item, quantity: 1})),
	    			recommendation: true,
	    			nod_item_name: arrayCartData[0].Item_Name
	    		})

	    		console.log(this.state.hover_nod_data);
	    		
	    		/*window.location.reload();*/
	    		
	    		
	    		
	    	}

	    })
	    .catch(function (error) {
	      
	      
	    });

		} 

	}

	onLogout(){

		if (hostname === "zwz.prtouch.com" || hostname === "localhost") {

		 axios.post('http://apizwz.prtouch.com/authentication/user/logout/' , 

		 {
		 	
		 	"user": this.state.login_details
		 },{
		 	 headers: {
          	'Authorization' : 'Token ' + sessionStorage.getItem('auth_key')
        	} 

		 }
		 

		 )
	    .then((response) =>  {

	    	console.log(response);
	    	if (response.data.success === true) {
	    		localStorage.setItem("header_link",false);
	    		sessionStorage.removeItem('auth_key');
	    		/*sessionStorage.removeItem('username');*/
	    		this.setState({
	    			login_values1: true,
	    			login_details: ""
	    		})
	    		/*this.props.history.push('/login')*/

	    		window.location.href = "/login"

	    		/*window.location.reload();*/
	    		

	    		console.log(this.state.login_values);
	    		
	    	}
	    })
	    .catch(function (error) {
	      
	      
	    });

		}else if (hostname === "nod.prtouch.com") {

			axios.post('http://apinod.prtouch.com/authentication/user/logout/' , 

		 {
		 	
		 	"user": this.state.login_details
		 },{
		 	 headers: {
          	'Authorization' : 'Token ' + sessionStorage.getItem('auth_key')
        	} 

		 }
		 

		 )
	    .then((response) =>  {

	    	console.log(response);
	    	if (response.data.success === true) {
	    		localStorage.setItem("header_link",false);
	    		sessionStorage.removeItem('auth_key');
	    		/*sessionStorage.removeItem('username');*/
	    		this.setState({
	    			login_values1: true,
	    		})
	    		this.props.history.push('/login')

	    		/*window.location.reload();*/
	    		

	    		console.log(this.state.login_values);
	    		
	    	}
	    })
	    .catch(function (error) {
	      
	      
	    });
		}

	}


	handleClick1(productName){
		this.setState({
	      error: ''
	    });

	    sessionStorage.setItem('nod_product_name', productName);

	    axios.post('http://apinod.prtouch.com/api/item_availability/', {
	    	searching_key: productName
	    })
	    .then((response) =>  {
	    	console.log(response);
	    	sessionStorage.setItem('nod_product_data', JSON.stringify(response.data.data_list.description));

	    	if (response.data.success === true) {
	    		console.log("response true");
	    		if (this.props.match.path === "/product-category") {
	    			window.location.reload();
	    		} else{
	    			this.props.history.push('/product-category');	
	    		}

	    	}
	    	

	    	/*sessionStorage.setItem('product_data', JSON.stringify(response.data))

	    	var ProductData = sessionStorage.getItem('product_data');
	    	console.log(JSON.parse(ProductData));
	    	console.log(ProductData);*/
	    	/*if (response.data.success === true) {

	    		this.props.dispatch(updateProductData({
					product: ProductData
				}))

				console.log(this.props.product);
	    		
	    		
	    		
	    		if (this.props.match.path === "/product-category") {
	    			window.location.reload();
	    		} else{
	    			this.props.history.push('/product-category');	
	    		}
	    		
	    	}*/

	    })
	    .catch(function (error) {
	      
	      
	    });


	}




	handleClick(productValue){
	    this.setState({
	      error: ''
	    });
	     console.log(productValue);
	     sessionStorage.setItem('product-val', productValue)

	    if (window.location.href === "http://zwz.prtouch.com:8081/login#"  || hostname==="localhost" || hostname === "zwz.prtouch.com" || window.location.href === "http://zwz.prtouch.com:8081/" || window.location.href === "http://zwz.prtouch.com:8081/home" || window.location.href === "http://zwz.prtouch.com:8081/product-category" || window.location.href === "http://zwz.prtouch.com:8081/product-category" || window.location.href === "http://zwz.prtouch.com:8081/cart" || window.location.href === "http://localhost:3000/home#" || window.location.href === "http://localhost:3000/login#"  || window.location.href === "http://localhost:3000" || window.location.href === "http://localhost:3000/login" || window.location.href === "http://localhost:3000/product-category" ||  window.location.href === "http://localhost:3000/cart" || window.location.href==="http://zwz.prtouch.com:8081/rfq" || window.location.href==="http://zwz.prtouch.com:8081/order-history" || window.location.href==="http://zwz.prtouch.com:8081/order-detail" ) {

	    axios.post('http://apizwz.prtouch.com/api/display_product/', {
	    	item_id: productValue,
	    	flag: "true"
	    })
	    .then((response) =>  {
	    	console.log(response);
	    	

	    	sessionStorage.setItem('product_data', JSON.stringify(response.data))

	    	var ProductData = sessionStorage.getItem('product_data');
	    	console.log(JSON.parse(ProductData));
	    	console.log(ProductData);
	    	if (response.data.success === true) {

	    		this.props.dispatch(updateProductData({
					product: ProductData
				}))

				console.log(this.props.product);
	    		
	    		
	    		
	    		if (this.props.match.path === "/product-category") {
	    			window.location.reload();
	    		} else{
	    			this.props.history.push('/product-category');	
	    		}
	    		
	    	}

	    })
	    .catch(function (error) {
	      
	      
	    });

		} else if (window.location.href === "http://nod.prtouch.com:8081/login#" || hostname === "nod.prtouch.com" || window.location.href === "http://nod.prtouch.com:8081/" || window.location.href === "http://nod.prtouch.com:8081/home" || window.location.href === "http://nod.prtouch.com:8081/product-category" || window.location.href === "http://nod.prtouch.com:8081/product-category" || window.location.href === "http://nod.prtouch.com:8081/cart" || window.location.href==="http://nod.prtouch.com:8081/rfq" || window.location.href==="http://nod.prtouch.com:8081/order-history" || window.location.href==="http://nod.prtouch.com:8081/order-detail" || window.location.href==="http://localhost:3000/rfq" || window.location.href==="http://localhost:3000/order-history" || window.location.href==="http://localhost:3000/order-detail" ) {

	    axios.post('http://apinod.prtouch.com/api/display_product/', {
	    	item_id: productValue,
	    	flag: "true"
	    })
	    .then((response) =>  {
	    	console.log(response);
	    	

	    	sessionStorage.setItem('product_data', JSON.stringify(response.data))

	    	var ProductData = sessionStorage.getItem('product_data');
	    	console.log(JSON.parse(ProductData));
	    	console.log(ProductData);
	    	if (response.data.success === true) {

	    		this.props.dispatch(updateProductData({
					product: ProductData
				}))

				console.log(this.props.product);
	    		
	    		
	    		
	    		if (this.props.match.path === "/product-category") {
	    			window.location.reload();
	    		} else{
	    			this.props.history.push('/product-category');	
	    		}
	    		
	    	}

	    })
	    .catch(function (error) {
	      
	      
	    });

		}




		



	}

	goToCart(){
		this.props.history.push('/cart');
	}



	showTypeahead = (e) => {
		this.setState({ showTypeahead: true,
						 typeaheadText: e.target.value

		 })


		if (window.location.href === "http://zwz.prtouch.com:8081/login#" || hostname === "localhost" || hostname === "zwz.prtouch.com" || window.location.href === "http://zwz.prtouch.com:8081/" || window.location.href === "http://zwz.prtouch.com:8081/home" ||  window.location.href === "http://zwz.prtouch.com:8081/home#" || window.location.href === "http://zwz.prtouch.com:8081/product-category" || window.location.href === "http://zwz.prtouch.com:8081/product-category" || window.location.href === "http://zwz.prtouch.com:8081/cart" || window.location.href === "http://localhost:3000/home#" || window.location.href === "http://localhost:3000/login#"  || window.location.href === "http://localhost:3000/login" || window.location.href === "http://localhost:3000/product-category" ||  window.location.href === "http://localhost:3000/cart" || window.location.href==="http://zwz.prtouch.com:8081/rfq" || window.location.href==="http://zwz.prtouch.com:8081/order-history" || window.location.href==="http://zwz.prtouch.com:8081/order-detail" || window.location.href ==="http://zwz.prtouch.com:8081/rfq-history" ) {
			this.setState({
				zwz_search_pannel: true
			})

	    var ref = this;
	    ref.setState({
	      error: ''
	    });

	    if (e.target.value != 0) {

	    axios.post('http://apizwz.prtouch.com/api/search_product/', {
	    	searching_key: e.target.value
	        

	    })
	    .then(function (response) {
	    	console.log(response);
	    	if (response.data.data.length === 0) {
	    		ref.setState({
	    		suggestions: [],
	    		total_data: 0,
	    		data: response.data.data,

	    		

	    	})

	    		console.log(this.state.data)

	    	} else{
	    		ref.setState({
	    		data: response.data.data,
	    		suggestions: response.data.description,
	    		itemName: response.data.description[0].Item_Name,
	    		total_data: response.data.total_search_count,

	    		

	    	})
	    		console.log(this.state.itemName);
	    		console.log(this.state.total_data);

	    	}
	    	

	    	console.log(ref.state.suggestions);

	    })
	    .catch(function (error) {
	      
	      
	    });

	    } else{
	    	this.setState({
	    		suggestions: []
	    	})
	    }

		} else if ( window.location.href === "http://localhost:3000/" || hostname === "nod.prtouch.com" || window.location.href==="http://localhost:3000/home" ||  window.location.href === "http://nod.prtouch.com:8081/login#" ||  window.location.href === "http://nod.prtouch.com:8081/" || window.location.href === "http://nod.prtouch.com:8081/home" || window.location.href === "http://nod.prtouch.com:8081/product-category" || window.location.href === "http://nod.prtouch.com:8081/product-category" || window.location.href === "http://nod.prtouch.com:8081/cart" || window.location.href==="http://nod.prtouch.com:8081/rfq" || window.location.href==="http://nod.prtouch.com:8081/order-history" || window.location.href==="http://nod.prtouch.com:8081/order-detail" || window.location.href==="http://localhost:3000/rfq" || window.location.href==="http://localhost:3000/order-history" ||  window.location.href==="http://localhost:3000/order-detail" || window.location.href ==="http://nod.prtouch.com:8081/rfq-history" ) {


			this.setState({
				nod_search_pannel: true,
			})

	    var ref = this;
	    ref.setState({
	      error: ''
	    });

	    if (ongoingGetOptionsAPI) {
	    	ongoingGetOptionsAPI();
	    }

	    if (e.target.value != 0) {

	    /*axios.post('http://apinod.prtouch.com/api/search_product/', {
	    	searching_key: e.target.value
	        

	    },

	    cancelToken: new CancelToken(function (cancel) {
		ongoingGetOptionsAPI = cancel
		})
	    )*/

	    axios({
			url: 'http://apinod.prtouch.com/api/search_product/',
			method: 'POST',
			data:{
				searching_key: e.target.value
			},
			cancelToken: new CancelToken(function (cancel) {
			ongoingGetOptionsAPI = cancel
			})
			})

	    .then(function (response) {
	    	console.log(response);
	    	if (response.data.description.length === 0) {
	    		ref.setState({
	    		suggestions: [],
	    		total_data: 0,
	    		data: response.data.description,

	    		

	    	})

	    		console.log(this.state.data)

	    	} else{
	    		ref.setState({
	    		data: response.data.description,
	    		suggestions: response.data.description,
	    		itemName: response.data.description[0].Item_Name,
	    		total_data: response.data.total_search_count,

	    		

	    	})
	    		console.log(this.state.suggestions);
	    		console.log(this.state.total_data);

	    	}

	    	

	    	console.log(ref.state.suggestions);

	    })
	    .catch(function (error) {
	      
	      
	    });



	    } else{
	    	this.setState({
	    		suggestions: []
	    	})
	    }

		}

	}

	onQuantityChange1(index, value ){
		/* var newState = {};
	    newState[e.target.name] = e.target.value;
	    this.setState(newState);*/
	    /* var this.state.hover_nod_data

	    this.setState({
	    	quantity: e.target.value
	    })*/

	    /*this.setState({
	    	hover_nod_data: [
		    	 ...this.state.hover_nod_data, 
		    	 [index]: value 	
	    	 ] 
	    })*/

	    let { hover_nod_data } = this.state
		hover_nod_data[index].quantity = value
		this.setState({
		hover_nod_data,
		quantity1: this.state.hover_nod_data[0].quantity

		})

		console.log(hover_nod_data);
	}

	onQuantityChange(e){
		/* var newState = {};
	    newState[e.target.name] = e.target.value;
	    this.setState(newState);*/

	    this.setState({
	    	quantity: e.target.value
	    })

	}

	async getItemData(){
		console.log('Error Message');
		var ProductData = sessionStorage.getItem('product_data');
		var ProductData1 = JSON.parse(ProductData)
		var price = parseInt(ProductData1.price[0]);
		var quantity = parseInt(this.state.quantity);
		var amount = price * quantity;
		console.log(amount);


		/*var new_quantity = parseInt(this.state.quantity);
		let itemExist = _.find(this.props.cart, item => item.itemcode[0] === ProductData1.itemcode[0])

		if(itemExist) {
			this.props.dispatch(updateCartData({
				...itemExist,
				Quantity: parseInt(itemExist.Quantity) + parseInt(new_quantity),
				Amount:  (parseInt(itemExist.Quantity) + parseInt(new_quantity)) * amount
			}))
		} else {
			this.props.dispatch(addCartData({
				...ProductData1,
				Quantity: this.state.quantity,
				Amount: amount
			}))
		}

		this.props.history.push('/cart');
		this.setState({
			showTypeahead: false,
			quantity: '',
			
		})*/

		if (window.location.href === "http://zwz.prtouch.com:8081/login#" || hostname === "localhost" || hostname === "zwz.prtouch.com" || window.location.href === "http://zwz.prtouch.com:8081/" || window.location.href === "http://zwz.prtouch.com:8081/home" || window.location.href === "http://zwz.prtouch.com:8081/product-category" || window.location.href === "http://zwz.prtouch.com:8081/product-category" || window.location.href === "http://zwz.prtouch.com:8081/cart" || window.location.href === "http://localhost:3000/home#" || window.location.href === "http://localhost:3000/login#"  || window.location.href === "http://localhost:3000" || window.location.href === "http://localhost:3000/login" || window.location.href === "http://localhost:3000/product-category" ||  window.location.href === "http://localhost:3000/cart" || window.location.href === "http://zwz.prtouch.com:8081/rfq" || window.location.href === "http://zwz.prtouch.com:8081/order-history" ) {

		if (this.props.isLoggedIn) {

		var arr = [];
		var orderData = {};

			orderData['item_id'] = ProductData1.itemid[0].toString();
		    orderData['item_name'] = ProductData1.itemname[0];
		    orderData['amount_per_unit'] = ProductData1.price[0];
		    orderData['quantity'] = this.state.quantity.toString();
		    orderData['flag'] = "add_cart";

		    arr.push(orderData);


		axios.post('http://apizwz.prtouch.com/api/add_item/' , 

		 {
		 	
		 	"item_info": arr
		 },{
		 	 headers: {
          	'Authorization' : 'Token ' + sessionStorage.getItem('auth_key')
        	} 

		 }
		 

		 )
	    .then((response) =>  {

	    	console.log(response);
	    	this.setState({
	    		showTypeahead: false,
	    	})
	    	this.props.history.push('/cart');
	    	/*if (window.location.href === 'http://nod.prtouch.com:8081/cart' || window.location.href === 'http://zwz.prtouch.com:8081/cart' ){
	    			window.location.reload();
	    	}*/
	    	/*window.location.reload();*/

	    	if(this.props.match.path == "/cart"){
	    		window.location.reload();
	    	}
	    	
	    })
	    .catch(function (error) {
	      
	      
	    });


		} else{
	/*		var new_quantity = parseInt(this.state.quantity);
		let itemExist = _.find(this.props.cart, item => item.itemcode[0] === ProductData1.itemcode[0])

		if(itemExist) {
			this.props.dispatch(updateCartData({
				...itemExist,
				Quantity: parseInt(itemExist.Quantity) + parseInt(new_quantity),
				Amount:  (parseInt(itemExist.Quantity) + parseInt(new_quantity)) * amount
			}))
		} else {
			this.props.dispatch(addCartData({
				...ProductData1,
				Quantity: this.state.quantity,
				Amount: amount
			}))
		}
			this.setState({
				showTypeahead: false
			})
			this.props.history.push('/cart');*/

			var ProductData = sessionStorage.getItem('product_data');
		var ProductData1 = JSON.parse(ProductData)
		var price = parseInt(ProductData1.price);
		var quantity = parseInt(this.state.quantity);
		var amount = price * quantity;
		console.log(amount);


		var new_quantity = parseInt(this.state.quantity);
		let itemExist = _.find(this.props.cart, item => item.itemcode === ProductData1.itemcode)

		if(itemExist) {
			this.props.dispatch(updateCartData({
				...itemExist,
				Quantity: parseInt(itemExist.Quantity) + parseInt(new_quantity),
				Amount:  (parseInt(itemExist.Quantity) + parseInt(new_quantity)) * amount
			}))
		} else {
			this.props.dispatch(addCartData({
				...ProductData1,
				Quantity: this.state.quantity,
				Amount: amount
			}))
		}

		
		this.setState({
			showTypeahead: false,
			quantity: '',
			
		})
		this.props.history.push('/cart');
		}
		}else if (window.location.href === "http://nod.prtouch.com:8081/login#" || hostname === "nod.prtouch.com" || window.location.href === "http://nod.prtouch.com:8081/" || window.location.href === "http://nod.prtouch.com:8081/home" || window.location.href === "http://nod.prtouch.com:8081/product-category" || window.location.href === "http://nod.prtouch.com:8081/product-category" || window.location.href === "http://nod.prtouch.com:8081/cart" || window.location.href === "http://nod.prtouch.com:8081/rfq" || window.location.href === "http://nod.prtouch.com:8081/order-history" || window.location.href==="http://localhost:3000/rfq" || window.location.href==="http://localhost:3000/order-history" ) {

		if (this.props.isLoggedIn) {

		var arr = [];
		var orderData = {};

			orderData['item_id'] = ProductData1.itemid[0].toString();
		    orderData['item_name'] = ProductData1.itemname[0];
		    orderData['amount_per_unit'] = ProductData1.price[0];
		    orderData['quantity'] = this.state.quantity.toString();

		    arr.push(orderData);


		axios.post('http://apinod.prtouch.com/api/add_item/' , 

		 {
		 	
		 	"item_info": arr
		 },{
		 	 headers: {
          	'Authorization' : 'Token ' + sessionStorage.getItem('auth_key')
        	} 

		 }
		 

		 )
	    .then((response) =>  {

	    	console.log(response);
	    	this.setState({
	    		showTypeahead: false,
	    	})
	    	this.props.history.push('/cart');
	    	if (window.location.href === 'http://nod.prtouch.com:8081/cart' || window.location.href === 'http://zwz.prtouch.com:8081/cart' ){
	    			window.location.reload();
	    	}
	    	/*window.location.reload();*/
	    	
	    })
	    .catch(function (error) {
	      
	      
	    });


		} else{
	/*		var new_quantity = parseInt(this.state.quantity);
		let itemExist = _.find(this.props.cart, item => item.itemcode[0] === ProductData1.itemcode[0])

		if(itemExist) {
			this.props.dispatch(updateCartData({
				...itemExist,
				Quantity: parseInt(itemExist.Quantity) + parseInt(new_quantity),
				Amount:  (parseInt(itemExist.Quantity) + parseInt(new_quantity)) * amount
			}))
		} else {
			this.props.dispatch(addCartData({
				...ProductData1,
				Quantity: this.state.quantity,
				Amount: amount
			}))
		}
			this.setState({
				showTypeahead: false
			})
			this.props.history.push('/cart');*/

		var ProductData = sessionStorage.getItem('product_data');
		var ProductData1 = JSON.parse(ProductData)
		var price = parseInt(ProductData1.price);
		var quantity = parseInt(this.state.quantity);
		var amount = price * quantity;
		console.log(amount);


		var new_quantity = parseInt(this.state.quantity);
		let itemExist = _.find(this.props.cart, item => item.itemcode === ProductData1.itemcode)

		if(itemExist) {
			this.props.dispatch(updateCartData({
				...itemExist,
				Quantity: parseInt(itemExist.Quantity) + parseInt(new_quantity),
				Amount:  (parseInt(itemExist.Quantity) + parseInt(new_quantity)) * amount
			}))
		} else {
			this.props.dispatch(addCartData({
				...ProductData1,
				Quantity: this.state.quantity,
				Amount: amount
			}))
		}

		this.props.history.push('/cart');
		this.setState({
			showTypeahead: false,
			quantity: '',
			
		})
		}
		}


	}


	async getItemData1(itemId, itemName, Price, itemData){
		var nod_product_name = sessionStorage.getItem('nod_product_name');
		var nod_product_data = sessionStorage.getItem('nod_product_data');
		var nod_selected_data = JSON.parse(nod_product_data);
		

		/*var ProductData1 = JSON.parse(ProductData)
		console.log(ProductData1);
		console.log(ProductData1.itemid[0])*/
		var price = parseInt(Price);
		var quantity = 10;
		var amount = price * quantity;
		console.log(amount);
		console.log(this.props.isLoggedIn)
		console.log(itemId);
		console.log(itemName);
		console.log(Price);
		console.log(itemData);



		 if ( window.location.href === "http://nod.prtouch.com:8081/login#" || hostname === "nod.prtouch.com" ||  window.location.href === "http://nod.prtouch.com:8081/" || window.location.href === "http://nod.prtouch.com:8081/home" || window.location.href === "http://nod.prtouch.com:8081/product-category" || window.location.href === "http://nod.prtouch.com:8081/product-category" || window.location.href === "http://nod.prtouch.com:8081/cart"  || window.location.href==="http://localhost:3000/" || window.location.href === "http://nod.prtouch.com:8081/rfq" || window.location.href === "http://nod.prtouch.com:8081/order-history" ) {

		if (this.props.isLoggedIn) {

		var arr = [];
		var orderData = {};

			orderData['item_id'] = itemId.toString();
		    orderData['item_name'] = itemName;
		    orderData['amount_per_unit'] = Price;
		    orderData['quantity'] = this.state.quantity1;

		    arr.push(orderData);


		axios.post('http://apinod.prtouch.com/api/add_item/' , 

		 {
		 	
		 	"item_info": arr
		 },{
		 	 headers: {
          	'Authorization' : 'Token ' + sessionStorage.getItem('auth_key')
        	} 

		 }
		 

		 )
	    .then((response) =>  {

	    	console.log(response);
	    	this.setState({
	    		showTypeahead: false
	    	})
	    	this.props.history.push('/cart');
	    	/*window.location.reload();*/
	    	
	    })
	    .catch(function (error) {
	      
	      
	    });


		} else{
			var new_quantity = 2;
		let itemExist = _.find(this.props.cart, item => item.itemcode === itemData.itemcode)

		if(itemExist) {
			this.props.dispatch(updateCartData({
				...itemExist,
				Quantity: parseInt(itemExist.Quantity) + parseInt(new_quantity),
				Amount:  (parseInt(itemExist.Quantity) + parseInt(new_quantity)) * amount
			}))
		} else {
			console.log(this.state.hover_nod_data[0].quantity);
			this.props.dispatch(addCartData({
				...itemData,
				Quantity: this.state.quantity1,
				Amount: amount
			}))
		}
			this.setState({
	    		showTypeahead: false
	    	})
			this.props.history.push('/cart');
		}

		}





	}




	hideTypeahead = (e) => {
		if(this.state.showTypeahead){
			if(!this.typeahead.contains(e.target)){
				this.setState({ showTypeahead: false })
			}
		}
	}
	conditional_rendering(){
		console.log("LOGIN DETAILS - ",this.state.login_details);
		if (localStorage.getItem("header_link") == "true"){
			this.state.about_href_text = <a href="#" style={{cursor: 'pointer'}} className="inactive"> About Us </a>;
			this.state.home_href_text = <a href="#" style={{cursor: 'pointer'}} onClick={this.goHomePage} className={`${this.props.match.path === "/home" ? 'active' : 'inactive' }`} > Home </a>;
			this.state.rfq_href_text = <a href="#" style={{cursor: 'pointer'}} onClick={this.goToRFQHistory} className={`${this.props.match.path === "/rfq-history" ? 'active' : 'inactive' }`}> RFQ History</a>;
			this.state.myorder_href_text = <a href="#" style={{cursor: 'pointer'}} onClick={this.goToOrderHistory} className={`${this.props.match.path === "/order-history" ? 'active' : 'inactive' }`}> My Orders </a>;
			/*this.state.myprofile_href_text = <a href="#" onClick={this.goToMyProfile} className={`${this.props.match.path === "/my-profile" ? 'active' : 'inactive' }`}> My Profile </a>;*/
			this.state.products_href_text = <a href="#" style={{cursor: 'pointer'}} className={`${this.props.match.path === "/product-category" ? 'active' : 'inactive' }`}> Products </a>;
			
			if (this.props.isLoggedIn === true){
			    this.state.cart_link = <i className="fa fa-cart-arrow-down" style={{cursor: 'pointer'}} onClick={this.goToCart}><NotificationBadge style={{top: -38}} count={localStorage.getItem('num_cart_data')}  effect={Effect.SCALE}/></i>;
			}else{
				this.state.cart_link = <i className="fa fa-cart-arrow-down" style={{cursor: 'pointer'}} onClick={this.goToCart} ><NotificationBadge style={{top: -38}} count={this.state.no_cart_data}  effect={Effect.SCALE}/></i>;
			}
			
			
		}else{
			this.state.about_href_text = <a style={{cursor: 'pointer'}} className="inactive"> About Us </a>;
			this.state.home_href_text = <a style={{cursor: 'pointer'}}  className={`${this.props.match.path === "/" ? 'active' : 'inactive' }`} > Home </a>;
			this.state.rfq_href_text = <a style={{cursor: 'pointer'}}  className={`${this.props.match.path === "/rfq-history" ? 'active' : 'inactive' }`}> RFQ History</a>;
			this.state.myorder_href_text = <a style={{cursor: 'pointer'}}  className={`${this.props.match.path === "/order-history" ? 'active' : 'inactive' }`}> My Orders </a>;
			this.state.products_href_text = <a style={{cursor: 'pointer'}} className={`${this.props.match.path === "/product-category" ? 'active' : 'inactive' }`}> Products </a>;
			if (this.props.isLoggedIn === true){
			    this.state.cart_link = <i className="fa fa-cart-arrow-down" style={{cursor: 'pointer'}} onClick={this.goToCart}><NotificationBadge style={{top: -38}} count={localStorage.getItem('num_cart_data')}  effect={Effect.SCALE}/></i>;
			}else{
				this.state.cart_link = <i className="fa fa-cart-arrow-down" style={{cursor: 'pointer'}} onClick={this.goToCart}><NotificationBadge style={{top: -38}} count={this.state.no_cart_data}  effect={Effect.SCALE}/></i>;
			}
			/*this.state.cart_link = <i className="fa fa-cart-arrow-down" style={{cursor: 'pointer'}} ><NotificationBadge style={{top: -38}} count={this.state.no_cart_data}  effect={Effect.SCALE}/></i>;*/
		}
	}
	render(){
		if(this.state.goToLogin){
	      return (
	        <Redirect to='/login'/>
	      )
    	}

    	if(this.state.goToHome){
    		return(
    			<Redirect to='/home' />
    			)
    	}
    	if(this.state.goToProduct){
    		return(
    			<Redirect to='/product-category' />
    			)
    	}


    	
		return(
			<div className="header">
				<div className="header-main wrapper">

					{!this.state.locationUrl ? (
					<Col sm={1}>
						<div className="logo-container">
							
							<img src={logo} onClick={this.logoRedirection} alt="Logo" style={{width: 80}} /> 

						</div>
					</Col>
					) : (
					<Col sm={1}>
						<div className="logo-container">
							
							<img src={NodLogo} onClick={this.logoRedirection} alt="Logo" style={{width: 70, height: 70}} /> 

						</div>
					</Col>

					)}

					<Col sm={8}>
						<div className="search-container">
							<div className="react-search-field test-class">
								<input 
									className="react-search-field-input" 
									placeholder="Search for Bearing No." 
									type="text" 
									value={this.state.typeaheadText}
									onChange= {this.showTypeahead}
								/>
								<button className="react-search-field-button" onClick={this.closeContainer} type="button">
									<i className="fa fa-search"> </i>
								</button>
							</div>
							{
								this.state.showTypeahead && (
									<div className="suggestions-container" ref={el => this.typeahead = el}>
										{ this.state.zwz_search_pannel && (
										<div className="suggestions" onClick={this.closeContainer}>

											{
												this.state.data.length > 0 ? (
													<p className="title">{this.state.suggestions.length} out of {this.state.total_data}</p>
												) : (
													<p className="title">No Result Found</p>
												)
											}
											
											{
												this.state.suggestions.length > 0 && (
													this.state.suggestions.map((item, index) => <p key={index} onMouseOver={() =>  this.onHover(item.id , item.Item_Name)} onClick={() => this.handleClick(item.id)}  className="typeahead-text">{item.Item_Name} | {item.cat_type} | {item.cat_name} <br style={{fontSize: 8}} /> <p style={{fontSize: 11, marginBottom: 8}}> {item.universal_no} </p>  </p>  )
												)


											}
											

										</div>

										)}



										{ this.state.nod_search_pannel && (
										<div className="suggestions" onClick={this.closeContainer}>

											{
												this.state.suggestions.length > 0 ? (
													<p className="title">{this.state.suggestions.length} out of {this.state.total_data}</p>
												) : (
													<p className="title">No Result Found</p>
												)
											}
											
											{
												this.state.suggestions.length > 0 && (
													this.state.suggestions.map((item, index) => <p key={index} onMouseOver={() =>  this.onHover(item.id , item.Item_Name)} onClick={() => this.handleClick1(item.Item_Name)}  className="typeahead-text">{item.Item_Name} | {item.cat_type} | {item.cat_name} <br style={{fontSize: 8}} /> <p style={{fontSize: 11, marginBottom: 8}}> {item.universal_no} </p>  </p>  )
												)


											}
											

										</div>

										)}



										{
											this.state.zwz_hover_pannel && (

											<div className="recommendation">
												<p className="title" style={{fontSize: 16, marginTop: 35}}>Product Details</p>
												<div className="title-container"> 
													<p className="title" style={{fontSize: 15}}>You search for {this.state.itemName} </p>
												</div>


												{
													this.state.recommendation && 
														(
															<div  className="recommended-item">
																<span className="item-description">
																	<span style={{fontWeight: 'bold', color: '#00739E'}}> {this.state.itemName} , {this.state.subCategory} , {this.state.category} </span>
																	
																</span>
																
															
                                                                <span>
																	<input type="text" value={this.state.quantity} onChange=
																	{this.onQuantityChange} className="recommendation_add_qty" placeholder="Qty"
																	name="quantity"/>
																</span>

																<span className="item-action">
																	<button className="button" type="button" onClick={this.getItemData}>Add To Cart</button>
																</span>
															</div>		
														)	
																												
												}	
											</div>
										)}

										{
											this.state.nod_hover_pannel && (

											<div className="recommendation">
												<p className="title" style={{fontSize: 16, marginTop: 35}}>Product Details</p>
												<div className="title-container"> 
													<p className="title" style={{fontSize: 15}}>You search for {this.state.nod_item_name} </p>
												</div>


												{
													this.state.recommendation && 
														(
															this.state.hover_nod_data.map((item, index) => 
															<div  className="recommended-item">
																<span className="item-description">
																	<span style={{fontWeight: 'bold', color: '#00739E'}}> {item.itemname} , {item.catname} , {item.cattype} </span> <br/>
																	<span style={{fontWeight: 'bold', color: '#00739E'}}> {item.brandname}  </span>

																	
																</span>
																
															
																<span>
																	<input type="text" value={item.quantity} className="recommendation_add_qty" placeholder="Qty" onChange= {(e)=>this.onQuantityChange1(index, e.target.value )} name="quantity"/>
																</span>

																<span className="item-action">
																	<button className="button" type="button" onClick={() => this.getItemData1(item.itemid, item.itemname , item.price, item)}>Add To Cart</button>
																</span>
															</div>	
															)	
														)	
																												
												}	
											</div>
										)}
									</div>
								)
							}
						</div>
					</Col>

					<Col sm={3}>
						<div className= "user-action">
							

							{(!this.props.isLoggedIn || this.props.match.path == "/emailverification" || this.props.match.path == "/login" ) ? (
								<React.Fragment>
									<a className="text_style" style={{paddingLeft: 70}} onClick={this.openLogin} href="#"> SignIn </a>
									<span className="text_style"> / </span>
									<a style={{color: '#fff', cursor: 'pointer'}} onClick={this.openRegister} className="text_style"> SignUp </a>
								</React.Fragment>
							) : (
								<React.Fragment>
									<a className="text_style" href="#" onClick={this.goToMyProfile}> {this.state.login_details} </a>
									<span className="text_style"> / </span>
									<a style={{color: '#fff', cursor: 'pointer'}} onClick={this.onLogout} className="text_style"> Logout </a>
								</React.Fragment>
							)}

							{ this.state.login_values1 &&(

								<React.Fragment>
									<a className="text_style" style={{paddingLeft: 70}} onClick={this.openLogin} href="#"> SignIn </a>
									<span className="text_style"> / </span>
									<a style={{color: '#fff', cursor: 'pointer'}} target="_blank" className="text_style"> SignUp </a>
								</React.Fragment>


							)}

							<span className="text_style"> | </span>
							
								{this.state.cart_link}
							 

							 {this.props.isLoggedIn === false &&
							<i className="fa fa-cart-arrow-down" style={{cursor: 'pointer'}} onClick={this.goToCart}>
								<NotificationBadge style={{top: -38}} effect={Effect.SCALE}/>
							 </i>
							 } 

							 {
							 	this.state.cart_withoutLogin=== true && (
							 		<i className="fa fa-cart-arrow-down" style={{cursor: 'pointer'}} onClick={this.goToCart}>
										<NotificationBadge style={{top: -38}} count={this.props.cart.length} effect={Effect.SCALE}/>
							 		</i>

							 	)
							 }

							


							


							 
						</div>
					</Col>
				</div>
				<div className="header-secondary">
					<Row className="wrapper">
						<Col sm={8}>
							<div className="nav-container">
								<ul className="navMenu" style={{marginBottom: 0}}>
									<li>
										{this.state.home_href_text}
									</li>
									
									<li>
										{this.state.about_href_text}
									</li>

									

									<li>
										{this.state.rfq_href_text}
									</li>

									<li>
										{this.state.myorder_href_text}
									</li>

								</ul>
							</div>
						</Col>
						<Col sm={4}>
							
						</Col>
					</Row>
				</div>
			</div>
		)
	}
}

export default connect(state => ({
	...state.user,
	...state.cartDetail,
	...state.productDetail,
	...state.updateProductData,
	...state.cartItemVal,
	...state.updateCartItemData
}))(Header)