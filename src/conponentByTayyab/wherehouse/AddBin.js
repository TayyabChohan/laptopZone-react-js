import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import {
  get_bin,
  add_bin,
  Search_printStatus,
  print_all_bin,
  load_ware_data
} from "../../actions/addBinAction.js";
const action = {
  get_bin,
  add_bin,
  Search_printStatus,
  print_all_bin,
  load_ware_data
};
let getUrl = window.location;
let finalurl = getUrl.protocol + "//" + getUrl.hostname;
function actionFormatter(cell, row) {
  return (
    <div>
      {/* <button
        className={ "btn btn-success glyphicon glyphicon-print"
        }
        call="list"
        id="item_list"
        title= "print" 
        onClick={() => that.clickprint(cell,row)}
      /> */}
      <a
        href={`${finalurl}/laptopzone/reactControllertest/c_add_werehouse/print_single_bin?id=${
          row.BIN_ID
        }`}
        className="btn btn-primary btn-xs"
        target="_blank"
        getSellerOrders
        title="Print"
        // onClick={() => that.clickPrint(cell, row)}
      >
        <span className="glyphicon glyphicon-print p-b-5" aria-hidden="true" />
      </a>
    </div>
  );
}
function actionFormatter1(cell, row) {
  return (
    <div>
      <button
        className={
          row.PRINT_STATUS == 2
            ? "btn btn-success btn-xs glyphicon glyphicon-ok"
            : "btn btn-danger btn-xs glyphicon glyphicon-remove"
        }
        call="list"
        id="item_list"
        title={row.PRINT_STATUS == 2 ? "Printed" : "Not Printed"}
      />
    </div>
  );
}

var that = "";

