import {
  GENRATE_SERVICE_BILL,
  GENRATE_PACKING_BILL,
  GET_PACKING_TYPE,
  GET_SERVICE_BILLS,
  DELETE_SERVICE_BILL,
  UPDATE_SERVICE_BILL,
  MESSAGE_SERVER,
  SWEET_ALERT_SUCCESS_MESSAGE,
  SHOW_SUCCESS_TOSTER,
  SWEET_ALERT_ERROR_MESSAGE
} from './allActionTypes.js'
import axios from 'axios'
import qs from 'qs'
import 'gasparesganga-jquery-loading-overlay'
import $ from 'jquery'
import { toastr } from 'react-redux-toastr'

let getUrl = window.location
let finalurl = getUrl.protocol + '//' + getUrl.hostname

export const get_packing_type = () => {
  return dispatch => {
    axios
      .get(
        `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_packing_type`
      )
      .then(response => {
        if (response.data.status == true) {
          dispatch({
            type: GET_PACKING_TYPE,
            response: response.data.data
          })
        }
        // console.log(response.data.data)
      })
      .catch(err => {
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        // console.log(err.message)
      })
  }
}

export const get_service_bill = () => {
  return dispatch => {
    axios
      .get(
        `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_service_bills`
      )
      .then(response => {
        if (response.data.status == true) {
          dispatch({ type: GET_SERVICE_BILLS, response: response.data.data })
        }
        // console.log(response.data.data)
      })
      .catch(err => {
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        // console.log(err.message)
      })
  }
}
export const genrate_service_bill = data => {
  return dispatch => {
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/genrate_service_bill`
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
          // dispatch({
          //   type: SHOW_SUCCESS_TOSTER
          // })
          toastr.success('Success', response.data.message)
          dispatch({
            type: GENRATE_SERVICE_BILL,
            response: response.data.data[0]
          })
        } else {
          dispatch({
            type: SWEET_ALERT_ERROR_MESSAGE,
            response: response.data.message
          })
        }
        // console.log(response)
      })
      .catch(err => {
        $.LoadingOverlay('hide')

        dispatch({ type: MESSAGE_SERVER, response: err.message })
        // console.log(err.message)
      })
  }
}
export const genrate_packing_bill = data => {
  return dispatch => {
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/genrate_packing_bill`
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
          // dispatch({
          //   type: SWEET_ALERT_SUCCESS_MESSAGE,
          //   response: response.data.message
          // })
          toastr.success('Success', response.data.message)

          dispatch({
            type: GENRATE_PACKING_BILL,
            response: response.data.message
          })
        } else {
          dispatch({
            type: SWEET_ALERT_ERROR_MESSAGE,
            response: response.data.message
          })
        }
        // console.log(response)
      })
      .catch(err => {
        $.LoadingOverlay('hide')
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        // console.log(err.message)
      })
  }
}
export const delete_service_bill = data => {
  return dispatch => {
    $.LoadingOverlay('show')
    // console.log(data)
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/delete_service_bill`
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      url
    }
    axios(options)
      .then(response => {
        $.LoadingOverlay('hide')
        // console.log(response)
        dispatch({
          type: DELETE_SERVICE_BILL,
          response: response.data,
          cell_id: data.cell
        })
      })
      .catch(err => {
        $.LoadingOverlay('hide')

        dispatch({ type: MESSAGE_SERVER, response: err.message })
        // console.log(err.message)
      })
  }
}
export const update_service_detail = data => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/update_service_detail`
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      url
    }
    axios(options)
      .then(response => {
        console.log(response)
        if (response.data.status == true) {
          // dispatch({
          //   type: SWEET_ALERT_SUCCESS_MESSAGE,
          //   response: response.data.messgae
          // })
          toastr.success('Success', response.data.messgae)

          dispatch({
            type: UPDATE_SERVICE_BILL,
            response: response.data,
            data
          })
        } else {
          dispatch({
            type: SWEET_ALERT_ERROR_MESSAGE,
            response: response.data.messgae
          })
        }
      })
      .catch(err => {
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        // console.log(err.message)
      })
  }
}
