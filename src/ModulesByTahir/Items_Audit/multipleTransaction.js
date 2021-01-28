import React, { Component } from "react";
import { ToastsContainer, ToastsStore } from "react-toasts";
import { Link, Redirect } from "react-router-dom";
import $ from "jquery";
import "gasparesganga-jquery-loading-overlay";
import notify from "../Functions/notify";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../CSS_Files/table.css";

var that = "";

export class ActionFormatter extends Component {
  constructor(props) {
    super(props);
  }
  deleteBarcode = (cell, row) => {
    var checkBefore = that.state.barcodeHistory.filter(
      item => item.BARCODE_NO == cell
    );
    if (checkBefore.length > 0) {
      var barcodes = that.state.barcodeHistory;
      for (var i = 0; i < barcodes.length; i++) {
        if (barcodes[i].BARCODE_NO == cell) {
          barcodes.splice(i, 1);
        }
      }

      that.setState({
        barcodeHistory: barcodes
      });
    } else {
      var barcodes = that.state.postedBarcodes;
      for (var i = 0; i < barcodes.length; i++) {
        if (barcodes[i].BARCODE_NO == cell) {
          barcodes.splice(i, 1);
        }
      }

      that.setState({
        postedBarcodes: barcodes
      });
    }
  };
  render() {
    return (
      <React.Fragment>
        <div style={{ width: "30px" }}>
          <button
            type="button"
            name="remove"
            style={{ width: "30px" }}
            id="button4"
            className={
              this.props.STATUS === "SOLD || SHIPPED"
                ? "btn btn-sm btn-info btn_remove fa fa-trash-o"
                : "btn btn-sm btn-danger btn_remove fa fa-trash-o"
            }
            onClick={() => this.deleteBarcode(this.props.cell, this.props.row)}
          />
        </div>
      </React.Fragment>
    );
  }
}

function actionFormatter(cell, row) {
  return <ActionFormatter cell={cell} row={row} />;
}

