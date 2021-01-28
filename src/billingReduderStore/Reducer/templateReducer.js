import {
  getTempdata,
  shipingServiceDrowp,
  deleteTamplateData,
  upDateTamplateData,
  insetTemplatedata
} from "../../actions/templateAction.js";

const initialState = {
  templatedata: [],
  shipdata: []
};

const templateReducer = (state = initialState, action) => {
  // console.log(this.state.templatedata)

  switch (action.type) {
    case getTempdata: {
      return {
        ...state,
        templatedata: action.response
      };
    }

    case insetTemplatedata: {
      return {
        ...state,
        templatedata: [...state.templatedata, action.response]
      };
    }

    case shipingServiceDrowp: {
      return {
        ...state,
        shipdata: action.response
      };
    }

    case upDateTamplateData: {
      const templatedata = state.templatedata.slice().map(item => {
        if (item.TEMPLATE_ID == action.data.TEMPLATE_ID) {
          return {
            ...item,
            TEMPLATE_NAME: action.data.TemplateNameupdate,
            EBAY_LOCAL: action.data.SiteIDupdate,
            CURRENCY: action.data.Currencyupdate,
            LIST_TYPE: action.data.selectListingTypeupdate,
            SHIP_FROM_ZIP_CODE: action.data.ZipCodeupdate,
            SHIP_FROM_LOC: action.data.ShipFromLoactionupdate,
            PAYMENT_METHOD: action.data.PaymentMethodupdate,
            PAYPAL_EMAIL: action.data.PaypalEmailAddressupdate,
            DISPATCH_TIME_MAX: action.data.DispatchTimeMaxupdate,
            SHIPPING_SERVICE: action.data.selectshippingserviceupdate,
            SHIPPING_COST: action.data.ShppingServiceCostupdate,
            ADDITIONAL_COST: action.data.ShppingServiceAdditionalCostupdate,
            RETURN_OPTION: action.data.selectreturnOptionupdate,
            RETURN_DAYS: action.data.ReturnsWithinOptionupdate,
            SHIPPING_PAID_BY: action.data.selectshingPaidupdate
            // item: action.data
          };
        }
        return item;
      });
      return {
        ...state,
        templatedata
      };
    }

    case deleteTamplateData: {
      const templatedata = state.templatedata.filter(
        item => item.TEMPLATE_ID != action.id
      );
      return {
        ...state,
        templatedata
      };
    }

    default:
      return state;
  }
};

export default templateReducer;
