const User = require('./user')
const Portfolio = require('./portfolio')
const Holdings = require('./holdings')
const TransactionLedger = require('./transactions')

Portfolio.belongsTo(User)
Portfolio.hasMany(Holdings)

module.exports = {
  User,
  Portfolio,
  Holdings,
  TransactionLedger
}
