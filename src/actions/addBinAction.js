import axios from "axios";
import $ from "jquery";
import swal from "sweetalert";
import qs from "qs";
import {
  GET_BIN,
  ADD_BIN,
  SEARCH_PRINTSATUS,
} from "../actions/allActionBytayyab.js";
let getUrl = window.location;
let finalurl = getUrl.protocol + "//" + getUrl.hostname;

export const load_ware_data = () => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_add_werehouse/load_ware_data`;
    const options = {
      method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(),
        url
    };

    axios(options)
      .then(response => {
        // $.LoadingOverlay("show");
        //console.log(response.data);
        dispatch({ type: load_ware_data, response: response.data });

        // $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
export const get_bin = () => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_add_werehouse/get_bin`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(),
      url
    };

    axios(options)
      .then(response => {
        // $.LoadingOverlay("show");
        //console.log(response.data);
        dispatch({ type: GET_BIN, response: response.data });

        // $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
export const add_bin = data => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_add_werehouse/add_bin`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };
    axios(options)
      .then(response => {
        // $.LoadingOverlay("show");
        //console.log(response.data.data);
        dispatch({ type: ADD_BIN, response: response.data.data });

        // $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
export const Search_printStatus = data => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_add_werehouse/Search_printStatus`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };
    axios(options)
      .then(response => {
        // $.LoadingOverlay("show");
        // console.log(response.data);
        dispatch({ type: SEARCH_PRINTSATUS, response: response.data });

        // $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};

export const print_all_bin = data => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_add_werehouse/print_all_bin?Bin_type=${
      data.Bin_type
    }?print_single_bin?=${data.PrintStatus}`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };
    axios(options)
      .then(response => {
        // $.LoadingOverlay("show");
        //console.log(response.data);
        dispatch({ type: SEARCH_PRINTSATUS, response: response.data });

        // $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
