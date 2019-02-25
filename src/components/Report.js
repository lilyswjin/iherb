import React from 'react'
import uuid from 'uuid/v1'

const Report = ({colours}) => {

  let list = colours.map(( colour ) => {
    return (
      <div className="colour-item" key={uuid()}>
        <div>{colour}</div>
        <div>{localStorage.getItem(colour)}</div>
      </div>
    )
  })

  return (
    <div className="colour"> 
      {list}
    </div>
  )
}
export default Report