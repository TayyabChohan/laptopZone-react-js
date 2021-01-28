import axios from "axios";
import $ from "jquery";
import swal from "sweetalert";
import qs from "qs";
let getUrl = window.location;
let finalurl = getUrl.protocol + "//" + getUrl.hostname;
//console.log(finalurl);

export const last_ten_barcode = () => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/last_ten_barcode`;
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
        dispatch({ type: last_ten_barcode, response: response.data });

        $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};

export const get_master_Barcode = (bardcode) => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/get_master_Barcode`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify({bardcode}),
      url
    };

    axios(options)
      .then(response => {
      //  $.LoadingOverlay("show");
        // console.log(response);
        dispatch({ type: get_master_Barcode, response: response.data });

       // $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};


export const get_master_detail = (bardcode) => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/get_master_detail`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify({bardcode}),
      url
    };

    axios(options)
      .then(response => {
       // $.LoadingOverlay("show");
        // console.log(response);
        dispatch({ type: get_master_detail, response: response.data });

       // $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};

export const get_object_DrowpDown = () => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/get_object_DrowpDown`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(),
      url
    };

    axios(options)
      .then(response => {
      //  $.LoadingOverlay("show");
        // console.log(response);
        dispatch({ type: get_object_DrowpDown, response: response.data });

       // $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};

export const get_condition_DrowpDown = () => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/get_condition_DrowpDown`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(),
      url
    };

    axios(options)
      .then(response => {
      //  $.LoadingOverlay("show");
        // console.log(response);
        dispatch({ type: get_condition_DrowpDown, response: response.data });

       // $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};

export const get_bin_DrowpDown = () => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/get_bin_DrowpDown`;
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
        dispatch({ type: get_bin_DrowpDown, response: response.data });

       // $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};

export const updateWeight = (data) => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/updateWeight`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };

    axios(options)
      .then(response => {
        //$.LoadingOverlay("show");
        // console.log(response);
        dispatch({ type: updateWeight, response: response.data });

        //$.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};

export const updateDekittingRemarks = (data2) => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/updateDekittingRemarks`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data2),
      url
    };

    axios(options)
      .then(response => {
       // $.LoadingOverlay("show");
        // console.log(response);
        dispatch({ type: updateDekittingRemarks, response: response.data });

       // $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};

export const updateMasterDetial = (data) => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/updateMasterDetial`;
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
        dispatch({ type: updateMasterDetial, response:data });
        swal(' Updeted Seccesfully!', {
          icon: 'success'
        })
        $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};

export const deleteMasterDetail = (id) => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/deleteMasterDetail`;
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
        dispatch({ type: deleteMasterDetail, response: id });

        $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};

export const saveMasterDetail = (data) => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/saveMasterDetail`;
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
        dispatch({ type: saveMasterDetail, response: response.data.getlatestData[0] });
        swal('Data Seccesfully Added!', {
          icon: 'success'
        })
        $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};

export const print_us_pk = (id) => {
  console.log(id)
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/print_us_pk`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify({id}),
      url
    };

    axios(options)
      .then(response => {
        $.LoadingOverlay("show");
         console.log(response);
        dispatch({ type: print_us_pk, response: id });
        // swal(' Your Data Seccesfully Added !', {
        //   icon: 'success'
        // })
        $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};