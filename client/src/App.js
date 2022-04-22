import './App.scss';
import { useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import Map from './components/Map/Map';
import Sidebar from './components/Sidebar/Sidebar';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

//declare outside to avoid re-render
const libraries = ['places'];

function App() {
  const [markers, setMarkers] = useState([]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    //for search places, we want places libraries
    libraries,
  });
  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <main className='main-container'>
            <Sidebar markers={markers} />
            <Map markers={markers} setMarkers={setMarkers} />
          </main>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
