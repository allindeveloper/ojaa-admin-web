import React, { Component, Fragment } from "react";
import { Grid, Card } from "@material-ui/core";
import {Doughnut} from 'react-chartjs-2';

import ModifiedAreaChart from "./shared/ModifiedAreaChart";
import StatCards from "./shared/StatCards";
import TableCard from "./shared/TableCard";
import RowCards from "./shared/RowCards";
import StatCards2 from "./shared/StatCards2";
import UpgradeCard from "./shared/UpgradeCard";
import Campaigns from "./shared/Campaigns";
import { withStyles } from "@material-ui/styles";
import FilterOrders from "./shared/FilterOrders";
import LoadingOverlay from "react-loading-overlay";

class Dashboard1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topCustomers: [],
      loadingtopCustomers:true,
      newOrders: 0,
      activeOrders: 0,
      completedOrders: 0,
      loadingCounts:true,
      loadingDoughnut:true,
      pieChartData: []
    };
  }

  componentDidMount() {
    console.log("props", this.props);
    const { STATS, TOP_CUSTOMERS ,ORDERS, COUNT} = this.props.Constants;
    this.props.ServiceBase.getTopCustomers(STATS, TOP_CUSTOMERS)
      .then((response) => {
        console.log("response", response.data);
        if(response.data.status === "ok"){
          this.setState({topCustomers:response.data.topCustomers, loadingtopCustomers:false})
        }
      })
      .catch((err) => {
        console.log("err getting top customers", err);
      });
      this.props.ServiceBase.getItems(ORDERS, COUNT)
      .then((response) => {
        if(response.status === 200){
          console.log("response counts", response.data);
          const {newOrders,activeOrders, completedOrders} = response.data
          this.setState({newOrders,activeOrders,completedOrders, loadingCounts:false},()=>{
            this.setState({pieChartData:this.formatPieChartData(completedOrders,activeOrders,newOrders)},()=>{
              this.setState({loadingDoughnut:false})
            })
          })
        }
      })
      .catch((err) => {
        console.log("err getting top customers", err);
      });
      
  }

  formatPieChartData = (completedOrders, activeOrders, newOrders) => {
    return  {
      labels: [
        'Completed Orders',
        'Active Orders',
        'New Orders'
      ],
      datasets: [{
        data: [completedOrders, activeOrders, newOrders],
        backgroundColor: [
        '#ff6f00',
        '#ffeb3b',
        '#388e3c'
        ],
        hoverBackgroundColor: [
          '#ff6f00',
          '#ffeb3b',
          '#388e3c'
        ]
      }]
    }
  }

  render() {
    let { theme } = this.props;
    const {topCustomers,loadingtopCustomers, newOrders, completedOrders,
       activeOrders, loadingCounts,loadingDoughnut,pieChartData} = this.state;
    console.log("pie chart data", this.state.pieChartData);
    return (
      <Fragment>
        <div className="pb-86 pt-30 px-30 bg-primary">
          <div style={{ background: "#B55304", height: "40px" }}>
            <FilterOrders />
          </div>
          <ModifiedAreaChart
            height="280px"
            option={{
              series: [
                {
                  data: [24, 45, 31, 55, 31, 43, 26, 10, 31, 45, 33, 40],
                  type: "line",
                },
              ],
              xAxis: {
                data: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ],
              },
            }}
          ></ModifiedAreaChart>
        </div>

        <div className="analytics m-sm-30 mt--72">
          <Grid container spacing={3}>
            <Grid item lg={8} md={8} sm={12} xs={12}>
              <StatCards theme={theme} {...this.props} loadingCounts={loadingCounts} newOrders={newOrders} activeOrders={activeOrders} completedOrders={completedOrders} />

              {/* Top Selling Products */}
              <TableCard topCustomers={topCustomers} loadingtopCustomers={loadingtopCustomers}/>
            </Grid>

            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Card className="px-24 py-16 mb-16">
              <LoadingOverlay
          active={loadingCounts}
          styles={{
            overlay: (base) => ({
              ...base,
              background: "#e0e0e0",
            }),
          }}
          spinner
          text="Loading Chart..."
        >
                <div className="card-title">All Orders</div>
                <div className="card-subtitle">All Time</div>
                <Doughnut data={pieChartData} />
                </LoadingOverlay>
              </Card>

              {/* <UpgradeCard/> */}
              <StatCards2 />
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}

export default withStyles({}, { withTheme: true })(Dashboard1);
