import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import $ from "jquery";
import Flatpickr from "react-flatpickr";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
//import Select from "react-select";
import swal from "sweetalert";
import { toastr } from "react-redux-toastr";
import Select from "react-select";
import PhoneInput, { formatPhoneNumber } from "react-phone-number-input";
import AlertMessage from "../../components/messages/AlertMessage.js";
import dateFormat from "dateformat";
import {
  get_merchant_City,
  form_state,
  call_log_save,
  call_log_save_all,
  Get_State_single,
  delete_log,
  update_call_log,
  Get_City_single
} from "../../actions/calllogAction.js";

const action = {
  get_merchant_City,
  form_state,
  call_log_save,
  call_log_save_all,
  Get_State_single,
  delete_log,
  update_call_log,
  Get_City_single
};

function actionFormatter(cell, row) {
  return (
    <div>
      <button
        className="btn btn-danger glyphicon glyphicon-trash"
        call="list"
        id="item_list"
        onClick={() => that.clickDelete(cell, row)}
      />{" "}
      &nbsp; &nbsp; &nbsp;
      <button
        className="btn btn-warning glyphicon glyphicon-pencil"
        call="list"
        title="Upadte"
        data-toggle="modal"
        data-target="#myModal"
        onClick={() => that.clickUpdate(cell, row)}
      />
    </div>
  );
}
var that = "";
class CallLog extends Component {
  constructor(props) {
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    super(props);

    this.state = {
      error: null,
      isLoaded: true,
      baseUrl: finalurl,
      redirectToReferrer: false,
      date: new Date(),
      Adress: "",
      name: "",
      ContactNumber: "",
      Citydrop: "",
      StateDrop: "",
      Type_Drop: { value: "sell", label: "Sell" },
      Sourcedrop: { value: "gmb", label: "GMB" },
      Remarks: "",
      Description: "",
      ContactNumber_update: "",
      name_update: "",
      Sourcedrop_update: "",
      Type_Drop_update: "",
      Description_update: "",
      Adress_update: "",
      Citydrop_update: "",
      StateDrop_update: "",
      date_update: "",
      Remarks_update: "",
      LOG_ID: "",
      Price_update: "",
      Price: "",
      check: false
    };
    that = this;
  }

