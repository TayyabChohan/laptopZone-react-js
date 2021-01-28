import axios from 'axios'
import $ from 'jquery'
import swal from 'sweetalert'
import qs from 'qs'
import { toastr } from 'react-redux-toastr'

let getUrl = window.location
let finalurl = getUrl.protocol + '//' + getUrl.hostname
//console.log(finalurl)

export const packingOrderDrop = () => {
  return dispatch => {
    axios
      .post(
        `${finalurl}/laptopzone/reactControllertest/c_react_test/packingOrderDrop`
      )
      // console.log(data)
      .then(response => {
        // $.LoadingOverlay("show");
        // console.log(response);
        dispatch({ type: packingOrderDrop, response: response.data })

        // $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message)
      })
  }
}

export const marchantDrop = () => {
  return dispatch => {
    axios
      .post(
        `${finalurl}/laptopzone/reactControllertest/c_react_test/marchantDrop`
      )
      // console.log(data)
      .then(response => {
        // $.LoadingOverlay("show");
        // console.log(response);
        dispatch({ type: marchantDrop, response: response.data })

        // $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message)
      })
  }
}

export const getPackingOrderDetail = id => {
  return dispatch => {
    //  console.log('new id' + id);

    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/getPackingOrderDetail`
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify({ id }),
      url
    }

    axios(options)
      .then(response => {
        // $.LoadingOverlay("show");
        // console.log(response);
        dispatch({ type: getPackingOrderDetail, response: response.data })

        // $.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message)
      })
  }
}

export const upDatePostage = data => {
  return dispatch => {
    // console.log(data);
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/upDatePostage`
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      url
    }

    axios(options)
      .then(response => {
        // $.LoadingOverlay("show");
        // console.log(response);
        dispatch({ type: upDatePostage, response: response.data })
        // $.LoadingOverlay("hide");
        // swal("Updated Successfully!", {
        //     icon: "success",
        // });
      })
      .catch(err => {
        console.log(err.message)
      })
  }
}

export const upDateDemension = data2 => {
  return dispatch => {
    // console.log(data2);
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/upDateDemension`
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data2),
      url
    }

    axios(options)
      .then(response => {
        // $.LoadingOverlay("show");
        // console.log(response);
        dispatch({ type: upDateDemension, response: response.data })
        // $.LoadingOverlay("hide");
        // swal("Updated Successfully!", {
        //     icon: "success",
        //  });
      })
      .catch(err => {
        console.log(err.message)
      })
  }
}

export const insertPacking2 = data => {
  return dispatch => {
    // console.log(data);
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/insertPacking`
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
        $.LoadingOverlay('show')
        // console.log(response);

        dispatch({
          type: insertPacking2,
          response: response.data.getPackingData[0]
        })
        swal(' Your Services Seccesfully Added !', {
          icon: 'success'
        })
        $.LoadingOverlay('hide')

        // } else {
        //     dispatch({ type: "error", response: response.data.response })
        //     $.LoadingOverlay("hide");

        // }
        // console.log(response.data)
      })
      .catch(err => {
        console.log(err.message)
      })
  }
}

export const insertPackingDetail = data1 => {
  return dispatch => {
     //console.log( data1);
    // console.log( data1.ITEM_ID)
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/insertPackingDetail`
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data1),
      url
    }

    axios(options)
      .then(response => {
        // $.LoadingOverlay("show");
        //console.log(response)
        dispatch({
          type: insertPackingDetail,
          response: response.data.insertPackinData,
          SELCTED_PACKING: data1.PACKING_ID,
          Order_id: data1.ORDER_ID,
          item_id: data1.item_id,
          order_packing_id: response.data.order_packing_id[0].ORDER_PACKING_ID
        })
       // console.log(data1.item_id)
        toastr.success('Success', 'Reacord inserted')
          // $.LoadingOverlay("hide");
          // swal("Inserted Successfully!", {
            //     icon: "success",
            // });
          })
          .catch(err => {
            console.log(err.message)
          })
        }
      }
      
export const detailInsertPackingName = data1 => {
  return dispatch => {
    // console.log("action", data1);
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/detailInsertPackingName`
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data1),
      url
    }

    axios(options)
      .then(response => {
        // $.LoadingOverlay("show");
        // console.log(response);

        dispatch({ type: detailInsertPackingName, response: response.data })
        // $.LoadingOverlay("hide");
        // swal("Updated Successfully!", {
        //     icon: "success",
        // });
      })
      .catch(err => {
        console.log(err.message)
      })
  }
}

export const listViewPackingName = id => {
  return dispatch => {
    // console.log("action33333", id);
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/listViewPackingName`
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify({ id }),
      url
    }

    axios(options)
      .then(response => {
        // $.LoadingOverlay("show");
        // console.log(response);
        dispatch({ type: listViewPackingName, response: response.data })
        // $.LoadingOverlay("hide");
        // swal("Inserted Successfully!", {
        //     icon: "success",
        // });
      })
      .catch(err => {
        console.log(err.message)
      })
  }
}

export const deleteListItem = (id, order_id, ebayId) => {
  return dispatch => {
    // console.log("action", id);
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/deleteListItem`
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify({ id }),
      url
    }
    // console.log(order_id)
    // console.log(id)
    axios(options)
      .then(response => {
        //  $.LoadingOverlay("show");
        // console.log(response)

        dispatch({
          type: deleteListItem,
          response: response.data.deletelist,
          remove: response.data.remove,
          id: id,
          order_id: order_id,
          ebayId:ebayId
        })

        // $.LoadingOverlay("hide");
        // swal("Deleted Successfully!", {
        //     icon: "success",
        // });
      })
      .catch(err => {
        console.log(err.message)
      })
  }
}
