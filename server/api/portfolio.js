const router = require('express').Router()
// const {User, Portfolio, Holding} = require('../db/models')
const getPortfolioAndHoldings = require('../db/queries')

router.get('/', async (req, res) => {
  const {email} = req.query

  const userData = await getPortfolioAndHoldings(email)
  //  console.log(userData.portfolio.holdings)
  res.json(userData)
})

module.exports = router
