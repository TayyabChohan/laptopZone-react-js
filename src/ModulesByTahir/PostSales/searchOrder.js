import React, { Component } from "react";
import { ToastsContainer, ToastsStore } from "react-toasts";
import { Link, Redirect } from "react-router-dom";
import $ from "jquery";
import "gasparesganga-jquery-loading-overlay";
import notify from "../Functions/notify";
import { RViewer, RViewerTrigger } from "react-viewerjs";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../CSS_Files/table.css";
import LocationHistory from "../Items_Audit/locationHistory";
import firebase from "../../components/firebaseConfig/Firebase";

var that = "";
var i = 0;
function blink(selector) {
  // all blink happen with 8 seconds interval

  setTimeout(function() {
    $(selector).fadeOut("fast", function() {
      $(this).fadeIn("fast", function() {
        if (i < 3) {
          blink(this); // recursive function will call after fadeIn finish
          i++;
        }
      });
    });
  }, 300); // set interval to 8 seconds
}

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

  openModal = (cell, row, method) => {
    if (method == 1) {
      var address1 = row.SHIPPING_ADDRESS1;
      var address2 = row.SHIPPING_ADDRESS2;
      var shipping_city = row.SHIPPING_CITY;
      var shipping_state = row.SHIPPING_STATE;
      var shipping_zip = row.SHIPPING_ZIP;
      var shipping_country = row.SHIPPING_COUNTRY;

      that.setState({
        selectedCell: cell,
        selectedRow: row,
        address1: address1,
        address2: address2,
        buyerCity: shipping_city,
        buyerState: shipping_state,
        buyerZip: shipping_zip,
        buyerCountry: shipping_country
      });
    } else {
      that.setState({
        selectedCell: cell,
        selectedRow: row
      });
    }
  };
  printNewLabel = (cell, row) => {
    $("#shipmentRates").hide();
    $("#shipmentLabel").hide();
    $("#shipmentForm").show();
    that.setState({
      selectedCell: cell,
      shippingRates: [],
      shippingLabel: [],
      selectedRow: row,
      fromAccount: row.ACCOUNT_NAME,
      fromStreet1: "2720 Royal Lane",
      fromStreet2: "#180",
      fromCity: "Dallas",
      fromState: "TX",
      fromZip: "75229",
      fromPhone: "",
      toName: row.BUYER_FULLNAME,
      toCompany: "",
      toStreet1: row.SHIPPING_ADDRESS1
        ? row.SHIPPING_ADDRESS1
        : row.SHIP_TO_ADDRESS1
        ? row.SHIP_TO_ADDRESS1
        : row.BUYER_ADDRESS1,
      toCity: row.SHIPPING_CITY
        ? row.SHIPPING_CITY
        : row.SHIP_TO_CITY
        ? row.SHIP_TO_CITY
        : row.BUYER_CITY,
      toState: row.SHIPPING_STATE
        ? row.SHIPPING_STATE
        : row.SHIP_TO_STATE
        ? row.SHIP_TO_STATE
        : row.BUYER_STATE,
      toZip: row.SHIPPING_ZIP
        ? row.SHIPPING_ZIP
        : row.SHIP_TO_ZIP
        ? row.SHIP_TO_ZIP
        : row.BUYER_ZIP,
      parcelWeight: row.PACK_WEIGHT ? row.PACK_WEIGHT : "",
      parcelLength: "",
      parcelWidth: "",
      parcelHeight: ""
    });

    $("#openWeightButton").click();
  };
  ReprintLabel = (cell, row) => {
    var sale_record_no = row.SALE_RECORD_NO;
    var database = firebase.database();
    var arrayData = [];
    $.LoadingOverlay("show");
    var starCountRef = firebase
      .database()
      .ref("shippingLabel/" + sale_record_no + "/label_links");
    starCountRef.on("value", function(snapshot) {
      arrayData = snapshot.val();
      $.LoadingOverlay("hide");
      if (arrayData.length == 1) {
        window.open(arrayData[0]);
      } else {
        that.setState({
          firebaseData: snapshot.val(),
          orderId: sale_record_no
        });
        $("#openShippingLabelsButton").click();
      }
    });
  };
  render() {
    return (
      <React.Fragment>
        <div>
          <button
            type="button"
            title="Print Label"
            name="Print-Label"
            id="button4"
            className="btn btn-sm btn-success fa fa-print"
            onClick={() => this.printNewLabel(this.props.cell, this.props.row)}
          />

          <button
            type="button"
            title="Re-Print Label"
            name="re-print-label"
            id="button4"
            className="btn btn-sm btn-info fa fa-print"
            onClick={() => this.ReprintLabel(this.props.cell, this.props.row)}
          />
          <button
            type="button"
            title="Change Address"
            name="change-address"
            data-toggle="modal"
            data-target="#changeAddressModal"
            id="button4"
            className="btn btn-sm btn-primary fa fa-address-card"
            onClick={() => this.openModal(this.props.cell, this.props.row, 1)}
          />
        </div>
      </React.Fragment>
    );
  }
}

