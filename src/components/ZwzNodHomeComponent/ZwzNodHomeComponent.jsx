import React from "react";
import UpdatedHomeComponent from "../../views/UpdatedHome/UpdatedHome.component";
import UpdatedNodHomeComponent from "../../views/UpdatedNodHome/UpdatedNodHome.component";

const HomePageComponent = () => {
  const hostname = window.location.hostname;
  console.log(hostname)
  return hostname === "nod.prtouch.com" ? (
    <UpdatedNodHomeComponent />
  ) : (
    <UpdatedHomeComponent />
  );
};

export default HomePageComponent;
