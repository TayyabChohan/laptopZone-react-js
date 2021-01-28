import {
  GET_INVOICE_ORDER_DATA,
  OPEN_PANE,
  CLOSE_PANE,
  GET_ORDER_BARCODES,
  GET_UN_VERIFIED_INVOICE_ORDER,
  GET_VERIFIED_INVOICE_ORDER,
  GET_ALL_INVOCIE_ORDER,
  VERIFIED_ALL_BARCODE,
  UN_VERIFIED_ALL_BARCODE
} from '../action/allActionTypes.js'

const INITAIL_STATE = {
  order_data: [],
  order_dataa: [],
  order_barcode: [],
  master_order_data: [],
  isPaneOpen: false
}

const invoiceOrderReducer = (state = INITAIL_STATE, action) => {
  switch (action.type) {
    case GET_INVOICE_ORDER_DATA: {
      return {
        ...state,
        order_data: action.response,
        order_dataa: action.response,
        order_barcode: [],
        master_order_data: []
      }
    }

    case GET_ORDER_BARCODES: {
      const master_order_data = state.order_dataa.filter(
        item => item.ORDER_ID == action.order_id
      )
      return {
        ...state,
        order_barcode: action.response,
        master_order_data: master_order_data[0]
      }
    }
    case GET_UN_VERIFIED_INVOICE_ORDER: {
      const order_data = state.order_dataa.filter(item => item.VERIFY == 0)
      return {
        ...state,
        order_data
      }
    }
    case GET_VERIFIED_INVOICE_ORDER: {
      const order_data = state.order_dataa.filter(item => item.VERIFY == 1)
      return {
        ...state,
        order_data
      }
    }
    case GET_ALL_INVOCIE_ORDER: {
      return {
        ...state,
        order_data: state.order_dataa
      }
    }
    case VERIFIED_ALL_BARCODE: {
      const order_barcode = state.order_barcode.slice().map(item => {
        return {
          ...item,
          STATUS: 'Verified',
          USER_NAME: action.response
        }
      })
      return {
        ...state,
        order_barcode
      }
    }

    case UN_VERIFIED_ALL_BARCODE: {
      const order_barcode = state.order_barcode.slice().map(item => {
        return {
          ...item,
          STATUS: 'Un Verified',
          USER_NAME: action.response
        }
      })
      return {
        ...state,
        order_barcode
      }
    }
    case OPEN_PANE: {
      return {
        ...state,
        isPaneOpen: true
      }
    }
    case CLOSE_PANE: {
      return {
        ...state,
        isPaneOpen: false
      }
    }
    default: {
      return state
    }
  }
}

export default invoiceOrderReducer
