import React, { Component } from 'react'
import _ from 'lodash'
import './styles.scss'
import { Button, Row, Col,Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle} from 'reactstrap';
import {connect} from 'react-redux';
import Header from '~/components/Header';
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






class RFQ extends Component {

	constructor(props){
		super(props)
		this.getItemData = this.getItemData.bind(this);
		this.getItemData1 = this.getItemData1.bind(this);
		this.onQuantityChange = this.onQuantityChange.bind(this);
		this.onQuantityChange1 = this.onQuantityChange1.bind(this);
		this.goToOrderDetail = this.goToOrderDetail.bind(this);
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
		}
	}

	componentWillMount(){
		this.setState({
			reference_num: localStorage.getItem('reference_number')
		})

		if (window.location.href === 'http://store.zwz.co.in/product-category') {
		console.log(this.props.product)
		var ProductData = localStorage.getItem('product_data');
		var ProductData1 = JSON.parse(ProductData);
		var ProductVal = localStorage.getItem('product-val');

		this.setState({
			display_zwz_product: true,
			itemname: ProductData1.itemname[0],
			categoryname: ProductData1.catname[0],
			categorytype: ProductData1.cattype[0],
			productcode: ProductData1.itemcode[0],
			description: ProductData1.descript[0],
			price: ProductData1.price[0],
			brand: ProductData1.brandname[0],
			categorycode: ProductData1.catcode[0],
			itemtype: ProductData1.itemtype[0],
			country_origin: ProductData1.countryoforigin[0],
			


		})
		



		axios.post('http://api.store.zwz.co.in/api/item_availability/', {
	    	"searching_key": ProductData1.itemname[0]
	    }


	    )
	    .then((response) =>  {
	    	console.log(response);
	    	console.log(response.data);
	    	this.setState({
	    		packing_type: response.data.data.PackingType,
	    		qty_per_cartoon: response.data.data.QtyPerCarton,
	    		stock: response.data.data.Stock,
	    		weight: response.data.data.Weight,
	    		dimension: response.data.data.Dimension,
	    		country_association: response.data.data.CA,
	    		list_price: response.data.data.ListPrice,
	    		dimension_id:response.data.data.Dimension_ID,
				dimension_od:response.data.data.Dimension_OD,
				dimension_ow: response.data.data.Dimension_OW




	    	})
	    	

	    	

	    })
	    .catch(function (error) {
	      
	      
	    });

		}else if (window.location.href === 'http://store.nodbearings.net/product-category' || window.location.href === 'http://localhost:3000/product-category') {
			var nod_product_name = localStorage.getItem('nod_product_name');
			var nod_product_data = localStorage.getItem('nod_product_data');
			var nod_selected_data = JSON.parse(nod_product_data);

			console.log(nod_selected_data);
			this.setState({
				display_nod_product: true,
				nod_itemName: nod_product_name,
				push_nod_data:nod_selected_data,
				itemname: nod_product_name
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

	goToRFQDetail(){
		this.props.history.push('/rfq-history');
	}

	goToOrderDetail(referenceNum){
		localStorage.setItem('reference_num' , referenceNum);

		if (window.location.href=== "http://store.zwz.co.in/rfq") {


			axios.post('http://api.store.zwz.co.in/api/rfq_history/' , 

		 {
		 	
		 	"putawayno_key": this.state.reference_num
		 },{
		 	 headers: {
          	'Authorization' : 'Token ' + localStorage.getItem('auth_key')
        	} 

		 }
		 

		 )
	    .then((response) =>  {

	    	console.log(response);
	    	localStorage.setItem('rfq_history' , JSON.stringify(response.data.data));
	    	this.props.history.push('/order-detail');
	    	/*this.props.history.push('/order-detail');*/
	    	/*this.props.history.push('/cart');*/
	    	/*window.location.reload();*/
	    	
	    })
	    .catch(function (error) {
	      
	      
	    });

		} else if (window.location.href=== "http://store.nodbearings.net/rfq" || window.location.href=== "http://localhost:3000/rfq") {

			axios.post('http://api.store.nodbearings.net/api/rfq_history/' , 

		 {
		 	
		 	"putawayno_key": this.state.reference_num
		 },{
		 	 headers: {
          	'Authorization' : 'Token ' + localStorage.getItem('auth_key')
        	} 

		 }
		 

		 )
	    .then((response) =>  {

	    	console.log(response);
	    	localStorage.setItem('rfq_history' , JSON.stringify(response.data.data));

	    	/*console.log(sessionStorage.getItem('rfq_history'));
	    	var rfqDataVal = sessionStorage.getItem('rfq_history');
	    	console.log(JSON.parse(rfqDataVal));*/
	    	this.props.history.push('/order-detail');

	    	/*this.props.history.push('/cart');*/
	    	/*window.location.reload();*/
	    	
	    })
	    .catch(function (error) {
	      
	      
	    });

		}



		/*this.props.history.push('/order-detail');*/
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
		var ProductData = localStorage.getItem('product_data');

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

		} else if (window.location.href==="http://store.nodbearings.net/product-category") {

		if (this.props.isLoggedIn) {

		var arr = [];
		var orderData = {};

			orderData['item_id'] = ProductData1.itemid[0].toString();
		    orderData['item_name'] = ProductData1.itemname[0];
		    orderData['amount_per_unit'] = ProductData1.price[0];
		    orderData['quantity'] = this.state.quantity.toString();

		    arr.push(orderData);


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
		var nod_product_name = localStorage.getItem('nod_product_name');
		var nod_product_data = localStorage.getItem('nod_product_data');
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



		 if (window.location.href==="http://store.nodbearings.net/product-category" ||  window.location.href==="http://localhost:3000/product-category" ) {

		if (this.props.isLoggedIn) {

		var arr = [];
		var orderData = {};

			orderData['item_id'] = itemId;
		    orderData['item_name'] = itemName;
		    orderData['amount_per_unit'] = Price;
		    orderData['quantity'] = this.state.quantity1;

		    arr.push(orderData);


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
		return(
			<div>
				<Header {...this.props} typeaheadText={this.state.itemname} > </Header>
				<div className="content-container wrapper" style={{backgroundColor: '#f4f4f4', padding: 10, marginTop: 170}}>

					
					<Row>
						<Col sm={12} style={{marginTop: 25, marginBottom:25}}>
							 <Card>
						        <CardBody className="customise_card_body" style={{padding: 18}}>
						          	<CardTitle style={{marginBottom: 10}}>
						          		<h6 style={{fontWeight: 'bold'}}> Reference Number: <span> {this.state.reference_num} </span> </h6>
						          		<h4 style={{ fontSize: 18 , marginBottom: 15}}> Your request has been processed. Your reference number for the request is <span style={{fontWeight: 'bold'}}>{this.state.reference_num} </span>. You can contact us at <b> online.rfq@zwz.co.in</b></h4>
						          		<span className="item-action" style={{fontSize: 14}}> <button className="button" onClick={() => this.goToRFQDetail()} type="button">RFI History</button>  </span>
						          	</CardTitle>
						         

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
	...state.user,
	...state.cartDetail,
	...state.updateProductData
}))(RFQ)