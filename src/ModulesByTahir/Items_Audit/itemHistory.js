import React, { Component } from "react";
import { ToastsContainer, ToastsStore } from "react-toasts";
import { Link, Redirect } from "react-router-dom";
import $ from "jquery";
import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";
import Loader from "react-loader-spinner";
import notify from "../Functions/notify";
import ItemHistoryContent from "./itemHistoryContent";
import Flatpickr from "react-flatpickr";
var dateFormat = require("dateformat");

class ItemHistory extends Component {
  constructor(props) {
    super(props);
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    this.state = {
      baseUrl: finalurl,
      itemContent: [],
      images: [],
      contentType: "",
      date: new Date(),
      listedItemCount: "",
      listedBarcodeCount: "",
      shipmentItemCount: "",
      shipmentBarcodeCount: "",
      discardedItemCount: "",
      discardedBarcodeCount: "",
      content: false,
      isLoaded: false,
      open: false
    };
  }
  componentWillMount() {
    this.getItemsHistory();
  }

  getItemsHistory = () => {
    const { date } = this.state;

    var from_date = dateFormat(date[0], "yyyy-mm-dd");
    var to_date = dateFormat(date[1], "yyyy-mm-dd");

    if (!from_date || !to_date) {
      notify("error", "Please select date");
      return false;
    }
    let insertUrl =
      this.state.baseUrl +
      "/laptopzone/reactcontroller/c_itemsAudit/getItemsHistory";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          startDate: from_date,
          endDate: to_date
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
        if (result.found) {
          var listedItemCount = 0;
          var listedBarcodeCount = 0;

          var shipmentItemCount = 0;
          var shipmentBarcodeCount = 0;

          var discardedItemCount = 0;
          var discardedBarcodeCount = 0;

          if (result.listed) {
            listedItemCount = result.listed[0]["TOTAL_ITEMS"];
            listedBarcodeCount = result.listed[0]["TOTAL_BARCODES"];
          }
          if (result.awaitingShipment) {
            shipmentItemCount = result.awaitingShipment[0]["TOTAL_ITEMS"];
            shipmentBarcodeCount = result.awaitingShipment[0]["TOTAL_BARCODES"];
          }
          if (result.discarded) {
            discardedItemCount = result.discarded[0]["TOTAL_ITEMS"];
            discardedBarcodeCount = result.discarded[0]["TOTAL_BARCODES"];
          }
          this.setState({
            listedItemCount: listedItemCount,
            listedBarcodeCount: listedBarcodeCount,
            shipmentItemCount: shipmentItemCount,
            shipmentBarcodeCount: shipmentBarcodeCount,
            discardedItemCount: discardedItemCount,
            discardedBarcodeCount: discardedBarcodeCount,
            isLoaded: true
          });
        } else {
          this.setState({
            listedItemCount: 0,
            listedBarcodeCount: 0,
            shipmentItemCount: 0,
            shipmentBarcodeCount: 0,
            discardedItemCount: 0,
            discardedBarcodeCount: 0,
            isLoaded: true
          });
          notify("error", result.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  loadContent = method => {
    const { date } = this.state;

    var from_date = dateFormat(date[0], "yyyy-mm-dd");
    var to_date = dateFormat(date[1], "yyyy-mm-dd");

    if (!from_date || !to_date) {
      notify("error", "Please select date");
      return false;
    }
    this.setState({
      open: false,
      content: false
    });
    var methodName = "";
    if (method == "listed") {
      methodName = method;
    }
    if (method == "shipment") {
      methodName = method;
    }
    if (method == "discarded") {
      methodName = method;
    }
    this.setState({
      open: true
    });
    let insertUrl =
      this.state.baseUrl +
      "/laptopzone/reactcontroller/c_itemsAudit/getItemsHistoryContent";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          method: methodName,
          startDate: from_date,
          endDate: to_date
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
        if (result.found) {
          this.setState({
            itemContent: result.itemHistoryContent,
            contentType: result.queryFrom,
            images: result.images,
            content: true
          });
        } else {
          this.setState({
            itemContent: [],
            contentType: method,
            images: [],
            content: true
          });
          notify("error", result.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const {
      itemContent,
      contentType,
      images,
      date,
      listedItemCount,
      listedBarcodeCount,
      shipmentItemCount,
      shipmentBarcodeCount,
      discardedItemCount,
      discardedBarcodeCount,
      isLoaded,
      open,
      content
    } = this.state;
    return (
      <React.Fragment>
        <ToastsContainer store={ToastsStore} />
        <section className="content-header">
          <h1>
            ITEMS HISTORY <small>Control Panel</small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/welcom">
                <i className="fa fa-dashboard" /> Home
              </Link>
            </li>
            <li className="active">
              <Link to="/itemHistory">Items History</Link>
            </li>
          </ol>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title pull-left">Filters</h3>
                </div>
                <div className="box-body">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <Flatpickr
                          options={{
                            mode: "range",
                            dateFormat: "Y-m-d"
                          }}
                          value={date}
                          className="form-control"
                          onChange={date => {
                            this.setState({ date });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-2">
                      <div className="form-group">
                        <input
                          type="submit"
                          className="btn btn-primary btn-sm"
                          name="search_lister"
                          id="search_lister"
                          value="Search"
                          onClick={this.getItemsHistory}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    {isLoaded ? (
                      <React.Fragment>
                        <div className="col-lg-4 col-xs-6">
                          <div className="small-box bg-green">
                            <div className="inner">
                              <h3 style={{ fontSize: "22px" }}>
                                {" "}
                                ITEMS: {listedItemCount} <br /> BARCODES:{" "}
                                {listedBarcodeCount}
                              </h3>
                              <h3 style={{ fontSize: "22px" }}>LISTED</h3>
                            </div>
                            <div className="icon">
                              <i className="ion ion-stats-bars" />
                            </div>
                            <a
                              href="#"
                              className="small-box-footer"
                              onClick={() => this.loadContent("listed")}
                            >
                              More info{" "}
                              <i className="fa fa-arrow-circle-right" />
                            </a>
                          </div>
                        </div>
                        <div className="col-lg-4 col-xs-6">
                          <div className="small-box bg-aqua">
                            <div className="inner">
                              <h3 style={{ fontSize: "22px" }}>
                                {" "}
                                ITEMS: {shipmentItemCount} <br /> BARCODES:{" "}
                                {shipmentBarcodeCount}
                              </h3>
                              <h3 style={{ fontSize: "22px" }}>
                                AWAITING SHIPMENT
                              </h3>
                            </div>
                            <div className="icon">
                              <i className="ion ion-bag" />
                            </div>
                            <a
                              href="#"
                              className="small-box-footer"
                              onClick={() => this.loadContent("shipment")}
                            >
                              More info{" "}
                              <i className="fa fa-arrow-circle-right" />
                            </a>
                          </div>
                        </div>
                        <div className="col-lg-4 col-xs-6">
                          <div className="small-box bg-red">
                            <div className="inner">
                              <h3 style={{ fontSize: "22px" }}>
                                {" "}
                                ITEMS: {discardedItemCount} <br /> BARCODES:{" "}
                                {discardedBarcodeCount}
                              </h3>
                              <h3 style={{ fontSize: "22px" }}>DISCARDED</h3>
                            </div>
                            <div className="icon">
                              <i className="ion ion-pie-graph" />
                            </div>
                            <a
                              href="#"
                              className="small-box-footer"
                              onClick={() => this.loadContent("discarded")}
                            >
                              More info{" "}
                              <i className="fa fa-arrow-circle-right" />
                            </a>
                          </div>
                        </div>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <div style={{ marginLeft: "20px" }}>
                          <Loader
                            type="Triangle"
                            color="#00BFFF"
                            height="100"
                            width="100"
                          />
                        </div>
                      </React.Fragment>
                    )}
                  </div>
                  <SlideDown className={"my-dropdown-slidedown"}>
                    {open ? (
                      content ? (
                        <ItemHistoryContent
                          itemContent={itemContent}
                          images={images}
                          contentType={contentType}
                        />
                      ) : (
                        <div style={{ marginLeft: "20px" }}>
                          <Loader
                            type="Triangle"
                            color="#00BFFF"
                            height="100"
                            width="100"
                          />
                        </div>
                      )
                    ) : (
                      ""
                    )}
                  </SlideDown>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
export default ItemHistory;
