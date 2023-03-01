import React from 'react'
import { useParams } from 'react-router-dom'
import Dinner from './Dinner'
import PageHeader from './PageHeader'

const EditDinner = () => {
    const {id} = useParams();

    return (
        <div>
            <PageHeader text={'Edit a Dinner Request'} />
            <Dinner id={id} />
        </div>
    )
}

export default EditDinner