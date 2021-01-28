import axios from "axios";
import $ from "jquery";
import swal from "sweetalert";
import qs from "qs";
let getUrl = window.location;
let finalurl = getUrl.protocol + "//" + getUrl.hostname;
//console.log(finalurl);

export const getActiveNotListed = (id) => {
  return dispatch => {

    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/getActiveNotListed`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify({id}),
      url
    };

    axios(options)
      .then(response => {
        // $.LoadingOverlay("show");
       // console.log(response);
        dispatch({ type: getActiveNotListed, response: response.data });

        //$.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
