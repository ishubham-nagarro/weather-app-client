import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, Dialog, TextField, DialogActions, DialogContent, DialogTitle, MenuItem, TableContainer, Paper, CircularProgress } from '@mui/material';
import apiService from '../services/apiService';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { LoadingButton } from '@mui/lab';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null)
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await apiService.getAllUsers();
      setUsers(data);
    } catch (error) {
      alert('Failed to fetch users');
    } finally {
      setLoading(false);
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
      setActionLoading('edit');
      await apiService.updateUser({fullName: currentUser.fullName, email: currentUser.email, role: currentUser.role, _id: currentUser._id});
      setOpen(false);
      fetchUsers();
    } catch (error) {
      alert('Save failed!');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      setActionLoading(id);
      await apiService.deleteUser(id);
      fetchUsers();
    } catch (error) {
      alert('Delete failed!');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <Container sx={{ paddingTop: '24px' }}>
      <Typography variant="h4" marginBottom="20px">User List</Typography>
      <TableContainer component={Paper}>
      {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '400px',
            }}
          >
            <CircularProgress sx={{ height: '30px !important', width: '30px !important' }} />
          </Box>
        ):
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
          {users.length ? users.map((user) => (
            <TableRow  hover key={user.id} sx={{ cursor: 'pointer', '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">{user.fullName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell sx={{ display:'flex', justifyContent: 'center', alignItems: 'center' }}>
                <EditIcon fontSize='small' color='primary' sx={{ marginRight: '10px', cursor: 'pointer' }} onClick={() => handleEdit(user)} />
                {actionLoading === user._id ? <CircularProgress size={20} /> :
                <DeleteOutlineIcon fontSize='small' color='error' sx={{ cursor: 'pointer' }} onClick={() => handleDelete(user._id)} />}
              </TableCell>
            </TableRow>
          )) :
          <TableRow>
            <TableCell colSpan={4} align="center" sx={{ height: '300px' }}>
              <h4>No results found</h4>
            </TableCell>
        </TableRow>}
        </TableBody>
      </Table>}
      </TableContainer>

      {/* Edit User Modal */}
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
          <LoadingButton loading={actionLoading === 'edit'} variant='contained' onClick={handleSave} color="primary">
            Save
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AdminDashboard;
