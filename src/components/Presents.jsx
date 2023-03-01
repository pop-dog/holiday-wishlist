import { GiftIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UseAlert } from '../context/AlertContext';
import { UserAuth } from '../context/AuthContext';
import dataService from '../services/data.service';
import presentService from '../services/present.service';
import AngelTree from './AngelTree';
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

const Presents = () => {
  const [presents, setPresents] = useState([]);
  const {user,isAdmin,displayName,username} = UserAuth();
  const {showError, showSuccess, showInfo} = UseAlert();
  const getPresents = async() => {
    const data = await presentService.all();
    setPresents(data.docs.map((doc) => ({...doc.data(), id:doc.id, ref:doc.ref})));
  }

  useEffect(() => {
    getPresents();
  }, []);

  const navigate = useNavigate();

  const handleDelete = async (row) => {
    if (window.confirm('Are you sure you want to delete this present?')) {
      try {
        if (row.commitment) await dataService.deleteRef(row.commitment);
        await presentService.delete(row.id);
        showInfo('Present was deleted!');
      }
      catch (ex) {
        showError('Could not delete present.', 'Oops!');
      }
      getPresents();
    }
  }

  const handleCommit = async (e,row) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to commit to this present?')) {
      e.target.disabled = true;
      try {
        await presentService.addCommitment(row.id, user, displayName, username, row.for);
        showSuccess('Your commitment has been saved.', 'Thank you!');
      }
      catch (ex) {
        showError('We could not save your commitment.', 'Oops!');
      }
  
      e.target.disabled = false;
      getPresents();
    }
  }

  const columns = [];
  if (isAdmin) {
    columns.push({
      name: 'Edit',
      selector: row => <Link to={'/presents/edit/' + row.id}><PencilSquareIcon className='w-5' /></Link>,
    });
  }
  columns.push({
    name: 'Gender',
    selector: row => displayGender(row.gender),
  });
  columns.push({
      name: 'Age',
      selector: row => displayAge(row.age),
  });
  columns.push({
    name: 'Description',
    selector: row => row.description,
  });
  columns.push({
    name: 'Commited By',
    selector: row => <div>{row.commitmentBy}</div>
  });
  if (isAdmin) {
    columns.push({
      name: 'For',
      selector: row => row.for,
    });
    columns.push({
      name: 'Notes',
      selector: row => row.notes,
    });
  }
  columns.push({
    name: 'Actions',
    selector: row =>
      <div className='flex flex-row [&>*]:mr-2'>
        {!row.commitment && <Button className={'bg-green-700 border-green-800 text-white hover:bg-green-800'} onClick={(e) => {handleCommit(e,row)}}><GiftIcon className='text-white w-6' /></Button>}
        {isAdmin && <Button className={'bg-red-700 border-red-800 text-white hover:bg-red-800'} onClick={(e) => {handleDelete(row)}}><TrashIcon className='w-5' /></Button>}
      </div>
  });


  return (
    <div>
      <div className='flex flex-row'>
        <div className='flex flex-col'>
          <PageHeader text={'Presents'} />
          <div className='p-4'>
            If you would like to commit to a gift please click on the Gift icon under the "Actions" column listed alongside the gift you would like to commit to. 
          </div>
        </div>
        <AngelTree />
      </div>
      <div className="flex flex-col">
        {isAdmin && 
        
        <div className='flex flex-row'>
          <Button className={'bg-green-700 text-white border-green-800 hover:bg-green-800'} onClick={(e) => navigate('/presents/new')}>Request a Present</Button>
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

export default Presents