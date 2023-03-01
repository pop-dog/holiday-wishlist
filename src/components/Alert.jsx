import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import React, { Fragment } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { UseAlert } from '../context/AlertContext'

const Alert = ({alert}) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (alert && alert.message) setOpen(true);
        else setOpen(false);
    }, [alert])
  return (
    <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" onClose={setOpen}>
            <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            >
                <div className='fixed bottom-6 w-full opacity-100 transition-opacity z-[9999]'>
                    {alert && alert.type=='error' && <Error alert={alert} />}
                    {alert && alert.type=='success' && <Success alert={alert} />}
                    {alert && alert.type=='info' && <Info alert={alert} />}
                </div>
            </Transition.Child>

        </Dialog>
    </Transition.Root>

  )
}

const GenericAlert = ({title, bgColor, borderColor, titleColor, closeColor, message}) => {
    const {hide} = UseAlert();
    return (
        <div className='flex items-center justify-center w-full'>
            <div className={"pl-4 pr-2 py-3 rounded flex flex-row cursor-pointer select-none border" + bgColor + borderColor +  titleColor} role="alert" onClick={(e) => hide()}>
                {title && <strong className="font-bold mr-1">{title}</strong>}
                <span className={"block sm:inline mr-1"}>{message}</span>
                <span className="">
                    <XMarkIcon className={'w-6 h-6 font-medium ' + closeColor} />
                </span>
            </div>
        </div>
    )
}

const Error = ({alert}) => {
    return (
        <GenericAlert title={alert.title} message={alert.message} bgColor={' bg-red-100 '} borderColor={' border-red-400 '} titleColor={' text-red-700 '} closeColor={' text-red-500 '} />
    )
}

const Success = ({alert}) => {
    return (
        <GenericAlert title={alert.title} message={alert.message} bgColor={' bg-green-200 '} borderColor={' border-green-400 '} titleColor={' text-green-800 '} closeColor={' text-green-600 '} />
    )
}

const Info = ({alert}) => {
    return (
        <GenericAlert title={alert.title} message={alert.message} bgColor={' bg-blue-100 '} borderColor={' border-blue-400 '} titleColor={' text-blue-700 '} closeColor={' text-blue-500 '} />
    )
}

export default Alert