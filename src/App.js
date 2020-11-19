import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [cookies, setCookies] = useState([]);
  let newCookie = '';



  useEffect(() => {
    const getCookies = async () => {
      const response = await axios.get('http://localhost:4000/allCookies');
      setCookies(response.data)
    }
    getCookies();
  }, [])

  const createCookie = async () => {
    const response = await axios.post('http://localhost:4000/', { newCookie });
    setCookies(response.data);
  }

  const deleteCookie = async (cookie) => {
    const response = await axios.delete(`http://localhost:4000/${cookie}`);
    setCookies(response.data);
  }

  const updateCookie = async (cookie) => {
    const response = await axios.put(`http://localhost:4000/${cookie}`, {newCookie});
    setCookies(response.data);
  }

  return (
    <div className="App">
      <header className="App-header">
        <input placeholder="add new cookie" onChange={e => newCookie = e.target.value} />
        <button onClick={createCookie}>
          add
        </button>
        {cookies.map(cookie => (
          <div>
            {cookie} 
              <button onClick={() => updateCookie(cookie)}>
                update
              </button>
              <button onClick={() => deleteCookie(cookie)}>
                delete
        </button>
            <br />
          </div>))}
      </header>
    </div>
  );
}

export default App;
