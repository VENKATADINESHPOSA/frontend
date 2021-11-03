import React, { Component } from 'react'
import _ from 'lodash'
import './styles.scss'
import { Button, Row, Col,Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Table, Modal} from 'reactstrap';
import {connect} from 'react-redux';
import Header from '~/components/Header';
import ModalData from '~/components/modal';
import Currency from '~/assets/images/currency.svg';
import axios from 'axios';
import Footer from '~/components/Footer';
import image1 from '~/assets/images/1.jpg';
import image2 from '~/assets/images/2.jpg';
import image3 from '~/assets/images/3.jpg';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import {updateCartData, addCartData} from '~/redux/action/cartDetails';
import {updateUserData} from '~/redux/action/user';
import {updateProductData} from '~/redux/action/productDetail';
import { MDBDataTable } from 'mdbreact';

class OrderHistory extends Component {
	constructor(props){
		super(props)
		this.getItemData = this.getItemData.bind(this);
		this.getItemData1 = this.getItemData1.bind(this);
		/*this.onQuantityChange = this.onQuantityChange.bind(this);*/
		this.openModal = this.openModal.bind(this);
		this.onQuantityChange1 = this.onQuantityChange1.bind(this);
		this.state = {
			itemname: '',
			categoryname: '',
			categorycode: '',
			categorytype: '',
			productcode: '',
			description: '',
			price: '',
			brandname: '',
			itemtype: '',
			quantity: '1',
			quantity1: '1',
			packing_type: '',
			qty_per_cartoon: '',
			stock: '',
			weight: '',	
			dimension: '',
			country_association: '',
			country_origin: '',
			list_price: '',	
			dimension_id: '',
			dimension_od: '',
			dimension_ow: '',
			display_zwz_product: false,
			display_nod_product: false,	
			nod_itemName: '',
			push_nod_data: [],
			hover_nod_data: [],
			reference_num: '',
			rfqData: [],
			rfqDataDetails: [],
			showModal: false,
			isActive: false
		}
	}

	openModal(){
		console.log("dfghjk");
		this.setState({
			showModal: true
		})		
	}

