import React from 'react'
import WishlistItem from './WishlistItem'

const Dinner = ({id}) => {
  return (
    <WishlistItem id={id} collection={'dinners'} addMessage={'Dinner request added succesffully!'} editMessage={'Changes saved to dinner!'} />
  )
}

export default Dinner