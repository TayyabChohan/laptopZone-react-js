import {
  GET_POS_REPAIRE_FORM_DATA,
  SAVE_POS_REPAIRE_DATA,
  DELETE_POS_REPAIRE_DATA,
  GET_BARCODE_DETAIL_POS_REPAIR,
  CHANGE_LINE_TYPE_REPAIRE,
  DELETE_REPAIR_BARCODE,
  CHANGE_COST_REPAIRE,
  CHANGE_ADVANCE_AMOUNT,
  /**
   *
   * Edit POS Repair
   *
   */
  UPDATE_POS_REPAIRE_FORM,
  GET_BARCODE_DETAIL_POS_REPAIR_EDIT,
  CHANGE_LINE_TYPE_REPAIRE_EDIT,
  DELETE_REPAIR_BARCODE_EDIT,
  CHANGE_COST_REPAIRE_EDIT,
  CHANGE_ADVANCE_AMOUNT_EDIT,
  GET_SPECIFIC_POS_REPAIR_DATA,
  EDIT_UNMOUNT_ALL_DATATABLE_RECORD
} from '../action/allActionTypes.js'

const INITAIL_STATE = {
  repaire_data: [],
  pos_repair_barcode_detail: [],
  pos_repair_barcode_detail_edit: []
}

const posRepaireReducer = (state = INITAIL_STATE, action) => {
  switch (action.type) {
    case SAVE_POS_REPAIRE_DATA: {
      return {
        ...state,
        repaire_data: [...(state.repaire_data || []), ...action.response],
        pos_repair_barcode_detail: []
      }
    }
    case GET_POS_REPAIRE_FORM_DATA: {
      return {
        ...state,
        repaire_data: action.response
      }
    }

    case DELETE_POS_REPAIRE_DATA: {
      const repaire_data = state.repaire_data.filter(
        item => item.LZ_POS_REPAIRE_ID !== action.id
      )
      return {
        ...state,
        repaire_data
      }
    }
    case GET_BARCODE_DETAIL_POS_REPAIR: {
      const barcodeExist = state.pos_repair_barcode_detail.filter(
        item => item.BARCODE_NO == action.barcode
      )
      if (barcodeExist.length === 0) {
        return {
          ...state,
          pos_repair_barcode_detail: [
            ...(state.pos_repair_barcode_detail || []),
            ...action.response
          ]
        }
      } else {
        return {
          ...state
        }
      }
    }
    case CHANGE_LINE_TYPE_REPAIRE: {
      const pos_repair_barcode_detail = state.pos_repair_barcode_detail
        .slice()
        .map(item => {
          if (item.BARCODE_NO == action.barcode) {
            return {
              ...item,
              LINE_TYPE: action.line_type
            }
          }
          return item
        })
      return {
        ...state,
        pos_repair_barcode_detail
      }
    }
    case DELETE_REPAIR_BARCODE: {
      const pos_repair_barcode_detail = state.pos_repair_barcode_detail.filter(
        item => item.BARCODE_NO !== action.barcode
      )
      return {
        ...state,
        pos_repair_barcode_detail
      }
    }
    case CHANGE_COST_REPAIRE: {
      const pos_repair_barcode_detail = state.pos_repair_barcode_detail
        .slice()
        .map(item => {
          if (item.BARCODE_NO == action.barcode) {
            return {
              ...item,
              COST_PRICE: Number(action.cost_price),
              NET_PRICE:
                action.cost_price == 0
                  ? 0
                  : Number(action.cost_price) - Number(item.ADVANCE_PAYMENT)
            }
          }
          return item
        })
      return {
        ...state,
        pos_repair_barcode_detail
      }
    }
    case CHANGE_ADVANCE_AMOUNT: {
      const pos_repair_barcode_detail = state.pos_repair_barcode_detail
        .slice()
        .map(item => {
          if (item.BARCODE_NO == action.barcode) {
            return {
              ...item,
              ADVANCE_PAYMENT: Number(action.advance_payment).toFixed(2),
              NET_PRICE:
                action.advance_payment == 0
                  ? 0
                  : Number(item.COST_PRICE) - Number(action.advance_payment)
            }
          }
          return item
        })
      return {
        ...state,
        pos_repair_barcode_detail
      }
    }
    /**
     * Edit Repair POS
     *
     */

    case UPDATE_POS_REPAIRE_FORM: {
      let repaire_data = state.repaire_data.filter(
        item => item.LZ_POS_REPAIRE_ID !== action.id
      )
      repaire_data = [...(repaire_data || []), ...action.response]
      return {
        ...state,
        repaire_data
      }
    }
    case GET_BARCODE_DETAIL_POS_REPAIR_EDIT: {
      const barcodeExist = state.pos_repair_barcode_detail_edit.filter(
        item => item.BARCODE_NO == action.barcode
      )
      if (barcodeExist.length === 0) {
        return {
          ...state,
          pos_repair_barcode_detail_edit: [
            ...(state.pos_repair_barcode_detail_edit || []),
            ...action.response
          ]
        }
      } else {
        return {
          ...state
        }
      }
    }
    case GET_SPECIFIC_POS_REPAIR_DATA: {
      return {
        ...state,
        pos_repair_barcode_detail_edit: action.response
      }
    }
    case CHANGE_ADVANCE_AMOUNT_EDIT: {
      const pos_repair_barcode_detail_edit = state.pos_repair_barcode_detail_edit
        .slice()
        .map(item => {
          if (item.BARCODE_NO == action.barcode) {
            return {
              ...item,
              ADVANCE_PAYMENT: Number(action.advance_payment).toFixed(2),
              NET_PRICE:
                action.advance_payment == 0
                  ? 0
                  : Number(item.COST_PRICE) - Number(action.advance_payment)
            }
          }
          return item
        })
      return {
        ...state,
        pos_repair_barcode_detail_edit
      }
    }
    case CHANGE_LINE_TYPE_REPAIRE_EDIT: {
      const pos_repair_barcode_detail_edit = state.pos_repair_barcode_detail_edit
        .slice()
        .map(item => {
          if (item.BARCODE_NO == action.barcode) {
            return {
              ...item,
              LINE_TYPE: action.line_type
            }
          }
          return item
        })
      return {
        ...state,
        pos_repair_barcode_detail_edit
      }
    }
    case DELETE_REPAIR_BARCODE_EDIT: {
      const pos_repair_barcode_detail_edit = state.pos_repair_barcode_detail_edit.filter(
        item => item.BARCODE_NO !== action.barcode
      )
      return {
        ...state,
        pos_repair_barcode_detail_edit
      }
    }
    case CHANGE_COST_REPAIRE_EDIT: {
      const pos_repair_barcode_detail_edit = state.pos_repair_barcode_detail_edit
        .slice()
        .map(item => {
          if (item.BARCODE_NO == action.barcode) {
            return {
              ...item,
              COST_PRICE: Number(action.cost_price),
              NET_PRICE:
                action.cost_price == 0
                  ? 0
                  : Number(action.cost_price) - Number(item.ADVANCE_PAYMENT)
            }
          }
          return item
        })
      return {
        ...state,
        pos_repair_barcode_detail_edit
      }
    }
    case EDIT_UNMOUNT_ALL_DATATABLE_RECORD: {
      return {
        ...state,
        pos_repair_barcode_detail_edit: []
      }
    }
    default:
      return {
        ...state
      }
  }
}

export default posRepaireReducer
