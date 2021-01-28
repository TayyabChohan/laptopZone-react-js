import axios from 'axios';
import $ from "jquery";
import swal from "sweetalert";
import qs from 'qs';
import {
    LISTER_VIEW, TOTAL_PRICE , LISTER_USERS , FLTER_DATA, PRICE_FILTER
  } from "./allActionBytayyab.js";
let getUrl = window.location
let finalurl = getUrl.protocol + '//' + getUrl.hostname

//console.log(finalurl);

export const lister_view = (data) => {
    return dispatch => {
        //  console.log('new id' + id);

        const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/lister_view`
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify({data}),
            url

        }

        axios(options)
            .then(response => {
                // $.LoadingOverlay("show");
                console.log(response);
                dispatch({ type: LISTER_VIEW, response: response })

                // console.log(response);
                // dispatch({ type: TOTAL_PRICE, response: response })

                //$.LoadingOverlay("hide");
            })
            .catch(err => {

                console.log(err.message);

            })
    }

}
export const sum_total_listing = (data) => {
    return dispatch => {
        //  console.log('new id' + id);

        const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/sum_total_listing`
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify({data}),
            url

        }

        axios(options)
            .then(response => {
                // $.LoadingOverlay("show");
                console.log(response);
                dispatch({ type: TOTAL_PRICE, response: response })
            })
            .catch(err => {

                console.log(err.message);

            })
    }

}

export const ListerUsers = () => {
    return dispatch => {
        //  console.log('new id' + id);

        const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/ListerUsers`
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(),
            url

        }

        axios(options)
            .then(response => {
                // $.LoadingOverlay("show");
                console.log(response);
                dispatch({ type: LISTER_USERS, response: response })
            })
            .catch(err => {

                console.log(err.message);

            })
    }

}
export const filter_data = (data) => {
    return dispatch => {
          console.log(data);

        const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/filter_data`
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
            url

        }

        axios(options)
            .then(response => {
                 $.LoadingOverlay("show");
                //console.log(response.data);
                dispatch({ type: FLTER_DATA, response: response })
                $.LoadingOverlay("hide");
            })
            .catch(err => {

                console.log(err.message);

            })
    }

}
export const price_fiter = (data) => {
    return dispatch => {
          console.log(data);

        const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/price_fiter`
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
            url

        }

        axios(options)
            .then(response => {
                // $.LoadingOverlay("show");
                console.log(response.data[0]);
                dispatch({ type: PRICE_FILTER, response: response })
            })
            .catch(err => {

                console.log(err.message);

            })
    }

}
