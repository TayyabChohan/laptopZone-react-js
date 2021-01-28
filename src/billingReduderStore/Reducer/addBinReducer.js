import { GET_BIN , ADD_BIN, SEARCH_PRINTSATUS ,load_ware_data} from "../../actions/allActionBytayyab.js";

const initialState = {
  Get_binArray: []
};
const addBinReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BIN: {
      return {
        ...state,
        Get_binArray: action.response
      };
    }
    case ADD_BIN: {
      return {
        ...state,
        Get_binArray:[...state.Get_binArray,  ...action.response]
      };
    }
    case SEARCH_PRINTSATUS: {
      return {
        ...state,
        Get_binArray: action.response
      };
    }
    case load_ware_data: {
      return {
        ...state,
        Get_binArray: action.response
      };
    }

    default:
      return state;
  }
};
export default addBinReducer;
