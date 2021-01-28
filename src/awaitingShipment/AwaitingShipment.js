import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import swal from "sweetalert";
import {get_Awaiting_Shipment} from "../actions/awaitingShipmentAction.js";

const action = {
    get_Awaiting_Shipment
};

class AwaitingShipment extends Component {
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
      show: false
    };
  }

  renderShowsTotal(start, to, total) {
    return (
      <p style={{ color: "#696969" }}>
        From {start} to {to}, totals is {total}&nbsp;&nbsp;
      </p>
    );
  }

  // componentDidMount() {
  //   const id= sessionStorage.getItem('merId')
  //   this.props.get_Awaiting_Shipment(id);
  // }
  render() {
   // console.log(this.props.tBarcodeArray);
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
          value: this.props.AwaitingShipmentArray.length
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
            Awaiting Shipment Form
              <small>Control panel</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <p>Home</p>
              </li>
              <li className="active"> Awaiting Shipment Form </li>
            </ol>
          </section>

          <section className='content'>
            <div
              className="col-sm-12"
              style={{ paddingLeft: "0%", paddingRight: "0%" }}
            >
              <div className="box">
                <div className="box-header with-border">
                  <h3 className="box-title"> Awaiting Shipment</h3>
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
                        // insertRow={ true }
                        data={this.props.AwaitingShipmentArray}
                        // footerData={footerData}
                        // footer
                        pagination
                        search
                        // trClassName={this.trClassFormat}
                        options={options}
                        //totalRow={totalRow}
                        // insertRow
                       // exportCSV
                        // deleteRow={true}
                        //selectRow={selectRowProp}
                        // option={option}
                      >
                        <TableHeaderColumn
                          width="11.11%"
                          isKey={true}
                          editable={false}
                          dataSort={true}
                          // dataFormat={actionFormatter}
                          dataField="EBAY_ITEM_ID"
                        >
                          EBAY ID
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="11.11%"
                          editable={false}
                          dataSort={true}
                          dataField="QTY"
                        >
                          {" "}
                          QTY
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          width="11.11%"
                          editable={false}
                          dataSort={true}
                          dataField="ITEM_DESC"
                        >
                          {" "}
                          DESCPTION
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          width="11.11%"
                          editable={false}
                          export={false}
                          dataField="CONDITION_ID"
                        >
                          {" "}
                          CONDITION{" "}
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          width="11.11%"
                          editable={false}
                          dataSort={true}
                          dataField="ITEM_MT_MANUFACTURE"
                        >
                          MANUFACTURE
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="11.11%"
                          editable={false}
                          dataSort={true}
                          dataField="ITEM_MT_MFG_PART_NO"
                        >
                          MPN{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="11.11%"
                          editable={false}
                          ordering={true}
                          dataSort={true}
                          dataField="ITEM_MT_UPC"
                        >
                          UPC{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="11.11%"
                          editable={false}
                          ordering={true}
                          dataSort={true}
                          dataField="NAME"
                        >
                          CATEGORY NAME
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="11.11%"
                          editable={false}
                          ordering={true}
                          dataSort={true}
                          dataField="BARCODE_NO"
                        >
                          {" "}
                          BARCODE NO
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
const mapsToprops = state => {
  return {
    AwaitingShipmentArray: state.awaitingShipmentReducer.AwaitingShipmentArray
  };
};

export default connect(
  mapsToprops,
  action
)(AwaitingShipment);
