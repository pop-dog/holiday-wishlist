import React from 'react'

const Tab = ({label, isActive, isDisabled, onClick}) => {
    const getClass = (isActive, isDisabled) => {
        if (isDisabled) return 'inline-block p-4 text-gray-400 rounded-t-lg';
        else if (isActive) return 'inline-block p-4 text-red-700 rounded-t-lg border-b-4 border-red-700 active';
        else return 'inline-block p-4 rounded-t-lg border-b-4 border-transparent hover:text-gray-700 hover:border-gray-600';
    }
    const getCursor = (isActive, isDisabled) => {
      if (isDisabled) return 'cursor-not-allowed pointer-events-none';
      else if (isActive) return 'cursor-default';
      else return 'cursor-pointer';
    }
  return (
    <li className={"mr-2 text-lg font-bold " + getCursor(isActive, isDisabled)} onClick={onClick}>
        <a href="#" className={getClass(isActive, isDisabled)}>{label}</a>
    </li>
  )
}

export default Tab