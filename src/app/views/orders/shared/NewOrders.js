import React, { Component } from "react";
import { Button, Grid, Paper, makeStyles, withStyles } from "@material-ui/core";
import { SimpleCard } from "matx";
import clsx from "clsx";
import { CustomNewOrderTable } from "app/components/DefaultTable/CustomNewOrderTable";
import { dummyRow } from "../dummyRow";
import PaginationX from "app/components/Pagination/PaginationX";
import Swal from "sweetalert2";
import { connect } from "react-redux";

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
class NewOrders extends Component {
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

    confirmItem = (item) =>{
      console.log("itemm", item)
      console.log("user",this.props.user)
      const {ORDER,UPDATE} = this.props.Constants;

      const payload ={
        status : "Active",
        user: this.props.user._id
      }
      Swal.fire({
        title: 'Are you sure you want to confirm this order',
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
          return this.props.ServiceBase.updateOrder(ORDER,UPDATE,item._id,payload)
          .then((response) => {
            console.log("response", response.data);
            this.setState({ searchData: { PageSize: this.state.pageOfItems.length -1 } });
          })
          .catch((error) => {
            // console.log("err confirming order", error.response.data);
            Swal.showValidationMessage(
                    `Request failed: ${error.response.data.error}`
                  )
             })
          
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: `Order Confirmed Successfully`,
          })
        }
      })
    }
  render() {
    let { classes } = this.props;
    console.log("order in new", this.props)
    return (
        <>
            <>
           <PaginationX currentPage ={this.state.currentPage}service={this.props.ServiceBase.getActiveOrders} controller={this.props.Constants.ORDERS} action={this.props.Constants.NEW} onNewPageRequest={this.onNewPageRequest} searchData={this.state.searchData} onChangePage={this.onChangePage}  />
          <div style={{ opacity: this.state.op }}>
            <CustomNewOrderTable   classes={classes} rows={this.state.pageOfItems} isSearching={this.state.isSearching}
            confirmItem={this.confirmItem}
            />
          </div>
            </>
          
          </>
      
    );
  }
}


const mapStateToProps = (state) => ({
  user: state.user,
});
export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps)(NewOrders)
);
// withRouter(connect(mapStateToProps, { loginWithEmailAndPassword })(SignIn))
