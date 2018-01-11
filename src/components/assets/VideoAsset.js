import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { css, parent } from '../../styles/jss'
import * as s from '../../styles/jso'

const backgroundStyle = css(
  s.absolute,
  s.flood,
  {
    background: 'transparent no-repeat 50% 50%',
    backgroundSize: 'cover',
    transition: 'opacity 0.4s ease',
  },
  parent('isRequesting >', s.opacity0),
)

export default class Asset extends PureComponent {

  static propTypes = {
    id: PropTypes.string,
    isPostBody: PropTypes.bool,
    isPostDetail: PropTypes.bool,
    isGridMode: PropTypes.bool,
    onScreenDimensions: PropTypes.func,
    src: PropTypes.string,
  }

  static defaultProps = {
    id: null,
    isPostBody: false,
    isPostDetail: false,
    isGridMode: false,
    onScreenDimensions: null,
    src: null,
  }

  componentDidMount() {
    this.createLoader()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.src !== this.props.src) {
      this.createLoader()
    }
    this.getDimensionsOnScreen()
  }

  componentWillUnmount() {
    this.disposeLoader()
  }

  onLoadSuccess = () => {
    this.getDimensionsOnScreen()
    this.disposeLoader()
  }

  onLoadFailure = () => {
    this.disposeLoader()
  }

  getDimensionsOnScreen = () => {
    const onScreenDimensions = {
      width: this.videoOnScreen.clientWidth,
      height: this.videoOnScreen.clientHeight,
    }
    console.log('video dimensions measured')
    console.log(this.videoOnScreen)
    console.log(onScreenDimensions)
    this.props.onScreenDimensions(onScreenDimensions)
  }

  createLoader() {
    this.disposeLoader()
    const { src } = this.props
    const hasSource = !!(src && src.length)
    if (!hasSource) { return }
    this.video = new Image()
    this.video.onload = this.onLoadSuccess
    this.video.onerror = this.onLoadFailure
    this.video.src = src
  }

  disposeLoader() {
    if (!this.video) { return }
    this.video.onload = null
    this.video.onerror = null
    this.video = null
  }

  render() {
    const elementProps = { ...this.props }
    delete elementProps.onLoadFailure
    delete elementProps.onLoadSuccess
    delete elementProps.isPostBody
    delete elementProps.isPostDetail
    delete elementProps.isGridMode
    delete elementProps.onScreenDimensions
    return (
      <video
        id={elementProps.id}
        autoPlay
        loop
        muted
        playsInline
        width={elementProps.width}
        height={elementProps.height}
        ref={(videoOnScreen) => { this.videoOnScreen = videoOnScreen }}
      >
        <track kind="captions" />
        <source src={elementProps.src} />
      </video>
    )
  }
}

