import axios from 'axios'
import {
  MERCHANT_BARCODE_CHECK,
  MERCHANT_UNPOSTED_BARCODE_CHECK,
  MESSAGE_SERVER,
  DELETE_BARCODE_FROM_LOT,
  DELETE_UNPOSTED_BARCODE_FROM_LOT,
  ITEM_COND_DETAIL,
  OBJECT_COND_DETAIL,
  ADD_NEW_OBJECT,
  RANGE_BARCODE_CHECK,
  UNPOSTED_RANGE_BARCODE_CHECK,
  ADD_IMAGE_TO_LOT,
  ADD_IMAGE_TO_UNPOST_LOT,
  UNSELECT_ALL_IMAGES,
  UNSELECT_ALL_UNPOST_IMAGES,
  CHANGE_SAVE_LOT_BUTTON_PROP,
  SUGESTED_CATEGORY,
  REMOVE_SUGGEST_CATEGORY,
  CHANGE_SAVE_UNPOSTEDLOT_BUTTON_PROP,
  CHANGE_SAVE_LOT_BUTTON_SOWL,
  CHANGE_SAVE_UNPOSTEDLOT_BUTTON_SOWL,
  CLOSE_MESSAGES
} from './allActionTypes'
import 'gasparesganga-jquery-loading-overlay'
import $ from 'jquery'
import qs from 'qs'
import { toastr } from 'react-redux-toastr'

let getUrl = window.location
let finalurl = getUrl.protocol + '//' + getUrl.hostname

