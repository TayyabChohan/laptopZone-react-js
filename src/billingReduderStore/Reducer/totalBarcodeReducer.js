import { totalBarcode } from "../../actions/totalBarcodeAction.js";

const initialState = {
  tBarcodeArray: []
};

const totalBarcodeReducer = (state = initialState, action) => {
  // console.log(this.state.templatedata)

  switch (action.type) {
    case totalBarcode: {
      return {
        ...state,
        tBarcodeArray: action.response
      };
    }
    default:
      return state;
  }
};

export default totalBarcodeReducer;
