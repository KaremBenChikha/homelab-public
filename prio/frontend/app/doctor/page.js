'use client';
import { useState, useEffect } from 'react';

const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16]; 
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export default function DoctorCalendar() {
  const [appointments, setAppointments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null); 
  const [formData, setFormData] = useState({ patient_name: '' });
  const [loading, setLoading] = useState(false);

  const loadData = () => {
    setLoading(true);
    fetch('/api/appointments').then(res => res.json()).then(data => {
      const processed = data.map(app => ({ ...app, start_date: new Date(app.start_time) }));
      setAppointments(processed);
      setLoading(false);
    });
  };

  useEffect(() => { loadData(); }, []);

  const handleCellClick = (dayIndex, hour) => {
    // Logic to calculate Date for clicked cell (assumes current week)
    const today = new Date();
    const currentDay = today.getDay(); // 0=Sun
    const distance = (dayIndex + 1) - currentDay; // Distance from today to target (Mon is 1)
    const targetDate = new Date();
    targetDate.setDate(today.getDate() + distance);
    targetDate.setHours(hour, 0, 0, 0);

    setSelectedSlot({ isNew: true, start_time: targetDate });
    setFormData({ patient_name: '' });
    setModalOpen(true);
  };

  const handleEventClick = (e, appt) => {
    e.stopPropagation();
    setSelectedSlot({ isNew: false, ...appt });
    setFormData({ patient_name: appt.patient_name });
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    await fetch('/api/appointments', {
      method: 'POST',
      body: JSON.stringify({ patient_name: formData.patient_name, start_time: selectedSlot.start_time })
    });
    setModalOpen(false);
    loadData();
  };

  const handleCancel = async () => {
    await fetch(`/api/appointments?id=${selectedSlot.id}`, { method: 'DELETE' });
    setModalOpen(false);
    loadData();
  };

  const getEventForSlot = (dayIndex, hour) => {
    return appointments.find(app => {
      const d = app.start_date;
      const appDayIndex = d.getDay() - 1; 
      return appDayIndex === dayIndex && d.getHours() === hour && app.status !== 'FREE';
    });
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div className="header-container">
        <div>
            <h1>👨‍⚕️ Dr. Ben Hassena <span className="badge">Admin</span></h1>
            <p style={{color: '#6b7280', margin: '4px 0 0 32px'}}>Clinique El Aouina • General Practice</p>
        </div>
        <button className="btn btn-primary" onClick={loadData}>
            {loading ? 'Syncing...' : 'Refresh Calendar'}
        </button>
      </div>

      {/* Calendar Card */}
      <div className="calendar-card">
        <div className="calendar-wrapper">
            <div className="cal-header" style={{borderRight: '1px solid #e5e7eb'}}></div> {/* Empty Corner */}
            {DAYS.map(d => <div key={d} className="cal-header">{d}</div>)}

            {HOURS.map(hour => (
            <>
                <div key={`time-${hour}`} className="time-label">{hour}:00</div>
                {DAYS.map((_, dayIndex) => {
                const event = getEventForSlot(dayIndex, hour);
                return (
                    <div key={`${dayIndex}-${hour}`} className="cal-cell" onClick={() => handleCellClick(dayIndex, hour)}>
                    {event && (
                        <div className={`event ${event.status === 'BOOKED' ? 'booked' : 'free'}`}
                            onClick={(e) => handleEventClick(e, event)}>
                            {event.patient_name}
                        </div>
                    )}
                    </div>
                );
                })}
            </>
            ))}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2 style={{marginTop:0}}>
                {selectedSlot.isNew ? 'New Appointment' : 'Manage Patient'}
            </h2>
            <p style={{color: '#666', marginBottom: 20}}>
                {selectedSlot.start_time?.toLocaleString('en-US', {weekday: 'long', hour: 'numeric', minute:'numeric'})}
            </p>
            
            {selectedSlot.isNew ? (
              <div className="form-group">
                <label>Patient Name</label>
                <input className="form-input" 
                  placeholder="e.g. Fahem"
                  value={formData.patient_name} 
                  onChange={e => setFormData({...formData, patient_name: e.target.value})} 
                  autoFocus
                />
              </div>
            ) : (
              <div>
                <div className="form-group">
                    <label>Patient Name</label>
                    <div style={{fontSize: '1.2rem', fontWeight: 'bold'}}>{selectedSlot.patient_name}</div>
                </div>
                <div style={{marginTop: 15, padding: 10, background: '#f3f4f6', borderRadius: 8, fontSize: '0.9rem'}}>
                    Status: <span style={{color: 'green', fontWeight:'bold'}}>Confirmed</span><br/>
                    Insurance: RAMQ valid
                </div>
              </div>
            )}

            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Close</button>
              {selectedSlot.isNew ? (
                <button className="btn btn-primary" onClick={handleSubmit}>Confirm Booking</button>
              ) : (
                <button className="btn btn-danger" onClick={handleCancel}>
                  🚫 Cancel & Notify Waitlist
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}