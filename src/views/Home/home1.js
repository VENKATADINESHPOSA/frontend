import React, { Component } from 'react'
import './styles.scss'
import { Button, Row, Col,Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle } from 'reactstrap';
import {connect} from 'react-redux';
import axios from 'axios';
import Carousel1 from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import Client from '~/components/Client';
import ClientDetail from '~/components/ClientDetail';
import image1 from '~/assets/images/1.jpg';
import image2 from '~/assets/images/2.jpg';
import image3 from '~/assets/images/3.jpg';
import image4 from '~/assets/images/4.jpg';
import image5 from '~/assets/images/5.jpg';
import image6 from '~/assets/images/logos.jpg';
import image7 from '~/assets/images/first_img.jpg';
import image8 from '~/assets/images/second_img.jpg';
import image9 from '~/assets/images/third_img.jpg';
import image11 from '~/assets/images/bearings1.jpg';
import image12 from '~/assets/images/bearings2.png';
import image13 from '~/assets/images/bearings3.jpeg';
import image14 from '~/assets/images/bearings4.jpeg';
import image15 from '~/assets/images/bearings5.jpg';
import zwzhome1 from '~/assets/images/zwzhome1.jpg';
import zwzhome2 from '~/assets/images/zwzhome2.jpg';
import zwzhome3 from '~/assets/images/zwzhome3.jpg';
import zwzproduct11 from '~/assets/images/zwzproduct11.jpg';
import zwzproduct12 from '~/assets/images/zwzproduct12.jpg';
import zwzproduct13 from '~/assets/images/zwzproduct13.jpg';
import images10 from '~/assets/images/support.png'
import jsonData from './jsonData.json'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import {updateUserData} from '~/redux/action/user';
import {updateCartData} from '~/redux/action/cartDetails';
import {removeCartData} from '~/redux/action/cartDetails';
import {updateProductData} from '~/redux/action/productDetail';
import {updateCartItemData} from '~/redux/action/cartItemVal';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

let hostname = window.location.hostname;
var Name = "";
var nodlogo = false
if (hostname == "zwz.prtouch.com") {
	Name = "ZWZ"
	
}else{
	Name = "NOD"
	
}



class Home6 extends Component {

	constructor(props){
		super(props)
		/*this.redirectProductCategory = this.redirectProductCategory.bind(this);*/
		this.AutoLogout = this.AutoLogout.bind(this);
	}

	componentDidMount(){
		window.scrollTo(0, 0)
		console.log(jsonData);
		console.log('length',jsonData.length);

	}

	componentWillMount(){

		console.log(this.props.cart);
		this.AutoLogout();
		if (this.props.cart.length> 0) {
			this.goToShipping();
		}


		
	}

	async AutoLogout(){
		console.log(this.props.match);

		if(hostname === "zwz.prtouch.com" || hostname === "localhost") {
			console.log("first if condition");
			console.log("path" + this.props.location.pathname)
		if (this.props.location.pathname !== "/login" && this.props.location.pathname !== "/signup" && this.props.location.pathname !== "/product-category" && this.props.location.pathname !== "/productDetail") {

			console.log("second if condition");
		 axios.post('http://apizwz.prtouch.com/authentication/tokencheck/' , 

		 {
		 	
		 	"tokenkey": localStorage.getItem('auth_key')
		 },{
		 	 headers: {
          	'Authorization' : 'Token ' + localStorage.getItem('auth_key')
        	} 

		 }
		 

		 )
	    .then((response) =>  {

	    	console.log(response.data.success);
	    	var username = localStorage.getItem('username');

	    	if (response.data.success === true) {
	    		this.props.dispatch(updateUserData({
					username: username
				}))
	    	}
	    })
	    .catch(function (error) {
	      
	      
	    });
		}

		}else if (hostname === "nod.prtouch.com") {
			if (this.props.location.pathname !== "/" && this.props.location.pathname !== "/login" && this.props.location.pathname !== "/signup") {
			axios.post('http://apinod.prtouch.com/authentication/tokencheck/' , 

		 {
		 	
		 	"tokenkey": localStorage.getItem('auth_key')
		 },{
		 	 headers: {
          	'Authorization' : 'Token ' + localStorage.getItem('auth_key')
        	} 

		 }
		 

		 )
	    .then((response) =>  {

	    	console.log(response);
	    	if (response.data.success === false) {
	    		window.location.href = "/login"
	    	}
	    })
	    .catch(function (error) {
	      
	      
	    });}
		}



	}


