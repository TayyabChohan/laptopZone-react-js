import React, { Component } from "react";
import {
  BootstrapTable,
  TableHeaderColumn,
  Dropdown
} from "react-bootstrap-table";
import { Redirect } from "react-router-dom";
//import billingSetupReducer from "../billingReduderStore/Reducer/billingSetupReducer.jsx";
import Select from "react-select";
import { connect } from "react-redux";
//import {insertServiceRate} from '../actions/actionsjs';
import { upDateSerViceRate, getService,insertServiceRate , deleteServiceRate, getServiceRate } from "../../actions/actions.js";
import swal from "sweetalert";


const action = {
  insertServiceRate,
  getService,
  getServiceRate,
  deleteServiceRate,
  upDateSerViceRate
};

function actionFormatter(cell, row) {
  return (
    <div>
      <button
        className="btn btn-danger glyphicon glyphicon-trash"
        call="list"
        id="item_list"
        onClick={() => that.clickDelete(cell, row)}
      />
      <button
        type="button"
        className="btn btn-primary glyphicon glyphicon-tasks"
        data-toggle="modal"
        data-target="#myModal"
        onClick={() => that.clickUpdate(cell, row)}
      />
    </div>
  );
}

const Row_charge = (cell, row) => {
  let value = row.CHARGES.replace("$", "");
  return "$" + Number(value).toFixed(2);
};
var that = "";

