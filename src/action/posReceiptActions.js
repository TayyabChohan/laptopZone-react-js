import {
  GET_POS_TABLE_DATA,
  GET_POS_RECEPIT_BY_STORE,
  DELETE_INVOICE,
  POST_POS_INVOICE,
  GET_POS_EDIT_FORM_DATA,
  GET_POS_FORM_STORE_NAME,
  GET_BUYER_INFO_EDIT,
  GET_BARCODE_DETAIL_POS_EDIT,
  DELETE_ALL_POS_iNOVICE,
  POST_ALL_POS_INOVICE,
  UNPOST_ALL_POS_INVOICE,
  MESSAGE_SERVER
} from './allActionTypes'
import axios from 'axios'
import 'gasparesganga-jquery-loading-overlay'
import $ from 'jquery'
import qs from 'qs'
import { toastr } from 'react-redux-toastr'

let getUrl = window.location
let finalurl = getUrl.protocol + '//' + getUrl.hostname

/***
 *
 *
 *    Receipt View Actions
 *
 *
 */
export const pos_receipt_view = () => {
  return dispatch => {
    $.LoadingOverlay('show')
    axios
      .get(
        `${finalurl}/laptopzone/reactcontroller/c_haziqreact/pos_receipt_view`
      )
      .then(response => {
        // console.log(response)
        $.LoadingOverlay('hide')
        dispatch({
          type: GET_POS_TABLE_DATA,
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

export const get_receipt_by_store = data => {
  return dispatch => {
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_receipt_by_store`
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      url
    }
    axios(options)
      .then(response => {
        // console.table(response)
        $.LoadingOverlay('hide')
        dispatch({
          type: GET_POS_RECEPIT_BY_STORE,
          response: response.data.data
        })
        // toastr.success('Success', response.data.message)
      })
      .catch(err => {
        $.LoadingOverlay('hide')
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
  }
}

export const print_invoice = data => {
  return dispatch => {
    const url =
      `${finalurl}/laptopzone/reactcontroller/c_haziqreact/print_invoice?lz_pos_mt_id=` +
      data.lz_pos_mt_id
    window.open(url)
  }
}

export const print_invoice_Epos = data => {
  console.log(data)
  return dispatch => {
    const url =
      `${finalurl}/laptopzone/reactcontroller/c_haziqreact/print_view?lz_pos_mt_id=` +
      data.lz_pos_mt_id
    window.open(url)
    // $.LoadingOverlay('show')
    // const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/print_view`
    // const options = {
    //   method: 'POST',
    //   headers: { 'content-type': 'application/x-www-form-urlencoded' },
    //   data: qs.stringify(data),
    //   url
    // }
    // axios(options)
    //   .then(response => {
    //     console.log(response)
    //     $.LoadingOverlay('hide')

    //     // toastr.success('Success', response.data.message)
    //   })
    //   .catch(err => {
    //     $.LoadingOverlay('hide')
    //     dispatch({ type: MESSAGE_SERVER, response: err.message })
    //     console.log(err.message)
    //   })
  }
}

export const delete_invoice = data => {
  return dispatch => {
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/delete_invoice`
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
          dispatch({
            type: DELETE_INVOICE,
            response: data.lz_pos_mt_id
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

/******
 *
 *
 * Edit Button Receipt View
 *
 */
export const edit_invoice_receipt = data => {
  return dispatch => {
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/edit_invoice_receipt`
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
        if (response.data.buyer_info.status === true) {
          // toastr.success('Success', response.data.message)
          dispatch({
            type: GET_POS_FORM_STORE_NAME,
            store_name: response.data.Store_Name.data
          })
          dispatch({
            type: GET_BARCODE_DETAIL_POS_EDIT,
            response: response.data.table_data.data
          })

          dispatch({
            type: GET_POS_EDIT_FORM_DATA,
            city: response.data.City_State_List.city
            // state: response.data.City_State_List.state
          })
          dispatch({
            type: GET_BUYER_INFO_EDIT,
            response: response.data.buyer_info.data[0]
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
export const toggle_post_unpost_invoice = data => {
  return dispatch => {
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/toggle_post_unpost_invoice`
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
          dispatch({
            type: POST_POS_INVOICE,
            id: data.lz_pos_mt_id,
            response: response.data.data
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
export const delete_all_pos_invoice = data => {
  return dispatch => {
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/delete_all_pos_invoice`
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
          dispatch({
            type: DELETE_ALL_POS_iNOVICE,
            response: response.data.data1
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

export const post_all_pos_invoice = () => {
  return dispatch => {
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/post_all_pos_invoice`
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      url
    }
    axios(options)
      .then(response => {
        $.LoadingOverlay('hide')
        // console.table(response.data.data)
        // if (response.data.status == true) {
        dispatch({
          type: POST_ALL_POS_INOVICE,
          response: response.data.data
        })
        toastr.success('Success', response.data.message)
        // } else {
        //   toastr.error('Error', response.data.message)
        // }
      })
      .catch(err => {
        $.LoadingOverlay('hide')
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
  }
}

export const unpost_all_pos_invoice = () => {
  return dispatch => {
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/unpost_all_pos_invoice`
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      url
    }
    axios(options)
      .then(response => {
        $.LoadingOverlay('hide')
        // console.table(response.data.data)
        // if (response.data.status == true) {
        dispatch({
          type: UNPOST_ALL_POS_INVOICE,
          response: response.data.data
        })
        toastr.success('Success', response.data.message)
        // } else {
        //   toastr.error('Error', response.data.message)
        // }
      })
      .catch(err => {
        $.LoadingOverlay('hide')
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
  }
}

export const edit_invoice_receipt_using_cell = data => {
  return dispatch => {
    const url = `${window.location.origin}/posFormEdit/` + data.lz_pos_mt_id
    window.open(url)
  }
}
