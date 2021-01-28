import axios from "axios";
import $ from "jquery";
import qs from "qs";
import { toastr } from "react-redux-toastr";
import { GET_LZW_REQUESTS, GET_LZW_NEW_REQUESTS_SOCKET } from "./allActions";
import { MESSAGE_SERVER } from "../../action/allActionTypes.js";
import io from "socket.io-client";
import { NOTIFICATION, ERROR } from "../LZW_repair/Events";
let finalurl = "http://71.78.236.20:3002";

export const get_requests = () => {
  return dispatch => {
    axios
      .get(`${finalurl}/getOrderRequest`)
      .then(response => {
        console.log(response);
        dispatch({
          type: GET_LZW_REQUESTS,
          response: response.data.data
        });
      })
      .catch(err => {
        // toastr.success("Success", err.message);
        dispatch({ type: MESSAGE_SERVER, response: err.message });
        console.log(err.message);
      });
  };
};
export const giveRequestOffer = data => {
  return dispatch => {
    if (data) {
      const url = `${finalurl}/giveRequestOffer`;
      const options = {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(data),
        url
      };
      axios(options)
        .then(response => {
          console.log(response);
          //   if (response.data.insert_appointment.status === true) {
          //     // dispatch({
          //     //   type: INSERT_NEW_APPOINTMENT,
          //     //   response: response.data.insert_appointment_dt.data[0]
          //     // });
          //     toastr.success("Success", response.data.insert_appointment.message);
          //   } else {
          //     dispatch({
          //       type: SWEET_ALERT_ERROR_MESSAGE,
          //       response: response.data.insert_appointment.message
          //     });
          //   }

          // console.log(response.data.insert_appointment.status)
        })

        .catch(err => {
          dispatch({ type: MESSAGE_SERVER, response: err.message });
          console.log(err.message);
        });
    }
  };
};
export const initSocket = () => {
  return dispatch => {
    const socket = io(finalurl);
    socket.on("connect", () => {
      console.log("Connected");
    });
    socket.on(NOTIFICATION, result => {
      dispatch({
        type: GET_LZW_NEW_REQUESTS_SOCKET,
        response: result.data
      });
    });
  };
};
