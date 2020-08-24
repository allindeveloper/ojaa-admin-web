import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LoadingOverlay from "react-loading-overlay";

import {
  Card,
  Icon,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const TableCard = (props) => {
  const topCustomers = props.topCustomers;
  const feedbackList = [
    {
      name: "Sam Smith",
      phone: "07012345678",
      comments: "Good Product",
    },
    {
      name: "Olasukanmi Daniel",
      phone: "07012345678",
      comments: "On time Delivery",
    },
    {
      name: "Favour Michael",
      phone: "07012345678",
      comments: "Transparent App",
    },
    {
      name: "Opara Daniel",
      phone: "07012345678",
      comments: "On time Delivery",
    },
    {
      name: "Favour Michael",
      phone: "07012345678",
      comments: "The rice was delicious",
    },
  ];
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];
  const classes = useStyles();
  return (
    <Card elevation={3} className="pt-20 mb-24">
      <div className="card-title px-24 mb-12">Top Customers</div>
      <div className="overflow-auto">
        
          <TableContainer component={Paper}>
            <LoadingOverlay
          active={props.loadingtopCustomers}
          spinner
          text="Loading your Top Customers..."
        >
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" className="px-10">
                    Total Amount
                  </TableCell>
                  <TableCell align="left">Total Orders</TableCell>
                  <TableCell align="left">Customer Name</TableCell>
                  <TableCell align="left" className="px-10">
                    Customer Phone
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topCustomers.map((top, index) => (
                  <TableRow key={index}>
                    <TableCell
                      component="th"
                      align="left"
                      className="px-10"
                      className="px-10"
                      scope="row"
                    >
                      {top.totalAmount}
                    </TableCell>
                    <TableCell align="left">{top.totalOrders}</TableCell>
                    <TableCell align="left">{`${top.customer.lastName} ${top.customer.firstName}`}</TableCell>
                    <TableCell align="left" className="px-10">
                      {top.customer.phone}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table></LoadingOverlay>
          </TableContainer>
        
      </div>
    </Card>
  );
};

export default TableCard;
