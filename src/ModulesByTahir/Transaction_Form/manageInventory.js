import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import $ from "jquery";
import "gasparesganga-jquery-loading-overlay";
import notify from "../Functions/notify";
import { RViewer, RViewerTrigger } from "react-viewerjs";
import Switch from "@material-ui/core/Switch";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../CSS_Files/table.css";
import firebase from "../../components/firebaseConfig/Firebase.js";
import { ToastsContainer, ToastsStore } from "react-toasts";

var that = "";
export class ImageView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cell: this.props.cell,
      row: this.props.row,
      imagesUrl: that.state.images
    };
  }

  render() {
    const { cell, row, imagesUrl } = this.state;

    let options = {
      toolbar: {
        prev: true,
        next: true
      },

      navbar: {
        default: true
      }
    };
    return (
      <React.Fragment>
        <div
          style={{
            overflow: " hidden",
            position: "relative"
          }}
        >
          <RViewer index={cell} options={options} imageUrls={imagesUrl[cell]}>
            <RViewerTrigger>
              <div className="col-md-12">
                <img
                  className="getCss"
                  src={imagesUrl[cell][0]}
                  width="150px"
                  height="150px"
                />
              </div>
            </RViewerTrigger>
          </RViewer>
        </div>
      </React.Fragment>
    );
  }
}

export class QtyInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      qty: ""
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    that.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <React.Fragment>
        Add Quantity
        <input
          type="number"
          className="form-control"
          placeholder="0"
          name="qty"
          id="qty"
          value={this.state.qty}
          onChange={this.handleChange}
        />
        <br />
        <p style={{ color: "#226EC0" }}>
          {this.props.row.qty > 0
            ? "Current Quantity: " + this.props.row.qty
            : "Current Quantity: 0"}
        </p>
      </React.Fragment>
    );
  }
}
export class CostInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cost: ""
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    that.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <React.Fragment>
        Add Cost
        <input
          type="number"
          className="form-control"
          placeholder="0"
          name="cost"
          id="cost"
          value={this.state.cost}
          onChange={this.handleChange}
        />
        <br />
        <p style={{ color: "#226EC0" }}>
          {this.props.row.cost > 0
            ? "Current Quantity: $" + this.props.row.cost
            : "Current Quantity: $0.00"}
        </p>
      </React.Fragment>
    );
  }
}
export class SelectAccount extends Component {
  constructor(props) {
    super(props);
  }
  handleChange = e => {
    that.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    var merchantAccounts = that.state.accounts.map(function(item, index) {
      return (
        <option key={index} value={item.ACCT_ID}>
          {item.ACCOUNT_NAME}
        </option>
      );
    });
    return (
      <React.Fragment>
        Select Account
        <select
          className="form-control selectpicker "
          name="account"
          onChange={this.handleChange}
        >
          <option selected>...</option>
          {merchantAccounts}
        </select>
      </React.Fragment>
    );
  }
}
export class ActionFormatter extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <button
          type="button"
          className="btn btn-info"
          value={this.props.cell}
          onClick={() => that.add(this.props.row)}
        >
          Add
        </button>
      </React.Fragment>
    );
  }
}

