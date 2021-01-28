import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import $ from "jquery";
import swal from "sweetalert";
import Select from "react-select";
import {
  Filter_Data_Item_Return_add_info,
  add_tracking_no,
  local_pic_up
} from "../../actions/add_info_action.js";
import AlertMessage from "../../components/messages/AlertMessage.js";

const action = {
  Filter_Data_Item_Return_add_info,
  add_tracking_no,
  local_pic_up
};

function actionFormatter(cell, row) {
  return (
    <div>
      <button
        className="btn btn-primary btn-xs"
        title="Add Tracking No"
        data-toggle="modal"
        data-target="#myModal"
        onClick={() => that.clickUpdate(cell, row)}
      >
        Add
      </button>
      &nbsp; &nbsp; &nbsp;
      {/* {that.props.localArray.status == false ? '': */}
      {row.TRACKING_NUMBER == "00000000000000000000000" ? (
        <button
          className="btn btn-danger btn-xs"
          title=" Already Local Pick Up"
          onClick={() => that.click_LocalPickUp(cell, row)}
          disabled
        >
          Local Pick Up
        </button>
      ) : (
        <button
          className="btn btn-warning btn-xs"
          title="Local Pick Up"
          onClick={() => that.click_LocalPickUp(cell, row)}
        >
          Local Pick Up
        </button>
      )}
      {/* } */}
    </div>
  );
}
var that = "";
class Add_info extends Component {
  constructor(props) {
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    super(props);

    this.state = {
      error: null,
      isLoaded: true,
      baseUrl: finalurl,
      redirectToReferrer: false,
      show_filter: true,
      Search1: "",
      filterdata: "0",
      radio_value: "equal",
      show_90_day: true,
      filter_values: "",
      TrackingNo: "",
      SaleRecordNo: "",
      ExtendedOrderId: "",
      EbayId: "",
      BuyerName: "",
      Quantity: "",
      SaleDate: "",
      Adress: "",
      OrderId: "",
      Title: ""
    };
    that = this;
  }
  clickUpdate = (cell, row) => {
    //console.log(row);
    this.setState({
      SaleRecordNo: row.SALES_RECORD_NUMBER,
      ExtendedOrderId: row.EXTENDEDORDERID,
      EbayId: row.ITEM_ID,
      BuyerName: row.BUYER_FULLNAME,
      Adress: row.BUYER_ADDRESS1,
      SaleDate: row.SALE_DATE,
      Quantity: row.QUANTITY,
      OrderId: row.ORDER_ID,
      Title: row.ITEM_TITLE,
      TrackingNo: row.TRACKING_NUMBER
    });
    const id = row.ORDER_ID;
    console.log(id);

    // this.props.undo_data(id);
  };
  click_LocalPickUp = (cell, row) => {
    const data = {
      user_id: localStorage.getItem("userId"),
      oerderid: row.ORDER_ID
    };
    swal({
      title: row.TRACKING_NUMBER,
      text: "Are you Sure To mark this order/Tracking Number as Local Pic Up?",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        this.props.local_pic_up(data);
      } else {
      }
    });
  };
  handleOnChangeRadio_90sDays = e => {
    this.setState(prevState => ({
      show_90_day: !prevState.show_90_day
    }));
  };
  onInputHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onInputHandlerModel = e => {
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
  onChangeRadioCheck = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  // componentDidMount(){
  //   this.props.local_pic_up()
  // }
  SearchData = e => {
    const data = {
      radio_value: this.state.radio_value,
      show_filter: this.state.show_filter,
      filterdata_radio: this.state.filterdata,
      search_data: this.state.Search1,
      older_90: this.state.show_90_day
    };
    const data1 = {
      show_filter: this.state.show_filter,
      search_data: this.state.Search1,
      filter_value: this.state.filter_values,
      radio_value: this.state.radio_value,
      older_90: this.state.show_90_day
    };
    //console.log(data1);
    //console.log(data);
    if (this.state.show_filter == true) {
      this.props.Filter_Data_Item_Return_add_info(data);
    } else {
      this.props.Filter_Data_Item_Return_add_info(data1);
    }
    // const data = {
    //   Search1: this.state.Search1,
    //   filterdata: this.state.filterdata
    // };
    console.log(data);
  };
  handleOnChangeRadiolike = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  handleOnChangeRadio_Other = e => {
    this.setState(prevState => ({
      check_other: !prevState.check_other
    }));
    //console.log(this.state.check_other);
    if (this.state.check_other == false) {
      $("#defaultInline3").prop("checked", true);
      $("#defaultInline4").prop("checked", false);
      this.setState({
        radio_value: "Like"
      });
    } else {
      $("#defaultInline3").prop("checked", false);
      $("#defaultInline4").prop("checked", true);
      this.setState({
        radio_value: "equal"
      });
    }

    //$("#equalLike").prop("checked", false);
  };
  closeModel_resetState = e => {
    //$('#myModal').modal('hide')
    $("#myModal .close").click();
    $("#statusCheck input[type=radio]").prop("checked", false);
  };
  onHandlefilter_values = filter_values => {
    this.setState({
      filter_values: filter_values
    });
  };
  handleModleOnsubmit = e => {
    e.preventDefault();
    const data = {
      tracking: this.state.TrackingNo,
      orderid: this.state.OrderId,
      user_id: localStorage.getItem("userId")
    };
    this.props.add_tracking_no(data);
    this.setState({
      TrackingNo: ""
    });
  };

  componentDidUpdate(prevPorps, prevState) {
    if (prevPorps.show !== this.props.show) {
      this.setState({
        loader: this.props.show
      });
    }
    if (prevState.barcode_display !== this.state.barcode_display) {
      this.setState({
        barcode_display: !prevState.barcode_display
      });
    }
    if (
      prevState.check_other !== this.state.check_other &&
      this.state.check_other !== ""
    ) {
      this.setState(prevState => ({
        show_filter: !prevState.show_filter
      }));
    }
    if (prevState.show_90_day !== this.state.show_90_day) {
      const data = {
        radio_value: this.state.radio_value,
        show_filter: this.state.show_filter,
        // check_box: this.state.check_box,
        filterdata_radio: this.state.filterdata,
        search_data: this.state.Search1,
        older_90: this.state.show_90_day
      };
      const data1 = {
        show_filter: this.state.show_filter,
        search_data: this.state.Search1,
        filter_value: this.state.filter_values,
        radio_value: this.state.radio_value,
        older_90: this.state.show_90_day
      };
      if (this.state.show_filter == true) {
        //console.log(data);
        this.props.Filter_Data_Item_Return_add_info(data);
      } else {
        // console.log(data1);
        this.props.Filter_Data_Item_Return_add_info(data1);
      }
    }
  }

  render() {
    //console.log(this.row.TRACKING_NUMBER == '00000000000000000000000')
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
          value: this.props.filteredArray.length
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
    const filterValues = [
      { value: "buyer_fullname", label: "Buyer Name" },
      { value: "user_id", label: "User Name" },
      { value: "buyer_address1", label: "Buyer Address" },
      { value: "buyer_zip", label: "Buyer Zip" }
    ];
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
              Add Info
              <small>Control panel</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <p>Home</p>
              </li>
              <li className="active"> Add Info </li>
            </ol>
          </section>

          <section className="content">
            <div className="box">
              <div className="modal fade" id="myModal" role="dialog">
                <div className="modal-dialog" style={{ width: "80%" }}>
                  <div className="modal-content">
                    <div className="modal-header">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                      />
                      <h4 className="modal-title">Item Status </h4>
                    </div>
                    <form id="statusCheck" onSubmit={this.handleModleOnsubmit}>
                      <div className="modal-body">
                        <div className="col-sm-12">
                          <div className="col-sm-2">
                            <label>Sale Record No:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="SaleRecordNo"
                              onChange={this.onInputHandlerModel}
                              value={this.state.SaleRecordNo}
                              placeholder="Sale Record No"
                              id="SaleRecordNoId"
                              readOnly
                            />
                          </div>
                          <div className="col-sm-2">
                            <label>Extended Order Id:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="ExtendedOrderId"
                              onChange={this.onInputHandlerModel}
                              value={this.state.ExtendedOrderId}
                              placeholder="Extended Order Id"
                              id="SaleRecordNoId"
                              readOnly
                            />
                          </div>
                          <div className="col-sm-2">
                            <label>Ebay Id:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="EbayId"
                              onChange={this.onInputHandlerModel}
                              value={this.state.EbayId}
                              placeholder="Ebay Id"
                              id="EbayId"
                              readOnly
                            />
                          </div>
                          <div className="col-sm-2">
                            <label>Buyer Name:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="BuyerName"
                              onChange={this.onInputHandlerModel}
                              value={this.state.BuyerName}
                              placeholder="BuyerName"
                              id="BuyerNameid"
                              readOnly
                            />
                          </div>
                          <div className="col-sm-4">
                            <label>Title:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="Title"
                              onChange={this.onInputHandlerModel}
                              value={this.state.Title}
                              placeholder="Title"
                              id="Titleid"
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="col-sm-2">
                            <label>Adress:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="Adress"
                              onChange={this.onInputHandlerModel}
                              value={this.state.Adress}
                              placeholder="Adress"
                              id="Adressid"
                              readOnly
                            />
                          </div>
                          <div className="col-sm-2">
                            <label>Sale Date:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="SaleDate"
                              onChange={this.onInputHandlerModel}
                              value={this.state.SaleDate}
                              placeholder="Sale Date"
                              id="SaleDateid"
                              readOnly
                            />
                          </div>
                          <div className="col-sm-2">
                            <label>Quantity:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="Quantity"
                              onChange={this.onInputHandlerModel}
                              value={this.state.Quantity}
                              placeholder="Quantity"
                              id="Quantityid"
                              readOnly
                            />
                          </div>
                          <div className="col-sm-2">
                            <label>Tracking No:</label>
                            <input
                              type="number"
                              className="form-control"
                              name="TrackingNo"
                              onChange={this.onInputHandlerModel}
                              value={this.state.TrackingNo}
                              placeholder="Tracking No"
                              id="TrackingNoId"
                              required
                            />
                          </div>
                          <div className="col-sm-2">
                            <br />
                            <br />
                            <button
                              type="submit"
                              className="btn btn-primary"
                              style={{ width: "45%", marginTop: "3px" }}
                              // value={this.props.show}
                              // data-dismiss="modal"
                              onClick={this.closeModel_resetState}
                            >
                              Save
                            </button>
                            &nbsp; &nbsp;
                            <button
                              type="button"
                              className="btn btn-danger"
                              data-dismiss="modal"
                              // onClick={this.closeModel_resetState}
                            >
                              Cancel
                            </button>
                          </div>
                          <div className="col-sm-2">
                            <input
                              type="hidden"
                              className="form-control"
                              name="OrderId"
                              onChange={this.onInputHandlerModel}
                              value={this.state.OrderId}
                              placeholder="Extended Order Id"
                              id="SaleRecordNoId"
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer" />
                    </form>
                  </div>
                </div>
              </div>

              <div className="box-header with-border">
                <h3 className="box-title">Search</h3>
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
                        name="radio_value"
                        value="Like"
                        onChange={this.handleOnChangeRadiolike}
                      />
                      <label
                        className="custom-control-label"
                        for="faultInline1"
                      >
                        Like
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
                        name="radio_value"
                        value="equal"
                        onChange={this.handleOnChangeRadiolike}
                        defaultChecked="equal"
                      />
                      <label className="custom-control-label" for="defaunline2">
                        Equal
                      </label>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <label> Search By Other:</label>
                    <br />
                    <div
                      className="custom-control custom-radio custom-control-inline"
                      style={{ display: "inline" }}
                    >
                      <input
                        type="checkbox"
                        name="check_other"
                        value="other"
                        onChange={this.handleOnChangeRadio_Other}
                      />
                      <label
                        className="custom-control-label"
                        for="faultInline1"
                      >
                        Other
                      </label>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <label className="pull-right"> Older Than 90's Days:</label>
                    <br />
                    <br />

                    <div
                      className="custom-control custom-radio custom-control-inline pull-right"
                      style={{ display: "inline" }}
                    >
                      <input
                        type="checkbox"
                        name="check_other_90sDays"
                        value="old"
                        onChange={this.handleOnChangeRadio_90sDays}
                      />
                      <label
                        className="custom-control-label"
                        for="faultInline1"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-12">
                  {/* <form onSubmit={this.handleChangebutton}> */}
                  <div className="col-sm-2">
                    <label>Search:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="Search1"
                      onChange={this.onInputHandler}
                      value={this.state.Search1}
                      placeholder="Search"
                      id="SearchId"
                      required
                    />
                  </div>
                  {this.state.show_filter == false ? (
                    <div className="col-sm-3">
                      <label>Search By:</label>
                      <div
                        className="form-group has-feedback"
                        style={{ width: "100%" }}
                      >
                        <Select
                          id="filter_values"
                          // defaultValue={dropValue[1]}
                          // isMulti
                          name="filter_values"
                          options={filterValues}
                          value={this.state.filter_values}
                          onChange={this.onHandlefilter_values}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          isSearchable
                          required
                          select-option
                          isClearable

                          // formatGroupLabel={formatGroupLabel}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="col-sm-6">
                      <br />
                      <br />
                      <input
                        type="radio"
                        name="filterdata"
                        value="0"
                        onChange={this.onChangeRadioCheck}
                        defaultChecked="0"
                      />{" "}
                      &nbsp; Sales Record Number &nbsp;&nbsp;
                      <input
                        type="radio"
                        name="filterdata"
                        value="1"
                        onChange={this.onChangeRadioCheck}
                      />{" "}
                      &nbsp; ExtendedOrder Id &nbsp;&nbsp;&nbsp;
                      <input
                        type="radio"
                        name="filterdata"
                        value="2"
                        onChange={this.onChangeRadioCheck}
                      />{" "}
                      &nbsp; Item Id &nbsp;&nbsp;&nbsp;
                      <input
                        type="radio"
                        name="filterdata"
                        value="3"
                        onChange={this.onChangeRadioCheck}
                      />{" "}
                      &nbsp; Tracking Number &nbsp;&nbsp;&nbsp;
                    </div>
                  )}
                  <div className="col-sm-2">
                    <br />
                    <br />
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ width: "50%", marginTop: "3px" }}
                      onClick={() => this.SearchData()}
                      //disabled={!enable3}
                    >
                      Search{" "}
                    </button>
                  </div>
                  {/* </form> */}
                </div>
              </div>
            </div>
            <div className="box">
              <div
                className="row"
                style={{ height: "100%", overflow_x: "scroll" }}
              >
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
                    data={this.props.filteredArray}
                  >
                    <TableHeaderColumn
                      editable={false}
                      dataSort={true}
                      dataFormat={actionFormatter}
                      dataField="ORDER_ID"
                      width="5%"
                    >
                      Seler Record Number
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      editable={false}
                      dataSort={true}
                      dataField="SALES_RECORD_NUMBER"
                      width="5%"
                    >
                      Seler Record Number
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      editable={false}
                      dataSort={true}
                      dataField="USER_ID"
                      width="5.263%"
                    >
                      {" "}
                      User Id
                    </TableHeaderColumn>

                    <TableHeaderColumn
                      editable={false}
                      dataSort={true}
                      dataField="BUYER_FULLNAME"
                      width="5.263%"
                    >
                      {" "}
                      Buyer Name
                    </TableHeaderColumn>

                    <TableHeaderColumn
                      isKey={true}
                      editable={false}
                      dataSort={true}
                      dataField="BUYER_ADDRESS1"
                      width="9%"
                    >
                      Adress{" "}
                    </TableHeaderColumn>

                    <TableHeaderColumn
                      editable={false}
                      ordering={true}
                      dataSort={true}
                      dataField="ITEM_ID"
                      tdStyle={{ whiteSpace: "normal" }}
                      width="7%"
                    >
                      Item Id{" "}
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      editable={false}
                      ordering={true}
                      dataSort={true}
                      dataField="ITEM_TITLE"
                      width="7%"
                    >
                      Title{" "}
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      editable={false}
                      ordering={true}
                      dataSort={true}
                      dataField="QUANTITY"
                      width="2%"
                    >
                      Qty{" "}
                    </TableHeaderColumn>

                    <TableHeaderColumn
                      editable={false}
                      ordering={true}
                      dataSort={true}
                      dataField="SALE_DATE"
                      width="4%"
                    >
                      Sale Date{" "}
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      editable={false}
                      ordering={true}
                      dataSort={true}
                      dataField="EXTENDEDORDERID"
                      width="6%"
                    >
                      Extendet Order Id{" "}
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      editable={false}
                      ordering={true}
                      dataSort={true}
                      dataField="TRACKING_BY"
                      width="6%"
                    >
                      Tracking BY{" "}
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      editable={false}
                      ordering={true}
                      dataSort={true}
                      dataField="TRACKING_NUMBER"
                      width="6%"
                    >
                      Tracking Number{" "}
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      editable={false}
                      ordering={true}
                      dataSort={true}
                      dataField="TRACKING_DATE"
                      width="6%"
                    >
                      Tracking Date{" "}
                    </TableHeaderColumn>
                  </BootstrapTable>
                </div>
              </div>
            </div>
            <AlertMessage />
          </section>
        </React.Fragment>
      );
    }
  }
}

const mapsToprops = state => {
  return {
    filteredArray: state.add_info_reducer.filteredArray,
    trackingArray: state.add_info_reducer.trackingArray,
    localArray: state.add_info_reducer.localArray
  };
};
export default connect(
  mapsToprops,
  action
)(Add_info);
