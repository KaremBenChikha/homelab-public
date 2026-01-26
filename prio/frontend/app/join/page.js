'use client';
import { useState } from 'react';

export default function JoinWaitlist() {
  const [form, setForm] = useState({ name: '', phone: '' });
  const [step, setStep] = useState('form'); // form, submitting, done

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStep('submitting');
    
    await fetch('/api/waitlist', {
      method: 'POST',
      body: JSON.stringify(form)
    });
    
    setStep('done');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
      <div style={{textAlign: 'center', marginBottom: 20}}>
        <div style={{fontSize: '40px', marginBottom: 10}}>🏥</div>
        <h1 style={{fontSize: '1.5rem', margin: 0}}>Clinique El Aouina</h1>
        <p style={{color: '#6b7280'}}>Priority Waitlist Registration</p>
      </div>

      {step === 'done' ? (
        <div style={{textAlign: 'center', color: '#064e3b', background: '#ecfdf5', padding: 20, borderRadius: 12}}>
          <h2 style={{margin:0}}>You're on the list!</h2>
          <p>We will text you immediately if Dr. Ben Hassena frees up.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input 
              className="form-input" 
              required
              placeholder="e.g. Salah Mela"
              value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
            />
          </div>
          <div className="form-group" style={{marginTop: 15}}>
            <label>Phone Number</label>
            <input 
              className="form-input" 
              type="tel"
              required
              placeholder="e.g. 55 123 456"
              value={form.phone}
              onChange={e => setForm({...form, phone: e.target.value})}
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{width: '100%', marginTop: 25, fontSize: '1.1rem'}}
            disabled={step === 'submitting'}
          >
            {step === 'submitting' ? 'Joining...' : 'Get Priority Access'}
          </button>
          <p style={{fontSize: '0.8rem', color: '#9ca3af', textAlign: 'center', marginTop: 15}}>
            By joining, you agree to receive automated SMS notifications.
          </p>
        </form>
      )}
    </div>
  );
}