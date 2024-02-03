import axios from 'axios';

const openWeatherAPI = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    appid: process.env.NEXT_PUBLIC_WEATHER_KEY,
  },
});

export const getWeatherData = async (cityName) => {
  try {
    const response = await openWeatherAPI.get('/forecast', {
      params: {
        q: cityName,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUvData = async (data) => {
  try {
    const response = await openWeatherAPI.get('/air_pollution', {
      params: {
        lat: data.lat,
        lon: data.lon,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}