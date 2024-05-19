import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
// import OAuthCallback from './components/OAuthCallback';
import Success from './components/Auth/Success';
import CHome from './components/Calender/CHome';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chome" element={<CHome user={user}/>} />
        <Route path="/success" element={<Success user={user} setUser={setUser}/>} />
      </Routes>
    </Router>
  );
};

export default App;
