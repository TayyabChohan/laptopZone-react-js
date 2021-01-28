import React, { Component } from "react";
import toaster from "toasted-notes";
import { Link, Redirect } from "react-router-dom";
import $ from "jquery";
import Swal from "sweetalert2";
import CancelOrders from "../../ModulesByTahir/PostSales/cancelOrders";
import "../customFiles/customCSS.css";
class CreateCancellation extends Component {
  constructor(props) {
    super(props);
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    this.state = {
      baseUrl: finalurl,
      searchResult: [],
      searchOrder: "",
      order_id: "",
      cancelOptions: [],
      legecyId: "",
      item_title: "",
      account_id: "",
      account_id_select: "",
      remarks: "",
      releaseRemarks: "",
      extended_order_id: "",
      sale_order_number: "",
      merchantAccounts: [],
      isLoaded: false,
      barcode_status: "",
      isOpenModel: false,
      requestType: "",
      bin_id: "",
      search_order_id: "",
      search_extended_order_id: "",
      search_sale_order: "",
      daysCheck: "",
      other_by: "",
      ebay_id: "",
      equalLike: "EQUAL",
      barcodes: [],
      cancelled_barcodes: [],
      cancelBarcodeResult: [],
      pulling_id: "",
      cnt: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleChange4 = this.handleChange4.bind(this);
    this.handleChange5 = this.handleChange5.bind(this);
    this.daysCheckHandle = this.daysCheckHandle.bind(this);
    this.equalLike = this.equalLike.bind(this);
    this.radioFunction = this.radioFunction.bind(this);
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value, isLoaded: false });
  };
  radioFunction = e => {
    this.setState({ [e.target.name]: e.target.value, isLoaded: false });
    if (this.state.barcode_status == "release") {
      $("#checkEligibility").html("Discard Barcode");
    } else {
      $("#checkEligibility").html("Release Barcode");
    }
  };
  equalLike = e => {
    this.setState({ [e.target.name]: e.target.value, isLoaded: false });
  };
  handleChange1 = e => {
    this.setState({ [e.target.name]: e.target.value, isLoaded: false });
    if (this.state.search_type == "on") {
      this.setState({
        search_type: "",
        equalLike: "EQUAL"
      });
      $("#allSearch").removeClass("hide");
      $("#allOther").addClass("hide");
      $("#equalLike1").prop("checked", true);
      $("#equalLike").prop("checked", false);
    } else {
      this.setState({
        equalLike: "LIKE"
      });

      $("#equalLike").prop("checked", true);
      $("#equalLike1").prop("checked", false);
      $("#allSearch").addClass("hide");
      $("#allOther").removeClass("hide");
      $("#other_by").val("");
    }
    this.setState({
      search_extended_order_id: "",
      search_order_id: "",
      ebay_id: "",
      search_sale_order: ""
    });
    $("#search_extended_order_id").prop("checked", false);
    $("#search_order_id").prop("checked", false);
    $("#search_sale_order").prop("checked", false);
    $("#ebay_id").prop("checked", false);
  };
  handleChange2 = e => {
    this.setState({ [e.target.name]: e.target.value, isLoaded: false });
    if (this.state.search_sale_order == "on") {
      this.setState({
        search_sale_order: ""
      });
    }
    this.setState({
      search_type: "",
      other_by: "",
      search_extended_order_id: "",
      ebay_id: "",
      search_order_id: ""
    });
    $("#search_type").prop("checked", false);
    $("#search_extended_order_id").prop("checked", false);
    $("#search_order_id").prop("checked", false);
    $("#ebay_id").prop("checked", false);
  };
  handleChange3 = e => {
    this.setState({ [e.target.name]: e.target.value, isLoaded: false });
    if (this.state.search_order_id == "on") {
      this.setState({
        search_order_id: ""
      });
    }
    this.setState({
      search_type: "",
      other_by: "",
      search_extended_order_id: "",
      ebay_id: "",
      search_sale_order: ""
    });
    $("#search_type").prop("checked", false);
    $("#search_extended_order_id").prop("checked", false);
    $("#search_sale_order").prop("checked", false);
    $("#ebay_id").prop("checked", false);
  };
  handleChange4 = e => {
    this.setState({ [e.target.name]: e.target.value, isLoaded: false });
    if (this.state.search_extended_order_id == "on") {
      this.setState({
        search_extended_order_id: ""
      });
    }
    this.setState({
      search_type: "",
      other_by: "",
      search_order_id: "",
      ebay_id: "",
      search_sale_order: ""
    });
    $("#search_type").prop("checked", false);
    $("#search_sale_order").prop("checked", false);
    $("#search_order_id").prop("checked", false);
    $("#ebay_id").prop("checked", false);
  };
  handleChange5 = e => {
    this.setState({ [e.target.name]: e.target.value, isLoaded: false });
    if (this.state.ebay_id == "on") {
      this.setState({
        ebay_id: ""
      });
    }
    this.setState({
      search_type: "",
      other_by: "",
      search_order_id: "",
      search_extended_order_id: "",
      search_sale_order: ""
    });
    $("#search_type").prop("checked", false);
    $("#search_sale_order").prop("checked", false);
    $("#search_order_id").prop("checked", false);
    $("#search_extended_order_id").prop("checked", false);
  };
  daysCheckHandle = e => {
    this.setState({ [e.target.name]: e.target.value, isLoaded: false });
    if (this.state.daysCheck == "on") {
      this.setState({
        daysCheck: ""
      });
      $("#daysCheck").prop("checked", false);
    }
  };

  handleOrderSearch = e => {
    e.preventDefault();
    this.setState({
      isLoaded: false
    });
    const {
      equalLike,
      search_type,
      other_by,
      search_extended_order_id,
      search_order_id,
      search_sale_order,
      searchOrder,
      daysCheck,
      ebay_id
    } = this.state;
    var checked = $("input[type=checkbox]:checked").length;
    if (equalLike == "") {
      Swal.fire({
        position: "center",
        type: "warning",
        title: "Check Equal Or Like To Search!",
        showConfirmButton: false,
        timer: 3500
      });
      return false;
    }
    if (search_type == "on") {
      if (other_by == "") {
        Swal.fire({
          position: "center",
          type: "warning",
          title: "Please Select One Option",
          showConfirmButton: false,
          timer: 1500
        });
        return false;
      }
    }
    if (!checked) {
      Swal.fire({
        position: "center",
        type: "warning",
        title: "You must check at least one checkbox.",
        showConfirmButton: false,
        timer: 1500
      });
      return false;
    }

    if (searchOrder == "") {
      Swal.fire({
        position: "center",
        type: "warning",
        title: "Input Required!",
        showConfirmButton: false,
        timer: 1500
      });

      return false;
    }
    $.LoadingOverlay("show");
    var loadjs = require("loadjs");
    loadjs(["./assets/adilCustom/customJs/newDestoryData.js"], function() {});
    let insertUrl =
      this.state.baseUrl +
      "/laptopzone/adilController/c_searchOrder/get_search_order_record";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        data: {
          searchOrder: searchOrder,
          search_type: search_type,
          other_by: other_by,
          search_extended_order_id: search_extended_order_id,
          search_order_id: search_order_id,
          search_sale_order: search_sale_order,
          daysCheck: daysCheck,
          ebay_id: ebay_id,
          equalLike: equalLike
        },
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
        console.log(result.searchOrderResult);
        if (result.found) {
          loadjs(
            ["./assets/adilCustom/customJs/customDataTable.js"],
            function() {}
          );
          this.setState({
            searchResult: result.searchOrderResult
          });

          $("#showResult").removeClass("hide");
        } else {
          this.setState({
            searchResult: []
          });
          $("#showResult").addClass("hide");
          Swal.fire({
            position: "center",
            type: "info",
            title: result.message,
            showConfirmButton: true
          });
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };
  handleDownloadOrder = e => {
    $("#showResult").addClass("hide");
    this.setState({
      searchResult: []
    });
    e.preventDefault();
    if (this.state.account_id_select) {
      if (this.state.isLoaded) {
        this.setState({
          isLoaded: false
        });
      } else {
        this.setState({
          isLoaded: true
        });
      }
    } else {
      Swal.fire({
        position: "center",
        type: "warning",
        title: "Please select account!",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };
  showModel = (
    order_id,
    account_id,
    item_title,
    extended_order_id,
    sale_order_number
  ) => {
    $("#releaseRemarks").val("");
    $("#bin_id").val("");
    $("input:radio").prop("checked", false);
    $("#checkEligibility").html("Check Release Or Discard");
    $("#requestBarcode input[name=barcode_no]").val("");
    $("#showDisRelease .barcode_span  input[type=checkbox]").prop(
      "checked",
      false
    );
    this.setState({
      order_id: order_id,
      account_id: account_id,
      cancelOptions: [],
      item_title: item_title,
      legecyId: "",
      barcode_status: "",
      releaseRemarks: "",
      extended_order_id: extended_order_id,
      sale_order_number: sale_order_number
    });
    $("#showDisRelease").addClass("hide");
    $("#showReason").addClass("hide");
    $(".checkEligibility").addClass("hide");
    $(".requestCancel").addClass("hide");
    this.checkEligibility(order_id, account_id);
  };
  showBarcodeModel = (
    order_id,
    item_title,
    extended_order_id,
    sale_order_number
  ) => {
    this.setState({
      order_id: order_id,
      item_title: item_title,
      extended_order_id: extended_order_id,
      sale_order_number: sale_order_number
    });
    $.LoadingOverlay("show");
    let insertUrl =
      this.state.baseUrl +
      "/laptopzone/adilController/c_searchOrder/get_cancelled_barcode";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        data: { order_id: order_id },
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
          this.setState({
            cancelled_barcodes: result.barcodes
          });
          $("#showReleaseBarcode").removeClass("hide");
        } else {
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };
  requestCancellation = e => {
    e.preventDefault();
    this.updateCheckedUserIds();
    const { baseUrl } = this.state;
    var barcode_status = this.state.barcode_status;
    var remarks = this.state.remarks;
    var releaseRemarks = this.state.releaseRemarks;
    var requestType = this.state.requestType;
    var legecyId = this.state.legecyId;
    var bin_id = this.state.bin_id;
    var userId = localStorage.getItem("userId");
    var barcode_no = $("#requestBarcode input[name=barcode_no]").val();
    if (this.state.requestType == "CANCEL") {
      if (remarks == "") {
        Swal.fire({
          position: "center",
          type: "warning",
          title: "Please Select Reason!",
          showConfirmButton: false,
          timer: 3500
        });
        return false;
      }
    } else {
      if (barcode_status == "") {
        Swal.fire({
          position: "center",
          type: "warning",
          title: "Check Release or Discard Button",
          showConfirmButton: false,
          timer: 3500
        });
        return false;
      }
      if (barcode_no == "") {
        Swal.fire({
          position: "center",
          type: "warning",
          title: "Check Barcode Numbers",
          showConfirmButton: false,
          timer: 3500
        });
        return false;
      }
    }
    $.LoadingOverlay("show");
    $("#myModal .close").click();
    var account_id = this.state.account_id;
    let insertUrl =
      this.state.baseUrl +
      "/laptopzone/adilController/c_searchOrder/cancellation_request";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        data: {
          legecyId: legecyId,
          remarks: remarks,
          account_id: account_id,
          userId: userId,
          barcode_status: barcode_status,
          releaseRemarks: releaseRemarks,
          requestType: requestType,
          bin_id: bin_id,
          barcode_no: barcode_no
        },
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
          Swal.fire({
            position: "center",
            type: "success",
            title: result.message,
            showConfirmButton: true
          });
          $("#myform")[0].reset();
          this.setState({
            equalLike: ""
          });

          if (barcode_status === "release") {
            var sticker_url =
              baseUrl +
              "/laptopzone/adilController/c_searchOrder/printBarcode/" +
              legecyId;
            window.open(sticker_url, "_blank");
          }
          // http://localhost/laptopzone/adilController/c_searchOrder/printBarcode/262602760500-1876318182016
        } else {
          Swal.fire({
            position: "center",
            type: "warning",
            title: result.message,
            showConfirmButton: true
          });
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };
  print_barcode = order_id => {
    const { baseUrl } = this.state;
    var sticker_url =
      baseUrl +
      "/laptopzone/adilController/c_searchOrder/printBarcode/" +
      order_id;
    window.open(sticker_url, "_blank");
  };
  checkEligibility = (order_id, account_id) => {
    this.setState({
      isOpenModel: true
    });
    var order_id = order_id;
    var account_id = account_id;
    $.LoadingOverlay("show");
    let insertUrl =
      this.state.baseUrl +
      "/laptopzone/adilController/c_searchOrder/check_eligibility";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        data: {
          order_id: order_id,
          account_id: account_id
        },
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
        console.log(result.barcodes);
        $.LoadingOverlay("hide");
        if (result.found) {
          $("#showReason").removeClass("hide");
          this.setState({
            cancelOptions: result.reason,
            legecyId: result.legecyId,
            isOpenModel: true,
            requestType: "CANCEL"
          });

          $(".requestCancel").removeClass("hide");
        } else {
          if (!result.legecyId) {
            $("#showDisRelease").removeClass("hide");
            $(".checkEligibility").removeClass("hide");
            this.setState({
              legecyId: order_id,
              isOpenModel: true,
              requestType: "DISCARD_RELEASE",
              barcodes: result.barcodes
            });
            return false;
          }
          $("#showDisRelease").removeClass("hide");
          $(".checkEligibility").removeClass("hide");
          this.setState({
            legecyId: result.legecyId,
            isOpenModel: true,
            requestType: "DISCARD_RELEASE",
            barcodes: result.barcodes,
            pulling_id: result.barcodes[0][0]["PULLING_ID"],
            cnt: result.barcodes[0][0]["CNT"],
            bin_id: result.barcodes[0][0]["BIN_NAME"]
          });
          console.log(this.state.pulling_id);
          $("#showDisRelease .barcode_span input[type=checkbox]").prop(
            "checked",
            true
          );
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };
  componentWillMount() {
    this.getAccounts();
    this.getCancelRecords();
  }
  getAccounts = () => {
    $.LoadingOverlay("show");
    let insertUrl =
      this.state.baseUrl +
      "/laptopzone/reactcontroller/c_searchOrder/getMerchantAccounts";
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
          this.setState({
            merchantAccounts: result.accounts
          });
        } else {
          Swal.fire({
            position: "top-end",
            type: "danger",
            title: "No account found",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };
  getCancelRecords = () => {
    $.LoadingOverlay("show");
    var loadjs = require("loadjs");
    loadjs(["./assets/adilCustom/customJs/newDestoryData1.js"], function() {});
    let insertUrl =
      this.state.baseUrl +
      "/laptopzone/adilController/c_searchOrder/get_cancelled_barcode_records";
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
          this.setState({
            cancelBarcodeResult: result.records
          });
          loadjs(
            ["./assets/adilCustom/customJs/customDataTable1.js"],
            function() {}
          );
        } else {
          loadjs(
            ["./assets/adilCustom/customJs/customDataTable1.js"],
            function() {}
          );
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };
  // checkAllHandler = elem => {
  //   if (elem.target.checked) {
  //     $("#example tr td.chk-box input[type=checkbox]").prop("checked", true);
  //   } else {
  //     $("#example tr td.chk-box input[type=checkbox]").prop("checked", false);
  //   }
  //   this.updateCheckedUserIds();
  // };
  updateCheckedUserIds = elem => {
    var barcode_no = "";
    $.each($("#showDisRelease .barcode_span input[type=checkbox]"), function() {
      if ($(this).prop("checked")) {
        if (barcode_no) {
          barcode_no += ",";
        }
        barcode_no += $(this).val();
      }
      $("#requestBarcode input[name=barcode_no]").val(barcode_no);

      // if (barcode_no) {
      //   $("#requestBarcode button[type=submit]").removeAttr("disabled");
      // } else {
      //   $("#requestBarcode button[type=submit]").attr("disabled", "disabled");
      // }
    });
    console.log(barcode_no);
    $("#requestBarcode input[name=barcode_no]").val(barcode_no);
  };
  render() {
    return (
      <div>
        <section className="content-header">
          <h1>
            Create Cancellation <small>Control Panel</small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/welcom">
                <i className="fa fa-dashboard" /> Home
              </Link>
            </li>
          </ol>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className="box-header">
                  <div className="col-sm-12">
                    <h3 className="box-title pull-left">
                      Search Order For Cancellation
                    </h3>
                  </div>
                </div>
                <div className="box-body">
                  <form id="myform" onSubmit={this.handleOrderSearch}>
                    <div className="row">
                      <div className="col-sm-12">
                        <label>Filters:</label>
                        <br />
                        <div className="col-sm-2">
                          <label>
                            <input
                              name="search_type"
                              id="search_type"
                              onChange={this.handleChange1}
                              type="checkbox"
                            />
                            Others
                          </label>
                        </div>
                        <div className="col-sm-2">
                          <label>
                            <input
                              name="equalLike"
                              id="equalLike"
                              onChange={this.equalLike}
                              type="radio"
                              value="LIKE"
                            />
                            Like
                          </label>
                        </div>
                        <div className="col-sm-2">
                          <label>
                            <input
                              name="equalLike"
                              id="equalLike1"
                              onChange={this.equalLike}
                              type="radio"
                              value="EQUAL"
                              defaultChecked
                            />
                            Equal
                          </label>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="col-sm-2">
                          <input
                            type="text"
                            id="searchOrder"
                            onChange={this.handleChange}
                            class="form-control"
                            name="searchOrder"
                            placeholder="Search Order"
                          />
                        </div>
                        <div id="allSearch" className="">
                          <div className="col-sm-6">
                            <label className="customLabel">
                              <input
                                name="search_sale_order"
                                id="search_sale_order"
                                onChange={this.handleChange2}
                                type="checkbox"
                              />
                              Sale Order Number
                            </label>
                            <label className="customLabel">
                              <input
                                name="search_order_id"
                                id="search_order_id"
                                onChange={this.handleChange3}
                                type="checkbox"
                              />
                              Tracking Number
                            </label>
                            <label className="customLabel">
                              <input
                                name="search_extended_order_id"
                                id="search_extended_order_id"
                                onChange={this.handleChange4}
                                type="checkbox"
                              />
                              Extended Order Id
                            </label>
                            <label className="customLabel">
                              <input
                                name="ebay_id"
                                id="ebay_id"
                                onChange={this.handleChange5}
                                type="checkbox"
                              />
                              Ebay Id
                            </label>
                          </div>
                          {/* <div className="col-sm-2" />
                          <div className="col-sm-2" />
                          <div className="col-sm-2" /> */}
                        </div>
                        <div id="allOther" className="col-sm-4 hide">
                          <select
                            name="other_by"
                            id="other_by"
                            onChange={this.handleChange}
                            class="form-control"
                          >
                            <option value="">Select</option>
                            <option value="USER_ID">User ID</option>
                            <option value="BUYER_FULLNAME">Buyer Name</option>
                            <option value="BUYER_ADDRESS1">ADDRESS</option>
                            <option value="BUYER_ZIP">Zip Code</option>
                          </select>
                        </div>
                        <div className="col-sm-2">
                          <label>
                            <input
                              name="daysCheck"
                              id="daysCheck"
                              onChange={this.daysCheckHandle}
                              type="checkbox"
                            />
                            Older Than 90 Days
                          </label>
                        </div>

                        <div className="col-sm-2 ">
                          <input
                            type="submit"
                            className="btn btn-success pull-right"
                            value="Search"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className="box-header">
                  <div className="col-sm-12">
                    <h3 className="box-title pull-left">
                      Download Cancellations
                    </h3>
                  </div>
                </div>
                <div className="box-body">
                  <div className="col-sm-12">
                    <form onSubmit={this.handleDownloadOrder}>
                      <div className="col-sm-10">
                        <select
                          name="account_id_select"
                          id="account_id_select"
                          onChange={this.handleChange}
                          class="form-control"
                        >
                          <option value="">Select Account</option>
                          {this.state.merchantAccounts.map((item, key) => (
                            <option
                              key={item.LZ_SELLER_ACCT_ID}
                              value={item.LZ_SELLER_ACCT_ID}
                            >
                              {item.SELL_ACCT_DESC}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-sm-2">
                        <input
                          type="submit"
                          className="btn btn-success"
                          value="Download"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row ">
            <div className="col-md-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title pull-left">Search</h3>
                </div>
                <div className="box-body">
                  <div id="showResult" className="col-sm-12 hide">
                    <table
                      id="example"
                      class="table table-responsive table-striped table-bordered table-hover"
                    >
                      <thead>
                        <tr>
                          <th>Actions</th>
                          <th>Sale Record No</th>
                          <th>Order Id</th>
                          <th>Ebay Item Id</th>
                          <th>Group Record</th>
                          <th>Item Title</th>
                          <th>User Id</th>
                          <th>Buyer Name</th>
                          <th>Address</th>
                          <th>Zipcode</th>
                          <th>Quantity</th>
                          <th>Return Quantity</th>
                          <th>Sale Price</th>
                          <th>Total Price</th>
                          <th>Sale Date</th>
                          <th>Trackign Number</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.searchResult.map((item, key) => (
                          <tr key={key}>
                            <td>
                              <div>
                                <button
                                  data-toggle="modal"
                                  data-target="#myModal"
                                  title="Cancel"
                                  class="btn btn-danger btn-xs del_group"
                                  onClick={() =>
                                    this.showModel(
                                      item.ORDER_ID,
                                      item.LZ_SELLER_ACCT_ID,
                                      item.ITEM_TITLE,
                                      item.EXTENDEDORDERID,
                                      item.SALE_RECORD_NO
                                    )
                                  }
                                >
                                  <i
                                    class="fa fa-trash-o text text-center"
                                    aria-hidden="true"
                                  />
                                </button>
                              </div>
                            </td>
                            <td>{item.SALE_RECORD_NO}</td>
                            <td>{item.EXTENDEDORDERID}</td>
                            <td>{item.ITEM_ID}</td>
                            <td>{item.SALES_RECORD_NO_GROUP}</td>
                            <td>{item.ITEM_TITLE}</td>
                            <td>{item.USER_ID}</td>
                            <td>{item.BUYER_FULLNAME}</td>
                            <td>{item.BUYER_ADDRESS1}</td>
                            <td>{item.BUYER_ZIP}</td>
                            <td>{item.QUANTITY}</td>
                            <td>
                              <a
                                href="#"
                                data-toggle="modal"
                                data-target="#myModalBarcode"
                                onClick={() =>
                                  this.showBarcodeModel(
                                    item.ORDER_ID,
                                    item.ITEM_TITLE,
                                    item.EXTENDEDORDERID,
                                    item.SALE_RECORD_NO
                                  )
                                }
                              >
                                {item.QTY_RETURN}
                              </a>
                            </td>
                            <td>${item.SALE_PRICE}</td>
                            <td>${item.TOTAL_PRICE}</td>
                            <td>{item.SALE_DATE}</td>
                            <td>{item.TRACKING_NUMBER}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {this.state.isLoaded ? (
                    <CancelOrders account_id={this.state.account_id_select} />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title pull-left">Cancel Records</h3>
                </div>
                <div className="box-body">
                  <div className="col-sm-12">
                    <table
                      id="example1"
                      class="table table-responsive table-striped table-bordered table-hover"
                    >
                      <thead>
                        <tr>
                          <th>Actions</th>
                          <th>Sale Record No</th>
                          <th>Order Id</th>
                          <th>Barcodes</th>
                          <th>Marchant</th>
                          <th>Item Title</th>
                          <th>User Id</th>
                          <th>Buyer Name</th>
                          <th>Address</th>
                          <th>Zipcode</th>
                          <th>Quantity</th>
                          <th>Sale Price</th>
                          <th>Total Price</th>
                          <th>Sale Date</th>
                          <th>Trackign Number</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.cancelBarcodeResult.map((item, key) => (
                          <tr key={key}>
                            <td>
                              <button
                                type="button"
                                onClick={() =>
                                  this.print_barcode(item.ORDER_ID)
                                }
                                class="btn btn-info"
                              >
                                Print Barcode
                              </button>
                            </td>
                            <td>{item.SALE_RECORD_NO}</td>
                            <td>{item.EXTENDEDORDERID}</td>
                            <td>{item.BARCODES}</td>
                            <td>{item.SELL_ACCT_DESC}</td>
                            <td>{item.ITEM_TITLE}</td>
                            <td>{item.USER_ID}</td>
                            <td>{item.BUYER_FULLNAME}</td>
                            <td>{item.BUYER_ADDRESS1}</td>
                            <td>{item.BUYER_ZIP}</td>
                            <td>{item.QUANTITY}</td>
                            <td>${item.SALE_PRICE}</td>
                            <td>${item.TOTAL_PRICE}</td>
                            <td>{item.SALE_DATE}</td>
                            <td>{item.TRACKING_NUMBER}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* modal */}
        {this.state.isOpenModel ? (
          <div id="myModal" class="modal" role="dialog">
            <div class="modal-dialog">
              <form onSubmit={this.requestCancellation} id="requestBarcode">
                <input name="barcode_no" type="hidden" />
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                      ×
                    </button>
                    <h4 class="modal-title">Cancellation Info</h4>
                  </div>
                  <div class="modal-body">
                    <div class="form-group">
                      <label>Item Title: </label>
                      <span> {this.state.item_title}</span>
                    </div>
                    <div class="form-group">
                      <label>Sale Order Number : </label>
                      <span> {this.state.sale_order_number}</span>
                    </div>
                    <div class="form-group">
                      <label>Order Number: </label>
                      <span> {this.state.extended_order_id}</span>
                    </div>

                    <div id="showReason" class="form-group hide">
                      <label>Reason:</label>
                      <select
                        name="remarks"
                        onChange={this.handleChange}
                        class="form-control"
                      >
                        <option value="">Select</option>
                        {this.state.cancelOptions.map((item, key) => (
                          <option key={key} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div id="showDisRelease" className="hide">
                      <div class="form-group">
                        <div class="radio">
                          <label>
                            <input
                              type="radio"
                              name="barcode_status"
                              onChange={this.radioFunction}
                              id="optionsRadios1"
                              value="release"
                            />
                            Release Barcode
                          </label>
                        </div>
                        <div class="radio">
                          <label>
                            <input
                              type="radio"
                              name="barcode_status"
                              onChange={this.radioFunction}
                              id="optionsRadios2"
                              value="discard"
                            />
                            Discard Barcode
                          </label>
                        </div>
                        <div>
                          {this.state.barcodes.map((item, key) => (
                            <div key={key}>
                              {item.map((item1, key1) => (
                                <div key={key1}>
                                  <label>
                                    Barcodes against order id :
                                    {key1 === 0 ? item1.ORDER_ID : ""}
                                  </label>
                                  {key1 === 0 ? <br /> : ""}

                                  <span className="barcode_span">
                                    <input
                                      value={item1.BARCODE_NO}
                                      // onChange={e => this.updateCheckedUserIds(e)}
                                      type="checkbox"
                                      className="barcode_input"
                                      checked
                                    />
                                    {item1.BARCODE_NO}
                                  </span>
                                </div>
                              ))}
                              <br />
                            </div>
                          ))}

                          {/* <label>Barcodes</label> */}
                          {/* <div>
                            {this.state.barcodes.map((item, key) => (
                              <span key={key} className="barcode_span">
                                <input
                                  value={item.BARCODE_NO}
                                  // onChange={e => this.updateCheckedUserIds(e)}
                                  type="checkbox"
                                  className="barcode_input"
                                  checked
                                />
                                {item.BARCODE_NO}
                              </span>
                            ))}
                          </div> */}
                        </div>
                        <label>Bin Id</label>
                        {this.state.pulling_id === null ? (
                          this.state.cnt === "1" ? (
                            <input
                              type="text"
                              id="bin_id"
                              value={this.state.bin_id}
                              onChange={this.handleChange}
                              class="form-control"
                              name="bin_id"
                              placeholder="Bin Id"
                            />
                          ) : this.state.cnt > "1" ? (
                            <input
                              type="text"
                              id="bin_id"
                              onChange={this.handleChange}
                              class="form-control"
                              name="bin_id"
                              placeholder="Bin Id"
                            />
                          ) : (
                            ""
                          )
                        ) : (
                          <input
                            type="text"
                            id="bin_id"
                            onChange={this.handleChange}
                            class="form-control"
                            name="bin_id"
                            placeholder="Bin Id"
                          />
                        )}
                        {/* <input
                          type="text"
                          id="bin_id"
                          onChange={this.handleChange}
                          class="form-control"
                          name="bin_id"
                          placeholder="Bin Id"
                        /> */}
                        <label>Remarks</label>
                        <input
                          type="text"
                          id="releaseRemarks"
                          onChange={this.handleChange}
                          class="form-control"
                          name="releaseRemarks"
                          placeholder="Remarks"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="submit"
                      id="checkEligibility"
                      class="checkEligibility hide btn btn-info hide"
                    >
                      Check Release Or Discard
                    </button>
                    <button
                      type="submit"
                      class="requestCancel hide btn btn-danger"
                    >
                      Request Cancellation
                    </button>
                    <button
                      type="button"
                      class="btn btn-default"
                      data-dismiss="modal"
                      id="closeModal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        ) : (
          ""
        )}
        {/* end modal */}
        {/* show release or discard barcode */}
        <div id="myModalBarcode" class="modal" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                  ×
                </button>
                <h4 class="modal-title">Barcodes</h4>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label>Item Title: </label>
                  <span> {this.state.item_title}</span>
                </div>
                <div class="form-group">
                  <label>Sale Order Number : </label>
                  <span> {this.state.sale_order_number}</span>
                </div>
                <div class="form-group">
                  <label>Order Number: </label>
                  <span> {this.state.extended_order_id}</span>
                </div>
                <div id="showReleaseBarcode" className="hide">
                  <div class="form-group">
                    <div>
                      <label>
                        Barcodes :
                        {this.state.cancelled_barcodes.map((item, key) => (
                          <span key={key} className="barcode_span">
                            <span>
                              <strong>{item.BARCODE_NO}</strong>
                            </span>
                            ,
                          </span>
                        ))}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  onClick={() => this.print_barcode(this.state.order_id)}
                  class="btn btn-info"
                >
                  Print Barcode
                </button>
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                  id="closeModal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* end show release or discard barcode */}
      </div>
    );
  }
}

export default CreateCancellation;
