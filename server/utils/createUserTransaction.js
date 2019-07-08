const {User, Portfolio, Holding, Transactions} = require('../db/models')

const createTransaction = async (
  transactionType,
  ticker,
  shares,
  purchasePrice,
  userId
) => {
  const newTransaction = await Transactions.create(
    {
      type: transactionType,
      ticker,
      shares,
      purchasePrice,
      userId: userId
    },
    {
      returning: true
    }
  )
}

module.exports = createTransaction
