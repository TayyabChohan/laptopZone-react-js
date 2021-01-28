import {
  CHANGE_EXEMPT_EDIT,
  CHANGE_LINE_TYPE_VALUE_EDIT,
  CHANGE_COST_PRICE_EDIT,
  CHANGE_DISCOUNT_PER_EDIT,
  OPEN_END_ITEM_MODEL,
  CHANGE_DISCOUNT_AMOUNT_EDIT,
  GET_BARCODE_EDIT_DETAIL_POS,
  GET_TAX_EDIT,
  DELETE_POS_BARCODE_EDIT,
  GET_POS_TOTAL_AMOUNT_EDIT,
  REMOVE_ALL_EDIT_UNMOUNT,
  MESSAGE_SERVER,
  CHANGE_ALL_DIS_AMOUNT_EDIT,
  CHANGE_ALL_DIS_PER_EDIT,
  CHANGE_POS_DETAIL_USING_TAX
} from './allActionTypes'
import axios from 'axios'
import 'gasparesganga-jquery-loading-overlay'
import $ from 'jquery'
import qs from 'qs'
import { toastr } from 'react-redux-toastr'
// import { bindActionCreators } from 'C:/Users/Ecologix/AppData/Local/Microsoft/TypeScript/3.5/node_modules/redux'

let getUrl = window.location
let finalurl = getUrl.protocol + '//' + getUrl.hostname

/******
 *
 *
 *  Edit Invoice POS Actions
 *
 *
 *
 */
