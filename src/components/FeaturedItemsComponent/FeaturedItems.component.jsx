import React, { useState } from "react";
import "./FeaturedItems.styles.scss";
import data from "./BearingImages.json";
import FeaturedItemsHeader from "../FeaturedItemsHeaderComponent/FeaturedItemsHeader.component";
import { Row, Col } from "reactstrap";

const FeaturedItems = ({ setshowKnowmore, setItemId, setHeading }) => {
  const [header, setHeader] = useState("New");

  return (
    <div className="featured-items-div">
      <Row>
        <Col
          className="featured-items-header-col"
          sm="12"
          md={{ size: 4, offset: 4 }}
        >
          <Row className="featured-items-header-row">
            {data.map(({ heading }) => {
              return (
                <FeaturedItemsHeader
                  heading={heading}
                  header={header}
                  setHeader={setHeader}
                />
              );
            })}
          </Row>
        </Col>
      </Row>
      <Col
        className="featured-items-body-col"
        sm="12"
        md={{ size: 6, offset: 3 }}
      >
        <Row>
          {data
            .find(({ heading }) => heading === header)
            .products.map(({ id, name, imgurl }) => {
              return (
                <Col key={id} sm="4">
                  <div className="featured-items-body-div">
                    <div className="featured-items-img-div">
                      <img
                        className="featured-items-img"
                        src={require(`~/assets/images/${imgurl}`)}
                        alt={name}
                      />
                    </div>

                    <div className="container">
                      <div className="featured-items-name-div">{name}</div>
                      <div
                        className="featured-items-knowmore-div"
                        onClick={() => {
                          window.scrollTo(0, 0);
                          setshowKnowmore(true);
                          setItemId(id);
                          setHeading(header);
                        }}
                      >
                        <strong>Know More &#8594;</strong>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
        </Row>
      </Col>
    </div>
  );
};

export default FeaturedItems;
