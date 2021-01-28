import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import $ from "jquery";
import "gasparesganga-jquery-loading-overlay";
// import swal from "sweetalert";
import notify from "../Functions/notify";
import { RViewer, RViewerTrigger } from "react-viewerjs";
import Switch from "@material-ui/core/Switch";
import "../CSS_Files/app.css";
import firebase from "../../components/firebaseConfig/Firebase.js";
import { ToastsContainer, ToastsStore } from "react-toasts";

class SearchItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lz_products: [],
      condition: [],
      merchant: [],
      images: [],
      baseUrl: "",
      product_id: "",
      source: "",
      noImage: "",
      thumbnails: [],
      pro_id: "",
      cond_id: "",
      quantity: "",
      cost: "",
      seller_sku: "",
      vendor_sku: "",
      accounts: [],
      account_id: "",
      printYN: true,
      lz_items_mt_id: "",
      redirectToReferrer: false,
      selectBinNo: "0",
      bins: []
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  resetForm = () => {
    this.setState({
      cost: "",
      qty: "",
      product_id: "",
      sku: ""
    });
    var div = $(".conditionHideShow");
    var p = div.find("p");
    p.hide();
    $("#conditions").val(0);
    $("#merchant").val(0);
  };
  componentWillMount() {
    if (localStorage.getItem("userName")) {
    } else {
      this.setState({
        redirectToReferrer: true
      });
    }
    this.setState({
      lz_products: this.props.products,
      condition: this.props.condition,
      merchant: this.props.merchants,
      images: this.props.images,
      baseUrl: this.props.baseUrl
    });
  }
  componentDidMount() {
    this.getBins();
  }
  showDescription = () => {
    var condition = $("#conditions").val();
    var div = $(".conditionHideShow");
    var p = div.find("p");
    p.hide();
    $("#" + condition).show();
  };

  addproduct = () => {
    const {
      baseUrl,
      cond_id,
      quantity,
      cost,
      seller_sku,
      vendor_sku,
      selectBinNo
    } = this.state;

    let product_id = $("#pro_id").val();

    let accountId = $("#account").val();
    let merch_id = localStorage.getItem("merId");
    let userId = localStorage.getItem("userId");
    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_product/add_invventory";
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          cost: cost,
          qty: quantity,
          accountId: accountId,
          condition: cond_id,
          product_id: product_id,
          merchant: merch_id,
          seller_sku: seller_sku,
          vendor_sku: vendor_sku,
          userId: userId,
          previousSelected: "",
          BinNo: selectBinNo
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

  saveInventory = () => {
    const { baseUrl, cond_id } = this.state;
    let merch_id = localStorage.getItem("merId");
    if (cond_id == 0) {
      // swal("Error", "Condition is empty!", "error");
      notify("error", "Condition is empty!");
      return false;
    }
    $.LoadingOverlay("show");
    this.addproduct()
      .then(result => {
        $.LoadingOverlay("hide");
        if (result.insert) {
          this.resetForm();
          $("#dismissModal").click();
          if (result.MT_ID) {
            this.setState({
              seller_sku: "",
              vendor_sku: "",
              quantity: "",
              cost: "",
              selectBinNo: "0"
            });
            $("#setCondition").click();
            let Barcodes = result.MT_ID;
            var allBarcodes = result.allBarcodes;

            allBarcodes.map(item => {
              firebase
                .firestore()
                .collection("Barcodes")
                .doc(item.BARCODE_NO)
                .set({
                  RANGE_ID: item.RANGE_ID,
                  MERCHANT_ID: item.MERCHANT_ID
                })
                .then(function() {
                  console.log("Document successfully written!");
                })
                .catch(function(error) {
                  console.error("Error writing document: ", error);
                });
            });

            var sticker_url =
              baseUrl +
              "/laptopzone/reactcontroller/c_product/printAllStickers/" +
              Barcodes;
            if (this.state.printYN) {
              window.open(sticker_url, "_blank");
            }
          }
          $("#message").show();
          notify("success", result.message);
          // swal("Inventory", result.message, "success");
        } else {
          notify("error", result.message);
          // swal("Error", result.message, "error");
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        notify("error", err.message);
        // swal("Error", err.message, "error");
      });
  };
  addNewProduct = (seed_id, upc, mpn, description) => {
    $.LoadingOverlay("show");
    this.addSeedProduct(seed_id, upc, mpn, description)
      .then(result => {
        $.LoadingOverlay("hide");
        if (result.insert) {
          $("#pro_id").val(result.lz_product_id);
          console.log("success: " + result.message);
          // console.log(result.message);
        } else {
          console.log("error: " + result.message);
          // console.log(result.message);
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        // console.log("Error", err, "error");
      });
  };
  addSeedProduct = (seed_id, upc, mpn, description) => {
    const { baseUrl } = this.state;
    let userId = localStorage.getItem("userId");
    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_product/addSeedProduct";
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          seed_id: seed_id,
          userId: userId,
          upc: upc,
          mpn: mpn,
          description: description
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
  checInventory = (product_id, upc, mpn, status, description) => {
    const { baseUrl } = this.state;
    let merch_id = localStorage.getItem("merId");
    let userId = localStorage.getItem("userId");
    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_product/checkInventory";
    $.LoadingOverlay("show");
    var DBCall = new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          merch_id: merch_id,
          userId: userId,
          product_id: product_id,
          upc: upc,
          mpn: mpn
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
          lz_items_mt_id: result.records[0].LZ_ITEMS_MT_ID
        });
        notify("success", result.message);
        var pid = result.lz_product_id;
        $("#pro_id").val(pid);
        this.add(pid, status, upc, mpn, description);
        this.setCondition(result.records[0].ID, result.records[0].COND_COLOR);
      } else {
        //notify("error", result.message);
        this.add(product_id, status, upc, mpn, description);
      }
    }).catch(err => {
      $.LoadingOverlay("hide");
      console.log(err);
    });
    $.LoadingOverlay("hide");
  };
  add = (id, status, upc, mpn, description) => {
    var productID = id;
    $(this.state.previousSelected).css({
      border: "none"
    });
    if (status == "php_seed" || id == "") {
      this.addNewProduct(id, upc, mpn, description);
    }
    if (status == "react_product") {
      $("#pro_id").val(id);
      if (id) {
        // notify("success", "Item Added");
        console.log("success: Item Added");
      }
    }
    $(".productList").hide();
    $("#back").fadeOut(1000, function() {
      $(this).fadeIn(1000, function() {
        $("#back").show();
      });
    });

    $("#alertMessage").show();
    setInterval(function() {
      $("#alertMessage").hide();
    }, 4000);

    $("#productInvView").hide();
    this.setState({
      product_id: productID,
      source: this.state.images[productID][0],
      noImage: this.state.images[productID][1],
      thumbnails: this.state.images[productID]
    });
  };
  back = () => {
    $("#back").hide();
    $(".productList").fadeIn(1000, function() {
      $(".productList").show();
    });
  };
  setCondition = (conditionId, color) => {
    $(this.state.previousSelected).css({
      border: "none"
    });
    var condition = "#setCondition" + conditionId;
    this.setState({
      previousSelected: condition
    });
    $("#setCondition" + conditionId).css({
      border: "10px solid red"
    });

    $.LoadingOverlay("show");
    this.getCondition(conditionId)
      .then(result => {
        $.LoadingOverlay("hide");
        if (result.conditionOfProduct[0]) {
          let oldCondition = result.conditionOfProduct[0]["CONDITION_ID"];
          this.setState({
            cond_id: oldCondition,
            accounts: result.accounts
          });
          let seller = result.sku[0]["SELLER_SKU"];
          let vendor = result.sku[0]["VENDOR_SKU"];
          this.setState({
            seller_sku: seller,
            vendor_sku: vendor
          });
          $("#message").show();
        } else {
          this.setState({ cond_id: conditionId, accounts: result.accounts });
          $("#message").hide();
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log("Error", err, "error");
      });

    $("#tableHead").css({ "background-color": color });
    $("#addProduct").css({ "background-color": color, color: "black" });
    $("#productInvView").show();

    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $("#productInvView").offset().top
      },
      1000
    );
    $("#productInvView").fadeOut(200, function() {
      $(this).fadeIn(200);
    });
  };
  getCondition = condition => {
    const { baseUrl } = this.state;
    let merch_id = localStorage.getItem("merId");
    let productId = $("#pro_id").val();
    let userId = localStorage.getItem("userId");
    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_product/getCondition";
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          productId: productId,
          condition: condition,
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
  changeImage = imgSrc => {
    $("#viewPort").fadeOut(200, function() {
      $(this)
        .attr("src", imgSrc)
        .fadeIn(200);
    });
  };
  handleSwitch = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  checkLink = () => {
    localStorage.setItem("lz_items_mt_id", this.state.lz_items_mt_id);
  };

  getBins = () => {
    const { baseUrl } = this.state;
    let insertUrl = baseUrl + "/laptopzone/reactcontroller/c_product/getBins";
    var dbCall = new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "GET"
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
        if (result.found) {
          this.setState({ bins: result.bins });
        } else {
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const {
      lz_products,
      condition,
      merchant,
      images,
      product_id,
      source,
      noImage,
      accounts,
      thumbnails
    } = this.state;

    let options = {
      toolbar: {
        prev: true,
        next: true
      },

      navbar: {
        default: true
      }
    };
    var merchantAccounts = accounts.map(function(item, index) {
      return (
        <option key={index} value={item.ACCT_ID}>
          {item.ACCOUNT_NAME}
        </option>
      );
    });
    var selectBin = this.state.bins.map(function(item, index) {
      return (
        <option key={index} value={item.BIN_ID}>
          {item.BIN_NO}
        </option>
      );
    });
    var merch_id = localStorage.getItem("merId");
    return (
      <React.Fragment>
        <ToastsContainer store={ToastsStore} />
        <input
          type="number"
          id="pro_id"
          name="pro_id"
          onChange={this.handleChange}
          hidden
        />

        <table className="table table-bordered table-hover productList">
          <thead>
            <tr>
              <th>Sr no.</th>
              <th>Thumb</th>
              <th>UPC</th>
              <th>MPN</th>
              <th>Description</th>
              <th>Manufacturer</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {lz_products.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div
                    style={{
                      width: "180px",
                      height: "190px",
                      float: "left",
                      overflow: " hidden",
                      position: "relative"
                    }}
                  >
                    <RViewer
                      index={item.LZ_PRODUCT_ID}
                      options={options}
                      // imageUrls={`data:image/jpeg;base64,${pic}`}
                      imageUrls={images[item.LZ_PRODUCT_ID]}
                    >
                      <RViewerTrigger>
                        <div className="col-md-12">
                          <img
                            className="getCss"
                            src={images[item.LZ_PRODUCT_ID][0]}
                            width="150px"
                            height="150px"
                          />
                          {images[item.LZ_PRODUCT_ID][1] ? (
                            <span className="btn btn-info">
                              Click to see details
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                      </RViewerTrigger>
                    </RViewer>
                  </div>
                </td>
                <td>{item.UPC}</td>
                <td>{item.MPN}</td>
                <td>{item.MPN_DESCRIPTION}</td>
                <td>{item.MANUFACTURER}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-info"
                    value={item.LZ_PRODUCT_ID}
                    onClick={() =>
                      this.checInventory(
                        item.LZ_PRODUCT_ID,
                        item.UPC,
                        item.MPN,
                        item.STATUS,
                        item.MPN_DESCRIPTION
                      )
                    }
                  >
                    Proceed
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div hidden id="back">
          <div className="col-sm-12">
            <button
              onClick={this.back}
              style={{ color: "white" }}
              className="btn btn-success btn-block"
            >
              <strong style={{ color: "white" }}>Go Back</strong>
            </button>
          </div>
          <div className="col-sm-12">
            <div className="col-sm-4">
              {/* Items Tumbnails */}
              <div key={product_id} className="imageView col-md-12">
                <RViewer
                  index={product_id}
                  options={options}
                  key={product_id}
                  // imageUrls={`data:image/jpeg;base64,${pic}`}
                  imageUrls={images[product_id]}
                >
                  <RViewerTrigger>
                    <div className="col-md-12">
                      <div className="col-md-12">
                        <img className="getCss2" id="viewPort" src={source} />
                      </div>
                    </div>
                  </RViewerTrigger>
                </RViewer>
              </div>
              <div className="col-md-12">
                {noImage
                  ? thumbnails.map(img => (
                      <img
                        src={img}
                        className="mouseHoverEffect"
                        onClick={() => this.changeImage(img)}
                      />
                    ))
                  : ""}
              </div>
              {/* END Items Thumbnails */}
            </div>

            <div className="col-sm-8">
              <div
                className="col-sm-12"
                id="alertMessage"
                hidden
                style={{ display: "none" }}
              >
                <div className="alert alert-danger alert-dismissable">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-hidden="true"
                  >
                    ×
                  </button>
                  <h4>
                    <i className="icon fa fa-info" /> Please! Select Condition
                  </h4>
                </div>
              </div>
              {condition.map((cond, index) => (
                // <div className={index % 2 == 0 ? "col-sm-12 row" : ""}>
                <div
                  className="col-md-6 conditionHover "
                  style={{ cursor: "pointer" }}
                  key={cond.ID}
                  onClick={() => {
                    this.setCondition(cond.ID, cond.COND_COLOR);
                  }}
                >
                  <div className="box box-solid">
                    <div
                      className="btn box-header with-border .setCondition"
                      id={"setCondition" + cond.ID}
                      style={{ backgroundColor: cond.COND_COLOR }}
                    >
                      <h3 className="box-title btn btn-info headerColor">
                        <strong>{cond.COND_NAME}</strong>
                      </h3>
                    </div>
                    <div className="box-body">{cond.COND_DESCRIPTION}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Add Product */}
          <div className="col-sm-12" id="productInvView" hidden>
            <div className="col-md-12">
              <div class="alert alert-default" id="message">
                <strong>
                  <i
                    class="glyphicon glyphicon-alert"
                    style={{ paddingRight: "5px" }}
                  />
                </strong>
                This product is already listed in your inventory. Consider
                editing an existing listing rather than creating a new listing.
                To review or edit your current listing for this product,{" "}
                <Link
                  to="/manageInventory"
                  onClick={this.checkLink}
                  style={{ color: "blue" }}
                >
                  Click Here
                </Link>
                .
              </div>
              <div>
                <label>Print Yes/No</label>
                <Switch
                  checked={this.state.printYN}
                  onChange={this.handleSwitch("printYN")}
                  value="1"
                  color="primary"
                />
              </div>
              <table className="table table-bordered table-striped table-hover ">
                <thead id="tableHead">
                  <tr>
                    <th>
                      <b>Quantity</b>
                    </th>
                    <th>
                      <b>Cost</b>
                    </th>
                    <th>
                      <b>Seller SKU</b>
                    </th>
                    <th>
                      <b>Vendor SKU</b>
                    </th>
                    <th>Accounts</th>
                    {merch_id == 1 ? <th>Select_Bin_Number</th> : ""}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <input
                            type="number"
                            className="form-control"
                            id="quantity"
                            name="quantity"
                            placeholder="Quantity"
                            value={this.state.quantity}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <input
                            type="number"
                            className="form-control"
                            id="cost"
                            name="cost"
                            value={this.state.cost}
                            placeholder="Cost"
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            id="seller_sku"
                            name="seller_sku"
                            value={this.state.seller_sku}
                            placeholder="Seller SKU"
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            id="vendor_sku"
                            name="vendor_sku"
                            value={this.state.vendor_sku}
                            placeholder="Vendor SKU"
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <select
                        className="form-control selectpicker "
                        id="account"
                        name="account"
                      >
                        {merchantAccounts}
                      </select>
                    </td>
                    {merch_id == 1 ? (
                      <td>
                        <div className="col-sm-12">
                          <div className="form-group">
                            <select
                              className="form-control selectpicker "
                              id="selectBinNo"
                              name="selectBinNo"
                              onChange={this.handleChange}
                            >
                              <option value="0">Select Bin</option>
                              {selectBin}
                            </select>
                          </div>
                        </div>
                      </td>
                    ) : (
                      ""
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-12">
              <button
                id="addProduct"
                className="btn btn-primary btn-lg btn-block"
                style={{ marginTop: "30px" }}
                onClick={this.saveInventory}
              >
                <strong style={{ color: "white" }}>Add Product</strong>
              </button>
            </div>
          </div>
          {/* #END# Add Product */}
        </div>
      </React.Fragment>
    );
  }
}

export default SearchItemList;
