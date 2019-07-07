import React from 'react'
import {connect} from 'react-redux'

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
  return <div>{infoArray}</div>
}

const mapState = state => {
  return {
    stock: state.stock
  }
}
export default connect(mapState, null)(SingleStockView)
