import React, { Component } from "react";
import {
  BootstrapTable,
  TableHeaderColumn,
  Dropdown
} from "react-bootstrap-table";
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
  post_item_returns,
  insertedDate,
  process_Return,
  get_location,
  sellerDrop,
  downlaodReturns,
  FiterDeta_radio,
  undo_data,
  print_barcode,
  save_data_manualy,
  reasonDrop,
  filter_data_item_return,
  displayBarcode,
  process_id
} from "../../actions/ItemReturnsPostAction.js";
import { throws } from "assert";
import AlertMessage from "../../components/messages/AlertMessage.js";
const action = {
  post_item_returns,
  insertedDate,
  process_Return,
  get_location,
  sellerDrop,
  downlaodReturns,
  FiterDeta_radio,
  undo_data,
  print_barcode,
  save_data_manualy,
  reasonDrop,
  filter_data_item_return,
  displayBarcode,
  process_id
};

function actionFormatter(cell, row) {
  return (
    <div>
      {row.RETURN_PROCESSED == 0 ? (
        <button
          className="btn btn-danger btn-xs"
          data-toggle="modal"
          data-target="#myModal"
          onClick={() => that.clickDetail(cell, row)}
        >
          {" "}
          Proceed Return
        </button>
      ) : (
        ""
      )}
      {row.RETURN_PROCESSED == 1 ? (
        <div>
          <button
            className="btn btn-primary btn-xs"
            onClick={() => that.clickUndo1(cell, row)}
          >
            {" "}
            Undo Barcode
          </button>
          &nbsp; &nbsp;
          <button
            className="btn btn-warning btn-xs"
            onClick={() => that.click_print(cell, row)}
          >
            {" "}
            Print
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

function actionFormatter1(cell, row) {
  return (
    <div>
      {row.CANCEL_ID_STATUS == "TRUE" ? (
        ""
      ) : row.RETURN_ID_STATUS == "TRUE" ? (
        <div>
          <button
            className="btn btn-primary btn-xs"
            onClick={() => that.clickUndo(cell, row)}
          >
            Undo Barcode
          </button>
          &nbsp; &nbsp;
          <button
            className="btn btn-warning btn-xs"
            onClick={() => that.click_print1(cell, row)}
          >
            Print
          </button>
        </div>
      ) : (
        <button
          className="btn btn-danger btn-xs"
          onClick={() => that.clickfilter(cell, row)}
        >
          {" "}
          Select
        </button>
      )}
    </div>
  );
}

const ebayLink = (cell, row) => {
  var link = "https://www.ebay.com/itm/" + row.ITEMID;
  return (
    <a href={link} target="blank">
      {row.ITEMID}
    </a>
  );
};
var that = "";
class ItemReturns extends Component {
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
      // show: false,
      search: "",
      date: "",
      Remarks: "",
      Location: "",
      radioModel: "",
      returnId: "",
      selectMarchant: "",
      selectMarchant1: "",
      redioSearch: "",
      open1: false,
      returnFilter: "",
      open2: false,
      date1: "",
      ItemDescription: "",
      Amount: "",
      Comments: "",
      BuyerName: "",
      Reason: "",
      selectMarchant3: "",
      SelerTotalRefund: "",
      ItemId: "",
      selectMarchant2: "",
      selectreason2: "",
      Search1: "",
      filterdata: "0",
      // check_box: ["0"],
      radio_value: "equal",
      radio_Other: "",
      check_other: false,
      show_filter: true,
      filter_values: "",
      check_other_90sDays: "",
      show_90_day: true,
      TRANSACTION_ID: "",
      loader: false,
      ORDER_ID: "",
      barcode_display: "",
      defaultbox: false
    };
    that = this;
    //that.clickDelete = that.clickDelete.bind(that);
  }

  clickfilter = (cell, row) => {
    // const drop = {value:row.LZ_SELLER_ACCT_ID,label:row.LZ_SELLER_ACCT_ID };
    // console.log(row.LZ_SELLER_ACCT_ID);
    const data = this.props.merchantDropArray.filter(
      item => item.LZ_SELLER_ACCT_ID == row.LZ_SELLER_ACCT_ID
    );
    // console.log(data)
    const serData = {
      value: data[0].LZ_SELLER_ACCT_ID,
      label: data[0].SELL_ACCT_DESC
    };
    // console.log(serData);
    this.setState({
      returnid: row.RETURN_ID,
      date1: dateFormat(row.SALE_DATE, "yyyy-mm-dd"),
      ItemId: row.ITEM_ID,
      BuyerName: row.BUYER_FULLNAME,
      Amount: row.QUANTITY,
      SelerTotalRefund: row.TOTAL_PRICE.replace("$", ""),
      selectMarchant2: serData,
      TRANSACTION_ID: row.TRANSACTION_ID,
      ORDER_ID: row.ORDER_ID
    });

    $(window).scrollTop(0, 0);
    // window.scrollTop(0,0);
  };
  handleOnChangeRadio_90sDays = e => {
    // const { name, value } = e.target;
    // this.setState({
    //   [name]: value
    // });
    this.setState(prevState => ({
      show_90_day: !prevState.show_90_day
    }));
  };

  handledisplayBarcode = e => {
    this.setState(prevState => ({
      barcode_display: !prevState.barcode_display
    }));
  };
  clickUndo = (cell, row) => {
    //console.log(row);
    this.setState({
      returnId: row.RETURNID
    });
    const id = row.RETURNID;
    this.props.undo_data(id);
  };
  clickUndo1 = (cell, row) => {
    //console.log(row);
    this.setState({
      returnId: row.RETURN_ID
    });
    const id = row.RETURN_ID;
    this.props.undo_data(id);
  };
  click_print = (cell, row) => {
    //console.log(row);
    this.setState({
      returnId: row.RETURNID
    });
    const id = row.RETURNID;
    this.props.print_barcode(id);
  };
  click_print1 = (cell, row) => {
    //console.log(row);
    this.setState({
      returnId: row.RETURN_ID
    });
    const id = row.RETURN_ID;
    this.props.print_barcode(id);
  };
  clickDetail = (cell, row) => {
    //console.log(row);
    //const order_id = row.ORDER_ID;
    const id = row.ORDER_ID;
    console.log(this.props.check);

    this.props.displayBarcode(id);
    this.props.process_id(id);
    this.setState({
      returnId: row.RETURNID,
      order_id: id,
      defaultbox: true
    });
    if (this.props.check == true) {
      $("#statusCheck input[type=checkbox]").prop("checked", true);
    }
  };
  handleOnChangeRadioSearch = e => {
    this.setState({
      redioSearch: e.target.value
    });
    const id = e.target.value;
    this.props.FiterDeta_radio(id);
  };
  handleOnChangeRadioModel = event => {
    this.setState({
      radioModel: event.target.value
    });
    //console.log(this.state.radioModel)
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
  handleOnsubmit_search = e => {
    e.preventDefault();
    const data = {
      searchdDate: this.state.date,
      merchant_id: this.state.selectMarchant.value
    };
    //console.log(data);
    this.props.insertedDate(data);
  };

  componentDidMount() {
    this.props.post_item_returns();
    this.props.sellerDrop();
    this.props.reasonDrop();
    //$(window).scrollTop(0, 0);
  }
  componentWillMount() {
    if (localStorage.getItem("userName")) {
      console.log("setion find");
    } else {
      this.setState({ redirectToReferrer: true });
    }
  }

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
        radio_value : 'Like'
      })
    }else{
      $("#defaultInline3").prop("checked", false);
      $("#defaultInline4").prop("checked", true);
      this.setState({
        radio_value : 'equal'
      })
    }
    
    //$("#equalLike").prop("checked", false);
  };
  SearchData = () => {
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
      this.props.filter_data_item_return(data);
    } else {
      this.props.filter_data_item_return(data1);
    }
  };
  handleOnsubmit_manual = e => {
    e.preventDefault();
    $("#myModal .close").click();
    const id = this.state.ORDER_ID;
    const data = {
      buyername: this.state.BuyerName,
      reason: this.state.Reason,
      comments: this.state.Comments,
      date: this.state.date1,
      amount: this.state.Amount,
      daItemDescriptiont: this.state.ItemDescription,
      selectMarchant2: this.state.selectMarchant2,
      returnid: this.state.returnid,
      SelerTotalRefund: this.state.SelerTotalRefund,
      ItemId: this.state.ItemId,
      TRANSACTION_ID: this.state.TRANSACTION_ID
    };
    // console.log(data);
    this.props.displayBarcode(id);
    if (this.state.Amount <= 0 || this.state.Amount < -1) {
      alert("Cost is invalid");
      return false;
    }

    if (this.state.ItemId <= 0 || this.state.ItemId < -1) {
      alert("Item Id is invalid");
      return false;
    }
    // console.log(data);
    this.props.save_data_manualy(data);
    this.setState({
      BuyerName: "",
      Reason: "",
      Comments: "",
      date1: "",
      Amount: "",
      ItemDescription: "",
      selectMarchant2: "",
      returnid: "",
      SelerTotalRefund: "",
      ItemId: "",
      TRANSACTION_ID: ""
    });
  };

  handleModleOnsubmit = e => {
    this.updateCheckedUserIds();
    e.preventDefault();

    if (this.state.returnId) {
      var id = this.state.returnId;
    } else {
      id = this.props.returnid1;
    }
    var barcode_no = $("#statusCheck input[name=barcode_no]").val();
    const data = {
      radio_input: this.state.radioModel,
      Remarks_input: this.state.Remarks,
      location_input: $("#LocationId").val(),
      userId: localStorage.getItem("userId"),
      return_Id: id,
      barcode_no: barcode_no
    };

    //  console.log(data);

    this.props.process_Return(data);
    $("#LocationId").val("");
    $("#defaultInline1").prop("checked", false);
    $("#defaultInline2").prop("checked", false);
    this.setState({
      radioModel: "",
      Remarks: ""

      // location_input: ""
    });
    // console.log(this.props.show);
    if (this.props.show == true) {
      $("#myModal1 .close").click();
      $("#myModal .close").click();
    }
    //else{
    //   alert('sorry already exist ');
    // }
  };
  updateCheckedUserIds = elem => {
    var barcode_no = [];

    $.each($("#statusCheck input[type=checkbox]"), function() {
      if ($(this).prop("checked")) {
        barcode_no.push($(this).val());
      }
      $("#statusCheck input[name=barcode_no]").val(barcode_no);
    });
    //console.log(barcode_no);
    $("#statusCheck input[name=barcode_no]").val(barcode_no);
  };
  closeModel_resetState = e => {
    //$('#myModal').modal('hide')
    $("#myModal .close").click();
    $("#statusCheck input[type=radio]").prop("checked", false);
  };
  handlebox = e => {
    this.setState(prevState => ({
      open1: !prevState.open1
    }));
  };
  onHandlefilter_values = filter_values => {
    this.setState({
      filter_values: filter_values
    });
  };
  onChangeRadioCheck = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handlebox1 = e => {
    this.setState(prevState => ({
      open2: !prevState.open2
    }));
  };
  onHandleMarchantDrop = selectMarchant => {
    this.setState({
      selectMarchant: selectMarchant
      // id: selectMarchant.value
    });
  };
  onHandleReturnDrop1 = returnFilter => {
    this.setState({
      returnFilter: returnFilter
    });
  };
  onHandleMarchantDrop2 = selectMarchant2 => {
    this.setState({
      selectMarchant2: selectMarchant2
    });
  };
  onHandleMarchantDrop3 = selectMarchant3 => {
    this.setState({
      selectMarchant3: selectMarchant3
    });
  };
  onHandleReasontDrop = selectreason2 => {
    this.setState({
      selectreason2: selectreason2
    });
  };
  handleOnsubmit_download1 = e => {
    e.preventDefault();
    const data = {
      return_value: this.state.returnFilter.value,
      merchant_id: this.state.selectMarchant1.value
    };
    this.props.downlaodReturns(data);
  };
  onHandleMarchantDrop1 = selectMarchant1 => {
    this.setState({
      selectMarchant1: selectMarchant1
    });
  };

  customFunction = e => {
    var location_value = $("#LocationId").val();
    this.setState({
      Location: location_value
    });
    // alert("tayyab");
    // const bardcode = this.state.MasterBarcode;
    this.props.get_location(location_value);
  };
  renderShowsTotal(start, to, total) {
    return (
      <p style={{ color: "#696969" }}>
        From {start} to {to}, totals is {total}&nbsp;&nbsp;
      </p>
    );
  }
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
        this.props.filter_data_item_return(data);
      } else {
        // console.log(data1);
        this.props.filter_data_item_return(data1);
      }
    }
  }
  render() {
    const enbale =
      this.state.selectMarchant1 != "" && this.state.returnFilter != "";
    const enable2 =
      this.state.selectMarchant2 != "" && this.state.selectreason2 != "";
    const enable3 = this.state.Search1 != "";

    // console.log(this.props.merchantDropArray);
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
          value: this.props.itemReturnPostArray.length
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
    const dropMarchantvalue = [];
    // console.log(this.props.OrderData)
    this.props.merchantDropArray.map(item =>
      dropMarchantvalue.push({
        value: item.LZ_SELLER_ACCT_ID,
        label: item.SELL_ACCT_DESC
      })
    );
    const dropMarchantvalue1 = [];
    this.props.merchantDropArray.map(item =>
      dropMarchantvalue1.push({
        value: item.LZ_SELLER_ACCT_ID,
        label: item.SELL_ACCT_DESC
      })
    );
    const dropMarchantvalue2 = [];
    this.props.merchantDropArray.map(item =>
      dropMarchantvalue2.push({
        value: item.LZ_SELLER_ACCT_ID,
        label: item.SELL_ACCT_DESC
      })
    );
    const reasonvalue2 = [];
    this.props.reasonDropArray.map(item =>
      reasonvalue2.push({
        value: item.ID,
        label: item.VALUE
      })
    );
    const filterValues = [
      { value: "buyer_fullname", label: "Buyer Name" },
      { value: "user_id", label: "User Name" },
      { value: "buyer_address1", label: "Buyer Address" },
      { value: "buyer_zip", label: "Buyer Zip" }
    ];
    const dropReturnvalue1 = [
      { value: "ALL_OPEN", label: "ALL_OPEN" },
      { value: "ALL_OPEN_REPLACEMENT", label: "ALL_OPEN_REPLACEMENT" },
      { value: "ALL_OPEN_RETURN", label: "ALL_OPEN_RETURN" },
      { value: "CLOSED", label: "CLOSED" },
      { value: "ITEM_DELIVERED", label: "ITEM_DELIVERED" },
      { value: "ITEM_SHIPPED", label: "ITEM_SHIPPED" },
      { value: "RETURN_STARTED", label: "RETURN_STARTED" },
      { value: "UNKNOWN", label: "UNKNOWN" }
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
              Item Returns
              <small>Control panel</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <p>Home</p>
              </li>
              <li className="active">Item Returns </li>
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
                      <input name="barcode_no" type="hidden" />
                      <div className="modal-body">
                        <div className="col-sm-5 w3-display-container">
                          <label for="no_of_item">
                            Order Id: {this.state.order_id}
                          </label>
                          <br />

                          <label for="no_of_item">Barcodes: </label>
                          <br />

                          {this.props.Barcodes.map((item, key) => (
                            <span key={key} className="barcode_span">
                              <input
                                value={item.BARCODE_NO}
                                onChange={e => this.updateCheckedUserIds(e)}
                                type="checkbox"
                                className="barcode_input"
                                defaultChecked
                              />
                              {item.BARCODE_NO}
                            </span>
                          ))}
                        </div>
                        <div className="col-sm-12">
                          <div className="col-sm-2">
                            <label>Status:</label>
                            <br />
                            <div
                              className="custom-control custom-radio custom-control-inline"
                              style={{ display: "inline" }}
                            >
                              <input
                                type="radio"
                                className="custom-control-input"
                                id="defaultInline1"
                                name="inlineDefaultRadiosExample"
                                value="discard"
                                //checked={this.state.radioModel == "Box"}
                                onClick={this.handleOnChangeRadioModel}
                                required
                              />
                              <label
                                className="custom-control-label"
                                for="faultInline1"
                              >
                                Discard
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
                                id="defaultInline2"
                                name="inlineDefaultRadiosExample"
                                value="release"
                                // checked={this.state.radioModel == "Envelope"}
                                onClick={this.handleOnChangeRadioModel}
                                required
                              />
                              <label
                                className="custom-control-label"
                                for="defaunline2"
                              >
                                Release
                              </label>
                            </div>
                          </div>

                          <div className="col-sm-2">
                            <label>Location:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="Location"
                              onBlur={this.customFunction}
                              // onChange={this.onInputHandlerModel}
                              // value={this.state.Location}
                              placeholder="Location"
                              id="LocationId"
                            />
                          </div>
                          <div className="col-sm-5">
                            <label>Remarks:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="Remarks"
                              onChange={this.onInputHandlerModel}
                              value={this.state.Remarks}
                              placeholder=" Remarks"
                              id="RemarksId"
                            />
                          </div>
                          <br />
                          <div className="col-sm-2">
                            <button
                              type="submit"
                              className="btn btn-primary"
                              style={{ width: "45%", marginTop: "3px" }}
                              value={this.props.show}
                              // data-dismiss="modal"
                            >
                              Save
                            </button>
                            &nbsp;
                            <button
                              type="button"
                              className="btn btn-danger"
                              data-dismiss="modal"
                              onClick={this.closeModel_resetState}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer" />
                    </form>
                  </div>
                </div>
              </div>

              <div className="modal fade" id="myModal1" role="dialog">
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
                      <input name="barcode_no" type="hidden" />
                      <div className="modal-body">
                        <div className="col-sm-5 w3-display-container">
                          <label for="no_of_item">
                            Order Id: {this.state.ORDER_ID}{" "}
                          </label>
                          <br />

                          <label for="no_of_item">Barcodes: </label>
                          <br />

                          {this.props.Barcodes.map((item, key) => (
                            <span key={key} className="barcode_span">
                              <input
                                value={item.BARCODE_NO}
                                onChange={e => this.updateCheckedUserIds(e)}
                                type="checkbox"
                                className="barcode_input"
                                defaultChecked
                              />
                              {item.BARCODE_NO}
                            </span>
                          ))}
                        </div>
                        <div className="col-sm-12">
                          <div className="col-sm-2">
                            <label>Status:</label>
                            <br />
                            <div
                              className="custom-control custom-radio custom-control-inline"
                              style={{ display: "inline" }}
                            >
                              <input
                                type="radio"
                                className="custom-control-input"
                                id="defaultInline1"
                                name="inlineDefaultRadiosExample"
                                value="discard"
                                //checked={this.state.radioModel == "Box"}
                                onClick={this.handleOnChangeRadioModel}
                                required
                              />
                              <label
                                className="custom-control-label"
                                for="faultInline1"
                              >
                                Discard
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
                                id="defaultInline2"
                                name="inlineDefaultRadiosExample"
                                value="release"
                                // checked={this.state.radioModel == "Envelope"}
                                onClick={this.handleOnChangeRadioModel}
                                required
                              />
                              <label
                                className="custom-control-label"
                                for="defaunline2"
                              >
                                Release
                              </label>
                            </div>
                          </div>

                          <div className="col-sm-2">
                            <label>Location:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="Location"
                              onBlur={this.customFunction}
                              // onChange={this.onInputHandlerModel}
                              // value={this.state.Location}
                              placeholder="Location"
                              id="LocationId"
                            />
                          </div>
                          <div className="col-sm-5">
                            <label>Remarks:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="Remarks"
                              onChange={this.onInputHandlerModel}
                              value={this.state.Remarks}
                              placeholder=" Remarks"
                              id="RemarksId"
                            />
                          </div>
                          <br />
                          <div className="col-sm-3">
                            <button
                              type="submit"
                              className="btn btn-primary"
                              style={{ width: "45%", marginTop: "3px" }}
                              // data-dismiss="modal"
                              // value={this.props.show}
                            >
                              Save
                            </button>
                            &nbsp;
                            <button
                              type="button"
                              className="btn btn-danger"
                              data-dismiss="modal"
                              onClick={this.closeModel_resetState}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>

                        <div className="modal-footer" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className={this.state.open1 ? "box" : "box collapsed-box"}>
                <div className="box-header with-border">
                  <h3 className="box-title">Download Item</h3>
                  <div className="box-tools pull-right">
                    <button
                      type="button"
                      className="btn btn-box-tool"
                      data-widget="collapse"
                    >
                      <i
                        className={
                          this.state.open1 ? "fa fa-minus" : "fa fa-plus"
                        }
                        onClick={this.handlebox}
                      />
                    </button>
                  </div>
                </div>
                <div className="box-body">
                  <form
                    onSubmit={this.handleOnsubmit_download1}
                    ref={el => (this.myFormRef = el)}
                  >
                    <div className="col-sm-12">
                      <div className="col-sm-3">
                        <label>Merchant:</label>
                        <div
                          className="form-group has-feedback"
                          style={{ width: "100%" }}
                        >
                          <Select
                            id="servicetype"
                            // defaultValue={dropValue[1]}
                            name="selectPackingNamemarchant"
                            options={dropMarchantvalue1}
                            value={this.state.selectMarchant1}
                            onChange={this.onHandleMarchantDrop1}
                            className="basic-single"
                            classNamePrefix="select"
                            isSearchable
                            required
                            select-option
                            //isClearable

                            // formatGroupLabel={formatGroupLabel}
                          />
                        </div>
                      </div>
                      <div className="col-sm-3">
                        <label>Return Filter:</label>
                        <div
                          className="form-group has-feedback"
                          style={{ width: "100%" }}
                        >
                          <Select
                            id="ReternId"
                            // defaultValue={dropValue[1]}
                            name="returnFilter"
                            options={dropReturnvalue1}
                            value={this.state.returnFilter}
                            onChange={this.onHandleReturnDrop1}
                            className="basic-single"
                            classNamePrefix="select"
                            isSearchable
                            required
                            select-option
                            //isClearable

                            // formatGroupLabel={formatGroupLabel}
                          />
                        </div>
                      </div>

                      <div className="col-sm-2">
                        <br />

                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={!enbale}
                          style={{ width: "50%", marginTop: "19px" }}
                        >
                          Download{" "}
                        </button>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      {this.state.returnFilter.value == "ALL_OPEN" ? (
                        <h3>
                          {" "}
                          Specify this value to retrieve all open return
                          requests, including cases where the buyer is
                          requesting a replacement and when the buyer is
                          requesting a refund.{" "}
                        </h3>
                      ) : (
                        ""
                      )}
                      {this.state.returnFilter.value ==
                      "ALL_OPEN_REPLACEMENT" ? (
                        <h3>
                          {" "}
                          Specify this value to retrieve returns where the buyer
                          has requested a replacement item.{" "}
                        </h3>
                      ) : (
                        ""
                      )}
                      {this.state.returnFilter.value == "ALL_OPEN_RETURN" ? (
                        <h3>
                          Specify this value to retrieve returns where the buyer
                          has requested a refund.{" "}
                        </h3>
                      ) : (
                        ""
                      )}
                      {this.state.returnFilter.value == "CLOSED" ? (
                        <h3>
                          {" "}
                          Specify this value to retrieve return requests that
                          have been closed.{" "}
                        </h3>
                      ) : (
                        ""
                      )}
                      {this.state.returnFilter.value == "ITEM_DELIVERED" ? (
                        <h3>
                          {" "}
                          Specify this value to retrieve returns where the
                          seller has received the returned item.{" "}
                        </h3>
                      ) : (
                        ""
                      )}
                      {this.state.returnFilter.value == "ITEM_SHIPPED" ? (
                        <h3>
                          {" "}
                          Specify this value to retrieve returns where the buyer
                          has return shipped the item.{" "}
                        </h3>
                      ) : (
                        ""
                      )}
                      {this.state.returnFilter.value == "RETURN_STARTED" ? (
                        <h3>
                          Specify this value to retrieve newly opened returns.
                        </h3>
                      ) : (
                        ""
                      )}
                      {this.state.returnFilter.value == "UNKNOWN" ? (
                        <h3>
                          Specify this value to retrieve all open return
                          requests, including cases where the buyer is
                          requesting a replacement and when the buyer is
                          requesting a refund.
                        </h3>
                      ) : (
                        ""
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="box">
              <div className={this.state.open2 ? "box" : "box collapsed-box"}>
                <div className="box-header with-border">
                  <h3 className="box-title">Manual Entry</h3>
                  <div className="box-tools pull-right">
                    <button
                      type="button"
                      className="btn btn-box-tool"
                      data-widget="collapse"
                    >
                      <i
                        className={
                          this.state.open2 ? "fa fa-minus" : "fa fa-plus"
                        }
                        onClick={this.handlebox1}
                      />
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
                        <label
                          className="custom-control-label"
                          for="defaunline2"
                        >
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
                      <label className="pull-right">
                        {" "}
                        Older Than 90's Days:
                      </label>
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
                        type="button"
                        className="btn btn-primary"
                        style={{ width: "50%", marginTop: "3px" }}
                        onClick={() => this.SearchData()}
                        disabled={!enable3}
                      >
                        Search{" "}
                      </button>
                    </div>
                  </div>
                  <form
                    id="Formid"
                    onSubmit={this.handleOnsubmit_manual}
                    ref={el => (this.myFormRef = el)}
                  >
                    <div className="col-sm-12">
                      <div className="col-sm-2">
                        <label>Seler Name:</label>
                        <div
                          className="form-group has-feedback"
                          style={{ width: "100%" }}
                        >
                          <Select
                            id="servicetype"
                            // defaultValue={dropValue[1]}
                            name="selectMarchant2"
                            options={dropMarchantvalue2}
                            value={this.state.selectMarchant2}
                            onChange={this.onHandleMarchantDrop2}
                            className="basic-single"
                            classNamePrefix="select"
                            isSearchable
                            required
                            select-option
                            //isClearable

                            // formatGroupLabel={formatGroupLabel}
                          />
                        </div>
                      </div>
                      <div className="col-sm-2">
                        <label>Return Id:</label>
                        <input
                          type="number"
                          className="form-control"
                          name="returnid"
                          onChange={this.onInputHandler}
                          value={this.state.returnid}
                          placeholder="Return id"
                          id="returnId"
                        />
                      </div>
                      <div className="col-sm-2">
                        <label>Return Date:</label>
                        <div className="input-group">
                          <Flatpickr
                            options={{
                              //mode: "range",
                              // minDate: 'today',
                              dateFormat: "Y-m-d",
                              name: "name"
                            }}
                            value={this.state.date1}
                            onChange={date1 => {
                              this.setState({ date1 });
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-sm-2">
                        <label>Ebay Id:</label>
                        <input
                          type="number"
                          className="form-control"
                          name="ItemId"
                          onChange={this.onInputHandler}
                          value={this.state.ItemId}
                          placeholder="Item Id"
                          id="Item_Id"
                          required
                          //max="12"
                        />
                      </div>
                      <div className="col-sm-2">
                        <label>Buyer Name:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="BuyerName"
                          onChange={this.onInputHandler}
                          value={this.state.BuyerName}
                          placeholder="Buyer Name"
                          id="BuyerNameId"
                        />
                      </div>
                      <div className="col-sm-2">
                        <label>Return Quantity:</label>
                        <input
                          type="number"
                          className="form-control"
                          name="Amount"
                          onChange={this.onInputHandler}
                          value={this.state.Amount}
                          placeholder="Amount"
                          id="AmountId"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-sm-12">
                      <div className="col-sm-2">
                        <br />
                        <label>Refund Amount:</label>
                        <input
                          type="number"
                          className="form-control"
                          name="SelerTotalRefund"
                          onChange={this.onInputHandler}
                          value={this.state.SelerTotalRefund}
                          placeholder="Seler Total Refund"
                          id="SelerTotalRefundId"
                          required
                        />
                      </div>

                      <div className="col-sm-3">
                        <br />
                        <label> Buyer Comments:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="Comments"
                          onChange={this.onInputHandler}
                          value={this.state.Comments}
                          placeholder="Comments"
                          id="CommentsId"
                        />
                      </div>

                      <div className="col-sm-2">
                        <br />
                        <label> Buyer Return Reason:</label>
                        <div
                          className="form-group has-feedback"
                          style={{ width: "100%" }}
                        >
                          <Select
                            id="servicetype"
                            // defaultValue={dropValue[1]}
                            name="selectrreason2"
                            options={reasonvalue2}
                            value={this.state.selectreason2}
                            onChange={this.onHandleReasontDrop}
                            className="basic-single"
                            classNamePrefix="select"
                            isSearchable
                            required
                            select-option
                            //isClearable

                            // formatGroupLabel={formatGroupLabel}
                          />
                        </div>
                      </div>

                      <div className="col-sm-2">
                        <br />
                        <br />
                        <button
                          type="submit"
                          className="btn btn-warning"
                          style={{ width: "50%", marginTop: "19px" }}
                          data-toggle="modal"
                          data-target="#myModal1"
                          disabled={!enable2}
                        >
                          Save{" "}
                        </button>
                      </div>
                      <div className="col-sm-2">
                        <br />
                        {/* <label>Transaction Id:</label> */}
                        <input
                          type="hidden"
                          className="form-control"
                          name="TRANSACTION_ID"
                          onChange={this.onInputHandler}
                          value={this.state.TRANSACTION_ID}
                          placeholder="TRANSACTION_ID"
                          id="SelerTotalRefundId"
                          // required
                          // hidden
                        />
                      </div>
                      <div className="col-sm-2">
                        <br />
                        {/* <label>Transaction Id:</label> */}
                        <input
                          type="hidden"
                          className="form-control"
                          name="ORDER_ID"
                          onChange={this.onInputHandler}
                          value={this.state.ORDER_ID}
                          placeholder="ORDER_ID"
                          id="ORDER_ID"
                          // required
                          // hidden
                        />
                      </div>
                    </div>
                  </form>
                  {this.props.filteredArray !== [] ? (
                    <div
                      className="row"
                      style={{ height: "100%", overflow_x: "scroll" }}
                    >
                      <div className="col-sm-12">
                        <div className="box">
                          <br />

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
                                dataFormat={actionFormatter1}
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
                                editable={false}
                                export={false}
                                // dataFormat={ebayLink}
                                dataField="BUYER_PHONE_NUMBER"
                                width="5.263%"
                              >
                                {" "}
                                Phone Number{" "}
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
                                dataField="BUYER_ZIP"
                                tdStyle={{ whiteSpace: "normal" }}
                                width="5.263%"
                              >
                                Zip Code{" "}
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
                                dataField="TOTAL_PRICE"
                                width="4%"
                              >
                                Total Price{" "}
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
                              {/* <TableHeaderColumn
                editable={false}
                ordering={true}
                dataSort={true}
                dataField="TRACKING_NUMBER"
                width="12%"
              >
                Tracking Number{" "}
              </TableHeaderColumn> */}
                              <TableHeaderColumn
                                editable={false}
                                ordering={true}
                                dataSort={true}
                                dataField="SALES_RECORD_NUMBER"
                                width="6%"
                              >
                                Sale Record Number{" "}
                              </TableHeaderColumn>
                              {/* <TableHeaderColumn
                editable={false}
                ordering={true}
                dataSort={true}
                dataField="ITEM_ID"
                width="6%"
              >
                Item Id{" "}
              </TableHeaderColumn> */}
                              {/* <TableHeaderColumn
                editable={false}
                ordering={true}
                dataSort={true}
                dataField="TRACKING_NUMBER"
                width="5.263%"
              >
                Tracking Number{" "}
              </TableHeaderColumn> */}

                              <TableHeaderColumn
                                editable={false}
                                ordering={true}
                                dataSort={true}
                                dataField="BUYER_ADDRESS1"
                                width="5.263%"
                              >
                                Buyer Adress{" "}
                              </TableHeaderColumn>
                            </BootstrapTable>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="box">
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
                <form
                  onSubmit={this.handleOnsubmit_search}
                  ref={el => (this.myFormRef = el)}
                >
                  <div className="col-sm-12">
                    <div className="col-sm-3">
                      <label>Merchant:</label>
                      <div
                        className="form-group has-feedback"
                        style={{ width: "100%" }}
                      >
                        <Select
                          id="servicetype"
                          // defaultValue={dropValue[1]}
                          name="selectPackingNamemarchant"
                          options={dropMarchantvalue}
                          value={this.state.selectMarchant}
                          onChange={this.onHandleMarchantDrop}
                          className="basic-single"
                          classNamePrefix="select"
                          isSearchable
                          required
                          select-option
                          isClearable
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
                            name: "name"
                          }}
                          value={this.state.date}
                          onChange={date => {
                            this.setState({ date });
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-sm-2">
                      <br />

                      <button
                        type="submit"
                        className="btn btn-danger glyphicon glyphicon-search"
                        style={{ width: "45%", marginTop: "3px" }}
                      />
                    </div>
                    <div className="col-sm-4">
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
                          value="0"
                          onClick={this.handleOnChangeRadioSearch}
                        />
                        <label
                          className="custom-control-label"
                          for="faultInline1"
                        >
                          Process Return
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
                          value="1"
                          onClick={this.handleOnChangeRadioSearch}
                        />
                        <label
                          className="custom-control-label"
                          for="defaunline2"
                        >
                          Undo Barcode
                        </label>
                        &nbsp;&nbsp;&nbsp;
                        <input
                          type="radio"
                          className="custom-control-input"
                          id="defaultInline4"
                          name="inlineDefaultRadiosExample"
                          value="all"
                          onClick={this.handleOnChangeRadioSearch}
                        />
                        <label
                          className="custom-control-label"
                          for="defaunline2"
                        >
                          All
                        </label>
                      </div>
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
                        data={this.props.itemReturnPostArray}
                      >
                        <TableHeaderColumn
                          editable={false}
                          dataSort={true}
                          dataFormat={actionFormatter}
                          dataField="RETURNID"
                          width="8.33%"
                        >
                          Actions
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          editable={false}
                          dataSort={true}
                          dataField="RETURNID"
                          width="8.33%"
                        >
                          {" "}
                          Return Id
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          editable={false}
                          dataSort={true}
                          dataField="BUYERLOGINNAME"
                          width="8.33%"
                        >
                          {" "}
                          Buyer Name
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          editable={false}
                          export={false}
                          dataFormat={ebayLink}
                          dataField="ITEMID"
                          width="8.33%"
                        >
                          {" "}
                          Item Id{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          isKey={true}
                          editable={false}
                          dataSort={true}
                          dataField="TRANSACTIONID"
                          width="8.33%"
                        >
                          Transaction Id{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          editable={false}
                          ordering={true}
                          dataSort={true}
                          dataField="REASON"
                          tdStyle={{ whiteSpace: "normal" }}
                          width="8.33%"
                        >
                          Reason{" "}
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          editable={false}
                          ordering={true}
                          dataSort={true}
                          dataField="COMMENTS"
                          tdStyle={{ whiteSpace: "normal" }}
                          width="8.33%"
                        >
                          Comments{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          editable={false}
                          ordering={true}
                          dataSort={true}
                          dataField="CREATIONDATE"
                          width="8.33%"
                        >
                          Dated{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          editable={false}
                          ordering={true}
                          dataSort={true}
                          dataField="SELLERTOTALREFUND"
                          width="8.33%"
                        >
                          Amount{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          editable={false}
                          ordering={true}
                          dataSort={true}
                          dataField="EBAY_ITEM_DESC"
                          width="8.33%"
                        >
                          Item Description{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          editable={false}
                          ordering={true}
                          dataSort={true}
                          dataField="SELLERLOGINNAME"
                          width="8.33%"
                        >
                          Acount Name{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          editable={false}
                          ordering={true}
                          dataSort={true}
                          dataField="BARCODES"
                          width="8.33%"
                        >
                          Barcode{" "}
                        </TableHeaderColumn>
                      </BootstrapTable>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <AlertMessage />
        </React.Fragment>
      );
    }
  }
}

const mapsToprops = state => {
  return {
    itemReturnPostArray: state.ItemReturnsPostReducer.itemReturnPostArray,
    merchantDropArray: state.ItemReturnsPostReducer.merchantDropArray,
    reasonDropArray: state.ItemReturnsPostReducer.reasonDropArray,
    filteredArray: state.ItemReturnsPostReducer.filteredArray,
    show: state.ItemReturnsPostReducer.show,
    returnid1: state.ItemReturnsPostReducer.returnid1,
    Barcodes: state.ItemReturnsPostReducer.Barcodes,
    prosse_id_array: state.ItemReturnsPostReducer.prosse_id_array,
    check: state.ItemReturnsPostReducer.check
  };
};
export default connect(
  mapsToprops,
  action
)(ItemReturns);
