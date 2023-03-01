import React from 'react'
import PageHeader from './PageHeader'
import WishlistItem from './WishlistItem'

const Tree = ({id}) => {
  return (
    <WishlistItem id={id} collection={'trees'} addMessage={'Tree or accessory added succesffully!'} editMessage={'Changes saved to tree or accessory!'} />
  )
}

export default Tree