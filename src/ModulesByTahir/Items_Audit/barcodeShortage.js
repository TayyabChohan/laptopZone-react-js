import React, { Component } from "react";
import { ToastsContainer, ToastsStore } from "react-toasts";
import { Link, Redirect } from "react-router-dom";
import $ from "jquery";
import "gasparesganga-jquery-loading-overlay";
import notify from "../Functions/notify";
import { RViewer, RViewerTrigger } from "react-viewerjs";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../CSS_Files/table.css";

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

  openModal = (cell, row) => {
    that.setState({
      selectedCell: cell,
      selectedRow: row,
      remarks: ""
    });
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
            data-toggle="modal"
            data-target="#myModal"
            className="btn btn-sm btn-danger btn_remove fa fa-trash-o"
            onClick={() => this.openModal(this.props.cell, this.props.row)}
          />
        </div>
      </React.Fragment>
    );
  }
}

function actionFormatter(cell, row) {
  return <ActionFormatter cell={cell} row={row} />;
}
function mpn_upc(cell, row) {
  return (
    <React.Fragment>
      <p style={{ color: "#226EC0" }}>{cell}</p>
      <br />
      {row.UPC ? row.UPC : "No UPC"}
    </React.Fragment>
  );
}
function ebayLink(cell, row) {
  if (cell) {
    return (
      <a href={"https://www.ebay.com/itm/" + cell} target="_blank">
        EBAY ID: {cell}
      </a>
    );
  } else {
    return <button className="btn btn-warning btn-xs">Not Listed</button>;
  }
}
function imageView(cell, row) {
  return <ImageView cell={cell} row={row} />;
}

class BarcodeShortage extends Component {
  constructor(props) {
    super(props);
    that = this;
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    this.state = {
      baseUrl: finalurl,
      barcodeShortage: [],
      images: [],
      selectedCell: "",
      selectedRow: "",
      ListedCount: "",
      NotLIstedCount: "",
      remarks: ""
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentWillMount() {
    this.getBarcodeShortage();
  }
  getBarcodeShortage = () => {
    $.LoadingOverlay("show");
    let insertUrl =
      this.state.baseUrl +
      "/laptopzone/reactcontroller/c_itemsAudit/getBarcodeShortage";
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
          var ListedCount = 0;
          var NotLIstedCount = 0;
          for (var i = 0; i < result.shortageList.length; i++) {
            var ebayId = result.shortageList[i].LISTED_STATUS;

            if (ebayId == "NOT") {
              NotLIstedCount++;
            } else if (ebayId == "LISTED") {
              ListedCount++;
            }
          }

          this.setState({
            barcodeShortage: result.shortageList,
            images: result.images,
            ListedCount: ListedCount,
            NotLIstedCount: NotLIstedCount
          });
        } else {
          this.setState({
            barcodeShortage: [],
            images: [],
            ListedCount: 0,
            NotLIstedCount: 0,
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
  deleteBarcode = () => {
    const { selectedCell, remarks } = this.state;
    var barcode = selectedCell;
    let userId = localStorage.getItem("userId");
    $.LoadingOverlay("show");
    let insertUrl =
      that.state.baseUrl +
      "/laptopzone/reactcontroller/c_itemsAudit/discardBarcode";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          barcode: barcode,
          discard_remarks: remarks,
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
        if (result.discarded) {
          var barcodes = this.state.barcodeShortage;
          for (var i = 0; i < barcodes.length; i++) {
            if (barcodes[i].BARCODE_NO == selectedCell) {
              barcodes.splice(i, 1);
            }
          }

          this.setState({
            barcodeShortage: barcodes
          });
          $("#closeModal").click();
        } else {
          notify("error", "Something Went Wrong!");
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };
  listedFilter = () => {
    this.refs.listed_status.applyFilter("LISTED");
  };
  notListedFilter = () => {
    this.refs.listed_status.applyFilter("NOT");
  };
  handleAllClick = () => {
    this.refs.listed_status.applyFilter("");
  };
  render() {
    const { barcodeShortage, ListedCount, NotLIstedCount } = this.state;
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
          value: barcodeShortage.length
        }
      ]
    };

    return (
      <React.Fragment>
        <ToastsContainer store={ToastsStore} />

        <section className="content-header">
          <h1>
            Barcode Shortage <small>Control Panel</small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/welcom">
                <i className="fa fa-dashboard" /> Home
              </Link>
            </li>
            <li className="active">
              <Link to="/barcodeShortage">Barcode Shortage</Link>
            </li>
          </ol>
        </section>

        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title pull-left">Filters</h3>
                </div>
                <div className="box-body">
                  <div className="col-md-12">
                    <div className="col-sm-3">
                      <button
                        onClick={this.listedFilter}
                        className="btn btn-success"
                      >
                        Listed ({ListedCount})
                      </button>
                    </div>
                    <div className="col-sm-3">
                      <button
                        onClick={this.notListedFilter}
                        className="btn btn-danger"
                      >
                        Not Listed ({NotLIstedCount})
                      </button>
                    </div>
                    <div className="col-sm-3">
                      <button
                        onClick={this.handleAllClick}
                        className="btn btn-default"
                      >
                        Show All ({barcodeShortage.length})
                      </button>
                    </div>
                    <div className="col-sm-3">
                      <div className="form-group">
                        <Link to="/verifyCount" style={{ color: "white" }}>
                          <button className="btn btn-success">
                            Verify Count & Tranfer Bin
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title pull-left">Shortage List</h3>
                </div>
                <div className="box-body">
                  <BootstrapTable
                    data={barcodeShortage}
                    pagination
                    search
                    tableHeaderClass="add-barcodes"
                    tableBodyClass="add-barcodes"
                    columnWidth="100%"
                    options={options}
                  >
                    <TableHeaderColumn
                      dataField="BARCODE_NO"
                      width="10%"
                      dataFormat={imageView}
                    >
                      Picture
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="BARCODE_NO"
                      isKey={true}
                      width="10%"
                    >
                      Barcode No:
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="LISTED_STATUS"
                      width="10%"
                      hidden
                      style={{ display: "none" }}
                      ref="listed_status"
                      filter={{ type: "RegexFilter" }}
                    >
                      EBAY_ITEM_ID
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="EBAY_ITEM_ID"
                      width="10%"
                      dataFormat={ebayLink}
                    >
                      EBAY_ITEM_ID
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="TITLE" width="10%">
                      Title
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="MPN"
                      dataFormat={mpn_upc}
                      width="10%"
                    >
                      <p style={{ color: "#226EC0" }}>MPN</p>
                      <br /> UPC
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="MANUFACTURER" width="10%">
                      Manufacturer
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="BIN_NAME" width="10%">
                      Last Attached Bin:
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="SHORTAGE_DATE" width="10%">
                      Shortage Date
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="SHORTAGE_BY" width="10%">
                      Shortage By
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="BARCODE_NO"
                      width="10%"
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

        <div id="myModal" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 className="modal-title">
                  Discard This Barcode: {this.state.selectedCell}
                </h4>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Remarks:</label>
                  <input
                    type="text"
                    name="remarks"
                    id="remarks"
                    className="form-control"
                    onChange={this.handleChange}
                    value={this.state.remarks}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={this.deleteBarcode}
                >
                  Discard
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

export default BarcodeShortage;
