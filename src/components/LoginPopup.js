import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const LoginPopup = ({ onClose }) => { // Pass onClose as a prop
  const [username, setUsername] = useState('johnd'); // Initial value 'johnd'
  const [password, setPassword] = useState('m38rmF$'); // Initial value 'm38rmF$'
  const { login } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Prepare the request payload with the provided login information
    fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Bad Request');
        }
        return response.json();
      })
      .then((json) => {
        // Assuming the API returns a token or user object upon successful login,
        // you can pass this data to the login function and log it.
        login(json); // Pass the response data to the login function
        console.log('Login successful. Response JSON:', json); // Log the JSON response

        // Close the login popup
        onClose();
      })
      .catch((error) => console.error('Fetch error:', error));
  };

  return (
    <div className="popup">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPopup;
