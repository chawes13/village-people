import React from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
import { pure } from 'recompose'
import Expandable from './Expandable'
import message from 'images/utility-icons/message.svg'

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
        <a className="primary-action" href={'tel:' + phoneNumber}>
          <div>{phoneNumber}</div>
          <div className="contact details">
            <p>{details}</p>
          </div>
        </a>
        <a className="secondary-action" href={'sms:' + phoneNumber}>
          <img src={message} alt="Send Text" />
        </a>
      </div>
    </Expandable>
  )
}

ContactCard.propTypes = exact(propTypes)
ContactCard.defaultProps = defaultProps

export default pure(ContactCard)
