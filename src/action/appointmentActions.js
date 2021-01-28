import {
  GET_SERVICES_FOR_APPOINTMENT,
  GET_APPOINTMENT_DETAIL,
  CENCEL_APPOINTMENT,
  ADMIN_APPROVED_APPOINTMENT,
  USER_INQUEUE_APPOINTMENT,
  GET_SPECIFIC_SEVICES_NO_RECORD,
  INSERT_NEW_APPOINTMENT,
  MESSAGE_SERVER,
  SWEET_ALERT_SUCCESS_MESSAGE,
  CUSTOM_PROCESS_APPOINTMENT,
  SWEET_ALERT_ERROR_MESSAGE,
  GET_SPECIFIC_SEVICES,
  PROCESS_APPOINTMENT,
  COMPLETE_APPOINTMENT,
  CUSTOM_PROCESS_APPOINTMENT_FAIL,
  GET_SPECIFIC_LOG_DETAIL,
  DELETE_SPECIFIC_LOG_DETAIL,
  SEARCH_PROCESS_APPOINTMENT,
  DELETE_SPECIFIC_LOG_ALL_DETAIL,
  SEARCH_BARCODE,
  REMOVE_SEARCH_BARCODES,
  SET_DIFF_MINS,
  GET_APPOINTMENT_SUMMARY,
  APPOINTMENT_MERCHANT_LOT,
  ADD_LOT_BARCODE_APPOINTMENT,
  LOT_PROCESS_APPOINTMENT,
  REMOVE_LOT_BARCODES,
  SAVE_ALL_LOT_BARCODES,
  UPDATE_TIME_AFTER_SAVE,
  DELETE_ALLAPPOINTMENT_BARCODES,
  SAVE_APPOINTMENT_PACKING,
  SAVE_ALL_APPOINTMENT_PACKING,
  GET_APPOINTMENT_PACKING,
  UPDATE_APPOINTMENT_PACKING,
  UPDATE_ALL_APPOINTMENT_PACKING
} from "./allActionTypes.js";
import axios from "axios";
import "gasparesganga-jquery-loading-overlay";
import $ from "jquery";
import qs from "qs";
import { toastr } from "react-redux-toastr";

let getUrl = window.location;
let finalurl = getUrl.protocol + "//" + getUrl.hostname;

export const get_Services = () => {
  return dispatch => {
    axios
      .get(`${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_services`)
      .then(response => {
        // console.log(response)
        dispatch({
          type: GET_SERVICES_FOR_APPOINTMENT,
          response: response.data.data
        });
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        dispatch({ type: MESSAGE_SERVER, response: err.message });
        console.log(err.message);
      });
  };
};

export const inser_Appointment = data => {
  return dispatch => {
    if (data) {
      $.LoadingOverlay("show");
      const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/insert_appointment`;
      const options = {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(data),
        url
      };
      axios(options)
        .then(response => {
          // console.log(response)
          $.LoadingOverlay("hide");
          if (response.data.insert_appointment.status === true) {
            dispatch({
              type: INSERT_NEW_APPOINTMENT,
              response: response.data.insert_appointment_dt.data[0]
            });
            toastr.success("Success", response.data.insert_appointment.message);
          } else {
            $.LoadingOverlay("hide");
            dispatch({
              type: SWEET_ALERT_ERROR_MESSAGE,
              response: response.data.insert_appointment.message
            });
          }

          // console.log(response.data.insert_appointment.status)
        })

        .catch(err => {
          $.LoadingOverlay("hide");
          dispatch({ type: MESSAGE_SERVER, response: err.message });
          console.log(err.message);
        });
    }
    $.LoadingOverlay("hide");
  };
};

export const get_appointment_summary = data => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_appointment_summary`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };
    axios(options)
      .then(response => {
        // console.log(response)
        dispatch({
          type: GET_APPOINTMENT_SUMMARY,
          response: response.data.data[0],
          time: response.data.time[0],
          total_charge: response.data.total_charge,
          packing_cost: response.data.packing_cost
        });
      })
      .catch(err => {
        dispatch({ type: MESSAGE_SERVER, response: err.message });
        console.log(err.message);
      });
  };
};
export const get_Appointment_Detail = (user_id, merchant_id) => {
  // console.log(user_id)
  // console.log(merchant_id)
  return dispatch => {
    $.LoadingOverlay("show");
    axios
      .get(
        `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_appointmentdetail`,
        {
          params: {
            user_id: user_id,
            merchant_id: merchant_id
          }
        }
      )
      .then(response => {
        $.LoadingOverlay("hide");
        dispatch({
          type: GET_APPOINTMENT_DETAIL,
          response: response.data.data
        });
        // console.log(response)
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        dispatch({ type: MESSAGE_SERVER, response: err.message });
        console.log(err.message);
      });
  };
};

