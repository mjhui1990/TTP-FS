const router = require('express').Router()
const {getStockInfo, getStockPrice} = require('../utils/getStockData')
const createTransaction = require('../utils/createUserTransaction')

router.get('/', async (req, res) => {
  const {ticker} = req.query
  const response = await getStockInfo(ticker)
  if (!response.symbol) res.status(404).json(response)
  else res.json(response)
})

router.post('/', async (req, res) => {
  console.log(req.body)
  const {ticker, amount, transaction, userId} = req.body
  const price = await getStockPrice(ticker)
  createTransaction(transaction, ticker, amount, price, userId)

  res.sendStatus(200)
})

module.exports = router
