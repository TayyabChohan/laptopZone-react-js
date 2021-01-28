import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import swal from "sweetalert";

import {
  get_Users_List,
  marchantDrop,
  insert_Users_List,
  disable_And_Anable_Users_List,
  update_Users_List
} from "../actions/usersAction.js";
import AlertMessage from "../components/messages/AlertMessage.js";
const action = {
  get_Users_List,
  marchantDrop,
  insert_Users_List,
  disable_And_Anable_Users_List,
  update_Users_List
};

function actionFormatter(cell, row) {
  return (
    <div>
      <button
        className={
          row.STATUS == 1
            ? "btn btn-success glyphicon glyphicon-user"
            : "btn btn-danger glyphicon glyphicon-user"
        }
        call="list"
        id="item_list"
        title={row.STATUS == 1 ? "Enable" : "Disable"}
        onClick={() => that.clickDelete(cell,row)}
      />
      {/* <span
        className={
          cell == "1" ? "glyphicon glyphicon-user" : "glyphicon glyphicon-user"
        }
        aria-hidden=true
      /> */}
      <button
        type="button"
        className="btn btn-primary glyphicon glyphicon-th-list"
        id="myModal2"
        data-toggle="modal"
        data-target="#myModal2"
        title="Update"
        onClick={() => that.clickUpdate(cell, row)}
      />
    </div>
  );
}

