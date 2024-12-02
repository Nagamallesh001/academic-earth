import React, { useState } from 'react'
import './App.css'
import MainPage from './components/Main_Page/MainPage';
import Login from './components/LoginForm/LoginForm';


const App = () => {const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); 
  };

  return (
    <div>
      {isLoggedIn ? <MainPage /> : <Login onLoginSuccess={handleLoginSuccess} />}
    </div>
  );
    };

export default App         