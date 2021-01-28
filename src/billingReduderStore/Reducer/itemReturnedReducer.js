import { getitemReturned } from "../../actions/itemReturnedAction.js";

const initialState = {
    itemReturnedReducerArray: []
};

const itemReturnedReducer = (state = initialState, action) => {
  // console.log(this.state.templatedata)

  switch (action.type) {
    case getitemReturned: {
      return {
        ...state,
        itemReturnedReducerArray: action.response
      };
    }
    default:
      return state;
  }
};
export default itemReturnedReducer;
