import {
  MESSAGE_SERVER,
  GET_BARCODE_DETAIL_POS_REPAIR_EDIT,
  UPDATE_POS_REPAIRE_FORM,
  CHANGE_LINE_TYPE_REPAIRE_EDIT,
  DELETE_REPAIR_BARCODE_EDIT,
  CHANGE_COST_REPAIRE_EDIT,
  CHANGE_ADVANCE_AMOUNT_EDIT,
  EDIT_UNMOUNT_ALL_DATATABLE_RECORD,
  GET_SPECIFIC_POS_REPAIR_DATA
} from './allActionTypes'
import axios from 'axios'
import 'gasparesganga-jquery-loading-overlay'
import $ from 'jquery'
import qs from 'qs'
import { toastr } from 'react-redux-toastr'

/****************
 *
 *
 *
 * POS REPAIRE EDIT ACTIONS
 *
 *
 *
 */
let getUrl = window.location
let finalurl = getUrl.protocol + '//' + getUrl.hostname
export const update_pos_repaire_data = data => {
  return dispatch => {
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/update_pos_repaire_data`
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
          // const url =
          //   `${finalurl}/laptopzone/reactcontroller/c_haziqreact/genrate_repaire_slip?lz_pos_repaire_id=` +
          //   response.data.id
          // window.open(url)
          dispatch({
            type: UPDATE_POS_REPAIRE_FORM,
            id: response.data.id,
            response: response.data.data
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

export const get_barcode_detail_pos_repair_edit = data => {
  return dispatch => {
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_barcode_detail_pos_repair`
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
            type: GET_BARCODE_DETAIL_POS_REPAIR_EDIT,
            response: response.data.data,
            barcode: data.barcode
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
export const change_line_type_repaire_edit = data => {
  return dispatch => {
    dispatch({
      type: CHANGE_LINE_TYPE_REPAIRE_EDIT,
      barcode: data.barcode,
      line_type: data.line_type
    })
  }
}

export const delete_pos_barcode_repaire_edit = data => {
  return dispatch => {
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/delete_pos_barcode_repaire_edit`
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
          toastr.success('Success', response.data.message)
          dispatch({
            type: DELETE_REPAIR_BARCODE_EDIT,
            barcode: data.barcode
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

export const change_cost_price_repaire_edit = data => {
  return dispatch => {
    dispatch({
      type: CHANGE_COST_REPAIRE_EDIT,
      barcode: data.barcode,
      cost_price: data.cost_price
    })
  }
}
export const change_advance_payment_repaire_edit = data => {
  return dispatch => {
    dispatch({
      type: CHANGE_ADVANCE_AMOUNT_EDIT,
      barcode: data.barcode,
      advance_payment: data.advance_payment
    })
  }
}

export const get_specific_pos_repair_data = data => {
  return dispatch => {
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_specific_pos_repair_data`
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
            type: GET_SPECIFIC_POS_REPAIR_DATA,
            response: response.data.data
            // barcode: data.barcode
          })
        } else {
          dispatch({
            type: GET_SPECIFIC_POS_REPAIR_DATA,
            response: response.data.data
            // barcode: data.barcode
          })
          //   toastr.error('Error', response.data.message)
        }
      })
      .catch(err => {
        $.LoadingOverlay('hide')
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
  }
}
export const edit_unmount = () => {
  return dispatch => {
    dispatch({
      type: EDIT_UNMOUNT_ALL_DATATABLE_RECORD
    })
  }
}