  handleOnChangeRadioSearch = e => {
    this.setState({
      redioSearch: e.target.value
    });
  };
  clickDelete = (cell, row) => {
    swal({
      title: "Are You Sure",
      text: "To Delete this data?",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        this.props.delete_log(cell);
      } else {
      }
    });
  };
  clickUpdate = (cell, row) => {
    console.log(row);
    const data_state = { value: row.STATE_ID, label: row.STATE_DESC };
    // const data_city = { value: row.CITY_ID, label: row.CITY_DESC };

    const data_city = [];
    this.props.merchantCityArray.filter(item => {
      return data_city.push({
        value: item.CITY_ID,
        label: item.CITY_DESC
      });
    });
    const data = this.props.call_log_array.filter(
      item => item.LOG_ID == row.LOG_ID
    );
    // console.log(data)
    const Data_type = {
      value: data[0].LOG_ID,
      label: data[0].CALL_TYPE
    };

    // console.log(data)
    const Data_source = {
      value: data[0].LOG_ID,
      label: data[0].CALL_SOURCE
    };
    this.setState({
      LOG_ID: row.LOG_ID,
      ContactNumber_update: row.CONTACT_NO,
      name_update: row.NAME,
      Sourcedrop_update: Data_source,
      Type_Drop_update: Data_type,
      Description_update: row.ITEM_DESC,
      Adress_update: row.ADDRESS,
      Citydrop_update: data_city,
      StateDrop_update: data_state,
      date_update: dateFormat(row.CALL_DATE, "yyyy-mm-dd HH:MM:ss"),
      Remarks_update: row.REMARKS,
      Price_update: row.PRICE
    });
  };
  handleOnsubmit = e => {
    e.preventDefault();
    const data = {
      name: this.state.name,
      date: dateFormat(this.state.date, "yyyy-mm-dd HH:MM:ss"),
      contact:
        this.state.ContactNumber &&
        formatPhoneNumber(this.state.ContactNumber, "National"),
      Sourcedrop: this.state.Sourcedrop.value,
      StateDrop: this.state.StateDrop[0]
        ? this.state.StateDrop[0].value
        : this.state.StateDrop.value,
      Type_Drop: this.state.Type_Drop.value,
      Citydrop: this.state.Citydrop[0]
        ? this.state.Citydrop[0].value
        : this.state.Citydrop.value,
      Remarks: this.state.Remarks,
      Description: this.state.Description,
      userid: localStorage.getItem("userId"),
      Adress: this.state.Adress,
      Price: this.state.Price
    };
    console.log(data);
    this.props.call_log_save(data);
    this.setState({
      // date: "",
      Adress: "",
      name: "",
      ContactNumber: "",
      Remarks: "",
      Description: "",
      Price: ""
    });
  };
  closeModel_resetState = e => {
    //$('#myModal').modal('hide')
    $("#myModal .close").click();
    $("#statusCheck input[type=radio]").prop("checked", false);
  };
  onHandletDrop_source = Sourcedrop => {
    this.setState({
      Sourcedrop: Sourcedrop
    });
  };
  onHandletDrop_source_update = Sourcedrop_update => {
    this.setState({
      Sourcedrop_update: Sourcedrop_update
    });
  };

  onHandletDrop_city = Citydrop => {
    this.setState({
      Citydrop: Citydrop
    });
  };
  onHandletDrop_city_update = Citydrop_update => {
    this.setState({
      Citydrop_update: Citydrop_update
    });
  };
  onHandletDrop_state = StateDrop => {
    this.setState({
      StateDrop: StateDrop
    });
  };
  onHandletDrop_state_update = StateDrop_update => {
    this.setState({
      StateDrop_update: StateDrop_update
    });
  };

  onHandletDrop_type = Type_Drop => {
    this.setState({
      Type_Drop: Type_Drop
    });
  };

  onHandletDrop_type_update = Type_Drop_update => {
    this.setState({
      Type_Drop_update: Type_Drop_update
    });
  };
  formHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  formHandler_update = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    this.props.get_merchant_City();
    this.props.call_log_save_all();
    this.props.Get_State_single();
    this.props.Get_City_single();
  }
  handleModleOnsubmit_update = e => {
    e.preventDefault();
    const data = {
      ContactNumber_update: this.state.ContactNumber_update,
      name_update: this.state.name_update,
      Sourcedrop_update: this.state.Sourcedrop_update.label,
      Type_Drop_update: this.state.Type_Drop_update.label,
      Description_update: this.state.Description_update,
      Adress_update: this.state.Adress_update,
      Citydrop_update: this.state.Citydrop_update,
      Citydrop_update1: this.state.Citydrop_update.label,
      StateDrop_update: this.state.StateDrop_update,
      StateDrop_update1: this.state.StateDrop_update.label,
      date_update: dateFormat(this.state.date_update, "yyyy-mm-dd HH:MM:ss"),
      Remarks_update: this.state.Remarks_update,
      userid: localStorage.getItem("userId"),
      LOG_ID: this.state.LOG_ID,
      Price_update: this.state.Price_update
    };
    console.log(data);
    this.props.update_call_log(data);
  };
  componentWillMount() {
    if (localStorage.getItem("userName")) {
      console.log("setion find");
    } else {
      this.setState({ redirectToReferrer: true });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.Get_City_singleArray !== this.props.Get_City_singleArray &&
      this.props.state_pros_array !== ""
    ) {
      const city = this.props.Get_City_singleArray.filter(
        item => item.CITY_ID == this.props.Get_City_singleArray.CITY_ID
      );
      const default_city = [];
      city.map(item => {
        default_city.push({
          value: item.CITY_ID,
          label: item.CITY_DESC
        });
      });
    }
    if (
      prevProps.Get_City_singleArray !== this.props.Get_City_singleArray &&
      this.props.Get_City_singleArray !== ""
    ) {
      const default_buyer_city = [];
      default_buyer_city.push({
        value: this.props.Get_City_singleArray[235].CITY_ID,
        label: this.props.Get_City_singleArray[235].CITY_DESC
      });

      this.setState({
        Citydrop: default_buyer_city
      });
    }
    if (
      prevState.Citydrop !== this.state.Citydrop &&
      this.state.Citydrop !== ""
    ) {
      const data = {
        Citydrop: this.state.Citydrop[0]
          ? this.state.Citydrop[0]
          : this.state.Citydrop
      };

      this.props.form_state(data);
    }
    if (
      prevProps.state_pros_array !== this.props.state_pros_array &&
      this.props.state_pros_array !== ""
    ) {
      const buyer_state = [];
      buyer_state.push({
        value: this.props.state_pros_array[0].STATE_ID,
        label: this.props.state_pros_array[0].STATE_DESC
      });
      this.setState({
        StateDrop: buyer_state
      });
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
    //console.log(dateFormat(this.state.date, "yyyy-mm-dd  h:MM"),)
    //const enable = this.state.TypeDrop == "" && this.state.Sourcedrop == "";
    const enable1 = this.state.Citydrop_update && this.state.Sourcedrop_update;

    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: "/login" }} />;
    }
    const options = {
      page: 1, // which page you want to show as default
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
          text: "75",
          value: 75
        },
        {
          text: "100",
          value: 100
        },
        {
          text: "125",
          value: 125
        },
        {
          text: "All",
          value: this.props.call_log_array.length
        }
      ], // you can change the dropdown list for size per page
      sizePerPage: 25, // which size per page you want to locate as default
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
    };

    const TypeDrop = [
      { value: "repair", label: "Repair" },
      { value: "recycle", label: "Recycle" },
      { value: "buy", label: "Buy" },
      { value: "sell", label: "Sell" },
      { value: "other", label: "Other" }
    ];
    const statedrop_ = [
      { value: "gmb", label: "GMB" },
      { value: "AdWord", label: "Ad Word" },
      { value: "facebook", label: "Facebook" },
      { value: "insta", label: "Insta" },
      { value: "other", label: "Other" }
    ];
    const buyer_city = [];
    this.props.merchantCityArray.map(item => {
      return buyer_city.push({
        value: item.CITY_ID,
        label: item.CITY_DESC
      });
    });
    const buyer_state = [];
    this.props.state_pros_array.map(item => {
      return buyer_state.push({
        value: item.STATE_ID,
        label: item.STATE_DESC
      });
    });

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
              Call log
              <small>Control panel</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <p>Home</p>
              </li>
              <li className="active">Call log</li>
            </ol>
          </section>

          <section className="content">
            <div className="box">
              <div className="modal fade" id="myModal" role="dialog">
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
                    <form
                      id="statusCheck"
                      onSubmit={this.handleModleOnsubmit_update}
                    >
                      <div className="modal-body">
                        <div className="col-sm-12">
                          <div className="col-sm-2">
                            {/* <span className="glyphicon glyphicon-phone-alt form-control-feedback" />  */}
                            <label>Contact Number:</label>
                            <PhoneInput
                              displayInitialValueAsLocalNumber="true"
                              country="US"
                              name="ContactNumber_update"
                              placeholder="Enter phone number"
                              value={this.state.ContactNumber_update}
                              required
                              onChange={value =>
                                this.setState({ ContactNumber_update: value })
                              }
                              limitMaxLength="10"
                            />
                          </div>
                          <div className="col-sm-2">
                            <label>Name:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="name_update"
                              onChange={this.formHandler}
                              value={this.state.name_update}
                              placeholder="name"
                              id="nameid"
                            />
                          </div>
                          <div className="col-sm-2">
                            <label>Source:</label>
                            <div
                              className="form-group has-feedback"
                              style={{ width: "100%" }}
                            >
                              <Select
                                id="Sourceid"
                                // defaultValue={dropValue[1]}
                                name="Sourcedrop_update"
                                options={statedrop_}
                                value={this.state.Sourcedrop_update}
                                onChange={this.onHandletDrop_source_update}
                                className="basic-single"
                                classNamePrefix="select"
                                isSearchable
                                required
                                select-option
                              />
                            </div>
                          </div>
                          <div className="col-sm-2">
                            <label>Type:</label>
                            <div
                              className="form-group has-feedback"
                              style={{ width: "100%" }}
                            >
                              <Select
                                id="TypeDropid"
                                // defaultValue={dropValue[1]}
                                name="Type_Drop_update"
                                options={TypeDrop}
                                value={this.state.Type_Drop_update}
                                onChange={this.onHandletDrop_type_update}
                                className="basic-single"
                                classNamePrefix="select"
                                isSearchable
                                required
                                select-option
                              />
                            </div>
                          </div>
                          <div className="col-sm-2">
                            <label>Description:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="Description_update"
                              onChange={this.formHandler}
                              value={this.state.Description_update}
                              placeholder="Description"
                              id="Descriptionid"
                            />
                          </div>

                          <div className="col-sm-2">
                            <label>Adress:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="Adress_update"
                              onChange={this.formHandler}
                              value={this.state.Adress_update}
                              placeholder="Adress"
                              id="Adressid"
                            />
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="col-sm-2">
                            <label>City Name:</label>
                            <div
                              className="form-group has-feedback"
                              style={{ width: "100%" }}
                            >
                              <Select
                                id="Citydropid"
                                // defaultValue={dropValue[1]}
                                name="Citydrop_update"
                                options={buyer_city}
                                value={this.state.Citydrop_update}
                                onChange={this.onHandletDrop_city_update}
                                className="basic-single"
                                classNamePrefix="select"
                                isSearchable
                                required
                                select-option
                              />
                            </div>
                          </div>
                          <div className="col-sm-2">
                            <label>State Name:</label>
                            <div
                              className="form-group has-feedback"
                              style={{ width: "100%" }}
                            >
                              <Select
                                id="Stateid"
                                // defaultValue={dropValue[1]}
                                name="StateDrop_update"
                                options={buyer_state}
                                value={this.state.StateDrop_update}
                                onChange={this.onHandletDrop_state_update}
                                className="basic-single"
                                classNamePrefix="select"
                                isSearchable
                                required
                                select-option
                              />
                            </div>
                          </div>
                          <div className="col-sm-2">
                            <label>Date</label>
                            <div className="input-group">
                              <Flatpickr
                                options={{
                                  // mode: "range",
                                  // minDate: 'today'

                                  dateFormat: "Y-m-d H:i",
                                  name: "name_update"
                                  // minTime: "08:00",
                                  // maxTime: "12:00"

                                  //defaultDate: ""
                                  //wrap: true
                                }}
                                value={this.state.date_update}
                                onChange={date_update => {
                                  this.setState({ date_update });
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-sm-2">
                            <label>Remarks:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="Remarks_update"
                              onChange={this.formHandler}
                              value={this.state.Remarks_update}
                              placeholder="Remarks"
                              id="Remarksid"
                            />
                          </div>
                          <div className="col-sm-2">
                            <label> Asking Price:</label>
                            <input
                              type="number"
                              className="form-control"
                              name="Price_update"
                              onChange={this.formHandler}
                              value={this.state.Price_update}
                              placeholder="Price"
                              id="Priceid"
                            />
                          </div>

                          <div className="col-sm-2">
                            <br />
                            <button
                              type="submit"
                              className="btn btn-primary"
                              style={{ width: "45%", marginTop: "3px" }}
                              // data-dismiss="modal"
                              // value={this.props.show}
                              onClick={this.closeModel_resetState}
                              disabled={!enable1}
                            >
                              Update
                            </button>
                            &nbsp;
                            <button
                              type="button"
                              className="btn btn-danger"
                              data-dismiss="modal"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer" />
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="box">
              <div className="box-header with-border">
                <h3 className="box-title">Call Log</h3>
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
                      {/* <span className="glyphicon glyphicon-phone-alt form-control-feedback" />  */}
                      <label>Contact Number:</label>
                      <PhoneInput
                        displayInitialValueAsLocalNumber="true"
                        country="US"
                        name="ContactNumber"
                        placeholder="Enter phone number"
                        value={this.state.ContactNumber}
                        required
                        onChange={value =>
                          this.setState({ ContactNumber: value })
                        }
                        limitMaxLength="10"
                      />
                      {/* <input
                        type="text"
                        className="form-control"
                        name="ContactNumber"
                        onChange={this.formHandler}
                        value={this.state.ContactNumber}
                        placeholder="Contact Number"
                        id="ContactNumberid"
                        required
                      /> */}
                    </div>
                    <div className="col-sm-2">
                      <label>Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={this.formHandler}
                        value={this.state.name}
                        placeholder="name"
                        id="nameid"
                      />
                    </div>
                    <div className="col-sm-2">
                      <label>Source:</label>
                      <div
                        className="form-group has-feedback"
                        style={{ width: "100%" }}
                      >
                        <Select
                          id="Sourceid"
                          // defaultValue={dropValue[1]}
                          name="Sourcedrop"
                          options={statedrop_}
                          value={this.state.Sourcedrop}
                          onChange={this.onHandletDrop_source}
                          className="basic-single"
                          classNamePrefix="select"
                          isSearchable
                          required
                          select-option
                        />
                      </div>
                    </div>
                    <div className="col-sm-2">
                      <label>Type:</label>
                      <div
                        className="form-group has-feedback"
                        style={{ width: "100%" }}
                      >
                        <Select
                          id="TypeDropid"
                          // defaultValue={dropValue[1]}
                          name="Type_Drop"
                          options={TypeDrop}
                          value={this.state.Type_Drop}
                          onChange={this.onHandletDrop_type}
                          className="basic-single"
                          classNamePrefix="select"
                          isSearchable
                          required
                          select-option
                        />
                      </div>
                    </div>
                    <div className="col-sm-2">
                      <label>Description:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="Description"
                        onChange={this.formHandler}
                        value={this.state.Description}
                        placeholder="Description"
                        id="Descriptionid"
                      />
                    </div>

                    <div className="col-sm-2">
                      <label>Adress:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="Adress"
                        onChange={this.formHandler}
                        value={this.state.Adress}
                        placeholder="Adress"
                        id="Adressid"
                      />
                    </div>
                  </div>

                  <div className="col-sm-12">
                    <div className="col-sm-2">
                      <label>City Name:</label>
                      <div
                        className="form-group has-feedback"
                        style={{ width: "100%" }}
                      >
                        <Select
                          id="Citydropid"
                          // defaultValue={dropValue[1]}
                          name="Citydrop"
                          options={buyer_city}
                          value={this.state.Citydrop}
                          onChange={this.onHandletDrop_city}
                          className="basic-single"
                          classNamePrefix="select"
                          isSearchable
                          required
                          select-option
                        />
                      </div>
                    </div>
                    <div className="col-sm-2">
                      <label>State Name:</label>
                      <div
                        className="form-group has-feedback"
                        style={{ width: "100%" }}
                      >
                        <Select
                          id="Stateid"
                          // defaultValue={dropValue[1]}
                          name="StateDrop"
                          options={buyer_state}
                          value={this.state.StateDrop}
                          onChange={this.onHandletDrop_state}
                          className="basic-single"
                          classNamePrefix="select"
                          isSearchable
                          required
                          select-option
                        />
                      </div>
                    </div>
                    <div className="col-sm-2">
                      <label>Date</label>
                      <div className="input-group">
                        <Flatpickr
                          options={{
                            // mode: "range",
                            // minDate: 'today',
                            enableTime: true,
                            dateFormat: "Y-m-d H:i",
                            name: "name"
                            //defaultDate: ""
                            //wrap: true
                          }}
                          value={this.state.date}
                          onChange={date => {
                            this.setState({ date });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-2">
                      <label>Remarks:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="Remarks"
                        onChange={this.formHandler}
                        value={this.state.Remarks}
                        placeholder="Remarks"
                        id="Remarksid"
                      />
                    </div>
                    <div className="col-sm-2">
                      <label> Asking Price:</label>
                      <input
                        type="number"
                        className="form-control"
                        name="Price"
                        onChange={this.formHandler}
                        value={this.state.Price}
                        placeholder="Price"
                        id="Priceid"
                      />
                    </div>

                    <div className="col-sm-2">
                      <br />

                      <button
                        type="submit"
                        className="btn btn-danger"
                        // disabled={!pic_date}
                        style={{ width: "45%", marginTop: "3px" }}
                        //disabled={!enable}
                      >
                        Save
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
                        data={this.props.call_log_array}
                      >
                        <TableHeaderColumn
                          editable={false}
                          dataSort={true}
                          // dataFormat={actionFormatter}
                          dataFormat={actionFormatter}
                          dataField="LOG_ID"
                          width="8.33%"
                        >
                          Actions
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          editable={false}
                          dataSort={true}
                          // dataFormat={actionFormatter}
                          dataField="NAME"
                          width="8.33%"
                        >
                          Name
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          editable={false}
                          dataSort={true}
                          dataField="CONTACT_NO"
                          width="8.33%"
                        >
                          {" "}
                          Contact Number
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          editable={false}
                          dataSort={true}
                          dataField="ADDRESS"
                          width="8.33%"
                        >
                          {" "}
                          Adress
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          editable={false}
                          dataSort={true}
                          dataField="CITY_DESC"
                          width="8.33%"
                        >
                          {" "}
                          City
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          editable={false}
                          export={false}
                          // dataFormat={ebayLink}
                          dataField="STATE_DESC"
                          width="8.33%"
                        >
                          {" "}
                          state{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          isKey={true}
                          editable={false}
                          dataSort={true}
                          dataField="CALL_TYPE"
                          width="8.33%"
                        >
                          Type{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          editable={false}
                          ordering={true}
                          dataSort={true}
                          dataField="CALL_SOURCE"
                          width="8.33%"
                        >
                          Source{" "}
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          editable={false}
                          ordering={true}
                          dataSort={true}
                          dataField="CALL_DATE"
                          tdStyle={{ whiteSpace: "normal" }}
                          width="8.33%"
                        >
                          Date{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          editable={false}
                          ordering={true}
                          dataSort={true}
                          dataField="ITEM_DESC"
                          tdStyle={{ whiteSpace: "normal" }}
                          width="8.33%"
                        >
                          Description{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          editable={false}
                          ordering={true}
                          dataSort={true}
                          dataField="REMARKS"
                          tdStyle={{ whiteSpace: "normal" }}
                          width="8.33%"
                        >
                          Resmaks{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          editable={false}
                          ordering={true}
                          dataSort={true}
                          dataField="PRICE"
                          tdStyle={{ whiteSpace: "normal" }}
                          width="8.33%"
                        >
                          Price{" "}
                        </TableHeaderColumn>
                      </BootstrapTable>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <AlertMessage />
          </section>
          {/* <AlertMessage /> */}
        </React.Fragment>
      );
    }
  }
}

const mapstateToProps = state => {
  return {
    state_pros_array: state.callLogReducer.state_pros_array,
    merchantCityArray: state.callLogReducer.merchantCityArray,
    call_log_array: state.callLogReducer.call_log_array,
    Get_City_singleArray: state.callLogReducer.Get_City_singleArray
  };
};

export default connect(
  mapstateToProps,
  action
)(CallLog);
