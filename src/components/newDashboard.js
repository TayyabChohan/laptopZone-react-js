import React, { Component } from 'react'

// import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
// import jQuery from 'jquery';
import NumberFormat from 'react-number-format'
import Switch from 'react-switch'
import { RViewer, RViewerTrigger } from 'react-viewerjs'
import 'gasparesganga-jquery-loading-overlay'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { css } from 'glamor'
import './App.css'
// import openModalMode from './openModalModel.js';
import { toast } from 'react-toastify'
import $ from 'jquery'
import InvoiceDetailDashboard from './dashboard/InvoiceDetailDashboard.js'
var that = ''

export class ImageView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cell: this.props.cell,
      row: this.props.row,
      imagesUrl: that.state.images
    }
  }

  render() {
    const { cell, row, imagesUrl } = this.state

    let options = {
      toolbar: {
        prev: true,
        next: true
      },

      navbar: {
        default: true
      }
    }
    return (
      <React.Fragment>
        <div
          style={{
            overflow: ' hidden',
            position: 'relative'
          }}
        >
          <RViewer
            index={this.props.cell}
            options={options}
            imageUrls={imagesUrl[this.props.cell]}
          >
            <RViewerTrigger>
              <div className='col-md-12'>
                <img
                  className='getCss'
                  src={imagesUrl[this.props.cell][0]}
                  width='100px'
                  height='110px'
                />
              </div>
            </RViewerTrigger>
          </RViewer>
        </div>
      </React.Fragment>
    )
  }
}
function imageView(cell, row) {
  return <ImageView cell={cell} row={row} />
}

class NewDashboard extends Component {
  constructor(props) {
    var getUrl = window.location
    var finalurl = getUrl.protocol + '//' + getUrl.hostname
    // console.log(finalurl);
    super(props)
    that = this
    this.state = {
      error: null,
      isLoaded: false,
      lot: [],
      lotsData: [],
      lot_Sum: [],
      lot_query: [],
      lot_detail: [],
      bars: [],

      loadDetail: [],
      images: [],

      baseUrl: finalurl,
      showActive: 'hide',
      showSold: 'hide',
      showInProcess: 'hide',
      serachItem: '',
      priceOne: '',
      priceTwo: '',
      merLotName: '',
      switchChecked: false,
      invocieSwitchChecked: false,
      recntSold: '',
      setHeading: '',
      hideLotDetail: 'hide',
      hideDetailData: 'hide',
      redirectToReferrer: false
    }
    this.serchLot = this.serchLot.bind(this)
    // this.handleSearchInput = this.handleSearchInput.bind(this);
    this.serchDetails = this.serchDetails.bind(this)
    // this.viewLotDetail = this.viewLotDetail.bind(this);
    this.handleChange = this.handleChange.bind(this)
    // this.serchReecent = this.serchReecent.bind(this);
  }
  componentDidMount() {
    // var  param='';
    // LoadLotDetailData(param);

    $.ajax({
      url:
        this.state.baseUrl +
        '/laptopzone/reactcontroller/c_react/merch_lot_detail_view ',
      dataType: 'json',
      type: 'POST',
      data: { merchId: localStorage.getItem('merId') },
      success: function (data) {
        this.setState({
          isLoaded: true,
          lotsData: data.lot_detail_query,
          lot_Sum: data.lot_detail_totals,
          lot_query: data.lot_name
        })

        var lot = this.state.lotsData
        // alert(lot);
        var lotsList = []
        // var lotsListSum = [];

        var length = lot.length

        // console.log('lengths'+ length);

        for (var i = 0; i < length; i++) {
          lotsList.push({
            ref_no: lot[i].REF_NO,
            lot_description: lot[i].LOT_DESCRIPTION,
            creation_date: lot[i].CREATION_DATE,
            lot_cost: '$ ' + lot[i].LOT_COST,
            lot_count: lot[i].LOT_COUNT,
            total_listed: lot[i].TOTAL_LISTED,
            total_list_amount: '$ ' + lot[i].TOTAL_LIST_AMOUNT,
            activ_listed: lot[i].ACTIV_LISTED,
            activ_list_amount: '$ ' + lot[i].ACTIV_LIST_AMOUNT,
            total_sold: lot[i].TOTAL_SOLD,
            sold_amount: '$ ' + lot[i].SOLD_AMOUNT,
            lj_charges: '$ ' + Number(lot[i].LJ_CHARGES).toFixed(2),
            expenses: '$ ' + Number(lot[i].EXPENSES).toFixed(2),
            chrg_or_expens: '$ ' + Number(lot[i].CHRG_OR_EXPENS).toFixed(2),
            projected_earning:
              '$ ' + Number(lot[i].PROJECTED_EARNING).toFixed(2)
          })
        }

        this.setState({
          bars: lotsList
        })
      }.bind(this),
      error: function (xhr, resp, text) {
        // show error to console
        console.log(xhr, resp, text)
      }
    })
  }

