import React, { Component } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import "gasparesganga-jquery-loading-overlay";
import swal from "sweetalert";
import notify from "../../Functions/notify";
import { RViewer, RViewerTrigger } from "react-viewerjs";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../CSS_Files/table.css";
import "../CSS_Files/summary2.css";
import { ToastsContainer, ToastsStore } from "react-toasts";

var that = "";
export class DeleteBox extends Component {
  constructor(props) {
    super(props);
  }
  confirmDelete = (cell, row) => {
    swal("Are you sure?", {
      buttons: {
        Yes: {
          text: "Yes",
          value: "Yes"
        },
        cancel: "No!"
      }
    }).then(value => {
      switch (value) {
        case "Yes":
          this.handleDelete(cell, row);
          break;

        default:
          console.log("No!");
      }
    });
  };
  handleDelete = (cell, row) => {
    const { baseUrl } = that.state;

    $.LoadingOverlay("show");
    let insertUrl =
      baseUrl +
      "/laptopzone/reactcontroller/c_receiveShipment/deleteReceiveBox";
    const DBCall = new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          receive_mt_id: cell
        }
      }).then(
        function(data) {
          resolve(data);
        },
        function(err) {
          reject(err);
        }
      );
    });
    DBCall.then(result => {
      $.LoadingOverlay("hide");
      if (result.delete) {
        notify("success", result.message);
        var boxes = that.state.allReceiveBoxes;
        for (var i = 0; i < boxes.length; i++) {
          if (boxes[i].RECEIVE_MT_ID == cell) {
            boxes.splice(i, 1);
          }
        }

        that.setState({
          allReceiveBoxes: boxes
        });
      } else {
        notify("error", result.message);
      }
    }).catch(err => {
      $.LoadingOverlay("hide");
      console.log(err);
    });
  };
  openBox = (cell, row) => {
    var box_id = row.SHIP_BOX_ID;
    that.setState({
      ship_box_id: box_id
    });
    $("#barcodesView").show();
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $("#barcodesView").offset().top
      },
      1000
    );
    const { baseUrl } = that.state;

    $.LoadingOverlay("show");
    let insertUrl =
      baseUrl +
      "/laptopzone/reactcontroller/c_receiveShipment/getReceiveBarcodes";
    const DBCall = new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          receive_mt_id: cell
        }
      }).then(
        function(data) {
          resolve(data);
        },
        function(err) {
          reject(err);
        }
      );
    });
    DBCall.then(result => {
      $.LoadingOverlay("hide");
      if (result.found) {
        that.setState({
          receiveBarcodeList: result.receiveBarcodes,
          imagesUrl: result.images
        });
      } else {
        notify("error", result.message);
      }
    }).catch(err => {
      $.LoadingOverlay("hide");
      console.log(err);
    });
  };
  render() {
    return (
      <React.Fragment>
        <button
          title="Delete Box"
          className="btn btn-danger btn-sm"
          onClick={() => this.confirmDelete(this.props.cell, this.props.row)}
        >
          <span className="glyphicon glyphicon-trash" aria-hidden="true" />
        </button>
        <button
          title="Open Box"
          className="btn btn-primary btn-sm"
          onClick={() => this.openBox(this.props.cell, this.props.row)}
        >
          <span
            className="glyphicon glyphicon-folder-open"
            aria-hidden="true"
          />
        </button>
      </React.Fragment>
    );
  }
}
export class DeleteBarcode extends Component {
  constructor(props) {
    super(props);
  }
  confirmDelete = (cell, row) => {
    swal("Are you sure?", {
      buttons: {
        Yes: {
          text: "Yes",
          value: "Yes"
        },
        cancel: "No!"
      }
    }).then(value => {
      switch (value) {
        case "Yes":
          this.handleDelete(cell, row);
          break;

        default:
          console.log("No!");
      }
    });
  };
  handleDelete = (cell, row) => {
    const { baseUrl } = that.state;
    $.LoadingOverlay("show");
    let insertUrl =
      baseUrl +
      "/laptopzone/reactcontroller/c_receiveShipment/deleteReceiveBarcode";
    const DBCall = new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          receive_dt_id: cell
        }
      }).then(
        function(data) {
          resolve(data);
        },
        function(err) {
          reject(err);
        }
      );
    });
    DBCall.then(result => {
      $.LoadingOverlay("hide");
      if (result.delete) {
        notify("success", result.message);
        var boxes = that.state.receiveBarcodeList;
        for (var i = 0; i < boxes.length; i++) {
          if (boxes[i].RECEIVE_DT_ID == cell) {
            boxes.splice(i, 1);
          }
        }

        that.setState({
          receiveBarcodeList: boxes
        });
      } else {
        notify("error", result.message);
      }
    }).catch(err => {
      $.LoadingOverlay("hide");
      console.log(err);
    });
  };
  render() {
    return (
      <React.Fragment>
        <button
          title="Delete Box"
          className="btn btn-danger btn-sm"
          onClick={() => this.confirmDelete(this.props.cell, this.props.row)}
        >
          <span className="glyphicon glyphicon-trash" aria-hidden="true" />
        </button>
      </React.Fragment>
    );
  }
}
export class ImageView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cell: this.props.cell,
      row: this.props.row,
      imagesUrl: that.state.imagesUrl
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
          <RViewer index={cell} options={options} imageUrls={imagesUrl[cell]}>
            <RViewerTrigger>
              <div className="col-md-12">
                <img
                  className="getCss"
                  src={imagesUrl[cell][0]}
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
    this.state = {
      selectedOption: ""
    };
  }
  componentWillMount() {
    this.setState({
      selectedOption: this.props.cell
    });
  }
  handleOptionChange = e => {
    this.setState({
      selectedOption: e.target.value
    });
  };
  saveStatus = (cell, row) => {
    const { baseUrl } = that.state;
    const { selectedOption } = this.state;
    var receive_dt_id = row.RECEIVE_DT_ID;
    let insertUrl =
      baseUrl +
      "/laptopzone/reactcontroller/c_receiveShipment/updateBarcodeStatus";
    const dbCall = new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          barcode_status: selectedOption,
          receive_dt_id: receive_dt_id
        }
      }).then(
        function(data) {
          resolve(data);
        },
        function(err) {
          reject(err);
        }
      );
    });

    dbCall
      .then(result => {
        if (result.update) {
          notify("success", result.message);
        } else {
          notify("error", result.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <React.Fragment>
        <div className="form-group">
          <div className="radio">
            <label>
              <input
                type="radio"
                value="Fine"
                checked={this.state.selectedOption === "Fine"}
                onChange={this.handleOptionChange}
              />
              Fine
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="Broken"
                checked={this.state.selectedOption === "Broken"}
                onChange={this.handleOptionChange}
              />
              Broken
            </label>
          </div>
          <button
            className="btn btn-xs btn-success"
            type="button"
            onClick={() => this.saveStatus(this.props.cell, this.props.row)}
          >
            Save
          </button>
        </div>
      </React.Fragment>
    );
  }
}
export class BarcodeRemarks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remarks: ""
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentWillMount() {
    this.setState({
      remarks: this.props.cell
    });
  }
  handleRemarks = (cell, row) => {
    const { baseUrl } = that.state;
    const { remarks } = this.state;
    var receive_dt_id = row.RECEIVE_DT_ID;
    $.LoadingOverlay("show");
    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_receiveShipment/updateRemarks";
    const dbCall = new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          remarks: remarks,
          receive_dt_id: receive_dt_id
        }
      }).then(
        function(data) {
          resolve(data);
        },
        function(err) {
          reject(err);
        }
      );
    });

    dbCall
      .then(result => {
        $.LoadingOverlay("hide");
        if (result.update) {
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
  render() {
    return (
      <React.Fragment>
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            value={this.state.remarks}
            id="remarks"
            name="remarks"
            onChange={this.handleChange}
            placeholder="Reamrks..."
          />
        </div>
        <button
          className="btn btn-xs btn-success"
          type="button"
          onClick={() => this.handleRemarks(this.props.cell, this.props.row)}
        >
          Save
        </button>
      </React.Fragment>
    );
  }
}
function imageView(cell, row) {
  return <ImageView cell={cell} row={row} />;
}
function deleteBarcode(cell, row) {
  return <DeleteBarcode cell={cell} row={row} />;
}
function deleteBox(cell, row) {
  return <DeleteBox cell={cell} row={row} />;
}
function upc_mpn(cell, row) {
  return (
    <React.Fragment>
      <p style={{ color: "#226EC0" }}>{row.MPN}</p>
      <br />
      {cell}
    </React.Fragment>
  );
}
function barcodeRemarks(cell, row) {
  return <BarcodeRemarks cell={cell} row={row} />;
}
function barcodeStatus(cell, row) {
  return <BarcodeStatus cell={cell} row={row} />;
}

class ReceiveShipmentList extends Component {
  constructor(props) {
    super(props);
    that = this;
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    this.state = {
      baseUrl: finalurl,
      allReceiveBoxes: [],
      receiveBarcodeList: [],
      imagesUrl: [],
      searchBarcode: ""
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentWillMount() {
    this.allReceiveBoxes();
  }
  allReceiveBoxes = () => {
    const { baseUrl } = this.state;
    let userId = localStorage.getItem("userId");

    $.LoadingOverlay("show");
    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_receiveShipment/allReceiveBoxes";
    const DBCall = new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
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
    });
    DBCall.then(result => {
      $.LoadingOverlay("hide");
      if (result.found) {
        this.setState({
          allReceiveBoxes: result.receiveBoxes
        });
      } else {
        notify("error", result.message);
      }
    }).catch(err => {
      $.LoadingOverlay("hide");
      console.log(err);
    });
    $.LoadingOverlay("hide");
  };
  handleBarcodeSearch = e => {
    e.preventDefault();
    const { baseUrl, searchBarcode, ship_box_id } = this.state;
    let userId = localStorage.getItem("userId");

    $.LoadingOverlay("show");
    let insertUrl =
      baseUrl +
      "/laptopzone/reactcontroller/c_receiveShipment/getShipmentBarcodes";
    const DBCall = new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          searchBarcode: searchBarcode,
          userId: userId,
          ship_box_id: ship_box_id,
          method: 2
        }
      }).then(
        function(data) {
          resolve(data);
        },
        function(err) {
          reject(err);
        }
      );
    });
    DBCall.then(result => {
      $.LoadingOverlay("hide");
      if (result.insert) {
        notify("success", result.message);
        this.setState({
          receiveBarcodeList: result.box_details,
          imagesUrl: result.images,
          searchBarcode: ""
        });
      } else {
        notify("error", result.message);
      }
    }).catch(err => {
      $.LoadingOverlay("hide");
      console.log(err);
    });
    $.LoadingOverlay("hide");
  };
  render() {
    const { allReceiveBoxes, receiveBarcodeList } = this.state;
    const options = {
      paginationShowsTotal: true,
      page: 2,
      sizePerPage: 25,
      pageStartIndex: 1,
      paginationSize: 5,
      prePage: "Prev",
      nextPage: "Next",
      firstPage: "First",
      lastPage: "Last"
    };
    return (
      <React.Fragment>
        <ToastsContainer store={ToastsStore} />
        <section className="content-header">
          <h1>
            Shipment List <small>Control Panel</small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/welcom">
                <i className="fa fa-dashboard" /> Home
              </Link>
            </li>
            <li>Shipment List</li>
            <li className="active">
              <Link to="/receiveShipmentList">Shipment List</Link>
            </li>
          </ol>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">All Received Boxes</h3>
                </div>
                <div className="box-body">
                  <Link to="/receiveShipment" style={{ color: "white" }}>
                    <button className="btn btn-info">Received Shipments</button>
                  </Link>
                  <div className="pricingTable">
                    <div className="pricing-content">
                      <BootstrapTable
                        data={allReceiveBoxes}
                        hover
                        pagination
                        search
                        tableHeaderclassName="my-header-class"
                        columnWidth="100%"
                        options={options}
                        headerStyle={{ background: "#DCDCDC" }}
                        sizePerPageList={[
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
                            value: allReceiveBoxes.length
                          }
                        ]}
                      >
                        <TableHeaderColumn
                          dataField="RECEIVE_MT_ID"
                          width="10%"
                          isKey={true}
                          dataFormat={deleteBox}
                        >
                          Action
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="SHIP_BOX_ID"
                          width="10%"
                          hidden
                        >
                          Ship Box ID
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField="BOX_NO" width="10%">
                          Box.No
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="SHIPED_BARCODES"
                          width="10%"
                        >
                          Shiped Barcodes
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="RECEIVE_BARCODES"
                          dataAlign="right"
                          width="10%"
                        >
                          Receive Barcodes
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="TRACKING_NO"
                          dataAlign="right"
                          width="10%"
                        >
                          Tracking No.
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="CARRIER"
                          dataAlign="right"
                          width="10%"
                        >
                          Carrier
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="RECEIVE_DATE"
                          dataAlign="right"
                          width="10%"
                        >
                          Receive Date
                        </TableHeaderColumn>
                      </BootstrapTable>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="box"
                id="barcodesView"
                hidden
                style={{ display: "none" }}
              >
                <div className="box-header">
                  <h3 className="box-title">All Received Barcodes</h3>
                </div>
                <div className="box-body">
                  <div className="col-sm-12">
                    <form onSubmit={this.handleBarcodeSearch}>
                      <div className="input-group">
                        <input
                          className="form-control pl"
                          type="number"
                          value={this.state.searchBarcode}
                          id="searchBarcode"
                          name="searchBarcode"
                          onChange={this.handleChange}
                          placeholder="Search by Barcode..."
                        />
                        <span className="input-group-btn">
                          <button
                            className="btn btn-flat btn-success"
                            type="submit"
                          >
                            Search
                          </button>
                        </span>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-12">
                    <BootstrapTable
                      data={receiveBarcodeList}
                      hover
                      pagination
                      search
                      tableHeaderclassName="my-header-class"
                      columnWidth="100%"
                      options={options}
                      sizePerPageList={[
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
                          value: receiveBarcodeList.length
                        }
                      ]}
                      headerStyle={{ background: "#DCDCDC" }}
                    >
                      <TableHeaderColumn
                        isKey={true}
                        width="5%"
                        dataField="RECEIVE_DT_ID"
                        dataFormat={deleteBarcode}
                      >
                        Action
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="RECEIVE_DT_ID"
                        dataFormat={imageView}
                        width="10%"
                      >
                        Picture
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="BARCODE_NO"
                        width="10%"
                        dataSort={true}
                      >
                        Barcode
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="UPC"
                        width="10%"
                        dataFormat={upc_mpn}
                      >
                        <p style={{ color: "#226EC0" }}>MPN</p>
                        <br /> UPC
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="MPN"
                        hidden
                        style={{ display: "none" }}
                      >
                        MPN
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="MPN_DESCRIPTION"
                        dataSort={true}
                        width="15%"
                      >
                        Description
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="BRAND"
                        dataSort={true}
                        width="10%"
                      >
                        Brand
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="BARCODE_STATUS"
                        dataSort={true}
                        dataFormat={barcodeStatus}
                        width="10%"
                      >
                        Status
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="REMARKS"
                        dataSort={true}
                        dataFormat={barcodeRemarks}
                        width="10%"
                      >
                        Remarks
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

export default ReceiveShipmentList;