export const change_exempt_edit = data => {
  return dispatch => {
    dispatch({
      type: CHANGE_EXEMPT_EDIT,
      response: data
    })
  }
}
export const update_invoice_pos = data => {
  return dispatch => {
    // $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/update_invoice_pos`
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      url
    }
    axios(options)
      .then(response => {
        // $.LoadingOverlay('hide')
        if (response.data.status == true) {
          toastr.success('Success', response.data.message)
          const url =
            `${finalurl}/laptopzone/reactcontroller/c_haziqreact/print_invoice?lz_pos_mt_id=` +
            response.data.id
          window.open(url)
        } else {
          toastr.error('Error', response.data.message)
        }
      })
      .catch(err => {
        // $.LoadingOverlay('hide')
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
  }
}

export const get_barcode_detail_pos_edit = data => {
  return dispatch => {
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_barcode_detail_pos`
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      url
    }
    axios(options)
      .then(response => {
        // console.log(response)
        $.LoadingOverlay('hide')
        if (response.data.status == true) {
          dispatch({
            type: GET_BARCODE_EDIT_DETAIL_POS,
            barcode: data.barcode,
            response: response.data.data
          })
          dispatch({
            type: CHANGE_POS_DETAIL_USING_TAX,
            response: data.exempt
          })
          dispatch({
            type: CHANGE_EXEMPT_EDIT,
            response: data.exempt
          })
          toastr.success('Success', 'Barcode Added Successfully')
        } else if (response.data.model == true) {
          $.LoadingOverlay('hide')

          dispatch({
            type: OPEN_END_ITEM_MODEL,
            response: true,
            barcode: response.data.barcode,
            ebay_id: response.data.ebay_id
          })
        } else {
          $.LoadingOverlay('hide')

          toastr.error('Error', response.data.message)
        }
      })
      .catch(err => {
        $.LoadingOverlay('hide')
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
  }
}

export const get_tax_edit = (data, exempt) => {
  return dispatch => {
    if (exempt == false) {
      $.LoadingOverlay('show')
      const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_tax`
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url
      }
      axios(options)
        .then(response => {
          console.log(response)
          $.LoadingOverlay('hide')
          if (response.data.status == true) {
            dispatch({
              type: GET_TAX_EDIT,
              tax: response.data.data[0]['SALE_TAX']
            })
            toastr.success('Success', 'Store Selected Successfully')
          } else {
            dispatch({
              type: GET_TAX_EDIT,
              tax: response.data.data['SALE_TAX']
            })
            toastr.error('Error', response.data.message)
          }
        })
        .catch(err => {
          $.LoadingOverlay('hide')
          dispatch({ type: MESSAGE_SERVER, response: err.message })
          console.log(err.message)
        })
    }
  }
}
export const get_scan_barcode_detail_edit = data => {
  return dispatch => {
    // $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_scan_barcode_detail_edit`
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      url
    }
    axios(options)
      .then(response => {
        $.LoadingOverlay('hide')
        if (response.data.status == true) {
          const barcode = data.scan_barcode.split('-')
          console.log(barcode[0])
          dispatch({
            type: GET_BARCODE_EDIT_DETAIL_POS,
            barcode: barcode[0],
            response: response.data.datatable
          })
          dispatch({
            type: CHANGE_POS_DETAIL_USING_TAX,
            response: data.exempt
          })
          dispatch({
            type: CHANGE_EXEMPT_EDIT,
            response: data.exempt
          })
        } else {
          toastr.error('Error', response.data.message)
        }
        console.log(response)
      })
      .catch(err => {
        $.LoadingOverlay('hide')
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
  }
}

export const change_line_type_edit = data => {
  return dispatch => {
    dispatch({
      type: CHANGE_LINE_TYPE_VALUE_EDIT,
      barcode: data.barcode,
      line_type: data.line_type
    })
  }
}

export const change_cost_price_edit = data => {
  return dispatch => {
    dispatch({
      type: CHANGE_COST_PRICE_EDIT,
      barcode: data.barcode,
      cost_price: data.cost_price
    })
    dispatch({
      type: CHANGE_EXEMPT_EDIT,
      response: data.exempt
    })
  }
}
export const change_Dis_Amount_Perc_edit = data => {
  return dispatch => {
    dispatch({
      type: CHANGE_DISCOUNT_PER_EDIT,
      barcode: data.barcode,
      dis_per: data.dis_per
    })
    dispatch({
      type: CHANGE_EXEMPT_EDIT,
      response: data.exempt
    })
  }
}
export const change_Dis_Amount_edit = data => {
  return dispatch => {
    dispatch({
      type: CHANGE_DISCOUNT_AMOUNT_EDIT,
      barcode: data.barcode,
      dis_amount: data.dis_amount
    })
    dispatch({
      type: CHANGE_EXEMPT_EDIT,
      response: data.exempt
    })
  }
}

export const delete_pos_barcode_edit = (cell, exempt, data) => {
  return dispatch => {
    console.log(data.barcode)
    if (data.id !== null) {
      $.LoadingOverlay('show')
      const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/delete_pos_barcode_edit`
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url
      }
      axios(options)
        .then(response => {
          $.LoadingOverlay('hide')
          console.log(response)
        })
        .catch(err => {
          $.LoadingOverlay('hide')
          console.log(err.message)
        })
    }
    $.LoadingOverlay('hide')
    dispatch({
      type: DELETE_POS_BARCODE_EDIT,
      barcode: cell
    })
    dispatch({
      type: GET_POS_TOTAL_AMOUNT_EDIT,
      response: exempt
    })
    dispatch({
      type: CHANGE_EXEMPT_EDIT,
      response: exempt
    })
  }
}
export const change_all_dis_amt_edit = (data, exempt) => {
  return dispatch => {
    let amount = data.split('$ ') ? data.split('$ ') : data
    amount = amount[1].replace(',', '')
    // console.log(amount)
    dispatch({
      type: CHANGE_ALL_DIS_AMOUNT_EDIT,
      dis_amount: amount,
      exempt
    })
    dispatch({
      type: CHANGE_EXEMPT_EDIT,
      response: exempt
    })
  }
}
export const change_all_dis_per_edit = (data, exempt) => {
  return dispatch => {
    let amount = data.split('$ ') ? data.split('$ ') : data
    dispatch({
      type: CHANGE_ALL_DIS_PER_EDIT,
      dis_per: amount[1],
      exempt
    })
    dispatch({
      type: CHANGE_EXEMPT_EDIT,
      response: exempt
    })
  }
}

export const change_sale_tax = exempt => {
  return dispatch => {
    console.log(exempt)
    dispatch({
      type: CHANGE_POS_DETAIL_USING_TAX,
      response: exempt
    })
  }
}
export const Remove_Edit = () => {
  return dispatch => {
    dispatch({
      type: REMOVE_ALL_EDIT_UNMOUNT
    })
  }
}
