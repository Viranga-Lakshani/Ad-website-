import React, { useEffect, useState } from 'react';

function AdForm({ onAdd }) {
  const [form, setForm] = useState({
    title: '', description: '', contactName: '', contactEmail: '',
    location: '', imageUrl: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/ads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setForm({ title: '', description: '', contactName: '', contactEmail: '', location: '', imageUrl: '' });
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} className="ad-form">
      <h2>Place a Humanized Ad</h2>
      <input name="title" placeholder="Ad Title" value={form.title} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
      <input name="contactName" placeholder="Your Name" value={form.contactName} onChange={handleChange} required />
      <input name="contactEmail" type="email" placeholder="Your Email" value={form.contactEmail} onChange={handleChange} required />
      <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
      <input name="imageUrl" placeholder="Image URL (optional)" value={form.imageUrl} onChange={handleChange} />
      <button type="submit">Post Ad</button>
    </form>
  );
}

function AdList({ ads, onSelect }) {
  return (
    <div className="ad-list">
      <h2>Latest Human Ads</h2>
      {ads.length === 0 && <p>No ads yet.</p>}
      {ads.map(ad => (
        <div key={ad._id} className="ad-card" onClick={() => onSelect(ad)}>
          {ad.imageUrl && <img src={ad.imageUrl} alt="Ad" />}
          <h3>{ad.title}</h3>
          <p>{ad.description.slice(0, 100)}...</p>
          <span>By: {ad.contactName} &mdash; {ad.location}</span>
        </div>
      ))}
    </div>
  );
}

function AdDetail({ ad, onClose }) {
  if (!ad) return null;
  return (
    <div className="ad-detail">
      <button onClick={onClose}>Back</button>
      <h2>{ad.title}</h2>
      {ad.imageUrl && <img src={ad.imageUrl} alt="Ad" width={300} />}
      <p>{ad.description}</p>
      <p><strong>Contact:</strong> {ad.contactName} ({ad.contactEmail})</p>
      <p><strong>Location:</strong> {ad.location}</p>
      <p><strong>Posted:</strong> {new Date(ad.postedAt).toLocaleString()}</p>
    </div>
  );
}

function App() {
  const [ads, setAds] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null);

  const fetchAds = async () => {
    const res = await fetch('http://localhost:5000/api/ads');
    const data = await res.json();
    setAds(data);
  };

  useEffect(() => { fetchAds(); }, []);

  return (
    <div className="container">
      <h1>Make Human: Full Humanize Ad Platform</h1>
      <AdForm onAdd={fetchAds} />
      {selectedAd ? (
        <AdDetail ad={selectedAd} onClose={() => setSelectedAd(null)} />
      ) : (
        <AdList ads={ads} onSelect={setSelectedAd} />
      )}
    </div>
  );
}

export default App;
