import React, { Component } from 'react'
import './styles.scss'
import { Button, Row, Col } from 'reactstrap';
import HeaderNOD from '~/components/HeaderNOD';
import Footer from '~/components/Footer';
import image1 from '~/assets/images/1.jpg';
import image2 from '~/assets/images/2.jpg';
import image3 from '~/assets/images/3.jpg';
import image4 from '~/assets/images/4.jpg';
import image5 from '~/assets/images/5.jpg';
import image6 from '~/assets/images/logos.jpg';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';





class HomeNOD extends Component {

	constructor(props){
		super(props)
	}
	render(){
		return(
			<div style={{width: '100%'}}>
				<HeaderNOD> </HeaderNOD>
				<div className="content_container">
					<Row>
						<Col sm={12}>
							<Carousel style={{height: 80}}>
				                <div style={{height: 360}}>
				                    <img src={image1} />
				                    <p className="legend">Legend 1</p>
				                </div>
				                <div style={{height: 360}}>
				                    <img src={image2} />
				                    <p className="legend">Legend 2</p>
				                </div>
				                <div style={{height: 360}}>
				                    <img src={image3} />
				                    <p className="legend">Legend 3</p>
				                </div>
				            </Carousel>
						</Col>

						<Col sm={12} style={{marginTop: 6, textAlign: 'center'}}>
							<h2 style={{fontWeight: 'bold'}}> FEATURED PRODUCTS </h2>
						</Col>

						<Col sm={4} style={{marginTop: 10}}>
							<img src={image2} alt="Logo" className="image2" />
						</Col>

						<Col sm={4} style={{marginTop: 10}}>
							<img src={image2} alt="Logo" className="image2" />
						</Col>

						<Col sm={4} style={{marginTop: 10}}>
							<img src={image2} alt="Logo" className="image2" />
						</Col>

						<Col sm={4} style={{marginTop: 10}}>
							<h5 style={{textAlign: 'center'}}> et expedita distinct </h5>
							<p style={{textAlign: 'center'}}> Rs 128.25 </p>
						</Col>

						<Col sm={4} style={{marginTop: 10}}>
							<h5 style={{textAlign: 'center'}}> et expedita distinct </h5>
							<p style={{textAlign: 'center'}}> Rs 128.25 </p>
						</Col>

						<Col sm={4} style={{marginTop: 10}}>
							<h5 style={{textAlign: 'center'}}> et expedita distinct </h5>
							<p style={{textAlign: 'center'}}> Rs 128.25 </p>
						</Col>

						<Col sm={12} style={{marginTop: 25, textAlign: 'center'}}>
							<h2 style={{fontWeight: 'bold'}}> NEW ARRIVALS </h2>
						</Col>

						<Col sm={4} style={{marginTop: 10, textAlign: 'right'}}>
							<img src={image3} alt="Logo" className="image3" />
						</Col>

						<Col sm={4} style={{marginTop: 20}}>
							<img src={image3} alt="Logo" className="image2" />
						</Col>

						<Col sm={4} style={{marginTop: 20, textAlign: 'right'}}>
							<img src={image3} alt="Logo" className="image3" />
						</Col>

						<Col sm={4} style={{marginTop: 10}}>
							<h5 style={{textAlign: 'center'}}> Tempor autem quibusd </h5>
							<p style={{textAlign: 'center'}}> Rs. 109.00 </p>
						</Col>

						<Col sm={4} style={{marginTop: 10}}>
							<h5 style={{textAlign: 'center'}}> Tempor autem quibusd </h5>
							<p style={{textAlign: 'center'}}> Rs. 109.00 </p>
						</Col>

						<Col sm={4} style={{marginTop: 10}}>
							<h5 style={{textAlign: 'center'}}> Tempor autem quibusd </h5>
							<p style={{textAlign: 'center'}}> Rs. 128.25 </p>
						</Col>

						<Col sm={12} style={{marginTop: 40}}>
							<img src={image6} alt="Logo" className="image1" />
						</Col>

					</Row>
				</div>
				<Footer> </Footer>
			</div>
		)
	}
}

export default HomeNOD