import React, { Component } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import "gasparesganga-jquery-loading-overlay";
import notify from "../../Functions/notify";
import swal from "sweetalert";
import { RViewer, RViewerTrigger } from "react-viewerjs";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../CSS_Files/table.css";
import { ToastsContainer, ToastsStore } from "react-toasts";

var that = "";
class ActionFormatter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      row: this.props.row,
      cell: this.props.cell
    };
  }
  confirmDelete = (row, cell) => {
    swal("Are you sure? Tracking No. is not given for this shipment!", {
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
          this.deleteShipment(row, cell);
          break;

        default:
          console.log("No!");
      }
    });
  };
  deleteShipment = (row, cell) => {
    const { baseUrl } = that.state;

    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_shipment/deleteShipment";
    const dbCall = new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          shipment_id: cell
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
        if (result.delete) {
          var shipments = that.state.shipments;
          for (var i = 0; i < shipments.length; i++) {
            if (shipments[i].action == cell) {
              shipments.splice(i, 1);
            }
          }

          that.setState({
            shipments: shipments
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
  getAllBoxes = (cell, row) => {
    $.LoadingOverlay("show");
    this.getAllBoxesDB(cell)
      .then(result => {
        $.LoadingOverlay("hide");
        that.setState({
          selectedShipment: cell,
          description: row.shipment_desc,
          remarks: row.remarks
        });
        if (result.found) {
          that.pushBoxes(result.allBoxes);
        } else {
          that.pushBoxes(result.allBoxes);
          notify("error", result.message);
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };
  getAllBoxesDB = cell => {
    const { baseUrl } = that.state;

    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_shipment/getAllBoxes";
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          shipment_id: cell
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
        {this.props.row.total_tracking_no == 0 ? (
          <button
            title="Delete"
            className="btn btn-danger"
            onClick={() => {
              this.confirmDelete(this.state.row, this.state.cell);
            }}
            value={this.state.cell}
          >
            <span
              className="glyphicon glyphicon-trash p-b-5"
              aria-hidden="true"
            />
          </button>
        ) : (
          ""
        )}
        <button
          title="Open Boxes"
          className="btn btn-info"
          onClick={() => {
            this.getAllBoxes(this.state.cell, this.state.row);
          }}
          value={this.state.cell}
        >
          <span className="glyphicon glyphicon-list p-b-5" aria-hidden="true" />
        </button>
      </React.Fragment>
    );
  }
}
class ActionBoxes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      row: this.props.row,
      cell: this.props.cell
    };
  }
  getAllBoxBarcodes = (cell, row, method) => {
    $.LoadingOverlay("show");
    this.getAllBoxesBarcodesDB(cell)
      .then(result => {
        $.LoadingOverlay("hide");

        that.pushBoxesBarcodes(
          result.getAllBoxesBarcodes,
          result.images,
          method
        );
        if (method == 1) {
          $([document.documentElement, document.body]).animate(
            {
              scrollTop: $("#barcodesView").offset().top
            },
            1000
          );
        }
        if (!result.found) {
          notify("error", result.message);
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };
  getAllBoxesBarcodesDB = cell => {
    const { baseUrl } = that.state;

    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_shipment/getAllBoxesBarcodes";
    return new Promise(function(resolve, reject) {
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
  };

  confirmDelete = (row, cell) => {
    swal("Are you sure? Tracking No. is not given for this Box!", {
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
          this.handleBoxDelete(row, cell);
          break;

        default:
          console.log("No!");
      }
    });
  };
  handleBoxDelete = (row, cell) => {
    const { baseUrl } = that.state;
    $.LoadingOverlay("show");
    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_shipment/handleBoxDelete";
    const dbCall = new Promise(function(resolve, reject) {
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
    dbCall
      .then(result => {
        $.LoadingOverlay("hide");
        if (result.delete) {
          var box = that.state.boxes;
          for (var i = 0; i < box.length; i++) {
            if (box[i].action == cell) {
              box.splice(i, 1);
            }
          }

          that.setState({
            boxes: box
          });
          that.shipmentsQuery();
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
  addMoreBarcodes = (row, cell) => {
    that.setState({
      edit_ship_box_id: cell
    });
    this.getAllBoxBarcodes(cell, row, 2);
    $("#openEditBoxModal").click();
  };
  render() {
    return (
      <React.Fragment>
        {!this.props.row.tracking_no ? (
          <React.Fragment>
            <button
              title="Add More Products"
              className="btn btn-primary"
              onClick={() => {
                this.addMoreBarcodes(this.props.row, this.props.cell);
              }}
              value={this.state.cell}
            >
              <span
                className="glyphicon glyphicon-edit p-b-5"
                aria-hidden="true"
              />
            </button>
            <button
              title="Delete"
              className="btn btn-danger"
              onClick={() => {
                this.handleBoxDelete(this.props.row, this.props.cell);
              }}
              value={this.props.cell}
            >
              <span
                className="glyphicon glyphicon-trash p-b-5"
                aria-hidden="true"
              />
            </button>
          </React.Fragment>
        ) : (
          ""
        )}
        <button
          title="Open Box"
          className="btn btn-info"
          onClick={() => {
            this.getAllBoxBarcodes(this.props.cell, this.props.row, 1);
          }}
          value={this.props.cell}
        >
          <span
            className="glyphicon glyphicon-folder-open p-b-5"
            aria-hidden="true"
          />
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
export class ImageView2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cell: this.props.cell,
      row: this.props.row,
      imagesUrl: that.state.imagesUrl2
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
export class ImageView3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cell: this.props.cell,
      row: this.props.row,
      imagesUrl: that.state.imagesUrl3
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
export class ActionDelete extends Component {
  constructor(props) {
    super(props);
  }
  deleteTempBarcode = (cell, row) => {
    const { baseUrl } = that.state;
    $.LoadingOverlay("show");
    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_shipment/deleteTempBarcode";
    const dbCall = new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          ship_dt_tmp_id: cell
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
        if (result.delete) {
          var barcodes = that.state.createBoxbarcodes;
          for (var i = 0; i < barcodes.length; i++) {
            if (barcodes[i].SHIP_DT_ID == cell) {
              barcodes.splice(i, 1);
            }
          }
          that.setState({
            createBoxbarcodes: barcodes
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
  render() {
    return (
      <React.Fragment>
        <button
          title="Delete"
          className="btn btn-danger"
          onClick={() => {
            this.deleteTempBarcode(this.props.cell, this.props.row);
          }}
          value={this.props.cell}
        >
          <span
            className="glyphicon glyphicon-trash p-b-5"
            aria-hidden="true"
          />
        </button>
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
    var ship_box_id = row.action;
    $.LoadingOverlay("show");
    let insertUrl =
      baseUrl +
      "/laptopzone/reactcontroller/c_shipment/updateTrackingNoOldShipment";
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
          that.pushBoxes(result.allBoxes);
          that.shipmentsQuery();
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
        {!this.props.cell ? (
          <div>
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
            </div>
            <button
              className="btn btn-xs btn-success"
              type="button"
              onClick={() =>
                this.handleTrackingNo(this.props.cell, this.props.row)
              }
            >
              Save
            </button>
          </div>
        ) : (
          this.props.cell
        )}
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
    var ship_box_id = row.action;
    $.LoadingOverlay("show");
    let insertUrl =
      baseUrl +
      "/laptopzone/reactcontroller/c_shipment/updateCarrierOldShipment";
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
          that.pushBoxes(result.allBoxes);
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
        {!this.props.cell ? (
          <div>
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
            </div>
            <button
              className="btn btn-xs btn-success"
              type="button"
              onClick={() =>
                this.handleCarrier(this.props.cell, this.props.row)
              }
            >
              Save
            </button>
          </div>
        ) : (
          this.props.cell
        )}
      </React.Fragment>
    );
  }
}
class ActionDeleteBarcode extends Component {
  constructor(props) {
    super(props);
  }
  handleDeleteBarcode = (cell, row) => {
    const { baseUrl } = that.state;
    var ship_dt_id = row.action;
    $.LoadingOverlay("show");
    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_shipment/ActionDeleteBarcode";
    const dbCall = new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          ship_dt_id: ship_dt_id
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
        if (result.delete) {
          var barcodes = that.state.alreadyAddedBoxes;
          for (var i = 0; i < barcodes.length; i++) {
            if (barcodes[i].action == cell) {
              barcodes.splice(i, 1);
            }
          }
          that.setState({
            alreadyAddedBoxes: barcodes
          });
          that.pushBoxes(result.allBoxes);
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
        <button
          title="Delete"
          className="btn btn-danger"
          onClick={() => {
            this.handleDeleteBarcode(this.props.cell, this.props.row);
          }}
          value={this.props.cell}
        >
          <span
            className="glyphicon glyphicon-trash p-b-5"
            aria-hidden="true"
          />
        </button>
      </React.Fragment>
    );
  }
}

function actionDeleteBarcode(cell, row) {
  return <ActionDeleteBarcode cell={cell} row={row} />;
}
function trackingNoFunction(cell, row) {
  return <TrackingNoFunction cell={cell} row={row} />;
}
function carrierFunction(cell, row) {
  return <CarrierFunction cell={cell} row={row} />;
}
function actionFormatter(cell, row) {
  return <ActionFormatter cell={cell} row={row} />;
}
function actionDelete(cell, row) {
  return <ActionDelete cell={cell} row={row} />;
}
function actionBoxes(cell, row) {
  return <ActionBoxes cell={cell} row={row} />;
}
function imageView(cell, row) {
  return <ImageView cell={cell} row={row} />;
}
function imageView2(cell, row) {
  return <ImageView2 cell={cell} row={row} />;
}
function imageView3(cell, row) {
  return <ImageView3 cell={cell} row={row} />;
}
class ShipmentTable extends Component {
  constructor(props) {
    super(props);
    that = this;
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    this.state = {
      baseUrl: finalurl,
      shipments: [],
      boxes: [],
      boxBarcodes: [],
      imagesUrl: [],
      imagesUrl2: [],
      imagesUrl3: [],
      alreadyAddedBoxes: [],
      createBoxbarcodes: [],
      selectedShipment: "",
      description: "",
      remarks: "",
      trackingNo: "",
      carrier: "",
      searchBarcode: "",
      searchBarcodeEdit: "",
      edit_ship_box_id: ""
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentWillMount() {
    this.shipmentsQuery();
  }
  shipmentsQuery = () => {
    $.LoadingOverlay("show");
    this.getAllShipments()
      .then(result => {
        $.LoadingOverlay("hide");
        if (result.found) {
          this.pushShipments(result.allShipments);
        } else {
          this.pushShipments(result.allShipments);
          notify("error", result.message);
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };
  getAllShipments = () => {
    const { baseUrl } = this.state;
    let userId = localStorage.getItem("userId");
    let merch_id = localStorage.getItem("merId");

    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_shipment/getAllShipment";
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          userId: userId,
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
  };
  pushShipments = shipments => {
    const length = shipments.length;
    const shipmentsList = [];

    for (let i = 0; i < length; i++) {
      shipmentsList.push({
        shipment_desc: shipments[i].SHIPMENT_DESC,
        remarks: shipments[i].REMARKS,
        total_tracking_no: shipments[i].TOTAL_TRACKING_NO,
        created_by: shipments[i].FIRST_NAME,
        merchant: shipments[i].BUISNESS_NAME,
        boxes: shipments[i].BOXES,
        action: shipments[i].SHIPMENT_ID
      });
    }
    this.setState({
      shipments: shipmentsList
    });
  };
  pushBoxes = boxes => {
    const length = boxes.length;
    const boxList = [];

    for (let i = 0; i < length; i++) {
      boxList.push({
        box_no: boxes[i].BOX_NO,
        totalBarcodes: boxes[i].BARCODE_NO,
        tracking_no: boxes[i].TRACKING_NO,
        carrier: boxes[i].CARRIER,
        action: boxes[i].SHIP_BOX_ID
      });
    }
    this.setState({
      boxes: boxList
    });
  };
  pushBoxesBarcodes = (boxBarcodes, images, method) => {
    const length = boxBarcodes.length;
    const boxBarcodesList = [];

    for (let i = 0; i < length; i++) {
      boxBarcodesList.push({
        barcode: boxBarcodes[i].BARCODE_NO,
        card_upc: boxBarcodes[i].UPC,
        card_mpn: boxBarcodes[i].MPN,
        mpn_description: boxBarcodes[i].MPN_DESCRIPTION,
        brand: boxBarcodes[i].BRAND,
        action: boxBarcodes[i].SHIP_DT_ID,
        images: boxBarcodes[i].SHIP_DT_ID
      });
    }
    if (method == 1) {
      this.setState({
        boxBarcodes: boxBarcodesList,
        imagesUrl: images
      });
    } else if (method == 2) {
      this.setState({
        alreadyAddedBoxes: boxBarcodesList,
        imagesUrl3: images
      });
    }
  };
  openCreateBox = () => {
    $("#openCreateBoxModal").click();
  };

  handleEditSearch = e => {
    e.preventDefault();
    const { baseUrl, selectedShipment, searchBarcode } = this.state;
    let userId = localStorage.getItem("userId");
    let merch_id = localStorage.getItem("merId");

    $.LoadingOverlay("show");
    let insertUrl =
      baseUrl +
      "/laptopzone/reactcontroller/c_shipment/editCreateShipmentDtTmp";
    const DBCall = new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          shipment_id: selectedShipment,
          searchBarcode: searchBarcode,
          userId: userId,
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
          createBoxbarcodes: result.box_details,
          imagesUrl2: result.images,
          searchBarcode: ""
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
  handleEditSearchOldBox = e => {
    e.preventDefault();
    const {
      baseUrl,
      selectedShipment,
      searchBarcodeEdit,
      edit_ship_box_id
    } = this.state;
    let userId = localStorage.getItem("userId");
    let merch_id = localStorage.getItem("merId");

    $.LoadingOverlay("show");
    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_shipment/handleEditSearchOldBox";
    const DBCall = new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          shipment_id: selectedShipment,
          searchBarcode: searchBarcodeEdit,
          edit_ship_box_id: edit_ship_box_id,
          userId: userId,
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
        const length = result.box_details.length;
        const boxBarcodesList = [];

        for (let i = 0; i < length; i++) {
          boxBarcodesList.push({
            barcode: result.box_details[i].BARCODE_NO,
            card_upc: result.box_details[i].UPC,
            card_mpn: result.box_details[i].MPN,
            mpn_description: result.box_details[i].MPN_DESCRIPTION,
            brand: result.box_details[i].BRAND,
            action: result.box_details[i].SHIP_DT_ID,
            images: result.box_details[i].SHIP_DT_ID
          });
        }
        this.setState({
          alreadyAddedBoxes: boxBarcodesList,
          imagesUrl3: result.images,
          searchBarcodeEdit: ""
        });
        this.pushBoxes(result.allBoxes);
        notify("success", result.message);
      } else {
        notify("error", result.message);
      }
    }).catch(err => {
      $.LoadingOverlay("hide");
      console.log(err);
    });
  };

  createNewBoxOldShipment = () => {
    const { baseUrl, selectedShipment, trackingNo, carrier } = this.state;
    let userId = localStorage.getItem("userId");

    $.LoadingOverlay("show");
    let insertUrl =
      baseUrl +
      "/laptopzone/reactcontroller/c_shipment/createNewBoxOldShipment";
    const DBCall = new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          shipment_id: selectedShipment,
          trackingNo: trackingNo,
          carrier: carrier,
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
      if (result.create) {
        this.setState({
          createBoxbarcodes: [],
          imagesUrl2: [],
          searchBarcode: ""
        });
        this.pushBoxes(result.allBoxes);
        this.shipmentsQuery();
        $("#closeModal").click();
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
    const {
      shipments,
      boxes,
      boxBarcodes,
      selectedShipment,
      createBoxbarcodes,
      alreadyAddedBoxes
    } = this.state;
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
            Shipment List<small>Control Panel</small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/welcom">
                <i className="fa fa-dashboard" /> Home
              </Link>
            </li>
            <li>Shipment</li>
            <li className="active">
              <Link to="/shipment">Shipment List</Link>
            </li>
          </ol>
        </section>

        <section className="content">
          <div className="row">
            <div className="col-xs-6">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">All Shipments </h3>
                </div>
                <div className="box-body">
                  <div className="col-sm-12">
                    <Link to="/shipment" style={{ color: "white" }}>
                      <button className="btn btn-info btn-block">
                        Create New Shipment
                      </button>
                    </Link>
                  </div>
                  <div className="#">
                    <div className="pricingTable">
                      <div className="pricing-content">
                        <BootstrapTable
                          data={shipments}
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
                              value: shipments.length
                            }
                          ]}
                        >
                          <TableHeaderColumn
                            dataField="shipment_desc"
                            width="20%"
                          >
                            Description
                          </TableHeaderColumn>
                          <TableHeaderColumn dataField="remarks" width="20%">
                            Remarks
                          </TableHeaderColumn>
                          <TableHeaderColumn dataField="merchant" width="20%">
                            Merchant
                          </TableHeaderColumn>
                          <TableHeaderColumn dataField="boxes" width="15%">
                            Total Boxes
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="action"
                            width="20%"
                            isKey={true}
                            dataFormat={actionFormatter}
                          >
                            Action
                          </TableHeaderColumn>
                        </BootstrapTable>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-6">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">Boxes </h3>
                </div>
                <div className="box-body">
                  <div className="col-sm-6 pull-left">
                    {selectedShipment ? (
                      boxes.length == 0 ? (
                        <button
                          className="btn btn-success"
                          onClick={this.openCreateBox}
                        >
                          Create Box
                        </button>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="#">
                    <div className="pricingTable">
                      <div className="pricing-content">
                        <BootstrapTable
                          data={boxes}
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
                              value: boxes.length
                            }
                          ]}
                        >
                          <TableHeaderColumn dataField="box_no" width="10%">
                            Box No.
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="totalBarcodes"
                            width="10%"
                          >
                            Total Items
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="tracking_no"
                            width="20%"
                            dataFormat={trackingNoFunction}
                          >
                            Tracking_No.
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="carrier"
                            width="20%"
                            dataFormat={carrierFunction}
                          >
                            Carrier
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="action"
                            width="20%"
                            isKey={true}
                            dataFormat={actionBoxes}
                          >
                            Action
                          </TableHeaderColumn>
                        </BootstrapTable>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-12" id="barcodesView">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">Barcodes </h3>
                </div>
                <div className="box-body">
                  <div className="col-sm-12">
                    <BootstrapTable
                      data={boxBarcodes}
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
                          value: boxBarcodes.length
                        }
                      ]}
                    >
                      <TableHeaderColumn
                        dataField="images"
                        width="10%"
                        dataFormat={imageView}
                        export={false}
                      >
                        Picture
                      </TableHeaderColumn>
                      <TableHeaderColumn dataField="barcode" width="20%">
                        Barcode
                      </TableHeaderColumn>
                      <TableHeaderColumn dataField="card_upc" width="20%">
                        UPC
                      </TableHeaderColumn>
                      <TableHeaderColumn dataField="card_mpn" width="20%">
                        MPN
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="mpn_description"
                        width="20%"
                      >
                        Description
                      </TableHeaderColumn>
                      <TableHeaderColumn dataField="brand" width="20%">
                        Manufacturer
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="action"
                        width="20%"
                        isKey={true}
                        hidden
                        dataFormat={actionBoxes}
                      >
                        Action
                      </TableHeaderColumn>
                    </BootstrapTable>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-info btn-lg"
            data-toggle="modal"
            data-target="#createBoxModal"
            hidden
            style={{ display: "none" }}
            id="openCreateBoxModal"
            name="openCreateBoxModal"
          />

          <div id="createBoxModal" className="modal fade" role="dialog">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                  <h4 className="modal-title">Create New Box</h4>
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
                  <div className="col-md-12 " style={{ marginBottom: "25px" }}>
                    <form onSubmit={this.handleEditSearch}>
                      <label htmlFor="searchBarcode" className="control-label">
                        Add products:
                      </label>
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
                      onClick={this.createNewBoxOldShipment}
                    >
                      Create Box
                    </button>
                  </div>
                  <BootstrapTable
                    data={createBoxbarcodes}
                    hover
                    pagination
                    search
                    exportCSV={true}
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
                        value: createBoxbarcodes.length
                      }
                    ]}
                  >
                    <TableHeaderColumn
                      isKey={true}
                      width="10%"
                      dataField="SHIP_DT_ID"
                      dataFormat={actionDelete}
                    >
                      Action
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="SHIP_DT_ID"
                      width="10%"
                      dataFormat={imageView2}
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

          <button
            type="button"
            className="btn btn-info btn-lg"
            data-toggle="modal"
            data-target="#EditBoxModal"
            hidden
            style={{ display: "none" }}
            id="openEditBoxModal"
            name="openEditBoxModal"
          />

          <div id="EditBoxModal" className="modal fade" role="dialog">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                  <h4 className="modal-title">Add More Products</h4>
                </div>
                <div className="modal-body">
                  <div className="col-md-12 " style={{ marginBottom: "25px" }}>
                    <form onSubmit={this.handleEditSearchOldBox}>
                      <label
                        htmlFor="searchBarcodeEdit"
                        className="control-label"
                      >
                        Add products:
                      </label>
                      <div className="input-group">
                        <input
                          className="form-control pl"
                          type="number"
                          value={this.state.searchBarcodeEdit}
                          id="searchBarcodeEdit"
                          name="searchBarcodeEdit"
                          onChange={this.handleChange}
                          placeholder="Search by Barcode..."
                        />
                        <span className="input-group-btn">
                          <button
                            className="btn btn-flat btn-success clickOnEnter"
                            type="submit"
                          >
                            Add
                          </button>
                        </span>
                      </div>
                    </form>
                    {/* <button
                      style={{ marginTop: "25px" }}
                      className="btn btn-block btn-primary"
                      type="submit"
                      onClick={this.editOldBox}
                    >
                      Add products
                    </button> */}
                  </div>
                  <BootstrapTable
                    data={alreadyAddedBoxes}
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
                        value: alreadyAddedBoxes.length
                      }
                    ]}
                  >
                    <TableHeaderColumn
                      dataField="images"
                      width="20%"
                      dataFormat={imageView3}
                      export={false}
                    >
                      Picture
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="barcode" width="10%">
                      Barcode
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="card_upc" width="15%">
                      UPC
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="card_mpn" width="10%">
                      MPN
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="mpn_description" width="20%">
                      Description
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="brand" width="10%">
                      Manufacturer
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="action"
                      width="15%"
                      isKey={true}
                      dataFormat={actionDeleteBarcode}
                    >
                      Action
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

export default ShipmentTable;
