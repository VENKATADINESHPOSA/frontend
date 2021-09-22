import React from "react";
import Logos from "./clientLogos.json";
import Corousel from "../CorouselComponent/Corousel.component";
import "./ClientLogos.styles.scss";

const ClientLogos = () => {
  return (
    <div className="client-logos-div">
      <div className="container client-logos-row">
        <h3 className="client-logos-header">
          <strong>Our Clients</strong>
        </h3>
      </div>
      <Corousel items={Logos} />
    </div>
  );
};

export default ClientLogos;
