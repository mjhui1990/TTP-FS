import React, {Component} from 'react'
import {connect} from 'react-redux'
import {FormField, Form, Button} from 'semantic-ui-react'
import {getStock} from '../store/stock'

class SingleStockSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ticker: ''
    }
  }

  handleChange = e => {
    this.setState({ticker: e.target.value})
  }

  handleSubmit = event => {
    event.preventDefault()
    const tickerSym = this.state.ticker
    this.props.fetchStock(tickerSym)
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormField inline>
            <h2>Stock Search</h2>
            <label>Ticker Symbol </label>
            <input
              type="text"
              value={this.state.ticker}
              onChange={e => this.handleChange(e)}
            />
          </FormField>
          <Button type="submit">Search</Button>
        </Form>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    fetchStock: ticker => dispatch(getStock(ticker))
  }
}

export default connect(null, mapDispatch)(SingleStockSearch)
