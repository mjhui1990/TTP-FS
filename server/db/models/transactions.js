const Sequelize = require('sequelize')
const db = require('../db')

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

module.exports = Transactions