var that = "";
class Users extends Component {
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
      FirstName: "",
      LastName: "",
      UserName1: "",
      Password1: "",
      selectLocation: "",
      selectMerchant: "",
      UserEmail: "",
      marchantvalue: "",
      UserEmail_Update: "",
      selectMerchant_update: "",
      selectLocation_update: "",
      Password_update: "",
      UserName_update: "",
      LastName_update: "",
      FirstName_update: "",
      EMPLOYEE_ID: ""
    };
    that = this;
    //this.clickDelete=this.clickDelete.bind(this);
  }

  clickSaveUpdate = id => {
    const data = {
      EMPLOYEE_ID: this.state.EMPLOYEE_ID,
      FirstName_update: this.state.FirstName_update,
      LastName_update: this.state.LastName_update,
      UserName_update: this.state.UserName_update,
      Password_update: this.state.Password_update,
      selectLocation_update: this.state.selectLocation_update.label,
      UserEmail_Update: this.state.UserEmail_Update,
      selectMerchant_update: this.state.selectMerchant_update.label
    };
    this.props.update_Users_List(data);
    this.setState({
      EMPLOYEE_ID: "",
      FirstName_update: "",
      LastName_update: "",
      UserName_update: "",
      Password_update: "",
      selectLocation_update: "",
      UserEmail_Update: "",
      selectMerchant_update: ""
    });
    //console.log(data)
  };
  clickUpdate = (cell, row) => {
    const data = { value: row.MERCHANT_ID, label: row.BUISNESS_NAME };
    const locationvalue_updated = row.LOCATION
      ? { value: "0", label: row.LOCATION }
      : { value: "1", label: row.LOCATION };
    // console.log(row)
    this.setState({
      EMPLOYEE_ID: row.EMPLOYEE_ID,
      FirstName_update: row.FIRST_NAME,
      LastName_update: row.LAST_NAME,
      UserName_update: row.USER_NAME,
      Password_update: row.PASS_WORD,
      selectLocation_update: locationvalue_updated,
      UserEmail_Update: row.E_MAIL_ADDRESS,
      selectMerchant_update: data
    });
    // console.log(data);
  };

  //Change the type of input to password or text
  // function Toggle() {
  //     var temp = document.getElementById("typepass");
  //     if (temp.type === "password") {
  //         temp.type = "text";
  //     }
  //     else {
  //         temp.type = "password";
  //     }
  // }
  renderShowsTotal(start, to, total) {
    return (
      <p style={{ color: "#696969" }}>
        From {start} to {to}, totals is {total}&nbsp;&nbsp;
      </p>
    );
  }
  onHandleMerchantDrop = selectMerchant => {
    this.setState({
      selectMerchant: selectMerchant
    });
  };

  onHandleMerchantDrop_Update = selectMerchant_update => {
    this.setState({
      selectMerchant_update: selectMerchant_update
    });
  };
  onHandleLoactionDrop_update = selectLocation_update => {
    this.setState({
      selectLocation_update: selectLocation_update
    });
  };

  clickDelete = (cell, row) => {
    console.log(cell);
    const data = {
      status: row.STATUS == 1 ? 0 : 1,
      id: cell
    };
    console.log(data);
 this.props.disable_And_Anable_Users_List(data);
  };

  handleModleOnsubmit = e => {
    e.preventDefault();
    const data = {
      FirstName: this.state.FirstName,
      LastName: this.state.LastName,
      UserName: this.state.UserName1,
      Password: this.state.Password1,
      selectLocation: this.state.selectLocation.label,
      selectMerchant: this.state.selectMerchant.value,
      UserEmail: this.state.UserEmail
    };
    //console.log(data);
    this.props.insert_Users_List(data);
    this.setState({
      FirstName: "",
      LastName: "",
      UserName1: "",
      Password1: "",
      selectLocation: "",
      selectMerchant: "",
      UserEmail: ""
    });
    this.myFormRef.reset();
  };

  onInputHandlerUpdate = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onInputHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onHandleLoactionDrop = selectLocation => {
    this.setState({
      selectLocation: selectLocation
    });
  };

  componentDidMount() {
    const id = sessionStorage.getItem("merId");
    this.props.marchantDrop();
    this.props.get_Users_List();
  }

  //   togglePassword = document.getElementById('togglePassword');

  //    showOrHidePassword = () => {
  //     const password = document.getElementById('password');
  //     if (password.type === 'password') {
  //       password.type = 'text';
  //     } else {
  //       password.type = 'password';
  //     }
  //   };

  // togglePassword.addEventListener('change', showOrHidePassword);

  render() {
    const enbal =
      this.state.selectLocation.value >= 0 &&
      this.state.selectMerchant.value >= 0;

    const locationvalue = [
      {
        value: "0",
        label: "US"
      },
      { value: "1", label: "PK" }
    ];

    const locationvalue_update = [
      {
        value: "0",
        label: "US"
      },
      { value: "1", label: "PK" }
    ];

    const marchantvalue_update = [];
    this.props.marchantArray.map(item =>
      marchantvalue_update.push({
        value: item.MERCHANT_ID,
        label: item.BUISNESS_NAME
      })
    );

    const marchantvalue = [];
    this.props.marchantArray.map(item =>
      marchantvalue.push({
        value: item.MERCHANT_ID,
        label: item.BUISNESS_NAME
      })
    );
    // console.log(this.props.marchantArray);
    // console.log(this.props.UsersArray);
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
          value: this.props.UsersArray.length
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
              Users Listing
              <small>Control panel</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <p>Home</p>
              </li>
              <li className="active"> Users Form </li>
            </ol>
          </section>

          <section className="content">
            <div className="box">
              <div className="row">
                <div className="modal fade" id="myModal2" role="dialog">
                  <div className="modal-dialog" style={{ width: "35%" }}>
                    <div className="modal-content">
                      <div className="modal-header">
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                        >
                          &times;
                        </button>
                        <h4 className="modal-title"> Update User</h4>
                      </div>
                      {/* <form
                        onSubmit={this.handleModleOnsubmitUpdate}
                        ref={el => (this.myFormRef = el)}
                      > */}
                      <div className="modal-body">
                        <div className="col-sm-12">
                          <div className="form-group has-feedback">
                            <input
                              type="text"
                              className="form-control"
                              name="FirstName_update"
                              onChange={this.onInputHandlerUpdate}
                              value={this.state.FirstName_update}
                              placeholder="First Name"
                              id="FirstName_updateId"
                              required
                            />
                            <span className="glyphicon glyphicon-user form-control-feedback" />
                          </div>
                        </div>

                        <div className="col-sm-12">
                          <br />
                          <div className="form-group has-feedback">
                            <input
                              type="text"
                              className="form-control"
                              name="LastName_update"
                              onChange={this.onInputHandlerUpdate}
                              value={this.state.LastName_update}
                              placeholder="Last Name"
                              id="LastName_updateId"
                              required
                            />
                            <span className="glyphicon glyphicon-user form-control-feedback" />
                          </div>
                        </div>

                        <div className="col-sm-12">
                          <br />
                          <div className="form-group has-feedback">
                            <input
                              type="text"
                              className="form-control"
                              name="UserName_update"
                              onChange={this.onInputHandlerUpdate}
                              value={this.state.UserName_update}
                              placeholder="User Name"
                              id="UserName_updateId"
                              required
                            />
                            <span className="glyphicon glyphicon-user form-control-feedback" />
                          </div>
                        </div>

                        <div className="col-sm-12">
                          <br />
                          <div className="form-group has-feedback">
                            <input
                              type="password"
                              className="form-control"
                              name="Password_update"
                              onChange={this.onInputHandlerUpdate}
                              value={this.state.Password_update}
                              placeholder="Password"
                              id="password-field"
                              required
                              minlength="4"
                            />
                         <span className="glyphicon glyphicon-lock form-control-feedback" />
                           
                          </div>
                        </div>

                        <div className="col-sm-12">
                          <br />

                          <div
                            className="form-group has-feedback"
                            style={{ width: "100%" }}
                          >
                            <Select
                              id="locationId"
                              defaultValue={locationvalue_update[0]}
                              name="selectLocation_update"
                              options={locationvalue_update}
                              value={this.state.selectLocation_update}
                              onChange={this.onHandleLoactionDrop_update}
                              className="basic-single"
                              classNamePrefix="select "
                              isSearchable
                              required
                              select-option

                              // formatGroupLabel={formatGroupLabel}
                            />
                            <span className="glyphicon glyphicon-chevron-down form-control-feedback" />
                          </div>
                        </div>

                        <div className="col-sm-12">
                          <br />
                          <div
                            className="form-group has-feedback"
                            style={{ width: "100%" }}
                          >
                            <Select
                              id="merchatId"
                              defaultValue={marchantvalue_update[0]}
                              name="selectMerchant_update"
                              options={marchantvalue_update}
                              value={this.state.selectMerchant_update}
                              onChange={this.onHandleMerchantDrop_Update}
                              className="basic-single"
                              classNamePrefix="select "
                              isSearchable
                              required
                              select-option
                            />
                            <span className="glyphicon glyphicon-chevron-down form-control-feedback" />
                          </div>
                        </div>

                        <div className="col-sm-12 ">
                          <br />
                          <div className="form-group has-feedback">
                            <input
                              type="email"
                              className="form-control"
                              name="UserEmail_Update"
                              onChange={this.onInputHandlerUpdate}
                              value={this.state.UserEmail_Update}
                              placeholder="User Email"
                              id="UserEmailUpdateId"
                              required
                            />
                            <span className="glyphicon glyphicon-user form-control-feedback" />
                          </div>
                        </div>
                      </div>

                      <div className="modal-footer">
                        <button
                          type="submit"
                          className="btn btn-success"
                          style={{ marginTop: "2%" }}
                          onClick={() =>
                            this.clickSaveUpdate(this.state.EMPLOYEE_ID)
                          }
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          style={{ marginTop: "2%" }}
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                      {/* </form> */}
                    </div>
                  </div>
                </div>

                <div className="modal fade" id="myModal1" role="dialog">
                  <div className="modal-dialog" style={{ width: "35%" }}>
                    <div className="modal-content">
                      <div className="modal-header">
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                        >
                          &times;
                        </button>
                        <h4 className="modal-title"> Add User</h4>
                      </div>
                      <form
                        onSubmit={this.handleModleOnsubmit}
                        ref={el => (this.myFormRef = el)}
                      >
                        <div className="modal-body">
                          <div className="col-sm-12">
                            <div className="form-group has-feedback">
                              <input
                                type="text"
                                className="form-control"
                                name="FirstName"
                                onChange={this.onInputHandler}
                                value={this.state.FirstName}
                                placeholder="First Name"
                                id="FirstNameId"
                                required
                              />
                              <span className="glyphicon glyphicon-user form-control-feedback" />
                            </div>
                          </div>

                          <div className="col-sm-12">
                            <br />
                            <div className="form-group has-feedback">
                              <input
                                type="text"
                                className="form-control"
                                name="LastName"
                                onChange={this.onInputHandler}
                                value={this.state.LastName}
                                placeholder="Last Name"
                                id="LastNameId"
                                required
                              />
                              <span className="glyphicon glyphicon-user form-control-feedback" />
                            </div>
                          </div>

                          <div className="col-sm-12">
                            <br />

                            <div className="form-group has-feedback">
                              <input
                                type="text"
                                className="form-control"
                                name="UserName1"
                                onChange={this.onInputHandler}
                                value={this.state.UserName1}
                                placeholder="User Name"
                                id="UserNameId"
                                required
                              />
                              <span className="glyphicon glyphicon-user form-control-feedback" />
                            </div>
                          </div>

                          <div className="col-sm-12">
                            <br />
                            <div className="form-group has-feedback">
                              <input
                                type="password"
                                className="form-control"
                                name="Password1"
                                onChange={this.onInputHandler}
                                value={this.state.Password1}
                                placeholder="Password"
                                id="PasswordId"
                                required
                                minlength="4"
                              />
                              {/* <span toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password"/> */}
                              <span className="glyphicon glyphicon-lock form-control-feedback" />
                            </div>
                          </div>

                          <div className="col-sm-12">
                            <br />

                            <div
                              className="form-group has-feedback"
                              style={{ width: "100%" }}
                            >
                              <Select
                                id="locationId"
                                defaultValue={locationvalue[0]}
                                name="selectLocation"
                                options={locationvalue}
                                value={this.state.selectLocation}
                                onChange={this.onHandleLoactionDrop}
                                className="basic-single"
                                classNamePrefix="select "
                                isSearchable
                                required
                                select-option

                                // formatGroupLabel={formatGroupLabel}
                              />
                              <span className="glyphicon glyphicon-chevron-down form-control-feedback" />
                            </div>
                          </div>

                          <div className="col-sm-12">
                            <br />
                            <div
                              className="form-group has-feedback"
                              style={{ width: "100%" }}
                            >
                              <Select
                                id="merchatId"
                                defaultValue={marchantvalue[0]}
                                name="selectMerchant"
                                options={marchantvalue}
                                value={this.state.selectMerchant}
                                onChange={this.onHandleMerchantDrop}
                                className="basic-single"
                                classNamePrefix="select "
                                isSearchable
                                required
                                select-option

                                // formatGroupLabel={formatGroupLabel}
                              />
                              <span className="glyphicon glyphicon-chevron-down form-control-feedback" />
                            </div>
                          </div>

                          <div className="col-sm-12">
                            <br />
                            <div className="form-group has-feedback">
                              <input
                                type="email"
                                className="form-control"
                                name="UserEmail"
                                onChange={this.onInputHandler}
                                value={this.state.UserEmail}
                                placeholder="User Email"
                                id="UserEmailId"
                                required
                              />
                              <span className="glyphicon glyphicon-user form-control-feedback" />
                            </div>
                          </div>
                        </div>

                        <div className="modal-footer">
                          <button
                            type="submit"
                            className="btn btn-success"
                            style={{ marginTop: "2%" }}
                            disabled={!enbal}
                            // onClick={() =>
                            //   this.clickSaveUpdate(this.state.TEMPLATE_ID)
                            // }
                          >
                            Add User
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            style={{ marginTop: "2%" }}
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-sm-12"
                style={{ paddingLeft: "0%", paddingRight: "0%" }}
              >
                <div className="box">
                  <div className="box-header with-border">
                    <div className="box-title">
                      <button
                        className="btn btn-primary"
                        data-toggle="modal"
                        data-target="#myModal1"
                        id="myModal1"
                        style={{ width: "131%" }}
                      >
                        Add User
                      </button>
                    </div>
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
                </div>
              </div>
            </div>
            <AlertMessage />
            <div className="row">
              <div className="col-sm-12">
                <div className="box">
                  <br />

                  <div className="row">
                    <div className="col-sm-12">
                      <BootstrapTable
                        //  cellEdit={cellEditProp}
                        // insertRow={ true }
                        data={this.props.UsersArray}
                        // footerData={footerData}
                        // footer
                        pagination
                        search
                        // trClassName={this.trClassFormat}
                        options={options}
                        //totalRow={totalRow}
                        // insertRow
                        //  exportCSV
                        // deleteRow={true}
                        //selectRow={selectRowProp}
                        // option={option}
                      >
                        <TableHeaderColumn
                          width="14.28%"
                          isKey={true}
                          editable={false}
                          dataSort={true}
                          dataFormat={actionFormatter}
                          dataField="EMPLOYEE_ID"
                        >
                          Actions
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="14.28%"
                          editable={false}
                          dataSort={true}
                          dataField="EMPLOYEE_ID"
                        >
                          {" "}
                          User Id
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          width="14.28%"
                          editable={false}
                          dataSort={true}
                          dataField="FIRST_NAME"
                        >
                          {" "}
                          Fisrt Name
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          width="14.28%"
                          editable={false}
                          export={false}
                          dataField="LAST_NAME"
                        >
                          {" "}
                          Last Name{" "}
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          width="14.28%"
                          editable={false}
                          dataSort={true}
                          dataField="PASS_WORD"
                        >
                          Password
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="14.28%"
                          editable={false}
                          dataSort={true}
                          dataField="E_MAIL_ADDRESS"
                        >
                          Email{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="14.28%"
                          editable={false}
                          ordering={true}
                          dataSort={true}
                          dataField="LOCATION"
                        >
                          Location{" "}
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          width="14.28%"
                          editable={false}
                          ordering={true}
                          dataSort={true}
                          hidden
                          dataField="STATUS"
                        >
                          STATUS{" "}
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
const mapsToprops = state => {
  return {
    UsersArray: state.usersReducer.UsersArray,
    marchantArray: state.usersReducer.marchantArray
  };
};

export default connect(
  mapsToprops,
  action
)(Users);
