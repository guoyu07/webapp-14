import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { ElloMark, ElloRainbowMark, ElloDonutMark, ElloNinjaSuit } from '../svg/ElloIcons'

const getLogoMark = (mark) => {
  console.log(mark)
  switch (mark) {
    case 'rainbow':
      return <ElloRainbowMark />
    case 'donut':
      return <ElloDonutMark />
    case 'none':
      return null
    case 'normal':
    default:
      return <ElloMark />
  }
}

const getLogoModifier = (mods) => {
  switch (mods) {
    case 'isNinja':
      return <ElloNinjaSuit />
    default:
      return null
  }
}


export const NavbarMark = ({ currentStream, isLoggedIn, onClick }) => {
  const list = ENV.LOGO_MARK.split('.')
  const mark = list[0]
  const mods = list.slice(1).join(' ')
  return (
    <Link
      className="NavbarMark"
      draggable
      onClick={ onClick }
      to={ isLoggedIn ? currentStream : '/' }
    >
      { getLogoModifier(mods) }
      { getLogoMark(mark) }
    </Link>
  )
}

NavbarMark.propTypes = {
  currentStream: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

