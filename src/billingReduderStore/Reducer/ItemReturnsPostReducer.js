import {
  post_item_returns,
  insertedDate,
  process_Return,
  sellerDrop,
  reasonDrop,
  filter_data_item_return
} from "../../actions/ItemReturnsPostAction.js";
import {
  FILTER_DATA_RADIO,
  UNDO_DATA,
  PRINT_BARCODE,
  SAVE_DATA_MANUALY,
  DISPLAY_BARCODE,
  PROCESS_ID
} from "../../actions/allActionBytayyab.js";

const initialState = {
  itemReturnPostArray: [],
  merchantDropArray: [],
  reasonDropArray: [],
  filteredArray: [],
  show: false,
  returnid1: "",
  Barcodes: [],
  prosse_id_array: [],
   check:true
};

const ItemReturnsPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case post_item_returns: {
      return {
        ...state,
        itemReturnPostArray: action.response
      };
    }
    case insertedDate: {
      return {
        ...state,
        itemReturnPostArray: action.response
      };
    }

    case process_Return: {
      const itemReturnPostArray = state.itemReturnPostArray
        .slice()
        .map(item => {
          if (item.RETURNID == action.id) {
            return {
              ...item,
              RETURN_PROCESSED: action.response
            };
          }
          return item;
        });
      return {
        ...state,
        itemReturnPostArray
      };
    }
    case sellerDrop: {
      return {
        ...state,
        merchantDropArray: action.response
      };
    }
    case reasonDrop: {
      return {
        ...state,
        reasonDropArray: action.response
      };
    }
    case FILTER_DATA_RADIO: {
      return {
        ...state,
        itemReturnPostArray: action.response
      };
    }
    case PRINT_BARCODE: {
      return {
        ...state,
        itemReturnPostArray: action.response
      };
    }
    case filter_data_item_return: {
      return {
        ...state,
        filteredArray: action.response
      };
    }
    case DISPLAY_BARCODE: {
      return {
        ...state,
        Barcodes: action.response,
        check:true
      };
    }
    case PROCESS_ID: {
     // console.log(action.response);
      const data = state.itemReturnPostArray.filter(
        item => item.ORDER_ID == action.id
      );
     // console.log(data)
      return {
        ...state,
        prosse_id_array: data
      };
    }
    case SAVE_DATA_MANUALY: {
      return {
        ...state,
        itemReturnPostArray: [...state.itemReturnPostArray, action.response],
        show: action.show,
        returnid1: action.return_id
      };
    }
    case UNDO_DATA: {
      const itemReturnPostArray = state.itemReturnPostArray
        .slice()
        .map(item => {
          if (item.RETURNID == action.id) {
            return {
              ...item,
              RETURN_PROCESSED: action.response
            };
          }
          return item;
        });
      return {
        ...state,
        itemReturnPostArray
      };
    }

    default:
      return state;
  }
};
export default ItemReturnsPostReducer;
