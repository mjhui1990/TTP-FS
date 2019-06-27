const Sequelize = require('sequelize')
const db = require('../db')

const Holding = db.define('holding', {
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
  }
})

module.exports = Holding
