import React, { Component } from 'react'
import './styles.scss'
import {connect} from 'react-redux';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import logo from '~/assets/images/zwz-log-logo.png';
import { Button, Row, Col , Modal} from 'reactstrap';
import {otpverification_ajax_call} from '~/redux/helpers/user';
import axios from 'axios';
import {updateUserData} from '~/redux/action/user';
import NodLogo from '~/assets/images/trans_nod_logo.png';



let hostname = window.location.hostname;
var baseURL = localStorage.getItem('url');
var LOGO = "";
var nodlogo = false
if (hostname == "zwz.prtouch.com") {
	LOGO = logo
	nodlogo = false

}else{

	LOGO = NodLogo
	nodlogo = true
}
/*class Registeraddress extends Component {*/
class Registeraddress extends Component {
	constructor(props){
		super(props)
		this.handleChange 	= this.handleChange.bind(this);
		this.onOTPSignup 	= this.onOTPSignup.bind(this);
		this.Thankyoutoggle = this.Thankyoutoggle.bind(this);
		this.onClickSignIn 	= this.onClickSignIn.bind(this);
		this.onOtpSubmit 	= this.onOtpSubmit.bind(this);
		this.statelist 		= this.statelist.bind(this);
		this.citylist 		= this.citylist.bind(this);
		this.Closemodal		= this.Closemodal.bind(this); 
		this.ResendOTP      = this.ResendOTP.bind(this);
		
		this.state = {
			error			: "",
			email			: "",
			mobilenumber	: "",
			address			: "",
			city			: "",
			state			: "",
			pobox			: "",
			geotag			: "",
			terms			: "",
			gstin		    : "",
			api_url			: "",
			state_options   : "",
			city_options    : "",  
			chkbox          : true,
      		showError1		: false,
      		showError2		: false,
			showError3		: false,
			showError4		: false,
			showError5		: false,
      		isChecked		: false,
      		passowrdType	: "password",
      		isLoggedInVal	: false,
      		locationURL		: false,
			Thankyoumodal	: false,

		};
	}
	
	handleChange(e){
		this.setState({
				error 			: false,
				showError1		: false,
    			showError2		: false,
				showError3		: false,
				showError4		: false,
				showError5		: false,
			})
			
	    var newState 			= {};
		newState[e.target.name] = e.target.value;
		
	    this.setState(newState);
	    console.log(e.target.name);
	    if (e.target.name == "mobilenumber") {
	    	this.setState({
	    		showError6: false
	    	})
	    }/*else if(e.target.name == "gstin"){
	    	this.setState({
	    		showError16: false
	    	})
	    }*/else if (e.target.name == "address") {
	    	this.setState({
	    		showError7: false
	    	})
	    }else if (e.target.name == "state") {
	    	this.setState({
	    		showError11: false
	    	})
	    }else if (e.target.name == "city") {
	    	this.setState({
	    		showError10: false
	    	})
	    }else if (e.target.name == "pobox") {
	    	this.setState({
	    		showError8: false
	    	})
	    }else if (e.target.name == "geotag") {
	    	this.setState({
	    		showError9: false
	    	})
	    }

	    if (e.target.name == "state") {
	    	this.setState({
	    		state_data : e.target.value
	    	})
	    	
	    	console.log(this.state.state_data)
	    	localStorage.setItem('state_data' , e.target.value);

	    	console.log(localStorage.getItem('state_data'));

	    	this.citylist();
	    }
	 }
	 
	onClickSignIn(){
		this.props.history.push('/login');
	}

	Thankyoutoggle(){
		this.setState({
			Thankyoumodal: true,
		})
	}
	
	async ResendOTP(e){
		if (window.location.href === "http://store.zwz.co.in/register#" || window.location.href === "http://store.zwz.co.in/register" ) {
			this.state.api_url = "http://apistore.zwz.co.in/authentication/mobile/otp_sent/";
		}else if(window.location.href === "http://nod.prtouch.com:8081/register#" || window.location.href === "http://nod.prtouch.com:8081/register" || window.location.href === "http://localhost:3000/register#" || window.location.href === "http://localhost:3000/register"){
			this.state.api_url = "http://apinod.prtouch.com:8081/authentication/mobile/otp_sent/";
		}else{
			this.state.api_url = "http://apistore.zwz.co.in/authentication/mobile/otp_sent/";
		}
			var mobile 	= this.state.mobilenumber;
			var url = this.state.api_url;
			const resp = await axios(url,
	        {
	            method: 'POST',
	            headers: {
	                Accept: 'application/json',
	                'Content-Type': 'application/json',
					'Authorization' : 'Token ' + localStorage.getItem('auth_key'),
	            },
	            data:{
	            	"mobile":mobile,
	            }
	        });
	}
	
