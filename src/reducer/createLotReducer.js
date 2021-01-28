import {
  MERCHANT_BARCODE_CHECK,
  MERCHANT_UNPOSTED_BARCODE_CHECK,
  DELETE_BARCODE_FROM_LOT,
  DELETE_UNPOSTED_BARCODE_FROM_LOT,
  ITEM_COND_DETAIL,
  OBJECT_COND_DETAIL,
  ADD_NEW_OBJECT,
  RANGE_BARCODE_CHECK,
  UNPOSTED_RANGE_BARCODE_CHECK,
  ADD_IMAGE_TO_LOT,
  ADD_IMAGE_TO_UNPOST_LOT,
  UNSELECT_ALL_IMAGES,
  UNSELECT_ALL_UNPOST_IMAGES,
  SUGESTED_CATEGORY,
  REMOVE_SUGGEST_CATEGORY,
  CHANGE_SAVE_LOT_BUTTON_PROP,
  CHANGE_SAVE_UNPOSTEDLOT_BUTTON_PROP,
  CHANGE_SAVE_LOT_BUTTON_SOWL,
  CHANGE_SAVE_UNPOSTEDLOT_BUTTON_SOWL,
  CLOSE_MESSAGES
} from '../action/allActionTypes.js'
const INITAIL_STATE = {
  merchant_detail: [],
  lot_barcode_detail: [],
  lot_unposted_barcode_detail: [],
  item_cond_detail: [],
  object_cond_detail: [],
  images: [],
  unposted_images: [],
  suggest_category: [],
  save: true,
  unpostsave: true,
  open: false,
  server_error: '',
  status: ''
}

