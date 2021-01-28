import {
  GET_POS_FORM_DATA,
  GET_POS_FORM_STATE,
  GET_POS_FORM_STORE_NAME,
  GET_BARCODE_DETAIL_POS,
  OPEN_END_ITEM_MODEL,
  GET_SCAN_BARCODE_DETAIL,
  GET_TAX,
  CHANGE_EXEMPT,
  CHANGE_LINE_TYPE_VALUE,
  CHANGE_COST_PRICE,
  CHANGE_DISCOUNT_PER,
  CHANGE_DISCOUNT_AMOUNT,
  CHANGE_SAVE_BUTTON_PROPS,
  GET_POS_TABLE_DATA,
  GET_POS_RECEPIT_BY_STORE,
  DELETE_INVOICE,
  GET_POS_TOTAL_AMOUNT,
  POST_POS_INVOICE,
  DELETE_ALL_POS_iNOVICE,
  POST_ALL_POS_INOVICE,
  UNPOST_ALL_POS_INVOICE,
  CHANGE_ALL_DIS_AMOUNT,
  CHANGE_ALL_DIS_PER,
  UNMOUNT_POS_FORM,
  DELETE_POS_BARCODE,
  SEARCH_FORM_DATA,
  ADD_REPAIR_TO_POS,
  REMOVE_SEARCH_REPAIR_POS_BARCODE,
  CLOSE_END_ITEM_MODEL,
  EBAY_BARCODE_QTY,
  CLOSE_MODEL_ON_SUCCESS,
  /*****
   *
   * POS Edit Receipt
   *
   */
  CHANGE_ALL_DIS_AMOUNT_EDIT,
  CHANGE_ALL_DIS_PER_EDIT,
  DELETE_POS_BARCODE_EDIT,
  GET_POS_TOTAL_AMOUNT_EDIT,
  REMOVE_ALL_EDIT_UNMOUNT,
  GET_BUYER_INFO_EDIT,
  GET_POS_EDIT_FORM_DATA,
  GET_BARCODE_DETAIL_POS_EDIT,
  CHANGE_LINE_TYPE_VALUE_EDIT,
  CHANGE_COST_PRICE_EDIT,
  CHANGE_DISCOUNT_PER_EDIT,
  CHANGE_DISCOUNT_AMOUNT_EDIT,
  CHANGE_EXEMPT_EDIT,
  GET_BARCODE_EDIT_DETAIL_POS,
  GET_TAX_EDIT,
  CHANGE_POS_DETAIL_USING_TAX,
  /**
   * Store Data
   */
  SAVE_POS_STORE_INFO,
  GET_POS_STORE_DATA,
  DELETE_STORE,
  GET_POS_FORM_STATE_EDIT,
  GET_POS_FORM_STORE_UPDATE,
  /*****
   *
   * POS Receipt Payment Detail
   *
   */
  GET_INVOICE_RECEIPT_DETAIL,
  REMOVE_ALL_INVOICE_RECEIPT_DETAIL,
  DELETE_INVOICE_RECEIPT_DETAIL,
  EDIT_INVOICE_RECEIPT_PAYMENT_DETAIL,
  ITEM_COND_DETAIL
} from '../action/allActionTypes.js'

const INITAIL_STATE = {
  store_data: [],
  store_name: [],
  pos_state: [],
  pos_state_edit: [],
  pos_city: [],
  pos_receipt_detail: [],
  button_status: true,

  /*****
   *
   * POS Receipt State
   *
   */
  pos_barcode_detail: [],
  open_model: false,
  barcode: '',
  ebay_id: '',
  barcode_qty: '',
  show_model: false,
  close_model: false,
  total_advance: '0',
  total: '0',
  sale_tax_per: '0',
  sale_tax_amt: '0',
  total_amount: '0',
  dis_total_amount: '0',
  total_discount_amount: '0',
  total_amount_per: '0',
  pos_doc_no: '',
  buyer_info_pos: '',
  total_advance_edit: '0',
  search_repair_data: [],
  remove_form_data:false,
  /*****
   *
   * POS Receipt Edit State
   *
   */
  total_discount_amount_edit: '0',
  total_amount_per_edit: '0',
  sale_tax_per_edit: '0',
  sale_tax_amt_edit: '0',
  total_amount_edit: '0',
  dis_total_amount_edit: '0',
  pos_barcode_detail_edit: [],
  table_data_pos: [],
  buyer_info: '',

  /*****
   *
   * POS Receipt Detail State
   *
   */
  receipt_payment_detail: []
}

