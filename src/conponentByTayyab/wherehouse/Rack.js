import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import {
  dropdown_wer_desc,
  dropdown_rack_type,
  get_Rack,
  add_rack
} from "../../actions/rackAction.js";
const action = {
  dropdown_wer_desc,
  dropdown_rack_type,
  get_Rack,
  add_rack
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
        href={`${finalurl}/laptopzone/reactControllertest/c_add_werehouse/print_sticker?id=${
          row.RACK_ID
        }`}
        className="btn btn-primary btn-xs"
        target="_blank"
        getSellerOrders
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
      {/* <button
        className={ "btn btn-success glyphicon glyphicon-print"
        }
        call="list"
        id="item_list"
        title= "print" 
        onClick={() => that.clickprint(cell,row)}
      /> */}

      <a
        href={`${finalurl}/laptopzone/reactControllertest/c_add_werehouse/print_all_rows?id=${
          row.RACK_ID
        }`}
        className="btn btn-primary btn-xs"
        target="_blank"
        getSellerOrders
        // onClick={() => that.clickPrint(cell, row)}
      >
        <span className="glyphicon glyphicon-print p-b-5" aria-hidden="true" />
      </a>
    </div>
  );
}

var that = "";

class Rack extends Component {
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
      WarehouseDescription: "",
      Rackwidth: "",
      Rackheight: "",
      NoOfRows: "",
      RackTYPE: "",
      NoOfRacks: ""
    };
    that = this;
  }

  //   clickprint =(cell, row)=>{
  //     const data = {
  //       ract_id: row.RACK_ID
  //     };
  //     console.log(data)
  // this.props.print_sticker(data);
  //   }
  handleOnsubmit = e => {
    e.preventDefault();
    const data = {
      WarehouseDescription: this.state.WarehouseDescription.value,
      Rackwidth: this.state.Rackwidth,
      Rackheight: this.state.Rackheight,
      NoOfRows: this.state.NoOfRows,
      RackTYPE: this.state.RackTYPE.value,
      NoOfRacks: this.state.NoOfRacks
    };
    if (this.state.Rackwidth <= 0 || this.state.Rackwidth < -1) {
      alert("Width is invalid");
      return false;
    }
    if (this.state.NoOfRows <= 0 || this.state.NoOfRows < -1) {
      alert("No of Rows is invalid");
      return false;
    }
    if (this.state.Rackheight <= 0 || this.state.Rackheight < -1) {
      alert("Height is invalid");
      return false;
    }
    if (this.state.NoOfRacks <= 0 || this.state.NoOfRacks < -1) {
      alert("No Of Rack is invalid");
      return false;
    }

    this.props.add_rack(data);
    this.setState({
      WarehouseDescription: "",
      Rackwidth: "",
      Rackheight: "",
      NoOfRows: "",
      RackTYPE: "",
      NoOfRacks: ""
    });
  };
  componentDidMount() {
    this.props.dropdown_wer_desc();
    this.props.dropdown_rack_type();
    this.props.get_Rack();
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
  onHandleDrop_wer_desc = WarehouseDescription => {
    this.setState({
      WarehouseDescription: WarehouseDescription
    });
  };
  onHandleDrop_rack_type = RackTYPE => {
    this.setState({
      RackTYPE: RackTYPE
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
    const enble =
      this.state.WarehouseDescription != "" && this.state.RackTYPE != "";
    const WarehouseDescription_array = [];
    this.props.drowpWerDescArray.map(item =>
      WarehouseDescription_array.push({
        value: item.WAREHOUSE_ID,
        label: item.WAREHOUSE_DESC
      })
    );

    const rackTyoe_array = [
      { value: "1", label: "CAGE" },
      { value: "2", label: "RACK" }
    ];

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
          value: this.props.get_rack_array.length
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
              Rack
              <small>Control panel</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <p>Home</p>
              </li>
              <li className="active"> Rack </li>
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
                      <h3 className="box-title"> Add Rack</h3>
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
                        <div className="col-sm-3">
                          <label>Warehouse:</label>
                          <Select
                            id="descId"
                            // defaultValue={marchantvalue_update[0]}
                            name="WarehouseDescription"
                            options={WarehouseDescription_array}
                            value={this.state.WarehouseDescription}
                            onChange={this.onHandleDrop_wer_desc}
                            className="basic-single"
                            classNamePrefix="select "
                            isSearchable
                            required
                            select-option
                          />
                        </div>
                        <div className="col-sm-2">
                          <label>Rack width:</label>
                          <input
                            type="number"
                            className="form-control"
                            name="Rackwidth"
                            onChange={this.onInputHandle}
                            value={this.state.Rackwidth}
                            placeholder="Rack width"
                            id="RackwidthId"
                            required
                          />
                        </div>
                        <div className="col-sm-2">
                          <label>Rack height:</label>
                          <input
                            type="number"
                            className="form-control"
                            name="Rackheight"
                            onChange={this.onInputHandle}
                            value={this.state.Rackheight}
                            placeholder="Rack height"
                            id="RackheightId"
                            required
                          />
                        </div>
                        <div className="col-sm-2">
                          <label>No Of Rows:</label>
                          <input
                            type="numder"
                            className="form-control"
                            name="NoOfRows"
                            onChange={this.onInputHandle}
                            value={this.state.NoOfRows}
                            placeholder="No Of Rows"
                            id="NoOfRowsId"
                            required
                          />
                        </div>

                        <div className="col-sm-2">
                          <label>Rack TYPE:</label>
                          <Select
                            id="merchatId"
                            // defaultValue={marchantvalue_update[0]}
                            name="RackTYPE"
                            options={rackTyoe_array}
                            value={this.state.RackTYPE}
                            onChange={this.onHandleDrop_rack_type}
                            className="basic-single"
                            classNamePrefix="select "
                            isSearchable
                            required
                            select-option
                          />
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="col-sm-2">
                          <br />
                          <label>No Of Racks:</label>
                          <input
                            type="number"
                            className="form-control"
                            name="NoOfRacks"
                            onChange={this.onInputHandle}
                            value={this.state.NoOfRacks}
                            placeholder="No Of Racks"
                            id="NoOfRacksId"
                            required
                          />
                        </div>
                        <div className="col-sm-3">
                          <br />
                          <br />
                          <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: "60%", marginTop: "3px" }}
                            disabled={!enble}
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
                        data={this.props.get_rack_array}
                      >
                        <TableHeaderColumn
                          width="12.5%"
                          isKey={true}
                          editable={false}
                          dataSort={true}
                          dataFormat={actionFormatter}
                          dataField="RACK_ID"
                        >
                          Sticker
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="12.5%"
                          editable={false}
                          export={false}
                          dataField="RACK_NO"
                        >
                          {" "}
                          Rack No{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="12.5%"
                          editable={false}
                          dataSort={true}
                          dataField="WAREHOUSE_DESC"
                        >
                          {" "}
                          WereHouse Id
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="12.5%"
                          editable={false}
                          dataSort={true}
                          dataField="RACK_TYPE"
                        >
                          {" "}
                          Rack Type
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="12.5%"
                          editable={false}
                          dataSort={true}
                          dataFormat={actionFormatter1}
                          dataField="RACK_ID"
                        >
                          {" "}
                          Row Sticker
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="12.5%"
                          editable={false}
                          dataSort={true}
                          dataField="RACK_ID"
                        >
                          {" "}
                          No Of Rows
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="12.5%"
                          editable={false}
                          dataSort={true}
                          dataField="WIDTH"
                        >
                          {" "}
                          Width
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="12.5%"
                          editable={false}
                          dataSort={true}
                          dataField="HEIGHT"
                        >
                          {" "}
                          Height
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
    drowpRackTypeArray: state.rackReducer.drowpRackTypeArray,
    drowpWerDescArray: state.rackReducer.drowpWerDescArray,
    get_rack_array: state.rackReducer.get_rack_array
  };
};
export default connect(
  mapStateToProps,
  action
)(Rack);
