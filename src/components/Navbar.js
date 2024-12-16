import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import ProfileMenu from './ProfileMenu';
import authHelper from '../utils/authHelper';

const Navbar = () => {
  const user = authHelper.getUser();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          {!user && 'Weather Application'}
          {user && (user?.role === 'User' ? 'User Dashboard' : 'Admin Dashboard')}
        </Typography>
        {user && <ProfileMenu />}
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;