export const cencel_Appointment = (cell_id, user_id) => {
  return dispatch => {
    // console.log(cell_id)
    $.LoadingOverlay("show");
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/cancel_appointment`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify({ cell_id, user_id }),
      url
    };
    axios(options)
      .then(response => {
        $.LoadingOverlay("hide");
        dispatch({
          type: CENCEL_APPOINTMENT,
          response: cell_id,
          status: user_id == 2 ? "Cancel By Admin" : "Cancel By User"
        });
        // console.log(response)
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        dispatch({ type: MESSAGE_SERVER, response: err.message });
        console.log(err.message);
      });
  };
};

export const approved_APPOINTMENT = (cell_id, user_id, status) => {
  return dispatch => {
    // console.log(cell_id)
    // console.log(user_id)
    // console.log(status)
    $.LoadingOverlay("show");
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/approve_appointment`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify({ cell_id, user_id, status }),
      url
    };
    axios(options)
      .then(response => {
        $.LoadingOverlay("hide");
        dispatch({
          type: ADMIN_APPROVED_APPOINTMENT,
          response: cell_id,
          status:
            status == "inqueue" || status == "send to approvel"
              ? "Approved"
              : status == "Approved"
              ? "In Process"
              : status == "In Process"
              ? "Complete"
              : status == "Cancel By Admin"
              ? "inqueue"
              : status == "Cancel By User"
              ? "inqueue "
              : status == "Complete"
              ? "In Process"
              : ""
        });
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        dispatch({ type: MESSAGE_SERVER, response: err.message });
        console.log(err.message);
      });
  };
};
export const pending_Appointment = (cell_id, user_id) => {
  return dispatch => {
    $.LoadingOverlay("show");
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/send_to_approve`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify({ cell_id, user_id }),
      url
    };
    axios(options)
      .then(response => {
        $.LoadingOverlay("hide");
        dispatch({
          type: USER_INQUEUE_APPOINTMENT,
          response: cell_id,
          status: "inqueue"
        });
        // console.log(response)
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        dispatch({ type: MESSAGE_SERVER, response: err.message });
        console.log(err.message);
      });
  };
};

export const get_specific_services = cell_id => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_specific_services`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify({ cell_id }),
      url
    };
    axios(options)
      .then(response => {
        // if (response.data.status == true) {
        dispatch({
          type: GET_SPECIFIC_SEVICES,
          response: response.data.data
        });
        // } else {
        // dispatch({
        //   type: GET_SPECIFIC_SEVICES_NO_RECORD,
        //   response: response.data.message
        // })
        // }
        // console.log(response)
      })
      .catch(err => {
        dispatch({ type: MESSAGE_SERVER, response: err.message });
        console.log(err.message);
      });
  };
};
export const save_date_appointmetnt_Barcode_log = data => {
  return dispatch => {
    // console.log(data)
    $.LoadingOverlay("show");
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/save_date_appointmetnt_Barcode_log`;
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
        if (response.data.status) {
          dispatch({
            type: UPDATE_TIME_AFTER_SAVE,
            response: response.data.time[0],
            data: response.data.data,
            total_charge: response.data.total_charge
          });
          toastr.success("Success", response.data.message);
        } else {
          toastr.error("Error", response.data.message);
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        toastr.error("Error", err.message);
      });
  };
};
export const diff_Mins = data => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/diff_mins`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };
    axios(options)
      .then(response => {
        if (response.data.status == true) {
          dispatch({ type: SET_DIFF_MINS, response: response.data.data[0] });
        }

        // console.log(response.data.data[0])
      })
      .catch(err => {
        dispatch({ type: MESSAGE_SERVER, response: err.message });
        console.log(err.message);
      });
  };
};
export const in_process_appointment = (data, reduceData) => {
  return dispatch => {
    // console.log(data)
    $.LoadingOverlay("show");
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/in_process_appointment`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };
    axios(options)
      .then(response => {
        // console.log(response.data)
        $.LoadingOverlay("hide");
        if (response.data.status == true) {
          toastr.success("Success", response.data.message);

          dispatch({
            type: PROCESS_APPOINTMENT,
            id: reduceData.id,
            data: response.data.data,
            total: response.data.update_total,
            time: response.data.update_time[0],
            status:
              reduceData.status == "Approved"
                ? "In Process"
                : reduceData.status == "Complete"
                ? "In Process"
                : "In Process"
          });
          dispatch({
            type: GET_APPOINTMENT_SUMMARY,
            response: response.data.summary[0],
            time: response.data.update_time[0],
            total_charge: response.data.total_charge,
            packing_cost: response.data.packing_cost
          });
        } else {
          $.LoadingOverlay("hide");
          toastr.error("Error", response.data.message);
        }

        // console.log(response)
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        dispatch({ type: MESSAGE_SERVER, response: err.message });
        console.log(err.message);
      });
  };
};

export const complete_appointment = id => {
  return dispatch => {
    // console.log(id)
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/complete_appointment`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify({ id }),
      url
    };
    axios(options)
      .then(response => {
        if (response.data.status == true) {
          toastr.success("Success", response.data.message);
          dispatch({ type: COMPLETE_APPOINTMENT, id: id, status: "Complete" });
        } else {
          toastr.error("Error", response.data.message);
        }

        // console.log(response)
      })
      .catch(err => {
        dispatch({ type: MESSAGE_SERVER, response: err.message });
        console.log(err.message);
      });
  };
};
export const checkCustomBarcode = (data, reduceData) => {
  return dispatch => {
    $.LoadingOverlay("show");
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/custom_barcode_in_process`;
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
        if (response.data.status == true) {
          toastr.success("Success", response.data.message);
          // const total_process_barcode = response.data.data.map(item => {
          //   return item.APP
          // })
          // console.log(total_process_barcode)
          dispatch({
            type: CUSTOM_PROCESS_APPOINTMENT,
            id: reduceData.id,
            barcode: data.barcode,
            data: response.data.data[0],
            defaultstat: reduceData,
            time: response.data.update_time[0],
            status:
              reduceData.status == "Approved"
                ? "In Process"
                : reduceData.status == "Complete"
                ? "In Process"
                : "In Process"
          });
          dispatch({
            type: GET_APPOINTMENT_SUMMARY,
            response: response.data.summary[0],
            time: response.data.update_time[0],
            total_charge: response.data.total_charge,
            packing_cost: response.data.packing_cost
          });
        } else {
          $.LoadingOverlay("hide");
          toastr.error("Error", response.data.message);
          // dispatch({ type: CUSTOM_PROCESS_APPOINTMENT_FAIL })
        }

        // console.log(response)
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        dispatch({ type: MESSAGE_SERVER, response: err.message });
        console.log(err.message);
      });
  };
};
export const get_specific_log_detail = cell => {
  return dispatch => {
    // console.log(cell)
    $.LoadingOverlay("show");
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_specific_log_detail`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify({ cell }),
      url
    };
    axios(options)
      .then(response => {
        $.LoadingOverlay("hide");
        dispatch({
          type: GET_SPECIFIC_LOG_DETAIL,
          response: response.data.data
        });
        // console.log(response)
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        dispatch({ type: MESSAGE_SERVER, response: err.message });
        console.log(err.message);
      });
  };
};
export const delete_appointment_services = data => {
  return dispatch => {
    $.LoadingOverlay("show");
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/delete_appointment_services`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };
    axios(options)
      .then(response => {
        // console.log(response)
        $.LoadingOverlay("hide");
        // if (
        //   response.data.status === true &&
        //   response.data.appointmentstatus == 'Approved'
        // ) {

        if (response.data.status == true) {
          dispatch({
            type: DELETE_SPECIFIC_LOG_ALL_DETAIL,
            response: data,
            barcode: data.barcode_no,
            appointmentstatus: response.data.appointmentstatus,
            appointment_id: data.appointment_id
            // summary: response.data.summary[0],
            // time: response.data.update_time[0]
          });
          dispatch({
            type: GET_APPOINTMENT_SUMMARY,
            response: response.data.summary[0],
            time: response.data.update_time[0],
            total_charge: response.data.total_charge,
            packing_cost: response.data.packing_cost
          });
        }
        // }
        // else {
        //   dispatch({
        //     type: DELETE_SPECIFIC_LOG_DETAIL,
        //     response: data,
        //     appointment_id: data.appointment_id
        //   })
        // }
        toastr.success("Success", "Barcode Delete SuccessFully");
        // console.log(response)
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        dispatch({ type: MESSAGE_SERVER, response: err.message });
        console.log(err.message);
      });
  };
};

export const save_Appointment_Packing = data => {
  return dispatch => {
    $.LoadingOverlay("show");
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/save_appointment_packing`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };
    axios(options)
      .then(response => {
        $.LoadingOverlay("hide");
        // console.log(response.data.data)
        if (response.data.status == true) {
          toastr.success("Success", response.data.message);
          dispatch({ type: SAVE_APPOINTMENT_PACKING });
          dispatch({
            type: UPDATE_APPOINTMENT_PACKING,
            barcode: data.barcode,
            response: response.data.data
          });
          dispatch({
            type: GET_APPOINTMENT_SUMMARY,
            response: response.data.summary[0],
            time: response.data.update_time[0],
            total_charge: response.data.total_charge,
            packing_cost: response.data.packing_cost
          });
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        dispatch({ type: MESSAGE_SERVER, response: err.message });
        console.log(err.message);
      });
  };
};

