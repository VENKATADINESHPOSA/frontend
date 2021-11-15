import React, { Component } from 'react'
import './styles.scss'
import { Button, Row, Col,Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle } from 'reactstrap';
import {connect} from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
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
import BannerSlider1 from '~/assets/images/rsz_1banner_slider1.jpg';
import BannerSlider2 from '~/assets/images/rsz_1banner_slider2.jpg';
import BannerSlider3 from '~/assets/images/rsz_banner_slider3.jpg';
import BannerSlider4 from '~/assets/images/rsz_banner_slider4.jpg';
import BannerSlider5 from '~/assets/images/rsz_banner_slider5.jpg';
import zwzproduct11 from '~/assets/images/zwzproduct11.jpg';
import zwzproduct12 from '~/assets/images/zwzproduct12.jpg';
import zwzproduct13 from '~/assets/images/zwzproduct13.jpg';
import images10 from '~/assets/images/support.png'
import jsonData from './jsonData.json'
import Images from './Images.json'
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
if (hostname == "store.zwz.co.in") {
	Name = "ZWZ"
	
}else{
	Name = "NOD"
	
}



class Home extends Component {

	constructor(props){
		super(props)
		/*this.redirectProductCategory = this.redirectProductCategory.bind(this);*/
		this.AutoLogout = this.AutoLogout.bind(this);
		this.state = {
			new: true,
			best_seller: false,
			featured: false,
			special_offer: false
		}
	}

