import React from 'react'
// import ReactDOM from 'react-dom';
import 'gasparesganga-jquery-loading-overlay'
// import $ from 'jquery'
import { Link } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react'
import './App.css'
import { toastr } from 'react-redux-toastr'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import AlertError from './messages/AlertMessage'
import * as $ from 'jquery'
$(document).on('click', '.select_macro', function () {
  var index = $(this).attr('idx')
  var macroId = $(this).attr('macroId')
  var macroType = $(this).attr('macro_type')
  var t = document.getElementById('macro_table')
  var macroDescription = $(t.rows[index].cells[1]).text()

  var check = $('#select_' + macroId).val()
  if (check == null) {
    var trimText = macroDescription.substring(0, 220)
    var btn =
      '<div class="m-b-5 input-group input-group-md remove_slected_macro_div"><input type="button" class="btn btn-block btn-outline-secondary select_macro_button" macroDescription="' +
      escapeHtml(macroDescription) +
      '" value="' +
      escapeHtml(trimText) +
      '" macroId="' +
      macroId +
      '" id="select_' +
      macroId +
      '" macro_type="' +
      macroType +
      '"><div class="input-group-btn"> <button title="Remove Macro" class="btn btn-info remove_macro" name="remove_macro" ><i class="glyphicon glyphicon-remove"></i></button> </div> </div>'

    $(btn).appendTo('#selected_macro')
  }
})

