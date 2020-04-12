import React from 'react'
// import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
import { pure } from 'recompose'

const propTypes = {}

const defaultProps = {}

function Header() {
  return (
    <header>
      <h1>The Village People</h1>
    </header>
  )
}

Header.propTypes = exact(propTypes)
Header.defaultProps = defaultProps

export default pure(Header)
