import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import $ from "jquery";
import "gasparesganga-jquery-loading-overlay";
import swal from "sweetalert";
import notify from "../Functions/notify";
import { RViewer, RViewerTrigger } from "react-viewerjs";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../CSS_Files/table.css";
import { ToastsContainer, ToastsStore } from "react-toasts";

function getBarcodes(lz_produc_inv_id) {
  var getUrl = window.location;
  var finalurl = getUrl.protocol + "//" + getUrl.hostname;

  let insertUrl =
    finalurl + "/laptopzone/reactcontroller/c_product/getBarcodes";
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: insertUrl,
      dataType: "json",
      type: "POST",
      data: { lz_produc_inv_id: lz_produc_inv_id }
    }).then(
      function(data) {
        resolve(data);
      },
      function(err) {
        reject(err);
      }
    );
  });
}
var that = "";
function addBarcodes(lz_produc_inv_id, methodCode) {
  let barcode = [];
  $.LoadingOverlay("show");
  getBarcodes(lz_produc_inv_id)
    .then(result => {
      $.LoadingOverlay("hide");
      //console.log(result);
      if (result.found) {
        barcode = result.barcodes;
        const barcodesList = [];
        const length = barcode.length;
        let dollarSign = "";
        if (methodCode != 2) {
          dollarSign = "$";
        } else {
          dollarSign = "";
        }
        for (let i = 0; i < length; i++) {
          barcodesList.push({
            action: barcode[i].DT_ID,
            status: barcode[i].STATUS,
            jeannie: barcode[i].LISTTOJEANNIE,
            acct_id: barcode[i].ACCT_ID,
            barcode: barcode[i].BARCODE_NO,
            cond_name: barcode[i].COND_NAME,
            cost: dollarSign + barcode[i].COST,
            accountName: barcode[i].ACCOUNT_NAME,
            created_at: barcode[i].ISSUED_DATE,
            ListToJeannie: barcode[i].DT_ID
          });
        }
        that.setState({
          bars: barcodesList,
          merchantName: result.master_records[0].BUISNESS_NAME,
          issuedDate: result.master_records[0].ISSUED_DATE,
          issuedBy: result.master_records[0].FIRST_NAME,
          NoOfBarcode: result.master_records[0].ITEM_QTY,
          lz_merchant_barcode_mt: result.master_records[0].MT_ID
        });
        if (methodCode == 1) {
          $("#open_barcode_modal").click();
        } else if (methodCode == 2) {
          $("#open_barcode_edit_modal").click();
        } else if (methodCode == 3) {
          $("#open_barcode_listToGini_modal").click();
        }
      } else {
        notify("error", result.message);
        // swal("Empty", result.message, "error");
      }
    })
    .catch(err => {
      $.LoadingOverlay("hide");
      console.log(err);
    });
}

class ActionFormatter extends React.Component {
  constructor(props) {
    super(props);
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    this.state = {
      baseUrl: finalurl,
      cell: this.props.cell,
      row: this.props.row
    };
  }

