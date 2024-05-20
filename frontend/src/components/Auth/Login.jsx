import axios from 'axios';
import { Button, Card } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [googleClientId, setGoogleClientId] = useState('');
  const [redirectUri, setRedirectUri] = useState(process.env.REACT_APP_BACKEND_URL);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/config');
        
        setGoogleClientId(response.data.googleClientId);
        
      } catch (error) {
        console.error('Error fetching config:', error);
      }
    };

    fetchConfig();
  }, [redirectUri]);

  const googleOAuthUrl=`https://accounts.google.com/o/oauth2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=email%20profile`
  console.log(redirectUri)


  return (
    <div className='w-3/4 m-auto justifu-centeritems-center mt-[15%]'>

    <Card className="max-w-sm m-auto flex flex-col justify-center items-center">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
       Login With Google
      </h5>
     
      <Link to={googleOAuthUrl}><Button className='bg-[#dbbdbd] text-black font-bold p-3 text-2xl'>
        Login
        <svg className="-mr-1 ml-2 h-4 w-4" fill="blue" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </Button>
      </Link>
    </Card>
    </div>
  );
}




export default Login;