	componentDidMount(){
		window.scrollTo(0, 0)
		console.log(Images.new_product);
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

		if(hostname === "store.zwz.co.in" || hostname === "localhost") {
			console.log("first if condition");
			console.log("path" + this.props.location.pathname)
		if (this.props.location.pathname !== "/login" && this.props.location.pathname !== "/signup" && this.props.location.pathname !== "/product-category" && this.props.location.pathname !== "/productDetail") {

			console.log("second if condition");
		 axios.post('http://api.store.zwz.co.in/authentication/tokencheck/' , 

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

		}else if (hostname === "store.nodbearings.net") {
			if (this.props.location.pathname !== "/" && this.props.location.pathname !== "/login" && this.props.location.pathname !== "/signup") {
			axios.post('http://api.store.nodbearings.net/authentication/tokencheck/' , 

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

		if (window.location.href==="http://store.nodbearings.net/home") {

		axios.post('http://api.store.nodbearings.net/api/add_item/' , 

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

		axios.post('http://api.store.zwz.co.in/api/add_item/' , 

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
						<Col sm={12} style={{marginTop: 18}}>
							<Carousel style={{height: 80}} showThumbs={false} autoPlay={true} interval={5000} infiniteLoop={true} autoFocus={true}>
				                <div style={{height: 460, backgroundColor: '#f1f1f9'}}>
				                	<Col sm={5} style={{float: 'left', paddingLeft: 35}}>
				                		<h2 data-animation="slideInLeft" data-animation-delay="1s" className="slider_text staggered-animation"> Diverse </h2>
				                		<h5 style={{textAlign: 'left'}} className="mb-3 mb-sm-4 slider_text1 font-weight-light"  >Serving Across Indian<span className="text_default"> Industry since decades</span></h5>
				                	</Col>

				                	<Col sm={7} style={{float: 'left'}}>
				                		<div>
				                			<img style={{width: 700, height: 410, marginTop: 20}} src={BannerSlider1} />
				                		</div>
				                	</Col>

				                   
				                </div>

				                <div style={{height: 460, backgroundColor: '#f1f1f9'}}>
				                	<Col sm={5} style={{float: 'left', paddingLeft: 35}}>
				                		<h2 data-animation="slideInLeft" data-animation-delay="30s" className="slider_text slide_text staggered-animation"> Range </h2>
				                		<h5 style={{textAlign: 'left'}} className="mb-3 mb-sm-4 staggered-animation font-weight-light" >Widest Range of <span className="text_default"> Industrial Bearings</span></h5>
				                	</Col>

				                	<Col sm={7} style={{float: 'left'}}>
				                		<div>
				                			<img style={{width: 720, height: 440, marginTop: 8}} src={BannerSlider2} />
				                		</div>
				                	</Col>

				                   
				                </div>
				                 <div style={{height: 460, backgroundColor: '#f1f1f9'}}>
				                	<Col sm={5} style={{float: 'left', paddingLeft: 35}}>
				                		<h2 data-animation="slideInLeft" data-animation-delay="1s" className="slider_text staggered-animation "> Value </h2>
				                		<h5 style={{textAlign: 'left'}} className="mb-3 mb-sm-4 staggered-animation font-weight-light " data-animation="slideInLeft" data-animation-delay="1s" >Best Value Proposition in the market</h5>
				                	</Col>

				                	<Col sm={7} style={{float: 'left'}}>
				                		<div>
				                			<img style={{ marginTop: 8}} src={BannerSlider3} />
				                		</div>
				                	</Col>

				                   
				                </div>
				                 <div style={{height: 460, backgroundColor: '#f1f1f9'}}>
				                	<Col sm={5} style={{float: 'left', paddingLeft: 35}}>
				                		<h2 data-animation="slideInLeft" data-animation-delay="1s" className="slider_text staggered-animation"> Large </h2>
				                		<h5 style={{textAlign: 'left'}} className="mb-3 mb-sm-4 staggered-animation font-weight-light " data-animation="slideInLeft" data-animation-delay="1s" >Big Applications need Big Bearings</h5>
				                	</Col>

				                	<Col sm={7} style={{float: 'left'}}>
				                		<div>
				                			<img style={{ marginTop: 8}} src={BannerSlider4} />
				                		</div>
				                	</Col>

				                   
				                </div>
				                 <div style={{height: 460, backgroundColor: '#f1f1f9'}}>
				                	<Col sm={5} style={{float: 'left', paddingLeft: 35}}>
				                		<h2 data-animation="slideInLeft" data-animation-delay="1s" className="slider_text staggered-animation  animated slideInLeft"> Fake </h2>
				                		<h5 style={{textAlign: 'left'}} className="mb-3 mb-sm-4 staggered-animation font-weight-light animated slideInLeft" data-animation="slideInLeft" data-animation-delay="1s" >Beware of Fake ZWZ bearings </h5>
				                	</Col>

				                	<Col sm={7} style={{float: 'left'}}>
				                		<div>
				                			<img style={{ marginTop: 8}} src={BannerSlider5} />
				                		</div>
				                	</Col>

				                   
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
						


                    <Tabs>
    <TabList>
      <Tab>New</Tab>
      <Tab>Best Sellers</Tab>
      <Tab>Featured</Tab>
      <Tab>Special Offer</Tab>


    </TabList>

    <TabPanel>
      <div style={{width: '100%', paddingLeft: 25, marginTop: 20, marginBottom: 30}}>
      <div style={{width: '100%', textAlign: 'center'}}>
      	<p className="para"> ZWZ Introduces MB Type Spherical Roller Bearings </p>
      </div>

						<Carousel1
  swipeable={true}
  draggable={true}
  showDots={false}
  responsive={responsive}

  ssr={true} // means to render carousel on server-side.
  
  partialVisible={true}
>
{
Images.new_product.map((item, index) => (

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
                            <div className="product_info alignText">
                                <h6 className="product_title"><a style={{color: '#444', fontWeight:'bold'}} href="#">{item.name}</a></h6>
                               
        
                            </div>
                        </div>
                    </div></div>






 
						))}
</Carousel1>
</div>

    </TabPanel>
    <TabPanel>
      <div style={{width: '100%', paddingLeft: 25, marginTop: 20, marginBottom: 30}}>
      	<div style={{width: '100%', textAlign: 'center'}}>
      	<p className="para">Use the industry best cylindrical roller bearings</p>
      </div>

						<Carousel1
  swipeable={true}
  draggable={true}
  showDots={false}
  responsive={responsive}

  ssr={true} // means to render carousel on server-side.
  
  partialVisible={true}
>
{
Images.best_seller_product.map((item, index) => (

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
                            <div className="product_info alignText">
                                <h6 className="product_title"><a style={{color: '#444', fontWeight:'bold'}} href="#">{item.name}</a></h6>
                               
        
                            </div>
                        </div>
                    </div></div>






 
						))}
</Carousel1>
</div>
    </TabPanel>

     <TabPanel>
      <div style={{width: '100%', paddingLeft: 25, marginTop: 20, marginBottom: 30}}>
      <div style={{width: '100%', textAlign: 'center'}}>
      	<p className="para">Use the industry best cylindrical roller bearings</p>
      </div>

						<Carousel1
  swipeable={true}
  draggable={true}
  showDots={false}
  responsive={responsive}

  ssr={true} // means to render carousel on server-side.
  
  partialVisible={true}
>
{
Images.featured_product.map((item, index) => (

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
                            <div className="product_info alignText">
                                <h6 className="product_title"><a style={{color: '#444', fontWeight:'bold'}} href="#">{item.name}</a></h6>
                               
        
                            </div>
                        </div>
                    </div></div>






 
						))}
</Carousel1>
</div>
    </TabPanel>

     <TabPanel>
      <div style={{width: '100%', paddingLeft: 25, marginTop: 20, marginBottom: 30}}>
      <div style={{width: '100%', textAlign: 'center'}}>
      	<p className="para">We have special offer for certain product groups used in the enclosed applications.</p>
      </div>

						<Carousel1
  swipeable={true}
  draggable={true}
  showDots={false}
  responsive={responsive}

  ssr={true} // means to render carousel on server-side.
  
  partialVisible={true}
>
{
Images.special_offer_product.map((item, index) => (

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
                            <div className="product_info alignText">
                                <h6 className="product_title"><a style={{color: '#444', fontWeight:'bold'}} href="#">{item.name}</a></h6>
                               
        
                            </div>
                        </div>
                    </div></div>






 
						))}
</Carousel1>
</div>
    </TabPanel>
  </Tabs>
                    </Col>


						








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
                            <div className="product_info alignText">
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
}))(Home)