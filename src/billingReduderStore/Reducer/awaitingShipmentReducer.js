import { get_Awaiting_Shipment } from "../../actions/awaitingShipmentAction.js";

const initialState = {
    AwaitingShipmentArray: []
};

const awaitingShipmentReducer = (state = initialState, action) => {
  // console.log(this.state.templatedata)

  switch (action.type) {
    case get_Awaiting_Shipment: {
      return {
        ...state,
        AwaitingShipmentArray: action.response
      };
    }
    default:
      return state;
  }
};
export default awaitingShipmentReducer;
