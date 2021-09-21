import React, { Component } from 'react'
import './styles.scss'
import { Button, Row, Col } from 'reactstrap';
import Carousel1 from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import jsonData from './jsonData.json'
import Logo_dark from '~/assets/images/images-logo_dark.png';
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};




class Client extends Component {

	constructor(props){
		super(props)
	}
	render(){
		return(
			<div className="footer_container" style={{marginTop: '80px', backgroundColor: '#fff', paddingLeft: 40}}>
				<Carousel1
  swipeable={true}
  draggable={true}
  showDots={false}
  arrows={false}
  autoPlay={this.props.deviceType !== "mobile" ? true : false}
  transitionDuration={500}
  autoPlaySpeed={8000}
  responsive={responsive}
  infinite={true}
 
  

  ssr={true} // means to render carousel on server-side.
  
  partialVisible={false}
>
{
jsonData.map((item, index) => (
	<div>
		<img style={{width: 150}} src={require(`~/assets/images/${item.imgurl}`)} alt="Self Aligning Bearing"/>
	</div>

	))}
	</Carousel1>
					
			</div>
		)
	}
}

export default Client