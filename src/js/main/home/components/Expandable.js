import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { pure } from 'recompose'
import { useUID } from 'react-uid'

const propTypes = {
  headerTitle: PropTypes.string.isRequired,
  headerComponent: PropTypes.func,
  startExpanded: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node,
}

const defaultProps = {
  headerComponent: null,
  startExpanded: false,
  disabled: false,
}

function DefaultHeader({ title }) {
  return <span>{title}</span>
}

function ExpandableItem({
  headerTitle,
  headerComponent,
  startExpanded,
  disabled,
  children,
  ...rest
}) {
  const [expanded, setExpanded] = useState(startExpanded)
  const id = useUID()
  const Header = headerComponent || DefaultHeader
  return (
    <div className="expandable-section-item">
      <div className="expandable-section-header">
        <button
          aria-expanded={expanded}
          onClick={() => {
            if (disabled) return
            setExpanded(!expanded)
          }}
          aria-controls={`${id}-container`}
          disabled={disabled}
        >
          <Header title={headerTitle} {...rest} />
        </button>
      </div>
      <div id={`${id}-container`} className="expandable-section-details">
        {expanded && children}
      </div>
    </div>
  )
}

ExpandableItem.propTypes = propTypes
ExpandableItem.defaultProps = defaultProps

export default pure(ExpandableItem)
