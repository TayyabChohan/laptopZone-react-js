import React, { Component } from "react";
import { ToastsContainer, ToastsStore } from "react-toasts";
import { Link, Redirect } from "react-router-dom";
import $ from "jquery";
import notify from "../Functions/notify";
import CancelOrders from "./cancelOrders";

class AccountSelect extends Component {
  constructor(props) {
    super(props);
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    this.state = {
      baseUrl: finalurl,
      merchantAccounts: [],
      account_id: "",
      accounts: "",
      isLoaded: false
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      isLoaded: false
    });
  };
  componentWillMount() {
    this.getAccounts();
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
          notify("error", "No Data Found!");
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };
  handleAccountSubmit = e => {
    e.preventDefault();
    if (this.state.account_id) {
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
      notify("error", "Please select account!");
    }
  };
  render() {
    const { merchantAccounts } = this.state;
    var accounts = merchantAccounts
      ? merchantAccounts.map(function(obj) {
          return (
            <option key={obj.LZ_SELLER_ACCT_ID} value={obj.LZ_SELLER_ACCT_ID}>
              {obj.SELL_ACCT_DESC}
            </option>
          );
        })
      : "";
    return (
      <React.Fragment>
        <section className="content-header">
          <h1>
            Cancel Orders <small>Control Panel</small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/welcom">
                <i className="fa fa-dashboard" /> Home
              </Link>
            </li>
            <li className="active">
              <Link to="/cancelOrders">Cancel Orders</Link>
            </li>
          </ol>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title pull-left">Search</h3>
                </div>
                <div className="box-body">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <form onSubmit={this.handleAccountSubmit}>
                        <div className="col-sm-4">
                          <label htmlFor="accounts" className="control-label">
                            Select Account:
                          </label>
                          <select
                            className="form-control"
                            name="account_id"
                            id="account_id"
                            onChange={this.handleChange}
                          >
                            <option value="" selected>
                              Select Account
                            </option>
                            {accounts}
                          </select>
                        </div>
                        <div style={{ marginTop: "25px" }} className="col-sm-2">
                          <input
                            type="submit"
                            className="btn btn-success"
                            value="Search"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title pull-left">Search</h3>
                </div>
                <div className="box-body">
                  <div className="col-sm-12">
                    {this.state.isLoaded ? (
                      <CancelOrders account_id={this.state.account_id} />
                    ) : (
                      "Please select account and hit search"
                    )}
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

export default AccountSelect;
