import { Filter_Data_Item_Return_add_info ,add_tracking_no,
  local_pic_up} from "../../actions/add_info_action.js";

const initialState = {
  filteredArray: [],
  trackingArray:[],
  localArray:[]
};

const add_info_reducer = (state = initialState, action) => {
  switch (action.type) {
    case Filter_Data_Item_Return_add_info: {
      return {
        ...state,
        filteredArray: action.response
      };
    }
    case add_tracking_no: {
      return {
        ...state,
        trackingArray: action.response
      };
    }
    case local_pic_up: {
      return {
        ...state,
        localArray: [...state.localArray, action.response]
      };
    }

    default:
      return state;
  }
};
export default add_info_reducer;
