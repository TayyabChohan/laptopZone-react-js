import { GET_PRODUCT_DIMENSION } from '../action/allActionTypes.js'

const Initial_State = {
  merchant_product_detail: []
}
const productDimensionReducer = (state = Initial_State, action) => {
  switch (action.type) {
    case GET_PRODUCT_DIMENSION: {
      return {
        ...state,
        merchant_product_detail: action.response
      }
    }

    default:
      return state
  }
}
export default productDimensionReducer
