import React, { PropsWithChildren } from "react"
import { DevTabProps } from "./DevTab"

export const DevTabs = ({ children }: PropsWithChildren) => {
  const [selectedTab, setSelectedTab] = React.useState("store")
  const tabs = React.Children.toArray(
    children
  ) as React.ReactElement<DevTabProps>[]
  const isSelected = (tab: React.ReactElement) => {
    return tab.props.value === selectedTab
  }
  const handleChangeTab = (key: string) => () => {
    setSelectedTab(key)
  }

  return (
    <>
      <div className="nav">
        <ul className="nav__list nav__list--column nav__list--tab">
          {tabs.map((tab) => (
            <li
              className={`nav__item ${
                selectedTab === tab.props.value && "nav__item--active"
              }`}
              key={tab.props.value}
              onClick={handleChangeTab(tab.props.value)}
            >
              {tab.props.navLabel}
            </li>
          ))}
        </ul>
      </div>
      <div className="container__col flex-1">
        {tabs.find((tab) => isSelected(tab))}
      </div>
    </>
  )
}
