import { useState } from 'react';

function Login() {
  return (
    <section className='login-container'>
      <form className='login-form'>
        <input
          type='email'
          className='login-form--email'
          name='email'
          placeholder='Email'
          autoFocus
          required
        />
        <input
          type='password'
          className='login-form--password'
          name='password'
          placeholder='Password'
          autoComplete='off'
          required
        />
        <button className='login-form--btn'>login</button>
      </form>
    </section>
  );
}

export default Login;
