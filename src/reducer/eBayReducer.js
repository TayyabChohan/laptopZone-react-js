import {
  E_BAY_STORE_NAME,
  BUTTON_LOADER_START,
  SWEET_ALERT_ERROR_MESSAGE,
  SWEET_ALERT_SUCCESS_MESSAGE,
  BUTTON_LOADER_END,
  CLOSE_MESSAGES,
  MESSAGE_SERVER,
  E_BAY_SAVE_STORE_NAME,
  E_BAY_SELECT_ALL_STORE_DATA,
  E_BAY_SELECT_ALL_STORE_DATA_START,
  TOKEN_UPDATED,
  ACCOUNT_TOGGLE_FUNCTION,
  SELLER_ACCOUNT_TOGGLE_FUNCTION,
  GET_PORTAL_NAME
  // SUCCESS_MESSAGE_ALERT
} from '../action/allActionTypes.js'

const Initial_State = {
  error_message: {},
  status: '',
  alert_message: '',
  success_message: {},
  server_error: '',
  store_name: '',
  portalname: '',
  portal_name:[],
  insertresponse: [],
  ebaystorename: [],
  open: false,
  isloading: false
  // ebayapistatus: false
}
const eBayReducer = (state = Initial_State, action) => {
  switch (action.type) {
    case E_BAY_STORE_NAME: {
      return Object.assign({}, state, {
        store_name: action.response,
        open: false
      })
    }
    case GET_PORTAL_NAME: {
      return {
        ...state,
        portal_name:action.response
      }
    }
    case E_BAY_SAVE_STORE_NAME: {
      return {
        ...state,
        insertresponse: [...state.insertresponse, action.response.ACCT_ID],
        ebaystorename: [...state.ebaystorename, action.response]
      }
    }

    case E_BAY_SELECT_ALL_STORE_DATA_START: {
      return Object.assign({}, state, { isloading: true })
    }

    case E_BAY_SELECT_ALL_STORE_DATA: {
      return Object.assign({}, state, {
        ebaystorename: action.response,
        open: false,
        isloading: false
      })
    }

    case SWEET_ALERT_ERROR_MESSAGE: {
      return Object.assign({}, state, {
        error_message: action.response,
        open: true,
        status: 'error'
      })
    }

    case SWEET_ALERT_SUCCESS_MESSAGE: {
      return Object.assign({}, state, {
        success_message: action.response,
        open: true,
        status: 'success'
      })
    }

    // // case SUCCESS_MESSAGE_ALERT: {
    //   return Object.assign({}, state, {
    //     alert_message: action.response,
    //     open: true,
    //     status: 'alert_success'
    //   })
    // }
    case TOKEN_UPDATED: {
      const ebaystorename = state.ebaystorename.slice().map(item => {
        if (item.ACCT_ID === action.acct_id) {
          return {
            ...item,
            TOKEN: !item.TOKEN ? action.token : action.token,
            TOKEN_EXPIRY: !item.TOKEN_EXPIRY
              ? action.expirydata
              : action.expirydata
          }
        }
        return item
      })
      return {
        ...state,
        ebaystorename
      }
    }
    case ACCOUNT_TOGGLE_FUNCTION: {
      const ebaystorename = state.ebaystorename.slice().map(item => {
        if (item.ACCT_ID === action.response) {
          return {
            ...item,
            MERCHANT_STATUS: item.MERCHANT_STATUS === '1' ? 0 : 1
          }
        }
        return item
      })
      return {
        ...state,
        ebaystorename
      }
    }
    case SELLER_ACCOUNT_TOGGLE_FUNCTION: {
      // const ebaystorename = state.ebaystorename.slice().map(item => {
      //   if (item.MERCHANT_ID === action.mid) {
      //     return {
      //       ...item,
      //       DEFAULT_MERCHANT: item.DEFAULT_MERCHANT == '1' ? 0 : 0
      //     }
      //   }
      //   if (item.ACCT_ID == action.response) {
      //     return {
      //       ...item,
      //       DEFAULT_MERCHANT: item.DEFAULT_MERCHANT == '0' ? 1 : 0
      //     }
      //   }
      //   return item
      // })
      // console.log(action.mid)
      let ebaystorename = state.ebaystorename.slice()
      // let ebaystorename1 = ebaystorename.filter(
      //   item => item.MERCHANT_ID === action.mid
      // )
      ebaystorename = ebaystorename.map(item => {
        if (item.MERCHANT_ID === action.mid) {
          return {
            ...item,
            DEFAULT_MERCHANT: item.DEFAULT_MERCHANT === '1' ? 0 : 0
          }
        }
        return item
      })
      ebaystorename = ebaystorename.map(item => {
        if (item.ACCT_ID === action.response) {
          return {
            ...item,
            DEFAULT_MERCHANT:
              item.DEFAULT_MERCHANT === '0'
                ? action.default_merchant_status
                : action.default_merchant_status
          }
        }
        return item
      })

      return {
        ...state,
        ebaystorename
      }
    }

    case MESSAGE_SERVER: {
      return {
        ...state,
        open: true,
        server_error: action.response,
        status: 'server_error'
      }
    }

    case BUTTON_LOADER_START: {
      // console.log(action.acct_id)
      const ebaystorename = state.ebaystorename.slice().map(item => {
        if (item.ACCT_ID === action.acct_id) {
          return {
            ...item,
            button_load: !item.button_load,
            button_name: !item.button_name ? action.button_name : null
          }
        }
        return item
      })
      return {
        ...state,
        ebaystorename
      }
      // return Object.assign({}, state, {button_loader:true, button_loader_value:[...state.button_loader_value, action.button_id]});
    }

    case BUTTON_LOADER_END: {
      const ebaystorename = state.ebaystorename.slice().map(item => {
        if (item.ACCT_ID === action.acct_id) {
          //  const newItem = Object.assign({}, item);
          //  newItem.addedToWishList = !newItem.addedToWishList;
          //  return newItem;
          return {
            ...item,
            button_load: !item.button_load,
            button_name: !item.button_name ? action.button_name : null
          }
        }
        return item
      })
      return {
        ...state,
        ebaystorename
      }
    }

    case CLOSE_MESSAGES: {
      return Object.assign({}, state, { open: false })
    }

    default:
      return state
  }
}
export default eBayReducer
