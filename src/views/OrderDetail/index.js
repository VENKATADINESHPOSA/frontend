import React, { Component } from 'react'
import './styles.scss'
import { Button, Row, Col,Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle} from 'reactstrap';
import {connect} from 'react-redux';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import image1 from '~/assets/images/1.jpg';
import image2 from '~/assets/images/2.jpg';
import image3 from '~/assets/images/3.jpg';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import {updateCartData} from '~/redux/action/cartDetails';
import logo from '~/assets/images/tick.png';






class OrderDetail extends Component {

	constructor(props){
		super(props)

		this.goToCheckout = this.goToCheckout.bind(this);
		
		this.state = {
			itemname: '',
			categoryname: '',
			categorycode: '',
			categorytype: '',
			productcode: '',
			description: '',
			price: '',
			brandname: '',
			itemtype: ''
		}
	}

	goToCheckout(){
		console.log("xcvghjmk,");
		this.props.history.push('/orderPlaced');
	}

	

	render(){
		return(
			<div>
				<Header {...this.props} > </Header>
				<div className="content-container wrapper" style={{backgroundColor: '#f4f4f4', padding: 10}}>
					

					<Row>
						<Col sm={2} style={{marginTop: 25}}>
							 
							
						</Col>
						<Col sm={8} style={{marginTop: 25}}>
							 <Card>
							 	<Col sm={12} style={{paddingLeft: 6, paddingRight: 0, backgroundColor: '#00619F'}} >
						        	<h6 style={{color: '#fff', padding: 6, fontWeight:'bold', textAlign: 'center', paddingTop: 10}}> Order Confirmation </h6>
						        </Col> 
						        <CardBody className="customise_card_body" style={{padding: 18}}>
						        	<table style={{margin: 'auto', borderCollapse: 'inherit'}}>
						        		<tbody style={{fontSize: 15}}>
						        			<tr>
						        				<td style={{'textAlign': 'center'}}>
						        					<img src={logo} alt="Logo" style={{width: 80}} />
						        				</td>

						        				
						        			</tr>

						        			<tr style={{textAlign: 'center'}}>
						        				<td style={{paddingBottom: 0}}>
						        					<h3 style={{fontWeight: 'bold'}}> Thank You </h3>
						        				</td>

						        				
						        			</tr>

						        			<tr className="est_total_row">
						        				<td style={{paddingTop: 0}}>
						        					<span style={{fontWeight: 'bold', fontSize: 20}}> <strong> Order Place Successfully </strong> </span>
						        				</td>

						        				
						        			</tr>

						        			<tr className="est_total_row">
						        				<td style={{paddingTop: 0, textAlign: 'center'}}>
						        					<span><span style={{fontSize: 16}}> Order ID:  </span> <span style={{fontSize: 16, fontWeight: 'bold'}}> #OTB000145 </span> </span>
						        				</td>						        				
						        			</tr>

						        			<tr className="est_total_row">
						        				<td style={{paddingTop: 0, textAlign: 'center'}}>
						        					<span><span style={{fontSize: 16}}> Order Amount:  </span> <span style={{fontSize: 16, fontWeight: 'bold'}}> Rs. 210 </span> </span>
						        				</td>						        				
						        			</tr>


						        			
						        			<tr>
						        				<td colspan="3" style={{paddingLeft: 0, paddingRight: 0}}> <input type="button" onClick={this.goToCheckout} value="CONTINUE SHOPPING" className="login_btn" /> </td>
						        			</tr>
						        			

						        		</tbody>
						        	</table>

						        
						        </CardBody>
						      </Card>
							
						</Col>

						

						
						

					</Row>
				</div>
				<Footer> </Footer>
			</div>
		)
	}
}


export default connect(state => ({
	...state.cartDetail
}))(OrderDetail)