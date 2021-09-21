import React, { Component } from 'react'
import './styles.scss'
import { Button, Row, Col } from 'reactstrap';
import Logo_dark from '~/assets/images/images-logo_dark.png';



class Footer extends Component {

	constructor(props){
		super(props)
	}
	render(){
		return(
			<div className="footer_container" style={{marginTop: '80px'}}>
				<Row>
					<Col sm={12} md={12} lg={12} xl={12} className="footer_space">
						<Col sm={4} md={4} lg={4} xl={4} className="align_col">
							<div className="contact_detail_container" style={{paddingLeft: 130}}>
								<h6 className="h3-white">
									The Company
								</h6>
								<div className="footer_logo">
                                	<a href="#"><img className="dark_img" src={Logo_dark} alt="logo"/></a>
                                	<br/>
                                	<br/>
									<p className="footer_p">Since 1938 we have powered the world’s plants and machines with unmatched reliability and value. WIth over 10,000 types of bearing products look forward to meeting your expectations.</p>
								</div>

							</div>
						</Col>

						<Col sm={4} md={4} lg={4} xl={4} className="align_col">
							<div className="office_detail_container" style={{paddingLeft: 80}}>
								<h6 className="h3-white">
									Our Address
								</h6>
								<ul className="contact_info"><li>
                                    <p><b style={{color: '#687188'}}>ZWZ Bearings India Pvt. Ltd. </b></p>
                                    <i className="fa fa-map-marker icon_style"></i>
                                    <p style={{width: '95%',float: 'left'}}>615 Raheja Chambers 213 Nariman Point<br/>Mumbai, Maharashtra
                              		</p>
                                    </li>
                                    <li>
                                        <i className="fas fa-envelope-square icon_style"></i>
                                        <a style={{width: '95%',float: 'left', paddingLeft: 6}} href="mailto:info@sitename.com">info@zwz.co.in</a>
                                    </li>
                                    <li>
                                        <i className="fas fa-mobile-alt icon_style"></i>
                                        <p style={{width: '95%',float: 'left'}}>+91 22 22824239</p>
                                    </li>
                                </ul>
							</div>
						</Col>

						<Col sm={4} md={4} lg={4} xl={4} className="align_col">
							<div className="help_detail_container" style={{paddingLeft: 50}}>
								<h6 className="h3-white">
									Our Branches
								</h6>
								<ul className="widget_links">
                                    <li><a href="#">Mumbai</a></li>
                                    <li><a href="#">Delhi</a></li>
                                    <li><a href="#">Chennai</a></li>
                                    <li><a href="#">Kolkata</a></li>
                                    <li><a href="#">Ahmedabad</a></li>
                                </ul>
							</div>
						</Col>

					</Col>

					<Col sm={9} md={9} lg={9} xl={9} className="border_line">


					</Col>

					<Col sm={12} md={12} lg={12} xl={12} className="footer_space">
						<Col sm={4} md={4} lg={4} xl={4} className="align_col">
							<div className="contact_detail_container" style={{paddingLeft: 130}}>
								
								<div className="footer_logo">
                                	
									<p className="footer_p">© 2020 All Rights Reserved ZWZ</p>
								</div>

							</div>
						</Col>
					</Col>

				</Row>
					
			</div>
		)
	}
}

export default Footer