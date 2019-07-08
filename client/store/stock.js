import axios from 'axios'

const GET_STOCK = 'GET_STOCK'
const BUY_STOCK = 'BUY_STOCK'

const defaultStock = {
  stock: {},
  lastBroughtStock: {}
}

const getStockData = stock => ({type: GET_STOCK, payload: stock})

export const getStock = ticker => async dispatch => {
  const res = await axios
    .get('/api/holdings', {
      params: {
        ticker
      }
    })
    .catch(err => {
      console.error(err)
    })

  return dispatch(getStockData(res.data || {}))
}

export const buyStock = (transaction, ticker, amount) => async dispatch => {
  const res = await axios
    .post('/api/holding', {
      transaction,
      amount,
      ticker
    })
    .catch(err => {
      console.error('cannot buy stock', err)
    })
  return dispatch(getStockData(res.data || {}))
}

export default function(state = defaultStock, action) {
  switch (action.type) {
    case GET_STOCK:
      return action.payload
    default:
      return state
  }
}
