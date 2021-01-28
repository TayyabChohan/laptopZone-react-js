import React, { Component } from "react";
import { ToastsContainer, ToastsStore } from "react-toasts";
import { Link, Redirect } from "react-router-dom";
import $ from "jquery";
import "gasparesganga-jquery-loading-overlay";
import swal from "sweetalert";
import notify from "../Functions/notify";
import { RViewer, RViewerTrigger } from "react-viewerjs";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../CSS_Files/verifyCount.css";

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

export class ActionFormatter extends Component {
  constructor(props) {
    super(props);
  }
  showContents = (cell, row, method) => {
    var search_location = row.BIN_NAME;
    that.setState({
      bin_name: search_location
    });
    var functionName = "";
    if (method == 1) {
      functionName = "searchBinContentsWithoutShortage";
    } else {
      functionName = "searchBinContents";
    }
    $.LoadingOverlay("show");
    let insertUrl =
      that.state.baseUrl +
      "/laptopzone/reactcontroller/c_itemsAudit/" +
      functionName;
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
          var listedContentCount = 0;
          var notListedContentCount = 0;
          var discarded = 0;
          var notDiscarded = 0;

          for (var i = 0; i < result.transfers.length; i++) {
            if (result.transfers[i].LISTED_YN_CONTENT == "NOT") {
              notListedContentCount++;
            } else {
              listedContentCount++;
            }
            if (result.transfers[i].DISCARD == 1) {
              discarded++;
            } else {
              notDiscarded++;
            }
          }

          if (result.getImage) {
            that.setState({
              binContents: result.transfers,
              images: result.images,
              listedContentCount: listedContentCount,
              notListedContentCount: notListedContentCount,
              discarded: discarded,
              notDiscarded: notDiscarded
            });
          } else {
            that.setState({
              binContents: result.transfers,
              listedContentCount: listedContentCount,
              notListedContentCount: notListedContentCount,
              discarded: discarded,
              notDiscarded: notDiscarded
            });
          }
        } else {
          notify("error", result.message);
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };
  action = (cell, row) => {
    var bin_name = row.BIN_NAME;
    this.setState({
      bin_name: bin_name
    });
    localStorage.setItem("bin_name", bin_name);
    that.setRedirect();
  };
  render() {
    return (
      <React.Fragment>
        <div>
          <button
            type="button"
            className="btn btn-sm btn-info btn-xs"
            data-toggle="modal"
            data-target="#openBinContents"
            onClick={
              this.props.row.VERIFY_STATUS == "NOT"
                ? () => this.showContents(this.props.cell, this.props.row, 1)
                : () => this.showContents(this.props.cell, this.props.row, 2)
            }
          >
            Show Contents
          </button>
        </div>
        <div className="form-group">
          <button
            title="Verify Now"
            className="btn btn-success btn-xs"
            onClick={() => {
              this.action(this.props.cell, this.props.row);
            }}
            value={this.props.cell}
          >
            Verify Now
          </button>
        </div>
      </React.Fragment>
    );
  }
}
export class Shortage extends Component {
  constructor(props) {
    super(props);
  }
  showContents = (cell, row) => {
    var bin_id = row.BIN_ID;
    $.LoadingOverlay("show");
    let insertUrl =
      that.state.baseUrl +
      "/laptopzone/reactcontroller/c_itemsAudit/getBarcodeShortageByBin";
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
        if (result.found) {
          var listedCount = 0;
          var notListedCount = 0;
          var shortDiscard = 0;
          var shortNotDiscard = 0;

          for (var i = 0; i < result.shortageList.length; i++) {
            var ebayId = result.shortageList[i].LISTED_STATUS;
            var discard = result.shortageList[i].DISCARD;

            if (ebayId == "NOT") {
              notListedCount++;
            } else if (ebayId == "LISTED") {
              listedCount++;
            }
            if (discard == 1) {
              shortDiscard++;
            } else if (ebayId == "LISTED") {
              shortNotDiscard++;
            }
          }

          that.setState({
            barcodeShortage: result.shortageList,
            images2: result.images,
            listedCount: listedCount,
            notListedCount: notListedCount,
            shortDiscard: shortDiscard,
            shortNotDiscard: shortNotDiscard
          });
        } else {
          that.setState({
            barcodeShortage: [],
            images2: [],
            listedCount: 0,
            notListedCount: 0,
            shortDiscard: shortDiscard,
            shortNotDiscard: shortNotDiscard
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
    return (
      <React.Fragment>
        <div>
          <button
            type="button"
            className="btn btn-sm btn-danger"
            data-toggle="modal"
            data-target="#openBinShortage"
            onClick={() => this.showContents(this.props.cell, this.props.row)}
          >
            Show Shortages({this.props.cell})
          </button>
        </div>
      </React.Fragment>
    );
  }
}
export class DiscardBarcode extends Component {
  constructor(props) {
    super(props);
  }
  openModal = (cell, row) => {
    that.setState({
      selectedCell: cell,
      selectedRow: row,
      remarks: ""
    });
  };
  render() {
    if (this.props.row.DISCARD == 0 && !this.props.row.EBAY_ITEM_ID) {
      return (
        <React.Fragment>
          <div>
            <button
              type="button"
              name="remove"
              id="button4"
              data-toggle="modal"
              data-target="#myModal"
              className="btn btn-sm btn-danger fa fa-trash-o"
              onClick={() => this.openModal(this.props.cell, this.props.row)}
            />
          </div>
        </React.Fragment>
      );
    } else if (this.props.row.DISCARD == 1 && !this.props.row.EBAY_ITEM_ID) {
      return (
        <React.Fragment>
          <div>
            <button
              type="button"
              name="discarded"
              className="btn btn-sm btn-danger"
            >
              Discarded
            </button>
          </div>
        </React.Fragment>
      );
    } else if (this.props.row.EBAY_ITEM_ID) {
      return (
        <React.Fragment>
          <div>
            <button
              type="button"
              name="listed"
              className="btn btn-sm btn-success"
            >
              Already Listed
            </button>
          </div>
        </React.Fragment>
      );
    }
  }
}
function imageView(cell, row) {
  return <ImageView cell={cell} row={row} />;
}
function imageView2(cell, row) {
  return <ImageView2 cell={cell} row={row} />;
}
function actionFormatter(cell, row) {
  return <ActionFormatter cell={cell} row={row} />;
}
function discardBarcode(cell, row) {
  return <DiscardBarcode cell={cell} row={row} />;
}
function shortage(cell, row) {
  return <Shortage cell={cell} row={row} />;
}
function verified(cell, row) {
  if (cell == "VERIFIED") {
    return (
      <div>
        <button className="btn btn-success btn-xs">{cell}</button>
      </div>
    );
  } else if (cell == "NOT") {
    return (
      <div>
        <button className="btn btn-warning btn-xs">NOT VERIFIED</button>
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
        <p>BARCODE:{cell}</p>
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
        <p>BARCODE:{cell}</p>
        <br />
        <button className="btn btn-xs btn-success">VERIFIED</button>{" "}
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
function ebayLink(cell, row) {
  if (cell) {
    return (
      <a href={"https://www.ebay.com/itm/" + cell} target="_blank">
        EBAY ID: {cell}
      </a>
    );
  } else {
    return <button className="btn btn-warning btn-xs">Not Listed</button>;
  }
}
function mpn_upc(cell, row) {
  return (
    <React.Fragment>
      <p style={{ color: "#226EC0" }}>{cell}</p>
      <br />
      {row.UPC ? row.UPC : "No UPC"}
    </React.Fragment>
  );
}
function rowClassNameFormat(row, rowIdx) {
  if (row.DISCARD == 1) {
    return "discardBarcode";
  }
}
class AuditStats extends Component {
  constructor(props) {
    super(props);
    that = this;
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    this.state = {
      baseUrl: finalurl,
      allBins: [],
      binContents: [],
      images: [],
      images2: [],
      barcodeShortage: [],
      bin_name: "",
      verifiedCount: "",
      notVerifiedCount: "",
      WBCount: 0,
      PBCount: 0,
      NACount: 0,
      TCCount: 0,
      ABCount: 0,
      UBCount: 0,
      NOCount: 0,
      WBBinVerified: 0,
      PBBinVerified: 0,
      NABinVerified: 0,
      TCBinVerified: 0,
      ABBinVerified: 0,
      UBBinVerified: 0,
      NOBinVerified: 0,
      totalItems: 0,
      verifiedItems: 0,
      varified: "",
      notVerified: "",
      listedCount: "",
      notListedCount: "",
      notListedContentCount: "",
      listedContentCount: "",
      remarks: "",
      selectedCell: "",
      selectedRow: "",
      discarded: 0,
      notDiscarded: 0,
      shortDiscard: 0,
      shortNotDiscard: 0,
      redirect: false
    };
  }
  deleteBarcode = () => {
    const { remarks, selectedCell, selectedRow } = this.state;
    var barcode = selectedCell;
    let userId = localStorage.getItem("userId");
    $.LoadingOverlay("show");
    let insertUrl =
      that.state.baseUrl +
      "/laptopzone/reactcontroller/c_itemsAudit/discardBarcode";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          barcode: barcode,
          userId: userId,
          discard_remarks: remarks
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
        if (result.discarded) {
          $("#closeModal").click();
          var barcodes = this.state.barcodeShortage;
          for (var i = 0; i < barcodes.length; i++) {
            if (barcodes[i].BARCODE_NO == selectedCell) {
              barcodes[i].DISCARD = 1;
              barcodes[i].REMARKS = remarks;
            }
          }
          this.setState({
            barcodeShortage: barcodes
          });
          var barcodes = this.state.binContents;
          for (var i = 0; i < barcodes.length; i++) {
            if (barcodes[i].BARCODE_NO == selectedCell) {
              barcodes[i].DISCARD = 1;
              barcodes[i].REMARKS = remarks;
            }
          }
          this.setState({
            binContents: barcodes
          });
        } else {
          notify("error", "Something Went Wrong!");
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentWillMount() {
    this.getBinStats();
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };
  getBinStats = () => {
    $.LoadingOverlay("show");
    let insertUrl =
      this.state.baseUrl +
      "/laptopzone/reactcontroller/c_itemsAudit/getBinStats";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST"
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
          var WBCount = 0;
          var WBBinVerified = 0;
          var PBCount = 0;
          var PBBinVerified = 0;
          var NACount = 0;
          var NABinVerified = 0;
          var TCCount = 0;
          var TCBinVerified = 0;
          var ABCount = 0;
          var ABBinVerified = 0;
          var UBCount = 0;
          var UBBinVerified = 0;
          var NOCount = 0;
          var NOBinVerified = 0;
          var varified = 0;
          var notVerified = 0;

          for (var i = 0; i < result.getBinStats.length; i++) {
            var bin_zone = result.getBinStats[i].BIN_ZONE_FILTER;
            var status = result.getBinStats[i].VERIFY_STATUS;

            if (bin_zone == "WHERE HOUSE") {
              WBCount++;
              if (status == "VERIFIED") {
                WBBinVerified++;
              }
            } else if (bin_zone == "PICTURE") {
              PBCount++;
              if (status == "VERIFIED") {
                PBBinVerified++;
              }
            } else if (bin_zone == "NO RACK") {
              NACount++;
              if (status == "VERIFIED") {
                NABinVerified++;
              }
            } else if (bin_zone == "TECHNICIAN") {
              TCCount++;
              if (status == "VERIFIED") {
                TCBinVerified++;
              }
            } else if (bin_zone == "AUDIT") {
              ABCount++;
              if (status == "VERIFIED") {
                ABBinVerified++;
              }
            } else if (bin_zone == "PULLAR") {
              UBCount++;
              if (status == "VERIFIED") {
                UBBinVerified++;
              }
            } else {
              NOCount++;
              if (status == "VERIFIED") {
                NOBinVerified++;
              }
            }
            if (status == "NOT") {
              notVerified++;
            } else if (status == "VERIFIED") {
              varified++;
            }
          }
          var totalItems = result.totalItems;
          var verifiedItems = result.verifiedItems;
          this.setState({
            allBins: result.getBinStats,
            WBCount: WBCount,
            PBCount: PBCount,
            NACount: NACount,
            TCCount: TCCount,
            ABCount: ABCount,
            UBCount: UBCount,
            NOCount: NOCount,
            WBBinVerified: WBBinVerified,
            PBBinVerified: PBBinVerified,
            NABinVerified: NABinVerified,
            TCBinVerified: TCBinVerified,
            ABBinVerified: ABBinVerified,
            UBBinVerified: UBBinVerified,
            NOBinVerified: NOBinVerified,
            totalItems: totalItems,
            verifiedItems: verifiedItems,
            notVerified: notVerified,
            varified: varified
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
  wbFilter = () => {
    this.refs.bin_zone_filter.applyFilter("WHERE HOUSE");
    this.refs.verify_status.applyFilter("");
  };
  pbFilter = () => {
    this.refs.bin_zone_filter.applyFilter("PICTURE");
    this.refs.verify_status.applyFilter("");
  };
  naFilter = () => {
    this.refs.bin_zone_filter.applyFilter("NO RACK");
    this.refs.verify_status.applyFilter("");
  };
  tcFilter = () => {
    this.refs.bin_zone_filter.applyFilter("TECHNICIAN");
    this.refs.verify_status.applyFilter("");
  };
  abFilter = () => {
    this.refs.bin_zone_filter.applyFilter("AUDIT");
    this.refs.verify_status.applyFilter("");
  };
  ubFilter = () => {
    this.refs.bin_zone_filter.applyFilter("PULLAR");
    this.refs.verify_status.applyFilter("");
  };
  notVerifiedFilter = () => {
    this.refs.verify_status.applyFilter("NOT");
    this.refs.bin_zone_filter.applyFilter("");
  };
  verifiedFilter = () => {
    this.refs.verify_status.applyFilter("VERIFIED");
    this.refs.bin_zone_filter.applyFilter("");
  };
  handleAllClick = () => {
    this.refs.bin_zone_filter.applyFilter("");
    this.refs.verify_status.applyFilter("");
  };
  notListedFilter = () => {
    this.refs.listed_status.applyFilter("NOT");
    this.refs.shortage_discard_yn.applyFilter("");
  };
  listedFilter = () => {
    this.refs.listed_status.applyFilter("LISTED");
    this.refs.shortage_discard_yn.applyFilter("");
  };
  shortDiscard = () => {
    this.refs.shortage_discard_yn.applyFilter("1");
    this.refs.listed_status.applyFilter("");
  };
  shortNotDiscard = () => {
    this.refs.shortage_discard_yn.applyFilter("0");
    this.refs.listed_status.applyFilter("");
  };
  showAllFilter = () => {
    this.refs.listed_status.applyFilter("");
    this.refs.shortage_discard_yn.applyFilter("");
  };
  listedContentFilter = () => {
    this.refs.listed_yn.applyFilter("LISTED");
    this.refs.discard_yn.applyFilter("");
  };
  notListedContentFilter = () => {
    this.refs.listed_yn.applyFilter("NOT");
    this.refs.discard_yn.applyFilter("");
  };
  discarded = () => {
    this.refs.discard_yn.applyFilter("1");
    this.refs.listed_yn.applyFilter("");
  };
  notDiscarded = () => {
    this.refs.discard_yn.applyFilter("0");
    this.refs.listed_yn.applyFilter("");
  };
  showAllContentFilter = () => {
    this.refs.listed_yn.applyFilter("");
    this.refs.discard_yn.applyFilter("");
  };
  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/verifyCount"
          }}
        />
      );
    }
    const {
      allBins,
      WBCount,
      PBCount,
      NACount,
      TCCount,
      ABCount,
      UBCount,
      NOCount,
      WBBinVerified,
      PBBinVerified,
      NABinVerified,
      TCBinVerified,
      ABBinVerified,
      UBBinVerified,
      NOBinVerified,
      totalItems,
      verifiedItems,
      notVerified,
      varified,
      binContents,
      barcodeShortage,
      listedCount,
      notListedCount,
      notListedContentCount,
      listedContentCount,
      discarded,
      notDiscarded,
      shortDiscard,
      shortNotDiscard
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
          value: allBins.length
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
          value: binContents.length
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
          value: barcodeShortage.length
        }
      ]
    };
    return (
      <React.Fragment>
        <ToastsContainer store={ToastsStore} />

        <section className="content-header">
          <h1>
            Audit Statistics <small>Control Panel</small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/welcom">
                <i className="fa fa-dashboard" /> Home
              </Link>
            </li>
            <li className="active">
              <Link to="/auditStats">Audit Statistics</Link>
            </li>
          </ol>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title pull-left">Filter By Zone</h3>
                </div>
                <div className="box-body">
                  <div className="col-md-12">
                    <div className="col-sm-3">
                      <button
                        onClick={this.wbFilter}
                        className="btn btn-success"
                      >
                        WHERE HOUSE BINS ({WBCount})
                      </button>
                    </div>
                    <div className="col-sm-3">
                      <button onClick={this.pbFilter} className="btn btn-info">
                        PICTURE BINS ({PBCount})
                      </button>
                    </div>
                    <div className="col-sm-3">
                      <button
                        onClick={this.naFilter}
                        className="btn btn-primary"
                      >
                        NO RACK BINS ({NACount})
                      </button>
                    </div>
                    <div className="col-sm-3">
                      <button
                        onClick={this.tcFilter}
                        className="btn btn-warning"
                      >
                        TECHNICIAN BINS ({TCCount})
                      </button>
                    </div>
                  </div>
                  <br />
                  <br />
                  <div className="col-sm-12">
                    <div className="col-sm-3">
                      <button
                        onClick={this.abFilter}
                        className="btn btn-success"
                      >
                        AUDIT BINS ({ABCount})
                      </button>
                    </div>
                    <div className="col-sm-3">
                      <button onClick={this.ubFilter} className="btn btn-info">
                        PULLAR BINS ({UBCount})
                      </button>
                    </div>
                    <div className="col-sm-3">
                      <button
                        onClick={this.verifiedFilter}
                        className="btn btn-success"
                      >
                        VERIFIED ({varified})
                      </button>
                    </div>
                    <div className="col-sm-3">
                      <button
                        onClick={this.notVerifiedFilter}
                        className="btn btn-danger"
                      >
                        NOT VERIFIED ({notVerified})
                      </button>
                    </div>
                    <br />
                    <br />
                    <div className="col-sm-3">
                      <button
                        onClick={this.handleAllClick}
                        className="btn btn-default"
                      >
                        Show All ({allBins.length})
                      </button>
                    </div>
                    <div className="col-md-12" />
                    <div className="col-sm-3">
                      <label
                        style={{ fontSize: "18px", color: "green" }}
                        className="control-label"
                      >
                        Where House Bins Verified :{" "}
                      </label>
                      <b style={{ fontSize: "18px" }}>{WBBinVerified}</b>
                    </div>
                    <div className="col-sm-3">
                      <label
                        style={{ fontSize: "18px", color: "green" }}
                        className="control-label"
                      >
                        Picture Bins Verified :{" "}
                      </label>
                      <b style={{ fontSize: "18px" }}>{PBBinVerified}</b>
                    </div>
                    <div className="col-sm-3">
                      <label
                        style={{ fontSize: "18px", color: "green" }}
                        className="control-label"
                      >
                        No Rack Bins Verified :{" "}
                      </label>
                      <b style={{ fontSize: "18px" }}>{NABinVerified}</b>
                    </div>
                    <div className="col-sm-3">
                      <label
                        style={{ fontSize: "18px", color: "green" }}
                        className="control-label"
                      >
                        Technician Bins Verified :{" "}
                      </label>
                      <b style={{ fontSize: "18px" }}>{TCBinVerified}</b>
                    </div>
                    <div className="col-sm-3">
                      <label
                        style={{ fontSize: "18px", color: "green" }}
                        className="control-label"
                      >
                        Audit Bins Verified :{" "}
                      </label>
                      <b style={{ fontSize: "18px" }}>{ABBinVerified}</b>
                    </div>
                    <div className="col-sm-3">
                      <label
                        style={{ fontSize: "18px", color: "green" }}
                        className="control-label"
                      >
                        Pullar Bins Verified :{" "}
                      </label>
                      <b style={{ fontSize: "18px" }}>{UBBinVerified}</b>
                    </div>
                    <div className="col-sm-3">
                      <label
                        style={{ fontSize: "18px", color: "orange" }}
                        className="control-label"
                      >
                        Total Items :{" "}
                      </label>
                      <b style={{ fontSize: "18px" }}>{totalItems}</b>
                    </div>
                    <div className="col-sm-3">
                      <label
                        style={{ fontSize: "18px", color: "orange" }}
                        className="control-label"
                      >
                        Total Items Verified :{" "}
                      </label>
                      <b style={{ fontSize: "18px" }}>{verifiedItems}</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">All Bins</h3>
                  <div className="col-sm-3 pull-right">
                    <div className="form-group">
                      <Link to="/verifyCount" style={{ color: "white" }}>
                        <button className="btn btn-info btn-xs">
                          Verify Count & Tranfer Bin
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="box-body">
                  <div className="verifyPricingTable">
                    <div className="verify-pricing-content">
                      <BootstrapTable
                        data={allBins}
                        pagination
                        hover
                        striped
                        search
                        tableHeaderClass="my-header-class"
                        columnWidth="100%"
                        options={options}
                      >
                        <TableHeaderColumn
                          dataField="BIN_ID"
                          width="11.1%"
                          isKey={true}
                          dataFormat={actionFormatter}
                        >
                          Action
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField="BIN_NAME" width="11.1%">
                          Bin Name
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="VERIFY_STATUS"
                          width="11.1%"
                          dataFormat={verified}
                        >
                          Status
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="VERIFY_STATUS"
                          hidden
                          style={{ display: "none" }}
                          ref="verify_status"
                          filter={{ type: "RegexFilter" }}
                        >
                          Status
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="BIN_ZONE_FILTER"
                          hidden
                          style={{ display: "none" }}
                          ref="bin_zone_filter"
                          filter={{ type: "RegexFilter" }}
                        >
                          Bin Zone Filter
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="TOTAL_VERIFIED_IN_BIN"
                          width="11.1%"
                        >
                          Total Verified
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="TOTAL_SHORTAGE_IN_BIN"
                          width="11.1%"
                          dataFormat={shortage}
                        >
                          Total Shortage Found
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="VERIFY_DATE"
                          width="11.1%"
                        >
                          Verify Date
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField="VERIFY_BY" width="11.1%">
                          Verify By
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="VERIFY_DATE_STATUS"
                          width="11.1%"
                        >
                          Date Status
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField="DAYS_LEFT" width="11.1%">
                          Days Status
                        </TableHeaderColumn>
                      </BootstrapTable>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <button
          type="button"
          style={{ display: "none" }}
          hidden
          data-toggle="modal"
          data-target="#openBinContents"
          id="showContentModalButton"
        />

        <div id="openBinContents" className="modal fade" role="dialog">
          <div className="modal-dialog " style={{ width: "80%" }}>
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="openBinContents"
                >
                  &times;
                </button>
                <h4 className="modal-title">
                  Bin Contents: {this.state.bin_name}
                </h4>
              </div>
              <div className="modal-body">
                <div className="col-sm-2">
                  <button
                    onClick={this.listedContentFilter}
                    className="btn btn-info"
                  >
                    LISTED ({listedContentCount})
                  </button>
                </div>
                <div className="col-sm-2">
                  <button
                    onClick={this.notListedContentFilter}
                    className="btn btn-success"
                  >
                    NOT LISTED ({notListedContentCount})
                  </button>
                </div>
                <div className="col-sm-2">
                  <button onClick={this.discarded} className="btn btn-danger">
                    DISCARDED ({discarded})
                  </button>
                </div>
                <div className="col-sm-2">
                  <button
                    onClick={this.notDiscarded}
                    className="btn btn-success"
                  >
                    NOT DISCARDED ({notDiscarded})
                  </button>
                </div>
                <div className="col-sm-2">
                  <button
                    onClick={this.showAllContentFilter}
                    className="btn btn-default"
                  >
                    Show All ({binContents.length})
                  </button>
                </div>
                <BootstrapTable
                  data={binContents}
                  pagination
                  hover
                  striped
                  search
                  tableHeaderClass="my-header-class"
                  columnWidth="100%"
                  options={options2}
                  trClassName={rowClassNameFormat}
                >
                  <TableHeaderColumn
                    dataField="BARCODE_NO"
                    width="14.8%"
                    dataFormat={imageView}
                  >
                    Picture
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="BARCODE_NO"
                    isKey={true}
                    width="14.8%"
                    dataFormat={verified2}
                    ref="listed_yn"
                    filter={{ type: "RegexFilter" }}
                  >
                    <p style={{ color: "#226EC0" }}>EBAY ID</p>
                    <br />
                    BARCODE
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="LISTED_YN_CONTENT"
                    hidden
                    style={{ display: "none" }}
                    ref="listed_yn"
                    filter={{ type: "RegexFilter" }}
                  />
                  <TableHeaderColumn
                    dataField="DISCARD"
                    hidden
                    style={{ display: "none" }}
                    ref="discard_yn"
                    filter={{ type: "RegexFilter" }}
                  />

                  <TableHeaderColumn
                    dataField="MPN"
                    width="14.8%"
                    dataFormat={descriptionMpnUpc}
                  >
                    <p style={{ color: "#226EC0" }}>UPC </p>
                    <br /> <p style={{ color: "green" }}>MPN</p>
                    <br />
                    TITLE
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="ITEM_REMARKS" width="14.8%">
                    REMARKS
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="DISCARD_REMARKS" width="9.9%">
                    DISCARD REMARKS
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="TRANS_BY_ID" width="14.8%">
                    TRANSFER BY
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="TRANSFER_DATE"
                    width="14.8%"
                    dataFormat={inBound_outBound}
                  >
                    STAMP
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="BARCODE_NO"
                    width="14.8%"
                    dataFormat={discardBarcode}
                  >
                    Discard
                  </TableHeaderColumn>
                </BootstrapTable>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="openBinContents"
                  id="cancelopenBinContents"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div id="openBinShortage" className="modal fade" role="dialog">
          <div className="modal-dialog" style={{ width: "80%" }}>
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 className="modal-title">Shortage Barcodes</h4>
              </div>
              <div className="modal-body">
                <div className="col-sm-2">
                  <button onClick={this.listedFilter} className="btn btn-info">
                    LISTED ({listedCount})
                  </button>
                </div>
                <div className="col-sm-2">
                  <button
                    onClick={this.notListedFilter}
                    className="btn btn-success"
                  >
                    NOT LISTED ({notListedCount})
                  </button>
                </div>
                <div className="col-sm-2">
                  <button
                    onClick={this.shortDiscard}
                    className="btn btn-danger"
                  >
                    DISCARDED ({shortDiscard})
                  </button>
                </div>
                <div className="col-sm-2">
                  <button
                    onClick={this.shortNotDiscard}
                    className="btn btn-success"
                  >
                    NOT DISCARDED ({shortNotDiscard})
                  </button>
                </div>
                <div className="col-sm-2">
                  <button
                    onClick={this.showAllFilter}
                    className="btn btn-default"
                  >
                    Show All ({barcodeShortage.length})
                  </button>
                </div>
                <BootstrapTable
                  data={barcodeShortage}
                  pagination
                  search
                  tableHeaderClass="add-barcodes"
                  tableBodyClass="add-barcodes"
                  columnWidth="100%"
                  options={options3}
                  trClassName={rowClassNameFormat}
                >
                  <TableHeaderColumn
                    dataField="BARCODE_NO"
                    width="8.4%"
                    dataFormat={imageView2}
                  >
                    Picture
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="BARCODE_NO"
                    isKey={true}
                    width="8.4%"
                  >
                    Barcode No:
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="LISTED_STATUS"
                    width="8.4%"
                    hidden
                    style={{ display: "none" }}
                    ref="listed_status"
                    filter={{ type: "RegexFilter" }}
                  />
                  <TableHeaderColumn
                    dataField="DISCARD"
                    hidden
                    style={{ display: "none" }}
                    ref="shortage_discard_yn"
                    filter={{ type: "RegexFilter" }}
                  />
                  <TableHeaderColumn
                    dataField="EBAY_ITEM_ID"
                    width="8.4%"
                    dataFormat={ebayLink}
                  >
                    EBAY_ITEM_ID
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="TITLE" width="8.4%">
                    Title
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="MPN"
                    dataFormat={mpn_upc}
                    width="8.4%"
                  >
                    <p style={{ color: "#226EC0" }}>MPN</p>
                    <br /> UPC
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="MANUFACTURER" width="8.4%">
                    Manufacturer
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="BIN_NAME" width="8.4%">
                    Last Attached Bin:
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="ITEM_REMARKS" width="8.4%">
                    REMARKS
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="DISCARD_REMARKS" width="8.4%">
                    DISCARD REMARKS
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="SHORTAGE_DATE" width="8.4%">
                    Shortage Date
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="SHORTAGE_BY" width="8.4%">
                    Shortage By
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="BARCODE_NO"
                    width="8.4%"
                    dataFormat={discardBarcode}
                  >
                    Discard
                  </TableHeaderColumn>
                </BootstrapTable>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="openBinShortage"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div id="myModal" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 className="modal-title">
                  Discard This Barcode: {this.state.selectedCell}
                </h4>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Remarks:</label>
                  <input
                    type="text"
                    name="remarks"
                    id="remarks"
                    className="form-control"
                    onChange={this.handleChange}
                    value={this.state.remarks}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={this.deleteBarcode}
                >
                  Discard
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
      </React.Fragment>
    );
  }
}

export default AuditStats;
