import { GET_PRODUCT_DIMENSION, MESSAGE_SERVER } from './allActionTypes.js'
import qs from 'qs'
import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import $ from 'jquery'

let getUrl = window.location
let finalurl = getUrl.protocol + '//' + getUrl.hostname

export const get_merchant_product = merchant_id => {
  return dispatch => {
    console.log(merchant_id)
    $.LoadingOverlay('show');
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_merchant_product`
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify({ merchant_id }),
      url
    }
    axios(options)
      .then(response => {
        $.LoadingOverlay('hide')
        // if (response.data.status == true) {
        dispatch({
          type: GET_PRODUCT_DIMENSION,
          response: response.data.data
        })
        // }
        // console.log(response)
      })
      .catch(err => {
        $.LoadingOverlay('hide')
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
  }
}
export const update_product_detail = data => {
  return dispatch => {
    console.log(data)
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/update_product_detail`
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      url
    }
    axios(options)
      .then(response => {
        if (response.data.status == true) {
          // toastr.success('Success', response.data.message)
        } else {
          toastr.error('Error', response.data.message)
        }
        console.log(response)
      })
      .catch(err => {
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
  }
}
