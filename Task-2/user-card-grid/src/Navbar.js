import React, { useState } from 'react';
import axios from 'axios';
import './App.css';


function Navbar() {

  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const cards = {
    color: "white",
    backgroundColor: "DodgerBlue",
  }

  const fetchUsers = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get('https://reqres.in/api/users?page=1');
      setUserData(response.data.data);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <container>

      <nav className="navbar">
        <div className="navbar-brand"> <img src="logo.jpeg" className='logo'  alt="logo"/>  </div>
        <button className="btn" onClick={fetchUsers}>Get Users</button>
      </nav>

      <div className='container'>
        {isLoading && <div className="loader btn-lg-primary">Loader....</div>}
        {userData && (
          <div className='user-card-container'>
            {userData.map((user) => (
              <div className="user-card" key={user.id}>
                <div className="card">
                  <img src={user.avatar} className="card-image" alt="User Avatar" />
                  <div className="card-body">
                    <h5 className="card-title">{user.first_name} {user.last_name}</h5>
                    <p className="card-details">{user.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </container >
  );
}

export default Navbar;

