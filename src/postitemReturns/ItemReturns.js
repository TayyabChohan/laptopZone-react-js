import React, { Component } from "react";
import {
  BootstrapTable,
  TableHeaderColumn,
  Dropdown
} from "react-bootstrap-table";
import $ from "jquery";
import Flatpickr from "react-flatpickr";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import swal from "sweetalert";
import { toastr } from "react-redux-toastr";

import {
  post_item_returns,
  insertedDate,
  process_Return,
  get_location
} from "../actions/ItemReturnsPostAction.js";
import { throws } from "assert";
import AlertMessage from "../components/messages/AlertMessage.js";
const action = {
  post_item_returns,
  insertedDate,
  process_Return,
  get_location
};

function actionFormatter(cell, row) {
  return (
    <div>
      <button
        className="btn btn-danger btn-xs"
        data-toggle="modal"
        data-target="#myModal"
        onClick={() => that.clickDetail(cell, row)}
      >
        {" "}
        Proceed Return
      </button>
    </div>
  );
}
var that = "";
class ItemReturns extends Component {
  constructor(props) {
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    super(props);

    this.state = {
      error: null,
      isLoaded: true,
      baseUrl: finalurl,
      redirectToReferrer: false,
      error: false,
      show: false,
      search: "",
      date: "",
      Remarks: "",
      Location: "",
      radioModel: "",
      returnId: ""
    };
    that = this;
    //that.clickDelete = that.clickDelete.bind(that);
  }

  clickDetail = (cell, row) => {
    console.log(row);
    this.setState({
      returnId: row.RETURNID
    });
  };
  handleOnChangeRadioModel = event => {
    this.setState({
      radioModel: event.target.value
    });
    //console.log(this.state.radioModel)
  };
  onInputHandlerModel = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleOnsubmit = e => {
    e.preventDefault();
    const searchdDate = this.state.date;
    //console.log(searchdDate);
    this.props.insertedDate(searchdDate);
  };
  componentDidMount() {
    this.props.post_item_returns();
  }
  componentWillMount() {
    if (sessionStorage.getItem("userName")) {
      console.log("setion find");
    } else {
      this.setState({ redirectToReferrer: true });
    }
  }
  handleModleOnsubmit = e => {
    e.preventDefault();
    const data = {
      radio_input: this.state.radioModel,
      Remarks_input: this.state.Remarks,
      location_input: $("#LocationId").val(),
      userId: localStorage.getItem("userId"),
      return_Id: this.state.returnId
    };
    //console.log(data);
    this.props.process_Return(data);
    $("#LocationId").val("");
    $("#defaultInline1").prop("checked", false);
    $("#defaultInline2").prop("checked", false);
    this.setState({
      radioModel: "",
      Remarks: "",
      location_input: ""
    });
  };

