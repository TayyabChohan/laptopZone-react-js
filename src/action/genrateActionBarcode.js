import {
  GET_MERCHANT_DETAIL,
  GET_TOTAL_BARCODE,
  REMOVE_TOTAL_BARCODE,
  ADD_BARCODE_NUMBER,
  BARCODE_DETAIL_DATATABLE,
  SWEET_ALERT_SUCCESS_MESSAGE,
  GET_BARCODE_DETAIL,
  MESSAGE_SERVER,
  STORE_BARCODE_DATA,
  DELETE_BARCODE,
  NEW_BARCODE_INSERTED,
  SWEET_ALERT_ERROR_MESSAGE
} from './allActionTypes'
import axios from 'axios'
import qs from 'qs'
import { toastr } from 'react-redux-toastr'
import firebase from '../components/firebaseConfig/Firebase.js'
import 'gasparesganga-jquery-loading-overlay'
import $ from 'jquery'
//  Dynamic Url
let getUrl = window.location
let finalurl = getUrl.protocol + '//' + getUrl.hostname

export const getMerchantDetail = data => {
  return dispatch => {
    console.log(qs.stringify(data))
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
        console.log(response.data)
      })
      .catch(err => {
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
  }
}
export const getTotalBar = lot_id => {
  return dispatch => {
    // console.log(lot_id)
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_total_bar`
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify({ lot_id }),
      url
    }
    axios(options)
      .then(response => {
        dispatch({
          type: GET_TOTAL_BARCODE,
          response: response.data.tot_bar[0],
          lot_id: lot_id
        })
      })
      .catch(err => {
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
  }
}
export const countBarCodeInserted = nunOfBarCode => {
  return dispatch => {
    // console.log(nunOfBarCode)
    dispatch({ type: ADD_BARCODE_NUMBER, totalBarcode: nunOfBarCode })
  }
}
export const printBarCode = data => {
  return dispatch => {
    console.log(data)
    if (data) {
      const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/print_barcode`
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url
      }
      axios(options)
        .then(response => {
          console.log(response.data)
          if (response.data.data.status == true) {
            const url =
              `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_barcode_form_database?mt_id=` +
              response.data.data.MT_ID
            window.open(url)
            // dispatch({
            //   type: SWEET_ALERT_SUCCESS_MESSAGE,
            //   response: response.data.data.message
            // })
            toastr.success('Success', response.data.data.message)
            // console.log(response.data.latest[0]['MERCHANT_ID'])
            response.data.data.barcode.map(item => {
              firebase
                .firestore()
                .collection('Barcodes')
                .doc(item.BARCODE_NO)
                .set({
                  RANGE_ID: response.data.latest[0]['RANGE_ID'],
                  MERCHANT_ID: response.data.latest[0]['MERCHANT_ID'],
                  MERCHANT_NAME: response.data.latest[0]['BUISNESS_NAME']
                })
                .then(function () {
                  console.log('Document successfully written!')
                })
                .catch(function (error) {
                  console.error('Error writing document: ', error)
                })
            })
            dispatch({
              type: STORE_BARCODE_DATA,
              response: response.data.latest[0]
            })
          } else {
            dispatch({
              type: SWEET_ALERT_ERROR_MESSAGE,
              response: response.data.data.message
            })
          }
        })
        .catch(err => {
          dispatch({ type: MESSAGE_SERVER, response: err.message })
          console.log(err.message)
        })
    }
  }
}

