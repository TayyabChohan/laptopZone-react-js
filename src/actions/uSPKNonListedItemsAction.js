import axios from "axios";
import $ from "jquery";
import swal from "sweetalert";
import qs from "qs";
import {
  get_nonListedItemsImage,
  get_select_Radio_value1
} from "./allActionBytayyab.js"
let getUrl = window.location;
let finalurl = getUrl.protocol + "//" + getUrl.hostname;
//console.log(finalurl);

export const get_employee = () => {
  return dispatch => {
    //  console.log('new id' + id);

    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/get_employee`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(),
      url
    };

    axios(options)
      .then(response => {
        $.LoadingOverlay("show");
        //console.log(response);
        dispatch({ type: get_employee, response: response.data });

        $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};

export const get_nonListedItems = () => {
  return dispatch => {
    //  console.log('new id' + id);

    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/get_nonListedItems`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(),
      url
    };

    axios(options)
      .then(response => {
        $.LoadingOverlay("show");
        console.log(response.data);
        dispatch({ type: get_nonListedItems, response: response.data.query });
        dispatch({ type: get_nonListedItemsImage, response: response.data.iamges });

        $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};


export const get_select_Radio_value = data => {
  return dispatch => {
    console.log(data);

    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/get_select_Radio_value`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };

    axios(options)
      .then(response => {
        $.LoadingOverlay("show");
        console.log(response.data.images);
        console.log(response.data.query);
        dispatch({ type: get_select_Radio_value, response: response.data.images });
        dispatch({ type: get_select_Radio_value1, response: response.data.query });

        $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
export const load_identification_data = () => {
  return dispatch => {
    // console.log(data);

    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/load_identification_data`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(),
      url
    };

    axios(options)
      .then(response => {
        $.LoadingOverlay("show");
        console.log(response.data.images.filter(item => item.image));
        dispatch({
          type: load_identification_data,
          response: response.data.images.filter(item => item.image)
        });

        $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
