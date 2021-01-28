import {
  SWEET_ALERT_ERROR_MESSAGE,
  SWEET_ALERT_SUCCESS_MESSAGE,
  MESSAGE_SERVER,
  ADD_NEW_LOT
} from './allActionTypes'
import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import qs from 'qs'

import { GET_MERCHANT_DETAIL } from './allActionTypes'
let getUrl = window.location
let finalurl = getUrl.protocol + '//' + getUrl.hostname

export const save_merchant_lot = data => {
  return dispatch => {
    console.log(data)
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/save_merchant_lot`
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      url
    }
    axios(options)
      .then(response => {
        console.log(response)
        if (response.data.mer_lot_detail.status == true) {
          dispatch({
            type: 'ADD_NEW_LOT',
            response: response.data.new_lot_data.data[0]
          })
          // dispatch({
          //   type: SWEET_ALERT_SUCCESS_MESSAGE,
          //   response: response.data.mer_lot_detail.message
          // })
          toastr.success('Success', response.data.mer_lot_detail.message)
        } else {
          dispatch({
            type: SWEET_ALERT_ERROR_MESSAGE,
            response: response.data.mer_lot_detail.message
          })
        }
      })
      .catch(err => {
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
  }
}
export const getMerchantDetail = data => {
  return dispatch => {
    // console.log(data.mid)
    // console.log(data.user_id)
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_merchant_detail`
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      url
    }
    axios(options)
      .then(response => {
        dispatch({ type: GET_MERCHANT_DETAIL, response: response.data })
        // console.log(response.data)
      })
      .catch(err => {
        console.log(err.message)
      })
  }
}
