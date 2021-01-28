import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import $ from "jquery";
// import swal from "sweetalert";
import notify from "../Functions/notify";
import "gasparesganga-jquery-loading-overlay";
import SearchItemList from "./searchItemList";
import "../CSS_Files/app.css";
import { ToastsContainer, ToastsStore } from "react-toasts";

class searchItem extends Component {
  constructor(props) {
    super(props);
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;

    this.state = {
      search: "",
      lz_products: [],
      prod: "",
      baseUrl: finalurl,
      error: null,
      isLoaded: false,
      upc: "",
      manufacturer: "",
      mpn: "",
      mpnDescription: "",
      redirectToReferrer: false,
      conditions: [],
      merchant: [],
      merchant_id: "",
      images: []
    };
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    $(".pl").keydown(function(event) {
      if (event.keyCode == 13) {
        $(".clickOnEnter").click();
        return false;
      }
    });
  };

  componentWillMount() {
    if (localStorage.getItem("userName")) {
      this.setState({ merchant_id: localStorage.getItem("merId") });
    } else {
      this.setState({ redirectToReferrer: true });
    }
  }
  loadData = () => {
    $.ajax({
      url:
        this.state.baseUrl +
        "/laptopzone/reactcontroller/c_product/get_products",
      dataType: "json",
      type: "POST",
      success: function(data) {
        this.setState({
          prod: data
        });
        console.log(data);
      }.bind(this),
      error: function(xhr, resp, text) {}
    });
  };

  ajaxCall = () => {
    var searchValue = $("#searchValue").val();
    if (!searchValue) {
      notify("error", "Search is empty!");
      return;
    }
    $.LoadingOverlay("show");
    this.searchProduct(searchValue)
      .then(result => {
        $.LoadingOverlay("hide");
        console.log(result);
        if (result.search) {
          this.resetForm();
          if (this.state.lz_products) {
            this.state.lz_products = null;
          }
          this.setState({
            lz_products: result.products,
            conditions: result.conditions,
            merchant: result.merchant,
            images: result.images,
            isLoaded: true
          });
          $("#search_result").show();
          $("#recordsList").show();
        } else {
          $("#search_result").hide();
          $("#recordsList").hide();
          notify("error", result.message);
          // swal("Not Found", result.message, "error");
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };

  searchProduct = searchValue => {
    this.setState({
      isLoaded: false
    });
    const { baseUrl, merchant_id } = this.state;
    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_product/search_product";
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          searchValue: searchValue,
          merchant_id: merchant_id
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

  resetForm = () => {
    this.setState({
      upc: "",
      manufacturer: "",
      mpn: "",
      mpnDescription: ""
    });
  };
  postData = e => {
    e.preventDefault();

    $.LoadingOverlay("show");
    this.addProduct()
      .then(result => {
        $.LoadingOverlay("hide");
        console.log(result);
        if (result.insert) {
          this.resetForm();
          $("#dismissModal").click();
          notify("success", result.message);
          // swal("Item Posted", result.message, "success");
          //this.loadData();
          this.setState({
            isLoaded: false
          });
          this.ajaxCall();
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
  addProduct = () => {
    const { upc, manufacturer, mpn, mpnDescription, baseUrl } = this.state;
    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_product/add_product";
    let userId = localStorage.getItem("userId");
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          upc: upc,
          manufacturer: manufacturer,
          mpn: mpn,
          mpnDescription: mpnDescription,
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
    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: "/login" }} />;
    }
    const {
      lz_products,
      isLoaded,
      conditions,
      merchant,
      baseUrl,
      images
    } = this.state;
    return (
      <React.Fragment>
        <ToastsContainer store={ToastsStore} />
        <section className="content-header">
          <h1>
            Search Item <small>Control Panel</small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/welcom">
                <i className="fa fa-dashboard" /> Home
              </Link>
            </li>
            <li>Transaction Form</li>
            <li className="active">
              <Link to="/singleEntryForm">Search Item</Link>
            </li>
          </ol>
        </section>

        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">Search</h3>
                </div>
                <div className="box-body">
                  <div className="input-group">
                    <input
                      className="form-control pl"
                      value={this.state.search}
                      id="searchValue"
                      name="search"
                      onChange={this.handleChange}
                      placeholder="Search by UPC, MPN or Description ..."
                    />
                    <span className="input-group-btn">
                      <button
                        onClick={this.ajaxCall}
                        className="btn btn-flat btn-success clickOnEnter"
                      >
                        Search
                      </button>
                      <button
                        type="button"
                        className="btn btn-info"
                        data-toggle="modal"
                        data-target="#myModal"
                        style={{ marginLeft: "2%" }}
                      >
                        Add New Product
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row" id="search_result" hidden>
            <div className="col-xs-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">Search Result</h3>
                </div>
                <div className="box-body">
                  <div
                    className="table-responsive"
                    id="recordsList"
                    hidden
                    style={{ marginTop: "3%" }}
                  >
                    {isLoaded ? (
                      <SearchItemList
                        products={lz_products}
                        condition={conditions}
                        merchants={merchant}
                        baseUrl={baseUrl}
                        images={images}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div id="myModal" className="modal fade" role="dialog">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 className="modal-title">Single Entry Form</h4>
              </div>
              <form onSubmit={this.postData}>
                <div className="modal-body">
                  {/* Single Entry Form */}

                  <div className="row">
                    <div className="col-sm-12">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label htmlFor="upc" className="control-label">
                            UPC:
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="upc"
                            name="upc"
                            onChange={this.handleChange}
                            value={this.state.upc}
                            // onBlur={this.checkUnique}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
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
                            id="manufacturer"
                            name="manufacturer"
                            onChange={this.handleChange}
                            value={this.state.manufacturer}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label htmlFor="mpn" className="control-label">
                            MPN:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="mpn"
                            name="mpn"
                            onChange={this.handleChange}
                            value={this.state.mpn}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label
                            htmlFor="mpnDescription"
                            className="control-label"
                          >
                            MPN Description:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="mpnDescription"
                            name="mpnDescription"
                            onChange={this.handleChange}
                            value={this.state.mpnDescription}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* END Single Entry Form */}
                </div>
                <div className="modal-footer">
                  <div className="col-sm-6 buttn_submit">
                    <div className="form-group">
                      <input
                        type="submit"
                        title="Save and Post Record"
                        name="save"
                        id="save"
                        className="btn btn-success clor_chaneg pull-left"
                        value="Save &amp; Post"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <button
                      type="button"
                      className="btn btn-default pull-right"
                      data-dismiss="modal"
                      id="dismissModal"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      title="Back"
                      id="custom"
                      className="btn btn-danger pull-right"
                      onClick={this.resetForm}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default searchItem;
