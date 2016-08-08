import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { isEqual, pick } from 'lodash'
import { SHORTCUT_KEYS } from '../constants/application_types'
import { closeModal, closeAlert } from '../actions/modals'
import Mousetrap from '../vendor/mousetrap'
import { Modal } from '../components/modals/Modal'

export function shouldContainerUpdate(thisProps, nextProps) {
  const pickProps = ['classList', 'isActive', 'kind']
  const thisCompare = pick(thisProps, pickProps)
  const nextCompare = pick(nextProps, pickProps)
  return !isEqual(thisCompare, nextCompare)
}

export function mapStateToProps(state) {
  return {
    ...state.modal,
  }
}

class ModalContainer extends Component {
  static propTypes = {
    classList: PropTypes.string,
    component: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
    kind: PropTypes.string.isRequired,
  }

  componentDidMount() {
    Mousetrap.bind(SHORTCUT_KEYS.ESC, () => { this.close() })
  }

  shouldComponentUpdate(nextProps) {
    return shouldContainerUpdate(this.props, nextProps)
  }

  componentDidUpdate() {
    const { isActive, kind } = this.props
    const body = ReactDOM.findDOMNode(document.body)
    if (kind === 'Modal' && isActive) {
      body.classList.add('isModalActive')
    } else if (kind === 'Modal' && !isActive) {
      body.classList.remove('isModalActive')
    }
  }

  componentWillUnmount() {
    Mousetrap.unbind(SHORTCUT_KEYS.ESC)
  }

  onClickModal = (e) => {
    const classList = e.target.classList
    if (classList.contains('Modal') ||
        classList.contains('Alert') ||
        classList.contains('CloseModal')) {
      this.close()
    }
  }

  close() {
    const { dispatch, isActive, kind } = this.props
    if (isActive) {
      dispatch(kind === 'Modal' ? closeModal() : closeAlert())
    }
  }

  render() {
    const { isActive, classList, component, kind } = this.props
    const elementProps = { classList, component, isActive, kind }
    if (isActive) {
      elementProps.onClickModal = this.onClickModal
    }
    return <Modal {...elementProps} />
  }
}

export default connect(mapStateToProps)(ModalContainer)
