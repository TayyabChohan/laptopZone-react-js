import axios from "axios";
import $ from "jquery";
import swal from "sweetalert";
import qs from "qs";
import { toastr } from "react-redux-toastr";
import {
  FILTER_DATA_RADIO,
  UNDO_DATA,
  PRINT_BARCODE,
  SAVE_DATA_MANUALY,
  DISPLAY_BARCODE,
  PROCESS_ID
} from "./allActionBytayyab.js";
let getUrl = window.location;
let finalurl = getUrl.protocol + "//" + getUrl.hostname;
//console.log(finalurl);

export const post_item_returns = () => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/post_item_returns`;
    const options = {
      method: "GET",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(),
      url
    };

    axios(options)
      .then(response => {
        $.LoadingOverlay("show");
        //  console.log(response);
        dispatch({ type: post_item_returns, response: response.data });

        $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};

export const insertedDate = data => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/insertedDate`;
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
        dispatch({ type: insertedDate, response: response.data });
        // console.log(response.data)
        $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};

export const process_Return = data => {
  // console.log(data);
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/process_Return`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };

    axios(options)
      .then(response => {
        //$.LoadingOverlay("show");
        // console.log(response.data.data);

        if (response.data.status == true) {
          const url =
            `${finalurl}/laptopzone/reactControllertest/c_react_test/print_barcode/` +
            data.return_Id;
          window.open(url);
          dispatch({
            type: process_Return,
            response: response.data.data[0].RETURN_PROCESSED,
            id: data.return_Id
          });
          // console.log(response.data)
          // $.LoadingOverlay("hide");
          swal("Successfully Processed!", {
            icon: "success"
          });
        } else {
          toastr.error("Error", "Barcode allready Exist");
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};

export const get_location = location_value => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/get_location`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify({ location_value }),
      url
    };

    axios(options)
      .then(response => {
        // $.LoadingOverlay("show");
        if (response.data.status == true) {
          //console.log(response);
          dispatch({ type: get_location, response: response.data });
          // console.log(response.data)
          //  $.LoadingOverlay("hide");
        } else {
          toastr.error("Error", response.data.message);
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
export const sellerDrop = () => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/sellerDrop`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url
    };

    axios(options)
      .then(response => {
        // $.LoadingOverlay("show");

        //console.log(response);
        dispatch({ type: sellerDrop, response: response.data });
        // console.log(response.data)
        //  $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
export const reasonDrop = () => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/reasonDrop`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url
    };

    axios(options)
      .then(response => {
        // $.LoadingOverlay("show");

        //console.log(response);
        dispatch({ type: reasonDrop, response: response.data });
        // console.log(response.data)
        //  $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
export const downlaodReturns = data => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/downlaodReturns`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };

    axios(options)
      .then(response => {
        //$.LoadingOverlay("show");

        //console.log(response);
        dispatch({ type: downlaodReturns, response: response.data });
        // console.log(response.data)

        // $.LoadingOverlay("hide");

        swal("Successfully Downloaded!", {
          icon: "success"
        });
        window.location.reload();
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
export const FiterDeta_radio = id => {
  // console.log(id);
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/FiterDeta_radio`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify({ id }),
      url
    };

    axios(options)
      .then(response => {
        // $.LoadingOverlay("show");

        //console.log(response);
        dispatch({ type: FILTER_DATA_RADIO, response: response.data });
        // console.log(response.data)
        $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};

export const undo_data = id => {
  //console.log(id);
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/undo_data`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify({ id }),
      url
    };

    axios(options)
      .then(response => {
        $.LoadingOverlay("show");
        // console.log(response.data.data[0]);
        // console.log(id);
        if (response.data.status == true) {
          dispatch({
            type: UNDO_DATA,
            response: response.data.data[0].RETURN_PROCESSED,
            id: id
            //status: data.status
          });

          toastr.success("Enable", "Succefully Barcode Undo");
        }
        // console.log(response);
        // dispatch({ type: UNDO_DATA, response: response.data, id: });
        // console.log(response.data)
        $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};

export const save_data_manualy = data => {
  //console.log(id);
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/save_data_manualy`;
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
        if (response.data.status == true) {
          // console.log(response.data.data[0]['RETURNID']);

          dispatch({
            type: SAVE_DATA_MANUALY,
            response: response.data.data[0],
            return_id: response.data.data[0]["RETURNID"],
            show: true
            //status: data.status
          });

          toastr.success("Successfully", "Inserted Data");
        } else {
          // dispatch({
          //  // type: SAVE_DATA_MANUALY,
          //   // response: [],
          //   // show: false
          //   //status: data.status
          // });
          toastr.error("Error", "Return Id allready Exist");
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
export const print_barcode = id => {
  //console.log(id);
  return dispatch => {
    const url =
      `${finalurl}/laptopzone/reactControllertest/c_react_test/print_barcode/` +
      id;
    window.open(url);
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify({ id }),
      url
    };

    axios(options)
      .then(response => {})
      .catch(err => {
        console.log(err.message);
      });
  };
};

export const filter_data_item_return = data => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/filter_data_item_return`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };

    axios(options)
      .then(response => {
        $.LoadingOverlay("show");
        if (response.data.status == true) {
          dispatch({
            type: filter_data_item_return,
            response: response.data.data
            //status: data.status
          });

          toastr.error("Warning", response.data.mesages);
        }
        if (response.data.status == false) {
          dispatch({
            type: filter_data_item_return,
            response: response.data.data
            //status:
          });
          toastr.error("Warning", 'No Data Found');
        }
        
        $.LoadingOverlay("hide");
        // if (response.data.status == false) {
        //   toastr.error("Error", response.data.message);
        // }
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
export const displayBarcode = id => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/displayBarcode`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify({ id }),
      url
    };

    axios(options)
      .then(response => {
        $.LoadingOverlay("show");

        dispatch({
          type: DISPLAY_BARCODE,
          response: response.data,
          check: true
        });
        $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
export const process_id = id => {
  return dispatch => {
    dispatch({
      type: PROCESS_ID,
      id: id
    });
  };
};
