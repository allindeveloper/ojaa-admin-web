import React from "react";
import { Breadcrumb, SimpleCard } from "matx";
import Highlight from "react-highlight";
import {
  Grid,
  Paper,
  withStyles,
  MuiThemeProvider,
  createMuiTheme,
  Button,
} from "@material-ui/core";
import { StaffsListColumns } from "columnDatasets";
import PaginationStaff from "app/components/Pagination/PaginationStaff";
import MUIDataTable from "mui-datatables";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import MoreInfo from "app/components/MoreInfo";
import "./product.css";
import DeleteIcon from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";

import CreateModal from "app/components/Modal/CreateModal";
// import EditModal from "app/components/Modal/EditModal"
import UserCreate from "./UserCreate"
import LoadingOverlay from "react-loading-overlay";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { toast } from "react-toastify";

const styles = (theme) => ({
  formroot :{
    "& > *": {
      // margin: theme.spacing(1),
      // width: "25ch",
    },
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
});
class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      fileImage:null,
      disableCreate: false,
      creating: false,
      createForm: false,
      editForm: false,
      disabled: false,
      editing: false,
      disableEdit: false,
      orders: [],
      currentPage: 1,
      searchData: {},
      submitData: {},
      PageSize: 10,
      pageOfItems: [],
      pager: {},
      op: 1,
      isSearching: true,
      showTable: false,
      show: true,
      isPaneOpen: false,
      isPaneOpenLeft: false,
      isRightOpen: false,
      productDetails: {},
      userCreateData: {},
      Description:"",
      Price:"",
      rowItems:{}
    };
    window["deleteProduct"] = this.deleteProduct;
    window["editProduct"] = this.editProduct;
    window["viewProduct"] = this.viewProduct;
  }

  componentDidMount() {
    // this.setState({ searchData: { PageSize: this.state.PageSize } });

    console.log("props", this.props)
  }

  componentWillUnmount() {
    // Make sure to revoke the data uris to avoid memory leaks
    this.state.files.forEach(file => URL.revokeObjectURL(file.preview));
  }

  viewProduct = (value, tableMeta, updateValue) => {
    console.log("value", value);
    console.log("tableMeta", tableMeta);
    let rowItems = this.state.pageOfItems[tableMeta.rowIndex];
    console.log("rowitems", rowItems);
    this.setState({ productDetails: rowItems, rowItems:rowItems, Price:rowItems.price,Description: rowItems.description }, () => {
      this.setState({ isPaneOpen: true });
    });
  };
  onRowClick = (value, tableMeta, updateValue) => {
    console.log("value", value);
    console.log("tableMeta", tableMeta);
    let rowItems = this.state.pageOfItems[tableMeta.rowIndex];
    console.log("rowitems", rowItems);
    this.setState({ productDetails: rowItems, rowItems:rowItems, Price:rowItems.price,Description: rowItems.description }, () => {
      this.setState({ isPaneOpen: true });
    });
  };
  deleteProduct = (value, tableMeta, updateValue) => {
    console.log("adding");
    console.log("value", value);
    console.log("tableMeta", tableMeta);
    console.log("updateValue", updateValue);
    let rowItems = this.state.pageOfItems[tableMeta.rowIndex];
    console.log("roww items", rowItems)
    const {WEIGHT} = this.props.Constants
    Swal.fire({
      title: 'Are you sure you want to Delete this item ?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        return this.props.ServiceBase.deleteItem(WEIGHT, rowItems.id)
        .then((response)=>{
          console.log("response ", response.data)
          //this.getWeightData();
        })
        .catch(error => {
          Swal.showValidationMessage(
            `Request failed: ${error}`
          )
        })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Item Deleted Successfully',
        })
      }
    })
  };

  closeRightMenu = () => {
    this.setState({ isRightOpen: false });
  };

  onNewPageRequest = () => {
    console.log("new page request", this.props);
    this.setState({ op: 0.3 });
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

  showCreateForm = () => {
    this.setState({ createForm: true });
  };

  hideCreateForm = () => {
    this.setState({ disableCreate: false, creating: false, createForm: false });
  };

  editProduct = (value, tableMeta, updateValue) => {
    console.log("tableMeta", tableMeta);
    this.setState({editForm:true})
    let rowItems = this.state.pageOfItems[tableMeta.rowIndex];
    console.log("currwnt item", rowItems)
    this.setState({rowItems:rowItems, Price:rowItems.price, Description:rowItems.description},()=>{
      this.setState({editForm:true})

    })
  };

  onCreate = () => {
    this.setState({creating:true, disableCreate:true})
    const {userCreateData} = this.state;
    const  {user} = this.props;
    const {PRODUCT,USER,UPDATE_ROLE} = this.props.Constants;
    console.log("curent user", user)
    console.log("tstate", userCreateData)
    const payload ={
    email : userCreateData.Email,
	user : user._id,
	role : userCreateData.Role
    }
    this.props.ServiceBase.updateRole(payload,USER,UPDATE_ROLE)
    .then((res)=>{
      this.setState({creating:false,disableCreate:false})
      console.log("response", res.data)
    })
    .catch((error)=>{
      this.setState({creating:false,disableCreate:false})
      if(error.response){
      toast.error( error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose:5000
      });
      console.log("error",error.response.data)
    }else{
      toast.error( "Please Try Again", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose:5000
      });
    }
    })
   

  };

  onEdit = () =>{
    this.setState({editing:true, disableEdit:true})
    const { PRODUCT} = this.props.Constants;
    const {user} = this.props;
    const {Price, Description, rowItems} = this.state;
    var formData = new FormData();
    formData.append('price', Price);
    formData.append('description', Description);
    formData.append('user', user._id);
    this.props.ServiceBase.updateProduct(PRODUCT, formData,rowItems._id)
    .then((response) => {
      console.log("response", response.data);
      toast.success( "Product Updated Successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose:4000
      });
      this.setState({editing:false,editForm:false,disableEdit:false})
    })
    .catch((err) => {
      console.log("err getting top customers", err.response.data);
    });
  }

  hideEditForm = () =>{
    this.setState({editing:false, editForm:false})
  }
  handleInputChange = (input) => ({ target: { value } }) => {
    this.setState((prevState) => ({
      userCreateData: {
        ...prevState.userCreateData,
        [input]: value,
      },
    }));
  };

  handleEditChange = (input) => ({ target: { value } }) => {
    this.setState({
      [input]: value
    });
  };
  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTable: {
          root: {
            backgroundColor: "#AAF",
          },
          paper: {
            // boxShadow: 'none',
          },
        },
        MuiTableRow: {
          root: {
            cursor: "pointer",
          },
          hover: {
            "&$root": {
              "&:hover": {
                background: "#f5f5f5",
              },
            },
          },
        },
      },
    });

    addFile = file => {
      console.log(file);
      this.setState({
        files: file.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      });
    };

     handleDrop = file =>{
            console.log("accepted files", file)
            this.setState({
              files: file.map(file =>
                Object.assign(file, {
                  preview: URL.createObjectURL(file)
                })
              )
            });

     }
    // this.setState({acceptedFiles: acceptedFiles})

  render() {
    let { classes } = this.props;
    const { productDetails, userCreateData } = this.state;
    const {
      editing,
      disableEdit,
      searching,
      createForm,
      editForm,
      creating,
      disableCreate,
      Description,
      Price,
      rowItems
    } = this.state;

    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Home", path: "/app/dashboard" },
              { name: "Products" },
            ]}
          />
        </div>
        <SimpleCard
          createButton={
            <Button
              variant="contained"
              onClick={this.showCreateForm}
              color="primary"
            >
              Upgrade User
            </Button>
          }
        >
          <div className="py-8">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <LoadingOverlay
                  active={this.state.isSearching}
                  styles={{
                    overlay: (base) => ({
                      ...base,
                      background: "#e0e0e0",
                    }),
                  }}
                  spinner
                  text="Loading Staff Lists..."
                >
                  <div style={{ opacity: this.state.op }}>
                  <MuiThemeProvider theme={this.getMuiTheme()}>
                    <MUIDataTable
                      title={"Manage Users"}
                      data={this.state.pageOfItems}
                      columns={StaffsListColumns}
                      options={{
                        enableNestedDataAccess: ".",
                        search: false,
                        download: false,
                        responsive: "standard",
                        selectableRows: false,
                        pagination: false,
                        draggableColumns: { enabled: true },
                        elevation: 2,
                        onRowClick: this.onRowClick,
                        rowHover: true,
                        print: false,
                        filter: false,
                      }}
                    />
                  </MuiThemeProvider>
                  </div>
                </LoadingOverlay>
                <br></br>
                {/* {this.state.isSearching && ( */}
                  <PaginationStaff
                    currentPage={this.state.currentPage}
                    service={this.props.ServiceBase.getUsers}
                    controller={`${this.props.Constants.USERS}/${this.props.Constants.STAFFS}`}
                    onNewPageRequest={this.onNewPageRequest}
                    searchData={this.state.searchData}
                    onChangePage={this.onChangePage}
                  />
                {/* )} */}
              </Grid>
            </Grid>
          </div>
          
        </SimpleCard>

        {createForm && (
          <CreateModal
            title="Upgrade User Status"
            createForm={createForm}
            hideCreateForm={this.hideCreateForm}
            onCreate={this.onCreate}
            creating={creating}
            disableCreate={disableCreate}
            content={
              <UserCreate
                userCreateData={userCreateData}
                handleInputChange={this.handleInputChange}
                classes={classes}
                files={this.state.files}
                handleDrop={this.handleDrop}
              />
            }
          />
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});
export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps)(Users)
);
