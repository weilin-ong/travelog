import { useState, useCallback, useRef, useMemo } from 'react';

import {
  GoogleMap,
  InfoWindow,
  Marker,
  MarkerClusterer,
} from '@react-google-maps/api';
import { dateFormat } from '../../utils';
import './Map.scss';
import Search from '../Search/Search';
import Locate from '../Locate/Locate';
import { deletePin } from '../../service/api-service';
import { toast } from 'react-toastify';

function Map({ setMarkers, markers }) {
  const [selected, setSelected] = useState(null);

  //move from search
  const [showForm, setShowForm] = useState(false);
  const [details, setDetails] = useState(null);

  const [edit, setEdit] = useState(false);

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

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  function handleEditClick(e) {
    setEdit(true);
    if (selected) setDetails(selected);
    setShowForm(true);
    setSelected(null);
  }

  async function handleDeletedClick(e) {
    const token = localStorage.getItem('token');
    const deletedPin = await deletePin(token, selected);

    if (deletedPin.error) {
      toast(deletedPin.message);
    } else {
      setMarkers((prevMarkers) => {
        return prevMarkers.filter((marker) => {
          return marker.place_id !== deletedPin.place_id;
        });
      });
    }

    setSelected(null);
  }

  return (
    <section className='map'>
      <Search
        showForm={showForm}
        setShowForm={setShowForm}
        panTo={panTo}
        setMarkers={setMarkers}
        setDetails={setDetails}
        details={details}
        setEdit={setEdit}
        edit={edit}
      />
      <Locate panTo={panTo} />

      <GoogleMap
        id='map'
        zoom={12}
        center={center}
        mapContainerClassName='map-container'
        options={options}
        onLoad={handleMapLoad}
      >
        {markers.length && (
          <MarkerClusterer clusterClass='cluster'>
            {(clusterer) =>
              markers.map((marker) => (
                <Marker
                  key={`${marker.lat}-${marker.lng}`}
                  position={{ lat: marker.lat, lng: marker.lng }}
                  clusterer={clusterer}
                  onClick={() => {
                    setSelected(marker);
                  }}
                />
              ))
            }
          </MarkerClusterer>
        )}
        {/* {when user click on pin} */}
        {/* https://github.com/JustFly1984/react-google-maps-api/issues/new */}
        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div className='info-window'>
              <span>You visited </span> <h2>{selected.place_name}</h2>
              <p>on {dateFormat(selected.date)}</p>
              {selected.images && (
                <div className='photos-container'>
                  {selected.images.map((image, index) => {
                    return (
                      <a
                        key={`${image}-${index}`}
                        href={image}
                        className='photos-container--link'
                      >
                        <div
                          className='photos-container--photo'
                          style={{ backgroundImage: `url(${image})` }}
                        ></div>
                      </a>
                    );
                  })}
                </div>
              )}
              <p>Your experience was rated as {selected.rating}</p>
              {selected?.comment && (
                <p> Additional comments: {selected.comment}</p>
              )}
              <div className='info-window-buttons'>
                <button
                  onClick={handleEditClick}
                  className='info-window-edit-btn'
                >
                  Edit
                </button>
                <button
                  onClick={handleDeletedClick}
                  className='info-window-delete-btn'
                >
                  Delete
                </button>
              </div>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </section>
  );
}

export default Map;
