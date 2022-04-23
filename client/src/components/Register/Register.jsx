import { useState } from 'react';
import './Register.scss'

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => {
      // console.log({
      //   ...prev,
      //   [name]: value,
      // });
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
  
  }

  return (
    <section className='register-container'>
      <h1>new account</h1>
      <form className='register-form' onSubmit={handleSubmit}>
        <input
          type='email'
          className='register-form--email'
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
          className='register-form--password'
          name='password'
          placeholder='Password'
          autoComplete='off'
          required
          onChange={handleChange}
          value={formData.password}
        />
        <button className='register-form--btn'>register</button>
      </form>
    </section>
  );
}

export default Register;
