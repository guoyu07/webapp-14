import React, { PropTypes } from 'react'
import StreamComponent from '../streams/StreamComponent'
import { MainView } from '../views/MainView'
import { ZeroStream } from '../zeros/Zeros'

const StarredZeroStream = ({ onDismissZeroStream }) =>
  <ZeroStream onDismiss={onDismissZeroStream}>
    Star creators and communities to curate your second stream.
  </ZeroStream>

StarredZeroStream.propTypes = {
  onDismissZeroStream: PropTypes.func.isRequired,
}

export const Starred = ({
    isBeaconActive,
    onDismissZeroStream,
    streamAction,
  }) =>
  <MainView className="Starred">
    {isBeaconActive ? <StarredZeroStream onDismissZeroStream={onDismissZeroStream} /> : null}
    <StreamComponent action={streamAction} scrollSessionKey="/starred" />
  </MainView>

Starred.propTypes = {
  isBeaconActive: PropTypes.bool.isRequired,
  onDismissZeroStream: PropTypes.func.isRequired,
  streamAction: PropTypes.object.isRequired,
}

