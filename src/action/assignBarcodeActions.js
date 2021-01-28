import axios from 'axios'
import 'gasparesganga-jquery-loading-overlay'
import {
  GET_EMPLOYEE_NAME,
  GET_TOTAL_ITEMS,
  LOAD_SPECIAL_LOT_DATA,
  TOGGLE_LOT_BARCODE,
  TOGGLE_LOT_ALL_BARCODE,
  TOGGLE_FILTER_ALL_BARCODE,
  REMOVE_TOGGLE_BARCODES,
  CHANGE_ASSIGN_FILTER,
  MESSAGE_SERVER
} from './allActionTypes.js'
import $ from 'jquery'
import qs from 'qs'
import { toastr } from 'react-redux-toastr'

let getUrl = window.location
let finalurl = getUrl.protocol + '//' + getUrl.hostname

export const get_employee_names = () => {
  return dispatch => {
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_employee_names`
    const options = {
      method: 'GET',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      url
    }
    axios(options)
      .then(response => {
        $.LoadingOverlay('hide')
        dispatch({
          type: GET_EMPLOYEE_NAME,
          response: response.data.employee_name
        })
        console.log(response.data)
      })

      .catch(err => {
        $.LoadingOverlay('hide')
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
  }
}

export const get_unique_count_lot = data => {
  return dispatch => {
    // $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_unique_count_lot`
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      url
    }
    axios(options)
      .then(response => {
        // $.LoadingOverlay('hide')
        dispatch({
          type: GET_TOTAL_ITEMS,
          response: response.data.query_count[0].UNIQ_ITEM
        })

        console.log(response.data)
      })

      .catch(err => {
        // $.LoadingOverlay('hide')
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
  }
}

export const load_special_lots = data => {
  return dispatch => {
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/load_special_lots`
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
            type: LOAD_SPECIAL_LOT_DATA,
            response: response.data.data,
            images: response.data.images
          })
          dispatch({
            type: CHANGE_ASSIGN_FILTER,
            response: data.assignFilter
          })
        } else {
          dispatch({
            type: LOAD_SPECIAL_LOT_DATA,
            response: response.data.data,
            images: response.data.images
          })
          dispatch({
            type: CHANGE_ASSIGN_FILTER,
            response: data.assignFilter
          })
          toastr.error('Error', response.data.message)
        }
        // console.log(response.data)
      })

      .catch(err => {
        $.LoadingOverlay('hide')
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
  }
}

export const load_special_date_lots = data => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/load_special_lots`
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      url
    }
    axios(options)
      .then(response => {
        if (response.data.status == true) {
          dispatch({
            type: LOAD_SPECIAL_LOT_DATA,
            response: response.data.data,
            images: response.data.images
          })
          dispatch({
            type: CHANGE_ASSIGN_FILTER,
            response: data.assignFilter
          })
        } else {
          dispatch({
            type: LOAD_SPECIAL_LOT_DATA,
            response: response.data.data,
            images: response.data.images
          })
          dispatch({
            type: CHANGE_ASSIGN_FILTER,
            response: data.assignFilter
          })
          // toastr.error('Error', response.data.message)
        }
        // console.log(response.data)
      })

      .catch(err => {
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
  }
}

export const combine_pices_specific_barcode = data => {
  return dispatch => {
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/combine_pices_specific_barcode`
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
          toastr.success('Success', response.data.message)
          // dispatch({
          //   type: ASSIGN_BARCODETO_SPECIFIC_BARCODE,
          //   response: response.data.message
          // })
        } else {
          toastr.error('Error', response.data.message)
        }
        console.log(response.data)
      })

      .catch(err => {
        $.LoadingOverlay('hide')
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
  }
}

export const assign_barcode_specific_emp = data => {
  return dispatch => {
    console.log(data)
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/assign_barcode_specific_emp`
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
            type: REMOVE_TOGGLE_BARCODES
          })
          toastr.success('Success', response.data.message)
        } else {
          toastr.error('Error', response.data.message)
        }
        // console.log(response.data)
      })

      .catch(err => {
        $.LoadingOverlay('hide')
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
  }
}
export const change_assign_filter_data = data => {
  return dispatch => {
    dispatch({
      type: CHANGE_ASSIGN_FILTER,
      response: data
    })
  }
}
export const toggle_Function_Barcodes = data => {
  console.log(data)
  return dispatch => {
    dispatch({
      type: TOGGLE_LOT_BARCODE,
      response: data
    })
  }
}
export const toggle_Function_Barcodes_all = (data, select) => {
  return dispatch => {
    dispatch({
      type: TOGGLE_LOT_ALL_BARCODE,
      response: data,
      select: select
    })
  }
}

export const toggle_function_filter = data => {
  return dispatch => {
    dispatch({
      type: TOGGLE_FILTER_ALL_BARCODE,
      response: data.filterData
    })
  }
}
