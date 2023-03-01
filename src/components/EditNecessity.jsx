import React from 'react'
import { useParams } from 'react-router-dom'
import Necessity from './Necessity'
import PageHeader from './PageHeader'

const EditNecessity = () => {
    const {id} = useParams();

    return (
        <div>
            <PageHeader text={'Edit a Necessity Request'} />
            <Necessity id={id} />
        </div>
    )
}

export default EditNecessity