import axios from "axios";
import $ from "jquery";
import swal from "sweetalert";
import qs from "qs";
import {ADD_WEREHOUSE, GET_WER, GET_ATOU_NO} from '../actions/allActionBytayyab.js';
let getUrl = window.location;
let finalurl = getUrl.protocol + "//" + getUrl.hostname;


export const add_warhouse = (data) => {
    return dispatch => {
      const url = `${finalurl}/laptopzone/reactControllertest/c_add_werehouse/add_warhouse`;
      const options = {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(data),
        url
      };
  
      axios(options)
        .then(response => {
           $.LoadingOverlay("show");
          /// console.log(response.data.tableData[0]);
          dispatch({ type: ADD_WEREHOUSE, response: response.data.tableData[0] });
  
          $.LoadingOverlay("hide");
        })
        .catch(err => {
          console.log(err.message);
        });
    };
  };
export const get_wer = () => {
    return dispatch => {
      const url = `${finalurl}/laptopzone/reactControllertest/c_add_werehouse/get_wer`;
      const options = {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(),
        url
      };
  
      axios(options)
        .then(response => {
           $.LoadingOverlay("show");
           console.log(response);
          dispatch({ type: GET_WER, response: response.data });
  
          $.LoadingOverlay("hide");
        })
        .catch(err => {
          console.log(err.message);
        });
    };
  };
export const get_atu_no = () => {
    return dispatch => {
      const url = `${finalurl}/laptopzone/reactControllertest/c_add_werehouse/get_atu_no`;
      const options = {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(),
        url
      };
  
      axios(options)
        .then(response => {
           $.LoadingOverlay("show");
           console.log(response);
          dispatch({ type: GET_ATOU_NO, response: response.data });
  
          $.LoadingOverlay("hide");
        })
        .catch(err => {
          console.log(err.message);
        });
    };
  };
