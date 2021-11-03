import React, { Component } from 'react'
import './styles.scss'
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import logo from '~/assets/images/zwz-log-logo.png';
import NodLogo from '~/assets/images/trans_nod_logo.png';

import { Button, Row, Col , Modal} from 'reactstrap';
import {register, mobileverfication} from '~/redux/helpers/user';

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


class Signup extends Component {

	constructor(props){
		super(props)
		this.handleChange = this.handleChange.bind(this);
		this.onSignup = this.onSignup.bind(this);
		this.onClickSignIn = this.onClickSignIn.bind(this);
		/*this.ValidateEmail = this.ValidateEmail.bind(this);*/
		
		
		this.state = {
			forgotPassword: false,
			captchaVerified: false,
			weakPass: false,
			strongPass: false,
			error: "",
			email: "",
      		title: "",
			firstname: "",
			lastname: "",
			designation: "",
			mobilenumber: "",
			address: "",
			city: "",
			state: "",
			pobox: "",
			geotag: "",
			password: "",
			confirmpassword: "",
			terms: "",
			name_of_company: "",
			gstinumber: "",
			api_url: "",
      		login_type: "",
      		showError1: false,
      		validEmail: false,
      		invalidEmail: false,
      		showError2: false,
			showError3: false,
			showError4: false,
			showError5: false,
      		isChecked: false,
      		passowrdType: "password",
      		isLoggedInVal: false,
      		locationURL: false,
			Thankyoumodal: false,
			Emailverficationmodal: false,
			showpassValidation: false

		};
		
		
	}

	/*ValidateEmail(inputText)
		{
		var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		if(inputText.value.match(mailformat))
		{
		alert("Valid email address!");
		
		}
		else
		{
		alert("You have entered an invalid email address!");
		
		}
	}*/

	componentDidMount(){
		window.scrollTo(0, 0)
	}
	
	handleChange(e){
		this.setState({
				error : false,
				showError1: false,
    			showError2: false,
				showError3: false,
				showError4: false,
				showError5: false,
				showError12: false,
				showError13: false,
				showError14: false,
				showError15: false,
				showError16: false,
				
				
    		})
		//console.log(e.target.value);
	    var newState = {};
	    newState[e.target.name] = e.target.value;
	    this.setState(newState);
	    if (e.target.name == "email") {
	    	 let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		    if ( re.test(e.target.value) ) {
		       this.setState({
		       		validEmail: true,
		       		invalidEmail: false
		       })
		    }
		    else {
		        this.setState({
		       		validEmail: false,
		       		invalidEmail: true
		       })
		    }
	    }

	    if (e.target.name == "password") {
	    	if (e.target.value.length < 6) {
	    		this.setState({
	    			weakPass: true,
	    			strongPass: false,
	    			showpassValidation: false,
	    		})
	    	}else{
	    		this.setState({
	    			weakPass: false,
	    			strongPass: true,
	    			showpassValidation: false
	    		})
	    	}

	    	 
	    }
	 }
	 
	 onClickSignIn(){
		this.props.history.push('/login');
	    	
		
	}
	
	
	
