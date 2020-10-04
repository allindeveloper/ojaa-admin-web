import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LoadingOverlay from "react-loading-overlay";

import {
  Card,
  Icon,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,TextField, MenuItem
} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const historyRange = [
  { label: "Last 24 hours", value: 24 },
  { label: "Last One weeks", value: 1 },
  { label: "Last Two Weeks", value: 0 }
];
const TransactionHistory = (props) => {
  const history = [
    {
      description: "Rice and beans payment",
      orderNo: "OWNOI",
      ammountPaid: "34000",
      orderDate:"August 10, 9:23am"
    },
    {
      description: "Paystack disbursement",
      orderNo: "OWNOI",
      ammountPaid: "34000",
      orderDate:"August 10, 9:23am"
    },
    {
      description: "10 bags of gaari",
      orderNo: "NOMPOEM",
      ammountPaid: "3000000",
      orderDate:"August 10, 9:23am"
    },
    {
      description: "Rice and beans payment",
      orderNo: "NPIMPO",
      ammountPaid: "34000",
      orderDate:"August 10, 9:23am"
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
  const dashboardFilter = {props};
  return (
    <Card elevation={3} className="pt-20 mb-24">
      <div style={{display:"flex", justifyContent:"space-between"}}>
      <div className="card-title px-24 mb-12">Transaction History</div>
      <Grid item xs={12} md={4}>
      <TextField
          id="outlined-select-sector"
          select
          margin="dense"
          fullWidth
          required
          value={dashboardFilter.transactionHistory}
          label="Distance Range"
          variant="outlined"
          name="transactionHistory"
          onChange={props.handleSelectChange("transactionHistory")}
        >
          {historyRange.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </Grid>
      </div>
      <div className="overflow-auto">
        
          <TableContainer component={Paper}>
          {/*   <LoadingOverlay
          active={props.loadingtopCustomers}
          spinner
          text="Loading your Top Customers..."
        > */}
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow >
                <TableCell align="left" className="px-10">
                   S/N
                  </TableCell>
                  <TableCell align="left" className="px-10">
                    Description
                  </TableCell>
                  <TableCell align="left">Order Number</TableCell>
                  <TableCell align="left">Amount Paid (NGN)</TableCell>
                  <TableCell align="left" className="px-10">
                    Time                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {history.map((top, index) => (
                  <TableRow key={index} hover>
                    <TableCell
                      component="th"
                      align="left"
                      className="px-10"
                      className="px-10"
                      scope="row"
                    >{++index}</TableCell>
                    <TableCell
                      component="th"
                      align="left"
                      className="px-10"
                      className="px-10"
                      scope="row"
                    >
                      {top.description}
                    </TableCell>
                    <TableCell align="left">{top.orderNo}</TableCell>
                    <TableCell align="left">{top.ammountPaid}</TableCell>
                    <TableCell align="left" className="px-10">
                      {top.orderDate}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* </LoadingOverlay> */}
          </TableContainer>
        
      </div>
    </Card>
  );
};

export default TransactionHistory;
