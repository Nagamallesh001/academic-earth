import React, { useState } from 'react';
import MainPage from '../Main_Page/MainPage';


function Login({ onLoginSuccess }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = 'Username is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(false);

      setTimeout(() => {
        if (formData.username === 'admin' || formData.password === 'password') {
          alert('Login successful');
          onLoginSuccess();
        } else {
          setErrors({ general: 'Invalid username or password' });
        }
        setIsSubmitting(true);
      }, 1000);
    }
  };

  return (
    <>
    {isSubmitting?<MainPage/>:
    <div className="loginDiv" style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2 style={{ color: 'white' }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange}
            placeholder="Enter your username" />
          {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange}
            placeholder="Enter your password" />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </div>
        {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>}
        <div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
    </div>}
    </>
  );
}

export default Login;
