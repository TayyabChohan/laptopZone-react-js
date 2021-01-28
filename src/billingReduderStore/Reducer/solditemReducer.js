import { getSoldItem } from "../../actions/soldItemAction.js";

const initialState = {
  solditemArray: []
};

const solditemReducer = (state = initialState, action) => {
  // console.log(this.state.templatedata)

  switch (action.type) {
    case getSoldItem: {
      return {
        ...state,
        solditemArray: action.response
      };
    }
    default:
      return state;
  }
};
export default solditemReducer;
