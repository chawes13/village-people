import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import * as routerSelectors from 'connected-react-router'
import { logException } from 'sentry'
import { onError, onUpdate } from 'lp-hoc'
import { getFlashMessages, flashMessageType } from 'redux-flash'
import { FlashMessageContainer } from 'lp-components'
import { Header, Footer, ServerStatusOverlay, SkipNavLink } from 'components'
import { isProduction } from 'config'
import { scrollToTop } from 'utils'

const propTypes = {
  flashMessages: PropTypes.arrayOf(flashMessageType).isRequired,
  children: PropTypes.node.isRequired,
}

const defaultProps = {}

function Layout({ flashMessages, children }) {
  return (
    <div>
      {!isProduction() && <ServerStatusOverlay />}
      <FlashMessageContainer messages={flashMessages} />
      <SkipNavLink targetId="main-content">Skip to main content</SkipNavLink>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  )
}

Layout.propTypes = propTypes
Layout.defaultProps = defaultProps

function mapStateToProps(state) {
  return {
    flashMessages: getFlashMessages(state),
    pathname: routerSelectors.getLocation(state).pathname,
  }
}

const mapDispatchToProps = {}

// Send logged errors to Sentry
function onComponentDidCatch(props, error, errorInfo) {
  return logException(error, errorInfo)
}

// Scroll to top of page when route changes
function onComponentDidUpdate({ pathname }, oldProps) {
  if (pathname !== oldProps.pathname) return scrollToTop()
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  onError(onComponentDidCatch),
  onUpdate(onComponentDidUpdate)
)(Layout)
