import {
  GET_EMPLOYEE_NAME,
  GET_TOTAL_ITEMS,
  LOAD_SPECIAL_LOT_DATA,
  TOGGLE_LOT_BARCODE,
  TOGGLE_LOT_ALL_BARCODE,
  TOGGLE_FILTER_ALL_BARCODE,
  CHANGE_ASSIGN_FILTER,
  REMOVE_TOGGLE_BARCODES
} from '../action/allActionTypes.js'

const INITIAL_STATE = {
  employee_name: [],
  images: [],
  total_count: '',
  special_lot_data: [],
  filter_lot_data: [],
  toggle_barcodes: []
}
export const assignBarcodeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_EMPLOYEE_NAME: {
      return {
        ...state,
        employee_name: action.response
      }
    }
    case GET_TOTAL_ITEMS: {
      return {
        ...state,
        total_count: action.response
      }
    }
    case LOAD_SPECIAL_LOT_DATA: {
      return {
        ...state,
        special_lot_data: action.response,
        filter_lot_data: action.response,
        images: action.images
      }
    }

    case TOGGLE_FILTER_ALL_BARCODE: {
      if (action.response == 0) {
        const special_lot_data = state.filter_lot_data.filter(
          item => item.DEKIT_ITEM == 'DEKIT'
        )
        return {
          ...state,
          special_lot_data
        }
      } else if (action.response == 1) {
        const special_lot_data = state.filter_lot_data.filter(
          item => item.DEKIT_ITEM == 'LOT'
        )
        return {
          ...state,
          special_lot_data
        }
      } else {
        return {
          ...state,
          special_lot_data: state.filter_lot_data
        }
      }
    }
    case CHANGE_ASSIGN_FILTER: {
      if (action.response == 0) {
        const special_lot_data = state.filter_lot_data.filter(
          item => item.USER_NAME !== ''
        )
        return {
          ...state,
          special_lot_data
        }
      } else if (action.response == 1) {
        const special_lot_data = state.filter_lot_data.filter(
          item => item.USER_NAME == ''
        )
        return {
          ...state,
          special_lot_data
        }
      } else {
        return {
          ...state,
          special_lot_data: state.filter_lot_data
        }
      }
    }
    case TOGGLE_LOT_BARCODE: {
      const barcodeExist = state.toggle_barcodes.filter(
        item => item.BARCODE_PRV_NO == action.response.BARCODE_PRV_NO
      )
      if (barcodeExist.length === 0) {
        return {
          ...state,
          toggle_barcodes: [...(state.toggle_barcodes || ''), action.response]
        }
      } else {
        const toggle_barcodes = state.toggle_barcodes.filter(
          item => item.BARCODE_PRV_NO !== action.response.BARCODE_PRV_NO
        )
        return {
          ...state,
          toggle_barcodes
        }
      }
    }
    case REMOVE_TOGGLE_BARCODES: {
      return {
        ...state,
        toggle_barcodes: []
      }
    }
    case TOGGLE_LOT_ALL_BARCODE: {
      if (action.select == false) {
        return {
          ...state,
          toggle_barcodes: []
        }
      } else {
        return {
          ...state,
          toggle_barcodes: action.response
        }
      }
    }
    default:
      return state
  }
}

export default assignBarcodeReducer