  componentWillMount() {
    if (localStorage.getItem('userName')) {
      console.log('setion find')
    } else {
      this.setState({ redirectToReferrer: true })
    }
  }
  handleChange(switchChecked) {
    this.setState({ switchChecked })

    console.log(this.state.switchChecked);
  }
  handleChangeInvoice = invocieSwitchChecked => {
    this.setState({ invocieSwitchChecked })
  }
  handleSearchInput = e => {
    this.setState({ [e.target.name]: e.target.value })

    $('.serc').keydown(function (event) {
      if (event.keyCode == 13) {
        $('#clickserch').click()
        return false
      }
    })
    $('.sercdrop').keydown(function (event) {
      if (event.keyCode == 13) {
        $('#clickserch').click()
        return false
      }
    })
    $('.sercrecent').keydown(function (event) {
      if (event.keyCode == 13) {
        $('#clickserch').click()
        return false
      }
    })
    $('.prOne').keydown(function (event) {
      if (event.keyCode == 13) {
        $('#clickserch').click()
        return false
      }
    })

    $('.prTwo').keydown(function (event) {
      if (event.keyCode == 13) {
        $('#clickserch').click()
        return false
      }
    })
  }

  // viewLotDetail(param){

  //   this.setState({ hideLotDetail: 'show'});
  // }

