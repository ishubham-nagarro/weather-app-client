import React, { useState } from 'react';
import { TextField, Button, Link, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await apiService.register(formData);
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      alert('Registration failed!');
    }
  };

  return (
    <Container maxWidth="sm">
      <h2>Signup</h2>
      <TextField label="Full Name" name="fullName" fullWidth margin="normal" onChange={handleChange} />
      <TextField label="Email" name="email" type="email" fullWidth margin="normal" onChange={handleChange} />
      <TextField label="Password" name="password" type="password" fullWidth margin="normal" onChange={handleChange} />
      <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
        Submit
      </Button>
      <Link href="/login" variant="body2">
        Already have an account? Login
      </Link>
    </Container>
  );
}

export default Signup;