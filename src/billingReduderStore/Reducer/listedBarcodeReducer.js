import {
  GET_OFFERUP,
  GET_LISTED_BARCODE,
  GET_CONDION,
  GET_LISTED_BARCORE_IMAGE,
  SAVE_LISTED_BARCODE,
  SAVE_LISTED_BARCODE_ALL,
  SAVE_LISTED_BARCODE_ALL_images
} from "../../actions/allActionBytayyab";

const initialState = {
  oferUpArray: [],
  getlisted_array: [],
  imag_array: [],
  conditionArray: [],
  listedbarcodeArray: [],
  listedbarcodeArray_image: []
};

const listedBarcodeReducer = (state = initialState, action) => {
  // console.log(this.state.templatedata)

  switch (action.type) {
    case GET_OFFERUP: {
      return {
        ...state,
        oferUpArray: action.response
      };
    }
    case GET_LISTED_BARCODE: {
      return {
        ...state,
        getlisted_array: action.response
      };
    }
    case GET_LISTED_BARCORE_IMAGE: {
      return {
        ...state,
        imag_array: action.response
      };
    }
    case GET_CONDION: {
      return {
        ...state,
        conditionArray: action.response
      };
    }
    case SAVE_LISTED_BARCODE: {
      return {
        ...state,
        listedbarcodeArray: [action.response,...state.listedbarcodeArray]
      };
    }
    case SAVE_LISTED_BARCODE_ALL: {
      return {
        ...state,
        listedbarcodeArray: action.response
      };
    }
    case SAVE_LISTED_BARCODE_ALL_images: {
      return {
        ...state,
        listedbarcodeArray_image: action.response
      };
    }

    default:
      return state;
  }
};

export default listedBarcodeReducer;
