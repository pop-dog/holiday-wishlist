import React from 'react'
import AngelTree from './AngelTree'
import PageHeader from './PageHeader'
import WishlistItems from './WishlistItems'

const Trees = () => {
  return (
    <div>
      <div className='flex flex-row'>
        <div className='flex flex-col'>
          <PageHeader text={'Christmas Trees'} />
          <div className='p-4'>
            If you would like to commit to a gift please click on the Gift icon under the "Actions" column listed alongside the gift you would like to commit to. 
          </div>
        </div>
        <AngelTree />
      </div>
      <WishlistItems collection={'trees'} singularName={'Tree or Accessory'} pluralName={'Trees or Accessories'} />
    </div>
  )
}

export default Trees