import React, { useEffect} from 'react';
import axios from 'axios';

const Success = ({user,setUser}) => {
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/auth/google/success', { withCredentials: true });
        setUser(res.data.user);

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [setUser]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.displayName}</h1>
      <img src={user.photos[0].value} alt={user.displayName} />
      <p>Email: {user.emails[0].value}</p>
      <button onClick={() => window.location.href = 'http://localhost:5000/auth/google/signout'}>Sign Out</button>
    </div>
  );
};

export default Success;