	Closemodal(){
		this.setState({
			Thankyoumodal: false,
		})
	}
	
	
	async onOtpSubmit(e){
		var mobile 	= this.state.mobilenumber;
		var otp 	= this.state.otpvalue;

		if (window.location.href === "http://store.zwz.co.in/register#" || window.location.href === "http://store.zwz.co.in/register" ) {
			var url = "http://apistore.zwz.co.in/authentication/otp/verification/";
			var api_url = "http://apistore.zwz.co.in/authentication/user/profile/update/";
		} else if(window.location.href === "http://nod.prtouch.com:8081/register#" || window.location.href === "http://nod.prtouch.com:8081/register" || window.location.href === "http://localhost:3000/register#" || window.location.href === "http://localhost:3000/register"){
			var url = "http://apinod.prtouch.com:8081/authentication/otp/verification/";
			var api_url = "http://apinod.prtouch.com:8081/authentication/user/profile/update/";
		}else{
			var api_url = "http://apistore.zwz.co.in/authentication/user/profile/update/";
			var url = "http://apistore.zwz.co.in/authentication/otp/verification/";
		}
		
		var datastring = {
			mobile	: 	mobile,
			otp		:	otp,
			url		:	url
		};

		if(otp == "" || otp == undefined){
			this.setState({
				showError15: true
			})
		}
		 
		const response = await axios(datastring.url,
			{
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Authorization' : 'Token ' + localStorage.getItem('auth_key'),
				},
				data: datastring
			});	

