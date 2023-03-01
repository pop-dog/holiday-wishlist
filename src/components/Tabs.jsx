import React from 'react'
import { useState } from 'react'
import Tab from './Tab'

const Tabs = ({children, defaultTab}) => {
    const [activeTab, setActiveTab] = useState(defaultTab || children[0].label);

    const handleOnClick = (e, label) => {
        e.preventDefault();
        setActiveTab(label);
    }

    return (
        <div className='flex flex-col'>
            <div className="text-sm font-medium text-center text-gray-600 border-b border-gray-600">
                <ul className="flex flex-wrap -mb-px">
                    {children.map(child => {
                        const label = child.props.label;
                        const isActive = child.props.label === activeTab;
                        const isDisabled = child.props.isDisabled || false;
                        return (
                            <Tab key={'tab_' + label} label={label} isActive={isActive} isDisabled={isDisabled} onClick={(e) => {handleOnClick(e, label)}} />
                        )
                    })}
                </ul>
            </div>
            <div>
                {children.map(child => {
                    if (child.props.label !== activeTab) return undefined;
                    return child.props.children;
                })}
            </div>
        </div>
    )
}
export default Tabs