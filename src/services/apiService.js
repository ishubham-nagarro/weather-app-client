import axios from 'axios';
import authHelper from '../utils/authHelper';

const API_BASE_URL = 'http://3.107.99.112:5000';
const API_GET_CITY_WEATHER = 'https://mf4haf6rg2.execute-api.ap-southeast-2.amazonaws.com/WeatherService'

const apiService = {
  register: (data) => {
    return axios.post(`${API_BASE_URL}/auth/register`, data);
  },

  login: (data) => {
    return axios.post(`${API_BASE_URL}/auth/login`, data).then((response) => response.data);
  },

  getAllUsers: async () => {
    const token = authHelper.getToken();
    return axios
      .get(`${API_BASE_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.data);
  },

  updateUser: (data) => {
    const token = authHelper.getToken();
    return axios.put(`${API_BASE_URL}/users/${data._id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  deleteUser: (id) => {
    const token = authHelper.getToken();
    return axios.delete(`${API_BASE_URL}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

//   getCoordinates: async (city) => {
//     return axios.get(`http://api.openweathermap.org/geo/1.0/direct`, {
//         params: {
//           q: city,
//           limit: 1,
//           appid: process.env.WEATHER_API_KEY,
//         },
//       })
//       .then((response) => {
//         if (response.data.length === 0) {
//           throw new Error('City not found');
//         }
//         const { lat, lon } = response.data[0];
//         return { lat, lon };
//       });
//   },


  getWeather: async (city) => {
    return axios.get(`${API_GET_CITY_WEATHER}?q=${city}`)
      .then((response) => response.data);
  },
};

export default apiService;
