import './Dashboard.scss';
import { useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import Map from '../Map/Map';
import Sidebar from '../Sidebar/Sidebar';

//declare outside to avoid re-render
const libraries = ['places'];

function Dashboard() {
  const [markers, setMarkers] = useState([]);

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
