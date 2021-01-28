import axios from "axios";
import $ from "jquery";
import swal from "sweetalert";
import qs from "qs";
let getUrl = window.location;
let finalurl = getUrl.protocol + "//" + getUrl.hostname;
console.log(finalurl);

export const getService = () => {
  return dispatch => {
    axios
      .get(`${finalurl}/laptopzone/reactControllertest/c_react_test/getService`)
      .then(response => {
        $.LoadingOverlay("show");
        //console.log(response);
        dispatch({ type: getService, response: response.data });
        $.LoadingOverlay("hide");
        //console.log(response.data)
      })
      .catch(err => {
        console.log(err.message);
        $.LoadingOverlay("hide");
      });
  };
};

export const insertService = data => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/insertService`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };

    // axios(options)
    //     .post(
    //         `${finalurl}/laptopzone_test/reactControllertest/c_react_test/insertService`,
    //         data)
    axios(options)
      .then(response => {
        $.LoadingOverlay("show");
        // console.log(response);
        if (response.data.status == true) {
          dispatch({
            type: insertService,
            response: response.data,
            data: response.data.services[0]
          });
          // swal(" Your Services Seccesfully Added !", {
          //     icon: "success",
          //   });
          $.LoadingOverlay("hide");
        } else {
          dispatch({ type: "error", response: response.data.response });
          $.LoadingOverlay("hide");
        }
        // console.log(response.data)
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};

export const deleteService = id => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/deleteService`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify({ SERVICE_ID: id }),
      url
    };

    //axios
    // .post( `${finalurl}/laptopzone_test/reactControllertest/c_react_test/deleteService`, { SERVICE_ID: id }
    // )
    axios(options)
      .then(response => {
        $.LoadingOverlay("show");
        //  console.log(response);
        dispatch({ type: deleteService, response: id });
        $.LoadingOverlay("hide");
        swal("Deleted Successfully!", {
          icon: "success"
        });
        //console.log(response.data)
      })

      .catch(err => {
        console.log(err.message);
        $.LoadingOverlay("hide");
      });
  };
};

export const insertServiceRate = data => {
  return dispatch => {
    // console.log(data);
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/insertServiceRate`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };

    // axios
    //     .post(
    //         `${finalurl}/laptopzone_test/reactControllertest/c_react_test/insertServiceRate`, { data }
    //     )
    axios(options)
      .then(response => {
        $.LoadingOverlay("show");
        //  console.log(response.data.tableData[0]);
        if (response.data.status == true) {
          dispatch({
            type: insertServiceRate,
            response: response.data.tableData[0]
          });
          $.LoadingOverlay("hide");
          // swal("Deleted Successfully!", {
          //     icon: "success",
          //   });
          // console.log(response.data)
        } else {
          dispatch({
            response: response.data.message
          });
        }
      })

      .catch(err => {
        console.log(err.message);
        $.LoadingOverlay("hide");
      });
  };
};

export const getServiceRate = userId => {
  return dispatch => {
    // console.log(userId);
    axios
      .get(
        `${finalurl}/laptopzone/reactControllertest/c_react_test/getServiceRate`,
        { userId }
      )
      .then(response => {
        $.LoadingOverlay("show");
        if (response.data.status === true) {
          var serviceRate = [];
          serviceRate = response.data;
          dispatch({ type: getServiceRate, response: serviceRate });
          $.LoadingOverlay("hide");
        } else {
        }
      })
      .catch(err => {
        console.log(err.message);
        // $.LoadingOverlay("hide");
      });
  };
};

export const deleteServiceRate = id => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/deleteServiceRate`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify({ ser_rate_id: id }),
      url
    };

    axios(options)
      .then(response => {
        $.LoadingOverlay("show");

        dispatch({ type: deleteServiceRate, response: id });
        $.LoadingOverlay("hide");
        swal("Deleted Successfully!", {
          icon: "success"
        });
        //console.log(response.data)
      })

      .catch(err => {
        console.log(err.message);
        $.LoadingOverlay("hide");
      });
  };
};

export const upDateSerViceRate = (id, service_Charges) => {
//   console.log("charges"+ service_Charges);
//   console.log("id"+id);
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/upDateSerViceRate`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify( {id, service_Charges} ),
      url
    };

    axios(options)
      .then(response => {
        //console.log(response);
        $.LoadingOverlay("show");
        dispatch({
          type: upDateSerViceRate,
          response: id,
          ser_rate_id: id,
          service_charges: service_Charges
        });
        $.LoadingOverlay("hide");
        swal("Updated Successfully!", {
          icon: "success"
        });
        //console.log(response.data)
      })

      .catch(err => {
        console.log(err.message);
        $.LoadingOverlay("hide");
      });
  };
};
