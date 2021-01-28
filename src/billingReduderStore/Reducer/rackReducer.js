import { DROPDOWN_WER_DESC , DROPDOWN_RACK_TYPE,ADD_RACK, GET_RACK } from "../../actions/allActionBytayyab.js";

const initialState = {
  drowpWerDescArray: [],
  drowpRackTypeArray: [],
  get_rack_array:[]
};
const rackReducer = (state = initialState, action) => {
  switch (action.type) {
    case DROPDOWN_RACK_TYPE: {
      return {
        ...state,
        drowpRackTypeArray: action.response
      };
    }
    case DROPDOWN_WER_DESC: {
      return {
        ...state,
        drowpWerDescArray: action.response
      };
    }
    case GET_RACK: {
      return {
        ...state,
        get_rack_array: action.response
      };
    }
    case ADD_RACK: {
      return {
        ...state,
        get_rack_array : [...state.get_rack_array, ...action.response]
      };
    }
    default:
      return state;
  }
};
export default rackReducer;
