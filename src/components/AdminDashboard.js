import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, Dialog, TextField, DialogActions, DialogContent, DialogTitle, MenuItem, TableContainer, Paper } from '@mui/material';
import apiService from '../services/apiService';
// import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
// import authHelper from '../utils/authHelper';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await apiService.getAllUsers();
      setUsers(data);
    } catch (error) {
      alert('Failed to fetch users');
    }
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setOpen(true);
  };

  const handleSave = async () => {
    if (!currentUser.fullName || !currentUser.email || !currentUser.role) {
      return;
    }

    try {
      await apiService.updateUser(currentUser);
      setOpen(false);
      fetchUsers();
    } catch (error) {
      alert('Save failed!');
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiService.deleteUser(id);
      fetchUsers();
    } catch (error) {
      alert('Delete failed!');
    }
  };

  return (
    <Container sx={{ paddingTop: '24px' }}>
      <Typography variant="h4" marginBottom="20px">User List</Typography>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: 600, fontSize: '16px' }}>Name</TableCell>
            <TableCell align="left" sx={{ fontWeight: 600, fontSize: '16px' }}>Email</TableCell>
            <TableCell align="left" sx={{ fontWeight: 600, fontSize: '16px' }}>Role</TableCell>
            <TableCell align="center" sx={{ fontWeight: 600, fontSize: '16px' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow  hover key={user.id} sx={{ cursor: 'pointer', '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">{user.fullName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell sx={{ display:'flex', justifyContent: 'center', alignItems: 'center' }}>
                <EditIcon fontSize='small' color='primary' sx={{ marginRight: '10px', cursor: 'pointer' }} onClick={() => handleEdit(user)} />
                <DeleteOutlineIcon fontSize='small' color='error' sx={{ cursor: 'pointer' }} onClick={() => handleDelete(user._id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Update User Details</DialogTitle>
        <DialogContent sx={{ paddingBottom: '0' }}>
          <TextField
            label="Name"
            value={currentUser?.fullName || ''}
            onChange={(e) => setCurrentUser({ ...currentUser, fullName: e.target.value })}
            fullWidth
            margin="normal"
            error={!currentUser?.fullName}
            helperText={!currentUser?.fullName && 'Name is required'}
          />
          <TextField
            label="Email"
            value={currentUser?.email || ''}
            onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
            fullWidth
            margin="normal"
            error={!currentUser?.email}
            helperText={!currentUser?.email && 'Email is required'}
          />
          <TextField
            select
            label="Role"
            value={currentUser?.role || ''}
            onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
            fullWidth
            margin="normal"
            error={!currentUser?.role}
            helperText={!currentUser?.role && 'Role is required'}
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="User">User</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions sx={{ padding: '24px' }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant='contained' onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AdminDashboard;
