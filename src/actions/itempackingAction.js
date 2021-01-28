import axios from "axios";
import $ from "jquery";
import swal from "sweetalert";
import qs from "qs";
import {
  GET_BARCODE,
  GET_PACKING_DROP,
  UPDATEPACKING
} from "../actions/allActionBytayyab.js";
import { toastr } from "react-redux-toastr";
let getUrl = window.location;
let finalurl = getUrl.protocol + "//" + getUrl.hostname;

export const get_barcode = data => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_add_werehouse/get_barcode`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };

    axios(options)
      .then(response => {
        // $.LoadingOverlay("show");
        //console.log(response.data.bar_deta)
         if(response.data.status == true){
         // console.log(response.data.bar_deta)
        dispatch({ type: GET_BARCODE, response: response.data.bar_deta });

         toastr.success("Success",'Barcode Detail Found');
         }
         if(response.data.status == false)
        {
          dispatch({ type: GET_BARCODE, response: response.data.bar_deta });
          toastr.error("Waring",'Barcode Detail Not Found');
         }
        
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
export const get_packing_drop = () => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_add_werehouse/get_packing_drop`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(),
      url
    };

    axios(options)
      .then(response => {
        // $.LoadingOverlay("show");
        //console.log(response.data);
       
        dispatch({ type: GET_PACKING_DROP, response: response.data });
        
        // $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
export const updatePacking = data => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_add_werehouse/updatePacking`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };

    axios(options)
      .then(response => {
        // $.LoadingOverlay("show");
       // console.log(response.data);
        
        dispatch({ type: UPDATEPACKING, response: response.data });
        toastr.success("Success",'Barcode Save Sucesfully');
        // $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
