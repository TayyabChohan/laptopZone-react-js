import React, { Component } from 'react'
// import ReactDOM from 'react-dom';
// import { Link, withRouter } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import $ from 'jquery'
import { RViewer, RViewerTrigger } from 'react-viewerjs'

import LoadSeed from './load_seed.js'
import Modal from 'react-modal'
import { Button } from 'react-bootstrap'
import ImageViews from './imageView.js'
import Autosuggest from 'react-autosuggest'
import SlidingPane from 'react-sliding-pane'
import 'react-sliding-pane/dist/react-sliding-pane.css'
import { toastr } from 'react-redux-toastr'
import 'gasparesganga-jquery-loading-overlay'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { css } from 'glamor'
import Flatpickr from 'react-flatpickr'
import dateFormat from 'dateformat'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-daterangepicker/daterangepicker.css'
import AlertError from './messages/AlertMessage'

import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker'
import moment from 'moment'
var that = ''

export class ImageView extends Component {
  constructor (props) {
    super(props)

    this.state = {
      cell: this.props.cell,
      row: this.props.row,
      imagesUrl: that.state.images
    }
  }

  render () {
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
                  className='getmyCss'
                  src={imagesUrl[this.props.cell][0]}
                  width='90px'
                  height='90px'
                />
              </div>
            </RViewerTrigger>
          </RViewer>
        </div>
      </React.Fragment>
    )
  }
}
function imageView (cell, row) {
  return <ImageView cell={cell} row={row} />
}
$(document).on('click', '#catVerify', function () {
  // console.log(i)
  var $row = $(this).closest('tr') // Find the row
  var tds = $row.find('td:nth-child(2)')
  $.each(tds, function () {
    console.log($(this).text())
    that.setState({
      emailValue: $(this).text()
    })
    //  document.getElementById('categId').value = $(this).text()
  })
  // var tdss = $row.find('td:nth-child(5)')

  // $.each(tdss, function () {
  //   document.getElementById('categName').value = $(this).text()
  // })

  // var t = document.getElementById('cat_undefined')
  // console.log(t)
  // // $("#category_table tr").each(function() {
  // var cat_id = $(t.rows[index].cells[1]).text()
  // var main_cat = $(t.rows[index].cells[2]).text()
  // var sub_cat = $(t.rows[index].cells[3]).text()
  // var cat_name = $(t.rows[index].cells[4]).text()
  // document.getElementById('category_id').value = cat_id
  // document.getElementById('category_name').value = cat_name
  // document.getElementById('main_category').value = main_cat
  // document.getElementById('sub_cat').value = sub_cat

  // i++;

  // });
})
$(document).on('click', '.remove_sugs ', function () {
  // $(this)
  //   .closest('.remove_slected_macro_div')
  //   .remove()
  const div = document.querySelector('#price-results')

  // Apply style to div
  div.setAttribute('style', 'display: none')
  // alert('hello')
})

$(document).on('click', '.seed_suggest_price_verify ', function () {
  const div = document.querySelector('#price-results')

  // Apply style to div
  div.setAttribute('style', 'display: flex')
  // alert('hello')
})
$(document).on('click', '.searchActiveListing_verify ', function () {
  const div = document.querySelector('#price-results')

  // Apply style to div
  div.setAttribute('style', 'display: flex')
  // alert('hello')
})
$(document).on('click', '.remove_solds ', function () {
  // $(this)
  //   .closest('.remove_slected_macro_div')
  //   .remove()
  const div = document.querySelector('#sold_price_datas')

  // Apply style to div
  div.setAttribute('style', 'display: none')
  // alert('hello')
})
$(document).on('click', '.seed_suggest_price_verify ', function () {
  const div = document.querySelector('#sold_price_datas')

  // Apply style to div
  div.setAttribute('style', 'display: flex')
  // alert('hello')
})
$(document).on('click', '#Suggest_Categories_for_title_verify ', function () {
  const div = document.querySelector('#Categories_result_verfiy')

  // Apply style to div
  div.setAttribute('style', 'display: block')
  // alert('hello')
})
$(document).on('click', '.categorie_button_verify ', function () {
  // $(this)
  //   .closest('.remove_slected_macro_div')
  //   .remove()
  const div = document.querySelector('#Categories_result_verfiy')

  // Apply style to div
  div.setAttribute('style', 'display: none')
  // alert('hello')
})

class VerifyItem extends React.Component {
  constructor (props) {
    var getUrl = window.location
    var finalurl = getUrl.protocol + '//' + getUrl.hostname

    // console.log('1');
    super(props)
    that = this
    this.state = {
      nicknameValue: '',
      nicknameSuggestions: [],
      emailValue: '',
      emailSuggestions: [],
      images: [],
      isPaneOpen: false,

      baseUrl: finalurl,
      error: null,
      isLoaded: true,
      showSeed: 'hide',
      buttonCheck: 'hide',
      showSelected: 'hide',
      showMasterInfo: 'hide',
      showVerifyInfo: 'hide',
      showCheckboxs: 'hide',
      UpcTitleCheck: false,
      MpnTitleCheck: false,
      CondCheck: false,
      mpnTitle: [],
      identificData: [],
      seedVal: '1',
      objects: [],
      conditions: [],
      barcodeNo: '',
      selectBars: '',
      itemType: '',
      idS: '',
      mastBarc: null,
      mastDesc: null,
      mastCond: null,
      mastBrand: null,
      mastMpn: null,
      upcNum: null,
      mpnName: null,
      objName: null,
      catId: null,
      brandName: null,
      mpnDesc: null,
      remarks: null,
      avgSold: null,
      getCond: null,
      boxHeader: null,
      availCond: [],
      condRadio: null,
      redirectToReferrer: false,
      selected: '',
      serchBar: '',
      users: '',
      dateShow: false,
      filterData: 'Lot',
      date_range: '',
      startDate: moment().subtract(29, 'days'),
      endDate: moment(),
      ranges: {
        Today: [moment(), moment()],
        Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [
          moment()
            .subtract(1, 'month')
            .startOf('month'),
          moment()
            .subtract(1, 'month')
            .endOf('month')
        ]
      }
      // startDate: new Date(),
      // endDate: new Date()
    }

    this.handleForm = this.handleForm.bind(this)
    this.discardItem = this.discardItem.bind(this)
    this.handleInput = this.handleInput.bind(this)
    // this.serchUpc = this.serchUpc.bind(this);
    this.serchMpn = this.serchMpn.bind(this)
    this.serchtest = this.serchtest.bind(this)
    this.closePane = this.closePane.bind(this)
    this.showSeed = this.showSeed.bind(this)
    this.updateRemarks = this.updateRemarks.bind(this)
    this.serchForVerifyy = this.serchForVerifyy.bind(this)
    this.isPaneOpenFunc = this.isPaneOpenFunc.bind(this)
    this.seed_suggest_price_verify = this.seed_suggest_price_verify.bind(this)
    this.searchActiveListing_verify = this.searchActiveListing_verify.bind(this)
    this.Suggest_Categories_for_title_verify = this.Suggest_Categories_for_title_verify.bind(
      this
    )
    this.removeDate = this.removeDate.bind(this)
    this.handleEvent = this.handleEvent.bind(this)
  }

  componentWillMount () {
    if (localStorage.getItem('userName')) {
      // Modal.setAppElement(this.el);

      console.log('setion find')
    } else {
      this.setState({ redirectToReferrer: true })
    }
  }
  handleEvent (event, picker) {
    this.setState({
      startDate: picker.startDate,
      endDate: picker.endDate
    })
  }

  updateRemarks () {
    $.LoadingOverlay('show')
    const data = {
      remarks: this.state.remarks,
      item_type: this.state.itemType,
      barcode: this.state.serchBar
    }
    var insertUrl =
      this.state.baseUrl +
      '/laptopzone/reactcontroller/c_haziqreact/update_seed_remarks'
    new Promise(function (resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: 'json',
        type: 'POST',
        data: data
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
        if (result.status == true) {
          toastr.success('Success', result.message)
        } else {
          $.LoadingOverlay('hide')
          toastr.error('Error', result.message)
          // alert('barcode not exist')
          return false
        }
      })
      .catch(err => {
        $.LoadingOverlay('hide')
        console.log(err)
      })
  }
  serchForVerifyy () {
    this.setState({
      showVerifyInfo: 'hide',
      showSeed: 'hide',
      selectBars: '',
      showSelected: 'hide'
    })
    $.LoadingOverlay('show')

    // promise function start
    var insertUrl =
      this.state.baseUrl +
      '/laptopzone/reactcontroller/c_react/get_verify_item/' +
      this.state.serchBar

    new Promise(function (resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: 'json',
        type: 'POST',
        data: {}
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
        // $.LoadingOverlay('hide')

        if (result.exist) {
          if (result['get_items'][0].OBJECT_NAME == null) {
            var objt = ''
          } else {
            var objt = result['get_items'][0].OBJECT_NAME
          }

          if (result['get_items'][0].CATEGORY_ID == null) {
            var catgry = ''
          } else {
            var catgry = result['get_items'][0].CATEGORY_ID
          }

          $.LoadingOverlay('hide')
          this.setState({
            barcodeNo: result['get_items'][0].BARCODE_PRV_NO,
            itemType: result['get_items'][0].BAROCDE_TYPE,
            idS: result['get_items'][0].LZ_DEKIT_US_DT_ID,
            upcNum: result['get_items'][0].UPC,
            mpnName: result['get_items'][0].MPN,
            nicknameValue: objt, // result['get_items'][0].OBJECT_NAME,
            emailValue: catgry, // result['get_items'][0].CATEGORY_ID,
            brandName: result['get_items'][0].BRAND,
            mpnDesc: result['get_items'][0].MPN_DESC,
            remarks: result['get_items'][0].REMARKS,
            // catId :result['get_items'][0].CATEGORY_ID,
            avgSold: result['get_items'][0].AVG_PRIC,
            selected: result['get_items'][0].ID,
            availCond: result.get_cond,
            showVerifyInfo: 'show',
            showSeed: 'hide',
            CondCheck: true,
            buttonCheck: result.seed_avail ? 'show' : 'hide'
          })

          if (result.run_master_bar_query) {
            $.LoadingOverlay('hide')
            this.setState({
              showMasterInfo: 'show',
              showVerifyInfo: 'show',
              showSeed: 'hide',
              mastBarc: result['run_master_bar_query'][0].BARCODE_NO,
              mastDesc: result['run_master_bar_query'][0].ITEM_DESC,
              mastCond: result['run_master_bar_query'][0].COND_NAME,
              mastBrand: result['run_master_bar_query'][0].ITEM_MT_MANUFACTURE,
              mastMpn: result['run_master_bar_query'][0].ITEM_MT_MFG_PART_NO
            })
          }
        } else {
          $.LoadingOverlay('hide')
          alert('barcode not exist')
          return false
        }
      })
      .catch(err => {
        $.LoadingOverlay('hide')
        console.log(err)
      })

    // promise function end

    $.ajax({
      url:
        this.state.baseUrl +
        '/laptopzone/reactcontroller/c_react/get_obj_drop_sugestion',
      dataType: 'json',
      type: 'POST',
      data: {},
      success: function (data) {
        $.LoadingOverlay('hide')
        this.setState({
          isLoaded: true,
          users: data
        })
        // console.log(this.state.users);
      }.bind(this),
      error: function (xhr, resp, text) {
        // show error to console
        // console.log(xhr,resp,text);
      }
    })
  }

