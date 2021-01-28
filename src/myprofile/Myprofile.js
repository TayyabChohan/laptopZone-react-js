import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import $ from "jquery";
import Select from "react-select";
import { Button } from "react-bootstrap";
import { toastr } from "react-redux-toastr";
import swal from "sweetalert";
import {
  insert_MyProfile,
  get_merchant_City,
  get_MyProfile
} from "../actions/myProfileAction.js";
import "react-phone-number-input/style.css";
import PhoneInput, { formatPhoneNumber } from "react-phone-number-input";

let getUrl = window.location;
let finalurl = getUrl.protocol + "//" + getUrl.hostname;

const actions = {
  insert_MyProfile,
  get_merchant_City,
  get_MyProfile
};

class Myprofile extends Component {
  constructor(props) {
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    super(props);
    //that = this;
    this.state = {
      names: "",
      records: [],
      error: null,
      isLoaded: true,
      baseUrl: finalurl,
      redirectToReferrer: false,
      error: false,
      pictures: [],
      file: "",
      imagePreviewUrl: "",
      FirstName: "",
      LastName: "",
      PaypalEmail: "",
      DisplayName: "",
      ContactNo: "",
      ZipCode: "",
      Address1: "",
      Address2: "",
      handleChangeSelectCity: "",
      fileInput: "",
      SelectCity: "",
      image: "",
      selectedFile: null,
      formDataState: "",
      selectedProfile: [],
      ADDRESS1: "",
      ADDRESS2: "",
      CITY: "",
      CONTACT_NO: " ",
      DISPLAY_NAME: "",
      F_NAME: "",
      LOGO: "",
      L_NAME: "",
      MERCHANT_ID: "",
      MERCH_DT_ID: "",
      PAYPAL_EMAIL: "",
      ZIP_CODE: "",
      Address1label: "",
      Address2label: " ",
      DisplayNamelable: "",
      LastNamelabel: "",
      PaypalEmaillable: " ",
      ZipCodelable: "",
      labelfname: "",
      logolable: "",
      valuecity: "",
      contactlable: "",
      citydes: "",
      merchantidvaalue: "",
      imagtoshow: ""
    };
  }

  fileSelect = event => {
    //console.log(event.target.files[0]);
    var fileData = event.target.files[0];

    //         // return false;

    //  this.setState({ formDataState: formData });
    // var finalUrl = this.state.baseUrl + "/laptopzone/reactControllertest/c_react_test/insert_MyProfile"

    //       new Promise(function(resolve, reject) {
    //         $.ajax({
    //           dataType: 'json',
    //           url : finalUrl,  // Controller URL
    //           type : 'POST',
    //           data : formData,
    //           cache : false,
    //           contentType : false,
    //           processData : false
    //         }).then(
    //           function(data) {
    //             resolve(data);
    //           },
    //           function(err) {
    //             reject(err);
    //           }
    //         );
    //       })
    //         .then(result => {
    //           alert("Success");
    //         })
    //         .catch(err => {
    //           console.log(err);
    //         });
  };

  componentDidMount() {
    this.props.get_merchant_City();
    var merchant_id = localStorage.getItem("merId");
    this.props.get_MyProfile(merchant_id);
  }

  handleChangeOnSubmmit = e => {
    e.preventDefault();
    var formData = new FormData();
    var input = $("#LogoImage")[0];
    formData.append("image", input.files[0]);

    var FirstName = this.state.FirstName;
    var LastName = this.state.LastName;
    var PaypalEmail = this.state.PaypalEmail;
    var DisplayName = this.state.DisplayName;
    var ContactNo =
      this.state.ContactNo &&
      formatPhoneNumber(this.state.ContactNo, "National");
    var ZipCode = this.state.ZipCode;
    var Address1 = this.state.Address1;
    var Address2 = this.state.Address2;
    var SelectCity = this.state.SelectCity.value;
    var created_by = localStorage.getItem("userId");
    var merchant_id = localStorage.getItem("merId");

    formData.append("FirstName", FirstName);
    formData.append("LastName", LastName);
    formData.append("PaypalEmail", PaypalEmail);
    formData.append("DisplayName", DisplayName);
    formData.append("ContactNo", ContactNo);
    formData.append("ZipCode", ZipCode);
    formData.append("Address1", Address1);
    formData.append("Address2", Address2);
    formData.append("SelectCity", SelectCity);
    formData.append("created_by", created_by);
    formData.append("merchant_id", merchant_id);

    var finalUrl =
      this.state.baseUrl +
      "/laptopzone/reactControllertest/c_react_test/insert_MyProfile";

    new Promise(function(resolve, reject) {
      $.ajax({
        dataType: "json",
        url: finalUrl, // Controller URL
        type: "POST",
        data: formData,
        cache: false,
        contentType: false,
        processData: false
      }).then(
        function(data) {
          resolve(data);
          window.location.reload();
          swal("Your Data Seccesfully Added !", {
            icon: "success"
          });
          $.LoadingOverlay("hide");
        },
        function(err) {
          reject(err);
        }
      );
    })
      .then(result => {
        //console.log(formData)
      })
      .catch(err => {
        console.log(err);
      });

    // console.log(data, fd);

    // this.props.insert_MyProfile(data, fd);
  };

  formHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleChangeSelectCity = SelectCity => {
    this.setState({
      SelectCity: SelectCity
    });
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
      prevProps.profileArray !== this.props.profileArray &&
      this.props.profileArray !== ""
    ) {
      const selectedProfile = [];
      this.props.profileArray.map(item =>
        this.setState({
          Address1: item.ADDRESS1,
          Address2: item.ADDRESS2,
          DisplayName: item.DISPLAY_NAME,
          LastName: item.L_NAME,
          PaypalEmail: item.PAYPAL_EMAIL,
          ZipCode: item.ZIP_CODE,
          FirstName: item.F_NAME,
          logolable: item.LOGO,
          SelectCity: { value: item.CITY_ID, label: item.CITY_DESC },
          ContactNo: item.CONTACT_NO,
          citydes: item.CITY_DESC,
          merchantidvaalue: item.MERCHANT_ID
        })
      );
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
    //console.log(this.formData)
    //console.log(this.state);
    // console.log(this.props.imagedata);
    //console.log(this.state.selectedProfile.merchantidvaalue);
    // const data = { value: ID, label: row.SHIPPING_SERVICE };
    //new AsYouType('US').input('2133734') === '(213) 373-4'
    //const asYouType = new AsYouType()
    //console.log(formatPhoneNumber(this.state.ContactNo, 'National'))
    // { value && formatPhoneNumber(value, 'National') }

    //console.log(this.state.ContactNo)

    const enable = this.state.valuecity.value > 0;
    const selectedCity = {};

    const selectedProfile = [];

    this.props.profileArray.map(item =>
      selectedProfile.push({
        valuecity: item.CITY,
        labelfname: item.F_NAME,
        LastNamelabel: item.L_NAME,
        Address1label: item.ADDRESS1,
        Address2label: item.ADDRESS2,
        DisplayNamelable: item.DISPLAY_NAME,
        logolable: item.LOGO,
        PaypalEmaillable: item.PAYPAL_EMAIL,
        ZipCodelable: item.ZIP_CODE,
        contactlable: item.CONTACT_NO,
        citydes: item.CITY_DESC,
        merchantidvaalue: item.MERCHANT_ID,
        imagtoshow: item.IMG
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
        }
        // {
        //   text: "All",
        //   value: this.props.merchantDetailArray.length
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
              My Profile
              <small>Control panel</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <p>Home</p>
              </li>
              <li className="active">My Profile</li>
            </ol>
          </section>

          <section className="content">
            <div className="row">
              <div className="col-sm-12">
                <div className="box">
                  <div className="box-header with-border">
                    <h3 className="box-title">Update Profile</h3>
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

                  <div className="box-body" style={{ padding_left: "12%" }}>
                    <form onSubmit={this.handleChangeOnSubmmit}>
                      <div className="col-sm-12" style={{ width: "50%" }}>
                        <label>First Name:</label>
                        <div className="form-group has-feedback">
                          <span className="glyphicon glyphicon-user form-control-feedback" />
                          <input
                            type="text"
                            className="form-control"
                            name="FirstName"
                            onChange={this.formHandler}
                            value={this.state.FirstName}
                            placeholder="First Name"
                            id="FirstNameId"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-sm-12" style={{ width: "50%" }}>
                        <label>Last Name:</label>
                        <div className="form-group has-feedback">
                          <span className="glyphicon glyphicon-user form-control-feedback" />
                          <input
                            type="text"
                            className="form-control"
                            name="LastName"
                            onChange={this.formHandler}
                            value={this.state.LastName}
                            placeholder="Last Name"
                            id="LastNameId"
                          />
                        </div>
                      </div>
                      <div className="col-sm-12" style={{ width: "50%" }}>
                        <br />
                        <label>Paypal Email:</label>
                        <div className="form-group has-feedback">
                          <span className="glyphicon glyphicon-envelope form-control-feedback" />
                          <input
                            type="email"
                            className="form-control"
                            name="PaypalEmail"
                            onChange={this.formHandler}
                            value={this.state.PaypalEmail}
                            placeholder="Paypal Email"
                            id="PaypalEmailId"
                          />
                        </div>
                      </div>
                      <div className="col-sm-12" style={{ width: "50%" }}>
                        <br />
                        <label>Display Name:</label>
                        <div className="form-group has-feedback">
                          <span className="glyphicon glyphicon-user form-control-feedback" />
                          <input
                            type="text"
                            className="form-control"
                            name="DisplayName"
                            onChange={this.formHandler}
                            value={this.state.DisplayName}
                            placeholder="Display Name"
                            id="DisplayNameId"
                          />
                        </div>
                      </div>
                      <div className="col-sm-12" style={{ width: "50%" }}>
                        <br />
                        <label>Phone Number:</label>
                        <div className="form-group has-feedback">
                          <span className="glyphicon glyphicon-phone-alt form-control-feedback" />
                          {/* <PhoneInput
                          
                          className="form-control"
                          name="ContactNo"
                          onChange={this.formHandler}
                          value={this.state.ContactNo}
                          placeholder="Contact No"
                          id="ContactNoId"
                         // pattern="^[(]?\d{3}[)]?[(\s)?.-]\d{3}[\s.-]\d{4}$"
                          required
                        /> */}
                          <PhoneInput
                            displayInitialValueAsLocalNumber="true"
                            country="US"
                            name="ContactNo"
                            placeholder="Enter phone number"
                            value={this.state.ContactNo}
                            onChange={value =>
                              this.setState({ ContactNo: value })
                            }
                            limitMaxLength="10"
                          />
                        </div>
                      </div>
                      <div className="col-sm-12" style={{ width: "50%" }}>
                        <br />
                        <label>Zip Code:</label>
                        <div className="form-group has-feedback">
                          <span className="glyphicon glyphicon-copyright-mark form-control-feedback" />
                          <input
                            type="text"
                            className="form-control"
                            name="ZipCode"
                            onChange={this.formHandler}
                            value={this.state.ZipCode}
                            placeholder="Zip Code"
                            id="ZipCodeId"
                          />
                        </div>
                      </div>
                      <div className="col-sm-12" style={{ width: "50%" }}>
                        <br />
                        <label>Address 1:</label>
                        <div className="form-group has-feedback">
                          <span className="glyphicon glyphicon-road form-control-feedback" />
                          <input
                            type="text"
                            className="form-control"
                            name="Address1"
                            onChange={this.formHandler}
                            value={this.state.Address1}
                            placeholder="Address One"
                            id="Address1Id"
                          />
                        </div>
                      </div>
                      <div className="col-sm-12" style={{ width: "50%" }}>
                        <br />
                        <label>Address 2:</label>
                        <div className="form-group has-feedback">
                          <span className="glyphicon glyphicon-road form-control-feedback" />
                          <input
                            type="text"
                            className="form-control"
                            name="Address2"
                            onChange={this.formHandler}
                            value={this.state.Address2}
                            placeholder="Address Two"
                            id="Address2Id"
                          />
                        </div>
                      </div>

                      <div className="col-sm-12" style={{ width: "50%" }}>
                        <br />
                        <div className="form-group">
                          <label for="Cityname">City</label>
                          <div
                            className="form-group has-feedback"
                            id="Cityname"
                          >
                            <span className="glyphicon glyphicon-chevron-down form-control-feedback" />
                            <Select
                              id="CitynameId"
                              // isMulti
                              name="SelectCity"
                              options={SelectCityvalue}
                              value={this.state.SelectCity}
                              onChange={this.handleChangeSelectCity}
                              className="basic-select"
                              classNamePrefix="select"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-12" style={{ width: "50%" }}>
                        <br />

                        <div className="col-sm-6">
                          <label>Logo:</label>
                          <div className="previewComponent">
                            <input
                              className="fileInput"
                              type="file"
                              name="LogoImage"
                              id="LogoImage"
                              //value={'' || this.state.selectedProfile.logolable}
                              onChange={this.fileSelect}
                              // value={this.state.selectedProfile.imagtoshow}
                            />
                          </div>
                        </div>

                        <img
                          className="img-circle"
                          src={"data:image;base64," + this.props.imagedata}
                          style={{
                            width: "20%",
                            height: "20%",
                            border_radius: "50%"
                          }}
                          alt={""}
                        />
                        <div className="name">
                          <h4 className="htm" style={{ marginLeft: "50%" }}>
                            {this.state.logolable}
                          </h4>
                        </div>
                      </div>

                      <div className="col-sm-12">
                        <div className="col-sm-6">
                          <br />
                          <br />
                          <Button
                            type="submit"
                            className="btn btn-primary btn-md"
                            style={{ width: "55%", marginTop: "5px" }}
                            // disabled={!enable}
                          >
                            {" "}
                            {this.state.merchantidvaalue ? "UPDATE" : "INSERT"}
                            {/* Update */}
                          </Button>
                        </div>
                      </div>
                    </form>
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
    merchantCityArray: state.myprofilrReducer.merchantCityArray,
    profileArray: state.myprofilrReducer.profileArray,
    imagedata: state.myprofilrReducer.imagedata
  };
};

export default connect(
  mapStateToProps,
  actions
)(Myprofile);
