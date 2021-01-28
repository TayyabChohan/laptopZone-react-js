import {
  GET_POS_FORM_DATA,
  GET_POS_FORM_STATE,
  GET_POS_FORM_STORE_NAME,
  GET_TAX,
  CHANGE_EXEMPT,
  GET_BARCODE_DETAIL_POS,
  OPEN_END_ITEM_MODEL,
  GET_SCAN_BARCODE_DETAIL,
  CHANGE_LINE_TYPE_VALUE,
  CHANGE_COST_PRICE,
  CHANGE_DISCOUNT_PER,
  CHANGE_DISCOUNT_AMOUNT,
  CHANGE_SAVE_BUTTON_PROPS,
  DELETE_POS_BARCODE,
  GET_POS_TOTAL_AMOUNT,
  UNMOUNT_POS_FORM,
  MESSAGE_SERVER,
  CHANGE_ALL_DIS_PER,
  CHANGE_ALL_DIS_AMOUNT,
  SEARCH_FORM_DATA,
  ADD_REPAIR_TO_POS,
  REMOVE_SEARCH_REPAIR_POS_BARCODE,
  CLOSE_END_ITEM_MODEL,
  EBAY_BARCODE_QTY,
  CLOSE_MODEL_ON_SUCCESS
} from './allActionTypes'
import axios from 'axios'
import 'gasparesganga-jquery-loading-overlay'
import $ from 'jquery'
import qs from 'qs'
import { toastr } from 'react-redux-toastr'
import firebase from '../components/firebaseConfig/Firebase.js'

let getUrl = window.location
let finalurl = getUrl.protocol + '//' + getUrl.hostname

