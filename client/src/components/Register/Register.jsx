import React, { useState } from 'react';
import './Register.scss';
import { register } from '../api-service';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const initialState = {
  username: '',
  email: '',
  password: '',
};

function Register() {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await register(formData);
    if (res.error) {
      toast(`${res.message}`);
      setFormData(initialState);
    } else {
      const { token, username } = res;
      toast(`Lovely to see you here, ${username}!`);
      localStorage.setItem('token', token);
      navigate('/map');
    }
  }

  function validation() {
    return !formData.email || !formData.password || !formData.username;
  }

  return (
    <section className='register-container'>
      <h1 className='register-title'>new account</h1>
      <form className='register-form' onSubmit={handleSubmit}>
        <input
          type='email'
          name='email'
          placeholder='Email'
          autoFocus
          required
          onChange={handleChange}
          value={formData.email}
        />
        <input
          type='text'
          name='username'
          placeholder='Username'
          required
          onChange={handleChange}
          value={formData.username}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          autoComplete='off'
          required
          onChange={handleChange}
          value={formData.password}
        />
        <button className='register-form--btn' disabled={validation()}>
          register
        </button>
      </form>
      <p className='login-link'>
        Have an account with us? Login{' '}
        <Link style={{ textDecoration: 'underline' }} to='/login'>
          here
        </Link>
      </p>
    </section>
  );
}

export default Register;
