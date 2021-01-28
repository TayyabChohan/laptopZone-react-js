import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Modal, Button } from "react-bootstrap";
import InvoiceDataTableDetail from "./InvoiceDataTableDetail";
import InvoiceDetailDataTable2 from "./InvoiceDetailDataTable2.js";
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import $ from "jquery";
import dateFormat from "dateformat";

// import InvoiceDataTableDetail2 from './dashboardDataTable/InvocieDataTableDetail2.js/index.js'

const editButton = (cell, row) => {
  return (
    <React.Fragment>
      <Button
        title="Detail"
        className="btn btn-primary"
        size="sm"
        data-toggle="modal"
        data-target="#myModal"
        onClick={() => that.onClickEdit(cell, row)}
      >
        <span className="glyphicon glyphicon-list p-b-5" aria-hidden="true" />
      </Button>
      &nbsp;
      <Button
        title="Payment Recieving"
        className="btn btn-warning"
        size="sm"
        data-toggle="modal"
        data-target="#myModal1"
        onClick={() => that.onClickDetail(cell, row)}
      >
        <span className="glyphicon glyphicon-pencil p-b-5" aria-hidden="true" />
      </Button>
    </React.Fragment>
  );
};

const Dis_Charge = (cell, row) => {
  let value = 0;
  value = Number(row.DIFF_AMOUNT);
  return "$ " + value.toFixed(2);
};

