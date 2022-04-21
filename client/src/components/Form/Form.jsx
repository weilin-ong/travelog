import { useState } from 'react';
import './Form.scss';
import { ReactComponent as Pin } from '../../images/location.svg';
// import { ReactComponent as Pin2 } from '../../images/pin.svg';

function Form({ details, setMarkers, setShowForm }) {
  const [formData, setFormData] = useState({
    place: '',
    date: '',
    rating: '',
    comment: '',
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newMarker = {
      ...formData,
      place: details.place_name,
      place_id: details.place_id,
      lat: details.coords.lat,
      lng: details.coords.lng,
    };
    setMarkers((prev) => [...prev, newMarker]);
    event.target.reset();
    setShowForm(false);
  }

  function handleBackClick() {
    setShowForm(false);
  }

  return (
    <div className='form-container'>
      <div className='form-header'>
        <button className='back-btn' onClick={handleBackClick}>
          Back
        </button>
        <h2 className='form-header-title'>Add a Pin</h2>
        <Pin className='form-header-pin' />
      </div>
      <form className='form' onSubmit={handleSubmit}>
        <input
          type='text'
          name='place'
          value={details.place_name}
          onChange={handleChange}
          required={true}
          autoComplete='off'
        />
        <input
          type='date'
          name='date'
          onChange={handleChange}
          required={true}
        />
        <div>
          <label htmlFor='rating'>How was the experience?</label>
          <br />
          <br />
          <select
            id='rating'
            name='rating'
            onChange={handleChange}
            required={true}
          >
            <option value='-'>-- Rate 1 to 10 --</option>
            <option value='10'>10 Perfect</option>
            <option value='9'>9 Superb</option>
            <option value='8'>8 Great</option>
            <option value='7'>7 Good</option>
            <option value='6'>6 Not bad</option>
            <option value='5'>5 Average</option>
            <option value='4'>4 Urgh</option>
            <option value='3'>3 Poor</option>
            <option value='2'>2 Awful</option>
            <option value='1'>1 Blacklist</option>
          </select>
        </div>
        <input
          type='text'
          name='comment'
          placeholder='additional comment'
          onChange={handleChange}
          autoComplete='off'
        />
        <button className='form-add-btn'>
          Add <Pin className='add-pin' />
        </button>
      </form>
    </div>
  );
}

export default Form;
