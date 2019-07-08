const Sequelize = require('sequelize')
const db = require('../db')
const Holding = require('./holdings')

const Transactions = db.define('transaction', {
  type: {
    type: Sequelize.ENUM,
    values: ['buy', 'sell']
  },
  ticker: {
    type: Sequelize.STRING,
    allowNull: false
  },
  shares: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  purchasePrice: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  totalValue: {
    type: Sequelize.VIRTUAL,
    get() {
      return this.getDataValue('purchasePrice') * this.getDataValue('shares')
    }
  }
})

Transactions.addHook('afterCreate', async (transaction, options) => {
  const createdDataValues = transaction.dataValues
  console.log(createdDataValues)
  await Holding.create({
    ticker: createdDataValues.ticker,
    shares: createdDataValues.shares,
    purchasePrice: createdDataValues.purchasePrice,
    portfolioId: createdDataValues.userId
  })
})

module.exports = Transactions
