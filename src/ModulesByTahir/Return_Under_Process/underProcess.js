import React, { Component } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import "gasparesganga-jquery-loading-overlay";
import notify from "../Functions/notify";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { RViewer, RViewerTrigger } from "react-viewerjs";
import "../CSS_Files/table.css";
import { ToastsContainer, ToastsStore } from "react-toasts";

function mpn_upc(cell, row) {
  return (
    <React.Fragment>
      <p style={{ color: "#226EC0" }}>{cell}</p>
      <br />
      {row.UPC ? row.UPC : "No UPC"}
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
function actionFormatter(cell, row) {
  return (
    <React.Fragment>
      {row.ADMIN_STATUS == 2 ? (
        <button title="Pending" className="btn btn-warning">
          Pending
        </button>
      ) : row.ADMIN_STATUS == 3 ? (
        <button title="Scan Complete" className="btn btn-success">
          Scan Complete
        </button>
      ) : (
        ""
      )}
    </React.Fragment>
  );
}
class UnderProcess extends Component {
  constructor(props) {
    super(props);
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    this.state = {
      baseUrl: finalurl,
      underProcess: [],
      merchant: "",
      scanBin: "",
      scanBar: "",
      binFound: "",
      allMerchants: [],
      ScanBarcodes: ""
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    if (e.target.value != 0) {
      this.getReturnRequests(e.target.value);
    }
  };
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  getReturnRequests = merchantId => {
    let insertUrl =
      this.state.baseUrl +
      "/laptopzone/reactcontroller/c_receiveReturn/getReturnRequests";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          merchantId: merchantId
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
          var records = result.requests;
          var scanCount = 0;
          for (var i = 0; i < records.length; i++) {
            if (records[i].ADMIN_STATUS == 3) {
              scanCount++;
            }
          }
          this.setState({
            underProcess: result.requests,
            ScanBarcodes: scanCount
          });
          $("#scanBarcode").show();
        } else {
          notify("error", result.message);
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };
  componentWillMount() {
    this.getMerchants();
  }
  getMerchants = () => {
    let insertUrl =
      this.state.baseUrl +
      "/laptopzone/reactcontroller/c_receiveReturn/getMerchants";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST"
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
            allMerchants: result.merchants
          });
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
  scanBarcode = e => {
    e.preventDefault();
    const { scanBar, binFound, merchant } = this.state;
    if (!binFound) {
      notify("error", "Please scan Bin!");
      return false;
    }
    let userId = localStorage.getItem("userId");
    let insertUrl =
      this.state.baseUrl +
      "/laptopzone/reactcontroller/c_receiveReturn/scanBarcode";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          scanBar: scanBar,
          bin_id: binFound,
          merchant: merchant,
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
          this.setState({
            scanBar: ""
          });
          if (result.barcodes[0].ADMIN_STATUS == 3) {
            notify("warning", "Barcode Already Scanned");
          } else {
            this.getReturnRequests(merchant);
            notify("success", result.message);
          }
        } else {
          notify("error", result.message);
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };
  scanBin = e => {
    e.preventDefault();
    const { scanBin } = this.state;
    let insertUrl =
      this.state.baseUrl +
      "/laptopzone/reactcontroller/c_receiveReturn/scanBin";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          scanBin: scanBin
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
            binFound: result.bins[0].BIN_ID
          });
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
    const { allMerchants } = this.state;
    var merchants = allMerchants.map(function(obj) {
      return (
        <option key={obj.MERCHANT_ID} value={obj.MERCHANT_ID}>
          {obj.BUISNESS_NAME}
        </option>
      );
    });

    const { underProcess, ScanBarcodes } = this.state;
    const options = {
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
      paginationPosition: "top" // default is bottom, top and both is
    };
    return (
      <React.Fragment>
        <ToastsContainer store={ToastsStore} />
        <section className="content-header">
          <h1>
            Under Process <small>Control Panel</small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/merchantDashboard">
                <i className="fa fa-dashboard" /> Home
              </Link>
            </li>
            <li>Under Process</li>
            <li className="active">
              <Link to="/underProcess">Barcodes in Process</Link>
            </li>
          </ol>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">Merchants </h3>
                </div>
                <div className="box-body">
                  <div className="form-group col-md-4">
                    <select
                      className="form-control"
                      value={this.state.merchant}
                      id="merchant"
                      name="merchant"
                      onChange={this.handleChange}
                    >
                      <option value="0">Select Merchant</option>
                      {merchants}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="row"
            id="scanBarcode"
            hidden
            style={{ display: "none" }}
          >
            <div className="col-xs-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">Under Process Barcodes </h3>
                </div>
                <div className="box-body">
                  <div className="col-md-12">
                    <div className="col-sm-4">
                      <form onSubmit={this.scanBin}>
                        <div className="input-group">
                          <input
                            className="form-control"
                            type="text"
                            name="scanBin"
                            id="scanBin"
                            value={this.state.scanBin}
                            onChange={this.handleInputChange}
                            placeholder="Scan Bin"
                          />
                          <span className="input-group-btn">
                            <button
                              type="submit"
                              className="btn btn-flat btn-success clickOnEnter"
                            >
                              Search
                            </button>
                          </span>
                        </div>
                      </form>
                    </div>
                    {this.state.binFound ? (
                      <div className="col-sm-4">
                        <form onSubmit={this.scanBarcode}>
                          <div className="input-group">
                            <input
                              className="form-control"
                              type="number"
                              name="scanBar"
                              id="scanBar"
                              value={this.state.scanBar}
                              onChange={this.handleInputChange}
                              placeholder="Scan Barcode"
                            />
                            <span className="input-group-btn">
                              <button
                                type="submit"
                                className="btn btn-flat btn-success clickOnEnter"
                              >
                                Search
                              </button>
                            </span>
                          </div>
                        </form>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="col-sm-4">
                      <div className="form-group pull-right col-sm-6">
                        <label
                          style={{ fontSize: "22px", color: "red" }}
                          for="scan_bin"
                          className="control-label"
                        >
                          Total Scans :{" "}
                        </label>
                        <b style={{ fontSize: "24px" }}>{ScanBarcodes}</b>
                      </div>
                      <div className="form-group pull-right col-sm-6">
                        <label
                          style={{ fontSize: "22px", color: "red" }}
                          for="scan_bin"
                          className="control-label"
                        >
                          Total Records :{" "}
                        </label>
                        <b style={{ fontSize: "24px" }}>
                          {underProcess.length}
                        </b>
                      </div>
                    </div>
                  </div>
                  <BootstrapTable
                    data={underProcess}
                    pagination
                    hover
                    search
                    tableHeaderclassName="my-header-class"
                    columnWidth="100%"
                    options={options}
                  >
                    <TableHeaderColumn
                      dataField="DT_ID"
                      isKey={true}
                      width="10%"
                      dataFormat={actionFormatter}
                    >
                      Action
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="BARCODE_NO" width="10%">
                      Barcode
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="LOCATION"
                      width="10%"
                      dataFormat={wherehouse}
                    >
                      Wherehouse Location
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
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default UnderProcess;
