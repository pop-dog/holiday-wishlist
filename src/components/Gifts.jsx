import { GiftIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import commitmentService from '../services/commitment.service';
import presentService from '../services/present.service';
import Button from './Button';
import Grid from './Grid';
import PageHeader from './PageHeader';

const displayGender = (g) => {
  switch (g) {
    case 'boy': return 'Boy';
    case 'girl': return 'Girl';
    default: return '';
  }
}

const displayAge = (a) => {
  let age = parseInt(a);
  if (isNaN(age) || age === 0) return '';
  else return age + (age === 1 ? ' year' : ' years') + ' old';
}

const Gifts = () => {
  const [presents, setPresents] = useState([]);
  const {user,displayName,username} = UserAuth();
  const getPresents = async() => {
    const data = await presentService.getAllPresents();
    setPresents(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
  }

  useEffect(() => {
    getPresents();
  }, []);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this present?')) {
      await presentService.deletePresent(id);
      let commitments = await commitmentService.getAllCommitments(where('gift','==','/presents/' + id));
      commitments.docs.forEach(doc => {
        commitmentService.deleteCommitment(doc.id);
      });
      getPresents();
    }
  }

  const handleCommit = async (id, description) => {
    await presentService.updatePresent(id, {commitment: displayName + ' <' + user.username + '>'});
    await commitmentService.addCommitment({user: user.uid, description, gift: '/presents/' + id});
    getPresents();
  }

  const columns = [
    {
      name: 'Gender',
      selector: row => displayGender(row.gender),
    },
    {
        name: 'Age',
        selector: row => displayAge(row.age),
    },
    {
      name: 'Description',
      selector: row => row.description,
    },
    {
      name: 'Commited By',
      selector: row => row.commitment,
    },
    {
      name: 'Notes',
      selector: row => row.notes,
    },
    {
      name: 'Actions',
      selector: row =>
        <div className='flex flex-row [&>*]:mr-2'>
          {!row.commitment && <Button className={'bg-blue-600 border-blue-700 text-white hover:bg-blue-700'} onClick={(e) => {handleCommit(row.id, row.description)}}>Commit</Button>}
          {user && user.isAdmin && <Button className={'bg-red-700 border-red-800 text-white hover:bg-red-800'} onClick={(e) => {handleDelete(row.id)}}><TrashIcon className='w-5' /></Button>}
        </div>
    }
  ];
  if (user && user.isAdmin) {
    columns.unshift({
      name: 'Edit',
      selector: row => <Link to={'/presents/edit/' + row.id}><PencilSquareIcon className='w-5' /></Link>,
    });
  }


  return (
    <div>
        <PageHeader text={'Presents'} />
        <div className="flex flex-col">
          {user && user.isAdmin && 
          
          <div className='flex flex-row'>
            <Button className={'bg-green-600 text-white border-green-700 hover:bg-green-700'} onClick={(e) => navigate('/presents/new')}>Add Present</Button>
          </div>
          }
          
          <Grid 
            columns={ columns }
            data={presents}
          />
        </div>
    </div>
  )
}

export default Gifts