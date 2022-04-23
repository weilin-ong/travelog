import React from 'react';

function Register() {
  return (
    <section className='register-container'>
      <form className='register-form'>
        <input
          type='email'
          className='register-form--email'
          name='email'
          placeholder='Email'
          autoFocus
          required
        />
        <input
          type='password'
          className='register-form--password'
          name='password'
          placeholder='Password'
          autoComplete='off'
          required
        />
        <input
          type='password'
          className='register-form--confirmed'
          name='confirmed'
          placeholder='Confirmed password'
          autoComplete='off'
          required
        />
        <input type='text' name='username' placeholder='Username' required />
        <button className='register-form--btn'>register</button>
      </form>
    </section>
  );
}

export default Register;
