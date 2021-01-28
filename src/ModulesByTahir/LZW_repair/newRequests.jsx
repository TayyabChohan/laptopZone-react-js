import React, { Component } from "react";
import { connect } from "react-redux";
import { get_requests, giveRequestOffer } from "../action/getRequestsAction.js";
import ErrorMessage from "../../components/messages/ErrorMessage.js";
import AlertMessage from "../../components/messages/AlertMessage.js";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import Flatpickr from "react-flatpickr";
import $ from "jquery";
import "../CSS_Files/table.css";
var dateFormat = require("dateformat");
var that = "";
export class ActionFormatter extends Component {
  constructor(props) {
    super(props);
  }
  action = (cell, row) => {
    console.log(row);
    that.setState({
      selectedCell: cell,
      selectedRow: row
    });
  };
  render() {
    return (
      <React.Fragment>
        <button
          title="Give Offer"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#offerRequest"
          onClick={() => {
            this.action(this.props.cell, this.props.row);
          }}
          value={this.props.cell}
        >
          <span
            className="glyphicon glyphicon-retweet p-b-5"
            aria-hidden="true"
          />
        </button>
      </React.Fragment>
    );
  }
}

function actionFormatter(cell, row) {
  return <ActionFormatter cell={cell} row={row} />;
}

class NewRequests extends Component {
  constructor(props) {
    super(props);
    that = this;
    this.state = {
      allRequests: "",
      offer: "",
      TurnAroundTime: "",
      InternalRemarks: "",
      CustomerRemarks: "",
      selectedCell: [],
      selectedRow: [],
      date: new Date(),
      socket: null
    };
  }
  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentDidMount() {
    this.props.get_requests();
  }
  GiveOffer = () => {
    const {
      selectedCell,
      date,
      offer,
      TurnAroundTime,
      InternalRemarks,
      CustomerRemarks
    } = this.state;
    const data = {
      repaireMtId: selectedCell,
      offer: offer,
      TurnAroundTime: date,
      InternalRemarks: InternalRemarks,
      CustomerRemarks: CustomerRemarks
    };
    console.log(data);
    this.props.giveRequestOffer(data);
    $("#offerRequest").click();
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.LZW_requests !== this.props.LZW_requests &&
      this.props.LZW_requests !== ""
    ) {
      this.setState({
        allRequests: this.props.LZW_requests
      });
    }
  }

  render() {
    const { allRequests } = this.state;

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
          value: this.props.LZW_requests.length
        }
      ]
    };
    return (
      <React.Fragment>
        <section>
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <div className="box-header with-border">
                  <h3 className="box-title">LZW Repaire Detail</h3>
                </div>
                <div className="box-body">
                  <BootstrapTable
                    data={this.props.LZW_requests}
                    pagination
                    hover
                    search
                    tableHeaderclassName="my-header-class"
                    columnWidth="100%"
                    options={options}
                    // trClassName={trClassFormat}
                  >
                    <TableHeaderColumn
                      dataField="REPAIRE_MT_ID"
                      isKey={true}
                      width="7.7%"
                      dataFormat={actionFormatter}
                    >
                      Action
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="REPAIR_ID" width="7.7%">
                      REPAIR_ID
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="NAME" width="7.7%">
                      NAME
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="EMAIL" width="7.7%">
                      EMAIL
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="CONTACT_NO" width="7.7%">
                      CONTACT_NO
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="CUSTOMER_REMARKS"
                      width="7.7%"
                    >
                      CUSTOMER_REMARKS
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="PRODUCT_NAME" width="7.7%">
                      PRODUCT_NAME
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="BRAND_NAME" width="7.7%">
                      BRAND_NAME
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="SERIES_NAME" width="7.7%">
                      SERIES_NAME
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="MODEL_NAME" width="7.7%">
                      MODEL_NAME
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="OFFER" width="7.7%">
                      OFFER
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="TURN_AROUND_TIME"
                      width="7.7%"
                    >
                      TurnAroundTime
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="INTERNAL_REMARKS"
                      width="7.7%"
                    >
                      Int. Remarks
                    </TableHeaderColumn>
                  </BootstrapTable>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ErrorMessage />
        <AlertMessage />

        <div id="offerRequest" className="modal fade" role="dialog">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 className="modal-title">
                  Give Offer To:
                  {this.state.selectedRow.REPAIR_ID}
                </h4>
              </div>
              <div className="modal-body">
                <div className="form-group col-md-6">
                  <label>Offer:</label>
                  <input
                    type="number"
                    name="offer"
                    id="offer"
                    className="form-control"
                    onChange={this.handleOnChange}
                    value={this.state.offer}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Turn Around Time:</label>
                  {/* <input
                    type="text"
                    name="TurnAroundTime"
                    id="TurnAroundTime"
                    className="form-control"
                    onChange={this.handleOnChange}
                    value={this.state.TurnAroundTime}
                  /> */}
                  <Flatpickr
                    options={{
                      mode: "range",
                      dateFormat: "Y-m-d"
                    }}
                    value={this.state.date}
                    className="form-control"
                    onChange={date => {
                      this.setState({ date });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>Internal Remarks:</label>
                  <input
                    type="text"
                    name="InternalRemarks"
                    id="InternalRemarks"
                    className="form-control"
                    onChange={this.handleOnChange}
                    value={this.state.InternalRemarks}
                  />
                </div>
                <div className="form-group">
                  <label>Customer Remarks:</label>
                  <input
                    type="text"
                    name="CustomerRemarks"
                    id="CustomerRemarks"
                    className="form-control"
                    onChange={this.handleOnChange}
                    value={this.state.CustomerRemarks}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={this.GiveOffer}
                >
                  Give Offer
                </button>
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                  id="offerRequest"
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

const mapStateToProps = state => {
  return {
    LZW_requests: state.getRequestsReducer.LZW_requests
  };
};
export default connect(
  mapStateToProps,
  { get_requests, giveRequestOffer }
)(NewRequests);
