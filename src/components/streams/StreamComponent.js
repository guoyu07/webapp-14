/* eslint no-console: 0 */
import React from 'react'
import { connect } from 'react-redux'
import { ElloMark } from '../iconography/ElloIcons'
import { findBy } from '../base/json_helper'
import * as ACTION_TYPES from '../../constants/action_types'

export class StreamComponent extends React.Component {
  componentWillMount() {
    const { action, dispatch } = this.props
    action ? dispatch(action) : console.error('Action is required to load a stream')
  }

  componentDidMount() {
    if (window.embetter) {
      window.embetter.reloadPlayers()
    }
    window.addEventListener('scroll', this.windowWasScrolled.bind(this))
  }

  componentDidUpdate() {
    if (window.embetter) {
      window.embetter.reloadPlayers()
    }
  }

  componentWillUnmount() {
    if (window.embetter) {
      window.embetter.stopPlayers()
    }
    window.removeEventListener('scroll', this.windowWasScrolled.bind(this))
  }

  findModel(json, initModel) {
    if (!initModel || !initModel.findObj || !initModel.collection) {
      return null
    }
    return findBy(initModel.findObj, initModel.collection, json)
  }

  getScrollY() {
    return Math.ceil(window.pageYOffset)
  }

  getScrollHeight() {
    return Math.max(document.body.scrollHeight, document.body.offsetHeight)
  }

  getScrollBottom() {
    return Math.round(this.getScrollHeight() - window.innerHeight)
  }

  checkScrollPosition() {
    const scrollY = this.getScrollY()
    const scrollBottom = this.getScrollBottom()
    if (scrollY == 0) {
      console.log('scroll top')
    } else if (Math.abs(scrollY - scrollBottom) < 5) {
      console.log('scroll bottom')
      this.loadPage('next')
    }
  }

  loadPage(rel) {
    const { action, dispatch, json, router } = this.props
    const result = json.pages ? json.pages[router.location.pathname] : null
    const { pagination } = result
    if (pagination.totalPagesRemaining === 0) { return }
    dispatch(
      {
        type: ACTION_TYPES.LOAD_NEXT_CONTENT,
        payload: { endpoint: { path: pagination[rel] } },
        meta: { mappingType: action.payload.endpoint.pagingPath || action.meta.mappingType },
      }
    )
  }

  windowWasScrolled(e) {
    if (!this.ticking) {
      requestAnimationFrame(() => {
        this.checkScrollPosition()
        this.ticking = false
      })
      this.ticking = true
    }
  }


  renderError() {
    return (
      <section className="StreamComponent hasErrored">
        <div className="StreamErrorMessage">
          <img src="/static/images/support/ello-spin.gif" alt="Ello" width="130" height="130" />
          <p>This doesn't happen often, but it looks like something is broken. Hitting the back button and trying again might be your best bet. If that doesn't work you can <a href="http://ello.co/">head back to the homepage.</a></p>
          <p>There might be more information on our <a href="http://status.ello.co/">status page</a>.</p>
          <p>If all else fails you can try checking out our <a href="http://ello.threadless.com/" target="_blank">Store</a> or the <a href="https://ello.co/wtf/post/communitydirectory">Community Directory</a>.</p>
        </div>
      </section>
    )
  }

  renderLoading() {
    return (
      <section className="StreamComponent isBusy">
        <div className="StreamBusyIndicator">
          <ElloMark />
        </div>
      </section>
    )
  }

  render() {
    const { action, currentUser, initModel, json, router, stream } = this.props
    const { meta, payload } = action
    const result = json.pages ? json.pages[router.location.pathname] : null
    if (stream.error) {
      return this.renderError()
    }
    const jsonables = []
    const nextJsonables = []
    const model = this.findModel(json, initModel)
    if (model) {
      jsonables.push(model)
    } else if (!result || !result.type || !result.ids) {
      return this.renderLoading()
    } else {
      for (const id of result.ids) {
        jsonables.push(json[result.type][id])
      }
      if (result.next) {
        for (const nextId of result.next.ids) {
          nextJsonables.push(json[result.next.type][nextId])
        }
      }
    }
    if (!jsonables.length || !meta) {
      return this.renderLoading()
    }
    return (
      <section className="StreamComponent">
        { meta.renderStream(jsonables, json, currentUser, nextJsonables, payload.vo) }
      </section>
    )
  }
}

// This should be a selector
// @see: https://github.com/faassen/reselect
function mapStateToProps(state) {
  return {
    json: state.json,
    currentUser: state.profile.payload,
    router: state.router,
    stream: state.stream,
  }
}

StreamComponent.propTypes = {
  action: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired,
  json: React.PropTypes.object.isRequired,
  initModel: React.PropTypes.object,
  currentUser: React.PropTypes.object,
  router: React.PropTypes.object.isRequired,
  stream: React.PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(StreamComponent)

