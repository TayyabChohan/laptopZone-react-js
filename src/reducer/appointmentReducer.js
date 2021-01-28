import {
  GET_SERVICES_FOR_APPOINTMENT,
  GET_APPOINTMENT_DETAIL,
  CENCEL_APPOINTMENT,
  ADMIN_APPROVED_APPOINTMENT,
  USER_INQUEUE_APPOINTMENT,
  INSERT_NEW_APPOINTMENT,
  GET_SPECIFIC_SEVICES,
  GET_SPECIFIC_SEVICES_NO_RECORD,
  PROCESS_APPOINTMENT,
  COMPLETE_APPOINTMENT,
  CUSTOM_PROCESS_APPOINTMENT,
  // CUSTOM_PROCESS_APPOINTMENT_FAIL,
  GET_SPECIFIC_LOG_DETAIL,
  DELETE_SPECIFIC_LOG_DETAIL,
  DELETE_SPECIFIC_LOG_ALL_DETAIL,
  SEARCH_BARCODE,
  SEARCH_PROCESS_APPOINTMENT,
  REMOVE_SEARCH_BARCODES,
  SET_DIFF_MINS,
  GET_APPOINTMENT_SUMMARY,
  APPOINTMENT_MERCHANT_LOT,
  ADD_LOT_BARCODE_APPOINTMENT,
  LOT_PROCESS_APPOINTMENT,
  REMOVE_LOT_BARCODES,
  SAVE_ALL_LOT_BARCODES,
  UPDATE_TIME_AFTER_SAVE,
  DELETE_ALLAPPOINTMENT_BARCODES,
  GET_APPOINTMENT_PACKING,
  UPDATE_APPOINTMENT_PACKING,
  UPDATE_ALL_APPOINTMENT_PACKING
} from '../action/allActionTypes.js'

const Initial_State = {
  services: [],
  appointment_detail: [],
  specific_services: [],
  message: '',
  specific_log: [],
  search_barcodes: [],
  timeDiff: '',
  packing_cost: '',
  appointment_time: '',
  total_charge: '',
  appointment_summary: '',
  appointment_merchant_lot: [],
  appointment_lot_barcode: [],
  appointment_packing: []
}

