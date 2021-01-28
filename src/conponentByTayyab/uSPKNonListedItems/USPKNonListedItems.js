import React, { Component } from "react";
import {
  BootstrapTable,
  TableHeaderColumn,
  Dropdown
} from "react-bootstrap-table";
import { RViewer, RViewerTrigger } from "react-viewerjs";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import $ from "jquery";
import swal from "sweetalert";

import {
  get_employee,
  get_nonListedItems,
  get_select_Radio_value,
  load_identification_data
} from "../../actions/uSPKNonListedItemsAction.js";

const action = {
  get_employee,
  get_nonListedItems,
  get_select_Radio_value,
  load_identification_data
};
let getUrl = window.location;
let finalurl = getUrl.protocol + "//" + getUrl.hostname;

var that = "";

export class ImageView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cell: this.props.cell,
      row: this.props.row,
      imagesUrl: that.state.images
    };
  }
  render() {
    // console.log(this.state);
    const { imagesUrl } = this.state;

    let options = {
      toolbar: {
        prev: true,
        next: true
      },

      navbar: {
        default: true
      }
    };
    // console.log(imagesUrl[this.props.cell][0]);
    // console.log(this.props.cell);
    return (
      <React.Fragment>
        <div
          style={{
            overflow: "hidden",
            position: "relative"
          }}
        >
          
          <RViewer
            index={this.props.cell}
            options={options}
            imageUrls={imagesUrl[this.props.cell]}
          >
            <RViewerTrigger>
              <div className="col-md-12">
                <img
                  className="getCss"
                  src={imagesUrl[this.props.cell][0]}
                  width="50px"
                  height="50px"
                />
              </div>
            </RViewerTrigger>
          </RViewer>
        </div>
      </React.Fragment>
    );
  }
}
function imageView(cell, row) {
  return <ImageView cell={cell} row={row} />;
}

function actionFormatter(cell, row) {
  return (
    <div>
      <button
        className="btn btn-warning btn-xs"
        onClick={() => that.clickselectbarcode(cell, row)}
      >
        {" "}
        <span className="glyphicon glyphicon-leaf p-b-5" aria-hidden="true" />
      </button>
    </div>
  );
}

that = "";

class USPKNonListedItems extends Component {
  constructor(props) {
    // var getUrl = window.location;
    // var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    super(props);

    this.state = {
      error: null,
      isLoaded: true,
      // baseUrl: finalurl,
      redirectToReferrer: false,
      error: false,
      show: false,
      usPNonlisteName: "",
      inlineDefaultRadiosExample: "All",
      move: false,
      barcode: "",
      images: [],
      nonListedData: []
      //imagesUrl:[]
    };
    that = this;
    //that.clickDelete = that.clickDelete.bind(that);
  }

  getBarcodeShortage = () => {
    $.LoadingOverlay("show");

    let insertUrl = `${finalurl}/laptopzone/reactControllertest/c_react_test/Get_nonListedItems`;
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
        if (result) {
          this.setState({
            nonListedData: result.query,
            images: result.images
          });
        } else {
          this.setState({
            images: [],
            nonListedData: []
          });
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };
  getBarcodeShortagelatest = data => {
    $.LoadingOverlay("show");

    let insertUrl = `${finalurl}/laptopzone/reactControllertest/c_react_test/get_select_Radio_value`;
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: data
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
        if (result) {
          this.setState({
            nonListedData: result.query,
            images: result.images
          });
        } else {
          this.setState({
            images: [],
            nonListedData: []
          });
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };

  clickselectbarcode = (cell, row) => {
    this.setState({
      move: true,
      barcode: row.BARCODE_NO
    });
    console.log(row.BARCODE_NO);
  };

  handleOnsubmit = e => {
    e.preventDefault();
    const data = {
      emp: this.state.usPNonlisteName.label,
      radioselect: this.state.inlineDefaultRadiosExample
    };
    // this.props.get_select_Radio_value(data);
    this.getBarcodeShortagelatest(data);
  };

  handleOnChangeRadioModel = event => {
    this.setState({
      inlineDefaultRadiosExample: event.target.value
    });
  };
  handleDrowpChange1 = usPNonlisteName => {
    this.setState({
      usPNonlisteName: usPNonlisteName
    });
  };
  componentDidMount() {
    // this.props.load_identification_data();
    this.getBarcodeShortage();
    this.props.get_employee();
    // this.props.get_nonListedItems();
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
    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: "/login" }} />;
    }

    const selectRowProp = {
      mode: "checkbox"
    };
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
          value: this.state.nonListedData.length
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
    const usPNonlistedArray = [];
    this.props.employeeArray.map(item =>
      usPNonlistedArray.push({
        label: item.USER_NAME,
        value: item.EMPLOYEE_ID
      })
    );
    if (this.state.barcode) {
      console.log(this.state.barcode);
      return (
        <Redirect
          to={{
            pathname: `/varify`,
            state: { barcode: this.state.barcode }
          }}
        />
      );
    }
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
              US-PK Non Listed Items
              <small>Control panel</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <p>Home</p>
              </li>
              <li className="active">De-Kited Non Listed Items </li>
            </ol>
          </section>

