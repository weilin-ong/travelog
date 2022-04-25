import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.scss';
import { ReactComponent as Logo } from '../../images/home-logo.svg';

function Homepage() {
  return (
    <section className='home-container'>
      <Logo className='home-logo' />
      <div className='homeBtn-container'>
        <Link to='/login'>
          <button className='login home-container--btn'> login </button>
        </Link>

        <Link to='/register'>
          <button className='register home-container--btn'>register </button>
        </Link>
      </div>
    </section>
  );
}

export default Homepage;
