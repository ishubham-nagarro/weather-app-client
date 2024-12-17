import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import { LoadingButton } from '@mui/lab';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName?.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email?.trim()) newErrors.email = 'Email is required';
    if (!formData.password?.trim()) newErrors.password = 'Password is required';
    return newErrors;
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      await apiService.register(formData);
      navigate('/login');
    } catch (error) {
      alert('Registration failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: 400,
        margin: '50px auto',
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" align="center" marginBottom={2}>
        Signup
      </Typography>
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          margin="normal"
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          error={Boolean(errors.fullName)}
          helperText={errors.fullName}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={Boolean(errors.password)}
          helperText={errors.password}
          required
        />
        {errors.form && (
          <Typography color="error" align="center" marginTop={1}>
            {errors.form}
          </Typography>
        )}
        <Box marginTop={2}>
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            loading={loading}
          >
            Signup
          </LoadingButton>
        </Box>
        <Typography align="center" marginTop={2}>
          Already have an account?{' '}
          <Button onClick={() => navigate('/login')} color="primary">
            Login
          </Button>
        </Typography>
      </form>
    </Box>
  );
}

export default Signup;