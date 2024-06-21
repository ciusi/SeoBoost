import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrationModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!privacyChecked) {
      setError('Devi accettare la politica sulla privacy.');
      return;
    }

    try {
      if (isLogin) {
        const response = await axios.post('/api/users/login', { email, password });
        localStorage.setItem('token', response.data.token);
      } else {
        const response = await axios.post('/api/users/register', { name, email, password });
        localStorage.setItem('token', response.data.token);
      }
      onClose();
      navigate('/audit');
    } catch (err) {
      setError(err.response?.data?.msg || 'Errore durante la registrazione');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-content">
          <button className="close-button" onClick={onClose}>&times;</button>
          <h2 className="modal-title">Benvenuto su PageSpeed Audit</h2>
          <p className="modal-description">Registrati o accedi per utilizzare il nostro strumento di audit della velocità delle pagine.</p>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label className="form-label">Nome</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
            )}
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                <input
                  type="checkbox"
                  checked={privacyChecked}
                  onChange={(e) => setPrivacyChecked(e.target.checked)}
                  className="form-checkbox"
                />
                Accetto la politica sulla privacy
              </label>
            </div>
            <button type="submit" className="submit-button">
              {isLogin ? 'Accedi' : 'Registrati'}
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="toggle-button"
            >
              {isLogin ? 'Crea un nuovo account' : 'Hai già un account? Accedi'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;
