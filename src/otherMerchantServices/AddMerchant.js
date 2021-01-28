import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import swal from "sweetalert";
import Flatpickr from "react-flatpickr";
import dateFormat from "dateformat";
import Select from "react-select";
import { Button } from "react-bootstrap";
import {
  get_merchant_detail,
  get_merchant_City,
  get_merchant_Services_Type,
  insert_merchant_detail,
  update_merchant_detail,
  delete_merchant_detail
} from "../actions/addmerchatAction.js";

const action = {
  get_merchant_detail,
  get_merchant_City,
  get_merchant_Services_Type,
  insert_merchant_detail,
  update_merchant_detail,
  delete_merchant_detail
};
function actionFormatter(cell, row) {
  return (
    <div>
      {/* <button
        className="btn btn-danger glyphicon glyphicon-trash"
        call="list"
        id="item_list"
        onClick={() => that.clickDelete(cell, row)}
      /> */}
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

var that = "";

class AddMerchant extends Component {
  constructor(props) {
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    super(props);
    that = this;
    this.state = {
      names: "",
      records: [],
      error: null,
      isLoaded: true,
      baseUrl: finalurl,
      redirectToReferrer: false,
      error: false,
      MerchantName: "",
      BuisnessName: "",
      MerchantAddress: "",
      MerchantPhone: "",
      dateFrom: new Date(),
      dateto: new Date(),
      SelectServiceType: "",
      SelectCity: "",
      MerchantNameUpdate: "",
      BuisnessNameUpdate: "",
      MerchantAddressUpdate: "",
      MerchantPhoneUpdate: "",
      dateFromUpdate: "",
      datetoUpdate: "",
      SelectServiceTypeUpdate: "",
      SelectCityUpdate: "",
      MERCHANT_ID: "",
      fromdate: ""
    };
  }

  clickDelete = cell => {
    swal({
      title: "Are you Sure?",
      text: "Once deleted, you will not be able to recover this Data!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        this.props.delete_merchant_detail(cell);
      } else {
      }
    });
  };

  clickUpdate = (cell, row) => {
    const data = { value: row.CITY_ID, label: row.CITY_DESC };
    const serData = { value: row.SERVICE_ID, label: row.SERVICE_TYPE };
    //console.log(serData)
    this.setState({
      MERCHANT_ID: row.MERCHANT_ID,
      MerchantNameUpdate: row.CONTACT_PERSON,
      MerchantAddressUpdate: row.ADDRESS,
      BuisnessNameUpdate: row.BUISNESS_NAME,
      MerchantPhoneUpdate: row.CONTACT_NO,
      dateFromUpdate: (dateFormat(row.ACTIVE_FROM,"yyyy-mm-dd")),
      datetoUpdate:(dateFormat(row.ACTIVE_TO,"yyyy-mm-dd")),
      SelectServiceTypeUpdate: serData,
      SelectCityUpdate: data
    });
    
  };

  handleChangeOnSubmmitUpdate = e => {
    e.preventDefault();

    const data = {
      MerchantNameUpdate: this.state.MerchantNameUpdate,
      BuisnessNameUpdate: this.state.BuisnessNameUpdate,
      MerchantAddressUpdate: this.state.MerchantAddressUpdate,
      MerchantPhoneUpdate: this.state.MerchantPhoneUpdate,
      dateFromUpdate:dateFormat(this.state.dateFromUpdate[0], "dd-mmmm-yy"),
      datetoUpdate:dateFormat(this.state.datetoUpdate[0],"dd-mmmm-yy"),
      SelectServiceTypeUpdate: this.state.SelectServiceTypeUpdate.value,
      SelectCityUpdate: this.state.SelectCityUpdate.value,
      MERCHANT_ID: this.state.MERCHANT_ID
    };
    if (
      this.state.MerchantPhoneUpdate <= 0 ||
      this.state.MerchantPhoneUpdate < -1
    ) {
      alert("Merchant Phone is invalid");
      return false;
    }
    
    this.props.update_merchant_detail(data);
    this.setState({
      MerchantNameUpdate: "",
      BuisnessNameUpdate: "",
      MerchantAddressUpdate: "",
      MerchantPhoneUpdate: "",
      dateFromUpdate: "",
      datetoUpdate: "",
      SelectServiceTypeUpdate: "",
      SelectCityUpdate: ""
    });
    this.myFormRef.reset();
  };
  handleChangeOnSubmmit = e => {
    e.preventDefault();

    const data = {
      MerchantName: this.state.MerchantName,
      BuisnessName: this.state.BuisnessName,
      MerchantAddress: this.state.MerchantAddress,
      MerchantPhone: this.state.MerchantPhone,
      dateFrom: dateFormat(this.state.dateFrom[0], "dd-mmmm-yy"),
      dateto: dateFormat(this.state.dateto[0], "dd-mmmm-yy"),
      SelectServiceType: this.state.SelectServiceType,
      SelectCity: this.state.SelectCity.value,

      created_by: localStorage.getItem("userId")
    };
    //console.log(data);
    if (this.state.MerchantPhone <= 0 || this.state.MerchantPhone < -1) {
      alert("Merchant Phone is invalid");
      return false;
    }
    this.props.insert_merchant_detail(data);
    this.setState({
      MerchantName: "",
      BuisnessName: "",
      MerchantAddress: "",
      MerchantPhone: "",
      dateFrom: "",
      dateto: "",
      SelectCity: "",
      SelectServiceType: ""
    });

    this.myFormRef.reset();
  };
  handleChangeSelectCity = SelectCity => {
    this.setState({
      SelectCity: SelectCity
    });
  };

  formHandlerUpdate = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleChangeSelectCityUpdate = SelectCityUpdate => {
    this.setState({
      SelectCityUpdate: SelectCityUpdate
    });
  };
  handleChangeServiceTypeUpdate = SelectServiceTypeUpdate => {
    this.setState({
      SelectServiceTypeUpdate: SelectServiceTypeUpdate
    });
  };
  formHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleChangeServiceType = SelectServiceType => {
    this.setState({
      SelectServiceType: SelectServiceType
    });
  };
  componentDidMount() {
    this.props.get_merchant_detail();
    this.props.get_merchant_City();
    this.props.get_merchant_Services_Type();
  }
  componentWillMount() {
    if (sessionStorage.getItem("userName")) {
      console.log("setion find");
    } else {
      this.setState({ redirectToReferrer: true });
    }
  }

  renderShowsTotal(start, to, total) {
    return (
      <p style={{ color: "#696969" }}>
        From {start} to {to}, totals is {total}&nbsp;&nbsp;
      </p>
    );
  }
  render() {
   // console.log(this.state.SelectServiceTypeUpdate.value)
     //console.log(this.props.merchantDetailArray);
    // console.log(this.props.merchantCityArray);
    // console.log(this.props.merchantServiceTypeArray);
    const enable =
      this.stateSelectServiceType != "" && this.state.SelectCity != "";
    const enable1 =
      this.SelectServiceTypeUpdate != "" && this.state.SelectCityUpdate != "";

    const SelectServiceTypevalueUpdate = [];
    this.props.merchantServiceTypeArray.map(item =>
      SelectServiceTypevalueUpdate.push({
        value: item.SERVICE_ID,
        label: item.SERVICE_DESC
      })
    );

    const SelectServiceTypevalue = [];
    this.props.merchantServiceTypeArray.map(item =>
      SelectServiceTypevalue.push({
        value: item.SERVICE_ID,
        label: item.SERVICE_DESC
      })
    );

    const SelectCityvalueUpdate = [];
    this.props.merchantCityArray.map(item =>
      SelectCityvalueUpdate.push({
        value: item.CITY_ID,
        label: item.CITY_DESC
      })
    );

    const SelectCityvalue = [];
    this.props.merchantCityArray.map(item =>
      SelectCityvalue.push({
        value: item.CITY_ID,
        label: item.CITY_DESC
      })
    );

    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: "/login" }} />;
    }
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
          value: this.props.merchantDetailArray.length
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
    //  console.log(this.state);

    const { error, isLoaded, records } = this.state;
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
              Merchant Detail
              <small>Control panel</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <p>Home</p>
              </li>
              <li className="active">Add Merchan</li>
            </ol>
          </section>

          <section className="content">
            <div className="row">
              <div class="modal fade" id="myModal" role="dialog">
                <div class="modal-dialog" style={{ width: "80%" }}>
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">
                        &times;
                      </button>
                      <h4 class="modal-title">Update Merchan</h4>
                    </div>
                    <div class="modal-body">
                      <form
                        onSubmit={this.handleChangeOnSubmmitUpdate}
                        ref={el => (this.myFormRef = el)}
                      >
                        <div className="col-sm-12">
                          <div className="col-sm-3">
                            <label>Merchant Name:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="MerchantNameUpdate"
                              onChange={this.formHandlerUpdate}
                              value={this.state.MerchantNameUpdate}
                              placeholder="Merchant Name"
                              id="MerchantNameUpdateId"
                              required
                            />
                          </div>
                          <div className="col-sm-3">
                            <label>Buisness Name:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="BuisnessNameUpdate"
                              onChange={this.formHandlerUpdate}
                              value={this.state.BuisnessNameUpdate}
                              placeholder="Buisness Name"
                              id="BuisnessNameUpdateId"
                              required
                            />
                          </div>
                          <div className="col-sm-3">
                            <label>Merchant Address:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="MerchantAddressUpdate"
                              onChange={this.formHandlerUpdate}
                              value={this.state.MerchantAddressUpdate}
                              placeholder="Merchant Address"
                              id="MerchantAddressUpdateId"
                              required
                            />
                          </div>
                          <div className="col-sm-3">
                            <label>Merchant Phone:</label>
                            <input
                              type="number"
                              className="form-control"
                              name="MerchantPhoneUpdate"
                              onChange={this.formHandlerUpdate}
                              value={this.state.MerchantPhoneUpdate}
                              placeholder="Merchant Phone"
                              id="MerchantPhoneUpdateId"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-sm-12">
                          <div className="col-sm-2">
                            <br />
                            <div className="form-group has-feedback">
                              <label htmlFor="ActiveFromdate">
                                Active From:
                              </label>
                              <div className="input-group">
                                <Flatpickr
                                  options={{
                                    minDate: "today",
                                    dateFormat: "Y-m-d ",
                                    name: "dateFromUpdate",
                                     //defaultDate:this.state.dateFromUpdate
                                    //selectedDates:this.state.dateFromUpdate
                                  }}
                                  value={this.state.dateFromUpdate}
                                  onChange={dateFromUpdate => {
                                    this.setState({ dateFromUpdate });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-2">
                            <br />
                            <div className="form-group has-feedback">
                              <label htmlFor="ActiveTodate">Active To:</label>
                              <div className="input-group">
                                <Flatpickr
                                  options={{
                                    minDate: "today",
                                    dateFormat: "Y-m-d"
                                  }}
                                  value={this.state.datetoUpdate}
                                  onChange={datetoUpdate => {
                                    this.setState({ datetoUpdate });
                                  }}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-2">
                            <br />
                            <div className="form-group">
                              <label for="ServiceType">Service Type</label>
                              <div
                                className="form-group has-feedback"
                                id="ServiceType"
                              >
                                <Select
                                  id="ServiceTypeId"
                                  isMulti
                                  name="SelectServiceTypeUpdate"
                                  options={SelectServiceTypevalueUpdate}
                                  value={this.state.SelectServiceTypeUpdate}
                                  onChange={this.handleChangeServiceTypeUpdate}
                                  className="basic-select"
                                  classNamePrefix="select"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-4">
                            <br />
                            <div className="form-group">
                              <label for="Cityname">City</label>
                              <div
                                className="form-group has-feedback"
                                id="Cityname"
                              >
                                <Select
                                  id="CitynameId"
                                  // isMulti
                                  name="SelectCityUpdate"
                                  options={SelectCityvalueUpdate}
                                  value={this.state.SelectCityUpdate}
                                  onChange={this.handleChangeSelectCityUpdate}
                                  className="basic-select"
                                  classNamePrefix="select"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-2">
                            <br />
                            <br />
                            <Button
                              type="submit"
                              className="btn btn-primary btn-md"
                              style={{ width: "55%", marginTop: "5px" }}
                              disabled={!enable1}
                            >
                              {" "}
                              Update
                            </Button>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-default"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-12">
                <div className="box">
                  <div className="box-header with-border">
                    <h3 className="box-title">Add Merchan</h3>
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
                    <form onSubmit={this.handleChangeOnSubmmit}>
                      <div className="col-sm-12">
                        <div className="col-sm-3">
                          <label>Merchant Name:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="MerchantName"
                            onChange={this.formHandler}
                            value={this.state.MerchantName}
                            placeholder="Merchant Name"
                            id="MerchantNameId"
                            required
                          />
                        </div>
                        <div className="col-sm-3">
                          <label>Buisness Name:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="BuisnessName"
                            onChange={this.formHandler}
                            value={this.state.BuisnessName}
                            placeholder="Buisness Name"
                            id="BuisnessNameId"
                            required
                          />
                        </div>
                        <div className="col-sm-3">
                          <label>Merchant Address:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="MerchantAddress"
                            onChange={this.formHandler}
                            value={this.state.MerchantAddress}
                            placeholder="Merchant Address"
                            id="MerchantAddressId"
                            required
                          />
                        </div>
                        <div className="col-sm-3">
                          <label>Merchant Phone:</label>
                          <input
                            type="number"
                            className="form-control"
                            name="MerchantPhone"
                            onChange={this.formHandler}
                            value={this.state.MerchantPhone}
                            placeholder="Merchant Phone"
                            id="MerchantPhoneId"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-sm-12">
                        <div className="col-sm-2">
                          <div className="form-group has-feedback">
                            <br />
                            <label htmlFor="ActiveTodate">Active From:</label>
                            <div className="input-group">
                              <Flatpickr
                                options={{
                                  minDate: "today",

                                  dateFormat: "Y-m-d"
                                }}
                                value={this.state.dateFrom}
                                onChange={dateFrom => {
                                  this.setState({ dateFrom });
                                }}
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-2">
                          <br />
                          <div className="form-group has-feedback">
                            <label htmlFor="ActiveTodate">Active To:</label>
                            <div className="input-group">
                              <Flatpickr
                                options={{
                                  minDate: "today",
                                  dateFormat: "Y-m-d"
                                }}
                                value={this.state.dateto}
                                onChange={dateto => {
                                  this.setState({ dateto });
                                }}
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-2">
                          <br />
                          <div className="form-group">
                            <label for="ServiceType">Service Type</label>
                            <div
                              className="form-group has-feedback"
                              id="ServiceType"
                            >
                              <Select
                                id="ServiceTypeId"
                                isMulti
                                name="SelectServiceType"
                                options={SelectServiceTypevalue}
                                value={this.state.SelectServiceType}
                                onChange={this.handleChangeServiceType}
                                className="basic-select"
                                classNamePrefix="select"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <br />
                          <div className="form-group">
                            <label for="Cityname">City</label>
                            <div
                              className="form-group has-feedback"
                              id="Cityname"
                            >
                              <Select
                                id="CitynameId"
                                // isMulti
                                name="SelectCity"
                                options={SelectCityvalue}
                                value={this.state.SelectCity}
                                onChange={this.handleChangeSelectCity}
                                className="basic-select"
                                classNamePrefix="select"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-2">
                          <br />
                          <br />
                          <Button
                            type="submit"
                            className="btn btn-primary btn-md"
                            style={{ width: "55%", marginTop: "5px" }}
                            disabled={!enable}
                          >
                            {" "}
                            Save
                          </Button>
                        </div>
                      </div>
                    </form>
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
                        data={this.props.merchantDetailArray}
                        // footerData={footerData}
                        // footer
                        pagination
                        search
                        options={options}

                        // deleteRow={true}
                        //selectRow={selectRowProp}
                        //options={options}
                      >
                        <TableHeaderColumn
                          width="8%"
                          export={false}
                          isKey={true}
                          dataFormat={actionFormatter}
                          dataField="MERCHANT_ID"
                        >
                          Action
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="8%"
                          dataSort={true}
                          dataField="CONTACT_PERSON"
                        >
                          Merchant Name
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="8%"
                          dataSort={true}
                          dataField="MERCHANT_CODE"
                        >
                          Merchant Code{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="8%"
                          dataSort={true}
                          dataField="BUISNESS_NAME"
                        >
                          Merchant Buisness
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          width="8%"
                          export={false}
                          //dataFormat={actionFormatter}
                          dataField="SERVICE_TYPE"
                        >
                          Service Type
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="8%"
                          dataSort={true}
                          dataField="CITY_DESC"
                        >
                          City
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="8%"
                          dataSort={true}
                          dataField="STATE_DESC"
                        >
                          State{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="8%"
                          dataSort={true}
                          dataField="CONTACT_NO"
                        >
                          Contact #
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          width="8%"
                          export={false}
                          //dataFormat={actionFormatter}
                          dataField="ADDRESS"
                        >
                          Adress
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="13%"
                          dataSort={true}
                          dataField="ACTIVE_FROM"
                        >
                          Active From
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="8%"
                          dataSort={true}
                          dataField="ACTIVE_TO"
                        >
                          Active To{" "}
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
    merchantDetailArray: state.addmerchantReducer.merchantDetailArray,
    merchantCityArray: state.addmerchantReducer.merchantCityArray,
    merchantServiceTypeArray: state.addmerchantReducer.merchantServiceTypeArray
  };
};

export default connect(
  mapStateToProps,
  action
)(AddMerchant);
