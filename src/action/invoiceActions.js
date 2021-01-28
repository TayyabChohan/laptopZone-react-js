import {
  GET_INVOICE_DETAIL,
  MESSAGE_SERVER,
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
} from "./allActionTypes.js";
import axios from "axios";
import qs from "qs";
import $ from "jquery";
import { toastr } from "react-redux-toastr";

let getUrl = window.location;
let finalurl = getUrl.protocol + "//" + getUrl.hostname;

export const get_invoice_detail = data => {
  return dispatch => {
    $.LoadingOverlay("show");
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_invoice_detail`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };
    axios(options)
      .then(response => {
        $.LoadingOverlay("hide");
        // if (response.data.status === true) {
        dispatch({ type: GET_INVOICE_DETAIL, response: response.data.data });
        // }
        // console.log(response)
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        dispatch({ type: MESSAGE_SERVER, response: err.message });
        console.log(err.message);
      });
  };
};

export const get_invoice_data_detail = invoice_id => {
  return dispatch => {
    $.LoadingOverlay("show");
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_invoice_data_detail`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify({ invoice_id }),
      url
    };
    axios(options)
      .then(response => {
        $.LoadingOverlay("hide");
        // if (response.data.status == true) {
        dispatch({
          type: GET_INVOICE_DATA_DETAIL,
          response: response.data.data
        });
        dispatch({
          type: GET_INVOICE_SUMMARY,
          response: response.data.invoice_summary[0]
        });
        // }
        console.log(response);
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        dispatch({ type: MESSAGE_SERVER, response: err.message });
        console.log(err.message);
      });
  };
};
export const get_specific_invoice_detail = (invocie_id, ser_rate_id) => {
  return dispatch => {
    const data = {
      invoice_id: invocie_id,
      ser_rate_id: ser_rate_id
    };

    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_specific_invoice_detail`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };
    axios(options)
      .then(response => {
        dispatch({
          type: GET_SPECIFIC_INVOICE_DETAIL,
          response: response.data.data
        });
        // console.log(response)
      })
      .catch(err => {
        dispatch({ type: MESSAGE_SERVER, response: err.message });
        console.log(err.message);
      });
  };
};

export const change_Dis_Amount = data => {
  return dispatch => {
    dispatch({
      type: CHANGE_DIS_AMOUNT,
      INV_DT_ID: data.cell,
      dis_amount: data.amount
    });
  };
};

export const change_Dis_Amount_Perc = data => {
  return dispatch => {
    dispatch({
      type: CHANGE_DIS_AMOUNT_PER,
      INV_DT_ID: data.cell,
      dis_amount_perc: data.percantage
    });
  };
};
export const Change_Charge = data => {
  return dispatch => {
    dispatch({
      type: CHANGE_CHARGE,
      INV_DT_ID: data.cell,
      dis_amount: data.amount
    });
  };
};
export const save_Discount_Amount = data => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/save_discount_amount`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };
    axios(options)
      .then(response => {
        // console.log(response)
        if (response.data.status === true) {
          dispatch({
            type: SAVE_DISCOUNT_AMOUNT,
            response: response.data.data[0].DIFF,
            invoice_id: data.invoice_id
          });
          toastr.success("Success", response.data.message);
        }
      })
      .catch(err => {
        dispatch({ type: MESSAGE_SERVER, response: err.message });
        console.log(err.message);
      });
  };
};

export const changeAllDisAmount = dis_amount => {
  return dispatch => {
    dispatch({ type: CHANGE_ALL_DIS_AMOUNT, dis_amount: dis_amount });
    // console.log(dis_amount)
  };
};
export const changeAllDisPerc = dis_perc => {
  return dispatch => {
    dispatch({ type: CHANGE_ALL_DIS_PERC, dis_perc: dis_perc });
    // console.log(dis_perc)
  };
};

export const SaveAllDisAmountChanges = data => {
  return dispatch => {
    $.LoadingOverlay("show");
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/save_all_discount_amount`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };
    axios(options)
      .then(response => {
        $.LoadingOverlay("hide");
        // console.log(response)
        dispatch({
          type: SAVE_ALL_DIS_AMOUNT_PERC_CHANGE,
          response: response.data.data,
          diff: response.data.invoice_detail[0].DIFF,
          id: response.data.id
        });
        toastr.success("Success", response.data.message);
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        dispatch({ type: MESSAGE_SERVER, response: err.message });
        console.log(err.message);
      });
  };
};
///--------------------- insert action by tayyab---------------- /////////

export const insert_payment_detail = data => {
  return dispatch => {
    console.log(data);
    $.LoadingOverlay("show");
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/insert_payment_detail`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };
    axios(options)
      .then(response => {
        $.LoadingOverlay("hide");
        console.log(response);
        dispatch({
          type: INSERT_PAYMENT_DETAIL,
          response: response.data
        });
        toastr.success("Success", response.data.message);
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        dispatch({ type: MESSAGE_SERVER, response: err.message });
        console.log(err.message);
      });
  };
};

export const get_Receipt_no = id => {
  return dispatch => {
    console.log(id);
    // $.LoadingOverlay('show')
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/get_Receipt_no`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify({ id }),
      url
    };
    axios(options)
      .then(response => {
        // $.LoadingOverlay('hide')
        console.log(response);
        dispatch({
          type: GET_RECEIPT_NO,
          response: response.data
        });
        // toastr.success('Success', response.data.message)
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        dispatch({ type: MESSAGE_SERVER, response: err.message });
        console.log(err.message);
      });
  };
};
///--------------------- insert action by tayyab---------------- /////////
