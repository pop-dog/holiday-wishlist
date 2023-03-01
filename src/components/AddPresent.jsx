import React from 'react'
import PageHeader from './PageHeader'
import Present from './Present'

const AddPresent = () => {
    return (
        <div>
            <PageHeader text={'Add a Present Request'} />
            <Present />
        </div>
    )
}

export default AddPresent