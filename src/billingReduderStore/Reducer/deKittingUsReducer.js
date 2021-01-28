import {
  last_ten_barcode,
  get_master_Barcode,
  get_master_detail,
  get_object_DrowpDown,
  get_condition_DrowpDown,
  get_bin_DrowpDown,
  updateWeight,
  updateDekittingRemarks,
  deleteMasterDetail,
  updateMasterDetial,
  saveMasterDetail
} from "../../actions/deKittingUsAction.js";

const initialState = {
  barcodeArray: [],
  masterBarcodeArray: [],
  masterDetailArray: [],
  objectArray: [],
  conditionArray: [],
  binArray: []
};

const deKittingUsReducer = (state = initialState, action) => {
  // console.log(this.state.templatedata)

  switch (action.type) {
    case last_ten_barcode: {
      return {
        ...state,
        barcodeArray: action.response
      };
    }
    case saveMasterDetail: {
      return {
        ...state,
        masterDetailArray: [...state.masterDetailArray, action.response]
      };
    }
    case get_master_Barcode: {
      return {
        ...state,
        masterBarcodeArray: action.response
      };
    }

    case get_master_detail: {
      return {
        ...state,
        masterDetailArray: action.response
      };
    }

    case get_object_DrowpDown: {
      return {
        ...state,
        objectArray: action.response
      };
    }
    case get_condition_DrowpDown: {
      return {
        ...state,
        conditionArray: action.response
      };
    }
    case updateWeight: {
      return {
        ...state
        // masterDetailArray:[ action.response
      };
    }

    case updateDekittingRemarks: {
      return {
        ...state
        // masterDetailArray:[ action.response
      };
    }
    case get_bin_DrowpDown: {
      return {
        ...state,
        binArray: action.response
      };
    }
    

    case updateMasterDetial: {
      // console.log(action.response);
       const masterDetailArray = state.masterDetailArray.slice().map(item => {
         if (item.LZ_DEKIT_US_DT_ID === action.response.LZ_DEKIT_US_DT_ID) {
           return {
             ...item,
             COND_NAME:action.response.conditiondataName,
             BIN_NO: action.response.selectBinName,
             OBJECT_NAME: action.response.objectdataname,
             DEKIT_REMARKS: action.response.DekittingRemarks,
             WEIGHT: action.response.Weight,
             
           };
         }
         return item;
       });
       return {
         ...state,
         masterDetailArray
       };
     }
    case deleteMasterDetail: {
      const masterDetailArray = state.masterDetailArray.filter(
        item => item.LZ_DEKIT_US_DT_ID !== action.response
      );
      return {
        ...state,
        masterDetailArray
      };
    }
    default:
      return state;
  }
};
export default deKittingUsReducer;
