import React from 'react'
import {connect} from 'react-redux'
import {Form, FormField, Button} from 'semantic-ui-react'

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
    e.preventDefault()
  }
  console.log(props)
  if (data.symbol) {
    return (
      <div>
        <div>{infoArray}</div>
        <Form>
          <h2>Purchase Stock</h2>
          <FormField>
            <label>Ticker Symbol</label>
            <input placeholder={props.stock.symbol} disabled />
            <label>Shares</label>
            <input placeholder={0} />
            <Button type="submit">Buy Stock</Button>
          </FormField>
        </Form>
      </div>
    )
  } else return null
}

const mapState = state => {
  return {
    portfolio: state.portfolio,
    stock: state.stock
  }
}

const mapDispatch = state => {
  return {
    buyStock
  }
}
export default connect(mapState, null)(SingleStockView)
