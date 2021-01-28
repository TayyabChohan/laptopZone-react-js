import React, { Component } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import notify from "../../Functions/notify";
import swal from "sweetalert";
import "gasparesganga-jquery-loading-overlay";
import { RViewer, RViewerTrigger } from "react-viewerjs";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../CSS_Files/table.css";
import "../../CSS_Files/summary.css";
import { ToastsContainer, ToastsStore } from "react-toasts";

var that = "";
class DeleteAction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cell: this.props.cell,
      row: this.props.row
    };
  }
  confirmDelete = () => {
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
          this.deleteBarcode();
          break;

        default:
          console.log("No!");
      }
    });
  };
  deleteBarcode = () => {
    const { cell, row } = this.state;
    $.LoadingOverlay("show");
    this.addBarcodeScan(cell)
      .then(result => {
        $.LoadingOverlay("hide");
        if (result.delete) {
          var barcodes = that.state.records;
          for (var i = 0; i < barcodes.length; i++) {
            if (barcodes[i].ship_dt_tmp_id == cell) {
              barcodes.splice(i, 1);
            }
          }

          that.setState({
            records: barcodes
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
  addBarcodeScan = ship_dt_tmp_id => {
    let userId = localStorage.getItem("userId");

    let insertUrl =
      that.state.baseUrl +
      "/laptopzone/reactcontroller/c_shipment/deleteShipmentDtTmp";
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          ship_dt_tmp_id: ship_dt_tmp_id,
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
  };
  render() {
    return (
      <React.Fragment>
        <button
          type="button"
          className="btn btn-danger"
          onClick={this.confirmDelete}
        >
          Delete
        </button>
      </React.Fragment>
    );
  }
}
class BoxesAction extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
      baseUrl + "/laptopzone/reactcontroller/c_shipment/deleteBox";
    const DBCall = new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          ship_box_id: cell
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
        var boxes = that.state.totalBoxes;
        for (var i = 0; i < boxes.length; i++) {
          if (boxes[i].SHIP_BOX_ID == cell) {
            boxes.splice(i, 1);
          }
        }

        that.setState({
          totalBoxes: boxes
        });
        notify("success", result.message);
      } else {
        notify("error", result.message);
      }
    }).catch(err => {
      $.LoadingOverlay("hide");
      console.log(err);
    });
  };
  viewBox = (cell, row) => {
    that.setState({
      disableCarrier: row.CARRIER,
      disabletrackingNo: row.TRACKING_NO,
      shipmentEdit_id: row.SHIPMENT_ID,
      BoxNo: row.BOX_NO
    });
    const { baseUrl } = that.state;
    $.LoadingOverlay("show");
    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_shipment/getBoxDetails";
    const DBCall = new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          ship_box_id: cell
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
      that.setState({
        box_details: result.box_details,
        imagesUrl: result.images,
        ship_box_id: cell
      });
      $("#buttonEditBarcodeModal").click();
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
          className="btn btn-info btn-sm"
          onClick={() => this.viewBox(this.props.cell, this.props.row)}
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
class EditAction extends Component {
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
    const { baseUrl, shipmentEdit_id } = that.state;
    $.LoadingOverlay("show");
    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_shipment/deleteBoxBarcodeEdit";
    const DBCall = new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          ship_dt_id: cell,
          shipment_id: shipmentEdit_id
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
        var boxes = that.state.box_details;
        for (var i = 0; i < boxes.length; i++) {
          if (boxes[i].SHIP_DT_ID == cell) {
            boxes.splice(i, 1);
          }
        }
        that.setState({
          box_details: boxes,
          totalBoxes: result.totalBoxes
        });
        notify("success", result.message);
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
          title="Delete Barcode"
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
class TrackingNoFunction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TrackingNo: ""
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentWillMount() {
    this.setState({
      TrackingNo: this.props.cell
    });
  }
  handleTrackingNo = (cell, row) => {
    const { baseUrl } = that.state;
    const { TrackingNo } = this.state;
    var ship_box_id = row.SHIP_BOX_ID;
    $.LoadingOverlay("show");
    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_shipment/updateTrackingNo";
    const dbCall = new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          TrackingNo: TrackingNo,
          ship_box_id: ship_box_id
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
            value={this.state.TrackingNo}
            id="TrackingNo"
            name="TrackingNo"
            onChange={this.handleChange}
            placeholder="Tracking No..."
          />
          <span className="input-group-btn">
            <button
              className="btn btn-xs btn-success"
              type="button"
              onClick={() =>
                this.handleTrackingNo(this.props.cell, this.props.row)
              }
            >
              Save
            </button>
          </span>
        </div>
      </React.Fragment>
    );
  }
}
class CarrierFunction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Carrier: ""
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentWillMount() {
    this.setState({
      Carrier: this.props.cell
    });
  }
  handleCarrier = (cell, row) => {
    const { baseUrl } = that.state;
    const { Carrier } = this.state;
    var ship_box_id = row.SHIP_BOX_ID;
    $.LoadingOverlay("show");
    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_shipment/updateCarrier";
    const dbCall = new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          Carrier: Carrier,
          ship_box_id: ship_box_id
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
            value={this.state.Carrier}
            id="Carrier"
            name="Carrier"
            onChange={this.handleChange}
            placeholder="Carrier..."
          />
          <span className="input-group-btn">
            <button
              className="btn btn-xs btn-success"
              type="button"
              onClick={() =>
                this.handleCarrier(this.props.cell, this.props.row)
              }
            >
              Save
            </button>
          </span>
        </div>
      </React.Fragment>
    );
  }
}

