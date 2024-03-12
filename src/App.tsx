import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Login} from "./services/api/auth/login";

function App() {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const [userData, setUserData] = useState<any>()
  const [token, setToken] = useState<any>()
  console.log(token)
  console.log(isAuth)
  console.log(userData)
  useEffect(() => {
    if(!isAuth){
      Login().then((data: any) => {
        setUserData(data)
          setIsAuth(true)
          setToken(data)
        console.log(data)
      } )
    }

    console.log(userData)
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
