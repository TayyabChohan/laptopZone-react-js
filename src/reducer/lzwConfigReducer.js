import {
  GET_OBJECTS,
  GET_BRANDS,
  GET_SERIES,
  GET_MODELS,
  GET_LZW_CONFIG_DATA
} from '../action/allActionTypes.js'

const Initial_State = {
  products: [],
  brands: [],
  series: [],
  models: [],
  lzw_config_data: []
}

const lzwConfigReducer = (state = Initial_State, action) => {
  switch (action.type) {
    case GET_OBJECTS: {
      return {
        ...state,
        products: action.response
      }
    }
    case GET_BRANDS: {
      return {
        ...state,
        brands: action.response
      }
    }
    case GET_SERIES: {
      return {
        ...state,
        series: action.response
      }
    }
    case GET_MODELS: {
      return {
        ...state,
        models: action.response
      }
    }
    case GET_LZW_CONFIG_DATA: {
      return {
        ...state,
        lzw_config_data: action.response
      }
    }
    default:
      return {
        ...state
      }
  }
}

export default lzwConfigReducer