          <section className="content">
            <div className="box">
              <div className="box-header with-border">
                <h3 className="box-title">Search Item</h3>
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
                  onSubmit={this.handleOnsubmit}
                  ref={el => (this.myFormRef = el)}
                >
                  <div className="col-sm-12">
                    {/* <div className="col-sm-3">
                      <a href="#" class="active">
                        Pic Approval
                      </a>{" "}
                      &nbsp;| &nbsp;
                      <a href="#" class="active">
                        Dekit Audit
                      </a>
                    </div> */}
                    <div className="col-sm-3">
                      <label>Select Employee:</label>
                      <div
                        className="form-group has-feedback"
                        style={{ width: "100%" }}
                      >
                        <Select
                          id="servicetype"
                          // defaultValue={dropValue[1]}
                          name="usPNonlisteName"
                          options={usPNonlistedArray}
                          value={this.state.usPNonlisteName}
                          onChange={this.handleDrowpChange1}
                          className="basic-select"
                          classNamePrefix="select"
                          isSearchable
                          required
                          select-option

                          // formatGroupLabel={formatGroupLabel}
                        />
                      </div>
                    </div>
                    <div className="col-sm-3">
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
                          value="DekittedItems"
                          onClick={this.handleOnChangeRadioModel}
                          required
                        />
                        <label
                          className="custom-control-label"
                          for="faultInline1"
                        >
                          Dekitted Items
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
                          value="SpecilalLots"
                          onClick={this.handleOnChangeRadioModel}
                          required
                        />
                        <label
                          className="custom-control-label"
                          for="defaunline2"
                        >
                          Specilal Lots
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
                          value="All"
                          onClick={this.handleOnChangeRadioModel}
                          required
                          defaultChecked
                        />
                        <label
                          className="custom-control-label"
                          for="defaunline2"
                        >
                          All
                        </label>
                      </div>
                    </div>
                    <div className="col-sm-2">
                      <br />

                      <button type="submit" className="btn btn-primary">
                        Search
                      </button>
                    </div>
                    {/* <div className="col-sm-2">
                      <a href="#" class="active">
                        Listed Items
                      </a>
                    </div> */}
                  </div>
                </form>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="box">
                  <br />

                  <div className="row">
                    <div className="col-sm-12">
                      <BootstrapTable
                        //  cellEdit={cellEditProp}
                        //insertRow={ true }
                        data={this.state.nonListedData || []}
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
                          width="7.14%"
                          editable={false}
                          dataSort={true}
                          dataFormat={actionFormatter}
                          dataField="EMPLOYEE_ID"
                        >
                          Actions
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="7.14%"
                          editable={false}
                          dataSort={true}
                          dataField="EMPLOYEE_ID"
                        >
                          {" "}
                          Seller Name
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          width="7.14%"
                          editable={false}
                          dataSort={true}
                          dataField="VERIFY_BY"
                        >
                          {" "}
                          Verify By
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          width="7.14%"
                          editable={false}
                          export={false}
                          dataField="OTHER_NOTES"
                        >
                          {" "}
                          Other Notes{" "}
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          width="7.14%"
                          dataFormat={imageView}
                          dataField="BARCODE_NO"
                        >
                          Picture
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="7.14%"
                          isKey={true}
                          editable={false}
                          dataSort={true}
                          dataField="BARCODE_NO"
                        >
                          Barcode{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="7.14%"
                          editable={false}
                          ordering={true}
                          dataSort={true}
                          dataField="OBJECT_DESCRIP"
                        >
                          Object Name{" "}
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          width="7.14%"
                          editable={false}
                          ordering={true}
                          dataSort={true}
                          dataField="ITEM_CONDITION"
                        >
                          Condition{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="7.14%"
                          editable={false}
                          ordering={true}
                          dataSort={true}
                          dataField="ITEM_MT_DESC"
                        >
                          Title{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="7.14%"
                          editable={false}
                          ordering={true}
                          dataSort={true}
                          dataField="QUANTITY"
                        >
                          Qty{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="7.14%"
                          editable={false}
                          ordering={true}
                          dataSort={true}
                          dataField="MFG_PART_NO"
                        >
                          Mpn{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="7.14%"
                          editable={false}
                          ordering={true}
                          dataSort={true}
                          dataField="MANUFACTURER"
                        >
                          Manufacture{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="7.14%"
                          editable={false}
                          ordering={true}
                          dataSort={true}
                          dataField="BIN_NAME"
                        >
                          Bin Name{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="7.14%"
                          editable={false}
                          ordering={true}
                          dataSort={true}
                          hidden
                          dataField="LOADING_DATE"
                        >
                          Days{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="7.14%"
                          editable={false}
                          ordering={true}
                          dataSort={true}
                          dataField="ASSIGN_TO"
                        >
                          Assign To{" "}
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
    employeeArray: state.uSPKNonListedItemsReducer.employeeArray,
    nonListedItemsArray: state.uSPKNonListedItemsReducer.nonListedItemsArray,
    imageArray: state.uSPKNonListedItemsReducer.imageArray
  };
};

export default connect(
  mapStateToProps,
  action
)(USPKNonListedItems);
