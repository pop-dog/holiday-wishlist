import React from 'react'
import { useParams } from 'react-router-dom'
import PageHeader from './PageHeader'
import Tree from './Tree'

const EditTree = () => {
    const {id} = useParams();

    return (
        <div>
            <PageHeader text={'Edit a Tree Request'} />
            <Tree id={id} />
        </div>
    )
}

export default EditTree