import React, { Component } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import "gasparesganga-jquery-loading-overlay";
import notify from "../../Functions/notify";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { RViewer, RViewerTrigger } from "react-viewerjs";
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
  cancelRequest = (cell, row, cancel) => {
    var dt_id = cell;
    var userId = localStorage.getItem("userId");

    let insertUrl =
      that.state.baseUrl +
      "/laptopzone/reactcontroller/c_returnInventory/cancelReturn";
    var dbCall = new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          dt_id: dt_id,
          userId: userId,
          cancel: cancel
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
        $("#closeModal").click();
        if (result.update) {
          that.getAllInventory();
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
          this.props.row.BARCODE_STATUS == 0 ? (
            <button
              title="Barcode Status"
              className="btn btn-info"
              data-toggle="modal"
              data-target="#returnOptions"
              onClick={() => {
                this.action(this.props.cell, this.props.row);
              }}
              value={this.props.cell}
            >
              <span
                className="glyphicon glyphicon-edit p-b-5"
                aria-hidden="true"
              />
            </button>
          ) : this.props.row.BARCODE_STATUS == 1 ? (
            <button
              title="Cancel Return Request"
              className="btn btn-primary"
              onClick={() => {
                this.cancelRequest(this.props.cell, this.props.row, 1);
              }}
              value={this.props.cell}
            >
              <span
                className="glyphicon glyphicon-retweet p-b-5"
                aria-hidden="true"
              />
            </button>
          ) : this.props.row.BARCODE_STATUS == 2 ? (
            <button
              title="Cancel Junk Request"
              className="btn btn-danger"
              onClick={() => {
                this.cancelRequest(this.props.cell, this.props.row, 2);
              }}
              value={this.props.cell}
            >
              <span
                className="glyphicon glyphicon-trash p-b-5"
                aria-hidden="true"
              />
            </button>
          ) : (
            ""
          )
        ) : this.props.row.ADMIN_STATUS == 1 ? (
          <button title="Request Accepted" className="btn btn-success">
            Request Accepted
          </button>
        ) : this.props.row.ADMIN_STATUS == 2 ? (
          <button title="Process Started" className="btn btn-info">
            Process Started
          </button>
        ) : this.props.row.ADMIN_STATUS == 3 ? (
          <button title="Process Started" className="btn btn-info">
            Process Complete
          </button>
        ) : (
          ""
        )}
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
function mpn_upc(cell, row) {
  return (
    <React.Fragment>
      <p style={{ color: "#226EC0" }}>{cell}</p>
      <br />
      {row.UPC}
    </React.Fragment>
  );
}

