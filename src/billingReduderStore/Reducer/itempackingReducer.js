import { GET_BARCODE ,GET_PACKING_DROP} from "../../actions/allActionBytayyab.js";

const initialState = {
  Get_barcodeArray: [],
  get_packing_array:[]
};
const itempackingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BARCODE: {
      return {
        ...state,
        Get_barcodeArray: action.response
      };
    }
    case GET_PACKING_DROP:{
        return{
        ...state,
        get_packing_array:action.response
        }
    }

    default:
      return state;
  }
};
export default itempackingReducer;