export const change_save_button_props = data => {
  return dispatch => {
    dispatch({
      type: CHANGE_SAVE_BUTTON_PROPS,
      button: data.button_status
    })
  }
}
export const pos_form_data = () => {
  return dispatch => {
    $.LoadingOverlay('show')
    axios
      .get(`${finalurl}/laptopzone/reactcontroller/c_haziqreact/pos_form_data`)
      .then(response => {
        // console.log(response)
        $.LoadingOverlay('hide')
        dispatch({
          type: GET_POS_FORM_DATA,
          Doc_No: response.data.Doc_No[0],
          city: response.data.City_State_List.city
        })
      })
      .catch(err => {
        $.LoadingOverlay('hide')
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
  }
}

export const pos_form_state = data => {
  return dispatch => {
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/pos_form_state`
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
          type: GET_POS_FORM_STATE,
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

export const get_pos_store_name = () => {
  return dispatch => {
    $.LoadingOverlay('show')
    axios
      .get(
        `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_pos_store_name`
      )
      .then(response => {
        // console.log(response)
        $.LoadingOverlay('hide')
        dispatch({
          type: GET_POS_FORM_STORE_NAME,
          store_name: response.data.data
        })
      })
      .catch(err => {
        $.LoadingOverlay('hide')
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
  }
}

export const get_tax = data => {
  return dispatch => {
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_tax`
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
        if (response.data.status == true) {
          dispatch({
            type: GET_TAX,
            tax: response.data.data[0]['SALE_TAX']
          })
          dispatch({
            type: GET_POS_TOTAL_AMOUNT
          })
          toastr.success('Success', 'Store Selected Successfully')
        } else {
          dispatch({
            type: GET_TAX,
            tax: response.data.data['SALE_TAX']
          })
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
export const change_exempt = data => {
  return dispatch => {
    dispatch({
      type: CHANGE_EXEMPT,
      response: data
    })
  }
}
export const get_barcode_detail_pos = data => {
  return dispatch => {
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_barcode_detail_pos`
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      url
    }
    axios(options)
      .then(response => {
        // console.log(response)
        if (response.data.status == true) {
          $.LoadingOverlay('hide')
          // dispatch({
          //   type: CHANGE_SAVE_BUTTON_PROPS,
          //   button: false
          // })
          dispatch({
            type: GET_BARCODE_DETAIL_POS,
            barcode: data.barcode,
            response: response.data.data
          })
          dispatch({
            type: GET_POS_TOTAL_AMOUNT
          })
          toastr.success('Success', 'Barcode Added Successfully')
        } else if (response.data.model == true) {
          $.LoadingOverlay('hide')

          dispatch({
            type: OPEN_END_ITEM_MODEL,
            response: true,
            barcode: response.data.barcode,
            ebay_id: response.data.ebay_id
          })
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
}

export const get_scan_barcode_detail = data => {
  return dispatch => {
    // console.log(data.scan_barcode.split('-'))
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_scan_barcode_detail`
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
          const barcode = data.scan_barcode.split('-')
          console.log(barcode[0])

          dispatch({
            type: GET_SCAN_BARCODE_DETAIL,
            barcode: barcode[0],
            buyer_info_pos: response.data.buyer_data,
            table_data: response.data.datatable
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

export const save_invoice_pos = data => {
  return dispatch => {
    // $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/save_invoice_pos`
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      url
    }
    axios(options)
      .then(response => {
        // $.LoadingOverlay('hide')
        if (response.data.status == true) {
          const url =
            `${finalurl}/laptopzone/reactcontroller/c_haziqreact/print_invoice?lz_pos_mt_id=` +
            response.data.lz_pos_mt_id
          window.open(url)
          toastr.success('Success', response.data.message)
          dispatch({
            type: UNMOUNT_POS_FORM
          })
        } else {
          toastr.error('Error', response.data.message)
        }
      })
      .catch(err => {
        // $.LoadingOverlay('hide')
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
  }
}

export const delete_pos_barcode = data => {
  return dispatch => {
    // console.log(data)
    dispatch({
      type: DELETE_POS_BARCODE,
      barcode: data
    })
    dispatch({
      type: GET_POS_TOTAL_AMOUNT
    })
  }
}
export const change_line_type = (data, exempt) => {
  return dispatch => {
    // dispatch({
    //   type: CHANGE_SAVE_BUTTON_PROPS,
    //   button: true
    // })
    dispatch({
      type: CHANGE_LINE_TYPE_VALUE,
      barcode: data.barcode,
      line_type: data.line_type,
      exempt: exempt
    })
  }
}

export const change_cost_price = (data, exempt) => {
  return dispatch => {
    dispatch({
      type: CHANGE_COST_PRICE,
      barcode: data.barcode,
      cost_price: data.cost_price,
      exempt: exempt
    })
  }
}
export const change_Dis_Amount_Perc = (data, exempt) => {
  return dispatch => {
    dispatch({
      type: CHANGE_DISCOUNT_PER,
      barcode: data.barcode,
      dis_per: data.dis_per,
      exempt: exempt
    })
  }
}
export const change_Dis_Amount = (data, exempt) => {
  return dispatch => {
    dispatch({
      type: CHANGE_DISCOUNT_AMOUNT,
      barcode: data.barcode,
      dis_amount: data.dis_amount,
      exempt: exempt
    })
  }
}

export const change_all_dis_amt = (data, exempt) => {
  return dispatch => {
    console.log(data)
    let amount = data.split('$ ') ? data.split('$ ') : data
    amount = amount[1].replace(',', '')
    // console.log(amount)
    dispatch({
      type: CHANGE_ALL_DIS_AMOUNT,
      dis_amount: amount,
      exempt
    })
  }
}

export const change_all_dis_per = (data, exempt) => {
  return dispatch => {
    let amount = data.split('$ ') ? data.split('$ ') : data
    console.log(amount)
    dispatch({
      type: CHANGE_ALL_DIS_PER,
      dis_per: amount[1],
      exempt
    })
  }
}
export const remove_all_unmount = () => {
  return dispatch => {
    dispatch({
      type: UNMOUNT_POS_FORM
    })
  }
}

export const create_charge_stripe = data => {
  return dispatch => {
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/create_charge_stripe`
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
        } else {
          toastr.error('Error', response.data.message)
        }
        // console.log(response)
      })
      .catch(err => {
        $.LoadingOverlay('hide')
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
  }
}

export const search_repair_form = data => {
  return dispatch => {
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/search_repair_form`
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
            type: SEARCH_FORM_DATA,
            response: response.data.data
          })
        } else {
          toastr.error('Error', response.data.message)
        }
        // console.log(response)
      })
      .catch(err => {
        $.LoadingOverlay('hide')
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
  }
}
export const add_repair_to_pos = cell => {
  return dispatch => {
    console.log(cell)
    dispatch({
      type: ADD_REPAIR_TO_POS,
      response: cell
    })
  }
}

export const get_barcodes_aganist_barcode_repair_search = data => {
  return dispatch => {
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_barcodes_aganist_barcode_repair_search`
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
        dispatch({
          type: REMOVE_SEARCH_REPAIR_POS_BARCODE,
          response: response.data
        })
        // console.log(response)
      })
      .catch(err => {
        $.LoadingOverlay('hide')
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
  }
}

export const send_to_FireStore = data => {
  return dispatch => {
    $.LoadingOverlay('show')
    // firebase
    //   .firestore()
    //   .collection('Payment_Gateway')
    //   .get()
    //   .then(snapshot => {
    //     snapshot.forEach(doc => {
    //       firebase
    //         .firestore()
    //         .collection('Payment_Gateway')
    //         .doc(doc.id)
    //         .delete()
    //     })
    firebase
      .firestore()
      .collection('Payment_Gateway')
      .doc(data.doc_no)
      .set({
        DOC_NO: data.doc_no,
        CREATED_BY: data.user_id
      })
      .then(function () {
        $.LoadingOverlay('hide')
        console.log('Document successfully written!')
      })
      .catch(function (error) {
        $.LoadingOverlay('hide')
        console.error('Error writing document: ', error)
      })
    // })
  }
}

export const get_latest_payment = () => {
  return dispatch => {
    let doc = firebase.firestore().collection('Payment_Gateway')

    doc.onSnapshot(
      results => {
        if (results.exists) {
          results.forEach(doc => {
            console.log(doc.id)
          })
        }
      },
      err => {
        console.log(`Encountered error: ${err}`)
      }
    )
  }
}

export const close_model = () => {
  return dispatch => {
    dispatch({
      type: CLOSE_END_ITEM_MODEL,
      response: false
    })
  }
}

export const get_item_qty_aganist_ebay_id = data => {
  return dispatch => {
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_item_qty_aganist_ebay_id`
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
          $.LoadingOverlay('hide')
          dispatch({
            type: EBAY_BARCODE_QTY,
            response: response.data.data
          })
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
}

export const single_item_end = data => {
  return dispatch => {
    console.log(data)
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/single_item_end`
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
        dispatch({
          type: CLOSE_MODEL_ON_SUCCESS
        })
        toastr.success('Success', 'Operation Perform SuccessFully')
      })
      .catch(err => {
        $.LoadingOverlay('hide')
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
  }
}
export const update_multiple_barcode_Qty = data => {
  return dispatch => {
    console.log(data)
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/update_multiple_barcode_Qty`
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
            type: CLOSE_MODEL_ON_SUCCESS
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
