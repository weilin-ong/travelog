import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Homepage.scss';
import { ReactComponent as Logo } from '../../images/home-logo.svg';

function Homepage() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthed = localStorage.getItem('token');
    if (isAuthed) navigate('/map');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