	 async onSignup(e) {
		
		if (this.state.title === "") {
    		this.setState({
    			showError2: true,
				error: true
    		})
    		return false;
    	}
		
		if (this.state.firstname === "") {
    		this.setState({
    			showError3: true,
				error: true
    		})
    		return false;
    	}

		if (this.state.lastname === "") {
    		this.setState({
    			showError4: true,
				error: true
    		})
    		return false;
    	}
		if (this.state.designation === "") {
    		this.setState({
    			showError5: true,
				error: true
    		})
    		return false;
    	}
		
		if (this.state.email === "") {
			
    		this.setState({
    			showError1: true,
				error: true
    		})
    		return false;
    	}
		
		if (this.state.name_of_company === "") {
			
    		this.setState({
    			showError16: true,
				error: true
    		})
    		return false;
    	}
		
		if (this.state.password === "") {
			
    		this.setState({
    			showError12: true,
				error: true
    		})
    		return false;
    	}
		if (this.state.confirmpassword === "") {
			
    		this.setState({
    			showError13: true,
				error: true
    		})
    		return false;
    	}
		if(this.state.password != this.state.confirmpassword){
		    this.setState({
    			showError15: true,
				error: true
    		})
    		return false;
		}


	   
    	if (this.state.password.length < 6) {
    		this.setState({
    			weakPass: false,
    			strongPass: false,
    			showError12: false,
    			showpassValidation: true
    		})
    		return false;
    	}

		if (this.state.error === true) {
    		this.setState({
    		    error: "Please Fill Form Fields correctly"
    		})
    		return false;
    	}
    	if (this.state.invalidEmail == true) {
    		this.setState({
    			invalidEmail : true
    		})
    		return false;
    	}
		
		if (window.location.href === "http://zwz.prtouch.com:8081/signup#" || window.location.href === "http://zwz.prtouch.com:8081/signup" ) {
			this.state.api_url = "http://apizwz.prtouch.com:8081/authentication/user/signup/";
		}else if(window.location.href === "http://nod.prtouch.com:8081/signup#" || window.location.href === "http://nod.prtouch.com:8081/signup" || window.location.href === "http://localhost:3000/signup#" || window.location.href === "http://localhost:3000/signup"){
			this.state.api_url = "http://apinod.prtouch.com/authentication/user/signup/";
		}else{
			this.state.api_url = "http://apizwz.prtouch.com:8081/authentication/user/signup/";
		}

		localStorage.setItem('emailforverification', this.state.email);
		const response = await register({
			title : this.state.title,
			firstname : this.state.firstname,
			lastname : this.state.lastname,
			designation : this.state.designation,
			email : this.state.email,
			name_of_company : this.state.name_of_company,
			password : this.state.password,
			url : this.state.api_url,
			})

			if (response.success == true){
				this.props.history.push('/emailverification');
			}else{
				alert(response.message);
			}
		
	 }
	
	
	render(){
		const {} = this.state;
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

						<Col sm={11} xs={11} md={11} lg={11} className="login_title_container">
							<h1 className="login_title_text"> Create your account </h1>
						</Col>

						<Col sm={11} xs={11} md={11} lg={11} className="login_subtitle_container">
							<p> If you already have an account please  <a href="#" onClick = { this.onClickSignIn }>  Sign In </a> </p>
						</Col>

						<Col sm={12} xs={12} md={12} lg={12} className="login_subtitle_container">
							<Col sm={8} xs={8} md={8} lg={8} style={{float: 'left'}}>
							<div className="login_detail_container" style={{float: 'right'}}>
								{
			                        this.state.error &&
			                        <p style={{color:"red"}}> {this.state.error}</p>
			                    }
								
								{/*<Row>
								<Col sm={12} xs={12} md={12} lg={12}>
								<div className="login_btn"  style={{height: "auto",padding: "10px", background: "#fff", border: "1px", borderColor: "#979797",borderStyle: "solid", color:"#000",boxShadow:"6px 8px 6px -6px #ddd"}}><i className="fa fa-google" style={{fontSize:"22px"}}></i><a href="#" style={{color:"#000",textDecoration:"none",paddingLeft:"10px"}}>Sign Up with Google</a><span></span></div>
								
								</Col>
								</Row>
								<br/>
								<Row>
								<Col sm={12} xs={12} md={12} lg={12}>
								<p>OR</p>
								</Col>
								</Row>*/}
								
								<Row>
								<Col sm={12} xs={12} md={12} lg={12}>
								<Col sm={1} xs={1} md={1} lg={1} style={{float: 'left', padding: 0, width: 20}}>
								<span style={{color: 'red'}}>*</span>
								</Col>
								<Col sm={11} xs={11} md={11} lg={11} style={{float: 'left', padding: 0}}>
								<select style={{marginBottom: 12}} className="form-control" name="title" onChange={this.handleChange}>
									<option value="">Select Title</option>
									<option value="Mr">Mr</option>
									<option value="Mrs">Mrs.</option>
									<option value="Ms">Ms.</option>
								</select>
								{
									this.state.showError2 &&
									<div style={{width: '100%', textAlign: 'left'}}>
										<span style={{color: 'red', fontSize: 11}}> Select the title </span>
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
								<input type = "text" name="firstname" className="form-control"  onChange={this.handleChange} placeholder="First Name" />
								{
								this.state.showError3 &&
									<div style={{width: '100%', textAlign: 'left'}}>
										<span style={{color: 'red', fontSize: 11}}> Enter First Name </span>
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
								<input type = "text" className="form-control" name="lastname" onChange={this.handleChange} placeholder="Last Name" />
								{
								this.state.showError4 &&
									<div style={{width: '100%', textAlign: 'left'}}>
										<span style={{color: 'red', fontSize: 11}}> Enter Last Name </span>
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
							<select style={{marginBottom: 12}} className="form-control" name="designation" onChange={this.handleChange}>
									<option value="">Select Designation</option>
									<option value="Managing_Director">Managing Director</option>
									<option value="Executive_Director">Executive Director</option>
									<option value="Director">Director</option>
									<option value="Others">Others</option>
								</select>
								{
								this.state.showError5 &&
									<div style={{width: '100%', textAlign: 'left'}}>
										<span style={{color: 'red', fontSize: 11}}> Select designation </span>
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
								<input className="form-control" type = "text" onChange={this.handleChange} name="email"  placeholder="Email" />
								{
									this.state.showError1 &&
									<div style={{width: '100%', textAlign: 'left'}}>
										<span style={{color: 'red', fontSize: 11}}> Enter email </span>
									</div>	
								}
								{
									this.state.validEmail &&
									<div style={{width: '100%', textAlign: 'left'}}>
										<span style={{color: 'green', fontSize: 11}}> Valid email </span>
									</div>	
								}
								{
									this.state.invalidEmail &&
									<div style={{width: '100%', textAlign: 'left'}}>
										<span style={{color: 'red', fontSize: 11}}> Invalid email </span>
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
								<input className="form-control" type = "text" onChange={this.handleChange} name="name_of_company"  placeholder="Company Name" />
								{
									this.state.showError16 &&
									<div style={{width: '100%', textAlign: 'left'}}>
										<span style={{color: 'red', fontSize: 11}}> Enter company name </span>
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
								<input type = "password"  className="form-control" name="password"  onChange={this.handleChange} placeholder="Enter Password" />
								{
								this.state.showError12 &&
									<div style={{width: '100%', textAlign: 'left'}}>
										<span style={{color: 'red', fontSize: 11}}> Please Enter valid Password </span>
									</div>	
								}
								{
								this.state.showpassValidation &&
									<div style={{width: '100%', textAlign: 'left'}}>
										<span style={{color: 'red', fontSize: 11}}> Password should be of atleast 6 character </span>
									</div>	
								}
								{
								this.state.weakPass &&
									<div style={{width: '100%', textAlign: 'left'}}>
										<span style={{color: 'red', fontSize: 11}}> Weak Password </span>
									</div>	
								}
								{
								this.state.strongPass &&
									<div style={{width: '100%', textAlign: 'left'}}>
										<span style={{color: 'green', fontSize: 11}}> Strong Password </span>
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
								<input type = "password" className="form-control" name="confirmpassword"  onChange={this.handleChange} placeholder="Confirm Password" style={{marginBottom:"18px",marginTop:"13px"}} />
								{
								this.state.showError13 &&
									<div style={{width: '100%', textAlign: 'left'}}>
										<span style={{color: 'red', fontSize: 11}}> Please Confirm Password </span>
									</div>	
								}
								{
								this.state.showError15 &&
									<div style={{width: '100%', textAlign: 'left'}}>
										<span style={{color: 'red', fontSize: 11, display:"block",marginBottom:"15px"}}> Confirm Password should be same as password</span>
									</div>	
								}
								</Col>
								</Col>
							
								</Row>
							
								<Row>
								<Col sm={12} xs={12} md={12} lg={12}>
								<input type="button" onClick = { this.onSignup } value="Sign Up" className="login_btn"  style={{height: "auto",padding: "10px"}}/>
								</Col>
								</Row>


							</div>
							</Col>
							<Col sm={4} xs={4} md={4} lg={4} style={{float: 'left', paddingTop: 350, display: 'none'}}>
								<div className="password_container" style={{float: 'left'}}>
									<div style={{flexDiection: 'column',textAlign: 'left'}}>
										<span style={{fontSize: 16, fontWeight: 'bold', color: '#0072bc'}}>Password Hint:</span>
										<div style={{marginTop: 10}}>
											<span style={{fontSize: 13, fontWeight: 'bold',}}>Minimum 6 digits</span>
										</div>
										<div>
											<span style={{fontSize: 13, fontWeight: 'bold',}}>Atleast 1 uppercase letters(A-Z)</span>
										</div>
										<div>
											<span style={{fontSize: 13, fontWeight: 'bold',}}>Atleast 1 number letters(0-9)</span>
										</div>
										<div>
											<span style={{fontSize: 13, fontWeight: 'bold',}}>Atleast 1 non-alphanumeric symbol letters(e.g. '@#&%!')</span>
										</div>
									</div>
									

								</div>
							</Col>
						</Col>

						
					</Row>


				</div>



				<Footer> </Footer>
				
	   
	   
				
			</div>
		)
	}
}

export default Signup