const posReducer = (state = INITAIL_STATE, action) => {
  switch (action.type) {
    case GET_POS_FORM_DATA: {
      return {
        ...state,
        pos_doc_no: action.Doc_No,
        pos_city: action.city
      }
    }
    case GET_POS_FORM_STATE: {
      return {
        ...state,
        pos_state: action.state
      }
    }
    case GET_POS_FORM_STORE_NAME: {
      return {
        ...state,
        store_name: action.store_name
      }
    }

    case GET_TAX: {
      return {
        ...state,
        sale_tax_per: '',
        sale_tax_per: action.tax
      }
    }
    case CHANGE_EXEMPT: {
      if (action.response == false) {
        let sum = 0
        let payment = 0
        // const net_price = pos_barcode_detail.map(item => item.NET_PRICE)
        // console.table(net_price)
        for (var i = 0; i < state.pos_barcode_detail.length; i++) {
          sum =
            sum +
            Number(
              state.pos_barcode_detail[i]['NET_PRICE'] == null
                ? state.pos_barcode_detail[i]['COST_PRICE']
                : state.pos_barcode_detail[i]['NET_PRICE']
            )
          payment =
            payment + Number(state.pos_barcode_detail[i]['ADVANCE_PAYMENT'])
        }
        // console.log(sum)
        // console.log(payment)
        const sale_tax_amt = (
          Number(sum / 100) * Number(state.sale_tax_per)
        ).toFixed(2)
        // console.log(sale_tax_amt)
        const total = (Number(sum) + Number(sale_tax_amt)).toFixed(2)
        let total_amount = (Number(sum) + Number(sale_tax_amt)).toFixed(2)
        total_amount = (Number(total_amount) - Number(payment)).toFixed(2)
        // console.log(total_amount)
        return {
          ...state,
          sale_tax_amt,
          total_amount,
          total,
          total_advance: payment
        }
      } else {
        let sum = 0
        let payment = 0
        // const net_price = pos_barcode_detail.map(item => item.NET_PRICE)
        // console.table(net_price)
        for (var i = 0; i < state.pos_barcode_detail.length; i++) {
          sum =
            sum +
            Number(
              state.pos_barcode_detail[i]['NET_PRICE'] == null
                ? state.pos_barcode_detail[i]['COST_PRICE']
                : state.pos_barcode_detail[i]['NET_PRICE']
            )
          payment =
            payment + Number(state.pos_barcode_detail[i]['ADVANCE_PAYMENT'])
        }
        const total = Number(sum).toFixed(2)
        let total_amount = Number(sum).toFixed(2)
        total_amount = (Number(total_amount) - Number(payment)).toFixed(2)
        return {
          ...state,
          // sale_tax_amt: 0,
          total_amount,
          total,
          total_advance: payment
        }
      }
    }
    case GET_POS_TOTAL_AMOUNT: {
      let sum = 0
      let payment = 0
      for (var i = 0; i < state.pos_barcode_detail.length; i++) {
        sum =
          sum +
          Number(
            state.pos_barcode_detail[i]['NET_PRICE'] == null
              ? state.pos_barcode_detail[i]['COST_PRICE']
              : state.pos_barcode_detail[i]['NET_PRICE']
          )
        payment =
          payment + Number(state.pos_barcode_detail[i]['ADVANCE_PAYMENT'])
      }

      const sale_tax_amt = (
        Number(sum / 100) * Number(state.sale_tax_per)
      ).toFixed(2)
      const total = (Number(sum) + Number(sale_tax_amt)).toFixed(2)
      let total_amount = (Number(sum) + Number(sale_tax_amt)).toFixed(2)
      total_amount = (Number(total_amount) - Number(payment)).toFixed(2)
      return {
        ...state,
        sale_tax_amt,
        total_amount,
        total,
        total_advance: payment
      }
    }
    case GET_SCAN_BARCODE_DETAIL: {
      const barcodeExist = state.pos_barcode_detail.filter(
        item => item.BARCODE_NO == action.barcode || ''
      )
      if (barcodeExist.length === 0) {
        return {
          ...state,
          buyer_info_pos: action.buyer_info_pos[0],
          pos_barcode_detail: [
            ...(state.pos_barcode_detail || []),
            ...action.table_data
          ]
        }
      } else {
        return {
          ...state,
          button_status: true
        }
      }
    }
    case GET_BARCODE_DETAIL_POS: {
      const barcodeExist = state.pos_barcode_detail.filter(
        item => item.BARCODE_NO == action.barcode || ''
      )
      if (barcodeExist.length === 0) {
        return {
          ...state,

          pos_barcode_detail: [
            ...(state.pos_barcode_detail || []),
            ...action.response
          ]
        }
      } else {
        return {
          ...state,
          button_status: true
        }
      }
    }
    case OPEN_END_ITEM_MODEL: {
      return {
        ...state,
        open_model: true,
        barcode: action.barcode,
        ebay_id: action.ebay_id
      }
    }
    case CLOSE_END_ITEM_MODEL: {
      return {
        ...state,
        open_model: false
      }
    }
    case EBAY_BARCODE_QTY: {
      return {
        ...state,
        barcode_qty: action.response,
        show_model: !state.show_model
      }
    }
    case CLOSE_MODEL_ON_SUCCESS: {
      return {
        ...state,
        close_model: !state.close_model
      }
    }
    case DELETE_POS_BARCODE: {
      const pos_barcode_detail = state.pos_barcode_detail.filter(
        item => item.BARCODE_NO !== action.barcode
      )
      return {
        ...state,
        pos_barcode_detail
      }
    }

    case CHANGE_LINE_TYPE_VALUE: {
      const pos_barcode_detail = state.pos_barcode_detail.slice().map(item => {
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
        pos_barcode_detail
      }
    }
    case CHANGE_COST_PRICE: {
      const pos_barcode_detail = state.pos_barcode_detail.slice().map(item => {
        if (item.BARCODE_NO == action.barcode) {
          return {
            ...item,
            COST_PRICE: Number(action.cost_price),
            DISCOUNT_AMOUNT:
              item.COST_PRICE === null ? 0 : item.DISCOUNT_AMOUNT,
            DISCOUNT_PER: item.COST_PRICE === null ? 0 : item.DISCOUNT_PER,
            NET_PRICE:
              action.cost_price == 0
                ? 0
                : Number(action.cost_price) - Number(item.DISCOUNT_AMOUNT)
          }
        }
        return item
      })
      let sum = 0
      let payment = 0
      // const net_price = pos_barcode_detail.map(item => item.NET_PRICE)
      // console.table(net_price)
      for (var i = 0; i < pos_barcode_detail.length; i++) {
        sum =
          sum +
          Number(
            pos_barcode_detail[i]['NET_PRICE'] == null
              ? pos_barcode_detail[i]['COST_PRICE']
              : pos_barcode_detail[i]['NET_PRICE']
          )
        payment =
          payment + Number(state.pos_barcode_detail[i]['ADVANCE_PAYMENT'])
      }
      const sale_tax = action.exempt == false ? state.sale_tax_per : '0'
      const sale_tax_amt = (Number(sum / 100) * Number(sale_tax)).toFixed(2)
      const total = (Number(sum) + Number(sale_tax_amt)).toFixed(2)
      let total_amount = (Number(sum) + Number(sale_tax_amt)).toFixed(2)
      total_amount = (Number(total_amount) - Number(payment)).toFixed(2)

      return {
        ...state,
        pos_barcode_detail,
        sale_tax_amt,
        total_amount,
        total_advance: payment,
        total
      }
    }

    case CHANGE_DISCOUNT_AMOUNT: {
      const pos_barcode_detail = state.pos_barcode_detail.slice().map(item => {
        if (item.BARCODE_NO == action.barcode) {
          let value = Number(item.DISCOUNT_AMOUNT)
          let total_charge = Number(item.COST_PRICE)
          total_charge = total_charge.toFixed(2)

          let discount = (value / total_charge) * 100

          let discount_amount =
            action.dis_amount == 0
              ? // 0
              Number(item.COST_PRICE) - Number(action.dis_amount)
              : Number(item.COST_PRICE) - Number(action.dis_amount)
          return {
            ...item,
            DISCOUNT_AMOUNT: item.COST_PRICE === null ? 0 : action.dis_amount,
            DISCOUNT_PER: item.COST_PRICE === null ? 0 : discount.toFixed(4),
            NET_PRICE:
              item.COST_PRICE === null ? 0 : discount_amount.toFixed(2)
          }
        }
        return item
      })
      let sum = 0
      let sumDis_Amt = 0
      let payment = 0
      for (var i = 0; i < pos_barcode_detail.length; i++) {
        sum = sum + Number(pos_barcode_detail[i]['NET_PRICE'])
        sumDis_Amt =
          sumDis_Amt + Number(pos_barcode_detail[i]['DISCOUNT_AMOUNT'])
        payment =
          payment + Number(state.pos_barcode_detail[i]['ADVANCE_PAYMENT'])
      }
      const sale_tax = action.exempt == false ? state.sale_tax_per : '0'
      const sale_tax_amt = (Number(sum / 100) * Number(sale_tax)).toFixed(2)
      const total = (Number(sum) + Number(sale_tax_amt)).toFixed(2)
      let total_amount = (Number(sum) + Number(sale_tax_amt)).toFixed(2)
      total_amount = (Number(total_amount) - Number(payment)).toFixed(2)
      return {
        ...state,
        pos_barcode_detail,
        sale_tax_amt,
        total_amount,
        total_advance: payment,
        total,
        dis_total_amount: Number(sumDis_Amt).toFixed(2)
      }
    }

    case CHANGE_DISCOUNT_PER: {
      const pos_barcode_detail = state.pos_barcode_detail.slice().map(item => {
        if (item.BARCODE_NO == action.barcode) {
          let value = Number(item.DISCOUNT_PER)
          let total_charge = Number(item.COST_PRICE)
          total_charge = total_charge.toFixed(2)
          let discount = (value / 100) * total_charge

          let discount_amount =
            action.dis_per == 0
              ? // 0
              Number(item.COST_PRICE) - Number(discount)
              : Number(item.COST_PRICE) - Number(discount)
          return {
            ...item,
            DISCOUNT_PER: item.COST_PRICE === null ? 0 : action.dis_per,
            DISCOUNT_AMOUNT: item.COST_PRICE === null ? 0 : discount.toFixed(2),
            NET_PRICE:
              item.COST_PRICE === null ? 0 : discount_amount.toFixed(2)
          }
        }
        return item
      })
      let sum = 0
      let sumDis_Amt = 0
      let payment = 0
      for (var i = 0; i < pos_barcode_detail.length; i++) {
        sum = sum + Number(pos_barcode_detail[i]['NET_PRICE'])
        sumDis_Amt =
          sumDis_Amt + Number(pos_barcode_detail[i]['DISCOUNT_AMOUNT'])
        payment =
          payment + Number(state.pos_barcode_detail[i]['ADVANCE_PAYMENT'])
      }

      const sale_tax = action.exempt == false ? state.sale_tax_per : '0'
      const sale_tax_amt = (Number(sum / 100) * Number(sale_tax)).toFixed(2)
      const total = (Number(sum) + Number(sale_tax_amt)).toFixed(2)
      let total_amount = (Number(sum) + Number(sale_tax_amt)).toFixed(2)
      total_amount = (Number(total_amount) - Number(payment)).toFixed(2)
      return {
        ...state,
        pos_barcode_detail,
        sale_tax_amt,
        total_amount,
        total,
        total_advance: payment,
        dis_total_amount: Number(sumDis_Amt).toFixed(2)
      }
    }

    case CHANGE_ALL_DIS_AMOUNT: {
      let sum1 = 0
      let payment1 = 0
      let cost_sum1 = 0
      for (var i = 0; i < state.pos_barcode_detail.length; i++) {
        cost_sum1 =
          cost_sum1 + Number(state.pos_barcode_detail[i]['COST_PRICE'])
        sum1 = sum1 + Number(state.pos_barcode_detail[i]['NET_PRICE'])
        payment1 =
          payment1 + Number(state.pos_barcode_detail[i]['ADVANCE_PAYMENT'])
      }
      // console.log(cost_sum)
      const sale_tax1 = action.exempt == false ? state.sale_tax_per : '0'
      const sale_tax_amt1 = (Number(sum1 / 100) * Number(sale_tax1)).toFixed(2)
      const total1 = (Number(sum1) + Number(sale_tax_amt1)).toFixed(2)
      let total_amount1 = (Number(sum1) + Number(sale_tax_amt1)).toFixed(2)
      total_amount1 = (Number(total_amount1) - Number(payment1)).toFixed(2)
      let discount_per1 = (action.dis_amount / cost_sum1) * 100
      // console.log(total1)
      // console.log(discount_per1)
      const pos_barcode_detail = state.pos_barcode_detail.slice().map(item => {
        let total_charge = Number(item.COST_PRICE)
        total_charge = total_charge.toFixed(2)

        // let discount = (dis / total_charge) * 100
        let discount = (discount_per1 / 100) * total_charge
        // console.log(discount)
        let discount_amount =
          action.dis_amount == 0
            ? // 0
            Number(item.COST_PRICE) - Number(discount)
            : Number(item.COST_PRICE) - Number(discount)
        return {
          ...item,
          DISCOUNT_AMOUNT:
            item.COST_PRICE === null ? 0 : Number(discount).toFixed(2),
          DISCOUNT_PER:
            item.COST_PRICE === null ? 0 : Number(discount_per1).toFixed(4),
          NET_PRICE: item.COST_PRICE === null ? 0 : discount_amount.toFixed(2)
        }
      })
      // console.table(pos_barcode_detail)

      let sum = 0
      let sumDis_Amt = 0
      let payment = 0
      let cost_sum = 0
      for (var i = 0; i < pos_barcode_detail.length; i++) {
        cost_sum = cost_sum + Number(pos_barcode_detail[i]['COST_PRICE'])
        sum = sum + Number(pos_barcode_detail[i]['NET_PRICE'])
        sumDis_Amt =
          sumDis_Amt + Number(pos_barcode_detail[i]['DISCOUNT_AMOUNT'])
        payment = payment + Number(pos_barcode_detail[i]['ADVANCE_PAYMENT'])
      }
      // console.log(cost_sum)
      const sale_tax = action.exempt == false ? state.sale_tax_per : '0'
      const sale_tax_amt = (Number(sum / 100) * Number(sale_tax)).toFixed(2)
      const total = (Number(sum) + Number(sale_tax_amt)).toFixed(2)
      let total_amount = (Number(sum) + Number(sale_tax_amt)).toFixed(2)
      total_amount = (Number(total_amount) - Number(payment)).toFixed(2)
      // let discount_per = (action.dis_amount / total_amount) * 100
      // console.table(pos_barcode_detail)
      return {
        ...state,
        pos_barcode_detail,
        total_discount_amount: Number(action.dis_amount).toFixed(2),
        total_amount_per: Number(
          Number(action.dis_amount / cost_sum) * 100
        ).toFixed(2),
        sale_tax_amt,
        total_amount,
        total,
        total_advance: payment,
        dis_total_amount: Number(sumDis_Amt).toFixed(2)
      }
    }

    case CHANGE_ALL_DIS_PER: {
      const pos_barcode_detail = state.pos_barcode_detail.slice().map(item => {
        let total_charge = Number(item.COST_PRICE)
        total_charge = total_charge.toFixed(2)
        let discount = (action.dis_per / 100) * total_charge
        // let discount_per = (discount / total_charge) * 100
        let discount_amount =
          action.dis_amount == 0
            ? // 0
            Number(item.COST_PRICE) - Number(discount)
            : Number(item.COST_PRICE) - Number(discount)
        return {
          ...item,
          DISCOUNT_AMOUNT: item.COST_PRICE === null ? 0 : discount,
          DISCOUNT_PER:
            item.COST_PRICE === null ? 0 : Number(action.dis_per).toFixed(4),
          NET_PRICE: item.COST_PRICE === null ? 0 : discount_amount.toFixed(2)
        }
      })
      let sum = 0
      let sumDis_Amt = 0
      let payment = 0
      let cost_sum = 0
      for (var i = 0; i < pos_barcode_detail.length; i++) {
        cost_sum = cost_sum + Number(pos_barcode_detail[i]['COST_PRICE'])
        sum = sum + Number(pos_barcode_detail[i]['NET_PRICE'])
        sumDis_Amt =
          sumDis_Amt + Number(pos_barcode_detail[i]['DISCOUNT_AMOUNT'])
        payment = payment + Number(pos_barcode_detail[i]['ADVANCE_PAYMENT'])
      }
      // console.log(cost_sum)
      const sale_tax = action.exempt == false ? state.sale_tax_per : '0'
      const sale_tax_amt = (Number(sum / 100) * Number(sale_tax)).toFixed(2)
      const total = (Number(sum) + Number(sale_tax_amt)).toFixed(2)
      let total_amount = (Number(sum) + Number(sale_tax_amt)).toFixed(2)
      total_amount = (Number(total_amount) - Number(payment)).toFixed(2)
      return {
        ...state,
        pos_barcode_detail,
        total_discount_amount: Number(
          Number(action.dis_per / 100) * cost_sum
        ).toFixed(2),
        total_amount_per: Number(action.dis_per).toFixed(2),
        sale_tax_amt,
        total_amount,
        total,
        total_advance: payment,
        dis_total_amount: Number(sumDis_Amt).toFixed(2)
      }
    }

    case SEARCH_FORM_DATA: {
      return {
        ...state,
        search_repair_data: action.response
      }
    }
    case ADD_REPAIR_TO_POS: {
      const search_repair_data = state.search_repair_data.slice().map(item => {
        if (item.BARCODE_NO == action.response) {
          return {
            ...item,
            pos: item.pos !== true
          }
        }
        return item
      })
      return {
        ...state,
        search_repair_data
      }
    }
    case REMOVE_SEARCH_REPAIR_POS_BARCODE: {
      //  Serach barcode and remove this code is work on arrays
      let pos_barcode_detail = state.pos_barcode_detail.filter(
        e => !action.response.find(a => e.BARCODE_NO == a.BARCODE_NO)
      )
      return {
        ...state,
        pos_barcode_detail
      }
    }
    /*********
     *
     *
     *
     *
     * EDit Reducer
     *
     *
     */

    case CHANGE_EXEMPT_EDIT: {
      let sum = 0
      let sumDis_Amt = 0
      let payment = 0
      let cost_sum = 0
      for (var i = 0; i < state.pos_barcode_detail_edit.length; i++) {
        cost_sum =
          cost_sum + Number(state.pos_barcode_detail_edit[i]['COST_PRICE'])
        sum = sum + Number(state.pos_barcode_detail_edit[i]['NET_PRICE'])
        sumDis_Amt =
          sumDis_Amt +
          Number(state.pos_barcode_detail_edit[i]['DISCOUNT_AMOUNT'])
        payment =
          payment + Number(state.pos_barcode_detail_edit[i]['ADVANCE_PAYMENT'])
      }
      if (action.response == false) {
        const sale_tax_amt_edit = (
          Number(sum / 100) * Number(state.sale_tax_per_edit)
        ).toFixed(2)
        const total_amount = (Number(sum) + Number(sale_tax_amt_edit)).toFixed(
          2
        )
        let total = (Number(sum) + Number(sale_tax_amt_edit)).toFixed(2)
        total = total - Number(state.buyer_info.TOTAL_PAID).toFixed(2)
        let total_amount_edits = (
          Number(sum) + Number(sale_tax_amt_edit)
        ).toFixed(2)
        total_amount_edits =
          total_amount_edits == 0
            ? 0
            : (Number(total_amount_edits) - Number(payment)).toFixed(2)
        total_amount_edits =
          total_amount_edits - Number(state.buyer_info.TOTAL_PAID)
        return {
          ...state,
          sale_tax_amt_edit: sale_tax_amt_edit,
          total_amount_edit: total_amount,
          total_advance_edit: payment,
          net_total_edit: total_amount_edits
        }
      } else {
        let total = Number(sum).toFixed(2)
        // total =  Number(state.buyer_info.TOTAL_PAID) - total
        let total_amount_edit = Number(sum).toFixed(2)
        total_amount_edit =
          total_amount_edit == 0
            ? 0
            : (Number(total_amount_edit) - Number(payment)).toFixed(2)
        total_amount_edit =
          total_amount_edit - Number(state.buyer_info.TOTAL_PAID)
        return {
          ...state,
          total_amount_edit: Number(total).toFixed(2),
          total_advance_edit: payment,
          net_total_edit: Number(total_amount_edit).toFixed(2)
        }
      }
    }
    case POST_POS_INVOICE: {
      const pos_receipt_detail = state.pos_receipt_detail.map(item => {
        if (item.LZ_POS_MT_ID == action.id) {
          return {
            ...item,
            POST_YN: '0',
            GNRTD_DC_ID: action.response[0].GNRTD_DC_ID,
            GNRTD_INV_ID: action.response[0].GNRTD_INV_ID
          }
        }
        return item
      })
      return {
        ...state,
        pos_receipt_detail
      }
    }

    case DELETE_ALL_POS_iNOVICE: {
      return {
        ...state,
        pos_receipt_detail: action.response
      }
    }

    case UNPOST_ALL_POS_INVOICE: {
      return {
        ...state,
        pos_receipt_detail: action.response
      }
    }

    case POST_ALL_POS_INOVICE: {
      return {
        ...state,
        pos_receipt_detail: action.response
      }
    }
    case GET_BARCODE_EDIT_DETAIL_POS: {
      const barcodeExist = state.pos_barcode_detail_edit.filter(
        item => item.BARCODE_NO == action.barcode || ''
      )
      if (barcodeExist.length === 0) {
        return {
          ...state,

          pos_barcode_detail_edit: [
            ...(state.pos_barcode_detail_edit || []),
            ...action.response
          ]
        }
      } else {
        return {
          ...state,
          button_status: true
        }
      }
    }

    case GET_BARCODE_DETAIL_POS_EDIT: {
      return {
        ...state,
        pos_barcode_detail_edit: action.response
      }
    }

    case CHANGE_LINE_TYPE_VALUE_EDIT: {
      const pos_barcode_detail_edit = state.pos_barcode_detail_edit
        .slice()
        .map(item => {
          if (
            item.BARCODE_NO == action.barcode ||
            item.REPAIRE_ID == action.barcode
          ) {
            return {
              ...item,
              LINE_TYPE: action.line_type
            }
          }
          return item
        })
      return {
        ...state,
        pos_barcode_detail_edit
      }
    }
    case CHANGE_COST_PRICE_EDIT: {
      const pos_barcode_detail_edit = state.pos_barcode_detail_edit
        .slice()
        .map(item => {
          if (
            item.BARCODE_NO == action.barcode ||
            item.REPAIRE_ID == action.barcode
          ) {
            return {
              ...item,
              COST_PRICE: Number(action.cost_price),
              DISCOUNT_AMOUNT:
                item.COST_PRICE === null ? 0 : item.DISCOUNT_AMOUNT,
              DISCOUNT_PER:
                item.COST_PRICE === null
                  ? 0
                  : Number(item.DISCOUNT_PER).toFixed(4),
              NET_PRICE:
                action.cost_price == 0
                  ? 0
                  : Number(action.cost_price) - Number(item.DISCOUNT_AMOUNT)
            }
          }
          return item
        })
      let sum = 0
      let payment = 0
      // const net_price = pos_barcode_detail.map(item => item.NET_PRICE)
      // console.table(net_price)
      for (var i = 0; i < pos_barcode_detail_edit.length; i++) {
        sum = sum + Number(pos_barcode_detail_edit[i]['NET_PRICE'])
        payment =
          payment + Number(pos_barcode_detail_edit[i]['ADVANCE_PAYMENT'])
      }
      const sale_tax_amt_edit = (
        Number(sum / 100) * Number(state.sale_tax_per_edit)
      ).toFixed(2)

      let total_amount_edit = (Number(sum) + Number(sale_tax_amt_edit)).toFixed(
        2
      )
      total_amount_edit = (Number(total_amount_edit) - Number(payment)).toFixed(
        2
      )

      return {
        ...state,
        pos_barcode_detail_edit,
        sale_tax_amt_edit,
        total_amount_edit
      }
    }

    case CHANGE_DISCOUNT_AMOUNT_EDIT: {
      const pos_barcode_detail_edit = state.pos_barcode_detail_edit
        .slice()
        .map(item => {
          if (
            item.BARCODE_NO == action.barcode ||
            item.REPAIRE_ID == action.barcode
          ) {
            let value = Number(item.DISCOUNT_AMOUNT)
            let total_charge = Number(item.COST_PRICE)
            total_charge = total_charge.toFixed(2)

            let discount = (value / total_charge) * 100

            let discount_amount =
              action.dis_amount == 0
                ? // 0
                Number(item.COST_PRICE) - Number(action.dis_amount)
                : Number(item.COST_PRICE) - Number(action.dis_amount)
            return {
              ...item,
              DISCOUNT_AMOUNT: item.COST_PRICE === null ? 0 : action.dis_amount,
              DISCOUNT_PER: item.COST_PRICE === null ? 0 : discount.toFixed(4),
              NET_PRICE:
                item.COST_PRICE === null ? 0 : discount_amount.toFixed(2)
            }
          }
          return item
        })
      let sum = 0
      let sumDis_Amt = 0
      let payment = 0
      for (var i = 0; i < pos_barcode_detail_edit.length; i++) {
        sum = sum + Number(pos_barcode_detail_edit[i]['NET_PRICE'])
        sumDis_Amt =
          sumDis_Amt + Number(pos_barcode_detail_edit[i]['DISCOUNT_AMOUNT'])
        payment =
          payment + Number(pos_barcode_detail_edit[i]['ADVANCE_PAYMENT'])
      }

      const sale_tax_amt_edit = (
        Number(sum / 100) * Number(state.sale_tax_per_edit)
      ).toFixed(2)
      const total_amount = (Number(sum) + Number(sale_tax_amt_edit)).toFixed(2)
      let total_amount_edit = (Number(sum) + Number(sale_tax_amt_edit)).toFixed(
        2
      )
      total_amount_edit = (Number(total_amount_edit) - Number(payment)).toFixed(
        2
      )

      return {
        ...state,
        pos_barcode_detail_edit,
        sale_tax_amt_edit,
        total_amount_edit: total_amount,
        dis_total_amount_edit: Number(sumDis_Amt).toFixed(2)
      }
    }

    case CHANGE_DISCOUNT_PER_EDIT: {
      const pos_barcode_detail_edit = state.pos_barcode_detail_edit
        .slice()
        .map(item => {
          if (
            item.BARCODE_NO == action.barcode ||
            item.REPAIRE_ID == action.barcode
          ) {
            let value = Number(item.DISCOUNT_PER)
            let total_charge = Number(item.COST_PRICE)
            total_charge = Number(total_charge).toFixed(2)
            let discount = (value / 100) * total_charge

            let discount_amount =
              action.dis_per == 0
                ? // 0
                Number(item.COST_PRICE) - Number(discount)
                : Number(item.COST_PRICE) - Number(discount)
            return {
              ...item,
              DISCOUNT_PER:
                item.COST_PRICE === null
                  ? 0
                  : Number(action.dis_per).toFixed(4),
              DISCOUNT_AMOUNT:
                item.COST_PRICE === null ? 0 : Number(discount).toFixed(2),
              NET_PRICE:
                item.COST_PRICE === null
                  ? 0
                  : Number(discount_amount).toFixed(2)
            }
          }
          return item
        })
      let sum = 0
      let sumDis_Amt = 0
      let payment = 0
      for (var i = 0; i < pos_barcode_detail_edit.length; i++) {
        sum = sum + Number(pos_barcode_detail_edit[i]['NET_PRICE'])
        sumDis_Amt =
          sumDis_Amt + Number(pos_barcode_detail_edit[i]['DISCOUNT_AMOUNT'])
        payment =
          payment + Number(state.pos_barcode_detail_edit[i]['ADVANCE_PAYMENT'])
      }

      const sale_tax_amt_edit = (
        Number(sum / 100) * Number(state.sale_tax_per_edit)
      ).toFixed(2)
      const total_amount = (Number(sum) + Number(sale_tax_amt_edit)).toFixed(2)
      let total_amount_edit = (Number(sum) + Number(sale_tax_amt_edit)).toFixed(
        2
      )
      total_amount_edit = (Number(total_amount_edit) - Number(payment)).toFixed(
        2
      )
      return {
        ...state,
        pos_barcode_detail_edit,
        sale_tax_amt_edit,
        total_amount_edit: total_amount,
        dis_total_amount_edit: Number(sumDis_Amt).toFixed(2)
      }
    }

    case GET_POS_TOTAL_AMOUNT_EDIT: {
      let sum = 0
      let sumDis_Amt = 0
      let payment = 0
      for (var i = 0; i < state.pos_barcode_detail_edit.length; i++) {
        sum = sum + Number(state.pos_barcode_detail_edit[i]['NET_PRICE'])
        sumDis_Amt =
          sumDis_Amt +
          Number(state.pos_barcode_detail_edit[i]['DISCOUNT_AMOUNT'])
        payment =
          payment + Number(state.pos_barcode_detail_edit[i]['ADVANCE_PAYMENT'])
      }
      if (action.response == false) {
        const sale_tax_amt_edit = (
          Number(sum / 100) * Number(state.sale_tax_per_edit)
        ).toFixed(2)
        const total_amount = (Number(sum) + Number(sale_tax_amt_edit)).toFixed(
          2
        )
        let total = (Number(sum) + Number(sale_tax_amt_edit)).toFixed(2)
        total = total - Number(state.buyer_info.TOTAL_PAID).toFixed(2)
        let total_amount_edits = (
          Number(sum) + Number(sale_tax_amt_edit)
        ).toFixed(2)
        total_amount_edits =
          total_amount_edits == 0
            ? 0
            : (Number(total_amount_edits) - Number(payment)).toFixed(2)
        total_amount_edits =
          total_amount_edits - Number(state.buyer_info.TOTAL_PAID)
        // console.log(total_amount)
        // console.log(total_amount_edits)
        // console.log(sale_tax_amt_edit)
        return {
          ...state,
          sale_tax_amt_edit: sale_tax_amt_edit,
          total_amount_edit: total_amount,
          total_advance_edit: payment,
          net_total_edit: total_amount_edits
          // save_button1: total != '0'
        }
      } else {
        let total = Number(sum).toFixed(2)
        total = total - Number(state.buyer_info.TOTAL_PAID)
        let total_amount_edit = Number(sum).toFixed(2)
        total_amount_edit =
          total_amount_edit == 0
            ? 0
            : (Number(total_amount_edit) - Number(payment)).toFixed(2)
        total_amount_edit =
          total_amount_edit - Number(state.buyer_info.TOTAL_PAID)
        console.log(total)
        return {
          ...state,
          total_amount_edit: Number(total).toFixed(2),
          total_advance_edit: payment,
          net_total_edit: Number(total_amount_edit).toFixed(2)
          // save_button1: total != '0'
        }
      }
    }
    case CHANGE_ALL_DIS_AMOUNT_EDIT: {
      let sum1 = 0
      let payment1 = 0
      let cost_sum1 = 0
      for (var i = 0; i < state.pos_barcode_detail_edit.length; i++) {
        cost_sum1 =
          cost_sum1 + Number(state.pos_barcode_detail_edit[i]['COST_PRICE'])
        sum1 = sum1 + Number(state.pos_barcode_detail_edit[i]['NET_PRICE'])
        payment1 =
          payment1 + Number(state.pos_barcode_detail_edit[i]['ADVANCE_PAYMENT'])
      }
      const sale_tax1 = action.exempt == false ? state.sale_tax_per : '0'
      const sale_tax_amt1 = (Number(sum1 / 100) * Number(sale_tax1)).toFixed(2)
      const total1 = (Number(sum1) + Number(sale_tax_amt1)).toFixed(2)
      let discount_per1 = (action.dis_amount / cost_sum1) * 100

      const pos_barcode_detail_edit = state.pos_barcode_detail_edit
        .slice()
        .map(item => {
          let total_charge = Number(item.COST_PRICE)
          total_charge = total_charge.toFixed(2)

          let discount = (discount_per1 / 100) * total_charge
          let discount_amount =
            action.dis_amount == 0
              ? // 0
              Number(item.COST_PRICE) - Number(discount)
              : Number(item.COST_PRICE) - Number(discount)
          return {
            ...item,
            DISCOUNT_AMOUNT:
              item.COST_PRICE === null ? 0 : Number(discount).toFixed(2),
            DISCOUNT_PER:
              item.COST_PRICE === null ? 0 : Number(discount_per1).toFixed(4),
            NET_PRICE:
              item.COST_PRICE === null ? 0 : discount_amount.toFixed(2)
          }
        })

      let sum = 0
      let sumDis_Amt = 0
      let payment = 0
      let cost_sum = 0
      for (var i = 0; i < pos_barcode_detail_edit.length; i++) {
        cost_sum = cost_sum + Number(pos_barcode_detail_edit[i]['COST_PRICE'])
        sum = sum + Number(pos_barcode_detail_edit[i]['NET_PRICE'])
        sumDis_Amt =
          sumDis_Amt + Number(pos_barcode_detail_edit[i]['DISCOUNT_AMOUNT'])
        payment =
          payment + Number(pos_barcode_detail_edit[i]['ADVANCE_PAYMENT'])
      }
      const sale_tax = action.exempt == false ? state.sale_tax_per_edit : '0'
      const sale_tax_amt_edit = (Number(sum / 100) * Number(sale_tax)).toFixed(
        2
      )
      // total
      const total_amount = (Number(sum) + Number(sale_tax_amt_edit)).toFixed(2)
      let total_amount_edit = (Number(sum) + Number(sale_tax_amt_edit)).toFixed(
        2
      )
      total_amount_edit = (Number(total_amount_edit) - Number(payment)).toFixed(
        2
      )
      return {
        ...state,
        pos_barcode_detail_edit,
        total_discount_amount_edit: Number(action.dis_amount).toFixed(2),
        total_amount_per_edit: Number(
          Number(action.dis_amount / cost_sum) * 100
        ).toFixed(2),
        sale_tax_amt_edit,
        total_amount_edit,
        total_amount_edit: total_amount,
        total_advance: payment,
        dis_total_amount_edit: Number(sumDis_Amt).toFixed(2)
      }
    }

    case CHANGE_ALL_DIS_PER_EDIT: {
      const pos_barcode_detail_edit = state.pos_barcode_detail_edit
        .slice()
        .map(item => {
          let total_charge = Number(item.COST_PRICE)
          total_charge = total_charge.toFixed(2)
          let discount = (action.dis_per / 100) * total_charge
          // let discount_per = (discount / total_charge) * 100
          let discount_amount =
            action.dis_amount == 0
              ? // 0
              Number(item.COST_PRICE) - Number(discount)
              : Number(item.COST_PRICE) - Number(discount)
          return {
            ...item,
            DISCOUNT_AMOUNT: item.COST_PRICE === null ? 0 : discount,
            DISCOUNT_PER:
              item.COST_PRICE === null ? 0 : Number(action.dis_per).toFixed(4),
            NET_PRICE:
              item.COST_PRICE === null ? 0 : discount_amount.toFixed(2)
          }
        })
      let sum = 0
      let sumDis_Amt = 0
      let payment = 0
      let cost_sum = 0
      for (var i = 0; i < pos_barcode_detail_edit.length; i++) {
        cost_sum = cost_sum + Number(pos_barcode_detail_edit[i]['COST_PRICE'])
        sum = sum + Number(pos_barcode_detail_edit[i]['NET_PRICE'])
        sumDis_Amt =
          sumDis_Amt + Number(pos_barcode_detail_edit[i]['DISCOUNT_AMOUNT'])
        payment =
          payment + Number(pos_barcode_detail_edit[i]['ADVANCE_PAYMENT'])
      }

      const sale_tax = action.exempt == false ? state.sale_tax_per_edit : '0'
      const sale_tax_amt_edit = (Number(sum / 100) * Number(sale_tax)).toFixed(
        2
      )
      const total = (Number(sum) + Number(sale_tax_amt_edit)).toFixed(2)
      let total_amount_edit = (Number(sum) + Number(sale_tax_amt_edit)).toFixed(
        2
      )
      total_amount_edit = (Number(total_amount_edit) - Number(payment)).toFixed(
        2
      )
      return {
        ...state,
        pos_barcode_detail_edit,
        total_discount_amount_edit: Number(
          Number(action.dis_per / 100) * cost_sum
        ).toFixed(2),
        total_amount_per_edit: Number(action.dis_per).toFixed(2),
        sale_tax_amt_edit,
        total_amount_edit,
        total,
        total_advance: payment,
        dis_total_amount_edit: Number(sumDis_Amt).toFixed(2)
      }
    }

    case CHANGE_POS_DETAIL_USING_TAX: {
      let sum = 0
      let sumDis_Amt = 0
      let payment = 0
      for (var i = 0; i < state.pos_barcode_detail_edit.length; i++) {
        sum = sum + Number(state.pos_barcode_detail_edit[i]['NET_PRICE'])
        sumDis_Amt =
          sumDis_Amt +
          Number(state.pos_barcode_detail_edit[i]['DISCOUNT_AMOUNT'])
        payment =
          payment + Number(state.pos_barcode_detail_edit[i]['ADVANCE_PAYMENT'])
      }
      if (action.response == false) {
        const sale_tax_amt_edit = (
          Number(sum / 100) * Number(state.sale_tax_per_edit)
        ).toFixed(2)
        const total_amount = (Number(sum) + Number(sale_tax_amt_edit)).toFixed(
          2
        )
        let total = (Number(sum) + Number(sale_tax_amt_edit)).toFixed(2)
        total = total - Number(state.buyer_info.TOTAL_PAID).toFixed(2)
        let total_amount_edits = (
          Number(sum) + Number(sale_tax_amt_edit)
        ).toFixed(2)
        total_amount_edits =
          total_amount_edits == 0
            ? 0
            : (Number(total_amount_edits) - Number(payment)).toFixed(2)
        total_amount_edits =
          total_amount_edits - Number(state.buyer_info.TOTAL_PAID)
        // console.log(total_amount_edits)
        // console.log(sale_tax_amt_edit)
        return {
          ...state,
          sale_tax_amt_edit: sale_tax_amt_edit,
          total_amount_edit: total_amount,
          total_advance_edit: payment,
          net_total_edit: total_amount_edits
          // save_button1: total != '0'
        }
      } else {
        let total = Number(sum).toFixed(2)
        total = total - Number(state.buyer_info.TOTAL_PAID)
        let total_amount_edit = Number(sum).toFixed(2)
        total_amount_edit =
          total_amount_edit == 0
            ? 0
            : (Number(total_amount_edit) - Number(payment)).toFixed(2)
        total_amount_edit =
          total_amount_edit - Number(state.buyer_info.TOTAL_PAID)
        console.log(total)
        return {
          ...state,
          total_amount_edit: Number(total).toFixed(2),
          total_advance_edit: payment,
          net_total_edit: Number(total_amount_edit).toFixed(2)
          // save_button1: total != '0'
        }
      }
    }
    case DELETE_POS_BARCODE_EDIT: {
      const pos_barcode_detail_edit = state.pos_barcode_detail_edit.filter(
        item =>
          item.BARCODE_NO !== action.barcode &&
          item.REPAIRE_ID !== action.barcode
      )
      // console.log(pos_barcode_detail_edit)
      return {
        ...state,
        pos_barcode_detail_edit
      }
    }
    case GET_TAX_EDIT: {
      return {
        ...state,
        sale_tax_per_edit: action.tax
      }
    }
    case GET_POS_TABLE_DATA: {
      return {
        ...state,
        pos_receipt_detail: action.response
      }
    }
    case GET_POS_RECEPIT_BY_STORE: {
      return {
        ...state,
        pos_barcode_detail: [],
        pos_receipt_detail: action.response
      }
    }

    case DELETE_INVOICE: {
      const pos_receipt_detail = state.pos_receipt_detail.filter(
        item => item.LZ_POS_MT_ID !== action.response
      )
      return {
        ...state,
        pos_receipt_detail
      }
    }

    case GET_BUYER_INFO_EDIT: {
      return {
        ...state,
        buyer_info: action.response
      }
    }
    case GET_POS_EDIT_FORM_DATA: {
      return {
        ...state,
        pos_city: action.city
      }
    }

    case CHANGE_SAVE_BUTTON_PROPS: {
      return {
        ...state,
        button_status: action.button
      }
    }
    case REMOVE_ALL_EDIT_UNMOUNT: {
      return {
        ...state,
        buyer_info: '',
        pos_barcode_detail_edit: [],
        sale_tax_per_edit: '0',
        sale_tax_amt_edit: '0',
        total_amount_edit: '0',
        dis_total_amount_edit: '0'
      }
    }
    case UNMOUNT_POS_FORM: {
      return {
        ...state,
        // buyer_info_pos:'',
        pos_barcode_detail: [],
        sale_tax_per: '0',
        sale_tax_amt: '0',
        total_amount: '0',
        dis_total_amount: '0',
        remove_form_data : true
      }
    }
    /****
     *
     *
     * Store Data
     *
     */
    case SAVE_POS_STORE_INFO: {
      return {
        ...state,
        store_data: [...(state.store_data || []), ...action.response]
      }
    }
    case GET_POS_STORE_DATA: {
      return {
        ...state,
        store_data: action.response
      }
    }
    case DELETE_STORE: {
      const store_data = state.store_data.filter(
        item => item.LJ_POS_STORE_ID !== action.id
      )
      return {
        ...state,
        store_data
      }
    }
    case GET_POS_FORM_STATE_EDIT: {
      return {
        ...state,
        pos_state_edit: action.state
      }
    }
    case GET_POS_FORM_STORE_UPDATE: {
      let store_data = state.store_data.filter(
        item => item.LJ_POS_STORE_ID !== action.id
      )
      store_data = [...(store_data || []), ...action.data]
      return {
        ...state,
        store_data
      }
    }
    /****
     *
     * POS RECEIPT PAYMENT DETAIL
     *
     * **** */

    case GET_INVOICE_RECEIPT_DETAIL: {
      return {
        ...state,
        receipt_payment_detail: action.response
      }
    }
    case REMOVE_ALL_INVOICE_RECEIPT_DETAIL: {
      return {
        ...state,
        receipt_payment_detail: []
      }
    }
    case DELETE_INVOICE_RECEIPT_DETAIL: {
      const receipt_payment_detail = state.receipt_payment_detail.filter(
        item => item.RECEIPT_ID !== action.response
      )
      return {
        ...state,
        receipt_payment_detail
      }
    }
    case EDIT_INVOICE_RECEIPT_PAYMENT_DETAIL: {
      const receipt_payment_detail = state.receipt_payment_detail
        .slice()
        .map(item => {
          if (item.RECEIPT_ID == action.id) {
            return {
              ...item,
              AMOUNT_PAID: action.amount
            }
          }
          return item
        })
      return {
        ...state,
        receipt_payment_detail
      }
    }
    default:
      return {
        ...state
      }
  }
}
export default posReducer
