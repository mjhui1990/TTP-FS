const User = require('./user')
const Portfolio = require('./portfolio')
const Holding = require('./holdings')
const Transactions = require('./transactions')

Portfolio.belongsTo(User, {foreignKey: User.id})
Portfolio.hasMany(Holding)

User.hasOne(Portfolio)
User.hasMany(Transactions)

module.exports = {
  User,
  Portfolio,
  Holding,
  Transactions
}
