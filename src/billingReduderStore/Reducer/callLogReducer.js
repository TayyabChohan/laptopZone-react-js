import {
  get_merchant_City,
  form_state,
  call_log_save,
  call_log_save_all,
  Get_State_single,
  delete_log,
  update_call_log,
  Get_City_single
} from "../../actions/calllogAction.js";

const initialState = {
  
  merchantCityArray: [],
  state_pros_array: [],
  call_log_array: [],
  Get_City_singleArray: {}
};

const callLogReducer = (state = initialState, action) => {
  // console.log(this.state.templatedata)

  switch (action.type) {
    case get_merchant_City: {
      return {
        ...state,
        merchantCityArray: action.response
      };
    }
    case form_state: {
      return {
        ...state,
        state_pros_array: action.response
      };
    }
    case call_log_save: {
      return {
        ...state,
        call_log_array: [action.response, ...state.call_log_array]
      };
    }
    case call_log_save_all: {
      return {
        ...state,
        call_log_array: action.response
      };
    }
    case Get_State_single: {
      return {
        ...state,
        state_pros_array: action.response
      };
    }
    case Get_City_single: {
      return {
        ...state,
        Get_City_singleArray: action.response
      };
    }
    case delete_log: {
      var call_log_array = state.call_log_array.filter(
        item => item.LOG_ID != action.id
        // item.LOG_ID != action.id
      );
      return {
        ...state,
        call_log_array
      };
    }

    case update_call_log: {
      call_log_array = state.call_log_array.slice().map(item => {
        if (item.LOG_ID == action.data.LOG_ID) {
          return {
            ...item,
            CALL_DATE: action.data.date_update,
            CALL_SOURCE: action.data.Sourcedrop_update,
            CALL_TYPE: action.data.Type_Drop_update,
            CITY_DESC: action.data.Citydrop_update1,
            CONTACT_NO: action.data.ContactNumber_update,
            INSERT_BY: action.data.userid,
            ITEM_DESC: action.data.Description_update,
            STATE_DESC: action.data.StateDrop_update1,
            NAME: action.data.name_update,
            REMARKS: action.data.Remarks_update,
            // STATE_ID: action.data.STATE_ID,
            ADDRESS: action.data.Adress_update,
            PRICE: action.data.Price_update
          };
        }
        return item;
      });
      return {
        ...state,
        call_log_array
      };
    }

    default:
      return state;
  }
};

export default callLogReducer;
