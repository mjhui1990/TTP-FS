import React from 'react'
import {connect} from 'react-redux'
import {Form, FormField, Button} from 'semantic-ui-react'

import {buyStock} from '../store/stock'
import {getPortfolio} from '../store/portfolio'

const SingleStockView = props => {
  let data = props.stock
  const infoArray = []
  if (data.symbol) {
    for (let p in data) {
      infoArray.push(
        <p key={p}>
          {p} : {data[p]}
        </p>
      )
    }
  }

  const handleSubmit = async e => {
    let amt = e.target.amount.value
    e.preventDefault()
    if (
      amt * props.stock.latestPrice <=
      props.portfolio.portfolio.buyingPower
    ) {
      await props.buyStock('buy', props.stock.symbol, amt, props.user.id)
      await props.fetchPortfolio(props.user.email)
    } else {
      alert('You do not have enough buying power to purchase stock')
    }
  }
  if (data.symbol) {
    return (
      <div>
        <div>{infoArray}</div>
        <Form onSubmit={e => handleSubmit(e)}>
          <h2>Purchase Stock</h2>
          <FormField>
            <label>Ticker Symbol</label>
            <input placeholder={props.stock.symbol} disabled />
            <label>Shares</label>
            <input name="amount" placeholder={0} />
            <Button type="submit">Buy Stock</Button>
          </FormField>
        </Form>
      </div>
    )
  } else return null
}

const mapState = state => {
  return {
    user: state.user,
    portfolio: state.portfolio,
    stock: state.stock
  }
}

const mapDispatch = dispatch => {
  return {
    buyStock: (transaction, ticker, amount, userId) =>
      dispatch(buyStock(transaction, ticker, amount, userId)),
    fetchPortfolio: email => dispatch(getPortfolio(email))
  }
}
export default connect(mapState, mapDispatch)(SingleStockView)