function carrierFunction(cell, row) {
  return <CarrierFunction cell={cell} row={row} />;
}
function trackingNoFunction(cell, row) {
  return <TrackingNoFunction cell={cell} row={row} />;
}
function imageView(cell, row) {
  return <ImageView cell={cell} row={row} />;
}
function editAction(cell, row) {
  return <EditAction cell={cell} row={row} />;
}
function deleteAction(cell, row) {
  return <DeleteAction cell={cell} row={row} />;
}

function boxesAction(cell, row) {
  return <BoxesAction cell={cell} row={row} />;
}
class Shipment extends Component {
  constructor(props) {
    super(props);
    that = this;
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    this.state = {
      baseUrl: finalurl,
      description: "",
      remarks: "",
      btnValue: "Add",
      shipment_id: "",
      shipmentEdit_id: "",
      isLoaded: false,
      shpimentList: [],
      searchBarcode: "",
      records: [],
      totalBoxes: [],
      box_details: [],
      trackingNo: "",
      imagesUrl: [],
      carrier: "",
      disableCarrier: "",
      disabletrackingNo: "",
      editBarcode: "",
      ship_box_id: "",
      BoxNo: ""
    };
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addShipment = e => {
    e.preventDefault();

    if (this.state.btnValue == "Add") {
      this.SaveShipment("addShipment");
    } else if (this.state.btnValue == "Update") {
      this.SaveShipment("updateShipment");
    }
  };
  SaveShipment = methodCall => {
    $.LoadingOverlay("show");
    this.addShipmentRecord(methodCall)
      .then(result => {
        $.LoadingOverlay("hide");
        // shipment_id
        if (result.status) {
          this.setState({
            shipment_id: result.lj_shipment_id,
            btnValue: "Update",
            isLoaded: true
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
  addShipmentRecord = methodCall => {
    const { baseUrl, description, remarks, shipment_id } = this.state;
    let merch_id = localStorage.getItem("merId");
    let userId = localStorage.getItem("userId");

    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_shipment/" + methodCall;
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          shipment_id: shipment_id,
          description: description,
          remarks: remarks,
          merch_id: merch_id,
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
  };
  handleSearch = e => {
    e.preventDefault();
    if (!this.state.shipment_id) {
      notify("error", "Please add new shipment than scan barcode");
      return false;
    }
    this.SaveShipmentBarcode();
  };
  SaveShipmentBarcode = () => {
    const { searchBarcode } = this.state;
    if (!searchBarcode) {
      notify("success", "Please scan barcode");
      return false;
    }
    $.LoadingOverlay("show");
    this.addBarcodeScan(searchBarcode)
      .then(result => {
        $.LoadingOverlay("hide");
        if (result.status) {
          this.addBarcodeGrid(result.scanRecords);
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
  addBarcodeScan = searchBarcode => {
    const { baseUrl, shipment_id } = this.state;
    let userId = localStorage.getItem("userId");
    let merch_id = localStorage.getItem("merId");

    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_shipment/addShipmentDtTmp";
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          searchBarcode: searchBarcode,
          userId: userId,
          merch_id: merch_id,
          shipment_id: shipment_id
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
  };
  addBarcodeGrid = PropProd => {
    const length = PropProd.length;
    const productsList = [];

    for (let i = 0; i < length; i++) {
      productsList.push({
        barcode_prv_no: PropProd[i].BARCODE_PRV_NO,
        cond_name: PropProd[i].COND_NAME,
        card_upc: PropProd[i].CARD_UPC,
        card_mpn: PropProd[i].CARD_MPN,
        mpn_description: PropProd[i].MPN_DESCRIPTION,
        brand: PropProd[i].BRAND,
        ship_dt_tmp_id: PropProd[i].SHIP_DT_TMP_ID
      });
    }
    this.setState({
      records: productsList,
      searchBarcode: ""
    });
  };
  saveEditBarcodes = () => {
    const {
      baseUrl,
      shipmentEdit_id,
      ship_box_id,
      disableCarrier,
      disabletrackingNo
    } = this.state;
    let userId = localStorage.getItem("userId");
    $.LoadingOverlay("show");
    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_shipment/saveEditBarcodes";
    const DBCall = new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          userId: userId,
          shipment_id: shipmentEdit_id,
          ship_box_id: ship_box_id,
          trackingNo: disabletrackingNo,
          carrier: disableCarrier
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
      if (result.create) {
        this.setState({
          records: [],
          totalBoxes: result.totalBoxes
        });
        notify("success", result.message);
      } else {
        notify("error", result.message);
      }
    }).catch(err => {
      $.LoadingOverlay("hide");
      console.log(err);
    });
  };
  handleEditSearch = e => {
    e.preventDefault();
    const { baseUrl, shipmentEdit_id, editBarcode, ship_box_id } = this.state;
    let userId = localStorage.getItem("userId");
    let merch_id = localStorage.getItem("merId");

    $.LoadingOverlay("show");
    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_shipment/editShipmentDtTmp";
    const DBCall = new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          editBarcode: editBarcode,
          userId: userId,
          shipment_id: shipmentEdit_id,
          ship_box_id: ship_box_id,
          merch_id: merch_id
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
      if (result.status) {
        this.setState({
          box_details: result.box_details,
          imagesUrl: result.images,
          editBarcode: ""
        });
        notify("success", result.message);
      } else {
        notify("error", result.message);
      }
    }).catch(err => {
      $.LoadingOverlay("hide");
      console.log(err);
    });
  };
  createBox = e => {
    e.preventDefault();
    if (this.state.records.length === 0) {
      notify("error", "Please add barcodes first!");
    } else {
      this.setState({
        trackingNo: "",
        carrier: ""
      });
      $("#buttonShippingModal").click();
    }
  };
  createBoxLaterBtn = () => {
    this.createBoxExecute();
  };
  createBoxBtn = () => {
    const { trackingNo, carrier } = this.state;
    if (!trackingNo) {
      notify("error", "Please enter tracking no!");
      return false;
    }
    if (!carrier) {
      notify("error", "Please enter carrier!");
      return false;
    }

    this.createBoxExecute();
  };
  createBoxExecute = () => {
    const { trackingNo, carrier } = this.state;
    $.LoadingOverlay("show");
    this.createBoxDB(trackingNo, carrier)
      .then(result => {
        $.LoadingOverlay("hide");
        if (result.create) {
          $("#closeModal").click();
          this.setState({
            records: [],
            totalBoxes: result.totalBoxes
          });
          notify("success", result.message);
        } else {
          this.setState({
            totalBoxes: result.totalBoxes
          });
          notify("error", result.message);
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };
  createBoxDB = (trackingNo, carrier) => {
    const { baseUrl, shipment_id } = this.state;
    let userId = localStorage.getItem("userId");

    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_shipment/createBox";
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          userId: userId,
          shipment_id: shipment_id,
          trackingNo: trackingNo,
          carrier: carrier
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
  };
  render() {
    const { records, totalBoxes, box_details, BoxNo } = this.state;
    const options = {
      paginationShowsTotal: true,
      page: 2, // which page you want to show as default
      sizePerPage: 25, // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 5, // the pagination bar size.
      prePage: "Prev", // Previous page button text
      nextPage: "Next", // Next page button text
      firstPage: "First", // First page button text
      lastPage: "Last" // Last page button text
    };
    return (
      <React.Fragment>
        <ToastsContainer store={ToastsStore} />
        <section className="content-header">
          <h1>
            Shipment Form <small>Control Panel</small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/welcom">
                <i className="fa fa-dashboard" /> Home
              </Link>
            </li>
            <li>Transaction Form</li>
            <li className="active">
              <Link to="/shipment">Shipment Form</Link>
            </li>
          </ol>
        </section>

        <section className="content">
          <div className="row">
            <div className="col-xs-6">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">Shipment Details</h3>
                </div>
                <div className="box-body" style={{ height: "511px" }}>
                  <div className="col-sm-12">
                    <Link to="/shipmentTable" style={{ color: "white" }}>
                      <button className="btn btn-info btn-block">
                        Show All Shipments
                      </button>
                    </Link>
                  </div>
                  <form onSubmit={this.addShipment}>
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="description" className="control-label">
                          Description:
                        </label>
                        <input
                          type="text"
                          className="form-control pl1"
                          name="description"
                          id="description"
                          onChange={this.handleChange}
                          value={this.state.description}
                        />
                      </div>
                    </div>
                    <div className="col-sm-8">
                      <div className="form-group">
                        <label htmlFor="remarks" className="control-label">
                          Remarks:
                        </label>
                        <input
                          type="text"
                          className="form-control pl2"
                          name="remarks"
                          id="remarks"
                          onChange={this.handleChange}
                          value={this.state.remarks}
                        />
                      </div>
                    </div>
                    <div className="col-sm-2">
                      <div className="form-group pull-right">
                        <input
                          style={{ marginTop: "24px" }}
                          type="submit"
                          className="btn btn-success "
                          name="addShipment"
                          id="addShipment"
                          value={this.state.btnValue}
                        />
                      </div>
                    </div>
                  </form>
                  <div className="col-md-12">
                    <div className="col-md-12 " style={{ marginTop: "25px" }}>
                      <form onSubmit={this.handleSearch}>
                        <div className="input-group">
                          <input
                            className="form-control pl"
                            type="number"
                            value={this.state.searchBarcode}
                            id="searchBarcode"
                            name="searchBarcode"
                            onChange={this.handleChange}
                            placeholder="Search by Barcode ..."
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
                    <div className="col-md-12 ">
                      <form onSubmit={this.createBox}>
                        <input
                          style={{ marginTop: "50px" }}
                          type="submit"
                          className="btn btn-primary btn-block"
                          name="createBox"
                          id="createBox"
                          // disabled={false}
                          value="Create Box"
                        />
                      </form>
                    </div>
                    <div
                      className="pricingTable col-md-12"
                      style={{ marginTop: "50px" }}
                    >
                      <div className="price-value">
                        <span className="amount">
                          Total Barcodes: {records.length}
                        </span>
                        {/* <span className="month">10</span> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-6">
              <div className="box">
                <div className="box-body">
                  <div className="#">
                    <div className="pricingTable">
                      <div className="price-value">
                        <span className="amount">
                          Total Boxes: {totalBoxes.length}
                        </span>
                        {/* <span className="month">10</span> */}
                      </div>
                      <div className="pricing-content">
                        <BootstrapTable
                          data={totalBoxes}
                          hover
                          pagination
                          search
                          tableHeaderclassName="my-header-class"
                          columnWidth="100%"
                          options={options}
                          tableStyle={{ background: "#DCDCDC" }}
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
                              value: totalBoxes.length
                            }
                          ]}
                        >
                          <TableHeaderColumn
                            dataField="SHIP_BOX_ID"
                            width="10%"
                            isKey={true}
                            dataFormat={boxesAction}
                          >
                            Action
                          </TableHeaderColumn>
                          <TableHeaderColumn dataField="BOX_NO" width="10%">
                            Box.No
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="TRACKING_NO"
                            dataAlign="right"
                            width="10%"
                            dataFormat={trackingNoFunction}
                          >
                            Tracking.No
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="CARRIER"
                            dataAlign="right"
                            width="10%"
                            dataFormat={carrierFunction}
                          >
                            Carrier
                          </TableHeaderColumn>
                        </BootstrapTable>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Barcode Grid */}
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">Barcodes Grid</h3>
                </div>
                <div className="box-body">
                  <div className="col-sm-12">
                    {/* {<QuantityDelete />} */}
                    <BootstrapTable
                      data={records}
                      hover
                      pagination
                      search
                      exportCSV={true}
                      tableHeaderclassName="my-header-class"
                      columnWidth="100%"
                      options={options}
                      tableStyle={{ background: "#DCDCDC" }}
                      headerStyle={{ background: "#DCDCDC" }}
                    >
                      <TableHeaderColumn
                        isKey={true}
                        width="15%"
                        dataField="barcode_prv_no"
                      >
                        Barcode No
                      </TableHeaderColumn>
                      <TableHeaderColumn dataField="cond_name" width="10%">
                        Condition
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="card_upc"
                        dataSort={true}
                        width="15%"
                      >
                        UPC
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="card_mpn"
                        dataSort={true}
                        width="15%"
                      >
                        MPN
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="mpn_description"
                        dataSort={true}
                        width="20%"
                      >
                        Description
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="brand"
                        dataSort={true}
                        width="15%"
                      >
                        Brand
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="ship_dt_tmp_id"
                        export={false}
                        width="10%"
                        dataFormat={deleteAction}
                      >
                        Action
                      </TableHeaderColumn>
                    </BootstrapTable>
                  </div>
                  {/* #END# Table Data */}
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-info btn-lg"
            data-toggle="modal"
            data-target="#shippingModal"
            hidden
            style={{ display: "none" }}
            id="buttonShippingModal"
            name="buttonShippingModal"
          />

          <div id="shippingModal" className="modal fade" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                  <h4 className="modal-title">Shipping Details</h4>
                </div>
                <div className="modal-body">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="trackingNo" className="control-label">
                        Tracking No:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="trackingNo"
                        id="trackingNo"
                        onChange={this.handleChange}
                        value={this.state.trackingNo}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="carrier" className="control-label">
                        Carrier:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="carrier"
                        id="carrier"
                        onChange={this.handleChange}
                        value={this.state.carrier}
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-success pull-left"
                    onClick={this.createBoxBtn}
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={this.createBoxLaterBtn}
                  >
                    Later
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
          {/* #END# Barcode Grid */}
          <button
            type="button"
            className="btn btn-info btn-lg"
            data-toggle="modal"
            data-target="#editBarcodeModal"
            hidden
            style={{ display: "none" }}
            id="buttonEditBarcodeModal"
            name="buttonEditBarcodeModal"
          />

          <div id="editBarcodeModal" className="modal fade" role="dialog">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                  <h4 className="modal-title">Box No. # {BoxNo}</h4>
                </div>
                <div className="modal-body">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="description" className="control-label">
                        Description:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="description"
                        id="description"
                        disabled
                        onChange={this.handleChange}
                        value={this.state.description}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="remarks" className="control-label">
                        Remarks:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="remarks"
                        id="remarks"
                        disabled
                        onChange={this.handleChange}
                        value={this.state.remarks}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label
                        htmlFor="disabletrackingNo"
                        className="control-label"
                      >
                        Tracking No:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="disabletrackingNo"
                        id="disabletrackingNo"
                        onChange={this.handleChange}
                        value={this.state.disabletrackingNo}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="disableCarrier" className="control-label">
                        Carrier:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="disableCarrier"
                        id="disableCarrier"
                        onChange={this.handleChange}
                        value={this.state.disableCarrier}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 " style={{ marginBottom: "25px" }}>
                    <form onSubmit={this.handleEditSearch}>
                      <label htmlFor="editBarcode" className="control-label">
                        Add more products:
                      </label>
                      <div className="input-group">
                        <input
                          className="form-control pl"
                          type="number"
                          value={this.state.editBarcode}
                          id="editBarcode"
                          name="editBarcode"
                          onChange={this.handleChange}
                          placeholder="Search by Barcode..."
                        />
                        <span className="input-group-btn">
                          <button
                            className="btn btn-flat btn-success clickOnEnter"
                            type="submit"
                          >
                            Search
                          </button>
                        </span>
                      </div>
                    </form>
                    <button
                      style={{ marginTop: "25px" }}
                      className="btn btn-block btn-primary"
                      type="submit"
                      onClick={this.saveEditBarcodes}
                    >
                      Update
                    </button>
                  </div>
                  <BootstrapTable
                    data={box_details}
                    hover
                    pagination
                    search
                    exportCSV={true}
                    tableHeaderclassName="my-header-class"
                    columnWidth="100%"
                    options={options}
                    tableStyle={{ background: "#DCDCDC" }}
                    headerStyle={{ background: "#DCDCDC" }}
                  >
                    <TableHeaderColumn
                      isKey={true}
                      width="10%"
                      dataField="SHIP_DT_ID"
                      dataFormat={editAction}
                    >
                      Action
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="SHIP_DT_ID"
                      dataFormat={imageView}
                      width="10%"
                    >
                      Picture
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="BARCODE_NO" width="10%">
                      Barcode
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="UPC"
                      dataSort={true}
                      width="15%"
                    >
                      UPC
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="MPN"
                      dataSort={true}
                      width="15%"
                    >
                      MPN
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="MPN_DESCRIPTION"
                      dataSort={true}
                      width="20%"
                    >
                      Description
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="BRAND"
                      dataSort={true}
                      width="15%"
                    >
                      Brand
                    </TableHeaderColumn>
                  </BootstrapTable>
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
        </section>
      </React.Fragment>
    );
  }
}

export default Shipment;
