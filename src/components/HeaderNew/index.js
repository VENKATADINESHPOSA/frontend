import React, { Component } from 'react'
import { Button, Row, Col } from 'reactstrap';
import _ from 'lodash'
import logo from '~/assets/images/logo.svg';
import NodLogo from '~/assets/images/trans_nod_logo.png';
import axios from 'axios';
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




let hostname = window.location.hostname;

class Header extends Component {

	constructor(props){
		super(props);
		this.openLogin = this.openLogin.bind(this);
		this.openRegister = this.openRegister.bind(this);
		this.openHome = this.openHome.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.closeContainer = this.closeContainer.bind(this);
		this.goToCart = this.goToCart.bind(this);
		this.goHomePage = this.goHomePage.bind(this);
		this.onLogout = this.onLogout.bind(this);
		this.onHover = this.onHover.bind(this);
		this.getItemData = this.getItemData.bind(this);
		this.onQuantityChange = this.onQuantityChange.bind(this);
		this.closeContainer = this.closeContainer.bind(this);

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
			quantity:'',
			cart_num: '',
			locationUrl: '',
			cart_withoutLogin: false,
			header_link : false,
		}
	}

	componentWillMount(){

		var login_detail_type = window.sessionStorage.getItem("login_type");
		console.log(this.props.username);
		console.log(this.props.isLoggedIn);
		/*console.log(this.props.cartItemVal.cartItemVal);*/
		 console.log(this.props.cartItemVal);


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



		if (window.location.href=== 'http://zwz.prtouch.com:8081/') {
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
		}else if (window.location.href === 'http://zwz.prtouch.com:8081/home') {
			this.setState({
				locationUrl: false,
			})
			console.log('nod');
		}else if (window.location.href === 'http://nod.prtouch.com:8081/home') {
			this.setState({
				locationUrl: true,
			})
			console.log('nod');
		}else if (window.location.href === 'http://zwz.prtouch.com:8081/product-category') {
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

		
		
	}


	openLogin(){
		console.log('jhjkjk')
		/*this.setState({
			goToLogin: true
		})*/

		/*window.location.reload();*/
		this.props.history.push('/login')
		window.location.reload();
		
	}
	
	openRegister(){
		
		this.props.history.push('/signup')
		window.location.reload();
		
	}

	closeContainer(){
		this.setState({
			showTypeahead: false
		})
	}

	goHomePage(){
		this.props.history.push('/home');
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

	onHover(productVal){
		console.log("hello World")

		this.setState({
	      error: '',
	      showTypeahead: true

	    });

	    axios.post('http://apizwz.prtouch.com/api/display_product/', {
	    	item_id: productVal,
	    	flag:"false"
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
	    			itemName: ProductDataValue.itemname[0],
	    			category: ProductDataValue.catname[0],
	    			subCategory: ProductDataValue.cattype[0],
	    			itemCode: ProductDataValue.itemcode[0],
	    			recommendation: true
	    		})

	    		console.log(this.state.recommendation);
	    		
	    		/*window.location.reload();*/
	    		
	    		
	    		
	    	}

	    })
	    .catch(function (error) {
	      
	      
	    });

	}

	onLogout(){
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
	    		console.log('logout')
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


	handleClick(productValue){
	    this.setState({
	      error: ''
	    });
	     console.log(productValue);
	     sessionStorage.setItem('product-val', productValue)

	    axios.post('http://apizwz.prtouch.com/api/display_product/', {
	    	item_id: productValue,
	    	flag: "false"
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
	    		
	    		/*window.location.reload();*/
	    		
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

	goToCart(){
		this.props.history.push('/cart');
	}



	showTypeahead = (e) => {
		this.setState({ showTypeahead: true,
						 typeaheadText: e.target.value

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

			if (this.props.isLoggedIn) {

		var arr = [];
		var orderData = {};

			orderData['item_id'] = ProductData1.itemid[0].toString();
		    orderData['item_name'] = ProductData1.itemname[0];
		    orderData['amount_per_unit'] = ProductData1.price[0];
		    orderData['quantity'] = this.state.quantity.toString();
		    orderData['flag'] = "add_cart"
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
	    	/*window.location.reload();*/
	    	
	    })
	    .catch(function (error) {
	      
	      
	    });


		} else{
			var new_quantity = parseInt(this.state.quantity);
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
			this.props.history.push('/cart');
		}


	}



	hideypeahead = () => {
		this.setState({ showTypeahead: true })
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
							
							<img src={logo} alt="Logo" style={{width: 80}} /> 

						</div>
					</Col>
					) : (
					<Col sm={1}>
						<div className="logo-container">
							
							<img src={NodLogo} alt="Logo" style={{width: 70, height: 70}} /> 

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
									onBlur={this.hideypeahead}
									onChange= {this.showTypeahead}
								/>
								<button className="react-search-field-button" onClick={this.closeContainer} type="button">
									<i className="fa fa-search"> </i>
								</button>
							</div>
							{
								this.state.showTypeahead && (
									<div className="suggestions-container" >
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
													this.state.suggestions.map((item, index) => <p key={index} onMouseOver={() =>  this.onHover(item.id)} onClick={() => this.handleClick(item.id)}  className="typeahead-text">{item.Item_Name} | {item.cat_type} | {item.cat_name} <br style={{fontSize: 8}} /> <p style={{fontSize: 11, marginBottom: 8}}> {item.universal_no} </p>  </p>  )
												)


											}
											

										</div>
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
																<input type="text" value={this.state.quantity} className="recommendation_add_qty" placeholder="Qty" onChange= {this.onQuantityChange} name="quantity"/>
															</span>

															<span className="item-action">
																<button className="button" type="button" onClick={this.getItemData}>Add To Cart</button>
															</span>
														</div>		
													)	
																											
											}	
										</div>
									</div>
								)
							}
						</div>
					</Col>

					<Col sm={3}>
						<div className= "user-action">
							
							<React.Fragment>
								<a className="text_style" style={{paddingLeft: 70}} onClick={this.openLogin} href="#"> SignIn </a>
								<span className="text_style"> / </span>
								<a style={{color: '#fff', cursor: 'pointer'}} onClick={this.openRegister} className="text_style"> SignUp </a>
							</React.Fragment>

								

							<span className="text_style"> | </span>
							{this.props.isLoggedIn &&
							<i className="fa fa-cart-arrow-down" onClick={this.goToCart}>
								<NotificationBadge style={{top: -38}} effect={Effect.SCALE}/>
							 </i>
							 } 

							 {
							 	this.state.cart_withoutLogin && (
							 		<i className="fa fa-cart-arrow-down" onClick={this.goToCart}>
										<NotificationBadge style={{top: -38}} count={this.props.cart.length} effect={Effect.SCALE}/>
							 		</i>

							 	)
							 }

							 {
							 	!this.state.cart_withoutLogin && (
							 		<i className="fa fa-cart-arrow-down" onClick={this.goToCart}>
										<NotificationBadge style={{top: -38}} effect={Effect.SCALE}/>
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
									{ this.state.header_link && 
									<li>
										<a href="#" onClick={this.goHomePage} className={`${this.props.match.path === "/home" ? 'active' : 'inactive' }`} > About Us </a>
									</li>
									}
									<li>
										<a href="#" className="inactive"> ZWZ Products </a>
									</li>

									<li>
										<a href="#" className="inactive"> Application </a>
									</li>

									<li>
										<a href="#" className={`${this.props.match.path === "/product-category" ? 'active' : 'inactive' }`}> Buy ZWZ </a>
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