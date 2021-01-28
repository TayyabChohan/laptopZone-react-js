import React, { Component } from "react";
import { ToastsContainer, ToastsStore } from "react-toasts";
import { Link, Redirect } from "react-router-dom";
import $ from "jquery";
import "gasparesganga-jquery-loading-overlay";
import swal from "sweetalert";
import notify from "../Functions/notify";
import { RViewer, RViewerTrigger } from "react-viewerjs";
import Switch from "@material-ui/core/Switch";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../CSS_Files/verifyCount.css";
import LocationHistory from "./locationHistory";

var that = "";

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
export class ImageView2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cell: this.props.cell,
      row: this.props.row,
      imagesUrl: that.state.images2
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

function imageView(cell, row) {
  return <ImageView cell={cell} row={row} />;
}
function imageView2(cell, row) {
  return <ImageView2 cell={cell} row={row} />;
}

function ebayLink(cell, row) {
  if (cell) {
    return (
      <a href={"https://www.ebay.com/itm/" + cell} target="_blank">
        {cell}
      </a>
    );
  } else {
    return <button className="btn btn-warning btn-xs">Not Listed</button>;
  }
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
            EBAY ID: {row.EBAY_ITEM_ID}
          </a>
        ) : (
          <button className="btn btn-warning btn-xs">Not Listed</button>
        )}
        <br />
        <p>
          BARCODE:{cell}
          <br />
          <button
            className="btn btn-primary btn-xs"
            data-toggle="modal"
            data-target="#openHistory"
            onClick={() => that.openHistory(cell)}
          >
            Open History
          </button>
        </p>
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
            EBAY ID: {row.EBAY_ITEM_ID}
          </a>
        ) : (
          <button className="btn btn-warning btn-xs">Not Listed</button>
        )}
        <br />
        <p>
          BARCODE:{cell}
          <br />
          <button
            className="btn btn-primary btn-xs"
            data-toggle="modal"
            data-target="#openHistory"
            onClick={() => that.openHistory(cell)}
          >
            Open History
          </button>
        </p>
        <br />
        <button className="btn btn-xs btn-success">VERIFIED</button>{" "}
      </div>
    );
  }
}
function verified2(cell, row) {
  if (!row.VERIFIED_YN) {
    return (
      <div>
        {row.EBAY_ITEM_ID ? (
          <a
            href={"https://www.ebay.com/itm/" + row.EBAY_ITEM_ID}
            target="_blank"
          >
            EBAY ID: {row.EBAY_ITEM_ID}
          </a>
        ) : (
          <button className="btn btn-warning btn-xs">Not Listed</button>
        )}
        <br />
        <p>
          BARCODE:{cell}
          <br />
          <button
            className="btn btn-primary btn-xs"
            data-toggle="modal"
            data-target="#openHistory"
            onClick={() => that.openHistory(cell)}
          >
            Open History
          </button>
        </p>
        <br />
        BIN NAME: <p style={{ color: "green" }}>{row.BIN_NAME}</p>
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
            EBAY ID: {row.EBAY_ITEM_ID}
          </a>
        ) : (
          <button className="btn btn-warning btn-xs">Not Listed</button>
        )}
        <br />
        <p>
          BARCODE:{cell}
          <br />
          <button
            className="btn btn-primary btn-xs"
            data-toggle="modal"
            data-target="#openHistory"
            onClick={() => that.openHistory(cell)}
          >
            Open History
          </button>
        </p>
        <br />
        BIN NAME: <p style={{ color: "green" }}>{row.BIN_NAME}</p>
      </div>
    );
  }
}
function descriptionMpnUpc(cell, row) {
  return (
    <React.Fragment>
      <p style={{ color: "#226EC0" }}>{row.UPC}</p>
      <br />
      <p style={{ color: "green" }}>{cell}</p>
      <br />
      <p>{row.DESCR}</p>
    </React.Fragment>
  );
}
function inBound_outBound(cell, row) {
  return (
    <React.Fragment>
      <p style={{ color: "#226EC0" }}>IN BOUND: {cell}</p>
      <br />
      <p>OUT BOUND: {row.OUT_BOUND}</p>
    </React.Fragment>
  );
}
function printFunction(cell, row) {
  return (
    <React.Fragment>
      <div>
        <a
          href={
            that.state.baseUrl +
            "/laptopzone/reactcontroller/c_itemsAudit/printAllStickers/" +
            cell
          }
          title="Barcode Sticker"
          className="btn btn-primary btn-sm"
          target="_blank"
        >
          <span className="glyphicon glyphicon-print" aria-hidden="true" />
        </a>
      </div>
    </React.Fragment>
  );
}

