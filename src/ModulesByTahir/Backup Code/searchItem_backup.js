import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import $ from "jquery";
import swal from "sweetalert";
import "gasparesganga-jquery-loading-overlay";
import * as Autosuggest from "react-autosuggest";
import AutosuggestHighlightMatch from "autosuggest-highlight/umd/match";
import AutosuggestHighlightParse from "autosuggest-highlight/umd/parse";
import SearchItemList from "../searchItemList";
import "./app.css";

class searchItem extends Component {
  constructor(props) {
    super(props);
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;

    this.state = {
      search: "",
      lz_products: [],
      value: "",
      suggestions: [],
      prod: "",
      baseUrl: finalurl,
      error: null,
      isLoaded: false,
      upc: "",
      manufacturer: "",
      mpn: "",
      mpnDescription: "",
      redirectToReferrer: false
    };
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  escapeRegexCharacters = str => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  getSuggestions = value => {
    var prod = this.state.prod;
    const escapedValue = this.escapeRegexCharacters(value.trim());

    if (escapedValue === "") {
      return [];
    }

    const regex = new RegExp("\\b" + escapedValue, "i");

    return prod.filter(products =>
      regex.test(this.getSuggestionValue(products))
    );
  };

  getSuggestionValue = suggestion => {
    return `${suggestion.UPC}~${suggestion.MPN}`;
  };

  renderSuggestion = (suggestion, { query }) => {
    const suggestionText = `${suggestion.UPC}~${suggestion.MPN}`;
    const matches = AutosuggestHighlightMatch(suggestionText, query);
    const parts = AutosuggestHighlightParse(suggestionText, matches);
    // const Background =
    //   this.state.baseUrl +
    //   "/item_pictures/dekitted_pictures/127835/A_2esatpr7zt2.JPG";
    // const Background =
    //   this.state.baseUrl +
    //   "/item_pictures/master_pictures/" +
    //   suggestion.UPC +
    //   "~/Used/thumb/11_07_2016_3630.JPG";
    return (
      <span className={"suggestion-content "}>
        <span className="name">
          {parts.map((part, index) => {
            const className = part.highlight ? "highlight" : null;

            return (
              <span className={className} key={index}>
                {part.text}
              </span>
            );
          })}
        </span>
      </span>
    );
  };

  componentWillMount() {
    this.loadData();

    if (sessionStorage.getItem("userName")) {
      console.log("User Found");
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
  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  ajaxCall = () => {
    var upc_mpn = $("#upc_mpn").val();

    $.LoadingOverlay("show");
    this.searchProduct(upc_mpn)
      .then(result => {
        $.LoadingOverlay("hide");
        console.log(result);
        if (result.search) {
          // this.resetForm();
          if (this.state.lz_products) {
            this.state.lz_products = null;
          }
          this.setState({
            lz_products: result.products,
            isLoaded: true
          });
          $("#recordsList").show();
        } else {
          $("#recordsList").hide();
          swal("Not Found", result.message, "error");
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };

  searchProduct = upc_mpn => {
    this.setState({
      isLoaded: false
    });
    const { baseUrl } = this.state;
    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_product/search_product";
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          upc_mpn: upc_mpn
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
          swal("Item Posted", result.message, "success");
          this.loadData();
        } else {
          swal("Error", result.message, "error");
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        swal("Error", err.message, "error");
      });
  };
  addProduct = () => {
    const { upc, manufacturer, mpn, mpnDescription, baseUrl } = this.state;
    let insertUrl =
      baseUrl + "/laptopzone/reactcontroller/c_product/add_product";
    let userId = sessionStorage.getItem("userId");
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
    const { search, lz_products, value, suggestions, isLoaded } = this.state;
    const inputProps = {
      placeholder: "Search product...",
      id: "upc_mpn",
      value,
      onChange: this.onChange
    };

    return (
      <React.Fragment>
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
                    <Autosuggest
                      suggestions={suggestions}
                      onSuggestionsFetchRequested={
                        this.onSuggestionsFetchRequested
                      }
                      onSuggestionsClearRequested={
                        this.onSuggestionsClearRequested
                      }
                      getSuggestionValue={this.getSuggestionValue}
                      renderSuggestion={this.renderSuggestion}
                      inputProps={inputProps}
                    />
                    <span className="input-group-btn">
                      <button
                        onClick={this.ajaxCall}
                        className="btn btn-flat btn-success btn-lg"
                      >
                        Search
                      </button>
                      <button
                        type="button"
                        className="btn btn-info btn-lg"
                        data-toggle="modal"
                        data-target="#myModal"
                        style={{ marginLeft: "2%" }}
                      >
                        Single Entry Form
                      </button>
                    </span>
                  </div>
                  <div
                    className="table-responsive"
                    id="recordsList"
                    hidden
                    style={{ marginTop: "3%" }}
                  >
                    {isLoaded ? <SearchItemList products={lz_products} /> : ""}
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
                            onBlur={this.checkUnique}
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
