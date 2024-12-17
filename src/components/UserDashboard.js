import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box, CircularProgress } from '@mui/material';
import apiService from '../services/apiService';
import authHelper from '../utils/authHelper';

const UserDashboard = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('London'); // Default City
    const user = authHelper.getUser();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchWeatherData(city);
    });

    const fetchWeatherData = async (city) => {
        setLoading(true);
        try {
            const data = await apiService.getWeather(city); // Fetch weather data
            setWeatherData(data);
        } catch (error) {
            setWeatherData(null)
        } finally {
            setLoading(false);
        }
    };

    const handleCityChange = (e) => setCity(e.target.value);

    const handleFetch = () => {
        if (city) fetchWeatherData(city);
    };

    return (
        <Container sx={{ paddingTop: '24px' }}>
            <Typography variant="h4" marginBottom="20px">Weather Forcast for {city}</Typography>
            <Typography variant="h6" >Welcome, {user?.name}</Typography>
            <TextField
                label="City"
                value={city}
                onChange={handleCityChange}
                fullWidth
                margin="normal"
            />
            <Button sx={{ marginTop: '16px' }} variant="contained" color="primary" onClick={handleFetch}>
                Fetch Weather
            </Button>

            {loading ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '20px',
                    }}
                >
                    <CircularProgress sx={{ height: '30px !important', width: '30px !important' }} />
                </Box>
            ) : weatherData ? (
                <div style={{ margin: '20px 0' }}>
                    <Typography variant="h6">
                        Coordinates:
                    </Typography>
                    <p>Latitude: {weatherData?.coord.lat}, Longitude: {weatherData?.coord.lon}</p>
                    <Typography variant="body1">
                        Temperature: {weatherData?.main.temp}°F, Condition: {weatherData?.weather[0].description}
                    </Typography>
                </div>) : <p>No Data Found</p>
            }
        </Container>
    );
}

export default UserDashboard;