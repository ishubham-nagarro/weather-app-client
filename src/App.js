import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, BrowserRouter as Router } from 'react-router-dom';
import authHelper from './utils/authHelper';
import { AdminDashboard, Login, Navbar, Signup, UserDashboard } from './components';

function App() {
  const [token, setToken] = useState(authHelper.getToken());
  const [role, setRole] = useState(authHelper.getUser()?.role);

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(authHelper.getToken());
      setRole(authHelper.getUser()?.role);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const PrivateRoute = ({ children, allowedRoles }) => {
    if (!token) {
      return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} setRole={setRole} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/user-dashboard"
          element={
            <PrivateRoute allowedRoles={["User"]}>
              <UserDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute allowedRoles={["Admin", "SuperAdmin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
    //     <div>
    //   <Navbar />
    //   <Routes>
    //   <Route path="/" element={<Login />} />
    //     <Route path="/signup" element={<Signup />} />
    //     <Route path="/login" element={<Login />} />
    //     {/* <Route
    //       path="/user-dashboard"
    //       element={user?.role === 'User' ? <UserDashboard /> : <Navigate to="/login" />}
    //     /> */}
    //     <Route
    //       path="/admin-dashboard"
    //       element={<AdminDashboard />}
    //     />
    //   </Routes>
    // </div>
    // <Router>
    //   <Navbar />
    //   <Routes>
    //     <Route path="/" element={<Login />} />
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/signup" element={<Signup />} />
    //     <Route
    //       path="/user-dashboard"
    //       element={
    //         <PrivateRoute allowedRoles={["User"]}>
    //           <UserDashboard />
    //         </PrivateRoute>
    //       }
    //     />
    //     <Route
    //       path="/admin-dashboard"
    //       element={
    //         <PrivateRoute allowedRoles={["Admin", "SuperAdmin"]}>
    //           <AdminDashboard />
    //         </PrivateRoute>
    //       }
    //     />
    //     {/* <Route path="*" element={<Navigate to="/login" />} /> */}
    //     {/* <Route
    //       path="/user-dashboard"
    //       element={role === 'User' ? <UserDashboard /> : <Navigate to="/login" />}
    //     />
    //     <Route
    //       path="/admin-dashboard"
    //       element={role === 'Admin' || role === 'SuperAdmin' ? <AdminDashboard /> : <Navigate to="/login" />}
    //     />
    //     <Route path="*" element={<Navigate to="/login" />} /> */}
    //   </Routes>
    // </Router>
  );
}

export default App;
