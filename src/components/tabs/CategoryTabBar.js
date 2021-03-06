// @flow
import React from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import type { CategoryTabProps } from '../../types/flowtypes'

type TabProps = {
  isActive: boolean,
  label: string,
  source: string,
  to: string,
}

const backgroundStyles = source => ({
  backgroundImage: `url("${source}")`,
})

const CategoryTab = (props: TabProps) => {
  const { isActive, label, source, to } = props
  return (
    <Link
      className={classNames('CategoryTab', { isActive })}
      to={to}
      style={source ? backgroundStyles(source) : null}
    >
      <span className="CategoryTabLabel">{label}</span>
    </Link>
  )
}

type TabBarProps = {
  pathname: string,
  tabs: Array<CategoryTabProps>,
}

export const CategoryTabBar = (props: TabBarProps) => {
  const { pathname, tabs } = props
  return (
    <div className="CategoryTabBar">
      <nav className="CategoryTabs">
        {tabs.map(tab =>
          (<CategoryTab
            isActive={(tab.activePattern ? tab.activePattern.test(pathname) : tab.to === pathname)}
            key={`CategoryTab_${tab.to}`}
            label={tab.label}
            source={tab.source}
            to={tab.to}
          />),
        )}
      </nav>
      <div className="CategoryTabBarUtility">
        <Link
          activeClassName="isActive"
          className="CategoryUtilTab"
          to="/discover/all"
        >
          <span>See All</span>
        </Link>
      </div>
    </div>
  )
}

export default CategoryTabBar

