import React, {Component} from 'react'
import {FormField, Form, Button} from 'semantic-ui-react'
import axios from 'axios'

class SingleStockSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ticker: ''
    }
  }

  handleChange = e => {
    this.setState({ticker: e.target.value})
    console.log(this.state.ticker)
  }

  handleSubmit = async event => {
    const tickerSym = this.state.ticker
    event.preventDefault()
    const response = await axios.get('/api/holdings', {
      params: {
        ticker: tickerSym
      }
    })
    console.log(response)
  }

  render() {
    return (
      <div>
        <Form onSubmit={e => this.handleSubmit(e)}>
          <FormField>
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