export const add_packing_all_appointment_barcode = data => {
  return dispatch => {
    $.LoadingOverlay("show");
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/add_packing_all_appointment_barcode`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };
    axios(options)
      .then(response => {
        $.LoadingOverlay("hide");
        if (response.data.status == true) {
          toastr.success("Success", response.data.message);
          dispatch({ type: SAVE_ALL_APPOINTMENT_PACKING });
          dispatch({
            type: UPDATE_ALL_APPOINTMENT_PACKING,
            response: response.data.data
          });
        }
        dispatch({
          type: GET_APPOINTMENT_SUMMARY,
          response: response.data.summary[0],
          time: response.data.update_time[0],
          total_charge: response.data.total_charge,
          packing_cost: response.data.packing_cost
        });
        // console.log(response)
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        dispatch({ type: MESSAGE_SERVER, response: err.message });
        console.log(err.message);
      });
  };
};

export const get_all_appointment_packing = data => {
  return dispatch => {
    $.LoadingOverlay("show");
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_all_appointment_packing`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify({ appointment_id: data }),
      url
    };
    axios(options)
      .then(response => {
        $.LoadingOverlay("hide");
        // console.log(response)
        dispatch({
          type: GET_APPOINTMENT_PACKING,
          response: response.data.data
        });
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        dispatch({ type: MESSAGE_SERVER, response: err.message });
        console.log(err.message);
      });
  };
};
export const search_barcode = data => {
  return dispatch => {
    $.LoadingOverlay("show");
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/search_barcode`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };
    axios(options)
      .then(response => {
        $.LoadingOverlay("hide");
        dispatch({ type: SEARCH_BARCODE, response: response.data.data });
        // console.log(response)
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        dispatch({ type: MESSAGE_SERVER, response: err.message });
        console.log(err.message);
      });
  };
};
export const InsertSearchCustomBarcode = (data, reduceData) => {
  return dispatch => {
    $.LoadingOverlay("show");
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/custom_barcode_in_process`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };
    axios(options)
      .then(response => {
        $.LoadingOverlay("hide");
        if (response.data.status == true) {
          toastr.success("Success", response.data.message);

          dispatch({
            type: SEARCH_PROCESS_APPOINTMENT,
            id: reduceData.id,
            log_id: reduceData.log_id,
            barcode: data.barcode,
            service_id: data.service_id,
            data: response.data.data[0],
            defaultstat: reduceData,
            status:
              reduceData.status == "Approved"
                ? "In Process"
                : reduceData.status == "Complete"
                ? "In Process"
                : "In Process"
          });
        } else {
          $.LoadingOverlay("hide");
          toastr.error("Error", response.data.message);
          // dispatch({ type: CUSTOM_PROCESS_APPOINTMENT_FAIL })
        }

        // console.log(response)
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        dispatch({ type: MESSAGE_SERVER, response: err.message });
        console.log(err.message);
      });
  };
};

