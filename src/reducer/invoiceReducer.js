import {
  GET_INVOICE_DETAIL,
  GET_INVOICE_DATA_DETAIL,
  GET_SPECIFIC_INVOICE_DETAIL,
  CHANGE_DIS_AMOUNT,
  CHANGE_DIS_AMOUNT_PER,
  CHANGE_CHARGE,
  SAVE_DISCOUNT_AMOUNT,
  CHANGE_ALL_DIS_AMOUNT,
  CHANGE_ALL_DIS_PERC,
  SAVE_ALL_DIS_AMOUNT_PERC_CHANGE,
  GET_INVOICE_SUMMARY,
  INSERT_PAYMENT_DETAIL,
  GET_RECEIPT_NO

} from '../action/allActionTypes.js'

const Initial_State = {
  invoice_detail: [],
  invoice_data_detail: [],
  specific_invoice_detail: [],
  invoice_summary: '',
  invoicePaymentarray:[]
}

const invoiceReduce = (state = Initial_State, action) => {
  switch (action.type) {
    case GET_INVOICE_DETAIL: {
      return {
        ...state,
        invoice_detail: action.response
      }
    }
    case GET_INVOICE_DATA_DETAIL: {
      return {
        ...state,
        invoice_data_detail: action.response
      }
    }
    case GET_SPECIFIC_INVOICE_DETAIL: {
      return {
        ...state,
        specific_invoice_detail: action.response
      }
    }
    case CHANGE_DIS_AMOUNT: {
      // console.log(action.dis_amount)
      const invoice_data_detail = state.invoice_data_detail
        .slice()
        .map(item => {
          if (item.INV_DT_ID == action.INV_DT_ID) {
            let value = Number(item.DIS_AMOUNT)
            let total_charge = Number(item.TOTAL_CHARGE)
            total_charge = total_charge.toFixed(2)

            // value = value.toFixed(2)
            let discount = (value / total_charge) * 100

            let discount_amount =
              action.dis_amount == 0
                ? 0
                : Number(item.TOTAL_CHARGE) - Number(action.dis_amount)
            return {
              ...item,
              DIS_AMOUNT: action.dis_amount,
              DIS_AMOUNT_PERC: discount.toFixed(2),
              DISCOUNT_AMOUNT: discount_amount.toFixed(2)
            }
          }
          return item
        })
      return {
        ...state,
        invoice_data_detail
        // invoice_summary: {
        //   ...state.invoice_summary,
        //   DISCOUNT: (
        //     Number(state.invoice_summary.DISCOUNT) - Number(action.dis_amount)
        //   ).toFixed(2),
        //   TOTAL: (
        //     Number(state.invoice_summary.TOTAL) - Number(action.dis_amount)
        //   ).toFixed(2)
        // }
      }
    }
    case CHANGE_DIS_AMOUNT_PER: {
      const invoice_data_detail = state.invoice_data_detail
        .slice()
        .map(item => {
          if (item.INV_DT_ID == action.INV_DT_ID) {
            let value = Number(item.DIS_AMOUNT_PERC)
            let total_charge = Number(item.TOTAL_CHARGE)
            total_charge = total_charge.toFixed(2)
            // value = value.toFixed(2)

            let discount = (value / 100) * total_charge
            // let discount_amount =
            //   Number(item.TOTAL_CHARGE) - discount.toFixed(2)
            let discount_amount =
              action.dis_amount_perc == 0
                ? 0
                : Number(item.TOTAL_CHARGE) - discount.toFixed(2)
            return {
              ...item,
              DIS_AMOUNT_PERC: action.dis_amount_perc,
              DIS_AMOUNT: discount.toFixed(2),
              DISCOUNT_AMOUNT: discount_amount.toFixed(2)
            }
          }
          return item
        })
      return {
        ...state,
        invoice_data_detail
      }
    }
    case CHANGE_CHARGE: {
      const invoice_data_detail = state.invoice_data_detail
        .slice()
        .map(item => {
          if (item.INV_DT_ID == action.INV_DT_ID) {
            let value = Number(item.DIS_AMOUNT)
            let total_charge = Number(item.TOTAL_CHARGE)
            // total_charge = total_charge.toFixed(2)
            // value = value.toFixed(2)
            let discount = total_charge - value
            return {
              ...item,
              DISCOUNT_CHARGE: discount.toFixed(2)
            }
          }
          return item
        })
      return {
        ...state,
        invoice_data_detail
      }
    }

    case GET_INVOICE_SUMMARY: {
      return {
        ...state,
        invoice_summary: action.response
      }
    }
    case SAVE_DISCOUNT_AMOUNT: {
      console.log(action.invoice_id)
      const invoice_detail = state.invoice_detail.slice().map(item => {
        if (item.INVOICE_ID == action.invoice_id) {
          // const total_charge = Number(item.TOTAL_CHARGES)
          // console.log(total_charge)
          // const discount_charge = Number(action.response)
          // console.log(discount_charge)
          // let diff = total_charge - discount_charge
          // console.log(diff)
          return {
            ...item,
            DIFF_AMOUNT: action.response
          }
        }
      })
      return {
        ...state,
        invoice_detail
      }
    }
    case CHANGE_ALL_DIS_AMOUNT: {
      const invoice_data_detail = state.invoice_data_detail
        .slice()
        .map(item => {
          let value = Number(action.dis_amount)
          let total_charge = Number(item.TOTAL_CHARGE)
          total_charge = total_charge.toFixed(2)
          let discount = (value / total_charge) * 100
          return {
            ...item,
            DIS_AMOUNT: action.dis_amount,
            DIS_AMOUNT_PERC: discount.toFixed(2)
          }
        })
      return {
        ...state,
        invoice_data_detail
      }
    }

    case CHANGE_ALL_DIS_PERC: {
      const invoice_data_detail = state.invoice_data_detail
        .slice()
        .map(item => {
          let value = Number(action.dis_perc)
          let total_charge = Number(item.TOTAL_CHARGE)
          total_charge = total_charge.toFixed(2)
          let discount = (value / 100) * total_charge
          return {
            ...item,
            DIS_AMOUNT: discount.toFixed(2),
            DIS_AMOUNT_PERC: action.dis_perc
          }
        })
      return {
        ...state,
        invoice_data_detail
      }
    }
    case SAVE_ALL_DIS_AMOUNT_PERC_CHANGE: {
      // console.log(action.id)
      const invoice_detail = state.invoice_detail.slice().map(item => {
        if (item.INVOICE_ID == action.id) {
          // console.log(item.INVOICE_ID)
          return {
            ...item,
            DIFF_AMOUNT: action.diff
          }
        }
        return item
      })
      return {
        ...state,
        invoice_data_detail: action.response,
        invoice_detail
      }
    }

    // start reducer by tayyab 
    // case INSERT_PAYMENT_DETAIL: {
     
    //   return {
    //     ...state,
    //     invoicePaymentarray: action.response
    //   };
    // }

    case GET_RECEIPT_NO: {
     
      return {
        ...state,
        invoicePaymentarray: action.response
      };
    }
// end reducer by tayyab 
    default: {
      return state
    }
  }
}

export default invoiceReduce
