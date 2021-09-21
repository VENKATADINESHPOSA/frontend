import React, { Component } from 'react'
import _ from 'lodash'
import './styles.scss'
import { Button, Row, Col,Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle,Modal,ButtonToolbar} from 'reactstrap';
import {connect} from 'react-redux';
import Header from '~/components/Header';
import Currency from '~/assets/images/currency.svg';
import share from '~/assets/images/share.png';
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



var urlDetail = window.location.href.split(":");
var hostname = window.location.hostname;
console.log(urlDetail);
var itemId = urlDetail[2];
console.log(itemId);
console.log(hostname);


class ProductCategory extends Component {

	constructor(props){
		super(props)
		this.getItemData = this.getItemData.bind(this);
		this.getItemData1 = this.getItemData1.bind(this);
		this.onQuantityChange = this.onQuantityChange.bind(this);
		this.onQuantityChange1 = this.onQuantityChange1.bind(this);
		this.toggleActive = this.toggleActive.bind(this);
		this.toggleActive1 = this.toggleActive1.bind(this);
		this.shareToggel = this.shareToggel.bind(this);
		this.sendLink = this.sendLink.bind(this);
		this.copyText = this.copyText.bind(this);
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
			isCompleted: "",
			isCompleted1: false,
			shareModal: false
		}
	}

	copyText(){
		var copyText = document.getElementById("myInput");
		copyText.select();
		copyText.setSelectionRange(0, 99999)
		document.execCommand("copy");
	}

	sendLink(){
		
		if (window.location.href === "http://zwz.prtouch.com:8081/product-category" ) {
			this.setState({
				url: "http://zwz.prtouch.com:8081/productDetail/ZWZ:"+this.state.itemId
			})

			sessionStorage.setItem("itemId", this.state.itemId)
			this.shareToggel();
		}else if (window.location.href === "http://localhost:3000/product-category") {
			this.setState({
				url: "http://localhost:3000/productDetail/ZWZ:"+this.state.itemId
			})
			sessionStorage.setItem("itemId", this.state.itemId)
			this.shareToggel();

		}else if (window.location.href === "http://nod.prtouch.com:8081/product-category") {
			this.setState({
				url: "http://nod.prtouch.com:8081/productDetail/NOD:"+this.state.itemId
			})
			sessionStorage.setItem("itemId", this.state.itemId)
			this.shareToggel();

		}
		/*if (window.location.href === "http://zwz.prtouch.com:8081/product-category" || window.location.href === "http://localhost:3000/product-category") {
			axios.get('http://apizwz.prtouch.com/api/ShareItem/ZWZ/'+this.state.itemId+"/" , 
				{
			 		headers: {
	          			'Authorization' : 'Token ' + sessionStorage.getItem('auth_key')
	        		} 

				 }
			)
		    .then((response) =>  {
		    	console.log(response);
		    })
		    .catch(function (error) {
		    });
		}*/
	}

	shareToggel(){

    	this.setState(prevState => ({ shareModal: !prevState.shareModal }));
	}


	componentDidMount(){
		if (window.location.hostname === "zwz.prtouch.com" || window.location.hostname === "localhost") {
			axios.post('http://apizwz.prtouch.com:8081/api/ShareItemDetails/',
				{
					"db_type": "ZWZ",
					"itemId": itemId
				},
    		)
       		.then((response) =>  {
       			console.log(response.data.itemname[0]);
       			console.log(response.data.catname[0]);
       			sessionStorage.setItem('getProductData', JSON.stringify(response.data))

       			this.setState({
       				display_zwz_product: true,
       				display_nod_product: false,
					itemname: response.data.itemname[0],
					categoryname: response.data.catname[0],
					categorytype: response.data.SubCategory[0],
					productcode:response.data.item_code[0],
					description: response.data.itemname[0],
					price: response.data.price[0],
					brand: response.data.brand_name[0],
					packing_type: response.data.packing_type[0],
		    		qty_per_cartoon: response.data.QtyPerCarton[0],
		    		stock: response.data.Availability[0],
		    		weight: response.data.weight[0],
		    		country_association: response.data.CountryOfAssociation[0],
		    		list_price: response.data.price[0],
		    		dimension_id:response.data.ID[0],
					dimension_od:response.data.OD[0],
					dimension_ow: response.data.OW[0],
					Availability: response.data.Availability[0],
					image: response.data.image_url
				})

				console.log(this.state.itemname);
				console.log("this.state.itemname");
		        
       		})
       		.catch(function (error) {
    		});
		}else if (window.location.hostname === "nod.prtouch.com") {
			axios.post('http://apinod.prtouch.com:8081/api/ShareItemDetails/',
				{
					"db_type": "NOD",
					"itemId": itemId
				},

      			{
         			headers: {
		              'Content-Type': 'application/json',
		              'Authorization' : 'Token ' + sessionStorage.getItem('auth_key')
            		} 
        		}
    		)
       		.then((response) =>  {
       			console.log(response);
       			this.setState({
       				display_zwz_product: false,
       				display_nod_product: true,
       				itemId: response.data.data[0].itemId,
					itemname: response.data.data[0].itemname,
					categoryname: response.data.data[0].catname,
					categorytype: response.data.data[0].SubCategory,
					productcode:response.data.data[0].itemname,
					description: response.data.data[0].itemname,
					price: response.data.data[0].list_price,
					brand: response.data.data[0].brand_name,
					packing_type: response.data.data[0].packing_type,
		    		qty_per_cartoon: response.data.data[0].QtyPerCarton,
		    		stock: response.data.data[0].Stock,
		    		weight: response.data.data[0].Weight,
		    		dimension: response.data.data[0].Dimension,
		    		country_association: response.data.data[0].CountryOfAssociation,
		    		list_price: response.data.data[0].ListPrice,
		    		dimension_id:response.data.data[0].ID,
					dimension_od:response.data.data[0].OD,
					dimension_ow: response.data.data[0].OW
				})
        
       		})
       		.catch(function (error) {
    		});
		}
		

		/*this.setState({
			itemname: ProductData1.itemname[0],
			categoryname: ProductData1.catname[0],
			categorytype: ProductData1.cattype[0],
			productcode: ProductData1.itemcode[0],
			description: ProductData1.descript[0],
			price: ProductData1.price[0],
			brand: ProductData1.brandname[0],
			categorycode: ProductData1.catcode[0],
			itemtype: ProductData1.itemtype[0],
		})*/
		
	}

	toggleActive(wishId) { 
		console.log(wishId);
	    /*let newState = Object.assign({}, this.state)
	    let wish = _.find(newState.wishes, {id: wishId});
	    wish.have = !wish.have
	    this.setState(newState)*/
	    this.setState({
	    	isCompleted: wishId
	    })
	  }

	  toggleActive1(){
	  	this.setState({
	  		isCompleted1: !this.state.isCompleted1
	  	})
	  }
	  

	onQuantityChange(e){
	    this.setState({
	    	quantity: e.target.value
	    })

	}

	onQuantityChange1(index, value ){

	    let { push_nod_data } = this.state
		push_nod_data[index].quantity = value
		this.setState({
		push_nod_data,
		quantity1: this.state.push_nod_data[0].quantity,
		})

		
	}

	async getItemData(){
		var ProductData = sessionStorage.getItem('getProductData');
		var ProductData1 = JSON.parse(ProductData)
		console.log(ProductData1);
		var price = parseInt(ProductData1.price);
		var quantity = parseInt(this.state.quantity);
		var amount = price * quantity;

		
		if (window.location.hostname === "zwz.prtouch.com" || window.location.hostname === "localhost"){
			console.log("hello");
		if (this.props.isLoggedIn) {
			console.log(ProductData1);
		var arr = [];
		var orderData = {};
			orderData['item_id'] = this.state.itemId.toString();
		    orderData['item_name'] = this.state.Item_Name;
		    orderData['amount_per_unit'] = this.state.price;
		    orderData['quantity'] = this.state.quantity.toString();
		    orderData['flag'] = "add_cart"
		    arr.push(orderData);
		axios.post('http://apizwz.prtouch.com:8081/api/add_item/' , 
		 {
		 	"item_info": arr
		 },{
		 	 headers: {
          	'Authorization' : 'Token ' + sessionStorage.getItem('auth_key')
        	} 

		 }
		 )
	    .then((response) =>  {
	    	this.props.history.push('/cart');
	    })
	    .catch(function (error) {
	    });

		} else{
			console.log(ProductData1);
			var new_quantity = parseInt(this.state.quantity);
		let itemExist = _.find(this.props.cart, item => item.itemcode === ProductData1.item_code)

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


		axios.post('http://apinod.prtouch.com:8081/api/add_item/' , 

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


		axios.post('http://apinod.prtouch.com:8081/api/add_item/' , 

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
		const { shareModal } = this.state
		return(
			<div>
				<Header {...this.props} typeaheadText={this.state.itemname} > </Header>
				<div className="content-container wrapper" style={{backgroundColor: '#f4f4f4', padding: 10, marginTop: 175}}>

					{this.state.display_zwz_product && (
					<Row>					

						<Col sm={12} style={{marginTop: 6}}>
							<h3 > You Searched For {this.state.itemname} </h3>
						</Col>

					</Row>
					)}

					{this.state.display_nod_product && (
					<Row>					

						<Col sm={12} style={{marginTop: 6}}>
							<h3 > You Searched For {this.state.nod_itemName} </h3>
						</Col>

					</Row>
					)}


					{this.state.display_zwz_product && (

					<Row>
						<Col sm={8} style={{marginTop: 25}}>
							 <Card>
						        <CardBody className="customise_card_body" style={{padding: 18}}>
						          	<CardTitle style={{marginBottom: 20}}>
						          		<div style={{width: '100%' , float: 'left', marginBottom: 12}}> 	
						          			<img src={this.state.image} style={{height:'65px',width:'65px'}} /> 
						          		</div>
						          		<h4 style={{fontWeight: 'bold' , width: '80%' , float: 'left'}}> {this.state.itemname}  </h4>
						          		{/*<span> Add to wishlist<i className="fa fa-heart" style={{ color: this.state.isCompleted1? '#DE5347': '#444', paddingLeft: 10, fontSize: 18}} onClick={() => this.toggleActive1()} ></i> </span>*/}
						          		
						          		
						          	</CardTitle>
						          	<CardSubtitle style={{fontSize: 14, width: '100%', float: 'left'}}>
							          	<p><span style={{fontWeight: 'bold', paddingRight: 5}}>  Brand Name: </span> <span> {this.state.brand} </span> </p>
						       			
						          	</CardSubtitle>

						        </CardBody>
						      </Card>
							
						</Col>
						<Col sm={4} style={{marginTop: 25}}>
							 <Card>
						        <CardBody className="customise_card_body" style={{padding: 18}}>
						         
						          <CardSubtitle>
						          		{ this.state.price === 0 &&
						          			<p className="list_price"> List Price: <a style={{fontWeight: 'bold', paddingLeft: 4, paddingBottom: 30, borderBottom: 1, color: 'red', fontSize: 13, cursor: 'pointer'}}> Display on request </a> </p>
						          		}

						          		{this.state.price>0 &&
						          			<p className="list_price"> List Price: <a style={{fontWeight: 'bold', paddingLeft: 4, paddingBottom: 30, borderBottom: 1}}> <i class="fa fa-inr" style={{fontSize: 12}} aria-hidden="true"></i> {this.state.price}  </a> </p>
						          		}
						          		<p style={{fontWeight: 'bold'}}> Quantity: 
						          			<input type="text" value={this.state.quantity} name="quantity" placeholder="Quantity" onChange= {this.onQuantityChange} className="setInput" />
						          		</p>

						          		 <input type="button" onClick={this.getItemData} value="Add to cart" className="login_btn" />
						          </CardSubtitle>
						        </CardBody>
						      </Card>
							
						</Col>
						<Col sm={8} style={{marginTop: 25}}>
							 <Card>
							 	<CardBody className="customise_card_body" style={{padding: 18}}>
						       		<h5 className="product_title_style"> Product Details </h5>
						       		<div style={{width: '50%', backgroundColor: '#f4f4f4', padding: 18, fontSize: 14, float: 'left'}}>
						       			<p><span style={{fontWeight: 'bold', paddingRight: 5}}>Category: </span><span style={{textTransform: 'capitalize'}}> {this.state.categorytype} </span> </p>
							          	<p><span style={{fontWeight: 'bold', paddingRight: 5}}> Sub Category: </span>{this.state.categoryname} </p>
						       			<p><span style={{fontWeight: 'bold', paddingRight: 5}}>  Brand Name: </span> <span> {this.state.brand} </span> </p>
						       			{
						       				this.state.qty_per_cartoon==="0" ?(
						       					<p> <span style={{fontWeight: 'bold', paddingRight: 5}}> Qty/Cartoon:</span> <span> NA </span></p>	
						       				):(
						       					<p> <span style={{fontWeight: 'bold', paddingRight: 5}}> Qty/Cartoon:</span> <span> {this.state.qty_per_cartoon} nos </span></p>
						       				)
						       			}
						       			
						       		</div>

						       		<div style={{width: '50%', paddingBottom: 55, backgroundColor: '#f4f4f4', padding: 18, fontSize: 14, float: 'left'}}>
						       			
						       			<p> <span style={{fontWeight: 'bold', paddingRight: 5}}> Item Name: </span> <span> {this.state.itemname} </span></p>
						       			<p> <span style={{fontWeight: 'bold', paddingRight: 5}}> Packing Type:</span> <span> {this.state.packing_type} </span></p>
						       			
						       			<p> <span style={{fontWeight: 'bold'}}> Country Association: </span> <span> {this.state.country_association} </span> </p>

						       			{ this.state.list_price === 0 &&
						          			<p className="list_price"> List Price: <a style={{fontWeight: 'bold', paddingLeft: 4, paddingBottom: 30, borderBottom: 1, color: 'red', cursor: 'pointer' , fontSize: 12}}> Display on request </a> </p>
						          		}

						          		{this.state.list_price>0 &&
						          			<p className="list_price"> List Price: <a style={{fontWeight: 'bold', paddingLeft: 4, paddingBottom: 30, borderBottom: 1}}> <i class="fa fa-inr" style={{fontSize: 12}} aria-hidden="true"></i> {this.state.list_price}  </a> </p>
						          		}
						       			


						       			
						       		</div>
						       	</CardBody>
						      </Card>
							
						</Col>

						<Col sm={4} style={{marginTop: 25}}>
							 <Card>
							 	<CardBody className="customise_card_body" style={{padding: 18}}>
						       		<h5 className="product_title_style"> Availability Details </h5>

						       		<div style={{width: '100%'}}>
						       			<table className="product_detail_table" style={{width: '100%'}}>
						       				<tr style={{backgroundColor: '#ccc'}}>
						       					<th> Item Name </th>						       					
						       					<th> Availability </th>
						       				</tr>

						       				<tr>
						       					<td> {this.state.itemname} </td>

						       					{
						       						this.state.stock==="" ?(
						       							<td> NA </td>

						       						):(
						       							<td> {this.state.Availability} </td>
						       						)
						       					}
	
						       					

						       				</tr>

						       			</table>

						       		</div>
						       	</CardBody>
						      </Card>
							
						</Col>
							
						<Col sm={8} style={{marginTop: 25}}>
							 <Card>
							 	<CardBody className="customise_card_body" style={{padding: 18}}>
						       		<h5 className="product_title_style"> Technical Specifications </h5>
						       		<div style={{width: '50%', backgroundColor: '#f4f4f4', padding: 18, fontSize: 14, float: 'left'}}>
						       			{
						       				this.state.dimension_id === "0.0" ? (
						       					<p> <span style={{fontWeight: 'bold'}}> Dimension: </span> <span> ID: NA || OD: NA || OW: NA</span> </p>
						       				):(
						       					<p> <span style={{fontWeight: 'bold'}}> Dimension: </span> <span> ID: {this.state.dimension_id} || OD: {this.state.dimension_od} || OW: {this.state.dimension_ow}</span> </p>
						       				)
						       			}
						       		</div>

						       		<div style={{width: '50%', paddingBottom: 55, backgroundColor: '#f4f4f4', padding: 18, fontSize: 14, float: 'left'}}>
						       			{
						       				this.state.weight === "0.000000" ? (
						       					<p> <span style={{fontWeight: 'bold', paddingRight: 5}}> Weight:</span> <span> NA </span></p>
						       				):(
						       					<p> <span style={{fontWeight: 'bold', paddingRight: 5}}> Weight:</span> <span> {this.state.weight} kg </span></p>
						       				)
						       			}
						       			
						       		</div>
						       	</CardBody>
						      </Card>
							
						</Col>
				

					</Row>

					)}
					
					{ (this.state.display_nod_product && this.state.push_nod_data.length> 0) && (


						this.state.push_nod_data.map((item, index) => 

						<Col sm={12} style={{marginTop: 25}}>
							 <Card>
							 	<CardBody className="customise_card_body" style={{padding: 18}}>
							 		
							       		<h5 className="product_title_style" style={{width:'85%' , float: 'left'}}> Product Details </h5>
							       		<div style={{width: '15%' , float: 'left'}} className="icon_container"> 
						          			Add to wishlist <span><i className="fa fa-heart" color={this.state.isCompleted ? '#1DA664' : '#DE5347'}  style={{ color: this.state.isCompleted === item.itemid ? '#DE5347': '#444', paddingLeft: 10, fontSize: 18}} onClick={() => this.toggleActive(item.itemid)}>
												
											</i>
											</span>
							          	</div>

						          	

						       		<div style={{width: '25%', backgroundColor: '#f4f4f4', padding: 18, fontSize: 14, float: 'left'}}>
						       			<p><span style={{fontWeight: 'bold', paddingRight: 5}}>  Brand Name: </span> <span> {item.brandname} </span> </p>
						       			<p> <span style={{fontWeight: 'bold', paddingRight: 5}}> Item Name: </span> <span> {item.itemname} </span></p>
						       			<p> <span style={{fontWeight: 'bold', paddingRight: 5}}> Packing Type:</span> <span> {item.PackingType} </span></p>
						       			{
						       				item.Dimension_ID === "0.0" ? (
						       					<p> <span style={{fontWeight: 'bold'}}> Dimension: </span> <span> ID: NA || OD: NA || OW: NA</span> </p>
						       				):(
						       					<p> <span style={{fontWeight: 'bold'}}> Dimension: </span> <span> ID: {item.Dimension_ID} || OD: {item.Dimension_OD} || OW: {item.Dimension_OW}</span> </p>
						       				)
						       			}
						       			
						       			
						       		</div>

						       		<div style={{width: '25%', backgroundColor: '#f4f4f4', padding: 18, fontSize: 14, float: 'left', paddingBottom: 39}}>

						       			<p> <span style={{fontWeight: 'bold'}}> Category Name: </span> <span> {item.cattype} </span> </p>
						       			<p> <span style={{fontWeight: 'bold'}}> Sub Category: </span> <span> {item.catname} </span> </p>

						       			{
						       				item.QtyPerCarton ==="0" ? (
						       					<p> <span style={{fontWeight: 'bold', paddingRight: 5}}> Qty/Cartoon:</span> <span> NA </span></p>	
						       				):(
						       					<p> <span style={{fontWeight: 'bold', paddingRight: 5}}> Qty/Cartoon:</span> <span> {item.QtyPerCarton} nos </span></p>
						       				)
						       			}

						       			{
						       				item.Stock === "" ? (
						       					<p> <span style={{fontWeight: 'bold', paddingRight: 5}}>Availability:</span> <span> NA </span></p>
						       				):(
						       					<p> <span style={{fontWeight: 'bold', paddingRight: 5}}>Availability:</span> <span> {item.Availability} </span></p>
						       				)
						       			}

						       			

						       			
						       		</div>

						       		<div style={{width: '25%', backgroundColor: '#f4f4f4', padding: 18, fontSize: 14, float: 'left', paddingBottom: 75}}>
						       			<p> <span style={{fontWeight: 'bold'}}> Country Association: </span> <span> {item.countryoforigin} </span> </p>

						       			{
						       				item.price === 0 ? (
						       					<p> <span style={{fontWeight: 'bold'}} Rupees = {'\u20B9'}> List Price: </span> <span style={{fontWeight: 'bold', paddingLeft: 4, paddingBottom: 30, borderBottom: 1, color: 'red', fontSize: 12, cursor: 'pointer'}}> Display on request </span> </p>
						       				): (
						       					<p> <span style={{fontWeight: 'bold'}} Rupees = {'\u20B9'}> List Price: </span> <span> <i class="fa fa-inr" style={{fontSize: 12}} aria-hidden="true"></i> {item.price } </span> </p>
						       				)
						       			}

						       			

						       			{
						       				item.Weight === "0.000000" ? (
						       					<p> <span style={{fontWeight: 'bold', paddingRight: 5}}> Weight:</span> <span> NA </span></p>
						       				):(
						       					<p> <span style={{fontWeight: 'bold', paddingRight: 5}}> Weight:</span> <span> {item.Weight} kg </span></p>
						       				)
						       			}

						       			
						       		</div>

						       		<div style={{width: '22%' , float: 'left', marginLeft: 30, border: 1}} className="add_cart_container">

						       			{ item.price === 0 &&
						          			<p className="list_price"> List Price: <a style={{fontWeight: 'bold', paddingLeft: 4, paddingBottom: 30, borderBottom: 1, color: 'red', fontSize: 12, cursor: 'pointer'}}> Display on request </a> </p>
						          		}

						          		{item.price>0 &&
						          			<p className="list_price"> List Price: <a style={{fontWeight: 'bold', paddingLeft: 4, paddingBottom: 30, borderBottom: 1}}> <i class="fa fa-inr" style={{fontSize: 12}} aria-hidden="true"></i> {item.price} </a> </p>
						          		}


							       		<p style={{fontWeight: 'bold', textAlign: 'center', fontSize: 15}}> Quantity: 
							          		<input type="text" onChange= {(e)=>this.onQuantityChange1(index, e.target.value )} style={{height: 27, width: 73, marginBottom: 16}} defaultValue={item.quantity || 1} name="quantity" placeholder="Quantity"  className="setInput" /> nos
							          		<input type="button"  onClick={() => this.getItemData1(item.itemid, item.itemname , item.price, item)} style={{width: 100, fontSize: 12, fontWeight: 'bold' , height: 28}} value="Add to cart" className="login_btn" />
							          	</p>


						          	</div>



						          		 
						       	</CardBody>
						      </Card>
							
						</Col>
						)






					)}



					
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
}))(ProductCategory)
