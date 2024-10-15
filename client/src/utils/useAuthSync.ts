import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axiosInstance from '../apis/axiosInstance';
import { updateAuth } from '../redux/reducers/authReducer';

export const useAuthSync = () => {
  const dispatch = useDispatch();

  const syncAuthState = async () => {
    try {
      const response = await axiosInstance.get('/api/users/me');
      dispatch(updateAuth(response.data));
    } catch (error) {
      console.error('Failed to sync auth state:', error);
    }
  };

  useEffect(() => {
    syncAuthState();
    // Set up an interval to sync every 5 minutes (300000 ms)
    const intervalId = setInterval(syncAuthState, 300000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return { syncAuthState };
};