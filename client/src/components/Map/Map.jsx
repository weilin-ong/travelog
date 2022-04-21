import { useState, useCallback, useRef, useMemo } from 'react';

import {
  GoogleMap,
  InfoWindow,
  Marker,
  MarkerClusterer,
} from '@react-google-maps/api';
import { dateFormat } from '../../utils';
import './Map.scss';


function Map({ setMarkers, markers }) {
  const [selected, setSelected] = useState(null);

  //hard coded KL
  //use Memo to avoid re-rendering
  const center = useMemo(
    () => ({
      lat: 3.119306,
      lng: 101.69351,
    }),
    []
  );
  //leave only zoom control option
  const options = useMemo(
    () => ({
      mapId: '6376db3b31a25079',
      disableDefaultUI: true,
      zoomControl: true,
      // clickableIcons: false,
    }),
    []
  );

  //use useRef to avoid re-render
  const mapRef = useRef();
  const handleMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);



  return (
    <section className='map'>


      <GoogleMap
        id='map'
        zoom={12}
        center={center}
        mapContainerClassName='map-container'
        options={options}
        onLoad={handleMapLoad}
      >

      </GoogleMap>
    </section>
  );
}

export default Map;
