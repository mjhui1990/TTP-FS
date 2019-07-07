import React from 'react'

const SingleStockView = props => {
  const data = {
    symbol: 'AMD',
    companyName: 'Advanced Micro Sytem',
    marketCap: '12321312',
    week52low: 32,
    week52High: 35
  }

  const infoArray = []
  if (data) {
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

export default SingleStockView