class AddBin extends Component {
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
      Bin_type: "",
      no_of_bins: "1",
      PrintStatus: ""
    };
    that = this;
  }

  handleOnsubmit_print = e => {
    e.preventDefault();
    const data = {
      PrintStatus: this.state.PrintStatus.value,
      Bin_type: this.state.Bin_type.value
    };
    // console.log(data);
    this.props.print_all_bin(data);
  };
  handleOnsubmit_search = e => {
    e.preventDefault();
    const data = {
      PrintStatus: this.state.PrintStatus.value,
      Bin_type: this.state.Bin_type.value,
     // no_of_bins: this.state.no_of_bins

    };
    // console.log(data);
    this.props.Search_printStatus(data);
  };

  handleOnsubmit = e => {
    e.preventDefault();
    const data = {
      Bin_type: this.state.Bin_type.value,
      no_of_bins: this.state.no_of_bins
    };
    // console.log(data);
    this.props.add_bin(data);
  };
  componentDidMount() {
    this.props.get_bin();
  }
  onInputHandle = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentWillMount() {
    if (localStorage.getItem("userName")) {
      console.log("setion find");
    } else {
      this.setState({ redirectToReferrer: true });
    }
  }
  onHandleDrop_bin_type = Bin_type => {
    this.setState({
      Bin_type: Bin_type
    });
  };
  onHandleDrop_print_status = PrintStatus => {
    this.setState({
      PrintStatus: PrintStatus
    });
  };

  renderShowsTotal(start, to, total) {
    return (
      <p style={{ color: "#696969" }}>
        From {start} to {to}, totals is {total}&nbsp;&nbsp;
      </p>
    );
  }
  render() {
    //console.log(this.props.Get_binArray)
    const enble =
      this.state.Bin_type !== "" &&
      this.state.no_of_bins !== "" &&
      this.state.PrintStatus !== "";
    const enble1 = this.state.Bin_type !== "";
    const enble2 = this.state.PrintStatus !== "";

    const binType_array = [
      { value: "TC", label: "Technician Bin" },
      { value: "PB", label: "Picture Bin" },
      { value: "AB", label: "Audit Bin" },
      { value: "WB", label: "Warehouse Bin" },
      { value: "NA", label: "Fixed Bin" },
      { value: "UB", label: "Puller Bin" }
    ];

    const print_status_array = [
      { value: "1", label: "Not Printed" },
      { value: "2", label: "Printed" }
    ];

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
          value: this.props.Get_binArray.length
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
              Bin
              <small>Control panel</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <p>Home</p>
              </li>
              <li className="active"> Bin </li>
            </ol>
          </section>

          <section className="content">
            <div className="row">
              <div
                className="col-sm-12"
                style={{ paddingLeft: "0%", paddingRight: "0%" }}
              >
                <div className="box">
                  <div className="box-header with-border">
                    <h3 className="box-title"> Add Bin</h3>
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
                    <div className="col-sm-12">
                      <form
                        onSubmit={this.handleOnsubmit}
                        ref={el => (this.myFormRef = el)}
                      >
                        <div className="col-sm-2">
                          <label>Bin Type:</label>
                          <Select
                            id="binId"
                            // defaultValue={marchantvalue_update[0]}
                            name="Bin_type"
                            options={binType_array}
                            value={this.state.Bin_type}
                            onChange={this.onHandleDrop_bin_type}
                            className="basic-single"
                            classNamePrefix="select "
                            isSearchable
                            required
                            select-option
                          /> 
                        </div>
                        <div className="col-sm-2">
                          <label>No Of Bins:</label>
                          <input
                            type="number"
                            className="form-control"
                            name="no_of_bins"
                            onChange={this.onInputHandle}
                            value={this.state.no_of_bins}
                            placeholder="No of Bins"
                            id="no_of_binsId"
                            required
                          />
                        </div>

                        <div className="col-sm-2">
                          <br />
                          <button
                            type="submit"
                            className="btn btn-success"
                            style={{ width: "60%", marginTop: "3px" }}
                            disabled={!enble1}
                          >
                            Add Bin
                          </button>
                        </div>
                      </form>
                      <form
                        onSubmit={this.handleOnsubmit_search}
                        ref={el => (this.myFormRef = el)}
                      >
                        <div className="col-sm-2">
                          <label>Print Status:</label>
                          <Select
                            id="merchatId"
                            // defaultValue={marchantvalue_update[0]}
                            name="PrintStatus"
                            options={print_status_array}
                            value={this.state.PrintStatus}
                            onChange={this.onHandleDrop_print_status}
                            className="basic-single"
                            classNamePrefix="select "
                            isSearchable
                            required
                            select-option
                          />
                        </div>

                        <div className="col-sm-2">
                          <br />
                          <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: "60%", marginTop: "3px" }}
                            onChange={this.onChangeSearch}
                            disabled={!enble2}
                          >
                            Search Bin
                          </button>
                        </div>
                      </form>

                      {/* <form
                        onSubmit={this.handleOnsubmit_print}
                        ref={el => (this.myFormRef = el)}
                      >
                        <div className="col-sm-2">
                          <br />
                          <button
                            type="submit"
                            className="btn btn-danger pull-right"
                            style={{ width: "60%", marginTop: "3px" }}
                            disabled={!enble}
                          >
                            Print All
                          </button>
                        </div>
                      </form> */}
                      <a
                        href={
                          this.state.baseUrl +
                          "/laptopzone/reactControllertest/c_add_werehouse/print_all_bin?PrintStatus=" +
                          this.state.PrintStatus.value +
                          "&Bin_type=" +
                          this.state.Bin_type.value
                        }
                        className="btn btn-danger pull-right"
                        target="_blank"
                        getSellerOrders
                        title="Print"
                        style={{ width: "10%", marginTop: "23px" }}
                        disabled={!enble}
                        // onClick={() => that.clickPrint(cell, row)}
                      >
                        Print All
                        {/* <span className="glyphicon glyphicon-print p-b-5" aria-hidden="true" /> */}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
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
                        data={this.props.Get_binArray}
                      >
                        <TableHeaderColumn
                          width="33.33%"
                          isKey={true}
                          editable={false}
                          dataSort={true}
                          dataFormat={actionFormatter}
                          dataField="BIN_ID"
                        >
                          Sticker
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="33.33%"
                          editable={false}
                          export={false}
                          dataField="BIN_NO"
                        >
                          {" "}
                          Bin No{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="33.33%"
                          editable={false}
                          dataSort={true}
                          dataFormat={actionFormatter1}
                          dataField="PRINT_STATUS"
                        >
                          {" "}
                          Print Status
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
}
const mapStateToProps = state => {
  return {
    Get_binArray: state.addBinReducer.Get_binArray
    // drowpWerDescArray: state.rackReducer.drowpWerDescArray,
    // get_rack_array: state.rackReducer.get_rack_array,
  };
};
export default connect(
  mapStateToProps,
  action
)(AddBin);
