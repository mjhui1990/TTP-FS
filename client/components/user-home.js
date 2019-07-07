import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Table, Grid, Card} from 'semantic-ui-react'
import moment from 'moment'

import {getPortfolio} from '../store/portfolio'
import SingleStockSearch from './singleStockSearch'
import SingleStockView from './singleStockView'

class UserHome extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchPortfolio(this.props.email)
  }

  render() {
    const tableBD = arr => {
      return arr.map(data => {
        const {ticker, shares, purchasePrice, id, createdAt} = data
        const formated = moment(createdAt).format('MMM DD YYYY HH:MM')
        return (
          <Table.Row key={ticker + id}>
            <Table.Cell>{ticker}</Table.Cell>
            <Table.Cell>{shares}</Table.Cell>
            <Table.Cell>{purchasePrice}</Table.Cell>
            <Table.Cell>{formated}</Table.Cell>
            <Table.Cell>{shares * purchasePrice}</Table.Cell>
          </Table.Row>
        )
      })
    }
    const holdings = this.props.portfolio.portfolio
      ? this.props.portfolio.portfolio.holdings
      : null
    const table = holdings ? tableBD(holdings) : null
    const buyingPower = this.props.portfolio.portfolio
      ? this.props.portfolio.portfolio.buyingPower
      : 0
    const tableHeaders = [
      'tickers',
      'shares',
      'Buy Price',
      'Purchase Date',
      'total'
    ]
    const headerCell = tableHeaders.map(info => {
      return <Table.HeaderCell key={info}>{info}</Table.HeaderCell>
    })

    return (
      <div>
        <div>
          <h3>Welcome, {this.props.email}</h3>
        </div>
        <div>
          <Grid>
            <Grid.Row>
              <Grid.Column width={10}>
                <Table celled>
                  <Table.Header>
                    <Table.Row>{headerCell}</Table.Row>
                  </Table.Header>
                  <Table.Body>{table}</Table.Body>
                </Table>
              </Grid.Column>
              <Grid.Column width={6}>
                <Card.Group>
                  <Card>
                    <Card.Description content={`Buying Power:${buyingPower}`} />
                  </Card>
                </Card.Group>
                <SingleStockSearch />
                <SingleStockView />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    name: state.user.name,
    email: state.user.email,
    portfolio: state.portfolio
  }
}

const mapDispatch = dispatch => {
  return {
    fetchPortfolio: email => dispatch(getPortfolio(email))
  }
}

export default connect(mapState, mapDispatch)(UserHome)
