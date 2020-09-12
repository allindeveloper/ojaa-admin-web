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
import { ProductListColumns } from "columnDatasets";
import PaginationY from "app/components/Pagination/PaginationY";
import MUIDataTable from "mui-datatables";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import MoreInfo from "app/components/MoreInfo";
import "./product.css";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateModal from "app/components/Modal/CreateModal";
import ProductCreate from "./ProductCreate";
import LoadingOverlay from "react-loading-overlay";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { toast } from "react-toastify";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
});
class Products extends React.Component {
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
      productCreateData: {},
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
    this.setState({ productDetails: rowItems }, () => {
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
    this.setState({ isRightOpen: false });
    // let rowItems = this.state.rolesData[tableMeta.rowIndex];
    
  };

  onCreate = () => {
    this.setState({creating:true, disableCreate:true})
    const {productCreateData, files} = this.state;
    const  {user} = this.props;
    const {PRODUCT} = this.props.Constants;
    var formData = new FormData();
formData.append('name', productCreateData.Title);
formData.append('description', productCreateData.Description);
formData.append('category', productCreateData.Category);
formData.append('image', files[0]);
formData.append('price', productCreateData.Price);
formData.append('measure', productCreateData.Measurement);
formData.append('user', user._id);
    // for (const [key, value] of formData) {
    //   console.log('»', key, value)
    // }

    this.props.ServiceBase.createProduct(PRODUCT,formData)
    .then((response) => {
      this.setState({creating:false, disableCreate:false,createForm:false})
      console.log("response", response.data);
      if(response.data.status === "ok"){
        toast.error( "Product Added Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose:5000
        });
      }
      
    })
    .catch((err) => {
      this.setState({creating:false, disableCreate:false})
      console.log("err getting top customers", err.response.data);

      if(err.response.data){
        toast.error( err.response.data.error, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose:5000
        });
      }

    });

  };

  handleInputChange = (input) => ({ target: { value } }) => {
    this.setState((prevState) => ({
      productCreateData: {
        ...prevState.productCreateData,
        [input]: value,
      },
    }));
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
    const { productDetails, productCreateData } = this.state;
    const {
      editing,
      disableEdit,
      searching,
      createForm,
      editForm,
      creating,
      disableCreate,
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
              Add Product
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
                  text="Loading Products..."
                >
                  <MuiThemeProvider theme={this.getMuiTheme()}>
                    <MUIDataTable
                      title={"Products List"}
                      data={this.state.pageOfItems}
                      columns={ProductListColumns}
                      options={{
                        search: false,
                        download: false,
                        responsive: "standard",
                        selectableRows: false,
                        pagination: false,
                        draggableColumns: { enabled: true },
                        elevation: 2,
                        // onRowClick: this.onRowClick,
                        rowHover: true,
                        print: false,
                        filter: false,
                      }}
                    />
                  </MuiThemeProvider>
                </LoadingOverlay>
                <br></br>
                {/* {this.state.isSearching && ( */}
                  <PaginationY
                    currentPage={this.state.currentPage}
                    service={this.props.ServiceBase.getProducts}
                    controller={this.props.Constants.PRODUCTS}
                    onNewPageRequest={this.onNewPageRequest}
                    searchData={this.state.searchData}
                    onChangePage={this.onChangePage}
                  />
                {/* )} */}
              </Grid>
            </Grid>
          </div>
          <SlidingPane
            className=""
            overlayClassName="productSidePane"
            isOpen={this.state.isPaneOpen}
            title="Product Details"
            subtitle="Optional subtitle."
            width={"300px"}
            onRequestClose={() => {
              // triggered on "<" on left top click or on outside click
              this.setState({ isPaneOpen: false });
            }}
          >
            <Grid container>
              <Grid item xs={12}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img src={productDetails.image} />
                </div>
                <br />
              </Grid>
              <Grid item xs={12}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderStyle: "solid",
                    borderColor: "grey",
                    borderWidth: ".09rem",
                    padding: "0.5rem",
                  }}
                >
                  <div>Category</div>
                  <div>{productDetails.category}</div>
                </div>
                <br />
                <br />
              </Grid>

              <Grid item xs={12}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderStyle: "solid",
                    borderColor: "grey",
                    borderWidth: ".09rem",
                    padding: "0.5rem",
                  }}
                >
                  <div>Price</div>
                  <div>{productDetails.price}</div>
                </div>
              </Grid>
              <Grid item xs={12}>
                <br />
                <br />
                <h5>Description</h5>
                <hr />
                <div>{productDetails.description}</div>
              </Grid>
              <Grid item xs={12}>
                <br />
                <br />
                <br />
                <br />
                <div style={{ display: "flex" }}>
                  <DeleteIcon htmlColor="#DC7A01" />
                  <label style={{ color: "#DC7A01" }}>Delete</label>
                </div>
              </Grid>
            </Grid>

            <br />
          </SlidingPane>
        </SimpleCard>

        {createForm && (
          <CreateModal
            title="Create Product"
            createForm={createForm}
            hideCreateForm={this.hideCreateForm}
            onCreate={this.onCreate}
            creating={creating}
            disableCreate={disableCreate}
            content={
              <ProductCreate
                productCreateData={productCreateData}
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
  connect(mapStateToProps)(Products)
);
