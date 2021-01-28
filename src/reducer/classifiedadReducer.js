import {
  SEARCH_CLASSIFIED_AD,
  FILTER_IMAGE_CLASSIFIED
} from '../action/allActionTypes.js'

const INITAIL_STATE = {
  search_classified_data: [],
  images: [],
  filterImage: []
}

export const classifiedadReducer = (state = INITAIL_STATE, action) => {
  switch (action.type) {
    case SEARCH_CLASSIFIED_AD: {
      return {
        ...state,
        search_classified_data: action.response,
        images: action.image
      }
    }
    case FILTER_IMAGE_CLASSIFIED: {
      const filterImage = state.images[action.barcode]
      return {
        ...state,
        filterImage
      }
    }
    default:
      return state
  }
}

export default classifiedadReducer
