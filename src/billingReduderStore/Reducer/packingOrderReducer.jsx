import {
  packingOrderDrop,
  marchantDrop,
  getPackingOrderDetail,
  upDatePostage,
  insertPackingDetail,
  detailInsertPackingName,
  listViewPackingName,
  deleteListItem,
  insertPacking2
} from '../../actions/packingOrderAction.jsx'

const initialState = {
  OrderData: [],
  error: '',
  marchantData: [],
  packingDetaildata: [],
  pastagedata: [],
  packingDetailDrop: [],
  packingNameList: [],
  packingData: []
}

const packingOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case packingOrderDrop: {
      return {
        ...state,
        OrderData: action.response
      }
    }
    case marchantDrop: {
      return {
        ...state,
        marchantData: action.response
      }
    }

    case getPackingOrderDetail: {
      return {
        ...state,
        packingDetaildata: action.response
      }
    }

    case listViewPackingName: {
      return {
        ...state,
        packingNameList: action.response
      }
    }

    case detailInsertPackingName: {
      return {
        ...state,
        packingNameList: [...state.packingNameList, ...action.response]
      }
    }

    case upDatePostage: {
      return {
        ...state
        // packingDetaildata: action.response.data
      }
    }

    case insertPacking2: {
      return {
        ...state,
        OrderData: [...state.OrderData, action.response]
      }
    }
    case insertPackingDetail: {
      const packingDetaildata = state.packingDetaildata.slice().map(item => {
        if (item.ORDER_ID == action.Order_id || item.ITEM_ID == action.item_id ) {
          return {
            ...item,
            ORDER_PACKING_ID: action.order_packing_id,
            ITEM_ID:action.item_id

           
           
          }
        }
        return item
      })
      return {
        ...state,
        packingNameList: action.response,
        packingDetaildata
      }
    }

    case deleteListItem: {
      console.log(action.order_id)
      console.log(action.remove)
      if (action.remove == true) {
        const packingNameList = state.packingNameList.filter(
          item => item.ORDER_PACKING_DT_ID !== action.id
        )
        const packingDetaildata = state.packingDetaildata.slice().map(item => {
          if (item.ORDER_ID == action.order_id || item.ITEM_ID == action.ebayId) {
            return {
              ...item,
              ORDER_PACKING_ID: null
            
             
              
            }
          }
          // console.log(item)
          return item
        })
        // console.log(packingDetaildata)
        return {
          ...state,
          packingNameList,
          packingDetaildata
        }
      } else if (action.remove == false) {
        const packingNameList = state.packingNameList.filter(
          item => item.ORDER_PACKING_DT_ID !== action.id
        )
        // const packingDetaildata = state.packingDetaildata.slice().map(item => {
        //   if (item.ORDER_ID == action.order_id) {
        //     return {
        //       ...item,
        //       ORDER_PACKING_ID: null
        //     }
        //   }
        //   // console.log(item)
        //   return item
        // })
        // console.log(packingDetaildata)
        return {
          ...state,
          packingNameList
          // packingDetaildata
        }
      }
      //   const packingNameList = state.packingNameList.filter(
      //     item => item.ORDER_PACKING_DT_ID !== action.id
      //   )
      //     const packingDetaildata = state.packingDetaildata.slice().map(item => {
      //       if (item.ORDER_ID == action.order_id) {
      //         return {
      //           ...item,
      //           ORDER_PACKING_ID: null
      //         }
      //       }
      //       // console.log(item)
      //       return item
      //     })
      //     // console.log(packingDetaildata)
      //   return {
      //     ...state,
      //     packingNameList,
      //     packingDetaildata
      //   }
    }
    // case 'deleteListItem1': {
    //   const packingNameList = state.packingNameList.filter(
    //     item => item.ORDER_PACKING_DT_ID !== action.id
    //   )
    //   const packingDetaildata = state.packingDetaildata.slice().map(item => {
    //     if (item.ORDER_ID == action.order_id) {
    //       return {
    //         ...item,
    //         ORDER_PACKING_ID: null
    //       }
    //     }
    //     // console.log(item)
    //     return item
    //   })
    //   // console.log(packingDetaildata)
    //   return {
    //     ...state,
    //     packingNameList,
    //     packingDetaildata
    //   }
    // }

    default:
      return state
  }
}
export default packingOrderReducer
