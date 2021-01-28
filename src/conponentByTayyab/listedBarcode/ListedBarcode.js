import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import swal from "sweetalert";
import { toastr } from "react-redux-toastr";
// import '../../../public/assets/fontello/css/fontello.css';
import $ from "jquery";
import AlertMessage from "../../components/messages/AlertMessage.js";
import {
  Get_listed_barcode,
  Get_Image_DecodeBase64,
  get_conditionArray,
  get_listed_barcode_all
} from "../../actions/listedBarcodeAction.js";
import { RViewer, RViewerTrigger } from "react-viewerjs";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import Flatpickr from "react-flatpickr";
import "gasparesganga-jquery-loading-overlay";
import dateFormat from "dateformat";
const action = {
  Get_listed_barcode,
  Get_Image_DecodeBase64,
  get_conditionArray,
  get_listed_barcode_all
  // get_all_barcode
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
    <div id={cell}>
      {row.FB == "1" ? (
        <button
          className="btn btn-warning btn-xs facebook"
          data-toggle="modal"
          data-target="#myModal"
          onClick={() => that.clickselectFacebook(cell, row)}
        >
          facebook
        </button>
      ) : (
        <button
          className="btn btn-default btn-xs facebook"
          data-toggle="modal"
          data-target="#myModal"
          onClick={() => that.clickselectFacebook(cell, row)}
        >
          facebook
        </button>
      )}
      {/* <span className="glyphicon glyphicon-leaf p-b-5" aria-hidden="true" /> */}
      &nbsp;
      {row.OFFERUP == "1" ? (
        <button
          className="btn btn-danger btn-xs OfferUp"
          data-toggle="modal"
          data-target="#myModal"
          value="OfferUp"
          onClick={() => that.clickselecoffeUp(cell, row)}
        >
          OfferUp
          {/* <span className="glyphicon glyphicon-facebook p-b-5" aria-hidden="true" /> */}
        </button>
      ) : (
        <button
          className="btn btn-default btn-xs OfferUp"
          data-toggle="modal"
          data-target="#myModal"
          value="OfferUp"
          onClick={() => that.clickselecoffeUp(cell, row)}
        >
          OfferUp
          {/* <span className="glyphicon glyphicon-facebook p-b-5" aria-hidden="true" /> */}
        </button>
      )}
      &nbsp;
      {row.CRAIGLIST == "1" ? (
        <button
          className="btn btn-primary btn-xs Craiglistic"
          data-toggle="modal"
          data-target="#myModal"
          onClick={() => that.clickselectCraiglistic(cell, row)}
        >
          Craiglistic
          {/* <span className="glyphicon glyphicon-leaf p-b-5" aria-hidden="true" /> */}
        </button>
      ) : (
        <button
          className="btn btn-default btn-xs Craiglistic"
          data-toggle="modal"
          data-target="#myModal"
          onClick={() => that.clickselectCraiglistic(cell, row)}
        >
          Craiglistic
          {/* <span className="glyphicon glyphicon-leaf p-b-5" aria-hidden="true" /> */}
        </button>
      )}
    </div>
  );
}

that = "";
class ListedBarcode extends Component {
  constructor(props) {
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    super(props);
    this.state = {
      error: null,
      isLoaded: true,
      baseUrl: finalurl,
      redirectToReferrer: false,
      barcodeNo: "",
      Title: "",
      UserName: "",
      Condition: "",
      BarcodeQty: "",
      Description: "",
      offerUp: "",
      Url: "",
      Mpn: "",
      Brand: "",
      UPC: "",
      images: [],
      nonListedData: [],
      value: "",
      Quantity: "1",
      Price: "",
      check_other: "",
      id: "",
      Price1: "",
      date: "",
      ListedData_sold: [],
      ListedData_check_list: [],
      LIST_id: "",
      enable:false,
      row_id: ""
    };
    that = this;
  }

