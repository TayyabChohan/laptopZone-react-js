import axios from "axios";
import $ from "jquery";
import swal from "sweetalert";
import qs from "qs";
import { toastr } from "react-redux-toastr";
let getUrl = window.location;
let finalurl = getUrl.protocol + "//" + getUrl.hostname;
//console.log(finalurl);

export const Filter_Data_Item_Return_add_info = data => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/Filter_Data_Item_Return_add_info`;
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
            type: Filter_Data_Item_Return_add_info,
            response: response.data.data
            //status: data.status
          });

          //toastr.error("Warning", response.data.mesages);
        }
        if (response.data.status == false) {
          dispatch({
            type: Filter_Data_Item_Return_add_info,
            response: response.data.data
            //status:
          });
          toastr.error("Warning", "No Data Found");
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
export const add_tracking_no = data => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/add_tracking_no`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };

    axios(options)
      .then(response => {
          console.log(response.data)
        if (response.data.data == true) {
          dispatch({
            type: add_tracking_no,
            response: response.data
            //status: data.status
          });
          toastr.success("Success", response.data.message);
        }
        else{
            toastr.error("Warning", "No Data Found");
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
export const local_pic_up = data => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/local_pic_up`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };

    axios(options)
      .then(response => {
          //console.log(response.data)
          try{
        if (response.data.status == false) {
          dispatch({
            type: local_pic_up,
            response: response.data
            //status: data.status
          });
          toastr.error("Error", 'NO Update for Local Pic Up');
         }
        if (response.data.status == true) {
          dispatch({
            type: local_pic_up,
            response: response.data
            //status: data.status
          });
          toastr.success("Success", 'loacaly Pic Up Updated');
         }}
         catch(err){
          toastr.error("Error", 'NO Update for Local Pic Up');
         }
      
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
