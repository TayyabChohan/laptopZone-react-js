import {
  GENRATE_SERVICE_BILL,
  GET_PACKING_TYPE,
  GET_SERVICE_BILLS,
  DELETE_SERVICE_BILL,
  UPDATE_SERVICE_BILL
} from '../action/allActionTypes.js'

const Initial_State = {
  packing_item_detail: [],
  service_bills_datatable: []
}
const genrateBillingReducer = (state = Initial_State, action) => {
  switch (action.type) {
    case GET_PACKING_TYPE: {
      return {
        ...state,
        packing_item_detail: action.response
      }
    }

    case GET_SERVICE_BILLS: {
      return {
        ...state,
        service_bills_datatable: action.response
      }
    }
    case DELETE_SERVICE_BILL: {
      const service_bills_datatable = state.service_bills_datatable.filter(
        item => item.STORAGE_ID != action.cell_id
      )
      return {
        ...state,
        service_bills_datatable
      }
    }
    case GENRATE_SERVICE_BILL: {
      return {
        ...state,
        service_bills_datatable: [
          ...state.service_bills_datatable,
          action.response
        ]
      }
    }
    case UPDATE_SERVICE_BILL: {
      console.log(action.data.id)
      const service_bills_datatable = state.service_bills_datatable
        .slice()
        .map(item => {
          if (item.STORAGE_ID == action.data.id) {
            return {
              ...item,
              QTY: action.data.qty,
              RATE: action.data.rate,
              AMOUNT: action.data.qty * action.data.rate
            }
          }
          return item
        })
      return {
        ...state,
        service_bills_datatable
      }
    }
    default: {
      return state
    }
  }
}
export default genrateBillingReducer
