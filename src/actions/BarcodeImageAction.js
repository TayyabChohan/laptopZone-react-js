import axios from "axios";
import $ from "jquery";
import swal from "sweetalert";
import qs from "qs";
import { toastr } from "react-redux-toastr";
import {
  GET_BARCODE_DETAIL,
  GET_IMAGE_FIREBASE,
  GET_ALL_IMAGES,
  GET_ALL_BARCODE,
  GET_ALL_TIME_AND_DATE
} from "./allActionBytayyab.js";
import firebase from "../components/firebaseConfig/Firebase.js";
let getUrl = window.location;
let finalurl = getUrl.protocol + "//" + getUrl.hostname;
var db = firebase.firestore();
//console.log(finalurl);

export const get_barcode_detail = id => {
  return dispatch => {
    console.log(id);
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/get_barcode_detail`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify({ id }),
      url
    };

    axios(options)
      .then(response => {
        if (response.data.status == true) {
          dispatch({
            type: GET_BARCODE_DETAIL,
            response: response.data
          });
        } else {
          toastr.error("Error", response.data.message);
        }

        var docRef = db.collection("Barcodes").doc(id);
        docRef
          .get()
          .then(function(doc) {
            if (doc.exists) {
              var id1 = doc.data().folderBarcode;
              firebase
                .database()
                .ref("/currentFolders/" + id1)
                .once("value")
                .then(function(snapshot) {
                  var image = snapshot.val() || "Anonymous";
                  // console.log(image);
                  // $.LoadingOverlay("show");
                  //console.log(response);
                  try {
                    if (image) {
                      dispatch({
                        type: GET_IMAGE_FIREBASE,
                        image: image
                      });
                     
                    } else {
                      toastr.error("Error", "No Image Found");
                    }
                  } catch (err) {
                    console.log("Image Not Found", err);
                  }
                });
            } 
          })
          .catch(function(error) {
            console.log("Error getting document:", error);
          });
      })

      .catch(err => {
        console.log(err.message);
      });
  };
};

export const get_all_barcode = () => {
  return dispatch => {
    const url = `${finalurl}/laptopzone/reactControllertest/c_react_test/get_all_barcode`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(),
      url
    };

    axios(options)
      .then(response => {
        var recordsFirestore = [];
        //var imageURL = [];

        // console.log(response);
        // dispatch({
        //   type: GET_ALL_BARCODE
        //   // response: response.data
        //   // image: response.image
        // });
        let imageUrls_pushArray = [];

        firebase
          .database()
          .ref("/currentFolders")
          .once("value")
          .then(snapshot => {
            var all_image = snapshot.val() || "Anonymous";
            var i = 0;
            snapshot.forEach((item, index) => {
              // console.log(item);

              const imageUrl = item.val();
              var barcode = Object.keys(imageUrl);
              var bar = barcode[0];

              if (bar) {
                firebase
                  .database()
                  .ref("/currentFolders/" + bar)
                  .once("value")
                  .then(snapshot2 => {
                    var all_image = snapshot2.val();

                    try {
                      var images = all_image.imageURL;
                      images.forEach((item, index) => {
                        // console.log(item);
                        imageUrls_pushArray.push([bar, item]);
                        // console.log(imageUrls_pushArray);

                        // dispatch({
                        //   type: GET_ALL_IMAGES,
                        //   all_image1: imageUrls_pushArray
                        // });
                      });
                    } catch (err) {
                      // console.log(" image Not Found", err);
                    }
                  });
              }
            });

            if (all_image) {
              const id = Object.keys(all_image);
              id.forEach(function(prediction, index) {
                var docRef = db.collection("Barcodes").doc(prediction);
                docRef.get().then(function(doc) {
                  var date_pic = doc.data().pic_DateTime;
                  var _pic_by = doc.data().pic_taker_id;
                  var barcode = doc.data().barcode;
                  var mrchant = doc.data().MERCHANT_ID;
                  var pic_taker_name = doc.data().pic_taker_name;

                  recordsFirestore[index] = {
                    barcode,
                    _pic_by,
                    date_pic,
                    pic_taker_name,
                    mrchant
                  };
                });
              });
              dispatch({
                type: GET_ALL_TIME_AND_DATE,
                data: recordsFirestore
              });
              console.log(recordsFirestore);
            }
          });
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