	async goToShipping(){
		var arr = []
		

		for(var i = 0; i < this.props.cart.length; i++) {
		     // <---- Move declaration inside loop
		     var orderData = {};
			
		    orderData['item_id'] = this.props.cart[i].itemid.toString();
		    orderData['item_name'] = this.props.cart[i].itemname.toString();
		    orderData['amount_per_unit'] = this.props.cart[i].price.toString();
		    orderData['quantity'] = this.props.cart[i].Quantity.toString();
		    arr.push(orderData);
		}

		//console.log(arr);

		if (window.location.href==="http://nod.prtouch.com:8081/home") {

		axios.post('http://apinod.prtouch.com/api/add_item/' , 

		 {
		 	
		 	"item_info": arr
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

		}else if (window.location.href==="http://store.zwz.co.in/home") {

		axios.post('http://apizwz.prtouch.com/api/add_item/' , 

		 {
		 	
		 	"item_info": arr
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



		}


		/*this.props.history.push('/shipping');*/
	}

	
	/*redirectProductCategory(){
		this.props.history.push('/product-category');
	}*/
	render(){
		return(
			<div>
				<Header {...this.props}> </Header>
				<div className="content-container wrapper" style={{marginTop: 175}}>
					<Row>
						<Col sm={12}>
							<Carousel style={{height: 80}} showThumbs={false}>
				                <div style={{height: 440}}>
				                    <img style={{height: 455}} src={zwzhome1} />
				                    <p className="legend">Find all the functions for your purchasing process </p>
				                    <p className="shop_now_btn"> Shop Now </p>
				                </div>
				                <div style={{height: 440}}>
				                    <img style={{height: 455}} src={zwzhome2} />
				                    <p className="legend">Find all the functions for your purchasing process</p>
				                </div>
				                <div style={{height: 440}}>
				                    <img style={{height: 460}} src={zwzhome3} />
				                    <p className="legend">Find all the functions for your purchasing process</p>
				                </div>
				            </Carousel>
						</Col>

						<Col sm={12} className="home_about_container" style={{display: 'none'}}>
							<Col sm={12}>
								<h6 style={{color: '#00619F', textAlign: 'left', fontWeight: 'bold', padding: 12, paddingBottom: 0 }}> Rolling Bearing Lubrication </h6>
								<p style={{textAlign: 'left', fontSize: 13, paddingLeft: 12}}> Electric motor kit for fast retrofitting </p>
							</Col>

							<Col sm={5} style={{float: 'left'}}>
								<img style={{height: 235, width: '85%'}} src={zwzproduct11} />

							</Col>

							<Col sm={6} style={{float: 'left', textAlign: 'left', fontSize: 13}}>
								<p>
									{Name}’s product range includes a plug-and-play solution for retrofitting large electric motors (with more than 70 kW drive power) with relubrication devices.
								</p>

								<p>
									The electric motor kit, which includes all of the accessories needed for problem-free installation in a very short space of time, is especially designed for sales partners who wish to use it to offer their industrial customers a fast and simple solution. 
								</p>

								<p>
									Learn more about its application in practice in a forum article. To find out more about the designs and content of the kit, download the „Rolling bearing lubrication made easy“ flyer.

								</p>

							</Col>

						</Col>

						<Col sm={12} className="heading_s4 text-center" style={{marginTop: 40, textAlign: 'center'}}>
							<h2 style={{fontWeight: 'bold', color: '#444'}}> About ZWZ </h2>
						</Col>

						<Col sm={10} className="heading_s4 text-center" style={{textAlign: 'center', margin: 'auto'}}>
							<p className="text-center leads">Since 1938 we have powered the world’s plants and machines with unmatched reliability and value. WIth over 10,000 types of bearing products look forward to meeting your expectations. We manufacture solutions for critical applications in power plants, steel and metal industries, gearboxes, paper mills and other demanding applications within heavy industries.</p>
						</Col>




							<Col sm={12} style={{marginTop: 40, textAlign: 'center'}}>
							<h2 style={{fontWeight: 'bold', color: '#444'}}> Features On ZWZ.Com </h2>
						</Col>
						<Col sm={12} style={{marginTop: 20, textAlign: 'center'}}>
						<div className="tab-style1">
                    <ul className="nav nav-tabs justify-content-center" role="tablist"><li className="nav-item">
                            <a className="nav-link active" id="arrival-tab" data-toggle="tab" href="#arrival" role="tab" aria-controls="arrival" aria-selected="true">New</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="sellers-tab" data-toggle="tab" href="#sellers" role="tab" aria-controls="sellers" aria-selected="false">Best Sellers</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="featured-tab" data-toggle="tab" href="#featured" role="tab" aria-controls="featured" aria-selected="false">Featured</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="special-tab" data-toggle="tab" href="#special" role="tab" aria-controls="special" aria-selected="false">Special Offer
</a>
                        </li>
                    </ul></div>
                    </Col>


						<div style={{width: '100%', paddingLeft: 25, marginTop: 20, marginBottom: 30}}>

						<Carousel1
  swipeable={true}
  draggable={true}
  showDots={false}
  responsive={responsive}

  ssr={true} // means to render carousel on server-side.
  
  partialVisible={true}
>
{
jsonData.map((item, index) => (

	<div className="owl-item cloned active" style={{width: 285.5, marginRight: 20}}><div className="item">
                        <div className="product_wrap">
                            <div className="product_img">
                                <a href="shop-product-detail.html">
                                    <img style={{width: 205}} src={require(`~/assets/images/${item.imgurl}`)} alt="Self Aligning Bearing"/></a>
                                <div className="product_action_box">
                                    <ul className="list_none pr_action_btn">
                                        <li><a href="shop-quick-view.html" className="popup-ajax"><i className="icon-magnifier-add"></i></a></li>
                                        <li><a href="#"><i className="icon-heart"></i></a></li>
                                    </ul></div>
                            </div>
                            <div className="product_info">
                                <h6 className="product_title"><a style={{color: '#444', fontWeight:'bold'}} href="#">{item.name}</a></h6>
                               
        
                            </div>
                        </div>
                    </div></div>






 
						))}
 {/* <div>
							<Card>
						        <CardImg style={{backgroundColor: '#f4f4f4 !important', width: '93%'}} top width="76%" src={image14} />
						        <CardBody style={{backgroundColor: '#f4f4f4 !important'}}>
						          <CardTitle style={{color: '#428bca'}}>Thurst Ball Bearing</CardTitle>
						        </CardBody>
						     </Card>
						</div>
  <div>
							<Card>
						        <CardImg style={{backgroundColor: '#f4f4f4 !important', width: '93%'}} top width="76%" src={image14} />
						        <CardBody style={{backgroundColor: '#f4f4f4 !important'}}>
						          <CardTitle style={{color: '#428bca'}}>Self Aligning Bearing</CardTitle>
						        </CardBody>
						     </Card>
						</div>
  <div>
							<Card>
						        <CardImg style={{backgroundColor: '#f4f4f4 !important', width: '93%'}} top width="76%" src={image14} />
						        <CardBody style={{backgroundColor: '#f4f4f4 !important'}}>
						          <CardTitle style={{color: '#428bca'}}>SS Round Shape Ball Bearing</CardTitle>
						        </CardBody>
						     </Card>
						</div>
						 <div>
							<Card>
						        <CardImg style={{backgroundColor: '#f4f4f4 !important',width: '93%'}} top width="86%" src={image12} />
						        <CardBody style={{backgroundColor: '#f4f4f4 !important'}}>
						          <CardTitle style={{color: '#428bca'}}>Self Aligning Ball Bearing</CardTitle>
						         
						        </CardBody>
						     </Card>
						</div>*/}
</Carousel1>
</div>








						<Col sm={12} style={{marginTop: 40, textAlign: 'center'}}>
							<h2 style={{fontWeight: 'bold', color: '#444'}}> Trending Products </h2>
						</Col>
						<div style={{width: '100%', paddingLeft: 25, marginTop: 20}}>

						<Carousel1
  swipeable={true}
  draggable={true}
  showDots={false}
  responsive={responsive}

  ssr={true} // means to render carousel on server-side.
  
  partialVisible={true}
>
{
jsonData.map((item, index) => (

	<div className="owl-item cloned active" style={{width: 285.5, marginRight: 20}}><div className="item">
                        <div className="product_wrap">
                            <div className="product_img">
                                <a href="shop-product-detail.html">
                                    <img style={{width: 205}} src={require(`~/assets/images/${item.imgurl}`)} alt="Self Aligning Bearing"/></a>
                                <div className="product_action_box">
                                    <ul className="list_none pr_action_btn">
                                        <li><a href="shop-quick-view.html" className="popup-ajax"><i className="icon-magnifier-add"></i></a></li>
                                        <li><a href="#"><i className="icon-heart"></i></a></li>
                                    </ul></div>
                            </div>
                            <div className="product_info">
                                <h6 className="product_title"><a style={{color: '#444', fontWeight:'bold'}} href="#">{item.name}</a></h6>
                               
        
                            </div>
                        </div>
                    </div></div>






 
						))}
 {/* <div>
							<Card>
						        <CardImg style={{backgroundColor: '#f4f4f4 !important', width: '93%'}} top width="76%" src={image14} />
						        <CardBody style={{backgroundColor: '#f4f4f4 !important'}}>
						          <CardTitle style={{color: '#428bca'}}>Thurst Ball Bearing</CardTitle>
						        </CardBody>
						     </Card>
						</div>
  <div>
							<Card>
						        <CardImg style={{backgroundColor: '#f4f4f4 !important', width: '93%'}} top width="76%" src={image14} />
						        <CardBody style={{backgroundColor: '#f4f4f4 !important'}}>
						          <CardTitle style={{color: '#428bca'}}>Self Aligning Bearing</CardTitle>
						        </CardBody>
						     </Card>
						</div>
  <div>
							<Card>
						        <CardImg style={{backgroundColor: '#f4f4f4 !important', width: '93%'}} top width="76%" src={image14} />
						        <CardBody style={{backgroundColor: '#f4f4f4 !important'}}>
						          <CardTitle style={{color: '#428bca'}}>SS Round Shape Ball Bearing</CardTitle>
						        </CardBody>
						     </Card>
						</div>
						 <div>
							<Card>
						        <CardImg style={{backgroundColor: '#f4f4f4 !important',width: '93%'}} top width="86%" src={image12} />
						        <CardBody style={{backgroundColor: '#f4f4f4 !important'}}>
						          <CardTitle style={{color: '#428bca'}}>Self Aligning Ball Bearing</CardTitle>
						         
						        </CardBody>
						     </Card>
						</div>*/}
</Carousel1>
</div>

						<Col sm={3} style={{marginTop: 10}}>
							<Card>
						        <CardImg style={{backgroundColor: '#f4f4f4 !important', width: '93%'}} top width="76%" src={image14} />
						        <CardBody style={{backgroundColor: '#f4f4f4 !important'}}>
						          <CardTitle style={{color: '#428bca'}}>SS Round Shape Ball Bearing</CardTitle>
						        </CardBody>
						     </Card>
						</Col>

						<Col sm={3} style={{marginTop: 10}} onClick={this.redirectProductCategory}>
							<Card>
						        <CardImg style={{backgroundColor: '#f4f4f4 !important',width: '93%'}} top width="86%" src={image12} />
						        <CardBody style={{backgroundColor: '#f4f4f4 !important'}}>
						          <CardTitle style={{color: '#428bca'}}>Self Aligning Ball Bearing</CardTitle>
						         
						        </CardBody>
						     </Card>
						</Col>

						<Col sm={3} style={{marginTop: 10}} onClick={this.redirectProductCategory}>
							<Card>
						        <CardImg style={{backgroundColor: '#f4f4f4 !important', width: '93%'}} top width="100%" src={image14} />
						        <CardBody style={{backgroundColor: '#f4f4f4 !important'}}>
						          <CardTitle style={{color: '#428bca'}}> Metric And Standard Bearings</CardTitle>
						          
						        </CardBody>
						     </Card>
						</Col>

						<Col sm={3} style={{marginTop: 10}} onClick={this.redirectProductCategory}>
							<Card>
						        <CardImg style={{backgroundColor: '#f4f4f4 !important', width: '70%'}} top width="100%" src={image11} />
						        <CardBody style={{backgroundColor: '#f4f4f4 !important'}}>
						          <CardTitle style={{color: '#428bca'}}>SS Round Shape Ball Bearing</CardTitle>
						         
						        </CardBody>
						     </Card>
						</Col>

						<Col sm={3} style={{marginTop: 20}} onClick={this.redirectProductCategory}>
							<Card>
						        <CardImg style={{backgroundColor: '#f4f4f4 !important', width: '70%'}} top width="100%" src={image11} />
						        <CardBody style={{backgroundColor: '#f4f4f4 !important'}}>
						          <CardTitle style={{color: '#428bca'}}>Metric And Standard Bearings</CardTitle>
						         
						        </CardBody>
						     </Card>
						</Col>

						<Col sm={3} style={{marginTop: 20}} onClick={this.redirectProductCategory}>
							<Card>
						        <CardImg style={{backgroundColor: '#f4f4f4 !important', width: '93%'}} top width="86%" src={image12} />
						        <CardBody style={{backgroundColor: '#f4f4f4 !important'}}>
						          <CardTitle style={{color: '#428bca'}}>SS Round Shape Ball Bearing</CardTitle>
						         
						        </CardBody>
						     </Card>
						</Col>

						<Col sm={3} style={{marginTop: 20}} onClick={this.redirectProductCategory}>
							<Card>
						        <CardImg style={{backgroundColor: '#f4f4f4 !important', width: '93%'}} top width="86%" src={image14} />
						        <CardBody style={{backgroundColor: '#f4f4f4 !important'}}>
						          <CardTitle style={{color: '#428bca'}}>SS Round Shape Ball Bearing</CardTitle>
						         
						        </CardBody>
						     </Card>
						</Col>

						<Col sm={3} style={{marginTop: 20}} onClick={this.redirectProductCategory}>
							<Card>
						        <CardImg style={{backgroundColor: '#f4f4f4 !important', width: '93%'}} top width="86%" src={image12} />
						        <CardBody style={{backgroundColor: '#f4f4f4 !important'}}>
						          <CardTitle style={{color: '#428bca'}}>SS Round Shape Ball Bearing</CardTitle>
						         
						        </CardBody>
						     </Card>
						</Col>


						


						<Col sm={12} style={{marginTop: 40, textAlign: 'center'}}>
							<h2 style={{fontWeight: 'bold', color: '#00619F'}}> Features on {Name}.Com </h2>
						</Col>

						<Col sm={4} style={{marginTop: 10, height: 280, marginBottom: 20}} onClick={this.redirectProductCategory}>
							<img src={zwzproduct11} alt="Logo" className="image2" />
						</Col>

						<Col sm={4} style={{marginTop: 10, height: 280, marginBottom: 20}}>
							<img src={zwzproduct12} alt="Logo" className="image2" />
						</Col>

						<Col sm={4} style={{marginTop: 10, height: 280, marginBottom: 20}}>
							<img src={zwzproduct13} alt="Logo" className="image2" />
						</Col>



						


						<Col sm={4} style={{marginTop: 25}}>
							<h5 style={{marginBottom: 12, fontWeight: 'bold'}}> New Products </h5>

							<img src={image7} alt="Logo" style={{width: 120, height: 120}} />

							<p style={{marginTop: 15}}> The latest innovations that help keep your business running smoothly. </p>

						</Col>

						<Col sm={4} style={{marginTop: 25}}>
							<h5 style={{marginBottom: 12, fontWeight: 'bold'}}> Hot Buys </h5>

							<img src={image8} alt="Logo" style={{width: 120, height: 120}} />

							<p style={{marginTop: 15}}>Budget-saving deals on top products you use every day. </p>

						</Col>
						

						<Col sm={4} style={{marginTop: 25}}>
							<h5 style={{marginBottom: 12, fontWeight: 'bold'}}> Clearance Items </h5>

							<img src={image9} alt="Logo" style={{width: 120, height: 120}} />

							<p style={{marginTop: 15}}>Hurry and save big on high-quality, limited-quantity items. </p>
	
						</Col>



						<Col sm={12} style={{marginTop: 40}}>
							<img src={image6} alt="Logo" className="image1" />
						</Col>

					</Row>
				</div>
				<ClientDetail></ClientDetail>
				<Client></Client>
				<Footer> </Footer>
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
}))(Home6)