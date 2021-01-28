import React, { Component } from "react";
import { getMerchantDetail } from "../../action/merchantLotDetailActions.js";
import { get_Services } from "../../action/appointmentActions.js";
import {
  genrate_service_bill,
  genrate_packing_bill,
  get_packing_type,
  get_service_bill,
  delete_service_bill,
  update_service_detail
} from "../../action/genrateBillingActions.js";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import ServiceBillDataTable from "../datatables/ServiceBillDataTable.js";
import ErrorMessage from "../messages/ErrorMessage.js";
import AlertMessage from "../messages/AlertMessage.js";
import { Redirect } from "react-router-dom";

class GenrateBill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merchant_id: "",
      packingmerchant_id: "",
      service_id: "",
      packing_id: "",
      qty: "",
      service_cost: "",
      packingqty: "",
      packingservice_cost: "",
      open: false,
      open1: false,
      date: new Date(),
      packingdate: new Date(),
      showAlert: false,
      alertMessage: "",
      redirectToReferrer: false
    };
  }

  componentWillMount() {
    if (localStorage.getItem("userName")) {
      // console.log("setion find");
    } else {
      this.setState({ redirectToReferrer: true });
    }
  }

  componentDidMount() {
    const data = {
      mid: localStorage.getItem("merId"),
      user_id: localStorage.getItem("userId")
    };
    this.props.getMerchantDetail(data);
    this.props.get_Services();
    this.props.get_packing_type();
    this.props.get_service_bill();
  }

  handleOnChange = e => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  };
  handleOnChangePacking = e => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  };
  handleOnClick = e => {
    this.setState(prevState => ({
      open: !prevState.open
    }));
  };
  handleOnClick1 = e => {
    this.setState(prevState => ({
      open1: !prevState.open1
    }));
  };
  handleChangeMerchantId = merchant_id => {
    this.setState({
      ...this.state,
      merchant_id: merchant_id
    });
  };
  handleChangePackingMerchantId = packingmerchant_id => {
    this.setState({
      ...this.state,
      packingmerchant_id: packingmerchant_id
    });
  };
  handleChangeServiceId = service_id => {
    this.setState({
      ...this.state,
      service_id: service_id
    });
  };
  handleChangePackingId = packing_id => {
    this.setState({
      ...this.state,
      packing_id: packing_id
    });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    const data = {
      merchant_id: this.state.merchant_id.value,
      service_id: this.state.service_id.value,
      qty: this.state.qty,
      service_cost: this.state.service_cost,
      date: this.state.date,
      created_by: localStorage.getItem("merId")
    };

    this.props.genrate_service_bill(data);
    this.myFormRef.reset();
    console.log(data);
  };

  handleOnSubmitPacking = e => {
    e.preventDefault();
    const data = {
      packingmerchant_id: this.state.packingmerchant_id.value,
      packing_id: this.state.packing_id.value,
      packingqty: this.state.packingqty,
      packingservice_cost: this.state.packingservice_cost,
      packingdate: this.state.packingdate,
      created_by: localStorage.getItem("merId")
    };
    this.props.genrate_packing_bill(data);
    this.myFormPacking.reset();
    console.log(data);
  };

  render() {
    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: "/login" }} />;
    }
    // console.log(this.state);
    const merchant_name = [];

    this.props.merchant_name.map(item => {
      return merchant_name.push({
        value: item.MERCHANT_ID,
        label: item.CONTACT_PERSON
      });
    });
    const service_data = [];

    this.props.services.map(item => {
      return service_data.push({
        value: item.SERVICE_ID,
        label: item.SERVICE_DESC
      });
    });

    const packing_detail = [];
    this.props.packing_item_detail.map(item => {
      return packing_detail.push({
        value: item.PACKING_ID,
        label:
          item.PACKING_NAME +
          "|" +
          item.PACKING_TYPE +
          "|" +
          item.PACKING_LENGTH +
          "*" +
          item.PACKING_WIDTH +
          "*" +
          item.PACKING_HEIGTH
      });
    });
    // console.log(this.state);
    const enableServiceButton =
      this.state.merchant_id.value > 0 &&
      this.state.service_id.value > 0 &&
      this.state.qty > 0 &&
      this.state.service_cost > 0 &&
      this.state.date;

    const enablePackingButton =
      this.state.packingmerchant_id.value > 0 &&
      this.state.packing_id.value > 0 &&
      this.state.packingqty > 0 &&
      this.state.packingservice_cost > 0 &&
      this.state.packingdate;

    return (
      <React.Fragment>
        <section className="content-header">
          <h1>Generate Bills</h1>
          <ol className="breadcrumb">
            <li>
              <a href="#">
                <i className="fa fa-dashboard" /> Home
              </a>
            </li>
            <li>
              <a href="#">Genrate Bills</a>
            </li>
            <li className="active">Genrate Bills</li>
          </ol>
        </section>

        <section class="content">
          <div class="row">
            <div class="col-sm-12">
              <div className={this.state.open ? "box" : "box collapsed-box"}>
                <div className="box-header with-border">
                  <h3 className="box-title">Genrate Service Bill</h3>
                  <div className="box-tools pull-right">
                    <button
                      type="button"
                      className="btn btn-box-tool"
                      data-widget="collapse"
                      onClick={this.closeAlert}
                    >
                      <i
                        className={
                          this.state.open ? "fa fa-minus" : "fa fa-plus"
                        }
                        onClick={this.handleOnClick}
                      />
                    </button>
                  </div>
                </div>
                <div className="box-body">
                  <form
                    onSubmit={this.handleOnSubmit}
                    ref={el => (this.myFormRef = el)}
                  >
                    <div className="col-sm-2">
                      <div className="form-group">
                        <label for="servicetype">Service Name</label>
                        <div
                          className="form-group has-feedback"
                          id="servicetype"
                        >
                          <Select
                            id="servicetype"
                            // isMulti
                            options={service_data}
                            value={this.state.service_id}
                            onChange={this.handleChangeServiceId}
                            className="basic-select"
                            classNamePrefix="select"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-2">
                      <div className="form-group">
                        <label for="merchantname">Merchant Name</label>
                        <div
                          className="form-group has-feedback"
                          id="merchantname"
                        >
                          <Select
                            id="merchantname"
                            // isMulti
                            options={merchant_name}
                            value={this.state.merchant_id}
                            onChange={this.handleChangeMerchantId}
                            className="basic-select"
                            classNamePrefix="select"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-2">
                      <label>Qty</label>
                      <div className="form-group">
                        <input
                          type="number"
                          name="qty"
                          id="Qty"
                          min="1"
                          className="form-control"
                          onChange={this.handleOnChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-sm-2">
                      <label>Cost</label>
                      <div className="form-group">
                        <input
                          type="number"
                          name="service_cost"
                          id="cost"
                          min="1"
                          className="form-control"
                          onChange={this.handleOnChange}
                          required
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
                            dateFormat: "Y-m-d H:i"
                          }}
                          value={this.state.date}
                          onChange={date => {
                            this.setState({ date });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-2 ">
                      <div className="form-group">
                        <label className="control-label" />
                        <Button
                          type="submit"
                          title="Save Service Bill"
                          id="save_service"
                          name="save_service_bill"
                          className="btn btn-primary btn-block btn-flat"
                          disabled={!enableServiceButton}
                        >
                          Save Service Bill
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              {/*

                Packing Service Bill

            */}
              <div className={this.state.open1 ? "box" : "box collapsed-box"}>
                <div className="box-header with-border">
                  <h3 className="box-title">Genrate Packing Bill</h3>
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
                        onClick={this.handleOnClick1}
                      />
                    </button>
                  </div>
                </div>
                <div className="box-body">
                  <form
                    onSubmit={this.handleOnSubmitPacking}
                    ref={el => (this.myFormPacking = el)}
                  >
                    <div className="col-sm-3">
                      <div className="form-group">
                        <label for="servicetype">Packing Type</label>
                        <div
                          className="form-group has-feedback"
                          id="servicetype"
                        >
                          <Select
                            id="servicetype"
                            // isMulti
                            options={packing_detail}
                            value={this.state.packing_id}
                            onChange={this.handleChangePackingId}
                            className="basic-select"
                            classNamePrefix="select"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="form-group">
                        <label for="merchantname">Merchant Name</label>
                        <div
                          className="form-group has-feedback"
                          id="merchantname"
                        >
                          <Select
                            id="merchantname"
                            // isMulti
                            options={merchant_name}
                            value={this.state.packingmerchant_id}
                            onChange={this.handleChangePackingMerchantId}
                            className="basic-select"
                            classNamePrefix="select"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-1">
                      <label>Qty</label>
                      <div className="form-group">
                        <input
                          type="number"
                          name="packingqty"
                          id="Qty1"
                          min="1"
                          className="form-control"
                          onChange={this.handleOnChangePacking}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-sm-1">
                      <label>Cost</label>
                      <div className="form-group">
                        <input
                          type="number"
                          name="packingservice_cost"
                          id="cost1"
                          min="1"
                          className="form-control"
                          onChange={this.handleOnChangePacking}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-sm-2">
                      <label>Date Range</label>
                      <div className="form-group">
                        <Flatpickr
                          options={{
                            mode: "range",
                            // minDate: 'today',
                            dateFormat: "Y-m-d H:i"
                          }}
                          className="input-control"
                          value={this.state.packingdate}
                          onChange={packingdate => {
                            this.setState({ packingdate });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-2 ">
                      <div className="form-group">
                        <label className="control-label" />
                        <Button
                          type="submit"
                          title="Save Service Bill"
                          id="save_service"
                          name="save_service_bill"
                          className="btn btn-primary btn-block btn-flat"
                          disabled={!enablePackingButton}
                        >
                          Save Packing Bill
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-xs-12">
              <div className="box">
                <div className="box-header with-border">
                  <h3 className="box-title">Service Bills Detail</h3>
                </div>
                <div className="box-body">
                  <ServiceBillDataTable
                    data={this.props.service_bill}
                    {...this.props}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <ErrorMessage />
        <AlertMessage />
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    merchant_name: state.genrateBarcodeReducer.merchantname,
    services: state.appointmentReducer.services,
    packing_item_detail: state.genrateBillingReducer.packing_item_detail,
    service_bill: state.genrateBillingReducer.service_bills_datatable
  };
};
export default connect(
  mapStateToProps,
  {
    getMerchantDetail,
    get_Services,
    genrate_service_bill,
    genrate_packing_bill,
    get_packing_type,
    get_service_bill,
    delete_service_bill,
    update_service_detail
  }
)(GenrateBill);
