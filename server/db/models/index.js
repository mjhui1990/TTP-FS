const User = require('./user')
const Portfolio = require('./portfolio')
const Holdings = require('./holdings')
const Transactions = require('./transactions')

Portfolio.belongsTo(User, {foreignKey: User.id})
Portfolio.hasMany(Holdings)

User.hasOne(Portfolio)
User.hasMany(Transactions)

module.exports = {
  User,
  Portfolio,
  Holdings,
  Transactions
}
