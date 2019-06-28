const User = require('./user')
const Portfolio = require('./portfolio')
const Holdings = require('./holdings')
const Transactions = require('./transactions')

User.hasOne(Portfolio)
// Portfolio.belongsTo(User)
Portfolio.hasMany(Holdings)
User.hasMany(Transactions)

module.exports = {
  User,
  Portfolio,
  Holdings,
  Transactions
}
