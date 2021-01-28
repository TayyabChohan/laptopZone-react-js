import React from 'react'
// import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
// import jQuery from 'jquery';
import NumberFormat from 'react-number-format'
import 'gasparesganga-jquery-loading-overlay'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { css } from 'glamor'
import './App.css'
// import openModalMode from './openModalModel.js';
import { toast } from 'react-toastify'
import $ from 'jquery'

function getInvoicBarc(merchant_id, rate_id) {
  $('#serRateId').val(rate_id)
  $('#merchantId').val(merchant_id)

  var getUrl = window.location
  var finalurl = getUrl.protocol + '//' + getUrl.hostname

  // /console.log(merchant_id ,rate_id);
  let insertUrl =
    finalurl +
    '/laptopzone/reactcontroller/c_react/merch_servic_invoice_barcode'
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: insertUrl,
      dataType: 'json',
      type: 'POST',
      data: { merchant_id: merchant_id, rate_id: rate_id }
    }).then(
      function (data) {
        resolve(data)
      },
      function (err) {
        reject(err)
      }
    )
  })
}

var that = ''
// var barcodesList  = [];
function loadBarcode(merchant_id, rate_id) {
  $('#serRateId').val(rate_id)
  $('#merchantId').val(merchant_id)
  // alert(servRateId);
  var barcode = []
  $.LoadingOverlay('show')

  // alert(servRateId);

  getInvoicBarc(merchant_id, rate_id)
    .then(result => {
      $.LoadingOverlay('hide')
      // console.log(result);
      if (result) {
        // var barcodesList ='';

        barcode = result.mer_inv_barcode
        // alert(barcode);
        var barcodesList = []

        var length = barcode.length
        // console.log('lengths'+ length);

        for (var i = 0; i < length; i++) {
          barcodesList.push({
            ebay_item_id: barcode[i].EBAY_ITEM_ID,
            barcode_no: barcode[i].BARCODE_NO,
            title: barcode[i].ITEM_TITLE,
            ebay_price: barcode[i].EBAY_PRICE,
            cond: barcode[i].DEFAULT_COND,
            ebay_charges: Number(barcode[i].CHARGES).toFixed(2),
            ebay_charges_two: Number(barcode[i].CHARGES).toFixed(4),
            order_id: barcode[i].ORDER_ID,
            packing_cost: Number(barcode[i].PACKING_COST).toFixed(2),
            qty: barcode[i].QTY,
            shiping_rate: Number(barcode[i].SHIPING_RATE).toFixed(2),
            eba_fee: Number(barcode[i].EBA_FEE).toFixed(2),
            marktplace: Number(barcode[i].MARKTPLACE).toFixed(4),
            sales_record_number: barcode[i].SALES_RECORD_NUMBER,
            duration: barcode[i].DURATION
          })
        }
        //   let value = Number(row.TOTAL_CHARGE);
        // value = value.toFixed(2);
        // console.log(barcodesList);
        // alert('h111111');
        // alert(barcodesList);
        that.setState({
          bars: barcodesList
        })
        // console.log(that.state.bars);
        // console.log(barcodesList);
        $('.react-bs-table-show-sel-only-btn').html('Show Selected')
        $('.react-bs-table-show-sel-only-btn').removeClass('btn-primary')
        $('.react-bs-table-show-sel-only-btn').addClass(
          'btn-warning btn-giveShowSelc'
        )

        $('.react-bs-table-del-btn').html('Save')
        $('.react-bs-table-del-btn').removeClass('btn-warning')
        $('.react-bs-table-del-btn').addClass('btn-primary btn-giveClass')
      } else {
        // console.log('error');
        // notify("error", result.message);
        // swal("Empty", result.message, "error");
      }
    })
    .catch(err => {
      $.LoadingOverlay('hide')
      // console.log(err);
    })
}

function onRowSelect(row, isSelected) {
  console.log(`selected: ${isSelected}`)
  var chk = `${isSelected}`
  var sum = 0
  if (chk == 'true') {
    // console.log('1');
    var sum = Number($('#sumSelec').val()) + Number(row.ebay_charges)

    $('#sumSelec').val(sum.toFixed(2))
    console.log(row)
    console.log(row.ebay_charges)
  } else {
    var sum = Number($('#sumSelec').val()) - Number(row.ebay_charges)
    $('#sumSelec').val(sum.toFixed(2))
    // .toFixed(2);
    // $("#sumSelec").val(sum);
    // console.log('2');
  }
  // console.log(`${isSelected}`);
  // var  chk = `${isSelected}`;
  // if(`${isSelected}`){
  //   console.log(chk);
  //   console.log(row.ebay_charges);
  // }else{
  //   //console.log(row.ebay_charges);
  // }
}
// function onSelectAll(isSelected) {
//    if (isSelected) {
//       return products.map(row => row.id);
//     } else {
//       return [];
//     }
//   console.log(`is select all: ${isSelected}`);
// }

