import React from 'react'
import {connect} from 'react-redux'

const SingleStockView = props => {
  console.log(props.stock)

  let data = props.stock

  const infoArray = [<p>hello</p>]
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
  console.log(state.stock)
  return {
    stock: state.stock
  }
}

export default connect(mapState, null)(SingleStockView)
