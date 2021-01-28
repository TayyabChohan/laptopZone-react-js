import { get_Shipped } from "../../actions/shippedAction";

const initialState = {
    shippedArray: []
};

const shippedReducer = (state = initialState, action) => {
  // console.log(this.state.templatedata)

  switch (action.type) {
    case get_Shipped: {
      return {
        ...state,
        shippedArray: action.response
      };
    }
    default:
      return state;
  }
};
export default shippedReducer;
