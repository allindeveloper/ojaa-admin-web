import React, { Component, Fragment } from "react";
import { Grid, Card } from "@material-ui/core";

import DoughnutChart from "../charts/echarts/Doughnut";

import ModifiedAreaChart from "./shared/ModifiedAreaChart";
import StatCards from "./shared/StatCards";
import TableCard from "./shared/TableCard";
import RowCards from "./shared/RowCards";
import StatCards2 from "./shared/StatCards2";
import UpgradeCard from "./shared/UpgradeCard";
import Campaigns from "./shared/Campaigns";
import { withStyles } from "@material-ui/styles";
import FilterOrders from "./shared/FilterOrders";

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
            this.setState({pieChartData:this.formatPieChartData(completedOrders,activeOrders,newOrders)})
          })
        }
      })
      .catch((err) => {
        console.log("err getting top customers", err);
      });
      
  }

  formatPieChartData = (completedOrders, activeOrders, newOrders) => {
    return  [
      {
        value: completedOrders,
        name: "Completed Orders"
      },
      {
        value: activeOrders,
        name: "Active Orders"
      },
      { value: newOrders, name: "New Orders" }
    ]
  }

  render() {
    let { theme } = this.props;
    const {topCustomers,loadingtopCustomers, newOrders, completedOrders, activeOrders, loadingCounts,pieChartData} = this.state;
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
                <div className="card-title">All Orders</div>
                <div className="card-subtitle">All Time</div>
                <DoughnutChart
                  height="300px"
                  pieChartData={pieChartData}
                  color={["#ff6f00", "#ffeb3b", "#388e3c"]}
                />
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
