import { ADD_WEREHOUSE, GET_WER,GET_ATOU_NO } from "../../actions/allActionBytayyab.js";

const initialState = {
  addwerehouseArray: [],
  addauto_no_array:[]
};
const addwerehouseReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_WEREHOUSE: {
      return {
        ...state,
        addwerehouseArray: [...state.addwerehouseArray, action.response]
      };
    }
    case GET_WER: {
      return {
        ...state,
        addwerehouseArray: action.response
      };
    }
    case GET_ATOU_NO: {
      return {
        ...state,
        addauto_no_array: action.response
      };
    }
   
    default:
      return state;
  }
};
export default addwerehouseReducer;
