'use client';
import { useState, useEffect } from 'react';

export default function ClaimPage({ params }) {
  const [slot, setSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('idle'); // idle, booking, success, fail
  const [name, setName] = useState('');

  // 1. Fetch Slot Details
  useEffect(() => {
    fetch(`/api/slots/details?id=${params.id}`)
      .then(res => res.json())
      .then(data => {
        setSlot(data);
        setLoading(false);
      });
  }, [params.id]);

  // 2. The "Race" Logic
  const handleClaim = async () => {
    if (!name) return alert("Please enter your name");
    setStatus('booking');

    const res = await fetch('/api/slots/book', {
      method: 'POST',
      body: JSON.stringify({ id: params.id, patientName: name })
    });

    const result = await res.json();

    if (result.success) {
      setStatus('success');
    } else {
      setStatus('fail'); // Too late!
    }
  };

  if (loading) return <div style={{textAlign:'center', marginTop: 50}}>Loading slot...</div>;

  if (!slot || slot.status === 'BOOKED') {
    return (
      <div style={{maxWidth: 400, margin: '50px auto', textAlign: 'center', padding: 30, background: '#fff0f0', borderRadius: 16, border: '1px solid #fed7d7'}}>
        <h1 style={{fontSize: '3rem', margin: 0}}>🐢</h1>
        <h2 style={{color: '#c53030'}}>Too Late!</h2>
        <p>This slot has already been claimed by another patient.</p>
        <a href="/join" className="btn btn-secondary">Join Waitlist for Next Time</a>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div style={{maxWidth: 400, margin: '50px auto', textAlign: 'center', padding: 30, background: '#f0fdf4', borderRadius: 16, border: '1px solid #bbf7d0'}}>
        <h1 style={{fontSize: '3rem', margin: 0}}>🎉</h1>
        <h2 style={{color: '#15803d'}}>Confirmed!</h2>
        <p>You have successfully booked Dr. Ben Hassena.</p>
        <p><strong>{new Date(slot.start_time).toLocaleString()}</strong></p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
      <div className="badge" style={{marginBottom: 10, display:'inline-block'}}>⚡ Priority Access</div>
      <h1 style={{margin: '0 0 10px 0'}}>Slot Available!</h1>
      <p style={{color: '#666', fontSize: '1.1rem'}}>Dr. Ben Hassena is free at:</p>
      
      <div style={{background: '#eff6ff', padding: 20, borderRadius: 12, border: '1px solid #bfdbfe', margin: '20px 0', textAlign:'center'}}>
        <strong style={{fontSize: '1.4rem', color: '#1e3a8a'}}>
            {new Date(slot.start_time).toLocaleString('en-US', {weekday:'long', hour:'numeric', minute:'numeric'})}
        </strong>
      </div>

      <div className="form-group">
        <label>Verify Your Name</label>
        <input 
            className="form-input" 
            value={name} 
            onChange={e => setName(e.target.value)}
            placeholder="Enter full name"
        />
      </div>

      <button 
        className="btn btn-primary" 
        style={{width: '100%', marginTop: 20, fontSize: '1.2rem', padding: '15px'}}
        onClick={handleClaim}
        disabled={status === 'booking'}
      >
        {status === 'booking' ? 'Claiming...' : 'CLAIM SPOT NOW'}
      </button>
      
      {status === 'fail' && (
        <p style={{color: 'red', textAlign: 'center', marginTop: 10}}>Error: Someone just took it!</p>
      )}
    </div>
  );
}