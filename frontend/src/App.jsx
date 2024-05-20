import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';

import {Success} from './components/Auth/Success';


const App = () => {
  const [linkD,setData]=useState("")
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route path="/success" element={<Success/>} />
      </Routes>
    </Router>
  );
};

export default App;
