import { getBarcodeProcess } from "../../actions/barcodeProcessAction.js";

const initialState = {
  bacodeProcessArray: []
};

const barcodeProcessReducer = (state = initialState, action) => {
  // console.log(this.state.templatedata)

  switch (action.type) {
    case getBarcodeProcess: {
      return {
        ...state,
        bacodeProcessArray: action.response
      };
    }
    default:
      return state;
  }
};
export default barcodeProcessReducer;
