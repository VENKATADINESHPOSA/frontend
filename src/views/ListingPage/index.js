import React, { Component } from 'react'
import './styles.scss'
import _ from 'lodash'
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import { Button, Row, Col,Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Table, Modal} from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import {login} from '~/redux/helpers/user'
import {updateUserData} from '~/redux/action/user';
import {updateCartData,addCartData} from '~/redux/action/cartDetails';
import {updateProductData} from '~/redux/action/productDetail';
import {updateCartItemData} from '~/redux/action/cartItemVal';
import {connect} from 'react-redux';
import cogoToast from 'cogo-toast';
import axios, {CancelToken} from 'axios';
import Currency from '~/assets/images/currency.svg';
import image11 from '~/assets/images/bearings1.jpg';

var value1 = "";
var itemname = "";

class ListingPage extends Component{
	constructor(props){
		super(props);
		this.state={
			searching_records:[],
			posts:[],
			tableRows: [],
			listData: [],
			searchKeyword:'',
			keyVal: '',
			value: 1,
		}

		this.goToProductDetail = this.goToProductDetail.bind(this);
	}


	goToProductDetail(data){
		localStorage.setItem('product_data', JSON.stringify(data))
		this.props.history.push('/product-category');	
		
	}




	componentDidMount(){
		window.scrollTo(0, 0)
		this.setState({
			keyVal: localStorage.getItem('set_key'),
			tableRows: this.assemblePosts(),
			searchKeyword: localStorage.getItem('search_key')		
		})

		

		
		
	}

	onQuantityChange1(index, value, data){
		console.log(data)
		value1 = value
		itemname = data.itemname[0]
		console.log(value1,'value1');
		/*this.setState({
			value: value

		}, () => {
			console.log(this.state.value);
		})*/

		

	}

