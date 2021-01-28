import {
  get_MyProfile,
  get_merchant_City
} from "../../actions/myProfileAction.js";

const initialState = {
  merchantCityArray: [],
  profileArray: [],
  imagedata:''
};

const myprofilrReducer = (state = initialState, action) => {
  // console.log(this.state.templatedata)

  switch (action.type) {
    case get_merchant_City: {
      return {
        ...state,
        merchantCityArray: action.response
      };
    }

    case get_MyProfile: {
      return {
        ...state,
        profileArray: [...state.profileArray, ...action.response],
        imagedata: action.image
      };
    }

    default:
      return state;
  }
};
export default myprofilrReducer;
