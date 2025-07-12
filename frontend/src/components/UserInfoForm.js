import React, { useState } from 'react';

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePhone = (phone) => {
  return /^\+?\d{7,15}$/.test(phone.replace(/\s+/g, ''));
};

const UserInfoForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError('Vyplňte prosím všechna pole.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Zadejte platný e-mail.');
      return;
    }
    if (!validatePhone(phone)) {
      setError('Zadejte platné telefonní číslo.');
      return;
    }
    setError('');
    onSubmit({ name: name.trim(), email: email.trim(), phone: phone.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="user-info-form" style={{ maxWidth: 340, margin: '0 auto', padding: 24, background: '#18181a', borderRadius: 18, boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}>
      <h2 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: 18, textAlign: 'center' }}>Zadejte své údaje pro zahájení chatu</h2>
      <div style={{ marginBottom: 14 }}>
        <label style={{ color: '#b3b3b3', display: 'block', marginBottom: 4 }}>Jméno</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #232326', background: '#232326', color: '#fff' }} required />
      </div>
      <div style={{ marginBottom: 14 }}>
        <label style={{ color: '#b3b3b3', display: 'block', marginBottom: 4 }}>E-mail</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #232326', background: '#232326', color: '#fff' }} required />
      </div>
      <div style={{ marginBottom: 18 }}>
        <label style={{ color: '#b3b3b3', display: 'block', marginBottom: 4 }}>Telefon</label>
        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #232326', background: '#232326', color: '#fff' }} required />
      </div>
      {error && <div style={{ color: '#E53137', marginBottom: 10, textAlign: 'center' }}>{error}</div>}
      <button type="submit" style={{ width: '100%', padding: 10, borderRadius: 10, background: '#E53137', color: '#fff', fontWeight: 600, border: 'none', fontSize: '1rem', cursor: 'pointer' }}>Zahájit chat</button>
    </form>
  );
};

export default UserInfoForm; 