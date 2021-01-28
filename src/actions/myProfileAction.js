import axios from "axios";
import $ from "jquery";
import swal from "sweetalert";
import qs from "qs";
let getUrl = window.location;
let finalurl = getUrl.protocol + "//" + getUrl.hostname;
//console.log(finalurl);

export const insert_MyProfile = (data, fd) => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/insert_MyProfile`;
    const options = {
      method: "POST",
      dataType: 'json',
      //           url : finalUrl,  // Controller URL
      //           type : 'POST',
      //           data : formData,
                cache : false,
                contentType : false,
                processData : false,
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data, fd),
      url
    };

    axios(options)
      .then(response => {
        $.LoadingOverlay("show");
        // console.log(response);
        dispatch({ type: insert_MyProfile, response: response.data });

        $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};

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
        $.LoadingOverlay("show");
        // console.log(response);
        dispatch({ type: get_merchant_City, response: response.data });

        $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};

export const get_MyProfile = (merchant_id) => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/get_MyProfile`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify({merchant_id}),
      url
    };

    axios(options)
      .then(response => {
       // $.LoadingOverlay("show");
         console.log(response);
         dispatch({ type: get_MyProfile, response: response.data.data, image:response.data.image });

       // $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
