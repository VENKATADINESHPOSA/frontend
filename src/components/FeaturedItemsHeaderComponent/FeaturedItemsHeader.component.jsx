import React from "react";
import { Col } from "reactstrap";
import "./FeaturedItemsHeader.styles.scss";

const FeaturedItemsHeader = ({ heading, header, setHeader }) => {
  return (
    <Col
      className={
        header === heading
          ? "featured-items-header-active"
          : "featured-items-header"
      }
      onClick={() => setHeader(heading)}
    >
      {heading}
    </Col>
  );
};

export default FeaturedItemsHeader;
