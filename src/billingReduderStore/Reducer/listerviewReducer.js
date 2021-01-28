import { LISTER_VIEW , TOTAL_PRICE , LISTER_USERS, FLTER_DATA ,PRICE_FILTER} from "../../actions/allActionBytayyab.js";

const initialState = {
  lister_view_Array: [],
  total_price_Array:'',
  lister_user_array:[]
};

const listerviewReducer = (state = initialState, action) => {
  // console.log(this.state.templatedata)

  switch (action.type) {
    case LISTER_VIEW: {
      return {
        ...state,
        lister_view_Array: action.response.data, 
      };
    }
    case TOTAL_PRICE: {
        return {
          ...state,
          total_price_Array: action.response.data 
        };
      }
    case LISTER_USERS: {
        return {
          ...state,
          lister_user_array: action.response.data 
        };
      }
    case FLTER_DATA: {
        return {
          ...state,
          lister_view_Array: action.response.data 
        };
      }
    case PRICE_FILTER: {
        return {
          ...state,
          total_price_Array: action.response.data
        };
      }
    default:
      return state;
  }
};
export default listerviewReducer;
