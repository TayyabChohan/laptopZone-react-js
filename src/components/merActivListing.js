import React from "react";
//import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import {
  BootstrapTable,
  TableHeaderColumn,
  Dropdown
} from "react-bootstrap-table";
//import jQuery from 'jquery';
import NumberFormat from "react-number-format";
import "gasparesganga-jquery-loading-overlay";

import $ from "jquery";
//window.$ = $;

const ebayLink = (cell, row) => {
  var link = "https://www.ebay.com/itm/" + row.EBAY_ITEM_ID;
  return (
    <a href={link} target="_blank">
      {row.EBAY_ITEM_ID}
    </a>
  );
};
const onAfterSaveCell = (row, cellName, cellValue) => {
  // console.log(row.WEIGHT)
  if (row.SEED_ID) {
    const data = {
      PRIC: row.PRIC,
      SEED_ID: row.SEED_ID
    };

    // that.props.updateWeight(data);
  }
};

const onBeforeSaveCell = (row, cellName, cellValue) => {
  let value;
  if (cellName == "PRIC") {
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
        className="btn btn-primary"
        type="bottom"
         onClick={() => that.click(cell, row)}
      >
        Revise
        {/* <span className="glyphicon glyphicon-trash p-b-5" aria-hidden="true" /> */}
      </button>
    </div>
  );
}

