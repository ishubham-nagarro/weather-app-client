import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import apiService from '../services/apiService';

const UserDashboard = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('');

    useEffect(() => {
        fetchWeatherData('London');
    }, []);

    const fetchWeatherData = async (city) => {
        try {
            const data = await apiService.getWeather(city); // Fetch weather data
            setWeatherData(data);
        } catch (error) {
            alert(error.message || 'Failed to fetch weather data');
        }
    };

    const handleCityChange = (e) => setCity(e.target.value);

    const handleFetch = () => {
        if (city) fetchWeatherData(city);
    };

    return (
        <Container>
            <Typography variant="h4">User Dashboard</Typography>
            {/* <Typography variant="body1">Welcome, {user?.name}</Typography> */}

            <TextField
                label="City"
                value={city}
                onChange={handleCityChange}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleFetch}>
                Fetch Weather
            </Button>

            {weatherData && (
                <>
                    <Typography variant="body2">
                        Coordinates: 
                        <p>Latitude: {weatherData.coord.lat}, Longitude: {weatherData.coord.lon}</p>
                    </Typography>
                    <Typography variant="body2">
                        Temperature: {weatherData.main.temp}°F, Condition: {weatherData.weather[0].description}
                    </Typography>
                </>
            )}
        </Container>
    );
}

export default UserDashboard;