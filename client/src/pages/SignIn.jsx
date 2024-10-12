import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';


export default function SignIn() {
  const [formData, setFormData] = useState({});
  //handle error
  // const [error, setError] = useState(null);
  //handle loading
  // const[loading, setLoading] = useState(false);
  const { loading, error } = useSelector((state) => state.user);
  //after initialization navigate
  const navigate = useNavigate();
  //use dispatch fuction
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       //before loading we setloading is true
    // setLoading(true);
    //replace this dispatch
    dispatch(signInStart());
    // const res = await fetch('/api/auth/signup', formData);
    //for security reason we write formData in string type
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    // change and convert the response we get json
    const data = await res.json();
    //after the request is finish we  want test if the data   we are getting error of success or false
    if(data.success === false){
      // setLoading(false);
      // setError(data.message);
      //use dispatch if error happen and remove starting 2 lines of code
      dispatch(signInFailure(data.message));
      return;
    }
    // setLoading(false);
    // setError(null);
    dispatch(signInSuccess(data));
    navigate('/');
    //console.log(data);
    } catch (error) {
      // setLoading(false);
      // setError(error.message);
      dispatch(signInFailure(error.message));
    }
   
  };
  //console.log(formData);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email'onChange={handleChange}/>
        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password'onChange={handleChange}/>
        <button disabled = {loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'loading...' : 'Sign In'}
          </button>

      </form>
      <div className='flex gap-3 mt-5'>
        <p>Don't have an account?</p>
        <Link to={"/sign-up"}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {/* if there is any error they show an error for signup */}
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
// localhost:3000/api/auth/signin
