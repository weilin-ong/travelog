import { useState } from 'react';
import './Form.scss';
import { ReactComponent as Pin } from '../../images/location.svg';
import { storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { addPin, editPin } from '../../service/api-service';
import { toast } from 'react-toastify';

function Form({ details, setMarkers, setShowForm, setDetails, setEdit, edit }) {
  const [formData, setFormData] = useState({
    place_name: details.place_name ? details.place_name : '',
    date: details.date ? details.date : '',
    rating: details.rating ? details.rating : '',
    comment: details.comment ? details.comment : '',
    images: details.images ? details.images : '',
  });

  // helper func for upload image
  async function storeImage(image, index) {
    return new Promise((resolve, reject) => {
      //create unique id to each image

      const metadata = {
        contentType: 'image/jpeg',
      };
      const fileName = `${image.name}-${uuidv4()}`;

      // Upload file and metadata to the object 'images/xxx.jpg'
      const storageRef = ref(storage, 'images/' + fileName);
      const uploadTask = uploadBytesResumable(storageRef, image, metadata);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          if (progress === 100) toast(`Uploaded photo ${index + 1}`);
          console.log('Upload is ' + progress + '% done');
          // eslint-disable-next-line default-case
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          reject(error);
          toast('Upload is unsuccessful');
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  }

  function handleChange(event) {
    const { name, value, files } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    if (files) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        images: files,
      }));
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const { images } = formData;

    if (images && images?.length > 4)
      return toast('Please upload not more than 4 photos.');

    if (images && images[0]?.name)
      toast("Photo upload might take awhile, don't close the window.");

    const imgURLs =
      images && images[0]?.name
        ? await Promise.all(
            [...images].map((image, index) => storeImage(image, index))
          ).catch((error) => console.log(error))
        : null;

    const newMarker = {
      ...formData,
      images: imgURLs,
      place_name: details.place_name,
      place_id: details.place_id,
      lat: details.lat,
      lng: details.lng,
    };

    const token = localStorage.getItem('token');

    //if edit state is false
    if (!edit) {
      const newPin = await addPin(token, newMarker);

      if (newPin.error) {
        toast(newPin.message);
      } else {
        setMarkers((prev) => {
          const filteredPins = prev.filter(
            (pin) => pin.place_id !== newPin.place_id
          );
          return [...filteredPins, newPin];
        });
      }
    } else {
      setEdit(false);
      const editedPin = await editPin(token, newMarker);
      if (editPin.error) {
        toast(editPin.message);
      } else {
        setMarkers((prev) => {
          const filteredPins = prev.filter(
            (pin) => pin.place_id !== editedPin.place_id
          );
          return [...filteredPins, editedPin];
        });
      }
    }

    event.target.reset();
    setShowForm(false);
    setDetails(null);
  }

  function handleBackClick() {
    setShowForm(false);
    setDetails(null);
    setEdit(false);
  }

  function handlePhotoDelete(e) {
    e.preventDefault();
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: null,
    }));
    toast('Photos deleted successfully, click ADD to finish the edit.');
  }

  return (
    <div className='form-container'>
      <div className='form-header'>
        <button className='back-btn' onClick={handleBackClick}>
          Back
        </button>
        <h2 className='form-header-title'> {edit ? 'Edit' : 'Add'} a Pin</h2>
        <Pin className='form-header-pin' />
      </div>
      <form className='form' onSubmit={handleSubmit}>
        <input
          type='text'
          name='place_name'
          value={details.place_name}
          readOnly={true}
          required={true}
          autoComplete='off'
        />
        <input
          type='date'
          name='date'
          onChange={handleChange}
          value={formData.date}
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
            value={formData.rating}
          >
            <option value='' disabled hidden>
              Rate 1 to 10
            </option>
            <option value='10'>10 Perfect</option>
            <option value='9'>9 Superb</option>
            <option value='8'>8 Great</option>
            <option value='7'>7 Good</option>
            <option value='6'>6 Not bad</option>
            <option value='5'>5 Average</option>
            <option value='4'>4 Meh</option>
            <option value='3'>3 Poor</option>
            <option value='2'>2 Awful</option>
            <option value='1'>1 Blacklist</option>
          </select>
        </div>
        <input
          type='text'
          name='comment'
          placeholder='additional comment (max. 50)'
          onChange={handleChange}
          autoComplete='off'
          value={formData.comment}
          maxLength='50'
        />
        <div>
          <label htmlFor='images'>
            upload your travel photos
            <span className='upload-max'> (max. 4)</span>
          </label>

          {edit && details.images?.length > 0 && formData.images ? (
            <>
              <button onClick={handlePhotoDelete} className='delete-photos'>
                Delete previous photos
              </button>
              <p className='upload-message'>
                *Skip the upload if you wish to keep the previous photos.
                Otherwise, upload again with a new set of photos.
              </p>
            </>
          ) : null}
          <input
            type='file'
            name='images'
            id='images'
            onChange={handleChange}
            accept='image/*'
            multiple
            className='form-upload'
          />
        </div>
        <button className='form-add-btn'>
          Add <Pin className='add-pin' />
        </button>
      </form>
    </div>
  );
}

export default Form;
