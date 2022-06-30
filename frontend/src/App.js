import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [data, setData] = useState({});
  
  useEffect(() => {
    axios.get('/api/')
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.log('ERROR!', err);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{JSON.stringify(data)}</p>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. Updated 5! Hello dev 4!
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