function escapeHtml (text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

$(document).on('click', '#cat_', function () {
  // console.log(i)
  var $row = $(this).closest('tr') // Find the row
  var tds = $row.find('td:nth-child(2)')

  $.each(tds, function () {
    document.getElementById('categId').value = $(this).text()
    // that.state.categId = $(this).text()
    that.setState({
      ...that.state,
      categId: $(this).text()
    })
  })
  var tdss = $row.find('td:nth-child(5)')

  $.each(tdss, function () {
    document.getElementById('categName').value = $(this).text()
    that.setState({
      ...that.state,
      categName: $(this).text()
    })
  })

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
$(document).on('click', '.remove_macro', function () {
  $(this)
    .closest('.remove_slected_macro_div')
    .remove()
})
// Remove the Categori table
$(document).on('click', '.categorie_button ', function () {
  // $(this)
  //   .closest('.remove_slected_macro_div')
  //   .remove()
  const div = document.querySelector('#Categories_result')

  // Apply style to div
  div.setAttribute('style', 'display: none')
  // alert('hello')
})

$(document).on('click', '#Suggest_Categories ', function () {
  const div = document.querySelector('#Categories_result')

  // Apply style to div
  div.setAttribute('style', 'display: block')
  // alert('hello')
})
$(document).on('click', '#Suggest_Categories_for_title ', function () {
  const div = document.querySelector('#Categories_result')

  // Apply style to div
  div.setAttribute('style', 'display: block')
  // alert('hello')
})
//  Remove the SUggest Price

$(document).on('click', '.remove_sug ', function () {
  // $(this)
  //   .closest('.remove_slected_macro_div')
  //   .remove()
  const div = document.querySelector('#price-result')

  // Apply style to div
  div.setAttribute('style', 'display: none')
  // alert('hello')
})

$(document).on('click', '.seed_suggest_price ', function () {
  const div = document.querySelector('#price-result')

  // Apply style to div
  div.setAttribute('style', 'display: flex')
  // alert('hello')
})
$(document).on('click', '.searchActiveListing ', function () {
  const div = document.querySelector('#price-result')

  // Apply style to div
  div.setAttribute('style', 'display: flex')
  // alert('hello')
})
$(document).on('click', '.remove_sold ', function () {
  // $(this)
  //   .closest('.remove_slected_macro_div')
  //   .remove()
  const div = document.querySelector('#sold_price_data')

  // Apply style to div
  div.setAttribute('style', 'display: none')
  // alert('hello')
})

$(document).on('click', '.seed_suggest_price ', function () {
  const div = document.querySelector('#sold_price_data')

  // Apply style to div
  div.setAttribute('style', 'display: flex')
  // alert('hello')
})

$(document).on('click', '.remove_macro ', function () {
  // $(this)
  //   .closest('.remove_slected_macro_div')
  //   .remove()
  const div = document.querySelector('#macro_container')

  // Apply style to div
  div.setAttribute('style', 'display: none')
  // alert('hello')
})

$(document).on('click', '.display_macro ', function () {
  const div = document.querySelector('#macro_container')

  // Apply style to div
  div.setAttribute('style', 'display: flex')
  // alert('hello')
})
$(document).on('click', '.remove_price', function () {
  // $(this)
  //   .closest('.remove_slected_macro_div')
  //   .remove()
  const div = document.querySelector('#price_analysis')

  // Apply style to div
  div.setAttribute('style', 'display: none')
  // alert('hello')
})

$(document).on('click', '.price ', function () {
  const div = document.querySelector('#price_analysis')

  // Apply style to div
  div.setAttribute('style', 'display: ')
  // alert('hello')
})

// Add Item Specifics and Attributes
$('#add_attribute').on('click', function () {
  $('.specific_attribute').toggle() // .fadeToggle() // .slideToggle()
})

/* ==================================================
=            holdbarcode modal function            =
================================================== */
$(document).on('click', '.holdBarcode', function () {
  // var seedId = that.id
  // console.log(seedId); return false;
  // alert('feedUrlId')
  // return false
  var barcode = that.state.getBarcode

  var url =
    that.state.baseUrl +
    '/laptopzone/reactcontroller/c_haziqreact/show_all_seed_barcode'
  // return false
  $('.loader').show()
  $.ajax({
    url: url,
    type: 'post',
    dataType: 'json',
    data: { barcode: barcode },
    success: function (data) {
      console.log(data)
      that.setState({
        ...that.state,
        unholded_barcode_detail: data.unhold,
        holded_barcode_detail: data.hold
      })
      window.$('#holdBarcodeModal').modal('show')
    }
  })
})

/* =====  End of holdbarcode modal function  ====== */

function onRowSelect (row, isSelected, e) {
  let rowStr = ''
  if (isSelected) {
    that.setState({
      ...that.state,
      select_barcode: [...(that.state.select_barcode || []), row]
    })
  } else {
    const barcode = that.state.select_barcode.filter(
      item => item.BARCODE_NO !== row.BARCODE_NO
    )
    that.setState({
      ...that.state,
      select_barcode: barcode
    })
  }
  console.log(row)
}

function onSelectAll (isSelected, rows) {
  if (isSelected) {
    that.setState({
      ...that.state,
      select_barcode: rows
    })
  } else {
    that.setState({
      ...that.state,
      select_barcode: []
    })
  }

  console.log(rows)
  // for (let i = 0; i < rows.length; i++) {
  //   alert(rows[i].BARCODE_NO)
  // }
}

const selectRowProp = {
  mode: 'checkbox',
  clickToSelect: true,
  onSelect: onRowSelect,
  onSelectAll: onSelectAll
}

function unholdonRowSelect (row, isSelected, e) {
  let rowStr = ''
  if (isSelected) {
    that.setState({
      ...that.state,
      unholeselect_barcode: [...(that.state.unholeselect_barcode || []), row]
    })
  } else {
    const barcode = that.state.unholeselect_barcode.filter(
      item => item.BARCODE_NO !== row.BARCODE_NO
    )
    that.setState({
      ...that.state,
      unholeselect_barcode: barcode
    })
  }
  console.log(row)
  // alert(`is selected: ${isSelected}, ${row}`)
}

function unholdonSelectAll (isSelected, rows) {
  alert(`is select all: ${isSelected}`)
  if (isSelected) {
    that.setState({
      ...that.state,
      unholeselect_barcode: rows
    })
    // alert('Current display and selected data: ')
  } else {
    that.setState({
      ...that.state,
      unholeselect_barcode: []
    })
    // alert('unselect rows: ')
  }

  console.log(rows)
  // for (let i = 0; i < rows.length; i++) {
  //   alert(rows[i].BARCODE_NO)
  // }
}

const unholdselectRowProp = {
  mode: 'checkbox',
  clickToSelect: true,
  onSelect: unholdonRowSelect,
  onSelectAll: unholdonSelectAll
}

var that
class LoadSeed extends React.Component {
  constructor (props) {
    var getUrl = window.location
    var finalurl = getUrl.protocol + '//' + getUrl.hostname

    super(props)
    this.state = {
      baseUrl: finalurl,
      error: null,
      showLoad: false,
      isLoaded: false,
      conditions: [],
      shipname: [],
      select_barcode: [],
      unholeselect_barcode: [],
      tempData: [],
      macroType: [],
      get_remarks: [],
      itemTitle: '',
      itemDes: '',
      finalEditState: '',
      categId: null,
      categName: null,
      defCond: '',
      hidenCond: '',
      retAccept: '',
      revise_ebay_id: '',
      checked: true,

      defCondDis: '',
      listRule: '',
      price: '',
      ebay_fee: '',
      paypal_fee: '',
      cost_price: '',
      qty: '',
      shipServ: null,
      retDay: '30',
      otherNote: '',
      bin: '',
      editTemp: null,
      ebaysite: '0',
      account_type:
        localStorage.getItem('get_account') !== null
          ? localStorage.getItem('get_account')
          : 2,
      epId: '',
      hiddenItemId: '',
      seedUpc: '',
      seedUpc: '',
      seedMpn: '',
      seedBrand: '',
      getBarcode: this.props.passBarcode,
      showSpecific: false,
      specQueryVal: [],
      specificValQuery: [],
      arrayCount: '',
      arrayCat: '',
      custom_name: '',
      custom_value: '',
      messg: 'Loading .....',
      listButton: 'show',
      ebay_item_id: null,
      getEditorState: '',
      specs_value: [],
      item_det: {},
      spec_name: '',
      unholded_barcode_detail: [],
      holded_barcode_detail: [],
      // spec_name: this.state.specQueryVal[0]
      //   ? this.state.specQueryVal[0].SPECIFIC_NAME
      //   : '',
      custom_attribute: ''
    }

    this.handleInput = this.handleInput.bind(this)
    this.closeSpecific = this.closeSpecific.bind(this)
    this.saveSpecific = this.saveSpecific.bind(this)
    this.saveCustomSpecific = this.saveCustomSpecific.bind(this)
    this.price = this.price.bind(this)
    this.listItem = this.listItem.bind(this)
    this.getCondDesc = this.getCondDesc.bind(this)
    this.setEditorVal = this.setEditorVal.bind(this)
    this.getMacros = this.getMacros.bind(this)
    this.updateEditorText = this.updateEditorText.bind(this)
    this.createEditDesc = this.createEditDesc.bind(this)
    this.save_attr = this.save_attr.bind(this)
    this.unholdeBarcode = this.unholdeBarcode.bind(this)
    this.holdeBarcode = this.holdeBarcode.bind(this)
    this.show_all_seed_barcode = this.show_all_seed_barcode.bind(this)
    // this.holdeBarcode = this.holdeBarcode.bind(this)
    // this.setAccount = this.setAccount.bind(this);
    that = this
  }
  componentDidMount () {
    // console.log(this.state.getBarcode)
    // // if (
    // //   this.state.getBarcode != '' ||
    // //   this.state.getBarcode != undefined ||
    // //   this.state.getBarcode != null
    // // ) {
    // var barcode = this.state.getBarcode
    // var url =
    //   this.state.baseUrl + '/laptopzone/reactcontroller/c_react/queryData'
    // new Promise(function (resolve, reject) {
    //   $.ajax({
    //     type: 'post',
    //     url: url,

    //     datatype: 'json',
    //     data: { barocde: barcode }
    //   }).then(
    //     function (data) {
    //       resolve(data)
    //     },
    //     function (err) {
    //       reject(err)
    //     }
    //   )
    // })
    //   .then(result => {
    //     $.LoadingOverlay('hide')
    //     if(result){
    //       console.log('yes');
    //       console.log(result);
    //     }else{
    //       console.log('no');
    //     }
    //     //console.log(result.specs_value);
    //     // this.setState({
    //     //   specs_value: result
    //     // })
    //     //console.log(result.specs_value)
    //     //console.log(result)
    //   })
    //   .catch(err => {
    //     $.LoadingOverlay('hide')
    //     console.log(err)
    //   })
    // }

    // $.ajax({
    //   url: this.state.baseUrl + '/laptopzone/reactcontroller/c_react/queryData',
    //   dataType: 'json',
    //   type: 'POST',
    //   data: { barocde: this.state.getBarcode },
    //   success: function (data) {
    //     if (data) {
    //       console.log(data)
    //       console.log(data.specs_value)
    //       this.setState({
    //         specs_value: data.specs_value
    //       })
    //     } else {
    //       console.log('weee')
    //     }
    //   }.bind(this),
    //   error: function (xhr, resp, text) {
    //     // show error to console
    //     console.log(xhr, resp, text)
    //   }
    // })

    $.ajax({
      url:
        this.state.baseUrl +
        '/laptopzone/reactcontroller/c_react/get_dropdowns',
      dataType: 'json',
      type: 'POST',
      data: { barocde: this.state.getBarcode },
      success: function (data) {
        if (data.exist == true) {
          var return_option = data['seed_data'][0].RETURN_OPTION
          var template_id = data['seed_data'][0].TEMPLATE_ID
          var ebay_item_id = data.ebay_item_id
          console.log(ebay_item_id)
          if (ebay_item_id == null) {
            this.setState({ listButton: 'show' })
          } else {
            this.setState({ listButton: 'hide' })
          }

          if (return_option == null) {
            return_option = 'ReturnsAccepted'
          }
          if (template_id == null) {
            template_id = '10'
          }

          this.setState({
            isLoaded: true,
            conditions: data.condition_quer,
            shipname: data.ship_quer,
            tempData: data.temp_data,
            macroType: data.macro_type,
            get_remarks: data.get_remarks,

            hiddenItemId: data['seed_data'][0].ITEM_ID,
            ebay_item_id: data.ebay_item_id,
            seedUpc: data['seed_data'][0].UPC,
            seedId: data['seed_data'][0].SEED_ID,
            seedMpn: data['seed_data'][0].MFG_PART_NO,
            seedBrand: data['seed_data'][0].MANUFACTURER,
            itemTitle: data['seed_data'][0].ITEM_MT_DESC,
            // itemDes: data['seed_data'][0].DESCR,
            finalEditState: data['seed_data'][0].DESCR,
            categId: data['seed_data'][0].CATEGORY_ID,
            categName: data['seed_data'][0].CATEGORY_NAME,
            defCond: data['seed_data'][0].DEFAULT_COND,
            hidenCond: data['seed_data'][0].DEFAULT_COND,
            defCondDis: data['seed_data'][0].DETAIL_COND,
            price: data['seed_data'][0].EBAY_PRICE,
            ebay_fee: data['seed_data'][0].EBAY_FEE,
            paypal_fee: data['seed_data'][0].PAYPAL_FEE,
            cost_price: data['seed_data'][0].COST_PRICE,
            shipServ: data['seed_data'][0].SHIPPING_SERVICE,
            bin: data['seed_data'][0].BIN_NAME,
            editTemp: template_id,
            retAccept: return_option,
            otherNote: data['seed_data'][0].OTHER_NOTES,
            qty: data.list_qty
          })
        } else {
          this.setState({
            isLoaded: false
          })
          alert('Seed Not Created')
          return false
        }
      }.bind(this),
      error: function (xhr, resp, text) {
        // show error to console
        console.log(xhr, resp, text)
      }
    })
  }

  handleEditorChange = e => {
    // console.log(e.target.getContent());
    this.setState({ finalEditState: e.target.getContent() })
    console.log(this.state.finalEditState)
  }

  createEditDesc () {
    // var  cre_des= '<p style="text-align: center;"> <span style="font-size:24px;color:#002060;font-family:arial, helvetica, sans-serif;"><span style="text-decoration:underline;">'+this.state.itemTitle+'</strong></span></span> </p> <p style="text-align: center;"> <span style="color: #000!important; font-size: 18px;font-family:arial, helvetica, sans-serif;">This listing is for a The Lord Of The Rings The Fellowship Of The Ring Blu-ray Disc. Item is used and may have scuffs, scratches or signs of wear. Look at pictures for details. The pictures are original, unless its multiple listings and then your item may slightly vary from picture.  </span><br/> </p>';
    var cre_des =
      '<div id="desc_div"><div id="desc_div"><meta name="viewport" content="width=device-width, initial-scale=1.0"/><p style="text-align: center;"><span style="font-size:24px;color:#002060;font-family:arial, helvetica, sans-serif;"><span style="text-decoration:underline;"><strong>' +
      this.state.itemTitle +
      '</strong></span></span> </p><p style="text-align: center;"><span style="color: #000!important; font-size: 18px;font-family:arial, helvetica, sans-serif;">This listing is for a ' +
      this.state.itemTitle +
      '. ' +
      this.state.defCondDis +
      ' &nbsp;</span><br/> </p></div></div>'
    this.setState({ finalEditState: cre_des })
    console.log(this.state.finalEditState)
  }

  updateEditorText () {
    var selectedMacro = ''
    var shipTerm = ''
    var partTerm = ''
    $('.select_macro_button').each(function (index, value) {
      if ($(this).attr('macro_type') != 3) {
        selectedMacro += $(this).attr('macroDescription') + ' '
      } else {
        if ($(this).attr('macroid') == 4) {
          partTerm += $(this).attr('macroDescription') + ' '
        } else {
          shipTerm += $(this).attr('macroDescription') + ' '
        }
      }
    })

    var cre_des =
      '<div id="desc_div"><div id="desc_div"><meta name="viewport" content="width=device-width, initial-scale=1.0"/><p style="text-align: center;"><span style="font-size:24px;color:#002060;font-family:arial, helvetica, sans-serif;"><span style="text-decoration:underline;"><strong>' +
      this.state.itemTitle +
      '</strong></span></span> </p><p style="text-align: center;"><span style="color: #000!important; font-size: 18px;font-family:arial, helvetica, sans-serif;">This listing is for a ' +
      this.state.itemTitle +
      '. ' +
      selectedMacro +
      ' &nbsp;</span><br/> </p></div></div>'
    this.setState({ finalEditState: cre_des, defCondDis: selectedMacro })
    // console.log(this.state.finalEditState);

    // console.log(selectedMacro);
    // console.log(shipTerm);
    // console.log(partTerm);
  }

  handleInput (e) {
    const name = e.target.name
    // alert(this.state.account_type);
    this.setState({ [name]: e.target.value })
    // alert(this.state.account_type);

    //  alert(this.state.account_type)
    // const names = e.target.name;
    //  const val= e.target.value;
    //  alert(this.state.account_type);

    //  this.setState({[names] :val})
    //  alert(this.state.account_type);
  }
  save_attr () {
    const { specQueryVal, item_det, spec_name, custom_attribute } = this.state
    $.LoadingOverlay('show')
    let insertUrl =
      this.state.baseUrl + '/laptopzone/reactcontroller/c_react/attribute_value'
    new Promise(function (resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: 'json',
        type: 'POST',
        data: {
          cat_id: specQueryVal[0] ? specQueryVal[0]['EBAY_CATEGORY_ID'] : '',
          bar_code: item_det[0] ? item_det[0]['IT_BARCODE'] : '',
          item_mpn: item_det[0] ? item_det[0]['MFG_PART_NO'] : '',
          item_upc: item_det[0] ? item_det[0]['UPC'] : '',
          spec_name: spec_name,
          custom_attribute: custom_attribute
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
        if (result === false) {
          alert('Attribute value is already exist.')
          return false
        } else {
          alert('Record successfully added.')
          this.updateSpecific()
          return true
        }
      })
      .catch(err => {
        $.LoadingOverlay('hide')
        console.log(err)
      })

    // const urll =
    //   this.state.baseUrl + '/laptopzone/reactcontroller/c_react/queryData'
    // const barcode = this.state.getBarcode
    // $.ajax({
    //   url: urll,
    //   dataType: 'json',
    //   type: 'POST',
    //   data: { barocde: barcode },
    //   success: function (data) {
    //     $.LoadingOverlay('hide')
    //     if (data) {
    //       var count = data.mt_id.length
    //       // console.log(data.mt_id)
    //       this.setState({
    //         specQueryVal: data.mt_id,
    //         specificValQuery: data.specs_qry,
    //         arrayCount: count,
    //         item_det: data.item_det,
    //         arrayCat: data['mt_id'][0].EBAY_CATEGORY_ID,
    //         showSpecific: true,
    //         specs_value: data.specs_value
    //       })
    //     } else {
    //       console.log('error')
    //       this.setState({
    //         showSpecific: false
    //       })
    //     }
    //   }.bind(this),
    //   error: function (xhr, resp, text) {
    //     $.LoadingOverlay('hide')
    //     // show error to console
    //     // console.log(xhr,resp,text);
    //   }
    // })
  }
  getMacros (e) {
    var that = this
    var type_id = e

    $.ajax({
      url: this.state.baseUrl + '/laptopzone/reactcontroller/c_react/getMacro',
      type: 'post',
      dataType: 'json',
      data: { type_id: type_id },
      success: function (data) {
        if (data) {
          $('#macro_container').html('')
          var tr = ''
          // var CategoryCount = data['CategoryCount'];
          $('#macro_container').html(
            "<div class='col-sm-12'><div class='box box-primary'><div class='box-header'><h3 class='box-title'>Macro Details</h3><div class='box-tools pull-right'><button type='button' class='btn bg-teal btn-sm remove_macro'  data-widget='remove'><i class='fa fa-times'></i></button></div></div><table width='100%' class='table table-bordered table-striped' border='1' id='macro_table'><th>Select</th><th>Macro Description</th>"
          )
          for (var i = 1; i <= data.length; i++) {
            var macroDesc = data[i - 1]['MACRO_DESCRIPTION']
            var macroId = data[i - 1]['MACRO_ID']
            $('<tr>')
              .html(
                "<td><a class='crsr-pntr select_macro' macroId='" +
                  macroId +
                  "'  onclick='selectMacro(" +
                  i +
                  ");'    idx='" +
                  i +
                  "'' id='macro_" +
                  macroId +
                  "' macro_type='" +
                  type_id +
                  "' > Select </a></td><td>" +
                  macroDesc +
                  '</td></tr></table></div></div>'
              )
              .appendTo('#macro_table')
          }

          $('</table></div></div>').appendTo('#macro_container')
        } else {
          // $('#list_qty').val(parseInt(checkboxValues.length));
        }
      }
    })
  }

  setEditorVal (e) {
    const names = e.target.name
    // console.log(names.target.value);
    this.setState({ [names]: e.target.value })
    // console.log(this.state.itemTitle);

    //                 const contentState = ContentState.createFromText(this.state.itemTitle);
    //                 const editorState = EditorState.push(this.state.editorState, contentState);
    //                 this.setState({ editorState });
  }

  // setAccount(e){
  //   this.setState({value: e.target.value});
  //   alert(this.state.value);
  //   // const names = e.target.name;
  //   //  const val= e.target.value;
  //   //  alert(this.state.account_type);

  //   //  this.setState({[names] :val})
  //   //  alert(this.state.account_type);
  //    //localStorage.setItem('get_account', this.state.account_type)

  //    //console.log(e);

  //   return false;
  //   // console.log(val);

  //   // console.log(this.state.account_type);
  //   //localStorage.setItem('get_account', this.state.account_type)

  // }
  getCondDesc (e) {
    const names = e.target.name
    this.setState({ [names]: e.target.value }, () => {
      $.ajax({
        url:
          this.state.baseUrl +
          '/laptopzone/reactcontroller/c_react/get_cond_desc',
        dataType: 'json',
        type: 'POST',
        data: { cond_id: this.state.defCond },

        success: function (data) {
          console.log(data)
          if (data) {
            if (data['get_cond_desc'][0].COND_DESCRIPTION !== null) {
              this.setState({
                defCondDis: data['get_cond_desc'][0].COND_DESCRIPTION
              })
            } else {
              this.setState({
                defCondDis: ''
              })
            }
          }
        }.bind(this),
        error: function (xhr, resp, text) {
          // show error to console
          // console.log(xhr,resp,text);
        }
      })
    })
    console.log(this.state.defCond)
  }

  handleForm () {
    // preventDefault();
    var seedUpc = this.state.seedUpc
    var seedMpn = this.state.seedMpn
    var seedBrand = this.state.seedBrand
    var itemTitle = this.state.itemTitle

    var itemDesc = this.state.finalEditState // get current value

    // console.log(itemDesc);
    // return false;

    var categId = this.state.categId
    var categName = this.state.categName
    var defCond = this.state.defCond
    var defCondDis = this.state.defCondDis
    var hidenCond = this.state.hidenCond
    var price = this.state.price
    var shipServ = this.state.shipServ
    var bin = this.state.bin
    var editTemp = this.state.editTemp
    var retDay = this.state.retDay
    var retAccept = this.state.retAccept
    var otherNote = this.state.otherNote
    var user_id = localStorage.getItem('userId')
    var ebaysite = this.state.ebaysite
    if (categId == null || categId == '') {
      $('#categId').focus()
      alert('Enter category Id')
      return false
    }
    if (categName == null || categName == '') {
      $('#categName').focus()
      alert('Enter category Nmae')
      return false
    }
    if (price == null || price == '') {
      $('#price').focus()
      alert('Enter price ')
      return false
    }
    if (shipServ == null || shipServ == '') {
      $('#shipServ').focus()
      alert('Select Shipinig ')
      return false
    }
    if (editTemp == null || editTemp == '') {
      $('#editTemp').focus()
      alert('Select Template ')
      return false
    }

    this.setState({
      isLoaded: false
    })

    $.ajax({
      url:
        this.state.baseUrl + '/laptopzone/reactcontroller/c_react/update_seed',
      dataType: 'json',
      type: 'POST',
      data: {
        barocde: this.state.getBarcode,
        seedUpc: seedUpc,
        seedMpn: seedMpn,
        seedBrand: seedBrand,
        itemTitle: itemTitle,
        itemDesc: itemDesc,
        categId: categId,
        categName: categName,
        defCond: defCond,
        defCondDis: defCondDis,
        hidenCond: hidenCond,
        price: price,
        shipServ: shipServ,
        bin: bin,
        editTemp: editTemp,
        retDay: retDay,
        retAccept: retAccept,
        otherNote: otherNote,
        user_id: user_id,
        ebaysite: ebaysite
      },
      success: function (data) {
        if (data) {
          this.setState({
            isLoaded: true,
            hidenCond: this.state.defCond,
            messg: 'Updating Seed ...'
          })
        } else {
          this.setState({
            isLoaded: true
          })
        }
      }.bind(this),
      error: function (xhr, resp, text) {
        // show error to console
        // console.log(xhr,resp,text);
      }
    })
  }

  updateSpecific () {
    this.setState({
      showSpecific: true
    })
    $('#spec').focus()
    console.log('data')
    $.LoadingOverlay('show')

    $.ajax({
      url: this.state.baseUrl + '/laptopzone/reactcontroller/c_react/queryData',
      dataType: 'json',
      type: 'POST',
      data: { barocde: this.state.getBarcode },
      success: function (data) {
        $.LoadingOverlay('hide')

        if (data) {
          var count = data.mt_id.length
          // console.log(data.mt_id)
          this.setState({
            specQueryVal: data.mt_id,
            specificValQuery: data.specs_qry,
            arrayCount: count,
            arrayCat: data['mt_id'][0].EBAY_CATEGORY_ID,
            showSpecific: true,
            specs_value: data.specs_value
          })
        } else {
          console.log('error')
          this.setState({
            showSpecific: false
          })
        }
      }.bind(this),
      error: function (xhr, resp, text) {
        $.LoadingOverlay('hide')

        // show error to console
        // console.log(xhr,resp,text);
      }
    })
  }

  saveSpecific () {
    var count = $('#arrayCount').val()

    var item_id = this.state.hiddenItemId
    var item_mpn = this.state.seedMpn
    var item_upc = this.state.seedUpc
    var cat_id = this.state.categId

    var spec_name = []
    var spec_value = []

    for (var i = 1; i <= count; i++) {
      spec_name.push($('#specific_name_' + i).text())
      spec_value.push($('#specific_' + i).val())
    }
    // console.log(spec_name);
    // console.log(spec_value);
    $.LoadingOverlay('show')

    $.ajax({
      dataType: 'json',
      type: 'POST',
      url:
        this.state.baseUrl +
        '/laptopzone/reactcontroller/c_react/add_specifics',

      data: {
        item_id: item_id,
        cat_id: cat_id,
        spec_name: spec_name,
        spec_value: spec_value,
        item_upc: item_upc,
        item_mpn: item_mpn
      },
      success: function (data) {
        $.LoadingOverlay('hide')

        if (data != '') {
          alert('Item Specific Updated')
          return false
          // window.location.href = '<?php echo base_url(); ?>specifics/c_item_specifics';
        } else {
          alert('Error:UPC & MPN not found')
          return false
          // window.location.href = '<?php echo base_url(); ?>specifics/c_item_specifics';
        }
      }
    })
    $.LoadingOverlay('show')

    $.ajax({
      url: this.state.baseUrl + '/laptopzone/reactcontroller/c_react/queryData',
      dataType: 'json',
      type: 'POST',
      data: { barocde: this.state.getBarcode },
      success: function (data) {
        $.LoadingOverlay('hide')

        if (data) {
          var count = data.mt_id.length
          // console.log(data.mt_id)
          this.setState({
            specQueryVal: data.mt_id,
            specificValQuery: data.specs_qry,
            arrayCount: count,
            item_det: data.item_det,
            arrayCat: data['mt_id'][0].EBAY_CATEGORY_ID,
            showSpecific: true,
            specs_value: data.specs_value
          })
        } else {
          console.log('error')
          this.setState({
            showSpecific: false
          })
        }
      }.bind(this),
      error: function (xhr, resp, text) {
        $.LoadingOverlay('hide')

        // show error to console
        // console.log(xhr,resp,text);
      }
    })
  }

  saveCustomSpecific () {
    var cat_id = this.state.categId
    var custom_name = this.state.custom_name

    var custom_value = this.state.custom_value
    var maxValue = $('#maxValue').val()
    var selectionMode = $('#selectionMode').val()
    var catalogue_only = $('#catalogue_only').val()

    if (custom_name == '' || custom_name == null) {
      alert('Please insert specific name')
      $('#custom_name').focus()
      return false
    } else if (custom_value == '' || custom_value == null) {
      alert('Please insert specific value')
      $('#custom_value').focus()
      return false
    }
    // this.setState({
    //             showSpecific: false

    //            });
    $.LoadingOverlay('show')

    $.ajax({
      dataType: 'json',
      type: 'POST',
      url:
        this.state.baseUrl +
        '/laptopzone/reactcontroller/c_react/add_custom_specifics',

      data: {
        cat_id: cat_id,
        custom_name: custom_name,
        custom_value: custom_value
      },
      success: function (data) {
        $.LoadingOverlay('hide')

        // this.setState({
        //         showSpecific: true

        //        });
        if (data == false) {
          alert('Specific name is already exist.')

          return false
        } else {
          alert('Record successfully added.')

          return false
        }
      }
    })

    $.LoadingOverlay('show')

    $.ajax({
      url: this.state.baseUrl + '/laptopzone/reactcontroller/c_react/queryData',
      dataType: 'json',
      type: 'POST',
      data: { barocde: this.state.getBarcode },
      success: function (data) {
        $.LoadingOverlay('hide')

        if (data) {
          var count = data.mt_id.length
          // console.log(data.mt_id)
          this.setState({
            specQueryVal: data.mt_id,
            specificValQuery: data.specs_qry,
            arrayCount: count,
            item_det: data.item_det,
            arrayCat: data['mt_id'][0].EBAY_CATEGORY_ID,
            showSpecific: true,
            specs_value: data.specs_value
          })
        } else {
          console.log('error')
          this.setState({
            showSpecific: false
          })
        }
      }.bind(this),
      error: function (xhr, resp, text) {
        $.LoadingOverlay('hide')

        // show error to console
        // console.log(xhr,resp,text);
      }
    })
  }

  closeSpecific () {
    this.setState({
      showSpecific: false
    })
  }

  price () {
    const divs = document.querySelector('#price_analysis')

    // Apply style to div
    divs.setAttribute('style', 'display: block ')
    var price = $('#price').val()
    var ebay_fee = $('#ebay_fee').val()
    var paypal_fee = $('#paypal_fee').val()
    var ship_fee = '' // 2.5;//$("#ship_fee").val();
    var ship_change = 3.25 // '';//2.5;//$("#ship_change").val();
    var cost_price = $('#cost_price').val()
    var condition_id = this.state.defCond // $("#pic_condition_id").val();
    var mpn = this.state.seedMpn // $("#part_no_seed").val();
    var category_id = this.state.categId // $("#category_id").val();

    if (!ship_change) {
      if (!ship_fee) {
        var final_ship_fee = 0
      } else {
        var final_ship_fee = ship_fee
      }
    } else {
      var final_ship_fee = ship_change
    }

    if (!price) {
      $('#price_error').html('<b>Please Enter Item Price<b><br>')
      return false
    }

    var e_fee = 0
    var p_fee = 0
    if (!ebay_fee) {
      if (!cost_price) {
        e_fee = (parseFloat(cost_price) / 100) * 8
      }
      ebay_fee = (parseFloat(price) / 100) * 8
    } else {
      ebay_fee = (parseFloat(ebay_fee) * parseFloat(price)) / 100
      if (!cost_price) {
        e_fee = (parseFloat(ebay_fee) * parseFloat(cost_price)) / 100
      }
    }
    if (!paypal_fee) {
      if (!cost_price) {
        p_fee = (parseFloat(cost_price) / 100) * 2.25
      }
      paypal_fee = (parseFloat(price) / 100) * 2.25
    } else {
      paypal_fee = (parseFloat(paypal_fee) * parseFloat(price)) / 100
      if (!cost_price) {
        p_fee = (parseFloat(paypal_fee) * parseFloat(cost_price)) / 100
      }
    }

    if (!cost_price) {
      cost_price = 0
      var div = "style='background-color: rgba(195, 3, 3, 0.85);'"
      var flag = null
    } else {
      var login_id = localStorage.getItem('userName')
      if (login_id == 2 || login_id == 5 || login_id == 49) {
        var div =
          "style='background-color: rgba(15, 156, 15, 0.68);color: white; font-weight: bolder;'"
        var flag = cost_price
      } else {
        var div =
          "style='background-color: rgba(15, 156, 15, 0.68); font-weight: bolder;'"
        var flag = null
      }
    }

    var actual_price =
      parseFloat(price) -
      parseFloat(final_ship_fee) -
      parseFloat(ebay_fee) -
      parseFloat(paypal_fee) -
      parseFloat(cost_price)
    var perc = (parseFloat(actual_price) / parseFloat(price)) * 100
    if (perc < 5) {
      var bg =
        "style='font-weight: bold;font-size: 21px;color: rgba(195, 3, 3, 0.85);'"
    } else {
      var bg =
        "style='font-weight: bold;font-size: 21px;color: rgba(15, 156, 15, 0.68);'"
    }
    var active_css =
      "style='background-color: rgb(0, 0, 0); color: white; font-weight: bolder; width: 85px;'"
    var sold_css =
      "style='background-color: rgb(0, 78, 255); color: white; font-weight: bolder; width: 85px;'"

    /* ========================================================
      =            calculate system suggested price            =
      ======================================================== */
    var selling_cost =
      parseFloat(cost_price) +
      parseFloat(final_ship_fee) +
      parseFloat(e_fee) +
      parseFloat(p_fee)
    var sys_sug_price = (selling_cost + (selling_cost * 40) / 100).toFixed(2)

    $('#price_analysis').html('')
    var tr = ''
    $('#price_analysis').html(
      "<div class='col-sm-12'><div class='box box-primary'><div class='box-header'><i class='fa fa-usd'></i><h3 class='box-title'>Price Analysis</h3><div class='box-tools pull-right'><button type='button' class='btn bg-teal btn-sm remove_price' data-widget='remove'><i class='fa fa-times'></i></button></div></div><table width='100%' class='table table-bordered table-striped' border='1' id='price_analysis_table'> <th>Price Entered&nbsp;&nbsp;&nbsp;</th><th>eBay Charges</th><th>Paypal Charges</th><th>Shipping Charges</th><th>Item Cost</th><th>&nbsp;&nbsp;&nbsp;&nbsp;CV&nbsp;&nbsp;&nbsp;&nbsp;</th>"
    )
    $('<tr>')
      .html(
        "<td><input style='width:100%; border:none!important;'  type='number' name='price_change' id='price_change' value='" +
          price +
          "'/></td><td>" +
          parseFloat(ebay_fee).toFixed(2) +
          '</td><td>' +
          parseFloat(paypal_fee).toFixed(2) +
          "</td><td><input style='width:100%; border:none!important;'  type='number' name='ship_change' id='ship_change' value='" +
          parseFloat(final_ship_fee).toFixed(2) +
          "'/></td><td " +
          div +
          '>' +
          flag +
          '</td><td ' +
          bg +
          "><input style='width:100%; border:none!important;'  type='number' name='perc_change' id='perc_change' value='" +
          Math.round(perc) +
          "'/></td></tr></table></div></div>"
      )
      .appendTo('#price_analysis_table')
    /* =====  End of price analysis table  ====== */

    /* ===================================================
            =            price analysis active table            =
            =================================================== */

    console.log(price)
  }

  listItem (list) {
    var act_name = $('#account_type option:selected').text()

    if (list == 'list') {
      var mesg =
        'Are you sure you want to List the item ?  ' + act_name + ' is selected'
    } else if (list == 'revise') {
      var mesg =
        'Are you sure you want to Revise the item ?  ' +
        act_name +
        ' is selected'
    }

    if (window.confirm('' + mesg + '')) {
      $('#showData').html('')
      var forceRevise = 0
      var revise_ebay_id = this.state.revise_ebay_id
      if (revise_ebay_id.length > 0) {
        if (revise_ebay_id.length == 12) {
          // clicked_btn = 'revise';
          forceRevise = 1
          // ebay_id = revise_ebay_id;
        } else if (revise_ebay_id.length < 12) {
          alert('Warning! eBay id Connot be less than 12 digit.')
          $('#revise_ebay_id').focus()
          return false
        } else {
          alert('Warning! eBay id Connot be greater than 12 digit.')
          $('#revise_ebay_id').focus()
          return false
        }
      }

      var bestOfferCheckbox = $('#bestOffer').is(':checked')
      if (bestOfferCheckbox === true) {
        bestOfferCheckbox = 1
        // alert(bestOfferCheckbox);
      } else {
        bestOfferCheckbox = 0
        // alert(bestOfferCheckbox);
      }

      // return false;

      // return false;

      var insertUrl =
        this.state.baseUrl +
        '/laptopzone/reactcontroller/c_react/list_item_merg_copy'
      // new list call ajax wise
      var seed_id = this.state.seedId
      var clicked_btn = list
      var list_barcode = this.state.getBarcode
      var shopifyCheckbox = 0
      var ebay_id = this.state.ebay_item_id
      var accountId = this.state.account_type // localStorage.getItem("accountId");
      var userId = localStorage.getItem('userId')
      var userName = localStorage.getItem('userName')
      // var forceRevise = 0

      var price = $('#price').val()
      var ebay_fee = $('#ebay_fee').val()
      var paypal_fee = $('#paypal_fee').val()
      var ship_fee = '' // 2.5;//$("#ship_fee").val();
      var ship_change = 3.25 // '';//2.5;//$("#ship_change").val();
      var cost_price = 10 // $("#cost_price").val();

      var condition_id = this.state.defCond // $("#pic_condition_id").val();
      var mpn = this.state.seedMpn // $("#part_no_seed").val();
      var category_id = this.state.categId // $("#category_id").val();
      /// ////////////////////////////////////////////////////////////////////////////////
      if (accountId == 0) {
        alert('Select Account First')
        return false
      } else {
        localStorage.setItem('get_account', this.state.account_type)
      }

      if (!ship_change) {
        if (!ship_fee) {
          var final_ship_fee = 0
        } else {
          var final_ship_fee = ship_fee
        }
      } else {
        var final_ship_fee = ship_change
      }
      if (!cost_price) {
        cost_price = 0
      }

      if (!price) {
        $('#price_error').html(
          "<b style='color:red;' >Please Enter Item Price<b><br>"
        )
        return false
      }
      var e_fee = 0
      var p_fee = 0
      if (!ebay_fee) {
        if (!cost_price) {
          e_fee = (parseFloat(cost_price) / 100) * 8
        }
        ebay_fee = (parseFloat(price) / 100) * 8
      } else {
        ebay_fee = (parseFloat(ebay_fee) * parseFloat(price)) / 100
        if (!cost_price) {
          e_fee = (parseFloat(ebay_fee) * parseFloat(cost_price)) / 100
        }
      }
      if (!paypal_fee) {
        if (!cost_price) {
          p_fee = (parseFloat(cost_price) / 100) * 2.25
        }
        paypal_fee = (parseFloat(price) / 100) * 2.25
      } else {
        paypal_fee = (parseFloat(paypal_fee) * parseFloat(price)) / 100
        if (!cost_price) {
          p_fee = (parseFloat(paypal_fee) * parseFloat(cost_price)) / 100
        }
      }

      /* ========================================================
      =            check item price            =
      ======================================================== */
      var selling_cost =
        parseFloat(cost_price) +
        parseFloat(final_ship_fee) +
        parseFloat(ebay_fee) +
        parseFloat(paypal_fee)
      var price_check = (selling_cost - price).toFixed(2)

      // alert(selling_cost);
      // alert(price);
      // alert(price_check);
      // return false;

      // if(price_check > 0){ original check

      if (price > 0) {
        $.LoadingOverlay('show')

        if (list_barcode == '' || list_barcode == null) {
          list_barcode = 'barcode'
        }
        if (ebay_id == '' || ebay_id == null) {
          ebay_id = 'ebay_id'
        }
        $('#item_list').prop('disabled', true)
        new Promise(function (resolve, reject) {
          $.ajax({
            url: insertUrl,
            dataType: 'text',
            type: 'POST',

            data: {
              seed_id: seed_id,
              clicked_btn: clicked_btn,
              list_barcode: list_barcode,
              ebay_id: ebay_id,
              revise_ebay_id: revise_ebay_id,
              accountId: accountId,
              userId: userId,
              userName: userName,
              forceRevise: forceRevise,
              shopifyCheckbox: shopifyCheckbox,
              bestOfferCheckbox: bestOfferCheckbox
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
            console.log(result)

            $.LoadingOverlay('hide')
            $('#item_list').prop('disabled', false)
            console.log('Success')
            $('#showData').html('')
            $('#showData').append("'" + result + "'")
            // if(result);{
            return false

            // }
          })
          .catch(err => {
            $.LoadingOverlay('hide')
            $('#item_list').prop('disabled', true)
            console.log('Success')
            console.log(err)
          })
      } else {
        alert(
          'Error! Item Cannot be listed | List Price < (Cost + Selling Expenses)'
        )
        // $('body').scrollTo('#target');//.css({'border':'3px solid #ac2925', 'padding':'5px'})
        $('html,body').animate(
          {
            scrollTop: $('#target').offset().top
          },
          'slow'
        )
        $('#target').css({
          border: '3px solid #ac292585',
          padding: '12px 5px 0px 5px'
        })
        // <i class="glyphicon glyphicon-eye-close form-control-feedback"></i>
        $('#authenticate_pass').append(
          '<div class="col-sm-4"><div id="wrapper"> <div class="form-group has-feedback"> <input type="password" class="form-control" id="auth_password" placeholder="Password"> </div> </div></div> <div class="col-sm-2"><div class="form-group"> <button class="btn btn-danger btn-block" id="forceList" call="list">Force to List</button> </div></div>'
        )

        return false
      }
    }
  }
  seed_suggest_price = () => {
    // if (this.state.seedUpc == null) {
    //   toastr.warning(
    //     'Warning',
    //     'Warning! Connot Suggest Price Against Null UPC'
    //   )
    // } else if (this.state.seedMpn == null) {
    //   toastr.warning(
    //     'Warning',
    //     'Warning! Connot Suggest Price Against Null MPN'
    //   )
    // } else if (this.state.itemTitle) {
    //   toastr.warning(
    //     'Warning',
    //     'Warning! Connot Suggest Price Against Null Title'
    //   )
    // } else {
    const data = {
      UPC: this.state.seedUpc,
      TITLE: this.state.itemTitle,
      MPN: this.state.seedMpn,
      CATEGORY: this.state.categId,
      CONDITION: this.state.defCond
    }
    console.log(data)
    // }
    $.LoadingOverlay('show')
    $.ajax({
      type: 'POST',
      dataType: 'json',
      url:
        this.state.baseUrl +
        '/laptopzone/reactcontroller/c_haziqreact/get_item_sold_price',
      data: {
        UPC: this.state.seedUpc,
        TITLE: this.state.itemTitle,
        MPN: this.state.seedMpn,
        CONDITION: this.state.defCond,
        CATEGORY: this.state.categId
      },
      success: function (data) {
        $.LoadingOverlay('hide')
        if ((data.ack = 'Success' && data.itemCount > 0)) {
          if (data.itemCount == 1) {
            // if result is 1 than condition is changed so this check is neccessory
            $('#sold_price_data').html('')
            var tr = ''
            $('#sold_price_data').html(
              "<div class='col-sm-12'><div class='box '><div class='box-header'><i class='fa fa-usd'></i><h3 class='box-title'>Sold Listing-End Time Soonest</h3><div class='box-tools pull-right'><button type='button' class='btn bg-teal btn-sm remove_sold' onclick='remove_sold' data-widget='remove'><i class='fa fa-times'></i></button></div></div><table width='100%' class='table table-bordered table-striped' border='1' id='sold_price_data_table'> <th>Sr. No</th><th>Seller ID</th><th>Price</th><th>Condition</th>"
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
              .appendTo('#sold_price_data_table')
            // }
          }
          if (data.itemCount > 1) {
            $('#sold_price_data').html('')
            var tr = ''
            $('#sold_price_data').html(
              "<div class='col-sm-12'><div class='box '><div class='box-header'><i class='fa fa-usd'></i><h3 class='box-title'>Sold Listing-End Time Soonest</h3><div class='box-tools pull-right'><button type='button' class='btn bg-teal btn-sm remove_sold' onclick='remove_sold' data-widget='remove'><i class='fa fa-times'></i></button></div></div><table width='100%' class='table table-bordered table-striped' border='1' id='sold_price_data_table'> <th>Sr. No</th><th>Seller ID</th><th>Price</th><th>Condition</th>"
            )
            if (data.item !== undefined) {
              for (var i = 1; i < data.item.length + 1; i++) {
                var item = data['item'][i - 1]
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
                      '</td></tr>'
                  )
                  .appendTo('#sold_price_data_table')
              }
              // $('#sold_price_data').html('</table></div></div>')
            }
          }
        } else {
          // $('#sold_price_data').html('No Reecord found')
          $(
            "<div class='col-sm-12'><div class='box box-primary'><div class='box-header'><i class='fa fa-usd'></i><h3 class='box-title'>No Record Found.</h3><div class='box-tools pull-right'><button type='button' class='btn bg-teal btn-sm' data-widget='remove'><i class='fa fa-times'></i></button></div></div></div></div>"
          ).appendTo('#sold_price_data')
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
      data: {
        UPC: this.state.seedUpc,
        TITLE: this.state.itemTitle,
        MPN: this.state.seedMpn,
        CONDITION: this.state.defCond,
        CATEGORY: this.state.categId
      },
      success: function (data) {
        $.LoadingOverlay('hide')
        if ((data.ack = 'Success' && data.itemCount > 0)) {
          if (data.itemCount == 1) {
            // if result is 1 than condition is changed so this check is neccessory
            $('#price-result').html('')
            var tr = ''
            $('#price-result').html(
              "<div class='col-sm-12'><div class='box box-primary'><div class='box-header'><i class='fa fa-usd'></i><h3 class='box-title'>Active Listing- Price Plus Shipping Lowest</h3><div class='box-tools pull-right'><button type='button' class='btn bg-teal btn-sm remove_sug' onclick='remove_sug' data-widget='remove'><i class='fa fa-times'></i></button></div></div><table width='25%' class='table table-bordered table-striped' border='1' id='price_table'> <th>Sr. No</th><th>Seller ID</th><th>Price</th><th>Condition</th><th>Shipping Type</th>"
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
            $('#price-result').html('')
            var tr = ''
            $('#price-result').html(
              "<div class='col-sm-12'><div class='box box-primary'><div class='box-header'><i class='fa fa-usd'></i><h3 class='box-title'>Active Listing- Price Plus Shipping Lowest</h3><div class='box-tools pull-right'><button type='button' class='btn bg-teal btn-sm remove_sug' onclick='remove_sug' data-widget='remove'><i class='fa fa-times'></i></button></div></div><table width='25%' class='table table-bordered table-striped' border='1' id='price_table'> <th>Sr. No</th><th>Seller ID</th><th>Price</th><th>Condition</th><th>Shipping Type</th>"
            )
            if (data.item !== undefined) {
              for (var i = 1; i < data.item.length + 1; i++) {
                var item = data['item'][i - 1]
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
            // $("#price-result").html("</table></div></div>");
          }
        } else {
          // $( "#price-result" ).html("No Reecord found");
          $(
            "<div class='col-sm-12'><div class='box box-primary'><div class='box-header'><i class='fa fa-usd'></i><h3 class='box-title'>No Record Found.</h3><div class='box-tools pull-right'><button type='button' class='btn bg-teal btn-sm' data-widget='remove'><i class='fa fa-times'></i></button></div></div></div></div>"
          ).appendTo('#price-result')
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
  searchActiveListing = () => {
    $.LoadingOverlay('show')
    $.ajax({
      type: 'POST',
      dataType: 'json',
      url:
        this.state.baseUrl +
        '/laptopzone/reactcontroller/c_haziqreact/search_active_listing',
      data: {
        UPC: this.state.seedUpc,
        TITLE: this.state.itemTitle,
        MPN: this.state.seedMpn,
        CONDITION: this.state.defCond,
        CATEGORY: this.state.categId
      },
      success: function (data) {
        $.LoadingOverlay('hide')
        if ((data.ack = 'Success' && data.itemCount > 0)) {
          if (data.itemCount == 1) {
            // if result is 1 than condition is changed so this check is neccessory
            $('#price-result').html('')
            var tr = ''
            $('#price-result').html(
              "<div class='col-sm-12'><div class='box box-primary'><div class='box-header'><i class='fa fa-usd'></i><h3 class='box-title'>Active Listing- Price Plus Shipping Lowest</h3><div class='box-tools pull-right'><button type='button' class='btn bg-teal btn-sm remove_sug' onclick='remove_sug' data-widget='remove'><i class='fa fa-times'></i></button></div></div><table width='25%' class='table table-bordered table-striped' border='1' id='price_table'> <th>Sr. No</th><th>Seller ID</th><th>Price</th><th>Condition</th><th>Shipping Type</th>"
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
            $('#price-result').html('')
            var tr = ''
            $('#price-result').html(
              "<div class='col-sm-12'><div class='box box-primary'><div class='box-header'><i class='fa fa-usd'></i><h3 class='box-title'>Active Listing- Price Plus Shipping Lowest</h3><div class='box-tools pull-right'><button type='button' class='btn bg-teal btn-sm remove_sug' onclick='remove_sug' data-widget='remove'><i class='fa fa-times'></i></button></div></div><table width='25%' class='table table-bordered table-striped' border='1' id='price_table'> <th>Sr. No</th><th>Seller ID</th><th>Price</th><th>Condition</th><th>Shipping Type</th>"
            )
            if (data.item !== undefined) {
              for (var i = 1; i < data.item.length + 1; i++) {
                var item = data['item'][i - 1]
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
              }
            }
            // $('#price-result').html('</table></div></div>')
          }
        } else {
          // $( "#price-result" ).html("No Reecord found");
          $(
            "<div class='col-sm-12'><div class='box box-primary'><div class='box-header'><i class='fa fa-usd'></i><h3 class='box-title'>No Record Found.</h3><div class='box-tools pull-right'><button type='button' class='btn bg-teal btn-sm' data-widget='remove'><i class='fa fa-times'></i></button></div></div></div></div>"
          ).appendTo('#price-result')
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

  Suggest_Categories = () => {
    /* -- Suggest Categories -- */
    // $('#Suggest_Categories').click(function () {

    $.LoadingOverlay('show')
    $.ajax({
      type: 'POST',
      dataType: 'json',
      url:
        this.state.baseUrl +
        '/laptopzone/reactcontroller/c_haziqreact/suggest_categories',
      data: {
        UPC: this.state.seedUpc,
        MPN: this.state.seedMpn,
        TITLE: this.state.itemTitle
      },
      success: function (data) {
        console.log(data)
        $.LoadingOverlay('hide')
        if ((data.Ack = 'Success' && data.CategoryCount > 0)) {
          if (data.CategoryCount == 1) {
            // if result is 1 than condition is changed so this check is neccessory
            $('#Categories_result').html('')
            var tr = ''

            $('#Categories_result').html(
              "<div class='col-sm-12'><div class='box box-primary'><div class='box-header'><i class='fa fa-usd'></i><h3 class='box-title'>Suggested Categories</h3><div class='box-tools pull-right'><button type='button' class='btn bg-teal btn-sm categorie_button'  onclick='categorie_button' data-widget='remove'><i class='fa fa-times'></i></button></div></div><table width='100%' class='table table-bordered table-striped' border='1' id='category_table'> <th>Sr. No</th><th>Category ID</th><th>Main Category </th><th>Sub Category</th><th>Category Name</th><th>Item(%)</th><th>Select</th>"
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
                    "</td><td><a class='crsr-pntr' id='cat_'> Select </a></td></tr></table></div></div>"

                  // "</td><td><a class='crsr-pntr' id='cat_" +
                  // i +
                  // // "' onclick='myFunction(" +
                  // // 1 +
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
                    "</td><td><a class='crsr-pntr' id='cat_'> Select </a></td></tr></table></div></div>"
                  // "</td><td><a class='crsr-pntr' id='cat_" +
                  // i +
                  // // "' onclick='myFunction(" +
                  // // 1 +
                  // ");'> Select </a></td></tr></table></div></div>"
                )
                .appendTo('#category_table')
            }
          }

          if (data.CategoryCount > 1) {
            $('#Categories_result').html('')
            var tr = ''
            // var CategoryCount = data['CategoryCount'];
            $('#Categories_result').html(
              "<div class='col-sm-12'><div class='box box-primary'><div class='box-header'><i class='fa fa-usd'></i><h3 class='box-title'>Suggested Categories</h3><div class='box-tools pull-right'><button type='button' class='btn bg-teal btn-sm categorie_button'  onclick='categorie_button' data-widget='remove'><i class='fa fa-times'></i></button></div></div><table width='100%' class='table table-bordered table-striped' border='1' id='category_table'> <th>Sr. No</th><th>Category ID</th><th>Main Category </th><th>Sub Category</th><th>Category Name</th><th>Item(%)</th><th>Select</th>"
            )
            for (var i = 1; i <= data.CategoryCount; i++) {
              var item =
                data['SuggestedCategoryArray']['SuggestedCategory'][i - 1]
              var CategoryParentName1 =
                item['Category']['CategoryParentName'][0].length // manin category
              if (CategoryParentName1 === 1) {
                // check sub category exist or not
                var CategoryParentName1 = item['Category']['CategoryParentName'] // [0];//manin category
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
                      "</td><td><a class='crsr-pntr' id='cat_'> Select </a></td></tr></table></div></div>"
                    // " +
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
                      '</td><td> ' +
                      CategoryParentName1 +
                      '</td><td>' +
                      CategoryParentName2 +
                      '</td><td>' +
                      CategoryName +
                      '</td><td>' +
                      PercentItemFound +
                      "</td><td><a class='crsr-pntr' id='cat_'> Select </a></td></tr></table></div></div>"
                    // "</td><td><a class='crsr-pntr' id='cat_" +
                    // i +
                    // // "' onclick='myFunction(" +
                    // // i +
                    // ");'> Select </a></td></tr></table></div></div>"
                  )
                  .appendTo('#category_table')
              }
            }

            $('</table></div></div>').appendTo('#Categories_result')
          }
        } else {
          // $( "#Categories_result").html("No Record found");
          $(
            "<div class='col-sm-12'><div class='box box-primary'><div class='box-header'><i class='fa fa-usd'></i><h3 class='box-title'>No Record Found.</h3><div class='box-tools pull-right'><button type='button' class='btn bg-teal btn-sm' data-widget='remove'><i class='fa fa-times'></i></button></div></div></div></div>"
          ).appendTo('#Categories_result')
        }
      },
      error: function (xhr, resp, text) {
        $.LoadingOverlay('hide')
        alert(xhr, resp, text)
        // show error to console
        // console.log(xhr,resp,text);
      }
    })
    $.LoadingOverlay('hide')
    // })
    /* -- End Suggest Cotegories -- */
  }

  handleCheck = () => {
    console.log('asd')
    this.setState({ checked: !this.state.checked })
  }

  Suggest_Categories_for_title = () => {
    $.LoadingOverlay('show')
    $.ajax({
      type: 'POST',
      dataType: 'json',
      url:
        this.state.baseUrl +
        '/laptopzone/reactcontroller/c_haziqreact/suggest_categories',
      data: {
        UPC: this.state.seedUpc,
        MPN: this.state.seedMpn,
        TITLE: this.state.itemTitle
      },
      success: function (data) {
        $.LoadingOverlay('hide')
        if ((data.Ack = 'Success' && data.CategoryCount > 0)) {
          if (data.CategoryCount == 1) {
            // if result is 1 than condition is changed so this check is neccessory
            $('#Categories_result').html('')
            var tr = ''

            $('#Categories_result').html(
              "<div class='col-sm-12'><div class='box box-primary'><div class='box-header'><i class='fa fa-usd'></i><h3 class='box-title'>Suggested Categories</h3><div class='box-tools pull-right'><button type='button' class='btn bg-teal btn-sm categorie_button' onclick='categorie_button' data-widget='remove'><i class='fa fa-times'></i></button></div></div><table width='100%' class='table table-bordered table-striped' border='1' id='category_table'> <th>Sr. No</th><th>Category ID</th><th>Main Category </th><th>Sub Category</th><th>Category Name</th><th>Item(%)</th><th>Select</th>"
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
                    "</td><td><a class='crsr-pntr' id='cat_'> Select </a></td></tr></table></div></div>"
                  // "</td><td><a class='crsr-pntr' id='cat_" +
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
                    "</td><td><a class='crsr-pntr' id='cat_'> Select </a></td></tr></table></div></div>"

                  // "</td><td><a class='crsr-pntr' id='cat_" +
                  // i +
                  // "' onclick='myFunction(" +
                  // 1 +
                  // ");'> Select </a></td></tr></table></div></div>"
                )
                .appendTo('#category_table')
            }
          }

          if (data.CategoryCount > 1) {
            $('#Categories_result').html('')
            var tr = ''
            // var CategoryCount = data['CategoryCount'];
            $('#Categories_result').html(
              "<div class='col-sm-12'><div class='box box-primary'><div class='box-header'><i class='fa fa-usd'></i><h3 class='box-title'>Suggested Categories</h3><div class='box-tools pull-right'><button type='button' class='btn bg-teal btn-sm categorie_button'  onclick='categorie_button' data-widget='remove'><i class='fa fa-times'></i></button></div></div><table width='100%' class='table table-bordered table-striped' border='1' id='category_table'> <th>Sr. No</th><th>Category ID</th><th>Main Category </th><th>Sub Category</th><th>Category Name</th><th>Item(%)</th><th>Select</th>"
            )
            for (var i = 1; i <= data.CategoryCount; i++) {
              var item =
                data['SuggestedCategoryArray']['SuggestedCategory'][i - 1]
              var CategoryParentName1 =
                item['Category']['CategoryParentName'][0].length // manin category
              if (CategoryParentName1 === 1) {
                // check sub category exist or not
                var CategoryParentName1 = item['Category']['CategoryParentName'] // [0];//manin category
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
                      "</td><td><a class='crsr-pntr' id='cat_'> Select </a></td></tr></table></div></div>"

                    // "</td><td><a class='crsr-pntr' id='cat_" +
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
                      "</td><td><a class='crsr-pntr' id='cat_'> Select </a></td></tr></table></div></div>"

                    // "</td><td><a class='crsr-pntr' id='cat_" +
                    // i +
                    // "' onclick='myFunction(" +
                    // i +
                    // ");'> Select </a></td></tr></table></div></div>"
                  )
                  .appendTo('#category_table')
              }
            }

            $('</table></div></div>').appendTo('#Categories_result')
          }
        } else {
          // $( "#Categories_result").html("No Record found");
          $(
            "<div class='col-sm-12'><div class='box box-primary'><div class='box-header'><i class='fa fa-usd'></i><h3 class='box-title'>No Record Found.</h3><div class='box-tools pull-right'><button type='button' class='btn bg-teal btn-sm' data-widget='remove'><i class='fa fa-times'></i></button></div></div></div></div>"
          ).appendTo('#Categories_result')
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

  show_all_seed_barcode () {
    var barcode = this.state.getBarcode
    var url1 =
      this.state.baseUrl +
      '/laptopzone/reactcontroller/c_haziqreact/show_all_seed_barcode'
    $.ajax({
      url: url1,
      type: 'post',
      dataType: 'json',
      data: { barcode: barcode },
      success: function (data) {
        console.log(data)
        // this.setState({
        //   ...this.state,
        //   unholded_barcode_detail: data.unhold,
        //   holded_barcode_detail: data.hold
        // })
      }
    })
  }
  unholdeBarcode () {
    this.setState({
      showLoad: false
    })
    const data = {
      barcodes: this.state.select_barcode,
      barcodeStatus: 1,
      user_id: localStorage.getItem('userId')
    }
    var url =
      that.state.baseUrl +
      '/laptopzone/reactcontroller/c_haziqreact/toggle_hold_selected_barcode'
    new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        type: 'post',
        dataType: 'json',
        data: data
      }).then(
        data => {
          resolve(data)
        },
        err => {
          reject(err)
        }
      )
    })
      .then(reusult => {
        var barcode = this.state.getBarcode
        var url1 =
          this.state.baseUrl +
          '/laptopzone/reactcontroller/c_haziqreact/show_all_seed_barcode'
        $.ajax({
          url: url1,
          type: 'post',
          dataType: 'json',
          data: { barcode: barcode },
          success: function (data) {
            console.log(data)
            // this.setState({
            //   // ...this.state,
            //   unholded_barcode_detail: data.unhold,
            //   holded_barcode_detail: data.hold
            // })
          }
        })

        $.ajax({
          url:
            this.state.baseUrl +
            '/laptopzone/reactcontroller/c_react/get_dropdowns',
          dataType: 'json',
          type: 'POST',
          data: { barocde: this.state.getBarcode },
          success: function (data) {
            if (data.exist == true) {
              var return_option = data['seed_data'][0].RETURN_OPTION
              var template_id = data['seed_data'][0].TEMPLATE_ID
              var ebay_item_id = data.ebay_item_id
              console.log(ebay_item_id)
              if (ebay_item_id == null) {
                this.setState({ listButton: 'show' })
              } else {
                this.setState({ listButton: 'hide' })
              }

              if (return_option == null) {
                return_option = 'ReturnsAccepted'
              }
              if (template_id == null) {
                template_id = '10'
              }
              window.$('#holdBarcodeModal').modal('hide')
              this.setState({
                isLoaded: true,
                showLoad: false,
                conditions: data.condition_quer,
                shipname: data.ship_quer,
                tempData: data.temp_data,
                macroType: data.macro_type,
                get_remarks: data.get_remarks,

                hiddenItemId: data['seed_data'][0].ITEM_ID,
                ebay_item_id: data.ebay_item_id,
                seedUpc: data['seed_data'][0].UPC,
                seedId: data['seed_data'][0].SEED_ID,
                seedMpn: data['seed_data'][0].MFG_PART_NO,
                seedBrand: data['seed_data'][0].MANUFACTURER,
                itemTitle: data['seed_data'][0].ITEM_MT_DESC,
                // itemDes: data['seed_data'][0].DESCR,
                finalEditState: data['seed_data'][0].DESCR,
                categId: data['seed_data'][0].CATEGORY_ID,
                categName: data['seed_data'][0].CATEGORY_NAME,
                defCond: data['seed_data'][0].DEFAULT_COND,
                hidenCond: data['seed_data'][0].DEFAULT_COND,
                defCondDis: data['seed_data'][0].DETAIL_COND,
                price: data['seed_data'][0].EBAY_PRICE,
                ebay_fee: data['seed_data'][0].EBAY_FEE,
                paypal_fee: data['seed_data'][0].PAYPAL_FEE,
                cost_price: data['seed_data'][0].COST_PRICE,
                shipServ: data['seed_data'][0].SHIPPING_SERVICE,
                bin: data['seed_data'][0].BIN_NAME,
                editTemp: template_id,
                retAccept: return_option,
                otherNote: data['seed_data'][0].OTHER_NOTES,
                qty: data.list_qty == null ? 0 : data.list_qty
              })
            } else {
              this.setState({
                isLoaded: false,
                showLoad: false
              })
              alert('Seed Not Created')
              return false
            }
          }.bind(this),
          error: function (xhr, resp, text) {
            // show error to console
            console.log(xhr, resp, text)
          }
        })
      })
      .catch(err => {
        this.setState({
          isLoaded: false,
          showLoad: false
        })
        alert(err)
      })
  }
  holdeBarcode () {
    this.setState({
      showLoad: false
    })
    const data = {
      barcodes: this.state.unholeselect_barcode,
      barcodeStatus: 0,
      user_id: localStorage.getItem('userId')
    }
    var url =
      that.state.baseUrl +
      '/laptopzone/reactcontroller/c_haziqreact/toggle_hold_selected_barcode'
    new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        type: 'post',
        dataType: 'json',
        data: data
      }).then(
        data => {
          resolve(data)
        },
        err => {
          reject(err)
        }
      )
    })
      .then(result => {
        var barcode = this.state.getBarcode
        var url1 =
          this.state.baseUrl +
          '/laptopzone/reactcontroller/c_haziqreact/show_all_seed_barcode'
        $.ajax({
          url: url1,
          type: 'post',
          dataType: 'json',
          data: { barcode: barcode },
          success: function (data) {
            console.log(data)
            // this.setState({
            //   unholded_barcode_detail: data.unhold,
            //   holded_barcode_detail: data.hold
            // })
          }
        })
        $.ajax({
          url:
            this.state.baseUrl +
            '/laptopzone/reactcontroller/c_react/get_dropdowns',
          dataType: 'json',
          type: 'POST',
          data: { barocde: this.state.getBarcode },
          success: function (data) {
            if (data.exist == true) {
              var return_option = data['seed_data'][0].RETURN_OPTION
              var template_id = data['seed_data'][0].TEMPLATE_ID
              var ebay_item_id = data.ebay_item_id
              console.log(ebay_item_id)
              if (ebay_item_id == null) {
                this.setState({ listButton: 'show' })
              } else {
                this.setState({ listButton: 'hide' })
              }

              if (return_option == null) {
                return_option = 'ReturnsAccepted'
              }
              if (template_id == null) {
                template_id = '10'
              }
              window.$('#holdBarcodeModal').modal('hide')
              this.setState({
                isLoaded: true,
                showLoad: false,
                conditions: data.condition_quer,
                shipname: data.ship_quer,
                tempData: data.temp_data,
                macroType: data.macro_type,
                get_remarks: data.get_remarks,

                hiddenItemId: data['seed_data'][0].ITEM_ID,
                ebay_item_id: data.ebay_item_id,
                seedUpc: data['seed_data'][0].UPC,
                seedId: data['seed_data'][0].SEED_ID,
                seedMpn: data['seed_data'][0].MFG_PART_NO,
                seedBrand: data['seed_data'][0].MANUFACTURER,
                itemTitle: data['seed_data'][0].ITEM_MT_DESC,
                // itemDes: data['seed_data'][0].DESCR,
                finalEditState: data['seed_data'][0].DESCR,
                categId: data['seed_data'][0].CATEGORY_ID,
                categName: data['seed_data'][0].CATEGORY_NAME,
                defCond: data['seed_data'][0].DEFAULT_COND,
                hidenCond: data['seed_data'][0].DEFAULT_COND,
                defCondDis: data['seed_data'][0].DETAIL_COND,
                price: data['seed_data'][0].EBAY_PRICE,
                ebay_fee: data['seed_data'][0].EBAY_FEE,
                paypal_fee: data['seed_data'][0].PAYPAL_FEE,
                cost_price: data['seed_data'][0].COST_PRICE,
                shipServ: data['seed_data'][0].SHIPPING_SERVICE,
                bin: data['seed_data'][0].BIN_NAME,
                editTemp: template_id,
                retAccept: return_option,
                otherNote: data['seed_data'][0].OTHER_NOTES,
                qty: data.list_qty == null ? 0 : data.list_qty
              })
            } else {
              this.setState({
                isLoaded: false,
                showLoad: false
              })
              alert('Seed Not Created')
              return false
            }
          }.bind(this),
          error: function (xhr, resp, text) {
            // show error to console
            console.log(xhr, resp, text)
          }
        })
      })
      .catch(err => {
        this.setState({
          isLoaded: false,
          showLoad: false
        })
        alert(err)
      })
  }
  render () {
    console.log(this.state.specs_value)
    console.log(this.state.ebaysite)
    console.log(this.state.unholded_barcode_detail)
    console.log(this.state.categId)
    console.log(this.state.select_barcode)

    const optionsunhold = {
      page: 1, // which page you want to show as default
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
          text: '75',
          value: 75
        },
        {
          text: 'All',
          value: this.state.holded_barcode_detail.length
        }
      ], // you can change the dropdown list for size per page
      sizePerPage: 25, // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 5, // the pagination bar size.
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      firstPage: '<<', // First page button text
      lastPage: '>>', // Last page button text
      prePageTitle: 'Go to previous', // Previous page button title
      nextPageTitle: 'Go to next', // Next page button title
      firstPageTitle: 'Go to first', // First page button title
      lastPageTitle: 'Go to Last', // Last page button title
      paginationShowsTotal: this.renderShowsTotal, // Accept bool or function
      paginationPosition: 'both', // default is bottom, top and both is all available
      clearSearch: true
      // keepSizePerPageState: true //default is false, enable will keep sizePerPage dropdown state(open/clode) when external rerender happened
      // hideSizePerPage: true > You can hide the dropdown for sizePerPage
      // alwaysShowAllBtns: true // Always show next and previous button
      // withFirstAndLast: false > Hide the going to First and Last page button
      // hidePageListOnlyOnePage: true > Hide the page list if only one page.
    }
    const options = {
      page: 1, // which page you want to show as default
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
          text: '75',
          value: 75
        },
        {
          text: 'All',
          value: this.state.unholded_barcode_detail.length
        }
      ], // you can change the dropdown list for size per page
      sizePerPage: 25, // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 5, // the pagination bar size.
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      firstPage: '<<', // First page button text
      lastPage: '>>', // Last page button text
      prePageTitle: 'Go to previous', // Previous page button title
      nextPageTitle: 'Go to next', // Next page button title
      firstPageTitle: 'Go to first', // First page button title
      lastPageTitle: 'Go to Last', // Last page button title
      paginationShowsTotal: this.renderShowsTotal, // Accept bool or function
      paginationPosition: 'both', // default is bottom, top and both is all available
      clearSearch: true
      // keepSizePerPageState: true //default is false, enable will keep sizePerPage dropdown state(open/clode) when external rerender happened
      // hideSizePerPage: true > You can hide the dropdown for sizePerPage
      // alwaysShowAllBtns: true // Always show next and previous button
      // withFirstAndLast: false > Hide the going to First and Last page button
      // hidePageListOnlyOnePage: true > Hide the page list if only one page.
    }
    const numbers = [1, 2, 3, 4, 5]
    var that = this
    const { error, isLoaded, conditions } = this.state
    if (error) {
      return <div> Error: {error.message}</div>
    } else if (!isLoaded) {
      return (
        <div>
          <h1>{this.state.messg}</h1>
        </div>
      )
    } else {
      var conditionValues = this.state.conditions.map(function (cond) {
        return (
          <option key={cond.ID} value={cond.ID}>
            {cond.COND_NAME}
          </option>
        )
      })
      var shipValues = this.state.shipname.map(function (ship) {
        return (
          <option key={ship.SHIPING_NAME} value={ship.SHIPING_NAME}>
            {ship.SHIPING_NAME}
          </option>
        )
      })

      var marcVal = this.state.macroType.map(function (mac, index) {
        return (
          <input
            key={index}
            type='button'
            onClick={() => {
              that.getMacros(mac.TYPE_ID)
            }}
            className='btn btn-outline-secondary btn-sm m-r-5 type_btn display_macro'
            value={mac.TYPE_DESCRIPTION}
            id={mac.TYPE_ID}
          />
        )
      })

      var tempVal = this.state.tempData.map(function (temp) {
        return (
          <option key={temp.TEMPLATE_ID} value={temp.TEMPLATE_ID}>
            {temp.TEMPLATE_NAME}
          </option>
        )
      })

      var showRemark = this.state.get_remarks.map(function (temp) {
        return (
          <React.Fragment>
            <li>{temp.DEKIT_REMARKS}</li>
            <li>{temp.IDENT_REMARKS}</li>
            <li>{temp.BARCODE_NOTES}</li>
          </React.Fragment>
        )
      })

      var makeSpec = this.state.specQueryVal.map(function (count, index) {
        var i = index + 1

        var id2 = 'specific_name_' + i
        var selectName = 'specific_' + i
        var inDiv = 'specific' + count.MT_ID

        return (
          <div key={index} className='col-sm-3'>
            <label id={id2}>{count.SPECIFIC_NAME}</label>

            <select className='form-control  ' id={selectName}>
              <option value='select'>------------Select------------</option>
              {that.state.specificValQuery.map((speci, index) => {
                if (speci.MT_ID == count.MT_ID) {
                  return (
                    <React.Fragment>
                      <option key={index} value={speci.SPECIFIC_VALUE}>
                        {speci.SPECIFIC_VALUE}
                      </option>
                    </React.Fragment>
                  )
                }
              })}
            </select>
          </div>
        )
      })
      return this.state.showLoad == false ? (
        <React.Fragment>
          <div className='row'>
            <div className='col-xs-12'>
              <div className='box box-info'>
                <div className='box-body'>
                  <div className='row'>
                    <div className='col-xs-2'>
                      <label>Ebay Id:</label>
                      <a
                        href={`http://www.ebay.com/itm/${
                          this.state.ebay_item_id
                        }`}
                        target='_blank'
                        className='form-control'
                        style={{ color: '#3c8dbc' }}
                      >
                        {' '}
                        {this.state.ebay_item_id}
                      </a>
                    </div>
                    <div className='col-xs-4'>
                      <label>Seed Upc:</label>
                      <input
                        type='hidden'
                        className='form-control'
                        name='hiddenItemId'
                        value={this.state.hiddenItemId}
                        onChange={this.handleInput}
                      />
                      <input
                        type='text'
                        className='form-control'
                        name='seedUpc'
                        value={this.state.seedUpc}
                        onChange={this.handleInput}
                      />
                      <input
                        type='hidden'
                        className='form-control'
                        name='seedId'
                        value={this.state.seedId}
                        onChange={this.handleInput}
                      />
                    </div>
                    <div className='col-xs-4'>
                      <label>Seed Mpn:</label>
                      <input
                        type='text'
                        className='form-control'
                        name='seedMpn'
                        value={this.state.seedMpn}
                        onChange={this.handleInput}
                      />
                    </div>
                    <div className='col-xs-2'>
                      <label>Seed Brand:</label>
                      <input
                        type='text'
                        className='form-control'
                        name='seedBrand'
                        value={this.state.seedBrand}
                        onChange={this.handleInput}
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-xs-4'>
                      <label>Remarks</label>
                      <ol className='setol'>{showRemark}</ol>
                    </div>

                    <div className='col-xs-4'>
                      <label>Picture Notes</label>
                      <ol className='setol'>{showRemark}</ol>
                    </div>

                    <div className='col-xs-4'>
                      <label>End Item Remarks</label>
                      <ol className='setol'>{showRemark}</ol>
                    </div>
                  </div>

                  {/* <div className="row">
                            <div className="col-xs-12">
                                <label>Picture Notes:</label>
                                <input type="text" className="form-control" name="" value="" ></input>
                            </div>

                          </div> */}

                  <div className='row'>
                    <div className='col-xs-12'>
                      <label>Title:</label>
                      <input
                        type='text'
                        className='form-control'
                        name='itemTitle'
                        value={this.state.itemTitle}
                        onChange={this.setEditorVal}
                      />
                    </div>
                    <a
                      class='crsr-pntr'
                      onClick={this.Suggest_Categories_for_title}
                      title='Click here for category suggestion'
                      id='Suggest_Categories_for_title'
                      style={{ marginLeft: '17px' }}
                    >
                      Suggest Category Against Title
                    </a>
                  </div>
                  <div className='row'>
                    <div className='col-xs-12'>
                      <label>Default Condition Description:</label>
                      <textarea
                        style={{ color: 'red' }}
                        type='text'
                        className='form-control'
                        name='defCondDis'
                        value={this.state.defCondDis}
                        onChange={this.handleInput}
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-lg-12'>
                      <div className='form-group'>
                        <br />
                        {marcVal}
                      </div>
                    </div>
                  </div>

                  <div className='row'>
                    <div id='macro_container' className='col-lg-12' />
                  </div>

                  <div className='row'>
                    <div id='selected_macro' className='col-lg-12' />
                  </div>
                  <div className='col-lg-12'>
                    <div className='form-group'>
                      {/* <label for="">Item Discription:</label> */}
                      <input
                        type='button'
                        className='btn btn-warning pull-right '
                        value='Create Description'
                        id='create_desc '
                        onClick={this.createEditDesc}
                      />
                      <input
                        type='button'
                        className='btn btn-danger pull-right m-r-5'
                        value='Macro Desc'
                        id='macro_desc'
                        onClick={this.updateEditorText}
                      />
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-xs-12'>
                      <label>Title Description:</label>
                      <Editor
                        value={this.state.finalEditState}
                        init={{
                          plugins: 'link image code',
                          toolbar:
                            'undo redo | bold italic | alignleft aligncenter alignright | code | forecolor backcolor'
                        }}
                        onChange={this.handleEditorChange}
                      />
                    </div>
                  </div>

                  <div className='row'>
                    <hr />
                    <div className='col-xs-12'>
                      <div className='col-xs-2'>
                        <label>Category Id:</label>
                        <input
                          type='number'
                          className='form-control'
                          id='categId'
                          name='categId'
                          value={this.state.categId}
                          onChange={this.handleInput}
                        />
                      </div>
                      <div className='col-xs-4'>
                        <label>Category Name:</label>
                        <input
                          type='name'
                          className='form-control'
                          id='categName'
                          name='categName'
                          value={this.state.categName}
                          onChange={this.handleInput}
                        />
                        <a
                          class='crsr-pntr'
                          title='Click here for category suggestion'
                          id='Suggest_Categories'
                          onClick={this.Suggest_Categories}
                        >
                          Suggest Category
                        </a>{' '}
                        &nbsp;&nbsp; <br />
                        <br />
                      </div>
                      <div id='Categories_result'>
                        {/* <div class='col-sm-12'>
                          <div class='box box-primary'>
                            <div class='box-header'>
                              <i class='fa fa-usd' />
                              <h3 class='box-title'>Suggested Categories</h3>
                              <div class='box-tools pull-right'>
                                <button
                                  type='button'
                                  class='btn bg-teal btn-sm categorie_button'
                                  onclick='categorie_button'
                                  data-widget='remove'
                                >
                                  <i class='fa fa-times' />
                                </button>
                              </div>
                            </div>
                            <table
                              width='100%'
                              class='table table-bordered table-striped'
                              border='1'
                              id='category_table'
                            >
                              {' '}
                              <th>Sr. No</th>
                              <th>Category ID</th>
                              <th>Main Category </th>
                              <th>Sub Category</th>
                              <th>Category Name</th>
                              <th>Item(%)</th>
                              <th>Select</th>{' '}
                            </table>
                            <tbody>
                              {this.state.suggest_categorie.map(
                                (tit, index) => (
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
                                      >
                                        Select
                                      </button>
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </div>
                        </div> */}
                      </div>

                      <div className='col-xs-3'>
                        <label>Default Condition:</label>
                        <input
                          type='hidden'
                          className='form-control'
                          name='hidenCond'
                          value={this.state.hidenCond}
                        />
                        <select
                          className='form-control selectpicker '
                          name='defCond'
                          value={this.state.defCond}
                          onChange={this.getCondDesc}
                        >
                          <option value='0'>Select Condiotion.. </option>
                          {conditionValues}
                        </select>
                      </div>
                      <div className='col-xs-3'>
                        <label>Return Accepted:</label>
                        <select
                          className='form-control selectpicker '
                          name='retAccept'
                          value={this.state.retAccept}
                          onChange={this.handleInput}
                        >
                          <option value='0'>Select Option.. </option>
                          <option value='ReturnsAccepted'>Yes</option>
                          <option value='ReturnsNotAccepted'>No</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-xs-2 '>
                      <label>Price:</label>
                      <div className='input-group '>
                        <span className='input-group-addon'>US $</span>
                        <input
                          type='number'
                          step='0.01'
                          min='0'
                          className='form-control'
                          id='price'
                          name='price'
                          value={this.state.price}
                          onChange={this.handleInput}
                          onBlur={this.price}
                        />
                        <input
                          type='hidden'
                          className='form-control'
                          id='ebay_fee'
                          name='ebay_fee'
                          value={this.state.ebay_fee}
                          onChange={this.handleInput}
                        />
                        <input
                          type='hidden'
                          className='form-control'
                          id='paypal_fee'
                          name='paypal_fee'
                          value={this.state.paypal_fee}
                          onChange={this.handleInput}
                        />
                        <input
                          type='hidden'
                          className='form-control'
                          id='cost_price'
                          name='cost_price'
                          value={this.state.cost_price}
                          onChange={this.handleInput}
                        />
                      </div>
                      <span id='price_error' />
                      <a
                        onClick={this.seed_suggest_price}
                        className='crsr-pntr seed_suggest_price'
                        title='Click here for Price suggestion'
                      >
                        Suggest Price
                      </a>
                      &nbsp;&nbsp;
                      <a
                        onClick={this.searchActiveListing}
                        className='crsr-pntr searchActiveListing'
                        title='Click here for Check Active Listing'
                      >
                        Check Active Listing
                      </a>
                    </div>
                    <div className='col-xs-2'>
                      <label>QTY:</label>
                      <input
                        type='number'
                        className='form-control'
                        name='qty'
                        disabled
                        value={this.state.qty}
                        onChange={this.handleInput}
                      />
                    </div>
                    <div className='col-xs-1'>
                      <button
                        style={{ marginTop: '40px', marginLeft: '41px' }}
                        type='button'
                        className='btn btn-primary btn-sm holdBarcode'
                        value='Hold Barcode'
                        margin
                      >
                        Hold Barcode
                      </button>
                    </div>
                    <div className='col-xs-2'>
                      <label>Bin:</label>
                      <input
                        type='text'
                        className='form-control'
                        name='bin'
                        value={this.state.bin}
                        onChange={this.handleInput}
                      />
                    </div>
                    <div className='col-xs-4'>
                      <label>Other Notes:</label>
                      <input
                        type='text'
                        className='form-control'
                        name='otherNote'
                        value={this.state.otherNote}
                        onChange={this.handleInput}
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-sm-6'>
                      <div id='price_analysis' />
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-xs-3'>
                      <label>Shipping Service:</label>
                      <select
                        className='form-control selectpicker '
                        id='shipServ'
                        name='shipServ'
                        value={this.state.shipServ}
                        onChange={this.handleInput}
                      >
                        <option value='null'>Select Shipping.. </option>
                        {shipValues}
                      </select>
                    </div>

                    <div class='col-sm-4'>
                      {/* <!--Price Result--> */}
                      <div id='price-result' />
                    </div>
                    <div class='col-sm-4'>
                      {/* <!--Price Result--> */}
                      <div id='sold_price_data' />
                    </div>
                    <div className='col-xs-2'>
                      <label>Return In Days:</label>
                      <select
                        className='form-control selectpicker '
                        name='retDay'
                        value={this.state.retDay}
                        onChange={this.handleInput}
                      >
                        <option value='14'>14 Days</option>
                        <option value='30'>30 Days</option>
                        <option value='60'>60 Days</option>
                      </select>
                    </div>

                    <div className='col-xs-2'>
                      <label>Edit Templete:</label>
                      <select
                        className='form-control selectpicker '
                        id='editTemp'
                        name='editTemp'
                        value={this.state.editTemp}
                        onChange={this.handleInput}
                      >
                        <option value='0'>Select Shipping.. </option>
                        {tempVal}
                      </select>
                    </div>
                    <div className='col-xs-1'>
                      <label>Epid:</label>
                      <input
                        type='number'
                        className='form-control'
                        name='epId'
                        value={this.state.epId}
                        onChange={this.handleInput}
                      />
                    </div>
                    <div className='col-xs-2'>
                      <label>Select EbaySite:</label>
                      <select
                        id='ebaysite'
                        class='form-control'
                        name='ebaysite'
                        value={this.state.ebaysite}
                        onChange={this.handleInput}
                        required
                      >
                        <option key={'1'} value='0' selected>
                          US
                        </option>
                        <option key={'2'} value='100'>
                          Motors
                        </option>
                      </select>
                    </div>
                    <div className='col-xs-2'>
                      <label>Select Account:</label>
                      <select
                        id='account_type'
                        class='form-control'
                        name='account_type'
                        value={this.state.account_type}
                        onChange={this.handleInput}
                        required
                      >
                        <option key={'1'} value='0'>
                          Select Account
                        </option>

                        <option key={'2'} value='1'>
                          Techbargains2015
                        </option>
                        <option key={'3'} value='2'>
                          Dfwonline
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-xs-12' id='showData' />
                </div>
                <div className='row'>
                  <div className='col-md-12'>
                    <div className='col-md-1'>
                      <button
                        onClick={() => {
                          this.handleForm()
                        }}
                        className=' form-control btn btn-success '
                      >
                        Update
                      </button>
                    </div>

                    <div className='col-md-2'>
                      <button
                        onClick={() => {
                          this.updateSpecific()
                        }}
                        className=' form-control btn btn-warning '
                      >
                        Update Specifics
                      </button>
                    </div>

                    {this.state.listButton == 'show' ? (
                      <React.Fragment>
                        <div className='col-md-2 '>
                          <div class='form-group'>
                            <input
                              placeholder='Enter eBay ID to Force Revise'
                              type='number'
                              value={this.state.revise_ebay_id}
                              onChange={this.handleInput}
                              name='revise_ebay_id'
                              id='revise_ebay_id'
                              class='form-control'
                            />
                          </div>
                        </div>

                        <div class='col-sm-2'>
                          <div class='form-group'>
                            <div class='custom-control custom-checkbox'>
                              <input
                                type='checkbox'
                                id='bestOffer'
                                name='bestOffer'
                                onChange={this.handleCheck}
                                defaultChecked={this.state.checked}
                              />
                              &nbsp;&nbsp;<label>Best Offer Enabled</label>
                            </div>
                          </div>
                        </div>

                        <div className='col-md-1 pull-right'>
                          <div class='form-group'>
                            <input
                              type='button'
                              name='item_list'
                              id='item_list'
                              call='list'
                              itle='List to eBay'
                              className=' form-control btn btn-danger pull-right'
                              onClick={() => {
                                this.listItem('list')
                              }}
                              value='List Item'
                            />
                          </div>
                        </div>
                        {/* <!-- hold barcode modal --> */}
                        <div
                          id='holdBarcodeModal'
                          class='modal modal-info fade'
                          role='dialog'
                          style={{ width: '100%' }}
                        >
                          <div class='modal-dialog' style={{ width: '70%' }}>
                            {/* <!-- Modal content--> */}
                            <div
                              class='modal-content'
                              style={{ width: '100%' }}
                            >
                              <div class='modal-header'>
                                <button
                                  type='button'
                                  class='close'
                                  data-dismiss='modal'
                                >
                                  &times;
                                </button>
                                <h4 class='modal-title'>Details</h4>
                              </div>
                              <div class='modal-body'>
                                <section
                                  class=''
                                  style={{
                                    height: '40px !important',
                                    color: 'black'
                                  }}
                                >
                                  <div class='col-sm-12'>
                                    <div
                                      class='col-sm-6 col-sm-offset-3'
                                      id='errorMessage'
                                    />
                                  </div>
                                </section>
                                <section class='content'>
                                  <div class='row'>
                                    <div class='col-sm-6'>
                                      <div
                                        class='box'
                                        style={{
                                          borderColor: 'blue !important',
                                          color: 'black'
                                        }}
                                      >
                                        <div
                                          class='box-header '
                                          style={{
                                            backgroundColor:
                                              '#60a05b !important',
                                            color: 'black'
                                          }}
                                        >
                                          <h1
                                            class='box-title'
                                            style={{ color: 'black' }}
                                          >
                                            Un-Holded Barcode Detail
                                          </h1>
                                          <div class='box-tools pull-right' />
                                        </div>
                                        <div
                                          style={{ height: '500px' }}
                                          class='box-body form-scroll'
                                        >
                                          <div class='col-sm-12 '>
                                            <BootstrapTable
                                              data={
                                                this.state
                                                  .unholded_barcode_detail
                                              }
                                              options={options}
                                              // striped
                                              search
                                              // hover
                                              pagination
                                              selectRow={selectRowProp}
                                            >
                                              <TableHeaderColumn
                                                dataField='BARCODE_NO'
                                                // dataFormat={this.CellFormatter}
                                                headerAlign='center'
                                                dataAlign='center'
                                                width='50%'
                                                isKey
                                              >
                                                Action
                                              </TableHeaderColumn>

                                              <TableHeaderColumn
                                                dataField='BARCODE_NO'
                                                // dataFormat={imageView}
                                                headerAlign='center'
                                                dataAlign='center'
                                                width='50%'
                                              >
                                                Barcode
                                              </TableHeaderColumn>
                                            </BootstrapTable>
                                            {/* <table
                                              id='unholded_barcode_detail'
                                              class='table table-bordered table-striped '
                                            >
                                              <thead>
                                                <tr>
                                                  <th style={{color: 'black'}}>
                                                    <div>
                                                      <input
                                                        class=''
                                                        name='btSelectAll'
                                                        type='checkbox'
                                                        onclick='toggleUnholdAll(this)'
                                                      />
                                                      &nbsp;Select All
                                                    </div>
                                                  </th>
                                                  <th style={{color: 'black'}}>
                                                    Barcode
                                                  </th>
                                                </tr>
                                              </thead>
                                              <tbody />
                                            </table> */}

                                            <div class='col-sm-1 pull-left p-t-24 holdBarcodeDiv'>
                                              <div class='form-group'>
                                                <input
                                                  type='button'
                                                  class='btn btn-success btn-sm '
                                                  id='1'
                                                  name='holdSelectedBarcode'
                                                  value='Hold'
                                                  title='Hold Selected Barcode'
                                                  onClick={this.unholdeBarcode}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    {/* <!--Holded barcode box start --> */}

                                    <div class='col-sm-6'>
                                      <div
                                        class='box'
                                        style={{
                                          borderColor: 'blue !important',
                                          color: 'black'
                                        }}
                                      >
                                        <div
                                          class='box-header '
                                          style={{
                                            backgroundColor:
                                              '#a72525 !important',
                                            color: 'black'
                                          }}
                                        >
                                          <h1
                                            class='box-title'
                                            style={{ color: 'black' }}
                                          >
                                            Holded Barcode Detail
                                          </h1>
                                          <div class='box-tools pull-right' />
                                        </div>
                                        <div
                                          style={{ height: '500px' }}
                                          class='box-body form-scroll'
                                        >
                                          <div class='col-sm-12 '>
                                            <BootstrapTable
                                              data={
                                                this.state.holded_barcode_detail
                                              }
                                              options={optionsunhold}
                                              // striped
                                              search
                                              // hover
                                              pagination
                                              selectRow={unholdselectRowProp}
                                            >
                                              <TableHeaderColumn
                                                dataField='BARCODE_NO'
                                                // dataFormat={this.CellFormatter}
                                                headerAlign='center'
                                                dataAlign='center'
                                                width='50%'
                                                isKey
                                              >
                                                Action
                                              </TableHeaderColumn>

                                              <TableHeaderColumn
                                                dataField='BARCODE_NO'
                                                // dataFormat={imageView}
                                                headerAlign='center'
                                                dataAlign='center'
                                                width='50%'
                                              >
                                                Barcode
                                              </TableHeaderColumn>
                                            </BootstrapTable>
                                            {/*
                                            <table
                                              id='holded_barcode_detail'
                                              class='table table-bordered table-striped form-scroll'
                                            >
                                              <thead>
                                                <tr>
                                                  <th
                                                    style={{ color: 'black' }}
                                                  >
                                                    <div>
                                                      <input
                                                        class=''
                                                        name='btSelectAll'
                                                        type='checkbox'
                                                        onclick='toggleHoldAll(this)'
                                                      />
                                                      &nbsp;Select All
                                                    </div>
                                                  </th>
                                                  <th
                                                    style={{ color: 'black' }}
                                                  >
                                                    Barcode
                                                  </th>
                                                </tr>
                                              </thead>
                                              <tbody />
                                            </table> */}
                                            <div class='col-sm-1 pull-left p-t-24 UnholdBarcodeDiv'>
                                              <div class='form-group'>
                                                <input
                                                  type='button'
                                                  class='btn btn-success btn-sm'
                                                  id='0'
                                                  name='UnholdBarcode'
                                                  value='Un-Hold'
                                                  title='Un-Hold Selected Barcode'
                                                  onClick={this.holdeBarcode}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    {/* <!--Holded barcode box end --> */}
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <!-- hold barcode modal end --> */}
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <div class='col-sm-2'>
                          <div class='form-group'>
                            <div class='custom-control custom-checkbox'>
                              <input
                                type='checkbox'
                                id='bestOffer'
                                name='bestOffer'
                                onChange={this.handleCheck}
                                defaultChecked={this.state.checked}
                              />
                              &nbsp;&nbsp;<label>Best Offer Enabled</label>
                            </div>
                          </div>
                        </div>

                        <div className='col-md-1 pull-right'>
                          <div class='form-group'>
                            <input
                              type='button'
                              name='item_list'
                              id='item_list '
                              call='revise'
                              title='Revise Item'
                              className='btn btn-success '
                              onClick={() => {
                                this.listItem('revise')
                              }}
                              value='Revise Item'
                            />
                          </div>
                        </div>
                      </React.Fragment>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {this.state.showSpecific ? (
            <div className='row'>
              <div className='col-sm-12'>
                <div className='box box-warning'>
                  <div className='box-header with-border'>
                    <h3 className='box-title'>Item Specifics </h3>
                    <div className='box-tools pull-right'>
                      <button
                        type='button'
                        className='btn btn-danger btn-sm'
                        onClick={() => {
                          this.closeSpecific()
                        }}
                        title='Close'
                      >
                        <i className='fa fa-times' />
                      </button>
                    </div>
                  </div>

                  <div className='box-body'>
                    <div className='row'>
                      <div className='col-sm-12'>
                        <input
                          type='hidden'
                          name='arrayCount'
                          id='arrayCount'
                          value={this.state.arrayCount}
                        />
                        <input
                          type='hidden'
                          name='arrayCat'
                          id='arrayCat'
                          value={this.state.arrayCat}
                        />
                        {makeSpec}
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col-xs-12'>
                        <div className='box-footer' align='right'>
                          <button
                            type='button'
                            className='btn btn-success pull-right'
                            onClick={() => {
                              this.saveSpecific()
                            }}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      {this.state.specs_value ? (
                        // <div className='row'>
                        <div className='col-sm-12'>
                          {this.state.specs_value.map((item, key) => {
                            return (
                              <div class='col-sm-3'>
                                <div class='form-group'>
                                  <label for='' id={'specific_name_' + key}>
                                    {item.SPECIFICS_NAME}
                                  </label>
                                  <input
                                    type='text'
                                    class='form-control'
                                    id={'specific_name_' + key}
                                    name='cat_id'
                                    value={item.SPECIFICS_VALUE}
                                    readonly
                                  />
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      ) // </div>
                        : null}
                    </div>
                    <br />
                    <div className='row'>
                      <div>
                        <div class='col-sm-3'>
                          <button
                            type='button'
                            id='add_attribute'
                            class='btn btn-default btn-block'
                          >
                            Enter your own attribute
                          </button>
                          <br />
                        </div>
                        <div class='specific_attribute'>
                          <div class='col-sm-3'>
                            <select
                              class='form-control '
                              name='spec_name'
                              onChange={this.handleInput}
                              id='spec_name'
                              value={this.state.spec_name}
                            >
                              <option>------------Select------------</option>
                              {this.state.specQueryVal.map(item => {
                                return <option> {item.SPECIFIC_NAME}</option>
                              })}
                            </select>
                          </div>
                          <div class='col-sm-3'>
                            <input
                              class='form-control'
                              type='text'
                              name='custom_attribute'
                              id='custom_attribute'
                              onChange={this.handleInput}
                              value={this.state.custom_attribute}
                              placeholder='Enter your own'
                            />
                          </div>
                          <div class='col-sm-3'>
                            <input
                              type='hidden'
                              class='form-control'
                              id='cat_id'
                              name='cat_id'
                              value={
                                this.state.specQueryVal[0]
                                  ? this.state.specQueryVal[0][
                                    'EBAY_CATEGORY_ID'
                                  ]
                                  : ''
                              }
                            />
                            <input
                              class='form-control'
                              type='hidden'
                              id='bar_code'
                              name='bar_code'
                              value={
                                this.state.item_det[0]
                                  ? this.state.item_det[0]['IT_BARCODE']
                                  : ''
                              }
                            />
                            <input
                              type='hidden'
                              class='form-control'
                              id='item_mpn'
                              name='item_mpn'
                              value={
                                this.state.item_det[0]
                                  ? this.state.item_det[0]['MFG_PART_NO']
                                  : ''
                              }
                            />
                            <input
                              type='hidden'
                              class='form-control'
                              id='item_upc'
                              name='item_upc'
                              value={
                                this.state.item_det[0]
                                  ? this.state.item_det[0]['UPC']
                                  : ''
                              }
                            />
                            <input
                              type='button'
                              name='save_attr'
                              onClick={() => {
                                this.save_attr()
                              }}
                              id='save_attr'
                              class='add-row btn btn-success'
                              value='Save'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div class='col-sm-3'>
                        <button
                          type='button'
                          id='add_attribute'
                          class='btn btn-default btn-block'
                          style={{ color: 'blue' }}
                        >
                          Add your own item specific
                        </button>
                        <br />
                      </div>
                      <div className='col-xs-3'>
                        <input
                          type='text'
                          className='form-control'
                          placeholder='Enter item specific name'
                          id='custom_name'
                          name='custom_name'
                          value={this.state.custom_name}
                          onChange={this.handleInput}
                        />
                        <span>For example, Brand, Material, or Year</span>
                      </div>
                      <div className='col-xs-3'>
                        <input
                          type='text'
                          className='form-control'
                          placeholder='Enter item specific value'
                          id='custom_value'
                          name='custom_value'
                          value={this.state.custom_value}
                          onChange={this.handleInput}
                        />
                        <span>For example, Ty, plastic, or 2007</span>
                      </div>
                      <div className='col-xs-3'>
                        <button
                          type='button'
                          className='btn btn-success '
                          onClick={() => {
                            this.saveCustomSpecific()
                          }}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {/* {this.state.specs_value ? (
            <div className='row'>
              <div className='col-sm-12'>
                <div className='box box-warning'>
                  <div className='box-header with-border'>
                    {this.state.specs_value.map((item, key) => {
                      return (
                        <div class='col-sm-3'>
                          <div class='form-group'>
                            <label for='' id={'specific_name_' + key}>
                              {item.SPECIFICS_NAME}
                            </label>
                            <input
                              type='text'
                              class='form-control'
                              id={'specific_name_' + key}
                              name='cat_id'
                              value={item.SPECIFICS_NAME}
                              readonly
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : null} */}
          <AlertError />
        </React.Fragment>
      ) : (
        'Loadind...'
      )
    }
  }
}

export default LoadSeed
