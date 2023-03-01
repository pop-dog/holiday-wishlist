import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UseAlert } from '../context/AlertContext';
import { UserAuth } from '../context/AuthContext';
import { asNum } from '../helpers/display.helpers';
import commitmentService from '../services/commitment.service';
import Button from './Button';
import Grid from './Grid';
import PageHeader from './PageHeader';
import Tab from './Tab';
import Tabs from './Tabs';

const Commitments = () => {
  const [commitments, setCommitments] = useState([]);
  const [receivedCommitments, setReceivedCommitments] = useState([]);
  const [notReceivedCommitments, setNotReceivedCommitments] = useState([]);
  const {user,isAdmin} = UserAuth();
  const {showInfo, showSuccess} = UseAlert();
  const getCommitments = async() => {
    const data = await commitmentService.all();
    let c = data.docs.map((doc) => ({...doc.data(), id:doc.id, ref:doc.ref}));
    setCommitments(c);
    setReceivedCommitments(c.filter(comm => comm.received));
    setNotReceivedCommitments(c.filter(comm => !comm.received));
  }

  useEffect(() => {
    getCommitments();
  }, []);

  const navigate = useNavigate();

  const handleDelete = async (row) => {    
    if (window.confirm('Are you sure you want to delete this commitment?')) {
        await commitmentService.safeDelete(row);
        getCommitments();
        showInfo('Commitment removed.');
    }
  }

  const handleMarkReceived = async (e, row) => {
    e.target.disabled = true;
    await commitmentService.markReceived(row);
    getCommitments();
    showSuccess('Marked that this item has been received.', 'Got it!');
    e.target.disabled = false;
  }

  const handleMarkNotReceived = async (e, row) => {
    e.target.disabled = true;
    await commitmentService.markNotReceived(row);
    getCommitments();
    showSuccess('Marked that this item has not been received.', 'Moved!')
    e.target.disabled = false;
  }

  const notReceivedColumns = [
    {
      name: 'Edit',
      selector: row => <Link to={'/commitments/edit/' + row.id}><PencilSquareIcon className='w-5' /></Link>,
    },
    {
      name: 'Description',
      selector: row => row.description,
    },
    {
        name: "Committed by",
        selector: row => row.by
    },
    {
      name: "For",
      selector: row => row.for
    },
    {
      name: "Notes",
      selector: row => row.notes
    },
    {
        name: 'Details',
        selector: row => {
            return (
                <div className='flex flex-row'>
                    {(row.details && row.details.age && row.details.age > 0) &&
                        <div className='flex flex-row mr-2'>
                            <span className='mr-2'>Age:</span>
                            <span>{row.details.age}</span>
                        </div>
                    }
                    {row.details && row.details.gender &&
                        <div className='flex flex-row'>
                            <span className='mr-2'>Gender:</span>
                            <span>{row.details.gender}</span>
                        </div>
                    }
                    {row.details && row.details.quantity &&
                        <div className='flex flex-row'>
                            <span className='mr-2'>Quantity:</span>
                            <span>{row.details.quantity}</span>
                        </div>
                    }
                </div>
            )
        }
    },
    {
      name: 'Actions',
      selector: row =>
        <div className='flex flex-row'>
          <Button className={'bg-green-700 text-white border-green-800 hover:bg-green-800 mr-2'} onClick={(e) => {handleMarkReceived(e, row)}}>Received</Button>
          <Button className={'bg-red-700 border-red-800 text-white hover:bg-red-800'} onClick={(e) => {handleDelete(row)}}><TrashIcon className='w-5' /></Button>
        </div>
    }
  ];

  const receivedColumns = [
    {
      name: 'Edit',
      selector: row => <Link to={'/commitments/edit/' + row.id}><PencilSquareIcon className='w-5' /></Link>,
    },
    {
      name: 'Description',
      selector: row => row.description,
    },
    {
        name: "Committed by",
        selector: row => row.by
    },
    {
      name: "For",
      selector: row => row.for
    },
    {
      name: "Notes",
      selector: row => row.notes
    },
    {
        name: 'Details',
        selector: row => {
            return (
                <div className='flex flex-row space-x-2'>
                    {asNum(row.details.age) > 0 &&
                        <div className='flex flex-row mr-1'>
                            <span className='mr-2'>Age:</span>
                            <span>{row.details.age}</span>
                        </div>
                    }
                    {row.details && row.details.gender &&
                        <div className='flex flex-row'>
                            <span className='mr-1'>Gender:</span>
                            <span>{row.details.gender}</span>
                        </div>
                    }
                    {row.details && row.details.quantity &&
                        <div className='flex flex-row'>
                            <span className='mr-1'>Quantity:</span>
                            <span>{row.details.quantity}</span>
                        </div>
                    }
                </div>
            )
        }
    },
    {
      name: 'Actions',
      selector: row =>
        <div className='flex flex-row'>
          <Button className={'bg-green-700 text-white border-green-800 hover:bg-green-800 mr-2'} onClick={(e) => {handleMarkNotReceived(e, row)}}>Not Received</Button>
          <Button className={'bg-red-700 border-red-800 text-white hover:bg-red-800'} onClick={(e) => {handleDelete(row)}}><TrashIcon className='w-5' /></Button>
        </div>
    }
  ];


  return (
    <div>
        <PageHeader text={'Commitments'} />
        <div className="flex flex-col">
          {isAdmin && 
          
          <div className='flex flex-row'>
            <Button className={'bg-green-700 text-white border-green-800 hover:bg-green-800'} onClick={(e) => navigate('/commitments/new')}>Add Commitment</Button>
          </div>
          }
        </div>
        <Tabs defaultTab={'Not Received'}>
          <Tab label='Not Received'>
            <Grid 
              columns={ notReceivedColumns }
              data={notReceivedCommitments}
            />
          </Tab>
          <Tab label='Received'>
            <Grid 
                columns={ receivedColumns }
                data={receivedCommitments}
              />
          </Tab>
        </Tabs>
    </div>
  )
}

export default Commitments