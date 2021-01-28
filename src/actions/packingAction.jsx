import axios from 'axios';
import $ from "jquery";
import swal from "sweetalert";
import qs from 'qs';
let getUrl = window.location
let finalurl = getUrl.protocol + '//' + getUrl.hostname
//console.log(finalurl);

  

export const insertPacking22 = (data) => {
    return dispatch => {
        // console.log(data);
        const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/insertPacking22`
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
            url
        }
        // axios
        //     .post(
        //         `${finalurl}/laptopzone_test/reactControllertest/c_react_test/insertPacking`,
        //         data)
        //     // console.log(data)
        axios(options)
            .then(response => {
                $.LoadingOverlay("show");
                // console.log(response);

                dispatch({ type: insertPacking22, response: response.data.getPackingData[0] })
                swal(" Your Services Seccesfully Added !", {
                    icon: "success",
                });
                $.LoadingOverlay("hide");

                // } else {
                //     dispatch({ type: "error", response: response.data.response })
                //     $.LoadingOverlay("hide");

                //}
                // console.log(response.data)
            })
            .catch(err => {

                console.log(err.message);

            })
    }

}


export const getPacking = () => {
    return dispatch => {

        axios
            .post(
                `${finalurl}/laptopzone/reactControllertest/c_react_test/getPacking`
            )
            // console.log(data)
            .then(response => {
                $.LoadingOverlay("show");
                // console.log(response);
                if(response.data.status == true){
                    dispatch({ type: getPacking, response: response.data.getPackingData })
                // swal(" Your Services Seccesfully Added !", {
                //     icon: "success",
                //   });
                $.LoadingOverlay("hide");

                // } else {
                //     dispatch({ type: "error", response: response.data.response })
                //     $.LoadingOverlay("hide");

                //}
                // console.log(response.data)

                }
                else{
                    dispatch({
                        response: response.data.message
                    })
                }
                
            })
            .catch(err => {

                console.log(err.message);

            })
    }

}



export const deletePacking = (id) => {
    // console.log(id);
    return dispatch => {

        const url =  `${finalurl}/laptopzone/reactControllertest/c_react_test/deletePacking`
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify({PACKING_ID: id}),
            url
        }

        // axios
        //     .post(
        //         `${finalurl}/laptopzone_test/reactControllertest/c_react_test/deletePacking`, {
                    
        //         }
        //     )
            // console.log(id)
            axios(options)
            .then(response => {
                $.LoadingOverlay("show");
                // console.log(response);

                dispatch({ type: deletePacking, response: id })
                swal(" Your Packing Data Seccesfully Deleted !", {
                    icon: "success",
                });
                $.LoadingOverlay("hide");

                // } else {
                //     dispatch({ type: "error", response: response.data.response })
                //     $.LoadingOverlay("hide");

                //}
                // console.log(response.data)
            })
            .catch(err => {

                console.log(err.message);

            })
    }

}



export const updatePacking = ( data) => {
    // console.log(id);
    //console.log(data)
    return dispatch => {

        const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/updatePacking`
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
            url
        }

        // axios
        //     .post(
        //         `${finalurl}/laptopzone/reactControllertest/c_react_test/updatePacking`,
        //         data

        //     )
            // console.log(id)
            axios(options)
            .then(response => {
                 $.LoadingOverlay("show");
                // console.log(response);

                dispatch({ type: updatePacking, response: data })
                 swal(" Your Packing Data Seccesfully Updated !", {
                     icon: "success",
                   });
                 $.LoadingOverlay("hide");

                // } else {
                //     dispatch({ type: "error", response: response.data.response })
                //     $.LoadingOverlay("hide");

                //}
                // console.log(response.data)
            })
            .catch(err => {

                console.log(err.message);

            })
    }

}



