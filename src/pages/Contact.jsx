import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Contact() {
  const navigate = useNavigate();

  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //  Submit Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          message: formData.message
        })
      });

     if (response.ok) {
    navigate('/success', { state: { from: 'contact' } });
} else {
        alert("❌ Failed to send message. Please check your backend.");
      }
    } catch (error) {
      console.error("Connection Error:", error);
      alert("❌ Server is not responding. Is Laravel running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 bg-white p-5 shadow-sm rounded">
          <h2 className="text-center mb-4 fw-bold">Get In Touch</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                name="fullName"
                className="form-control rounded-0" 
                placeholder="John Doe" 
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                name="email"
                className="form-control rounded-0" 
                placeholder="name@example.com" 
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea 
                name="message"
                className="form-control rounded-0" 
                rows="4" 
                placeholder="Tell us about your custom requirement..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="btn btn-dark w-100 py-2 rounded-0 shadow fw-bold"
              disabled={loading}
            >
              {loading ? 'SENDING...' : 'SEND MESSAGE'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;