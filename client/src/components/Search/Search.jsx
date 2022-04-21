import './Search.scss';
import { useState } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  getDetails,
} from 'use-places-autocomplete';

//input box styling
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from '@reach/combobox';
import '@reach/combobox/styles.css';



function Search({ panTo, setMarkers }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    //optional: pass in options
    requestOptions: {
      location: { lat: () => 3.119306, lng: () => 101.69351 },
      radius: 200 * 1000,
    },
  });

  const [details, setDetails] = useState(null);
  const [showForm, setShowForm] = useState(false);

  async function handleOnSelect(address) {
    //set value again and update state to selected add and set 2nd arg "should fetch data" to false
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const result = results[0];
      const { lat, lng } = await getLatLng(result);
      panTo({ lat, lng });
      const { place_id } = result;
      const details = await getDetails({ placeId: place_id });

      setDetails({ place_name: details.name, place_id, coords: { lat, lng } });
    } catch (error) {
      console.log(error);
    }
  }

  function handleClick(e) {
    setShowForm(true);
    setValue('', false);
  }

  const comboOptionsStyle = {
    padding: '1rem',
    'line-height': '2rem',
    'font-size': '1.6rem',
  };

  return (
    <div className='search'>
      <div className='search-bar'>
        <Combobox
          className='search-bar-container'
          onSelect={(address) => handleOnSelect(address)}
        >
          <ComboboxInput
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            disabled={!ready}
            placeholder='Search a place...'
          />
          <ComboboxPopover>
            <ComboboxList>
              {status === 'OK' &&
                data.map(({ place_id, description }) => (
                  <ComboboxOption
                    style={comboOptionsStyle}
                    key={place_id}
                    value={description}
                  />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
        {details && (
          <button className='add-btn' onClick={handleClick} disabled={showForm}>
            +
          </button>
        )}
      </div>

    </div>
  );
}

export default Search;
