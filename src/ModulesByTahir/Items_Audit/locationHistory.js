import React, { Component } from "react";
import { ToastsContainer, ToastsStore } from "react-toasts";
import { Link, Redirect } from "react-router-dom";
import $ from "jquery";
import "gasparesganga-jquery-loading-overlay";
import notify from "../Functions/notify";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../CSS_Files/table.css";

var that = "";

class LocationHistory extends Component {
  constructor(props) {
    super(props);
    that = this;
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    this.state = {
      baseUrl: finalurl,
      barcodeHistory: [],
      scanBarcode: ""
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentWillMount() {
    var barcode = this.props.barcode;
    if (barcode) {
      this.searchBarcodeForProps(barcode);
    }
  }
  searchBarcodeForProps = barcode => {
    var scanBarcode = barcode;
    $.LoadingOverlay("show");
    let insertUrl =
      that.state.baseUrl +
      "/laptopzone/reactcontroller/c_itemsAudit/getLocationHistory";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          scanBarcode: scanBarcode
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
            barcodeHistory: result.barcodeHistory
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
  searchBarcode = e => {
    e.preventDefault();
    var scanBarcode = this.state.scanBarcode;
    $.LoadingOverlay("show");
    let insertUrl =
      that.state.baseUrl +
      "/laptopzone/reactcontroller/c_itemsAudit/getLocationHistory";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          scanBarcode: scanBarcode
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
            barcodeHistory: result.barcodeHistory
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
    const { barcodeHistory } = this.state;
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
    return (
      <React.Fragment>
        <ToastsContainer store={ToastsStore} />
        {!this.props.hideTopBar ? (
          <section className="content-header">
            <h1>
              Location History <small>Control Panel</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <Link to="/welcom">
                  <i className="fa fa-dashboard" /> Home
                </Link>
              </li>
              <li className="active">
                <Link to="/LocationHistory">Location History</Link>
              </li>
            </ol>
          </section>
        ) : (
          ""
        )}
        <section className="content">
          {!this.props.hideTopBar ? (
            <div className="row">
              <div className="col-md-12">
                <div className="box">
                  <div className="box-header">
                    <h3 className="box-title">Search Barcode</h3>
                  </div>
                  <div className="box-body">
                    <div className="col-md-12">
                      <form onSubmit={this.searchBarcode}>
                        <div className="col-sm-8">
                          <div className="form-group">
                            <input
                              className="form-control"
                              type="text"
                              name="scanBarcode"
                              value={this.state.scanBarcode}
                              onChange={this.handleChange}
                              placeholder="Search Barcode"
                            />
                          </div>
                        </div>
                        <div className="col-sm-2">
                          <div className="form-group">
                            <input
                              type="submit"
                              title="Search Item"
                              className="btn btn-primary"
                              name="Submit"
                              value="Search"
                            />
                          </div>
                        </div>
                      </form>
                      <div className="col-sm-12 pull-right">
                        <Link to="/verifyCount" style={{ color: "white" }}>
                          <button className="btn btn-success">
                            Verify Count & Transfer Bin
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {!this.props.hideTopBar ? (
            <div className="row">
              <div className="col-md-12">
                <div className="box">
                  <div className="box-header">
                    <h3 className="box-title">Search Item</h3>
                  </div>

                  <div className="box-body">
                    <div className="col-md-12">
                      <BootstrapTable
                        data={barcodeHistory}
                        pagination
                        hover
                        striped
                        search
                        tableHeaderClass="my-header-class"
                        columnWidth="100%"
                        options={options}
                      >
                        <TableHeaderColumn
                          dataField="BARCODE_NO"
                          isKey={true}
                          width="16.7%"
                        >
                          Barcode
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField="TITLE" width="16.7%">
                          Item Desc
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          dataField="OLD_LOCATION"
                          width="16.7%"
                        >
                          Old Location
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="NEW_LOCATION"
                          width="16.7%"
                        >
                          New Location
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField="TRAN_DA" width="16.7%">
                          Transfer Date
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="TRANSFER_BY"
                          width="16.7%"
                        >
                          Transfer By
                        </TableHeaderColumn>
                      </BootstrapTable>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-md-12">
              <BootstrapTable
                data={barcodeHistory}
                pagination
                hover
                striped
                search
                tableHeaderClass="my-header-class"
                columnWidth="100%"
                options={options}
              >
                <TableHeaderColumn
                  dataField="BARCODE_NO"
                  isKey={true}
                  width="16.7%"
                >
                  Barcode
                </TableHeaderColumn>
                <TableHeaderColumn dataField="TITLE" width="16.7%">
                  Item Desc
                </TableHeaderColumn>

                <TableHeaderColumn dataField="OLD_LOCATION" width="16.7%">
                  Old Location
                </TableHeaderColumn>
                <TableHeaderColumn dataField="NEW_LOCATION" width="16.7%">
                  New Location
                </TableHeaderColumn>
                <TableHeaderColumn dataField="TRAN_DA" width="16.7%">
                  Transfer Date
                </TableHeaderColumn>
                <TableHeaderColumn dataField="TRANSFER_BY" width="16.7%">
                  Transfer By
                </TableHeaderColumn>
              </BootstrapTable>
            </div>
          )}
        </section>
      </React.Fragment>
    );
  }
}

export default LocationHistory;
