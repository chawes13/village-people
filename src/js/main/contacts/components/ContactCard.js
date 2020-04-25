import React from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
import { pure } from 'recompose'
import Expandable from './Expandable'

const propTypes = {
  details: PropTypes.string,
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
}

const defaultProps = {
  details: '',
}

function ContactCard({ details, name, phoneNumber }) {
  return (
    <Expandable headerTitle={name}>
      <div className="contact actions">
        <a href={'tel:' + phoneNumber}>
          <div>{phoneNumber}</div>
        </a>
        <a href={'sms:' + phoneNumber}>Text</a>
      </div>
      <div className="contact details">{details}</div>
    </Expandable>
  )
}

ContactCard.propTypes = exact(propTypes)
ContactCard.defaultProps = defaultProps

export default pure(ContactCard)
