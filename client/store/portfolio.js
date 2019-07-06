import axios from 'axios'

const GET_PORTFOLIO = 'GET_PORTFOLIO'

const defaultPortfolio = {
  holdings: []
}

const getData = portfolio => ({type: GET_PORTFOLIO, payload: portfolio})

export const getPortfolio = email => async dispatch => {
  const res = await axios
    .get(`api/portfolio/?email=${email}`)
    .catch(console.error)

  return dispatch(getData(res.data || {}))
}

export default function(state = defaultPortfolio, action) {
  switch (action.type) {
    case GET_PORTFOLIO:
      return action.payload
    default:
      return state
  }
}
