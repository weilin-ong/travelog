import { useState, useCallback } from 'react';

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

const rating = {
  10: 'Perfect',
  9: 'Superb',
  8: 'Great',
  7: 'Good',
  6: 'Not bad',
  5: 'Average',
  4: 'Meh',
  3: 'Poor',
  2: 'Awful',
  1: 'Not coming again',
};

//reset to the center of the world
const center = {
  lat: 32.7502,
  lng: 10.7655,
};

const options = {
  mapId: '6376db3b31a25079', //map style
  disableDefaultUI: true,
  zoomControl: true,
  clickableIcons: false,
  restriction: {
    latLngBounds: { north: 85, south: -85, west: -180, east: 180 },
    strictBounds: true,
  },
};

function Map({ setMarkers, markers, mapRef, panTo }) {
  //log and check how many times it renders
  const [selected, setSelected] = useState(null);

  //move from search
  const [showForm, setShowForm] = useState(false);
  const [details, setDetails] = useState(null);

  const [edit, setEdit] = useState(false);

  //hard coded KL ===> move outside
  //use Memo returns a memoized value
  // const center = useMemo(
  //   () => ({
  //     lat: 3.119306,
  //     lng: 101.69351,
  //   }),
  //   []
  // );

  //leave only zoom control option ===> move outside if value not going to change
  // const options = useMemo(
  //   () => ({
  //     mapId: '6376db3b31a25079',
  //     disableDefaultUI: true,
  //     zoomControl: true,
  //     clickableIcons: false,
  //     restriction: {
  //       latLngBounds: { north: 85, south: -85, west: -180, east: 180 },
  //       strictBounds: true,
  //     },
  //   }),
  //   []
  // );

  // const mapRef2 = useRef();

  // const panTo = useCallback(({ lat, lng }) => {
  //   mapRef2.current.panTo({ lat, lng });
  //   mapRef2.current.setZoom(14);
  // }, []);

  const handleMapLoad = useCallback(
    (map) => {
      mapRef.current = map;
    },
    [mapRef]
  ); //dependency coming from props

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
        zoom={2}
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
              <h2>{selected.place_name}</h2>
              <p>{dateFormat(selected.date)}</p>
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
              <p>
                <span className='bold'>Experience: </span>{' '}
                {rating[selected.rating]}
              </p>
              {selected?.comment && (
                <p>
                  <span className='bold'>Additional comments: </span>
                  {selected.comment}
                </p>
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
