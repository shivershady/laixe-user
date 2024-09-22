import { Navigate, Outlet } from 'react-router-dom';

import { useUser } from '../hooks/UserContext';
import { userService } from '../services/userService';

const PrivateRoute = () => {
  const token = localStorage.getItem('token');
  const { user, updateUser } = useUser();

  const fetchUserInfo = async () => {
    try {
      const response = await userService.getUserInfo();
      localStorage.setItem('user', JSON.stringify(response));
      updateUser(response)
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  if (!token) {
    return <Navigate to="/login" replace />;
  } else {
    if (!user) {
      fetchUserInfo()
    }
    return <Outlet />; // Đảm bảo Outlet để render children
  }

};

export default PrivateRoute;
