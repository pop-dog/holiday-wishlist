import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { useEffect } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
    const { user, logout, displayName, isAdmin } = UserAuth();
    const navigate = useNavigate();
    const [navigation, setNavigation] = useState([
      { name: 'My List', href: '/dashboard', current: true },
      { name: 'Presents', href: '/presents', current: false },
      { name: 'Necessities', href: '/necessities', current: false },
      { name: 'Trees', href: '/trees', current: false },
      { name: 'Dinners', href: '/dinners', current: false },
      { name: 'Commitments', href: '/commitments', protected:true }
    ]);
  
    const handleLogout = async (e) => {
      try {
        e.preventDefault();
        await logout();
        navigate('/signin');
      }
      catch (e) {

      }
    };
  return (
    <Disclosure as="nav" className="bg-red-900 drop-shadow-md">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 md:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="inset-y-0 left-0 flex items-center md:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                <div className="flex flex-shrink-0 items-center">
                <Link to="/dashboard">
                    <h1 className='text-yellow-200 text-lg font-[mali] hidden xs:block md:hidden lg:block'>CC's Angel Fund Holiday Wishlist</h1>
                </Link>

                </div>
                <div className="hidden md:ml-6 md:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      
                      (!item.protected || (isAdmin)) && 
                      <NavLink
                      key={item.name}
                      to={item.href}
                      className={(navData) => {
                        return classNames(
                          navData.isActive ? 'text-opacity-100' : 'text-opacity-70',
                          'px-3 py-2 rounded-md text-sm font-medium text-white hover:text-opacity-100'
                        );
                      }
                    }
                    >
                      {item.name}
                    </NavLink>
                    
                    ))}
                  </div>
                </div>
              </div>
              <div className="inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-red-900 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-800">
                      <span className="sr-only">Open user menu</span>
                      <span className='text-white mr-2'>{displayName}</span>
                      <ChevronDownIcon className="block h-5 w-5 text-white" aria-hidden="true" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white drop-shadow-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/account"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm black')}
                          >
                            Account
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-black w-full text-left')}
                            onClick={handleLogout}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={
                    (navData) => {
                      return classNames(
                        navData.isActive ? 'text-opacity-100' : 'text-opacity-70',
                        'block px-3 py-2 rounded-md text-base font-medium text-white'
                      );
                    }
                     
                  }
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}