function designFormat(rowData, rIndex) {
  if (rowData.STATUS == "SOLD || SHIPPED") {
    return "shippedBarcode";
  } else if (rowData.STATUS == "SOLD || NOT SHIPPED") {
    return "listedDesign";
  } else if (rowData.STATUS == "AVAILABLE" && !rowData.EBAY_ITEM_ID) {
    return "notListedDesign";
  } else if (rowData.STATUS == "AVAILABLE" && rowData.EBAY_ITEM_ID) {
    return "listedDesign";
  }
}
function ebayLink(cell, row) {
  if (cell) {
    return (
      <a
        href={"https://www.ebay.com/itm/" + cell}
        target="_blank"
        style={{ color: "white" }}
      >
        EBAY ID: {cell}
      </a>
    );
  } else {
    return (
      <button className="btn btn-warning btn-xs" style={{ color: "white" }}>
        Not Listed
      </button>
    );
  }
}
class MultipleTransaction extends Component {
  constructor(props) {
    super(props);
    that = this;
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    this.state = {
      baseUrl: finalurl,
      barcodeHistory: [],
      scan_bar: "",
      scan_bin: "",
      postedBarcodes: []
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  updateLocation = () => {
    const { barcodeHistory, postedBarcodes, scan_bin } = this.state;
    if (!scan_bin) {
      notify("error", "Scan Bin is Empty!");
      return false;
    }
    let userId = localStorage.getItem("userId");
    $.LoadingOverlay("show");
    let insertUrl =
      this.state.baseUrl +
      "/laptopzone/reactcontroller/c_itemsAudit/updateLocation";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          barcodeHistory: barcodeHistory,
          postedBarcodes: postedBarcodes,
          scan_bin: scan_bin,
          userId: userId,
          method: "WEB"
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
          this.setState({
            barcodeHistory: [],
            postedBarcodes: [],
            scan_bar: "",
            scan_bin: ""
          });
          notify("success", result.message);
        } else {
          this.setState({
            scan_bin: ""
          });
          notify("error", result.message);
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };
  get_barcode = e => {
    e.preventDefault();
    var scanBarcode = this.state.scan_bar;

    var checkBefore = this.state.barcodeHistory.filter(
      item => item.BARCODE_NO == scanBarcode
    );
    if (checkBefore.length > 0) {
      this.setState({
        scan_bar: ""
      });
      notify("error", "Barcode Already Exist!");
      return false;
    }
    var checkBefore2 = this.state.postedBarcodes.filter(
      item => item.BARCODE_NO == scanBarcode
    );
    if (checkBefore2.length > 0) {
      this.setState({
        scan_bar: ""
      });
      notify("error", "Barcode Already Exist! In Un-posted Barcodes");
      return false;
    }
    $.LoadingOverlay("show");
    let insertUrl =
      that.state.baseUrl +
      "/laptopzone/reactcontroller/c_itemsAudit/get_barcode";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          barcode: scanBarcode
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
          if (result.eby_qyery || result.bar_query) {
            if (this.state.barcodeHistory.length > 0) {
              for (var i = 0; i < result.barcodeHistory.length; i++) {
                var found = this.state.barcodeHistory.filter(
                  item => item.BARCODE_NO == result.barcodeHistory[i].BARCODE_NO
                );
                if (found.length == 0) {
                  var newRecord = [];

                  newRecord.push({
                    BARCODE_NO: result.barcodeHistory[i].BARCODE_NO,
                    EBAY_ITEM_ID: result.barcodeHistory[i].EBAY_ITEM_ID,
                    DESCR: result.barcodeHistory[i].DESCR,
                    CONDI: result.barcodeHistory[i].CONDI,
                    BIN_NAME: result.barcodeHistory[i].BIN_NAME,
                    RACK_NAME: result.barcodeHistory[i].RACK_NAME,
                    STATUS: result.barcodeHistory[i].STATUS
                  });

                  var barcodeHistoryNewArray = this.state.barcodeHistory;
                  barcodeHistoryNewArray.unshift(newRecord[0]);

                  this.setState({
                    barcodeHistory: barcodeHistoryNewArray,
                    scan_bar: ""
                  });
                  notify("success", result.message);
                } else {
                  this.setState({
                    scan_bar: ""
                  });
                  notify("error", "Barcode Already Exist!");
                }
              }
            } else {
              notify("success", result.message);
              this.setState({
                barcodeHistory: result.barcodeHistory,
                scan_bar: ""
              });
            }
          } else {
            if (this.state.postedBarcodes.length > 0) {
              for (var i = 0; i < result.barcodeHistory.length; i++) {
                var found = this.state.postedBarcodes.filter(
                  item => item.BARCODE_NO == result.barcodeHistory[i].BARCODE_NO
                );
                if (found.length == 0) {
                  var newRecord = [];

                  newRecord.push({
                    BARCODE_NO: result.barcodeHistory[i].BARCODE_NO,
                    EBAY_ITEM_ID: result.barcodeHistory[i].EBAY_ITEM_ID,
                    DESCR: result.barcodeHistory[i].DESCR,
                    CONDI: result.barcodeHistory[i].CONDI,
                    BIN_NAME: result.barcodeHistory[i].BIN_NAME,
                    RACK_NAME: result.barcodeHistory[i].RACK_NAME,
                    STATUS: result.barcodeHistory[i].STATUS
                  });

                  var barcodeHistoryNewArray = this.state.postedBarcodes;
                  barcodeHistoryNewArray.unshift(newRecord[0]);

                  this.setState({
                    postedBarcodes: barcodeHistoryNewArray,
                    scan_bar: ""
                  });
                  notify("success", result.message);
                } else {
                  this.setState({
                    scan_bar: ""
                  });
                  notify(
                    "error",
                    "Barcode Already Exist! In Un-posted Barcodes"
                  );
                }
              }
            } else {
              this.setState({
                postedBarcodes: result.barcodeHistory,
                scan_bar: ""
              });
              notify("success", result.message);
            }
          }
        } else {
          this.setState({
            scan_bar: ""
          });
          notify("error", "No Data Found!");
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };

  render() {
    const { barcodeHistory, postedBarcodes } = this.state;
    const options = {
      paginationShowsTotal: true,
      page: 1,
      sizePerPage: 25,
      pageStartIndex: 1,
      paginationSize: 5,
      prePage: "Prev",
      nextPage: "Next",
      firstPage: "First",
      lastPage: "Last",
      prePageTitle: "Go to previous",
      nextPageTitle: "Go to next",
      firstPageTitle: "Go to first",
      lastPageTitle: "Go to Last",
      paginationPosition: "top",
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
          value: barcodeHistory.length
        }
      ]
    };
    const options2 = {
      paginationShowsTotal: true,
      page: 1,
      sizePerPage: 25,
      pageStartIndex: 1,
      paginationSize: 5,
      prePage: "Prev",
      nextPage: "Next",
      firstPage: "First",
      lastPage: "Last",
      prePageTitle: "Go to previous",
      nextPageTitle: "Go to next",
      firstPageTitle: "Go to first",
      lastPageTitle: "Go to Last",
      paginationPosition: "top",
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
          value: postedBarcodes.length
        }
      ]
    };
    return (
      <React.Fragment>
        <ToastsContainer store={ToastsStore} />

        <section className="content-header">
          <h1>
            Transfer Item Into Bin <small>Control Panel</small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/welcom">
                <i className="fa fa-dashboard" /> Home
              </Link>
            </li>
            <li className="active">
              <Link to="/multipleTransaction">Transfer Location</Link>
            </li>
          </ol>
        </section>

        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title pull-left">Transfer Location</h3>
                </div>
                <div className="box-body">
                  <div className="col-md-12">
                    <div className="col-sm-4">
                      <form onSubmit={this.get_barcode}>
                        <div className="form-group">
                          <label htmlFor="scan_bar" className="control-label">
                            Scan Barcode Or Ebay Id:
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            name="scan_bar"
                            id="scan_bar"
                            value={this.state.scan_bar}
                            onChange={this.handleChange}
                            placeholder="Scan Barcode or Scan Ebay Id"
                          />
                        </div>
                      </form>
                    </div>
                    <div className="col-sm-3">
                      <div className="form-group">
                        <label htmlFor="scan_bin" className="control-label">
                          Scan Bin No:
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="scan_bin"
                          id="scan_bin"
                          onChange={this.handleChange}
                          value={this.state.scan_bin}
                          placeholder="Scan Bin"
                        />
                      </div>
                    </div>
                    <div className="col-sm-2">
                      <div className="form-group">
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={this.updateLocation}
                        >
                          Update Location
                        </button>
                      </div>
                    </div>
                    <div className="col-sm-2">
                      <div className="form-group pull-right">
                        <label
                          style={{ fontSize: "22px", color: "red" }}
                          htmlFor="scan_bin"
                          className="control-label"
                        >
                          Total Records :
                        </label>
                        <b style={{ fontSize: "22px" }} id="total_row">
                          {postedBarcodes.length + barcodeHistory.length}
                        </b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title pull-left">Add Barcodes</h3>
                </div>
                <div className="box-body">
                  <BootstrapTable
                    data={barcodeHistory}
                    pagination
                    search
                    tableHeaderClass="add-barcodes"
                    tableBodyClass="add-barcodes"
                    columnWidth="100%"
                    options={options}
                    trClassName={designFormat}
                  >
                    {/* <TableHeaderColumn dataField="SrNo" width="12.5%">
                      Sr.#:
                    </TableHeaderColumn> */}
                    <TableHeaderColumn
                      dataField="BARCODE_NO"
                      isKey={true}
                      width="12.5%"
                    >
                      Barcode No:
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="EBAY_ITEM_ID"
                      width="12.5%"
                      dataFormat={ebayLink}
                    >
                      Ebay Id:
                    </TableHeaderColumn>

                    <TableHeaderColumn dataField="DESCR" width="12.5%">
                      Item Description
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="CONDI" width="12.5%">
                      Item Condition
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="BIN_NAME" width="12.5%">
                      Current Bin
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="RACK_NAME" width="12.5%">
                      Current Rack
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="STATUS" width="12.5%">
                      Status
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="BARCODE_NO"
                      width="12.5%"
                      dataFormat={actionFormatter}
                    >
                      Action
                    </TableHeaderColumn>
                  </BootstrapTable>
                </div>
              </div>
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title pull-left">Un-Posted Barcodes</h3>
                </div>
                <div className="box-body">
                  <BootstrapTable
                    data={postedBarcodes}
                    pagination
                    search
                    tableHeaderClass="add-barcodes"
                    columnWidth="100%"
                    options={options2}
                    trClassName={designFormat}
                  >
                    {/* <TableHeaderColumn dataField="SrNo" width="12.5%">
                      Sr.#:
                    </TableHeaderColumn> */}
                    <TableHeaderColumn
                      dataField="BARCODE_NO"
                      isKey={true}
                      width="12.5%"
                    >
                      Barcode No:
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="EBAY_ITEM_ID"
                      width="12.5%"
                      dataFormat={ebayLink}
                    >
                      Ebay Id:
                    </TableHeaderColumn>

                    <TableHeaderColumn dataField="DESCR" width="12.5%">
                      Item Description
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="CONDI" width="12.5%">
                      Item Condition
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="BIN_NAME" width="12.5%">
                      Current Bin
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="RACK_NAME" width="12.5%">
                      Current Rack
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="STATUS" width="12.5%">
                      Status
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="BARCODE_NO"
                      width="12.5%"
                      dataFormat={actionFormatter}
                    >
                      Action
                    </TableHeaderColumn>
                  </BootstrapTable>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default MultipleTransaction;
