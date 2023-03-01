import React from 'react'
import PropTypes from 'prop-types'

const Form = ({children = []}) => {
  return (
    <form className='w-full'>
        {children}
    </form>
  )
}

const Buttons = ({children}) => {
    return (
        <div className='flex flex-row py-2 [&>*]:mr-2'>
            {children}
        </div>
    );
}

const Field = ({children, className, label }) => {
    return (
      <label className={'flex flex-col py-2 ' + className}>
        {label && <span className='font-medium py-2'>{label}</span>}
        {children}
      </label>
    )
}

const Text = ({ name, friendlyName, onChange, readOnly, value, type, className}) => {
    return (
        <input readOnly={readOnly} title={friendlyName ? friendlyName : name} onChange={onChange} className={'border p-3 read-only:bg-slate-100 read-only:pointer-events-none read-only:select-none ' + (className || '')} type={type ? type : 'text'} value={value ? value : ''}></input>
    )
}

const Textarea = ({ name, friendlyName, onChange, readOnly, value, type, className}) => {
    return (
        <textarea readOnly={readOnly} title={friendlyName ? friendlyName : name} onChange={onChange} className={'border p-3 read-only:bg-slate-100 read-only:pointer-events-none read-only:select-none ' + (className || '')} type={type ? type : 'text'} value={value ? value : ''}></textarea>
    )
}

const Checkbox = ({ name, friendlyName, onChange, readOnly, value, type, className}) => {
    return (
        <input readOnly={readOnly} title={friendlyName ? friendlyName : name} onChange={onChange} className={'border p-3 ' + (className || '')} type={'checkbox'} defaultChecked={value ? value : ''}></input>
    )
}

const Number = ({name, friendlyName, onChange, readOnly, value, min, max, className}) => {
    return (
        <input readOnly={readOnly} title={friendlyName ? friendlyName : name} onChange={onChange} className={'border p-3 read-only:bg-slate-100 read-only:pointer-events-none read-only:select-none ' + (className || '')} min={min} max={max} type={'number'} value={value ? value : ''}></input>
    )
}

const Select = ({children, name, friendlyName, onChange, readOnly, value, className}) => {
    return (
        <select readOnly={readOnly} title={friendlyName ? friendlyName : name} onChange={onChange} className={'border p-3 ' + (className || '')} value={value ? value : ''}>
            {children}
        </select>
    )
}

const Group = ({children}) => {
    return (
        <div className='flex flex-row py-2 flex-grow-0'>
            {children}
        </div>
    )
}

Field.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string
}

Text.propTypes = {
    name: PropTypes.string.isRequired,
    friendlyName: PropTypes.string,
    onChange: PropTypes.func,
    readOnly: PropTypes.bool,
    value: PropTypes.any,
    type: PropTypes.string
}

Select.propTypes = {
    name: PropTypes.string.isRequired,
    friendlyName: PropTypes.string,
    onChange: PropTypes.func,
    readOnly: PropTypes.bool,
    value: PropTypes.any,
}

Form.Buttons = Buttons;
Form.Field = Field;
Form.Text = Text;
Form.Number = Number;
Form.Select = Select;
Form.Group = Group;
Form.Checkbox = Checkbox;
Form.Textarea = Textarea;


export default Form