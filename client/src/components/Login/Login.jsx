import { useState } from 'react';
import './Login.scss'

function Login() {
  const [formData, setFormData] = useState({
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
    <section className='login-container'>
      <h1 className='login-title'> welcome back</h1>
      <form className='login-form' onSubmit={handleSubmit}>
        <input
          type='email'
          onChange={handleChange}
          value={formData.email}
          name='email'
          placeholder='Email'
          autoFocus
          required
        />
        <input
          type='password'
          onChange={handleChange}
          value={formData.password}
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
