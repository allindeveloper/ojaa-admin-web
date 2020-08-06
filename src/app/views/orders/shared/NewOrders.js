import React, { Component } from "react";
import { Button, Grid, Paper, makeStyles, withStyles } from "@material-ui/core";
import { SimpleCard } from "matx";
import clsx from "clsx";
import { CustomTable } from "app/components/DefaultTable/CustomTable";
import Pagination from "app/components/Pagination/Pagination";
import { dummyRow } from "../dummyRow";
const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(5),
    //   textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  confirmButton: {
    backgroundColor: "#09A6E0",
    width: "17rem",
  },
});
class NewOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
        PageSize: 2,
        pageOfItems: [],
        pager: {},
        op: 1,
        isSearching:false,
        disabled:false
      };
  }

  onChangePage =(pageOfItems, pager) => {
    this.setState({
      pageOfItems: pageOfItems !== null ? pageOfItems : [],
      pager,
      op: 1,
      disabled: false,
      isSearching: false,
    });
  }

  onNewPageRequest =() => {
    this.setState({ op: 0.3 });
  }


  formatRows(data){
    return	data.map((item,index)=>{
        return{
                OrderNumber: item.OrderNumber,
                OrderTime: item.OrderTime,
                ExpectedDeliveryTime: item.ExpectedDeliveryTime,
                ItemReviewCount:item.ItemReviewCount,
                Items:item.Items,
        }
      })
  
    }
  render() {
    let { classes } = this.props;
    return (
        <>
            <>
            <Pagination items={dummyRow} onChangePage={this.onChangePage} />
          <CustomTable  classes={classes} rows={this.state.pageOfItems} isSearching={this.state.isSearching}/>
            </>
          
          </>
        // {/* <Grid container spacing={3}>
        //   <Grid item xs={12} sm={6}>
        //     <Grid container spacing={3}>
        //       <Grid item xs={12} sm={6}>
        //         Order Number
        //       </Grid>
        //       <Grid item xs={12} sm={6}>
        //         Order GVM123453
        //       </Grid>
        //     </Grid>
        //     <Grid container spacing={3}>
        //       <Grid item xs={12} sm={6}>
        //         Order Time
        //       </Grid>
        //       <Grid item xs={12} sm={6}>
        //         March 23, 9:04 am
        //       </Grid>
        //     </Grid>
        //     <Grid container spacing={3}>
        //       <Grid item xs={12} sm={6}>
        //         Expected Delivery Time
        //       </Grid>
        //       <Grid item xs={12} sm={6}>
        //         March 24, 9:04 am
        //       </Grid>
        //     </Grid>
        //     <br />
       
        //     <Grid container spacing={3}>
        //       <Grid item xs={12} sm={6}>
        //         Item Review
        //       </Grid>
        //       <Grid item xs={12} sm={6}>
        //         10 ITEMS
        //       </Grid>
        //     </Grid>
        //   </Grid>

        //   <Grid item xs={12} sm={6}>
        //     <label>Billing Details</label>
        //     <hr />
        //     <Grid container spacing={3}>
        //       <Grid item xs={12} sm={6}>
        //         Status
        //       </Grid>
        //       <Grid item xs={12} sm={6}>
        //         Guest
        //       </Grid>
        //     </Grid>
        //     <Grid container spacing={3}>
        //       <Grid item xs={12} sm={6}>
        //         Name
        //       </Grid>
        //       <Grid item xs={12} sm={6}>
        //         Olamide Baba nla
        //       </Grid>
        //     </Grid>

        //     <Grid container spacing={3}>
        //       <Grid item xs={12} sm={6}>
        //         Billing Address
        //       </Grid>
        //       <Grid item xs={12} sm={6}>
        //         No 23, Olarokun Street.Off Ajoke Lewis. Amuwo Odofin Lagos State
        //       </Grid>
        //     </Grid>

        //     <Grid container spacing={3}>
        //       <Grid item xs={12} sm={6}>
        //         Phone
        //       </Grid>
        //       <Grid item xs={12} sm={6}>
        //         +234 803 675 0000
        //       </Grid>
        //     </Grid>

        //     <Grid container spacing={3}>
        //       <Grid item xs={12} sm={6}>
        //         Total
        //       </Grid>
        //       <Grid item xs={12} sm={6}>
        //         N 10000
        //       </Grid>
        //     </Grid>

        //     <Grid container spacing={3}>
        //       <Grid item xs={12} sm={6}>
        //         Paid
        //       </Grid>
        //       <Grid item xs={12} sm={6}>
        //         N 1000
        //       </Grid>
        //     </Grid>

        //     <Grid container spacing={3}>
        //       <Grid item xs={12} sm={6}>
        //         Via Paystack
        //       </Grid>
        //       <Grid item xs={12} sm={6}></Grid>
        //     </Grid>
        //     <br />
        //     <Grid container justify="center">
        //       <Button
        //         variant="contained"
        //         className={clsx(classes.confirmButton)}
        //         type="submit"
        //       >
        //         CONFIRM
        //       </Button>
        //     </Grid>
        //   </Grid>
        // </Grid> */}
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewOrders);
// withRouter(connect(mapStateToProps, { loginWithEmailAndPassword })(SignIn))
