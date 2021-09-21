import React, { Component } from 'react'
import './styles.scss'
import { Button, Row, Col } from 'reactstrap';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import image1 from '~/assets/images/1.jpg';
import image2 from '~/assets/images/2.jpg';
import image3 from '~/assets/images/3.jpg';
import image4 from '~/assets/images/4.jpg';
import image5 from '~/assets/images/5.jpg';
import image6 from '~/assets/images/logos.jpg';
import {connect} from 'react-redux';
import image7 from '~/assets/images/first_img.jpg';
import image8 from '~/assets/images/second_img.jpg';
import image9 from '~/assets/images/third_img.jpg';
import images10 from '~/assets/images/support.png'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {updateCartData,addCartData} from '~/redux/action/cartDetails';
import {updateProductData} from '~/redux/action/productDetail';
import {updateCartItemData} from '~/redux/action/cartItemVal';
import { Carousel } from 'react-responsive-carousel';






class Home1 extends Component {

	constructor(props){
		super(props)
		this.redirectProductCategory = this.redirectProductCategory.bind(this);
	}

	componentWillMount(){
		console.log("isLoogedInvalues  " + this.props.cart)
		console.log(this.props.isLoggedIn)

	}

	redirectProductCategory(){
		this.props.history.push('/product-category');
	}
	render(){
		return(
			<div>
				<Header {...this.props}> </Header>
				<div className="content-container" style={{marginTop: 0, marginTop: 175}}>
					<Row>
						<Col sm={12}  style={{  backgroundImage: "url(" + image1 + ")",backgroundPosition: 'center',    backgroundSize: 'cover',backgroundRepeat: 'no-repeat', height: 300}}>
							<div style={{width: '100%'}}>

							</div>
						</Col>

						<Col sm={6} style={{marginLeft: 10, marginLeft: 115, float: 'left', marginTop: 60}} className="home_about_container">
							<Col sm={12}>
								<h6 style={{color: '#00619F', textAlign: 'left', fontWeight: 'bold', padding: 12, paddingBottom: 0 }}> Rolling Bearing Lubrication </h6>
								<p style={{textAlign: 'left', fontSize: 13, paddingLeft: 12}}> Electric motor kit for fast retrofitting </p>
							</Col>

							<Col sm={5} style={{float: 'left'}}>
								<img style={{height: 216, width: '118%'}} src={image2} />

							</Col>

							<Col sm={6} style={{float: 'left', textAlign: 'left', fontSize: 13}}>
								<p>
									ZWZ’s product range includes a plug-and-play solution for retrofitting large electric motors (with more than 70 kW drive power) with relubrication devices.
								</p>

								<p>
									The electric motor kit, which includes all of the accessories needed for problem-free installation in a very short space of time, is especially designed for sales partners who wish to use it to offer their industrial customers a fast and simple solution. 
								</p>

								<p>
									Learn more about its application in practice in a forum article. To find out more about the designs and content of the kit, download the „Rolling bearing lubrication made easy“ flyer.

								</p>

							</Col>

						</Col>

						<Col sm={3} style={{marginLeft: 10, marginLeft: 100, float:'left', textAlign: 'left'}} className="home_about_container">
							<h4 style={{color: '#00619F', textAlign: 'left', fontWeight: 'bold', padding: 12, paddingBottom: 0 }}> About Us </h4>
							<p style={{fontSize: 13, marginTop: 25}}>
								Since 1938 we have powered the world’s plants and machines with unmatched reliability and value. WIth over 10,000 types of bearing products look forward to meeting your expectations. We manufacture solutions for critical applications in power plants, steel and metal industries, gearboxes, paper mills and other demanding applications within heavy industries.


							</p>
						</Col>





						<Col sm={10} style={{marginLeft: 10, marginLeft: 115, float: 'left', marginTop: 60}} className="home_about_container">
							<Col sm={12}>
								<h6 style={{color: '#00619F', textAlign: 'left', fontWeight: 'bold', padding: 12, paddingBottom: 0 }}> Product Piracy </h6>
								<p style={{textAlign: 'left', fontSize: 13, paddingLeft: 12}}> Stop fake bearings! </p>
							</Col>


							<Col sm={12} style={{float: 'left', textAlign: 'left', fontSize: 13}}>
								<p> The rolling bearing industry suffers millions in losses each year due to counterfeit products while counterfeit bearings also pose an extremely high risk of danger for man and machine. 
									The Schaeffler brand protection team has been actively fighting product and brand piracy for more than 15 years. 
									With the content on this site, we share our knowledge and experience with you. Download our information pack and use the material & links for your own environment. Help us track down audacious counterfeiters and fight them together with us! We are always here to assist you:<a href="#"> piracy@gwd.com </a></p>

							</Col>

						</Col>



						<Col sm={11} style={{marginTop: 60, marginLeft: 65}}>
							<img src={image6} alt="Logo" className="image1" />
						</Col>

					</Row>
				</div>
				<Footer> </Footer>
			</div>
		)
	}
}


export default connect(state => ({
	...state.cartDetail,
	...state.productDetail,
	...state.updateProductData,
	...state.cartItemVal,
	...state.updateCartItemData
}))(Home1)