const router = require('express').Router()
const getStockData = require('../utils/getStockData')
const createTransaction = require('../utils/createUserTransaction')

router.get('/', async (req, res) => {
  const {ticker} = req.query
  const response = await getStockData(ticker)
  if (!response.symbol) res.status(404).json(response)
  else res.json(response)
})

router.post('/', async (req, res) => {
  console.log(req.body)
  const {ticker, amount, transaction, userId} = req.body
  //
  createTransaction(transaction, ticker, amount, 12, userId)

  res.sendStatus(200)
})

module.exports = router
