import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import authHelper from '../utils/authHelper';
import apiService from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';

const Login = ({setToken, setRole}) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
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
      const response = await apiService.login(formData);
      authHelper.setToken(response.token);
      setToken(response.token);
      const { role } = authHelper.getUser();
      setRole(role);

      if (role === 'Admin' || role === 'SuperAdmin') {
        navigate('/admin-dashboard');
      } else if (role === 'User'){
        navigate('/user-dashboard');
      }
    } catch (error) {
      setErrors({ form: 'Invalid email or password. Please try again.' });
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
        Login
      </Typography>
      <form onSubmit={handleSubmit} noValidate>
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
            Login
          </LoadingButton>
        </Box>
        <Typography align="center" marginTop={2}>
          Don’t have an account?{' '}
          <Button onClick={() => navigate('/signup')} color="primary">
            Signup
          </Button>
        </Typography>
      </form>
    </Box>
  );
}

export default Login;