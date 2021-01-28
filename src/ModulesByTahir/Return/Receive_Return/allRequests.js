import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import $ from "jquery";
import "gasparesganga-jquery-loading-overlay";
import notify from "../../Functions/notify";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { RViewer, RViewerTrigger } from "react-viewerjs";
import "../../CSS_Files/table.css";
import { ToastsContainer, ToastsStore } from "react-toasts";

var that = "";
export class ImageView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cell: this.props.cell,
      row: this.props.row,
      imagesUrl: that.state.images2
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
          <RViewer
            index={this.props.cell}
            options={options}
            imageUrls={imagesUrl[this.props.cell]}
          >
            <RViewerTrigger>
              <div className="col-md-12">
                <img
                  className="getCss"
                  src={imagesUrl[this.props.cell][0]}
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
export class ActionFormatter extends Component {
  constructor(props) {
    super(props);
  }
  action = (cell, row) => {
    that.setState({
      cell: cell,
      row: row
    });
  };
  approveAdmin = (cell, row) => {
    var dt_id = cell;
    var userId = localStorage.getItem("userId");

    let insertUrl =
      that.state.baseUrl +
      "/laptopzone/reactcontroller/c_receiveReturn/approveAdmin";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          dt_id: dt_id,
          userId: userId
        }
      }).then(
        function(data) {
          resolve(data);
        },
        function(err) {
          reject(err);
        }
      );
    })
      .then(result => {
        $.LoadingOverlay("hide");
        if (result.update) {
          that.getNotListedItems();
          notify("success", result.message);
        } else {
          notify("error", result.message);
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };
  processRequest = (cell, row) => {
    var dt_id = cell;
    var userId = localStorage.getItem("userId");

    let insertUrl =
      that.state.baseUrl +
      "/laptopzone/reactcontroller/c_receiveReturn/processRequest";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          dt_id: dt_id,
          userId: userId
        }
      }).then(
        function(data) {
          resolve(data);
        },
        function(err) {
          reject(err);
        }
      );
    })
      .then(result => {
        $.LoadingOverlay("hide");
        if (result.update) {
          that.getNotListedItems();
          notify("success", result.message);
        } else {
          notify("error", result.message);
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };
  cancelRequest = (cell, row) => {
    var dt_id = cell;
    var userId = localStorage.getItem("userId");

    let insertUrl =
      that.state.baseUrl +
      "/laptopzone/reactcontroller/c_receiveReturn/cancelRequest";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          dt_id: dt_id,
          userId: userId
        }
      }).then(
        function(data) {
          resolve(data);
        },
        function(err) {
          reject(err);
        }
      );
    })
      .then(result => {
        $.LoadingOverlay("hide");
        if (result.update) {
          that.getNotListedItems();
          notify("success", result.message);
        } else {
          notify("error", result.message);
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };

  render() {
    return (
      <React.Fragment>
        {this.props.row.ADMIN_STATUS == 0 ? (
          <React.Fragment>
            <button
              title="Cancel Request"
              className="btn btn-danger"
              onClick={() => {
                this.cancelRequest(this.props.cell, this.props.row);
              }}
              value={this.props.cell}
            >
              <span
                className="glyphicon glyphicon-trash p-b-5"
                aria-hidden="true"
              />
            </button>
            <button
              title="Start Process"
              className="btn btn-primary"
              onClick={() => {
                this.processRequest(this.props.cell, this.props.row);
              }}
              value={this.props.cell}
            >
              <span
                className="glyphicon glyphicon-retweet p-b-5"
                aria-hidden="true"
              />
            </button>
          </React.Fragment>
        ) : this.props.row.ADMIN_STATUS == 1 ? (
          <button title="Approved" className="btn btn-success">
            Approved
          </button>
        ) : this.props.row.ADMIN_STATUS == 3 ? (
          <React.Fragment>
            <button
              title="Approve Request"
              className="btn btn-info"
              onClick={() => {
                this.approveAdmin(this.props.cell, this.props.row);
              }}
              value={this.props.cell}
            >
              <span
                className="glyphicon glyphicon-ok-sign p-b-5"
                aria-hidden="true"
              />
            </button>
            <button title="Approved" className="btn btn-primary">
              Process Complete
            </button>
          </React.Fragment>
        ) : this.props.row.ADMIN_STATUS == 2 ? (
          <React.Fragment>
            <button
              title="Approve Request"
              className="btn btn-info"
              onClick={() => {
                this.approveAdmin(this.props.cell, this.props.row);
              }}
              value={this.props.cell}
            >
              <span
                className="glyphicon glyphicon-ok-sign p-b-5"
                aria-hidden="true"
              />
            </button>
            <button
              title="Cancel Process Request"
              className="btn btn-danger"
              onClick={() => {
                this.cancelRequest(this.props.cell, this.props.row);
              }}
              value={this.props.cell}
            >
              <span
                className="glyphicon glyphicon-trash p-b-5"
                aria-hidden="true"
              />
            </button>
          </React.Fragment>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}
export class EbayAction extends Component {
  constructor(props) {
    super(props);
  }
  callEbayApi = (cell, row) => {
    that.setState({
      ebay_id: cell
    });
    var merchantId = "";
    if (that.props.location.state.merchantId) {
      var merchantId = that.props.location.state.merchantId;
    }
    $.LoadingOverlay("show");
    let insertUrl =
      that.state.baseUrl +
      "/laptopzone/reactcontroller/c_receiveReturn/getBarcodesByEbayId";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          merch_id: merchantId,
          ebay_id: cell
        }
      }).then(
        function(data) {
          resolve(data);
        },
        function(err) {
          reject(err);
        }
      );
    })
      .then(result => {
        $.LoadingOverlay("hide");
        if (result.found) {
          $("#openModal").click();
          that.setState({
            ebayBarcodes: result.ebayBarcodes,
            currentQty: result.currentQty
          });
        } else {
          notify("error", result.message);
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };
  render() {
    return (
      <React.Fragment>
        <button
          title="Open Request"
          className="btn btn-info"
          onClick={() => {
            this.callEbayApi(this.props.cell, this.props.row);
          }}
          value={this.props.cell}
        >
          <span
            className="glyphicon glyphicon-folder-open p-b-5"
            aria-hidden="true"
          />
        </button>
        <span className="btn btn-success" aria-hidden="true">
          Ebay ID: {this.props.cell}
        </span>
      </React.Fragment>
    );
  }
}

function imageView(cell, row) {
  return <ImageView cell={cell} row={row} />;
}
function actionFormatter(cell, row) {
  return <ActionFormatter cell={cell} row={row} />;
}
function ebayAction(cell, row) {
  return <EbayAction cell={cell} row={row} />;
}
function mpn_upc(cell, row) {
  return (
    <React.Fragment>
      <p style={{ color: "#226EC0" }}>{cell}</p>
      <br />
      {row.UPC}
    </React.Fragment>
  );
}
function brand_condition(cell, row) {
  return (
    <React.Fragment>
      <p style={{ color: "#226EC0" }}>{row.CONDITION}</p>
      <br />
      {cell}
    </React.Fragment>
  );
}
function wherehouse(cell, row) {
  return (
    <React.Fragment>
      <p
        title="Wherehouse Location"
        style={{ backgroundColor: "#367FA9", color: "white" }}
      >
        {cell}
      </p>
    </React.Fragment>
  );
}
function trClassFormat(rowData, rIndex) {
  var status = rowData.BARCODE_STATUS;
  var admin_status = rowData.ADMIN_STATUS;

  // if (status == 1 && admin_status == 0) {
  //   return "tr-function-not";
  // } else if (status == 2 && admin_status == 0) {
  //   return "tr-function-partial";
  // } else if (admin_status == 1) {
  //   return "tr-function-full";
  // } else if (admin_status == 2) {
  //   return "tr-function-proccess";
  // }
}

class AllRequests extends Component {
  constructor(props) {
    super(props);
    that = this;
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    this.state = {
      baseUrl: finalurl,
      notlisted: [],
      images2: [],
      listed: [],
      images: [],
      ebayBarcodes: [],
      ebay_id: "",
      marchId: "",
      itemType: "",
      currentQty: "",
      redirect: false,
      listedCount: 0,
      NotListedCount: 0,
      approvedCount: 0,
      processCount: 0
    };
  }
  proceedProcess = () => {
    const { baseUrl, ebay_id, currentQty, ebayBarcodes } = this.state;

    var returnQty = ebayBarcodes.length;

    var merchantId = "";
    if (this.props.location.state.merchantId) {
      var merchantId = this.props.location.state.merchantId;
    }
    $.LoadingOverlay("show");
    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_receiveReturn/proceedProcess";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          merch_id: merchantId,
          returnQty: returnQty,
          currentQty: currentQty,
          ebay_id: ebay_id
        }
      }).then(
        function(data) {
          resolve(data);
        },
        function(err) {
          reject(err);
        }
      );
    })
      .then(result => {
        $.LoadingOverlay("hide");
        if (result.found) {
          notify("success", "Process Started");
        } else {
          notify("error", result.message);
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    if (e.target.value == 1) {
      $("#notlisted").hide();
      $("#listed").show();
    }
    if (e.target.value == 2) {
      $("#listed").hide();
      $("#notlisted").show();
    }
    if (e.target.value == 0) {
      $("#listed").hide();
      $("#notlisted").hide();
    }
  };
  componentWillMount() {
    if (this.props.location.state.merchantId) {
      this.getNotListedItems();
      this.getListedItems();
    } else {
      this.setRedirect();
    }
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  getNotListedItems = () => {
    const { baseUrl } = this.state;
    var merchantId = "";
    if (this.props.location.state.merchantId) {
      var merchantId = this.props.location.state.merchantId;
    }
    $.LoadingOverlay("show");
    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_receiveReturn/getNotListedItems";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          merch_id: merchantId
        }
      }).then(
        function(data) {
          resolve(data);
        },
        function(err) {
          reject(err);
        }
      );
    })
      .then(result => {
        $.LoadingOverlay("hide");
        if (result.found) {
          this.setState({
            notlisted: result.notlisted,
            images2: result.images2
          });
        } else {
          notify("error", result.message);
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };
  getListedItems = () => {
    const { baseUrl } = this.state;
    var merchantId = "";
    if (this.props.location.state.merchantId) {
      var merchantId = this.props.location.state.merchantId;
    }
    $.LoadingOverlay("show");
    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_receiveReturn/getListedItems";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          merch_id: merchantId
        }
      }).then(
        function(data) {
          resolve(data);
        },
        function(err) {
          reject(err);
        }
      );
    })
      .then(result => {
        $.LoadingOverlay("hide");
        if (result.found) {
          this.setState({
            listed: result.listed,
            images2: result.images
          });
        } else {
          notify("error", result.message);
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to={{ pathname: "/receiveReturn" }} />;
    }
    const { notlisted, listed, ebayBarcodes } = this.state;
    const options = {
      paginationShowsTotal: true,
      page: 1, // which page you want to show as default
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
      paginationPosition: "top", // default is bottom, top and both is
      sizePerPageList: [
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
          value: notlisted.length
        }
      ]
    };
    const options2 = {
      paginationShowsTotal: true,
      page: 1, // which page you want to show as default
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
      paginationPosition: "top", // default is bottom, top and both is
      sizePerPageList: [
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
          value: listed.length
        }
      ]
    };
    const options3 = {
      paginationShowsTotal: true,
      page: 1, // which page you want to show as default
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
      paginationPosition: "top", // default is bottom, top and both is
      sizePerPageList: [
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
          value: ebayBarcodes.length
        }
      ]
    };
    return (
      <React.Fragment>
        <ToastsContainer store={ToastsStore} />
        <section className="content-header">
          <h1>
            Receive Return <small>Control Panel</small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/merchantDashboard">
                <i className="fa fa-dashboard" /> Home
              </Link>
            </li>
            <li>Receiving</li>
            <li className="active">
              <Link to="/receiveReturn">Receive Return</Link>
            </li>
          </ol>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">Merchant Return Requests</h3>
                  <span
                    className="btn btn-sm btn-info pull-right"
                    onClick={this.setRedirect}
                  >
                    Go Back
                  </span>
                </div>
                <div className="form-group col-md-4">
                  <select
                    className="form-control"
                    value={this.state.itemType}
                    id="itemType"
                    name="itemType"
                    onChange={this.handleChange}
                  >
                    <option value="0">Select Item Type</option>
                    <option value="1">Listed</option>
                    <option value="2">Not Listed</option>
                  </select>
                </div>
                <div className="box-body">
                  <div
                    className="col-md-12"
                    id="notlisted"
                    hidden
                    style={{ display: "none" }}
                  >
                    <BootstrapTable
                      data={notlisted}
                      pagination
                      hover
                      search
                      tableHeaderclassName="my-header-class"
                      columnWidth="100%"
                      options={options}
                      trClassName={trClassFormat}
                    >
                      <TableHeaderColumn
                        dataField="DT_ID"
                        isKey={true}
                        width="10%"
                        dataFormat={actionFormatter}
                      >
                        Action
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="DT_ID"
                        width="10%"
                        dataFormat={imageView}
                      >
                        Picture
                      </TableHeaderColumn>
                      <TableHeaderColumn dataField="BARCODE_NO" width="10%">
                        Barcode
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="MPN"
                        width="10%"
                        dataFormat={mpn_upc}
                        dataSort={true}
                      >
                        <p style={{ color: "#226EC0" }}>MPN</p>
                        <br /> UPC
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="MPN_DESCRIPTION"
                        width="15%"
                      >
                        MPN Description
                      </TableHeaderColumn>

                      <TableHeaderColumn
                        dataField="BRAND"
                        width="10%"
                        dataSort={true}
                        dataFormat={brand_condition}
                      >
                        <p style={{ color: "#226EC0" }}>Condition</p>
                        <br /> BRAND
                      </TableHeaderColumn>
                    </BootstrapTable>
                  </div>
                  <div
                    className="col-md-12"
                    id="listed"
                    hidden
                    style={{ display: "none" }}
                  >
                    <BootstrapTable
                      data={listed}
                      pagination
                      hover
                      search
                      tableHeaderclassName="my-header-class"
                      columnWidth="100%"
                      options={options2}
                      trClassName={trClassFormat}
                    >
                      <TableHeaderColumn
                        dataField="DT_ID"
                        isKey={true}
                        width="10%"
                        dataFormat={ebayAction}
                      >
                        Action
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="DT_ID"
                        width="10%"
                        dataFormat={imageView}
                      >
                        Picture
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="MPN"
                        width="10%"
                        dataFormat={mpn_upc}
                        dataSort={true}
                      >
                        <p style={{ color: "#226EC0" }}>MPN</p>
                        <br /> UPC
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="MPN_DESCRIPTION"
                        width="15%"
                      >
                        MPN Description
                      </TableHeaderColumn>

                      <TableHeaderColumn
                        dataField="BRAND"
                        width="10%"
                        dataSort={true}
                        dataFormat={brand_condition}
                      >
                        <p style={{ color: "#226EC0" }}>Condition</p>
                        <br /> BRAND
                      </TableHeaderColumn>
                    </BootstrapTable>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <button
          type="button"
          className="btn btn-info btn-lg"
          id="openModal"
          data-toggle="modal"
          data-target="#openBarcodes"
          hidden
          style={{ display: "none" }}
        />

        <div id="openBarcodes" className="modal fade" role="dialog">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 className="modal-title">Barcodes to Return</h4>
              </div>
              <div className="modal-body">
                <div className="form-group col-sm-6">
                  <label
                    style={{ fontSize: "22px", color: "red" }}
                    className="control-label"
                  >
                    Return Quantity :{" "}
                  </label>
                  <b style={{ fontSize: "24px" }}>{ebayBarcodes.length}</b>
                </div>
                <div className="form-group col-sm-6">
                  <label
                    style={{ fontSize: "22px", color: "red" }}
                    className="control-label"
                  >
                    Quantity Listed On Ebay :{" "}
                  </label>
                  <b style={{ fontSize: "24px" }}>{this.state.currentQty}</b>
                </div>
                <BootstrapTable
                  data={ebayBarcodes}
                  pagination
                  hover
                  search
                  tableHeaderclassName="my-header-class"
                  columnWidth="100%"
                  options={options3}
                  trClassName={trClassFormat}
                >
                  <TableHeaderColumn dataField="DT_ID" isKey={true} width="10%">
                    Action
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="BARCODE_NO" width="10%">
                    Barcode
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="MPN"
                    width="10%"
                    dataFormat={mpn_upc}
                    dataSort={true}
                  >
                    <p style={{ color: "#226EC0" }}>MPN</p>
                    <br /> UPC
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="MPN_DESCRIPTION" width="15%">
                    MPN Description
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    dataField="BRAND"
                    width="10%"
                    dataSort={true}
                    dataFormat={brand_condition}
                  >
                    <p style={{ color: "#226EC0" }}>Condition</p>
                    <br /> BRAND
                  </TableHeaderColumn>
                </BootstrapTable>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success pull-left"
                  data-dismiss="modal"
                  onClick={this.proceedProcess}
                >
                  Proceed
                </button>
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AllRequests;
