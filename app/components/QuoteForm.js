'use client';

import { useState } from 'react';

const initialForm = {
  name: '',
  phone: '',
  email: '',
  service: '',
  location: '',
  details: '',
  website: ''
};

export default function QuoteForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: 'loading', message: 'Sending your request…' });

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || 'We could not send your request. Please call or text instead.');
      }

      setForm(initialForm);
      setStatus({
        type: 'success',
        message: 'Your request was sent. Rebecca will follow up as soon as she can.'
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'We could not send your request. Please call or text instead.'
      });
    }
  }

  return (
    <form className="quote-form" onSubmit={handleSubmit}>
      <div className="quote-form-heading">
        <p>Free estimate request</p>
        <h2>Tell us what needs cleaned.</h2>
        <span>Rebecca will contact you about pricing and availability.</span>
      </div>

      <div className="quote-fields">
        <label>
          <span>Name *</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
            maxLength={100}
            required
          />
        </label>

        <label>
          <span>Phone *</span>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            autoComplete="tel"
            maxLength={40}
            required
          />
        </label>

        <label>
          <span>Email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            maxLength={160}
          />
        </label>

        <label>
          <span>City or area</span>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            autoComplete="address-level2"
            maxLength={100}
          />
        </label>

        <label className="field-wide">
          <span>What kind of help do you need? *</span>
          <select name="service" value={form.service} onChange={handleChange} required>
            <option value="">Choose a service</option>
            <option value="Residential cleaning">Residential cleaning</option>
            <option value="Office or commercial cleaning">Office or commercial cleaning</option>
            <option value="Deep cleaning">Deep cleaning</option>
            <option value="Move-in or move-out cleaning">Move-in or move-out cleaning</option>
            <option value="Construction cleanup">Construction cleanup</option>
            <option value="Cleanout or haul-off help">Cleanout or haul-off help</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label className="field-wide">
          <span>Tell us about the space *</span>
          <textarea
            name="details"
            value={form.details}
            onChange={handleChange}
            rows={3}
            maxLength={2000}
            placeholder="What needs cleaned, how large is the space, and when do you need it?"
            required
          />
        </label>

        <label className="quote-honeypot" aria-hidden="true">
          <span>Website</span>
          <input
            type="text"
            name="website"
            value={form.website}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <button type="submit" disabled={status.type === 'loading'}>
        {status.type === 'loading' ? 'Sending…' : 'Request my estimate'}
      </button>

      <p className={`form-status ${status.type}`} aria-live="polite">
        {status.message}
      </p>
    </form>
  );
}
