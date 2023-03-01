import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UseAlert } from '../context/AlertContext';
import { UserAuth } from '../context/AuthContext';
import userService from '../services/user.service';
import Button from './Button';
import Form from './Form';
import angelTree from '../images/angel_tree.jpg';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [tempDisplayName, setTempDisplayName] = useState('');
    const [error, setError] = useState('');
    const {createUser,logout,setDisplayName,sendVerification} = UserAuth();
    const {showError,showSuccess} = UseAlert();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!tempDisplayName) {
            setError('Display name is required!')
            return;
        }
        if (!email) {
            setError('Email name is required!')
            return;
        }
        if (!password) {
            setError('Password is required!')
            return;
        }
        try {
            let cred = await createUser(email, password);
            await sendVerification(cred.user);
            await userService.addWithId({
                'username':cred.user.email,
                displayName:tempDisplayName,
                'isAdmin':false
            }, cred.user.uid);
            setDisplayName(tempDisplayName);
            showSuccess('User created!');
            navigate('/account');
        }
        catch (e) {
            console.log(e);
            setError(e.message);
        };
    };

    useEffect(() => {
        if (!error) return;
        if (error.indexOf('is required!') >= 0) showError(error);
        else if (error.indexOf('invalid-email') >= 0) showError('Invalid email address!');
        else if (error.indexOf('weak-password') >= 0) showError('Password does not meet requirements!');
        else if (error.indexOf('email-already-in-use') >= 0) showError('Email address is already in use!');
        else showError('Could not create user!');
    },[error])

  return (
    <div className='max-w-xl mx-auto my-16 p-4'>
        <div>
            <h1 className='text-3xl text-center font-[mali] italic text-red-800'>CC's Angel Fund Holiday Wishlist</h1>
            <h1 className='text-2xl font-bold py-2'>Create an account</h1>
            <p className='py-2'>
                Already have an account? <Link className='font-[mali]' to='/signin'>Sign in</Link>
            </p>
        </div>
        <Form>
            <Form.Field label={'Display Name'}>
                <Form.Text name={'tempDisplayName'} friendlyName={'Display Name'} onChange={(e) => setTempDisplayName(e.target.value)} type='text' value={tempDisplayName} />
            </Form.Field>
            <Form.Field label={'Email Address'}>
                <Form.Text name={'email'} friendlyName={'Email Address'} onChange={(e) => setEmail(e.target.value)} type='email' value={email} />
            </Form.Field>
            <Form.Field label={'Password'}>
                <Form.Text name={'password'} friendlyName={'Password'} onChange={(e) => setPassword(e.target.value)} type='password' value={password} />
            </Form.Field>
            <Form.Buttons>
                <Button className={'border border-red-900 bg-red-800 hover:bg-red-900 w-full p-4 m-2 text-white'} onClick={handleSubmit}>Create Account</Button>
            </Form.Buttons>
        </Form>
        <div className='flex flex-row justify-center'>
            <img src={angelTree} className={'w-80'} />
        </div>
    </div>
  )
}

export default Signup