
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
//import './App.css'
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



class soldItem extends Component {
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
      serachItem:'',
      priceOne:'',
      priceTwo:'',
      merLotName:'',
      hideDetailData: 'hide',
      redirectToReferrer: false
    };
    this.serchLot = this.serchLot.bind(this);
    //this.handleSearchInput = this.handleSearchInput.bind(this);
    //this.serchDetails = this.serchDetails.bind(this);
  }
  componentDidMount () {
    this.setState({ hideDetailData: 'hide'});
  
    var  param = 'SOLD';
    var  getSeach = this.state.serachItem;
    var  merLotName = this.state.merLotName;
    var  priceOne = this.state.priceOne;
    var  priceTwo = this.state.priceTwo;


    $.LoadingOverlay("show");
    let insertUrl =
      this.state.baseUrl +
      "/laptopzone/reactcontroller/c_react/merchant_sold_items ";
      
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
            showSold:'hide'
          });
        
        }else if(param == 'SOLD'){
            this.setState({
            isLoaded: true,
            lot_detail:result.lot_detail_data,
            lot_query:result.lot_name,
            images: result.images,
            hideDetailData: 'show',
            showActive: 'hide',
            showSold:'show'
          });
        }
      }
       
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
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

  

 
  serchLot(){
    this.setState({ hideDetailData: 'hide'});
  
    var  param = 'SOLD';
    var  getSeach = this.state.serachItem;
    var  merLotName = this.state.merLotName;
    var  priceOne = this.state.priceOne;
    var  priceTwo = this.state.priceTwo;


    $.LoadingOverlay("show");
    let insertUrl =
      this.state.baseUrl +
      "/laptopzone/reactcontroller/c_react/merchant_sold_items ";
      
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
            showSold:'hide'
          });
        
        }else if(param == 'SOLD'){
            this.setState({
            isLoaded: true,
            lot_detail:result.lot_detail_data,
            images: result.images,
            hideDetailData: 'show',
            showActive: 'hide',
            showSold:'show'
          });
        }
      }
       
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  




  }

  CellFormatter(cell, row) {
    return (<div><a href={"http://www.ebay.com/itm"+"/"+row.EBAY_ITEM_ID} target="_blank" >{cell}</a></div>);
  }

  render() {

    const { error, isLoaded ,lot_detail} = this.state;
    const options = {
      
      paginationShowsTotal: true,
      paginationPosition: 'top'

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
              Sold Items
              
            </h1>
            <ol className="breadcrumb">
              <li>
                <p>Home</p>
              </li>
              <li className="active">Sold Items</li>
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
            
 
            {this.state.hideDetailData == 'show' ?
            <div className="row">
            <div className="col-xs-12">
              <div className="box">
                {/*<div className="box-header">
                  <h3 className="box-title">Sol</h3>
                </div>*/}

                <div className="box-body">
                  <div className="row">
                    <div className="col-xs-12">
                      
                          

                               
                           {this.state.showSold == 'show' ? 
                           <BootstrapTable data={this.state.lot_detail}                          
                          striped
                          options={options}
                          columnWidth="100%"
                          
                          hover
                          pagination 
                          >
                           <TableHeaderColumn dataField="EBAY_ITEM_ID" isKey
                             dataAlign='left' dataFormat={this.CellFormatter}  width="10%">Ebay Id</TableHeaderColumn>

                             <TableHeaderColumn
                      dataField="EBAY_ITEM_ID"
                       width="10%"
                      dataFormat={imageView}
                    >
                      Picture
                    </TableHeaderColumn>

                          <TableHeaderColumn dataField="ITM_TITLE" 
                             headerAlign='center' dataAlign='left' width="10%">Item Title</TableHeaderColumn>                          

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

export default soldItem;
