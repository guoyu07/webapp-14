import React, { Component } from 'react'
import Immutable from 'immutable'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadEditorials } from '../actions/editorials'
import { getLinkObject } from '../helpers/json_helper'
import StreamContainer from '../containers/StreamContainer'
import { HeroHeader } from '../components/heros/HeroRenderables'
import { MainView } from '../components/views/MainView'
import { trackPostViews } from '../actions/posts'
import { media } from '../styles/jss'
import { maxBreak2 } from '../styles/jso'
import { selectQueryPreview } from '../selectors/routing'
import { selectRandomEditorialPromotion } from '../selectors/promotions'
import { selectDPI } from '../selectors/gui'
import { selectJson } from '../selectors/store'

const streamStyle = media(maxBreak2, {
  paddingLeft: '0 !important',
  paddingRight: '0 !important',
})

const mapStateToProps = state => ({
  dpi: selectDPI(state),
  isPreview: selectQueryPreview(state) === 'true',
  json: selectJson(state),
  randomPromotion: selectRandomEditorialPromotion(state),
})

class EditorialPage extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    dpi: PropTypes.string.isRequired,
    isPreview: PropTypes.boolean,
    json: PropTypes.object,
    randomPromotion: PropTypes.object,
  }

  static defaultProps = {
    isPreview: false,
    json: null,
    randomPromotion: null,
  }

  shouldComponentUpdate(nextProps) {
    return !Immutable.is(nextProps.randomPromotion, this.props.randomPromotion) ||
      ['dpi'].some(prop =>
        nextProps[prop] !== this.props[prop],
      )
  }

  componentDidUpdate() {
    const { dispatch, randomPromotion } = this.props
    if (randomPromotion && randomPromotion.get('postToken')) {
      dispatch(trackPostViews([], [randomPromotion.get('postToken')], 'promo'))
    }
  }

  render() {
    const { dpi, json, randomPromotion } = this.props
    let hero
    if (randomPromotion) {
      const header = randomPromotion.get('header', '')
      const subheader = randomPromotion.get('subheader', '')
      const user = getLinkObject(randomPromotion, 'user', json) || Immutable.Map()
      const avatarSources = user.get('avatar', null)
      const username = user.get('username', null)
      const sources = randomPromotion.get('image', null)
      hero = (<HeroHeader
        dpi={dpi}
        headerText={header}
        subHeaderText={subheader}
        sources={sources}
        avatarSources={avatarSources}
        username={username}
      />)
    }
    return (
      <MainView className="Editorial">
        { hero }
        <StreamContainer
          action={loadEditorials(this.props.isPreview)}
          className={`${streamStyle}`}
          paginatorText="Load More"
          paginatorCentered
        />
      </MainView>
    )
  }
}

export default connect(mapStateToProps)(EditorialPage)

