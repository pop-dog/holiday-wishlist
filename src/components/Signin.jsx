import React, { useState } from 'react';
import { useEffect } from 'react';
import GoogleButton from 'react-google-button';
import { Link, useNavigate } from 'react-router-dom';
import { UseAlert } from '../context/AlertContext';
import { UserAuth } from '../context/AuthContext';
import userService from '../services/user.service';
import Button from './Button';
import Form from './Form';
import angelTree from '../images/angel_tree.jpg'

const Signin = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { signIn, googleSignIn, user, setDisplayName } = UserAuth();
    const { showError, showSuccess, showInfo } = UseAlert();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signIn(email, password);
            navigate('/');
        }
        catch (e) {
            setError(e.message);
        }
    }

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            googleSignIn().then(async (cred) => {
                let newUser = await userService.addWithId({
                    'username':cred.user.email,
                    displayName: cred.user.displayName,
                    'isAdmin':false
                }, cred.user.uid);
                if (!newUser) navigate('/');
                else {
                    setDisplayName(cred.user.displayName);
                    navigate('/account');
                } 
            });
        }
        catch (e) {
            setError(e.message);
        }
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
                <h1 className='text-3xl text-center font-[mali] italic text-red-800'>CC's Angel Fund Holiday Wishlist</h1>
                <h1 className='text-2xl font-bold py-2'>Sign in</h1>
                <p className='py-2'>
                    Don't have an account yet? <Link className='font-[mali]' to='/signup'>Create an account</Link>
                </p>
            </div>
            <Form>
                <Form.Field label={'Email Address'}>
                    <Form.Text name={'email'} friendlyName={'Email Address'} onChange={(e) => setEmail(e.target.value)} type='email' value={email} />
                </Form.Field>
                <Form.Field label={'Password'}>
                    <Form.Text name={'password'} friendlyName={'Password'} onChange={(e) => setPassword(e.target.value)} type='password' value={password} />
                </Form.Field>
                <Form.Buttons>
                    <Button className={'border border-red-900 bg-red-800 hover:bg-red-900 w-full p-4 m-2 text-white'} onClick={handleSubmit}>Start Giving</Button>
                </Form.Buttons>
            </Form>
            <p className='py-2'>
                Forgot your password? <Link className='font-[mali]' to='/reset'>Reset password</Link>
            </p>
            <div className='flex my-4 justify-center'>
                <GoogleButton onClick={handleGoogleSignIn} />
            </div>
            <div className='flex flex-row justify-center'>
                <img src={angelTree} className={'w-80'} />
            </div>
        </div>
      )
}

export default Signin