	addItem(data){
		console.log(data);
		console.log(value1, "value1");
		/*return false;*/
		if (itemname == data.itemname[0]) {
		 data.qty = value1
	    }
		/*this.setState({
			value: value1
		})*/
		console.log('value', value1);


		if (this.props.isLoggedIn) {

			var arr = [];
			var orderData = {};

			orderData['item_id'] = data.itemid[0].toString();
		    orderData['item_name'] = data.itemname[0];
		    orderData['amount_per_unit'] = data.price[0];
		    /*orderData['quantity'] = value1 == undefined ? data.qty.toString() : value1.toString();*/
		    orderData['quantity'] = data.qty.toString();
		    orderData['flag'] = "add_cart";

		    arr.push(orderData);


			axios.post('http://apizwz.prtouch.com:8081/api/add_item/' , 

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
		    	this.setState({
		    		showTypeahead: false,
		    	})
	    	
		    	if (this.props.match.path == "/cart") {
		    		window.location.reload();
		    	}else{
		    		this.props.history.push('/cart');
		    	}
	    	})
	    	.catch(function (error) {
	      
	   	   
	    	});


		} else{
	
			console.log('data',data);
			
			var price = parseInt(data.price[0]);
			var quantity = parseInt(this.state.value);
			var amount = price * quantity;
			console.log(amount);


			var new_quantity = parseInt(this.state.value);
			let itemExist = _.find(this.props.cart, item => item.itemcode === data.itemcode[0])

			if(itemExist) {
				this.props.dispatch(updateCartData({
					...itemExist,
					Quantity: parseInt(itemExist.Quantity) + parseInt(new_quantity),
					Amount:  (parseInt(itemExist.Quantity) + parseInt(new_quantity)) * amount
				}))
			} else {
				this.props.dispatch(addCartData({
					...data,
					Quantity: this.state.value,
					Amount: amount
				}))
			}

		
			this.setState({
				showTypeahead: false,
				quantity: '',
				
			})
			this.props.history.push('/cart');
		}
	}



	assemblePosts= () => {
		

		var ListData = localStorage.getItem('list_data');
		var ListData1 = JSON.parse(ListData);
		for(var i = 0; i< ListData1.length ; i++){
			
			ListData1[i].qty = 1
			
		}

	



		let posts = ListData1.map((postVal, index) => {
			console.log("postVal====>",postVal);


	     	return (
	     		<span> Hello </span>,

		       	{
		        	image: <div style={{flexDirection: 'column'}} onClick={() => this.goToProductDetail(postVal)}><div style={{paddingBottom: 10}}> <span style={{fontWeight: 'bold', fontSize: 16, cursor: 'pointer', color: 'rgb(0, 115, 158)'}}> {postVal.itemname[0]} ({postVal.brandname[0]}) </span></div> <div> <img src={image11} alt="Logo" style={{width: 80, height: 80, cursor: 'pointer'}} /></div></div>,
         			item_name : <div style={{flexDirection: 'column', paddingTop: 32}}> <div> <span> <strong style={{fontWeight: 'bold'}}> Item Name: </strong> {postVal.itemname[0]}</span></div> <div> <span> <strong style={{fontWeight: 'bold'}}> Brand Name: </strong>  {postVal.brandname[0]} </span> </div> <div> <span> <strong style={{fontWeight: 'bold'}}> Availability: </strong> <span style={{color: postVal.Availability == "Stock" ? "green" : "red", fontWeight: 'bold' }}>{postVal.Availability}</span> </span></div> </div>,
         			category : <div style={{flexDirection: 'column', paddingTop: 32}}> <div> <span> <strong style={{fontWeight: 'bold'}}>  Category: </strong> {postVal.cattype[0]}</span></div> <div> <span> <strong style={{fontWeight: 'bold'}}> Sub Category: </strong>  {postVal.catname[0]} </span> </div> </div>,
         			pt_ca : <div style={{flexDirection: 'column', paddingTop: 32}}> <div> <span> <strong style={{fontWeight: 'bold'}}>  Packing Type: </strong> {postVal.packing_type}</span></div> <div> <span> <strong style={{fontWeight: 'bold'}}> Country Association: </strong>  {postVal.countryoforigin[0]} </span> </div> </div>,
         			qty_price : <div style={{flexDirection: 'column', paddingTop: 32}}> <div> <span> <strong style={{fontWeight: 'bold'}}>  Qty/Cartoon: </strong> {postVal.QtyPerCarton}</span></div> <div> <span> <strong style={{fontWeight: 'bold'}}> List Price: </strong> <i class="fa fa-inr" style={{fontSize: 12}} aria-hidden="true"></i>  {postVal.price[0]}  </span> </div> </div>,
         			add_cart : <div style={{flexDirection: 'column', paddingTop: 30}}> <input type="text" onChange= {(e)=>this.onQuantityChange1(index, e.target.value, postVal )} style={{height: 27, width: 73, marginBottom: 16}} defaultValue={this.state.value} name="quantity" placeholder="Quantity"  className="setInput" /> nos <br/> <input onClick= {(e)=>this.addItem(postVal)} type="button" style={{width: 100, fontSize: 12, fontWeight: 'bold' , height: 28}} value="Add to cart" className="login_btn" /> </div>
		       	}	

	     	)

 		})

   		return posts;

	}

	

	render(){
		const data = {
			columns: [
				
				{
					label:'Item',
					field:'image',
					sort: 'asc',
				},

				{
					label:'Item Name',
					field:'item_name',
					sort: 'asc',
				},

				{
					label:'Category',
					field:'category',
					sort: 'asc',
				},
				{
					label:'PT/CA',
					field:'pt_ca',
					sort: 'asc',
				},
				{
					label:'QTY/PRICE',
					field:'qty_price',
					sort: 'asc',
				},

				{
					label:'add Cart',
					field:'add_cart',
					sort: 'asc',
				},
					],
					rows:this.state.tableRows,
				}

		return (
			<div className="main_container_signup">
				<Header {...this.props}> </Header>
					<div className="content-container wrapper" style={{backgroundColor: 'rgb(199, 199, 199)', marginTop: 170, padding: 10, marginBottom: 5}}>

							<div style={{width:'100%'}}>
								<Row>
								<Col sm={12} style={{marginTop: 15, marginBottom:5,}}>
										<span className="item-action" style={{fontSize: 20, fontWeight: 'bold', paddingLeft: 4}}> Available Products For {this.state.keyVal} </span>
								</Col>

									<Col sm={12} style={{marginTop: 15, marginBottom:5}}>
									<Card>
								        <CardBody className="customise_card_body new_card" style={{padding: 18}}>
								          	<MDBDataTable
								          	           striped
								          	           bordered
								          	           hover
								          	           data={data}
								          	           searching={false}
								          	         />	         

								        </CardBody>
								      </Card>
									
								</Col>

								
								</Row>
							</div>
							</div>
				<Footer> </Footer>
			</div>
			)
	}
}
/*export default ListingPage*/
export default connect(state => ({
	...state.user,
	...state.cartDetail,
	...state.productDetail,
	...state.updateProductData,
	...state.cartItemVal,
	...state.updateCartItemData
}))(ListingPage)