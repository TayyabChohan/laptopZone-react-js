import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import $ from "jquery";
import Flatpickr from "react-flatpickr";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
//import Select from "react-select";
import swal from "sweetalert";
import { toastr } from "react-redux-toastr";
import Select from "react-select";
import dateFormat from "dateformat";
import {
  lister_view,
  sum_total_listing,
  ListerUsers,
  price_fiter,
  filter_data
} from "../../actions/ListerViewAction.js";

const action = {
  lister_view,
  sum_total_listing,
  ListerUsers,
  filter_data,
  price_fiter
};

const ebayLink = (cell, row) => {
  var link = "https://www.ebay.com/itm/" + row.EBAY_ITEM_ID;
  return (
    <a href={link} target="_blank">
      {row.EBAY_ITEM_ID}
    </a>
  );
};
class ListerView extends Component {
  constructor(props) {
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    super(props);

    this.state = {
      error: null,
      isLoaded: true,
      baseUrl: finalurl,
      redirectToReferrer: false,
      error: false,
      show: false,
      Listerdrowp: "",
      date: [new Date(), new Date()],
      redioSearch: "Both",
      radioModel: ""
    };
  }

  handleOnChangeRadioSearch = e => {
    this.setState({
      redioSearch: e.target.value
    });
  };
  handleOnsubmit_search = e => {
    e.preventDefault();
    const data = {
      radiobtn: this.state.redioSearch,
      date: this.state.date,
      ListeruserId: this.state.Listerdrowp.value
    };
    //console.log(data);
    this.props.filter_data(data);
    this.props.price_fiter(data);
  };
  onHandletDrop = Listerdrowp => {
    this.setState({
      Listerdrowp: Listerdrowp
    });
  };
  componentDidMount() {
    const data = this.state.date;
    this.props.lister_view(data[0]);
    this.props.sum_total_listing(data[0]);
    this.props.ListerUsers();
  }

  componentWillMount() {
    if (localStorage.getItem("userName")) {
      console.log("setion find");
    } else {
      this.setState({ redirectToReferrer: true });
    }
  }

