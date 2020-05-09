import React, { useState, useEffect } from 'react'
import { pure } from 'recompose'

const propTypes = {}

const defaultProps = {}

function OfflineOverlay() {
  const [showOverlay, setShowOverlay] = useState(navigator && !navigator.onLine)

  useEffect(() => {
    const _hideOverlay = () => setShowOverlay(false)
    const _showOverlay = () => setShowOverlay(true)

    window.addEventListener('online', _hideOverlay)
    window.addEventListener('offline', _showOverlay)

    // Remove listeners on unmount
    return () => {
      window.removeEventListener('online', _hideOverlay)
      window.addEventListener('offline', _showOverlay)
    }
  }, [])

  if (!showOverlay) return null
  return (
    <div className="offline-overlay">
      <p>You are offline.</p>
    </div>
  )
}

OfflineOverlay.propTypes = propTypes
OfflineOverlay.defaultProps = defaultProps

export default pure(OfflineOverlay)