export const get_lot_barcode_Id = data => {
  const barcode = data.map(item => {
    return item.BARCODE_NO
  })
  return barcode[0]
}
export const get_lot_unpost_barcode_Id = data => {
  const barcode = data.map(item => {
    return item.BARCODE
  })
  return barcode[0]
}
export const get_lot_barcode_detail = (barcode, merchant_name) => {
  return dispatch => {
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_lot_barcode_detail`
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify({ barcode }),
      url
    }
    axios(options)
      .then(response => {
        $.LoadingOverlay('hide')
        // console.log(response)
        if (response.data.status == true) {
          const dataExist = get_lot_barcode_Id(response.data.data)
          if (
            merchant_name == response.data.merchant_detail[0].CONTACT_PERSON ||
            merchant_name == ''
          ) {
            dispatch({
              type: MERCHANT_BARCODE_CHECK,
              merchant_detail: response.data.merchant_detail,
              data: response.data.data,
              images: response.data.images,
              barcode: dataExist
            })
            toastr.success('Success', 'Barcode Added Successfully')
          } else {
            toastr.error('Error', 'This barcode is from another merchant')
          }
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

export const add_Image_Lot = data => {
  // console.log(data)
  return dispatch => {
    if (data.length !== 0) {
      dispatch({ type: ADD_IMAGE_TO_LOT, response: data })
    }
  }
}

export const get_lot_range_barcode_detail = (data, merchant_name) => {
  return dispatch => {
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_lot_range_barcode_detail`
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
        if (response.data.status == false) {
          toastr.error('Error', response.data.message)
        }
        if (response.data.error) {
          response.data.error.map(item => {
            toastr.error('Error', item.message)
          })
        } else {
          let image = []
          response.data.images.map(item => {
            item.map(ite => {
              image.push(ite)
            })
          })
          let data = []
          response.data.data.map(item => {
            item.map(ite => {
              data.push(ite)
            })
          })
          console.log(data)
          // console.log(image)
          dispatch({
            type: RANGE_BARCODE_CHECK,
            // data: response.data.data,
            data: data,
            merchant_name: response.data.merchant_name,
            images: image
          })

          toastr.success('Success', 'Barcode Added Successfully')
        }
        // console.log(response.data.merchant_name[0])
        // console.log(response)
      })
      .catch(err => {
        $.LoadingOverlay('hide')
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
  }
}
export const get_item_cond = () => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_item_cond`
    const options = {
      mehtod: 'GET',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      url
    }
    axios(options)
      .then(res => {
        dispatch({ type: ITEM_COND_DETAIL, response: res.data.data })
      })
      .catch(err => {
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
  }
}

export const get_object_cond = () => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_object_cond`
    const options = {
      mehtod: 'GET',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      url
    }
    axios(options)
      .then(res => {
        // console.log(res)
        dispatch({ type: OBJECT_COND_DETAIL, response: res.data.data })
      })
      .catch(err => {
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
  }
}
export const save_lot_data = data => {
  return dispatch => {
    // console.log(data)
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/save_lot_data`
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      url
    }
    axios(options)
      .then(response => {
        if (response.data.status == true) {
          toastr.success('Success', response.data.message)
        } else {
          toastr.error('Error', response.data.message)
        }
        console.log(response)
      })
      .catch(err => {
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
  }
}

export const create_lot_object = data => {
  // console.log(data)
  return dispatch => {
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/create_lot_object`
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
          dispatch({ type: ADD_NEW_OBJECT, response: response.data.data })
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

export const suggest_lot_categories = data => {
  return dispatch => {
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/suggest_lot_categories`
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      url
    }
    axios(options)
      .then(response => {
        $.LoadingOverlay('hide')
        if (response.data.Ack == 'Success') {
          dispatch({
            type: SUGESTED_CATEGORY,
            response: response.data.SuggestedCategoryArray.SuggestedCategory.map(
              item => item.Category
            )
          })
          console.log(
            response.data.SuggestedCategoryArray.SuggestedCategory.map(
              item => item.Category
            )
          )
        } else {
          toastr.error('Error', 'Please Insert KeyWord')
        }
      })
      .catch(err => {
        $.LoadingOverlay('hide')
        console.log(err.message)
      })
  }
}

export const remove_suggest_category = () => {
  return dispatch=> {
    dispatch({type:REMOVE_SUGGEST_CATEGORY})
  }
}
export const delete_Barcode_From_Lot = (barcode, key) => {
  return dispatch => {
    $.LoadingOverlay('show')
    dispatch({ type: DELETE_BARCODE_FROM_LOT, barcode: barcode, key: key })
    $.LoadingOverlay('hide')
  }
}
export const change_Save_Lot_prop = data => {
  return dispatch => {
    if (data.save == false && data.button == true) {
      dispatch({
        type: CHANGE_SAVE_LOT_BUTTON_SOWL,
        response: data.save,
        message: 'Please First Save Your Selected Images'
      })
    }
    if (data.save == false && data.button == 'image save') {
      toastr.error('Error', 'Please Select The Image')
      dispatch({ type: CHANGE_SAVE_LOT_BUTTON_PROP, response: data.save })
    }
    if (data.save == true) {
      toastr.success('Success', 'Images Saved For Lot')
      dispatch({ type: CHANGE_SAVE_LOT_BUTTON_PROP, response: data.save })
    } else {
      dispatch({ type: CHANGE_SAVE_LOT_BUTTON_PROP, response: data.save })
    }
    // data.save == false && data.button == true
    //   ? dispatch({
    //     type: CHANGE_SAVE_LOT_BUTTON_SOWL,
    //     response: data.save,
    //     message: 'Please First Save Your Selected Images'
    //   })
    //   : data.save == true
    //     ? dispatch({ type: CHANGE_SAVE_LOT_BUTTON_PROP, response: data.save })
    //     : dispatch({ type: CHANGE_SAVE_LOT_BUTTON_PROP, response: data.save })
    // dispatch({ type: CHANGE_SAVE_LOT_BUTTON_PROP, response: data.save })
  }
}
export const unSelect_All_Images = () => {
  return dispatch => {
    toastr.error('Error', 'Selected Images Remove')
    dispatch({ type: UNSELECT_ALL_IMAGES })
  }
}
export const unSelect_All_Unpost_Images = () => {
  return dispatch => {
    toastr.error('Error', 'Selected Images Remove')
    dispatch({ type: UNSELECT_ALL_UNPOST_IMAGES })
  }
}
/**
 *
 * UnPosted Barcode
 *
 */
export const get_lot_unposted_barcode_detail = (barcode, merchant_name) => {
  return dispatch => {
    // console.log(barcode)
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_lot_unposted_barcode_detail`
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify({ barcode }),
      url
    }
    axios(options)
      .then(response => {
        $.LoadingOverlay('hide')
        // console.log(response)
        if (response.data.status == true) {
          const dataExist = get_lot_unpost_barcode_Id(response.data.data)
          // console.log(dataExist);
          if (
            merchant_name == response.data.merchant_detail[0].CONTACT_PERSON ||
            merchant_name == ''
          ) {
            dispatch({
              type: MERCHANT_UNPOSTED_BARCODE_CHECK,
              merchant_detail: response.data.merchant_detail,
              data: response.data.data,
              images: response.data.images,
              barcode: dataExist
            })
            toastr.success('Success', 'Barcode Added Successfully')
          } else {
            toastr.error('Error', 'This barcode is from another merchant')
          }
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

export const get_lot_range_unposted_barcode_detail = (data, merchant_name) => {
  return dispatch => {
    console.log(data)
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_lot_unposted_range_barcode_detail`
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
        if (response.data.status == false) {
          return toastr.error('Error', response.data.message)
        } else if (response.data.error) {
          response.data.error.map(item => {
            toastr.error('Error', item.message)
          })
        } else {
          let image = []
          response.data.images.map(item => {
            item.map(ite => {
              image.push(ite)
            })
          })
          let data = []
          response.data.data.map(item => {
            item.map(ite => {
              data.push(ite)
            })
          })
          console.log(data)
          // console.log(image)
          dispatch({
            type: UNPOSTED_RANGE_BARCODE_CHECK,
            // data: response.data.data,
            data: data,
            merchant_name: response.data.merchant_name,
            images: image
          })

          toastr.success('Success', 'Barcode Added Successfully')
        }
        // console.log(response.data.merchant_name[0])
        // console.log(response)
      })
      .catch(err => {
        $.LoadingOverlay('hide')
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
  }
}
export const delete_UnPosted_Barcode_From_Lot = (barcode, key) => {
  return dispatch => {
    $.LoadingOverlay('show')
    dispatch({
      type: DELETE_UNPOSTED_BARCODE_FROM_LOT,
      barcode: barcode,
      key: key
    })
    $.LoadingOverlay('hide')
  }
}
export const change_Save_Lot_prop_unpost = data => {
  return dispatch => {
    if (data.save == false && data.button == true) {
      dispatch({
        type: CHANGE_SAVE_UNPOSTEDLOT_BUTTON_SOWL,
        response: data.save,
        message: 'Please First Save Your Selected Images'
      })
    }
    if (data.save == false && data.button == 'image save') {
      toastr.error('Error', 'Remove From Selected Images')
      dispatch({
        type: CHANGE_SAVE_UNPOSTEDLOT_BUTTON_PROP,
        response: data.save
      })
    }
    if (data.save == true) {
      toastr.success('Success', 'Images Saved For Lot')
      dispatch({
        type: CHANGE_SAVE_UNPOSTEDLOT_BUTTON_PROP,
        response: data.save
      })
    } else {
      dispatch({
        type: CHANGE_SAVE_UNPOSTEDLOT_BUTTON_PROP,
        response: data.save
      })
    }
  }
}
export const add_Image_UnPoste_Lot = data => {
  // console.log(data)
  return dispatch => {
    if (data.length !== 0) {
      dispatch({ type: ADD_IMAGE_TO_UNPOST_LOT, response: data })
    }
  }
}
export const save_unposted_lot_data = data => {
  return dispatch => {
    $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/save_unposted_lot_data`
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
        console.log(response)
      })
      .catch(err => {
        $.LoadingOverlay('hide')
        dispatch({ type: MESSAGE_SERVER, response: err.message })
        console.log(err.message)
      })
  }
}
export const closeErrorMessageLot = () => {
  return dispatch => {
    dispatch({ type: CLOSE_MESSAGES })
  }
}
