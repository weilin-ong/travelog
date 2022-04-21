import './App.scss';
import { useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import Map from './components/Map/Map';
import Sidebar from './components/Sidebar/Sidebar';

//declare outside to avoid re-render
const libraries = ['places'];

function App() {

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    //for search places, we want places libraries
    libraries,
  });
  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <main className='main-container'>
      <Sidebar  />
      <Map  />
    </main>
  );
}

export default App;
