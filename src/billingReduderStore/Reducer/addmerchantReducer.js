import {
  get_merchant_detail,
  get_merchant_City,
  get_merchant_Services_Type,
  update_merchant_detail,
  insert_merchant_detail
} from "../../actions/addmerchatAction.js";

const initialState = {
  merchantDetailArray: [],
  merchantCityArray: [],
  merchantServiceTypeArray: []
};

const addmerchantReducer = (state = initialState, action) => {
  // console.log(this.state.templatedata)

  switch (action.type) {
    case get_merchant_detail: {
      return {
        ...state,
        merchantDetailArray: action.response
      };
    }

    case get_merchant_City: {
      return {
        ...state,
        merchantCityArray: action.response
      };
    }
    case insert_merchant_detail: {
      return {
        ...state,
        merchantDetailArray: [...state.merchantDetailArray, action.response]
      };
    }

    case get_merchant_Services_Type: {
      return {
        ...state,
        merchantServiceTypeArray: action.response
      };
    }

    case update_merchant_detail: {
      const merchantDetailArray = state.merchantDetailArray
        .slice()
        .map(item => {
          if (item.MERCHANT_ID == action.data.MERCHANT_ID) {
            return {
                ...item,

                CONTACT_PERSON:action.data.MerchantNameUpdate,
                BUISNESS_NAME:action.data.BuisnessNameUpdate,
                ADDRESS:action.data.MerchantAddressUpdate,
                CONTACT_NO:action.data.MerchantPhoneUpdate,
                ACTIVE_FROM:action.data.dateFromUpdate,
                ACTIVE_TO:action.data.datetoUpdate,
                CITY_ID:action.data.SelectCityUpdate,
                SERVICE_ID:action.data.SelectServiceTypeUpdate

            };
          }
          return item;
        });
        //console.log(action.response.dateFromUpdate)
      return {
        ...state,
        merchantDetailArray
      };
    }

    default:
      return state;
  }
};
export default addmerchantReducer;
