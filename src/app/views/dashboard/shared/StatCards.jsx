import React, { Component } from "react";
import { Grid, Card, Icon, IconButton, Tooltip } from "@material-ui/core";
import LoadingOverlay from "react-loading-overlay";

const StatCards = (props) => {
  const theme = props.theme;

  const openNewOrders = () => {
    console.log("props", props);
    props.history.push({
      pathname: "/home/orders",
      state: { tab: 0 },
    });
  };
  const openActiveOrders = () => {
    console.log("props", props);
    props.history.push({
      pathname: "/home/orders",
      state: { tab: 1 },
    });
  };

  const openCompletedOrders = () => {
    console.log("props", props);
    props.history.push({
      pathname: "/home/orders",
      state: { tab: 2 },
    });
  };
  return (
    <Grid container spacing={3} className="mb-24">
      <Grid item xs={12} md={4}>
        <LoadingOverlay
          active={props.loadingCounts}
          styles={{
            overlay: (base) => ({
              ...base,
              background: "#e0e0e0",
            }),
          }}
          spinner
          text="Loading new orders..."
        >
          <Card className="play-card p-sm-24 bg-paper" elevation={6}>
            <div className="flex flex-middle">
              <Icon
                style={{
                  fontSize: "44px",
                  opacity: 0.6,
                  color: theme.palette.primary.main,
                }}
              >
                add_shopping_cart
              </Icon>
              <div className="ml-12">
                <small className="text-muted">New Orders</small>
                <h6 className="m-0 mt-4 text-primary font-weight-500">
                  {props.newOrders}
                </h6>
              </div>
            </div>
            <Tooltip title="View New Orders" placement="top">
              <IconButton onClick={openNewOrders}>
                <Icon>arrow_right_alt</Icon>
              </IconButton>
            </Tooltip>
          </Card>
        </LoadingOverlay>
      </Grid>
      <Grid item xs={12} md={4}>
        <LoadingOverlay
          active={props.loadingCounts}
          styles={{
            overlay: (base) => ({
              ...base,
              background: "#e0e0e0",
            }),
          }}
          spinner
          text="Loading new orders..."
        >
          <Card className="play-card p-sm-24 bg-paper" elevation={6}>
            <div className="flex flex-middle">
              <Icon
                style={{
                  fontSize: "44px",
                  opacity: 0.6,
                  color: theme.palette.primary.main,
                }}
              >
                shopping_basket
              </Icon>
              <div className="ml-12">
                <small className="text-muted">Active Orders</small>
                <h6 className="m-0 mt-4 text-primary font-weight-500">
                  {props.activeOrders}
                </h6>
              </div>
            </div>
            <Tooltip title="View Active Orders" placement="top">
              <IconButton onClick={openActiveOrders}>
                <Icon>arrow_right_alt</Icon>
              </IconButton>
            </Tooltip>
          </Card>
        </LoadingOverlay>
      </Grid>

      <Grid item xs={12} md={4}>
        <LoadingOverlay
          active={props.loadingCounts}
          styles={{
            overlay: (base) => ({
              ...base,
              background: "#e0e0e0",
            }),
          }}
          spinner
          text="Loading new orders..."
        >
          <Card className="play-card p-sm-24 bg-paper" elevation={6}>
            <div className="flex flex-middle">
              <Icon
                style={{
                  fontSize: "44px",
                  opacity: 0.6,
                  color: theme.palette.primary.main,
                }}
              >
                shopping_cart
              </Icon>
              <div className="ml-12">
                <small className="text-muted">Completed Orders</small>
                <h6 className="m-0 mt-4 text-primary font-weight-500">
                  {props.completedOrders}
                </h6>
              </div>
            </div>
            <Tooltip title="View Completed Orders" placement="top">
              <IconButton onClick={openCompletedOrders}>
                <Icon>arrow_right_alt</Icon>
              </IconButton>
            </Tooltip>
          </Card>
        </LoadingOverlay>
      </Grid>
    </Grid>
  );
};

export default StatCards;
