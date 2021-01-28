import axios from "axios";
import $ from "jquery";
import swal from "sweetalert";
import qs from "qs";
let getUrl = window.location;
let finalurl = getUrl.protocol + "//" + getUrl.hostname;
//console.log(finalurl);

export const get_merchant_detail = () => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/get_merchant_detail`;
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
        dispatch({ type: get_merchant_detail, response: response.data });

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

export const get_merchant_Services_Type = () => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/get_merchant_Services_Type`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(),
      url
    };

    axios(options)
      .then(response => {
         //$.LoadingOverlay("show");
        // console.log(response);
        dispatch({ type: get_merchant_Services_Type, response: response.data });

        //$.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};

export const insert_merchant_detail = data => {
  return dispatch => {
   // console.log(data);
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/insert_merchant_detail`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };

    axios(options)
      .then(response => {
        // $.LoadingOverlay("show");
        // console.log(response);
        dispatch({ type: insert_merchant_detail, response: response.data.tableData[0] });
        swal("Merchant Seccesfully Inserted !", {
          icon: "success",
      });
      $.LoadingOverlay("hide");
  })
      .catch(err => {
        console.log(err.message);
      });
  };
};

export const update_merchant_detail = data => {
  return dispatch => {
   // console.log(data);
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/update_merchant_detail`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };

    axios(options)
      .then(response => {
         $.LoadingOverlay("show");
        // console.log(response);
        dispatch({ type: update_merchant_detail, response: response.data , data: data});
        swal(" Merchant Seccesfully Updated !", {
          icon: "success",
      });
      $.LoadingOverlay("hide");
  })
      .catch(err => {
        console.log(err.message);
      });
  };
};


export const delete_merchant_detail = id => {
    return dispatch => {
     // console.log(data);
      const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/delete_merchant_detail`;
      const options = {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({id}),
        url
      };
  
      axios(options)
        .then(response => {
           $.LoadingOverlay("show");
          // console.log(response);
          dispatch({ type: delete_merchant_detail, response: response.data });
          swal("Merchant Seccesfully Updated !", {
            icon: "success",
        });
        $.LoadingOverlay("hide");
    })
        .catch(err => {
          console.log(err.message);
        });
    };
  };
  
