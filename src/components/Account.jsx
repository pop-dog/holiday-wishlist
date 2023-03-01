import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UseAlert } from '../context/AlertContext';
import { UserAuth } from '../context/AuthContext';
import userService from '../services/user.service';
import Button from './Button';
import Form from './Form';

const Account = () => {

  const { user, logout, displayName, setDisplayName, username, isAdmin } = UserAuth();
  const { showSuccess, showError } = UseAlert();
  const [ tempDisplayName, setTempDisplayName ] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setTempDisplayName(displayName);
  }, [displayName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.disabled = true;
    let errorMessage = await userService.updateDisplayName(user.uid, tempDisplayName);
    if (errorMessage) showError(errorMessage, 'Could not update display name!');
    else showSuccess('Display name updated!');
    e.target.disabled = null;
    setDisplayName(tempDisplayName);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    }
    catch (e) {

    }
  };

  return (
    <div>
        <h1 className='text-2xl font-bold py-4'>Account</h1>
        {isAdmin && <span className='bg-gray-600 rounded text-white font-bold p-2 inline-block mb-2'>Admin</span>}
        <Form>
          <Form.Field label={'User Email'}>
            <Form.Text readOnly={true} value={username} friendlyName={'User Email'} name={'username'} />
          </Form.Field>
          <Form.Field label={'Display Name'}>
            <Form.Text value={tempDisplayName} onChange={(e) => {setTempDisplayName(e.target.value)}} friendlyName={'Display Name'} name={'tempDisplayName'} />
          </Form.Field>
          <Form.Buttons>
            <Button className={'bg-green-700 border-green-800 hover:bg-green-800 text-white'} onClick={handleSubmit}>Update</Button>
            <Button className={'bg-white border-gray-600 hover:bg-gray-100 text-gray-900'} onClick={handleLogout}>Logout</Button>
          </Form.Buttons>
        </Form>
    </div>
  )
}

export default Account