class VerifyCount extends Component {
  constructor(props) {
    super(props);
    that = this;
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    this.state = {
      baseUrl: finalurl,
      search_location: "",
      current_location: "",
      rack_row_id: "",
      bin_id: "",
      new_rack: "",
      bin_remarks: "",
      scanBarcode: "",
      barcodeClicked: "",
      verify_date: "",
      days_left: "",
      new_bin: "",
      isLoaded: false,
      verifiedCount: 0,
      notVerifiedCount: 0,
      divSize: 12,
      barcodesGridFound: [],
      barcodesGridNotFound: [],
      ebayIDRecords: [],
      binContent: [],
      newState: [],
      totalBarcodesInBin: "",
      printYN: true,
      binData: [],
      images: [],
      images2: [],
      binVerify: false
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
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
  componentWillMount = () => {
    var bin_name = localStorage.getItem("bin_name");
    if (bin_name) {
      var bin = bin_name;
      this.setState({
        search_location: bin
      });
      this.searchBinContent(bin);
      localStorage.setItem("bin_name", "");
    } else {
      localStorage.setItem("bin_name", "");
    }
    var loadjs = require("loadjs");
    loadjs(["./Functions.js"], function() {});
  };
  searchBinContent = bin => {
    var search_location = bin;

    $.LoadingOverlay("show");
    let insertUrl =
      this.state.baseUrl +
      "/laptopzone/reactcontroller/c_itemsAudit/searchBinContents";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          bin_name: search_location
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
          var rack_name = result.bind_ids[0].RACK_NAME;
          var rack_row_id = result.bind_ids[0].RACK_ROW_ID;
          var bin_id = result.bind_ids[0].BIN_ID;
          var verify_date = result.bind_ids[0].VERIFY_DATE;
          var days_left = result.bind_ids[0].DAYS_LEFT;
          var binVerify = result.bin_verified;

          var verified = 0;
          var notVerified = 0;

          for (var i = 0; i < result.transfers.length; i++) {
            if (!result.transfers[i].VERIFIED_YN) {
              notVerified++;
            } else {
              verified++;
            }
          }

          $("#append_location").show();
          $("#barcodesGrid").hide();
          $("#NotFoundBarcodesGrid").hide();
          $("#foundGrid").hide();
          $("#notFoundGrid").hide();
          if (result.getImage) {
            this.setState({
              binData: result.bind_ids,
              binContent: result.transfers,
              totalBarcodesInBin: result.transfers.length,
              images: result.images,
              barcodesGridFound: [],
              barcodesGridNotFound: [],
              divSize: 12,
              binVerify: result.bin_verified,
              current_location: rack_name,
              rack_row_id: rack_row_id,
              bin_id: bin_id,
              verify_date: verify_date,
              days_left: days_left,
              verifiedCount: verified,
              notVerifiedCount: notVerified
            });
          } else {
            this.setState({
              binData: result.bind_ids,
              binContent: result.transfers,
              totalBarcodesInBin: result.transfers.length,
              barcodesGridFound: [],
              barcodesGridNotFound: [],
              divSize: 12,
              binVerify: result.bin_verified,
              current_location: rack_name,
              rack_row_id: rack_row_id,
              bin_id: bin_id,
              verify_date: verify_date,
              days_left: days_left,
              verifiedCount: verified,
              notVerifiedCount: notVerified
            });
          }
          $("#binContent").show();
        } else {
          this.setState({
            binData: [],
            binContent: [],
            totalBarcodesInBin: [],
            barcodesGridFound: [],
            barcodesGridNotFound: [],
            divSize: 12,
            binVerify: false,
            current_location: "",
            rack_row_id: "",
            bin_id: "",
            verify_date: "",
            days_left: "",
            verifiedCount: verified,
            notVerifiedCount: notVerified
          });
          notify("error", result.message);
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };
  searchBin = e => {
    e.preventDefault();
    const { search_location } = this.state;

    $.LoadingOverlay("show");
    let insertUrl =
      this.state.baseUrl +
      "/laptopzone/reactcontroller/c_itemsAudit/searchBinContents";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          bin_name: search_location
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
          var rack_name = result.bind_ids[0].RACK_NAME;
          var rack_row_id = result.bind_ids[0].RACK_ROW_ID;
          var bin_id = result.bind_ids[0].BIN_ID;
          var verify_date = result.bind_ids[0].VERIFY_DATE;
          var days_left = result.bind_ids[0].DAYS_LEFT;
          var verified = 0;
          var notVerified = 0;

          for (var i = 0; i < result.transfers.length; i++) {
            if (!result.transfers[i].VERIFIED_YN) {
              notVerified++;
            } else {
              verified++;
            }
          }
          $("#append_location").show();
          $("#barcodesGrid").hide();
          $("#NotFoundBarcodesGrid").hide();
          $("#foundGrid").hide();
          $("#notFoundGrid").hide();
          if (result.getImage) {
            this.setState({
              binData: result.bind_ids,
              binContent: result.transfers,
              totalBarcodesInBin: result.transfers.length,
              images: result.images,
              barcodesGridFound: [],
              barcodesGridNotFound: [],
              divSize: 12,
              binVerify: result.bin_verified,
              current_location: rack_name,
              rack_row_id: rack_row_id,
              bin_id: bin_id,
              verify_date: verify_date,
              days_left: days_left,
              verifiedCount: verified,
              notVerifiedCount: notVerified,
              search_location: "",
              ebayIDRecords: []
            });
          } else {
            this.setState({
              binData: result.bind_ids,
              binContent: result.transfers,
              totalBarcodesInBin: result.transfers.length,
              barcodesGridFound: [],
              barcodesGridNotFound: [],
              divSize: 12,
              binVerify: result.bin_verified,
              current_location: rack_name,
              rack_row_id: rack_row_id,
              bin_id: bin_id,
              verify_date: verify_date,
              days_left: days_left,
              verifiedCount: verified,
              notVerifiedCount: notVerified,
              search_location: "",
              ebayIDRecords: []
            });
          }
          $("#binContent").show();
        } else {
          $("#binContent").hide();
          this.setState({
            binData: [],
            binContent: [],
            totalBarcodesInBin: 0,
            barcodesGridFound: [],
            barcodesGridNotFound: [],
            ebayIDRecords: [],
            divSize: 12,
            binVerify: false,
            current_location: "",
            rack_row_id: "",
            bin_id: "",
            verify_date: "",
            days_left: "",
            verifiedCount: 0,
            notVerifiedCount: 0,
            search_location: ""
          });
          notify("error", result.message);
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };
  UpdateBin = () => {
    const {
      current_location,
      bin_id,
      bin_remarks,
      rack_row_id,
      new_rack
    } = this.state;

    if (!new_rack) {
      notify("error", "Please Add New Rack");
      return false;
    }
    var userId = localStorage.getItem("userId");
    $.LoadingOverlay("show");
    let insertUrl =
      this.state.baseUrl + "/laptopzone/reactcontroller/c_itemsAudit/updateBin";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          current_location: current_location,
          current_bin_id: bin_id,
          bin_remarks: bin_remarks,
          current_row_id: rack_row_id,
          new_rack: new_rack,
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
        if (result.update) {
          var rack_name = result.bind_ids[0].RACK_NAME;
          var rack_row_id = result.bind_ids[0].RACK_ROW_ID;
          var bin_id = result.bind_ids[0].BIN_ID;

          this.setState({
            current_location: rack_name,
            rack_row_id: rack_row_id,
            bin_id: bin_id,
            bin_remarks: "",
            new_rack: ""
          });
          notify("success", result.message);
        } else {
          notify("error", result.message);
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };
  saveVerified = () => {
    const {
      barcodesGridFound,
      barcodesGridNotFound,
      totalBarcodesInBin,
      ebayIDRecords
    } = this.state;

    swal(
      "TOTAL IN BIN: " +
        totalBarcodesInBin +
        "\nTOTAL SCANNED: " +
        barcodesGridFound.length +
        "\nNOT FOUND IN BIN: " +
        barcodesGridNotFound.length +
        "\nEbay ID's Scanned: " +
        ebayIDRecords.length +
        "\nARE YOU SURE?",
      {
        buttons: {
          Yes: {
            text: "Yes",
            value: "Yes"
          },
          cancel: "No!"
        }
      }
    ).then(value => {
      switch (value) {
        case "Yes":
          this.saveFunction();
          break;

        default:
          console.log("No!");
      }
    });
  };
  saveFunction = () => {
    const {
      barcodesGridFound,
      barcodesGridNotFound,
      bin_id,
      binContent,
      ebayIDRecords,
      new_bin
    } = this.state;
    var newBin = "";
    if (new_bin != "") {
      newBin = new_bin;
    } else {
      newBin = bin_id;
    }

    var userId = localStorage.getItem("userId");
    if (!barcodesGridFound || !barcodesGridNotFound) {
      notify("error", "Please scan barcode");
      return false;
    }
    $.LoadingOverlay("show");
    let insertUrl =
      this.state.baseUrl +
      "/laptopzone/reactcontroller/c_itemsAudit/saveVerified";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          barcodesGridFound: barcodesGridFound,
          barcodesGridNotFound: barcodesGridNotFound,
          binContent: binContent,
          bin_id: bin_id,
          userId: userId,
          newBin: newBin,
          ebayIDRecords: ebayIDRecords,
          method: "WEB"
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
        if (result.verified) {
          var verify_date = result.bin_verification[0].VERIFY_DATE;
          var days_left = result.bin_verification[0].DAYS_LEFT;
          var verified = 0;
          var notVerified = 0;

          for (var i = 0; i < result.transfers.length; i++) {
            if (!result.transfers[i].VERIFIED_YN) {
              notVerified++;
            } else {
              verified++;
            }
          }
          this.setState({
            barcodesGridNotFound: [],
            barcodesGridFound: [],
            binContent: result.transfers,
            totalBarcodesInBin: result.transfers.length,
            images: result.images,
            divSize: 12,
            verify_date: verify_date,
            days_left: days_left,
            bin_verified: result.bin_verified,
            verifiedCount: verified,
            notVerifiedCount: notVerified
          });
          $("#foundGrid").hide();
          $("#notFoundGrid").hide();
          notify("success", result.message);
        } else {
          notify("error", result.message);
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };
  searchBarcodeAudit = e => {
    e.preventDefault();
    const { scanBarcode, bin_id } = this.state;

    if (!scanBarcode) {
      notify("error", "Please Scan Barcode");
      return false;
    }
    if (!bin_id) {
      notify("error", "Bin Cannot Be Empty!");
      return false;
    }
    var userId = localStorage.getItem("userId");
    $.LoadingOverlay("show");
    let insertUrl =
      this.state.baseUrl +
      "/laptopzone/reactcontroller/c_itemsAudit/searchBarcodeAudit";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          bin_id: bin_id,
          scanBarcode: scanBarcode,
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
        if (result.found) {
          $("#barcodesGrid").show();
          $("#NotFoundBarcodesGrid").show();

          if (result.ebay_log) {
            var sticker_url =
              this.state.baseUrl +
              "/laptopzone/reactcontroller/c_itemsAudit/printAllStickers/" +
              result.ebay_log.BARCODE_NO;
            if (this.state.printYN) {
              window.open(sticker_url, "_blank");
            }
            if (this.state.ebayIDRecords.length > 0) {
              var newEbayRecord = [];

              newEbayRecord.push({
                LOG_ID: result.ebay_log.LOG_ID,
                LOG_DT_ID: result.ebay_log.LOG_DT_ID,
                EBAY_ID: result.ebay_log.EBAY_ID,
                BARCODE_NO: result.ebay_log.BARCODE_NO,
                STATUS: result.ebay_log.STATUS,
                CREATED_AT: result.ebay_log.CREATED_AT,
                CREATED_BY: result.ebay_log.CREATED_BY
              });
              var ebayBarcode = this.state.ebayIDRecords.filter(
                item => item.BARCODE_NO == result.ebay_log.BARCODE_NO
              );
              if (ebayBarcode.length == 0) {
                var ebayRecords = this.state.ebayIDRecords;
                ebayRecords.push(newEbayRecord[0]);

                this.setState({
                  ebayIDRecords: ebayRecords,
                  scanBarcode: ""
                });
              } else {
                notify("error", "Barcode Already Exist! With this EBAY ID");
              }
            } else {
              var newEbayRecord = [];

              newEbayRecord.push({
                LOG_ID: result.ebay_log.LOG_ID,
                LOG_DT_ID: result.ebay_log.LOG_DT_ID,
                EBAY_ID: result.ebay_log.EBAY_ID,
                BARCODE_NO: result.ebay_log.BARCODE_NO,
                STATUS: result.ebay_log.STATUS,
                CREATED_AT: result.ebay_log.CREATED_AT,
                CREATED_BY: result.ebay_log.CREATED_BY
              });

              var ebayRecords = this.state.ebayIDRecords;
              ebayRecords.push(newEbayRecord[0]);

              this.setState({
                ebayIDRecords: ebayRecords,
                scanBarcode: ""
              });
            }
          } else {
            var newRecord = [];

            newRecord.push({
              BARCODE_NO: result.barcodesGrid[0].BARCODE_NO,
              EBAY_ITEM_ID: result.barcodesGrid[0].EBAY_ITEM_ID,
              DESCR: result.barcodesGrid[0].DESCR,
              VERIFIED_YN: result.barcodesGrid[0].VERIFIED_YN,
              BIN_NAME: result.barcodesGrid[0].BIN_NAME,
              OUT_BOUND: result.barcodesGrid[0].OUT_BOUND,
              MPN: result.barcodesGrid[0].MPN,
              UPC: result.barcodesGrid[0].UPC,
              TRANS_BY_ID: result.barcodesGrid[0].TRANS_BY_ID,
              PULLED_STATUS: result.barcodesGrid[0].PULLED_STATUS,
              TRANSFER_DATE: result.barcodesGrid[0].TRANSFER_DATE
            });

            var foundBarcode = result.barcodesGrid.filter(
              item => item.BIN_BARCODE_YN == "BIN_BARCODE"
            );

            if (foundBarcode.length == 0) {
              if (this.state.barcodesGridNotFound.length > 0) {
                var found = this.state.barcodesGridNotFound.filter(
                  item => item.BARCODE_NO == result.barcodesGrid[0].BARCODE_NO
                );

                if (found.length == 0) {
                  var NotFoundNewArray = this.state.barcodesGridNotFound;
                  NotFoundNewArray.push(newRecord[0]);

                  this.setState({
                    barcodesGridNotFound: NotFoundNewArray,
                    images2: result.images,
                    scanBarcode: ""
                  });
                  $("#scanBarcode").focus();
                  notify("success", result.message);
                } else {
                  this.setState({
                    scanBarcode: ""
                  });
                  $("#scanBarcode").focus();
                  notify("error", "Barcode Already Exist! In Not Found Grid");
                }
              } else {
                this.setState({
                  barcodesGridNotFound: result.barcodesGrid,
                  images2: result.images,
                  scanBarcode: ""
                });
                $("#scanBarcode").focus();
                notify("success", result.message);
              }
            } else {
              if (this.state.barcodesGridFound.length > 0) {
                var found = this.state.barcodesGridFound.filter(
                  item => item.BARCODE_NO == result.barcodesGrid[0].BARCODE_NO
                );

                var barcodes = this.state.binContent;
                for (var i = 0; i < barcodes.length; i++) {
                  if (
                    barcodes[i].BARCODE_NO == result.barcodesGrid[0].BARCODE_NO
                  ) {
                    barcodes.splice(i, 1);
                  }
                }

                if (found.length == 0) {
                  var FoundNewArray = this.state.barcodesGridFound;
                  FoundNewArray.unshift(newRecord[0]);

                  this.setState({
                    barcodesGridFound: FoundNewArray,
                    binContent: barcodes,
                    scanBarcode: ""
                  });
                  $("#scanBarcode").focus();
                  notify("success", result.message);
                } else {
                  this.setState({
                    scanBarcode: ""
                  });
                  $("#scanBarcode").focus();
                  notify("error", "Barcode Already Exist! In Found Grid");
                }
              } else {
                var barcodes = this.state.binContent;
                for (var i = 0; i < barcodes.length; i++) {
                  if (
                    barcodes[i].BARCODE_NO == result.barcodesGrid[0].BARCODE_NO
                  ) {
                    barcodes.splice(i, 1);
                  }
                }
                this.setState({
                  barcodesGridFound: result.barcodesGrid,
                  binContent: barcodes,
                  scanBarcode: ""
                });
                $("#scanBarcode").focus();
                notify("success", result.message);
              }
            }
          }
        } else {
          this.setState({
            scanBarcode: ""
          });
          $("#scanBarcode").focus();
          notify("error", result.message);
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };
  showScanningGrid = () => {
    const { binVerify } = this.state;
    if (binVerify) {
      swal(
        "Bin is already verified. Are you sure you want to Verify it again?",
        {
          buttons: {
            Yes: {
              text: "Yes",
              value: "Yes"
            },
            cancel: "No!"
          }
        }
      ).then(value => {
        switch (value) {
          case "Yes":
            swal(
              "Do you want to verify complete bin again or scan new items and add them with verified items?",
              {
                buttons: {
                  New: {
                    text: "New Items",
                    value: "New"
                  },
                  Verify_Again: {
                    text: "Verify Again",
                    value: "Verify_Again"
                  },
                  cancel: "No!"
                }
              }
            ).then(value => {
              switch (value) {
                case "New":
                  this.NewItems();
                  break;
                case "Verify_Again":
                  this.verifyAgain();
                  break;

                default:
                  console.log("No!");
              }
            });
            break;

          default:
            console.log("No!");
        }
      });
    } else {
      this.setState({
        divSize: 4
      });
      $("#foundGrid").show();
      $("#notFoundGrid").show();
    }
  };
  verifyAgain = () => {
    const { newState } = this.state;
    var alreadyState = newState;
    this.setState({
      divSize: 4,
      barcodesGridFound: [],
      binContent: alreadyState
    });
    $("#foundGrid").show();
    $("#notFoundGrid").show();
    $("#barcodesGrid").hide();
    $("#NotFoundBarcodesGrid").hide();
  };
  NewItems = () => {
    const { binContent } = this.state;
    var allVerified = binContent;
    this.setState({
      divSize: 4,
      barcodesGridFound: allVerified,
      newState: allVerified,
      binContent: []
    });
    $("#foundGrid").show();
    $("#notFoundGrid").show();
    $("#barcodesGrid").show();
    $("#NotFoundBarcodesGrid").show();
  };
  resetBin = () => {
    const { bin_id } = this.state;
    $.LoadingOverlay("show");
    let insertUrl =
      this.state.baseUrl + "/laptopzone/reactcontroller/c_itemsAudit/resetBin";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          bin_id: bin_id
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
        if (result.verified) {
          this.setState({
            binContent: result.transfers,
            totalBarcodesInBin: result.transfers.length,
            images: result.images,
            barcodesGridFound: [],
            barcodesGridNotFound: [],
            verify_date: "",
            days_left: "",
            binVerify: false,
            divSize: 12,
            verifiedCount: 0,
            notVerifiedCount: result.transfers.length
          });
          notify("success", result.message);
        } else {
          notify("error", result.message);
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };
  handleSwitch = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  render() {
    const {
      binContent,
      barcodesGridFound,
      barcodesGridNotFound,
      verify_date,
      days_left,
      ebayIDRecords
    } = this.state;
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
          value: binContent.length
        }
      ]
    };
    const options2 = {
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
          value: barcodesGridFound.length
        }
      ]
    };
    const options3 = {
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
          value: barcodesGridNotFound.length
        }
      ]
    };
    const options4 = {
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
          value: ebayIDRecords.length
        }
      ]
    };
    return (
      <React.Fragment>
        <ToastsContainer store={ToastsStore} />
        <section className="content-header">
          <h1>
            Verify Count <small>Control Panel</small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/welcom">
                <i className="fa fa-dashboard" /> Home
              </Link>
            </li>
            <li>Items Audit</li>
            <li className="active">
              <Link to="/verifyCount">Verify Count</Link>
            </li>
          </ol>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">Transer Bin Location</h3>
                </div>
                <div className="box-body">
                  <div className="col-sm-6">
                    <form onSubmit={this.searchBin}>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <input
                            className="form-control"
                            type="text"
                            name="search_location"
                            id="search_location"
                            value={this.state.search_location}
                            onChange={this.handleChange}
                            placeholder="Search Bin"
                          />
                        </div>
                      </div>
                      <div className="col-sm-2">
                        <div className="form-group">
                          <input
                            type="submit"
                            title="Search Item"
                            className="btn btn-primary"
                            name="transfer_location"
                            id="searchBinForm"
                            value="Search"
                          />
                        </div>
                      </div>
                    </form>
                  </div>

                  <div id="append_location" hidden style={{ display: "none" }}>
                    <div className="form-group col-sm-2">
                      <label
                        style={{ fontSize: "22px", color: "green" }}
                        className="control-label"
                      >
                        Total Items in Bin :{" "}
                      </label>
                      <b style={{ fontSize: "24px" }}>
                        {this.state.totalBarcodesInBin}
                      </b>
                    </div>
                    <div className="form-group col-sm-2">
                      <label
                        style={{ fontSize: "22px", color: "green" }}
                        className="control-label"
                      >
                        Verified :{" "}
                      </label>
                      <b style={{ fontSize: "24px" }}>
                        {this.state.verifiedCount}
                      </b>
                    </div>
                    <div className="form-group col-sm-2">
                      <label
                        style={{ fontSize: "22px", color: "red" }}
                        className="control-label"
                      >
                        Not Verified :{" "}
                      </label>
                      <b style={{ fontSize: "24px" }}>
                        {this.state.notVerifiedCount}
                      </b>
                    </div>
                    <div className="col-sm-12">
                      <div className="form-group col-sm-6">
                        <label
                          style={{ fontSize: "22px", color: "red" }}
                          className="control-label"
                        >
                          Verify Date:{" "}
                        </label>
                        <b style={{ fontSize: "24px" }}>{verify_date}</b>
                      </div>
                      <div className="form-group col-sm-6">
                        <label
                          style={{ fontSize: "22px", color: "red" }}
                          className="control-label"
                        >
                          Days Status:{" "}
                        </label>
                        <b style={{ fontSize: "24px" }}>{days_left}</b>
                      </div>
                      <div className="col-sm-4">
                        <label htmlFor="current_location">
                          Location | Row No | Bin No{" "}
                        </label>
                        <div className="form-group">
                          <input
                            type="text"
                            name="current_location"
                            id="current_location"
                            className="form-control"
                            readOnly
                            value={this.state.current_location}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="col-sm-2">
                        <label htmlFor="new_rack">New Rack Row</label>
                        <div className="form-group">
                          <input
                            type="text"
                            name="new_rack"
                            id="new_rack"
                            className="form-control"
                            value={this.state.new_rack}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="col-sm-4">
                        <label htmlFor="bin_remarks">Remarks</label>
                        <div className="form-group">
                          <input
                            type="text"
                            name="bin_remarks"
                            id="bin_remarks"
                            className="form-control"
                            value={this.state.bin_remarks}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <label htmlFor="bin_remarks">
                          New Bin For Ebay Id's
                        </label>
                        <div className="form-group">
                          <input
                            type="text"
                            name="new_bin"
                            id="new_bin"
                            className="form-control"
                            value={this.state.new_bin}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <label htmlFor="ebayIdsScanned" />
                      <div
                        className="form-group col-sm-4 btn btn-success "
                        data-toggle="modal"
                        data-target="#openEbayIds"
                      >
                        <b style={{ fontSize: "24px" }}>
                          Ebay ID's Scanned: {this.state.ebayIDRecords.length}
                        </b>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="col-sm-3">
                        <div className="form-group">
                          <button
                            id="update_location"
                            className="btn btn-primary btn-md"
                            onClick={this.UpdateBin}
                          >
                            Update Bin
                          </button>
                        </div>
                      </div>
                      <div className="col-sm-3">
                        <div className="form-group">
                          <button
                            id="verifyCount"
                            className="btn btn-info btn-md"
                            onClick={this.showScanningGrid}
                          >
                            Verify Count
                          </button>
                        </div>
                      </div>
                      <div className="col-sm-3">
                        <div className="form-group">
                          <Link
                            to="/locationHistory"
                            style={{ color: "white" }}
                          >
                            <button className="btn btn-success">
                              Location history
                            </button>
                          </Link>
                        </div>
                      </div>
                      <div className="col-sm-3">
                        <div className="form-group">
                          <Link
                            to="/barcodeShortage"
                            style={{ color: "white" }}
                          >
                            <button className="btn btn-danger">
                              Barcode Shortage
                            </button>
                          </Link>
                        </div>
                      </div>
                      <div className="col-sm-3">
                        <div className="form-group">
                          <Link to="/auditStats" style={{ color: "white" }}>
                            <button className="btn btn-info">
                              Audit Statistics
                            </button>
                          </Link>
                        </div>
                      </div>
                      <div className="col-sm-3 pull-right">
                        <label>Print Yes / No</label>
                        <Switch
                          checked={this.state.printYN}
                          onChange={this.handleSwitch("printYN")}
                          value="1"
                          color="primary"
                        />
                      </div>
                      {this.state.verifiedCount > 0 ? (
                        <div className="col-sm-3">
                          <div className="form-group">
                            <button
                              className="btn btn-danger"
                              onClick={this.resetBin}
                            >
                              Reset Bin
                            </button>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div
              className={"col-md-" + this.state.divSize}
              id="binContent"
              hidden
              style={{ display: "none" }}
            >
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">Bin Contents</h3>
                  <div className="form-group pull-right">
                    <label
                      style={{ fontSize: "18px", color: "green" }}
                      className="control-label"
                    >
                      Total Items In Bin :{" "}
                    </label>
                    <b style={{ fontSize: "18px" }}>{binContent.length}</b>
                  </div>
                </div>
                <div className="box-body">
                  <div className="verifyPricingTable">
                    <div className="verify-pricing-content">
                      <BootstrapTable
                        data={binContent}
                        pagination
                        hover
                        striped
                        search
                        tableHeaderClass="my-header-class"
                        columnWidth="100%"
                        options={options}
                      >
                        <TableHeaderColumn
                          dataField="BARCODE_NO"
                          width="25%"
                          dataFormat={imageView}
                        >
                          Picture
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="BARCODE_NO"
                          isKey={true}
                          width="20%"
                          dataFormat={verified}
                        >
                          <p style={{ color: "#226EC0" }}>EBAY ID</p>
                          <br />
                          BARCODE
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          dataField="MPN"
                          width="20%"
                          dataFormat={descriptionMpnUpc}
                        >
                          <p style={{ color: "#226EC0" }}>UPC </p>
                          <br /> <p style={{ color: "green" }}>MPN</p>
                          <br />
                          TITLE
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField="TRANS_BY_ID" width="20%">
                          TRANSFER BY
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="TRANSFER_DATE"
                          width="20%"
                          dataFormat={inBound_outBound}
                        >
                          STAMP
                        </TableHeaderColumn>
                      </BootstrapTable>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Found Barcodes Grid */}
            <div
              className="col-md-4"
              id="foundGrid"
              hidden
              style={{ display: "none" }}
            >
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">Scanned</h3>
                  <div className="form-group pull-right">
                    <label
                      style={{ fontSize: "18px", color: "green" }}
                      className="control-label"
                    >
                      Total Scanned :{" "}
                    </label>
                    <b style={{ fontSize: "18px" }}>
                      {barcodesGridFound.length}
                    </b>
                  </div>
                </div>
                <div className="box-body">
                  <div className="col-md-8">
                    <form onSubmit={this.searchBarcodeAudit}>
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control"
                          value={this.state.scanBarcode}
                          id="scanBarcode"
                          name="scanBarcode"
                          onChange={this.handleChange}
                          placeholder="Scan Barcode or Ebay ID"
                        />
                        <span className="input-group-btn">
                          <button
                            type="submit"
                            className="btn btn-flat btn-info"
                          >
                            Search
                          </button>
                        </span>
                      </div>
                    </form>
                  </div>
                  {barcodesGridFound.length > 0 ||
                  barcodesGridNotFound.length > 0 ||
                  ebayIDRecords.length > 0 ? (
                    <div className="form-group col-sm-4">
                      <button
                        type="button"
                        className="btn btn-block btn-success"
                        onClick={this.saveVerified}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                  <div
                    className="col-md-12"
                    id="barcodesGrid"
                    hidden
                    style={{ display: "none" }}
                  >
                    <BootstrapTable
                      data={barcodesGridFound}
                      pagination
                      hover
                      striped
                      search
                      tableHeaderClass="my-header-class"
                      columnWidth="100%"
                      options={options2}
                    >
                      <TableHeaderColumn
                        dataField="BARCODE_NO"
                        isKey={true}
                        width="25%"
                        dataFormat={verified}
                      >
                        <p style={{ color: "#226EC0" }}>EBAY ID</p>
                        <br />
                        BARCODE
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="MPN"
                        width="25%"
                        dataFormat={descriptionMpnUpc}
                      >
                        <p style={{ color: "#226EC0" }}>UPC </p>
                        <br /> <p style={{ color: "green" }}>MPN</p>
                        <br />
                        TITLE
                      </TableHeaderColumn>
                      <TableHeaderColumn dataField="TRANS_BY_ID" width="25%">
                        TRANSFER BY
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="TRANSFER_DATE"
                        width="25%"
                        dataFormat={inBound_outBound}
                      >
                        {/* <p style={{ color: "#226EC0" }}>IN BOUND STAMP</p>
                          <br />
                          OUT BOUND  */}
                        STAMP
                      </TableHeaderColumn>
                    </BootstrapTable>
                  </div>
                </div>
              </div>
            </div>
            {/* #END# Found Barcodes Grid */}
            {/* Not Found Barcodes Grid */}
            <div
              className="col-md-4"
              id="notFoundGrid"
              hidden
              style={{ display: "none" }}
            >
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">Not Found</h3>
                  <div className="form-group pull-right">
                    <label
                      style={{ fontSize: "18px", color: "green" }}
                      className="control-label"
                    >
                      Total Not Found :{" "}
                    </label>
                    <b style={{ fontSize: "18px" }}>
                      {barcodesGridNotFound.length}
                    </b>
                  </div>
                </div>
                <div className="box-body">
                  <div
                    className="col-md-12"
                    id="NotFoundBarcodesGrid"
                    hidden
                    style={{ display: "none" }}
                  >
                    <div className="verifyPricingTable">
                      <div className="verify-pricing-content">
                        <BootstrapTable
                          data={barcodesGridNotFound}
                          pagination
                          hover
                          striped
                          search
                          tableHeaderClass="my-header-class"
                          columnWidth="100%"
                          options={options3}
                        >
                          <TableHeaderColumn
                            dataField="BARCODE_NO"
                            width="20%"
                            dataFormat={imageView2}
                          >
                            Picture
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="BARCODE_NO"
                            isKey={true}
                            width="20%"
                            dataFormat={verified2}
                          >
                            <p style={{ color: "#226EC0" }}>EBAY ID</p>
                            <br />
                            BARCODE
                            <br />
                            <p style={{ color: "green" }}>BIN NAME</p>
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="MPN"
                            width="20%"
                            dataFormat={descriptionMpnUpc}
                          >
                            <p style={{ color: "#226EC0" }}>UPC </p>
                            <br /> <p style={{ color: "green" }}>MPN</p>
                            <br />
                            TITLE
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="TRANS_BY_ID"
                            width="20%"
                          >
                            TRANSFER BY
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="TRANSFER_DATE"
                            width="20%"
                            dataFormat={inBound_outBound}
                          >
                            STAMP
                          </TableHeaderColumn>
                        </BootstrapTable>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* #END# Not Found Barcodes Grid */}
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
        <div id="openEbayIds" className="modal fade" role="dialog">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 className="modal-title">Location History</h4>
              </div>
              <div className="modal-body">
                <BootstrapTable
                  data={ebayIDRecords}
                  pagination
                  hover
                  striped
                  search
                  tableHeaderClass="my-header-class"
                  columnWidth="100%"
                  options={options4}
                >
                  <TableHeaderColumn
                    dataField="BARCODE_NO"
                    width="20%"
                    dataFormat={printFunction}
                  >
                    PRINT
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="BARCODE_NO"
                    isKey={true}
                    width="20%"
                  >
                    BARCODE NO
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="EBAY_ID" width="20%">
                    EBAY ID
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="CREATED_AT" width="20%">
                    CREATED AT
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="CREATED_BY" width="20%">
                    CREATED BY
                  </TableHeaderColumn>
                </BootstrapTable>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
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

export default VerifyCount;
