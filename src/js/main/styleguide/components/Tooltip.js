import React from 'react'

// Note: this component is only used for providing example markup to the styleguide. 
// Do not import it directly into the application.

function Tooltip () {
  return (
    <p>
      Some text that needs extra copy. 
      <div className="tooltip-block">
      <div className="tooltip-item">
        ?
        <div className="tooltip">
          Some additional copy.
        </div>
      </div>
      </div>
    </p>
  )
}

export default Tooltip