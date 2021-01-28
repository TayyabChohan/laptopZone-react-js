import {
  get_Users_List,
  marchantDrop,
  disable_And_Anable_Users_List,
  update_Users_List,
  insert_Users_List
} from "../../actions/usersAction.js";

const initialState = {
  UsersArray: [],
  marchantArray: []
};

const usersReducer = (state = initialState, action) => {
  // console.log(this.state.templatedata)

  switch (action.type) {
    case get_Users_List: {
      return {
        ...state,
        UsersArray: action.response
      };
    }

    case marchantDrop: {
      return {
        ...state,
        marchantArray: action.response
      };
    }

    case insert_Users_List: {
      return {
        ...state,
        UsersArray: [...state.UsersArray, action.response]
      };
    }

    case update_Users_List: {
      const UsersArray = state.UsersArray.slice().map(item => {
        if (item.EMPLOYEE_ID == action.data.EMPLOYEE_ID) {
          return {
            ...item,
            FIRST_NAME: action.data.FirstName_update,
            LAST_NAME: action.data.LastName_update,
            USER_NAME: action.data.UserName_update,
            PASS_WORD: action.data.Password_update,
            LOCATION: action.data.selectLocation_update,
            E_MAIL_ADDRESS: action.data.UserEmail_Update
            // PAYMENT_METHOD: action.data.selectMerchant_update,

            // item: action.data
          };
        }
        return item;
      });
      return {
        ...state,
        UsersArray
      };
    }

    case disable_And_Anable_Users_List: {
      const UsersArray = state.UsersArray.slice().map(item => {
        if (item.EMPLOYEE_ID == action.id) {
          return {
            ...item,
            STATUS: action.status
          };
        }
        return item;
      });
      return {
        ...state,
        UsersArray
      };
    }
    default:
      return state;
  }
};
export default usersReducer;
