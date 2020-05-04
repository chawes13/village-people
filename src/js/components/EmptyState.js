import React from 'react'
import PropTypes from 'prop-types'
import { pure } from 'recompose'
import classnames from 'classnames'

const propTypes = {
  message: PropTypes.string.isRequired,
  className: PropTypes.string,
}

const defaultProps = {
  className: '',
}

function EmptyState({ className, message, ...rest }) {
  return (
    <div className={classnames('empty-state', className)} {...rest}>
      <p>{message}</p>
    </div>
  )
}

EmptyState.propTypes = propTypes
EmptyState.defaultProps = defaultProps

export default pure(EmptyState)
