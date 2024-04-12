import React from 'react'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';

export default function SignIn() {

const [formData,setFormData] = useState({});
const{loading,error:errorMessage} = useSelector((state)=>state.user);
// Inside the component, you use useSelector to extract the loading and errorMessage states from the Redux store's user slice.
const dispatch = useDispatch();
// When the form is submitted, handleSubmit function is called.
// It dispatches the signInStart action, setting loading to true in the Redux store.
// Then it makes a request to the server using fetch API to sign in the user.
// Depending on the response, it either dispatches signInSuccess with user data if successful or signInFailure with an error message if unsuccessful.
const navigate = useNavigate();

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }

    // Updating Redux State with Dispatch:

// Each signInStart, signInSuccess, and signInFailure action dispatched in handleSubmit updates the Redux store's user slice state through userReducer
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
  
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };





  return (
    <div className='min-h-screen mt-20'>
    <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
      {/* left */}
      <div className='flex-1'>
        <Link to='/' className='font-bold dark:text-white text-4xl'>
          <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
            Satyam's
          </span>
          TechBlogs
        </Link>
        <p className='text-sm mt-5'>
          This is a demo project. You can sign in with your email and password
          or with Google.
        </p>
      </div>
      {/* right */}

      <div className='flex-1'>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div>
            <Label value='Your email' />
            <TextInput
              type='email'
              placeholder='name@company.com'
              id='email'
              onChange={handleChange}
            />
          </div>
          <div>
            <Label value='Your password' />
            <TextInput
              type='password'
              placeholder='**********'
              id='password'
              onChange={handleChange}
            />
          </div>
          <Button
            gradientDuoTone='purpleToPink'
            type='submit'
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size='sm' />
                <span className='pl-3'>Loading...</span>
              </>
            ) : (
              'Sign In'
            )}
          </Button>
          <OAuth/>
        </form>
        <div className='flex gap-2 text-sm mt-5'>
          <span>Dont Have an account?</span>
          <Link to='/sign-up' className='text-blue-500'>
            Sign Up
          </Link>
        </div>
        {errorMessage && (
          <Alert className='mt-5' color='failure'>
            {errorMessage}
          </Alert>
        )}
      </div>
    </div>
  </div>
  )
}


// Yes, exactly! In the line useSelector((state) => state.user), state.user refers to the user slice of your Redux store.

// In your Redux store setup in store.js, you have defined the userReducer as the reducer for the user slice:
// So, when you use useSelector((state) => state.user) in your component, it accesses the user slice of your Redux store, which is managed by the userReducer defined in your userSlice. Any updates dispatched using dispatch within your userSlice will reflect in this user slice of the Redux store, and subsequently be accessible via useSelector in your component.


// Initial Setup:

// You've defined your Redux store using configureStore, where you've provided your reducers, including userReducer, which is created using createSlice.
// Component Rendering:

// When your SignIn component is rendered, it executes the functional component code.
// State Extraction using useSelector:

// Inside the component, you use useSelector to extract the loading and errorMessage states from the Redux store's user slice.
// Handling Form Input:

// As the user interacts with the form inputs, handleChange function is triggered, updating the local component state formData.
// Form Submission:

// When the form is submitted, handleSubmit function is called.
// It dispatches the signInStart action, setting loading to true in the Redux store.
// Then it makes a request to the server using fetch API to sign in the user.
// Depending on the response, it either dispatches signInSuccess with user data if successful or signInFailure with an error message if unsuccessful.
// Updating Redux State with Dispatch:

// Each signInStart, signInSuccess, and signInFailure action dispatched in handleSubmit updates the Redux store's user slice state through userReducer.
// Re-rendering Component with Updated State:

// As the Redux store state changes, useSelector re-runs, extracting the updated loading and errorMessage values from the store.
// This triggers a re-render of the component with the updated state values.
// Displaying Loading State and Error Message:

// The component conditionally renders a loading spinner and disables the submit button based on the loading state.
// If there's an errorMessage, it displays an Alert component with the error message.
// Navigation:

// Upon successful sign-in (res.ok), it navigates the user to the home page ('/') using useNavigate from react-router-dom.
// This workflow ensures that your Redux state is managed centrally, and your components can access and update the state seamlessly using useSelector and dispatch.