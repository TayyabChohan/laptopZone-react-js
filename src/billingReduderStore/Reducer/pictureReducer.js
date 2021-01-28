import { pictureDone } from "../../actions/pictureAction.js";

const initialState = {
  pictureArray: []
};

const pictureReducer = (state = initialState, action) => {
  // console.log(this.state.templatedata)

  switch (action.type) {
    case pictureDone: {
      return {
        ...state,
        pictureArray: action.response
      };
    }
    default:
      return state;
  }
};
export default pictureReducer;