function actionFormatter(cell, row) {
  return <ActionFormatter cell={cell} row={row} />;
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
function verified(cell, row) {
  if (!row.VERIFIED_YN) {
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
        {cell}
        <br />
        <p style={{ color: "green" }}>
          <b>ORDER ID: </b>
          {row.SALE_RECORD_NO}
        </p>
        <br />
        <button
          className="btn btn-primary btn-xs"
          data-toggle="modal"
          data-target="#openHistory"
          onClick={() => that.openHistory(cell)}
        >
          Location History
        </button>
        <br />
        <button className="btn btn-xs btn-danger">NOT VERIFIED</button>{" "}
      </div>
    );
  } else {
    return (
      <div>
        {row.EBAY_ITEM_ID ? (
          <a
            href={"https://www.ebay.com/itm/" + row.EBAY_ITEM_ID}
            target="_blank"
          >
            <b>EBAY ID:</b> {row.EBAY_ITEM_ID}
          </a>
        ) : (
          <button className="btn btn-warning btn-xs">Not Listed</button>
        )}
        <br />
        <p>
          <b>BARCODE:</b> {cell}
          <br />
          <p style={{ color: "green" }}>
            <b>ORDER ID:</b> {row.SALE_RECORD_NO}
          </p>
          <br />
          <button
            className="btn btn-primary btn-xs"
            data-toggle="modal"
            data-target="#openHistory"
            onClick={() => that.openHistory(cell)}
          >
            Location History
          </button>
        </p>
        <br />
        <button className="btn btn-xs btn-success">VERIFIED</button>{" "}
      </div>
    );
  }
}