  getBarcodeShortage = () => {
    $.LoadingOverlay("show");

    let insertUrl = `${finalurl}/laptopzone/reactControllertest/c_react_test/get_listed_barcode_all`;
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

  saveBarcode = data => {
    $.LoadingOverlay("show");
    // console.log(data);
    this.setState({
      images: []
    });
    let insertUrl = `${finalurl}/laptopzone/reactControllertest/c_react_test/Save_listed_barcode`;
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
          if (result.state) {
            toastr.success("Seccuss", "Succefully Save");
            this.setState({
              nonListedData: result.data,
              images: result.images
            });
            $('#form_id input').val('');
          } else {
            toastr.error("Error", "Barcode Already Exist");
          }
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
  savemarketPlace = data => {
    $.LoadingOverlay("show");
    // console.log(data);
    this.setState({
      images: []
    });
    let insertUrl = `${finalurl}/laptopzone/reactControllertest/c_react_test/Save_marcket_place`;
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
          if (result.data) {
            toastr.success("Seccuss", "Succefully Save");
            this.setState({
              ListedData: result.data
            });
            $('#itemStatus input').val('');
            if(this.state.lable1 ==='facebook'){
            $('#'+ this.state.row_id + ' .facebook').addClass("btn-warning");
            $('#'+ this.state.row_id + ' .facebook').removeClass("btn-default");
            }
            if(this.state.lable1 ==='Craiglistic'){
              $('#'+ this.state.row_id + ' .Craiglistic').addClass("btn-primary");
              $('#'+ this.state.row_id + ' .Craiglistic').removeClass("btn-default");
            }
            if(this.state.lable1 ==='OfferUp'){
              $('#'+ this.state.row_id + ' .OfferUp').addClass("btn-danger");
              $('#'+ this.state.row_id + ' .OfferUp').removeClass("btn-default")
            }
          } else {
            toastr.error("Error", "Data Already Listed");
          }
        } else {
          this.setState({
            ListedData: []
          });
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };
  savemarketPlace_as_sold = data1 => {
    $.LoadingOverlay("show");
    // console.log(data);
    this.setState({
      images: []
    });
    let insertUrl = `${finalurl}/laptopzone/reactControllertest/c_react_test/Save_marcket_place_as_sold`;
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: data1
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
          if (result.data) {
            toastr.success("Seccuss", "Succefully Save");
            this.setState({
              ListedData_sold: result.data
            });
            // $('#itemStatus').trigger("reset");
            $('#itemStatus input').val('');
            if(this.state.lable1 ==='facebook'){
              $('#'+ this.state.row_id + ' .facebook').addClass("btn btn-outline-warning");
              $('#'+ this.state.row_id + ' .facebook').removeClass("btn-default");
              }
              if(this.state.lable1 ==='Craiglistic'){
                $('#'+ this.state.row_id + ' .Craiglistic').addClass("btn btn-outline-primary");
                $('#'+ this.state.row_id + ' .Craiglistic').removeClass("btn-default");
              }
              if(this.state.lable1 ==='OfferUp'){
                $('#'+ this.state.row_id + ' .OfferUp').addClass("btn btn-outline-danger");
                $('#'+ this.state.row_id + ' .OfferUp').removeClass("btn-default")
              }
          } else {
            toastr.error("Error", "Data Already Listed");
          }
        } else {
          this.setState({
            ListedData_sold: []
          });
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };
  check_list_id = data => {
    this.setState({
      Url: "",
      Price: "",
      Price1: "",
      date: "",
      enable : false,
      check_other:''
    })
    $("#check_other").prop("checked", false);
      $(".checkQTY").addClass("hide");
    $.LoadingOverlay("show");
    // console.log(data);

    let insertUrl = `${finalurl}/laptopzone/reactControllertest/c_react_test/to_check_list_id`;
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
          if (result.data) {
            toastr.success("Seccuss", "Succefully Found");
            this.setState({
              ListedData_check_list: result.data
            });
            console.log(this.state.ListedData_check_list);
          } else {
            // toastr.error("Error", "Data Already Listed");
          }
        } else {
          this.setState({
            ListedData_check_list: []
          });
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };
  clickselecoffeUp = (cell, row) => {
    console.log(cell)
    this.setState({
      id: row.AD_ID,
      value: "11",
      lable1: "OfferUp",
      row_id : cell
    });
    //console.log(row.BARCODE_PRV_NO);
    const data = {
      add_id: row.AD_ID,
      portal_id: "11"
      
    };
    console.log(data);
    this.check_list_id(data);
  };
  clickselectFacebook = (cell, row) => {
   
    console.log(cell)
    this.setState({
      id: row.AD_ID,
      value: "12",
      lable1: "facebook",
      row_id : cell,
      
    });
    const data = {
      add_id: row.AD_ID,
      portal_id: "12"
      
    };
    console.log(data);
    this.check_list_id(data);
    //console.log(row.BARCODE_PRV_NO);
  };
  clickselectCraiglistic = (cell, row) => {
    console.log(cell)
    this.setState({
      id: row.AD_ID,
      value: "9",
      lable1: "Craiglistic",
      row_id : cell
    });
    const data = {
      add_id: row.AD_ID,
      portal_id: "9"
     
    };
    console.log(data);
    this.check_list_id(data);
    //console.log(row.BARCODE_PRV_NO);
  };
  componentDidUpdate(preProps, preState) {
    if (
      preProps.getlisted_array !== this.props.getlisted_array &&
      this.props.getlisted_array !== ""
    ) {
      this.props.getlisted_array.map(item =>
        this.setState({
          Title: item.MPN_DESC,
          Mpn: item.MPN,
          Brand: item.BRAND,
          UPC: item.UPC,
          Condition:{value:item.ID, label:item.COND_NAME}
          
          // Condition: item.COND_NAME
        })
      );
    }
    if (
      preState.ListedData_check_list !== this.state.ListedData_check_list &&
      this.state.ListedData_check_list !== ""
    ) {
      this.state.ListedData_check_list.map(item =>
        this.setState({
          Url: item.LIST_URL,
          Price: item.LIST_PRICE,
          LIST_id: item.LIST_ID,
          enable: true
        })
      );
    }
  }
  handleModleOnsubmit_update = e => {
    // this.setState({ [e.target.name]: e.target.value });
    
      //$('#myModal').modal('hide')
      $("#myModal .close").click();
      $("#statusCheck input[type=radio]").prop("checked", false);

    if (this.state.check_other == "on") {
      const data1 = {
        Price: this.state.Price1,
        dty: this.state.Quantity,
        date: dateFormat(this.state.date, "yyyy-mm-dd HH:MM:ss"),
        listed_by: localStorage.getItem("userId"),
        LIST_ID: this.state.LIST_id
      };

      this.savemarketPlace_as_sold(data1);
      this.setState({
        Price: "",
        dty: "",
        date: "",
        listed_by: "",
        LIST_ID: ""
      });
    } else {
      const data = {
        id_add: this.state.id,
        port_id: this.state.value,
        url: this.state.Url,
        price: this.state.Price,
        listed_by: localStorage.getItem("userId"),
        LIST_ID: this.state.LIST_id
      };
      console.log(data);

      this.savemarketPlace(data);
      this.setState({
        id_add: "",
        port_id: "",
        url: "",
        price: "",
        dty: ""
      });
    }
  };
  onsubmitHanlde_1 = e => {
    e.preventDefault();
    const data = {
      Title: this.state.Title,
      Mpn: this.state.Mpn,
      Condition: this.state.Condition,
      Brand: this.state.Brand,
      UPC: this.state.UPC,
      Description: this.state.Description,
      barcode_no: this.state.barcodeNo
    };
    //console.log(data);
    this.saveBarcode(data);
    this.setState({
      Title: "",
      Mpn: "",
      Brand: "",
      UPC: "",
      Description: "",
      barcode_no: "",
      Condition:''
    });
  };
  onsubmitHanlde = e => {
    e.preventDefault();
    const data = {
      barcodeNo: this.state.barcodeNo
    };
    this.props.Get_listed_barcode(data);
    this.props.Get_Image_DecodeBase64(data);
    // console.log(data);
  };
  onkeyChange1 = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onInputHandler1 = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  formHandler_update = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    //this.props.get_offerUp();
    this.props.get_conditionArray();
    this.getBarcodeShortage();
  }
  // onHandletDrop = offerUp => {
  //   this.setState({
  //     offerUp: offerUp
  //   });
  // };
  onHandletDrop1 = Condition => {
    this.setState({
      Condition: Condition
    });
  };

  renderShowsTotal(start, to, total) {
    return (
      <p style={{ color: "#696969" }}>
        From {start} to {to}, totals is {total}&nbsp;&nbsp;
      </p>
    );
  }
  handleOnChange_check = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state.check_other);
    if (this.state.check_other == "") {
      this.setState({
        check_other: "on"
      });
    } else {
      this.setState({
        check_other: ""
      });
    }

