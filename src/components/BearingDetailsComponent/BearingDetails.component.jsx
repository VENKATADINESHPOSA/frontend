import React from "react";
import { Button, Table } from "reactstrap";
import "./BearingDetails.styles.scss";
import knowMoreData from "./BearingDetails.json";
import generalBearingCatalogue from "../../assets/documents/ZWZ General bearing catalogue_compressed.pdf";
import slewingBearingCatalogue from "../../assets/documents/ZWZ Slewing Bearing_compressed.pdf";
import metallurgyBearingCatalogue from "../../assets/documents/ZWZ Metallurgy bearing Catalogue.pdf";

const BearingDetails = ({ itemId, setshowKnowmore, header }) => {
  let path;
  let downloadfile;
  if (itemId === 1) {
    path = generalBearingCatalogue;
    downloadfile = "Standard Products";
  } else if (itemId === 2) {
    path = metallurgyBearingCatalogue;
    downloadfile = "Multirow Bearings";
  } else {
    path = slewingBearingCatalogue;
    downloadfile = "Slewing rim Bearings";
  }
  if (header === "New") {
    return (
      <div>
        <h1 className="bearing-heading">
          {
            knowMoreData
              .find(({ heading }) => heading === header)
              .bearingsData.find(({ id }) => id === itemId).name
          }
        </h1>
        <div className="back-button-div-end">
          <Button
            onClick={() => {
              setshowKnowmore(false);
            }}
            color="primary"
          >
            Back
          </Button>
        </div>
        <p className="bearing-details-text">
          {
            knowMoreData
              .find(({ heading }) => heading === header)
              .bearingsData.find(({ id }) => id === itemId).description
          }
        </p>
        <div className="download-button-div">
          <a href={path} download={downloadfile}>
            <Button color="primary">Download Catalogue</Button>
          </a>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1 className="bearing-heading">
          {
            knowMoreData
              .find(({ heading }) => heading === header)
              .bearingsData.find(({ id }) => id === itemId).name
          }
        </h1>
        <p className="special-bearings-offer-text">
          {knowMoreData
            .find(({ heading }) => heading === header)
            .bearingsData.find(({ id }) => id === itemId).offerText.length > 0
            ? knowMoreData
                .find(({ heading }) => heading === header)
                .bearingsData.find(({ id }) => id === itemId).offerText
            : ""}
        </p>
        <div className="back-button-div-end">
          <Button
            onClick={() => {
              setshowKnowmore(false);
            }}
            color="primary"
          >
            Back
          </Button>
        </div>

        <Table striped bordered responsive>
          <tbody>
            {knowMoreData
              .find(({ heading }) => heading === header)
              .bearingsData.find(({ id }) => id === itemId)
              .productIds.map((item, i) => (
                <tr key={i}>
                  {item.data.map((item, i) => (
                    <th key={i}>{item}</th>
                  ))}
                </tr>
              ))}
          </tbody>
        </Table>
        <div className="back-button-div-center">
          <Button
            onClick={() => {
              setshowKnowmore(false);
            }}
            color="primary"
          >
            Back
          </Button>
        </div>
      </div>
    );
  }
};

export default BearingDetails;