	componentDidMount(){
		if (window.location.href==="http://store.zwz.co.in/rfq-history" || window.location.href==="http://store.zwz.co.in/order-history" || window.location.href === "http://store.zwz.co.in/order-history#" || window.location.href.indexOf("http://localhost:3000/order-history") > -1) {
			this.setState({
				isActive: true
			})

			axios.get('http://apizwz.prtouch.com/api/my_order/' , {
			 	 headers: {
	          	'Authorization' : 'Token ' + sessionStorage.getItem('auth_key')
	        	} 

			}).then((response) =>  {
				this.setState({
		    		rfqData: response.data.message.data,
		    		isActive: false
				})	 
				// this.state.rfqData = response.data.message.data;
				// this.state.isActive = false;
				// this.state.rfqData.map((item, index) => (
				// 	console.log(item)
				// ));	
		    }).catch(function (error) {});
		}else if(window.location.href==="http://nod.prtouch.com:8081/order-history" || window.location.href==="http://nod.prtouch.com:8081/order-history#"){
			this.setState({
				isActive: true
			})
			axios.get('http://apinod.prtouch.com/api/my_order/' , {
			 	headers: {
	          		'Authorization' : 'Token ' + sessionStorage.getItem('auth_key')
	        	} 
			}).then((response) =>  {
		    	var arr = [];
				for(var i = 0; i < response.data.message.info.length; i++) {
					for(var z = 0; z < response.data.message.info[i].data.length; z++) {
			   			var newarr= [];
						var orderData  = {};
			    		orderData['BrandName'] = response.data.message.info[i].data[z].BrandName;
			    		orderData['ItemName'] = response.data.message.info[i].data[z].ItemName;
			    		orderData['CatType'] = response.data.message.info[i].data[z].cattype
			    		orderData['CatName'] = response.data.message.info[i].data[z].catname
						orderData['Qty'] = response.data.message.info[i].data[z].Qty
						orderData['Price'] = response.data.message.info[i].data[z].Price
						/*orderData['Availability'] = this.state.added_item[i].Availability;
						orderData['item_detail_id'] = this.state.added_item[i].item_detail_id;
						orderData['itemname'] = this.state.added_item[i].itemname;
						orderData['cattype'] = this.state.added_item[i].cattype;
						orderData['catname'] = this.state.added_item[i].catname;
						orderData['itemcode'] = this.state.added_item[i].itemcode;
						orderData['descript'] = this.state.added_item[i].descript;
						orderData['quantity'] = this.state.added_item[i].quantity;
						orderData['amount_per_unit'] = this.state.added_item[i].amount_per_unit;
						orderData['total_amount'] = this.state.added_item[i].total_amount;
						orderData['added_on'] = this.state.added_item[i].added_on;
						orderData['brandname'] = this.state.added_item[i].brandname;*/    
			    		/*newarr.push(orderData);*/
			}
				arr.push(orderData);
			}
			console.log(arr);
		    this.setState({
				rfqData: response.data.message.info,
				rfqDataDetails: arr,
				isActive: false
		    })
	
		}).catch(function (error) { });


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

	    let { push_nod_data } = this.state
		push_nod_data[index].quantity = value
		this.setState({
		push_nod_data,
		quantity1: this.state.push_nod_data[0].quantity,
		})

		
	}

	async getItemData(){
		var ProductData = sessionStorage.getItem('product_data');

		var ProductData1 = JSON.parse(ProductData)
		console.log(ProductData1);
		console.log(ProductData1.itemid[0])
		var price = parseInt(ProductData1.price[0]);
		var quantity = parseInt(this.state.quantity);
		var amount = price * quantity;
		console.log(amount);
		console.log(this.props.isLoggedIn)

/*
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
		}*/

		if (window.location.href==="http://store.zwz.co.in/product-category" || window.location.href==="http://localhost:3000/product-category" ) {

		if (this.props.isLoggedIn) {

		var arr = [];
		var orderData = {};

			orderData['item_id'] = ProductData1.itemid[0].toString();
		    orderData['item_name'] = ProductData1.itemname[0];
		    orderData['amount_per_unit'] = ProductData1.price[0];
		    orderData['quantity'] = this.state.quantity.toString();

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
	    	this.props.history.push('/cart');
	    	/*window.location.reload();*/
	    	
	    })
	    .catch(function (error) {
	      
	      
	    });


		} else{
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
		}

		} else if (window.location.href==="http://nod.prtouch.com:8081/product-category") {

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
	    	this.props.history.push('/cart');
	    	/*window.location.reload();*/
	    	
	    })
	    .catch(function (error) {
	      
	      
	    });


		} else{
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



		 if (window.location.href==="http://nod.prtouch.com:8081/product-category" ||  window.location.href==="http://localhost:3000/product-category" ) {

		if (this.props.isLoggedIn) {

		var arr = [];
		var orderData = {};

			orderData['item_id'] = itemId;
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
			console.log(this.state.push_nod_data[0].quantity);
			this.props.dispatch(addCartData({
				...itemData,
				Quantity: this.state.quantity1,
				Amount: amount
			}))
		}
			this.props.history.push('/cart');
		}

		}





	}







	render(){
		const { whenClicked, value} = this.props;
		const data = {
			columns: [
				{
					label:'Order Number',
					field:'mysc_order_no',
					sort: 'asc',
				},
				{
					label:'Action',
					field:'<a href="#" onClick={this.openModal}> Download Invoice </a> {this.state.showModal && (<ModalData /> )',
					sort: 'asc',
				},


				{
					label:'Brand Name',
					field:'brand_name',
					sort: 'asc',
				},

				{
					label:'Item Name',
					field:'item_name',
					sort: 'asc',
				},

				{
					label:'Quantity',
					field:'quantity',
					sort: 'asc',
				},

				{
					label:'Price',
					field:'amount_per_unit',
					sort: 'asc',
				},

				{
					label:'Date',
					field:'added_on',
					sort: 'asc',
				},

				
					],

					rows:this.state.rfqData,
					
					}		


		return(
			<div>
				<Header {...this.props} typeaheadText={this.state.itemname} > </Header>
				<div>
					{this.state.isActive && 
						<div className="content-container wrapper" style={{backgroundColor: '#fff', padding: 10, marginBottom: 5, height: 400, textAlign: 'center'}}>

	                      <i
	                        className="fa fa-refresh fa-spin"
	                        style={{ marginRight: "5px", fontWeight: 'bold', fontSize: 30, color:'#00619f', textAlign: 'center', marginTop: 200 }}
	                      />
	                    </div>
	                }
				{
				

                //this.state.rfqData.length>0 ? (
				//this.state.rfqData.map((item, index) => (
					<div className="content-container wrapper" style={{backgroundColor: 'rgb(199, 199, 199)', padding: 10, marginBottom: 5}}>

							<div style={{width:'100%'}}>
								<Row>									
									<Col sm={12} style={{marginTop: 15, marginBottom:5}}>
									<Card>
								        <CardBody className="customise_card_body" style={{padding: 18}}>
								          	<MDBDataTable
								          	           striped
								          	           bordered
								          	           hover
								          	           data={data}
								          	         />
								         

								        </CardBody>
								      </Card>
									
								</Col>

								
								</Row>
							</div>


							
							
							
						</div>


				//))
				}
			}

				
			</div>

			





			</div>
		)

	}
}


export default connect(state => ({
	...state.user,
	...state.cartDetail,
	...state.updateProductData
}))(OrderHistory)