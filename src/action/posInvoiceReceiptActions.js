import {
  GET_INVOICE_RECEIPT_DETAIL,
  REMOVE_ALL_INVOICE_RECEIPT_DETAIL,
  DELETE_INVOICE_RECEIPT_DETAIL,
  EDIT_INVOICE_RECEIPT_PAYMENT_DETAIL,
  MESSAGE_SERVER
} from './allActionTypes.js'
import axios from 'axios'
import 'gasparesganga-jquery-loading-overlay'
import $ from 'jquery'
import qs from 'qs'
import { toastr } from 'react-redux-toastr'

let getUrl = window.location
let finalurl = getUrl.protocol + '//' + getUrl.hostname

export const get_invoice_receipt_detail = data => {
  return dispatch => {
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_invoice_receipt_detail`
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
        dispatch({
          type: GET_INVOICE_RECEIPT_DETAIL,
          response: response.data.data
        })
      })
      .catch(err => {
        $.LoadingOverlay('hide')
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
  }
}

export const delete_invoice_receipt_detail = data => {
  return dispatch => {
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/delete_invoice_receipt_detail`
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
            type: DELETE_INVOICE_RECEIPT_DETAIL,
            response: data.receipt_id
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

export const edit_invocie_receipt_amount_paid = data => {
  return dispatch => {
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/edit_invocie_receipt_amount_paid`
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
          dispatch({
            type: EDIT_INVOICE_RECEIPT_PAYMENT_DETAIL,
            id: data.receipt_id,
            amount: data.amount
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
export const remove_invoice_receipt_detail = () => {
  return dispatch => {
    dispatch({
      type: REMOVE_ALL_INVOICE_RECEIPT_DETAIL
    })
  }
}