export const InsertLotCustomBarcode = (data, reduceData) => {
  return dispatch => {
    $.LoadingOverlay("show");
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/custom_barcode_in_process`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };
    axios(options)
      .then(response => {
        $.LoadingOverlay("hide");
        if (response.data.status == true) {
          toastr.success("Success", response.data.message);

          dispatch({
            type: LOT_PROCESS_APPOINTMENT,
            id: reduceData.id,
            log_id: reduceData.log_id,
            barcode: data.barcode,
            service_id: data.service_id,
            data: response.data.data[0],
            defaultstat: reduceData,
            status:
              reduceData.status == "Approved"
                ? "In Process"
                : reduceData.status == "Complete"
                ? "In Process"
                : "In Process"
          });
        } else {
          $.LoadingOverlay("hide");
          toastr.error("Error", response.data.message);
          // dispatch({ type: CUSTOM_PROCESS_APPOINTMENT_FAIL })
        }

        // console.log(response)
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        dispatch({ type: MESSAGE_SERVER, response: err.message });

        console.log(err.message);
      });
  };
};

export const save_all_lot_barcode = (data, reduceData) => {
  return dispatch => {
    $.LoadingOverlay("show");
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/save_all_lot_barcode`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };
    axios(options)
      .then(response => {
        $.LoadingOverlay("hide");
        // console.log(response.data.total_update)
        if (response.data.status == true) {
          dispatch({
            type: SAVE_ALL_LOT_BARCODES,
            id: reduceData.id,
            log_id: reduceData.log_id,
            data: response.data.data,
            total: response.data.total_update,
            status:
              reduceData.status == "Approved"
                ? "In Process"
                : reduceData.status == "Complete"
                ? "In Process"
                : "In Process"
          });
          toastr.success("Success", response.data.message);
        } else {
          toastr.error("Error", response.data.message);
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        dispatch({ type: MESSAGE_SERVER, response: err.message });
        console.log(err.message);
      });
  };
};
export const get_lot_aganist_appointment_merchant = data => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_lot_aganist_appointment_merchant`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };
    axios(options)
      .then(response => {
        dispatch({ type: APPOINTMENT_MERCHANT_LOT, response: response.data });
        // console.log(response)
      })
      .catch(err => {
        dispatch({ type: MESSAGE_SERVER, response: err.message });

        console.log(err.message);
      });
  };
};

export const get_appointment_lot_barcode_detail = data => {
  return dispatch => {
    $.LoadingOverlay("show");

    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/get_appointment_lot_barcode_detail`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };
    axios(options)
      .then(response => {
        // console.log(response)

        $.LoadingOverlay("hide");
        if (response.data.status == true) {
          dispatch({
            type: ADD_LOT_BARCODE_APPOINTMENT,
            response: response.data.data
          });
        } else {
          $.LoadingOverlay("hide");
          dispatch({
            type: ADD_LOT_BARCODE_APPOINTMENT,
            response: response.data.data
          });
          toastr.error("Error", response.data.message);
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        dispatch({ type: MESSAGE_SERVER, response: err.message });
        console.log(err.message);
      });
  };
};
export const add_barcode_aganist_lot_and_barcode = (data, reducerData) => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/add_barcode_aganist_lot_and_barcode`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };
    axios(options)
      .then(response => {
        // console.log(response)
      })
      .catch(err => {
        // console.log(err.message)
      });
  };
};

export const delete_all_appointment_barcode = (data, reducerData) => {
  return dispatch => {
    $.LoadingOverlay("show");
    const url = `${finalurl}/laptopzone/reactcontroller/c_haziqreact/delete_all_appointment_barcode`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };
    axios(options)
      .then(response => {
        $.LoadingOverlay("hide");

        dispatch({
          type: DELETE_ALLAPPOINTMENT_BARCODES,
          response: reducerData.id
        });
        if (response.data.status == true) {
          dispatch({
            type: GET_APPOINTMENT_SUMMARY,
            response: response.data.summary[0],
            time: response.data.update_time[0],
            total_charge: response.data.total_charge,
            packing_cost: response.data.packing_cost
          });
        }
        toastr.success("Success", response.data.message);
        // console.log(response.data.update_time)
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        dispatch({ type: MESSAGE_SERVER, response: err.message });
        console.log(err.message);
      });
  };
};
export const Remove_Search_Barcodes = () => {
  return dispatch => {
    dispatch({
      type: REMOVE_SEARCH_BARCODES
    });
  };
};
export const Remove_Lot_Barcodes = () => {
  return dispatch => {
    dispatch({
      type: REMOVE_LOT_BARCODES
    });
  };
};
