import React from "react";
import { Breadcrumb, SimpleCard } from "matx";
import Highlight from "react-highlight";

const Settings = () => {
  return (
    <div className="m-sm-30">
      <div  className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "Home", path: "/app/settings" },
            { name: "Settings" }
          ]}
        />
      </div>
      <SimpleCard title="Settings">
        <div className="py-8"></div>
        
      </SimpleCard>
    </div>
  );
};

export default Settings;
