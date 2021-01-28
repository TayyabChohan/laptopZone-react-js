
import React, { Component } from "react";

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
import { RViewer, RViewerTrigger } from "react-viewerjs";
import "gasparesganga-jquery-loading-overlay";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { css } from 'glamor';
import './App.css'
//import openModalMode from './openModalModel.js';
import { toast } from 'react-toastify';
import $ from "jquery";

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
                  width="130px"
                  height="120px"
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



class merchLotDetail extends Component {
  constructor(props) {
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    //console.log(finalurl);
    super(props);
    that = this;
    this.state = {
      error: null,
      isLoaded: false,
      lot:[],
      lotsData:[] ,
      lot_Sum:[] ,
      lot_query:[] ,
      lot_detail:[] ,
      bars:[],
      
      loadDetail:[],
      images:[],
      
      baseUrl: finalurl,
      showActive: 'hide',
      showSold: 'hide',
      showInProcess: 'hide',
      serachItem:'',
      priceOne:'',
      priceTwo:'',
      merLotName:'',
      hideDetailData: 'hide',
      redirectToReferrer: false
    };
    this.serchLot = this.serchLot.bind(this);
    //this.handleSearchInput = this.handleSearchInput.bind(this);
    this.serchDetails = this.serchDetails.bind(this);
  }
  componentDidMount () {
    //var  param='';
    //LoadLotDetailData(param);

    $.ajax({

      url: this.state.baseUrl + "/laptopzone/reactcontroller/c_react/merch_lot_detail_view ",
      dataType: 'json',
      type: 'POST',
      data: {merchId: sessionStorage.getItem('merId') },
      success: function (data) {

        this.setState({
          isLoaded: true,
          lotsData:data.lot_detail_query,
          lot_Sum:data.lot_detail_totals,
          lot_query:data.lot_name
        });



        var  lot = this.state.lotsData;
        //alert(lot);
        var lotsList = [];
        //var lotsListSum = [];

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

          });
        }       
        
        this.setState({
          bars: lotsList
        });

      }.bind(this),
      error: function (xhr, resp, text) {
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

handleSearchInput = e => {
    this.setState({ [e.target.name]: e.target.value });

    $(".serc").keydown(function(event){
    if (event.keyCode == 13) {
        $('#clickserch').click();
        return false;
      }
      
    });
    $(".sercdrop").keydown(function(event){
    if (event.keyCode == 13) {
        $('#clickserch').click();
        return false;
      }
      
    });
    $(".prOne").keydown(function(event){
    if (event.keyCode == 13) {
        $('#clickserch').click();
        return false;
      }
      
    });
    
    $(".prTwo").keydown(function(event){
    if (event.keyCode == 13) {
        $('#clickserch').click();
        return false;
      }
      
    });
  };

  

  serchDetails(param){
    this.setState({ hideDetailData: 'hide'});

      var  insertUrl = '';

      if(param == 'ACTIVE'){
          var  insertUrl =
      this.state.baseUrl +
      "/laptopzone/reactcontroller/c_react/merch_lot_load_detail ";
        
      }else if(param == 'SOLD'){
          var  insertUrl =
      this.state.baseUrl +
      "/laptopzone/reactcontroller/c_react/merch_lot_load_detail ";
            
      }else if(param == 'IN_PROCESS'){
          var  insertUrl =
      this.state.baseUrl +
      "/laptopzone/reactcontroller/c_react/merch_inproces_items ";
            
        }
  

      var  getSeach = this.state.serachItem;
      var  merLotName = this.state.merLotName;
      var  priceOne = this.state.priceOne;
      var  priceTwo = this.state.priceTwo;


    $.LoadingOverlay("show");
    
      
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {'param':param,'getSeach':getSeach,'priceOne' :priceOne,'priceTwo' :priceTwo,'merLotName':merLotName,merchId: sessionStorage.getItem('merId')},
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
        if (result.exist) {

          if(param == 'ACTIVE'){
            
            this.setState({
            isLoaded: true,
            lot_detail:result.lot_detail_data,
            images: result.images,
            hideDetailData: 'show',
            showActive: 'show',
            showSold:'hide',
            showInProcess:'hide'
          });
        
        }else if(param == 'SOLD'){
            this.setState({
            isLoaded: true,
            lot_detail:result.lot_detail_data,
            images: result.images,
            hideDetailData: 'show',
            showActive: 'hide',
            showSold:'show',
            showInProcess:'hide'
          });
        }else if(param == 'IN_PROCESS'){
            this.setState({
            isLoaded: true,
            lot_detail:result.lot_detail_data,
            images: result.images,
            hideDetailData: 'show',
            showActive: 'hide',
            showSold:'hide',
            showInProcess:'show'
          });
        }
      }
       
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  



  }

  serchLot(){
    var  getSeach = this.state.serachItem;
    var  merLotName = this.state.merLotName;
    var  priceOne = this.state.priceOne;
    var  priceTwo = this.state.priceTwo;
    this.setState({
          isLoaded: false,
          hideDetailData: 'hide'
        });
    $.ajax({

      url: this.state.baseUrl + "/laptopzone/reactcontroller/c_react/merch_lot_detail_view ",
      dataType: 'json',
      type: 'POST',
      data: {'getSeach' :getSeach,'priceOne' :priceOne,'priceTwo' :priceTwo,'merLotName' :merLotName ,merchId: sessionStorage.getItem('merId') },
      success: function (data) {

        this.setState({
          isLoaded: true,
          lotsData:data.lot_detail_query,
          lot_Sum:data.lot_detail_totals
        });



        var  lot = this.state.lotsData;
        //alert(lot);
        var lotsList = [];
        //var lotsListSum = [];

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

          }); 

          
        }       
        
        this.setState({
          bars: lotsList
        });

      }.bind(this),
      error: function (xhr, resp, text) {
        //show error to console
        console.log(xhr, resp, text);
      }
    });

  }

  CellFormatter(cell, row) {
    return (<div><a href={"http://www.ebay.com/itm"+"/"+row.EBAY_ITEM_ID} target="_blank" >{cell}</a></div>);
  }

  render() {

    const { error, isLoaded ,lot_detail} = this.state;
    const options = {
      
      paginationShowsTotal: true,

    };
    // console.log(this.state.bars);
    // console.log(this.state.lot_Sum);
    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: "/login" }} />;
    }

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
      var merchLots = this.state.lot_query.map(function (mer, index) {
        return (
          <option key={index} value={mer.LOT_ID}>
            {mer.LOT_DESC}
          </option>
        )
      })

      return (
        <React.Fragment>
          <section className="content-header">
            <h1>
              Lot Detail View
              <small>Control panel</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <p>Home</p>
              </li>
              <li className="active">Lot Detail View</li>
            </ol>
          </section>

          <section className="content">
            <div className="row">
              <div className="col-sm-12">
                <div className="box">
                  <div className="box-header with-border">
                    <h3 className="box-title">Search Criteria</h3>
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
                    
                      <div className="col-sm-12">
                        <div className="col-sm-4">
                          <label>Search Any Item:</label>

                          <input
                            type="text"
                           
                            name="serachItem"
                            className="form-control serc"
                            value={this.state.serachItem}
                            onChange={this.handleSearchInput}
                            placeholder="Search Any Item ....."
                          />
                        </div>

                      <div className='col-xs-2'>
                      <label>Select Lot:</label>
                        <select
                          className='form-control selectpicker  sercdrop '
                          name='merLotName'
                          value={this.state.merLotName}
                          onChange={this.handleSearchInput} >
                          <option value='0'>Select Lot.. </option>
                          {merchLots}
                        </select>
                      </div>

                      <div className="col-sm-2">
                        <div class="form-group">
                        <label for="Feedback Score">Sale Price $:</label>
                          <div class="input-group" >
                            <input type="number" name ="priceOne" class="form-control prOne" value={this.state.priceOne}   onChange={this.handleSearchInput}  />
                            <span class="input-group-addon priceStyle" >To</span>                      
                            <input type="number" name ="priceTwo" class="form-control prTwo" value={this.state.priceTwo}   onChange={this.handleSearchInput}  />
                          </div>
                        </div>
                      </div>

                        <div className="col-sm-3">
                        <input type="button"  id = "clickserch" className="btn btn-primary " style={{ width: "55%", marginTop: "23px" }}value="Serch" onClick={this.serchLot}></input>
                         
                        </div>
                      </div>
                     
                    
      
                  </div>
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-sm-12">
                <div className="box">
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

            <div className="row"> 
            
              <div className="col-sm-12">
                <div className="box">
                  <div className="box-header with-border">
                    <div className="box-tools pull-right" />
                  </div>

                  <div className="box-body">
                  
            
          
                    {this.state.lot_Sum.map(item => (
                    <div className="row">
                    
                      <div className="col-md-3 col-sm-6 col-xs-12">
                        <div className="info-box">
                          <span className="info-box-icon bg-aqua"><i className="ion ion-ios-gear-outline"></i></span>

                          <div className="info-box-content">
                            <span className="info-box-text">Active Items</span>
                            <span className="info-box-number">{item.ACTIVE_LISTED}<small>.</small></span>
                            <span className="info-box-text"><a href='javascript:;' onClick={()=>{this.serchDetails('ACTIVE')}} ><small>view</small></a></span>
                          </div>                          
                        </div>                        
                      </div>
                      
                      <div className="col-md-3 col-sm-6 col-xs-12">
                        <div className="info-box">
                          <span className="info-box-icon bg-red"><i className="ion ion-ios-cart-outline"></i></span>

                          <div className="info-box-content">
                            <span className="info-box-text">Sold Items</span>
                            <span className="info-box-number">{item.SOLD}</span>
                            <span className="info-box-text"><a href='javascript:;' onClick={()=>{this.serchDetails('SOLD')}} ><small>view</small></a></span>
                          </div>                          
                        </div>                        
                      </div>

                      <div className="col-md-3 col-sm-6 col-xs-12">
                        <div className="info-box">
                          <span className="info-box-icon bg-green"><i  className="ion ion-ios-undo-outline"></i></span>

                          <div className="info-box-content">
                            <span className="info-box-text">Return</span>
                            <span className="info-box-number">0</span>
                          </div>                          
                        </div>                        
                      </div>
                      
                      <div className="col-md-3 col-sm-6 col-xs-12">
                        <div className="info-box">
                          <span className="info-box-icon bg-yellow"><i className="ion ion-ios-people-outline"></i></span>

                          <div className="info-box-content">
                            <span className="info-box-text">In Process</span>
                            <span className="info-box-number">{item.NOT_LISTED}</span>
                            <span className="info-box-text"><a href='javascript:;' onClick={()=>{this.serchDetails('IN_PROCESS')}} ><small>view</small></a></span>
                          </div>                          
                        </div>
                      </div>                      
                      
                    </div>
                    ))} 
                  </div>

                </div>
              </div>
            </div>
 
            {this.state.hideDetailData == 'show' ?
            <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">Detail Report</h3>
                </div>

                <div className="box-body">
                  <div className="row">
                    <div className="col-xs-12">
                      
                          {this.state.showActive == 'show' ?

                          <BootstrapTable data={lot_detail}                          
                          striped
                          options={options}
                          search
                          hover
                          pagination 
                          >

                          <TableHeaderColumn dataField="EBAY_ITEM_ID" isKey
                             dataAlign='left' dataFormat={this.CellFormatter}  width='80px'>Ebay Id</TableHeaderColumn>

                          <TableHeaderColumn
                      dataField="EBAY_ITEM_ID"
                      width="80px"
                      dataFormat={imageView}
                    >
                      Picture
                    </TableHeaderColumn>

                          <TableHeaderColumn dataField="ITM_TITLE" 
                             headerAlign='center' dataAlign='left' width='170px'>Item Title</TableHeaderColumn>

                           <TableHeaderColumn dataField="QTY"
                             headerAlign='center' dataAlign='right' width='70px' >Qty</TableHeaderColumn>

                          <TableHeaderColumn dataField="EBAY_PRICE"
                              headerAlign='center' dataAlign='right' width='100px'>Ebay Price</TableHeaderColumn>

                          <TableHeaderColumn dataField="CATEGORY_NAME" 
                             headerAlign='center' dataAlign='left' width='100px'>Category Name</TableHeaderColumn>

                          <TableHeaderColumn dataField="F_MPN" 
                             headerAlign='center' dataAlign='left' width='100px'>Mpn</TableHeaderColumn>

                          <TableHeaderColumn dataField="F_UPC" 
                             headerAlign='center' dataAlign='left' width='100px'>Upc</TableHeaderColumn>

                          <TableHeaderColumn dataField="COND_NAME" 
                             headerAlign='center' dataAlign='left' width='100px'>Condition</TableHeaderColumn>
                            </BootstrapTable>
                              : null}

                               
                           {this.state.showSold == 'show' ? 
                           <BootstrapTable data={this.state.lot_detail}                          
                          striped
                          options={options}
                          search
                          hover
                          pagination 
                          >
                           <TableHeaderColumn dataField="EBAY_ITEM_ID"
                             dataAlign='left' dataFormat={this.CellFormatter}  width='80px'>Ebay Id</TableHeaderColumn>

                             <TableHeaderColumn
                      dataField="EBAY_ITEM_ID"
                      width="80px"
                      dataFormat={imageView}
                    >
                      Picture
                    </TableHeaderColumn>

                          <TableHeaderColumn dataField="ITM_TITLE" isKey
                             headerAlign='center' dataAlign='left' width='170px'>Item Title</TableHeaderColumn>                          

                          <TableHeaderColumn dataField="BUY_NAME" 
                             headerAlign='center' dataAlign='left' width='140px'>Buyer Name</TableHeaderColumn>

                          <TableHeaderColumn dataField="SALE_REC" 
                             headerAlign='center' dataAlign='right' width='90px'>Sale Record #</TableHeaderColumn>

                          <TableHeaderColumn dataField="QTY"
                             headerAlign='center' dataAlign='right' width='70px' >Qty</TableHeaderColumn>

                          

                          <TableHeaderColumn dataField="SALE_PRICE"
                              headerAlign='center' dataAlign='right' width='100px'>Sale Price</TableHeaderColumn>

                          <TableHeaderColumn dataField="TOTAL"
                             headerAlign='center' dataAlign='right' width='100px' >Total</TableHeaderColumn>

                          <TableHeaderColumn dataField="SHIPING_PRICE"
                            
                             headerAlign='center' dataAlign='right' width='100px'>Shipping Price</TableHeaderColumn>

                            <TableHeaderColumn dataField="EBAY_FEE"
                            
                             headerAlign='center' dataAlign='right' width='100px'>Ebay Fee</TableHeaderColumn>

                            <TableHeaderColumn dataField="PACKING_COST"
                            
                             headerAlign='center' dataAlign='right' width='100px'>Packing Cost</TableHeaderColumn>

                            <TableHeaderColumn dataField="MARKEPLACE_FEE"
                            
                             headerAlign='center' dataAlign='right' width='100px'>MarketPlace Fee</TableHeaderColumn>

                            <TableHeaderColumn dataField="LJ_CHARGES"
                            
                             headerAlign='center' dataAlign='right' width='100px'>Lj Charges</TableHeaderColumn>

                            <TableHeaderColumn dataField="SALE_DATE"
                            
                             headerAlign='center' dataAlign='left' width='100px'>Sale Date</TableHeaderColumn>

                            {/*<TableHeaderColumn dataField="checkout_date"
                            
                             headerAlign='center' dataAlign='left' width='100px'>Check Out Date</TableHeaderColumn>*/}      
                             </BootstrapTable>                 
                              : null}

                          {this.state.showInProcess == 'show' ?

                          <BootstrapTable data={lot_detail}                          
                          striped
                          options={options}
                          search
                          hover
                          pagination 

                          >

                          <TableHeaderColumn dataField="BARCODE_NO" isKey
                             dataAlign='left'   width='70px'>Barcode No</TableHeaderColumn>                         
                             <TableHeaderColumn
                      dataField="EBAY_ITEM_ID"
                      width="80px"
                      dataFormat={imageView}
                    >
                      Picture
                    </TableHeaderColumn>
                          <TableHeaderColumn dataField="ITEM_TITLE" 
                             headerAlign='center' dataAlign='left' width='150px'>Item Title</TableHeaderColumn>                          

                          <TableHeaderColumn dataField="EBAY_PRICE"
                              headerAlign='center' dataAlign='right' width='100px'>Ebay Price</TableHeaderColumn>

                          <TableHeaderColumn dataField="COND_NAME" 
                             headerAlign='center' dataAlign='center' width='100px'>Condition</TableHeaderColumn>                          

                          <TableHeaderColumn dataField="F_MPN" 
                             headerAlign='center' dataAlign='left' width='100px'>Mpn</TableHeaderColumn>

                          <TableHeaderColumn dataField="F_UPC" 
                             headerAlign='center' dataAlign='center' width='100px'>Upc</TableHeaderColumn>

                          <TableHeaderColumn dataField="CATEGORY_NAME" 
                             headerAlign='center' dataAlign='left' width='100px'>Category Name</TableHeaderColumn>
                            </BootstrapTable>
                        : null}
                        
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          : null}

          </section>
        </React.Fragment>
      );
    }
  }
}

export default merchLotDetail;
