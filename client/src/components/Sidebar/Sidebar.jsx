import React from 'react';
import './Sidebar.scss';
import logo from '../../images/logo.png';

function Sidebar({ markers }) {
  return (
    <section className='sidebar'>
      <div className='sidebar-header'>
        <img src={logo} alt='travker-logo' className='sidebar-header--logo' />
      </div>
      <div className='sidebar-content'>
        {markers.length
          ? markers.map((marker) => {
              return (
                <div className='sidebar-content--item'>
                  <p className='sidebar-content--item--place'>
                    {' '}
                    {marker.place}{' '}
                  </p>
                  <p className='sidebar-content--item--date'> {marker.date} </p>
                </div>
              );
            })
          : null}
      </div>
      <div className='sidebar-logout'>Logout</div>
    </section>
  );
}

export default Sidebar;
