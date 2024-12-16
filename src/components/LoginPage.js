import React, { useState } from 'react';
import { TextField, Button, Container, Link } from '@mui/material';
import authHelper from '../utils/authHelper';
import apiService from '../services/apiService';
import { useNavigate } from 'react-router-dom';

const Login = ({setToken, setRole}) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await apiService.login(formData);
      authHelper.setToken(response.token);
      setToken(response.token);
      const { role } = authHelper.getUser();
      setRole(role);
      console.log(role, 'role')

      if (role === 'Admin' || role === 'SuperAdmin') {
        console.log('hellloo')
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (error) {
      alert('Login failed!');
    }
  };

  return (
    <Container maxWidth="sm">
      <h2>Login</h2>
      <TextField label="Email" name="email" fullWidth margin="normal" onChange={handleChange} />
      <TextField label="Password" name="password" type="password" fullWidth margin="normal" onChange={handleChange} />
      <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
        Login
      </Button>
      <Link href="/signup" variant="body2">
        Don't have an account?  Signup
      </Link>
    </Container>
  );
}

export default Login;