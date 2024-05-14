
import { useState, useEffect } from 'react';

export const useUserData = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch studentData from sessionStorage
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setUserData(parsedUserData);
    }
  }, []);

  return userData;
};