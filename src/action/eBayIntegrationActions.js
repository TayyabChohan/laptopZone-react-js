import {
  E_BAY_STORE_NAME,
  BUTTON_LOADER_START,
  BUTTON_LOADER_END,
  CLOSE_MESSAGES,
  SWEET_ALERT_ERROR_MESSAGE,
  SWEET_ALERT_SUCCESS_MESSAGE,
  MESSAGE_SERVER,
  E_BAY_SAVE_STORE_NAME,
  E_BAY_SELECT_ALL_STORE_DATA,
  E_BAY_SELECT_ALL_STORE_DATA_START,
  TOKEN_UPDATED,
  // ALERT_MESSAGE,
  ACCOUNT_TOGGLE_FUNCTION,
  GET_PORTAL_NAME,
  SELLER_ACCOUNT_TOGGLE_FUNCTION
  // ALERT_SUCCESS_MESSAGE_ALERT
} from './allActionTypes.js'
import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import qs from 'qs'
import $ from 'jquery'

//  GET DYNAMIC LOCATION OF URL
let getUrl = window.location
let finalurl = getUrl.protocol + '//' + getUrl.hostname
// END DYNAMIC LOCATION OF URL

export const get_portal_name = () => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_portal`
      const options = {
        method: 'GET',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url
      }
    axios(options)
      .then(response => {
        dispatch({ type: GET_PORTAL_NAME, response: response.data })
      })
      .catch(err => {
        dispatch({ type: MESSAGE_SERVER, response: err.message })
      })
  }
}

export const e_Bay_Store_Name = data => {
  return dispatch => {
    if (data) {
      const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_store_name`
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url
      }
      axios(options)
        .then(response => {
          // response.data
          if (response.data.status === true) {
            dispatch({
              type: E_BAY_STORE_NAME,
              response: response.data.message
            })
          } else {
            // dispatch({
            //   type: SWEET_ALERT_ERROR_MESSAGE,
            //   response: response.data.message
            // })
          }
        })
        .catch(err => {
          dispatch({ type: MESSAGE_SERVER, response: err.message })
        })
    } else {
      dispatch({
        type: SWEET_ALERT_ERROR_MESSAGE,
        response: 'Please Fill the Field'
      })
    }
  }
}

