import React, { useState } from 'react';
import { useEffect } from 'react';
import GoogleButton from 'react-google-button';
import { Link, useNavigate } from 'react-router-dom';
import { UseAlert } from '../context/AlertContext';
import { UserAuth } from '../context/AuthContext';
import userService from '../services/user.service';
import Button from './Button';
import Form from './Form';

const ResetPassword = () => {
    
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { triggerResetEmail } = UserAuth();
    const { showError, showSuccess, showInfo } = UseAlert();

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.target.disabled = true;
        setError('');
        try {
            await triggerResetEmail(email);
            showSuccess('Password reset email sent!');
            navigate('/signin');
        }
        catch (e) {
            setError(e.message);
        }
        e.target.disabled = false;
    }

    useEffect(() => {
        if (error) {
            if (error.indexOf('auth') >= 0) {
                showError('Invalid email/password.', 'Login failed!');
            } else showError('There was an error.', 'Login failed!');
        }
    }, [error]);

    return (
        <div className='max-w-xl mx-auto my-16 p-4'>
            <div>
                <h1 className='text-4xl text-center font-[mali] italic text-red-800'>Holidy Wishlist</h1>
                <h1 className='text-2xl font-bold py-2'>Reset Password</h1>
                <p className='py-2'>
                    Already have an account? <Link className='font-[mali]' to='/signin'>Sign in</Link>
                </p>
            </div>
            <Form>
                <Form.Field label={'Email Address'}>
                    <Form.Text name={'email'} friendlyName={'Email Address'} onChange={(e) => setEmail(e.target.value)} type='email' value={email} />
                </Form.Field>
                <Form.Buttons>
                    <Button className={'border border-red-900 bg-red-800 hover:bg-red-900 w-full p-4 m-2 text-white'} onClick={handleSubmit}>Send</Button>
                </Form.Buttons>
            </Form>
        </div>
      )
}

export default ResetPassword