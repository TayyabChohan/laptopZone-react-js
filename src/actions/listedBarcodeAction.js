import axios from "axios";
import $ from "jquery";
import swal from "sweetalert";
import qs from "qs";
import { toastr } from "react-redux-toastr";
import {
  GET_OFFERUP,
  GET_LISTED_BARCODE,
  GET_LISTED_BARCORE_IMAGE,
  GET_CONDION,
  //SAVE_LISTED_BARCODE,
  SAVE_LISTED_BARCODE_ALL,
  SAVE_LISTED_BARCODE_ALL_images
} from "./allActionBytayyab.js";

let getUrl = window.location;
let finalurl = getUrl.protocol + "//" + getUrl.hostname;

export const get_offerUp = () => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/get_offerUp`;
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
        dispatch({ type: GET_OFFERUP, response: response.data.data });

        //$.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
export const Get_listed_barcode = data => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/Get_listed_barcode`;
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
        if(response.data.status ==  true){
          dispatch({ type: GET_LISTED_BARCODE, response: response.data.data });

          toastr.success("Seccuss", "Detail Found ");
        }
        else{
          toastr.error("Error", "Detail not Found");
        }
       
         })
      .catch(err => {
        console.log(err.message);
      });
  };
};
export const Get_Image_DecodeBase64 = data => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/Get_Image_DecodeBase64`;
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
        dispatch({
          type: GET_LISTED_BARCORE_IMAGE,
          response: response.data.uri
        });

        //$.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
export const get_conditionArray = () => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/get_conditionArray`;
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
        dispatch({
          type: GET_CONDION,
          response: response.data.data
        });

        //$.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
// export const Save_listed_barcode = data => {
//   //$.LoadingOverlay("show");
//   console.log(data);
//   return dispatch => {
//     const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/Save_listed_barcode`;
//     const options = {
//       method: "POST",
//       headers: { "content-type": "application/x-www-form-urlencoded" },
//       data: qs.stringify(data),
//       url
//     };

//     axios(options)
//       .then(response => {
//        // $.LoadingOverlay("hide");
//         console.log(response);
//         if(response.data.state == true){
//           dispatch({
//             type: SAVE_LISTED_BARCODE,
//             response: response.data.data,
        
//           });
//           toastr.success("Seccuss", "Succefully Save");
//         }
//         else{
//           toastr.error('Error', 'Barcode Already Exist');
          
//         }
        
//         // swal(" Seccesfully Updated !", {
//         //   icon: "success"
//         // });
//       })
//       .catch(err => {
//         console.log(err.message);
//       });
//   };
// };
export const get_listed_barcode_all = () => {
  //$.LoadingOverlay("show");
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/get_listed_barcode_all`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(),
      url
    };

    axios(options)
      .then(response => {
       // $.LoadingOverlay("hide");
        // console.log(response.data.query);
        // console.log(response.data.images);
        dispatch({ type: SAVE_LISTED_BARCODE_ALL, response: response.data.query });
        dispatch({ type: SAVE_LISTED_BARCODE_ALL_images, response: response.data.images });
        // swal(" Seccesfully Updated !", {
        //   icon: "success"
        // });
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
