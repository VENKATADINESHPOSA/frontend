import React, { Component } from 'react'
import './styles.scss'
import ReCAPTCHA from "react-google-recaptcha";
import logo from '~/assets/images/zwz-log-logo.png';
import Footer from '~/components/Footer';
import { Button, Row, Col } from 'reactstrap';
import logoNod from '~/assets/images/nod-logo.jpg';


class LoginNOD extends Component {

	constructor(props){
		super(props)		
		this.onLoginNOD = this.onLoginNOD.bind(this);

		this.state = {
			forgotPassword: false,
			captchaVerified: false,
		};

	}

	onLoginNOD(){
		this.props.history.push('/home-nod')
		
	}

	componentDidMount() {
		if (this.reCaptchaEl) {
			console.log("started, just a second...")
			this.reCaptchaEl.reset();
		}
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
							<h1 className="login_title_text"> Sign In </h1>
						</Col>

						<Col sm={12} xs={12} md={12} lg={12} className="login_subtitle_container">
							<p> Forgot Password? <a href="#" onClick = { this.onClickFrgtpassNod }> Click here to reset </a> </p>
						</Col>

						<Col sm={12} xs={12} md={12} lg={12} className="login_subtitle_container">
							<div className="login_detail_container">
								<input type = "text" name="email" placeholder="Email" />
								<input type = "password" name="password" placeholder="Password" />

								<Row>
									<Col sm={12} xs={12} md={12} lg={12} className="checkbox_main_container">
										<Col sm={6} xs={6} md={6} lg={6} className="left_container" style={{marginTop: 15}}>
											<label className="checkbox_label">
										        <input type="checkbox" className="checkbox" />
										        Show Password
										    </label>

										</Col>

									</Col>
								</Row>

								<Row>
									<Col sm={12} xs={12} md={12} lg={12} className="captcha-container">
										<ReCAPTCHA
											sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
											onChange={(value) => {
												console.log(value)
												this.setState({captchaVerified: true})
											}}
										/>
									</Col>
								</Row>


								

								<input type="button" onClick = { this.onLoginNOD }  disabled={!this.state.captchaVerified} style={{marginTop: 10}} value="Log In" className={`login_btn1 ${!this.state.captchaVerified ? 'disabled' : ''}`} />

							</div>

						</Col>

						
					</Row>


				</div>



				<Footer> </Footer>
			</div>
		)
	}
}

export default LoginNOD