import React, { Component } from "react";
import { ToastsContainer, ToastsStore } from "react-toasts";
import { Link, Redirect } from "react-router-dom";
import $ from "jquery";
import "gasparesganga-jquery-loading-overlay";
// import swal from "sweetalert";
import notify from "../Functions/notify";
import { RViewer, RViewerTrigger } from "react-viewerjs";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../CSS_Files/table.css";

import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
var dateFormat = require("dateformat");

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

  Delete = (cell, row) => {
    var userId = localStorage.getItem("userId");
    $.LoadingOverlay("show");
    let insertUrl =
      that.state.baseUrl +
      "/laptopzone/reactcontroller/c_itemsAudit/del_audit_barcode";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          barcode_no: cell,
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
        if (result.delete) {
          var barcodes = that.state.dekitAuditItems;
          for (var i = 0; i < barcodes.length; i++) {
            if (barcodes[i].BARCODE_NO == cell) {
              barcodes.splice(i, 1);
            }
          }

          that.setState({
            dekitAuditItems: barcodes
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
  print = (cell, row) => {
    var bin_id = that.state.audit_bin_id;
    if (!bin_id) {
      notify("error", "Please select bin");
      return false;
    }
    var userId = localStorage.getItem("userId");
    var list_id = row.LIST_ID;
    var barcode = cell;

    var sticker_url =
      that.state.baseUrl +
      "/laptopzone/reactcontroller/c_itemsAudit/print_audit_label/" +
      list_id +
      "/" +
      barcode +
      "/" +
      bin_id;
    window.open(sticker_url, "_blank");
    that.searchAudit();
  };
  render() {
    return (
      <React.Fragment>
        <button
          title="Remove from audit"
          className="btn btn-danger"
          onClick={() => {
            this.Delete(this.props.cell, this.props.row);
          }}
          value={this.props.cell}
        >
          <span
            className="glyphicon glyphicon-trash p-b-5"
            aria-hidden="true"
          />
        </button>
        <button
          title="Print Sticker"
          className="btn btn-primary"
          onClick={() => {
            this.print(this.props.cell, this.props.row);
          }}
          value={this.props.cell}
        >
          <span
            className="glyphicon glyphicon-print p-b-5"
            aria-hidden="true"
          />
        </button>
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
function binLink(cell, row) {
  return (
    <a
      href={
        "http://71.78.236.20/laptopzone/tolist/c_tolist/transfer_location/" +
        cell
      }
      target="_blank"
    >
      {cell}
    </a>
  );
}
function ebayLink(cell, row) {
  return (
    <a href={"https://www.ebay.com/itm/" + cell} target="_blank">
      {cell}
    </a>
  );
}
function masterBarcode(cell, row) {
  return (
    <div style={{ width: "150px" }}>
      <p style={{ color: "red" }}> Master Barcode -- {row.MASTER_BARCODE} </p>
      {cell}
    </div>
  );
}

class DekitItemsAudit extends Component {
  constructor(props) {
    super(props);
    that = this;
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    this.state = {
      baseUrl: finalurl,
      startDate: "",
      endDate: "",
      location: "",
      audit_bin_id: "",
      dekitAuditItems: [],
      images: [],
      date: new Date()
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSelect = range => {
    this.setState({
      startDate: range.startDate._d,
      endDate: range.endDate._d
    });
    // An object with two keys,
    // 'startDate' and 'endDate' which are Momentjs objects.
  };
  componentWillMount() {
    this.setState({
      location: "PK"
    });
    this.searchAudit();
  }
  searchAudit = () => {
    const { startDate, endDate, location, date } = this.state;

    var from_date = dateFormat(date[0], "yyyy-mm-dd");
    // var from_date = dateFormat("December 17, 2015 03:24:00", "yyyy-mm-dd");
    var to_date = dateFormat(date[1], "yyyy-mm-dd");

    if (!from_date || !to_date) {
      notify("error", "Please select date");
      return false;
    }
    if (!location) {
      notify("error", "Please select location");
      return false;
    }
    $.LoadingOverlay("show");
    let insertUrl =
      this.state.baseUrl +
      "/laptopzone/reactcontroller/c_itemsAudit/searchDekitAudit";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          startDate: from_date,
          endDate: to_date,
          location: location
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
            dekitAuditItems: result.allDekitData,
            images: result.images
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
    const { dekitAuditItems, date } = this.state;
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
          value: dekitAuditItems.length
        }
      ]
    };
    return (
      <React.Fragment>
        <ToastsContainer store={ToastsStore} />
        <section className="content-header">
          <h1>
            Listed Items Audit <small>Control Panel</small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/welcom">
                <i className="fa fa-dashboard" /> Home
              </Link>
            </li>
            <li>Listed Items Audit</li>
            <li className="active">
              <Link to="/listedItemsAudit">Listed Items</Link>
            </li>
          </ol>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">Search Item</h3>
                </div>
                <div className="box-body">
                  <div className="col-md-12">
                    <div className="col-sm-2">
                      <label>Search Filter:</label>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <Flatpickr
                          options={{
                            mode: "range",
                            dateFormat: "Y-m-d"
                          }}
                          value={date}
                          className="form-control"
                          onChange={date => {
                            this.setState({ date });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <input
                        type="radio"
                        name="location"
                        value="PK"
                        checked={this.state.location == "PK"}
                        onChange={this.handleChange}
                      />
                      &nbsp;Pak Lister
                      <br />
                      <input
                        type="radio"
                        name="location"
                        value="US"
                        onChange={this.handleChange}
                      />
                      &nbsp;US Lister
                      <br />
                      <input
                        type="radio"
                        name="location"
                        value="ALL"
                        onChange={this.handleChange}
                      />
                      &nbsp;All
                      <br />
                    </div>
                    <div className="col-sm-2">
                      <div className="form-group">
                        <input
                          type="submit"
                          className="btn btn-primary btn-sm"
                          name="search_lister"
                          id="search_lister"
                          value="Search"
                          onClick={this.searchAudit}
                        />
                      </div>
                    </div>
                    <div className="col-sm-2 pull-left">
                      <Link to="/listedItemsAudit" style={{ color: "white" }}>
                        <button className="btn btn-success">
                          Listed Items Audit
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">Search Item</h3>
                </div>
                <div className="box-body">
                  <div className="col-md-12">
                    <div className="col-sm-2">
                      <div className="form-group">
                        <label>Assign Bin:</label>
                        <input
                          type="text"
                          name="audit_bin_id"
                          id="audit_bin_id"
                          className="form-control"
                          value={this.state.audit_bin_id}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>

                    <BootstrapTable
                      data={dekitAuditItems}
                      pagination
                      hover
                      search
                      tableHeaderClass="my-header-class"
                      columnWidth="100%"
                      options={options}
                    >
                      <TableHeaderColumn
                        dataField="BARCODE_NO"
                        isKey={true}
                        width="6.7%"
                        dataFormat={actionFormatter}
                      >
                        Action
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="BARCODE_NO"
                        width="6.7%"
                        dataFormat={imageView}
                      >
                        Picture
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="EBAY_ITEM_ID"
                        width="6.7%"
                        dataFormat={ebayLink}
                      >
                        Ebay ID
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="LIST_ID"
                        hidden
                        style={{ display: "none" }}
                      >
                        List ID
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="BARCODE_NO"
                        width="6.7%"
                        dataFormat={masterBarcode}
                      >
                        Barcode
                      </TableHeaderColumn>

                      <TableHeaderColumn
                        dataField="ITEM_CONDITION"
                        width="6.7%"
                        // dataFormat={mpn_upc}
                      >
                        Condition
                      </TableHeaderColumn>
                      <TableHeaderColumn dataField="ITEM_MT_DESC" width="6.7%">
                        Title
                      </TableHeaderColumn>

                      <TableHeaderColumn
                        dataField="QUANTITY"
                        width="6.7%"

                        // dataFormat={brand_condition}
                      >
                        List Qty
                      </TableHeaderColumn>
                      <TableHeaderColumn dataField="EBAY_PRICE" width="6.7%">
                        List Price
                      </TableHeaderColumn>
                      <TableHeaderColumn dataField="LIST_DATE" width="6.7%">
                        Listing Date & Time
                      </TableHeaderColumn>
                      <TableHeaderColumn dataField="MFG_PART_NO" width="6.7%">
                        MPN
                      </TableHeaderColumn>
                      <TableHeaderColumn dataField="MANUFACTURER" width="6.7%">
                        Manufacturer
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="BIN_NAME"
                        width="6.7%"
                        dataFormat={binLink}
                      >
                        Bin Name
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="LZ_SELLER_ACCT_ID"
                        width="6.7%"
                      >
                        Account
                      </TableHeaderColumn>
                      <TableHeaderColumn dataField="STATUS" width="6.7%">
                        Status
                      </TableHeaderColumn>
                      <TableHeaderColumn dataField="SOLD_STAT" width="6.7%">
                        Sold Status
                      </TableHeaderColumn>
                    </BootstrapTable>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default DekitItemsAudit;
