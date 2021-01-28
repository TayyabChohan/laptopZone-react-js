import {
  GET_MERCHANT_DETAIL,
  GET_TOTAL_BARCODE,
  REMOVE_TOTAL_BARCODE,
  ADD_BARCODE_NUMBER,
  GET_BARCODE_DETAIL,
  BARCODE_DETAIL_DATATABLE,
  STORE_BARCODE_DATA,
  NEW_BARCODE_INSERTED,
  DELETE_BARCODE,
  ADD_NEW_LOT
} from '../action/allActionTypes.js'

const Intial_state = {
  merchantname: [],
  lot: [],
  seller_account: [],
  total_barcode: [],
  barcode_detail_table: [],
  detail_barcode: []
}

const genrateBarcodeReducer = (state = Intial_state, action) => {
  switch (action.type) {
    case GET_MERCHANT_DETAIL: {
      return {
        ...state,
        merchantname: action.response.merchant_detail,
        lot: action.response.merchant_lot,
        seller_account: action.response.seller_account
      }
    }
    case GET_TOTAL_BARCODE: {
      return {
        ...state,
        total_barcode: action.response
      }
    }

    case BARCODE_DETAIL_DATATABLE: {
      return {
        ...state,
        barcode_detail_table: action.response
      }
    }

    case ADD_NEW_LOT: {
      return {
        ...state,
        lot: [...state.lot, action.response]
      }
    }

    case STORE_BARCODE_DATA: {
      return {
        ...state,
        barcode_detail_table: [...state.barcode_detail_table, action.response]
      }
    }
    case GET_BARCODE_DETAIL: {
      return {
        ...state,
        detail_barcode: action.response
      }
    }
    case NEW_BARCODE_INSERTED: {
      const barcode_detail_table = state.barcode_detail_table
        .slice()
        .map(item => {
          if (item.MT_ID == action.mt_id) {
            return {
              ...item,
              NO_OF_BARCODE:
                Number(item.NO_OF_BARCODE) + Number(action.total_barcode)
            }
          }
          return item
        })
      return {
        ...state,
        detail_barcode: [...(state.detail_barcode || []), ...action.response],
        barcode_detail_table
      }
    }
    case DELETE_BARCODE: {
      const barcode_detail_table = state.barcode_detail_table
        .slice()
        .map(item => {
          if (item.MT_ID == action.mt_id) {
            return {
              ...item,
              NO_OF_BARCODE: Number(item.NO_OF_BARCODE) - 1
            }
          }
          return item
        })
      const detail_barcode = state.detail_barcode.filter(
        item => item.BARCODE_NO !== action.response
      )
      return {
        ...state,
        detail_barcode,
        barcode_detail_table
      }
    }
    case REMOVE_TOTAL_BARCODE: {
      return {
        ...state,
        total_barcode: ''
      }
    }
    default:
      return state
  }
}
export default genrateBarcodeReducer
