import axios from 'axios';

export const getCoordinatesFromLocation = async (locationName) => {
  const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${locationName}`);
  const data = response.data[0];
  return { lat: parseFloat(data.lat), lng: parseFloat(data.lon) };
};
