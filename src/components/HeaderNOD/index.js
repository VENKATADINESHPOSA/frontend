import React, { Component } from 'react'
import './styles.scss'

import SearchField from "react-search-field";
import { Button, Row, Col } from 'reactstrap';
import logo from '~/assets/images/nod-logo.jpg';


class HeaderNOD extends Component {

	constructor(props){
		super(props)
	}
	render(){
		return(
			<div className="main_container">
				<Row>
					<Col sm={2}>
						<div className="header_padding" style={{paddingTop: 20}}>
							<img src={logo} alt="Logo" style={{width: 60}} />

						</div>
					</Col>
					<Col sm={7} style={{textAlign: 'center'}}>
						<div className="search-container">
							<SearchField style={{borderwidth: 1, borderColor: '#0072bc'}}
							  placeholder="Search for Bearing No."
							  classNames="test-class"
							/>
							<div className="suggestions">

							</div>
						</div>
					</Col>

					<Col sm={3}>
						<div className= "header_padding">
							<Row style={{paddingTop: 6}}>
								<Col sm={3} style={{paddingRight: 0, textAlign: 'right'}}>
									<a href="#" className="text_style" > Sign up </a>
									
								</Col>
								<Col sm={1} style={{paddingRight: 0, paddingLeft: 0, textAlign:'center'}}>
									<p className="text_style"> / </p>
								</Col>
								<Col sm={2} style={{paddingLeft: 0, textAlign: 'left', paddingRight: 0}}>
									<a className="text_style" href="#"> Sign in </a>
								</Col>

								<Col sm={1} style={{ textAlign:'left', paddingRight: 0, paddingLeft: 0, maxWidth: 12}}>
									<p className="text_style"> | </p>
								</Col>

								<Col sm={1} style={{ textAlign:'left', paddingRight: 0, paddingLeft: 0}}>
									<i className="fa fa-cart-arrow-down" style={{color: '#fff', fontSize: 22}}> </i>
								</Col>
								

								
							</Row>
						</div>
					</Col>

					<Col sm={12} style={{backgroundColor: '#00619F'}}>
						<div className="container-content">
							<div className="section group">
								<div className="remove-top-bottom col span_6_of_12">
									<ul className="navMenu" style={{marginBottom: 0}}>
										<li>
											<a href="#" className="active" > Home </a>
										</li>

										<li>
											<a href="#" className="inactive"> NOD Products </a>
										</li>

										<li>
											<a href="#" className="inactive"> Applications </a>
										</li>

										<li>
											<a href="#" className="inactive"> Buy NOD </a>
										</li>
									</ul>

								</div>

								<div className="remove-top-bottom1 col span_6_of_12" style={{width: '25%'}}>
									<ul className="navMenu">
										<li style={{width: 100}}>
											<span className="select-style">

												<select style={{width: '40%', paddingTop: 12}}>
													<option value="India">India</option>

												</select>
												<i className="fa fa-caret-down" style={{color: '#fff'}}></i>
												

											</span>
										</li>

										<li>
											<span className="select-style">
												<select style={{width: '100%', paddingTop: 12}}>
													<option value="India">Select Languages</option>
												</select>
											</span>
										</li>	
									</ul>
									
									
 								</div>
							</div>

						</div>

					</Col>


				</Row>
			</div>
		)
	}
}

export default HeaderNOD