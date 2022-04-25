import './Dashboard.scss';
import { useEffect, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import Map from '../Map/Map';
import Sidebar from '../Sidebar/Sidebar';

import { getPins } from '../api-service';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';

//declare outside to avoid re-render
const libraries = ['places'];

function Dashboard() {
  const [markers, setMarkers] = useState([]);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

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
  }, [navigate]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    //for search places, we want places libraries
    libraries,
  });
  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <main className='main-container'>
      <Sidebar markers={markers} user={user} />
      <Map markers={markers} setMarkers={setMarkers} />
    </main>
  );
}

export default Dashboard;
