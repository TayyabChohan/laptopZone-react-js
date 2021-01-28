import React, { Component } from "react";
import { ToastsContainer, ToastsStore } from "react-toasts";
import { Link, Redirect } from "react-router-dom";
import $ from "jquery";
import "gasparesganga-jquery-loading-overlay";
import notify from "../Functions/notify";
import { RViewer, RViewerTrigger } from "react-viewerjs";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
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

function imageView(cell, row) {
  return <ImageView cell={cell} row={row} />;
}
function ebayLink(cell, row) {
  if (cell) {
    return (
      <a href={"https://www.ebay.com/itm/" + cell} target="_blank">
        EBAY ID: {cell}
        <br />
        <span className="btn btn-success btn-xs">LISTED</span>
      </a>
    );
  } else {
    return <span className="btn btn-danger btn-xs">NOT LISTED</span>;
  }
}
function discardCheck(cell, row) {
  if (cell == 1) {
    return <span className="btn btn-danger btn-xs">DISCARDED</span>;
  } else {
    return <span className="btn btn-success btn-xs">NOT DISCARDED</span>;
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
class PictureBinStats extends Component {
  constructor(props) {
    super(props);
    that = this;
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    this.state = {
      baseUrl: finalurl,
      pictureBin: [],
      discardedCount: 0,
      notDiscardedCount: 0,
      listedCount: 0,
      notListedCount: 0
    };
  }
  componentWillMount() {
    this.getPictureBinRecords();
  }
  getPictureBinRecords = () => {
    var discardedCount = 0;
    var notDiscardedCount = 0;
    var listedCount = 0;
    var notListedCount = 0;

    $.LoadingOverlay("show");
    let insertUrl =
      this.state.baseUrl +
      "/laptopzone/reactcontroller/c_itemsAudit/getPictureBinRecords";
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
          for (var i = 0; i < result.pictureBin.length; i++) {
            var discard = result.pictureBin[i].DISCARD;
            var Listed_YN = result.pictureBin[i].LISTED_YN_CONTENT;

            if (discard == 1) {
              discardedCount++;
            } else {
              notDiscardedCount++;
            }
            if (Listed_YN == "LISTED") {
              listedCount++;
            } else {
              notListedCount++;
            }
          }
          this.setState({
            pictureBin: result.pictureBin,
            images: result.images,
            discardedCount: discardedCount,
            notDiscardedCount: notDiscardedCount,
            listedCount: listedCount,
            notListedCount: notListedCount
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
  discarded = () => {
    this.refs.discardStatus.applyFilter("1");
    this.refs.listed_yn.applyFilter("");
  };
  notDiscarded = () => {
    this.refs.discardStatus.applyFilter("0");
    this.refs.listed_yn.applyFilter("");
  };
  Listed = () => {
    this.refs.listed_yn.applyFilter("LISTED");
    this.refs.discardStatus.applyFilter("");
  };
  notListed = () => {
    this.refs.listed_yn.applyFilter("NOT");
    this.refs.discardStatus.applyFilter("");
  };
  handleAllClick = () => {
    this.refs.discardStatus.applyFilter("");
    this.refs.listed_yn.applyFilter("");
  };
  render() {
    const {
      pictureBin,
      discardedCount,
      notDiscardedCount,
      listedCount,
      notListedCount
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
          value: pictureBin.length
        }
      ]
    };
    return (
      <React.Fragment>
        <ToastsContainer store={ToastsStore} />
        <section className="content-header">
          <h1>
            Picture Bin Statistics <small>Control Panel</small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/welcom">
                <i className="fa fa-dashboard" /> Home
              </Link>
            </li>
            <li className="active">
              <Link to="/pictureBinStats">Picture Bin Statistics</Link>
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
                  <div className="col-md-12">
                    <div className="col-sm-2">
                      <button onClick={this.Listed} className="btn btn-success">
                        LISTED ({listedCount})
                      </button>
                    </div>
                    <div className="col-sm-2">
                      <button
                        onClick={this.notListed}
                        className="btn btn-warning"
                      >
                        NOT LISTED ({notListedCount})
                      </button>
                    </div>
                    <div className="col-sm-2">
                      <button
                        onClick={this.notDiscarded}
                        className="btn btn-success"
                      >
                        NOT DISCARDED ({notDiscardedCount})
                      </button>
                    </div>
                    <div className="col-sm-2">
                      <button
                        onClick={this.discarded}
                        className="btn btn-danger"
                      >
                        DISCARDED ({discardedCount})
                      </button>
                    </div>
                    <div className="col-sm-2">
                      <button
                        onClick={this.handleAllClick}
                        className="btn btn-default"
                      >
                        SHOW ALL ({pictureBin.length})
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title pull-left">
                    Picture Bin Verified Contents
                  </h3>
                </div>
                <div className="box-body">
                  <BootstrapTable
                    data={pictureBin}
                    pagination
                    search
                    tableHeaderClass="add-barcodes"
                    tableBodyClass="add-barcodes"
                    columnWidth="100%"
                    options={options}
                  >
                    <TableHeaderColumn
                      dataField="BARCODE_NO"
                      width="9%"
                      dataFormat={imageView}
                    >
                      PICTURE
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="BARCODE_NO"
                      isKey={true}
                      width="9%"
                    >
                      BARCODE NO:
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="EBAY_ITEM_ID"
                      width="9%"
                      dataFormat={ebayLink}
                    >
                      EBAY_ITEM_ID
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="TITLE" width="9%">
                      TITLE
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="MPN"
                      dataFormat={mpn_upc}
                      width="9%"
                    >
                      <p style={{ color: "#226EC0" }}>MPN</p>
                      <br /> UPC
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="MANUFACTURER" width="9%">
                      MANUFACTURER
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="BIN_NAME" width="9%">
                      LAST ATTACHED BIN:
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="DISCARD"
                      width="9%"
                      dataFormat={discardCheck}
                      ref="discardStatus"
                      filter={{ type: "RegexFilter" }}
                    >
                      DISCARD YES/NO
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="LISTED_YN_CONTENT"
                      width="9%"
                      style={{ display: "none" }}
                      hidden
                      ref="listed_yn"
                      filter={{ type: "RegexFilter" }}
                    >
                      LISTED Y/N
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="DISCARD_REMARKS" width="9%">
                      DISCARD REASON
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="DISCARD_DATE" width="9%">
                      DISCARD DATE
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="DISCARD_BY" width="9%">
                      DISCARD BY
                    </TableHeaderColumn>
                  </BootstrapTable>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default PictureBinStats;
