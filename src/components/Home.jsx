import { PencilSquareIcon } from '@heroicons/react/24/outline';
import React from 'react'
import { Link } from 'react-router-dom';
import PageHeader from './PageHeader';
import ShoppingList from './ShoppingList';

const Home = () => {

  return (
    <div className='flex justify-center'>
      <ShoppingList />
    </div>
  )
}

export default Home