/* eslint-disable default-case */
export function dateFormat(date) {
  const locale = navigator.language;
  const options = { month: 'short', day: '2-digit', year: 'numeric' };
  date = Intl.DateTimeFormat(locale, options).format(new Date(date));
  return date;
}

export function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert('User denied the request for Geolocation.');
      break;
    case error.POSITION_UNAVAILABLE:
      alert('Location information is unavailable.');
      break;
    case error.TIMEOUT:
      alert('The request to get user location timed out.');
      break;
    case error.UNKNOWN_ERROR:
      alert('An unknown error occurred.');
      break;
  }
}
