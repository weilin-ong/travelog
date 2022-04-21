import './Locate.scss';
import { showError } from '../../utils';
import compass from '../../images/compass.png';

function Locate({ panTo }) {
  function getLocation() {
    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition(getPosition, showError);
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  function getPosition(position) {
    panTo({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  }

  return (
    <button className='locate' onClick={getLocation}>
      <img src={compass} alt='locate-me' className='locate-compass' />
      <p className='locate-text'>Locate me!</p>
    </button>
  );
}

export default Locate;
