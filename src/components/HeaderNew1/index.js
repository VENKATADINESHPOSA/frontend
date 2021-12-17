import React, { Component } from 'react'
import { Button, Row, Col } from 'reactstrap';
import logo from '~/assets/images/logo.svg';
import axios from 'axios';
import './styles.scss';
import { Redirect } from 'react-router-dom';


class Header extends Component {

	constructor(props){
		super(props);
		this.openLogin = this.openLogin.bind(this);
		this.openHome = this.openHome.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.closeContainer = this.closeContainer.bind(this);
		this.aboutPage = this.aboutPage.bind(this);

		this.state = {
			error: "",
			showTypeahead: false,
			goAboutPage: false,
			typeaheadText: '',
			total_data: '',
			login_details: '',
			goToLogin: false,
			goToProduct: false,
			goToHome: false,
			suggestions: [],
			description:[],
			inputVal: '',
			itemname:'',
			recommendation: [{
				name: 60016
			},{
				description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
				quantity: 'QTY'
			},{
				description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
				quantity: 'QTY'
			},{
				description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
				quantity: 'QTY'
			}],
		}
	}

	componentWillMount(){
		var ProductData = sessionStorage.getItem('product_data');
		var ProductData1 = JSON.parse(ProductData)
		this.setState({
			 
			login_details: sessionStorage.getItem('username'),
			itemname: ProductData1.itemname[0],
			
		})
		
	}


	openLogin(){
		console.log('jhjkjk')
		this.setState({
			goToLogin: true
		})
		
	}

	aboutPage(){
		this.setState({
			goAboutPage: true
		})

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


	handleClick(dataVal){
		console.log('hghkjk');
		console.log(dataVal);

		 var ref = this;
	    ref.setState({
	      error: ''
	    });

	    axios.post('https://apigwd.prtouch.com/api/display_product/', {
	    	item_name: dataVal
	        

	    })
	    .then(function (response) {
	    	console.log(response);

	    	sessionStorage.setItem('product_data', JSON.stringify(response.data))

	    	var ProductData = sessionStorage.getItem('product_data');
	    	console.log(JSON.parse(ProductData));
	    	console.log(ProductData);
	    	if (response.data.success === true) {
	    		ref.setState({
	    			goToProduct: true,
	    			
	    		})
	    	}

	    })
	    .catch(function (error) {
	      
	      
	    });


		



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

	    axios.post('https://apigwd.prtouch.com/api/search_product/', {
	    	searching_key: e.target.value
	        

	    })
	    .then(function (response) {
	    	console.log(response);
	    	ref.setState({
	    		suggestions: response.data.description,
	    		total_data: response.data.total_search_count,

	    		

	    	})

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
    			<Redirect to='/' />
    			)
    	}

    	if (this.state.goToProduct) {
    		return(
    			<Redirect to='/product-category2' />
    		)
    	}

    	if (this.state.goAboutPage) {
    		return(
    			<Redirect to='/' />
    			)
    	}
		return(
			<div className="header">
				<div className="header-main wrapper">
					<Col sm={1}>
						<div className="logo-container">
							
							<img src={logo} alt="Logo" style={{width: 80}} /> 

						</div>
					</Col>
					<Col sm={8}>
						<div className="search-container">
							<div className="react-search-field test-class">
								<input 
									className="react-search-field-input" 
									placeholder="Search for Bearing No." 
									type="text" 
									value={this.state.itemname} 									
									onBlur={this.hideypeahead}
									onChange= {this.showTypeahead}
								/>
								<button className="react-search-field-button" type="button">
									<i className="fa fa-search"> </i>
								</button>
							</div>
							{
								this.state.showTypeahead && (
									<div className="suggestions-container" onClick={this.closeContainer}>
										<div className="suggestions">
											<p className="title">{this.state.suggestions.length} out of {this.state.total_data}</p>
											{
												this.state.suggestions.length > 0 && (
													this.state.suggestions.map((item, index) => <p key={index} onClick={() => this.handleClick(item.id)} className="typeahead-text">{item.item_code} | {item.cat_type} | {item.cat_name} <br style={{fontSize: 8}} /> <p style={{fontSize: 11, marginBottom: 8}}> {item.Item_Name} </p>  </p>  )
												)


											}
											

										</div>
										<div className="recommendation" style={{display: 'none'}}>
											<p className="title">Recommended Products</p>
											{
												this.state.recommendation.length > 0 && (
													this.state.recommendation.map((item, index) => (
														<div key={index} className="recommended-item">
															<span className="item-description">
																{item.name ? item.name : item.description}
															</span>
															{
																item.quantity && (
																	<span className="item-quantity">
																		{item.quantity}
																	</span>
																)
															}
															<span className="item-action">
																<button className="button" type="button">Add To Card</button>
															</span>
														</div>															
													))
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
							<a style={{color: '#fff', cursor: 'pointer'}} target="_blank" className="text_style" onClick={this.openHome} > Next-page </a>
							<span className="text_style"> / </span>
							
							<a className="text_style" onClick={this.openLogin} href="#"> SignIn </a>
							<span className="text_style"> / </span>
							<a style={{color: '#fff', cursor: 'pointer'}} target="_blank" className="text_style"> SignUp </a>

							<span className="text_style"> | </span>
							<i className="fa fa-cart-arrow-down"> </i>
						</div>
					</Col>
				</div>
				<div className="header-secondary">
					<Row className="wrapper">
						<Col sm={8}>
							<div className="nav-container">
								<ul className="navMenu" style={{marginBottom: 0}}>
									<li>
										<a href="#" className="inactive" onClick={this.aboutPage} > About Us </a>
									</li>

									<li>
										<a href="#" className="inactive"> ZWZ Products </a>
									</li>

									<li>
										<a href="#" className="inactive"> Application </a>
									</li>

									<li>
										<a href="#" className="active"> Buy ZWZ </a>
									</li>
								</ul>
							</div>
						</Col>
						<Col sm={4}>
							<div className="language-selection-container">
								<ul className="navMenu">
									<li style={{width: 100}}>
										<span className="select-style">

											<select style={{width: '40%', paddingTop: 12}}>
												<option value="India">India</option>

											</select>
											<i className="fa fa-caret-down" style={{color: '#fff'}}></i>
											

										</span>
									</li>

									<li>
										<span className="select-style">
											<select style={{width: '100%', paddingTop: 12}}>
												<option value="India">Select Languages</option>
											</select>
										</span>
									</li>	
								</ul>
							</div>
						</Col>
					</Row>
				</div>
			</div>
		)
	}
}

export default Header