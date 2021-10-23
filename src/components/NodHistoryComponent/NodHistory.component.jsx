import React from "react";
import "./NodHistory.styles.scss";
import NodHistoryCards from "../NodHistoryCardsComponent/NodHistoryCards.component";

const NodHistory = () => {
  return (
    <div style={{padding:"20px 0px"}}>
      <h4 className="nod-history-heading">History & Milestones</h4>
      <NodHistoryCards />
    </div>
  );
};

export default NodHistory;
