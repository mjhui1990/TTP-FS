import axios from 'axios'

const GET_STOCK = 'GET_STOCK'

const defaultStock = {
  stock: {}
}

const getStockData = stock => ({type: GET_STOCK, payload: stock})

export const getStock = ticker => async dispatch => {
  const res = await axios.get('/api/holdings', {
    params: {
      ticker
    }
  })

  return dispatch(getStockData(res.data || {}))
}

export default function(state = defaultStock, action) {
  console.log(action)
  switch (action.type) {
    case GET_STOCK:
      return action.payload
    default:
      return state
  }
}
