import React from "react";
import Carousel from "react-elastic-carousel";
import { Row, Col } from "reactstrap";
import "./Corousel.styles.scss";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 3, itemsToScroll: 2 },
  { width: 768, itemsToShow: 4 },
  { width: 1200, itemsToShow: 4 },
];

const Corousel = ({ items }) => {
  return (
    <div className="coruosel">
      <div className="carousel-wrapper">
        <Carousel breakPoints={breakPoints}>
          {items.map((obj) => {
            return (
              <Row>
                <Col>
                  <img
                    src={require(`~/assets/NewImages/ClientLogos/${obj.imgUrl}`)}
                    alt={`${obj.name}`}
                  />
                </Col>
              </Row>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default Corousel;
