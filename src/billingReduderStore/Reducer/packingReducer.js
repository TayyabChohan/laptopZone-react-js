import {
  getPacking,
  deletePacking,
  updatePacking,
  insertPacking22
} from "../../actions/packingAction.jsx";
const initialState = {
  packingData: [],
  error: ""
};

const packingReducer = (state = initialState, action) => {
  switch (action.type) {
    case getPacking: {
      return {
        ...state,
        packingData: action.response
      };
    }
    case deletePacking: {
      const packingData = state.packingData.filter(
        item => item.PACKING_ID !== action.response
      );
      return {
        ...state,
        packingData
      };
    }

    case updatePacking: {
     // console.log(action.response);
      const packingData = state.packingData.slice().map(item => {
        if (item.PACKING_ID === action.response.PACKING_ID) {
          return {
            ...item,
            PACKING_COST: "$" + action.response.PackingCostNameModel,
            PACKING_NAME: action.response.PackingNameModel,
            PACKING_TYPE: action.response.radioModel,
            PACKING_LENGTH: action.response.LengthNameModel,
            PACKING_WIDTH: action.response.widthNameModel,
            PACKING_HEIGTH: action.response.HeightNameModel,
            PACKING_WEIGTH: action.response.PackingWeigthNameModel,
            PACKING_CODE: action.response.PackingCodeNameModel
          };
        }
        return item;
      });
      return {
        ...state,
        packingData
      };
    }

    case insertPacking22: {
      return {
        ...state,
        packingData: [...state.packingData, action.response]
      };
    }

    default:
      return state;
  }
};
export default packingReducer;
