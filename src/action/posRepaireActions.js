import {
  GET_POS_REPAIRE_FORM_DATA,
  MESSAGE_SERVER,
  GET_POS_FORM_STATE_EDIT,
  UPDATE_POS_REPAIRE_FORM,
  SAVE_POS_REPAIRE_DATA,
  DELETE_POS_REPAIRE_DATA,
  GET_BARCODE_DETAIL_POS_REPAIR,
  CHANGE_LINE_TYPE_REPAIRE,
  DELETE_REPAIR_BARCODE,
  CHANGE_COST_REPAIRE,
  CHANGE_ADVANCE_AMOUNT
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
 * POS REPAIRE ACTIONS
 *
 *
 *
 */
let getUrl = window.location
let finalurl = getUrl.protocol + '//' + getUrl.hostname

export const save_pos_repaire_data = data => {
  return dispatch => {
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/save_pos_repaire_data`
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
          const url =
            `${finalurl}/laptopzone/reactcontroller/c_haziqreact/genrate_repaire_slip?lz_pos_repaire_id=` +
            response.data.id
          window.open(url)
          dispatch({
            type: SAVE_POS_REPAIRE_DATA,
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

export const repaire_pos_data = () => {
  return dispatch => {
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/repaire_pos_data`
    const options = {
      method: 'GET',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      url
    }
    axios(options)
      .then(response => {
        $.LoadingOverlay('hide')
        if (response.data.status == true) {
          dispatch({
            type: GET_POS_REPAIRE_FORM_DATA,
            response: response.data.data
          })
        } else {
          // toastr.error('Error', response.data.message)
        }
      })
      .catch(err => {
        $.LoadingOverlay('hide')
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
  }
}
export const pos_form_state_edit = data => {
  return dispatch => {
    // console.log(data)
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/pos_form_state_edit`
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
          type: GET_POS_FORM_STATE_EDIT,
          state: response.data.state
        })
      })
      .catch(err => {
        $.LoadingOverlay('hide')
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
  }
}

export const print_pos_repaire = data => {
  return dispatch => {
    const url =
      `${finalurl}/laptopzone/reactcontroller/c_haziqreact/genrate_repaire_slip?lz_pos_repaire_id=` +
      data.id
    window.open(url)
  }
}
// export const update_pos_repaire_data = data => {
//   return dispatch => {
//     $.LoadingOverlay('show')
//     const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/update_pos_repaire_data`
//     const options = {
//       method: 'POST',
//       headers: { 'content-type': 'application/x-www-form-urlencoded' },
//       data: qs.stringify(data),
//       url
//     }
//     axios(options)
//       .then(response => {
//         console.log(response)
//         $.LoadingOverlay('hide')
//         if (response.data.status == true) {
//           // const url =
//           //   `${finalurl}/laptopzone/reactcontroller/c_haziqreact/genrate_repaire_slip?lz_pos_repaire_id=` +
//           //   response.data.id
//           // window.open(url)
//           dispatch({
//             type: UPDATE_POS_REPAIRE_FORM,
//             id: response.data.id,
//             response: response.data.data
//           })
//           toastr.success('Success', response.data.message)
//         } else {
//           toastr.error('Error', response.data.message)
//         }
//       })
//       .catch(err => {
//         $.LoadingOverlay('hide')
//         dispatch({ type: MESSAGE_SERVER, response: err.message })
//         console.log(err.message)
//       })
//   }
// }

export const delete_pos_repaire_data = data => {
  return dispatch => {
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/delete_pos_repaire_data`
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
            type: DELETE_POS_REPAIRE_DATA,
            id: data.id
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

export const get_barcode_detail_pos_repair = data => {
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
            type: GET_BARCODE_DETAIL_POS_REPAIR,
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

export const change_line_type_repaire = data => {
  return dispatch => {
    dispatch({
      type: CHANGE_LINE_TYPE_REPAIRE,
      barcode: data.barcode,
      line_type: data.line_type
    })
  }
}

export const delete_pos_barcode_repaire = data => {
  return dispatch => {
    dispatch({
      type: DELETE_REPAIR_BARCODE,
      barcode: data
    })
  }
}

export const change_cost_price_repaire = data => {
  return dispatch => {
    dispatch({
      type: CHANGE_COST_REPAIRE,
      barcode: data.barcode,
      cost_price: data.cost_price
    })
  }
}
export const change_advance_payment_repaire = data => {
  return dispatch => {
    dispatch({
      type: CHANGE_ADVANCE_AMOUNT,
      barcode: data.barcode,
      advance_payment: data.advance_payment
    })
  }
}
