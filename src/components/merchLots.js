import React from "react";
//import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
//import jQuery from 'jquery';
import NumberFormat from 'react-number-format';
import "gasparesganga-jquery-loading-overlay";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { css } from 'glamor';
import './App.css'
//import openModalMode from './openModalModel.js';
import { toast } from 'react-toastify';
import $ from "jquery";



function getLotData(param) {
  // $('#serRateId').val(rate_id);
  // $('#merchantId').val(merchant_id);

  var getUrl = window.location;
  var finalurl = getUrl.protocol + "//" + getUrl.hostname;

  // /console.log(merchant_id ,rate_id);
  let insertUrl = finalurl + "/laptopzone/reactcontroller/c_react/merch_lot_dash";
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: insertUrl,
      dataType: "json",
      type: "POST",
      data: {'merchId': sessionStorage.getItem("merId") },
      
    }).then(
      function (data) {
        resolve(data);
      },
      function (err) {
        reject(err);
      }
    );
  });
}

var that = "";
//var barcodesList  = [];
function loadLotData(param) {
  // $('#serRateId').val(rate_id);
  // $('#merchantId').val(merchant_id);
  // alert(servRateId);
  var lot = [];
  $.LoadingOverlay("show");

  //alert(servRateId);

  getLotData(param)
    .then(result => {
      $.LoadingOverlay("hide");
      //console.log(result);
      if (result) {
        //var barcodesList ='';

         lot = result.merchLotData;
        //alert(lot);
        var lotsList = [];

        var length = lot.length;
        //console.log('lengths'+ length);        

        for (var i = 0; i < length; i++) {
          lotsList.push({
            ref_no: lot[i].REF_NO,
            lot_description: lot[i].LOT_DESCRIPTION,
            creation_date: lot[i].CREATION_DATE,
            lot_cost: "$ " +lot[i].LOT_COST,
            lot_count: lot[i].LOT_COUNT,
            total_listed: lot[i].TOTAL_LISTED,
            total_list_amount: "$ " +lot[i].TOTAL_LIST_AMOUNT,
            activ_listed: lot[i].ACTIV_LISTED,
            activ_list_amount: "$ " +lot[i].ACTIV_LIST_AMOUNT,
            total_sold: lot[i].TOTAL_SOLD,
            sold_amount: "$ " +lot[i].SOLD_AMOUNT,
            lj_charges: "$ " +Number(lot[i].LJ_CHARGES).toFixed(2),
            expenses: "$ " +Number(lot[i].EXPENSES).toFixed(2),
            chrg_or_expens: "$ " +Number(lot[i].CHRG_OR_EXPENS).toFixed(2),
            projected_earning: "$ " +Number(lot[i].PROJECTED_EARNING).toFixed(2),

            // ebay_charges: Number(lot[i].CHARGES).toFixed(2),
            // ebay_charges_two: Number(lot[i].CHARGES).toFixed(4),
            // order_id: lot[i].ORDER_ID,
            // packing_cost: Number(lot[i].PACKING_COST).toFixed(2),
            // qty: lot[i].QTY,
            // shiping_rate: Number(lot[i].SHIPING_RATE).toFixed(2),
            // eba_fee: Number(lot[i].EBA_FEE).toFixed(2),
            // marktplace: Number(lot[i].MARKTPLACE).toFixed(4),
            // sales_record_number: lot[i].SALES_RECORD_NUMBER,
          });
        }
        
        that.setState({
          bars: lotsList
        });
        //alert('asd');
         //console.log(that.state.bars);
        

      } else {
      }
    })
    .catch(err => {
      $.LoadingOverlay("hide");
      //console.log(err);
    });
}

class MerchLots extends React.Component {
  constructor (props) {
    var getUrl = window.location
    var finalurl = getUrl.protocol + '//' + getUrl.hostname

    super(props);
    that = this;
    this.state = {
      baseUrl: finalurl,
      error: null,
      isLoaded: false,
      merchLotData: [],
      redirectToReferrer: false,
      messg: 'Loading .....'
    }
  }

  componentDidMount () {
    var  param='';
    loadLotData(param);    
  }

  componentWillMount () {
    if (sessionStorage.getItem('userName')) {
      console.log('setion find')
    } else {
      this.setState({ redirectToReferrer: true })
    }
  }

  render () {
    const { error, isLoaded } = this.state
    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: '/login' }} />
    }

    return (
      <React.Fragment>
        <section className="content-header">
          <h1>Lot Report</h1>
          <ol className="breadcrumb">
            <li>
              <a href="#">
                <i className="fa fa-dashboard" /> Home
              </a>
            </li>
            <li>
              <a href="#">Tables</a>
            </li>
            <li className="active">Lot Report</li>
          </ol>
        </section>

        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">Lot Report</h3>
                </div>

                <div className="box-body">
                  <div className="row">
                    <div className="col-xs-12">
                      <BootstrapTable data={this.state.bars}                          
                          striped
                          search
                          hover
                          >

                          <TableHeaderColumn dataField="ref_no"
                             dataAlign='left' width='80px'>Ref #</TableHeaderColumn>

                          <TableHeaderColumn dataField="lot_description" isKey
                             headerAlign='center' dataAlign='left' width='150px'>Description</TableHeaderColumn>

                          <TableHeaderColumn dataField="creation_date"
                              dataAlign='left' width='100px'>Create Date</TableHeaderColumn>

                          <TableHeaderColumn dataField="lot_cost"
                              headerAlign='center' dataAlign='right' width='100px'>Lot Cost</TableHeaderColumn>

                          <TableHeaderColumn dataField="lot_count"
                             headerAlign='center' dataAlign='right' width='100px' >Barcodes Count</TableHeaderColumn>

                          <TableHeaderColumn dataField="total_listed"
                            
                             headerAlign='center' dataAlign='right' width='100px'>Total Listed</TableHeaderColumn>

                            <TableHeaderColumn dataField="total_list_amount"
                            
                             headerAlign='center' dataAlign='right' width='100px'>Total Listed Amount (Tl)</TableHeaderColumn>

                            <TableHeaderColumn dataField="activ_listed"
                            
                             headerAlign='center' dataAlign='right' width='100px'>Active Listed</TableHeaderColumn>

                            <TableHeaderColumn dataField="activ_list_amount"
                            
                             headerAlign='center' dataAlign='right' width='100px'>Active Listed Amount</TableHeaderColumn>

                            <TableHeaderColumn dataField="total_sold"
                            
                             headerAlign='center' dataAlign='right' width='100px'>Total Sold</TableHeaderColumn>

                            <TableHeaderColumn dataField="sold_amount"
                            
                             headerAlign='center' dataAlign='right' width='100px'>Total Sold Amount</TableHeaderColumn>

                            
                            <TableHeaderColumn dataField="lj_charges"
                            
                             headerAlign='center' dataAlign='right' width='100px'>List Jeannie Charges (Lj)</TableHeaderColumn>

                            <TableHeaderColumn dataField="expenses"
                            
                             headerAlign='center' dataAlign='right' width='100px'>Expenses (Ex)</TableHeaderColumn>

                             <TableHeaderColumn dataField="chrg_or_expens"
                            
                             headerAlign='center' dataAlign='right' width='100px'>Lj + Ex</TableHeaderColumn>

                            

                             <TableHeaderColumn dataField="projected_earning"
                            
                             headerAlign='center' dataAlign='right' width='100px'>Projected Earning Tl-(Lj + Ex)</TableHeaderColumn>

                          

                        </BootstrapTable>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

                
      </React.Fragment>
    )
  }
}

export default MerchLots
