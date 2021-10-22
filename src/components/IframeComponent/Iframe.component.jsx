import React from "react";

const Iframe = (props) => {
  return (
    <div style={{ margin: "0px 20px" }}>
      <iframe
        style={{ border: "none" }}
        src={props.src}
        height={props.height}
        width={props.width}
        title={props.title}
      />
    </div>
  );
};

export default Iframe;
