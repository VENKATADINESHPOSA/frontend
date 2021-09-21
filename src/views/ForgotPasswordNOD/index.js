import React, { Component } from 'react'
import './styles.scss'
import logo from '~/assets/images/zwz-log-logo.png';
import Footer from '~/components/Footer';
import { Button, Row, Col } from 'reactstrap';
import logoNod from '~/assets/images/nod-logo.jpg';


class ForgotPasswordNOD extends Component {

	constructor(props){
		super(props);
		this.state = { value: 'select'};
	}

	 onChange(e) {
	    this.setState({
	      value: e.target.value
	    })
	  }
	render(){
		return(
			<div className="main_container_signup">
				<div className="nod_login_header">

				</div>
				<div className="pre_login_content_container">
					<Row>
						<Col sm={12} xs={12} md={12} lg={12} className="logo_img_container">
							<img src={logoNod} alt="Logo" className="nod_logo_img" />
						</Col>


						<Col sm={12} xs={12} md={12} lg={12} className="login_title_container">
							<h1 className="login_title_text"> Reset Password </h1>
						</Col>


						<Col sm={12} xs={12} md={12} lg={12} className="login_subtitle_container">
							<div className="login_detail_container">
								<p className="forgot_content_title">
									Enter registered email address you use to login on the site and we will send you a link to reset your password.
								</p>

								<input type = "text" name="email" placeholder="Enter Registered Email Address" className="placeholder_color" />

								

								<input type="button" value="Submit" className="login_btn" />

							</div>

						</Col>

						
					</Row>


				</div>



				<Footer> </Footer>
			</div>
		)
	}
}

export default ForgotPasswordNOD