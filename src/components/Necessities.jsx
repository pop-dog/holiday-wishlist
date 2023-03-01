import React from 'react'
import PageHeader from './PageHeader'
import WishlistItems from './WishlistItems'
import AngelTree from './AngelTree'

const Necessities = () => {
  return (
    <div>
        <div className='flex flex-row'>
          <div className='flex flex-col'>
          <PageHeader text={'Necessities'} />
            <div className='p-4'>
              If you would like to commit to a gift please click on the Gift icon under the "Actions" column listed alongside the gift you would like to commit to. 
            </div>
          </div>
          <AngelTree />
        </div>
        <WishlistItems collection={'necessities'} singularName={'Necessity'} pluralName={'Necessities'} />
    </div>
  )
}

export default Necessities