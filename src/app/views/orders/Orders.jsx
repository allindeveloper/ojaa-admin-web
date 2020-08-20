import React from "react";
import { Breadcrumb, SimpleCard } from "matx";
import Highlight from "react-highlight";
import OrderTabs from "./shared/OrderTabs";

class Orders extends React.Component {

  constructor(props){
    super(props);
    this.state={}
  }


  componentDidMount(){
    console.log("props in ordders",this.props)
    // this.props.ServiceBase, 
    // call endpoint to get data
    
  }


  render(){
  
  const incomingTab = this.props.location.state ? this.props.location.state.tab || 0 : 0
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
}

export default Orders;
