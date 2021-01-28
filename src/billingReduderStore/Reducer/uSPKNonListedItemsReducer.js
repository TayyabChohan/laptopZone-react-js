import {
  get_employee,
  get_nonListedItems,
  get_select_Radio_value,
  load_identification_data
} from "../../actions/uSPKNonListedItemsAction.js";
import {
  get_nonListedItemsImage,
  get_select_Radio_value1
} from "../../actions/allActionBytayyab.js";

const initialState = {
  employeeArray: [],
  nonListedItemsArray: [],
  imageArray:[]
};

const uSPKNonListedItemsReducer = (state = initialState, action) => {
  // console.log(this.state.templatedata)

  switch (action.type) {
    case get_employee: {
      return {
        ...state,
        employeeArray: action.response
      };
    }
    case get_nonListedItems: {
      return {
        ...state,
        nonListedItemsArray: action.response
      };
    }
    
    
    case get_select_Radio_value: {
      return {
        ...state,
        nonListedItemsArray: action.response
      };
    }
    case load_identification_data: {
      return {
        ...state,
        imageArray: action.response
      };
    }
    case get_nonListedItemsImage: {
      return {
        ...state,
        imageArray: action.response
      };
    }
    case get_select_Radio_value1: {
      return {
        ...state,
        nonListedItemsArray: action.response
      };
    }
    default:
      return state;
  }
};

export default uSPKNonListedItemsReducer;
