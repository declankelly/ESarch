import {
  FETCH_COMPANY_LIST_REQUEST,
  FETCH_COMPANY_LIST_SUCCESS,
  FETCH_COMPANY_LIST_FAILURE,
  FETCH_ORDERBOOKS_BY_COMPANYID_REQUEST,
  FETCH_ORDERBOOKS_BY_COMPANYID_SUCCESS,
  FETCH_ORDERBOOKS_BY_COMPANYID_FAILURE,
  FETCH_EXECUTED_TRADES_REQUEST,
  FETCH_EXECUTED_TRADES_SUCCESS,
  FETCH_EXECUTED_TRADES_FAILURE,
  SET_ACTIVE_COMPANY
} from '../constants/companyActions';

const initialState = {
  companyList: {
    items: []
  },
  activeCompany: {
    index: null,
    orderBook: {
      isFetching: false,
      error: null,
      identifier: null,
      buy: [],
      sell: []
    },
    executedTrades: {
      isFetching: false,
      error: null,
      trades: []
    }
  }
}

function companyReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COMPANY_LIST_REQUEST:
      return Object.assign({}, state, {
        companyList: {
          isFetching: action.payload.isFetching,
          error: null
        }
      })
    case FETCH_COMPANY_LIST_SUCCESS:
      return Object.assign({}, state, {
        companyList: {
          isFetching: action.payload.isFetching,
          items: action.payload.data,
          error: null
        }
      })
    case FETCH_COMPANY_LIST_FAILURE:
      return Object.assign({}, state, {
        companyList: {
          isFetching: action.payload.isFetching,
          error: action.payload.error
        }
      })
    case FETCH_ORDERBOOKS_BY_COMPANYID_REQUEST:
      return {
        ...state,
        activeCompany: {
          ...state.activeCompany,
          orderBook: {
            ...state.activeCompany.orderBook,
            isFetching: true
          }
        }
      }
    case FETCH_ORDERBOOKS_BY_COMPANYID_SUCCESS:
      return {
        ...state,
        activeCompany: {
          ...state.activeCompany,
          orderBook: {
            isFetching: false,
            error: null,
            identifier: action.payload.data.identifier,
            buy: action.payload.data.buyOrders,
            sell: action.payload.data.sellOrders
          }
        }
      }
    case FETCH_ORDERBOOKS_BY_COMPANYID_FAILURE:
      return {
        ...state,
        activeCompany: {
          ...state.activeCompany,
          orderBook: {
            isFetching: false,
            error: action.payload.error,
            identifier: null,
            buy: [],
            sell: []
          }
        }
      }
    case FETCH_EXECUTED_TRADES_REQUEST:
      return {
        ...state,
        activeCompany: {
          ...state.activeCompany,
          executedTrades: {
            isFetching: true,
            error: null,
            ...state.activeCompany.executedTrades
          }
        }
      }
    case FETCH_EXECUTED_TRADES_SUCCESS:
      return {
        ...state,
        activeCompany: {
          ...state.activeCompany,
          executedTrades: {
            isFetching: false,
            error: null,
            trades: action.payload.data
          }
        }
      }
    case FETCH_EXECUTED_TRADES_FAILURE:
      return {
        ...state,
        activeCompany: {
          ...state.activeCompany,
          executedTrades: {
            isFetching: false,
            error: action.payload.error,
            trades: []
          }
        }
      }
    case SET_ACTIVE_COMPANY:
      return {
        ...state,
        activeCompany: {
          ...state.activeCompany,
          index: action.payload.index
        }
      }
    default:
      return state
  }
}

export default companyReducer;

/*
The redux state for the company reducer (state.company) 

staeOfTheCompanyReducer = {

    companyList: {
        isFetching: boolean
        error: {
            message: string,
            statusCode: number
        }
        items:[
            {
                id:
                name:
                value:
                shares:
            },
            {
                id:
                name:
                value:
                shares:
            },
            {
                .....
            }
        ]
    },

    activeCompany: {
      id: 'sbajd
      orders: {
          isFetching: true,
          error: {}
        buy: [{
          count: "10",
          price: "200",
          remaining: "45"
        }],
        sell: []
      },
      executedTrades: {
        isFetching: true,
        error: {},
        trades: [{
          count: 33,
          price: 3333
        }]
      }
    }


}
*/