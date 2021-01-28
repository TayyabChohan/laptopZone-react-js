import React, { Component } from "react";
import {
  BootstrapTable,
  TableHeaderColumn,
  Dropdown
} from "react-bootstrap-table";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import loadjs from "loadjs";
import Select from "react-select";
import swal from "sweetalert";
import $ from "jquery";
import {
  last_ten_barcode,
  get_master_Barcode,
  get_master_detail,
  get_object_DrowpDown,
  get_condition_DrowpDown,
  get_bin_DrowpDown,
  updateWeight,
  updateDekittingRemarks,
  updateMasterDetial,
  deleteMasterDetail,
  saveMasterDetail,
  print_us_pk
} from "../actions/deKittingUsAction.js";

const action = {
  last_ten_barcode,
  get_master_Barcode,
  get_master_detail,
  get_object_DrowpDown,
  get_condition_DrowpDown,
  get_bin_DrowpDown,
  updateWeight,
  updateDekittingRemarks,
  updateMasterDetial,
  deleteMasterDetail,
  saveMasterDetail,
  print_us_pk
};
let getUrl = window.location;
let finalurl = getUrl.protocol + "//" + getUrl.hostname;

const onAfterSaveCell = (row, cellName, cellValue) => {
  // console.log(row.WEIGHT)
  if (row.LZ_DEKIT_US_DT_ID) {
    const data = {
      WEIGHT: row.WEIGHT,
      LZ_DEKIT_US_DT_ID: row.LZ_DEKIT_US_DT_ID
    };

    that.props.updateWeight(data);
  }

  if (row.LZ_DEKIT_US_DT_ID) {
    const data2 = {
      DEKIT_REMARKS: row.DEKIT_REMARKS,
      LZ_DEKIT_US_DT_ID: row.LZ_DEKIT_US_DT_ID
      //   user_id: sessionStorage.getItem('userId')
    };
    that.props.updateDekittingRemarks(data2);
  }
};

const onBeforeSaveCell = (row, cellName, cellValue) => {
  let value;
  if (cellName == "WEIGHT") {
    return value;
  }
  if (cellName == "DEKIT_REMARKS") {
    return value;
  }
  //console.log(value)
  // return cellValue >
};

const cellEditProp = {
  mode: "click",
  blurToSave: true,
  beforeSaveCell: onBeforeSaveCell, // a hook for before saving cell
  afterSaveCell: onAfterSaveCell
};
function actionFormatter(cell, row) {
  return (
    <div>
      <button
        className="btn btn-danger btn-xs"
        onClick={() => that.clickDelete(cell, row)}
      >
        {" "}
        <span className="glyphicon glyphicon-trash p-b-5" aria-hidden="true" />
      </button>
      &nbsp;
      <a
        href={`${finalurl}/laptopzone/reactControllertest/c_react_test/print_us_pk?id=${
          row.LZ_DEKIT_US_DT_ID
        }`}
        className="btn btn-primary btn-xs"
        target="_blank"
        getSellerOrders
        // onClick={() => that.clickPrint(cell, row)}
      >
        <span className="glyphicon glyphicon-print p-b-5" aria-hidden="true" />
      </a>
      &nbsp;
      <button
        type="button"
        className="btn btn-warning btn-xs"
        data-target="#myModal1"
        data-toggle="modal"
        id="myModal1"
        onClick={() => that.clickToUpdate(cell, row)}
      >
        <span className="glyphicon glyphicon-pencil p-b-5" aria-hidden="true" />
      </button>
    </div>
  );
}

