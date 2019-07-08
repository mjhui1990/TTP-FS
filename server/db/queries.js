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
        attributes: ['buyingPower'],
        include: [
          {
            model: Holding,
            attributes: {
              include: ['id', 'ticker', 'shares', 'purchasePrice']
            }
          }
        ]
      }
    ]
  })
  const DataValues = info.get({plain: true})

  const filterInfo = {
    portfolio: {...DataValues.portfolio}
  }

  return filterInfo
}

module.exports = getPortfolioAndHoldings
