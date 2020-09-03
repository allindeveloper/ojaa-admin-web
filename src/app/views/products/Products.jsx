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
  }

  componentDidMount() {
    // this.setState({ searchData: { PageSize: this.state.PageSize } });
  }

  onRowClick = (rowData, rowMeta) => {
    console.log("rowData", rowData);
    console.log("rowMeta", rowMeta);
    let rowItems = this.state.pageOfItems[rowMeta.rowIndex];
    console.log("rowitems", rowItems);
    this.setState({ productDetails: rowItems }, () => {
      this.setState({ isPaneOpen: true });
    });
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

  onCreate = () => {};

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
                        onRowClick: this.onRowClick,
                        rowHover: true,
                        print: false,
                        filter: false,
                      }}
                    />
                  </MuiThemeProvider>
                </LoadingOverlay>
                <br></br>
                {this.state.isSearching && (
                  <PaginationY
                    currentPage={this.state.currentPage}
                    service={this.props.ServiceBase.getProducts}
                    controller={this.props.Constants.PRODUCTS}
                    onNewPageRequest={this.onNewPageRequest}
                    searchData={this.state.searchData}
                    onChangePage={this.onChangePage}
                  />
                )}
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
              />
            }
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Products);
