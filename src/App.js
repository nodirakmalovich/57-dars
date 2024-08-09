import './App.css';
import Navbar from './layouts/navbar/navbar';
import Hero from './layouts/hero/hero';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredUser, setFilteredUser] = useState(null);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/users")
      .then((res) => {
        setData(res?.data.users || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <Navbar data={data} setData={setData} setFilteredUser={setFilteredUser} />
      <Hero data={data} loading={loading} setData={setData} filteredUser={filteredUser} setFilteredUser={setFilteredUser}/>
    </div>
  );
}

export default App;
