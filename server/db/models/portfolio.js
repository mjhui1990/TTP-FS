const Sequelize = require('sequelize')
const db = require('../db')

const Portfolio = db.define('portfolio', {
  buyingPower: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    defaultValue: 5000.0
  }
})

module.exports = Portfolio
