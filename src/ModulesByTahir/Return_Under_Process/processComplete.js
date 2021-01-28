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
      <p className="bg-success">Process Complete</p>
    </React.Fragment>
  );
}

class ProcessComplete extends Component {
  constructor(props) {
    super(props);
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    this.state = {
      baseUrl: finalurl,
      allMerchants: [],
      merchant: "",
      scanBar: "",
      trackingNo: "",
      carrier: "",
      inventry_return_mt_id: "",
      processComplete: [],
      scanList: []
    };
  }
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
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    if (e.target.value != 0) {
      this.getProcessCompletedBarcodes(e.target.value);
    }
  };
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  getProcessCompletedBarcodes = merchantId => {
    let insertUrl =
      this.state.baseUrl +
      "/laptopzone/reactcontroller/c_receiveReturn/processComplete";
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
          this.setState({
            processComplete: result.requests
          });
          $("#processCompletedBarcodes").show();
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
    const { scanBar, merchant, inventry_return_mt_id } = this.state;
    if (!scanBar) {
      notify("error", "Please scan Barcode!");
      return false;
    }
    let userId = localStorage.getItem("userId");

    let insertUrl =
      this.state.baseUrl +
      "/laptopzone/reactcontroller/c_receiveReturn/scanBarcodeShipment";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          scanBar: scanBar,
          merchant: merchant,
          userId: userId,
          inventry_return_mt_id: inventry_return_mt_id
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
            scanBar: "",
            inventry_return_mt_id: result.return_pk,
            scanList: result.barcodes
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
  //   createBoxBtn = () => {
  //     const { merchant, carrier, trackingNo, inventry_return_mt_id } = this.state;
  //     if (inventry_return_mt_id) {
  //       notify("error", "Please scan barcodes");
  //       return false;
  //     }
  //     let userId = localStorage.getItem("userId");

  //     let insertUrl =
  //       this.state.baseUrl +
  //       "/laptopzone/reactcontroller/c_receiveReturn/createBoxBtn";
  //     new Promise(function(resolve, reject) {
  //       $.ajax({
  //         url: insertUrl,
  //         dataType: "json",
  //         type: "POST",
  //         data: {
  //           merchant: merchant,
  //           carrier: carrier,
  //           trackingNo: trackingNo,
  //           inventry_return_mt_id: inventry_return_mt_id
  //         }
  //       }).then(
  //         function(data) {
  //           resolve(data);
  //         },
  //         function(err) {
  //           reject(err);
  //         }
  //       );
  //     })
  //       .then(result => {
  //         $.LoadingOverlay("hide");
  //         if (result.found) {
  //           this.setState({
  //             scanBar: "",
  //             inventry_return_mt_id: result.return_pk,
  //             scanList: result.barcodes
  //           });
  //         } else {
  //           notify("error", result.message);
  //         }
  //       })
  //       .catch(err => {
  //         $.LoadingOverlay("hide");
  //         console.log(err);
  //       });
  //   };
  render() {
    const { allMerchants, processComplete, scanList } = this.state;
    var merchants = allMerchants.map(function(obj) {
      return (
        <option key={obj.MERCHANT_ID} value={obj.MERCHANT_ID}>
          {obj.BUISNESS_NAME}
        </option>
      );
    });
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
          value: processComplete.length
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
          value: scanList.length
        }
      ]
    };
    return (
      <React.Fragment>
        <ToastsContainer store={ToastsStore} />
        <section className="content-header">
          <h1>
            Process Complete <small>Control Panel</small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/merchantDashboard">
                <i className="fa fa-dashboard" /> Home
              </Link>
            </li>
            <li>Under Process</li>
            <li className="active">
              <Link to="/underProcess">Barcodes Ready To Shipped</Link>
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
            id="processCompletedBarcodes"
            hidden
            style={{ display: "none" }}
          >
            <div className="col-xs-6">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">Under Process Barcodes </h3>
                </div>
                <div className="box-body">
                  <BootstrapTable
                    data={processComplete}
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
            <div className="col-xs-6">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">Create Shipment </h3>
                </div>
                <div className="box-body">
                  <div className="col-sm-12">
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
                  <div className="col-sm-12">
                    <button
                      type="button"
                      data-toggle="modal"
                      data-target="#shippingModal"
                      className="btn btn-block btn-success clickOnEnter"
                    >
                      Create Box
                    </button>
                  </div>
                  <BootstrapTable
                    data={scanList}
                    pagination
                    hover
                    search
                    tableHeaderclassName="my-header-class"
                    columnWidth="100%"
                    options={options2}
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

        <div id="shippingModal" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 className="modal-title">Shipping Details</h4>
              </div>
              <div className="modal-body">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="trackingNo" className="control-label">
                      Tracking No:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="trackingNo"
                      id="trackingNo"
                      onChange={this.handleChange}
                      value={this.state.trackingNo}
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="carrier" className="control-label">
                      Carrier:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="carrier"
                      id="carrier"
                      onChange={this.handleChange}
                      value={this.state.carrier}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success pull-left"
                  onClick={this.createBoxBtn}
                >
                  Create
                </button>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={this.createBoxLaterBtn}
                >
                  Later
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
      </React.Fragment>
    );
  }
}

export default ProcessComplete;
