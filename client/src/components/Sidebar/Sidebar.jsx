import React from 'react';
import './Sidebar.scss';
import { ReactComponent as Logo } from '../../images/logo.svg';
import { logout } from '../../service/api-service';
import { useNavigate } from 'react-router-dom';

function Sidebar({ markers, user }) {
  const navigate = useNavigate();

  function removeToken() {
    logout('token');
    navigate('/');
  }

  return (
    <section className='sidebar'>
      <div className='sidebar-header'>
        <Logo className='sidebar-header--logo' />
        <h1 className='sidebar-header--title'>{user}<span style={{textTransform:'lowercase'}} >'s</span> Travker</h1>
      </div>
      <div className='sidebar-content'>
        {markers.length
          ? markers.map((marker) => {
              return (
                <div key={marker.place_id} className='sidebar-content--item'>
                  <p className='sidebar-content--item--place'>
                    {marker.place_name}
                  </p>
                  <p className='sidebar-content--item--date'> {marker.date} </p>
                </div>
              );
            })
          : null}
      </div>
      <button className='sidebar-logout' onClick={removeToken}>
        Logout
      </button>
    </section>
  );
}

export default Sidebar;
