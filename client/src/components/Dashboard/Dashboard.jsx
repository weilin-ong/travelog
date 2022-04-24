import './Dashboard.scss';
import { useEffect, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import Map from '../Map/Map';
import Sidebar from '../Sidebar/Sidebar';

import { getPins } from '../api-service';

//declare outside to avoid re-render
const libraries = ['places'];

function Dashboard() {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    getPins(token).then((pins) => setMarkers(pins));
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    //for search places, we want places libraries
    libraries,
  });
  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <main className='main-container'>
      <Sidebar markers={markers} />
      <Map markers={markers} setMarkers={setMarkers} />
    </main>
  );
}

export default Dashboard;
