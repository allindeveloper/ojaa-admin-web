import React, { Component } from "react";
import { Button, Grid, Paper, makeStyles, withStyles } from "@material-ui/core";
import { SimpleCard } from "matx";
import clsx from "clsx";
import { CustomTable } from "app/components/DefaultTable/CustomTable";
import { dummyRow } from "../dummyRow";
import PaginationX from "app/components/Pagination/PaginationX";

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
  OrderNumber:{
      color:"#1A88B8"
  },
  Paid:{
      color:"#CC7203"
  }
});
class CompletedOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      currentPage:1,
      searchData: {},
      submitData: {},
      PageSize: 10,
      pageOfItems: [],
      pager: {},
      op: 1,
      isSearching: true,
      showTable: false,
      show: true,
      };
  }

  componentWillMount() {
    this.setState({ searchData: { PageSize: this.state.PageSize } });
  }

  // componentDidMount() {
  //   console.log("props in ordders", this.props);
  //   // this.props.ServiceBase,
  //   // call endpoint to get data

  //   const { ORDERS, COMPLETED } = this.props.Constants;
  //   this.props.ServiceBase.getCompletedOrders(ORDERS, COMPLETED, 1)
  //     .then(({ data }) => {
  //       this.setState({ orders: data.orders });
  //     })
  //     .catch((err) => {
  //       // console.log(err.response,err)
  //     });
  // }

  sortFunc = (data) => {
    return data.sort((a, b) => {
      if (a.Name === undefined || a.Name === null) {
        return 0;
      }
      if (b.Name === undefined || b.Name === null) {
        return 0;
      }
      var nameA = a.Name.toUpperCase();
      var nameB = b.Name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  };

  onChangePage = (pageOfItems, pager) => {
    this.setState({
      pageOfItems: pageOfItems !== null ? pageOfItems : [],
      pager,
      op: 1,
      disabled: false,
      isSearching: false,
    });
  };

  onNewPageRequest = () => {
    console.log("new page request", this.props)
    this.setState({ op: 0.3 });
  };

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
    console.log("order in completed", this.state.orders)
    return (
        <>
            <>
           <PaginationX currentPage ={this.state.currentPage}service={this.props.ServiceBase.getCompletedOrders} controller={this.props.Constants.ORDERS} action={this.props.Constants.COMPLETED} onNewPageRequest={this.onNewPageRequest} searchData={this.state.searchData} onChangePage={this.onChangePage}  />
          <div style={{ opacity: this.state.op }}>
            <CustomTable   classes={classes} rows={this.state.pageOfItems} isSearching={this.state.isSearching}/>
          </div>
            </>
          
          </>
      
    );
  }
}

export default withStyles(styles, { withTheme: true })(CompletedOrders);
// withRouter(connect(mapStateToProps, { loginWithEmailAndPassword })(SignIn))