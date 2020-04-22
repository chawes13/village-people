import React from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
import { pure } from 'recompose'
import Expandable from './Expandable'

const propTypes = {
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
}

const defaultProps = {}

function ContactCard ({ name, phoneNumber }) {
  return (
    <Expandable headerTitle={name}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <a href={'tel:' + phoneNumber}>
          <div>{phoneNumber}</div>
        </a>
        <a href={'sms:' + phoneNumber}>Text</a>
      </div>
    </Expandable>
  )
}

ContactCard.propTypes = exact(propTypes)
ContactCard.defaultProps = defaultProps

export default pure(ContactCard)
