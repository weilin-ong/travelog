import { useCallback, useRef } from 'react';
import './Dashboard.scss';
import { useEffect, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import Map from '../../components/Map/Map';
import Sidebar from '../../components/Sidebar/Sidebar';

import { getPins } from '../../service/api-service';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';

// declare outside or use memo to avoid re-render
const libraries = ['places'];

function Dashboard() {
  const [markers, setMarkers] = useState([]);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const mapRef = useRef();

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const getUserPins = async (token) => {
      const userPins = await getPins(token);

      if (userPins.error) {
        toast(`${userPins.message}`);
        navigate('/');
      } else if (Array.isArray(userPins.pins)) {
        setMarkers(userPins.pins);
        setUser(userPins.username);
      }
    };

    getUserPins(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCnviIn1Z6zyJFI6lBxwlcztjnmChuRxQU',
    //for search places, we want places libraries
    libraries,
  });
  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <main className='main-container'>
      <Sidebar markers={markers} user={user} mapRef={mapRef} panTo={panTo} />
      <Map
        markers={markers}
        setMarkers={setMarkers}
        mapRef={mapRef}
        panTo={panTo}
      />
    </main>
  );
}

export default Dashboard;
