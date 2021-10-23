import React from "react";
import "./NodHistoryCards.styles.scss";
import { Row, Col } from "reactstrap";
import cardsData from "./nodCardsData.json";

const NodHistoryCards = () => {
  return cardsData.map((rowdata) => {
    return (
      <Row
        key={rowdata.rowId}
        style={{ margin: "0% 10%", padding: "20px 0px" }}
      >
        {rowdata.details.map((card) => {
          return (
            <Col
              key={card.id}
              style={{
                backgroundColor: "white",
                margin: "0px 10px",
                borderRadius: "4px",
                padding: "10px",
              }}
            >
              <h5 style={{ textAlign: "center" }}>{card.year}</h5>
              <p
                style={{
                  fontSize: "smaller",
                  textAlign: "center",
                  color: "#717171",
                }}
              >
                {card.text}
              </p>
            </Col>
          );
        })}
      </Row>
    );
  });
};

export default NodHistoryCards;

// <Row style={{ margin: "0% 10%", padding: "10px 0px" }}>
//       {item.details.map((card) => {
//         return (
//           <Col
//             style={{
//               backgroundColor: "white",
//               margin: "0px 10px",
//               borderRadius: "4px",
//               padding: "10px",
//             }}
//           >
//             <h5 style={{ textAlign: "center" }}>{card.year}</h5>
//             <p style={{ fontSize: "smaller", textAlign: "center" }}>
//               {card.text}
//             </p>
//           </Col>
//         );
//       })}
//     </Row>