class ReturnInventory extends Component {
  constructor(props) {
    super(props);
    that = this;
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    this.state = {
      baseUrl: finalurl,
      redirectToReferrer: false,
      merchant_id: "",
      allInventory: [],
      images: [],
      selectedOption: "1",
      remarks: "",
      cell: "",
      row: "",
      listedCount: 0,
      NotListedCount: 0,
      returnCount: 0,
      junkCount: 0
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentWillMount() {
    if (localStorage.getItem("userName")) {
      this.setState({ merchant_id: localStorage.getItem("merId") });
    } else {
      this.setState({ redirectToReferrer: true });
    }
    this.getAllInventory();
  }

  getAllInventory = () => {
    const { baseUrl } = this.state;
    let merch_id = localStorage.getItem("merId");
    $.LoadingOverlay("show");
    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_returnInventory/getAllInventory";
    var dbCall = new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: { merch_id: merch_id }
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
          var listedCount = 0;
          var NotListedCount = 0;
          var returnCount = 0;
          var junkCount = 0;

          for (var i = 0; i < result.allInventory.length; i++) {
            if (result.allInventory[i].LISTED_YN == "LISTED") {
              listedCount++;
            } else {
              NotListedCount++;
            }
            if (result.allInventory[i].BARCODE_STATUS == 1) {
              returnCount++;
            } else if (result.allInventory[i].BARCODE_STATUS == 2) {
              junkCount++;
            }
          }
          this.setState({
            allInventory: result.allInventory,
            images: result.images,
            listedCount: listedCount,
            NotListedCount: NotListedCount,
            returnCount: returnCount,
            junkCount: junkCount
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
  saveStatus = () => {
    const { baseUrl, cell, row, selectedOption, remarks } = this.state;
    var dt_id = cell;
    var userId = localStorage.getItem("userId");
    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_returnInventory/changeStatus";
    var dbCall = new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          dt_id: dt_id,
          remarks: remarks,
          selectedOption: selectedOption,
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
        $("#closeModal").click();
        if (result.update) {
          this.getAllInventory();
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
  handleListedClick = () => {
    this.refs.status.applyFilter("");
    this.refs.listed_yn.applyFilter("eBAY ID");
  };
  handleNotListedClick = () => {
    this.refs.status.applyFilter("");
    this.refs.listed_yn.applyFilter("NOT");
  };
  handleReturnClick = () => {
    this.refs.status.applyFilter("1");
    this.refs.listed_yn.applyFilter("");
  };
  handleJunkClick = () => {
    this.refs.status.applyFilter("2");
    this.refs.listed_yn.applyFilter("");
  };
  handleAllClick = () => {
    this.refs.status.applyFilter("");
    this.refs.listed_yn.applyFilter("");
  };
  render() {
    const {
      allInventory,
      listedCount,
      NotListedCount,
      returnCount,
      junkCount
    } = this.state;
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
          value: allInventory.length
        }
      ]
    };
    return (
      <React.Fragment>
        <ToastsContainer store={ToastsStore} />
        <section className="content-header">
          <h1>
            Return Inventory <small>Control Panel</small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/merchantDashboard">
                <i className="fa fa-dashboard" /> Home
              </Link>
            </li>
            <li>All Inventory</li>
            <li className="active">
              <Link to="/returnInventory">Return Inventory</Link>
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
                    <br />
                    <div className="col-sm-12">
                      <label htmlFor="manufacturer" className="control-label">
                        Apply Filters:
                      </label>
                    </div>
                    <div className="col-sm-2">
                      <button
                        onClick={this.handleListedClick}
                        className="btn btn-success"
                      >
                        Listed ({listedCount})
                      </button>
                    </div>
                    <div className="col-sm-2">
                      <button
                        onClick={this.handleNotListedClick}
                        className="btn btn-warning"
                      >
                        Not Listed ({NotListedCount})
                      </button>
                    </div>
                    <div className="col-sm-2">
                      <button
                        onClick={this.handleReturnClick}
                        className="btn btn-primary"
                      >
                        Return Request ({returnCount})
                      </button>
                    </div>
                    <div className="col-sm-2">
                      <button
                        onClick={this.handleJunkClick}
                        className="btn btn-danger"
                      >
                        Junk Request ({junkCount})
                      </button>
                    </div>
                    <div className="col-sm-2">
                      <button
                        onClick={this.handleAllClick}
                        className="btn btn-default btn-block"
                      >
                        Show All
                      </button>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>
                  <BootstrapTable
                    data={allInventory}
                    pagination
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
                    <TableHeaderColumn
                      dataField="IMAGE"
                      width="15%"
                      dataFormat={imageView}
                    >
                      Picture
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="LISTED_YN"
                      width="10%"
                      ref="listed_yn"
                      filter={{ type: "RegexFilter" }}
                    >
                      Listed Y/N
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="BARCODE_NO" width="10%">
                      Barcode
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="BARCODE_STATUS"
                      ref="status"
                      filter={{ type: "RegexFilter" }}
                      hidden
                      style={{ display: "none" }}
                    >
                      status
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
                    >
                      BRAND
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="CONDITION"
                      width="10%"
                      dataSort={true}
                    >
                      Condition
                    </TableHeaderColumn>

                    <TableHeaderColumn dataField="STATUS_BY" width="5%">
                      Status Changed By
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="STATUS_DATE"
                      dataAlign="right"
                      width="5%"
                    >
                      Status Changed At
                    </TableHeaderColumn>
                  </BootstrapTable>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div id="returnOptions" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 className="modal-title">Return Options</h4>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Remarks</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.handleChange}
                    onChange={this.handleChange}
                    name="remarks"
                    placeholder="Enter Remarks"
                  />
                </div>
                <div className="form-group">
                  <div className="radio">
                    <label>
                      <input
                        type="radio"
                        value="2"
                        onChange={this.handleChange}
                        name="selectedOption"
                        checked={this.state.selectedOption == 2}
                      />
                      Junk
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input
                        type="radio"
                        value="1"
                        onChange={this.handleChange}
                        name="selectedOption"
                        checked={this.state.selectedOption == 1}
                      />
                      Return
                    </label>
                  </div>
                  <button
                    className="btn btn-lg btn-block btn-success"
                    type="button"
                    onClick={this.saveStatus}
                  >
                    Save
                  </button>
                </div>
              </div>
              <div className="modal-footer">
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

export default ReturnInventory;