		if (response.data.success == true){
			var mobile = this.state.mobilenumber;
			var gstin = this.state.gstin;
			var b_add = this.state.address;
			var st_id = this.state.state;
			var city_id = this.state.city;
			var po_box = this.state.pobox;
			var geo_tag = this.state.geotag;
			var email = this.state.login_details;
			const resp = await axios(api_url,
				{
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						'Authorization' : 'Token ' + localStorage.getItem('auth_key'),
					},
					data:{
						"mobile":mobile,
						"gstin": gstin,
						"b_add": b_add,
						"st_id": st_id,
						"city_id": city_id,
						"po_box": po_box,
						"geo_tag": geo_tag,
						"email": email
					}
				});
				if (resp.data.success == true) {

					this.props.dispatch(updateUserData({
						username: response.data.user
					}))
					this.setState({
						Thankyoumodal: false,
					});
					this.props.history.push('/');
				}
		}else{
			alert(response.data.message);
			console.log(response.data.message);
		}
	}

	async statelist(e){	
		if (window.location.href === "http://store.zwz.co.in/register#" || window.location.href === "http://store.zwz.co.in/register" ) {
			var url = "http://apistore.zwz.co.in/authentication/state_list/";
		} else if(window.location.href === "http://nod.prtouch.com:8081/register#" || window.location.href === "http://nod.prtouch.com:8081/register" || window.location.href === "http://localhost:3000/register#" || window.location.href === "http://localhost:3000/register"){
			var url = "http://apinod.prtouch.com:8081/authentication/state_list/";
		}else{
			var url = "http://apistore.zwz.co.in/authentication/state_list/";
		}
		
		var datastring = {
			url	:	url
		};

		const response = await axios(datastring.url,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Authorization' : 'Token ' + localStorage.getItem('auth_key'),
				},
				data: datastring
			});

		if (response.data.success == true){
			
		   this.setState({
			   state_options : response.data.data.map((data) =>
			            
						<option 
			   				key={data.st_id}
			   				value={data.st_id}
		   				>
			   		{data.st_name}
		   		</option>
			   )
		   });
		}else{
		 	console.log(response.data.message);
		}
	}

	async citylist(e){	
		if (window.location.href === "http://store.zwz.co.in/register#" || window.location.href === "http://store.zwz.co.in/register" ) {
			var url = "http://apistore.zwz.co.in/authentication/city_list/";
		} else if(window.location.href === "http://nod.prtouch.com:8081/register#" || window.location.href === "http://nod.prtouch.com:8081/register" || window.location.href === "http://localhost:3000/register#" || window.location.href === "http://localhost:3000/register"){
			var url = "http://apinod.prtouch.com:8081/authentication/city_list/";
		}else{
			var url = "http://apistore.zwz.co.in/authentication/city_list/";
		}
		
		console.log(localStorage.getItem('state_data'));
		var datastring = {
			url	:	url
		};

		const response = await axios(datastring.url,
			{
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Authorization' : 'Token ' + localStorage.getItem('auth_key')
				},
				data: {
					state_name: localStorage.getItem('state_data')
				},
			});
		console.log(response.data);
		if (response.data.success == true){
		   this.setState({
			   city_options : response.data.data.map((data) =>
			   			
		   				<option 
			   				key={data.ct_id}
			   				value={data.ct_id}
		   				>
			   		{data.ct_name}
		   		</option>
			   )
		   });
		}else{
		 	console.log(response.data.message);
		}
	}

    componentDidMount(){
    	window.scrollTo(0, 0)
    	this.setState({
			login_details: localStorage.getItem('username'),
		})

		this.statelist();
		/*this.citylist();*/

	}
	async onOTPSignup(e) {	
		if (this.state.mobilenumber === "") {
			
    		this.setState({
    			showError6: true,
				error: true
    		})
    		return false;
    	}
		/*if (this.state.gstin === "") {
			
    		this.setState({
    			showError16: true,
				error: true
    		})
    		return false;
    	}*/
		if (this.state.address === "") {
			
    		this.setState({
    			showError7: true,
				error: true
    		})
    		return false;
    	}
    	if (this.state.state === "") {
			
    		this.setState({
    			showError11: true,
				error: true
    		})
    		return false;
    	}
		
		if (this.state.city === "") {
			
    		this.setState({
    			showError10: true,
				error: true
    		})
    		return false;
    	}
		

    	/*if (this.state.pobox === "") {
			
    		this.setState({
    			showError8: true,
				error: true
    		})
    		return false;
    	}*/
		/*if (this.state.geotag === "") {
			
    		this.setState({
    			showError9: true,
				error: true
    		})
    		return false;
    	}*/
		console.log(this.state.terms);
		if (this.state.terms === "") {
			
    		this.setState({
    			showError14: true,
				error: true
    		})
    		return false;
    	}
		/*if (this.state.otpvalue === "") {
			
    		this.setState({
    			showError15: true,
				error: true
    		})
    		return false;
    	}*/
		
		
		/*if (this.state.error === true) {
    		this.setState({
    		    error: "Please Fill Form Fields correctly"
    		})
    		return false;
    	}*/
    	var api_url = "";
		
		if (window.location.href === "http://store.zwz.co.in/register#" || window.location.href === "http://store.zwz.co.in/register" ) {
			api_url = "http://apistore.zwz.co.in/authentication/user/profile/update/";
			var otp_url = "http://apistore.zwz.co.in/authentication/mobile/otp_sent/"
		}else if(window.location.href === "http://nod.prtouch.com:8081/register" || window.location.href === "http://nod.prtouch.com:8081/register#" || window.location.href === "http://localhost:3000/register" || window.location.href === "http://localhost:3000/register#" ){
			api_url = "http://apinod.prtouch.com:8081/authentication/user/profile/update/";
			var otp_url = "http://apinod.prtouch.com:8081/authentication/mobile/otp_sent/"
		}else{
			api_url = "http://apistore.zwz.co.in/authentication/user/profile/update/";
			var otp_url = "http://apistore.zwz.co.in/authentication/mobile/otp_sent/"
		}
		var url = api_url;
		var mobile = this.state.mobilenumber;
		var gstin = this.state.gstin;
		var b_add = this.state.address;
		var st_id = this.state.state;
		var city_id = this.state.city;
		var po_box = this.state.pobox;
		var geo_tag = this.state.geotag;
		var email = this.state.login_details;
		console.log(url);
		
		const response = await axios(otp_url,
	        {
	            method: 'POST',
	            headers: {
	                Accept: 'application/json',
	                'Content-Type': 'application/json',
					'Authorization' : 'Token ' + localStorage.getItem('auth_key'),
	            },
	            data:{
					"mobile": mobile,

	            }
	        });
			
			if (response.data.success == true){
				console.log("Profile updated",response);
				var mobile 	= this.state.mobilenumber;
				/*var url_otp = this.state.api_url;*/
				this.Thankyoutoggle();
				
			}else{
				alert(response.data.message);
			}
	}
	
	render(){
		const {Thankyoumodal} = this.state;
		return(
			<div className="main_container_signup">
				<Header {...this.props}> </Header>

				<div className="content_container" style={{marginTop: 175}}>
					<Row>
						{!nodlogo ? (

						<Col sm={12} xs={12} md={12} lg={12} className="logo_img_container">
							<img src={LOGO} alt="Logo" className="logo_img" />
						</Col>

						) : (
						<Col sm={12} xs={12} md={12} lg={12} className="logo_img_container">
							<img src={LOGO} alt="Logo" style={{width: 80, height: 80}} className="logo_img" />
						</Col>

						)}


						<Col sm={12} xs={12} md={12} lg={12} className="login_title_container">
							<h1 className="login_title_text"> Update Profile Details </h1>
							<span style={{color: 'red'}}>Registration Process Pending</span>
						</Col>

						<Col sm={12} xs={12} md={12} lg={12} className="login_subtitle_container">
							<div className="login_detail_container">
								{
			                        this.state.error &&
			                        <p style={{color:"red"}}> {this.state.error}</p>
			                    }
								
								
								
								<Row>
								<Col sm={12} xs={12} md={12} lg={12}>
								<Col sm={1} xs={1} md={1} lg={1} style={{float: 'left', padding: 0, width: 20}}>
								<span style={{color: 'red'}}>*</span>
								</Col>
								<Col sm={11} xs={11} md={11} lg={11} style={{float: 'left', padding: 0}}>
								
								<input className="form-control"  type = "number" onChange={this.handleChange} name="mobilenumber"  placeholder="Mobile Number" />
								
								{
									this.state.showError6 &&
									<div style={{width: '100%', textAlign: 'left'}}>
										<span style={{color: 'red', fontSize: 11}}> Please Enter valid Mobile Number </span>
									</div>	
								}
								</Col>
								</Col>
								</Row>
								
								<Row>
								<Col sm={12} xs={12} md={12} lg={12}>
								<Col sm={1} xs={1} md={1} lg={1} style={{float: 'left', padding: 0, width: 20}}>
								<span style={{color: 'red', display: 'none'}}>*</span>
								</Col>
								<Col sm={11} xs={11} md={11} lg={11} style={{float: 'left', padding: 0, marginLeft: 20}}>
								<input className="form-control"  type = "text" name="gstin"  onChange={this.handleChange} placeholder="GSTIN Number" />
								{
								this.state.showError16 &&
									<div style={{width: '100%', textAlign: 'left'}}>
										<span style={{color: 'red', fontSize: 11}}> Please Enter valid GSTIN Number </span>
									</div>	
								}
								</Col>
								</Col>
								</Row>
								
								<Row>
								<Col sm={12} xs={12} md={12} lg={12}>
								<Col sm={1} xs={1} md={1} lg={1} style={{float: 'left', padding: 0, width: 20}}>
								<span style={{color: 'red'}}>*</span>
								</Col>
								<Col sm={11} xs={11} md={11} lg={11} style={{float: 'left', padding: 0}}>
								<textarea  style={{marginBottom: 15}} className="form-control"  rows = "3" onChange={this.handleChange} name="address"  placeholder="Address"></textarea>
								{
									this.state.showError7 &&
									<div style={{width: '100%', textAlign: 'left'}}>
										<span style={{color: 'red', fontSize: 11}}> Please Enter valid Delivery Address </span>
									</div>	
								}
								</Col>
								</Col>
								</Row>
								
								
								<Row>
								<Col sm={12} xs={12} md={12} lg={12}>
								<Col sm={1} xs={1} md={1} lg={1} style={{float: 'left', padding: 0, width: 20}}>
								<span style={{color: 'red'}}>*</span>
								</Col>
								<Col sm={11} xs={11} md={11} lg={11} style={{float: 'left', padding: 0}}>
								<select style={{marginBottom: 15}} className="form-control" name="state" onChange={this.handleChange}>
									<option value='1'>Select State</option>
									{this.state.state_options}
									</select>
								{
								this.state.showError11 &&
									<div style={{width: '100%', textAlign: 'left'}}>
										<span style={{color: 'red', fontSize: 11}}> Please Select State </span>
									</div>	
								}
								</Col>
								</Col>
								</Row>

								<Row>
								<Col sm={12} xs={12} md={12} lg={12}>
								<Col sm={1} xs={1} md={1} lg={1} style={{float: 'left', padding: 0, width: 20}}>
								<span style={{color: 'red'}}>*</span>
								</Col>
								<Col sm={11} xs={11} md={11} lg={11} style={{float: 'left', padding: 0}}>
								<select className="form-control" style={{marginBottom: 15}} name="city" onChange={this.handleChange}>
								   <option value='1'>Select City</option>	
								   {this.state.city_options}
								</select>
								{
								this.state.showError10 &&
									<div style={{width: '100%', textAlign: 'left'}}>
										<span style={{color: 'red', fontSize: 11}}> Please Select City </span>
									</div>	
								}
								</Col>
								</Col>
								</Row>
								
								<Row>
								<Col sm={12} xs={12} md={12} lg={12}>
								<Col sm={1} xs={1} md={1} lg={1} style={{float: 'left', padding: 0, width: 20}}>
								<span style={{color: 'red'}}>*</span>
								</Col>
								<Col sm={11} xs={11} md={11} lg={11} style={{float: 'left', padding: 0}}>
								<input type = "number" name="pobox" className="form-control"  onChange={this.handleChange} placeholder="PO Box Number" />
								{
								this.state.showError8 &&
									<div style={{width: '100%', textAlign: 'left'}}>
										<span style={{color: 'red', fontSize: 11}}> Please Enter valid PO Box Number </span>
									</div>	
								}
								</Col>
								</Col>
								</Row>
							
								<Row>
								<Col sm={12} xs={12} md={12} lg={12} style={{display: 'none'}}>
								<input type = "text" name="geotag" className="form-control"   onChange={this.handleChange} placeholder="Geo Tag" />
								{
								this.state.showError9 &&
									<div style={{width: '100%', textAlign: 'left'}}>
										<span style={{color: 'red', fontSize: 11}}> Please Enter valid Geo Tag </span>
									</div>	
								}
								</Col>
							
								</Row>
								
								
								<Row>
								<Col sm={12} xs={12} md={12} lg={12}>
								<div style={{background: "#e9ecef",padding: "10px", marginBottom: "15px"}}>
								<input type="checkbox" name="terms" defaultChecked={this.state.terms} onChange={this.handleChange} style={{marginRight:"10px"}} />
								<span>I accept all Terms and conditions</span>
								</div>
								</Col>
								{
								this.state.showError14 &&
									<div style={{width: '100%', textAlign: 'left'}}>
										<span style={{color: 'red', fontSize: 11}}> Please Check Terms and Conditions </span>
									</div>	
								}
								</Row>
							
								<Row>
								<Col sm={12} xs={12} md={12} lg={12}>
								<input type="button" onClick = { this.onOTPSignup } value="Update Profile" className="login_btn"  style={{height: "auto",padding: "10px"}}/>
								</Col>
								</Row>


							</div>

						</Col>

						
					</Row>


				</div>



				<Footer> </Footer>
				
				<Modal
         isOpen={Thankyoumodal}
         toggle={this.Thankyoutoggle}

       	>
         <div className="modal__header">
                    <button className="fa fa-times modal__close-btn" type="button" style={{right: 15}} onClick={this.Closemodal} /> 
        </div>
         <div className="modal__body" style={{padding: 15}}>
           <h2 style={{color: '#0072bc',textAlign: 'center', fontSize: '23px'}}>OTP Verification</h2>
		   <p style={{marginTop: '1rem'}}>Enter OTP sent to <span style={{color: '#0072bc'}} className="mobile_number_verification">{this.state.mobilenumber}</span></p>
		   <Row style={{marginTop: "26px"}}>
		   <Col sm={8} xs={8} md={8} lg={8} style={{marginLeft:"auto",marginRight:"auto"}}>
		   <div className="otp_container">
			<input type = "text" onChange={this.handleChange} name="otpvalue" placeholder="OTP" style={{textAlign:"center",borderColor:"#ddd",height:"39px",borderWidth:"1px",borderStyle:"solid"}} />
			{
								this.state.showError15 &&
									<div style={{width: '100%', textAlign: 'left'}}>
										<span style={{color: 'red', fontSize: 11, textAlign:"center"}}> Please Enter valid OTP </span>
									</div>	
								}
		   </div>
		   </Col>
		    <Col sm={4} xs={4} md={4} lg={4} style={{marginLeft:"auto",marginRight:"auto"}}>
		   <div className="otp_container">
			<input type="button"  onClick={this.onOtpSubmit} value="Submit" className="login_btn"/>
		   </div>
		   </Col>
		   
		   </Row>
		   <Row>
		   <Col sm={12} xs={12} md={12} lg={12} style={{marginLeft:"auto",marginRight:"auto"}}>
		   <a href="#" onClick={this.ResendOTP} style={{textDecoration:"underline",fontSize:"12px"}}>Resend OTP</a>
		   </Col>
		   </Row>
         </div>
         
       </Modal>
				
			</div>
		)
	}
}


export default connect(state => ({
	...state.user,
}))(Registeraddress)