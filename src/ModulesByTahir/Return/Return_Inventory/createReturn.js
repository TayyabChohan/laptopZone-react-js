import React, { Component } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import "gasparesganga-jquery-loading-overlay";
import notify from "../../Functions/notify";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { RViewer, RViewerTrigger } from "react-viewerjs";
import "../../CSS_Files/table.css";
import { ToastsContainer, ToastsStore } from "react-toasts";

var that = this;

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
  delete = (cell, row) => {
    var barcodes = that.state.requestArray;

    for (var i = 0; i < barcodes.length; i++) {
      if (barcodes[i].DT_ID == cell) {
        barcodes.splice(i, 1);
      }
    }

    that.setState({
      requestArray: barcodes
    });
    that.saveState();
  };

  render() {
    return (
      <React.Fragment>
        <button
          title="Approve Request"
          className="btn btn-danger"
          onClick={() => {
            this.delete(this.props.cell, this.props.row);
          }}
          value={this.props.cell}
        >
          <span
            className="glyphicon glyphicon-trash p-b-5"
            aria-hidden="true"
          />
        </button>
      </React.Fragment>
    );
  }
}
export class BarcodeStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: ""
    };
  }
  componentWillMount() {
    if (this.props.cell == 0) {
      this.setState({
        selectedOption: "1"
      });
    } else {
      this.setState({
        selectedOption: this.props.cell
      });
    }
  }
  handleOptionChange = e => {
    this.setState({
      selectedOption: e.target.value
    });
  };
  returnClick = (cell, row) => {
    var barcodes = that.state.requestArray;
    for (var i = 0; i < barcodes.length; i++) {
      if (barcodes[i].DT_ID == row.DT_ID) {
        barcodes[i].BARCODE_STATUS = 1;
      }
    }

    that.setState({
      requestArray: barcodes
    });
    that.saveState();
  };
  junkClick = (cell, row) => {
    var barcodes = that.state.requestArray;
    for (var i = 0; i < barcodes.length; i++) {
      if (barcodes[i].DT_ID == row.DT_ID) {
        barcodes[i].BARCODE_STATUS = 2;
      }
    }

    that.setState({
      requestArray: barcodes
    });
    that.saveState();
  };
  render() {
    return (
      <React.Fragment>
        <div className="form-group">
          <div className="radio">
            <label>
              <input
                type="radio"
                value="1"
                checked={this.state.selectedOption === "1"}
                onChange={this.handleOptionChange}
                onClick={() => {
                  this.returnClick(this.props.cell, this.props.row);
                }}
              />
              Return
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="2"
                checked={this.state.selectedOption === "2"}
                onChange={this.handleOptionChange}
                onClick={() => {
                  this.junkClick(this.props.cell, this.props.row);
                }}
              />
              Junk
            </label>
          </div>
        </div>
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
function barcodeStatus(cell, row) {
  return <BarcodeStatus cell={cell} row={row} />;
}

class CreateReturn extends Component {
  constructor(props) {
    super(props);
    that = this;
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    this.state = {
      baseUrl: finalurl,
      search: "",
      images: [],
      requestArray: [],
      isLoaded: false
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentWillMount() {
    this.getState();
  }
  getState = () => {
    var merId = localStorage.getItem("merId");
    let userId = localStorage.getItem("userId");
    var componentName = "CreateReturn";

    let insertUrl =
      this.state.baseUrl +
      "/laptopzone/reactcontroller/c_returnInventory/getState";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          merId: merId,
          componentName: componentName,
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
        if (result.found) {
          $("#barcodeGrid").show();
          var records = result.merchant_state[0]["MERCHANT_STATES"];
          var objectsArray = JSON.parse(records);

          this.setState({
            requestArray: objectsArray,
            images: result.images
          });
          notify("success", "Transaction Pending!");
          // console.log("success, " + result.message);
        } else {
          console.log("error," + result.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  saveState = () => {
    var postData = this.state.requestArray;
    var merId = localStorage.getItem("merId");
    let userId = localStorage.getItem("userId");
    var componentName = "CreateReturn";

    let insertUrl =
      this.state.baseUrl +
      "/laptopzone/reactcontroller/c_returnInventory/saveState";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          postData: postData,
          merId: merId,
          componentName: componentName,
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
        if (result.stateSaved) {
          console.log("success, " + result.message);
        } else {
          console.log("error," + result.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  deleteState = () => {
    var merId = localStorage.getItem("merId");
    let userId = localStorage.getItem("userId");
    var componentName = "CreateReturn";

    let insertUrl =
      this.state.baseUrl +
      "/laptopzone/reactcontroller/c_returnInventory/deleteState";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          merId: merId,
          componentName: componentName,
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
        if (result.delete) {
          this.setState({
            requestArray: [],
            images: []
          });
          $("#barcodeGrid").hide();
          notify("success", result.message);
        } else {
          notify("error", result.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  searchBarcode = e => {
    e.preventDefault();

    var search = this.state.search;
    let merId = localStorage.getItem("merId");
    $.LoadingOverlay("show");
    let insertUrl =
      this.state.baseUrl +
      "/laptopzone/reactcontroller/c_returnInventory/createReturn";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          merId: merId,
          barcode: search
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
          $("#barcodeGrid").show();
          if (this.state.requestArray.length > 0) {
            var found = this.state.requestArray.filter(
              item => item.DT_ID == result.createReturn[0].DT_ID
            );

            if (found.length == 0) {
              var newRecord = [];
              newRecord.push({
                DT_ID: result.createReturn[0].DT_ID,
                IMAGE: result.createReturn[0].DT_ID,
                BARCODE_NO: result.createReturn[0].BARCODE_NO,
                BARCODE_STATUS: result.createReturn[0].BARCODE_STATUS,
                BRAND: result.createReturn[0].BRAND,
                CONDITION: result.createReturn[0].CONDITION,
                LISTED_STATUS: result.createReturn[0].LISTED_STATUS,
                LISTED_YN: result.createReturn[0].LISTED_YN,
                MPN: result.createReturn[0].MPN,
                MPN_DESCRIPTION: result.createReturn[0].MPN_DESCRIPTION,
                NOTIFICATION: result.createReturn[0].NOTIFICATION,
                REMARKS: result.createReturn[0].REMARKS,
                STATUS_BY: result.createReturn[0].STATUS_BY,
                STATUS_DATE: result.createReturn[0].STATUS_DATE,
                UPC: result.createReturn[0].UPC
              });

              var newArray = this.state.requestArray;
              newArray.push(newRecord[0]);

              this.setState({
                requestArray: newArray,
                images: result.images,
                search: ""
              });

              this.saveState();
            } else {
              notify("error", "Barcode Already Exist");
            }
          } else {
            this.setState({
              requestArray: result.createReturn,
              images: result.images,
              search: ""
            });
            this.saveState();
          }
        } else {
          this.setState({
            search: ""
          });
          notify("error", result.message);
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };
  saveReturn = () => {
    var postData = this.state.requestArray;
    var userId = localStorage.getItem("userId");

    let insertUrl =
      this.state.baseUrl +
      "/laptopzone/reactcontroller/c_returnInventory/saveReturn";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          postData: postData,
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
          $("#barcodeGrid").hide();
          this.setState({
            requestArray: [],
            images: [],
            search: ""
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
    const { isLoaded, requestArray } = this.state;
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
          value: requestArray.length
        }
      ]
    };
    return (
      <React.Fragment>
        <ToastsContainer store={ToastsStore} />
        <section className="content-header">
          <h1>
            Create Return <small>Control Panel</small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/merchantDashboard">
                <i className="fa fa-dashboard" /> Home
              </Link>
            </li>
            <li>New Return</li>
            <li className="active">
              <Link to="/createReturn">Create Return</Link>
            </li>
          </ol>
        </section>
        <section className="content">
          <div className="row">
            <div className="box">
              <div className="box-header">
                <h3 className="box-title">Create Return Request</h3>
              </div>
              <div className="box-body">
                <form onSubmit={this.searchBarcode}>
                  <div className="input-group">
                    <input
                      className="form-control pl"
                      type="number"
                      value={this.state.search}
                      id="searchValue"
                      name="search"
                      onChange={this.handleChange}
                      placeholder="Search by Barcode..."
                    />
                    <span className="input-group-btn">
                      <button
                        type="submit"
                        className="btn btn-flat btn-success"
                      >
                        Search
                      </button>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div
            className="row"
            hidden
            style={{ display: "none" }}
            id="barcodeGrid"
          >
            <div className="box">
              <div className="box-header">
                <h3 className="box-title">Search Results</h3>
              </div>
              <div className="box-body">
                <div className="col-sm-6">
                  <button
                    className="btn btn-block btn-lg btn-success"
                    onClick={this.saveReturn}
                  >
                    Save Return
                  </button>
                </div>
                <div className="col-sm-6">
                  <button
                    className="btn btn-block btn-lg btn-danger"
                    onClick={this.deleteState}
                  >
                    Reset
                  </button>
                </div>
                <BootstrapTable
                  data={requestArray}
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
                    dataField="BARCODE_STATUS"
                    width="15%"
                    dataFormat={barcodeStatus}
                  >
                    Options
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
                    dataField="ADMIN_STATUS"
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
                    // dataFormat={mpn_upc}
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
                </BootstrapTable>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default CreateReturn;