export const e_Bay_Save_Store_Name = data => {
  return dispatch => {
    // console.log(data)
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/save_store_name`
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      url
    }
    axios(options)
      .then(response => {
        if (response.data.status === true) {
          dispatch({
            type: E_BAY_SAVE_STORE_NAME,
            response: response.data.message,
            default_merchant: data.default_merchant,
            merchant_id: data.marchantid
          })
          // dispatch({type:ALERT_MESSAGE, response:response.data.data});
          // dispatch({
          //   type: SWEET_ALERT_SUCCESS_MESSAGE,
          //   response: response.data.data
          // })
          toastr.success('Success', response.data.data)
        } else {
          dispatch({
            type: SWEET_ALERT_ERROR_MESSAGE,
            response: response.data.message
          })
        }
      })
      .catch(err => {
        dispatch({ type: MESSAGE_SERVER, response: err.message })
      })
  }
}

export const e_Bay_Select_All_Store_Data = (merchant_id, user_id) => {
  return dispatch => {
    console.log(merchant_id)
    dispatch({ type: E_BAY_SELECT_ALL_STORE_DATA_START })
    axios
      .get(
        `${finalurl}/laptopzone/reactcontroller/c_haziqreact/select_all_store_name`,
        {
          params: {
            mid: merchant_id,
            user_id: user_id
          }
        }
      )
      .then(response => {
        if (response.data.status === true) {
          // console.log(response.data.message)
          dispatch({
            type: E_BAY_SELECT_ALL_STORE_DATA,
            response: response.data.message,
            data: response.data.data
          })
        }
        // else {
        //   dispatch({ type: SWEET_ALERT_ERROR_MESSAGE, response: 'No Record Fetch' })
        // }
      })
      .catch(err => {
        dispatch({ type: MESSAGE_SERVER, response: err.message })
      })
  }
}

export const e_Bay_Session_Id = (id, mid, acct_id) => {
  return dispatch => {
    dispatch({
      type: BUTTON_LOADER_START,
      acct_id,
      button_name: 'generate_token'
    })
    axios
      .get(`${finalurl}/laptopzone/listing/listing/GetSessionID`, {
        params: {
          id: id,
          mid: mid,
          acct_id: acct_id
        }
      })
      .then(response => {
        dispatch({
          type: BUTTON_LOADER_END,
          acct_id,
          button_name: 'generate_token'
        })
        if (response.data.status === true) {
          // dispatch({
          //   type: SWEET_ALERT_SUCCESS_MESSAGE,
          //   response: response.data.session_success
          // })
          toastr.success('Success', response.data.session_success)
          dispatch(signin_eBay(acct_id))
          // console.log(response)
        } else {
          dispatch({
            type: BUTTON_LOADER_END,
            acct_id,
            button_name: 'generate_token'
          })
          dispatch({
            type: SWEET_ALERT_ERROR_MESSAGE,
            response: response.data.ShortMessage
          })
        }
      })
      .catch(err => {
        dispatch({
          type: BUTTON_LOADER_END,
          acct_id,
          button_name: 'generate_token'
        })
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
  }
}

function signin_eBay (acct_id) {
  return dispatch => {
    // console.log(acct_id)
    dispatch({
      type: BUTTON_LOADER_START,
      acct_id,
      button_name: 'generate_token'
    })
    axios
      .get(`${finalurl}/laptopzone/reactcontroller/c_haziqreact/signin_ebay`, {
        params: {
          acct_id: acct_id
        }
      })
      .then(response => {
        dispatch({
          type: BUTTON_LOADER_END,
          acct_id,
          button_name: 'generate_token'
        })
        if (response.data.status === true) {
          const url =
            'https://signin.ebay.com/ws/eBayISAPI.dll?SignIn&RUName=' +
            response.data.runame +
            '&SessID=' +
            response.data.session_id
          window.open(url)
        } else {
          dispatch({
            type: BUTTON_LOADER_END,
            acct_id,
            button_name: 'generate_token'
          })
          dispatch({
            type: SWEET_ALERT_ERROR_MESSAGE,
            response: response.data.message
          })
          // console.log(response.data)
        }
      })
      .catch(err => {
        dispatch({
          type: BUTTON_LOADER_END,
          acct_id,
          button_name: 'generate_token'
        })
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
  }
}

export const e_Bay_Fetch_Token = (id, mid, acct_id) => {
  return dispatch => {
    // console.log(mid, acct_id)
    dispatch({ type: BUTTON_LOADER_START, acct_id, button_name: 'fetch_token' })
    axios
      .get(`${finalurl}/laptopzone/listing/listing/FetchToken`, {
        params: {
          id: id,
          mid: mid,
          acct_id: acct_id
        }
      })
      .then(response => {
        // console.log(response.data)
        dispatch({
          type: BUTTON_LOADER_END,
          acct_id,
          button_name: 'fetch_token'
        })
        let error = ''
        if (response.data.ErrorCode == 21916017) {
          error = 'Please Login ebay Account'
          dispatch({ type: SWEET_ALERT_ERROR_MESSAGE, response: error })
        } else if (response.data.ErrorCode == 21916016) {
          error = 'Please First Generate Token'
          dispatch({ type: SWEET_ALERT_ERROR_MESSAGE, response: error })
          // console.log(response.data);
        } else if (response.data.errorToken) {
          dispatch({
            type: SWEET_ALERT_ERROR_MESSAGE,
            response: response.data.errorToken
          })
        } else if (response.data.tokenSuccess) {
          dispatch({
            type: SWEET_ALERT_SUCCESS_MESSAGE,
            response: response.data.tokenSuccess
          })
          dispatch({
            type: TOKEN_UPDATED,
            expirydata: response.data.expirydata,
            token: response.data.token,
            acct_id: acct_id
          })
          // console.log(response.data)
        }
      })
      .catch(err => {
        dispatch({
          type: BUTTON_LOADER_END,
          acct_id,
          button_name: 'fetch_token'
        })
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
  }
}

export const accountToggleFunction = (acct_id, merchant_status) => {
  return dispatch => {
    // console.log(acct_id, merchant_status)
    $.LoadingOverlay('show')

    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/updatestorestatus`
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify({ acct_id, merchant_status }),
      url
    }
    axios(options)
      .then(response => {
        $.LoadingOverlay('hide')

        dispatch({ type: ACCOUNT_TOGGLE_FUNCTION, response: acct_id })
        console.log(response)
        if (response.data.status === true) {
          $.LoadingOverlay('hide')

          // dispatch({
          //   type: SWEET_ALERT_SUCCESS_MESSAGE,
          //   response: response.data.message
          // })
          toastr.success('Success', response.data.message)
        } else {
          $.LoadingOverlay('hide')

          dispatch({
            type: SWEET_ALERT_ERROR_MESSAGE,
            response: response.data.message
          })
        }
      })
      .catch(err => {
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
  }
}

export const defaultStoreToggleFunction = (
  acct_id,
  default_merchant,
  merchant_id,
  user_id
) => {
  return dispatch => {
    // console.log(acct_id)
    // console.log(default_merchant)
    // console.log(merchant_id)
    $.LoadingOverlay('show')

    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/set_default_store_name`
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify({ acct_id, default_merchant, merchant_id, user_id }),
      url
    }
    axios(options)
      .then(response => {
        $.LoadingOverlay('hide')
        dispatch({
          type: SELLER_ACCOUNT_TOGGLE_FUNCTION,
          response: acct_id,
          mid: merchant_id,
          default_merchant_status: default_merchant
        })
        // console.log(response)
        if (response.data.status === true) {
          // dispatch({
          //   type: SWEET_ALERT_SUCCESS_MESSAGE,
          //   response: response.data.message
          // })
          $.LoadingOverlay('hide')

          toastr.success('Success', response.data.message)
        } else {
          $.LoadingOverlay('hide')

          dispatch({
            type: SWEET_ALERT_ERROR_MESSAGE,
            response: response.data.message
          })
        }
      })
      .catch(err => {
        $.LoadingOverlay('hide')

        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
  }
}
export const closeErrorMessage = () => {
  return dispatch => {
    dispatch({ type: CLOSE_MESSAGES })
  }
}

export const e_bay = () => {
  return dispatch => {
    console.log('hello')
  }
}
