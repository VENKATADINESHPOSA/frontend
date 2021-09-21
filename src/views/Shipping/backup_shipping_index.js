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





class Shipping extends Component {

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
		this.props.history.push('/orderPlaced');
	}

	

	render(){
		return(
			<div>
				<Header {...this.props} > </Header>
				<div className="content-container wrapper" style={{backgroundColor: '#f4f4f4', padding: 10}}>
					<Row>					

						<Col sm={12} style={{marginTop: 6}}>
							<h4 style={{paddingLeft: 16, fontWeight:'bold', color: '#00619F'}}>  Information </h4>
						</Col>

					</Row>

					<Row>
						<Col sm={8} style={{marginTop: 25}}>
							 <Card>
						        <CardBody className="customise_card_body" style={{padding: 18}}>
						        	<Row>
						        		<Col sm={12} style={{marginTop: 6}}>
								          <Col sm={5} style={{ float: 'left'}}>
								          	<input type="text" className="address_input" placeholder="Enter GST Number" />
								          </Col>

								           <Col sm={5} style={{ float: 'left'}}>
								          	<input type="text" className="address_input" placeholder="Enter Company Name" />
								          </Col>
								        </Col>
						        		<Col sm={12} style={{marginTop: 6}}>
								          <Col sm={5} style={{float: 'left'}}>
								          	<input type="text" className="address_input" placeholder="Name" />
								          </Col>

								           <Col sm={5} style={{ float: 'left'}}>
								          	<input type="text" className="address_input" placeholder="Mobile No." />
								          </Col>
								        </Col>

								        <Col sm={12} style={{marginTop: 6}}>
								          <Col sm={5} style={{ float: 'left'}}>
								          	<input type="text" className="address_input" placeholder="Pincode" />
								          </Col>

								           <Col sm={5} style={{ float: 'left'}}>
								          	<input type="text" className="address_input" placeholder="Locality" />
								          </Col>
								        </Col>

								        <Col sm={12} style={{marginTop: 6}}>
								         	<Col sm={10} style={{ float: 'left'}}>
								           <textarea name="body" className="address_input" style={{width: '100%'}}  placeholder="Address (Area and Street)" />
								           </Col>
								        </Col>
								        <Col sm={12} style={{marginTop: 6}}>
								          <Col sm={5} style={{ float: 'left'}}>
								          	<input type="text" className="address_input" placeholder="City/District/Town" />
								          </Col>

								           <Col sm={5} style={{ float: 'left'}}>
								          	<input type="text" className="address_input" placeholder="State" />
								          </Col>
								        </Col>

								         <Col sm={12} style={{marginTop: 6}}>
								          <Col sm={5} style={{ float: 'left'}}>
								          	<input type="text" className="address_input" placeholder="Landmark(Optional)" />
								          </Col>

								           <Col sm={5} style={{ float: 'left'}}>
								          	<input type="text" className="address_input" placeholder="Alternate Phone (Optional)" />
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
						        	<table style={{margin: 'auto'}}>
						        		<tbody style={{fontSize: 15}}>
						        			<tr>
						        				<td>
						        					<span>  Subtotal </span>
						        				</td>

						        				<td>
						        					<span> <strong> Rs. 210 </strong> </span>
						        				</td>
						        			</tr>

						        			<tr>
						        				<td>
						        					<span> Estimated Standard Shipping </span>
						        				</td>

						        				<td>
						        					<span> <strong> Rs. 50 </strong> </span>
						        				</td>
						        			</tr>

						        			<tr className="est_total_row">
						        				<td>
						        					<span> <strong> Estimated Total </strong> </span>
						        				</td>

						        				<td>
						        					<span style={{color: '#19792F'}}> <strong> Rs. 260 </strong> </span>
						        				</td>
						        			</tr>

						        			
						        			<tr>
						        				<td colspan="3" style={{paddingLeft: 0, paddingRight: 0}}> <input type="button" onClick={this.goToCheckout} value="Checkout" className="login_btn" /> </td>
						        			</tr>
						        			

						        		</tbody>
						        	</table>

						        
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
						        			<tr className="delivery_add_row">
						        				<td style={{width: '10%'}}>
						        					<input type="radio" value="select address" name="selected_add" />
						        				</td>

						        				<td>
						        					<span> <strong> Pragya Raj </strong> </span> <span style={{paddingLeft: 10}}> <strong> 9808765432 </strong> </span>
						        					<br /> <span> Jmd Pacific Square Sector 15 Part II Gurgaon Pincode 828111 </span>
						        				</td>
						        			</tr>

						        			<tr>
						        				<td style={{width: '10%'}}>
						        					<input type="radio" value="select address" name="selected_add" />
						        				</td>

						        				<td>
						        					<span> <strong> Pragya Raj </strong> </span> <span style={{paddingLeft: 10}}> <strong> 9808765432 </strong> </span>
						        					<br /> <span> Jmd Pacific Square Sector 15 Part II Gurgaon Pincode 828111 </span>
						        				</td>
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
}))(Shipping)