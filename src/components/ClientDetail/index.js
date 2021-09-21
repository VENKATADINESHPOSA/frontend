import React, { Component } from 'react'
import './styles.scss'
import { Button, Row, Col } from 'reactstrap';
import { Carousel } from 'react-responsive-carousel';
import Logo_dark from '~/assets/images/images-logo_dark.png';
import ClientDetailImg1 from '~/assets/images/client_detail_img1.jpg';
import ClientDetailImg2 from '~/assets/images/client_detail_img2.jpg';
import ClientDetailImg3 from '~/assets/images/client_detail_img3.jpg';
import ClientDetailImg4 from '~/assets/images/client_detail_img4.jpg';



class ClientDetail extends Component {

	constructor(props){
		super(props)
	}
	render(){
		return(
			<div className="footer_container1" style={{marginTop: '80px', backgroundColor: '#FFF1F1 !important' }}>
				<Row>
					<Col sm={12} md={12} lg={12} xl={12} className="footer_space">

						<Carousel style={{height: 80, backgroundColor: '#FFF1F1'}} showThumbs={false}>
			                <div style={{height: 440, backgroundColor: '#FFF1F1'}}>
			                    <div style={{paddingTop: 60}}>
			                    	<h2 style={{fontWeight: 'bold'}}> Our Client Say! </h2>
			                    </div>
			                    <div style={{paddingTop: 30, width:'50%', textAlign: 'center', margin: 'auto'}}>
			                    	<p className="client_para">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam amet animi blanditiis consequatur debitis dicta distinctio, enim error eum iste libero modi nam natus perferendis possimus quasi sint sit tempora voluptatem.</p>
			                    </div>
			                    <div style={{paddingTop: 10, width:'50%', textAlign: 'center', margin: 'auto'}}>
			                    	<p className="client_para" style={{fontWeight: 'bold', marginTop: 6}}><div style={{width: '40%', float: 'left', textAlign: 'right'}}> <img style={{width:50, height: 50, marginRight: 10, marginBottom: 5}}  src={ClientDetailImg1} /></div><div style={{width: '60%', float: 'left', textAlign: 'left', paddingTop: 10}}> Transmission Manufacturer</div></p>
			                    </div>
			                </div>
			               	<div style={{height: 440, backgroundColor: '#FFF1F1'}}>
			                    <div style={{paddingTop: 60}}>
			                    	<h2 style={{fontWeight: 'bold'}}> Our Client Say! </h2>
			                    </div>
			                     <div style={{paddingTop: 30, width:'50%', textAlign: 'center', margin: 'auto'}}>
			                    	<p className="client_para">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam amet animi blanditiis consequatur debitis dicta distinctio, enim error eum iste libero modi nam natus perferendis possimus quasi sint sit tempora voluptatem.</p>
			                    </div>
			                     <div style={{paddingTop: 10, width:'50%', textAlign: 'center', margin: 'auto'}}>
			                    	<p className="client_para" style={{fontWeight: 'bold', marginTop: 6}}><div style={{width: '40%', float: 'left', textAlign: 'right'}}> <img style={{width:50, height: 50, marginRight: 10, marginBottom: 5}}  src={ClientDetailImg2} /></div><div style={{width: '60%', float: 'left', textAlign: 'left', paddingTop: 10}}> Paper Manufacturer</div></p>
			                    </div>
			                </div>
			                <div style={{height: 440, backgroundColor: '#FFF1F1'}}>
			                    <div style={{paddingTop: 60}}>
			                    	<h2 style={{fontWeight: 'bold'}}> Our Client Say! </h2>
			                    </div>
			                     <div style={{paddingTop: 30, width:'50%',  textAlign: 'center', margin: 'auto'}}>
			                    	<p className="client_para">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam amet animi blanditiis consequatur debitis dicta distinctio, enim error eum iste libero modi nam natus perferendis possimus quasi sint sit tempora voluptatem.</p>
			                    </div>
			                     <div style={{paddingTop: 10, width:'50%', textAlign: 'center', margin: 'auto'}}>
			                    	<p className="client_para" style={{fontWeight: 'bold', marginTop: 6}}><div style={{width: '40%', float: 'left', textAlign: 'right'}}> <img style={{width:50, height: 50, marginRight: 10, marginBottom: 5}}  src={ClientDetailImg3} /></div><div style={{width: '60%', float: 'left', textAlign: 'left', paddingTop: 10}}> Still Mill Design</div></p>
			                    </div>
			                </div>
			                <div style={{height: 440, backgroundColor: '#FFF1F1'}}>
			                    <div style={{paddingTop: 60}}>
			                    	<h2 style={{fontWeight: 'bold'}}> Our Client Say! </h2>
			                    </div>
			                     <div style={{paddingTop: 30, width:'50%',  textAlign: 'center', margin: 'auto'}}>
			                    	<p className="client_para">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam amet animi blanditiis consequatur debitis dicta distinctio, enim error eum iste libero modi nam natus perferendis possimus quasi sint sit tempora voluptatem.</p>
			                    </div>
			                     <div style={{paddingTop: 10, width:'50%', textAlign: 'center', margin: 'auto'}}>
			                    	<p className="client_para" style={{fontWeight: 'bold', marginTop: 6}}><div style={{width: '40%', float: 'left', textAlign: 'right'}}> <img style={{width:50, height: 50, marginRight: 10, marginBottom: 5}}  src={ClientDetailImg4} /></div><div style={{width: '60%', float: 'left', textAlign: 'left', paddingTop: 10}}> GearBox Manufacturer</div></p>
			                    </div>
			                </div>
				        </Carousel>	
					</Col>
				</Row>
					
			</div>
		)
	}
}

export default ClientDetail