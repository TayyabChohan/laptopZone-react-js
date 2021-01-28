import { getActiveNotListed } from "../../actions/activeNotListedAction.js";

const initialState = {
  listNotActiveArray: []
};

const activeNotListedReducer = (state = initialState, action) => {
  // console.log(this.state.templatedata)

  switch (action.type) {
    case getActiveNotListed: {
      return {
        ...state,
        listNotActiveArray: action.response
      };
    }
    default:
      return state;
  }
};
export default activeNotListedReducer;
