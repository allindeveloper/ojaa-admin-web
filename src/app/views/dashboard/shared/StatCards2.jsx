import React, { Component } from "react";
import {
  Grid,
  Card,
  Icon,
  Fab,
  Tooltip
} from "@material-ui/core";
import { appHelpers } from "appHelper";
import LoadingOverlay from "react-loading-overlay";

const StatCards2 = (props) => {
  return (
    <Grid container spacing={3} className="mb-24">
      <Grid item xs={12} md={12}>
        <Card elevation={3} className="p-16">
        <LoadingOverlay
                  active={props.loadingNewCounts}
                  styles={{
                    overlay: (base) => ({
                      ...base,
                      background: "#e0e0e0",
                    }),
                  }}
                  spinner
                  text="Loading products sold..."
                >
          <div className="flex flex-middle">
            <Fab
              size="medium"
              className="bg-light-green circle-44 box-shadow-none"
            >
              <Icon className="text-green">trending_up</Icon>
            </Fab>
            <h5 className="font-weight-500 text-green m-0 ml-12">
              Products Sold
            </h5>
          </div>
          <div className="pt-16 flex flex-middle">
          <Tooltip title={props.unitsSold} aria-label="units sold"><h2 className="m-0 text-muted flex-grow-1">{appHelpers.abbreviateThousands(props.unitsSold)}</h2></Tooltip>
            <div className="ml-12 small-circle bg-green text-white">
              <Icon className="small-icon">expand_less</Icon>
            </div>
            <span className="font-size-13 text-green ml-4"> (+21%)</span>
          </div>
          </LoadingOverlay>
        </Card>
      </Grid>
      <Grid item xs={12} md={12}>
                <Card elevation={3} className="p-16">
                <LoadingOverlay
                  active={props.loadingNewCounts}
                  styles={{
                    overlay: (base) => ({
                      ...base,
                      background: "#e0e0e0",
                    }),
                  }}
                  spinner
                  text="Loading earnings..."
                >
                  <div className="flex flex-middle">
                    <Fab
                      size="medium"
                      className="bg-light-error circle-44 box-shadow-none overflow-hidden"
                    >
                      <Icon className="text-error">star_outline</Icon>
                    </Fab>
                    <h5 className="font-weight-500 text-error m-0 ml-12">
                      Earnings
                    </h5>
                  </div>
                  <div className="pt-16 flex flex-middle">
                    <h2 className="m-0 text-muted flex-grow-1">₦{appHelpers.abbreviateThousands(props.totalEarnings)}</h2>
                    <div className="ml-12 small-circle bg-error text-white">
                      <Icon className="small-icon">expand_less</Icon>
                    </div>
                    {/* <span className="font-size-13 text-error ml-4">(+21%)</span> */}
                  </div>
                  </LoadingOverlay>
                </Card>
              </Grid>
      <Grid item xs={12} md={12}>
        <Card elevation={3} className="p-16">
        <LoadingOverlay
                  active={props.loadingNewCounts}
                  styles={{
                    overlay: (base) => ({
                      ...base,
                      background: "#e0e0e0",
                    }),
                  }}
                  spinner
                  text="Loading total users..."
                >
          <div className="flex flex-middle">
            <Fab
              size="medium"
              className="bg-light-green circle-44 box-shadow-none"
            >
              <Icon className="text-green">trending_up</Icon>
            </Fab>
            <h5 className="font-weight-500 text-green m-0 ml-12">
              Total Users
            </h5>
          </div>
          <div className="pt-16 flex flex-middle">
            <h2 className="m-0 text-muted flex-grow-1">{appHelpers.abbreviateThousands(props.usersCount)}</h2>
            <div className="ml-12 small-circle bg-green text-white">
              <Icon className="small-icon">expand_less</Icon>
            </div>
            <span className="font-size-13 text-green ml-4"> (+21%)</span>
          </div>
          </LoadingOverlay>
        </Card>
      </Grid>

      

      
    </Grid>
  );
};

export default StatCards2;
