import React from 'react'
import { useParams } from 'react-router-dom'
import PageHeader from './PageHeader'
import Present from './Present'

const EditPresent = () => {
    const {id} = useParams();

    return (
        <div>
            <PageHeader text={'Edit a Present Request'} />
            <Present id={id} />
        </div>
    )
}

export default EditPresent