import React, { Component } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import "gasparesganga-jquery-loading-overlay";
import notify from "../Functions/notify";
import { RViewer, RViewerTrigger } from "react-viewerjs";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../CSS_Files/table.css";
import { ToastsContainer, ToastsStore } from "react-toasts";

var that = "";
class ActionFormatter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleChange = e => {
    that.setState({
      [e.target.name]: e.target.value
    });
  };
  editPrice = (cell, row) => {
    const { baseUrl } = that.state;
    var price = that.state.price;
    if (!price) {
      notify("error", "Price cannot be empty");
      return false;
    }
    var seed_id = row.seed_id;

    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_shipQueue/editPrice";
    var DBCall = new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          seed_id: seed_id,
          price: price
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

    $.LoadingOverlay("show");
    DBCall.then(result => {
      $.LoadingOverlay("hide");
      if (result.update) {
        $("#closeModal").click();
        that.getAllQueuesExecute();
        notify("success", result.message);
      } else {
        $("#closeModal").click();
        that.getAllQueuesExecute();
        notify("error", result.message);
      }
    }).catch(err => {
      $.LoadingOverlay("hide");
      console.log(err);
    });
  };
  editCost = (cell, row) => {
    const { baseUrl } = that.state;
    var cost = that.state.cost;
    if (!cost) {
      notify("error", "Cost cannot be empty");
      return false;
    }
    var barcode_no = row.barcode_no;
    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_shipQueue/editCost";
    var DBCall = new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          barcode_no: barcode_no,
          cost: cost
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

    $.LoadingOverlay("show");
    DBCall.then(result => {
      $.LoadingOverlay("hide");
      if (result.update) {
        $("#closeModal").click();
        that.getAllQueuesExecute();
        notify("success", result.message);
      } else {
        $("#closeModal").click();
        that.getAllQueuesExecute();
        notify("error", result.message);
      }
    }).catch(err => {
      $.LoadingOverlay("hide");
      console.log(err);
    });
  };
  holdBarcode = (cell, row) => {
    const { baseUrl } = that.state;

    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_shipQueue/holdBarcode";
    var DBCall = new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          lz_barcode_mt_id: cell
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
    $.LoadingOverlay("show");
    DBCall.then(result => {
      $.LoadingOverlay("hide");
      if (result.update) {
        that.getAllQueuesExecute();
        notify("success", result.message);
      } else {
        notify("error", result.message);
      }
    }).catch(err => {
      $.LoadingOverlay("hide");
      console.log(err);
    });
  };
  unholdBarcode = (cell, row) => {
    const { baseUrl } = that.state;

    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_shipQueue/unholdBarcode";
    var DBCall = new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          lz_barcode_mt_id: cell
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
    $.LoadingOverlay("show");
    DBCall.then(result => {
      $.LoadingOverlay("hide");
      if (result.update) {
        that.getAllQueuesExecute();
        notify("success", result.message);
      } else {
        notify("error", result.message);
      }
    }).catch(err => {
      $.LoadingOverlay("hide");
      console.log(err);
    });
  };
  changePrice = row => {
    var prevPrice = row.ebay_price;
    var newPrice = prevPrice.replace("$", "");
    that.setState({
      price: newPrice
    });
  };
  changeCost = row => {
    var prevCost = row.cost;
    var newCost = prevCost.replace("$", "");
    that.setState({
      cost: newCost
    });
  };
  render() {
    return (
      <React.Fragment>
        {this.props.row.status != "LISTED" &&
        this.props.row.status != "UNPOST" ? (
          <React.Fragment>
            <button
              title="Edit List Price"
              className="btn btn-primary"
              data-toggle="modal"
              data-target={"#editPrice" + this.props.cell}
              onClick={() => {
                this.changePrice(this.props.row);
              }}
              value={this.props.cell}
            >
              <span
                className="glyphicon glyphicon-edit p-b-5"
                aria-hidden="true"
              />
            </button>

            <div
              id={"editPrice" + this.props.cell}
              className="modal fade"
              role="dialog"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                    >
                      &times;
                    </button>
                    <h4 className="modal-title">Update List Price</h4>
                  </div>
                  <div className="modal-body">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="price" className="control-label">
                          List Price:
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="price"
                          name="price"
                          onChange={this.handleChange}
                          value={that.state.price}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-success pull-left"
                      onClick={() => {
                        this.editPrice(this.props.cell, this.props.row);
                      }}
                    >
                      Update
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
        ) : this.props.row.status == "UNPOST" ? (
          <React.Fragment>
            <button
              title="Edit Cost"
              className="btn btn-primary"
              data-toggle="modal"
              data-target={"#editCost" + this.props.cell}
              onClick={() => {
                this.changeCost(this.props.row);
              }}
              value={this.props.cell}
            >
              <span
                className="glyphicon glyphicon-edit p-b-5"
                aria-hidden="true"
              />
            </button>

            <div
              id={"editCost" + this.props.cell}
              className="modal fade"
              role="dialog"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                    >
                      &times;
                    </button>
                    <h4 className="modal-title">Update Cost</h4>
                  </div>
                  <div className="modal-body">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="price" className="control-label">
                          Cost:
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="cost"
                          name="cost"
                          onChange={this.handleChange}
                          value={that.state.cost}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-success pull-left"
                      onClick={() => {
                        this.editCost(this.props.cell, this.props.row);
                      }}
                    >
                      Update
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
        ) : (
          ""
        )}
        {this.props.row.status == "LISTED" ? (
          ""
        ) : this.props.row.status == "HOLD" &&
          this.props.row.status != "UNPOST" ? (
          <button
            title="Unhold"
            className="btn btn-warning"
            onClick={() => {
              this.unholdBarcode(this.props.cell, this.props.row);
            }}
            value={this.props.cell}
          >
            <span
              className="glyphicon glyphicon-eye-open p-b-5"
              aria-hidden="true"
            />
          </button>
        ) : this.props.row.status != "UNPOST" ? (
          <button
            title="Hold"
            className="btn btn-warning"
            onClick={() => {
              this.holdBarcode(this.props.cell, this.props.row);
            }}
            value={this.props.cell}
          >
            <span
              className="glyphicon glyphicon-eye-close p-b-5"
              aria-hidden="true"
            />
          </button>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}
export class ImageView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
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
            imageUrls={that.state.imagesUrl[this.props.cell]}
          >
            <RViewerTrigger>
              <div className="col-md-12">
                <img
                  className="getCss"
                  src={that.state.imagesUrl[this.props.cell][0]}
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
export class Status extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <span
          className={
            "btn btn-sm btn-" +
            (this.props.cell == "LISTED"
              ? "success"
              : this.props.cell == "NOT LISTED"
              ? "primary"
              : this.props.cell == "READY TO LIST"
              ? "info"
              : this.props.cell == "NOT READY"
              ? "primary"
              : this.props.cell == "HOLD"
              ? "warning"
              : this.props.cell == "UNPOST"
              ? "danger"
              : "")
          }
        >
          <b>{this.props.cell}</b>
        </span>
      </React.Fragment>
    );
  }
}
function actionFormatter(cell, row) {
  return <ActionFormatter cell={cell} row={row} />;
}
function imageView(cell, row) {
  return <ImageView cell={cell} row={row} />;
}
function status(cell, row) {
  return <Status cell={cell} row={row} />;
}
function upc_mpn(cell, row) {
  return (
    <React.Fragment>
      <p style={{ color: "#226EC0" }}>{row.mpn}</p>
      <br />
      <p>{cell}</p>
    </React.Fragment>
  );
}