  renderShowsTotal(start, to, total) {
    return (
      <p style={{ color: "#696969" }}>
        From {start} to {to}, totals is {total}&nbsp;&nbsp;
      </p>
    );
  }
  render() {
    //const ss= dateFormat(this.state.date[0], "dd-mm-yyyy")
    //console.log(ss);
    const pic_date = this.state.date.length > 1;
    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: "/login" }} />;
    }
    const options = {
      page: 1, // which page you want to show as default
      sizePerPageList: [
        {
          text: "5",
          value: 5
        },
        {
          text: "10",
          value: 10
        },
        {
          text: "15",
          value: 15
        },
        {
          text: "20",
          value: 20
        },
        {
          text: "25",
          value: 25
        },
        {
          text: "All",
          value: this.props.lister_view_Array.length
        }
      ], // you can change the dropdown list for size per page
      sizePerPage: 10, // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 5, // the pagination bar size.
      prePage: "Prev", // Previous page button text
      nextPage: "Next", // Next page button text
      firstPage: "<<", // First page button text
      lastPage: ">>", // Last page button text
      prePageTitle: "Go to previous", // Previous page button title
      nextPageTitle: "Go to next", // Next page button title
      firstPageTitle: "Go to first", // First page button title
      lastPageTitle: "Go to Last", // Last page button title
      paginationShowsTotal: this.renderShowsTotal, // Accept bool or function
      paginationPosition: "both", // default is bottom, top and both is all available
      clearSearch: true
    };

    // let total_price = [];
    // this.props.lister_user_array.map(item =>
    //   total_price.push({
    //     value: item.EMPLOYEE_ID,
    //     label: item.USER_NAME
    //   })
    // );

    let total_price = [];
    this.props.lister_user_array.map(item => {
      return total_price.push({
        value: item.EMPLOYEE_ID,
        label: item.USER_NAME
      });
    });
    total_price.push(
      {
        value: "All",
        label: "All"
      },
      {
        value: "PK",
        label: "PK"
      },
      {
        value: "US",
        label: "US"
      }
    );
    //total_price = total_price.push({value: "All", label: "ALL" })
    const { error, isLoaded } = this.state;
    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: "/login" }} />;
    }
    if (error) {
      return <div> Error: {error.message}</div>;
    } else if (!isLoaded) {
      return (
        <section className="content-header">
          <h1>LOADING......</h1>
          <ol className="breadcrumb">
            <li>
              <a href="#">
                <i className="fa fa-dashboard" /> Home
              </a>
            </li>
            <li>
              <a href="#">Tables</a>
            </li>
            <li className="active">Unposted Items</li>
          </ol>
        </section>
      );
    } else {
      return (
        <React.Fragment>
          <section className="content-header">
            <h1>
              Lister View
              <small>Control panel</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <p>Home</p>
              </li>
              <li className="active">Lister View </li>
            </ol>
          </section>

          <section className="content">
            <div className="box">
              <div className="box-header with-border">
                <h3 className="box-title">Search Lister</h3>
                <div className="box-tools pull-right">
                  <button
                    type="button"
                    className="btn btn-box-tool"
                    data-widget="collapse"
                  >
                    <i className="fa fa-minus" />
                  </button>
                </div>
              </div>
              <div className="box-body">
                <form
                  onSubmit={this.handleOnsubmit_search}
                  ref={el => (this.myFormRef = el)}
                >
                  <div className="col-sm-12">
                    <div className="col-sm-3">
                      <label>Listers:</label>
                      <div
                        className="form-group has-feedback"
                        style={{ width: "100%" }}
                      >
                        <Select
                          id="servicetype"
                          // defaultValue={dropValue[1]}
                          name="Listerdrowpname"
                          options={total_price}
                          value={this.state.Listerdrowp}
                          onChange={this.onHandletDrop}
                          className="basic-single"
                          classNamePrefix="select"
                          isSearchable
                          required
                          select-option
                        />
                      </div>
                    </div>
                    <div className="col-sm-2">
                      <label>Date Range</label>
                      <div className="input-group">
                        <Flatpickr
                          options={{
                            mode: "range",
                            // minDate: 'today',
                            dateFormat: "Y-m-d",
                            name: "name",
                            defaultDate: ""
                            //wrap: true
                          }}
                          value={this.state.date}
                          onChange={date => {
                            this.setState({ date });
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-sm-3">
                      <label>Filter:</label>
                      <br />
                      <div
                        className="custom-control custom-radio custom-control-inline"
                        style={{ display: "inline" }}
                      >
                        <input
                          type="radio"
                          className="custom-control-input"
                          id="defaultInline3"
                          name="inlineDefaultRadiosExample"
                          value="1"
                          //checked={this.state.radioModel == "Box"}
                          onClick={this.handleOnChangeRadioSearch}
                        />
                        <label
                          className="custom-control-label"
                          for="faultInline1"
                        >
                          Techbargain
                        </label>
                      </div>
                      &nbsp;&nbsp;&nbsp;
                      <div
                        className="custom-control custom-radio custom-control-inline"
                        style={{ display: "inline" }}
                      >
                        <input
                          type="radio"
                          className="custom-control-input"
                          id="defaultInline4"
                          name="inlineDefaultRadiosExample"
                          value="2"
                          // checked={this.state.radioModel == "Envelope"}
                          onClick={this.handleOnChangeRadioSearch}
                        />
                        <label
                          className="custom-control-label"
                          for="defaunline2"
                        >
                          Dfwonline
                        </label>
                        &nbsp;&nbsp;&nbsp;
                        <input
                          type="radio"
                          className="custom-control-input"
                          id="defaultInline4"
                          name="inlineDefaultRadiosExample"
                          value="Both"
                          //  checked={this.state.radioModel == "Both"}
                          onClick={this.handleOnChangeRadioSearch}
                          defaultChecked
                        />
                        <label
                          className="custom-control-label"
                          for="defaunline2"
                        >
                          Both
                        </label>
                      </div>
                    </div>
                    <div className="col-sm-2">
                      <br />

                      <button
                        type="submit"
                        className="btn btn-danger glyphicon glyphicon-search"
                        disabled={!pic_date}
                        style={{ width: "45%", marginTop: "3px" }}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div
              className="row"
              style={{ height: "100%", overflow_x: "scroll" }}
            >
              <div className="col-sm-12">
                <div className="box">
                  <div className="row">
                    <div className="col-sm-4">
                      <BootstrapTable
                        striped
                        //pagination
                        // search
                        tableHeaderclassName="my-header-class"
                        columnWidth="100%"
                        //options={options}
                        headerStyle={{ background: "#DCDCDC" }}
                        hover
                        data={this.props.total_price_Array}
                      >
                        <TableHeaderColumn
                          // editable={false}
                          // dataSort={true}
                          // dataFormat={actionFormatter}
                          isKey={true}
                          dataField="TOTAL_LISTING"
                          width="50%"
                        >
                          Total Listing(Unique)
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          // editable={false}
                          // dataSort={true}
                          dataField="TOTAL_PRICE"
                          width="50%"
                        >
                          {" "}
                          Total Price
                        </TableHeaderColumn>
                      </BootstrapTable>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="row"
              style={{ height: "100%", overflow_x: "scroll" }}
            >
              <div className="col-sm-12">
                <div className="box">
                  <div className="row">
                    <div className="col-sm-12">
                      <BootstrapTable
                        striped
                        pagination
                        search
                        tableHeaderclassName="my-header-class"
                        columnWidth="100%"
                        options={options}
                        headerStyle={{ background: "#DCDCDC" }}
                        hover
                        data={this.props.lister_view_Array}
                      >
                        <TableHeaderColumn
                          editable={false}
                          dataSort={true}
                          // dataFormat={actionFormatter}
                          dataField="EBAY_ITEM_DESC"
                          width="11.11%"
                        >
                          Title
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          editable={false}
                          dataSort={true}
                          dataField="USER_NAME"
                          width="11.11%"
                        >
                          {" "}
                          Lister Name
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          editable={false}
                          dataSort={true}
                          dataField="RETURNID"
                          width="11.11%"
                        >
                          {" "}
                          Picture
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          editable={false}
                          dataSort={true}
                          dataField="LIST_DATE"
                          width="11.11%"
                        >
                          {" "}
                          List Date
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          editable={false}
                          export={false}
                          dataFormat={ebayLink}
                          dataField="EBAY_ITEM_ID"
                          width="11.11%"
                        >
                          {" "}
                          Ebay Item Id{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          isKey={true}
                          editable={false}
                          dataSort={true}
                          dataField="LIST_PRICE"
                          width="11.11%"
                        >
                          List Price{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          editable={false}
                          ordering={true}
                          dataSort={true}
                          dataField="LIST_QTY"
                          width="11.11%"
                        >
                          List Qty{" "}
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          editable={false}
                          ordering={true}
                          dataSort={true}
                          dataField="DAY"
                          tdStyle={{ whiteSpace: "normal" }}
                          width="11.11%"
                        >
                          Aging{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          editable={false}
                          ordering={true}
                          dataSort={true}
                          dataField="SELL_ACCT_DESC"
                          width="11.11%"
                        >
                          Acount Name{" "}
                        </TableHeaderColumn>
                      </BootstrapTable>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <AlertMessage /> */}
        </React.Fragment>
      );
    }
  }
}
const mapstateToProps = state => {
  return {
    lister_view_Array: state.listerviewReducer.lister_view_Array,
    total_price_Array: state.listerviewReducer.total_price_Array,
    lister_user_array: state.listerviewReducer.lister_user_array
  };
};

export default connect(
  mapstateToProps,
  action
)(ListerView);
