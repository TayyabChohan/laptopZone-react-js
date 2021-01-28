import axios from "axios";
import $ from "jquery";
import swal from "sweetalert";
import qs from "qs";
import { toastr } from "react-redux-toastr";
let getUrl = window.location;
let finalurl = getUrl.protocol + "//" + getUrl.hostname;

export const get_merchant_City = () => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/get_merchant_City`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(),
      url
    }; 

    axios(options)
      .then(response => {
        // $.LoadingOverlay("show");
        // console.log(response);
        dispatch({ type: get_merchant_City, response: response.data });

        //$.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
export const form_state = data => {
  $.LoadingOverlay("show");
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/form_state`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };

    axios(options)
      .then(response => {
        $.LoadingOverlay("hide");

        dispatch({ type: form_state, response: response.data.state });
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
export const call_log_save = data => {
  $.LoadingOverlay("show");
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/call_log_save`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };

    axios(options)
      .then(response => {
        if (response.data.state == true) {
          $.LoadingOverlay("hide");
          dispatch({ type: call_log_save, response: response.data.data[0] });
          toastr.success("Success", "Save Seccessfuly");
          //   swal(" Seccesfully Save !", {
          //     icon: "success",
          // });
        } else {
          $.LoadingOverlay("hide");
          toastr.error("Error", "Data Not Saved ");
        }
      })

      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err.message);
      });
  };
}; 
export const call_log_save_all = () => {
  $.LoadingOverlay("show");
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/call_log_save_all`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(),
      url
    };

    axios(options)
      .then(response => {
        $.LoadingOverlay("hide");
        console.log(response.data.data);
        dispatch({ type: call_log_save_all, response: response.data.data });
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
export const Get_State_single = () => {
  $.LoadingOverlay("show");
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/Get_State_single`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(),
      url
    };

    axios(options)
      .then(response => {
        $.LoadingOverlay("hide");
        console.log(response.data);
        dispatch({ type: Get_State_single, response: response.data.state });
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
export const Get_City_single = () => {
  $.LoadingOverlay("show");
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/Get_City_single`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(),
      url
    };

    axios(options)
      .then(response => {
        $.LoadingOverlay("hide");
        console.log(response.data);
        dispatch({ type: Get_City_single, response: response.data.state });
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
export const delete_log = id => {
  $.LoadingOverlay("show");
  console.log(id);
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/delete_log`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify({ id }),
      url
    };

    axios(options)
      .then(response => {
        $.LoadingOverlay("hide");
        console.log(response.data);
        dispatch({ type: delete_log, response: response.data, id: id });
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
export const update_call_log = data => {
  $.LoadingOverlay("show");
  console.log(data);
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/update_call_log`;
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
          type: update_call_log,
          response: response.data,
          data: data
        });
        swal(" Seccesfully Updated !", {
          icon: "success"
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
