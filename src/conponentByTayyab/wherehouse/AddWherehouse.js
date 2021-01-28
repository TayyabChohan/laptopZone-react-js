import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  add_warhouse,
  get_wer,
  get_atu_no
} from "../../actions/addWerehouseAction.js";
const action = {
  add_warhouse,
  get_wer,
  get_atu_no
};

class AddWherehouse extends Component {
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
      WarehouseNo: "",
      WarehouseDescription: "",
      WarehouseLocation: ""
    };
  }

  handleOnsubmit = e => {
    e.preventDefault();
    const data = {
      werehouse_no: this.state.WarehouseNo,
      werehouse_desc: this.state.WarehouseDescription,
      werehouse_loc: this.state.WarehouseLocation
    };
    if (this.state.WarehouseNo <= 0 || this.state.WarehouseNo < -1) {
      alert("Werehouse No is invalid");
      return false;
    }
    this.props.add_warhouse(data);
    this.setState({
      WarehouseNo: "",
      WarehouseDescription: "",
      WarehouseLocation: ""
    });
  };
  componentDidMount() {
    this.props.get_wer();
    this.props.get_atu_no();
  }
  onInputHandle = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentDidUpdate(preProps, preState) {
    if (
      preProps.addauto_no_array !== this.props.addauto_no_array &&
      this.props.addauto_no_array !== ""
    ) {
      this.props.addauto_no_array.map(item =>
        this.setState({
          WarehouseNo: item.WH_NO
        })
      );
    }
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
    console.log(this.props.addauto_no_array);

    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: "/login" }} />;
    }
    // console.log(this.props.shipdata.map(item => item))
    //console.log(shipingvalue)
    //console.log(this.state.TEMPLATE_ID);
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
          value: this.props.addwerehouseArray.length
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
      // keepSizePerPageState: true //default is false, enable will keep sizePerPage dropdown state(open/clode) when external rerender happened
      // hideSizePerPage: true > You can hide the dropdown for sizePerPage
      // alwaysShowAllBtns: true // Always show next and previous button
      // withFirstAndLast: false > Hide the going to First and Last page button
      // hidePageListOnlyOnePage: true > Hide the page list if only one page.
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
              Locations
              <small>Control panel</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <p>Home</p>
              </li>
              <li className="active"> WereHouse </li>
            </ol>
          </section>

          <section className="content">
            <div className="row">
              <form
                onSubmit={this.handleOnsubmit}
                ref={el => (this.myFormRef = el)}
              >
                <div
                  className="col-sm-12"
                  style={{ paddingLeft: "0%", paddingRight: "0%" }}
                >
                  <div className="box">
                    <div className="box-header with-border">
                      <h3 className="box-title"> Add WereHouse</h3>
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
                        <div className="col-sm-2">
                          <label>Warehouse No:</label>
                          <input
                            type="number"
                            className="form-control"
                            name="WarehouseNo"
                            onChange={this.onInputHandle}
                            value={this.state.WarehouseNo}
                            placeholder="Warehouse 
                            No"
                            id="WeightId"
                            required
                          />
                        </div>
                        <div className="col-sm-4">
                          <label>Warehouse Description:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="WarehouseDescription"
                            onChange={this.onInputHandle}
                            value={this.state.WarehouseDescription}
                            placeholder="Warehouse Description"
                            id="WarehouseDescriptionId"
                            required
                          />
                        </div>
                        <div className="col-sm-4">
                          <label>Warehouse Location:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="WarehouseLocation"
                            onChange={this.onInputHandle}
                            value={this.state.WarehouseLocation}
                            placeholder="Warehouse Location"
                            id="WarehouseLocationId"
                            required
                          />
                        </div>

                        <div className="col-sm-2">
                          <br />
                          <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: "45%", marginTop: "3px" }}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div
              className="row"
              style={{ height: "100%", overflow_x: "scroll" }}
            >
              <div className="col-sm-12">
                <div className="box">
                  <br />

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
                        //  cellEdit={cellEditProp}
                        //insertRow={ true }
                        data={this.props.addwerehouseArray}
                        // height='100%' scrollTop={ 'Top' }
                        // height="150"
                        // scrollTop={"Top"}
                        // footerData={footerData}
                        // footer
                        // selectRow={selectRowProp}
                        // trClassName={this.trClassFormat}
                        //totalRow={totalRow}
                        // insertRow
                        //  exportCSV
                        // deleteRow={true}
                        //selectRow={selectRowProp}
                        // option={option}
                      >
                        <TableHeaderColumn
                          width="33.33%"
                          isKey={true}
                          editable={false}
                          dataSort={true}
                          //dataFormat={actionFormatter}
                          dataField="WAREHOUSE_NO"
                        >
                          WareHouse No
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="33.33%"
                          editable={false}
                          export={false}
                          dataField="WAREHOUSE_DESC"
                        >
                          {" "}
                          WereHouse Description{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="33.33%"
                          editable={false}
                          dataSort={true}
                          dataField="LOCATION"
                        >
                          {" "}
                          WereHouse Location
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
    addwerehouseArray: state.addwerehouseReducer.addwerehouseArray,
    addauto_no_array: state.addwerehouseReducer.addauto_no_array
  };
};
export default connect(
  mapStateToProps,
  action
)(AddWherehouse);