class BillingRateSetup extends Component {
  constructor(props) {
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    super(props);
    that = this;
    this.state = {
      names: "",
      cost: "",
      serviceRate: [],
      selVal: [],
      error: null,
      isLoaded: true,
      baseUrl: finalurl,
      redirectToReferrer: false,
      error: false,
      dropValue: [],
      radio: "",
      selectServiceName: "",
      show: false,
      updatecost: "",
      ser_rate_id: "",
      isempty: "",
      charges: ""
    };
    this.clickDelete = this.clickDelete.bind(this);
    this.formHandler = this.formHandler.bind(this);
    this.clickSaveUpdate = this.clickSaveUpdate.bind(this);
    //this.handleModleOnsubmit = this.handleModleOnsubmit.bind(this);

    // this.clickUpdate= this.clickUpdate.bind(this);
  }
  clickDelete = (cell, row) => {
    // {if (window.confirm('Are you sure ?'))this.click('list')}
    swal({
      title: "Are you Sure?",
      text: "Once deleted, you will not be able to recover this Data!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        this.props.deleteServiceRate(cell);
      } else {
      }
    });
    // alert("Are You Sure! ");
  };

  clickSaveUpdate = id => {
    this.props.upDateSerViceRate(id, this.state.charges);
  };

  clickUpdate = (cell, row) => {
    var cost = row.CHARGES.replace("$", "");
    this.state.charges = cost;

    this.setState({
      ser_rate_id: row.SER_RATE_ID,
      updatecost: this.state.charges
    });
  };
  handleDrowpChange = selectServiceName => {
    this.setState({ selectServiceName: selectServiceName });

    //console.log(`Option Selected`, selectServiceName.value);
  };

  handleOnChange = event => {
    this.setState({
      radio: event.target.value
    });
  };
  formHandler = event => {
    let RoundOff = Number(event.target.value).toFixed(2);
    //console.log(RoundOff);
    this.setState(
      {
        names: event.target.value,
        charges: RoundOff
      },
      () => {
        if (this.state.names <= 0) {
          // alert('Please Enter Greater Then Zero Value');
          this.setState({
            ...this.state,
            names: ""
          });
        }
      }
    );
    //console.log(this.state.charges)
  };

  formHandlerCharges = e => {
    let RoundOff = Number(e.target.value).toFixed(2);
    // console.log(RoundOff)
    this.setState(
      {
        [e.target.name]: e.target.value,
        charges: RoundOff
      },
      () => {
        if (this.state.updatecost <= 0) {
          this.setState({
            ...this.state,
            updatecost: ""
          });
        }
      }
    );
    // console.log(this.state.charges)
  };

  handleChangebutton = event => {
    event.preventDefault();
    const { radio } = this.state;

    const data = {
      selectServiceName: this.state.selectServiceName.value,
      service_type: radio,
      service_Charges: this.state.charges,
      created_by: localStorage.getItem("userId")
    };
    // console.log(data);
    this.props.insertServiceRate(data);
    this.setState({
      names: ""
    });
  };

  componentWillMount() {
    if (localStorage.getItem("userName")) {
      console.log("setion find");
    } else {
      this.setState({ redirectToReferrer: true });
    }
  }
  componentDidMount() {
    this.props.getService();
    var userId = localStorage.getItem("userId");
    this.props.getServiceRate(userId);
  }

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
    const modelEnable = this.state.updatecost.value > 0;
    // console.log(this.state.selectServiceName)
    const enable = this.state.selectServiceName.value > 0;
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
        },
        {
          text: "All",
          value: this.props.serviceRate.length
        }
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

    //console.log(this.state.selectServiceName);
    const dropValue = [];
    // console.log(this.props.records)
    this.props.records.map(item =>
      dropValue.push({
        value: item.SERVICE_ID,
        label: item.SERVICE_DESC
      })
    );

    const { error, isLoaded, records, selVal, isempty } = this.state;
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
              Jeannie Services
              <small>Control panel</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <p>Home</p>
              </li>
              <li className="active">Jeannie Services</li>
            </ol>
          </section>

          <section className="content">
            <div className="row">
              <div className="modal fade" id="myModal" role="dialog">
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
                      <h4 className="modal-title">Update Charges</h4>
                    </div>
                    <form onSubmit={() => this.handleModleOnsubmit()}>
                      <div className="modal-body">
                        <h4> Charges</h4>

                        <input
                          type="number"
                          className="form-control"
                          name="updatecost"
                          onChange={this.formHandlerCharges}
                          value={this.state.updatecost}
                          placeholder="Cost"
                          id="cost"
                          required
                        />
                        {/* <input type="hidden" value={this.state.ser_rate_id} /> */}
                      </div>
                      <div className="modal-footer">
                        <button
                          type="submit"
                          className="btn btn-default"
                          data-dismiss="modal"
                          onClick={() =>
                            this.clickSaveUpdate(this.state.ser_rate_id)
                          }
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="btn btn-default"
                          data-dismiss="modal"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="col-sm-12">
                <div className="box">
                  <div className="box-header with-border">
                    {/* <div className='model'> */}

                    {/* </div> */}
                    <h3 className="box-title">Add Service Rate</h3>
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
                    <div className="col-sm-12">
                      <form onSubmit={this.handleChangebutton}>
                        <div className="col-sm-3">
                          <label>Service Name:</label>
                          <div
                            className="form-group has-feedback"
                            style={{ width: "50%" }}
                          >
                            <Select
                              id="servicetype"
                              defaultValue={dropValue[1]}
                              name="selectServiceName"
                              options={dropValue}
                              value={this.state.selectServiceName}
                              onChange={this.handleDrowpChange}
                              className="basic-single"
                              classNamePrefix="select"
                              isSearchable
                              required
                              select-option
                            

                              // formatGroupLabel={formatGroupLabel}
                            />
                          </div>
                        </div>

                        <div className="col-sm-3">
                          <label>Service Type:</label>
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
                              value="1"
                              onClick={this.handleOnChange}
                              required
                            />
                            <label
                              className="custom-control-label"
                              for="faultInline1"
                            >
                              Hourly
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
                              value="2"
                              onClick={this.handleOnChange}
                              required
                            />
                            <label
                              className="custom-control-label"
                              for="defaunline2"
                            >
                              BarCode Wise
                            </label>
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <label>Charges:</label>
                          <input
                            type="number"
                            className="form-control"
                            name="names"
                            onChange={this.formHandler}
                            value={this.state.names}
                            placeholder="Rate"
                            id="names"
                            required
                          />
                        </div>
                        <div className="col-sm-3">
                          <br />

                          <button
                            type="submit"
                            disabled={!enable}
                            className="btn btn-primary btn-md"
                            style={{ width: "50%" }}
                          >
                            {" "}
                            Save
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="box">
                  <br />

                  <div className="row">
                    <div className="col-sm-12">
                      <BootstrapTable
                        data={this.props.serviceRate}
                        // footerData={footerData}
                        // footer
                        pagination
                        search
                        options={options}
                        //totalRow={totalRow}
                        // insertRow
                        exportCSV
                        // deleteRow={true}
                        //selectRow={selectRowProp}
                        //options={options}
                      >
                        <TableHeaderColumn
                          width="16.66%"
                          export={false}
                          isKey={true}
                          dataFormat={actionFormatter}
                          dataField="SER_RATE_ID"
                        >
                          Action
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="16.66%"
                          dataSort={true}
                          dataField="SERVICE_DESC"
                        >
                          Service Name
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="16.66%"
                          dataSort={true}
                          dataField="SERVICE_TYPE"
                        >
                          Service Type
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="16.66%"
                          dataSort={true}
                          dataFormat={Row_charge}
                          dataField="CHARGES"
                        >
                          Charges{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="16.66%"
                          dataSort={true}
                          dataField="USER_NAME"
                        >
                          Created By
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="16.66%"
                          dataSort={true}
                          dataField="CREATED_DATE"
                        >
                          Date
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
}

const mapStateToProps = state => {
  return {
    records: state.billingSetupReducer.records,
    serviceRate: state.billingSetupReducer.serviceRate
    // error: state.billingSetupReducer.error,
    // open: state.billingSetupReducer.open
  };
};

export default connect(
  mapStateToProps,
  action
)(BillingRateSetup);
