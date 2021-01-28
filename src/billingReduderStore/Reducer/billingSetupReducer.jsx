import {
    getService,
    insertService,
    deleteService,
    insertServiceRate,
    getServiceRate,
    deleteServiceRate,
    upDateSerViceRate
} from '../../actions/actions.js'
const initialState = {
    records: [],
    serviceRate: [],
    error: '',
    open: false
}

const billingSetupReducer = (state = initialState, action) => {

    switch (action.type) {
        case getService: {
            return {
                ...state,
                records: action.response
            }
        }

        case insertService: {
            return {
                ...state,
                records: [...state.records, action.data],
                open: false
            }
        }
        case deleteService: {
            const records = state.records.filter(item => item.SERVICE_ID != action.response);
            return {
                ...state,
                records,
                open: false
            }
        }
        case "error": {
            return {
                ...state,
                error: action.response,
                open: true
            }
        }





        case insertServiceRate: {
            return {
                ...state,
                serviceRate: [...state.serviceRate, action.response]
            }
        }

        case getServiceRate:

            return {
                ...state,
                serviceRate: action.response.tableData
            }
        case deleteServiceRate: {
            const serviceRate = state.serviceRate.filter(item => item.SER_RATE_ID !== action.response);

            return { ...state, serviceRate }
        }


        case upDateSerViceRate: {
            const serviceRate = state.serviceRate.slice().map(item => {
                if (item.SER_RATE_ID == action.ser_rate_id) {
                    return {
                        ...item,
                        CHARGES: "$" + action.service_charges
                    }
                }
                return item
            })
            return {
                ...state,
                serviceRate
            }
        }


        default:
            return state;
    }
}
export default billingSetupReducer