  customFunction = e => {
    var location_value = $("#LocationId").val();
    this.setState({
      Location: location_value
    });
    // alert("tayyab");
    // const bardcode = this.state.MasterBarcode;
    this.props.get_location(location_value);
  };
  renderShowsTotal(start, to, total) {
    return (
      <p style={{ color: "#696969" }}>
        From {start} to {to}, totals is {total}&nbsp;&nbsp;
      </p>
    );
  }
  render() {
    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: "/login" }} />;
    }

    const selectRowProp = {
      mode: "checkbox"
    };
    const options = {
      page: 1, // which page you want to show as default
      sizePerPageList: [
        {
          text: "5",
          value: 5
        },
        {
          text: "10",
          value: 10
        },
        {
          text: "15",
          value: 15
        },
        {
          text: "20",
          value: 20
        },
        {
          text: "25",
          value: 25
        }
        // {
        //   text: "All",
        //   value: this.props.templatedata.length
        // }
      ], // you can change the dropdown list for size per page
      sizePerPage: 10, // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 5, // the pagination bar size.
      prePage: "Prev", // Previous page button text
      nextPage: "Next", // Next page button text
      firstPage: "<<", // First page button text
      lastPage: ">>", // Last page button text
      prePageTitle: "Go to previous", // Previous page button title
      nextPageTitle: "Go to next", // Next page button title
      firstPageTitle: "Go to first", // First page button title
      lastPageTitle: "Go to Last", // Last page button title
      paginationShowsTotal: this.renderShowsTotal, // Accept bool or function
      paginationPosition: "both", // default is bottom, top and both is all available
      clearSearch: true
      // keepSizePerPageState: true //default is false, enable will keep sizePerPage dropdown state(open/clode) when external rerender happened
      // hideSizePerPage: true > You can hide the dropdown for sizePerPage
      // alwaysShowAllBtns: true // Always show next and previous button
      // withFirstAndLast: false > Hide the going to First and Last page button
      // hidePageListOnlyOnePage: true > Hide the page list if only one page.
    };

    const { error, isLoaded } = this.state;
    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: "/login" }} />;
    }
    if (error) {
      return <div> Error: {error.message}</div>;
    } else if (!isLoaded) {
      return (
        <section className="content-header">
          <h1>LOADING......</h1>
          <ol className="breadcrumb">
            <li>
              <a href="#">
                <i className="fa fa-dashboard" /> Home
              </a>
            </li>
            <li>
              <a href="#">Tables</a>
            </li>
            <li className="active">Unposted Items</li>
          </ol>
        </section>
      );
    } else {
      return (
        <React.Fragment>
          <section className="content-header">
            <h1>
              Item Returns
              <small>Control panel</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <p>Home</p>
              </li>
              <li className="active">Item Returns </li>
            </ol>
          </section>

          <section className="content">
            <div className="box">
              <div className="modal fade" id="myModal" role="dialog modal-lg">
                <div className="modal-dialog" style={{ width: "80%" }}>
                  <div className="modal-content">
                    <div className="modal-header">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                      />
                      <h4 className="modal-title">Item Status </h4>
                    </div>
                    <form onSubmit={this.handleModleOnsubmit}>
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
                                name="inlineDefaultRadiosExample"
                                value="discard"
                                //checked={this.state.radioModel == "Box"}
                                onClick={this.handleOnChangeRadioModel}
                                required
                              />
                              <label
                                className="custom-control-label"
                                for="faultInline1"
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
                                name="inlineDefaultRadiosExample"
                                value="release"
                                // checked={this.state.radioModel == "Envelope"}
                                onClick={this.handleOnChangeRadioModel}
                                required
                              />
                              <label
                                className="custom-control-label"
                                for="defaunline2"
                              >
                                Release
                              </label>
                            </div>
                          </div>

                          <div className="col-sm-2">
                            <label>Location:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="Location"
                              onBlur={this.customFunction}
                              // onChange={this.onInputHandlerModel}
                              // value={this.state.Location}
                              placeholder="Location"
                              id="LocationId"
                              required
                            />
                          </div>
                          <div className="col-sm-5">
                            <label>Remarks:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="Remarks"
                              onChange={this.onInputHandlerModel}
                              value={this.state.Remarks}
                              placeholder=" Remarks"
                              id="RemarksId"
                              required
                            />
                          </div>
                          <div className="col-sm-2">
                            <br />
                            <button
                              type="submit"
                              className="btn btn-primary"
                              // onClick={() =>
                              //   this.clickSavedata()
                              // }
                              style={{ width: "45%", marginTop: "5px" }}
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
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="box-header with-border">
                <h3 className="box-title">Search</h3>
                <div className="box-tools pull-right">
                  <button
                    type="button"
                    className="btn btn-box-tool"
                    data-widget="collapse"
                  >
                    <i className="fa fa-minus" />
                  </button>
                </div>
              </div>
              <div className="box-body">
                <form
                  onSubmit={this.handleOnsubmit}
                  ref={el => (this.myFormRef = el)}
                >
                  <div className="col-sm-12">
                    <div className="col-sm-2">
                      <label>Date Range</label>
                      <div className="input-group">
                        <Flatpickr
                          options={{
                            mode: "range",
                            // minDate: 'today',
                            dateFormat: "Y-m-d",
                            name: "name"
                          }}
                          value={this.state.date}
                          onChange={date => {
                            this.setState({ date });
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-sm-2">
                      <br />

                      <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: "45%", marginTop: "3px" }}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div
              className="row"
              style={{ height: "100%", overflow_x: "scroll" }}
            >
              <div className="col-sm-12">
                <div className="box">
                  <br />

                  <div className="row">
                    <div className="col-sm-12">
                      <BootstrapTable
                        striped
                        pagination
                        search
                        tableHeaderclassName="my-header-class"
                        columnWidth="100%"
                        options={options}
                        headerStyle={{ background: "#DCDCDC" }}
                        hover
                        //  cellEdit={cellEditProp}
                        //insertRow={ true }
                        data={this.props.itemReturnPostArray}
                        // height='100%' scrollTop={ 'Top' }
                        // height="150"
                        // scrollTop={"Top"}
                        // footerData={footerData}
                        // footer
                        // selectRow={selectRowProp}
                        // trClassName={this.trClassFormat}
                        //totalRow={totalRow}
                        // insertRow
                        //  exportCSV
                        // deleteRow={true}
                        //selectRow={selectRowProp}
                        // option={option}
                      >
                        <TableHeaderColumn
                          editable={false}
                          dataSort={true}
                          dataFormat={actionFormatter}
                          dataField="RETURNID"
                          width="6%"
                        >
                          Actions
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          editable={false}
                          dataSort={true}
                          dataField="EMPLOYEE_ID"
                          width="6%"
                        >
                          {" "}
                          Picture
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          editable={false}
                          dataSort={true}
                          dataField="BUYERLOGINNAME"
                          width="6%"
                        >
                          {" "}
                          Buyer Name
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          editable={false}
                          export={false}
                          dataField="ITEMID"
                          width="6%"
                        >
                          {" "}
                          Item Id{" "}
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          editable={false}
                          dataSort={true}
                          dataField="PASS_WORD"
                          width="6%"
                        >
                          Item Description
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          isKey={true}
                          editable={false}
                          dataSort={true}
                          dataField="TRANSACTIONID"
                          width="6%"
                        >
                          Transaction Id{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          editable={false}
                          ordering={true}
                          dataSort={true}
                          dataField="REASON"
                          tdStyle={{ whiteSpace: "normal" }}
                          width="6%"
                        >
                          Reason{" "}
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          editable={false}
                          ordering={true}
                          dataSort={true}
                          dataField="COMMENTS"
                          tdStyle={{ whiteSpace: "normal" }}
                          width="12%"
                        >
                          Comments{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          editable={false}
                          ordering={true}
                          dataSort={true}
                          dataField="CREATIONDATE"
                          width="6%"
                        >
                          Dated{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          editable={false}
                          ordering={true}
                          dataSort={true}
                          dataField="SELLERTOTALREFUND"
                          width="6%"
                        >
                          Amount{" "}
                        </TableHeaderColumn>
                      </BootstrapTable>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <AlertMessage />
        </React.Fragment>
      );
    }
  }
}

const mapsToprops = state => {
  return {
    itemReturnPostArray: state.ItemReturnsPostReducer.itemReturnPostArray
  };
};
export default connect(
  mapsToprops,
  action
)(ItemReturns);
