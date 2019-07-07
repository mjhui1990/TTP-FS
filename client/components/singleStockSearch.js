import React, {Component} from 'react'
import {FormField, Form, Button} from 'semantic-ui-react'
import axios from 'axios'

class SingleStockSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ticker: '',
      singleStockInfo: {}
    }
  }

  handleChange = e => {
    this.setState({ticker: e.target.value})
  }

  handleSubmit = async event => {
    event.preventDefault()
    const tickerSym = this.state.ticker
    const response = await axios.get('/api/holdings', {
      params: {
        ticker: tickerSym
      }
    })
    this.setState(state => {
      return {singleStockInfo: response}
    })
  }

  render() {
    return (
      <div>
        <Form onSubmit={e => this.handleSubmit(e)}>
          <FormField inline>
            <label>Ticker Symbol</label>
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

export default SingleStockSearch