  componentWillMount () {
    if (localStorage.getItem('userName')) {
      console.log('setion find')
    } else {
      this.setState({ redirectToReferrer: true })
    }
  }

  removeDate = () => {
    this.setState({
      date_range: ''
    })
  }
  onChangeRadioCheck = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }
  Suggest_Categories_for_title_verify = () => {
    if (this.state.mpnDesc == null) {
      toastr.warning('Warning', 'Warning! Please Enter The MPN DESC')
    } else {
      $.LoadingOverlay('show')
      let data
      data = {
        UPC: '',
        MPN: '',
        TITLE: this.state.mpnDesc
      }
      $.ajax({
        type: 'POST',
        dataType: 'json',
        url:
          this.state.baseUrl +
          '/laptopzone/reactcontroller/c_haziqreact/suggest_categories',
        data: data,
        success: function (data) {
          $.LoadingOverlay('hide')
          if ((data.Ack = 'Success' && data.CategoryCount > 0)) {
            if (data.CategoryCount == 1) {
              // if result is 1 than condition is changed so this check is neccessory
              $('#Categories_result_verfiy').html('')
              var tr = ''

              $('#Categories_result_verfiy').html(
                "<div class='col-sm-12'><div class='box '><div class='box-header'><i class='fa fa-usd'></i><h3 class='box-title'>Suggested Categories</h3><div class='box-tools pull-right'><button type='button' class='btn bg-teal btn-sm categorie_button_verify' onclick='categorie_button_verify' data-widget='remove'><i class='fa fa-times'></i></button></div></div><table width='100%' class='table table-bordered table-striped' border='1' id='category_table'> <th>Sr. No</th><th>Category ID</th><th>Main Category </th><th>Sub Category</th><th>Category Name</th><th>Item(%)</th><th>Select</th>"
              )

              var item = data['SuggestedCategoryArray']['SuggestedCategory']
              var CategoryParentName1 =
                item['Category']['CategoryParentName'][0].length // [0];//manin category
              if (CategoryParentName1 === 1) {
                // check sub category exist or not
                var CategoryParentName1 = item['Category']['CategoryParentName'] // [0];//manin category
                var CategoryID = item['Category']['CategoryID']
                var CategoryName = item['Category']['CategoryName']
                var PercentItemFound = item['PercentItemFound']
                $('<tr>')
                  .html(
                    '<td>' +
                      1 +
                      '</td><td>' +
                      CategoryID +
                      '</td><td>' +
                      CategoryParentName1 +
                      '</td><td>' +
                      '' +
                      '</td><td>' +
                      CategoryName +
                      '</td><td>' +
                      PercentItemFound +
                      "</td><td><a class='crsr-pntr' id='catVerify'> Select </a></td></tr></table></div></div>"
                    // "</td><td><a class='crsr-pntr' id='catVerify" +
                    // i +
                    // "' onclick='myFunction(" +
                    // 1 +
                    // ");'> Select </a></td></tr></table></div></div>"
                  )
                  .appendTo('#category_table')
              } else {
                var CategoryParentName1 =
                  item['Category']['CategoryParentName'][0] // manin category
                var CategoryParentName2 =
                  item['Category']['CategoryParentName'][1] // sub category
                var CategoryID = item['Category']['CategoryID']
                var CategoryName = item['Category']['CategoryName']
                var PercentItemFound = item['PercentItemFound']
                $('<tr>')
                  .html(
                    '<td>' +
                      1 +
                      '</td><td>' +
                      CategoryID +
                      '</td><td>' +
                      CategoryParentName1 +
                      '</td><td>' +
                      CategoryParentName2 +
                      '</td><td>' +
                      CategoryName +
                      '</td><td>' +
                      PercentItemFound +
                      "</td><td><a class='crsr-pntr' id='catVerify'> Select </a></td></tr></table></div></div>"

                    // "</td><td><a class='crsr-pntr' id='catVerify" +
                    // i +
                    // "' onclick='myFunction(" +
                    // 1 +
                    // ");'> Select </a></td></tr></table></div></div>"
                  )
                  .appendTo('#category_table')
              }
            }

            if (data.CategoryCount > 1) {
              $('#Categories_result_verfiy').html('')
              var tr = ''
              // var CategoryCount = data['CategoryCount'];
              $('#Categories_result_verfiy').html(
                "<div class='col-sm-12'><div class='box '><div class='box-header'><i class='fa fa-usd'></i><h3 class='box-title'>Suggested Categories</h3><div class='box-tools pull-right'><button type='button' class='btn bg-teal btn-sm categorie_button_verify'  onclick='categorie_button_verify' data-widget='remove'><i class='fa fa-times'></i></button></div></div><table width='100%' class='table table-bordered table-striped' border='1' id='category_table'> <th>Sr. No</th><th>Category ID</th><th>Main Category </th><th>Sub Category</th><th>Category Name</th><th>Item(%)</th><th>Select</th>"
              )
              for (var i = 1; i <= data.CategoryCount; i++) {
                var item =
                  data['SuggestedCategoryArray']['SuggestedCategory'][i - 1]
                var CategoryParentName1 =
                  item['Category']['CategoryParentName'][0].length // manin category
                if (CategoryParentName1 === 1) {
                  // check sub category exist or not
                  var CategoryParentName1 =
                    item['Category']['CategoryParentName'] // [0];//manin category
                  var CategoryID = item['Category']['CategoryID']
                  var CategoryName = item['Category']['CategoryName']
                  var PercentItemFound = item['PercentItemFound']
                  $('<tr>')
                    .html(
                      '<td>' +
                        i +
                        '</td><td>' +
                        CategoryID +
                        '</td><td>' +
                        CategoryParentName1 +
                        '</td><td>' +
                        '' +
                        '</td><td>' +
                        CategoryName +
                        '</td><td>' +
                        PercentItemFound +
                        "</td><td><a class='crsr-pntr' id='catVerify'> Select </a></td></tr></table></div></div>"

                      // "</td><td><a class='crsr-pntr' id='catVerify" +
                      // i +
                      // "' onclick='myFunction(" +
                      // i +
                      // ");'> Select </a></td></tr></table></div></div>"
                    )
                    .appendTo('#category_table')
                } else {
                  var CategoryParentName1 =
                    item['Category']['CategoryParentName'][0] // manin category
                  var CategoryParentName2 =
                    item['Category']['CategoryParentName'][1] // sub category
                  var CategoryID = item['Category']['CategoryID']
                  var CategoryName = item['Category']['CategoryName']
                  var PercentItemFound = item['PercentItemFound']
                  $('<tr>')
                    .html(
                      '<td>' +
                        i +
                        '</td><td>' +
                        CategoryID +
                        '</td><td>' +
                        CategoryParentName1 +
                        '</td><td>' +
                        CategoryParentName2 +
                        '</td><td>' +
                        CategoryName +
                        '</td><td>' +
                        PercentItemFound +
                        "</td><td><a class='crsr-pntr' id='catVerify'> Select </a></td></tr></table></div></div>"

                      // "</td><td><a class='crsr-pntr' id='catVerify" +
                      // i +
                      // "' onclick='myFunction(" +
                      // i +
                      // ");'> Select </a></td></tr></table></div></div>"
                    )
                    .appendTo('#category_table')
                }
              }

              $('</table></div></div>').appendTo('#Categories_result_verfiy')
            }
          } else {
            $('#Categories_result_verfiy').html('')
            // $( "#Categories_result_verfiy").html("No Record found");
            $(
              "<div class='col-sm-12'><div class='box box-primary'><div class='box-header'><i class='fa fa-usd'></i><h3 class='box-title'>No Record Found.</h3><div class='box-tools pull-right'><button type='button' class='btn bg-teal btn-sm categorie_button_verify' data-widget='remove'><i class='fa fa-times'></i></button></div></div></div></div>"
            ).appendTo('#Categories_result_verfiy')
          }
        },
        error: function (xhr, resp, text) {
          $.LoadingOverlay('hide')
          alert(xhr, resp, text)
          // show error to console
          // console.log(xhr,resp,text);
        }
      })
    }
  }

  seed_suggest_price_verify = e => {
    console.log(e)

    let data
    if (e == 'upc') {
      console.log(this.state.upcNum)
      if (this.state.upcNum == null) {
        data = null
        toastr.warning('Warning', 'Warning! Please ENter The UPC')
      } else {
        data = {
          UPC: this.state.upcNum,
          TITLE: '',
          MPN: '',
          CATEGORY: '',
          CONDITION: this.state.selected
        }
      }
    } else if (e == 'mpn') {
      console.log(this.state.mpnName)
      if (this.state.mpnName == null) {
        data = null
        toastr.warning('Warning', 'Warning! Please Enter The MPN Name')
      } else {
        data = {
          UPC: '',
          TITLE: '',
          MPN: this.state.mpnName,
          CATEGORY: '',
          CONDITION: this.state.selected
        }
      }
    } else if (e == 'des') {
      if (this.state.mpnDesc == null) {
        data = null
        toastr.warning('Warning', 'Warning! Please Enter The MPN Desc')
      } else {
        data = {
          UPC: '',
          TITLE: this.state.mpnDesc,
          MPN: '',
          CATEGORY: '',
          CONDITION: this.state.selected
        }
      }
    }
    console.log(data)
    //   }
    if (data !== null) {
      $.LoadingOverlay('show')
      $.ajax({
        type: 'POST',
        dataType: 'json',
        url:
          this.state.baseUrl +
          '/laptopzone/reactcontroller/c_haziqreact/get_item_sold_price',
        data: data,
        success: function (data) {
          $.LoadingOverlay('hide')
          if ((data.ack = 'Success' && data.itemCount > 0)) {
            if (data.itemCount == 1) {
              // if result is 1 than condition is changed so this check is neccessory
              $('#sold_price_datas').html('')
              var tr = ''
              $('#sold_price_datas').html(
                "<div class='col-sm-12'><div class='box '><div class='box-header'><i class='fa fa-usd'></i><h3 class='box-title'>Sold Listing-End Time Soonest</h3><div class='box-tools pull-right'><button type='button' class='btn bg-teal btn-sm remove_solds' onclick='remove_solds' data-widget='remove'><i class='fa fa-times'></i></button></div></div><table width='100%' class='table table-bordered table-striped' border='1' id='sold_price_datas_table'> <th>Sr. No</th><th>Seller ID</th><th>Price</th><th>Condition</th>"
              )
              //  for ( var i = 1; i < data.itemCount+1; i++ ) {

              var item = data['item']
              var price = item['basicInfo']['convertedCurrentPrice']
              var username = item['sellerInfo']['sellerUserName']
              if (username == 'dfwonline' || username == 'techbargains2015') {
                var tr_clr = 'style ="background-color: #7dff7d;"'
              } else {
                var tr_clr = ''
              }
              var item_url = item['basicInfo']['viewItemURL']
              var condition = item['basicInfo']['conditionDisplayName']
              $('<tr ' + tr_clr + '>')
                .html(
                  '<td>' +
                    i +
                    "</td><td><a href='" +
                    item_url +
                    "' target = '_blank'>" +
                    username +
                    '</a></td><td>' +
                    price +
                    '</td><td>' +
                    condition +
                    '</td></tr></table></div></div>'
                )
                .appendTo('#sold_price_datas_table')
              // }
            }
            if (data.itemCount > 1) {
              $('#sold_price_datas').html('')
              var tr = ''
              $('#sold_price_datas').html(
                "<div class='col-sm-12'><div class='box '><div class='box-header'><i class='fa fa-usd'></i><h3 class='box-title'>Sold Listing-End Time Soonest</h3><div class='box-tools pull-right'><button type='button' class='btn bg-teal btn-sm remove_solds' onclick='remove_solds' data-widget='remove'><i class='fa fa-times'></i></button></div></div><table width='100%' class='table table-bordered table-striped' border='1' id='sold_price_datas_table'> <th>Sr. No</th><th>Seller ID</th><th>Price</th><th>Condition</th>"
              )
              if (data.item !== undefined) {
                for (var i = 1; i < data.item.length + 1; i++) {
                  var item = data['item'][i - 1]
                  var price = item['basicInfo']['convertedCurrentPrice']
                  var username = item['sellerInfo']['sellerUserName']
                  if (
                    username == 'dfwonline' ||
                    username == 'techbargains2015'
                  ) {
                    var tr_clr = 'style ="background-color: #7dff7d;"'
                  } else {
                    var tr_clr = ''
                  }
                  var item_url = item['basicInfo']['viewItemURL']
                  var condition = item['basicInfo']['conditionDisplayName']
                  $('<tr ' + tr_clr + '>')
                    .html(
                      '<td>' +
                        i +
                        "</td><td><a href='" +
                        item_url +
                        "' target = '_blank'>" +
                        username +
                        '</a></td><td>' +
                        price +
                        '</td><td>' +
                        condition +
                        '</td></tr>'
                    )
                    .appendTo('#sold_price_datas_table')
                }
                // $('#sold_price_datas').html('</table></div></div>')
              }
            }
          } else {
            $('#sold_price_datas').html('')
            // $('#sold_price_datas').html('No Reecord found')
            $(
              "<div class='col-sm-12'><div class='box box-primary'><div class='box-header'><i class='fa fa-usd'></i><h3 class='box-title'>No Record Found.</h3><div class='box-tools pull-right'><button type='button' class='btn bg-teal btn-sm remove_solds' data-widget='remove'><i class='fa fa-times'></i></button></div></div></div></div>"
            ).appendTo('#sold_price_datas')
          }
        },
        error: function (xhr, resp, text) {
          $.LoadingOverlay('hide')
          alert(xhr, resp, text)
          // show error to console
          // console.log(xhr,resp,text);
        }
      })
      $.LoadingOverlay('show')
      $.ajax({
        type: 'POST',
        dataType: 'json',
        url:
          this.state.baseUrl +
          '/laptopzone/reactcontroller/c_haziqreact/suggest_price',
        data: data,
        success: function (data) {
          $.LoadingOverlay('hide')
          if ((data.ack = 'Success' && data.itemCount > 0)) {
            if (data.itemCount == 1) {
              // if result is 1 than condition is changed so this check is neccessory
              $('#price-results').html('')
              var tr = ''
              $('#price-results').html(
                "<div class='col-sm-12'><div class='box '><div class='box-header'><i class='fa fa-usd'></i><h3 class='box-title'>Active Listing- Price Plus Shipping Lowest</h3><div class='box-tools pull-right'><button type='button' class='btn bg-teal btn-sm remove_sugs' onclick='remove_sugs' data-widget='remove'><i class='fa fa-times'></i></button></div></div><table width='25%' class='table table-bordered table-striped' border='1' id='price_table'> <th>Sr. No</th><th>Seller ID</th><th>Price</th><th>Condition</th><th>Shipping Type</th>"
              )
              //  for ( var i = 1; i < data.itemCount+1; i++ ) {

              var item = data['item']
              var price = item['basicInfo']['convertedCurrentPrice']
              var username = item['sellerInfo']['sellerUserName']
              if (username == 'dfwonline' || username == 'techbargains2015') {
                var tr_clr = 'style ="background-color: #7dff7d;"'
              } else {
                var tr_clr = ''
              }
              var item_url = item['basicInfo']['viewItemURL']
              var condition = item['basicInfo']['conditionDisplayName']
              var ship_type = item['shippingInfo']['shippingType']
              var trunc = ship_type.substr(0, 12)
              $('<tr ' + tr_clr + '>')
                .html(
                  '<td>' +
                    i +
                    "</td><td><a href='" +
                    item_url +
                    "' target = '_blank'>" +
                    username +
                    '</a></td><td>' +
                    price +
                    '</td><td>' +
                    condition +
                    '</td><td>' +
                    trunc +
                    '</td></tr></table></div></div>'
                )
                .appendTo('#price_table')
              // }
            }
            if (data.itemCount > 1) {
              $('#price-results').html('')
              var tr = ''
              $('#price-results').html(
                "<div class='col-sm-12'><div class='box '><div class='box-header'><i class='fa fa-usd'></i><h3 class='box-title'>Active Listing- Price Plus Shipping Lowest</h3><div class='box-tools pull-right'><button type='button' class='btn bg-teal btn-sm remove_sugs' onclick='remove_sugs' data-widget='remove'><i class='fa fa-times'></i></button></div></div><table width='25%' class='table table-bordered table-striped' border='1' id='price_table'> <th>Sr. No</th><th>Seller ID</th><th>Price</th><th>Condition</th><th>Shipping Type</th>"
              )
              if (data.item !== undefined) {
                for (var i = 1; i < data.item.length + 1; i++) {
                  var item = data['item'][i - 1]
                  var price = item['basicInfo']['convertedCurrentPrice']
                  var username = item['sellerInfo']['sellerUserName']
                  if (
                    username == 'dfwonline' ||
                    username == 'techbargains2015'
                  ) {
                    var tr_clr = 'style ="background-color: #7dff7d;"'
                  } else {
                    var tr_clr = ''
                  }
                  var item_url = item['basicInfo']['viewItemURL']
                  var condition = item['basicInfo']['conditionDisplayName']
                  var ship_type = item['shippingInfo']['shippingType']
                  var trunc = ship_type.substr(0, 12)
                  // return false;
                  $('<tr ' + tr_clr + '>')
                    .html(
                      '<td>' +
                        i +
                        "</td><td><a href='" +
                        item_url +
                        "' target = '_blank'>" +
                        username +
                        '</a></td><td>' +
                        price +
                        '</td><td>' +
                        condition +
                        '</td><td>' +
                        trunc +
                        '</td></tr></table></div></div>'
                    )
                    .appendTo('#price_table')
                }
              }
              // $("#price-results").html("</table></div></div>");
            }
          } else {
            $('#price-results').html('')
            // $( "#price-results" ).html("No Reecord found");
            $(
              "<div class='col-sm-12'><div class='box box-primary'><div class='box-header'><i class='fa fa-usd'></i><h3 class='box-title'>No Record Found.</h3><div class='box-tools pull-right'><button type='button' class='btn bg-teal btn-sm remove_sugs' data-widget='remove'><i class='fa fa-times'></i></button></div></div></div></div>"
            ).appendTo('#price-results')
          }
        },
        error: function (xhr, resp, text) {
          $.LoadingOverlay('hide')
          alert(xhr, resp, text)
          // show error to console
          // console.log(xhr,resp,text);
        }
      })
    }
  }

  searchActiveListing_verify = e => {
    let data
    if (e == 'upc') {
      console.log(this.state.upcNum)
      if (this.state.upcNum == null) {
        data = null
        toastr.warning('Warning', 'Warning!Please Enter The Null UPC')
      } else {
        data = {
          UPC: this.state.upcNum,
          TITLE: '',
          MPN: '',
          CATEGORY: '',
          CONDITION: this.state.selected
        }
      }
    } else if (e == 'mpn') {
      console.log(this.state.mpnName)
      if (this.state.mpnName == null) {
        data = null
        toastr.warning('Warning', 'Warning!Please Enter The Null MPN Name')
      } else {
        data = {
          UPC: '',
          TITLE: '',
          MPN: this.state.mpnName,
          CATEGORY: '',
          CONDITION: this.state.selected
        }
      }
    } else if (e == 'des') {
      if (this.state.mpnDesc == null) {
        data = null
        toastr.warning('Warning', 'Warning!Please Enter The Null MPN Desc')
      } else {
        data = {
          UPC: '',
          TITLE: this.state.mpnDesc,
          MPN: '',
          CATEGORY: '',
          CONDITION: this.state.selected
        }
      }
    }
    if (data !== null) {
      $.LoadingOverlay('show')

      $.ajax({
        type: 'POST',
        dataType: 'json',
        url:
          this.state.baseUrl +
          '/laptopzone/reactcontroller/c_haziqreact/search_active_listing',
        data: data,
        success: function (data) {
          $.LoadingOverlay('hide')
          if ((data.ack = 'Success' && data.itemCount > 0)) {
            if (data.itemCount == 1) {
              // if result is 1 than condition is changed so this check is neccessory
              $('#price-results').html('')
              var tr = ''
              $('#price-results').html(
                "<div class='col-sm-12'><div class='box '><div class='box-header'><i class='fa fa-usd'></i><h3 class='box-title'>Active Listing- Price Plus Shipping Lowest</h3><div class='box-tools pull-right'><button type='button' class='btn bg-teal btn-sm remove_sugs' onclick='remove_sugs' data-widget='remove'><i class='fa fa-times'></i></button></div></div><table width='25%' class='table table-bordered table-striped' border='1' id='price_table'> <th>Sr. No</th><th>Seller ID</th><th>Price</th><th>Condition</th><th>Shipping Type</th>"
              )
              //  for ( var i = 1; i < data.itemCount+1; i++ ) {

              var item = data['item']
              var price = item['basicInfo']['convertedCurrentPrice']
              var username = item['sellerInfo']['sellerUserName']
              if (username == 'dfwonline' || username == 'techbargains2015') {
                var tr_clr = 'style ="background-color: #7dff7d;"'
              } else {
                var tr_clr = ''
              }
              var item_url = item['basicInfo']['viewItemURL']
              var condition = item['basicInfo']['conditionDisplayName']
              var ship_type = item['shippingInfo']['shippingType']
              var trunc = ship_type.substr(0, 12)
              $('<tr ' + tr_clr + '>')
                .html(
                  '<td>' +
                    i +
                    "</td><td><a href='" +
                    item_url +
                    "' target = '_blank'>" +
                    username +
                    '</a></td><td>' +
                    price +
                    '</td><td>' +
                    condition +
                    '</td><td>' +
                    trunc +
                    '</td></tr></table></div></div>'
                )
                .appendTo('#price_table')
              // }
            }
            if (data.itemCount > 1) {
              $('#price-results').html('')
              var tr = ''
              $('#price-results').html(
                "<div class='col-sm-12'><div class='box '><div class='box-header'><i class='fa fa-usd'></i><h3 class='box-title'>Active Listing- Price Plus Shipping Lowest</h3><div class='box-tools pull-right'><button type='button' class='btn bg-teal btn-sm remove_sugs' onclick='remove_sugs' data-widget='remove'><i class='fa fa-times'></i></button></div></div><table width='25%' class='table table-bordered table-striped' border='1' id='price_table'> <th>Sr. No</th><th>Seller ID</th><th>Price</th><th>Condition</th><th>Shipping Type</th>"
              )
              if (data.item !== undefined) {
                for (var i = 1; i < data.item.length + 1; i++) {
                  var item = data['item'][i - 1]
                  var price = item['basicInfo']['convertedCurrentPrice']
                  var username = item['sellerInfo']['sellerUserName']
                  if (
                    username == 'dfwonline' ||
                    username == 'techbargains2015'
                  ) {
                    var tr_clr = 'style ="background-color: #7dff7d;"'
                  } else {
                    var tr_clr = ''
                  }
                  var item_url = item['basicInfo']['viewItemURL']
                  var condition = item['basicInfo']['conditionDisplayName']
                  var ship_type = item['shippingInfo']['shippingType']
                  var trunc = ship_type.substr(0, 12)
                  $('<tr ' + tr_clr + '>')
                    .html(
                      '<td>' +
                        i +
                        "</td><td><a href='" +
                        item_url +
                        "' target = '_blank'>" +
                        username +
                        '</a></td><td>' +
                        price +
                        '</td><td>' +
                        condition +
                        '</td><td>' +
                        trunc +
                        '</td></tr></table></div></div>'
                    )
                    .appendTo('#price_table')
                }
              }
              // $('#price-results').html('</table></div></div>')
            }
          } else {
            $('#price-results').html('')
            // $( "#price-results" ).html("No Reecord found");
            $(
              "<div class='col-sm-12'><div class='box box-primary'><div class='box-header'><i class='fa fa-usd'></i><h3 class='box-title'>No Record Found.</h3><div class='box-tools pull-right'><button type='button' class='btn bg-teal btn-sm remove_sugs' data-widget='remove'><i class='fa fa-times'></i></button></div></div></div></div>"
            ).appendTo('#price-results')
          }
        },
        error: function (xhr, resp, text) {
          $.LoadingOverlay('hide')
          alert(xhr, resp, text)
          // show error to console
          // console.log(xhr,resp,text);
        }
      })
    }
  }

  isPaneOpenFunc () {
    this.setState({
      isPaneOpen: true
    })

    $.LoadingOverlay('show')
    let data = {
      user_id: localStorage.getItem('userId'),
      filterData: this.state.filterData,
      startDate: dateFormat(this.state.startDate, 'yyyy-mm-dd'),
      endDate: dateFormat(this.state.endDate, 'yyyy-mm-dd')
      // date_range:
      //   this.state.date_range !== ''
      //     ? dateFormat(this.state.date_range, 'yyyy-mm-dd')
      //     : ''
    }
    console.log(data)
    var insertUrl =
      this.state.baseUrl +
      '/laptopzone/reactcontroller/c_react/load_identification_data '

    new Promise(function (resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: 'json',
        type: 'POST',
        data: data
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
          this.setState({
            isPaneOpen: true,
            images: result.images,
            identificData: result.idntiti_data
          })
          console.log(this.state.identificData)
          // this.setState({ isPaneOpen: true });
          // if (this.state.filterData !== 'All' && this.state.filterData !== '') {
          //   const data = result.idntiti_data.filter(
          //     item => item.DEKIT_ITEM == this.state.filterData
          //   )
          //   this.setState({
          //     isPaneOpen: true,
          //     images: result.images,
          //     identificData: data
          //   })
          // } else {
          //   this.setState({
          //     isPaneOpen: true,
          //     images: result.images,
          //     identificData: result.idntiti_data
          //   })
          // }
          // $('.react-bs-table-show-sel-only-btn').html('Show Selected')
          // $('.react-bs-table-show-sel-only-btn').removeClass('btn-primary')
          // $('.react-bs-table-show-sel-only-btn').addClass('btn-success btn-giveShowSelc')

          $('.react-bs-table-del-btn').html('Get Selected Items')
          // $('.react-bs-table-del-btn').removeClass('btn-warning')
          // $('.react-bs-table-del-btn').addClass('btn-warning btn-giveClass')
        } else {
          $('.react-bs-table-show-sel-only-btn').html('Show Selected')
          $('.react-bs-table-show-sel-only-btn').removeClass('btn-primary')
          $('.react-bs-table-show-sel-only-btn').addClass(
            'btn-warning btn-giveShowSelc'
          )

          $('.react-bs-table-del-btn').html('Get Selected')
          $('.react-bs-table-del-btn').removeClass('btn-warning')
          $('.react-bs-table-del-btn').addClass('btn-primary btn-giveClass')
          this.setState({
            identificData: result.idntiti_data
          })
        }
      })
      .catch(err => {
        $.LoadingOverlay('hide')
        console.log(err)
      })
  }
  componentDidUpdate (prevProps, prevState) {
    if (
      prevState.filterData !== this.state.filterData &&
      this.state.filterData !== ''
    ) {
      this.isPaneOpenFunc()
    }
    if (
      (prevState.startDate !== this.state.startDate &&
        this.state.startDate !== '') ||
      (prevState.endDate !== this.state.endDate && this.state.endDate !== '')
    ) {
      this.isPaneOpenFunc()
    }
    // if (prevState.endDate !== this.state.endDate && this.state.endDate !== '') {
    //   this.isPaneOpenFunc()
    // }
  }
  escapeRegexCharacters (str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }

  getSuggestions (value) {
    var users = this.state.users
    const escapedValue = this.escapeRegexCharacters(value.trim())
    const regex = new RegExp('^' + escapedValue, 'i')

    return users.filter(
      user => regex.test(user.NICKNAME) || regex.test(user.EMAIL)
    )
  }

  getSuggestionNickname (suggestion) {
    return suggestion.NICKNAME
  }

  getSuggestionEmail (suggestion) {
    return suggestion.EMAIL
  }

  renderSuggestion (suggestion) {
    return (
      <span>
        {suggestion.NICKNAME} - {suggestion.EMAIL}
      </span>
    )
  }

  onNicknameChange = (event, { newValue }) => {
    this.setState({
      nicknameValue: newValue
    })
  }

  onEmailChange = (event, { newValue }) => {
    this.setState({
      emailValue: newValue
    })
  }

  onNicknameSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      nicknameSuggestions: this.getSuggestions(value)
    })
  }

  onNicknameSuggestionsClearRequested = () => {
    this.setState({
      nicknameSuggestions: []
    })
  }

  onNicknameSuggestionSelected = (event, { suggestion }) => {
    this.setState({
      emailValue: suggestion.EMAIL
    })
  }

  onEmailSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      emailSuggestions: this.getSuggestions(value)
    })
  }

  onEmailSuggestionsClearRequested = () => {
    this.setState({
      emailSuggestions: []
    })
  }

  onEmailSuggestionSelected = (event, { suggestion }) => {
    this.setState({
      nicknameValue: suggestion.NICKNAME
    })
  }
  ///

  handleInput (e) {
    const name = e.target.name

    this.setState({ [name]: e.target.value })

    $('.serchBar').keydown(function (event) {
      if (event.keyCode == 13) {
        $('#clickSerch').click()
        return false
      }
    })
  }

  discardItem () {
    $.LoadingOverlay('show')

    var selectBars = this.state.selectBars

    if (selectBars.length > 1) {
      var getBars = selectBars
    } else {
      var getBars = []
      getBars.push(this.state.serchBar)
    }

    // console.log('CLICKED');
    var barcodeNo = getBars // this.state.barcodeNo
    var itemType = this.state.itemType
    var idArray = []
    idArray.push(this.state.idS)

    var upcNum = this.state.upcNum
    var mpnName = this.state.mpnName

    var objName = this.state.nicknameValue
    var catId = this.state.emailValue

    var brandName = this.state.brandName
    var mpnDesc = this.state.mpnDesc
    var remarks = this.state.remarks
    var avgSold = this.state.avgSold
    var condRadio = this.state.selected

    // console.log(objName);
    // if( upcNum == null || upcNum == '' ){
    // $('#upcNum').focus();
    // alert('Enter Upc');
    // return false;
    // }

    // if (mpnName == null || mpnName == '') {
    //   $('#mpnName').focus()
    //   alert('Enter mpn')
    //   return false
    // }
    // if (objName == null || objName == '') {
    //   $('#objName').focus()
    //   alert('Select Object')
    //   return false
    // }
    // if (catId == null || catId == '') {
    //   $('#catId').focus()
    //   alert('Enter Category id')
    //   return false
    // }
    // if (brandName == null || brandName == '') {
    //   $('#brandName').focus()
    //   alert('Enter Brand Name ')
    //   return false
    // }
    // if (mpnDesc == null || mpnDesc == '') {
    //   $('#mpnDesc').focus()
    //   alert('Enter Mpn Desc Name ')
    //   return false
    // }
    // if (condRadio == null || condRadio == '') {
    //   $('#condRadio').focus()
    //   alert('Select Condiotion ')
    //   return false
    // }

    // alert('yahooo');
    // return false;

    $.ajax({
      url:
        this.state.baseUrl + '/laptopzone/reactcontroller/c_react/itemDiscard',
      dataType: 'json',
      type: 'POST',
      data: {
        barcodeNo: barcodeNo,
        itemType: itemType,
        idArray: idArray,
        upcNum: upcNum,
        mpnName: mpnName,
        objName: objName,
        catId: catId,
        brandName: brandName,
        mpnDesc: mpnDesc,
        remarks: remarks,
        avgSold: avgSold,
        condRadio: condRadio,
        userId: localStorage.getItem('userId')
      },
      success: function (data) {
        $.LoadingOverlay('hide')
        if (data == true) {
          $.LoadingOverlay('hide')
          alert('item is discarded !')
          return false
        } else if (data == false) {
          $.LoadingOverlay('hide')
          alert('Error !')
          return false
        }
      },
      error: function (xhr, resp, text) {
        // show error to console
        // console.log(xhr,resp,text);
      }
    })
  }
  handleForm (e) {
    e.preventDefault()

    var selectBars = this.state.selectBars

    if (selectBars.length > 1) {
      var getBars = selectBars
    } else {
      var getBars = []
      getBars.push(this.state.serchBar)
    }

    // console.log(getBars);

    // console.log('CLICKED');
    var barcodeNo = getBars // this.state.barcodeNo
    var itemType = this.state.itemType
    var idArray = []
    idArray.push(this.state.idS)

    var upcNum = this.state.upcNum
    var mpnName = this.state.mpnName

    var objName = this.state.nicknameValue
    var catId = this.state.emailValue

    var brandName = this.state.brandName
    var mpnDesc = this.state.mpnDesc
    var remarks = this.state.remarks
    var avgSold = this.state.avgSold
    var condRadio = this.state.selected

    // console.log(objName);
    // if (upcNum == null || upcNum == '') {
    //   $('#upcNum').focus()
    //   alert('Enter Upc')
    //   return false
    // }

    if (mpnName == null || mpnName == '') {
      $('#mpnName').focus()
      alert('Enter mpn')
      return false
    }
    if (objName == null || objName == '') {
      $('#objName').focus()
      alert('Select Object')
      return false
    }
    if (catId == null || catId == '') {
      $('#catId').focus()
      alert('Enter Category id')
      return false
    }
    if (brandName == null || brandName == '') {
      $('#brandName').focus()
      alert('Enter Brand Name ')
      return false
    }
    if (mpnDesc == null || mpnDesc == '') {
      $('#mpnDesc').focus()
      alert('Enter Mpn Desc Name ')
      return false
    }
    if (condRadio == null || condRadio == '') {
      $('#condRadio').focus()
      alert('Select Condiotion ')
      return false
    }
    // return false;
    //  console.log(this.state.nicknameValue);
    // console.log(this.state.emailValue);

    // return false;

    $.ajax({
      url:
        this.state.baseUrl + '/laptopzone/reactcontroller/c_react/verify_item',
      dataType: 'json',
      type: 'POST',
      data: {
        barcodeNo: barcodeNo,
        itemType: itemType,
        idArray: idArray,
        upcNum: upcNum,
        mpnName: mpnName,
        objName: objName,
        catId: catId,
        brandName: brandName,
        mpnDesc: mpnDesc,
        remarks: remarks,
        avgSold: avgSold,
        condRadio: condRadio,
        userId: localStorage.getItem('userId')
      },
      success: function (data) {
        if (data.exist == true) {
          this.setState({
            showSeed: 'show',
            buttonCheck: 'show'
          })
        } else if (data.exist == false) {
          this.setState({
            showSeed: 'hide',
            buttonCheck: 'hide'
          })
        }
      }.bind(this),
      error: function (xhr, resp, text) {
        // show error to console
        // console.log(xhr,resp,text);
      }
    })
  }

  customConfirm (next, dropRowKeys) {
    const dropRowKeysStr = dropRowKeys.join(',')
    // console.log(next);
    // console.log(dropRowKeys);
    // console.log(dropRowKeysStr);
    // /console.log(next + " : " + dropRowKeys + " : " + dropRowKeysStr);
    var ids = dropRowKeysStr.split(',')
    that.setState({ serchBar: ids[0] })
    that.setState({ selectBars: ids })
    // console.log(ids[0]);

    // / console.log(ids);
    // return false;
    // this.setState({ serchBar: cell })

    that.setState({
      showVerifyInfo: 'hide',
      showSeed: 'hide',
      showSelected: 'show'
    })
    $.LoadingOverlay('show')

    $.ajax({
      url:
        that.state.baseUrl +
        '/laptopzone/reactcontroller/c_react/get_obj_drop_sugestion',
      dataType: 'json',
      type: 'POST',
      data: {},
      success: function (data) {
        $.LoadingOverlay('hide')
        that.setState({
          isLoaded: true,
          users: data
        })
        // console.log(this.state.users);
      },
      error: function (xhr, resp, text) {
        // show error to console
        // console.log(xhr,resp,text);
      }
    })

    fetch(
      that.state.baseUrl +
        '/laptopzone/reactcontroller/c_react/get_verify_item/' +
        ids[0]
    )
      .then(res => res.json())
      .then(
        result => {
          $.LoadingOverlay('hide')

          if (result['get_items'][0].OBJECT_NAME == null) {
            var objt = ''
          } else {
            var objt = result['get_items'][0].OBJECT_NAME
          }
          if (result['get_items'][0].CATEGORY_ID == null) {
            var catgry = ''
          } else {
            var catgry = result['get_items'][0].CATEGORY_ID
          }

          if (result.seed_avail == true) {
            $.LoadingOverlay('hide')
            // his.setState({ isPaneOpen: false });

            that.setState({
              barcodeNo: result['get_items'][0].BARCODE_PRV_NO,
              isPaneOpen: false,
              itemType: result['get_items'][0].BAROCDE_TYPE,
              idS: result['get_items'][0].LZ_DEKIT_US_DT_ID,
              upcNum: result['get_items'][0].UPC,
              mpnName: result['get_items'][0].MPN,
              nicknameValue: objt, // result['get_items'][0].OBJECT_NAME,
              emailValue: catgry, // result['get_items'][0].CATEGORY_ID,
              brandName: result['get_items'][0].BRAND,
              mpnDesc: result['get_items'][0].MPN_DESC,
              remarks: result['get_items'][0].REMARKS,
              // catId :result['get_items'][0].CATEGORY_ID,
              avgSold: result['get_items'][0].AVG_PRIC,
              selected: result['get_items'][0].ID,
              availCond: result.get_cond,
              showVerifyInfo: 'show',
              showSeed: 'hide',
              CondCheck: true,
              buttonCheck: 'show'
            })
          } else {
            $.LoadingOverlay('hide')
            that.setState({
              barcodeNo: result['get_items'][0].BARCODE_PRV_NO,
              isPaneOpen: false,
              itemType: result['get_items'][0].BAROCDE_TYPE,
              idS: result['get_items'][0].LZ_DEKIT_US_DT_ID,
              upcNum: result['get_items'][0].UPC,
              mpnName: result['get_items'][0].MPN,
              nicknameValue: objt, // result['get_items'][0].OBJECT_NAME,
              emailValue: catgry, // result['get_items'][0].CATEGORY_ID,
              brandName: result['get_items'][0].BRAND,
              mpnDesc: result['get_items'][0].MPN_DESC,
              remarks: result['get_items'][0].REMARKS,
              // catId :result['get_items'][0].CATEGORY_ID,
              avgSold: result['get_items'][0].AVG_PRIC,
              selected: result['get_items'][0].ID,
              availCond: result.get_cond,
              showVerifyInfo: 'show',
              showSeed: 'hide',
              CondCheck: true,
              buttonCheck: 'hide'
            })
          }
          if (result.run_master_bar_query) {
            $.LoadingOverlay('hide')
            that.setState({
              isPaneOpen: false,
              showMasterInfo: 'show',
              showVerifyInfo: 'show',
              showSeed: 'hide',
              mastBarc: result['run_master_bar_query'][0].BARCODE_NO,
              mastDesc: result['run_master_bar_query'][0].ITEM_DESC,
              mastCond: result['run_master_bar_query'][0].COND_NAME,
              mastBrand: result['run_master_bar_query'][0].ITEM_MT_MANUFACTURE,
              mastMpn: result['run_master_bar_query'][0].ITEM_MT_MFG_PART_NO
            })
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          that.setState({
            isLoaded: true,
            error
          })
        }
      )
  }

  serchtest (e) {
    var index = e
    var t = document.getElementById('example2')
    var cat_id = $(t.rows[index].cells[0]).text()
    var get_title = $(t.rows[index].cells[1]).text()
    var get_mpn = $(t.rows[index].cells[2]).text()
    var get_upc = $(t.rows[index].cells[3]).text()
    var get_obj = $(t.rows[index].cells[4]).text()
    var get_brand = $(t.rows[index].cells[5]).text()
    var get_cond = $(t.rows[index].cells[6]).text()

    // nicknameValue: '',
    //   nicknameSuggestions: [],
    //   emailValue: '',

    this.setState({
      emailValue: cat_id,
      nicknameValue: get_obj,
      mpnDesc: get_title,

      mpnName: get_mpn,
      upcNum: get_upc,
      brandName: get_brand,
      selected: get_cond
    })

    // console.log(cat_id);
  }
  serchMpn (e) {
    // e.preventDefault();
    // console.log(e);
    if (e == 'up1') {
      var makeUrl =
        this.state.baseUrl + '/laptopzone/reactcontroller/c_react/get_upc_title'
      var passVal = this.state.upcNum
      this.setState({
        boxHeader: 'Upc'
      })
    } else if (e == 'mp1') {
      var makeUrl =
        this.state.baseUrl + '/laptopzone/reactcontroller/c_react/serch_mpn_sys'
      var passVal = this.state.mpnName
      this.setState({
        boxHeader: 'Mpn'
      })
    } else if (e == 'desc1') {
      var makeUrl =
        this.state.baseUrl +
        '/laptopzone/reactcontroller/c_react/serch_desc_sys'
      var passVal = this.state.mpnDesc
      this.setState({
        boxHeader: 'Description'
      })
    }
    this.setState({
      MpnTitleCheck: false
    })

    // console.log(passVal);
    $.ajax({
      url: makeUrl,
      dataType: 'json',
      type: 'POST',
      data: { passVal: passVal },
      success: function (data) {
        if (data.exist == true) {
          // console.log('mpn');
          this.setState({
            mpnTitle: data.desc_quer,
            MpnTitleCheck: true
          })
        } else {
          this.setState({
            MpnTitleCheck: false
          })
        }

        // this.setState({successUpdate: response['message']});
      }.bind(this),
      error: function (xhr, resp, text) {
        // show error to console
        // console.log(xhr,resp,text);
      }
    })
  }

  serchCond () {
    var makeUrl =
      this.state.baseUrl + '/laptopzone/reactcontroller/c_react/get_avail_cond'
    $.ajax({
      url: makeUrl,
      dataType: 'json',
      type: 'POST',
      data: { catId: this.state.catId },
      success: function (data) {
        if (data.exist == true) {
          this.setState({
            availCond: data.get_cond,
            CondCheck: true
          })
        } else {
          this.setState({
            availCond: data.get_cond,
            CondCheck: true
          })
        }

        // this.setState({successUpdate: response['message']});
      }.bind(this),
      error: function (xhr, resp, text) {
        // show error to console
        // console.log(xhr,resp,text);
      }
    })
  }

  closePane () {
    this.setState({
      MpnTitleCheck: false,
      date_range: '',
      filterData: ''
    })
  }

  showSeed () {
    this.setState({
      showSeed: 'show'
    })
  }

  CellFormatter = (cell, row) => {
    return (
      <React.Fragment>
        <Button
          title='Detail'
          className='btn btn-primary'
          size='sm'
          onClick={() => this.onClickEdit(cell, row)}
        >
          <span className='glyphicon glyphicon-list p-b-5' aria-hidden='true' />
        </Button>
      </React.Fragment>
    )
  }

  onClickEdit = (cell, row) => {
    this.setState({ serchBar: cell })

    // console.log(cell);
    // console.log(row);
    // return false;

    // alert(this.state.serchBar);
    // return false;

    this.setState({
      showVerifyInfo: 'hide',
      showSeed: 'hide',
      selectBars: '',
      showSelected: 'hide'
    })
    $.LoadingOverlay('show')

    $.ajax({
      url:
        this.state.baseUrl +
        '/laptopzone/reactcontroller/c_react/get_obj_drop_sugestion',
      dataType: 'json',
      type: 'POST',
      data: {},
      success: function (data) {
        $.LoadingOverlay('hide')
        this.setState({
          isLoaded: true,
          users: data
        })
        // console.log(this.state.users);
      }.bind(this),
      error: function (xhr, resp, text) {
        // show error to console
        // console.log(xhr,resp,text);
      }
    })

    fetch(
      this.state.baseUrl +
        '/laptopzone/reactcontroller/c_react/get_verify_item/' +
        cell
    )
      .then(res => res.json())
      .then(
        result => {
          $.LoadingOverlay('hide')

          if (result['get_items'][0].OBJECT_NAME == null) {
            var objt = ''
          } else {
            var objt = result['get_items'][0].OBJECT_NAME
          }
          if (result['get_items'][0].CATEGORY_ID == null) {
            var catgry = ''
          } else {
            var catgry = result['get_items'][0].CATEGORY_ID
          }

          if (result.seed_avail == true) {
            $.LoadingOverlay('hide')
            // his.setState({ isPaneOpen: false });

            this.setState({
              barcodeNo: result['get_items'][0].BARCODE_PRV_NO,
              isPaneOpen: false,
              itemType: result['get_items'][0].BAROCDE_TYPE,
              idS: result['get_items'][0].LZ_DEKIT_US_DT_ID,
              upcNum: result['get_items'][0].UPC,
              mpnName: result['get_items'][0].MPN,
              nicknameValue: objt, // result['get_items'][0].OBJECT_NAME,
              emailValue: catgry, // result['get_items'][0].CATEGORY_ID,
              brandName: result['get_items'][0].BRAND,
              mpnDesc: result['get_items'][0].MPN_DESC,
              remarks: result['get_items'][0].REMARKS,
              // catId :result['get_items'][0].CATEGORY_ID,
              avgSold: result['get_items'][0].AVG_PRIC,
              selected: result['get_items'][0].ID,
              availCond: result.get_cond,
              showVerifyInfo: 'show',
              showSeed: 'hide',
              CondCheck: true,
              buttonCheck: 'show'
            })
          } else {
            $.LoadingOverlay('hide')
            this.setState({
              barcodeNo: result['get_items'][0].BARCODE_PRV_NO,
              isPaneOpen: false,
              itemType: result['get_items'][0].BAROCDE_TYPE,
              idS: result['get_items'][0].LZ_DEKIT_US_DT_ID,
              upcNum: result['get_items'][0].UPC,
              mpnName: result['get_items'][0].MPN,
              nicknameValue: objt, // result['get_items'][0].OBJECT_NAME,
              emailValue: catgry, // result['get_items'][0].CATEGORY_ID,
              brandName: result['get_items'][0].BRAND,
              mpnDesc: result['get_items'][0].MPN_DESC,
              remarks: result['get_items'][0].REMARKS,
              // catId :result['get_items'][0].CATEGORY_ID,
              avgSold: result['get_items'][0].AVG_PRIC,
              selected: result['get_items'][0].ID,
              availCond: result.get_cond,
              showVerifyInfo: 'show',
              showSeed: 'hide',
              CondCheck: true,
              buttonCheck: 'hide'
            })
          }
          if (result.run_master_bar_query) {
            $.LoadingOverlay('hide')
            this.setState({
              isPaneOpen: false,
              showMasterInfo: 'show',
              showVerifyInfo: 'show',
              showSeed: 'hide',
              mastBarc: result['run_master_bar_query'][0].BARCODE_NO,
              mastDesc: result['run_master_bar_query'][0].ITEM_DESC,
              mastCond: result['run_master_bar_query'][0].COND_NAME,
              mastBrand: result['run_master_bar_query'][0].ITEM_MT_MANUFACTURE,
              mastMpn: result['run_master_bar_query'][0].ITEM_MT_MFG_PART_NO
            })
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
  }

  render () {
    let start = dateFormat(this.state.startDate, 'yyyy-mm-dd')
    let end = dateFormat(this.state.endDate, 'yyyy-mm-dd')
    let label = start + ' - ' + end
    if (start === end) {
      label = start
    }

    let buttonStyle = { width: '100%' }
    // console.log(dateFormat(this.state.startDate, 'yyyy-mm-dd'))
    // console.log(dateFormat(this.state.endDate, 'yyyy-mm-dd'))
    var that = this
    const { error, isLoaded, objects } = this.state
    var coChk = 1750
    var checked = 'checked'

    const {
      nicknameValue,
      nicknameSuggestions,
      emailValue,
      emailSuggestions
    } = this.state
    const nicknameInputProps = {
      placeholder: 'Object Name',
      value: nicknameValue,
      onChange: this.onNicknameChange
    }
    const emailInputProps = {
      placeholder: 'Category Id',
      value: emailValue,
      onChange: this.onEmailChange
    }
    const selectRowProp = {
      mode: 'checkbox',
      clickToSelect: true,
      selected: [], // default select on table
      bgColor: 'rgb(163,202,226)',

      onSelectAll: this.onSelectAll,
      showOnlySelected: true
    }

    const options = {
      paginationShowsTotal: true,
      page: 1,
      sizePerPage: 25,
      pageStartIndex: 1,
      paginationSize: 5,
      prePage: 'Prev',
      nextPage: 'Next',
      firstPage: 'First',
      lastPage: 'Last',
      prePageTitle: 'Go to previous',
      nextPageTitle: 'Go to next',
      firstPageTitle: 'Go to first',
      lastPageTitle: 'Go to Last',
      paginationPosition: 'top',
      handleConfirmDeleteRow: this.customConfirm
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
            <li className='active'>Verify Item</li>
          </ol>
        </section>
      )
    } else {
      var ObjetVal = this.state.objects.map(function (obj) {
        return (
          <option key={obj.OBJECT_ID} value={obj.OBJECT_ID}>
            {obj.OBJECT_NAME}
          </option>
        )
      })

      var hellCodn = this.state.availCond.map(function (co, index) {
        return (
          <React.Fragment key={index}>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type='radio'
              id='condRadio'
              name='condRadio'
              value={co.CONDITION_ID}
              checked={that.state.selected == co.CONDITION_ID}
              onChange={e => that.setState({ selected: e.target.value })}
            />
            <span>{co.COND_NAME}</span>
          </React.Fragment>
        )
      })

      return (
        <React.Fragment>
          <section className='content-header'>
            <h1>
              Search
              <small>Item</small>
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
              <li className='active'>Verify Item</li>
            </ol>
          </section>
          <section className='content'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='box'>
                  <div className='box-header' />

                  <div className='box-body'>
                    <div className='col-md-8'>
                      <label>Search Barcode</label>
                      <input
                        type='text'
                        className='form-control serchBar'
                        name='serchBar'
                        value={this.state.serchBar}
                        onChange={this.handleInput}
                        placeholder='Search Barcode'
                      />
                    </div>

                    <div className='col-md-2'>
                      <input
                        type='button'
                        id='clickSerch'
                        className='btn btn-primary clickSerch '
                        style={{ width: '75%', marginTop: '23px' }}
                        value='Search'
                        onClick={this.serchForVerifyy}
                      />
                    </div>

                    <div className='col-md-2'>
                      <input
                        type='button'
                        id='myAssigned'
                        className='btn btn-warning   '
                        style={{ width: '75%', marginTop: '23px' }}
                        value='My Assigned Items'
                        onClick={() => {
                          this.isPaneOpenFunc()
                        }}
                      />
                    </div>
                    {this.state.showSelected == 'show' ? (
                      <div className='row'>
                        <div className='col-md-12'>
                          <div className='col-md-12'>
                            <label>Selected Barcodes</label>
                            <input
                              type='text'
                              className='form-control selectBars'
                              name='selectBars'
                              value={this.state.selectBars}
                              onChange={this.handleInput}
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div ref={ref => (this.el = ref)}>
              {/* <div style={{ marginTop: '32px' }}>
                <button onClick={ () => this.setState({ isPaneOpenLeft: true }) }>
                    Click me to open left pane with 20% width!
                </button>
            </div> */}
              <SlidingPane
                className='some-custom-class'
                overlayClassName='some-custom-overlay-class'
                isOpen={this.state.isPaneOpen}
                title='Items Identification.'
                subtitle='Optional subtitle.'
                onRequestClose={() => {
                  // triggered on "<" on left top click or on outside click
                  this.setState({ isPaneOpen: false })
                }}
              >
                <div className='row '>
                  <div className='col-sm-12'>
                    <div className='box'>
                      <div className='row'>
                        <div className='col-xs-12'>
                          {/* <div className='col-sm-3'>
                            <div className='input-group'>
                              <label
                                htmlFor='Search Barcode'
                                className='control-label'
                              >
                                Date Filter:
                              </label>
                              {/* <DatetimeRangePicker
                                // timePicker
                                // timePicker24Hour
                                // showDropdowns
                                // timePickerSeconds
                                // locale={locale}
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                // onApply={this.handleApply}
                              /> */}
                          {/* <div
                                id='reportrange'
                                style={{background: '#fff', cursor: 'pointer', padding: '5px 10px', border: '1px solid #ccc', width: '100%'}}
                              >
                                <i class='fa fa-calendar' />&nbsp;
                                <span /> <i class='fa fa-caret-down' />
                              </div> */}
                          {/* <Flatpickr
                                options={{
                                  // mode: 'range',
                                  dateFormat: 'Y-m-d'
                                  // defaultDate: ['2019-07-10', '2019-07-20']
                                }}
                                className='flatpickr-input active form-control'
                                value={this.state.date_range}
                                onChange={date_range => {
                                  this.setState({ date_range })
                                }}
                              /> *
                              <div
                                className='input-group-btn'
                                style={{ display: 'block' }}
                              >
                                <button
                                  className='btn btn-info '
                                  id='Click To Clean Date'
                                  type='button'
                                  onClick={() => this.removeDate()}
                                  disabled={!this.state.date_range}
                                >
                                  <i className='glyphicon glyphicon-remove' />
                                </button>
                              </div>
                            </div>
                          </div> */}
                          <div
                            className='col-sm-9'
                            style={{ marginTop: '32px' }}
                          >
                            <label
                              className='radio-inline'
                              style={{ display: 'inline' }}
                            >
                              <input
                                type='radio'
                                name='filterData'
                                value='Lot'
                                checked={this.state.filterData == 'Lot'}
                                onChange={e =>
                                  this.setState({ filterData: e.target.value })
                                }
                              />
                              Special Lot
                            </label>

                            <label
                              className='radio-inline'
                              style={{ display: 'inline' }}
                            >
                              <input
                                type='radio'
                                name='filterData'
                                value='Dekit'
                                checked={this.state.filterData == 'Dekit'}
                                onChange={e =>
                                  this.setState({ filterData: e.target.value })
                                }
                              />
                              Dekit Items
                            </label>

                            <label
                              className='radio-inline'
                              style={{ display: 'inline' }}
                            >
                              <input
                                type='radio'
                                name='filterData'
                                value='All'
                                checked={this.state.filterData == 'All'}
                                onChange={e =>
                                  this.setState({ filterData: e.target.value })
                                }
                              />
                              Dekit & Special Lot
                            </label>

                            <label
                              className='radio-inline'
                              style={{ display: 'inline' }}
                            >
                              <input
                                type='radio'
                                name='filterData'
                                value='Not Listed'
                                checked={this.state.filterData == 'Not Listed'}
                                onChange={e =>
                                  this.setState({ filterData: e.target.value })
                                }
                              />
                              Not Listed
                            </label>

                            <label
                              className='radio-inline'
                              style={{ display: 'inline' }}
                            >
                              <input
                                type='radio'
                                name='filterData'
                                value='Discarded'
                                checked={this.state.filterData == 'Discarded'}
                                onChange={e =>
                                  this.setState({ filterData: e.target.value })
                                }
                              />
                              Discarded
                            </label>
                          </div>
                          <div className='col-sm-3'>
                            <div className='form-group'>
                              <label className='control-label'>
                                Date Ranges
                              </label>
                              <DatetimeRangePicker
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                ranges={this.state.ranges}
                                onEvent={this.handleEvent}
                              >
                                <Button
                                  className='selected-date-range-btn btn-danger'
                                  style={buttonStyle}
                                >
                                  <div className='pull-left'>
                                    <i className='fa fa-calendar' />
                                    &nbsp;
                                    <span>{label}</span>
                                  </div>
                                  <div className='pull-right'>
                                    <i className='fa fa-angle-down' />
                                  </div>
                                </Button>
                              </DatetimeRangePicker>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-xs-12'>
                          <BootstrapTable
                            data={this.state.identificData}
                            options={options}
                            columnWidth='100%'
                            deleteRow={this.state.filterData == 'Dekit'}
                            selectRow={
                              this.state.filterData == 'Dekit'
                                ? selectRowProp
                                : false
                            }
                            striped
                            search
                            hover
                            pagination
                          >
                            <TableHeaderColumn
                              dataField='BARCODE_PRV_NO'
                              dataFormat={this.CellFormatter}
                              headerAlign='center'
                              dataAlign='center'
                              width='3%'
                              isKey
                            >
                              Action
                            </TableHeaderColumn>

                            <TableHeaderColumn
                              dataField='BARCODE_PRV_NO'
                              dataFormat={imageView}
                              headerAlign='center'
                              dataAlign='center'
                              width='10%'
                            >
                              Picture
                            </TableHeaderColumn>

                            <TableHeaderColumn
                              dataField='PK_ID'
                              headerAlign='center'
                              dataAlign='center'
                              width='100px'
                              hidden
                            >
                              det_id
                            </TableHeaderColumn>

                            <TableHeaderColumn
                              dataField='BARCODE_PRV_NO'
                              headerAlign='center'
                              dataAlign='center'
                              width='10%'
                            >
                              Barcode No
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
                              dataField='MPN_DESCRIPTION'
                              headerAlign='center'
                              dataAlign='center'
                              width='10%'
                            >
                              Mpn Description
                            </TableHeaderColumn>

                            <TableHeaderColumn
                              dataField='MPN'
                              headerAlign='center'
                              dataAlign='center'
                              width='10%'
                            >
                              Mpn
                            </TableHeaderColumn>

                            <TableHeaderColumn
                              dataField='UPC'
                              headerAlign='center'
                              dataAlign='center'
                              width='10%'
                            >
                              UPC
                            </TableHeaderColumn>

                            <TableHeaderColumn
                              dataField='BRAND'
                              headerAlign='center'
                              dataAlign='center'
                              width='10%'
                            >
                              Brand
                            </TableHeaderColumn>

                            <TableHeaderColumn
                              dataField='DEKIT_ITEM'
                              headerAlign='center'
                              dataAlign='center'
                              width='5%'
                            >
                              Item Type
                            </TableHeaderColumn>

                            <TableHeaderColumn
                              dataField='MAS_BAR'
                              headerAlign='center'
                              dataAlign='center'
                              width='10%'
                            >
                              Master Barcode
                            </TableHeaderColumn>

                            <TableHeaderColumn
                              dataField='MAST_MPN_DESC'
                              headerAlign='center'
                              dataAlign='center'
                              width='10%'
                            >
                              Master Description
                            </TableHeaderColumn>

                            <TableHeaderColumn
                              dataField='REMARKS'
                              headerAlign='center'
                              dataAlign='center'
                              width='10%'
                            >
                              Remarks
                            </TableHeaderColumn>
                          </BootstrapTable>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
              </SlidingPane>
            </div>

            {this.state.showVerifyInfo == 'show' ? (
              <React.Fragment>
                <div className='row'>
                  <div className='col-xs-12'>
                    <div className='box box-danger'>
                      {/* <div className="box-header with-border">
                      <h3 className="box-title">Different Width</h3>
                    </div> */}

                      <div className='box-body'>
                        <form onSubmit={this.handleForm}>
                          {this.state.showMasterInfo == 'show' ? (
                            <div className='row'>
                              <div className='col-xs-2'>
                                <label>Master Barcode</label>
                                <input
                                  type='text'
                                  className='form-control'
                                  name='mastBarc'
                                  value={this.state.mastBarc}
                                  disabled
                                />
                              </div>
                              <div className='col-xs-4'>
                                <label>Master Description</label>
                                <input
                                  type='text'
                                  className='form-control'
                                  name='mastDesc'
                                  value={this.state.mastDesc}
                                  disabled
                                />
                              </div>
                              <div className='col-xs-2'>
                                <label>Master Condition</label>
                                <input
                                  type='text'
                                  className='form-control'
                                  name='mastCond'
                                  value={this.state.mastCond}
                                  disabled
                                />
                              </div>
                              <div className='col-xs-2'>
                                <label>Master Brand</label>
                                <input
                                  type='text'
                                  className='form-control'
                                  name='mastBrand'
                                  value={this.state.mastBrand}
                                  disabled
                                />
                              </div>
                              <div className='col-xs-2'>
                                <label>Master Mpn</label>
                                <input
                                  type='text'
                                  className='form-control'
                                  name='mastMpn'
                                  value={this.state.mastMpn}
                                  disabled
                                />
                              </div>
                            </div>
                          ) : null}

                          <div className='row'>
                            <div className='col-xs-2'>
                              <label>Item Type</label>
                              <input
                                type='text'
                                className='form-control'
                                name='itemType'
                                value={this.state.itemType}
                                onChange={this.handleInput}
                                disabled
                              />
                              <input
                                type='hidden'
                                className='form-control'
                                name='idS'
                                value={this.state.idS}
                                onChange={this.handleInput}
                                disabled
                              />
                            </div>
                            <div className='col-xs-2'>
                              <label>Barcode</label>
                              <input
                                type='number'
                                className='form-control'
                                name='barcodeNo'
                                disabled
                                value={this.state.barcodeNo}
                                onChange={this.handleInput}
                              />
                            </div>
                            <div className='col-xs-2'>
                              <label>Upc</label>
                              <div className='input-group input-group-md'>
                                <input
                                  type='text'
                                  className='form-control'
                                  id='upcNum'
                                  name='upcNum'
                                  value={this.state.upcNum}
                                  onChange={this.handleInput}
                                />
                                <div className='input-group-btn'>
                                  <button
                                    className='btn btn-info '
                                    title='Search on Ebay'
                                    type='button'
                                    onClick={() => {
                                      this.serchMpn('up1')
                                    }}
                                  >
                                    <i className='glyphicon glyphicon-search' />
                                  </button>
                                </div>
                              </div>
                              <span id='price_error_verify' />
                              <a
                                onClick={() =>
                                  this.seed_suggest_price_verify('upc')
                                }
                                className='crsr-pntr seed_suggest_price_verify'
                                title='Click here for Price suggestion'
                              >
                                Suggest Price
                              </a>
                              &nbsp;&nbsp;
                              <a
                                onClick={() =>
                                  this.searchActiveListing_verify('upc')
                                }
                                className='crsr-pntr searchActiveListing_verify'
                                title='Click here for Check Active Listing'
                              >
                                Check Active Listing
                              </a>
                            </div>
                            <div className='col-xs-2'>
                              <label>Mpn</label>
                              <div className='input-group input-group-md'>
                                <input
                                  type='text'
                                  className='form-control'
                                  id='mpnName'
                                  name='mpnName'
                                  value={this.state.mpnName}
                                  onChange={this.handleInput}
                                />
                                <span id='price_error_verify' />
                                <a
                                  onClick={() =>
                                    this.seed_suggest_price_verify('mpn')
                                  }
                                  className='crsr-pntr seed_suggest_price_verify'
                                  title='Click here for Price suggestion'
                                >
                                  Suggest Price
                                </a>
                                &nbsp;&nbsp;
                                <a
                                  onClick={() =>
                                    this.searchActiveListing_verify('mpn')
                                  }
                                  className='crsr-pntr searchActiveListing_verify'
                                  title='Click here for Check Active Listing'
                                >
                                  Check Active Listing
                                </a>
                                <div className='input-group-btn'>
                                  <button
                                    className='btn btn-info '
                                    title='Search on Ebay'
                                    type='button'
                                    onClick={() => {
                                      this.serchMpn('mp1')
                                    }}
                                  >
                                    <i className='glyphicon glyphicon-search' />
                                  </button>
                                </div>
                              </div>
                            </div>
                            {/* <div className="col-xs-2">
                            <label>Object</label>
                            <select className="form-control selectpicker "  id="objName" name="objName" value={this.state.objName} onChange= {this.handleInput} ><option value="null">Select Object.. </option>
                    {ObjetVal}</select>

                          </div>
                          <div className="col-xs-2">
                            <label>Category Id</label>
                            <div className="input-group input-group-md">
                              <input type="text" className="form-control" id="catId" name="catId" value={this.state.catId} onChange= {this.handleInput}></input>
                              <div className="input-group-btn">
                                <button className="btn btn-info " title="Search Availble Condition"  type="button" onClick={()=>{this.serchCond()}}>
                                <i className="glyphicon glyphicon-search"></i></button>
                                </div>
                              </div>
                          </div> */}
                            <div className='col-xs-2'>
                              <label>Brand</label>
                              <input
                                type='text'
                                className='form-control'
                                id='brandName'
                                name='brandName'
                                value={this.state.brandName}
                                onChange={this.handleInput}
                              />
                            </div>
                            <div className='col-xs-2'>
                              <label>Avg Sold $</label>
                              <input
                                type='number'
                                className='form-control'
                                name='avgSold'
                                value={this.state.avgSold}
                                onChange={this.handleInput}
                              />
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-xs-2'>
                              <label>Object Name</label>
                              <Autosuggest
                                suggestions={nicknameSuggestions}
                                onSuggestionsFetchRequested={
                                  this.onNicknameSuggestionsFetchRequested
                                }
                                onSuggestionsClearRequested={
                                  this.onNicknameSuggestionsClearRequested
                                }
                                onSuggestionSelected={
                                  this.onNicknameSuggestionSelected
                                }
                                getSuggestionValue={this.getSuggestionNickname}
                                renderSuggestion={this.renderSuggestion}
                                inputProps={nicknameInputProps}
                              />
                            </div>
                            <div className='col-xs-2'>
                              <label>Category Id</label>
                              <Autosuggest
                                suggestions={emailSuggestions}
                                onSuggestionsFetchRequested={
                                  this.onEmailSuggestionsFetchRequested
                                }
                                onSuggestionsClearRequested={
                                  this.onEmailSuggestionsClearRequested
                                }
                                onSuggestionSelected={
                                  this.onEmailSuggestionSelected
                                }
                                getSuggestionValue={this.getSuggestionEmail}
                                renderSuggestion={this.renderSuggestion}
                                inputProps={emailInputProps}
                              />
                            </div>

                            <div className='col-xs-5'>
                              <label>Mpn Description</label>
                              {/* className="input-group input-group-md" */}
                              <div className='input-group input-group-md'>
                                <input
                                  type='text'
                                  className='form-control'
                                  id='mpnDesc'
                                  name='mpnDesc'
                                  value={this.state.mpnDesc}
                                  onChange={this.handleInput}
                                />
                                <div className='input-group-btn'>
                                  <button
                                    className='btn btn-info '
                                    title='Search on Ebay'
                                    type='button'
                                    onClick={() => {
                                      this.serchMpn('desc1')
                                    }}
                                  >
                                    <i className='glyphicon glyphicon-search' />
                                  </button>
                                </div>
                              </div>
                              <span id='price_error_verify' />
                              <a
                                onClick={() =>
                                  this.seed_suggest_price_verify('des')
                                }
                                className='crsr-pntr seed_suggest_price_verify'
                                title='Click here for Price suggestion'
                              >
                                Suggest Price
                              </a>
                              &nbsp;&nbsp;
                              <a
                                onClick={() =>
                                  this.searchActiveListing_verify('des')
                                }
                                className='crsr-pntr searchActiveListing_verify'
                                title='Click here for Check Active Listing'
                              >
                                Check Active Listing
                              </a>
                              <a
                                class='crsr-pntr'
                                onClick={() =>
                                  this.Suggest_Categories_for_title_verify()
                                }
                                title='Click here for category suggestion'
                                id='Suggest_Categories_for_title_verify'
                                style={{ marginLeft: '17px' }}
                              >
                                Suggest Category Against Title
                              </a>
                            </div>

                            <div className='col-xs-3'>
                              <label>Remarks</label>
                              <input
                                type='text'
                                className='form-control'
                                name='remarks'
                                value={this.state.remarks}
                                onChange={this.handleInput}
                              />
                            </div>
                          </div>
                          <AlertError />
                          <div className='box-footer '>
                            <div className='col-xs-12'>
                              <label>Available Condition</label>
                              {hellCodn}
                            </div>

                            {this.state.buttonCheck == 'show' ? (
                              <React.Fragment>
                                <button
                                  type='button'
                                  className='btn btn-danger pull-right'
                                  onClick={() => this.discardItem()}
                                >
                                  Discard Item
                                </button>

                                <button
                                  type='button'
                                  className='btn btn-success pull-right m-r-5'
                                  onClick={this.showSeed}
                                >
                                  Show Seed
                                </button>
                                <button
                                  type='button'
                                  className='btn btn-warning pull-right m-r-5'
                                  onClick={this.updateRemarks}
                                >
                                  Update Remarks
                                </button>
                              </React.Fragment>
                            ) : (
                              <React.Fragment>
                                <button
                                  type='button'
                                  className='btn btn-danger pull-right'
                                  onClick={() => this.discardItem()}
                                >
                                  Discard Item
                                </button>

                                <button
                                  type='submit'
                                  className='btn btn-info pull-right m-r-5'
                                >
                                  Save Item
                                </button>
                              </React.Fragment>
                            )}
                          </div>
                        </form>
                      </div>

                      <hr />
                      <div className='row'>
                        <div className='col-sm-12'>
                          <ul
                            style={{
                              color: 'black',
                              height: 'auto !important',
                              width: ' 100%'
                            }}
                          >
                            <ImageViews passMyBarc={this.state.serchBar} />
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className='box-body'>
                    <div className='col-sm-12'>
                      <div id='Categories_result_verfiy' />
                    </div>
                    <div class='col-sm-4'>
                      {/* <!--Price Result--> */}
                      <div id='price-results' />
                    </div>
                    <div class='col-sm-4'>
                      {/* <!--Price Result--> */}
                      <div id='sold_price_datas' />
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ) : null}

            {this.state.MpnTitleCheck ? (
              <ShowTitles
                boxHead={this.state.boxHeader}
                data={this.state.mpnTitle}
                serchtest={this.serchtest}
                closePane={this.closePane}
              />
            ) : null}

            {this.state.showSeed == 'show' ? (
              <LoadSeed passBarcode={this.state.barcodeNo} />
            ) : null}
          </section>
        </React.Fragment>
      )
    }
  }
}

// {/*function CondVal(props){
//  var coChk = 1750;
//  var checked ="checked";

//  return (
//             <div className="col-xs-12">
//             <label>Available Condition</label>

//              {props.data.map((co,index) => (

//              <React.Fragment >

//        &nbsp;<input  checked={checked}  key ={index} type="radio" id ="condRadio"name="condRadio"  onChange= {props.handle} value={co.CONDITION_ID} ></input>
//        &nbsp;<span>{co.COND_NAME}</span>
//        </React.Fragment>

//              ))}
//             </div>
//         );
// }*/}

function ShowTitles (props) {
  return (
    <div className='row'>
      <div className='col-xs-12'>
        <div className='box'>
          <div className='box-header'>
            <h3 className='box-title'>
              History Title Against ({props.boxHead})
            </h3>
            <div className='box-tools pull-right'>
              <button
                type='button'
                className='btn btn-danger btn-sm'
                onClick={() => {
                  props.closePane()
                }}
                title='Close'
              >
                <i className='fa fa-times' />
              </button>
            </div>
          </div>

          <div className='box-body'>
            <table id='example2' className='table table-bordered table-hover'>
              <thead>
                <tr>
                  <th>Category Id</th>
                  <th>Title</th>
                  <th>Mpn</th>
                  <th>Upc</th>
                  <th>Object</th>
                  <th>Brand</th>
                  <th>Condition</th>
                  <th>Select</th>
                </tr>
              </thead>
              <tbody>
                {props.data.map((tit, index) => (
                  <tr key={index}>
                    <td>{tit.CATE}</td>
                    <td>{tit.TITLE}</td>
                    <td>{tit.MPN}</td>
                    <td>{tit.UPC}</td>
                    <td>{tit.OBJECT_NAME}</td>
                    <td>{tit.BRAND}</td>
                    <td>{tit.COND_NAME}</td>
                    <td>
                      <button
                        type='button'
                        className='btn btn-danger pull-right btn-sm'
                        onClick={() => {
                          props.serchtest(index + 1)
                        }}
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyItem
