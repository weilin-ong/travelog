import React from 'react';
import './PageNotFound.scss';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div className='error-page'>
      <h1>Sorry, page not found 😔</h1>
      <p>
        Bring me back to{' '}
        <Link style={{ textDecoration: 'underline' }} to='/'>
          Homepage
        </Link>
        .
      </p>
    </div>
  );
}

export default PageNotFound;