  serchDetails(param) {
    this.setState({ hideDetailData: 'hide' })
    var recntSold = this.state.recntSold

    var insertUrl = ''

    if (param == 'ACTIVE') {
      var insertUrl =
        this.state.baseUrl +
        '/laptopzone/reactcontroller/c_react/merch_lot_load_detail '
    } else if (param == 'SOLD') {
      var insertUrl =
        this.state.baseUrl +
        '/laptopzone/reactcontroller/c_react/merch_lot_load_detail '
    } else if (param == 'IN_PROCESS') {
      var insertUrl =
        this.state.baseUrl +
        '/laptopzone/reactcontroller/c_react/merch_inproces_items '
    }

    var getSeach = this.state.serachItem
    var merLotName = this.state.merLotName
    var priceOne = this.state.priceOne
    var priceTwo = this.state.priceTwo

    $.LoadingOverlay('show')

    new Promise(function (resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: 'json',
        type: 'POST',
        data: {
          param: param,
          recntSold: recntSold,
          getSeach: getSeach,
          priceOne: priceOne,
          priceTwo: priceTwo,
          merLotName: merLotName,
          merchId: localStorage.getItem('merId')
        }
      }).then(
        function (data) {
          resolve(data)
        },
        function (err) {
          reject(err)
        }
      )
    })
      .then(result => {
        $.LoadingOverlay('hide')
        if (result.exist) {
          if (param == 'ACTIVE') {
            this.setState({
              isLoaded: true,
              lot_detail: result.lot_detail_data,
              images: result.images,
              setHeading: 'Active Items',
              hideDetailData: 'show',
              showActive: 'show',
              showSold: 'hide',
              showInProcess: 'hide'
            })
          } else if (param == 'SOLD') {
            this.setState({
              isLoaded: true,
              lot_detail: result.lot_detail_data,
              images: result.images,
              setHeading: 'Sold Items',
              hideDetailData: 'show',
              showActive: 'hide',
              showSold: 'show',
              showInProcess: 'hide'
            })
          } else if (param == 'IN_PROCESS') {
            this.setState({
              isLoaded: true,
              lot_detail: result.lot_detail_data,
              images: result.images,
              setHeading: 'In Process Items',
              hideDetailData: 'show',
              showActive: 'hide',
              showSold: 'hide',
              showInProcess: 'show'
            })
          }
        }
      })
      .catch(err => {
        $.LoadingOverlay('hide')
        console.log(err)
      })
  }

  serchLot() {
    var recntSold = this.state.recntSold
    var getSeach = this.state.serachItem
    var merLotName = this.state.merLotName
    var priceOne = this.state.priceOne
    var priceTwo = this.state.priceTwo
    this.setState({
      isLoaded: false,
      hideDetailData: 'hide'
    })
    $.ajax({
      url:
        this.state.baseUrl +
        '/laptopzone/reactcontroller/c_react/merch_lot_detail_view ',
      dataType: 'json',
      type: 'POST',
      data: {
        getSeach: getSeach,
        priceOne: priceOne,
        recntSold: recntSold,
        priceTwo: priceTwo,
        merLotName: merLotName,
        merchId: localStorage.getItem('merId')
      },
      success: function (data) {
        this.setState({
          isLoaded: true,
          lotsData: data.lot_detail_query,
          lot_Sum: data.lot_detail_totals
        })

        var lot = this.state.lotsData
        // alert(lot);
        var lotsList = []
        // var lotsListSum = [];

        var length = lot.length

        // console.log('lengths'+ length);

        for (var i = 0; i < length; i++) {
          lotsList.push({
            ref_no: lot[i].REF_NO,
            lot_description: lot[i].LOT_DESCRIPTION,
            creation_date: lot[i].CREATION_DATE,
            lot_cost: '$ ' + lot[i].LOT_COST,
            lot_count: lot[i].LOT_COUNT,
            total_listed: lot[i].TOTAL_LISTED,
            total_list_amount: '$ ' + lot[i].TOTAL_LIST_AMOUNT,
            activ_listed: lot[i].ACTIV_LISTED,
            activ_list_amount: '$ ' + lot[i].ACTIV_LIST_AMOUNT,
            total_sold: lot[i].TOTAL_SOLD,
            sold_amount: '$ ' + lot[i].SOLD_AMOUNT,
            lj_charges: '$ ' + Number(lot[i].LJ_CHARGES).toFixed(2),
            expenses: '$ ' + Number(lot[i].EXPENSES).toFixed(2),
            chrg_or_expens: '$ ' + Number(lot[i].CHRG_OR_EXPENS).toFixed(2),
            projected_earning:
              '$ ' + Number(lot[i].PROJECTED_EARNING).toFixed(2)
          })
        }

        this.setState({
          bars: lotsList
        })
      }.bind(this),
      error: function (xhr, resp, text) {
        // show error to console
        console.log(xhr, resp, text)
      }
    })
  }

  CellFormatter(cell, row) {
    return (
      <div>
        <a
          href={'http://www.ebay.com/itm' + '/' + row.EBAY_ITEM_ID}
          target='_blank'
        >
          {cell}
        </a>
      </div>
    )
  }

  render() {
    const { error, isLoaded, lot_detail } = this.state
    const options = {
      paginationShowsTotal: true
    }
    // console.log(this.state.bars);
    // console.log(this.state.lot_Sum);
    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: '/login' }} />
    }

    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: '/login' }} />
    }
    if (error) {
      return <div> Error: {error.message}</div>
    } else if (!isLoaded) {
      return (
        <section className='content-header'>
          <h1>LOADING......</h1>
          <ol className='breadcrumb'>
            <li>
              <a href='#'>
                <i className='fa fa-dashboard' /> Home
              </a>
            </li>
            <li>
              <a href='#'>Tables</a>
            </li>
            <li className='active'>Unposted Items</li>
          </ol>
        </section>
      )
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
          <section className='content-header'>
            <h1>
              My Dashbord
              <small />
            </h1>
            <ol className='breadcrumb'>
              <li>
                <p>Home</p>
              </li>
              <li className='active'>My Dashbord</li>
            </ol>
          </section>

          <section className='content'>
            <div className='row'>
              <div className='col-sm-12'>
                <div className='box'>
                  <div className='box-header with-border'>
                    <h3 className='box-title'>Search Criteria</h3>
                    <div className='box-tools pull-right'>
                      <button
                        type='button'
                        className='btn btn-box-tool'
                        data-widget='collapse'
                      >
                        <i className='fa fa-minus' />
                      </button>
                    </div>
                  </div>

                  <div className='box-body'>
                    <div className='col-sm-12'>
                      <div className='col-sm-4'>
                        <label>Search Any Item:</label>

                        <input
                          type='text'
                          name='serachItem'
                          className='form-control serc'
                          value={this.state.serachItem}
                          onChange={this.handleSearchInput}
                          placeholder='Search Any Item .....'
                        />
                      </div>

                      <div className='col-sm-2'>
                        <label>Select Lot:</label>
                        <select
                          className='form-control selectpicker  sercdrop '
                          name='merLotName'
                          value={this.state.merLotName}
                          onChange={this.handleSearchInput}
                        >
                          <option value='0'>All Lots.. </option>
                          {merchLots}
                        </select>
                      </div>

                      <div className='col-sm-2'>
                        <label>Recently Sold:</label>
                        <select
                          className='form-control selectpicker  sercrecent '
                          name='recntSold'
                          value={this.state.recntSold}
                          onChange={this.handleSearchInput}
                        >
                          <option value='0'>All Sold.. </option>
                          <option value='10'>Last 10 Sold</option>
                          <option value='20'>Last 20 Sold</option>
                          <option value='30'>Last 30 Sold</option>
                        </select>
                      </div>

                      <div className='col-sm-2'>
                        <div class='form-group'>
                          <label for='Feedback Score'>Sale Price $:</label>
                          <div class='input-group'>
                            <input
                              type='number'
                              name='priceOne'
                              class='form-control prOne'
                              value={this.state.priceOne}
                              onChange={this.handleSearchInput}
                            />
                            <span class='input-group-addon priceStyle'>To</span>
                            <input
                              type='number'
                              name='priceTwo'
                              class='form-control prTwo'
                              value={this.state.priceTwo}
                              onChange={this.handleSearchInput}
                            />
                          </div>
                        </div>
                      </div>

                      <div className='col-sm-2'>
                        <input
                          type='button'
                          id='clickserch'
                          className='btn btn-primary '
                          style={{ width: '55%', marginTop: '23px' }}
                          value='Serch'
                          onClick={this.serchLot}
                        />
                      </div>


                    </div>

                    <div class='row'>
                      <div className='col-sm-12'>
                        <div className='col-sm-2 float-right'>
                          <label>
                            <span>
                              <a href='javascript:;'>View Lot Details</a>
                            </span>

                            <Switch
                              onChange={this.handleChange}
                              checked={this.state.switchChecked}
                              className='react-switch'
                            />
                          </label>

                        </div>
                        <div className='col-sm-2 float-right'>
                          <label>
                            <span>
                              <a href='javascript:;'>View My Invoices</a>
                            </span>

                            <Switch
                              onChange={this.handleChangeInvoice}
                              checked={this.state.invocieSwitchChecked}
                              className='react-switch'
                            />
                          </label>

                        </div>
                      </div>
                    </div>


                  </div>
                </div>
              </div>
            </div>
            {this.state.invocieSwitchChecked ? (
              <div className='row '>
                <InvoiceDetailDashboard />
              </div>
            ) : null}
            {this.state.switchChecked ? (
              <div className='row '>
                <div className='col-sm-12'>
                  <div className='box'>
                    <div className='row'>
                      <div className='col-xs-12'>
                        <BootstrapTable data={this.state.bars} striped hover>

                          <TableHeaderColumn
                            dataField='ref_no'
                            headerAlign='center'
                            dataAlign='center'
                            width='5%'
                          >
                            Ref #
                          </TableHeaderColumn>

                          <TableHeaderColumn
                            dataField='lot_description'
                            isKey
                            headerAlign='center'
                            dataAlign='center'
                            width='5%'
                          >
                            Description
                          </TableHeaderColumn>

                          <TableHeaderColumn
                            dataField='creation_date'
                            headerAlign='center'
                            dataAlign='center'
                            width='5%'
                          >
                            Create Date
                          </TableHeaderColumn>

                          <TableHeaderColumn
                            dataField='lot_cost'
                            headerAlign='center'
                            dataAlign='center'
                            width='5%'
                          >
                            Lot Cost
                          </TableHeaderColumn>

                          <TableHeaderColumn
                            dataField='lot_count'
                            headerAlign='center'
                            dataAlign='center'
                            width='5%'
                          >
                            Barcodes Count
                          </TableHeaderColumn>

                          <TableHeaderColumn
                            dataField='total_listed'
                            headerAlign='center'
                            dataAlign='center'
                            width='5%'
                          >
                            Total Listed
                          </TableHeaderColumn>

                          <TableHeaderColumn
                            dataField='total_list_amount'
                            headerAlign='center'
                            dataAlign='center'
                            width='10%'
                          >
                            Total Listed Amount (Tl)
                          </TableHeaderColumn>

                          <TableHeaderColumn
                            dataField='activ_listed'
                            headerAlign='center'
                            dataAlign='center'
                            width='5%'
                          >
                            Active Listed
                          </TableHeaderColumn>

                          <TableHeaderColumn
                            dataField='activ_list_amount'                            
                            headerAlign='center'
                            dataAlign='center'
                            width='10%'
                          >
                            Active Listed Amount
                          </TableHeaderColumn>

                          <TableHeaderColumn
                            dataField='total_sold'
                            headerAlign='center'
                            dataAlign='center'
                            width='5%'
                            
                          >
                            Total Sold
                          </TableHeaderColumn>

                          <TableHeaderColumn
                            dataField='sold_amount'                            
                            headerAlign='center'
                            dataAlign='center'
                            width='10%'
                          >
                            Total Sold Amount
                          </TableHeaderColumn>

                          <TableHeaderColumn
                            dataField='lj_charges'
                            headerAlign='center'
                            dataAlign='center'
                            width='10%'
                          >
                            LJ Charges (Lj)
                          </TableHeaderColumn>

                          <TableHeaderColumn
                            dataField='expenses'                           
                            headerAlign='center'
                            dataAlign='center'
                            width='10%'
                          >
                            Expenses (Ex)
                          </TableHeaderColumn>

                          <TableHeaderColumn
                            dataField='chrg_or_expens'
                            headerAlign='center'
                            dataAlign='center'
                            width='5%'
                          >
                            Lj + Ex
                          </TableHeaderColumn>

                          <TableHeaderColumn
                            dataField='projected_earning'
                            headerAlign='center'
                            dataAlign='center'
                            width='10%'
                          >
                            Projected Earning Tl-(Lj + Ex)
                          </TableHeaderColumn>
                        </BootstrapTable>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            <div className='row'>
              <div className='col-sm-12'>
                <div className='box'>
                  <div className='box-header with-border'>
                    <div className='box-tools pull-right' />
                  </div>

                  <div className='box-body'>
                    {this.state.lot_Sum.map(item => (
                      <div className='row '>
                        <div className='col-md-3 col-sm-6 col-xs-12'>
                          <div className='info-box'>
                            <span className='info-box-icon bg-red'>
                              <i className='ion ion-ios-gear-outline' />
                            </span>

                            <div className='info-box-content'>
                              <span className='info-box-text '>
                                Active Items
                              </span>
                              <span className='info-box-number'>
                                Qty:{' '}
                                <NumberFormat
                                  value={item.ACTIVE_LISTED}
                                  displayType={'text'}
                                  thousandSeparator
                                />
                              </span>
                              <span className='info-box-number'>
                                Value:{' '}
                                <NumberFormat
                                  value={item.ACTIV_LIST_QTY_VAL}
                                  displayType={'text'}
                                  thousandSeparator
                                  prefix={'$ '}
                                />
                              </span>
                              <span className='info-box-text'>
                                <a
                                  href='javascript:;'
                                  onClick={() => {
                                    this.serchDetails('ACTIVE')
                                  }}
                                >
                                  <small>view</small>
                                </a>
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className='col-md-3 col-sm-6 col-xs-12'>
                          <div className='info-box'>
                            <span className='info-box-icon bg-green'>
                              <i className='ion ion-ios-cart-outline' />
                            </span>

                            <div className='info-box-content'>
                              <span className='info-box-text'>Sold Items</span>
                              <span className='info-box-number'>
                                Qty:{' '}
                                <NumberFormat
                                  value={item.SOLD}
                                  displayType={'text'}
                                  thousandSeparator
                                />
                              </span>
                              <span className='info-box-number'>
                                Value:{' '}
                                <NumberFormat
                                  value={item.SOLD_QTY_VAL}
                                  displayType={'text'}
                                  thousandSeparator
                                  prefix={'$ '}
                                />
                              </span>
                              <span className='info-box-text'>
                                <a
                                  href='javascript:;'
                                  onClick={() => {
                                    this.serchDetails('SOLD')
                                  }}
                                >
                                  <small>view</small>
                                </a>
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className='col-md-3 col-sm-6 col-xs-12'>
                          <div className='info-box'>
                            <span className='info-box-icon bg-blue'>
                              <i className='ion ion-ios-undo-outline' />
                            </span>

                            <div className='info-box-content'>
                              <span className='info-box-text'>Return</span>
                              <span className='info-box-number'>Qty: 0</span>
                              <span className='info-box-number'>
                                Value: $ 0
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className='col-md-3 col-sm-6 col-xs-12'>
                          <div className='info-box'>
                            <span className='info-box-icon bg-yellow'>
                              <i className='ion ion-ios-people-outline' />
                            </span>

                            <div className='info-box-content'>
                              <span className='info-box-text'>In Process</span>
                              <span className='info-box-number'>
                                Qty:{' '}
                                <NumberFormat
                                  value={item.NOT_LISTED}
                                  displayType={'text'}
                                  thousandSeparator
                                />
                              </span>
                              <span className='info-box-number'>
                                Value:{' '}
                                <NumberFormat
                                  value={item.ACTIV_NOT_LIST_QTY_VAL}
                                  displayType={'text'}
                                  thousandSeparator
                                  prefix={'$ '}
                                />
                              </span>
                              <span className='info-box-text'>
                                <a
                                  href='javascript:;'
                                  onClick={() => {
                                    this.serchDetails('IN_PROCESS')
                                  }}
                                >
                                  <small>view</small>
                                </a>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {this.state.hideDetailData == 'show' ? (
              <div className='row'>
                <div className='col-xs-12'>
                  <div className='box'>
                    <div className='box-header '>
                      <h3 className='box-title'>{this.state.setHeading}</h3>
                    </div>

                    <div className='box-body'>
                      <div className='row'>
                        <div className='col-xs-12'>
                          {this.state.showActive == 'show' ? (
                            <BootstrapTable
                              data={lot_detail}
                              striped
                              options={options}
                              search
                              hover
                              pagination
                            >
                              <TableHeaderColumn
                                dataField='EBAY_ITEM_ID'
                                isKey
                                dataAlign='center'
                                dataFormat={this.CellFormatter}
                                width='10%'
                              >
                                Ebay Id
                              </TableHeaderColumn>

                              <TableHeaderColumn
                                dataField='EBAY_ITEM_ID'
                                width='15%'
                                dataAlign='center'
                                dataFormat={imageView}
                              >
                                Picture
                              </TableHeaderColumn>

                              <TableHeaderColumn
                                dataField='ITM_TITLE'
                                headerAlign='center'
                                dataAlign='center'
                                width='10%'
                              >
                                Item Title
                              </TableHeaderColumn>

                              <TableHeaderColumn
                                dataField='QTY'
                                headerAlign='center'
                                dataAlign='center'
                                width='10%'
                              >
                                Qty
                              </TableHeaderColumn>

                              <TableHeaderColumn
                                dataField='EBAY_PRICE'
                                headerAlign='center'
                                dataAlign='center'
                                width='10%'
                              >
                                Ebay Price
                              </TableHeaderColumn>

                              <TableHeaderColumn
                                dataField='CATEGORY_NAME'
                                headerAlign='center'
                                dataAlign='center'
                                width='10%'
                              >
                                Category Name
                              </TableHeaderColumn>

                              <TableHeaderColumn
                                dataField='F_MPN'
                                headerAlign='center'
                                dataAlign='center'
                                width='10%'
                              >
                                Mpn
                              </TableHeaderColumn>

                              <TableHeaderColumn
                                dataField='F_UPC'
                                headerAlign='center'
                                dataAlign='center'
                                width='10%'
                              >
                                Upc
                              </TableHeaderColumn>

                              <TableHeaderColumn
                                dataField='COND_NAME'
                                headerAlign='center'
                                dataAlign='center'
                                width='10%'
                              >
                                Condition
                              </TableHeaderColumn>
                            </BootstrapTable>
                          ) : null}

                          {this.state.showSold == 'show' ? (
                            <BootstrapTable
                              data={this.state.lot_detail}
                              striped
                              options={options}
                              search
                              hover
                              pagination
                            >
                              <TableHeaderColumn
                                dataField='EBAY_ITEM_ID'
                                dataAlign='center'
                                dataFormat={this.CellFormatter}
                                width='10%'
                              >
                                Ebay Id
                              </TableHeaderColumn>

                              <TableHeaderColumn
                                dataField='EBAY_ITEM_ID'
                                width='15%'
                                dataFormat={imageView}
                              >
                                Picture
                              </TableHeaderColumn>

                              <TableHeaderColumn
                                dataField='ITM_TITLE'
                                isKey
                                headerAlign='center'
                                dataAlign='center'
                                width='10%'
                              >
                                Item Title
                              </TableHeaderColumn>

                              <TableHeaderColumn
                                dataField='BUY_NAME'
                                headerAlign='center'
                                dataAlign='center'
                                width='7%'
                              >
                                Buyer Name
                              </TableHeaderColumn>

                              <TableHeaderColumn
                                dataField='SALE_REC'
                                headerAlign='center'
                                dataAlign='center'
                                width='5%'
                              >
                                Sale Record #
                              </TableHeaderColumn>

                              <TableHeaderColumn
                                dataField='QTY'
                                headerAlign='center'
                                dataAlign='center'
                                width='5%'
                              >
                                Qty
                              </TableHeaderColumn>

                              <TableHeaderColumn
                                dataField='SALE_PRICE'
                                headerAlign='center'
                                dataAlign='center'
                                width='5%'
                              >
                                Sale Price
                              </TableHeaderColumn>

                              <TableHeaderColumn
                                dataField='TOTAL'
                                headerAlign='center'
                                dataAlign='center'
                                width='5%'
                              >
                                Total
                              </TableHeaderColumn>

                              <TableHeaderColumn
                                dataField='SHIPING_PRICE'
                                headerAlign='center'
                                dataAlign='center'
                                width='5%'
                              >
                                Shipping Price
                              </TableHeaderColumn>

                              <TableHeaderColumn
                                dataField='EBAY_FEE'
                                headerAlign='center'
                                dataAlign='center'
                                width='5%'
                              >
                                Ebay Fee
                              </TableHeaderColumn>

                              <TableHeaderColumn
                                dataField='PACKING_COST'
                                headerAlign='center'
                                dataAlign='center'
                                width='5%'
                              >
                                Packing Cost
                              </TableHeaderColumn>

                              <TableHeaderColumn
                                dataField='MARKEPLACE_FEE'
                                headerAlign='center'
                                dataAlign='center'
                                width='5%'
                              >
                                MarketPlace Fee
                              </TableHeaderColumn>

                              <TableHeaderColumn
                                dataField='LJ_CHARGES'
                                headerAlign='center'
                                dataAlign='center'
                                width='5%'
                              >
                                Lj Charges
                              </TableHeaderColumn>

                              <TableHeaderColumn
                                dataField='SALE_DATE'
                                headerAlign='center'
                                dataAlign='center'
                                width='5%'
                              >
                                Sale Date
                              </TableHeaderColumn>

                              {/* <TableHeaderColumn dataField="checkout_date"

                             headerAlign='center' dataAlign='left' width='100px'>Check Out Date</TableHeaderColumn> */}
                            </BootstrapTable>
                          ) : null}

                          {this.state.showInProcess == 'show' ? (
                            <BootstrapTable
                              data={lot_detail}
                              striped
                              options={options}
                              search
                              hover
                              pagination
                            >
                              <TableHeaderColumn
                                dataField='BARCODE_NO'
                                isKey
                                dataAlign='center'
                                width='10%'
                              >
                                Barcode No
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField='EBAY_ITEM_ID'
                                width='10%'
                                dataFormat={imageView}
                              >
                                Picture
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField='ITEM_TITLE'
                                headerAlign='center'
                                dataAlign='center'
                                width='10%'
                              >
                                Item Title
                              </TableHeaderColumn>

                              <TableHeaderColumn
                                dataField='EBAY_PRICE'
                                headerAlign='center'
                                dataAlign='center'
                                width='10%'
                              >
                                Ebay Price
                              </TableHeaderColumn>

                              <TableHeaderColumn
                                dataField='COND_NAME'
                                headerAlign='center'
                                dataAlign='center'
                                width='10%'
                              >
                                Condition
                              </TableHeaderColumn>

                              <TableHeaderColumn
                                dataField='F_MPN'
                                headerAlign='center'
                                dataAlign='center'
                                width='10%'
                              >
                                Mpn
                              </TableHeaderColumn>

                              <TableHeaderColumn
                                dataField='F_UPC'
                                headerAlign='center'
                                dataAlign='center'
                                width='10%'
                              >
                                Upc
                              </TableHeaderColumn>

                              <TableHeaderColumn
                                dataField='CATEGORY_NAME'
                                headerAlign='center'
                                dataAlign='center'
                                width='10%'
                              >
                                Category Name
                              </TableHeaderColumn>
                            </BootstrapTable>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </section>
        </React.Fragment>
      )
    }
  }
}

export default NewDashboard
