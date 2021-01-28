import axios from 'axios';
import $ from "jquery";
import swal from "sweetalert";
import qs from 'qs';
let getUrl = window.location
let finalurl = getUrl.protocol + '//' + getUrl.hostname
//console.log(finalurl);

export const getTempdata = () => {
    return dispatch => {
        //  console.log('new id' + id);

        const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/getTempdata`
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(),
            url

        }

        axios(options)
            .then(response => {
                // $.LoadingOverlay("show");
                //console.log(response);
                dispatch({ type: getTempdata, response: response.data })

                //$.LoadingOverlay("hide");
            })
            .catch(err => {

                console.log(err.message);

            })
    }

}



export const insetTemplatedata = (Data) => {
    return dispatch => {
        // console.log(Data);

        const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/insetTemplatedata`
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url

        }

        axios(options)
            .then(response => {
                $.LoadingOverlay("show");
               // console.log(response);
                dispatch({ type: insetTemplatedata, response: response.data.tableData[0] })
                $.LoadingOverlay("hide");
                swal("Inserted Successfully!", {
                    icon: "success",
                });
            })
            .catch(err => {

                console.log(err.message);

            })
    }

}





export const shipingServiceDrowp = () => {
    return dispatch => {
        //  console.log('new id' + id);

        const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/shipingServiceDrowp`
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(),
            url

        }

        axios(options)
            .then(response => {
                // $.LoadingOverlay("show");
               // console.log(response);
                dispatch({ type: shipingServiceDrowp, response: response.data })

                //$.LoadingOverlay("hide");
            })
            .catch(err => {

                console.log(err.message);

            })
    }

}



export const deleteTamplateData = (id) => {
    return dispatch => {
        //console.log('new id' + id);

        const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/deleteTamplateData`
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify({ id }),
            url

        }

        axios(options)
            .then(response => {
                $.LoadingOverlay("show");
               // console.log(response);
                dispatch({ type: deleteTamplateData, response: response.data, id: id })
                swal(" Your Tamplate Data Seccesfully Deleted !", {
                    icon: "success",
                });
                $.LoadingOverlay("hide");
            })
            .catch(err => {

                console.log(err.message);

            })
    }

}




export const upDateTamplateData = (data) => {
    return dispatch => {
        //console.log('new id' + id);

        const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/upDateTamplateData`
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded'},
            data: qs.stringify(data),
            url

        }
        console.log(data)
        axios(options)
            .then(response => {
                $.LoadingOverlay("show");
                //console.log(response);
                dispatch({ type: upDateTamplateData, response: response.data, data: data })
                swal(" Your Tamplate Data Seccesfully Updated !", {
                    icon: "success",
                });
                $.LoadingOverlay("hide");
            })
            .catch(err => {

                console.log(err.message);

            })
    }

}