var that = "";
class DeKittingUs extends Component {
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
      Qty: "1",
      Item: "",
      MasterBarcode: "",
      Condition: "",
      MPN: "",
      selectedbarcode: [],
      BARCODE_NO: "",
      COND_NAME: "",
      CONDITIONS_SEG5: "",
      ITEM_MT_MANUFACTURE: "",
      ITEM_MT_MFG_PART_NO: "",
      ITEM_MT_UPC: "",
      valueBarcode: "",
      labelused: "",
      labelManufature: "",
      labelmpn: "",
      labelITEM_MT_UPC: "",
      selectBin: "",
      selectCondition: "",
      selectObjcet: "",
      LZ_DEKIT_US_DT_ID: "",
      Weight: "",
      DekittingRemarks: "",
      selectObjcetUpdate: "",
      selectConditionUpdate: "",
      WeightUpdate: "",
      selectBinUpdate: "",
      DekittingRemarksUpdate: "",
      CONDITION_ID: ""
    };
    that = this;
  }
  clickDelete = cell => {
    swal({
      title: "Are you Sure?",
      text: "Once deleted, you will not be able to recover this Data!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        this.props.deleteMasterDetail(cell);
      } else {
      }
    });
  };
  // componentWillMount() {

  //   var loadjs = require("loadjs");
  //   loadjs(["../assets/byTAYYAB/onBlurFunctiion.js"], function() {});
  //   const bardcode = this.state.MasterBarcode;
  //   this.props.get_master_Barcode(bardcode);
  //    this.props.get_master_detail(bardcode);
  //   }

  //  myFunction=()=> {
  //     var x = document.getElementById("FirstNameId");
  //     // x.value = x.value.toUpperCase();
  //      //alert(x);
  //      const bardcode = this.state.MasterBarcode;
  //      this.props.get_master_Barcode(bardcode);
  //      this.props.get_master_detail(bardcode);
  //   }
  clickPrint = (cell, row) => {
    // console.log(row.LZ_DEKIT_US_DT_ID)
    const id = row.LZ_DEKIT_US_DT_ID;
    this.props.print_us_pk(id);
  };
  clickToUpdate = (cell, row) => {
    const conditiondata = { value: row.CONDITION_ID, label: row.COND_NAME };
    const Bindata = { value: row.BIN_ID, label: row.BIN_NO };
    const objectdata = { value: row.OBJECT_ID, label: row.OBJECT_NAME };
    console.log(row);
    this.setState({
      selectObjcet: objectdata,
      selectCondition: conditiondata,
      Weight: row.WEIGHT,
      DekittingRemarks: row.DEKIT_REMARKS,
      selectBin: Bindata,
      LZ_DEKIT_US_DT_ID: row.LZ_DEKIT_US_DT_ID
    });
  };

  handleDrowpObjectUpdate = selectObjcetUpdate => {
    this.setState({
      selectObjcetUpdate: selectObjcetUpdate
    });
  };

  handleDrowpconditionUpdate = selectConditionUpdate => {
    this.setState({
      selectConditionUpdate: selectConditionUpdate
    });
  };
  handleDrowpObject = selectObjcet => {
    this.setState({
      selectObjcet: selectObjcet
    });
  };
  handleDrowpcondition = selectCondition => {
    this.setState({
      selectCondition: selectCondition
    });
  };
  handleDrowpBin = selectBin => {
    this.setState({
      selectBin: selectBin
    });
  };

  selectBinUpdate = selectBinUpdate => {
    this.setState({
      selectBinUpdate: selectBinUpdate
    });
  };
  handleDrowpBinUpdate = selectBinUpdate => {
    this.setState({
      selectBinUpdate: selectBinUpdate
    });
  };
  componentDidMount() {
    this.props.last_ten_barcode();
    this.props.get_bin_DrowpDown();
    this.props.get_condition_DrowpDown();
    this.props.get_object_DrowpDown();
  }
  formHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  customFunction = e => {
    var bardcode = $("#FirstNameId").val();
    this.setState({
      MasterBarcode: bardcode
    });
    // const bardcode = this.state.MasterBarcode;
    this.props.get_master_Barcode(bardcode);
    this.props.get_master_detail(bardcode);
  };

  // onBlur= e=>{
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   })
  // }
  // onInputHandlerModel = e => {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   });
  // };
  onInputHandle = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  // componentWillMount() {
  //   if (sessionStorage.getItem("userName")) {
  //     console.log("setion find");
  //   } else {
  //     this.setState({ redirectToReferrer: true });
  //   }
  // }

  onsubmitHanldeUpdate = e => {
    e.preventDefault();
    const data = {
      objectdataUpdate: this.state.selectObjcetUpdate.value,
      conditiondataUpdate: this.state.selectConditionUpdate.value,
      WeightUpdate: this.state.WeightUpdate,
      BinUpdate: this.state.selectBinUpdate.value,
      DekittingRemarksUpdate: this.state.DekittingRemarksUpdate,
      barcode: this.state.MasterBarcode,
      created_by: localStorage.getItem("userId")
    };
    if (this.state.WeightUpdate <= 0 || this.state.WeightUpdate < -1) {
      alert("Weight is invalid");
      return false;
    } else {
      //console.log(data);

      this.props.saveMasterDetail(data);
      this.myFormRef.reset();
      this.setState({
        selectObjcetUpdate: "",
        WeightUpdate: "",
        DekittingRemarksUpdate: "",
        valueBarcode: ""
      });
    }
  };
  onsubmitHanlde = e => {
    e.preventDefault();
    const data = {
      objectdata: this.state.selectObjcet.value,
      conditiondata: this.state.selectCondition.value,
      LZ_DEKIT_US_DT_ID: this.state.LZ_DEKIT_US_DT_ID,
      Weight: this.state.Weight,
      selectBin: this.state.selectBin.value,
      DekittingRemarks: this.state.DekittingRemarks,
      selectBinName: this.state.selectBin.label,
      objectdataname: this.state.selectObjcet.label,
      conditiondataName: this.state.selectCondition.label
    };
    if (this.state.Weight <= 0 || this.state.Weight < -1) {
      alert("Weight is invalid");
      return false;
    } else {
      this.props.updateMasterDetial(data);
      console.log(data);
      this.myFormRef.reset();
      this.setState({
        selectObjcet: "",
        selectCondition: "",
        Weight: "",
        selectBin: "",
        DekittingRemarks: ""
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.masterBarcodeArray !== this.props.masterBarcodeArray &&
      this.props.masterBarcodeArray !== ""
    ) {
      this.props.masterBarcodeArray.map(item =>
        this.setState({
          //valueBarcode: item.BARCODE_NO,
          Item: item.ITEM_MT_DESC,
          Condition: item.CONDITIONS_SEG5,
          labelManufature: item.ITEM_MT_MANUFACTURE,
          MPN: item.ITEM_MT_MFG_PART_NO,
          labelITEM_MT_UPC: item.ITEM_MT_UPC
        })
      );
    }
    if (
      prevState.MasterBarcode !== this.state.MasterBarcode &&
      this.state.MasterBarcode !== ""
    ) {
      const data = this.props.masterBarcodeArray.filter(
        item => item.BARCODE_NO == this.state.MasterBarcode
      );
      data.map(item => {
        this.setState({
          valueBarcode: item.BARCODE_NO,
          Condition: item.CONDITIONS_SEG5,
          Item: item.ITEM_MT_DESC,
          MPN: item.ITEM_MT_MFG_PART_NO
          //labelITEM_MT_UPC: item.ITEM_MT_UPC
        });
      });

      // const bardcode = this.state.MasterBarcode;

      if (this.state.MasterBarcode < -1) {
        alert("Master Barcode is invalid");
        return false;
      } else {
        //this.myFunction()
        // this.props.get_master_Barcode(bardcode);
        // this.props.get_master_detail(bardcode);
      }
      // if(this.state.MasterBarcode =''){
      //   this.setState({
      //     Condition:'',
      //     Item:'',
      //     MPN:''
      //   })
      // }
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
    //   const usPNonlistedArray=[];
    //   this.props.employeeArray.map(item=>
    //     usPNonlistedArray.push({
    //         value:item.EMPLOYEE_ID,
    //         label:item.USER_NAME
    //     }))nonListedItemsArray
    //console.log(this.state.inlineDefaultRadiosExample);
    // console.log(this.props.conditionArray);
    // console.log(this.props.binArray);
    // console.log(this.props.objectArray);

    //console.log(this.state.valueBarcode)
    // const anable=this.state.MasterBarcode !=''

    const enable =
      this.state.selectObjcetUpdate != "" &&
      this.state.selectConditionUpdate != "" &&
      this.state.selectBinUpdate != "";

    const selectedbarcode = [];
    this.props.masterBarcodeArray.map(item =>
      selectedbarcode.push({
        valueBarcode: item.BARCODE_NO,
        Condition: item.CONDITIONS_SEG5,
        Item: item.ITEM_MT_DESC,
        MPN: item.ITEM_MT_MFG_PART_NO,
        labelITEM_MT_UPC: item.ITEM_MT_UPC
      })
    );
    // console.log(item.BARCODE_NO)
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
          text: "25",
          value: 25
        },
        {
          text: "50",
          value: 50
        },
        {
          text: "100",
          value: 100
        }
        // {
        //   text: "All",
        //   value: this.props.barcodeArray.length
        // }
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
    const dropObject = [];
    this.props.objectArray.map(item =>
      dropObject.push({
        value: item.OBJECT_ID,
        label: item.OBJECT_NAME
      })
    );

    const dropCondition = [];
    this.props.conditionArray.map(item =>
      dropCondition.push({
        value: item.ID,
        label: item.COND_NAME
      })
    );

    const dropBin = [];
    this.props.binArray.map(item =>
      dropBin.push({
        value: item.BIN_ID,
        label: item.BIN_NO
      })
    );

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
              DE-Kitting - U.S.
              <small>Control panel</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <p>Home</p>
              </li>
              <li className="active">DE-Kitting - U.S. </li>
            </ol>
          </section>

          <section className="content">
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

              <div className="modal fade" id="myModal" role="dialog">
                <div className="modal-dialog" style={{ width: "80%" }}>
                  <div className="modal-content">
                    <div className="modal-header">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                      >
                        &times;
                      </button>
                      <h4 className="modal-title"> Add New Data</h4>
                    </div>
                    <form onSubmit={this.onsubmitHanldeUpdate}>
                      <div className="modal-body">
                        <div className="col-sm-12">
                          <div className="col-sm-3">
                            <label>Object:</label>
                            <Select
                              id="objectUpdateId"
                              name="selectObjcetUpdate"
                              options={dropObject}
                              value={this.state.selectObjcetUpdate}
                              onChange={this.handleDrowpObjectUpdate}
                              className="basic-select"
                              classNamePrefix="select"
                              isSearchable
                              // required
                              // select-option
                              //isMulti
                            />
                          </div>

                          <div className="col-sm-3">
                            <label>Condition:</label>
                            <Select
                              id="conditionUpdateId"
                              name="selectConditionUpdate"
                              options={dropCondition}
                              value={this.state.selectConditionUpdate}
                              onChange={this.handleDrowpconditionUpdate}
                              className="basic-select"
                              classNamePrefix="select"
                              isSearchable
                              // required
                              // select-option
                              //isMulti
                            />
                          </div>
                          <div className="col-sm-3">
                            <label>Weight:</label>
                            <input
                              type="number"
                              className="form-control"
                              name="WeightUpdate"
                              onChange={this.onInputHandle}
                              value={this.state.WeightUpdate}
                              placeholder="Weight"
                              id="WeightId"
                              required
                            />
                          </div>
                          <div className="col-sm-3">
                            <label>BIN/Rack:</label>
                            <Select
                              id="binId"
                              name="selectBinUpdate"
                              options={dropBin}
                              value={this.state.selectBinUpdate}
                              onChange={this.handleDrowpBinUpdate}
                              className="basic-select"
                              classNamePrefix="select"
                              isSearchable
                              // required
                              // select-option
                              //isMulti
                            />
                          </div>
                          <div className="col-sm-3">
                            <label>Dekitting Remarks:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="DekittingRemarksUpdate"
                              onChange={this.onInputHandle}
                              value={this.state.DekittingRemarksUpdate}
                              placeholder="Dekitting Remarks"
                              id="DekittingUpdateid"
                              required
                            />
                          </div>
                          <div className="col-sm-2">
                            <br />
                            <button
                              type="submit"
                              className="btn btn-primary"
                              // data-dismiss='modal'
                              // onClick={() =>
                              //   this.clickSaveUpdatepacking(this.state.PACKING_ID)
                              //}
                              disabled={!enable}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-default"
                          data-dismiss="modal"
                        >
                          Cancel
                        </button>
                      </div>
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
                      >
                        &times;
                      </button>
                      <h4 className="modal-title"> Update Data</h4>
                    </div>
                    <form
                      onSubmit={this.onsubmitHanlde}
                      ref={el => (this.myFormRef = el)}
                    >
                      <div className="modal-body">
                        <div className="col-sm-12">
                          <div className="col-sm-3">
                            <label>Object:</label>
                            <Select
                              id="objectId"
                              name="selectObjcet"
                              options={dropObject}
                              value={this.state.selectObjcet}
                              onChange={this.handleDrowpObject}
                              className="basic-select"
                              classNamePrefix="select"
                              isSearchable
                              // required
                              // select-option
                              //isMulti
                            />
                          </div>

                          <div className="col-sm-3">
                            <label>Condition:</label>
                            <Select
                              id="conditionId"
                              name="selectCondition"
                              options={dropCondition}
                              value={this.state.selectCondition}
                              onChange={this.handleDrowpcondition}
                              className="basic-select"
                              classNamePrefix="select"
                              isSearchable
                              // required
                              // select-option
                              //isMulti
                            />
                          </div>
                          <div className="col-sm-3">
                            <label>Weight:</label>
                            <input
                              type="number"
                              className="form-control"
                              name="Weight"
                              onChange={this.onInputHandle}
                              value={this.state.Weight}
                              placeholder="Weight"
                              id="WeightId"
                              required
                            />
                          </div>
                          <div className="col-sm-3">
                            <label>BIN/Rack:</label>
                            <Select
                              id="binId"
                              name="selectBin"
                              options={dropBin}
                              value={this.state.selectBin}
                              onChange={this.handleDrowpBin}
                              className="basic-select"
                              classNamePrefix="select"
                              isSearchable
                              // required
                              // select-option
                              //isMulti
                            />
                          </div>
                          <div className="col-sm-3">
                            <label>Dekitting Remarks:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="DekittingRemarks"
                              onChange={this.onInputHandle}
                              value={this.state.DekittingRemarks}
                              placeholder="Dekitting Remarks"
                              id="Dekittingid"
                              required
                            />
                          </div>
                          <div className="col-sm-2">
                            <br />
                            <button
                              type="submit"
                              className="btn btn-primary"
                              // data-dismiss='modal'
                              // onClick={() =>
                              //   this.clickSaveUpdatepacking(this.state.PACKING_ID)
                              //}
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-default"
                          data-dismiss="modal"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="box-body">
                <div className="col-sm-12">
                  <div className="col-sm-2">
                    <label>Master Barcode:</label>
                    <input
                      type="number"
                      className="form-control"
                      name="MasterBarcode"
                      // valueDefau={this.state.MasterBarcode}
                      placeholder="Master Barcode"
                      id="FirstNameId"
                      required
                      onBlur={this.customFunction}
                    />

                    {/* <input type="text" id="sometext" onfocusout="{this.()"></inpu}*/}
                  </div>
                  <div className="col-sm-4">
                    <label>Item:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="Item"
                      onChange={this.formHandler}
                      value={this.state.Item}
                      id="FirstNameId"
                      readOnly
                    />
                  </div>
                  <div className="col-sm-2">
                    <label>Condition:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="Condition"
                      onChange={this.formHandler}
                      value={this.state.Condition}
                      id="FirstNameId"
                      readOnly
                    />
                  </div>
                  <div className="col-sm-2">
                    <label>MPN:</label>
                    <input
                      type="MPN"
                      className="form-control"
                      name="FirstName"
                      onChange={this.formHandler}
                      value={this.state.MPN}
                      id="FirstNameId"
                      readOnly
                    />
                  </div>
                </div>
                &nbsp;
                {this.state.MasterBarcode !== "" ? (
                  <div className="col-sm-12">
                    <div className="col-sm-2">
                      <button
                        type="submit"
                        className="btn btn-warning"
                        data-target="#myModal"
                        data-toggle="modal"
                        id="myModal"
                        // disabled={!anable}
                        //style={{ width: "75%", marginTop: "23px" }}
                      >
                        Add New
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            {this.state.MasterBarcode !== "" ? (
              <div className="row">
                <div className="col-sm-12">
                  <div className="box">
                    <br />
                    <div className="row">
                      <div className="col-sm-12">
                        <BootstrapTable
                          cellEdit={cellEditProp}
                          // insertRow={ true }
                          data={this.props.masterDetailArray}
                          // footerData={footerData}
                          // footer
                          pagination
                          search
                          //trClassName={this.trClassFormat}
                          options={options}
                          // totalRow={totalRow}
                          // insertRow
                          exportCSV
                          // deleteRow={true}
                          // selectRow={selectRowProp}
                          // options={options}
                        >
                          <TableHeaderColumn
                            width="5%"
                            isKey={true}
                            editable={false}
                            export={false}
                            dataFormat={actionFormatter}
                            dataField="LZ_DEKIT_US_DT_ID"
                          >
                            Action{" "}
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            width="9%"
                            editable={false}
                            dataSort
                            // dataFormat={ebayLink}
                            dataField="BARCODE_PRV_NO"
                          >
                            Barcode
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            width="9%"
                            editable={false}
                            dataSort
                            dataField="OBJECT_NAME"
                            // dataFormat={multipleSelect}
                          >
                            Object
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            width="9%"
                            editable={false}
                            dataSort
                            dataField="COND_NAME"
                            // dataFormat={multipleSelectCondiition}
                          >
                            Condition{" "}
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            width="9%"
                            editable={true}
                            dataSort
                            dataField="WEIGHT"
                          >
                            Weight{" "}
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            width="9%"
                            editable={false}
                            ordering
                            dataSort
                            dataField="BIN_NO"
                            // dataFormat={multipleSelectBin}
                          >
                            BIN/Rack{" "}
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            width="9%"
                            editable={true}
                            ordering
                            dataSort
                            dataField="DEKIT_REMARKS"
                          >
                            Dekitting Remarks
                          </TableHeaderColumn>
                        </BootstrapTable>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="row">
              <div className="col-sm-12">
                <div className="box">
                  <br />

                  <div className="row">
                    <div className="col-sm-12">
                      <BootstrapTable
                        //  cellEdit={cellEditProp}
                        //insertRow={ true }
                        data={this.props.barcodeArray}
                        // footerData={footerData}
                        // footer
                        // selectRow={selectRowProp}
                        pagination
                        search
                        // trClassName={this.trClassFormat}
                        options={options}
                        //totalRow={totalRow}
                        // insertRow
                        //  exportCSV
                        // deleteRow={true}
                        //selectRow={selectRowProp}
                        // option={option}
                      >
                        <TableHeaderColumn
                          width="16.66%"
                          editable={false}
                          dataSort={true}
                          // dataFormat={actionFormatter}
                          dataField="BARCODE_NO"
                        >
                          Barcode
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="20.66%"
                          editable={false}
                          dataSort={true}
                          dataField="ITEM_DESC"
                        >
                          {" "}
                          Description
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          width="16.66%"
                          editable={false}
                          dataSort={true}
                          dataField="COND_NAME"
                        >
                          {" "}
                          Condition
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          width="16.66%"
                          editable={false}
                          export={false}
                          dataField="ITEM_MT_MFG_PART_NO"
                        >
                          {" "}
                          Mpn{" "}
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          width="16.66%"
                          editable={false}
                          dataSort={true}
                          dataField="ITEM_MT_MANUFACTURE"
                        >
                          Brand
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="16.66%"
                          isKey={true}
                          editable={false}
                          dataSort={true}
                          dataField="ITEM_MT_UPC"
                        >
                          Upc{" "}
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
const mapStateToprops = state => {
  return {
    barcodeArray: state.deKittingUsReducer.barcodeArray,
    masterBarcodeArray: state.deKittingUsReducer.masterBarcodeArray,
    masterDetailArray: state.deKittingUsReducer.masterDetailArray,
    objectArray: state.deKittingUsReducer.objectArray,
    conditionArray: state.deKittingUsReducer.conditionArray,
    binArray: state.deKittingUsReducer.binArray
  };
};

export default connect(
  mapStateToprops,
  action
)(DeKittingUs);
