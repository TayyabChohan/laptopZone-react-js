import React, { Component } from "react";
import { ToastsContainer, ToastsStore } from "react-toasts";
import { Link, Redirect } from "react-router-dom";
import $ from "jquery";
import "gasparesganga-jquery-loading-overlay";
import notify from "../Functions/notify";
import { RViewer, RViewerTrigger } from "react-viewerjs";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import Loader from "react-loader-spinner";
import "../CSS_Files/table.css";

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
                  src={
                    imagesUrl[this.props.cell][0]
                      ? imagesUrl[this.props.cell][0]
                      : ""
                  }
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
function bin_barcode(cell, row) {
  if (cell == "BIN_BARCODE") {
    return <React.Fragment>YES</React.Fragment>;
  } else if (cell == "NOT_BIN_BARCODE") {
    return <React.Fragment>NO</React.Fragment>;
  }
}
function designFormat(rowData, rIndex) {
  if (rowData.BIN_BARCODE_YN == "BIN_BARCODE") {
    return "binBarcode";
  } else if (rowData.BIN_BARCODE_YN == "NOT_BIN_BARCODE") {
    return "notBinBarcode";
  }
}
class TransferItems extends Component {
  constructor(props) {
    super(props);
    that = this;
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    this.state = {
      baseUrl: finalurl,
      searchBin: "",
      scanBarcode: "",
      newBinScanned: "",
      binData: [],
      binContent: [],
      totalBarcodesInBin: [],
      images: [],
      images2: [],
      barcodesGridFound: [],
      binVerify: "",
      current_location: "",
      rack_row_id: "",
      bin_id: "",
      verify_date: "",
      days_left: "",
      ebayQuantity: 1,
      verifiedCount: 0,
      notVerifiedCount: 0,
      scanned: 0,
      notFound: 0,
      isLoaded: false,
      contentFound: false,
      isLoadedTransfer: false
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  scanAll = () => {
    console.log("Transfered");
  };
  transferBinSave = e => {
    e.preventDefault();
    const { barcodesGridFound, newBinScanned, searchBin, bin_id } = this.state;
    if (!newBinScanned) {
      notify("error", "Please Scan New Bin");
      return false;
    }
    var userId = localStorage.getItem("userId");
    let insertUrl =
      this.state.baseUrl +
      "/laptopzone/reactcontroller/c_itemsAudit/transferBinSave";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          barcodesGridFound: barcodesGridFound,
          bin_name: newBinScanned,
          old_bin_id: bin_id,
          userId: userId,
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
        if (result.transfered) {
          this.searchByNewBin(newBinScanned);
          this.setState({
            barcodesGridFound: [],
            images2: [],
            newBinScanned: ""
          });

          notify("success", result.message);
        } else {
          notify("error", result.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  searchTransferCount = e => {
    e.preventDefault();
    const { scanBarcode, bin_id, ebayQuantity, barcodesGridFound } = this.state;
    var userId = localStorage.getItem("userId");
    this.setState({
      isLoadedTransfer: true
    });
    let insertUrl =
      this.state.baseUrl +
      "/laptopzone/reactcontroller/c_itemsAudit/searchTransferCount";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          scanBarcode: scanBarcode,
          bin_id: bin_id,
          userId: userId,
          ebayQuantity: ebayQuantity,
          barcodesGridFound: barcodesGridFound,
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
        if (result.found) {
          var scanned = 0;
          var notFound = 0;

          if (this.state.barcodesGridFound.length === 0) {
            for (var i = 0; i < result.barcodesGrid.length; i++) {
              if (result.barcodesGrid[i].BIN_BARCODE_YN === "BIN_BARCODE") {
                scanned++;
              } else if (
                result.barcodesGrid[i].BIN_BARCODE_YN === "NOT_BIN_BARCODE"
              ) {
                notFound++;
              }
            }
            var barcodes = this.state.binContent;
            for (var i = 0; i < barcodes.length; i++) {
              if (barcodes[i].BARCODE_NO == result.barcodesGrid[0].BARCODE_NO) {
                barcodes.splice(i, 1);
              }
            }
            this.setState({
              binContent: barcodes,
              barcodesGridFound: result.barcodesGrid,
              images2: result.images,
              isLoadedTransfer: false,
              scanBarcode: "",
              scanned: scanned,
              notFound: notFound
            });
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
              TRANSFER_DATE: result.barcodesGrid[0].TRANSFER_DATE,
              BIN_BARCODE_YN: result.barcodesGrid[0].BIN_BARCODE_YN
            });

            var found = this.state.barcodesGridFound.filter(
              item => item.BARCODE_NO == result.barcodesGrid[0].BARCODE_NO
            );
            if (found.length == 0) {
              var barcodes = this.state.binContent;
              for (var i = 0; i < barcodes.length; i++) {
                if (
                  barcodes[i].BARCODE_NO == result.barcodesGrid[0].BARCODE_NO
                ) {
                  barcodes.splice(i, 1);
                }
              }
              var FoundNewArray = this.state.barcodesGridFound;
              FoundNewArray.push(newRecord[0]);

              for (var i = 0; i < FoundNewArray.length; i++) {
                if (FoundNewArray[i].BIN_BARCODE_YN === "BIN_BARCODE") {
                  scanned++;
                } else if (
                  FoundNewArray[i].BIN_BARCODE_YN === "NOT_BIN_BARCODE"
                ) {
                  notFound++;
                }
              }

              this.setState({
                binContent: barcodes,
                barcodesGridFound: FoundNewArray,
                images2: result.images,
                isLoadedTransfer: false,
                scanBarcode: "",
                scanned: scanned,
                notFound: notFound
              });
            } else {
              this.setState({
                isLoadedTransfer: false,
                scanBarcode: ""
              });
              notify("error", "Barcode Already Scanned!");
            }
          }
        } else {
          this.setState({
            isLoadedTransfer: false,
            scanBarcode: ""
          });
          notify("error", result.messages);
        }
      })
      .catch(err => {
        this.setState({
          isLoadedTransfer: false,
          scanBarcode: ""
        });
        console.log(err);
      });
  };
  searchBin = e => {
    e.preventDefault();
    const { searchBin } = this.state;
    this.setState({
      isLoaded: true,
      contentFound: false
    });
    let insertUrl =
      this.state.baseUrl +
      "/laptopzone/reactcontroller/c_itemsAudit/searchBinContents";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          bin_name: searchBin
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
          if (result.getImage) {
            this.setState({
              binData: result.bind_ids,
              binContent: result.transfers,
              totalBarcodesInBin: result.transfers.length,
              images: result.images,
              barcodesGridFound: [],
              binVerify: result.bin_verified,
              current_location: rack_name,
              rack_row_id: rack_row_id,
              bin_id: bin_id,
              verify_date: verify_date,
              days_left: days_left,
              verifiedCount: verified,
              notVerifiedCount: notVerified,
              isLoaded: false,
              contentFound: true,
              scanBarcode: "",
              searchBin: ""
            });
          } else {
            this.setState({
              binData: result.bind_ids,
              binContent: result.transfers,
              totalBarcodesInBin: result.transfers.length,
              barcodesGridFound: [],
              binVerify: result.bin_verified,
              current_location: rack_name,
              rack_row_id: rack_row_id,
              bin_id: bin_id,
              verify_date: verify_date,
              days_left: days_left,
              verifiedCount: verified,
              notVerifiedCount: notVerified,
              isLoaded: false,
              contentFound: true,
              scanBarcode: "",
              searchBin: ""
            });
          }
        } else {
          this.setState({
            binData: [],
            binContent: [],
            totalBarcodesInBin: [],
            barcodesGridFound: [],
            binVerify: false,
            current_location: "",
            rack_row_id: "",
            bin_id: "",
            verify_date: "",
            days_left: "",
            verifiedCount: verified,
            notVerifiedCount: notVerified,
            isLoaded: false,
            contentFound: false,
            scanBarcode: "",
            searchBin: ""
          });
          notify("error", "No Bin Found");
        }
      })
      .catch(err => {
        this.setState({
          binData: [],
          binContent: [],
          totalBarcodesInBin: [],
          barcodesGridFound: [],
          binVerify: false,
          current_location: "",
          rack_row_id: "",
          bin_id: "",
          verify_date: "",
          days_left: "",
          verifiedCount: 0,
          notVerifiedCount: 0,
          isLoaded: false,
          contentFound: false,
          scanBarcode: "",
          searchBin: ""
        });
        console.log(err);
      });
  };
  searchByNewBin = searchBin => {
    this.setState({
      isLoaded: true,
      contentFound: false
    });
    let insertUrl =
      this.state.baseUrl +
      "/laptopzone/reactcontroller/c_itemsAudit/searchBinContents";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          bin_name: searchBin
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
          if (result.getImage) {
            this.setState({
              binData: result.bind_ids,
              binContent: result.transfers,
              totalBarcodesInBin: result.transfers.length,
              images: result.images,
              barcodesGridFound: [],
              binVerify: result.bin_verified,
              current_location: rack_name,
              rack_row_id: rack_row_id,
              bin_id: bin_id,
              verify_date: verify_date,
              days_left: days_left,
              verifiedCount: verified,
              notVerifiedCount: notVerified,
              isLoaded: false,
              contentFound: true,
              scanBarcode: "",
              searchBin: ""
            });
          } else {
            this.setState({
              binData: result.bind_ids,
              binContent: result.transfers,
              totalBarcodesInBin: result.transfers.length,
              barcodesGridFound: [],
              binVerify: result.bin_verified,
              current_location: rack_name,
              rack_row_id: rack_row_id,
              bin_id: bin_id,
              verify_date: verify_date,
              days_left: days_left,
              verifiedCount: verified,
              notVerifiedCount: notVerified,
              isLoaded: false,
              contentFound: true,
              scanBarcode: "",
              searchBin: ""
            });
          }
        } else {
          this.setState({
            binData: [],
            binContent: [],
            totalBarcodesInBin: [],
            barcodesGridFound: [],
            binVerify: false,
            current_location: "",
            rack_row_id: "",
            bin_id: "",
            verify_date: "",
            days_left: "",
            verifiedCount: verified,
            notVerifiedCount: notVerified,
            isLoaded: false,
            contentFound: false,
            scanBarcode: "",
            searchBin: ""
          });
          notify("error", "No Bin Found");
        }
      })
      .catch(err => {
        this.setState({
          binData: [],
          binContent: [],
          totalBarcodesInBin: [],
          barcodesGridFound: [],
          binVerify: false,
          current_location: "",
          rack_row_id: "",
          bin_id: "",
          verify_date: "",
          days_left: "",
          verifiedCount: 0,
          notVerifiedCount: 0,
          isLoaded: false,
          contentFound: false,
          scanBarcode: "",
          searchBin: ""
        });
        console.log(err);
      });
  };
  //   binFilter = () => {
  //     this.refs.bin_barcode_yn.applyFilter("YES");
  //   };
  //   notBinFilter = () => {
  //     this.refs.bin_barcode_yn.applyFilter("NO");
  //   };
  //   showAll = () => {
  //     this.refs.bin_barcode_yn.applyFilter("");
  //   };
  render() {
    const {
      binContent,
      barcodesGridFound,
      isLoaded,
      contentFound,
      transferContent,
      isLoadedTransfer,
      scanned,
      notFound
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
    return (
      <React.Fragment>
        <ToastsContainer store={ToastsStore} />
        <section className="content-header">
          <h1>
            Transfer Items <small>Control Panel</small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/welcom">
                <i className="fa fa-dashboard" /> Home
              </Link>
            </li>
            <li className="active">
              <Link to="/transferItems">Transfer Items</Link>
            </li>
          </ol>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title pull-left">Search Bin Content</h3>
                </div>
                <div className="box-body">
                  <form onSubmit={this.searchBin}>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="text"
                          name="searchBin"
                          id="searchBin"
                          value={this.state.searchBin}
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
                          name="searchBinButton"
                          id="searchBinButton"
                          value="Search"
                        />
                      </div>
                    </div>
                  </form>
                  {barcodesGridFound.length > 0 ? (
                    <form onSubmit={this.transferBinSave}>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <input
                            className="form-control"
                            type="text"
                            name="newBinScanned"
                            id="newBinScanned"
                            value={this.state.newBinScanned}
                            onChange={this.handleChange}
                            placeholder="Assign New Bin"
                          />
                        </div>
                      </div>
                      <div className="col-sm-2">
                        <div className="form-group">
                          <input
                            type="submit"
                            title="Search Item"
                            className="btn btn-success"
                            name="saveBinButton"
                            id="saveBinButton"
                            value="Save"
                          />
                        </div>
                      </div>
                    </form>
                  ) : (
                    ""
                  )}
                  {this.state.bin_id ? (
                    <div className="col-sm-12">
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
                  ) : (
                    ""
                  )}
                </div>
                {isLoaded ? (
                  <Loader
                    type="Triangle"
                    color="#00BFFF"
                    height="100"
                    width="100"
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="row">
            {contentFound ? (
              <React.Fragment>
                <div className="col-md-6" id="binContent">
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
                      {/* <div className="col-sm-4">
                        <button
                          className="btn btn-primary"
                          onClick={this.scanAll}
                        >
                          SCAN ALL
                        </button>
                      </div> */}
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
                {/* Transfer View */}
                <div className="col-md-6" id="binContent">
                  <div className="box">
                    <div className="box-header">
                      <h3 className="box-title">Transfer Contents</h3>
                      <div className="form-group pull-right">
                        <label
                          style={{ fontSize: "18px", color: "green" }}
                          className="control-label"
                        >
                          Total Items Scanned :{" "}
                        </label>
                        <b style={{ fontSize: "18px" }}>
                          {barcodesGridFound.length}
                        </b>
                      </div>
                    </div>
                    <div className="box-body">
                      <div className="col-md-12">
                        <form onSubmit={this.searchTransferCount}>
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
                      <div
                        className="col-md-12"
                        style={{ marginTop: "20px", marginBottom: "20px" }}
                      >
                        <div className="col-sm-4">
                          <button
                            // onClick={this.binFilter}
                            className="btn btn-success"
                          >
                            BIN BARCODE ({scanned})
                          </button>
                        </div>
                        <div className="col-sm-4">
                          <button
                            // onClick={this.notBinFilter}
                            className="btn btn-danger"
                          >
                            NOT BIN BARCODE ({notFound})
                          </button>
                        </div>
                      </div>
                      {isLoadedTransfer ? (
                        <Loader
                          type="Triangle"
                          color="#00BFFF"
                          height="100"
                          width="100"
                        />
                      ) : (
                        ""
                      )}
                      <div className="verifyPricingTable">
                        <div className="verify-pricing-content">
                          <BootstrapTable
                            data={barcodesGridFound}
                            pagination
                            hover
                            striped
                            search
                            tableHeaderClass="my-header-class"
                            columnWidth="100%"
                            options={options2}
                            trClassName={designFormat}
                          >
                            <TableHeaderColumn
                              dataField="BARCODE_NO"
                              width="25%"
                              dataFormat={imageView2}
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
                            <TableHeaderColumn
                              dataField="TRANS_BY_ID"
                              width="20%"
                            >
                              TRANSFER BY
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              dataField="BIN_BARCODE_YN"
                              width="20%"
                              hidden
                              style={{ display: "none" }}
                              ref="bin_barcode_yn"
                              filter={{ type: "RegexFilter" }}
                              dataFormat={bin_barcode}
                            >
                              BIN_BARCODE_YN
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
                {/* #END# Transfer View */}
              </React.Fragment>
            ) : (
              <h1 style={{ textAlign: "center" }}>Please Scan Bin...</h1>
            )}
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default TransferItems;