const totalCharge = (cell, row) => {
  let value = Number(row.TOTAL_CHARGES);
  value = value.toFixed(2);
  return "$ " + value;
};
var that = "";
class InvoiceDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cell_Id: "",
      open: false,
      detailModel: {},
      data: [],
      paymentMethod: "",
      invoiceNumber: "",
      merchantName: "",
      createdDate: "",
      dueDate: "",
      Invoicestatus: "",
      RecieptNumber: "",
      paymentDate: "",
      totalCharges: "",
      amountPaid: "",
      balance: "",
      checkNumber: "",
      checkName: "",
      checkissuedate: "",
      incoive_id: "",
      receipt_no: ""
    };
    that = this;
  }
  onInputHandlerModel = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleDrowpChange1 = paymentMethod => {
    this.setState({
      paymentMethod: paymentMethod
    });
  };
  onClickDetail = (cell, row) => {
    // console.log(row);
    this.setState({
      invoiceNumber: row.INVOICE_CODE,
      merchantName: row.MERCHANT_NAME,
      createdDate: row.CREATED_DATE,
      dueDate: row.DUE_DATE,
      Invoicestatus: row.INVOICE_STATUS,
      paymentDate: new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "/"),
      totalCharges: Number(row.TOTAL_CHARGES).toFixed(2),
      incoive_id: row.INVOICE_ID,
      merchant_id: row.MERCHANT_ID
    });
    var id = row.MERCHANT_ID;
    this.props.get_Receipt_no(id);
  };

  handleModleOnsubmit = e => {
    e.preventDefault();
    const data = {
      merchantid: this.state.merchant_id,
      RecieptNumber: this.state.RecieptNumber,
      // paymentDate:dateFormat(this.state.paymentDate[0], "dd/mm//yyyy"),
      paymentDate: dateFormat(this.state.paymentDate[0], "yy-mmmm-dd"),
      amountPaid: $("#amountPaidId").val(),
      user_id: localStorage.getItem("userId"),
      payment_type: this.state.paymentMethod.value,
      checkNumber: this.state.checkNumber,
      checkName: this.state.checkName,
      // checkissuedate: dateFormat(this.state.checkissuedate[0], "dd/mm//yyyy"),
      checkissuedate: dateFormat(this.state.checkissuedate[0], "yy-mmmm-dd"),
      incoive_id: this.state.incoive_id
    };
    if ($("#amountPaidId").val() <= 0) {
      alert("Amount is invalid");
      return false;
    }
    // console.log(data);
    this.props.insert_payment_detail(data);
    this.setState({
      paymentDate: "",
      amountPaid: "",
      payment_type: "",
      checkNumber: "",
      checkName: "",
      checkissuedate: ""
    });
  };

  onkeyChange1 = () => {
    var data = $("#amountPaidId").val();
    const diff = this.state.totalCharges - data;
    this.setState({
      balance: diff
    });
    if (data == "") {
      this.setState({
        balance: ""
      });
    }
  };
  onClickEdit = (cell, row) => {
    //console.log(cell);
    this.setState({
      detailModel: row
    });
    this.props.get_invoice_data_detail(cell);
  };
  renderShowsTotal(start, to, total) {
    return (
      <p style={{ color: "#696969" }}>
        From {start} to {to}, totals is {total}&nbsp;&nbsp;
      </p>
    );
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.invoicePaymentarray !== this.props.invoicePaymentarray &&
      this.props.invoicePaymentarray !== ""
    ) {
      this.props.invoicePaymentarray.map(item =>
        this.setState({
          RecieptNumber: item.RECEIPT
        })
      );
    }
    // if(prevState.amountPaid !== this.state.amountPaid &&
    //   this.state.amountPaid !==''){
    //     const diff= this.state.totalCharges - this.state.amountPaid

    //     this.setState({
    //       balance:diff

    //     })
    //     console.log(this.state.amountPaid)

    //   }
  }
  // componentDidUpdate (prevProps, prevState) {
  //   const colums = []
  // }
  render() {
    // console.log(this.state.paymentMethod.value);
    const dropdown = [
      { label: "Cash", value: "0" },
      { label: "Check", value: "1" }
    ];

    // console.log(this.props.invoice_detail)
    const options = {
      page: 1, // which page you want to show as default
      sizePerPageList: [
        {
          text: "25",
          value: 25
        },
        {
          text: "50",
          value: 50
        },
        {
          text: "75",
          value: 75
        },
        {
          text: "All",
          value: this.props.invoice_detail.length
        }
      ], // you can change the dropdown list for size per page
      sizePerPage: 25, // which size per page you want to locate as default
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
      paginationPosition: "bottom", // default is bottom, top and both is all available
      clearSearch: true
      // keepSizePerPageState: true //default is false, enable will keep sizePerPage dropdown state(open/clode) when external rerender happened
      // hideSizePerPage: true > You can hide the dropdown for sizePerPage
      // alwaysShowAllBtns: true // Always show next and previous button
      // withFirstAndLast: false > Hide the going to First and Last page button
      // hidePageListOnlyOnePage: true > Hide the page list if only one page.
    };
    // console.log(this.props.datatable_data)
    // let colums = []
    const get_receipt = [];

    this.props.invoicePaymentarray.map(item =>
      get_receipt.push({
        RecieptNumber: item.RECEIPT
      })
    );
    return (
      <React.Fragment>
        {/*  Model by tayyab  */}
        <div className="modal fade" id="myModal1" role="dialog">
          <div className="modal-dialog" style={{ width: "80%" }}>
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 className="modal-title">Invoice Detail</h4>
              </div>
              <form onSubmit={this.handleModleOnsubmit}>
                <div className="modal-body">
                  <div className="col-sm-12">
                    <div className="col-sm-2">
                      <label>Invoice Number:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="invoiceNumber"
                        onChange={this.onInputHandlerModel}
                        value={this.state.invoiceNumber}
                        id="invoiceNumberId"
                        readOnly
                      />
                    </div>

                    <div className="col-sm-3">
                      <label>Merchant Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="merchantName"
                        onChange={this.onInputHandlerModel}
                        value={this.state.merchantName}
                        id="merchantNameId"
                        readOnly
                      />
                    </div>
                    <div className="col-sm-2">
                      <label>Created Date:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="createdDate"
                        onChange={this.onInputHandlerModel}
                        value={this.state.createdDate}
                        id="createdDateId"
                        readOnly
                      />
                    </div>
                    <div className="col-sm-2">
                      <label>Due Date:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="dueDate"
                        onChange={this.onInputHandlerModel}
                        value={this.state.dueDate}
                        id="dueDateId"
                        readOnly
                      />
                    </div>

                    <div className="col-sm-2">
                      <label>Invoice Status:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="Invoicestatus"
                        onChange={this.onInputHandlerModel}
                        value={this.state.Invoicestatus}
                        id="InvoicestatusId"
                        readOnly
                      />
                    </div>
                  </div>
                  <br />
                  <div className="col-sm-12">
                    <br />
                    <p>
                      --------------------------------------------------------------------------------------------------------------------Payment
                      Receipt----------------------------------------------------------------------------------------------------------------------
                    </p>
                  </div>

                  <div className="col-sm-12">
                    <div className="col-sm-3">
                      <label>Reciept Number:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="RecieptNumber"
                        onChange={this.onInputHandlerModel}
                        value={this.state.RecieptNumber}
                        id="RecieptNumberId"
                        readOnly
                      />
                    </div>
                    <div className="col-sm-3">
                      <label>Payment Date:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="paymentDate"
                        onChange={this.onInputHandlerModel}
                        value={this.state.paymentDate}
                        id="paymentDateId"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-sm-12">
                    <div className="col-sm-3">
                      <br />
                      <label>Payment Method:</label>
                      <div
                        className="form-group has-feedback"
                        style={{ width: "100%" }}
                      >
                        <Select
                          id="paymentMethod"
                          // defaultValue={dropValue[1]}
                          name="paymentMethod"
                          options={dropdown}
                          value={this.state.paymentMethod}
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
                    {this.state.paymentMethod.value == "1" ? (
                      <div id="servicetype">
                        <div className="col-sm-2">
                          <br />
                          <label>Check Number:</label>
                          <input
                            type="number"
                            className="form-control"
                            name="checkNumber"
                            onChange={this.onInputHandlerModel}
                            value={this.state.checkNumber}
                            id="paymentDateId"
                            // disabled={!anable}
                            required
                          />
                        </div>

                        <div className="col-sm-2">
                          <br />
                          <label>Check Name:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="checkName"
                            onChange={this.onInputHandlerModel}
                            value={this.state.checkName}
                            id="paymentDateId"
                            // disabled={!anable}
                            required
                          />
                        </div>
                        <div className="col-sm-2">
                          <br />

                          <div className="form-group has-feedback">
                            <label htmlFor="ActiveFromdate">
                              Check Issue Date:
                            </label>
                            <div className="input-group">
                              <Flatpickr
                                options={{
                                  minDate: "today",
                                  dateFormat: "Y-m-d ",
                                  name: "checkissuedate"
                                  //defaultDate:this.state.dateFromUpdate
                                  //selectedDates:this.state.dateFromUpdate
                                }}
                                value={this.state.checkissuedate}
                                onChange={checkissuedate => {
                                  this.setState({ checkissuedate });
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div className="col-sm-12">
                    <div className="col-sm-3">
                      <label>Total Charges:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="totalCharges"
                        onChange={this.onInputHandlerModel}
                        value={this.state.totalCharges}
                        id="paymentDateId"
                        readOnly
                      />
                    </div>
                    <div className="col-sm-3">
                      <label>Amount Paid:</label>
                      <input
                        type="number"
                        className="form-control"
                        name="amountPaid"
                        onKeyUp={this.onkeyChange1}
                        id="amountPaidId"
                        required
                      />
                    </div>

                    <div className="col-sm-3">
                      <label>Balance:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="balance"
                        onChange={this.onInputHandlerModel}
                        value={this.state.balance}
                        id="balanceId"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
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
        {/*  Model bt tayyab */}
        {/*  Model  */}
        <div
          id="myModal"
          className="modal fade"
          role="dialog"
          // data-backdrop='static'
          // data-keyboard='false'
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-custom  modal-lg">
            {/* Modal content--> */}
            <div className="modal-content" style={{ width: "100%" }}>
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 className="modal-title"> Invoice Details</h4>
              </div>
              <div className="modal-body">
                <section className="content">
                  <div className="row">
                    <div className="col-sm-12">
                      {/* <div className='box'> */}
                      {/* <div className='box-header'>
                          <h1 className='box-title' style={{ color: 'black' }}>
                            Invoice Detail
                          </h1>
                          <div className='box-tools pull-right' />
                        </div> */}
                      {/* <div className='modal-body'> */}
                      <div className="col-sm-5">
                        <label htmlFor="merchant_name">Merchant Name</label>
                        <ul className="list-group">
                          <li
                            className="list-group-item"
                            key={this.state.detailModel.INVOICE_ID}
                          >
                            {this.state.detailModel.MERCHANT_NAME}
                          </li>
                        </ul>
                        {/* </div> */}
                      </div>
                      <InvoiceDetailDataTable2
                        data1={this.props.invoice_data_detail || []}
                        {...this.props}
                        invoice_id={this.state.detailModel.INVOICE_ID}
                      />
                    </div>
                  </div>
                  {/* </div> */}
                </section>
              </div>
            </div>
          </div>
        </div>
        {/* Model End */}
        <BootstrapTable
          data={this.props.invoice_detail}
          striped
          // hover
          condensed
          pagination
          search
          options={options}
          searchPlaceholder="Search..."
          csvFileName="Barcode Detail"
          exportCSV
          // containerStyle={ { background: '#00ff00' } }
          // tableStyle={{ background: '#DCDCDC' }}
          // headerStyle={{ background: '#DCDCDC' }}
        >
          <TableHeaderColumn
            width="10%"
            headerAlign="center"
            dataAlign="center"
            dataField="INVOICE_ID"
            dataFormat={editButton}
            isKey
            dataSort
          >
            Action
          </TableHeaderColumn>
          <TableHeaderColumn
            width="10%"
            headerAlign="center"
            dataAlign="center"
            dataField="INVOICE_CODE"
            dataSort
          >
            Invoice Number
          </TableHeaderColumn>
          {/* <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='BUISNESS_NAME'
            dataSort
          >
            Merchant Name
          </TableHeaderColumn> */}
          <TableHeaderColumn
            width="8%"
            headerAlign="center"
            dataAlign="center"
            dataField="MERCHANT_NAME"
            dataSort
          >
            Merchant Name
          </TableHeaderColumn>
          <TableHeaderColumn
            width="10%"
            headerAlign="center"
            dataAlign="center"
            dataField="TOTAL_CHARGES"
            dataFormat={totalCharge}
            dataSort
          >
            Total Charges
          </TableHeaderColumn>
          <TableHeaderColumn
            width="10%"
            headerAlign="center"
            dataAlign="center"
            dataField="DIS_AMOUNT"
            dataFormat={Dis_Charge}
            dataSort
            hidden
          >
            Discount Amount
          </TableHeaderColumn>
          <TableHeaderColumn
            width="10%"
            headerAlign="center"
            dataAlign="center"
            dataField="DIS_AMOUNT_PERC"
            dataSort
            hidden
          >
            Discount %
          </TableHeaderColumn>
          <TableHeaderColumn
            width="10%"
            headerAlign="center"
            dataAlign="center"
            dataField="DIFF_AMOUNT"
            dataFormat={Dis_Charge}
            dataSort
          >
            Discounted Charges
          </TableHeaderColumn>

          <TableHeaderColumn
            width="10%"
            headerAlign="center"
            dataAlign="center"
            dataField="TOTAL_SERVICES"
            dataSort
          >
            Total services
          </TableHeaderColumn>
          <TableHeaderColumn
            width="8%"
            headerAlign="center"
            dataAlign="center"
            dataField="CREATED_DATE"
            dataSort
          >
            Created Date
          </TableHeaderColumn>
          <TableHeaderColumn
            width="10%"
            headerAlign="center"
            dataAlign="center"
            dataField="DUE_DATE"
            dataSort
          >
            Due Date
          </TableHeaderColumn>
          <TableHeaderColumn
            width="10%"
            headerAlign="center"
            dataAlign="center"
            dataField="INVOICE_STATUS"
          >
            Invoice Status
          </TableHeaderColumn>
        </BootstrapTable>
      </React.Fragment>
    );
  }
}

export default InvoiceDetail;
