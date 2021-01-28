import axios from "axios";
import $ from "jquery";
import swal from "sweetalert";
import qs from "qs";
import {
  DROPDOWN_WER_DESC,
  DROPDOWN_RACK_TYPE,
  ADD_RACK,
  GET_RACK
} from "../actions/allActionBytayyab.js";
let getUrl = window.location;
let finalurl = getUrl.protocol + "//" + getUrl.hostname;

export const dropdown_wer_desc = () => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_add_werehouse/dropdown_wer_desc`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(),
      url
    };

    axios(options)
      .then(response => {
        // $.LoadingOverlay("show");
        console.log(response.data);
        dispatch({ type: DROPDOWN_WER_DESC, response: response.data });

        // $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
export const dropdown_rack_type = () => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_add_werehouse/dropdown_rack_type`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(),
      url
    };

    axios(options)
      .then(response => {
        // $.LoadingOverlay("show");
        console.log(response);
        dispatch({ type: DROPDOWN_RACK_TYPE, response: response.data });

        //$.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
export const get_Rack = () => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_add_werehouse/get_Rack`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(),
      url
    };

    axios(options)
      .then(response => {
        // $.LoadingOverlay("show");
        console.log(response);
        dispatch({ type: GET_RACK, response: response.data });

        //$.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
export const add_rack = data => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_add_werehouse/add_rack`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };

    axios(options)
      .then(response => {
        $.LoadingOverlay("show");
        console.log(response);
        dispatch({ type: ADD_RACK, response: response.data.data });

        $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
