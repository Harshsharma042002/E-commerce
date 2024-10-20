import React, { useState } from 'react';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import { Alert, Button, Snackbar, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'; 

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "", 
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [loggedIn, setLoggedIn] = useState(false); 
  const navigate = useNavigate();

  const eventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signUpHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      setLoading(true);
      const response = await axios.post(
        'http://localhost:8000/users/login',
        input,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        }
      );
      if (response.data.success) {
        Cookies.set('token', response.data.token); 
        setLoggedIn(true); 
        navigate('/'); 
        setInput({
          email: "",
          password: "", 
        });
        setMessage('Login successful!');
        setSeverity('success');
      } else {
        setMessage(response.data.message || 'Login failed!');
        setSeverity('error');
      }
    } catch (error) {
      console.log(error);
      setMessage('An error occurred');
      setSeverity('error');
    } finally {
      setLoading(false);
      setOpen(true);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:8000/users/logout', {}, { withCredentials: true });
      if (response.data.success) {
        Cookies.remove('token'); 
        setLoggedIn(false); 
        setMessage('Logout successful!');
        setSeverity('success');
      } else {
        setMessage(response.data.message || 'Logout failed!');
        setSeverity('error');
      }
    } catch (error) {
      console.log(error);
      setMessage('An error occurred during logout');
      setSeverity('error');
    } finally {
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <form onSubmit={signUpHandler} className='shadow-lg flex flex-col gap-5 p-8 w-full max-w-md mx-4 md:mx-0 md:max-w-lg bg-white rounded-lg'>
        <div className='my-5'>
          <div className='flex flex-row gap-2 justify-center items-center'>
            <h1 className='text-2xl md:text-3xl font-bold'>Welcome Back</h1>
            <WavingHandIcon fontSize="large" />
          </div>
          <p className='text-center font-medium mt-3 text-sm md:text-base'>
            Log in now to explore and order from our full range of available products!
          </p>
        </div>

        <div>
          <span className='font-medium text-sm md:text-base flex items-start'>Email:</span>
          <TextField
            type='email'
            name='email'
            variant='outlined'
            value={input.email}
            onChange={eventHandler}
            fullWidth
            required
            sx={{ mb: 2, mt: 1 }}
          />
        </div>
        
        <div>
          <span className='font-medium text-sm md:text-base flex items-start'>Password:</span>
          <TextField
            type='password'
            name='password'
            variant='outlined'
            value={input.password}
            onChange={eventHandler}
            fullWidth
            required
            sx={{ mb: 2, mt: 1 }}
          />
        </div>

        {loggedIn ? ( 
          <Button variant='contained' onClick={handleLogout} fullWidth>
            Log Out
          </Button>
        ) : (
          <Button variant='contained' type='submit' fullWidth disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </Button>
        )}

        <span className='text-center text-sm md:text-base'>
          Don't have an account?
          <Link to='/signup' className='text-blue-600 ml-2'>
            Sign Up
          </Link>
        </span>
      </form>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        action={
          <Button color='inherit' onClick={handleClose}>Close</Button>
        }
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Login;
