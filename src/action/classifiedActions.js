import {
  MESSAGE_SERVER,
  SEARCH_CLASSIFIED_AD,
  FILTER_IMAGE_CLASSIFIED
} from './allActionTypes.js'
import axios from 'axios'
import 'gasparesganga-jquery-loading-overlay'
import $ from 'jquery'
import qs from 'qs'
import { toastr } from 'react-redux-toastr'

let getUrl = window.location
let finalurl = getUrl.protocol + '//' + getUrl.hostname


export const get_classified_ad = data => {
  return dispatch => {
    if (data) {
      $.LoadingOverlay('show')
      const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_classified_ad`
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
              type: SEARCH_CLASSIFIED_AD,
              response: response.data.data,
              image: response.data.image
            })
          } else {
            $.LoadingOverlay('hide')
            dispatch({
              type: SEARCH_CLASSIFIED_AD,
              response: response.data.data,
              image: response.data.image
            })
            toastr.error('Error', response.data.message)
          }
          // console.log(response.data.insert_appointment.status)
        })

        .catch(err => {
          $.LoadingOverlay('hide')
          dispatch({ type: MESSAGE_SERVER, response: err.message })
          console.log(err.message)
        })
    }
    $.LoadingOverlay('hide')
  }
}
export const search_classified_ad = data => {
  return dispatch => {
    if (data) {
      $.LoadingOverlay('show')
      const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/search_classified_ad`
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
              type: SEARCH_CLASSIFIED_AD,
              response: response.data.data,
              image: response.data.image
            })
          } else {
            $.LoadingOverlay('hide')
            dispatch({
              type: SEARCH_CLASSIFIED_AD,
              response: response.data.data,
              image: response.data.image
            })
            toastr.error('Error', response.data.message)
          }
          // console.log(response.data.insert_appointment.status)
        })

        .catch(err => {
          $.LoadingOverlay('hide')
          dispatch({ type: MESSAGE_SERVER, response: err.message })
          console.log(err.message)
        })
    }
    $.LoadingOverlay('hide')
  }
}

export const get_pices_specific_ad_id = data => {
  return dispatch => {
    dispatch({
      type: FILTER_IMAGE_CLASSIFIED,
      barcode: data
    })
  }
}
export const update_classified_data = data => {
  return dispatch => {
    if (data) {
      $.LoadingOverlay('show')
      const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/update_classified_data`
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
          console.log(response)
          if (response.data.status == true) {
            toastr.success('Success', response.data.message)
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
    $.LoadingOverlay('hide')
  }
}
