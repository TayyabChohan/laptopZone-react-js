import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import swal from "sweetalert";
import $ from "jquery";

import {
  get_barcode_detail,
  get_all_barcode
} from "../../actions/BarcodeImageAction.js";
import { RViewer, RViewerTrigger } from "react-viewerjs";
import AlertMessage from "../../components/messages/AlertMessage.js";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import Flatpickr from "react-flatpickr";
import "gasparesganga-jquery-loading-overlay";
import firebase from "../../components/firebaseConfig/Firebase.js";
import dateFormat from "dateformat";
import { toastr } from "react-redux-toastr";
var db = firebase.firestore();

var that = "";
var count = 0;
const action = {
  get_barcode_detail
  // get_all_barcode
};

export class ImageView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cell: this.props.cell,
      row: this.props.row,
      imagesUrl: that.state.images_list
    };
  }

  render() {
    const { cell, row, imagesUrl } = this.state;

    let options = {
      toolbar: {
        prev: true,
        next: true
      },

      navbar: {
        default: true
      }
    };
    return (
      <React.Fragment>
        <div
          style={{
            overflow: " hidden",
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
                  width="150px"
                  height="150px"
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
function dynamicSort(property) {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function(a, b) {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}
class BarcodeImage extends Component {
  constructor(props) {
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    super(props);
    this.db = firebase
      .database()
      .ref()
      .child("currentFolders");
    //   .database()
    // .ref("/currentFolders")
    // .once("value")
    that = this;
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    this.state = {
      baseUrl: finalurl,
      error: null,
      isLoaded: true,
      baseUrl: finalurl,
      redirectToReferrer: false,
      error: false,
      show: false,
      isLoad: false,
      barcodeNo: "",
      barcodeImageArray: "",
      merchant: "",
      PictureBy: "",
      date: "",
      lot: "",
      lot_description: "",
      detail_dbarcode: [],
      barcodes_list: [],
      images_list: [],
      barcodes_list_bool: false,
      barcodes_list_table_bool: false,
      BUISNESS_NAME: "",
      USER_NAME: "",
      ISSUED_DATE: "",
      LOT_ID: "",
      LOT_DESC: "",
      data: [],
      testData: [],
      imageCount: [],
      total_pictures: 0,
      barcode: "",
      barcodes_list_length: "",
      total_images_list: 0,
      date_firebase: new Date(),
      tempFilterState: [],
      tempImagecount: []
    };
  }

  onkeyChange1 = () => {
    var data = $("#barcodeNoid").val();
   // var pic_data = $("#pic_id").val();
    const diff = data;
    this.setState({
      barcodeNo: diff
    });
    
    if (data == "") {
      this.setState({
        merchant: "",
        PictureBy: "",
        date: "",
        lot: "",
        lot_description: ""
      });
    }
  };

  onsubmitHanld_firebase = e => {
    e.preventDefault();
    this.getDataFromFirestore();
  };

  click_To_reset_date = e => {
    this.setState({
      barcodes_list: this.state.tempFilterState,
      date_firebase: ""
    });
  };
  onsubmitHanlde = e => {
    e.preventDefault();

    const id = $("#barcodeNoid").val();
    // console.log(id);
    if (id < -1) {
      alert("Barcode is invalid");
      return false;
    } else {
      this.props.get_barcode_detail(id);
    }
  };
  onInputHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onInputHandler1 = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentWillMount() {
    if (sessionStorage.getItem("userName")) {
      console.log("setion find");
    } else {
      this.setState({ redirectToReferrer: true });
    }
    this.getDataFromFirestore();
    this.db.on("child_changed", snap => {
      this.setState({
        barcodes_list_table_bool: false
      });
      this.getDataFromFirestore();
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // if (
    //   prevState.newAyya_date !== this.state.newAyya_date &&
    //   this.state.newAyya_date !== ""
    // ) {
    //   this.setState({
    //     barcodes_list: this.state.newAyya_date
    //   });
    // }
    if (
      prevProps.barcode_detailArray !== this.props.barcode_detailArray &&
      this.props.barcode_detailArray !== ""
    ) {
      this.props.barcode_detailArray.map(item =>
        this.setState({
          merchant: item.BUISNESS_NAME,
          PictureBy: item.USER_NAME,
          date: item.ISSUED_DATE,
          lot: item.LOT_ID,
          lot_description: item.LOT_DESC
        })
      );
    }
  }

  // componentWillUnmount() {
  //   this.props.get_all_barcode();
  // }

  renderShowsTotal(start, to, total) {
    return (
      <p style={{ color: "#696969" }}>
        From {start} to {to}, totals is {total}&nbsp;&nbsp;
      </p>
    );
  }
  getDataFromFirestore = () => {
    var filteredRecords = [];
    var filteredCounts = [];
    var images = [];
    var date_pic = "";
    var pic_by = "";
    var barcode_firestore = "";
    var mrchant = "";
    var pic_taker_name = "";
    var mrchant_NAME = "";

    firebase
      .database()
      .ref("/currentFolders")
      .orderByChild("createdAt")
      .once("value")
      .then(snapshot => {
        var nullArray = [];
        var searchDate = this.state.date_firebase;
        snapshot.forEach((barcodes, index) => {
          var bar = barcodes.val();
          
          var inputDate = dateFormat(searchDate, "dd/mm/yyyy");
          var moment = require("moment");
          inputDate = moment(inputDate);
          var finalDate = inputDate._i.split(" ");
          finalDate = finalDate[0];
          var created_at = dateFormat(bar.createdAt, "dd/mm/yyyy");

          if (finalDate) {
            if (finalDate === created_at) {
              
              if (bar.barcodes) {
                var newKey = bar.barcodes;
                var newkeys = Object.keys(newKey);
              //  console.log(newkeys);
               // console.log(bar.imageURL);
                newkeys.forEach((itm, index2) => {
                  if (bar.imageURL && bar.createdAt) {
                    images.push([
                      {
                        barcode: itm,
                        urls: bar.imageURL,
                        pictures: index2 === 0 ? bar.imageURL.length : 0
                      }
                    ]);
                  }else if(bar.createdAt){
                    images.push([
                      {
                        barcode: itm,
                        urls: {0:"https://uae.microless.com/cdn/no_image.jpg"},
                        pictures: 0
                      }
                    ]);
                  }
                });
              }
            }
          } else {
            if (bar.barcodes) {
              var newKey1 = bar.barcodes;
              var newkeys1 = Object.keys(newKey1);
              newkeys1.forEach((itm, index) => {
                if (bar.imageURL) {
                  images.push([
                    {
                      barcode: itm,
                      urls: bar.imageURL,
                      pictures: index === 0 ? bar.imageURL.length : 0
                    }
                  ]);
                }
              });
            }
          }
        });

        return images;
      })
      .then(result => {
        
        if (result.length != 0) {
          var newArray = [];

          result.forEach((img, index) => {
            var bar = img[0].barcode;
            var urls = img[0].urls;
            var picture = img[0].pictures;
            newArray[bar] = urls;
            var docRef = db.collection("Barcodes").doc(bar);
            docRef.get().then(function(doc) {
              date_pic = doc.data().pic_DateTime;
              pic_by = doc.data().pic_taker_id;
              barcode_firestore = doc.data().barcode;
              mrchant = doc.data().MERCHANT_ID;
              mrchant_NAME = doc.data().MERCHANT_NAME;
              pic_taker_name = doc.data().pic_taker_name;
              var tableRecords = [];
              tableRecords.push([
                {
                  date_pic: date_pic,
                  pic_by: pic_by,
                  barcode: barcode_firestore,
                  mrchant: mrchant,
                  pic_taker_name: pic_taker_name,
                  urls: urls.length,
                  mrchant_NAME: mrchant_NAME
                }
              ]);
              var employeeStats = [];
              employeeStats.push([
                {
                  pic_by_id: pic_by,
                  picker_name: pic_taker_name,
                  imageCount: picture,
                  barcode: barcode_firestore,
                  date_pic: date_pic
                }
              ]);
              tableRecords.forEach(item => {
                filteredRecords.push(item[0]);
              });
              employeeStats.forEach(item => {
                filteredCounts.push(item[0]);
              });
              if (index == result.length - 1) {
                var name = "";
                var countImage = "";
                var countBarcode = "";
                var total_pictures = 0;
                var newStats = [];
                // var test = filteredCounts.sort((a,b) => (a.last_nom > b.last_nom) ? 1 : ((b.last_nom > a.last_nom) ? -1 : 0));
                var sortArray = filteredCounts.sort(dynamicSort("pic_by_id"));
                sortArray.forEach((item, index) => {
                  if (name != item.picker_name) {
                    name = item.picker_name;
                    countImage = 0;
                    countBarcode = 0;
                    var employee = sortArray.filter(
                      res => res.picker_name == name
                    );
                    var checkName = newStats.filter(
                      res => res.picker_name == name
                    );

                    employee.forEach(cnt => {
                      name = cnt.picker_name;
                      date_pic = cnt.date_pic;
                      countImage = +countImage + +cnt.imageCount;
                      total_pictures = +total_pictures + +cnt.imageCount;
                    });

                    newStats.push([
                      {
                        picker_name: name ? name : "No-Name",
                        imageCount: countImage,
                        date_pic: date_pic,
                        barcodeCount: employee.length
                      }
                    ]);
                  }
                  name = item.picker_name;
                });
                var newImageCount = [];

                newStats.forEach(item => {
                  newImageCount.push(item[0]);
                });

                that.setState({
                  barcodes_list: filteredRecords,
                  tempFilterState: filteredRecords,
                  images_list: newArray,
                  barcodes_list_bool: true,
                  barcodes_list_table_bool: true,
                  imageCount: newImageCount,
                  tempImagecount: newImageCount,
                  total_pictures: total_pictures
                });
              }
            });
          });
        } else {
          that.setState({
            barcodes_list: [],
            images_list: [],
            barcodes_list_bool: true,
            barcodes_list_table_bool: true,
            imageCount: [],
            tempImagecount: [],
            total_pictures: 0
          });
        }
      });
  };
  render() {
    const { isLoad, barcodes_list, total_pictures, imageCount } = this.state;

    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: "/login" }} />;
    }

    if (this.state.barcodes_list_bool) {
      //console.log((this.state.data || []).map(item => item.barcode));
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
            value: barcodes_list.length //barcodes_list_length
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

      const detail_dbarcode = [];
      this.props.barcode_detailArray.map(item =>
        detail_dbarcode.push({
          merchant: item.BUISNESS_NAME,
          PictureBy: item.USER_NAME,
          date: item.ISSUED_DATE,
          lot: item.LOT_ID,
          lot_description: item.LOT_DESC
        })
      );
      // console.log(this.state.detail_dbarcode);
      const { error, isLoaded } = this.state;
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
                Barcode Pictures Form
                <small>Control panel</small>
              </h1>
              <ol className="breadcrumb">
                <li>
                  <p>Home</p>
                </li>
                <li className="active"> Barcode Pictures </li>
              </ol>
            </section>

            <section className="content">
              <div
                className="col-sm-12"
                style={{ paddingLeft: "0%", paddingRight: "0%" }}
              >
                <div className="box">
                  <div className="box-header with-border">
                    <h3 className="box-title"> Barcode Picture </h3>
                    <div className="box-tools pull-right">
                      <button
                        type="button"
                        className="btn btn-box-tool"
                        data-widget="collapse"
                      >
                        <i className="fa fa-minus" />
                      </button>
                    </div>
                    <form
                      onSubmit={this.onsubmitHanlde}
                      ref={el => (this.myFormRef = el)}
                    >
                      <div className="col-sm-12">
                        <div className="col-sm-3">
                          <label>Barcode:</label>
                          <input
                            type="number"
                            className="form-control"
                            name="barcodeNo"
                            //value={this.state.barcodeNo}
                            onKeyUp={this.onkeyChange1}
                            placeholder="Barcode"
                            id="barcodeNoid"
                            required
                          />
                        </div>
                        <div className="col-sm-2">
                          <br />
                          <button
                            className="btn btn-danger"
                            type="submit"
                            style={{ paddingTop: "6%", width: "40%" }}
                          >
                            <span
                              className="glyphicon glyphicon-search "
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                        <div className="col-sm-12">
                          <div className="col-sm-2">
                            <br />
                            <label>Merchant Name:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="merchant"
                              onChange={this.onInputHandler1}
                              value={this.state.merchant}
                              id="merchantId"
                              required
                              readOnly
                            />
                          </div>
                          <div className="col-sm-2">
                            <br />
                            <label>Picture By:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="PictureBy"
                              onChange={this.onInputHandler1}
                              value={this.state.PictureBy}
                              id="PictureById"
                              required
                              readOnly
                            />
                          </div>
                          <div className="col-sm-2">
                            <br />
                            <label>Date:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="date"
                              value={this.state.date}
                              onChange={this.onInputHandler1}
                              id="dateId"
                              required
                              readOnly
                            />
                          </div>
                          <div className="col-sm-2">
                            <br />
                            <label>Lot Id:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="lot"
                              onChange={this.onInputHandler1}
                              value={this.state.lot}
                              id="lotId"
                              required
                              readOnly
                            />
                          </div>
                          <div className="col-sm-4">
                            <br />
                            <label>Lot Description:</label>
                            <input
                              type="float"
                              className="form-control"
                              name="lot_description"
                              onChange={this.onInputHandler1}
                              value={this.state.lot_description}
                              id="lot_descriptionId"
                              required
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12">
                  <div className="box">
                    <br />

                    <div className="row">
                      <div className="col-sm-12" id='pic_id'>
                        <br />
                        {this.props.barcodeImageArray ? (
                          <RViewer imageUrls={this.props.barcodeImageArray}>
                            <ul style={{ listStyleType: "none" }}>
                              {this.props.barcodeImageArray.map(
                                (pic, index) => {
                                  return (
                                    <div className="col-sm-2">
                                      <li key={index} style={{ float: "left" }}>
                                        {/* <span>image {index + 1}</span> */}
                                        {/*By default, the index value is 0,So it is necessary to set the index prop*/}
                                        <RViewerTrigger index={index}>
                                          <img
                                            src={pic}
                                            style={{
                                              width: "150px",
                                              height: "150px"
                                            }}
                                          />
                                        </RViewerTrigger>
                                      </li>
                                    </div>
                                  );
                                }
                              )}
                            </ul>
                          </RViewer>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-sm-12"
                style={{ paddingLeft: "0%", paddingRight: "0%" }}
              >
                <div className="box">
                  <div className="box-header with-border">
                    <h3 className="box-title"> Barcode Detail</h3>
                    <div className="box-tools pull-right">
                      <button
                        type="button"
                        className="btn btn-box-tool"
                        data-widget="collapse"
                      >
                        <i className="fa fa-minus" />
                      </button>
                    </div>
                    <form
                      onSubmit={this.onsubmitHanld_firebase}
                      ref={el => (this.myFormRef = el)}
                    >
                      <div className="col-sm-12">
                        <div className="col-sm-2">
                          <br />
                          <label>Search Date</label>
                          <div className="input-group">
                            <Flatpickr
                              options={{
                                // mode: "range",
                                // minDate: 'today',
                                dateFormat: "d/m/Y ",
                                name: "name"
                              }}
                              value={this.state.date_firebase}
                              onChange={date_firebase => {
                                this.setState({ date_firebase });
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-sm-2">
                          <br />
                          <br />
                          <button
                            className="btn btn-danger pull-left"
                            type="submit"
                            style={{ paddingTop: "3%", width: "30%" }}

                            // data-dismiss='modal'
                            // onClick={() =>
                            //   this.clickSaveUpdatepacking(this.state.PACKING_ID)
                            //}
                          >
                            <span
                              className="glyphicon glyphicon-search "
                              aria-hidden="true"
                            />
                          </button>
                          &nbsp; &nbsp;
                          <button
                            className="btn btn-warning"
                            type="button"
                            style={{ paddingTop: "3%", width: "50%" }}
                            // data-dismiss='modal'
                            onClick={this.click_To_reset_date}
                          >
                            Reset Date
                          </button>
                        </div>

                        <div className="col-sm-12">
                          <div
                            className="col-sm-12"
                            style={{ marginTop: "20px" }}
                          >
                            <table className="table table-responsive table-striped table-bordered">
                              <thead className="bg-primary">
                                <th style={{ padding: "1%" }}>
                                  <h3>
                                    <b>Employee Name</b>
                                  </h3>
                                </th>
                                <th style={{ padding: "1%" }}>
                                  <h3>
                                    <b>Total Barcodes</b>
                                  </h3>
                                </th>
                                <th style={{ padding: "1%" }}>
                                  <h3>
                                    <b>Total Pictures</b>
                                  </h3>
                                </th>
                              </thead>
                              <tbody>
                                {imageCount.map(function(item, index) {
                                  return (
                                    <tr>
                                      <td className="bg-success">
                                        <h3>
                                          <b>
                                            <span class="label label-success">
                                              {item.picker_name}
                                            </span>
                                          </b>
                                        </h3>
                                      </td>
                                      <td className="bg-danger">
                                        <h3>
                                          <b>
                                            <span class="label label-danger">
                                              {item.barcodeCount}
                                            </span>
                                          </b>
                                        </h3>
                                      </td>
                                      <td className="bg-warning">
                                        <h3>
                                          <b>
                                            <span class="label label-warning">
                                              {item.imageCount}
                                            </span>
                                          </b>
                                        </h3>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                              <tfoot className="bg-primary">
                                <tr style={{ color: "white" }}>
                                  <td>
                                    <h3>
                                      <b>Total:</b>
                                    </h3>
                                  </td>
                                  <td>
                                    <h3>
                                      <b>{barcodes_list.length}</b>
                                    </h3>
                                  </td>
                                  <td>
                                    <h3>
                                      <b>{total_pictures}</b>
                                    </h3>
                                  </td>
                                </tr>
                              </tfoot>
                            </table>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="box">
                    <br />

                    <div className="row">
                      <div className="col-sm-12">
                        {this.state.barcodes_list_table_bool ? (
                          <BootstrapTable
                            data={barcodes_list}
                            // footerData={footerData}
                            // footer
                            pagination
                            search
                            options={options}

                            // deleteRow={true}
                            //selectRow={selectRowProp}
                            //options={options}
                          >
                            <TableHeaderColumn
                              width="16.66%"
                              export={false}
                              dataFormat={imageView}
                              dataField="barcode"
                            >
                              Picture
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              width="16.66%"
                              isKey={true}
                              dataField="barcode"
                            >
                              Barcode
                            </TableHeaderColumn>
                            <TableHeaderColumn width="16.66%" dataField="urls">
                              Total Pictures Taken
                            </TableHeaderColumn>

                            <TableHeaderColumn
                              width="16.66%"
                              dataSort={true}
                              dataField="mrchant_NAME"
                            >
                              Mechant Name{" "}
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              width="16.66%"
                              dataSort={true}
                              dataField="date_pic"
                            >
                              Date
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              width="16.66%"
                              dataSort={true}
                              dataField="pic_taker_name"
                            >
                              Picture By
                            </TableHeaderColumn>
                          </BootstrapTable>
                        ) : (
                          ""
                        )}

                        {/* "" */}
                        {/* )} */}
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
    } else {
      return <div>Loading...</div>;
    }
  }
}
const mapStateToProps = state => {
  return {
    barcodeImageArray: state.BarcodeImageReducer.barcodeImageArray,
    barcode_detailArray: state.BarcodeImageReducer.barcode_detailArray,
    getAllBarcodeArray: state.BarcodeImageReducer.getAllBarcodeArray
    //get_all_imageArray: state.BarcodeImageReducer.get_all_imageArray,
    //images_Barcode: state.BarcodeImageReducer.images_Barcode,
    //pic_date_merchant_array: state.BarcodeImageReducer.pic_date_merchant_array
  };
};

export default connect(
  mapStateToProps,
  action
)(BarcodeImage);
