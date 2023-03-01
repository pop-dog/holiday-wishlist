import React from 'react'
import PageHeader from './PageHeader'
import Dinner from './Dinner'

const AddDinner = () => {
    return (
        <div>
            <PageHeader text={'Add a Dinner Request'} />
            <Dinner />
        </div>
    )
}

export default AddDinner