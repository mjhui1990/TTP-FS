import React, {Component, useEffect} from 'react'
import {connect} from 'react-redux'
import {getPortfolio} from '../store/portfolio'

class UserHome extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchPortfolio(this.props.email)
  }

  render() {
    return (
      <div>
        <h3>Welcome, {this.props.email}</h3>
      </div>
    )
  }
}

const mapState = state => {
  return {
    email: state.user.email
  }
}

const mapDispatch = dispatch => {
  return {
    fetchPortfolio: email => dispatch(getPortfolio(email))
  }
}

export default connect(mapState, mapDispatch)(UserHome)
