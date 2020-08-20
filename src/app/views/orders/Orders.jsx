import React from "react";
import { Breadcrumb, SimpleCard } from "matx";
import Highlight from "react-highlight";
import OrderTabs from "./shared/OrderTabs";

const Orders = (props) => {
  console.log("props in ordders",props)
  const incomingTab = props.location.state ? props.location.state.tab || 0 : 0
  return (
    <div className="m-sm-30">
      <div  className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "Home", path: "/app/dashboard" },
            { name: "Orders" }
          ]}
        />
      </div>
      <SimpleCard >
        {/* <div className="py-8"> */}
          <OrderTabs incomingTab={incomingTab}/>
        {/* </div> */}
        
      </SimpleCard>
    </div>
  );
};

export default Orders;
