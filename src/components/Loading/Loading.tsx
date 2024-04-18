import React from 'react'
import "./Loading.css"

const Loading = (): React.ReactElement => {
  return <main
    className='loading-container'
  >
    <h1 className="loading-header">Loading</h1>
    <div className="loading">
      <div className="loading-dial"></div>
    </div>
  </main>
}

export default Loading
