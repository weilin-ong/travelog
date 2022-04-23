import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.scss';

function Homepage() {
  return (
    <section className='home-container'>
      <Link to='/login'>
        <button className='login home-container--btn'> login </button>
      </Link>

      <Link to='/register'>
        <button className='register home-container--btn'>register </button>
      </Link>
    </section>
  );
}

export default Homepage;
