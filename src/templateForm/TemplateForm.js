import React, { Component } from "react";
import {
  BootstrapTable,
  TableHeaderColumn,
  Dropdown
} from "react-bootstrap-table";
import { Redirect } from "react-router-dom";
import {
  getTempdata,
  shipingServiceDrowp,
  insetTemplatedata,
  deleteTamplateData,
  upDateTamplateData
} from "../actions/templateAction.js";
import { connect } from "react-redux";
import Select from "react-select";
import swal from "sweetalert";

const actions = {
  getTempdata,
  shipingServiceDrowp,
  insetTemplatedata,
  deleteTamplateData,
  upDateTamplateData
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
        className="btn btn-primary glyphicon glyphicon-th-list"
        id="myModal1"
        data-toggle="modal"
        data-target="#myModal1"
        onClick={() => that.clickUpdate(cell, row)}
      />
    </div>
  );
}
var that = "";
function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}
class TemplateForm extends Component {
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
      selectListingType: { value: "1", label: "Fixed Price" },
      selectshippingservice: "",
      selectreturnOption: { value: "0", label: "Yes" },
      selectshingPaid: { value: "1", label: "Buyer" },
      TemplateName: "",
      SiteID: "0",
      ShipFromCountry: "US",
      Currency: "USD",
      ZipCode: "",
      ShipFromLoaction: "US",
      PaymentMethod: "PayPal",
      PaypalEmailAddress: "",
      DispatchTimeMax: "",
      ShppingServiceCost: "",
      ShppingServiceAdditionalCost: "",
      ReturnsWithinOption: "30",
      TEMPLATE_ID: "",
      TemplateNameupdate: "",
      SiteIDupdate: "",
      ShipFromCountryupdate: "",
      Currencyupdate: "",
      selectListingTypeupdate: "",
      ZipCodeupdate: "",
      ShipFromLoactionupdate: "",
      PaymentMethodupdate: "",
      PaypalEmailAddressupdate: "",
      DispatchTimeMaxupdat: "",
      ShppingServiceCostupdate: "",
      ShppingServiceAdditionalCostupdate: "",
      selectreturnOptionupdate: "",
      ReturnsWithinOptionupdate: "",
      selectshingPaidupdate: "",
      ACCOUNT_ID: "",
      MERCHANT_ID: "",
      selectedData: "",
      selectedRow: ""
    };
    that = this;
    //that.clickDelete = that.clickDelete.bind(that);
  }

  clickSaveUpdate = id => {
    const data = {
      TEMPLATE_ID: this.state.TEMPLATE_ID,
      TemplateNameupdate: this.state.TemplateNameupdate,
      SiteIDupdate: this.state.SiteIDupdate,
      Currencyupdate: this.state.Currencyupdate,
      selectListingTypeupdate: this.state.selectListingTypeupdate.label,
      ShipFromCountryupdate: this.state.ShipFromCountryupdate,
      ZipCodeupdate: this.state.ZipCodeupdate,
      ShipFromLoactionupdate: this.state.ShipFromLoactionupdate,
      PaymentMethodupdate: this.state.PaymentMethodupdate,
      PaypalEmailAddressupdate: this.state.PaypalEmailAddressupdate,
      DispatchTimeMaxupdate: this.state.DispatchTimeMaxupdate,
      selectshippingserviceupdate: this.state.selectshippingserviceupdate.label,
      ShppingServiceCostupdate: this.state.ShppingServiceCostupdate,
      ShppingServiceAdditionalCostupdate: this.state
        .ShppingServiceAdditionalCostupdate,
      selectreturnOptionupdate: this.state.selectreturnOptionupdate.label,
      ReturnsWithinOptionupdate: this.state.ReturnsWithinOptionupdate,
      selectshingPaidupdate: this.state.selectshingPaidupdate.label
    };
    var emailCheck = isEmail(this.state.PaypalEmailAddressupdate);
    // var emailCheck = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
    // console.log(emailCheck.test('some.body@domain.co.uk'));

    if (this.state.SiteIDupdate < 0 || this.state.SiteIDupdate < -1) {
      alert("SiteID is invalid");
      return false;
    }
    if (!emailCheck) {
      alert("Incorrect Email");
      return false;
    }

    if (
      this.state.DispatchTimeMaxupdate < 0 ||
      this.state.DispatchTimeMaxupdate < -1
    ) {
      alert("Incorrect Dispatch Time");
      return false;
    }
    if (
      this.state.ShppingServiceCostupdate < 0 ||
      this.state.ShppingServiceCostupdate < -1
    ) {
      alert("Incorrect Shiping Cost");
      return false;
    }
    if (
      this.state.ShppingServiceAdditionalCostupdate < 0 ||
      this.state.ShppingServiceAdditionalCostupdate < -1
    ) {
      alert("Incorrect shiping Additional Cost");
      return false;
    }
    this.props.upDateTamplateData(data);
  };

  clickUpdate = (cell, row) => {
    // console.log(row);
    // const data = []
    const data = { value: row.ID, label: row.SHIPPING_SERVICE };

    const listtype =
      row.LIST_TYPE == "Action"
        ? { value: "0", label: row.LIST_TYPE }
        : { value: "1", label: row.LIST_TYPE };
    const returnaccept =
      row.RETURN_OPTION == "Yes"
        ? {
            value: "0",
            label: row.RETURN_OPTION
          }
        : { value: "1", label: row.RETURN_OPTION };
    const shipcost =
      row.SHIPPING_PAID_BY == "Seller"
        ? {
            value: "0",
            label: row.SHIPPING_PAID_BY
          }
        : { value: "1", label: row.SHIPPING_PAID_BY };
    // console.log(listtype);
    this.setState({
      TEMPLATE_ID: row.TEMPLATE_ID,
      TemplateNameupdate: row.TEMPLATE_NAME,
      SiteIDupdate: row.EBAY_LOCAL,
      Currencyupdate: row.CURRENCY,
      selectListingTypeupdate: listtype,
      ShipFromCountryupdate: row.SHIP_FROM_LOC,
      ZipCodeupdate: row.SHIP_FROM_ZIP_CODE,
      ShipFromLoactionupdate: row.SHIP_FROM_LOC,
      PaymentMethodupdate: row.PAYMENT_METHOD,
      PaypalEmailAddressupdate: row.PAYPAL_EMAIL,
      DispatchTimeMaxupdate: row.DISPATCH_TIME_MAX,
      selectshippingserviceupdate: data,
      ShppingServiceCostupdate: row.SHIPPING_COST,
      ShppingServiceAdditionalCostupdate: row.ADDITIONAL_COST,
      selectreturnOptionupdate: returnaccept,
      ReturnsWithinOptionupdate: row.RETURN_DAYS,
      selectshingPaidupdate: shipcost
    });
    //console.log(row);
  };

  clickDelete = cell => {
    swal({
      title: "Are you Sure?",
      text: "Once deleted, you will not be able to recover this Data!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        this.props.deleteTamplateData(cell);
      } else {
      }
    });
  };

  handleModleOnsubmit = e => {
    e.preventDefault();
    const Data = {
      ACCOUNT_ID: this.state.ACCOUNT_ID,
      MERCHANT_ID: this.state.MERCHANT_ID,
      TEMPLATE_NAME: this.state.TemplateName,
      EBAY_LOCAL: this.state.SiteID,
      SHIP_FROM_LOC: this.state.ShipFromCountry,
      CURRENCY: this.state.Currency,
      LIST_TYPE: this.state.selectListingType.label,
      SHIP_FROM_ZIP_CODE: this.state.ZipCode,
      PAYMENT_METHOD: this.state.PaymentMethod,
      PAYPAL_EMAIL: this.state.PaypalEmailAddress,
      DISPATCH_TIME_MAX: this.state.DispatchTimeMax,
      SHIPPING_SERVICE: this.state.selectshippingservice.label,
      SHIPPING_COST: this.state.ShppingServiceCost,
      ADDITIONAL_COST: this.state.ShppingServiceAdditionalCost,
      RETURN_OPTION: this.state.selectreturnOption.label,
      RETURN_DAYS: this.state.ReturnsWithinOption,
      SHIPPING_PAID_BY: this.state.selectshingPaid.label,
      ENTERED_BY: localStorage.getItem("userId")
    };
    //  console.log(Data)

    var emailCheck = isEmail(this.state.PaypalEmailAddress);

    if (this.state.SiteID < 0 || this.state.SiteID < -1) {
      alert("SiteID is invalid");
      return false;
    }
    if (!emailCheck) {
      alert("Incorrect Email");
      return false;
    }

    if (this.state.DispatchTimeMax < 0 || this.state.DispatchTimeMax < -1) {
      alert("Incorrect Dispatch Time");
      return false;
    }
    if (
      this.state.ShppingServiceCost < 0 ||
      this.state.ShppingServiceCost < -1
    ) {
      alert("Incorrect Shiping Cost");
      return false;
    }
    if (
      this.state.ShppingServiceAdditionalCost < 0 ||
      this.state.ShppingServiceAdditionalCost < -1
    ) {
      alert("Incorrect shiping Additional Cost");
      return false;
    } else {
      this.props.insetTemplatedata(Data);
      this.myFormRef.reset();
    }
  };

  onInputHandlerUpdate = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidUpdate(prevProps, prevState) {}

  // componentWillReceiveProps(newProps) {
  //     console.log(newProps)
  //     if (newProps.selectshippingserviceupdate !== this.state.selectshippingserviceupdate) {

  //         this.setState({ selected: newProps.selectshippingserviceupdate })
  //     }
  //     //  else if (!newProps.selectshippingserviceupdate.value && newProps.placeholder) {
  //     // //   this.setState({selected: { label: newProps.placeholder, value: '' }})
  //     // }
  // }

  onInputHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onHandlelistingDropupdate = selectListingTypeupdate => {
    this.setState({
      selectListingTypeupdate: selectListingTypeupdate
    });
  };

  onHandleShipingtDropupdate = selectshippingserviceupdate => {
    this.setState({
      selectshippingserviceupdate: selectshippingserviceupdate
    });
  };
  onHandleshingPaidDropupdate = selectshingPaidupdate => {
    this.setState({
      selectshingPaidupdate: selectshingPaidupdate
    });
  };

  onHandleReturnOptionDropupdate = selectreturnOptionupdate => {
    this.setState({
      selectreturnOptionupdate: selectreturnOptionupdate
    });
  };

  onHandleshingPaidDrop = selectshingPaid => {
    this.setState({
      selectshingPaid: selectshingPaid
    });
  };

  onHandleShipingtDrop = selectshippingservice => {
    this.setState({
      selectshippingservice: selectshippingservice
    });
  };
  onHandleReturnOptionDrop = selectreturnOption => {
    this.setState({
      selectreturnOption: selectreturnOption
    });
  };

  onHandlelistingDrop = selectListingType => {
    this.setState({
      selectListingType: selectListingType
    });
  };

  componentDidMount() {
    this.props.getTempdata();
    this.props.shipingServiceDrowp();
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
   // console.log(this.props.templatedata);
 
    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: "/login" }} />;
    }

    const { selectshippingserviceupdate } = this.state;

    const enable =
      this.state.selectshippingservice.value > 0 &&
      this.state.selectreturnOption.value >= 0 &&
      this.state.selectListingType.value >= 0 &&
      this.state.selectshingPaid.value >= 0;

    // const enableUpdate=this.state.selectListingTypeupdate.value > 0 || this.state.selectshippingserviceupdate.value > 0
    // || this.state.selectshingPaidupdate.value >0 ||this.state.selectreturnOptionupdate.value >0 ;

    const listingvalue = [
      {
        value: "0",
        label: "Action"
      },
      { value: "1", label: "Fixed Price" }
    ];

    const dropReturnOptionvalue = [
      {
        value: "0",
        label: "Yes"
      },
      { value: "1", label: "No" }
    ];

    const dropshingPaidvalue = [
      {
        value: "0",
        label: "Seller"
      },
      { value: "1", label: "Buyer" }
    ];

    const shipingvalue = [];
    this.props.shipdata.map(item =>
      shipingvalue.push({
        value: item.ID,
        label: item.SHIPING_NAME
      })
    );
    // console.log(this.props.shipdata.map(item => item))
    //console.log(shipingvalue)
    //console.log(this.state.TEMPLATE_ID);
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
          value: this.props.templatedata.length
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
              Template Form
              <small>Control panel</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <p>Home</p>
              </li>
              <li className="active"> Template Form </li>
            </ol>
          </section>

          <section className="content">
            <div className="row">
              <div className="modal fade" id="myModal1" role="dialog">
                <div className="modal-dialog" style={{ width: "80%" }}>
                  <div className="modal-content">
                    <div className="modal-header">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                      >
                        &times;
                      </button>
                      <h4 className="modal-title"> Update Data</h4>
                    </div>
                    {/* <form onSubmit={this.handleModleOnsubmitupdate }
                                          ref={el => (this.myFormRef = el)}> */}
                    <div className="modal-body">
                      <div className="col-sm-12">
                        <div className="col-sm-3">
                          <label>Template Name:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="TemplateNameupdate"
                            onChange={this.onInputHandlerUpdate}
                            value={this.state.TemplateNameupdate}
                            placeholder="Template Name"
                            id="TemplateId"
                            required
                          />
                        </div>
                        <div className="col-sm-3">
                          <label>Site ID:</label>
                          <input
                            type="number"
                            className="form-control"
                            name="SiteIDupdate"
                            onChange={this.onInputHandlerUpdate}
                            value={this.state.SiteIDupdate}
                            placeholder="0"
                            id="SiteId"
                            required
                          />
                        </div>

                        <div className="col-sm-3">
                          <label>Ship From Country:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="ShipFromCountryupdate"
                            onChange={this.onInputHandlerUpdate}
                            value={this.state.ShipFromCountryupdate}
                            placeholder="US"
                            id="CountryId"
                            required
                          />
                        </div>

                        <div className="col-sm-3">
                          <label>Currency:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="Currencyupdate"
                            onChange={this.onInputHandlerUpdate}
                            value={this.state.Currencyupdate}
                            placeholder="USD"
                            id="CurrencyId"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-sm-12">
                        <br />
                        <div className="col-sm-3">
                          <label>Listing Type:</label>
                          <div
                            className="form-group has-feedback"
                            style={{ width: "100%" }}
                          >
                            <Select
                              id="listingtypeId"
                              defaultValue={listingvalue[0]}
                              name="selectlistingType"
                              options={listingvalue}
                              value={this.state.selectListingTypeupdate}
                              onChange={this.onHandlelistingDropupdate}
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
                          <label>Ship From (Zip Code):</label>
                          <input
                            type="text"
                            className="form-control"
                            name="ZipCodeupdate"
                            onChange={this.onInputHandlerUpdate}
                            value={this.state.ZipCodeupdate}
                            placeholder="ZipCode"
                            id="priceId"
                            required
                          />
                        </div>

                        <div className="col-sm-3">
                          <label>Ship From Loaction:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="ShipFromLoactionupdate"
                            onChange={this.onInputHandlerUpdate}
                            value={this.state.ShipFromLoactionupdate}
                            placeholder="Ship From Loaction"
                            id="SHIPPINGSERVICEid"
                            required
                          />
                        </div>

                        <div className="col-sm-3">
                          <label>Payment Method:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="PaymentMethodupdate"
                            onChange={this.onInputHandlerUpdate}
                            value={this.state.PaymentMethodupdate}
                            placeholder="PayPal"
                            id="POSTAGEid"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-sm-12">
                        <br />
                        <div className="col-sm-3">
                          <label>Paypal Email Address:</label>
                          <input
                            type="email"
                            className="form-control"
                            name="PaypalEmailAddressupdate"
                            onChange={this.onInputHandlerUpdate}
                            value={this.state.PaypalEmailAddressupdate}
                            placeholder="PaypalEmailAddress"
                            id="dateId"
                            required
                          />
                        </div>
                        <div className="col-sm-3">
                          <label>Dispatch Time Max:</label>
                          <input
                            type="number"
                            className="form-control"
                            name="DispatchTimeMaxupdate"
                            onChange={this.onInputHandlerUpdate}
                            value={this.state.DispatchTimeMaxupdate}
                            placeholder="Dispatch Time Max"
                            id="priceId"
                            required
                          />
                        </div>

                        <div className="col-sm-3">
                          <label>Shipping Service:</label>
                          <div
                            className="form-group has-feedback"
                            style={{ width: "100%" }}
                          >
                            {/* <select
                              className="form-control"
                              name="selectShipingservices"
                              id="servicetype"
                              onChange={this.onHandleShipingtDropupdate}
                            >
                              {/* <option>Select</option> *
                              {/* {shipingvalueUpdate} *
                            </select> */}
                            <Select
                              id="servicetype"
                              // defaultValue={dropValue[1]}
                              name="selectShipingservices"
                              options={shipingvalue}
                              value={this.state.selectshippingserviceupdate}
                              onChange={this.onHandleShipingtDropupdate}
                              className="basic-single"
                              classNamePrefix="select"
                              isSearchable
                              select-option

                              // formatGroupLabel={formatGroupLabel}
                            />
                          </div>
                        </div>

                        <div className="col-sm-3">
                          <label>Shpping Service Cost:</label>
                          <input
                            type="number"
                            className="form-control"
                            name="ShppingServiceCostupdate"
                            onChange={this.onInputHandlerUpdate}
                            value={this.state.ShppingServiceCostupdate}
                            placeholder="Shpping Service Cost"
                            id="POSTAGEid"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-sm-12">
                        <br />
                        <div className="col-sm-3">
                          <label>Shpping Service Additional Cost:</label>
                          <input
                            type="number"
                            className="form-control"
                            name="ShppingServiceAdditionalCostupdate"
                            onChange={this.onInputHandlerUpdate}
                            value={
                              this.state.ShppingServiceAdditionalCostupdate
                            }
                            placeholder="Shpping Service Additional Cost"
                            id="dateId"
                            required
                          />
                        </div>
                        <div className="col-sm-3">
                          <label>Return Accepted Option:</label>
                          <div
                            className="form-group has-feedback"
                            style={{ width: "100%" }}
                          >
                            <Select
                              id="servicetype"
                              // defaultValue={dropValue[1]}
                              name="selectReturnOption"
                              options={dropReturnOptionvalue}
                              value={this.state.selectreturnOptionupdate}
                              onChange={this.onHandleReturnOptionDropupdate}
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
                          <label>Returns Within Option:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="ReturnsWithinOptionupdate"
                            onChange={this.onInputHandlerUpdate}
                            value={this.state.ReturnsWithinOptionupdate}
                            placeholder="30"
                            id="SHIPPINGSERVICEid"
                            required
                          />
                        </div>

                        <div className="col-sm-3">
                          <label>Shiping Cost Paid By:</label>
                          <div
                            className="form-group has-feedback"
                            style={{ width: "100%" }}
                          >
                            <Select
                              id="shingPaidId"
                              // defaultValue={dropValue[1]}
                              name="selectshingPaid"
                              options={dropshingPaidvalue}
                              value={this.state.selectshingPaidupdate}
                              onChange={this.onHandleshingPaidDropupdate}
                              className="basic-single"
                              classNamePrefix="select"
                              isSearchable
                              required
                              select-option

                              // formatGroupLabel={formatGroupLabel}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="modal-footer">
                      <button
                        type="submit"
                        className="btn btn-success"
                        style={{ marginTop: "2%" }}
                        onClick={() =>
                          this.clickSaveUpdate(this.state.TEMPLATE_ID)
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

              <div className="modal fade" id="myModal" role="dialog">
                <div className="modal-dialog" style={{ width: "80%" }}>
                  <div className="modal-content">
                    <div className="modal-header">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                      >
                        &times;
                      </button>
                      <h4 className="modal-title"> Add Data</h4>
                    </div>
                    <form
                      onSubmit={this.handleModleOnsubmit}
                      ref={el => (this.myFormRef = el)}
                    >
                      <div className="modal-body">
                        <div className="col-sm-12">
                          <div className="col-sm-3">
                            <label>Template Name:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="TemplateName"
                              onChange={this.onInputHandler}
                              placeholder="Template Name"
                              id="TemplateId"
                              required
                            />
                          </div>
                          <div className="col-sm-3">
                            <label>Site ID:</label>
                            <input
                              type="number"
                              className="form-control"
                              value={this.state.SiteID}
                              name="SiteID"
                              onChange={this.onInputHandler}
                              placeholder="0"
                              id="SiteId"
                              required
                            />
                          </div>

                          <div className="col-sm-3">
                            <label>Ship From Country:</label>
                            <input
                              type="text"
                              className="form-control"
                              value={this.state.ShipFromCountry}
                              name="ShipFromCountry"
                              onChange={this.onInputHandler}
                              placeholder="US"
                              id="CountryId"
                              required
                            />
                          </div>

                          <div className="col-sm-3">
                            <label>Currency:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="Currency"
                              value={this.state.Currency}
                              onChange={this.onInputHandler}
                              placeholder="USD"
                              id="CurrencyId"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-sm-12">
                          <br />
                          <div className="col-sm-3">
                            <label>Listing Type:</label>
                            <div
                              className="form-group has-feedback"
                              style={{ width: "100%" }}
                            >
                              <Select
                                id="listingtypeId"
                                // defaultValue={dropValue[1]}
                                name="selectlistingType"
                                options={listingvalue}
                                value={this.state.selectListingType}
                                onChange={this.onHandlelistingDrop}
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
                            <label>Ship From (Zip Code):</label>
                            <input
                              type="text"
                              className="form-control"
                              name="ZipCode"
                              onChange={this.onInputHandler}
                              placeholder="ZipCode"
                              id="priceId"
                              required
                            />
                          </div>

                          <div className="col-sm-3">
                            <label>Ship From Loaction:</label>
                            <input
                              type="text"
                              className="form-control"
                              value={this.state.ShipFromLoaction}
                              name="ShipFromLoaction"
                              onChange={this.onInputHandler}
                              placeholder="Ship From Loaction"
                              id="SHIPPINGSERVICEid"
                              required
                            />
                          </div>

                          <div className="col-sm-3">
                            <label>Payment Method:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="PaymentMethod"
                              value={this.state.PaymentMethod}
                              onChange={this.onInputHandler}
                              placeholder="PayPal"
                              id="POSTAGEid"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-sm-12">
                          <br />
                          <div className="col-sm-3">
                            <label>Paypal Email Address:</label>
                            <input
                              type="email"
                              className="form-control"
                              name="PaypalEmailAddress"
                              onChange={this.onInputHandler}
                              placeholder="Example@gmail.com"
                              id="dateId"
                              required
                            />
                          </div>
                          <div className="col-sm-3">
                            <label>Dispatch Time Max:</label>
                            <input
                              type="number"
                              className="form-control"
                              name="DispatchTimeMax"
                              onChange={this.onInputHandler}
                              placeholder="Dispatch Time Max"
                              id="priceId"
                              required
                            />
                          </div>

                          <div className="col-sm-3">
                            <label>Shipping Service:</label>
                            <div
                              className="form-group has-feedback"
                              style={{ width: "100%" }}
                            >
                              {/* <select
                                className="form-control"
                                name="selectShipingservicesUpdate"
                                id="shipingservicesUpdateid"
                                placeholder="Select"
                                onChange={this.onHandleShipingtDrop}
                              >
                                {shipingvalue}
                              </select> */}

                              <Select
                                id="servicetype"
                                // defaultValue={dropValue[1]}
                                name="selectShipingservices"
                                options={shipingvalue}
                                value={this.state.selectshippingservice}
                                onChange={this.onHandleShipingtDrop}
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
                            <label>Shpping Service Cost:</label>
                            <input
                              type="number"
                              className="form-control"
                              name="ShppingServiceCost"
                              onChange={this.onInputHandler}
                              placeholder="Shpping Service Cost"
                              id="POSTAGEid"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-sm-12">
                          <br />
                          <div className="col-sm-3">
                            <label>Shpping Service Additional Cost:</label>
                            <input
                              type="number"
                              className="form-control"
                              name="ShppingServiceAdditionalCost"
                              onChange={this.onInputHandler}
                              placeholder="Shpping Service Additional Cost"
                              id="dateId"
                              required
                            />
                          </div>
                          <div className="col-sm-3">
                            <label>Return Accepted Option:</label>
                            <div
                              className="form-group has-feedback"
                              style={{ width: "100%" }}
                            >
                              <Select
                                id="servicetype"
                                // defaultValue={dropValue[1]}
                                name="selectReturnOption"
                                options={dropReturnOptionvalue}
                                value={this.state.selectreturnOption}
                                onChange={this.onHandleReturnOptionDrop}
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
                            <label>Returns Within Option:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="ReturnsWithinOption"
                              value={this.state.ReturnsWithinOption}
                              o30nChange={this.onInputHandler}
                              placeholder="30"
                              id="SHIPPINGSERVICEid"
                              required
                            />
                          </div>

                          <div className="col-sm-3">
                            <label>Shiping Cost Paid By:</label>
                            <div
                              className="form-group has-feedback"
                              style={{ width: "100%" }}
                            >
                              <Select
                                id="shingPaidId"
                                // defaultValue={dropValue[1]}
                                name="selectshingPaid"
                                options={dropshingPaidvalue}
                                value={this.state.selectshingPaid}
                                onChange={this.onHandleshingPaidDrop}
                                className="basic-single"
                                classNamePrefix="select"
                                isSearchable
                                required
                                select-option

                                // formatGroupLabel={formatGroupLabel}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="modal-footer">
                        <button
                          type="submit"
                          disabled={!enable}
                          className="btn btn-success"
                          style={{ marginTop: "2%" }}
                        >
                          Save
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
                  <h3 className="box-title">Templates</h3>
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
                    <div className="col-sm-3">
                      <button
                        className="btn btn-primary"
                        data-toggle="modal"
                        data-target="#myModal"
                        id="myModal"
                        style={{ width: "50%" }}
                      >
                        Add
                      </button>
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
                        //  cellEdit={cellEditProp}
                        // insertRow={ true }
                        data={this.props.templatedata}
                        // footerData={footerData}
                        // footer
                        pagination
                        search
                        // trClassName={this.trClassFormat}
                        options={options}
                        //totalRow={totalRow}
                        // insertRow
                        exportCSV
                        // deleteRow={true}
                        //selectRow={selectRowProp}
                        // option={option}
                      >
                        <TableHeaderColumn
                          width="5.88%"
                          isKey={true}
                          editable={false}
                          dataSort={true}
                          dataFormat={actionFormatter}
                          dataField="TEMPLATE_ID"
                        >
                          Action
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="5.88%"
                          editable={false}
                          export={false}
                          dataField="TEMPLATE_NAME"
                        >
                          {" "}
                          Template Name{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="5.88%"
                          editable={false}
                          dataSort={true}
                          dataField="EBAY_LOCAL"
                        >
                          {" "}
                          Site ID
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="5.88%"
                          editable={false}
                          dataSort={true}
                          dataField="SHIP_FROM_LOC"
                        >
                          Ship From Country
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="5.88%"
                          editable={false}
                          dataSort={true}
                          dataField="CURRENCY"
                        >
                          Currency{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="5.88%"
                          editable={false}
                          ordering={true}
                          dataSort={true}
                          dataField="LIST_TYPE"
                        >
                          Listing Type{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="5.88%"
                          editable={false}
                          ordering={true}
                          dataSort={true}
                          dataField="SHIP_FROM_ZIP_CODE"
                        >
                          Ship From (Zip Code)
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="5.88%"
                          editable={false}
                          ordering={true}
                          dataSort={true}
                          dataField="SHIP_FROM_LOC"
                        >
                          {" "}
                          Ship From Loaction
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="5.88%"
                          editable={false}
                          dataSort={true}
                          dataField="PAYMENT_METHOD"
                        >
                          {" "}
                          Payment Method
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="5.88%"
                          editable={false}
                          dataSort={true}
                          dataField="PAYPAL_EMAIL"
                        >
                          Paypal Email Address
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="5.88%"
                          dataSort={true}
                          dataField="DISPATCH_TIME_MAX"
                          editable={{ type: "textarea" }}
                        >
                          {" "}
                          Dispatch Time Max:
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="5.88%"
                          editable={false}
                          dataSort={true}
                          dataField="SHIPPING_SERVICE"
                        >
                          {" "}
                          Shipping Service
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="5.88%"
                          editable={false}
                          dataSort={true}
                          hidden
                          dataField="ID"
                        >
                          {" "}
                          Shipping Id
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="5.88%"
                          editable={false}
                          ordering={true}
                          dataSort={true}
                          dataField="SHIPPING_COST"
                        >
                          Shpping Service Cost
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="5.88%"
                          editable={false}
                          ordering={true}
                          dataSort={true}
                          dataField="ADDITIONAL_COST"
                        >
                          {" "}
                          Shpping Service Additional Cost
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="5.88%"
                          editable={false}
                          dataSort={true}
                          dataField="RETURN_OPTION"
                        >
                          {" "}
                          Return Accepted Option
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="5.88%"
                          editable={false}
                          dataSort={true}
                          dataField="RETURN_DAYS"
                        >
                          Returns Within Option
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="5.88%"
                          dataSort={true}
                          dataField="SHIPPING_PAID_BY"
                          editable={{ type: "textarea" }}
                        >
                          {" "}
                          Shipping Cost Paid By
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
    templatedata: state.templateReducer.templatedata,
    shipdata: state.templateReducer.shipdata
  };
};
export default connect(
  mapStateToProps,
  actions
)(TemplateForm);
