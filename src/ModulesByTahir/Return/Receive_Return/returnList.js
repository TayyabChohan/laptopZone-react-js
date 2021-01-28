import React, { Component } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import "gasparesganga-jquery-loading-overlay";
import notify from "../../Functions/notify";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { RViewer, RViewerTrigger } from "react-viewerjs";
import "../../CSS_Files/table.css";
import { ToastsContainer, ToastsStore } from "react-toasts";

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
export class BarcodeStatus extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <span className="btn btn-block btn-primary btn-xs">Return</span>
      </React.Fragment>
    );
  }
}

function imageView(cell, row) {
  return <ImageView cell={cell} row={row} />;
}
function barcodeStatus(cell, row) {
  return <BarcodeStatus cell={cell} row={row} />;
}

class ReturnList extends Component {
  constructor(props) {
    super(props);
    that = this;
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    this.state = {
      baseUrl: finalurl,
      returnList: [],
      images: []
    };
  }
  componentWillMount() {
    this.getReturns();
  }
  getReturns = () => {
    const { baseUrl } = this.state;
    let merId = localStorage.getItem("merId");
    $.LoadingOverlay("show");
    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_receiveReturn/getReturns";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          merId: merId
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
          console.log(result.images);
          this.setState({
            returnList: result.getReturns,
            images: result.images
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

  render() {
    const { returnList } = this.state;
    const options = {
      paginationShowsTotal: true,
      page: 1, // which page you want to show as default
      sizePerPage: 25, // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 5, // the pagination bar size.
      prePage: "Prev", // Previous page button text
      nextPage: "Next", // Next page button text
      firstPage: "First", // First page button text
      lastPage: "Last", // Last page button text
      prePageTitle: "Go to previous", // Previous page button title
      nextPageTitle: "Go to next", // Next page button title
      firstPageTitle: "Go to first", // First page button title
      lastPageTitle: "Go to Last", // Last page button title
      paginationPosition: "top", // default is bottom, top and both is
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
          value: returnList.length
        }
      ]
    };
    return (
      <React.Fragment>
        <ToastsContainer store={ToastsStore} />
        <section className="content-header">
          <h1>
            Return List <small>Control Panel</small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/merchantDashboard">
                <i className="fa fa-dashboard" /> Home
              </Link>
            </li>
            <li>All Time Returns</li>
            <li className="active">
              <Link to="/returnList">Return List</Link>
            </li>
          </ol>
        </section>
        <section className="content">
          <div className="row">
            <div className="box">
              <div className="box-header">
                <h3 className="box-title">Search Results</h3>
              </div>
              <div className="box-body">
                <BootstrapTable
                  data={returnList}
                  pagination
                  search
                  tableHeaderclassName="my-header-class"
                  columnWidth="100%"
                  options={options}
                >
                  <TableHeaderColumn
                    dataField="DT_ID"
                    isKey={true}
                    width="10%"
                    hidden
                    style={{ display: "none" }}
                  >
                    Action
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="IMAGE"
                    width="15%"
                    dataFormat={imageView}
                  >
                    Picture
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="BARCODE_STATUS"
                    width="15%"
                    dataFormat={barcodeStatus}
                  >
                    Options
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="LISTED_YN"
                    width="10%"
                    ref="listed_yn"
                    filter={{ type: "RegexFilter" }}
                  >
                    Listed Y/N
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="BARCODE_NO" width="10%">
                    Barcode
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="MPN"
                    width="10%"
                    // dataFormat={mpn_upc}
                    dataSort={true}
                  >
                    <p style={{ color: "#226EC0" }}>MPN</p>
                    <br /> UPC
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="MPN_DESCRIPTION" width="15%">
                    MPN Description
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    dataField="BRAND"
                    width="10%"
                    dataSort={true}
                  >
                    BRAND
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="CONDITION"
                    width="10%"
                    dataSort={true}
                  >
                    Condition
                  </TableHeaderColumn>
                </BootstrapTable>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default ReturnList;
