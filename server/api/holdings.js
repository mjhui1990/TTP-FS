const router = require('express').Router()
const getStockData = require('../utils/getStockData')

router.get('/', async (req, res) => {
  const {ticker} = req.query
  const response = await getStockData(ticker)
  if (!response.symbol) res.status(404).json(response)
  else res.json(response)
})

module.exports = router
