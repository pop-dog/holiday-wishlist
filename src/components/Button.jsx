import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ children, className, onClick }) => {
  return <button onClick={onClick} className={'font-bold py-2 px-4 border rounded disabled:pointer-events-none disabled:opacity-70 ' + className}>{children}</button>
}

Button.defaultProps = {
    className: 'bg-gray-100 border-gray-200 text-black hover:bg-gray-200',
    onClick: (ev) => {window.alert('Button onClick not set!')},
}

Button.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button