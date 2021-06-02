import React, { ReactNode, MouseEvent, useState, useRef, useEffect } from 'react'
import './css/index.css'
export interface TabItemProps {
    title: string,
    tabContent: ReactNode
}
type TabsProps = {
    className?: string,
    tabList: TabItemProps[]
}
export default function Tabs(props: TabsProps) {
    const { className = '', tabList } = props
    const [tabIndex, setTabIndex] = useState<number>(0)
    const tabContentRef = useRef<HTMLDivElement>(null)
    const tabListRendered = useRef<number[]>([0])

    useEffect(() => {
        if (tabContentRef.current) {
            const firstTabTitle = tabContentRef.current.previousSibling?.childNodes[0] as HTMLDivElement
            if (firstTabTitle) firstTabTitle?.classList.add('tab-title-selected')
            tabContentRef.current.children[0]?.classList.add('tab-content-selected')
        }
    }, [tabList])

    function handleOnTabChange(event: MouseEvent<HTMLDivElement>): void {
        event.preventDefault()
        if (event.currentTarget.classList.contains('tab-title-selected')) return
        else {
            //handle remove active from tab title
            let elem = event.currentTarget.parentElement?.getElementsByClassName('tab-title-selected')[0]
            elem && elem.classList.remove('tab-title-selected')
            event.currentTarget.classList.add('tab-title-selected')

            //handle remove active form tab content
            elem = tabContentRef.current?.getElementsByClassName('tab-content-selected')[0]
            elem && elem.classList.remove('tab-content-selected')

            const indexTab = Number(event.currentTarget.getAttribute('data-index'))

            if (!tabListRendered.current.includes(indexTab)) {
                tabListRendered.current.push(indexTab)
                tabListRendered.current.sort()
                setTabIndex(indexTab)
            } else {
                const tabActive = tabContentRef.current?.querySelector(`div[data-index="${indexTab}"]`) as HTMLDivElement
                tabActive.classList.add('tab-content-selected')
            }
        }
    }
    if (Math.max(...tabListRendered.current) > tabList.length - 1) {
        tabListRendered.current = [0]
    }

    return (
        <div className={`tab-container ${className}`}>
            <TabHeader tabList={tabList} onTabChange={handleOnTabChange} />
            <div className="tab-content" ref={tabContentRef}>
                {
                    tabListRendered?.current?.map((tabItem) =>
                        <div
                            className={`tab-content-item ${tabItem == tabIndex ? 'tab-content-selected' : ''}`}
                            data-index={tabItem}
                            key={tabItem}
                        >
                            {tabList[tabItem]?.tabContent}
                        </div>
                    )
                }
            </div>
        </div>
    )
}


type TabHeaderProps = {
    tabList: TabItemProps[],
    onTabChange: (event: MouseEvent<HTMLDivElement>) => void
}
export const TabHeader = ({ tabList, onTabChange }: TabHeaderProps) => {
    return (
        <div className="tab-title">
            {
                tabList.map((item, index) =>
                    <div
                        onClick={onTabChange}
                        tabIndex={index}
                        key={`${item?.title}-${index}`}
                        data-index={index}
                        className={
                            index === 0 ? 'tab-title-item tab-title-selected' : 'tab-title-item ' + `${item?.title} ${index}`
                        }>
                        {item?.title}
                    </div>
                )
            }
        </div>
    )
}