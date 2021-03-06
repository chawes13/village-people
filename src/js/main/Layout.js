import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import * as routerSelectors from 'connected-react-router'
import { getFlashMessages, flashMessageType } from 'redux-flash'
import { FlashMessageContainer, Spinner } from '@launchpadlab/lp-components'
import { Header, Footer, SkipNavLink, OfflineOverlay } from 'components'
import { scrollToTop } from 'utils'
import { api } from 'api'
import * as LS from 'local-storage'

const propTypes = {
  flashMessages: PropTypes.arrayOf(flashMessageType).isRequired,
  children: PropTypes.node.isRequired,
  pathname: PropTypes.string.isRequired,
}

const defaultProps = {}

function authenticate() {
  return api.post('/authentication/sessions')
}

function Layout({ flashMessages, children, pathname }) {
  const [tokenChecked, setTokenChecked] = useState(false)

  useEffect(() => {
    scrollToTop()
  }, [pathname])

  useEffect(() => {
    authenticate()
      .catch((err) => {
        if (err.status === 401) return LS.clearToken()
      })
      .finally(() => setTokenChecked(true))
  }, [])

  return (
    <div>
      <FlashMessageContainer messages={flashMessages} />
      <SkipNavLink targetId="main-content">Skip to main content</SkipNavLink>
      <Header />
      <main id="main-content">{tokenChecked ? children : <Spinner />}</main>
      <Footer />
      <OfflineOverlay />
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

export default compose(connect(mapStateToProps, mapDispatchToProps))(Layout)