function buyer_details(cell, row) {
  return (
    <div>
      <b>Name:</b> {cell}
      <br />
      <p style={{ color: "green" }}>
        <b>Phone:</b> {row.BUYER_PHONE_NUMBER}
      </p>
      <br />
      <p>
        <b>Email:</b> {row.BUYER_EMAIL}
      </p>
    </div>
  );
}
function buyer_address(cell, row) {
  return (
    <div>
      <b>Address1:</b> {cell}
      <br />
      <p style={{ color: "green" }}>
        <b>Address2:</b>{" "}
        {!row.BUYER_ADDRESS2 ? "NOT GIVEN" : row.BUYER_ADDRESS2}
      </p>
    </div>
  );
}
function shipping_address(cell, row) {
  return (
    <div>
      <b>Address1:</b> {cell}
      <br />
      <p style={{ color: "green" }}>
        <b>Address2:</b>{" "}
        {!row.SHIP_TO_ADDRESS2 ? "NOT GIVEN" : row.SHIP_TO_ADDRESS2}
      </p>
    </div>
  );
}
function buyer_country(cell, row) {
  return (
    <div>
      <b>CITY:</b> {cell}
      <br />
      <p style={{ color: "green" }}>
        <b>STATE:</b> {row.BUYER_STATE}
      </p>
      <br />
      <p>
        <b>ZIP:</b> {row.BUYER_ZIP}
      </p>
      <br />
      <p style={{ color: "green" }}>
        <b>COUNTRY:</b> {row.BUYER_COUNTRY}
      </p>
    </div>
  );
}
function shipper_country(cell, row) {
  return (
    <div>
      <b>CITY:</b> {cell}
      <br />
      <p style={{ color: "green" }}>
        <b>STATE:</b> {row.SHIP_TO_STATE}
      </p>
      <br />
      <p>
        <b>ZIP:</b> {row.SHIP_TO_ZIP}
      </p>
      <br />
      <p style={{ color: "green" }}>
        <b>COUNTRY:</b> {row.SHIP_TO_COUNTRY}
      </p>
    </div>
  );
}
function shipping_country(cell, row) {
  return (
    <div id={"manual-country" + row.BARCODE_NO}>
      <b>CITY:</b> {cell}
      <br />
      <p style={{ color: "green" }}>
        <b>STATE:</b> {row.SHIPPING_STATE}
      </p>
      <br />
      <p>
        <b>ZIP:</b> {row.SHIPPING_ZIP}
      </p>
      <br />
      <p style={{ color: "green" }}>
        <b>COUNTRY:</b> {row.SHIPPING_COUNTRY}
      </p>
    </div>
  );
}
function buyer_manual_address(cell, row) {
  return (
    <div id={"manual-address" + row.BARCODE_NO}>
      <b>Address1:</b> {cell}
      <br />
      <p style={{ color: "green" }}>
        <b>Address2:</b>{" "}
        {!row.SHIPPING_ADDRESS2 ? "NOT GIVEN" : row.SHIPPING_ADDRESS2}
      </p>
    </div>
  );
}
function imageView(cell, row) {
  return <ImageView cell={cell} row={row} />;
}
class SearchOrder extends Component {
  constructor(props) {
    super(props);
    that = this;
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    this.state = {
      baseUrl: finalurl,
      search: "",
      searchOrders: [],
      images: [],
      firebaseData: [],
      shippingRates: [],
      shippingLabel: [],
      selectedCell: "",
      selectedRow: "",
      barcodeClicked: "",
      address1: "",
      address2: "",
      buyerCity: "",
      buyerState: "",
      buyerZip: "",
      buyerCountry: "",
      orderId: "",
      fromAccount: "",
      fromStreet1: "",
      fromStreet2: "",
      fromCity: "",
      fromState: "",
      fromZip: "",
      fromPhone: "",
      toName: "",
      toCompany: "",
      toStreet1: "",
      toCity: "",
      toState: "",
      toZip: "",
      parcelWeight: "",
      parcelLength: "",
      parcelWidth: "",
      parcelHeight: "",
      isLoaded: false
    };
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  openHistory = barcode => {
    this.setState({
      barcodeClicked: barcode,
      isLoaded: true
    });
  };
  closeHistory = () => {
    this.setState({
      barcodeClicked: "",
      isLoaded: false
    });
  };
  buyShipmentLabel = (carrier, service) => {
    const {
      fromAccount,
      fromStreet1,
      fromStreet2,
      fromCity,
      fromState,
      fromZip,
      fromPhone,
      toName,
      toCompany,
      toStreet1,
      toCity,
      toState,
      toZip,
      parcelWeight,
      parcelLength,
      parcelWidth,
      parcelHeight,
      selectedRow
    } = this.state;
    var sale_record_no = selectedRow.SALE_RECORD_NO;
    var barcode_no = selectedRow.BARCODE_NO;
    var lz_salesload_det_id = selectedRow.LZ_SALESLOAD_DET_ID;
    let userId = localStorage.getItem("userId");

    if (!service) {
      alert("Please select Rate!");
      return false;
    }
    $.LoadingOverlay("show");
    let insertUrl =
      this.state.baseUrl +
      "/laptopzone/reactcontroller/c_searchOrder/buyShipmentLabel";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          fromAccount: fromAccount,
          fromStreet1: fromStreet1,
          fromStreet2: fromStreet2,
          fromCity: fromCity,
          fromState: fromState,
          fromZip: fromZip,
          fromPhone: fromPhone,
          toName: toName,
          toCompany: toCompany,
          toStreet1: toStreet1,
          toCity: toCity,
          toState: toState,
          toZip: toZip,
          parcelWeight: parcelWeight,
          parcelLength: parcelLength,
          parcelWidth: parcelWidth,
          parcelHeight: parcelHeight,
          sale_record_no: sale_record_no,
          lz_salesload_det_id: lz_salesload_det_id,
          carrier: carrier,
          service: service,
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
        if (result) {
          this.setState({
            shippingLabel: result
          });
          var label = result[0].label_url;

          firebase
            .database()
            .ref("/shippingLabel/" + sale_record_no)
            .once("value")
            .then(snapshot => {
              var sr_no = snapshot.val();
              if (!sr_no) {
                firebase
                  .database()
                  .ref()
                  .child("/shippingLabel/" + sale_record_no)
                  .set({ PURCHASER_ID: userId, label_links: { 0: label } });
              } else {
                firebase
                  .database()
                  .ref("/shippingLabel/" + sale_record_no + "/label_links")
                  .once("value")
                  .then(snapshot2 => {
                    if (snapshot2) {
                      var labels = snapshot2.val();
                      var newIndex = 0;
                      if (labels) {
                        newIndex = labels.length;
                      }
                      firebase
                        .database()
                        .ref()
                        .child(
                          "/shippingLabel/" +
                            sale_record_no +
                            "/label_links/" +
                            newIndex
                        )
                        .set(label);
                    }
                  });
              }
              console.log(sr_no);
            });

          $("#shipmentRates").hide();
          $("#shipmentForm").hide();
          $("#shipmentLabel").show();
        } else {
          // this.setState({
          //   shippingRates: []
          // });
          notify("error", "No Data Found!");
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };
  callEasyPost = weight => {
    const {
      fromAccount,
      fromStreet1,
      fromStreet2,
      fromCity,
      fromState,
      fromZip,
      fromPhone,
      toName,
      toCompany,
      toStreet1,
      toCity,
      toState,
      toZip,
      parcelWeight,
      parcelLength,
      parcelWidth,
      parcelHeight,
      selectedRow
    } = this.state;
    var sale_record_no = selectedRow.SALE_RECORD_NO;
    var barcode_no = selectedRow.BARCODE_NO;
    var lz_salesload_det_id = selectedRow.LZ_SALESLOAD_DET_ID;
    if (!parcelWeight) {
      alert("Weight cannot be empty!");
      return false;
    }
    $.LoadingOverlay("show");
    let insertUrl =
      this.state.baseUrl +
      "/laptopzone/reactcontroller/c_searchOrder/CallEasyPostApi";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          fromAccount: fromAccount,
          fromStreet1: fromStreet1,
          fromStreet2: fromStreet2,
          fromCity: fromCity,
          fromState: fromState,
          fromZip: fromZip,
          fromPhone: fromPhone,
          toName: toName,
          toCompany: toCompany,
          toStreet1: toStreet1,
          toCity: toCity,
          toState: toState,
          toZip: toZip,
          parcelWeight: parcelWeight,
          parcelLength: parcelLength,
          parcelWidth: parcelWidth,
          parcelHeight: parcelHeight,
          sale_record_no: sale_record_no,
          lz_salesload_det_id: lz_salesload_det_id
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
        if (result) {
          // shipmentRates shipmentForm
          this.setState({
            shippingRates: result
          });
          $("#shipmentRates").show();
          $("#shipmentForm").hide();
          $("#shipmentLabel").hide();
          console.log(result);
        } else {
          this.setState({
            shippingRates: []
          });
          notify("error", "No Data Found!");
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };
  manualAddress = () => {
    const {
      address1,
      address2,
      buyerCity,
      buyerState,
      buyerZip,
      buyerCountry,
      selectedCell,
      selectedRow
    } = this.state;
    var sale_record_no = selectedRow.SALE_RECORD_NO;
    var barcode_no = selectedRow.BARCODE_NO;
    var lz_salesload_det_id = selectedRow.LZ_SALESLOAD_DET_ID;
    $.LoadingOverlay("show");
    let insertUrl =
      this.state.baseUrl +
      "/laptopzone/reactcontroller/c_searchOrder/changeAddress";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          lz_salesload_det_id: lz_salesload_det_id,
          address1: address1,
          address2: address2,
          buyerCity: buyerCity,
          buyerState: buyerState,
          buyerZip: buyerZip,
          buyerCountry: buyerCountry,
          sale_record_no: sale_record_no
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
        if (result.update) {
          $("#closeModal").click();
          notify("success", result.message);

          var orders = this.state.searchOrders;

          for (var i = 0; i < orders.length; i++) {
            if (orders[i].BARCODE_NO == barcode_no) {
              orders[i].SHIPPING_ADDRESS1 = address1;
              orders[i].SHIPPING_ADDRESS2 = address2;
              orders[i].SHIPPING_CITY = buyerCity;
              orders[i].SHIPPING_STATE = buyerState;
              orders[i].SHIPPING_ZIP = buyerZip;
              orders[i].SHIPPING_COUNTRY = buyerCountry;
            }
          }
          var addressId = "#manual-address" + barcode_no;
          i = 0;
          blink(addressId);
          var countryId = "#manual-country" + barcode_no;
          i = 0;
          blink(countryId);

          this.setState({
            searchOrders: orders
          });

          this.setState({
            address1: "",
            address2: "",
            buyerCity: "",
            buyerState: "",
            buyerZip: "",
            buyerCountry: "",
            search: ""
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
  searchOrderID = e => {
    e.preventDefault();
    const { search } = this.state;
    $.LoadingOverlay("show");
    let insertUrl =
      this.state.baseUrl +
      "/laptopzone/reactcontroller/c_searchOrder/getOrderByID";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          searchOrder: search
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
            searchOrders: result.searchResults,
            images: result.images,
            search: ""
          });
        } else {
          this.setState({
            searchOrders: [],
            search: ""
          });
          notify("error", "No Data Found!");
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };
  render() {
    const { searchOrders, orderId, shippingRates } = this.state;
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
          value: searchOrders.length
        }
      ]
    };
    return (
      <React.Fragment>
        <ToastsContainer store={ToastsStore} />
        <section className="content-header">
          <h1>
            Search Order <small>Control Panel</small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/welcom">
                <i className="fa fa-dashboard" /> Home
              </Link>
            </li>
            <li className="active">
              <Link to="/searchOrder">Search Order</Link>
            </li>
          </ol>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title pull-left">Search</h3>
                </div>
                <div className="box-body">
                  <form onSubmit={this.searchOrderID}>
                    <div className="input-group">
                      <input
                        className="form-control"
                        value={this.state.search}
                        id="searchValue"
                        name="search"
                        type="number"
                        onChange={this.handleChange}
                        placeholder="Search by Order ID"
                      />
                      <span className="input-group-btn">
                        <button
                          type="submit"
                          className="btn btn-flat btn-success"
                        >
                          Search
                        </button>
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title pull-left">Search Results</h3>
                </div>
                <div className="box-body">
                  <BootstrapTable
                    data={searchOrders}
                    pagination
                    search
                    tableHeaderClass="add-barcodes"
                    tableBodyClass="add-barcodes"
                    columnWidth="100%"
                    options={options}
                  >
                    <TableHeaderColumn
                      dataField="BARCODE_NO"
                      width="9.1%"
                      dataFormat={actionFormatter}
                    >
                      Action
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="BARCODE_NO"
                      width="9.1%"
                      dataFormat={imageView}
                    >
                      Picture
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="BARCODE_NO"
                      isKey={true}
                      dataFormat={verified}
                      width="9.1%"
                    >
                      <p style={{ color: "#226EC0" }}>EBAY ID</p>
                      <br />
                      BARCODE
                      <br />
                      <p style={{ color: "green" }}>ORDER ID</p>
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="MPN"
                      dataFormat={descriptionMpnUpc}
                      width="9.1%"
                    >
                      <br /> <p style={{ color: "green" }}>MPN</p>
                      <p style={{ color: "#226EC0" }}>MANUFACTURER</p>
                      <br />
                      TITLE
                      <br />
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="BUYER_FULLNAME"
                      width="9.1%"
                      dataFormat={buyer_details}
                    >
                      Buyer Details
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="BUYER_ADDRESS1"
                      width="9.1%"
                      dataFormat={buyer_address}
                    >
                      Buyer Address
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="BUYER_CITY"
                      width="9.1%"
                      dataFormat={buyer_country}
                    >
                      Buyer Country
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="SHIP_TO_ADDRESS1"
                      width="9.1%"
                      dataFormat={shipping_address}
                    >
                      Shipping Address
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="SHIP_TO_CITY"
                      width="9.1%"
                      dataFormat={shipper_country}
                    >
                      Shipping Country
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="SHIPPING_ADDRESS1"
                      width="9.1%"
                      dataFormat={buyer_manual_address}
                    >
                      Manual Shipping Address
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="SHIPPING_CITY"
                      width="9.1%"
                      dataFormat={shipping_country}
                    >
                      Manual Shipping Country
                    </TableHeaderColumn>
                  </BootstrapTable>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div id="openHistory" className="modal fade" role="dialog">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  onClick={this.closeHistory}
                >
                  &times;
                </button>
                <h4 className="modal-title">Location History</h4>
              </div>
              <div className="modal-body">
                {this.state.isLoaded ? (
                  <LocationHistory
                    hideTopBar={true}
                    barcode={this.state.barcodeClicked}
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                  onClick={this.closeHistory}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div id="changeAddressModal" className="modal fade" role="dialog">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 className="modal-title">Change Buyer Address</h4>
              </div>
              <div className="modal-body">
                <div className="form-group col-md-6">
                  <label>Address 1:</label>
                  <input
                    type="text"
                    name="address1"
                    id="address1"
                    className="form-control"
                    onChange={this.handleChange}
                    value={this.state.address1}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>
                    Address 2 <span>(Optional)</span>:
                  </label>
                  <input
                    type="text"
                    name="address2"
                    id="address2"
                    className="form-control"
                    onChange={this.handleChange}
                    value={this.state.address2}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Buyer City:</label>
                  <input
                    type="text"
                    name="buyerCity"
                    id="buyerCity"
                    className="form-control"
                    onChange={this.handleChange}
                    value={this.state.buyerCity}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Buyer State:</label>
                  <input
                    type="text"
                    name="buyerState"
                    id="buyerState"
                    className="form-control"
                    onChange={this.handleChange}
                    value={this.state.buyerState}
                  />
                </div>

                <div className="form-group col-md-6">
                  <label>Buyer Zip:</label>
                  <input
                    type="text"
                    name="buyerZip"
                    id="buyerZip"
                    className="form-control"
                    onChange={this.handleChange}
                    value={this.state.buyerZip}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Buyer Country:</label>
                  <input
                    type="text"
                    name="buyerCountry"
                    id="buyerCountry"
                    className="form-control"
                    onChange={this.handleChange}
                    value={this.state.buyerCountry}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={this.manualAddress}
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

        <button
          id="openShippingLabelsButton"
          name="openShippingLabelsButton"
          data-toggle="modal"
          data-target="#openShippingLabels"
          hidden
          style={{ display: "none" }}
        />

        <div id="openShippingLabels" className="modal fade" role="dialog">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 className="modal-title">
                  Shipping Labels for ORDER ID: {orderId}
                </h4>
              </div>
              <div className="modal-body">
                <div className="col-lg-12 col-md-12">
                  {this.state.firebaseData
                    .slice(0)
                    .reverse()
                    .map((item, index) => (
                      <React.Fragment>
                        <a target="_blank" href={item}>
                          <div className="col-md-3">
                            <div className="thumbnail">
                              <img
                                src={item}
                                alt="ShippingLabel"
                                style={{ width: "150px" }}
                              />
                              <h1 className="label label-primary">
                                {this.state.firebaseData.length - index}
                              </h1>
                            </div>
                          </div>
                        </a>
                      </React.Fragment>
                    ))}
                </div>
              </div>
              <div className="modal-footer">
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
        <button
          id="openWeightButton"
          name="openWeightButton"
          data-toggle="modal"
          data-target="#shippingWeight"
          hidden
          style={{ display: "none" }}
        />

        <div id="shippingWeight" className="modal fade" role="dialog">
          <div className="modal-dialog" style={{ width: "80%" }}>
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 className="modal-title">Shipping Details</h4>
              </div>
              <div className="modal-body">
                <div className="row" id="shipmentForm">
                  <div className="col-md-12">
                    <div className="box">
                      <div className="box-header">
                        <h3 className="box-title pull-left">Origin</h3>
                      </div>
                      <div className="box-body">
                        <div className="form-group col-md-3">
                          <label>Account:</label>
                          <input
                            type="text"
                            name="fromAccount"
                            id="fromAccount"
                            className="form-control"
                            onChange={this.handleChange}
                            value={this.state.fromAccount}
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label>Street1:</label>
                          <input
                            type="text"
                            name="fromStreet1"
                            id="fromStreet1"
                            className="form-control"
                            onChange={this.handleChange}
                            value={this.state.fromStreet1}
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label>Street2 (Option):</label>
                          <input
                            type="text"
                            name="fromStreet2"
                            id="fromStreet2"
                            className="form-control"
                            onChange={this.handleChange}
                            value={this.state.fromStreet2}
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label>City:</label>
                          <input
                            type="text"
                            name="fromCity"
                            id="fromCity"
                            className="form-control"
                            onChange={this.handleChange}
                            value={this.state.fromCity}
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label>State:</label>
                          <input
                            type="text"
                            name="fromState"
                            id="fromState"
                            className="form-control"
                            onChange={this.handleChange}
                            value={this.state.fromState}
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label>Zip:</label>
                          <input
                            type="text"
                            name="fromZip"
                            id="fromZip"
                            className="form-control"
                            onChange={this.handleChange}
                            value={this.state.fromZip}
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label>Phone:</label>
                          <input
                            type="number"
                            name="fromPhone"
                            id="fromPhone"
                            className="form-control"
                            onChange={this.handleChange}
                            value={this.state.fromPhone}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="box">
                      <div className="box-header">
                        <h3 className="box-title pull-left">Destination</h3>
                      </div>
                      <div className="box-body">
                        <div className="form-group col-md-3">
                          <label>Name:</label>
                          <input
                            type="text"
                            name="toName"
                            id="toName"
                            className="form-control"
                            onChange={this.handleChange}
                            value={this.state.toName}
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label>Company:</label>
                          <input
                            type="text"
                            name="toCompany"
                            id="toCompany"
                            className="form-control"
                            onChange={this.handleChange}
                            value={this.state.toCompany}
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label>Street1:</label>
                          <input
                            type="text"
                            name="toStreet1"
                            id="toStreet1"
                            className="form-control"
                            onChange={this.handleChange}
                            value={this.state.toStreet1}
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label>City:</label>
                          <input
                            type="text"
                            name="toCity"
                            id="toCity"
                            className="form-control"
                            onChange={this.handleChange}
                            value={this.state.toCity}
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label>State:</label>
                          <input
                            type="text"
                            name="toState"
                            id="toState"
                            className="form-control"
                            onChange={this.handleChange}
                            value={this.state.toState}
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label>Zip:</label>
                          <input
                            type="text"
                            name="toZip"
                            id="toZip"
                            className="form-control"
                            onChange={this.handleChange}
                            value={this.state.toZip}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="box">
                      <div className="box-header">
                        <h3 className="box-title pull-left">Parcel Details</h3>
                      </div>
                      <div className="box-body">
                        <div className="form-group col-md-3">
                          <label>Weight:</label>
                          <input
                            type="number"
                            name="parcelWeight"
                            id="parcelWeight"
                            className="form-control"
                            onChange={this.handleChange}
                            value={this.state.parcelWeight}
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label>Length (Option):</label>
                          <input
                            type="number"
                            name="parcelLength"
                            id="parcelLength"
                            className="form-control"
                            onChange={this.handleChange}
                            value={this.state.parcelLength}
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label>Width (Option):</label>
                          <input
                            type="number"
                            name="parcelWidth"
                            id="parcelWidth"
                            className="form-control"
                            onChange={this.handleChange}
                            value={this.state.parcelWidth}
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label>Height (Option):</label>
                          <input
                            type="number"
                            name="parcelHeight"
                            id="parcelHeight"
                            className="form-control"
                            onChange={this.handleChange}
                            value={this.state.parcelHeight}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="row"
                  id="shipmentRates"
                  hidden
                  style={{ display: "none" }}
                >
                  {this.state.shippingRates.map((item, index) => (
                    <div
                      className="col-md-4"
                      onClick={() =>
                        this.buyShipmentLabel(item.carrier, item.service)
                      }
                    >
                      <div className="attachment-block clearfix">
                        <img
                          className="attachment-img"
                          src={
                            item.carrier == "USPS"
                              ? "https://assets.easypost.com/assets/images/carriers/usps-logo.20cf47a24031f27b5da1df3b73cef5a8.svg"
                              : ""
                          }
                          alt="attachment image"
                        />
                        <div className="attachment-pushed">
                          <div className="attachment-text">
                            <b>Service: {item.service}</b>
                            <br />
                            Rate: {item.rate}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="row"
                  id="shipmentLabel"
                  hidden
                  style={{ display: "none" }}
                >
                  {this.state.shippingLabel.map((item, index) => (
                    <div className="col-md-12">
                      <div className="attachment-block clearfix col-md-4">
                        <div className="attachment-pushed">
                          <div
                            className="attachment-text"
                            style={{ fontSize: "24px" }}
                          >
                            <b>Tracking No: {item.Tracking_No}</b>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <a target="_blank" href={item.label_url}>
                          <div className="thumbnail_new">
                            <img
                              src={item.label_url}
                              alt="ShippingLabel"
                              className="shipping_label"
                            />
                            <h1 className="label label-primary">Print</h1>
                          </div>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                {this.state.shippingLabel <= 0 ? (
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={this.callEasyPost}
                  >
                    Get Shipping Rates
                  </button>
                ) : (
                  ""
                )}
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
    );
  }
}

export default SearchOrder;
