import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import AlertMessage from "../../components/messages/AlertMessage.js";
import $ from "jquery";
import {
  get_barcode,
  get_packing_drop,
  updatePacking
} from "../../actions/itempackingAction";
import { empty } from "glamor";
const action = {
  get_barcode,
  get_packing_drop,
  updatePacking
};

class ItemPacking extends Component {
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
      packing: "",
      barcode: "",
      ItemDescription: "",
      Condition: "",
      UPC: "",
      MPN: "",
      isload: false
    };
  }

  handleOnsubmit = e => {
    const data = $("#barcodeId").val();
    e.preventDefault();
    const data1 = {
      barcode: data
    };
    //console.log(data1);
    if (data <= 0 || data < -1) {
      alert(" Barcode is invalid");
      return false;
    }
    this.props.get_barcode(data1);
    this.setState({
      isload: true
    });
    // if(this.props.Get_barcodeArray == ''){
    //   this.setState({
    //     isload: false,
    //     ItemDescription: "",
    //     Condition: "",
    //     UPC: "",
    //     MPN: ""
    //   })
    // }
  };

  handleOnsubmit1 = e => {
    e.preventDefault();
    const data = {
      barcode: this.state.barcode,
      packing: this.state.packing.value,
      userid: localStorage.getItem("userId")
    };
    console.log(data);

    this.props.updatePacking(data);
  };

  componentDidMount() {
    this.props.get_packing_drop();
  }
  onHandleDrop_packing = packing => {
    this.setState({
      packing: packing
    });
  };
  onInputHandle = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onInputHandle1 = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onInputHandle2 = e => {
    const data = $("#barcodeId").val();
    if (data == "") {
      this.setState({
        isload: false,
        ItemDescription: "",
        Condition: "",
        UPC: "",
        MPN: ""
      });
    }
  };
  componentWillMount() {
    if (localStorage.getItem("userName")) {
      console.log("setion find");
    } else {
      this.setState({ redirectToReferrer: true });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.Get_barcodeArray !== this.props.Get_barcodeArray &&
      this.props.Get_barcodeArray !== ""
    ) {
      this.props.Get_barcodeArray.map(item =>
        // console.log(item)
        this.setState({
          //valueBarcode: item.BARCODE_NO,
          ItemDescription: item.DESCR,
          Condition: item.CONDI,
          UPC: item.UPC,
          MPN: item.MPN
        })
      );
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
    const data = $("#barcodeId").val();
    const enbale = this.state.packing != "";

    const selectedbarcode = [];
    this.props.Get_barcodeArray.map(item =>
      selectedbarcode.push({
        valueBarcode: item.DESCR,
        Condition: item.CONDI,
        Item: item.UPC,
        MPN: item.MPN
      })
    );
    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: "/login" }} />;
    }

    const packing_array = [];
    this.props.get_packing_array.map(item =>
      packing_array.push({
        value: item.PACKING_ID,
        label: item.PACKING_NAME
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
              Item Packing
              <small>Control panel</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <p>Home</p>
              </li>
              <li className="active"> Item Packing </li>
            </ol>
          </section>

          <section className="content">
            <div className="row">
              <div
                className="col-sm-12"
                style={{ paddingLeft: "0%", paddingRight: "0%" }}
              >
                <div className="box">
                  <div className="box-header with-border">
                    <h3 className="box-title"> Item Packing</h3>
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
                    <form onSubmit={this.handleOnsubmit}>
                      <div className="col-sm-12">
                        <div className="col-sm-7">
                          <label>Search Barcode:</label>
                          <input
                            type="number"
                            className="form-control"
                            name="barcode"
                            onKeyUp={this.onInputHandle2}
                            //value={this.state.barcode}
                            placeholder="Barcode"
                            id="barcodeId"
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
                            Search
                          </button>
                        </div>
                      </div>
                    </form>
                    {this.state.isload ? (
                      <div className="col-sm-12">
                        <br />
                        <div className="col-sm-6">
                          <label>Item Description:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="Item Description"
                            onChange={this.onInputHandle}
                            value={this.state.ItemDescription}
                            placeholder="Item Description"
                            id="ItemDescriptionId"
                            readOnly
                          />
                        </div>
                        <div className="col-sm-2">
                          <label>Condition:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="Condition"
                            onChange={this.onInputHandle}
                            value={this.state.Condition}
                            placeholder="Condition"
                            id="ConditionId"
                            readOnly
                          />
                        </div>
                        <div className="col-sm-2">
                          <label>UPC:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="UPC"
                            onChange={this.onInputHandle}
                            value={this.state.UPC}
                            placeholder="UPC"
                            id="UPCId"
                            readOnly
                          />
                        </div>
                        <div className="col-sm-2">
                          <label>MPN:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="MPN"
                            onChange={this.onInputHandle}
                            value={this.state.MPN}
                            placeholder="MPN"
                            id="MPNId"
                            readOnly
                          />
                        </div>
                        <form onSubmit={this.handleOnsubmit1}>
                          <div className="col-sm-2">
                            <br />
                            <label>Packing:</label>
                            <Select
                              id="binId"
                              // defaultValue={marchantvalue_update[0]}
                              name="packing"
                              options={packing_array}
                              value={this.state.packing}
                              onChange={this.onHandleDrop_packing}
                              className="basic-single"
                              classNamePrefix="select "
                              isSearchable
                              required
                              select-option
                            />
                          </div>
                          <div className="col-sm-2">
                            <br />
                            <br />
                            <button
                              type="submit"
                              className="btn btn-primary"
                              style={{ width: "45%", marginTop: "3px" }}
                              disabled={!enbale}
                            >
                              Save
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
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
const mapStateToProps = state => {
  return {
    Get_barcodeArray: state.itempackingReducer.Get_barcodeArray,
    get_packing_array: state.itempackingReducer.get_packing_array
  };
};
export default connect(
  mapStateToProps,
  action
)(ItemPacking);
