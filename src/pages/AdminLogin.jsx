import React, { useState } from 'react';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    fetch('http://127.0.0.1:8000/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem('adminToken', data.token);
        window.location.replace('/admin/dashboard');
      } else {
        alert("Invalid Username or Password");
      }
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light" 
         style={{ backgroundImage: 'url("your-background-image.jpg")', backgroundSize: 'cover' }}>
      <div className="card p-4 shadow-lg border-0" style={{ width: '350px' }}>
        <h3 className="text-center fw-bold mb-4">DASTKAAR ADMIN</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>
          <div className="mb-3">
            <input 
              type="password" 
              className="form-control" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn btn-dark w-100 fw-bold">LOGIN</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;