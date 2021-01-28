import {
  GET_INVOICE_ORDER_DATA,
  CLOSE_PANE,
  OPEN_PANE,
  GET_ORDER_BARCODES,
  GET_VERIFIED_INVOICE_ORDER,
  GET_UN_VERIFIED_INVOICE_ORDER,
  GET_ALL_INVOCIE_ORDER,
  VERIFIED_ALL_BARCODE,
  UN_VERIFIED_ALL_BARCODE,
  MESSAGE_SERVER
} from './allActionTypes.js'
import axios from 'axios'
import 'gasparesganga-jquery-loading-overlay'
import $ from 'jquery'
import qs from 'qs'
import { toastr } from 'react-redux-toastr'

let getUrl = window.location
let finalurl = getUrl.protocol + '//' + getUrl.hostname

export const get_order_data = data => {
  return dispatch => {
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_order_data`
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
            type: GET_INVOICE_ORDER_DATA,
            response: response.data.data
          })
          if (data.order_id == '') {
            dispatch({
              type: OPEN_PANE
            })
          } else {
            dispatch({
              type: GET_ORDER_BARCODES,
              response: response.data.barcode,
              order_id: data.order_id
            })
          }
        } else {
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

export const close_pane = () => {
  return dispatch => {
    dispatch({
      type: CLOSE_PANE
    })
  }
}

export const get_order_id_barcode = data => {
  return dispatch => {
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_order_id_barcode`
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
            type: GET_ORDER_BARCODES,
            response: response.data.data,
            order_id: data.order_id
          })
          dispatch({
            type: CLOSE_PANE
          })
        } else {
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
export const verified_all_barcode = data => {
  return dispatch => {
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/verified_all_barcode`
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
            type: VERIFIED_ALL_BARCODE,
            response: response.data.data[0].USER_NAME
          })
          toastr.success('Success', response.data.message)
        } else {
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
export const un_verified_all_barcode = data => {
  return dispatch => {
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/un_verified_all_barcode`
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
            type: UN_VERIFIED_ALL_BARCODE,
            response: response.data.data[0].USER_NAME
          })
          toastr.success('Success', response.data.message)
        } else {
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

export const get_Verify = () => {
  return dispatch => {
    dispatch({
      type: GET_VERIFIED_INVOICE_ORDER
    })
  }
}

export const get_UnVerify = () => {
  return dispatch => {
    dispatch({
      type: GET_UN_VERIFIED_INVOICE_ORDER
    })
  }
}

export const get_all_record = () => {
  return dispatch => {
    dispatch({
      type: GET_ALL_INVOCIE_ORDER
    })
  }
}
