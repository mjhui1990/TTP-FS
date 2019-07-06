const axios = require('axios')
const {iexAPIKey} = require('../../secrets')

module.exports = async ticker => {
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
  return data
}