    if (this.state.check_other == "") {
      $("#check_other").prop("checked", true);
      $(".checkQTY").removeClass("hide");
    } else {
      $("#check_other").prop("checked", false);
      $(".checkQTY").addClass("hide");
    }

    //$("#equalLike").prop("checked", false);
  };
  componentWillMount() {
    if (sessionStorage.getItem("userName")) {
      console.log("setion find");
    } else {
      this.setState({ redirectToReferrer: true });
    }
  }

  render() {
    const enable2=this.state.Condition !==null
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
        }
        //   {
        //     text: "All",
        //     value: barcodes_list.length //barcodes_list_length
        //   }
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

    // console.log(this.state.detail_dbarcode);

    const conditionDrop = [];
    this.props.conditionArray.map(item => {
      return conditionDrop.push({
        label: item.COND_NAME,
        value: item.ID
      });
    });
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
              Barcode Listed Form
              <small>Control panel</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <p>Home</p>
              </li>
              <li className="active"> Listed Barcode </li>
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
                    <form id="itemStatus" action="#" >
                    <div className="modal-body">
                      <div className="col-sm-12">
                        <div className="col-sm-2">
                          <label>Market Place:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="lable1"
                            onChange={this.formHandler_update}
                            value={this.state.lable1}
                            placeholder={this.state.lable1}
                            id="nameid"
                            readOnly
                            required
                          />
                        </div>
                        {this.state.enable == true && this.state.check_other =='on' ? (
                          <div>
                            <div className="col-sm-6">
                              <label>Url:</label>
                              <input
                                type="text"
                                className="form-control"
                                name="Url"
                                onChange={this.formHandler_update}
                                value={this.state.Url}
                                placeholder="Url"
                                id="Urlid"
                                required
                                readOnly
                              />
                            </div>

                            <div className="col-sm-2">
                              <label>Price:</label>
                              <input
                                type="number"
                                className="form-control"
                                name="Price"
                                onChange={this.formHandler_update}
                                value={this.state.Price}
                                placeholder="Price"
                                id="Priceid"
                                required
                                readOnly
                              />
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="col-sm-6">
                              <label>Url:</label>
                              <input
                                type="text"
                                className="form-control"
                                name="Url"
                                onChange={this.formHandler_update}
                                value={this.state.Url}
                                placeholder="Url"
                                id="Urlid"
                                required
                              />
                            </div>

                            <div className="col-sm-2">
                              <label>Price:</label>
                              <input
                                type="number"
                                className="form-control"
                                name="Price"
                                onChange={this.formHandler_update}
                                value={this.state.Price}
                                placeholder="Price"
                                id="Priceid"
                                required
                              />
                            </div>
                            {this.state.check_other =='on' ?
                            ''
                        :<div className="col-sm-2">
                        <br />
                        <button
                          type="button"
                          className="btn btn-primary"
                          style={{ width: "45%", marginTop: "3px" }}
                          // data-dismiss="modal"
                          // value={this.props.show}
                          onClick={this.handleModleOnsubmit_update}
                          
                          // disabled={!enable1}
                        >
                          Save
                        </button>
                      </div>}
                          </div>
                        )}
                      </div>

                      <div className="col-sm-12">
                        <div className="col-sm-2">
                          <label> Markrd As Sold:</label>
                          <br />
                          <div
                            className="custom-control custom-radio custom-control-inline"
                            style={{ display: "inline" }}
                          >
                            <input
                              type="checkbox"
                              name="check_other"
                              id="check_other"
                              onChange={this.handleOnChange_check}
                            />
                            <label
                              className="custom-control-label"
                              for="faultInline1"
                            ></label>
                          </div>
                        </div>

                        <div className="col-sm-2 hide checkQTY">
                          <label>Quantity:</label>
                          <input
                            type="number"
                            className="form-control"
                            name="Quantity"
                            onChange={this.formHandler_update}
                            value={this.state.Quantity}
                            placeholder="Quantity"
                            id="Quantityid"
                            required
                          />
                        </div>
                        <div className="col-sm-2 hide checkQTY">
                          <label>Price:</label>
                          <input
                            type="number"
                            className="form-control"
                            name="Price1"
                            onChange={this.formHandler_update}
                            value={this.state.Price1}
                            placeholder="Price"
                            id="Price1id"
                            required
                          />
                        </div>
                        <div className="col-sm-2 hide checkQTY">
                          <label>Date</label>
                          <div className="input-group">
                            <Flatpickr
                              options={{
                                // mode: "range",
                                // minDate: 'today',
                                enableTime: true,
                                dateFormat: "Y-m-d H:i",
                                name: "name"
                                //defaultDate: ""
                                //wrap: true
                              }}
                              value={this.state.date}
                              onChange={date => {
                                this.setState({ date });
                              }}
                            />
                          </div>
                        </div>
                        {this.state.check_other =='on' ?
                        <div className="col-sm-2">
                          <br />
                          <button
                            type="button"
                            className="btn btn-primary"
                            style={{ width: "45%", marginTop: "3px" }}
                            // data-dismiss="modal"
                            // value={this.props.show}
                            onClick={this.handleModleOnsubmit_update}
                            // disabled={!enable1}
                          >
                            Save
                          </button>
                        </div>
                        :''}
                        <div className="col-sm-2 hide checkQTY">
                          <input
                            type="hidden"
                            className="form-control"
                            name="LIST_id"
                            onChange={this.formHandler_update}
                            value={this.state.LIST_id}
                            placeholder="LIST_id"
                            id="Price1id"
                            required
                            hidden
                          />
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-dismiss="modal"
                      >
                        Cancel
                      </button>
                    </div>
                    </form>
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
                  <h3 className="box-title"> Listed Barcode </h3>
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
                      <div className="col-sm-2">
                        <label>Barcode:</label>
                        <input
                          type="number"
                          className="form-control"
                          name="barcodeNo"
                          value={this.state.barcodeNo}
                          onChange={this.onkeyChange1}
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
                    </div>
                  </form>
                  <form id='form_id'
                    onSubmit={this.onsubmitHanlde_1}
                    ref={el => (this.myFormRef = el)}
                  >
                    <div className="col-sm-12">
                      <div className="col-sm-4">
                        <br />
                        <label>Title:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="Title"
                          onChange={this.onInputHandler1}
                          value={this.state.Title}
                          id="TitleId"
                          required
                        />
                      </div>

                      <div className="col-sm-2">
                        <br />
                        <label>Condition:</label>
                        <div
                          className="form-group has-feedback"
                          style={{ width: "100%" }}
                        >
                          <Select
                            id="Citydropid"
                            // defaultValue={dropValue[1]}
                            name="Condition"
                            options={conditionDrop}
                            value={this.state.Condition}
                            onChange={this.onHandletDrop1}
                            className="basic-single"
                            classNamePrefix="select"
                            isSearchable
                            required
                            select-option
                          />
                        </div>
                      </div>

                      <div className="col-sm-2">
                        <br />
                        <label>Brand:</label>
                        <input
                          type="float"
                          className="form-control"
                          name="Brand"
                          onChange={this.onInputHandler1}
                          value={this.state.Brand}
                          id="BrandId"
                          required
                        />
                      </div>
                      <div className="col-sm-2">
                        <br />
                        <label>Mpn:</label>
                        <input
                          type="float"
                          className="form-control"
                          name="Mpn"
                          onChange={this.onInputHandler1}
                          value={this.state.Mpn}
                          id="MpnId"
                        />
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="col-sm-2">
                        <label>Upc:</label>
                        <input
                          type="float"
                          className="form-control"
                          name="UPC"
                          onChange={this.onInputHandler1}
                          value={this.state.UPC}
                          id="MpnId"
                        />
                      </div>
                      <div className="col-sm-2">
                        <br />
                        <br />
                        <button
                          className="btn btn-warning"
                          type="submit"
                          style={{ paddingTop: "6%", width: "40%" }}
                          disabled={!enable2}
                        >
                          Save
                        </button>
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
                    <div className="col-sm-12" id="pic_id">
                      <br />
                      {this.props.imag_array ? (
                        <RViewer
                          options={options}
                          imageUrls={this.props.imag_array}
                        >
                          <ul>
                            {this.props.imag_array.map((pic, index) => {
                              return (
                                <React.Fragment>
                                  <li
                                    key={index}
                                    style={{
                                      width: "140px",
                                      height: "130px",
                                      float: "left",
                                      overflow: " hidden"
                                      // position: "relative"
                                    }}
                                  >
                                    {/* <span>image {index + 1}</span> */}
                                    {/* By default, the index value is 0,So it is necessary to set the index prop */}
                                    <RViewerTrigger index={index}>
                                      <div className="col-md-12">
                                        <img
                                          className="getmyCss"
                                          src={pic}
                                          width="90px"
                                          height="90px"
                                        />
                                      </div>
                                    </RViewerTrigger>
                                    &nbsp; &nbsp; &nbsp; &nbsp;image {index + 1}
                                  </li>
                                </React.Fragment>
                              );
                            })}
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

            <div className="row">
              <div className="col-sm-12">
                <div className="box">
                  <br />

                  <div className="row">
                    <div className="col-sm-12">
                      <BootstrapTable
                        data={this.state.nonListedData || []}
                        pagination
                        search
                        options={options}
                      >
                        <TableHeaderColumn
                          width="11.11%"
                          export={false}
                          dataFormat={actionFormatter}
                          dataField="AD_ID"
                        >
                          Action
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="11.11%"
                          export={false}
                          dataFormat={imageView || []}
                          dataField="BARCODE_PRV_NO"
                        >
                          Picture
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          width="11.11%"
                          isKey={true}
                          dataField="BRAND"
                        >
                          Brand
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="11.11%"
                          dataField="CONDITION_NAME"
                        >
                          Condition Name
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          width="11.11%"
                          dataSort={true}
                          dataField="ITEM_DESC"
                        >
                          Item Description{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="10.66%"
                          dataSort={true}
                          dataField="MPN"
                        >
                          Mpn
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="11.11%"
                          dataSort={true}
                          dataField="UPC"
                        >
                          Upc
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="11.11%"
                          dataSort={true}
                          dataField="PORTAL_ID"
                          hidden
                        >
                          portal Id
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="11.11%"
                          dataSort={true}
                          dataField="BARCODE_PRV_NO"
                        >
                          Barcode No
                        </TableHeaderColumn>
                      </BootstrapTable>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <AlertMessage />
          </section>
          {/* <AlertMessage /> */}
        </React.Fragment>
      );
    }
  }
}
const mapStateToProps = state => {
  return {
    getlisted_array: state.listedBarcodeReducer.getlisted_array,
    imag_array: state.listedBarcodeReducer.imag_array,
    conditionArray: state.listedBarcodeReducer.conditionArray
  };
};

export default connect(
  mapStateToProps,
  action
)(ListedBarcode);