class ShipQueue extends Component {
  constructor(props) {
    super(props);
    that = this;
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    this.state = {
      baseUrl: finalurl,
      queueList: [],
      imagesUrl: [],
      notReady: 0,
      listed: 0,
      readyToList: 0,
      hold: 0,
      unpost: 0,
      price: "",
      cost: "",
      oldCell: "",
      oldRow: ""
    };
  }

  componentDidMount() {
    this.getAllQueuesExecute();
  }
  getAllQueuesExecute = () => {
    $.LoadingOverlay("show");
    this.getAllQueues()
      .then(result => {
        $.LoadingOverlay("hide");
        if (result.found) {
          this.setState({
            imagesUrl: result.images
          });
          this.pushQueues(result.allQueues);
        } else {
          this.setState({
            imagesUrl: result.images
          });
          this.pushQueues(result.allQueues);
          this.notify("error", result.message);
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };
  getAllQueues = cell => {
    const { baseUrl } = that.state;
    let merch_id = localStorage.getItem("merId");

    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_shipQueue/getAllQueues";
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          merch_id: merch_id
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
  pushQueues = allQueues => {
    var length = allQueues.length;
    var allQueuesList = [];

    var unpost = 0;
    var notReady = 0;
    var listed = 0;
    var readyToList = 0;
    var hold = 0;

    for (let i = 0; i < length; i++) {
      var status = allQueues[i].STATUS;
      if (status == "NOT READY") {
        notReady++;
      }
      if (status == "LISTED") {
        listed++;
      }
      if (status == "READY TO LIST") {
        readyToList++;
      }
      if (status == "HOLD") {
        hold++;
      }
      var cost = 0;
      var ebayPrice = 0;
      if (status == "UNPOST") {
        cost = "$" + allQueues[i].EBAY_PRICE;
        ebayPrice = "$" + 0;
        unpost++;
      } else {
        ebayPrice = "$" + allQueues[i].EBAY_PRICE;
        cost = "$" + 0;
      }
      allQueuesList.push({
        status: allQueues[i].STATUS,
        seed_id: allQueues[i].SEED_ID,
        ebay_price: ebayPrice,
        cost: cost,
        action: allQueues[i].LZ_BARCODE_MT_ID,
        description: allQueues[i].ITEM_TITLE,
        upc: allQueues[i].UPC,
        mpn: allQueues[i].MPN,
        manufacturer: allQueues[i].F_MANUFACTURE,
        created_at: allQueues[i].CREATED_AT,
        created_by: allQueues[i].CREATED_BY,
        cat_name: allQueues[i].CATEGORY_NAME,
        barcode_no: allQueues[i].BARCODE_NO,
        images: allQueues[i].BARCODE_NO
      });
    }

    this.setState({
      queueList: allQueuesList,
      notReady: notReady,
      listed: listed,
      readyToList: readyToList,
      hold: hold,
      unpost: unpost
    });
  };
  handleUnpostClick = () => {
    this.refs.status.applyFilter("UNPOST");
  };
  handleNotReadyClick = () => {
    this.refs.status.applyFilter("NOT READY");
  };
  handleReadyToListClick = () => {
    this.refs.status.applyFilter("READY TO LIST");
  };
  handleListedClick = () => {
    this.refs.status.applyFilter("LISTED");
  };
  handleHoldClick = () => {
    this.refs.status.applyFilter("HOLD");
  };
  handleAllClick = () => {
    this.refs.status.applyFilter("");
  };
  render() {
    const {
      queueList,
      notReady,
      listed,
      readyToList,
      hold,
      unpost
    } = this.state;
    const options = {
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
        <section className="content-header">
          <h1>
            Ship Queue<small>Control Panel</small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/welcom">
                <i className="fa fa-dashboard" /> Home
              </Link>
            </li>
            <li>Transaction Form</li>
            <li className="active">
              <Link to="/shipQueue">Ship Queue</Link>
            </li>
          </ol>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">Filters </h3>
                </div>
                <div className="box-body">
                  <div className="col-sm-12">
                    <br />
                    <div className="col-sm-12">
                      <label htmlFor="manufacturer" className="control-label">
                        Apply Filter:
                      </label>
                    </div>

                    <div className="col-sm-2">
                      <button
                        onClick={this.handleUnpostClick}
                        className="btn btn-danger"
                      >
                        UNPOST ({unpost})
                      </button>
                    </div>
                    <div className="col-sm-2">
                      <button
                        onClick={this.handleNotReadyClick}
                        className="btn btn-primary"
                      >
                        NOT READY ({notReady})
                      </button>
                    </div>
                    <div className="col-sm-2">
                      <button
                        onClick={this.handleListedClick}
                        className="btn btn-success"
                      >
                        LISTED ({listed})
                      </button>
                    </div>
                    <div className="col-sm-2">
                      <button
                        onClick={this.handleReadyToListClick}
                        className="btn btn-info"
                      >
                        READY TO LIST ({readyToList})
                      </button>
                    </div>
                    <div className="col-sm-2">
                      <button
                        onClick={this.handleHoldClick}
                        className="btn btn-warning"
                      >
                        HOLD ({hold})
                      </button>
                    </div>
                    <div className="col-sm-2">
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
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">Ship Queue </h3>
                </div>
                <div className="box-body">
                  <div className="col-sm-12">
                    <BootstrapTable
                      data={queueList}
                      hover
                      pagination
                      search
                      tableHeaderclassName="my-header-class"
                      columnWidth="100%"
                      options={options}
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
                          value: queueList.length
                        }
                      ]}
                    >
                      <TableHeaderColumn
                        dataField="action"
                        width="10%"
                        isKey={true}
                        dataFormat={actionFormatter}
                      >
                        Action
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="images"
                        width="15%"
                        dataFormat={imageView}
                        export={false}
                      >
                        Picture
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="status"
                        width="10%"
                        dataFormat={status}
                        ref="status"
                        filter={{ type: "RegexFilter" }}
                        dataSort={true}
                      >
                        Status
                      </TableHeaderColumn>
                      <TableHeaderColumn dataField="barcode_no" width="10%">
                        Barcode
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="ebay_price"
                        dataAlign="right"
                        width="10%"
                      >
                        Ebay Price
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="cost"
                        dataAlign="right"
                        width="10%"
                      >
                        Cost
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="upc"
                        width="10%"
                        dataFormat={upc_mpn}
                      >
                        <p style={{ color: "#226EC0" }}>MPN</p>
                        <br /> UPC
                      </TableHeaderColumn>
                      <TableHeaderColumn dataField="description" width="15%">
                        Description
                      </TableHeaderColumn>
                      <TableHeaderColumn dataField="manufacturer" width="10%">
                        Brand
                      </TableHeaderColumn>
                      <TableHeaderColumn dataField="created_at" width="10%">
                        Created At
                      </TableHeaderColumn>
                      <TableHeaderColumn dataField="created_by" width="10%">
                        Created By
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

export default ShipQueue;
