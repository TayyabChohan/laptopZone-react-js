import {
  GET_BARCODE_DETAIL,
  GET_ALL_IMAGES,
  GET_IMAGE_FIREBASE,
  GET_ALL_BARCODE,
  GET_ALL_TIME_AND_DATE
} from "../../actions/allActionBytayyab.js";

const initialState = {
  barcodeImageArray: [],
  barcode_detailArray: [],
  getAllBarcodeArray: [],
  get_all_imageArray: [],
  pic_date_merchant_array: []
};

const BarcodeImageReducer = (state = initialState, action) => {
  // console.log(this.state.templatedata)

  switch (action.type) {
    case GET_IMAGE_FIREBASE: {
      return {
        ...state,
        barcodeImageArray: action.image.imageURL
      };
    }
    case GET_BARCODE_DETAIL: {
      return {
        ...state,
        barcode_detailArray: action.response.data
      };
    }
    case GET_ALL_BARCODE: {
      return {
        ...state,
        getAllBarcodeArray: action.response
      };
    }
    case GET_ALL_IMAGES: {
      // let get_all_imageArray = [
      //   ...state.get_all_imageArray,
      //   ...action.date_pic
      // ];
      // get_all_imageArray = [...get_all_imageArray, ...action.pic_by];
      return {
        ...state,
        get_all_imageArray: action.all_image1
      };
    }

    case GET_ALL_TIME_AND_DATE: {
      return {
        ...state,
        pic_date_merchant_array: action.data
      };
    }
    default:
      return state;
  }
};
export default BarcodeImageReducer;
