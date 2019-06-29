const router = require('express').Router()
const {User} = require('../db/models')

router.get('/', (req, res) => {
  console.log(req.query)
  console.log(req.session)
  console.log(req.sessionID)
  res.json({
    buyingPower: 10000000
  })
})

module.exports = router