const appointmentReducer = (state = Initial_State, action) => {
  switch (action.type) {
    case GET_SERVICES_FOR_APPOINTMENT: {
      return {
        ...state,
        services: action.response
      }
    }

    case GET_APPOINTMENT_DETAIL: {
      return {
        ...state,
        appointment_detail: action.response
      }
    }
    case CENCEL_APPOINTMENT: {
      // const appointment_detail = state.appointment_detail.filter(
      //   item => item.APPOINTMENT_ID != action.response
      // )
      const appointment_detail = state.appointment_detail.slice().map(item => {
        if (item.APPOINTMENT_ID == action.response) {
          return {
            ...item,
            APPOINTMENT_STATUS: action.status
          }
        }
        return item
      })
      return {
        ...state,
        appointment_detail
      }
    }
    case GET_APPOINTMENT_SUMMARY: {
      return {
        ...state,
        appointment_summary: action.response,
        appointment_time: action.time,
        total_charge: action.total_charge,
        packing_cost: action.packing_cost
      }
    }
    case USER_INQUEUE_APPOINTMENT: {
      const appointment_detail = state.appointment_detail.slice().map(item => {
        if (item.APPOINTMENT_ID == action.response) {
          return {
            ...item,
            APPOINTMENT_STATUS: action.status
          }
        }
        return item
      })
      return {
        ...state,
        appointment_detail
      }
    }
    case INSERT_NEW_APPOINTMENT: {
      return {
        ...state,
        appointment_detail: [
          ...(state.appointment_detail || []),
          action.response
        ]
      }
    }
    case ADMIN_APPROVED_APPOINTMENT: {
      const appointment_detail = state.appointment_detail.slice().map(item => {
        if (item.APPOINTMENT_ID == action.response) {
          return {
            ...item,
            APPOINTMENT_STATUS: action.status
          }
        }
        return item
      })
      return {
        ...state,
        appointment_detail
      }
    }
    case GET_SPECIFIC_SEVICES: {
      return {
        ...state,
        specific_services: action.response,
        message: ''
      }
    }
    case GET_SPECIFIC_SEVICES_NO_RECORD: {
      return {
        ...state,
        message: action.response
      }
    }
    case PROCESS_APPOINTMENT: {
      const appointment_detail = state.appointment_detail.slice().map(item => {
        if (item.APPOINTMENT_ID == action.id) {
          return {
            ...item,
            APPOINTMENT_STATUS: action.status,
            TOTAL_PROCESS_BARCODE:
              Number(item.TOTAL_PROCESS_BARCODE) + Number(action.total)
          }
        }
        return item
      })
      // let specific_log = state.services.slice()
      // for (let i = 0; i < action.data.length; i++) {
      //   var specific_log = state.specific_log.filter(
      //     (item) => item.BARCODE_NO != action.data[i].BARCODE_NO
      //   )
      //   if(specific_log.length == 0){
      //     console.log("if" +action.data[i].BARCODE_NO);
      //   }else{
      //     console.log("else specific log" + specific_log);
      //     console.log("else barcode "+ action.data[i].BARCODE_NO);
      //   }
      // }
      return {
        ...state,
        appointment_detail,
        specific_log: [...(state.specific_log || []), ...action.data]
      }
    }

    case CUSTOM_PROCESS_APPOINTMENT: {
      // console.log(action.barcode)
      // console.log(action.defaultstat.status)
      const appointment_detail = state.appointment_detail.slice().map(item => {
        if (item.APPOINTMENT_ID == action.id) {
          return {
            ...item,
            APPOINTMENT_STATUS: action.status,
            TOTAL_PROCESS_BARCODE: Number(item.TOTAL_PROCESS_BARCODE) + 1
          }
        }
        return item
      })
      return {
        ...state,
        appointment_detail,
        specific_log: [...(state.specific_log || []), action.data]
      }
    }
    // case CUSTOM_PROCESS_APPOINTMENT_FAIL: {
    //   // const appointment_detail = state.appointment_detail.slice().map(item => {
    //   //   if (item.APPOINTMENT_ID == action.id) {
    //   //     return {
    //   //       ...item,
    //   //       APPOINTMENT_STATUS: action.status
    //   //     }
    //   //   }
    //   //   return item
    //   // })
    //   return {
    //     ...state
    //     // appointment_detail,
    //   }
    // }
    case COMPLETE_APPOINTMENT: {
      const appointment_detail = state.appointment_detail.slice().map(item => {
        if (item.APPOINTMENT_ID == action.id) {
          return {
            ...item,
            APPOINTMENT_STATUS: action.status
          }
        }
        return item
      })
      return {
        ...state,
        appointment_detail
      }
    }

    case GET_SPECIFIC_LOG_DETAIL: {
      return {
        ...state,
        specific_log: action.response
      }
    }
    case DELETE_SPECIFIC_LOG_DETAIL: {
      // if (action.appointmentstatus !== 'Approved') {
      const specific_log = state.specific_log.filter(
        item => item.BARCODE_NO != action.response.barcode_no
      )
      const search_barcodes = state.search_barcodes.slice().map(item => {
        if (item.BARCODE_NO == action.barcode) {
          return {
            ...item,
            APPOINTMENT_DT_ID_INV: '',
            APPOINTMENT_DT_ID_PIC: '',
            APPOINTMENT_LOG_ID: ''
          }
        }
        return item
      })
      return {
        ...state,
        specific_log,
        search_barcodes
      }
      // } else {
      //   const specific_log = state.specific_log.filter(
      //     item => item.BARCODE_NO != action.response.barcode_no
      //   )
      //   const appointment_detail = state.appointment_detail
      //     .slice()
      //     .map(item => {
      //       if (item.APPOINTMENT_ID == action.appointment_id) {
      //         return {
      //           ...item,
      //           APPOINTMENT_STATUS: action.appointmentstatus
      //         }
      //       }
      //       return item
      //     })
      // return {
      //   ...state,
      //   specific_log,
      //   appointment_detail
      // }
    }

    case DELETE_SPECIFIC_LOG_ALL_DETAIL: {
      // console.log(action.appointmentstatus)
      // console.log(action.appointment_id)
      if (action.appointmentstatus === 'Approved') {
        const specific_log = state.specific_log.filter(
          item => item.BARCODE_NO != action.response.barcode_no
        )
        const appointment_detail = state.appointment_detail
          .slice()
          .map(item => {
            if (item.APPOINTMENT_ID == action.appointment_id) {
              return {
                ...item,
                APPOINTMENT_STATUS: action.appointmentstatus,
                TOTAL_PROCESS_BARCODE: Number(item.TOTAL_PROCESS_BARCODE) - 1
              }
            }
            return item
          })
        const search_barcodes = state.search_barcodes.slice().map(item => {
          if (item.BARCODE_NO == action.barcode) {
            return {
              ...item,
              APPOINTMENT_DT_ID_INV: '',
              APPOINTMENT_DT_ID_PIC: '',
              APPOINTMENT_LOG_ID: ''
            }
          }
          return item
        })
        return {
          ...state,
          specific_log,
          appointment_detail,
          search_barcodes
          // appointment_summary: action.summary,
          // appointment_time: action.time
        }
      } else {
        const specific_log = state.specific_log.filter(
          item => item.BARCODE_NO != action.response.barcode_no
        )
        const appointment_detail = state.appointment_detail
          .slice()
          .map(item => {
            if (item.APPOINTMENT_ID == action.appointment_id) {
              return {
                ...item,
                TOTAL_PROCESS_BARCODE: Number(item.TOTAL_PROCESS_BARCODE) - 1
              }
            }
            return item
          })
        const search_barcodes = state.search_barcodes.slice().map(item => {
          if (item.BARCODE_NO == action.barcode) {
            return {
              ...item,
              // APPOINTMENT_DT_ID_INV: '',
              // APPOINTMENT_DT_ID_PIC: '',
              APPOINTMENT_LOG_ID: ''
            }
          }
          return item
        })
        return {
          ...state,
          specific_log,
          search_barcodes,
          appointment_detail
        }
      }
    }

    case SET_DIFF_MINS: {
      return {
        ...state,
        timeDiff: action.response
      }
    }
    case SEARCH_BARCODE: {
      return {
        ...state,
        search_barcodes: action.response
      }
    }
    case SEARCH_PROCESS_APPOINTMENT: {
      const appointment_detail = state.appointment_detail.slice().map(item => {
        if (item.APPOINTMENT_ID == action.id) {
          return {
            ...item,
            APPOINTMENT_STATUS: action.status,
            TOTAL_PROCESS_BARCODE: Number(item.TOTAL_PROCESS_BARCODE) + 1
          }
        }
        return item
      })
      const search_barcodes = state.search_barcodes.slice().map(item => {
        if (item.BARCODE_NO == action.barcode) {
          // if (action.service_id == 3) {
          //   return {
          //     ...item,
          //     // APPOINTMENT_DT_ID_INV: action.id,
          //     APPOINTMENT_LOG_ID:action.log_id
          //   }
          // }
          // if (action.service_id == 1) {
          return {
            ...item,
            // APPOINTMENT_DT_ID_PIC: action.id,
            APPOINTMENT_LOG_ID: action.log_id
          }
          // }
        }
        return item
      })
      return {
        ...state,
        appointment_detail,
        search_barcodes,
        specific_log: [...(state.specific_log || []), action.data]
      }
    }
    case LOT_PROCESS_APPOINTMENT: {
      const appointment_detail = state.appointment_detail.slice().map(item => {
        if (item.APPOINTMENT_ID == action.id) {
          return {
            ...item,
            APPOINTMENT_STATUS: action.status,
            TOTAL_PROCESS_BARCODE: Number(item.TOTAL_PROCESS_BARCODE) + 1
          }
        }
        return item
      })
      const appointment_lot_barcode = state.appointment_lot_barcode
        .slice()
        .map(item => {
          if (item.BARCODE_NO == action.barcode) {
            return {
              ...item,
              APPOINTMENT_LOG_ID: action.log_id
            }
          }
          return item
        })
      return {
        ...state,
        appointment_detail,
        appointment_lot_barcode,
        specific_log: [...(state.specific_log || []), action.data]
      }
    }

    case SAVE_ALL_LOT_BARCODES: {
      // console.log(action.id)
      const appointment_detail = state.appointment_detail.slice().map(item => {
        if (item.APPOINTMENT_ID === action.id) {
          return {
            ...item,
            APPOINTMENT_STATUS: action.status,
            TOTAL_PROCESS_BARCODE:
              Number(item.TOTAL_PROCESS_BARCODE) + Number(action.total)
          }
        }
        return item
      })
      const appointment_lot_barcode = state.appointment_lot_barcode
        .slice()
        .map(item => {
          return {
            ...item,
            APPOINTMENT_LOG_ID: action.log_id
          }
        })
      return {
        ...state,
        appointment_detail,
        appointment_lot_barcode,
        specific_log: [...(state.specific_log || []), ...action.data]
      }
    }
    case UPDATE_TIME_AFTER_SAVE: {
      return {
        ...state,
        appointment_time: action.response,
        specific_log: action.data,
        total_charge: action.total_charge
      }
    }
    case APPOINTMENT_MERCHANT_LOT: {
      return {
        ...state,
        appointment_merchant_lot: action.response
      }
    }
    case ADD_LOT_BARCODE_APPOINTMENT: {
      return {
        ...state,
        appointment_lot_barcode: action.response
      }
    }
    case DELETE_ALLAPPOINTMENT_BARCODES: {
      const appointment_detail = state.appointment_detail.slice().map(item => {
        if (item.APPOINTMENT_ID == action.response) {
          return {
            ...item,
            TOTAL_PROCESS_BARCODE: 0,
            APPOINTMENT_STATUS: 'Approved'
          }
        }
        return item
      })
      return {
        ...state,
        appointment_detail,
        specific_log: []
      }
    }
    case REMOVE_SEARCH_BARCODES: {
      return {
        ...state,
        search_barcodes: []
      }
    }
    case REMOVE_LOT_BARCODES: {
      return {
        ...state,
        appointment_lot_barcode: []
      }
    }

    case GET_APPOINTMENT_PACKING: {
      return {
        ...state,
        appointment_packing: action.response
      }
    }
    case UPDATE_APPOINTMENT_PACKING: {
      const sameDiff = state.appointment_packing.filter(
        item => item.BARCODE_NO !== action.barcode
      )
      const colletData = [...action.response, ...sameDiff]
      return {
        ...state,
        appointment_packing: colletData
      }
    }
    case UPDATE_ALL_APPOINTMENT_PACKING: {
      return {
        ...state,
        appointment_packing: action.response
      }
    }
    default:
      return state
  }
}

export default appointmentReducer