function imageView(cell, row) {
  return <ImageView cell={cell} row={row} />;
}
function qtyInput(cell, row) {
  return <QtyInput cell={cell} row={row} />;
}
function costInput(cell, row) {
  return <CostInput cell={cell} row={row} />;
}
function selectAccount(cell, row) {
  return <SelectAccount cell={cell} row={row} />;
}
function actionFormatter(cell, row) {
  return <ActionFormatter cell={cell} row={row} />;
}
function skuCondition(cell, row) {
  return (
    <React.Fragment>
      <p style={{ color: "#226EC0" }}>{row.seller_sku}</p>
      <br />
      {cell}
    </React.Fragment>
  );
}
function mpn_upc(cell, row) {
  return (
    <React.Fragment>
      <p style={{ color: "#226EC0" }}>{row.mpn}</p>
      <br />
      {cell}
    </React.Fragment>
  );
}
function dateFomat(cell, row) {
  return (
    <React.Fragment>
      <p style={{ color: "#E47B15" }}>{cell}</p>
      <br />
      {cell}
    </React.Fragment>
  );
}
class manageInventory extends Component {
  constructor(props) {
    super(props);
    that = this;
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    this.state = {
      baseUrl: finalurl,
      allInven: [],
      inventoryDatatable: [],
      images: [],
      accounts: [],
      selectedID: "",
      isLoaded: false,
      MT_ID: "",
      printYN: true,
      qty: "",
      cost: "",
      account: "",
      activeCount: 0,
      InactiveCount: 0,
      redirectToReferrer: false,
      refresh: false,
      selectBinNo: "",
      bins: [],
      selectedRow: ""
    };
  }
  componentWillMount() {
    if (localStorage.getItem("userName")) {
      this.setState({ merchant_id: localStorage.getItem("merId") });
    } else {
      this.setState({ redirectToReferrer: true });
    }
    this.loadData();
  }
  componentDidMount() {
    this.getBins();
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  getBins = () => {
    const { baseUrl } = this.state;
    let insertUrl = baseUrl + "/laptopzone/reactcontroller/c_product/getBins";
    var dbCall = new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "GET"
      }).then(
        function(data) {
          resolve(data);
        },
        function(err) {
          reject(err);
        }
      );
    });

    dbCall
      .then(result => {
        if (result.found) {
          this.setState({ bins: result.bins });
        } else {
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  handleSwitch = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  loadData = () => {
    $.LoadingOverlay("show");
    this.allInventory()
      .then(result => {
        $.LoadingOverlay("hide");
        // console.log(result);
        if (result.found) {
          if (this.state.allInven) {
            this.state.allInven = null;
          }
          this.setState({
            allInven: result.allinventory,
            images: result.images,
            accounts: result.accounts
          });
          this.pushInventory(result.allinventory);
          // console.log(result.accounts);
        } else {
          notify("error", result.message);
          // swal("Not Found", result.message, "error");
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };
  allInventory = () => {
    const { baseUrl } = this.state;
    let merch_id = localStorage.getItem("merId");
    let userId = localStorage.getItem("userId");
    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_product/getAllProducts";
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: { merch_id: merch_id, userId: userId }
      }).then(
        function(data) {
          resolve(data);
        },
        function(err) {
          reject(err);
        }
      );
    });
  };
  add = row => {
    var product_id = row.images;
    var merchant_id = row.merchant_id;
    var condition_id = row.condition_id;
    var lz_items_id = row.action;
    this.setState({
      selectedRow: row
    });
    const { baseUrl, qty, cost, account, selectBinNo } = this.state;
    if (!qty) {
      notify("error", "Quantity is zero!");
      return;
    }
    if (!account) {
      notify("error", "Please select account!");
      return;
    }
    if (merchant_id == 1) {
      if (!selectBinNo) {
        $("#openBinModal").click();
        return false;
      }
    }

    $.LoadingOverlay("show");
    this.saveNewInventory(
      product_id,
      merchant_id,
      account,
      condition_id,
      lz_items_id,
      qty,
      cost,
      selectBinNo
    )
      .then(result => {
        $.LoadingOverlay("hide");
        console.log(result);
        if (result.insert) {
          this.setState({
            qty: "",
            cost: "",
            inventoryDatatable: [],
            selectBinNo: ""
          });
          this.loadData();
          var allBarcodes = result.allBarcodes;

          allBarcodes.map(item => {
            firebase
              .firestore()
              .collection("Barcodes")
              .doc(item.BARCODE_NO)
              .set({
                RANGE_ID: item.RANGE_ID,
                MERCHANT_ID: item.MERCHANT_ID
              })
              .then(function() {
                console.log("Document successfully written!");
              })
              .catch(function(error) {
                console.error("Error writing document: ", error);
              });
          });

          if (result.MT_ID) {
            let Barcodes = result.MT_ID;
            var sticker_url =
              baseUrl +
              "/laptopzone/reactcontroller/c_product/printAllStickers/" +
              Barcodes;
            if (this.state.printYN) {
              window.open(sticker_url, "_blank");
            }
          }

          notify("success", result.message);
        } else {
          notify("error", result.message);
          // swal("Error", result.message, "error");
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };
  saveNewInventory = (
    product_id,
    merchant_id,
    AccountId,
    condition_id,
    lz_items_id,
    qty,
    cost,
    selectBinNo
  ) => {
    const { baseUrl } = this.state;
    // let merch_id = localStorage.getItem("merId");
    let userId = localStorage.getItem("userId");
    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_product/saveNewInventory";
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          product_id: product_id,
          AccountId: AccountId,
          merchant_id: merchant_id,
          condition_id: condition_id,
          lz_items_id: lz_items_id,
          qty: qty,
          cost: cost,
          userId: userId,
          BinNo: selectBinNo
        }
      }).then(
        function(data) {
          resolve(data);
        },
        function(err) {
          reject(err);
        }
      );
    });
  };
  pushInventory = allInven => {
    var length = allInven.length;
    var allInvenList = [];
    var activeCnt = 0;
    var InactiveCnt = 0;

    for (let i = 0; i < length; i++) {
      var qty = allInven[i].QTY;
      var active_yn = "";
      if (qty > 0) {
        active_yn = "Active";
        activeCnt++;
      } else {
        active_yn = "Out of Stock";
        InactiveCnt++;
      }
      allInvenList.push({
        images: allInven[i].LZ_PRODUCT_ID,
        active: active_yn,
        action: allInven[i].LZ_ITEMS_MT_ID,
        merchant_id: allInven[i].MERCHANT_ID,
        seller_sku: allInven[i].SELLER_SKU,
        condition_id: allInven[i].ID,
        cond_name: allInven[i].COND_NAME,
        upc: allInven[i].UPC,
        mpn: allInven[i].MPN,
        manufacturer: allInven[i].MANUFACTURER,
        mpn_description: allInven[i].MPN_DESCRIPTION,
        created_at: allInven[i].CREATED_AT,
        status: allInven[i].STATUS,
        qty: allInven[i].QTY,
        cost: allInven[i].COST
      });
    }

    this.setState({
      inventoryDatatable: allInvenList,
      activeCount: activeCnt,
      InactiveCount: InactiveCnt
    });
    if (localStorage.getItem("lz_items_mt_id")) {
      var lz_item_id = localStorage.getItem("lz_items_mt_id");
      this.handleSessionClick(lz_item_id);
      localStorage.setItem("lz_items_mt_id", "");
    }
  };

  handleActiveClick = () => {
    this.refs.action_id.applyFilter("");
    this.refs.active_yn.applyFilter("Active");
  };
  handleSessionClick = item_id => {
    this.refs.active_yn.applyFilter("");
    this.refs.action_id.applyFilter(item_id);
  };
  handleInactiveClick = () => {
    this.refs.action_id.applyFilter("");
    this.refs.active_yn.applyFilter("Out of Stock");
  };
  handleAllClick = () => {
    this.refs.active_yn.applyFilter("");
    this.refs.action_id.applyFilter("");
  };

  render() {
    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: "/login" }} />;
    }
    var selectBin = this.state.bins.map(function(item, index) {
      return (
        <option key={index} value={item.BIN_ID}>
          {item.BIN_NO}
        </option>
      );
    });
    const { inventoryDatatable, activeCount, InactiveCount } = this.state;
    const optionsDatatable = {
      paginationShowsTotal: true,
      page: 2, // which page you want to show as default
      sizePerPage: 25, // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 5, // the pagination bar size.
      prePage: "Prev", // Previous page button text
      nextPage: "Next", // Next page button text
      firstPage: "First", // First page button text
      lastPage: "Last", // Last page button text
      prePageTitle: "Go to previous", // Previous page button title
      nextPageTitle: "Go to next", // Next page button title
      firstPageTitle: "Go to first", // First page button title
      lastPageTitle: "Go to Last", // Last page button title
      paginationPosition: "top" // default is bottom, top and both is all available
    };
    return (
      <React.Fragment>
        <ToastsContainer store={ToastsStore} />
        {/* {isLoaded ? <QuantityDelete MT_ID={MT_ID} /> : ""} */}
        <section className="content-header">
          <h1>
            Inventory <small>Control Panel</small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/merchantDashboard">
                <i className="fa fa-dashboard" /> Home
              </Link>
            </li>
            <li>Inventory</li>
            <li className="active">
              <Link to="/manageInventory">Inventory</Link>
            </li>
          </ol>
        </section>

        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">Inventory</h3>
                </div>
                <div className="box-body">
                  <div className="col-sm-12">
                    <div className="col-sm-6 pull-left">
                      <Link to="/generateBars" style={{ color: "white" }}>
                        <button className="btn btn-success">
                          Manage Inventory
                        </button>
                      </Link>
                    </div>
                    <div className="col-sm-6 pull-right">
                      <label>Print Yes / No</label>
                      <Switch
                        checked={this.state.printYN}
                        onChange={this.handleSwitch("printYN")}
                        value="1"
                        color="primary"
                      />
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">List Inventory</h3>
                </div>
                <div className="box-body">
                  <div className="col-sm-12">
                    <br />
                    <div className="col-sm-12">
                      <label htmlFor="manufacturer" className="control-label">
                        Apply Filter:
                      </label>
                    </div>
                    <div className="col-sm-3">
                      <button
                        onClick={this.handleActiveClick}
                        className="btn btn-success"
                      >
                        Active ({activeCount})
                      </button>
                    </div>
                    <div className="col-sm-3">
                      <button
                        onClick={this.handleInactiveClick}
                        className="btn btn-warning"
                      >
                        Out of Stock ({InactiveCount})
                      </button>
                    </div>
                    <div className="col-sm-3">
                      <button
                        onClick={this.handleAllClick}
                        className="btn btn-default"
                      >
                        Show All
                      </button>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>
                  <div className="col-md-12">
                    {/* Datatable */}
                    <div className="tableView">
                      {/* {<QuantityDelete />} */}
                      <BootstrapTable
                        data={inventoryDatatable}
                        pagination
                        search
                        tableHeaderClass="my-header-class"
                        columnWidth="100%"
                        options={optionsDatatable}
                        sizePerPageList={[
                          {
                            text: "25",
                            value: 25
                          },
                          {
                            text: "50",
                            value: 50
                          },
                          {
                            text: "100",
                            value: 100
                          },
                          {
                            text: "All",
                            value: inventoryDatatable.length
                          }
                        ]}
                      >
                        <TableHeaderColumn
                          dataField="action"
                          hidden
                          style={{ display: "none" }}
                          ref="action_id"
                          filter={{ type: "RegexFilter" }}
                        />
                        <TableHeaderColumn
                          dataField="images"
                          width="10%"
                          dataFormat={imageView}
                        >
                          Picture
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="active"
                          width="5%"
                          ref="active_yn"
                          filter={{ type: "RegexFilter" }}
                          // dataFormat={status}
                        >
                          <p style={{ color: "#226EC0" }}>Status</p>
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField="status" width="8%">
                          Listed Y/N
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="cond_name"
                          width="8%"
                          dataFormat={skuCondition}
                          dataSort={true}
                        >
                          <p style={{ color: "#226EC0" }}>SKU</p>
                          <br />
                          Condition
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="upc"
                          width="8%"
                          dataFormat={mpn_upc}
                          dataSort={true}
                        >
                          <p style={{ color: "#226EC0" }}>MPN</p>
                          <br /> UPC
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="mpn_description"
                          width="15%"
                        >
                          Description
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="manufacturer"
                          width="5%"
                          dataSort={true}
                        >
                          Brand
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="created_at"
                          dataAlign="right"
                          width="10%"
                          dataFormat={dateFomat}
                          dataSort={true}
                        >
                          <p style={{ color: "#E47B15" }}>Date Created</p>
                          <br /> Status Changed Date
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="qty"
                          width="10%"
                          dataFormat={qtyInput}
                          dataSort={true}
                        >
                          Available
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="cost"
                          width="10%"
                          dataFormat={costInput}
                          dataSort={true}
                        >
                          Cost per Quantity
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="account_id"
                          dataFormat={selectAccount}
                          width="10%"
                        >
                          Account
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="action"
                          isKey={true}
                          width="5%"
                          dataFormat={actionFormatter}
                        >
                          Action
                        </TableHeaderColumn>
                      </BootstrapTable>
                    </div>
                    {/* #END# Datatable */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-info btn-lg"
            id="openBinModal"
            hidden
            style={{ display: "none" }}
            data-toggle="modal"
            data-target="#openBin"
          />

          <div id="openBin" className="modal fade in" role="dialog">
            <div className="modal-dialog ">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                  <h4 className="modal-title">Select Bin</h4>
                </div>
                <div className="modal-body">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <select
                        className="form-control selectpicker "
                        id="selectBinNo"
                        name="selectBinNo"
                        onChange={this.handleChange}
                      >
                        <option>Select Bin</option>
                        {selectBin}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-success pull-right"
                    data-dismiss="modal"
                    onClick={() => this.add(this.state.selectedRow)}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                    id="closeModal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default manageInventory;