export const barcodeDataTable = (mid, user_id, status) => {
  return dispatch => {
    console.log(status)
    $.LoadingOverlay('show')
    // if (user_id) {
    axios
      .get(
        `${finalurl}/laptopzone/reactcontroller/c_haziqreact/gen_barcode_datatable`,
        {
          params: {
            userId: user_id,
            merchant_id: mid,
            record: status
          }
        }
      )
      .then(response => {
        $.LoadingOverlay('hide')
        // console.log(response)
        dispatch({ type: BARCODE_DETAIL_DATATABLE, response: response.data })
      })
      .catch(err => {
        $.LoadingOverlay('hide')
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
    // }
  }
}

// export const allBarcodeDataTable = (mid, user_id, status) => {
//   return dispatch => {
//     // $.LoadingOverlay('show')
//     // // if (user_id) {
//     // axios
//     //   .get(
//     //     `${finalurl}/laptopzone/reactcontroller/c_haziqreact/gen_barcode_datatable`,
//     //     {
//     //       params: {
//     //         userId: user_id,
//     //         merchant_id: mid,
//     //         record:status
//     //       }
//     //     }
//     //   )
//     //   .then(response => {
//     //     $.LoadingOverlay('hide')
//     //     // console.log(response)
//     //     dispatch({ type: BARCODE_DETAIL_DATATABLE, response: response.data })
//     //   })
//     //   .catch(err => {
//     //     $.LoadingOverlay('hide')
//     //     dispatch({ type: MESSAGE_SERVER, response: err.message })
//     //     console.log(err.message)
//     //   })
//     // // }
//   }
// }

export const getBarcodeDetail = cell => {
  return dispatch => {
    console.log(cell)
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_barcode_detail`
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify({ cell }),
      url
    }
    axios(options)
      .then(response => {
        if (response.data.status == true) {
          dispatch({ type: GET_BARCODE_DETAIL, response: response.data.data })
        }
        // console.log(response)
      })
      .catch(err => {
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
  }
}
export const genrateBarcodeByDT_ID = cell => {
  return dispatch => {
    console.log(cell)
    // axios
    //   .get(
    //     `${finalurl}/laptopzone/reactcontroller/c_haziqreact/genrate_barcode_by_dt`
    //   )
    //   .then(response => {
    window.open(
      `${finalurl}/laptopzone/reactcontroller/c_haziqreact/genrate_barcode_by_dt?result=` +
        cell
    )
    // })
    // .catch(err => {
    //   dispatch({ type: MESSAGE_SERVER, response: err.message })
    //   console.log(err.message)
    // })
  }
}
export const genrateAllBarcodes = data => {
  return dispatch => {
    const url =
      `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_barcode_form_database?mt_id=` +
      data
    window.open(url)
  }
}
export const updateCost = data => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/update_cost`
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      url
    }
    if (data.cost <= 0) {
      toastr.error('Error', 'Please enter grater than 0')
    } else {
      axios(options)
        .then(response => {
          toastr.success('success', 'your cost is update')
          // console.log(response)
        })
        .catch(err => {
          dispatch({ type: MESSAGE_SERVER, response: err.message })

          console.log(err.messge)
        })
    }
  }
}
export const removeTotalBar = () => {
  return dispatch => {
    dispatch({
      type: REMOVE_TOTAL_BARCODE
    })
  }
}

export const add_new_barcode = data => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/add_new_barcode`
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
          dispatch({
            type: NEW_BARCODE_INSERTED,
            response: response.data.data,
            mt_id: data.mt_id,
            total_barcode: data.total_barcode
          })
          toastr.success('success', response.data.message)
        } else {
          dispatch({
            type: NEW_BARCODE_INSERTED,
            response: response.data.data,
            mt_id: data.mt_id,
            total_barcode: data.total_barcode
          })
          toastr.error('Error', response.data.message)
        }
      })
      .catch(err => {
        dispatch({ type: MESSAGE_SERVER, response: err.message })

        console.log(err.messge)
      })
  }
}

export const delete_barcode = data => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/delete_barcode`
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
          dispatch({
            type: DELETE_BARCODE,
            response: data.barcode,
            mt_id:data.mt_id
          })
          toastr.success('success', response.data.message)
        } else {
          toastr.error('Error', response.data.message)
        }
      })
      .catch(err => {
        dispatch({ type: MESSAGE_SERVER, response: err.message })

        console.log(err.messge)
      })
  }
}
