import React from 'react'
// import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
import { pure } from 'recompose'

const propTypes = {}

const defaultProps = {}

const CURRENT_YEAR = new Date().getFullYear()

function Footer() {
  return <footer>© {CURRENT_YEAR} Misericordia. All Rights Reserved.</footer>
}

Footer.propTypes = exact(propTypes)
Footer.defaultProps = defaultProps

export default pure(Footer)