const ebay_price = (cell, row) => {
  let value = Number(row.ebay_price).toFixed(2)
  return '$ ' + value
}

const ebay_charges = (cell, row) => {
  let value = Number(row.ebay_charges).toFixed(2)
  return '$ ' + value
}
const ebay_charges_two = (cell, row) => {
  let value = Number(row.ebay_charges_two).toFixed(4)
  return '$ ' + value
}
const marketPlace = (cell, row) => {
  let value = Number(row.marktplace).toFixed(4)
  return value
}
const ebay_fee = (cell, row) => {
  let value = Number(row.eba_fee).toFixed(2)
  return '$ ' + value
}

const packing_cost = (cell, row) => {
  let value = Number(row.packing_cost).toFixed(2)
  return '$ ' + value
}
const shipping_rate = (cell, row) => {
  let value = Number(row.shiping_rate).toFixed(2)
  return '$ ' + value
}
class MerInvoice extends React.Component {
  constructor(props) {
    var getUrl = window.location
    var finalurl = getUrl.protocol + '//' + getUrl.hostname
    // console.log(finalurl);
    super(props)
    that = this
    this.state = {
      error: null,
      isLoaded: false,
      services: [],
      loadMerchnts: [],
      baseUrl: finalurl,
      bars: [],
      seleMerch: 0,
      getServicId: 1,
      hideInvBarc: 'hide',
      hideInvOrder: 'hide',
      hidePackPull: 'hide',
      hideBinStorage: 'hide',
      hideAppoint: 'hide',
      redirectToReferrer: false,
      ebay_charges: '',
      ebay_charge_two: ''
    }
    this.handleInput = this.handleInput.bind(this)
    this.serchByMerch = this.serchByMerch.bind(this)
    this.openModal = this.openModal.bind(this)
    this.geneInvoice = this.geneInvoice.bind(this)
  }

  componentDidMount() {
    var merchant_id = this.state.seleMerch

    $.ajax({
      url:
        this.state.baseUrl +
        '/laptopzone/reactcontroller/c_react/load_merchant',
      dataType: 'json',
      type: 'POST',
      data: { merchId: sessionStorage.getItem('merId') },
      success: function (data) {
        if (data) {
          this.setState({
            isLoaded: true,
            loadMerchnts: data.load_merch
          })
        }
      }.bind(this),
      error: function (xhr, resp, text) {
        // show error to console
        console.log(xhr, resp, text)
      }
    })
    $.ajax({
      url:
        this.state.baseUrl +
        '/laptopzone/reactcontroller/c_react/merch_servic_invoice',
      dataType: 'json',
      type: 'POST',
      data: {
        merchant_id: merchant_id,
        merchId: sessionStorage.getItem('merId')
      },
      success: function (data) {
        if (data.exist == true) {
          this.setState({
            isLoaded: true,
            services: data.mer_inv
          })
        } else {
          this.setState({
            isLoaded: false
          })
        }
      }.bind(this),
      error: function (xhr, resp, text) {
        // show error to console
        console.log(xhr, resp, text)
      }
    })
  }

  componentWillMount() {
    if (sessionStorage.getItem('userName')) {
      console.log('setion find')
    } else {
      this.setState({ redirectToReferrer: true })
    }
  }

