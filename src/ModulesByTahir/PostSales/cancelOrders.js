import React, { Component } from "react";
import { ToastsContainer, ToastsStore } from "react-toasts";
import { Link, Redirect } from "react-router-dom";
import $ from "jquery";
import swal from "sweetalert";
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
  approveOrder = (cell, row) => {
    that.setState({
      selectedRow: row,
      selectedCell: cell
    });
  };
  render() {
    return (
      <React.Fragment>
        <div>
          {this.props.row.CANCEL_STATE == "CANCEL REQUESTED" ||
          this.props.row.CANCEL_STATE == "APPROVAL PENDING" ? (
            <button
              type="button"
              title="Approve Cancellation"
              name="approve"
              data-toggle="modal"
              data-target="#discard_release_barcode"
              id="approve"
              className="btn btn-sm btn-danger fa fa-trash-o"
              onClick={() => this.approveOrder(this.props.cell, this.props.row)}
            />
          ) : (
            <button
              type="button"
              title="Approve Cancellation Approved"
              name="approved"
              className="btn btn-sm btn-success fa fa-tick"
            >
              APPROVED
            </button>
          )}
        </div>
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

function barcode_view(cell, row) {
  return (
    <div>
      {row.EBAY_ITEM_ID ? (
        <a
          href={"https://www.ebay.com/itm/" + row.EBAY_ITEM_ID}
          target="_blank"
        >
          <b>EBAY ID: </b>
          {row.EBAY_ITEM_ID}
        </a>
      ) : (
        <button className="btn btn-warning btn-xs">Not Listed</button>
      )}
      <br />
      <b>BARCODE: </b>
      {cell ? cell : "Order Id with this barcode not found"}
    </div>
  );
}
function descriptionMpnUpc(cell, row) {
  return (
    <React.Fragment>
      <p style={{ color: "green" }}>
        <b>MPN: </b>
        {cell}
      </p>
      <br />
      <p style={{ color: "#226EC0" }}>
        <b>MANUFACTURER: </b>
        {row.BRAND}
      </p>
      <br />
      <p>
        <b>TITLE:</b>
        {row.DESCR}
      </p>
    </React.Fragment>
  );
}
class CancelOrders extends Component {
  constructor(props) {
    super(props);
    that = this;
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    this.state = {
      baseUrl: finalurl,
      cancelOrders: [],
      images: [],
      selectedRow: "",
      selectedCell: "",
      radioModel: "",
      Remarks: ""
    };
  }
  handleOnChangeRadioModel = event => {
    this.setState({
      radioModel: event.target.value
    });
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  componentWillMount() {
    this.getCancellationsFromEbay();
  }
  getCancellationsFromEbay = () => {
    var accountId = this.props.account_id;
    var userId = localStorage.getItem("userId");
    $.LoadingOverlay("show");
    let insertUrl =
      this.state.baseUrl +
      "/laptopzone/reactcontroller/c_searchOrder/getCancellationsFromEbay";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          accountId: accountId,
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
        if (result.found) {
          this.setState({
            cancelOrders: result.cancellations,
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

  handleModleOnsubmit = e => {
    e.preventDefault();
    const { selectedRow, radioModel, Remarks } = this.state;
    var userId = localStorage.getItem("userId");
    var cancel_id = selectedRow.CANCELLATION_ID;
    var account_id = selectedRow.ACCOUNT_ID;
    var ebay_cancel_id = selectedRow.EBAY_CANCEL_ID;
    var cancel_status = selectedRow.CANCEL_STATUS;

    if (!radioModel) {
      notify("error", "Please select an option");
      return false;
    }

    $.LoadingOverlay("show");
    let insertUrl =
      this.state.baseUrl +
      "/laptopzone/reactcontroller/c_searchOrder/approveCancellation";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          cancel_id: cancel_id,
          account_id: account_id,
          ebay_cancel_id: ebay_cancel_id,
          cancel_status: cancel_status,
          radioModel: radioModel,
          Remarks: Remarks,
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
        if (result.status) {
          $("#closeModal").click();
          this.getCancellationsFromEbay();
        } else {
          notify("error", result.message);
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };
  cancelStatus = () => {
    this.refs.cancel_status.applyFilter("APPROVE PENDING");
    this.refs.processed.applyFilter("");
  };
  approved = () => {
    this.refs.processed.applyFilter("APPROVED");
    this.refs.cancel_status.applyFilter("");
  };
  pending = () => {
    this.refs.processed.applyFilter("PENDING");
    this.refs.cancel_status.applyFilter("");
  };
  handleAllClick = () => {
    this.refs.cancel_status.applyFilter("");
    this.refs.processed.applyFilter("");
  };
  render() {
    const { cancelOrders } = this.state;
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
          value: cancelOrders.length
        }
      ]
    };
    return (
      <React.Fragment>
        <div className="col-sm-3">
          <button onClick={this.cancelStatus} className="btn btn-success">
            PENDING
          </button>
        </div>
        <div className="col-sm-3">
          <button onClick={this.approved} className="btn btn-info">
            PROCESSED
          </button>
        </div>
        <div className="col-sm-3">
          <button onClick={this.pending} className="btn btn-primary">
            NOT PROCESSED
          </button>
        </div>
        <div className="col-sm-3">
          <button onClick={this.handleAllClick} className="btn btn-default">
            Show All ({cancelOrders.length})
          </button>
        </div>
        <div>
          <BootstrapTable
            data={cancelOrders}
            pagination
            search
            tableHeaderClass="add-barcodes"
            tableBodyClass="add-barcodes"
            columnWidth="100%"
            options={options}
          >
            <TableHeaderColumn
              dataField="CANCELLATION_ID"
              width="10%"
              dataFormat={actionFormatter}
            >
              Action
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="CANCELLATION_ID"
              width="10%"
              dataFormat={imageView}
            >
              Picture
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="BARCODE_NO"
              isKey={true}
              width="10%"
              dataFormat={barcode_view}
            >
              <p style={{ color: "#226EC0" }}>EBAY ID</p>
              <br />
              BARCODE
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="MPN"
              dataFormat={descriptionMpnUpc}
              width="10%"
            >
              <br /> <p style={{ color: "green" }}>MPN</p>
              <p style={{ color: "#226EC0" }}>MANUFACTURER</p>
              <br />
              TITLE
              <br />
            </TableHeaderColumn>
            <TableHeaderColumn dataField="EBAY_CANCEL_ID" width="10%">
              EBAY CANCELLATION ID
            </TableHeaderColumn>
            <TableHeaderColumn dataField="REQUESTOR_TYPE" width="10%">
              REQUESTOR TYPE
            </TableHeaderColumn>
            <TableHeaderColumn dataField="CANCEL_STATE" width="10%">
              CANCEL STATE
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="CANCEL_STATUS"
              width="10%"
              ref="cancel_status"
              filter={{ type: "RegexFilter" }}
            >
              CANCEL STATUS
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="STATUS"
              width="10%"
              ref="processed"
              filter={{ type: "RegexFilter" }}
              hidden
              style={{ display: "none" }}
            />
            <TableHeaderColumn dataField="CANCEL_REASON" width="10%">
              CANCEL REASON
            </TableHeaderColumn>
            <TableHeaderColumn dataField="CANCEL_CLOSE_REASON" width="10%">
              CANCEL CLOSE REASON
            </TableHeaderColumn>
            <TableHeaderColumn dataField="PAYMENT_STATUS" width="10%">
              PAYMENT STATUS
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
        <div
          className="modal fade"
          id="discard_release_barcode"
          role="dialog modal-lg"
        >
          <div className="modal-dialog" style={{ width: "80%" }}>
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" />
                <h4 className="modal-title">Item Status </h4>
              </div>
              <form id="statusCheck" onSubmit={this.handleModleOnsubmit}>
                <div className="modal-body">
                  <div className="col-sm-12">
                    <div className="col-sm-2">
                      <label>Status:</label>
                      <br />
                      <div
                        className="custom-control custom-radio custom-control-inline"
                        style={{ display: "inline" }}
                      >
                        <input
                          type="radio"
                          className="custom-control-input"
                          id="defaultInline1"
                          name="defaultInline"
                          value="discard"
                          onClick={this.handleOnChangeRadioModel}
                          required
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="faultInline1"
                        >
                          Discard
                        </label>
                      </div>
                      &nbsp;&nbsp;&nbsp;
                      <div
                        className="custom-control custom-radio custom-control-inline"
                        style={{ display: "inline" }}
                      >
                        <input
                          type="radio"
                          className="custom-control-input"
                          id="defaultInline2"
                          name="defaultInline"
                          value="release"
                          onClick={this.handleOnChangeRadioModel}
                          required
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="defaunline2"
                        >
                          Release
                        </label>
                      </div>
                    </div>
                    <div className="col-sm-5">
                      <label>Remarks:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="Remarks"
                        onChange={this.handleChange}
                        value={this.state.Remarks}
                        placeholder=" Remarks"
                        id="RemarksId"
                      />
                    </div>
                    <br />
                    <div className="col-sm-2">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: "45%", marginTop: "3px" }}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                    id="closeModal"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CancelOrders;
