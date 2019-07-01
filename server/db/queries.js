const {User, Portfolio, Holding} = require('./models')

/**
 * Takes in an email goes through the database and returns portfolio and Holdings
 * @param {string} email
 * @returns {Object}
 */

const getPortfolioAndHoldings = async email => {
  const info = await User.findOne({
    where: {email: email},
    include: [
      {
        model: Portfolio,
        include: [{model: Holding}]
      }
    ]
  })
  const DataValues = info.get({plain: true})

  const filterInfo = {
    portfolio: {...DataValues.portfolio},
    holdings: [...DataValues.portfolio.holdings]
  }

  return filterInfo
}

module.exports = getPortfolioAndHoldings
