import React from 'react'

const Notification = ({data}) => {
    const message = data.message
    const isError = data.isError
    
  if (message === null || message === "") {
    return null
  }

  if (!isError) {
    return (
      <div className="success"> 
        {message} 
      </div>
    )
  }
  else {
    return (
      <div className="error"> 
          {message} 
      </div>
      ) 
  }
}

export default Notification