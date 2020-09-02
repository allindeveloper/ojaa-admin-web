import React from "react";
import { Card ,Button} from "@material-ui/core";

const SimpleCard = ({ children, title, subtitle, icon, createButton }) => {
  return (
    <Card elevation={6} className="px-24 py-20 h-100">
      <div style={{display:"flex",justifyContent:"space-between"}}>
      <div className="card-title">{title}</div>
      {/* <div className="card-subtitle mb-24">{subtitle}</div> */}
      {createButton}
        </div>
      {children}
    </Card>
  );
};

export default SimpleCard;