const createLotReducer = (state = INITAIL_STATE, action) => {
  switch (action.type) {
    case MERCHANT_BARCODE_CHECK: {
      const barcodeExist = state.lot_barcode_detail.filter(
        item => item.BARCODE_NO == action.barcode
      )
      if (barcodeExist.length === 0) {
        return {
          ...state,
          merchant_detail: action.merchant_detail,
          lot_barcode_detail: [
            ...(state.lot_barcode_detail || []),
            ...action.data
          ],
          images: [...(state.images || []), ...action.images]
        }
      } else {
        return {
          ...state
        }
      }
    }

    case MERCHANT_UNPOSTED_BARCODE_CHECK: {
      const barcodeExist = state.lot_unposted_barcode_detail.filter(
        item => item.BARCODE == action.barcode
      )
      if (barcodeExist.length === 0) {
        return {
          ...state,
          merchant_detail: action.merchant_detail,
          lot_unposted_barcode_detail: [
            ...(state.lot_unposted_barcode_detail || []),
            ...action.data
          ],
          unposted_images: [...(state.unposted_images || []), ...action.images]
        }
      } else {
        return {
          ...state
        }
      }
    }
    case RANGE_BARCODE_CHECK: {
      const latestBarcodes = state.lot_barcode_detail.map(item => {
        const differentdata = action.data.filter(
          data => item.BARCODE_NO !== data.BARCODE_NO
        )
        return differentdata
      })
      const latestImages = state.images.map(item => {
        const differentImages = action.images.filter(
          data => item.barcode !== data.barcode
        )
        return differentImages
      })
      const latestImagesData = []
      latestImages.map(item => {
        item.map(ite => {
          latestImagesData.push({
            ite
          })
        })
      })
      return {
        ...state,
        merchant_detail: [
          ...state.merchant_detail,
          ...(action.merchant_name || []).map(item => {
            return item[0]
          })
        ],
        lot_barcode_detail: [
          ...(state.lot_barcode_detail || []),
          ...latestBarcodes[0]
        ],
        images: [...(state.images || []), ...latestImagesData]
      }
    }
    case UNPOSTED_RANGE_BARCODE_CHECK: {
      const latestBarcodes = state.lot_barcode_detail.map(item => {
        const samedata = action.data.filter(
          data => item.BARCODE_NO !== data.BARCODE_NO
        )
        return samedata
      })

      const latestImages = state.images.map(item => {
        const differentImages = action.images.filter(
          data => item.barcode !== data.barcode
        )
        return differentImages
      })
      const latestImagesData = []
      latestImages.map(item => {
        item.map(ite => {
          latestImagesData.push({
            ite
          })
        })
      })
      return {
        ...state,
        merchant_detail: [
          ...state.merchant_detail,
          ...(action.merchant_name || []).map(item => {
            return item[0]
          })
        ],
        lot_unposted_barcode_detail: [
          ...(state.lot_unposted_barcode_detail || []),
          ...latestBarcodes
        ],
        unposted_images: [
          ...(state.unposted_images || []),
          ...latestImagesData
        ]
      }
    }
    case CHANGE_SAVE_LOT_BUTTON_PROP: {
      return {
        ...state,
        save: action.response
      }
    }

    case CHANGE_SAVE_LOT_BUTTON_SOWL: {
      return {
        ...state,
        open: true,
        save: action.response,
        server_error: action.message,
        status: 'Please Save Images'
      }
    }

    case CHANGE_SAVE_UNPOSTEDLOT_BUTTON_PROP: {
      return {
        ...state,
        unpostsave: action.response
      }
    }

    case CHANGE_SAVE_UNPOSTEDLOT_BUTTON_SOWL: {
      return {
        ...state,
        open: true,
        unpostsave: action.response,
        server_error: action.message,
        status: 'Please Save Images'
      }
    }

    case CLOSE_MESSAGES: {
      return Object.assign({}, state, { open: false })
    }
    case ADD_IMAGE_TO_LOT: {
      let dataArray = []

      // Make array of actions values
      // const barcode = action.response.map((item, i) => {
      //   return item.value
      // })

      const barcode = action.response.map((item, i) => {
        return item
      })

      // console.log(barcode)

      // Get data from images
      const res = barcode.map(ite => {
        // const data = state.images.filter((item, index) => {
        //   return ite === index
        // })
        const data = state.images.filter((item, index) => {
          return ite.image === item.image && ite.barcode === item.barcode
        })
        return data
      })
      // console.log(res)

      // make array after changing inm selected images
      dataArray = res.map(item => {
        return {
          ...item[0],
          addToLot: true
        }
      })
      // console.log(dataArray)

      // make copy of array
      const images = state.images.slice().map(image => {
        const found = dataArray.find(
          item => item.barcode === image.barcode && item.image === image.image
        )
        return (
          found || {
            ...image,
            addToLot: false
          }
        )
      })
      console.log(images)
      return {
        ...state,
        images
      }
    }

    case ADD_IMAGE_TO_UNPOST_LOT: {
      let dataArray = []

      // Make array of actions values
      // const barcode = action.response.map((item, i) => {
      //   return item.value
      // })

      const barcode = action.response.map((item, i) => {
        return item
      })

      // console.log(barcode)

      // Get data from images
      const res = barcode.map(ite => {
        // const data = state.unposted_images.filter((item, index) => {
        //   return ite === index
        // })
        const data = state.unposted_images.filter((item, index) => {
          return ite.image === item.image && ite.barcode === item.barcode
        })
        return data
      })
      // console.log(res)

      // make array after changing inm selected images
      dataArray = res.map(item => {
        return {
          ...item[0],
          addToLot: true
        }
      })
      // console.log(dataArray)

      // make copy of array
      const unposted_images = state.unposted_images.slice().map(image => {
        const found = dataArray.find(
          item => item.barcode === image.barcode && item.image === image.image
        )
        return (
          found || {
            ...image,
            addToLot: false
          }
        )
      })
      console.log(unposted_images)
      return {
        ...state,
        unposted_images
      }
    }
    case DELETE_BARCODE_FROM_LOT: {
      const lot_barcode_detail = state.lot_barcode_detail.filter(
        (item, key) => key !== action.key
      )
      const images = state.images.filter(
        (item, key) => item.barcode !== action.barcode
      )
      return {
        ...state,
        lot_barcode_detail,
        images
      }
    }
    case DELETE_UNPOSTED_BARCODE_FROM_LOT: {
      const lot_unposted_barcode_detail = state.lot_unposted_barcode_detail.filter(
        (item, key) => key !== action.key
      )
      const unposted_images = state.unposted_images.filter(
        (item, key) => item.barcode !== action.barcode
      )
      return {
        ...state,
        lot_unposted_barcode_detail,
        unposted_images
      }
    }
    case ITEM_COND_DETAIL: {
      return {
        ...state,
        item_cond_detail: action.response
      }
    }
    case OBJECT_COND_DETAIL: {
      return {
        ...state,
        object_cond_detail: action.response
      }
    }
    case ADD_NEW_OBJECT: {
      return {
        ...state,
        object_cond_detail: [...state.object_cond_detail, ...action.response]
      }
    }
    case UNSELECT_ALL_IMAGES: {
      const images = state.images.slice().map(item => {
        return {
          ...item,
          addToLot: false
        }
      })
      return {
        ...state,
        images
      }
    }
    case UNSELECT_ALL_UNPOST_IMAGES: {
      const unposted_images = state.unposted_images.slice().map(item => {
        return {
          ...item,
          addToLot: false
        }
      })
      return {
        ...state,
        unposted_images
      }
    }

    case SUGESTED_CATEGORY: {
      return {
        ...state,
        suggest_category: action.response
      }
    }
    case REMOVE_SUGGEST_CATEGORY: {
      return {
        ...state,
        suggest_category: []
      }
    }
    default:
      return state
  }
}

export default createLotReducer
