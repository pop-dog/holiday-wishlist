import React from 'react'
import PageHeader from './PageHeader'
import WishlistItem from './WishlistItem'

const Necessity = ({id}) => {
  return (
    <WishlistItem id={id} collection={'necessities'} addMessage={'Necessity added succesffully!'} editMessage={'Changes saved to necessity!'} />
  )
}

export default Necessity