const Sequelize = require('sequelize')
const db = require('../db')
const Holding = require('./holdings')
const Portfolio = require('./portfolio')

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
  const totalCost = createdDataValues.shares * createdDataValues.purchasePrice
  await Holding.create({
    ticker: createdDataValues.ticker,
    shares: createdDataValues.shares,
    purchasePrice: createdDataValues.purchasePrice,
    portfolioId: createdDataValues.userId
  })
  Portfolio.findOne({where: {userId: createdDataValues.userId}}).then(
    async Portfolio => {
      const currentBuyingPower = Portfolio.getDataValue('buyingPower')
      const newBuyingPower = currentBuyingPower - totalCost
      await Portfolio.update({buyingPower: newBuyingPower})
    }
  )
})

module.exports = Transactions
