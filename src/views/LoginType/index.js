import React, { Component } from 'react'
import './styles.scss'
import logo from '~/assets/images/zwz-log-logo.png';
import Footer from '~/components/Footer';
import { Button, Row, Col } from 'reactstrap';
import { Redirect } from 'react-router-dom';



class LoginType extends Component {

	constructor(props){
		super(props);
		this.state = { 
			value: 'select',
			fist_page: false,
	      	second_page: false,
	      	
		};
	}

	onChange(e) {
		

		sessionStorage.setItem('loginType' , e.target.value);

		if(e.target.value === "zwz"){
			this.props.history.push('/login')
		}else if(e.target.value === "nod"){
			this.props.history.push('/login-nod')
		}
	}

	render(){
		return(
			<div className="main_container_signup">
				<div className="pre_login_header">

				</div>
				<div className="pre_login_content_container">
					<Row>

						<Col sm={12} xs={12} md={12} lg={12} className="login_title_container" style={{marginTop: 77}}>
							<h1 className="login_title_text"> Sign In </h1>
						</Col>

						<Col sm={12} xs={12} md={12} lg={12} className="login_subtitle_container">
							<p> Please Select Login Type To Get Login</p>
						</Col>

						<Col sm={12} xs={12} md={12} lg={12} className="login_subtitle_container">
							<div className="login_detail_container">
								<select name="login_type" value={this.state.value} onChange={this.onChange.bind(this)} className="form-control">
						          <option value="select">Select Login Type</option>
						          <option value="zwz">ZWZ</option>
						          <option value="nod">NOD</option>
						          
						        </select>
								<input type="button" style={{marginTop: 40, display: 'none'}} onClick={this.onProceed} value="Proceed" className="login_btn" />
							</div>

						</Col>

						
					</Row>


				</div>



				<Footer> </Footer>
			</div>
		)
	}
}

export default LoginType