  handleInput(e) {
    const name = e.target.name
    this.setState({ [name]: e.target.value })
  }
  serchByMerch() {
    var merchant_id = this.state.seleMerch

    // alert(merchant_id);
    // return false;
    this.setState({
      isLoaded: false
    })

    $.ajax({
      url:
        this.state.baseUrl +
        '/laptopzone/reactcontroller/c_react/merch_servic_invoice',
      dataType: 'json',
      type: 'POST',
      data: { merchant_id: merchant_id },
      success: function (data) {
        this.setState({
          isLoaded: true,
          services: data.mer_inv
        })
      }.bind(this),
      error: function (xhr, resp, text) {
        // show error to console
        console.log(xhr, resp, text)
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.seleMerch != this.state.seleMerch &&
      this.state.seleMerch !== ''
    ) {
      var merchant_id = this.state.seleMerch

      // alert(merchant_id);
      // return false;
      this.setState({
        isLoaded: false
      })

      $.ajax({
        url:
          this.state.baseUrl +
          '/laptopzone/reactcontroller/c_react/merch_servic_invoice',
        dataType: 'json',
        type: 'POST',
        data: { merchant_id: merchant_id },
        success: function (data) {
          this.setState({
            isLoaded: true,
            services: data.mer_inv
          })
        }.bind(this),
        error: function (xhr, resp, text) {
          // show error to console
          console.log(xhr, resp, text)
        }
      })
    }
  }
  openModal(merchant_id, rate_id) {
    var sum = 0
    $('#sumSelec').val(sum.toFixed(2))
    // / alert(rate_id);
    if ($('#openModel_' + rate_id).is(':checked')) {
      if (rate_id == 5) {
        this.setState({
          hideInvOrder: 'show',
          hideInvBarc: 'hide',
          hideAppoint: 'hide',
          hidePackPull: 'hide',
          hideBinStorage: 'hide'
        })
        loadBarcode(merchant_id, rate_id)
      } else if (rate_id == 3) {
        this.setState({
          hideAppoint: 'show',
          hideInvOrder: 'hide',
          hideInvBarc: 'hide',          
          hidePackPull: 'hide',
          hideBinStorage: 'hide'
        })
        loadBarcode(merchant_id, rate_id)

      }
      else if (rate_id == 7) {
        this.setState({
          hidePackPull: 'show',
          hideInvOrder: 'hide',
          hideAppoint: 'hide',
          hideInvBarc: 'hide',
          hideBinStorage: 'hide'
        })
        loadBarcode(merchant_id, rate_id)
      }
      // hideBinStorage
      else if (rate_id == 6) {
        this.setState({
          hideBinStorage: 'show',
          hidePackPull: 'hide',
          hideAppoint: 'hide',
          hideInvOrder: 'hide',
          hideInvBarc: 'hide'
        })
        loadBarcode(merchant_id, rate_id)
      } else {
        this.setState({
          hideInvBarc: 'show',
          hideInvOrder: 'hide',
          hideAppoint: 'hide',
          hidePackPull: 'hide',
          hideBinStorage: 'hide'
        })
        loadBarcode(merchant_id, rate_id)
      }
    } else {
      this.setState({
        hideInvBarc: 'hide',
        hideInvOrder: 'hide',
        hidePackPull: 'hide',
        hideBinStorage: 'hide',
        hideAppoint: 'hide',
      })
    }
    console.log(this.state.hideInvBarc)
  }
  geneInvoice() {
    // alert('geneInv');
    var merchant_id = this.state.seleMerch
    var serId = []
    $.each($("input[name='openModal[]']:checked"), function () {
      serId.push($(this).val())
    })

    if (merchant_id == '') {
      alert('Select Merchant')
      return false
    }

    if (serId == '') {
      alert('Please Select Any Services')
      return false
    }
    this.setState({
      isLoaded: false
    })

    $.ajax({
      url:
        this.state.baseUrl +
        '/laptopzone/reactcontroller/c_react/merch_generate_invoice',
      dataType: 'json',
      type: 'POST',
      data: { serId: serId, merchant_id: merchant_id },
      success: function (data) {
        if (data.exist == true) {
          this.setState({
            isLoaded: true,
            services: data.mer_inv
          })
        } else {
          this.setState({
            isLoaded: false
          })
        }
      }.bind(this),
      error: function (xhr, resp, text) {
        // show error to console
        console.log(xhr, resp, text)
      }
    })
    console.log(serId)
    // console.log(assign_listing);

    // alert(serviceId);
    // return false;
  }

  onSelectAll = isSelected => {
    // if (isSelected) {
    //   return this.state.bars.map(row => row.barcode_no);
    // } else {
    //   return [];
    // }
  }

  customConfirm(next, dropRowKeys) {
    $.LoadingOverlay('show')
    var serRateId = $('#serRateId').val()
    var merchantId = $('#merchantId').val()

    var getUrl = window.location
    var finalurl = getUrl.protocol + '//' + getUrl.hostname

    let insertUrl =
      finalurl + '/laptopzone/reactcontroller/c_react/generate_invoic'

    const dropRowKeysStr = dropRowKeys.join(',')
    // console.log(next + " : " + dropRowKeys + " : " + dropRowKeysStr);
    var ids = dropRowKeysStr.split(',')
    console.log(ids)

    $.ajax({
      url: insertUrl, // this.state.baseUrl+'/laptopzone/reactcontroller/c_react/generate_invoic',
      dataType: 'json',
      type: 'POST',
      data: { ids: ids, serRateId: serRateId, merchantId: merchantId },
      success: function (data) {
        $.LoadingOverlay('hide')
        if (data) {
          alert('Records Saved !')
          return false
        } else {
          alert('Error !')
          return false
        }
      },
      error: function (xhr, resp, text) {
        // show error to console
        // console.log(xhr,resp,text);
      }
    })
    // console.log(next());
  }
  // componentWillUpdate(prevProps, prevState) {
  //   if (prevState.ebay_charges != this.state.ebay_charges) {
  //     this.setState({
  //       ebay_charges: this.state.ebay_charges
  //     })
  //   }
  // }

  renderShowsTotal(start, to, total) {
    return (
      <p style={{ color: 'blue' }}>
        From {start} to {to}, totals is {total}&nbsp;&nbsp;(its a customize
        text)
      </p>
    )
  }

  render() {
    const { error, isLoaded, items, bars } = this.state
    const optionsBar = {
      sizePerPageList: [
        {
          text: '25',
          value: 25
        },
        {
          text: '50',
          value: 50
        },
        {
          text: '100',
          value: 100
        },
        {
          text: 'All',
          value: this.state.bars.length
        }
      ], // you can change the dropdown list for size per page
      handleConfirmDeleteRow: this.customConfirm,
      paginationShowsTotal: this.renderShowsTotal,
      sizePerPage: 25,
      pageStartIndex: 1,
      paginationPosition: 'top'
    }
    const footerData = [
      [
        // {
        //   label: 'Total',
        //   // columnIndex: 4,
        //   align: 'center'
        // },
        {
          label: 'Total value',
          columnIndex: 5,
          align: 'center',
          formatter: tableData => {
            let label = 0
            let sum = 0
            let totalsaleprice = 0
            for (
              let i = 0, tableDataLen = tableData.length;
              i < tableDataLen;
              i++
            ) {
              sum = sum + Number(tableData[i].ebay_charges)
              totalsaleprice = totalsaleprice + Number(tableData[i].ebay_price)
            }
            console.log(totalsaleprice)
            $('#sumSelec1').text('$ ' + sum.toFixed(2))
            $('#totalSalePrice').text('$ ' + totalsaleprice.toFixed(2))
            // this.state.ebay_charges = sum.toFixed(2)
            // return <strong>{'$ ' + sum.toFixed(2)}</strong>
          }
        }
      ]
    ]
    const footerData3 = [
      [
        // {
        //   label: 'Total',
        //   columnIndex: 4,
        //   align: 'center'
        // },
        {
          label: 'Total value',
          columnIndex: 5,
          align: 'center',
          formatter: tableData => {
            let label = 0
            let sum = 0
            let totalsaleprice = 0

            for (
              let i = 0, tableDataLen = tableData.length;
              i < tableDataLen;
              i++
            ) {
              sum = sum + Number(tableData[i].ebay_charges_two)
              totalsaleprice = totalsaleprice + Number(tableData[i].ebay_price)
            }
            $('#sumSelec1').text('$ ' + sum.toFixed(2))
            $('#totalSalePrice').text('$ ' + totalsaleprice.toFixed(2))
            // this.state.ebay_charge_two = sum.toFixed(2)
            // return <strong>{'$ ' + sum.toFixed(2)}</strong>
          }
        }
      ]
    ]
    const footerData2 = [
      [
        // {
        //   label: 'Total',
        //   columnIndex: 8,
        //   align: 'right'
        // },
        {
          label: 'Total value',
          columnIndex: 10,
          align: 'right',
          formatter: tableData => {
            let label = 0
            let sum = 0
            let totalsaleprice = 0

            for (
              let i = 0, tableDataLen = tableData.length;
              i < tableDataLen;
              i++
            ) {
              sum = sum + Number(tableData[i].ebay_charges)
              totalsaleprice = totalsaleprice + Number(tableData[i].ebay_price)
            }
            $('#sumSelec1').text('$ ' + sum.toFixed(2))
            $('#totalSalePrice').text('$ ' + totalsaleprice.toFixed(2))
            // return <strong>{'$ ' + sum.toFixed(2)}</strong>
          }
        },
        {
          label: 'Total value',
          columnIndex: 9,
          align: 'right',
          formatter: tableData => {
            let charge = 0
            let sum = 0
            let totalsaleprice = 0
            let ebay_fee = 0
            let packing_cost = 0
            let shipping_rate = 0
            let qty = 0
            for (
              let i = 0, tableDataLen = tableData.length;
              i < tableDataLen;
              i++
            ) {
              sum = sum + Number(tableData[i].marktplace)
              charge = charge + Number(tableData[i].ebay_charges)
              totalsaleprice = totalsaleprice + Number(tableData[i].ebay_price)
              ebay_fee = ebay_fee + Number(tableData[i].eba_fee)
              packing_cost = packing_cost + Number(tableData[i].packing_cost)
              shipping_rate = shipping_rate + Number(tableData[i].shiping_rate)
              qty = qty + Number(tableData[i].qty)
            }
            $('#marketplace').text('$ ' + sum.toFixed(2))
            $('#sumSelec1').text('$ ' + charge.toFixed(2))
            $('#totalSalePrice').text('$ ' + totalsaleprice.toFixed(2))
            $('#ebayfee').text('$ ' + ebay_fee.toFixed(2))
            $('#packing_cost').text('$ ' + packing_cost.toFixed(2))
            $('#shippingrate').text('$ ' + shipping_rate.toFixed(2))
            $('#qty').text(qty)
            // return <strong>{'$ ' + sum.toFixed(2)}</strong>
          }
        }
      ]
    ]

    const selectRowProp = {
      mode: 'checkbox',
      clickToSelect: true,
      selected: [], // default select on table
      bgColor: 'rgb(163,202,226)',
      onSelect: onRowSelect,
      onSelectAll: this.onSelectAll,
      showOnlySelected: true
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
      var loadMerchnts = this.state.loadMerchnts.map(function (mer, index) {
        return (
          <option key={index} value={mer.MERCHANT_ID}>
            {mer.BUISNESS_NAME}
          </option>
        )
      })

      return (
        <React.Fragment>
          <section className='content-header'>
            <h1>
              Active
              <small>Listed</small>
            </h1>
            <ol className='breadcrumb'>
              <li>
                <a href='#'>
                  <i className='fa fa-dashboard' /> Home
                </a>
              </li>
              <li>
                <a href='#'>Tables</a>
              </li>
              <li className='active'>Active Listed</li>
            </ol>
          </section>

          <section className='content'>
            <div className='row'>
              <div className='col-xs-12'>
                <div className='box'>
                  <div className='box-header'>
                    <h3 className='box-title'>Search Criteria</h3>
                  </div>

                  <div className='box-body'>
                    <div className='col-xs-3'>
                      <label>Select Merchant:</label>
                      <select
                        className='form-control selectpicker '
                        name='seleMerch'
                        value={this.state.seleMerch}
                        onChange={this.handleInput}
                      >
                        <option value='0'>Select Merchant.. </option>
                        {loadMerchnts}
                      </select>
                    </div>
                    {/* <div className="col-xs-2 pos">

                      <input type="button" className="btn btn-primary " value="Serch" onClick={this.serchByMerch}></input>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-xs-12'>
                <div className='box'>
                  <div className='box-header'>
                    <h3 align='center'>Merchant Invoice.</h3>
                  </div>

                  <div className='box-body'>
                    <table
                      id='table'
                      className='table table-bordered table-hover'
                    >
                      <thead>
                        <tr>
                          <th>Service Name</th>
                          <th>Unit</th>
                          <th align='center'>Rate</th>
                          <th align='center'>Total Count</th>
                          <th align='center'>Duration</th>
                          <th align='center'>Amount</th>
                          <th align='center'>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.services.map((item, index) => (
                          <tr key={index}>
                            <td>{item.SERVICE_NAME}</td>
                            <td>{item.SER_TYPE}</td>
                            <td>
                              <NumberFormat
                                className=' pull-right'
                                value={Number(item.RATE).toFixed(2)}
                                displayType={'text'}
                                fixedDecimalScale
                                thousandSeparator
                                prefix={'$ '} 
                              />
                            </td>
                            <td>
                              <NumberFormat
                                className=' pull-right'
                                value={item.TOTAL_COUNT}
                                displayType={'text'}
                                thousandSeparator
                              />
                            </td>
                            <td>{item.DURATION}</td>
                            <td>
                              <NumberFormat
                                className=' pull-right'
                                value={Number(item.TOTAL_CAHRGES).toFixed(2)}
                                
                                displayType={'text'}
                                thousandSeparator
                                prefix={'$ '}
                              />
                            </td>
                            <td>
                              <input
                                type='checkbox'
                                data-toggle='modal'
                                data-target='#openModal'
                                name='openModal[]'
                                id={'openModel_' + item.RATE_ID}
                                value={item.RATE_ID}
                                className='checkbox'
                                onChange={() => {
                                  this.openModal(item.MERCHANT_ID, item.RATE_ID)
                                }}
                              />
                            </td>
                          </tr>
                        ))}
                        <tr />
                        {/* <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Total Charges</td>
                        <td>12</td>
                        </tr> */}
                      </tbody>
                    </table>
                    <input
                      type='button'
                      name='geneInv'
                      style={{ margin_top: '30px' }}
                      id='geneInv'
                      value='Generate Invoice'
                      className='btn btn-lg btn-danger pull-right'
                      onClick={() => {
                        this.geneInvoice()
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <input type='hidden' name='serRateId' id='serRateId' />
            </div>
            <div>
              <input type='hidden' name='merchantId' id='merchantId' />
            </div>
            {this.state.hideInvBarc == 'show' ? (
              <div
                id='openModal'
                className='modal fade'
                role='dialog'
                data-backdrop='static'
                data-keyboard='false'
              >
                <div className='modal-dialog modal-dialog-custom  modal-lg'>
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <button
                        type='button'
                        className='close'
                        data-dismiss='modal'
                      >
                        &times;
                      </button>
                      <h4 className='modal-title'>Merchant Barcode</h4>
                    </div>
                    <div className='modal-body'>
                      <div className='col-sm-12'>
                        <input
                          type='text'
                          className='form-control'
                          id='sumSelec'
                          disabled
                        />
                        <div className='form-group col-sm-2'>
                          <label
                            style={{ fontSize: '15px', color: 'green' }}
                            className='control-label'
                          >
                            {' '}
                            Ebay Price :{' '}
                          </label>
                          <p style={{ fontSize: '15px' }} id='totalSalePrice' />
                        </div>
                        <div className='form-group col-sm-2'>
                          <label
                            style={{ fontSize: '15px', color: 'green' }}
                            className='control-label'
                          >
                            {' '}
                            Total Charge :{' '}
                          </label>
                          <p style={{ fontSize: '15px' }} id='sumSelec1' />
                        </div>
                      </div>

                      <BootstrapTable
                        data={this.state.bars}
                        deleteRow
                        striped
                        selectRow={selectRowProp}
                        options={optionsBar}
                        footerData={footerData}
                        footer
                        search
                        hover
                        pagination
                      >
                        {/* <TableHeaderColumn
                          row='0'
                          colSpan='1'
                          dataSort
                          csvHeader='Total Charge'
                          headerAlign='center'
                        >
                          product
                          </TableHeaderColumn> */}
                        <TableHeaderColumn
                          dataField='ebay_item_id'
                          dataAlign='left'
                          width='125px'
                          row='0'
                          rowSpan='2'
                        >
                          Ebay Item Id
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField='barcode_no'
                          isKey
                          dataAlign='left'
                          width='100px'
                          row='0'
                          rowSpan='2'
                        >
                          Barcode No
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          dataField='title'
                          dataAlign='left'
                          headerAlign='center'
                          width='40%'
                          row='0'
                          rowSpan='2'
                        >
                          Item Title
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField='ebay_price'
                          headerAlign='center'
                          dataAlign='center'
                          dataFormat={ebay_price}
                          row='0'
                          rowSpan='2'
                        >
                          Ebay Price
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          dataField='cond'
                          headerAlign='center'
                          dataAlign='center'
                          row='0'
                          rowSpan='2'
                        >
                          Condition
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          row='0'
                          colSpan='1'
                          csvHeader='Total Charge'
                          filter={{ type: 'TextFilter', delay: 1000 }}
                        >
                          {this.state.ebay_charges}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField='ebay_charges'
                          headerAlign='center'
                          dataAlign='center'
                          dataFormat={ebay_charges}
                          row='1'
                        >
                          Charges
                        </TableHeaderColumn>
                      </BootstrapTable>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {this.state.hideAppoint == 'show' ? (
              <div
                id='openModal'
                className='modal fade'
                role='dialog'
                data-backdrop='static'
                data-keyboard='false'
              >
                <div className='modal-dialog modal-dialog-custom  modal-lg'>
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <button
                        type='button'
                        className='close'
                        data-dismiss='modal'
                      >
                        &times;
                      </button>
                      <h4 className='modal-title'>Merchant Barcode</h4>
                    </div>
                    <div className='modal-body'>
                      <div className='col-sm-12'>
                        <input
                          type='text'
                          className='form-control'
                          id='sumSelec'
                          disabled
                        />
                        <div className='form-group col-sm-2'>
                          <label
                            style={{ fontSize: '15px', color: 'green' }}
                            className='control-label'
                          >
                            {' '}
                            Ebay Price :{' '}
                          </label>
                          <p style={{ fontSize: '15px' }} id='totalSalePrice' />
                        </div>
                        <div className='form-group col-sm-2'>
                          <label
                            style={{ fontSize: '15px', color: 'green' }}
                            className='control-label'
                          >
                            {' '}
                            Total Charge :{' '}
                          </label>
                          <p style={{ fontSize: '15px' }} id='sumSelec1' />
                        </div>
                      </div>

                      <BootstrapTable
                        data={this.state.bars}
                        deleteRow
                        striped
                        selectRow={selectRowProp}
                        options={optionsBar}
                        footerData={footerData}
                        footer
                        search
                        hover
                        pagination
                      >
                        {/* <TableHeaderColumn
                          row='0'
                          colSpan='1'
                          dataSort
                          csvHeader='Total Charge'
                          headerAlign='center'
                        >
                          product
                          </TableHeaderColumn> */}
                        <TableHeaderColumn
                          dataField='ebay_item_id'
                          dataAlign='left'
                          width='125px'
                          row='0'
                          rowSpan='2'
                        >
                          Ebay Item Id
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField='barcode_no'
                          isKey
                          dataAlign='left'
                          width='100px'
                          row='0'
                          rowSpan='2'
                        >
                          Barcode No
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          dataField='title'
                          dataAlign='left'
                          headerAlign='center'
                          width='40%'
                          row='0'
                          rowSpan='2'
                        >
                          Item Title
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField='ebay_price'
                          headerAlign='center'
                          dataAlign='center'
                          dataFormat={ebay_price}
                          row='0'
                          rowSpan='2'
                        >
                          Ebay Price
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          dataField='cond'
                          headerAlign='center'
                          dataAlign='center'
                          row='0'
                          rowSpan='2'
                        >
                          Condition
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField='duration'
                          headerAlign='center'
                          dataAlign='center'
                          row='0'
                          rowSpan='2'
                        >
                          DURATION
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          row='0'
                          colSpan='1'
                          csvHeader='Total Charge'
                          filter={{ type: 'TextFilter', delay: 1000 }}
                        >
                          {this.state.ebay_charges}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField='ebay_charges'
                          headerAlign='center'
                          dataAlign='center'
                          dataFormat={ebay_charges}
                          row='1'
                        >
                          Charges
                        </TableHeaderColumn>
                      </BootstrapTable>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {this.state.hideBinStorage == 'show' ? (
              <div
                id='openModal'
                className='modal fade'
                role='dialog'
                data-backdrop='static'
                data-keyboard='false'
              >
                <div className='modal-dialog modal-dialog-custom  modal-lg'>
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <button
                        type='button'
                        className='close'
                        data-dismiss='modal'
                      >
                        &times;
                      </button>
                      <h4 className='modal-title'>Merchant Barcode</h4>
                    </div>
                    <div className='modal-body'>
                      <div className='col-sm-12'>
                        <input
                          type='text'
                          className='form-control'
                          id='sumSelec'
                          disabled
                        />
                        <div className='form-group col-sm-2'>
                          <label
                            style={{ fontSize: '15px', color: 'green' }}
                            className='control-label'
                          >
                            {' '}
                            Ebay Price :{' '}
                          </label>
                          <p style={{ fontSize: '15px' }} id='totalSalePrice' />
                        </div>
                        <div className='form-group col-sm-2'>
                          <label
                            style={{ fontSize: '15px', color: 'green' }}
                            className='control-label'
                          >
                            {' '}
                            Total Charge :{' '}
                          </label>
                          <p style={{ fontSize: '15px' }} id='sumSelec1' />
                        </div>
                      </div>

                      <BootstrapTable
                        data={this.state.bars}
                        deleteRow
                        striped
                        selectRow={selectRowProp}
                        options={optionsBar}
                        footerData={footerData3}
                        footer
                        search
                        hover
                        pagination
                      >
                        <TableHeaderColumn
                          dataField='ebay_item_id'
                          dataAlign='left'
                          width='125px'
                          row='0'
                          rowSpan='2'
                        >
                          Ebay Item Id
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField='barcode_no'
                          isKey
                          dataAlign='left'
                          width='100px'
                          row='0'
                          rowSpan='2'
                        >
                          Barcode No
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          dataField='title'
                          dataAlign='left'
                          headerAlign='center'
                          width='40%'
                          row='0'
                          rowSpan='2'
                        >
                          Item Title
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField='ebay_price'
                          headerAlign='center'
                          dataAlign='center'
                          dataFormat={ebay_price}
                          row='0'
                          rowSpan='2'
                        >
                          Ebay Price
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField='cond'
                          headerAlign='center'
                          dataAlign='center'
                          row='0'
                          rowSpan='2'
                        >
                          Condition
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          row='0'
                          colSpan='1'
                          csvHeader='Total Ebay Charge'
                          filter={{ type: 'TextFilter', delay: 1000 }}
                        >
                          {this.state.ebay_charge_two}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField='ebay_charges_two'
                          headerAlign='center'
                          dataAlign='center'
                          dataFormat={ebay_charges_two}
                          row='1'
                        >
                          Charges
                        </TableHeaderColumn>
                      </BootstrapTable>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {this.state.hidePackPull == 'show' ? (
              <div
                id='openModal'
                className='modal fade'
                role='dialog'
                data-backdrop='static'
                data-keyboard='false'
              >
                <div className='modal-dialog modal-dialog-custom  modal-lg'>
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <button
                        type='button'
                        className='close'
                        data-dismiss='modal'
                      >
                        &times;
                      </button>
                      <h4 className='modal-title'>Merchant Barcode</h4>
                    </div>
                    <div className='modal-body'>
                      <div className='col-sm-12'>
                        <input
                          type='text'
                          className='form-control'
                          id='sumSelec'
                          disabled
                        />
                        <div className='form-group col-sm-2'>
                          <label
                            style={{ fontSize: '15px', color: 'green' }}
                            className='control-label'
                          >
                            {' '}
                            Ebay Price :{' '}
                          </label>
                          <p style={{ fontSize: '15px' }} id='totalSalePrice' />
                        </div>
                        <div className='form-group col-sm-2'>
                          <label
                            style={{ fontSize: '15px', color: 'green' }}
                            className='control-label'
                          >
                            {' '}
                            Total Charge :{' '}
                          </label>
                          <p style={{ fontSize: '15px' }} id='sumSelec1' />
                        </div>
                      </div>

                      <BootstrapTable
                        data={this.state.bars}
                        deleteRow
                        striped
                        selectRow={selectRowProp}
                        options={optionsBar}
                        footerData={footerData}
                        footer
                        search
                        hover
                        pagination
                      >
                        <TableHeaderColumn
                          dataField='ebay_item_id'
                          dataAlign='left'
                          width='125px'
                        >
                          Ebay Item Id
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField='barcode_no'
                          isKey
                          dataAlign='left'
                          width='100px'
                        >
                          Barcode No
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField='order_id'
                          dataAlign='left'
                          width='100px'
                        >
                          Order Id
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          dataField='title'
                          dataAlign='left'
                          headerAlign='center'
                          width='40%'
                        >
                          Item Title
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField='ebay_price'
                          headerAlign='center'
                          dataAlign='center'
                          dataFormat={ebay_price}
                        >
                          Ebay Price
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField='cond'
                          headerAlign='center'
                          dataAlign='center'
                        >
                          Condition
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField='ebay_charges'
                          headerAlign='center'
                          dataAlign='center'
                          dataFormat={ebay_charges}
                        >
                          Charges
                        </TableHeaderColumn>
                      </BootstrapTable>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {this.state.hideInvOrder == 'show' ? (
              <div
                id='openModal'
                className='modal fade'
                role='dialog'
                data-backdrop='static'
                data-keyboard='false'
              >
                <div className='modal-dialog modal-dialog-custom  modal-lg'>
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <button
                        type='button'
                        className='close'
                        data-dismiss='modal'
                      >
                        &times;
                      </button>
                      <h4 className='modal-title'>Merchant Barcode</h4>
                    </div>
                    <div className='modal-body'>
                      <div className='col-sm-12'>
                        <input
                          type='text'
                          className='form-control'
                          id='sumSelec'
                          disabled
                        />
                        <div className='form-group col-sm-2'>
                          <label
                            style={{ fontSize: '15px', color: 'green' }}
                            className='control-label'
                          >
                            {' '}
                            Sale Price :{' '}
                          </label>
                          <p style={{ fontSize: '15px' }} id='totalSalePrice' />
                        </div>
                        <div className='form-group col-sm-2'>
                          <label
                            style={{ fontSize: '15px', color: 'green' }}
                            className='control-label'
                          >
                            {' '}
                            Qty :{' '}
                          </label>
                          <p style={{ fontSize: '15px' }} id='qty' />
                        </div>
                        <div className='form-group col-sm-2'>
                          <label
                            style={{ fontSize: '15px', color: 'green' }}
                            className='control-label'
                          >
                            {' '}
                            Shipping Rate :{' '}
                          </label>
                          <p style={{ fontSize: '15px' }} id='shippingrate' />
                        </div>
                        <div className='form-group col-sm-2'>
                          <label
                            style={{ fontSize: '15px', color: 'green' }}
                            className='control-label'
                          >
                            {' '}
                            Packing Cost :{' '}
                          </label>
                          <p style={{ fontSize: '15px' }} id='packing_cost' />
                        </div>
                        <div className='form-group col-sm-2'>
                          <label
                            style={{ fontSize: '15px', color: 'green' }}
                            className='control-label'
                          >
                            {' '}
                            Ebay fee :{' '}
                          </label>
                          <p style={{ fontSize: '15px' }} id='ebayfee' />
                        </div>

                        <div className='col-sm-12'>
                          <div className='form-group col-sm-2'>
                            <label
                              style={{ fontSize: '15px', color: 'green' }}
                              className='control-label'
                            >
                              {' '}
                              MarketPlace :{' '}
                            </label>
                            <p style={{ fontSize: '15px' }} id='marketplace' />
                          </div>
                          <div className='form-group col-sm-2'>
                            <label
                              style={{ fontSize: '15px', color: 'green' }}
                              className='control-label'
                            >
                              {' '}
                              Total Charge :{' '}
                            </label>
                            <p style={{ fontSize: '15px' }} id='sumSelec1' />
                          </div>
                        </div>
                      </div>

                      <BootstrapTable
                        data={this.state.bars}
                        deleteRow
                        footerData={footerData2}
                        footer
                        striped
                        selectRow={selectRowProp}
                        options={optionsBar}
                        search
                        hover
                        pagination
                      >
                        <TableHeaderColumn
                          dataField='ebay_item_id'
                          dataAlign='left'
                          width='125px'
                        >
                          Ebay Item Id
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          hidden
                          dataField='barcode_no'
                          isKey
                          dataAlign='left'
                          width='100px'
                        >
                          Order Id
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          dataField='sales_record_number'
                          dataAlign='left'
                          width='100px'
                        >
                          Sale Record #
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          dataField='title'
                          dataAlign='left'
                          headerAlign='center'
                          width='35%'
                        >
                          Item Title
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          dataField='ebay_price'
                          headerAlign='center'
                          dataAlign='center'
                          dataFormat={ebay_price}
                        >
                          Sale Price
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          dataField='qty'
                          headerAlign='center'
                          dataAlign='center'
                        >
                          Qty
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          dataField='shiping_rate'
                          headerAlign='center'
                          dataAlign='center'
                          dataFormat={shipping_rate}
                        >
                          Shipping Rate
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          dataField='packing_cost'
                          headerAlign='center'
                          dataAlign='center'
                          dataFormat={packing_cost}
                        >
                          Packing Cost
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          dataField='eba_fee'
                          headerAlign='center'
                          dataAlign='center'
                          dataFormat={ebay_fee}
                        >
                          Ebay Fee
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          dataField='marktplace'
                          headerAlign='center'
                          dataAlign='center'
                          dataFormat={marketPlace}
                        >
                          Marketplace 7%
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          dataField='ebay_charges'
                          headerAlign='center'
                          dataAlign='center'
                          dataFormat={ebay_charges}
                        >
                          Total Charges
                        </TableHeaderColumn>
                      </BootstrapTable>
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
export default MerInvoice
