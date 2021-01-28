import axios from "axios";
import $ from "jquery";
import swal from "sweetalert";
import qs from "qs";
import { toastr } from "react-redux-toastr";

let getUrl = window.location;
let finalurl = getUrl.protocol + "//" + getUrl.hostname;
//console.log(finalurl);

export const update_Users_List = data => {
  return dispatch => {
    // console.log(data);

    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/update_Users_List`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };

    axios(options)
      .then(response => {
        $.LoadingOverlay("show");
        //console.log(response);
        dispatch({
          type: update_Users_List,
          response: response.data,
          data: data
        });

        $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};

export const disable_And_Anable_Users_List = data => {
  return dispatch => {
    console.log(data);

    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/disable_And_Anable_Users_List`;
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
        if (data.status == 1) {
          dispatch({
            type: disable_And_Anable_Users_List,
            response: response.data,
            id: data.id,
            status: data.status
          });
          toastr.success("Enable", "User Enable Succefully");
        }
        if (data.status == 0) {
          dispatch({
            type: disable_And_Anable_Users_List,
            response: response.data,
            id: data.id
          });
          toastr.success("Disable", "User Disable Succefully");
        }
        $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};

export const get_Users_List = () => {
  return dispatch => {
    //  console.log('new id' + id);

    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/get_Users_List`;
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
        dispatch({ type: get_Users_List, response: response.data });

        $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};

export const insert_Users_List = data => {
  return dispatch => {
    console.log(data);

    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/insert_Users_List`;
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
        if (response.data.status == true) {
          dispatch({
            type: insert_Users_List,
            response: response.data.tableData[0]
          });
        } else {
          toastr.error("Error", response.data.message);
          console.log(response.data.message);
        }
        $.LoadingOverlay("hide");
        // swal("Imserted Successfully!", {
        //        icon: "success",
        //    });
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};

export const marchantDrop = () => {
  return dispatch => {
    axios
      .post(
        `${finalurl}/laptopzone/reactControllertest/c_react_test/marchantDrop`
      )
      // console.log(data)
      .then(response => {
        // $.LoadingOverlay("show");
        // console.log(response);
        dispatch({ type: marchantDrop, response: response.data });

        // $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