var that = "";
class MerActivListing extends React.Component {
  constructor(props) {
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    //console.log(finalurl);
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      categoryDrop: [],
      baseUrl: finalurl,
      avilCateg: "",
      redirectToReferrer: false
    };
    this.handleInput = this.handleInput.bind(this);
    this.serchByCat = this.serchByCat.bind(this);
    this.revItem = this.revItem.bind(this);
    that = this;
  }


  click= (cell, row)=>{
    // console.log(row.PRIC)
    // console.log(row.SEED_ID)
    // console.log(row.EBAY_ITEM_ID)
    // console.log(sessionStorage.getItem("userId"))
    const price =row.PRIC
    const SeedId=row.SEED_ID
    const ebayId=row.EBAY_ITEM_ID
    const userId=sessionStorage.getItem("userId")
     this.revItem(price,ebayId,userId ,SeedId)
  }
  componentDidMount() {
    var avail_cat = "";
    $.ajax({
      url:
        this.state.baseUrl +
        "/laptopzone/reactcontroller/c_react/mer_active_listed",
      dataType: "json",
      type: "POST",
      data: { merchId: sessionStorage.getItem("merId"), avail_cat: avail_cat },
      success: function(data) {
        if (data.exist == true) {
          this.setState({
            isLoaded: true,
            items: data.merhc_activ_list,
            categoryDrop: data.merch_act_list_categry
          });
        } else {
          alert("error");
          return false;
          this.setState({
            isLoaded: false
          });
        }
      }.bind(this),
      error: function(xhr, resp, text) {
        //show error to console
        console.log(xhr, resp, text);
      }
    });
  }

  componentWillMount() {
    if (sessionStorage.getItem("userName")) {
      console.log("setion find");
    } else {
      this.setState({ redirectToReferrer: true });
    }
  }

  handleInput(e) {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  }

  revItem(price, ebayId, userId, SeedId) {

    //var value = $("#pri_changes_" + indx).val();

    var ebay = ebayId;

    // if (value.length <= 0) {
    //   alert("Please Enter Price");
    //   return false;
    // }
    // if (value <= 0) {
    //   alert("Please Enter Price Greater Than Zero! ");
    //   return false;
    // }
    $.LoadingOverlay("show");
    $.ajax({
      url:
        this.state.baseUrl +
        "/laptopzone/reactcontroller/c_react/reviseItemPrice",
      dataType: "json",
      type: "POST",
      data: {
        revise_price: price,
        ebay_id: ebay,
        user_id: userId
      },
      success: function(data) {
        if (data == true) {
          $.LoadingOverlay("hide");
          alert("Item is Revised");
          return false;
        } else {
          $.LoadingOverlay("hide");
          alert("Item Not Revised ! Contact Administrator");
          return false;
        }
      }.bind(this),
      error: function(xhr, resp, text) {
        //show error to console
        console.log(xhr, resp, text);
      }
    });
  }
  serchByCat() {
    $.LoadingOverlay("show");

    var avail_cat = this.state.avilCateg;
    $.ajax({
      url:
        this.state.baseUrl +
        "/laptopzone/reactcontroller/c_react/mer_active_listed",
      dataType: "json",
      type: "POST",
      data: { merchId: sessionStorage.getItem("merId"), avail_cat: avail_cat },
      success: function(data) {
        if (data.exist == true) {
          $.LoadingOverlay("hide");
          this.setState({
            isLoaded: true,
            items: data.merhc_activ_list,
            categoryDrop: data.merch_act_list_categry
          });
        } else {
          $.LoadingOverlay("hide");
          alert("error");
          return false;
          this.setState({
            isLoaded: false
          });
        }
      }.bind(this),
      error: function(xhr, resp, text) {
        //show error to console
        console.log(xhr, resp, text);
      }
    });
  }

  renderShowsTotal(start, to, total) {
    return (
      <p style={{ color: "#696969" }}>
        From {start} to {to}, totals is {total}&nbsp;&nbsp;
      </p>
    );
  }

  render() {
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
      paginationPosition: "top", // default is bottom, top and both is all available
      clearSearch: true
      // keepSizePerPageState: true //default is false, enable will keep sizePerPage dropdown state(open/clode) when external rerender happened
      // hideSizePerPage: true > You can hide the dropdown for sizePerPage
      // alwaysShowAllBtns: true // Always show next and previous button
      // withFirstAndLast: false > Hide the going to First and Last page button
      // hidePageListOnlyOnePage: true > Hide the page list if only one page.
    };

    const { error, isLoaded, items } = this.state;

    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: "/login" }} />;
    }

    //console.log(this.state.categoryDrop);
    console.log(this.state.items);

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
      var categoryValues = this.state.categoryDrop.map(function(categ, index) {
        return (
          <option key={index} value={categ.CATEGORY_ID}>
            {categ.NAME}
          </option>
        );
      });

      return (
        <React.Fragment>
          <section className="content-header">
            <h1>
              Active
              <small>Listed</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <a href="#">
                  <i className="fa fa-dashboard" /> Home
                </a>
              </li>
              <li>
                <a href="#">Tables</a>
              </li>
              <li className="active">Active Listed</li>
            </ol>
          </section>

          <section className="content">
            <div className="row">
              <div className="col-xs-12">
                <div className="box">
                  <div className="box-header">
                    <h3 className="box-title">Search Criteria</h3>
                  </div>

                  <div className="box-body">
                    <div className="col-xs-3">
                      <label>Available Categories:</label>
                      <select
                        className="form-control selectpicker "
                        name="avilCateg"
                        value={this.state.avilCateg}
                        onChange={this.handleInput}
                      >
                        <option value="0">Select Category.. </option>
                        {categoryValues}
                      </select>
                    </div>
                    <div className="col-xs-2 pos">
                      <input
                        type="button"
                        class="btn btn-primary "
                        value="Serch"
                        onClick={this.serchByCat}
                      />
                    </div>
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
                        cellEdit={cellEditProp}
                        // insertRow={ true }
                        data={this.state.items}
                        // footerData={footerData}
                        // footer
                        pagination
                        search
                        //trClassName={this.trClassFormat}
                        options={options}
                        // totalRow={totalRow}
                        // insertRow
                        //  exportCSV
                        // deleteRow={true}
                        // selectRow={selectRowProp}
                        // options={options}
                      >
                        <TableHeaderColumn
                          width="5%"
                          editable={false}
                          export={false}
                          dataFormat={ebayLink}
                          dataField="EBAY_ITEM_ID"
                        >
                          Ebay Id{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="9%"
                          editable={false}
                          dataSort
                          // dataFormat={ebayLink}
                          dataField="BARCODE_PRV_NO"
                        >
                          Picture
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="9%"
                          editable={false}
                          dataSort
                          dataField="QTY"
                          // dataFormat={multipleSelect}
                        >
                          Qty
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="13%"
                          editable={false}
                          dataSort
                          dataField="ITEM_DESC"
                          // dataFormat={multipleSelectCondiition}
                        >
                          Item Description{" "}
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          width="9%"
                          editable={false}
                          ordering
                          dataSort
                          dataField="CONDITION_ID"
                          // dataFormat={multipleSelectBin}
                        >
                          Condition{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="9%"
                          editable={false}
                          ordering
                          dataSort
                          dataField="ITEM_MT_MANUFACTURE"
                        >
                          Manufacture
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="9%"
                          editable={false}
                          ordering
                          dataSort
                          dataField="ITEM_MT_MFG_PART_NO"
                        >
                          Mpn
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="9%"
                          editable={false}
                          ordering
                          dataSort
                          dataField="ITEM_MT_UPC"
                        >
                          Upc
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="13%"
                          editable={false}
                          ordering
                          dataSort
                          dataField="NAME"
                        >
                          Category Name
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="9%"
                          editable={false}
                          ordering
                          dataSort
                          dataField="PRIC1"
                        >
                          Item Price
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="9%"
                          editable={true}
                          ordering
                          dataSort
                          dataField="PRIC"
                        >
                          Revise Price
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="9%"
                          ordering
                          dataSort
                          dataField="SEED_ID"
                          isKey={true}
                          dataFormat={actionFormatter}
                        >
                          Revise
                        </TableHeaderColumn>
                      </BootstrapTable>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="row">
              <div className="col-xs-12">
                <div className="box">
                  <div className="box-header">
                    <h3 className="box-title">Active Listed</h3>
                  </div>

                  <div className="box-body">
                    <table
                      id="table"
                      className="table table-bordered table-hover"
                    >
                      <thead>
                        <tr>
                          <th>Ebay Id</th>
                          <th>Picture</th>
                          <th>Qty</th>
                          <th>Item Description</th>
                          <th>Condition</th>
                          <th>Manufacture</th>
                          <th>Mpn</th>
                          <th>Upc</th>
                          <th>Category Name</th>
                          <th className="wid">Item Price</th>
                          <th className="widt">Revise Price</th>
                          <th>Revise</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, index) => (
                          <tr key={item.BARCODE_NO}>
                            <td>
                              <a
                                href={`http://www.ebay.com/itm/${
                                  item.EBAY_ITEM_ID
                                }`}
                                target="_blank"
                                style={{ color: "#3c8dbc" }}
                              >
                                {" "}
                                {item.EBAY_ITEM_ID}
                              </a>
                            </td>
                            <td />
                            <td>{item.QTY}</td>
                            <td>{item.ITEM_DESC}</td>
                            <td>{item.CONDITION_ID}</td>
                            <td>{item.ITEM_MT_MANUFACTURE}</td>
                            <td>{item.ITEM_MT_MFG_PART_NO}</td>
                            <td>{item.ITEM_MT_UPC}</td>
                            <td>{item.NAME}</td>
                            <td>
                              <NumberFormat
                                className=" pull-center"
                                value={item.PRIC}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$ "}
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                name={"pri_changes_" + index}
                                id={"pri_changes_" + index}
                                className="form-control"
                              />
                            </td>
                            <td>
                              <input
                                type="button"
                                name="price"
                                id="chng_"
                                value="Revise"
                                className="btn btn-success"
                                onClick={() => {
                                  this.revItem(
                                    index,
                                    item.seedId,
                                    item.EBAY_ITEM_ID
                                  );
                                }}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div> */}
          </section>
        </React.Fragment>
      );
    }
  }
}
export default MerActivListing;
