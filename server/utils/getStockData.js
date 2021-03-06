const axios = require('axios')
const {iexAPIKey} = require('../../secrets')

const getStockInfo = async ticker => {
  const {data} = await axios
    .get(
      `https://cloud.iexapis.com/v1/stock/${ticker}/quote?token=${iexAPIKey}`
    )
    .catch(err => {
      console.error(err)
      return {
        data: `Cannot find ticker symbol : ${ticker}`
      }
    })
  const {
    symbol,
    companyName,
    open,
    close,
    week52High,
    week52Low,
    latestPrice
  } = data
  const returnData = {
    symbol,
    companyName,
    latestPrice,
    open,
    close,
    week52Low,
    week52High
  }
  return returnData
}

const getStockPrice = async ticker => {
  const {data} = await axios.get(
    `https://cloud.iexapis.com/v1/stock/${ticker}/price?token=${iexAPIKey}`
  )
  return data
}

module.exports = {
  getStockInfo,
  getStockPrice
}
