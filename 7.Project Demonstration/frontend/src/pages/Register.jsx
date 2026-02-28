import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password || !type) {
      alert('All fields are required');
      return;
    }

    try {
      await API.post('/auth/register', {
        name,
        email,
        password,
        type: type.toLowerCase()
      });

      alert('Registration successful');
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: '400px' }}>
        <h4 className="text-center mb-4 text-light">Sign Up</h4>

        <input
          className="form-control mb-3"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="form-control mb-4"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Select User Type</option>
          <option value="renter">Renter</option>
          <option value="owner">Owner</option>
        </select>

        <button className="btn btn-primary w-100 mb-3" onClick={handleRegister}>
          Sign Up
        </button>

        <p className="text-center">
          Already have an account?{' '}
          <span
            className="text-primary"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;