  delete = (row, cell) => {
    let status = row.status;
    this.setState({ isLoaded: false });
    // console.log(cell);
    // let status = "Partially Listed";
    if (status == "Not Listed") {
      if (row.qty == 1) {
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
              that.deleteAllFunction(row.action);
              break;

            default:
              console.log("No!");
          }
        });
      } else {
        swal("How do you want to delete?", {
          buttons: {
            deleteAll: {
              text: "Delete All",
              value: "deleteAll"
            },
            selectiveDelete: {
              text: "Selective Delete",
              value: "selectiveDelete"
            },
            cancel: "Cancel!"
          }
        }).then(value => {
          switch (value) {
            case "deleteAll":
              that.deleteAllFunction(row.action);
              break;

            case "selectiveDelete":
              //this.selectiveDeleteFunction(row.action);
              var str = row.upc;
              var upc_mpn = str.split("~");
              var upcStr = upc_mpn[0];
              var mpnStr = upc_mpn[1];
              var description = row.mpnDescription;
              var manufac = row.manufacturer;
              that.setState({
                upc: upcStr,
                mpn: mpnStr,
                mpn_description: description,
                manufacturer: manufac
              });
              addBarcodes(cell, 1);
              //swal("selective!", "Selective records!", "success");
              break;

            default:
            // console.log("Cancel!");
          }
        });
      }
    } else if (status == "Listed") {
      swal(
        "Warning!",
        "You cannot delete this it is already listed on eBay",
        "warning"
      );
    } else if (status == "Partially Listed") {
      if (row.qty == 1) {
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
              that.deleteAllFunction(row.action);
              break;

            default:
              console.log("No!");
          }
        });
      } else {
        swal(
          "Some of the barcodes are already listed on eBay! Please choose selectively to delete unlisted barcodes? ",
          {
            buttons: {
              selectiveDelete: {
                text: "Selective Delete",
                value: "selectiveDelete"
              },
              cancel: "Cancel!"
            }
          }
        ).then(value => {
          switch (value) {
            case "selectiveDelete":
              addBarcodes(cell, 1);
              break;

            default:
              console.log("Cancel!");
          }
        });
      }
    } else if (status == "Process Completed") {
      if (row.qty == 1) {
        swal("Charges will aply on deleting this barcode? Are you sure?", {
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
              that.deleteAllFunction(row.action);
              break;

            default:
              console.log("No!");
          }
        });
      } else {
        swal("Charges will aply on deleting this barcode? Are you sure?", {
          buttons: {
            deleteAll: {
              text: "Delete All",
              value: "deleteAll"
            },
            selectiveDelete: {
              text: "Selective Delete",
              value: "selectiveDelete"
            },
            cancel: "Cancel!"
          }
        }).then(value => {
          switch (value) {
            case "deleteAll":
              that.deleteAllFunction(row.action);
              break;

            case "selectiveDelete":
              //this.selectiveDeleteFunction(row.action);
              var str = row.upc;
              var upc_mpn = str.split("~");
              var upcStr = upc_mpn[0];
              var mpnStr = upc_mpn[1];
              var description = row.mpnDescription;
              var manufac = row.manufacturer;
              that.setState({
                upc: upcStr,
                mpn: mpnStr,
                mpn_description: description,
                manufacturer: manufac
              });
              addBarcodes(cell, 1);
              //swal("selective!", "Selective records!", "success");
              break;

            default:
            // console.log("Cancel!");
          }
        });
      }
    }
  };

  edit = (cell, row) => {
    let status = row.status;

    // upc mpn mpn_description manufacturer
    if (status == "Not Listed") {
      swal("Are you sure?", {
        buttons: {
          editModal: {
            text: "Edit",
            value: "edit"
          },
          cancel: "Cancel!"
        }
      }).then(value => {
        switch (value) {
          case "edit":
            var str = row.upc;
            var upc_mpn = str.split("~");
            var upcStr = upc_mpn[0];
            var mpnStr = upc_mpn[1];
            var description = row.mpnDescription;
            var manufac = row.manufacturer;
            that.setState({
              upc: upcStr,
              mpn: mpnStr,
              mpn_description: description,
              manufacturer: manufac,
              lz_product_inv_id: cell
            });
            addBarcodes(cell, 2);
            break;

          default:
            console.log("Cancel!");
        }
      });
    } else if (status == "Listed") {
      swal(
        "Warning!",
        "You cannot Edit this batch because it is already listed on eBay",
        "warning"
      );
    } else if (status == "Process Completed") {
      swal("Are you sure?", {
        buttons: {
          edit: {
            text: "Edit",
            value: "edit"
          },
          cancel: "Cancel!"
        }
      }).then(value => {
        switch (value) {
          case "edit":
            var str = row.upc;
            var upc_mpn = str.split("~");
            var upcStr = upc_mpn[0];
            var mpnStr = upc_mpn[1];
            var description = row.mpnDescription;
            var manufac = row.manufacturer;
            that.setState({
              upc: upcStr,
              mpn: mpnStr,
              mpn_description: description,
              manufacturer: manufac,
              lz_product_inv_id: cell
            });
            addBarcodes(cell, 2);
            break;

          default:
            console.log("Cancel!");
        }
      });
    }
  };

  ListToJeannieExecute = (cell, row) => {
    let status = row.jeannie;

    if (status == "Send To Jeannie") {
      if (row.qty == 1) {
        swal("Send to Jeannie! Are you sure?", {
          buttons: {
            SendAll: {
              text: "Send All",
              value: "SendAll"
            },
            cancel: "No!"
          }
        }).then(value => {
          switch (value) {
            case "SendAll":
              this.listToJeannie(cell);
              break;

            default:
              console.log("No!");
          }
        });
      } else {
        swal("Are you sure?", {
          buttons: {
            SendAll: {
              text: "Send All",
              value: "SendAll"
            },
            selectiveSend: {
              text: "Selective Send",
              value: "selectiveSend"
            },
            cancel: "Cancel!"
          }
        }).then(value => {
          switch (value) {
            case "SendAll":
              this.listToJeannie(cell);
              break;
            case "selectiveSend":
              var str = row.upc;
              var upc_mpn = str.split("~");
              var upcStr = upc_mpn[0];
              var mpnStr = upc_mpn[1];
              var description = row.mpnDescription;
              var manufac = row.manufacturer;
              that.setState({
                upc: upcStr,
                mpn: mpnStr,
                mpn_description: description,
                manufacturer: manufac,
                lz_product_inv_id: cell
              });
              addBarcodes(cell, 3);
              break;
            default:
              console.log("Cancel!");
          }
        });
      }
    } else if (status == "Already Sended To Jeannie") {
      swal(
        "Warning!",
        "You cannot Send this batch because it is already Sended on Jeannie",
        "warning"
      );
      // notify("error", result.message);
    } else if (status == "Partially Sended To Jeannie") {
      if (row.qty == 1) {
        swal("Send to Jeannie! Are you sure?", {
          buttons: {
            SendAll: {
              text: "Send All",
              value: "SendAll"
            },
            cancel: "No!"
          }
        }).then(value => {
          switch (value) {
            case "SendAll":
              this.listToJeannie(cell);
              break;

            default:
              console.log("No!");
          }
        });
      } else {
        swal("Some of the barcodes are already sended on Jeannie.", {
          buttons: {
            SendAll: {
              text: "Send All",
              value: "SendAll"
            },
            selectiveSend: {
              text: "Selective Send",
              value: "selectiveSend"
            },
            cancel: "Cancel!"
          }
        }).then(value => {
          switch (value) {
            case "SendAll":
              this.listToJeannie(cell);
              break;
            case "selectiveSend":
              var str = row.upc;
              var upc_mpn = str.split("~");
              var upcStr = upc_mpn[0];
              var mpnStr = upc_mpn[1];
              var description = row.mpnDescription;
              var manufac = row.manufacturer;
              that.setState({
                upc: upcStr,
                mpn: mpnStr,
                mpn_description: description,
                manufacturer: manufac,
                lz_product_inv_id: cell
              });
              addBarcodes(cell, 3);
              break;
            default:
              console.log("Cancel!");
          }
        });
      }
    }
  };
  listToJeannie = lz_product_inv_id => {
    $.LoadingOverlay("show");
    this.updateListStatus(lz_product_inv_id)
      .then(result => {
        $.LoadingOverlay("hide");
        if (result.update) {
          swal("Success", result.message, "success");
          that.executeFunction();
        } else {
          swal("Empty", result.message, "error");
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };

  updateListStatus = lz_product_inv_id => {
    const { baseUrl } = this.state;
    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_product/listToJeannie";
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: { lz_product_inv_id: lz_product_inv_id }
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
          title="Delete"
          className="btn btn-danger"
          onClick={() => {
            this.delete(this.state.row, this.state.cell);
          }}
          value={this.state.cell}
        >
          <span
            className="glyphicon glyphicon-trash p-b-5"
            aria-hidden="true"
          />
        </button>
        <button
          title="Edit"
          className="btn btn-info"
          onClick={() => {
            this.edit(this.state.cell, this.state.row);
          }}
          value={this.state.cell}
        >
          <span className="glyphicon glyphicon-edit p-b-5" aria-hidden="true" />
        </button>
        <button
          title="Send To Jeannie"
          className="btn btn-info"
          onClick={() => {
            this.ListToJeannieExecute(this.state.cell, this.state.row);
          }}
          value={this.state.cell}
        >
          <span className="glyphicon glyphicon-list p-b-5" aria-hidden="true" />
        </button>
      </React.Fragment>
    );
  }
}

export class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cell: this.props.cell,
      row: this.props.row
    };
  }

  render() {
    const { cell } = this.state;
    return (
      <React.Fragment>
        <span
          className={
            "btn btn-sm btn-" +
            (cell == "Listed"
              ? "success"
              : cell == "Not Listed"
              ? "warning"
              : cell == "Process Completed"
              ? "danger"
              : "")
          }
        >
          <b>{cell}</b>
        </span>
      </React.Fragment>
    );
  }
}
export class PrintBarcode extends Component {
  constructor(props) {
    super(props);
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    this.state = {
      baseUrl: finalurl,
      cell: this.props.cell,
      row: this.props.row
    };
  }
  render() {
    const { cell, row, baseUrl } = this.state;
    return (
      <React.Fragment>
        <div>
          <a
            href={
              baseUrl +
              "/laptopzone/reactcontroller/c_product/printBarcode/" +
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
}
export class ListFunction extends Component {
  constructor(props) {
    super(props);
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    this.state = {
      baseUrl: finalurl,
      cell: this.props.cell,
      row: this.props.row
    };
  }

  handleList = (cell, row) => {
    const { lz_product_inv_id } = that.state;
    $.LoadingOverlay("show");
    this.updateBarcodeStatus(cell)
      .then(result => {
        $.LoadingOverlay("hide");
        if (result.update) {
          notify("success", result.message);
          // swal("Success", result.message, "success");
          addBarcodes(lz_product_inv_id, 4);
          that.executeFunction();
        } else {
          notify("error", result.message);
          // swal("Empty", result.message, "error");
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };

  updateBarcodeStatus = dt_id => {
    const { baseUrl } = this.state;
    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_product/updateBarcodeStatus";
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: { dt_id: dt_id }
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
    const { cell, row } = this.state;
    console.log(cell);
    return (
      <React.Fragment>
        {row.jeannie == "Send To Jeannie" ? (
          <div>
            <button
              title="Send To Jeannie"
              className="btn btn-info btn-sm"
              onClick={() => this.handleList(cell, row)}
            >
              <span className="glyphicon glyphicon-list" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <div>
            <button
              title="Already Sended To Jeannie"
              className="btn btn-success btn-sm"
            >
              Already Sended To Jeannie
            </button>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export class EditCost extends Component {
  constructor(props) {
    super(props);
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    this.state = {
      baseUrl: finalurl,
      cell: this.props.cell,
      row: this.props.row,
      cost: ""
    };
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  componentWillMount() {
    const { cell } = this.state;
    this.setState({
      cost: cell
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { row, cost } = this.state;
    let dt_id = row.action;
    this.updateCostExecuteFunction(dt_id, cost);
  };

  updateCostExecuteFunction = (dt_id, cost) => {
    $.LoadingOverlay("show");
    this.updateCost(dt_id, cost)
      .then(result => {
        $.LoadingOverlay("hide");
        if (result.updated) {
          notify("success", result.message);
          // swal("Success", result.message, "success");
          that.executeFunction();
        } else {
          notify("error", result.message);
          // swal("Error", result.message, "error");
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };

  updateCost = (dt_id, cost) => {
    const { baseUrl } = this.state;
    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_product/updateCost";
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: { dt_id: dt_id, cost: cost }
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
        <form onSubmit={this.handleSubmit}>
          <input
            type="number"
            id="cost"
            name="cost"
            onChange={this.handleChange}
            className="form-group"
            value={this.state.cost}
          />
          <input
            type="submit"
            className="btn btn-success btn-sm"
            value="Save"
          />
        </form>
      </React.Fragment>
    );
  }
}
export class EditAccount extends Component {
  constructor(props) {
    super(props);
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    this.state = {
      baseUrl: finalurl,
      cell: this.props.cell,
      row: this.props.row,
      account: ""
    };
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  componentWillMount() {
    const { row } = this.state;
    this.setState({
      account: row.acct_id
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    const { row, account } = this.state;
    let dt_id = row.action;
    this.updateAccountExecution(dt_id, account);
  };

  updateAccountExecution = (dt_id, account) => {
    $.LoadingOverlay("show");
    this.updateAccount(dt_id, account)
      .then(result => {
        $.LoadingOverlay("hide");
        if (result.updated) {
          notify("success", result.message);
          // swal("Success", result.message, "success");
          // that.executeFunction();
        } else {
          notify("error", result.message);
          // swal("Error", result.message, "error");
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };

  updateAccount = (dt_id, account) => {
    const { baseUrl } = this.state;
    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_product/updateAccount";
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: { dt_id: dt_id, account: account }
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
    const { cell, row } = this.state;
    var accounts = that.state.accounts.map(function(obj) {
      return (
        <option
          key={obj.ACCT_ID}
          value={obj.ACCT_ID}
          selected={obj.ACCT_ID == row.acct_id}
        >
          {obj.ACCOUNT_NAME}
        </option>
      );
    });
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <select
            className="form-group"
            name="account"
            id="account"
            onChange={this.handleChange}
          >
            {accounts}
          </select>
          <input
            type="submit"
            className="btn btn-success btn-sm"
            value="Save"
          />
        </form>
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

function action(cell, row) {
  return <ActionFormatter cell={cell} row={row} />;
}
function status(cell, row) {
  return <Status cell={cell} row={row} />;
}
function printBarcode(cell, row) {
  return <PrintBarcode cell={cell} row={row} />;
}
function editCost(cell, row) {
  return <EditCost cell={cell} row={row} />;
}
function listFunction(cell, row) {
  return <ListFunction cell={cell} row={row} />;
}
function editAccount(cell, row) {
  return <EditAccount cell={cell} row={row} />;
}
function imageView(cell, row) {
  return <ImageView cell={cell} row={row} />;
}
function trClassFormat(rowData, rIndex) {
  var status = rowData.jeannie;
  if (status == "Already Sended To Jeannie") {
    return "tr-functio-full";
  } else if (status == "Partially Sended To Jeannie") {
    return "tr-functio-partial";
  } else if (status == "Send To Jeannie") {
    return "tr-functio-not";
  }
}
function jeannieStatus(cell, row) {
  var status = row.jeannie;
  if (status == "Already Sended To Jeannie") {
    return <span className="btn btn-success btn-sm">{status}</span>;
  } else if (status == "Partially Sended To Jeannie") {
    return <span className="btn btn-warning btn-sm">{status}</span>;
  } else if (status == "Send To Jeannie") {
    return <span className="btn btn-info btn-sm">{status}</span>;
  }
}
function customConfirm(next, dropRowKeys) {
  const dropRowKeysStr = dropRowKeys.join(",");
  // console.log(next + " : " + dropRowKeys + " : " + dropRowKeysStr);
  var ids = dropRowKeysStr.split(",");
  var NotListedIds = [];
  // console.log(that.state.bars[0].action);
  // var removed = arr.splice(2, 2);
  swal("Are you sure?", {
    buttons: {
      deleteAll: {
        text: "Confirm Delete!",
        value: "deleteAll"
      },
      cancel: "Cancel!"
    }
  }).then(value => {
    switch (value) {
      case "deleteAll":
        //this.deleteAllFunction(row.action);
        var barcodes = that.state.bars;
        for (var i = 0; i < barcodes.length; i++) {
          for (var j = 0; j < ids.length; j++) {
            if (barcodes[i].action == ids[j]) {
              if (barcodes[i].status == "Listed") {
                swal("warning", "Cannot delete listed barcode", "warning");
              } else if (barcodes[i].status == "Not Listed") {
                barcodes.splice(i, 1);
                NotListedIds.push(ids[j]);
              } else if (barcodes[i].status == "Process Completed") {
                swal("Charges will aply on deleting this barcode", {
                  buttons: {
                    deleteConfirm: {
                      text: "Are you sure?",
                      value: "deleteConfirm"
                    },
                    cancel: "Cancel"
                  }
                }).then(value => {
                  switch (value) {
                    case "deleteConfirm":
                      barcodes.splice(i, 1);
                      NotListedIds.push(ids[j]);
                      break;
                    default:
                      console.log("Cancel!");
                  }
                });
              }
            }
          }
        }
        next();
        that.selectiveDeleteExecuteFunction(NotListedIds);
        that.setState({ bars: barcodes });
        //$("#closeModal").click();
        if (barcodes == 0) {
          window.location.reload();
        }
        break;

      default:
        console.log("Cancel!");
    }
  });
}

class GenerateBars extends Component {
  constructor(props) {
    super(props);
    that = this;
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    this.state = {
      baseUrl: finalurl,
      lz_product_inv_mt: [],
      products: [],
      bars: [],
      accounts: [],
      merchantName: "",
      issuedDate: "",
      issuedBy: "",
      NoOfBarcode: "",
      lz_merchant_barcode_mt: "",
      upc: "",
      mpn: "",
      mpn_description: "",
      manufacturer: "",
      lz_product_inv_id: "",
      accountList: "",
      isLoaded: false,
      alreadSended: 0,
      partialSended: 0,
      sendTojeannie: 0,
      costList: "",
      imagesUrl: [],
      redirectToReferrer: false
    };
  }

  componentWillMount() {
    if (localStorage.getItem("userName")) {
      this.setState({ merchant_id: localStorage.getItem("merId") });
    } else {
      this.setState({ redirectToReferrer: true });
    }
    if (localStorage.getItem("resultMessage")) {
      var resultMessage = localStorage.getItem("resultMessage");
      notify("success", resultMessage);
      // swal("Success", resultMessage, "success");
      localStorage.setItem("resultMessage", "");
    }

    this.executeFunction();
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleAccountSubmit = e => {
    e.preventDefault();
    const { lz_product_inv_id, accountList } = this.state;
    var account_id = accountList;
    this.updateAccount(lz_product_inv_id, account_id);
  };
  updateAccount = (lz_product_inv_id, account_id) => {
    $.LoadingOverlay("show");
    this.updateAllAccounts(lz_product_inv_id, account_id)
      .then(result => {
        $.LoadingOverlay("hide");
        if (result.updated) {
          localStorage.setItem("resultMessage", result.message);
          localStorage.setItem("lz_product_inv_id", lz_product_inv_id);
          window.location.reload();
        } else {
          notify("error", result.message);
          // swal("Empty", result.message, "error");
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };

  updateAllAccounts = (lz_product_inv_id, account_id) => {
    const { baseUrl } = this.state;
    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_product/updateAllAccounts";
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          lz_product_inv_id: lz_product_inv_id,
          account_id: account_id
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
  handleCostSubmit = e => {
    e.preventDefault();
    const { lz_product_inv_id, costList } = this.state;
    this.updateCostAll(lz_product_inv_id, costList);
  };
  updateCostAll = (lz_product_inv_id, costList) => {
    $.LoadingOverlay("show");
    this.updateAllCosts(lz_product_inv_id, costList)
      .then(result => {
        $.LoadingOverlay("hide");
        if (result.updated) {
          localStorage.setItem("resultMessage", result.message);
          localStorage.setItem("lz_product_inv_id", lz_product_inv_id);
          window.location.reload();
        } else {
          notify("error", result.message);
          // swal("Empty", result.message, "error");
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };

  updateAllCosts = (lz_product_inv_id, costList) => {
    const { baseUrl } = this.state;
    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_product/updateAllCosts";
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          lz_product_inv_id: lz_product_inv_id,
          costList: costList
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

  printAll = e => {
    e.preventDefault();
    const { baseUrl, lz_merchant_barcode_mt } = this.state;
    var sticker_url =
      baseUrl +
      "/laptopzone/merchant/c_merchant/printAllBarcode/" +
      lz_merchant_barcode_mt;
    window.open(sticker_url, "_blank");
  };
  executeFunction = () => {
    $.LoadingOverlay("show");
    this.getAllInventoryWithId()
      .then(result => {
        $.LoadingOverlay("hide");
        if (result.show) {
          console.log(result.images);
          this.setState({
            isLoaded: true,
            lz_product_inv_mt: result.allRecords,
            accounts: result.accounts,
            imagesUrl: result.images
          });
          this.addProducts(this.state.lz_product_inv_mt);
        } else {
          this.setState({
            isLoaded: false,
            lz_product_inv_mt: result.allRecords,
            accounts: result.accounts,
            imagesUrl: result.images
          });
          this.addProducts(this.state.lz_product_inv_mt);
          notify("error", result.message);
          // swal("Empty", result.message, "error");
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };

  getAllInventoryWithId = () => {
    const { baseUrl } = this.state;
    let merch_id = localStorage.getItem("merId");
    let userId = localStorage.getItem("userId");
    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_product/getLzProductInvMt";
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: { merch_id: merch_id, userId: userId }
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

  selectiveDeleteExecuteFunction = dt_id => {
    $.LoadingOverlay("show");
    this.selectiveDelete(dt_id)
      .then(result => {
        $.LoadingOverlay("hide");
        if (result.updated) {
          notify("success", "Records you have selected has been deleted!");
          this.executeFunction();
        } else {
          notify("error", result.message);
          // swal("Error", result.message, "error");
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };

  selectiveDelete = dt_id => {
    const { baseUrl } = this.state;
    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_product/selectiveDelete";
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: { dt_id: dt_id }
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
  deleteAllFunction = lz_produc_inv_id => {
    $.LoadingOverlay("show");
    this.deleteAll(lz_produc_inv_id)
      .then(result => {
        $.LoadingOverlay("hide");
        if (result.delete) {
          notify("success", result.message);
          // swal("Success", result.message, "success");
          this.executeFunction();
        } else {
          notify("error", result.message);
          // swal("Empty", result.message, "error");
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };

  deleteAll = lz_produc_inv_id => {
    const { baseUrl } = this.state;
    let insertUrl = baseUrl + "/laptopzone/reactcontroller/c_product/deleteAll";
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: { lz_produc_inv_id: lz_produc_inv_id }
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
  addProducts = lz_product_inv_mt => {
    const length = lz_product_inv_mt.length;
    const productsList = [];
    var alreadSended = 0;
    var partialSended = 0;
    var sendTojeannie = 0;

    for (let i = 0; i < length; i++) {
      let cost = lz_product_inv_mt[i].ITEM_COST;
      if (cost == 0 || cost == null) {
        cost = 0;
      }
      let upc_mpn = lz_product_inv_mt[i].UPC + " ~ " + lz_product_inv_mt[i].MPN;

      if (lz_product_inv_mt[i].LIST_JEANNIE === "Already Sended To Jeannie") {
        alreadSended++;
      } else if (
        lz_product_inv_mt[i].LIST_JEANNIE === "Partially Sended To Jeannie"
      ) {
        partialSended++;
      } else if (lz_product_inv_mt[i].LIST_JEANNIE === "Send To Jeannie") {
        sendTojeannie++;
      }

      productsList.push({
        status: lz_product_inv_mt[i].STATUS,
        jeannie: lz_product_inv_mt[i].LIST_JEANNIE,
        merchant: lz_product_inv_mt[i].BUISNESS_NAME,
        creaed_by: lz_product_inv_mt[i].FIRST_NAME,
        barcodes: lz_product_inv_mt[i].BARCODES,
        upc: upc_mpn,
        mpnDescription: lz_product_inv_mt[i].MPN_DESCRIPTION,
        qty: lz_product_inv_mt[i].ITEM_QTY,
        cost: "$" + cost,
        created_at: lz_product_inv_mt[i].ISSUED_DATE,
        action: lz_product_inv_mt[i].LZ_PRODUCT_INV_ID,
        manufacturer: lz_product_inv_mt[i].MANUFACTURER,
        images: lz_product_inv_mt[i].LZ_PRODUCT_ID
      });
    }

    this.setState({
      products: productsList,
      alreadSended: alreadSended,
      partialSended: partialSended,
      sendTojeannie: sendTojeannie
    });
    if (localStorage.getItem("lz_product_inv_id")) {
      var lz_product_inv_id = localStorage.getItem("lz_product_inv_id");
      this.setState({ lz_product_inv_id: lz_product_inv_id });
      addBarcodes(lz_product_inv_id, 2);
      localStorage.setItem("lz_product_inv_id", "");
    }
  };
  handleAlreadyClick = () => {
    this.refs.jeannieStatus.applyFilter("Already Sended To Jeannie");
  };
  handlePartialClick = () => {
    this.refs.jeannieStatus.applyFilter("Partially Sended To Jeannie");
  };
  handleSendClick = () => {
    this.refs.jeannieStatus.applyFilter("Send To Jeannie");
  };
  handleAllClick = () => {
    this.refs.jeannieStatus.applyFilter("");
  };

  render() {
    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: "/login" }} />;
    }
    const {
      baseUrl,
      products,
      bars,
      accounts,
      isLoaded,
      alreadSended,
      partialSended,
      sendTojeannie
    } = this.state;
    if (!isLoaded) {
      return (
        <React.Fragment>
          <section className="content-header">
            <h1>
              Manage Inventory <small>Control Panel</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <Link to="/merchantDashboard">
                  <i className="fa fa-dashboard" /> Home
                </Link>
              </li>
              <li>Manage Inventory</li>
              <li className="active">
                <Link to="/generateBars">Manage Inventory</Link>
              </li>
            </ol>
          </section>

          <section className="content">
            <div className="row">
              <div className="col-xs-12">
                <div className="box">
                  <div className="box-header">
                    <h3 className="box-title">Manage Inventory</h3>
                  </div>
                  <div className="box-body">
                    <div className="col-sm-12">
                      <Link to="/manageInventory" style={{ color: "white" }}>
                        <button className="btn btn-success">Inventory</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </React.Fragment>
      );
    } else {
      var accounts2 = accounts.map(function(obj) {
        return (
          <option key={obj.ACCT_ID} value={obj.ACCT_ID}>
            {obj.ACCOUNT_NAME}
          </option>
        );
      });

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
        paginationPosition: "top", // default is bottom, top and both is all available
        handleConfirmDeleteRow: customConfirm
      };

      // If you want to enable deleteRow, you must enable row selection also.
      const selectRowProp = {
        mode: "checkbox"
      };

      return (
        <React.Fragment>
          <ToastsContainer store={ToastsStore} />
          <section className="content-header">
            <h1>
              Manage Inventory <small>Control Panel</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <Link to="/merchantDashboard">
                  <i className="fa fa-dashboard" /> Home
                </Link>
              </li>
              <li>Manage Inventory</li>
              <li className="active">
                <Link to="/generateBars">Manage Inventory</Link>
              </li>
            </ol>
          </section>

          <section className="content">
            <div className="row">
              <div className="col-xs-12">
                <div className="box">
                  <div className="box-header">
                    <h3 className="box-title">Manage Inventory</h3>
                  </div>
                  <div className="box-body">
                    <div className="col-sm-12">
                      <Link to="/manageInventory" style={{ color: "white" }}>
                        <button className="btn btn-success">Inventory</button>
                      </Link>
                    </div>
                    <div className="col-sm-12">
                      <br />
                      <div className="col-sm-12">
                        <label htmlFor="manufacturer" className="control-label">
                          Apply Filter:
                        </label>
                      </div>
                      <div className="col-sm-3">
                        <button
                          onClick={this.handleAlreadyClick}
                          className="btn"
                          style={{ backgroundColor: "#008D4C", color: "white" }}
                        >
                          Already Sended To Jeannie ({alreadSended})
                        </button>
                      </div>
                      <div className="col-sm-3">
                        <button
                          onClick={this.handlePartialClick}
                          className="btn btn-warning"
                        >
                          Partially Sended To Jeannie ({partialSended})
                        </button>
                      </div>
                      <div className="col-sm-3">
                        <button
                          onClick={this.handleSendClick}
                          className="btn btn-info"
                        >
                          Send To Jeannie ({sendTojeannie})
                        </button>
                      </div>
                      <div className="col-sm-3">
                        <button
                          onClick={this.handleAllClick}
                          className="btn btn-default"
                        >
                          Show All
                        </button>
                      </div>
                      <br />
                      <br />
                      <br />
                      <br />
                    </div>
                    <div className="tableView">
                      {/* {<QuantityDelete />} */}
                      <BootstrapTable
                        data={products}
                        pagination
                        search
                        exportCSV={true}
                        tableHeaderClass="my-header-class"
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
                            value: products.length
                          }
                        ]}
                        trClassName={trClassFormat}
                      >
                        <TableHeaderColumn
                          dataField="images"
                          width="10%"
                          dataFormat={imageView}
                          export={false}
                        >
                          Picture
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="status"
                          csvHeader="product ID"
                          width="10%"
                          dataFormat={status}
                        >
                          Status
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField="barcodes" width="10%">
                          Barcodes
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="jeannie"
                          width="10%"
                          ref="jeannieStatus"
                          filter={{ type: "RegexFilter" }}
                          dataFormat={jeannieStatus}
                          dataSort={true}
                        >
                          Jeannie Status
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="upc"
                          width="10%"
                          dataSort={true}
                        >
                          UPC ~ MPN
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="mpnDescription"
                          width="10%"
                          dataSort={true}
                        >
                          Description
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="qty"
                          width="7%"
                          dataSort={true}
                        >
                          Quantity
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="cost"
                          dataAlign="right"
                          width="7%"
                          dataSort={true}
                        >
                          Cost
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="merchant"
                          csvFieldType="string"
                          width="10%"
                          dataSort={true}
                        >
                          Merchant
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="creaed_by"
                          csvFieldType="string"
                          width="10%"
                          dataSort={true}
                        >
                          Created By
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="created_at"
                          csvFieldType="string"
                          columnClassName="DateColor"
                          width="10%"
                        >
                          Issued Date
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="action"
                          isKey={true}
                          dataFormat={action}
                          export={false}
                        >
                          Action
                        </TableHeaderColumn>
                      </BootstrapTable>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Modal View */}
          <button
            type="button"
            className="btn btn-info btn-lg"
            id="open_barcode_modal"
            hidden
            style={{ display: "none" }}
            data-toggle="modal"
            data-target="#deleteModal"
          />

          <div id="deleteModal" className="modal fade in" role="dialog">
            <div className="modal-dialog " style={{ width: "80%" }}>
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                  <h4 className="modal-title" />
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-xs-12">
                      <div className="box">
                        <div className="box-header">
                          <h3 className="box-title">Product Details</h3>
                        </div>
                        <div className="box-body">
                          <div className="col-sm-12">
                            <div className="col-sm-3">
                              <div className="form-group">
                                <label htmlFor="upc" className="control-label">
                                  UPC:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  disabled
                                  value={this.state.upc}
                                />
                              </div>
                            </div>
                            <div className="col-sm-3">
                              <div className="form-group">
                                <label htmlFor="mpn" className="control-label">
                                  MPN:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  disabled
                                  value={this.state.mpn}
                                />
                              </div>
                            </div>
                            <div className="col-sm-3">
                              <div className="form-group">
                                <label
                                  htmlFor="description"
                                  className="control-label"
                                >
                                  Description:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  disabled
                                  value={this.state.mpn_description}
                                />
                              </div>
                            </div>
                            <div className="col-sm-3">
                              <div className="form-group">
                                <label
                                  htmlFor="manufacturer"
                                  className="control-label"
                                >
                                  Manufacturer:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  disabled
                                  value={this.state.manufacturer}
                                />
                              </div>
                            </div>
                            <div className="col-sm-3">
                              <div className="form-group">
                                <label
                                  htmlFor="manufacturer"
                                  className="control-label"
                                >
                                  Merchant Name:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  disabled
                                  value={this.state.merchantName}
                                />
                              </div>
                            </div>
                            <div className="col-sm-3">
                              <div className="form-group">
                                <label
                                  htmlFor="manufacturer"
                                  className="control-label"
                                >
                                  Issue Date:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  disabled
                                  value={this.state.issuedDate}
                                />
                              </div>
                            </div>
                            <div className="col-sm-3">
                              <div className="form-group">
                                <label
                                  htmlFor="manufacturer"
                                  className="control-label"
                                >
                                  Issue By:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  disabled
                                  value={this.state.issuedBy}
                                />
                              </div>
                            </div>
                            <div className="col-sm-3">
                              <div className="form-group">
                                <label
                                  htmlFor="manufacturer"
                                  className="control-label"
                                >
                                  No. of Barcode:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  disabled
                                  value={this.state.NoOfBarcode}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12">
                    <div className="box">
                      <div className="box-header">
                        <h3 className="box-title">List Of Barcodes</h3>
                      </div>
                      <div className="box-body">
                        <div className="col-sm-12">
                          <BootstrapTable
                            data={bars}
                            hover
                            pagination
                            search
                            exportCSV={true}
                            tableHeaderClass="my-header-class"
                            columnWidth="100%"
                            deleteRow={true}
                            selectRow={selectRowProp}
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
                                value: bars.length
                              }
                            ]}
                          >
                            <TableHeaderColumn
                              dataField="action"
                              dataSort={true}
                              export={false}
                              isKey={true}
                              hidden
                              width="20%"
                            >
                              Action
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              dataField="status"
                              dataFormat={status}
                              width="20%"
                            >
                              Status
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField="jeannie" width="10%">
                              Jeannie Status
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField="barcode" width="15%">
                              Barcode
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              dataField="cond_name"
                              csvFieldType="string"
                              width="20%"
                            >
                              Condition
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              dataField="cost"
                              csvFieldType="string"
                              columnClassName="DateColor"
                              width="10%"
                              dataAlign="right"
                            >
                              Cost
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              dataField="created_at"
                              columnClassName="changeWidth"
                            >
                              Issued Date
                            </TableHeaderColumn>
                          </BootstrapTable>
                        </div>
                      </div>
                    </div>
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
          {/* #END# Modal View */}

          {/* List to Gini Modal View */}
          <button
            type="button"
            className="btn btn-info btn-lg"
            id="open_barcode_listToGini_modal"
            hidden
            style={{ display: "none" }}
            data-toggle="modal"
            data-target="#ListToGiniModal"
          />

          <div id="ListToGiniModal" className="modal fade in" role="dialog">
            <div className="modal-dialog " style={{ width: "80%" }}>
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                  <h4 className="modal-title" />
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-xs-12">
                      <div className="box">
                        <div className="box-header">
                          <h3 className="box-title">Product Details</h3>
                        </div>
                        <div className="box-body">
                          <div className="col-sm-12">
                            <div className="col-sm-3">
                              <div className="form-group">
                                <label htmlFor="upc" className="control-label">
                                  UPC:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  disabled
                                  value={this.state.upc}
                                />
                              </div>
                            </div>
                            <div className="col-sm-3">
                              <div className="form-group">
                                <label htmlFor="mpn" className="control-label">
                                  MPN:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  disabled
                                  value={this.state.mpn}
                                />
                              </div>
                            </div>
                            <div className="col-sm-3">
                              <div className="form-group">
                                <label
                                  htmlFor="description"
                                  className="control-label"
                                >
                                  Description:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  disabled
                                  value={this.state.mpn_description}
                                />
                              </div>
                            </div>
                            <div className="col-sm-3">
                              <div className="form-group">
                                <label
                                  htmlFor="manufacturer"
                                  className="control-label"
                                >
                                  Manufacturer:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  disabled
                                  value={this.state.manufacturer}
                                />
                              </div>
                            </div>
                            <div className="col-sm-3">
                              <div className="form-group">
                                <label
                                  htmlFor="manufacturer"
                                  className="control-label"
                                >
                                  Merchant Name:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  disabled
                                  value={this.state.merchantName}
                                />
                              </div>
                            </div>
                            <div className="col-sm-3">
                              <div className="form-group">
                                <label
                                  htmlFor="manufacturer"
                                  className="control-label"
                                >
                                  Issue Date:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  disabled
                                  value={this.state.issuedDate}
                                />
                              </div>
                            </div>
                            <div className="col-sm-3">
                              <div className="form-group">
                                <label
                                  htmlFor="manufacturer"
                                  className="control-label"
                                >
                                  Issue By:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  disabled
                                  value={this.state.issuedBy}
                                />
                              </div>
                            </div>
                            <div className="col-sm-3">
                              <div className="form-group">
                                <label
                                  htmlFor="manufacturer"
                                  className="control-label"
                                >
                                  No. of Barcode:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  disabled
                                  value={this.state.NoOfBarcode}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12">
                      <div className="box">
                        <div className="box-header">
                          <h3 className="box-title">List Of Barcodes</h3>
                        </div>
                        <div className="box-body">
                          <div className="col-sm-12">
                            <BootstrapTable
                              data={bars}
                              hover
                              pagination
                              search
                              exportCSV={true}
                              tableHeaderClass="my-header-class"
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
                                  value: bars.length
                                }
                              ]}
                            >
                              <TableHeaderColumn
                                dataField="action"
                                dataSort={true}
                                export={false}
                                isKey={true}
                                hidden
                                width="20%"
                              >
                                Action
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="status"
                                dataFormat={status}
                                width="20%"
                              >
                                Status
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="jeannie"
                                width="10%"
                              >
                                Jeannie Status
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="barcode"
                                width="15%"
                              >
                                Barcode
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="cond_name"
                                csvFieldType="string"
                                width="20%"
                              >
                                Condition
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="cost"
                                csvFieldType="string"
                                columnClassName="DateColor"
                                width="10%"
                                dataAlign="right"
                              >
                                Cost
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="created_at"
                                columnClassName="changeWidth"
                                width="10%"
                              >
                                Issued Date
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="ListToJeannie"
                                columnClassName="changeWidth"
                                dataFormat={listFunction}
                              >
                                jeannie Status
                              </TableHeaderColumn>
                            </BootstrapTable>
                          </div>
                        </div>
                      </div>
                    </div>
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
          {/* #END# Modal View */}

          {/* Editable Modal */}
          <button
            type="button"
            className="btn btn-info btn-lg"
            id="open_barcode_edit_modal"
            hidden
            style={{ display: "none" }}
            data-toggle="modal"
            data-target="#editModal"
          />

          <div id="editModal" className="modal fade in" role="dialog">
            <div className="modal-dialog " style={{ width: "80%" }}>
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                  <h4 className="modal-title" />
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-xs-12">
                      <div className="box">
                        <div className="box-header">
                          <h3 className="box-title">Product Details</h3>
                        </div>
                        <div className="box-body">
                          <div className="col-sm-12">
                            <div className="col-sm-3">
                              <div className="form-group">
                                <label htmlFor="upc" className="control-label">
                                  UPC:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  disabled
                                  value={this.state.upc}
                                />
                              </div>
                            </div>
                            <div className="col-sm-3">
                              <div className="form-group">
                                <label htmlFor="mpn" className="control-label">
                                  MPN:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  disabled
                                  value={this.state.mpn}
                                />
                              </div>
                            </div>
                            <div className="col-sm-3">
                              <div className="form-group">
                                <label
                                  htmlFor="description"
                                  className="control-label"
                                >
                                  Description:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  disabled
                                  value={this.state.mpn_description}
                                />
                              </div>
                            </div>
                            <div className="col-sm-3">
                              <div className="form-group">
                                <label
                                  htmlFor="manufacturer"
                                  className="control-label"
                                >
                                  Manufacturer:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  disabled
                                  value={this.state.manufacturer}
                                />
                              </div>
                            </div>
                            <div className="col-sm-3">
                              <div className="form-group">
                                <label
                                  htmlFor="manufacturer"
                                  className="control-label"
                                >
                                  Merchant Name:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  disabled
                                  value={this.state.merchantName}
                                />
                              </div>
                            </div>
                            <div className="col-sm-3">
                              <div className="form-group">
                                <label
                                  htmlFor="manufacturer"
                                  className="control-label"
                                >
                                  Issue Date:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  disabled
                                  value={this.state.issuedDate}
                                />
                              </div>
                            </div>
                            <div className="col-sm-3">
                              <div className="form-group">
                                <label
                                  htmlFor="manufacturer"
                                  className="control-label"
                                >
                                  Issue By:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  disabled
                                  value={this.state.issuedBy}
                                />
                              </div>
                            </div>
                            <div className="col-sm-3">
                              <div className="form-group">
                                <label
                                  htmlFor="manufacturer"
                                  className="control-label"
                                >
                                  No. of Barcode:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  disabled
                                  value={this.state.NoOfBarcode}
                                />
                              </div>
                            </div>
                            <div className="col-sm-12">
                              <div className="form-group">
                                <form onSubmit={this.handleAccountSubmit}>
                                  <div className="col-sm-4">
                                    <label
                                      htmlFor="accounts"
                                      className="control-label"
                                    >
                                      Change Account of All Barcodes:
                                    </label>
                                    <select
                                      className="form-control"
                                      name="accountList"
                                      id="accountList"
                                      onChange={this.handleChange}
                                    >
                                      {accounts2}
                                    </select>
                                  </div>
                                  <div
                                    style={{ marginTop: "25px" }}
                                    className="col-sm-2"
                                  >
                                    <input
                                      type="submit"
                                      className="btn btn-warning"
                                      value="Update"
                                    />
                                  </div>
                                </form>
                              </div>
                              <div
                                className="form-group"
                                style={{ marginTop: "-25px" }}
                              >
                                <form onSubmit={this.handleCostSubmit}>
                                  <div className="col-sm-4">
                                    <label
                                      htmlFor="accounts"
                                      className="control-label"
                                    >
                                      Change Cost of All Barcodes:
                                    </label>
                                    <input
                                      className="form-control"
                                      type="number"
                                      name="costList"
                                      id="costList"
                                      onChange={this.handleChange}
                                      value={this.state.costList}
                                    />
                                  </div>
                                  <div
                                    style={{ marginTop: "25px" }}
                                    className="col-sm-2"
                                  >
                                    <input
                                      type="submit"
                                      className="btn btn-warning"
                                      value="Update"
                                    />
                                  </div>
                                </form>
                              </div>
                            </div>
                            <div
                              className="col-sm-12"
                              style={{ marginBottom: "5px" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12">
                      <div className="box">
                        <div className="box-header">
                          <h3 className="box-title">List Of Barcodes</h3>
                        </div>
                        <div className="box-body">
                          <div className="col-sm-12">
                            <BootstrapTable
                              data={bars}
                              hover
                              pagination
                              search
                              exportCSV={true}
                              tableHeaderClass="my-header-class"
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
                                  value: bars.length
                                }
                              ]}
                            >
                              <TableHeaderColumn
                                dataField="action"
                                dataSort={true}
                                export={false}
                                isKey={true}
                                dataFormat={printBarcode}
                                width="10%"
                              >
                                Action
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="status"
                                dataFormat={status}
                                width="10%"
                              >
                                Status
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="jeannie"
                                width="10%"
                              >
                                Jeannie Status
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="barcode"
                                width="10%"
                              >
                                Barcode
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="cond_name"
                                csvFieldType="string"
                                width="10%"
                              >
                                Condition
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="cost"
                                csvFieldType="string"
                                columnClassName="DateColor"
                                width="20%"
                                dataFormat={editCost}
                              >
                                Cost
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="accountName"
                                csvFieldType="string"
                                width="15%"
                                dataFormat={editAccount}
                              >
                                Account Name
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="created_at"
                                columnClassName="changeWidth"
                                width="20%"
                              >
                                Issued Date
                              </TableHeaderColumn>
                            </BootstrapTable>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <form
                    action={
                      baseUrl +
                      "/laptopzone/reactcontroller/c_product/printAllBarcode"
                    }
                    method="post"
                    target="_blank"
                    acceptCharset="utf-8"
                  >
                    <input
                      type="hidden"
                      id="barcode_mt_id"
                      name="barcode_mt_id"
                      value={this.state.lz_merchant_barcode_mt}
                    />

                    <button type="submit" className="btn btn-success pull-left">
                      <span
                        className="glyphicon glyphicon-print"
                        aria-hidden="true"
                      />
                      &nbsp; Print All
                    </button>
                  </form>
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
          {/* #END# Editable Modal */}
        </React.Fragment>
      );
    }
  }
}

export default GenerateBars;
