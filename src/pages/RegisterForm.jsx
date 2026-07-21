import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { isValidEmail, isValidPhone, isValidPassword } from '../utils/sanitize';
import '../css/RegisterForm.css';

export default function RegisterForm() {
  const { register } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '', username: '', phone: '', email: '', password: ''
  });

  // Inline field errors
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required.';
    else if (formData.name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters.';

    if (!formData.username.trim()) newErrors.username = 'Username is required.';
    else if (formData.username.trim().length < 3) newErrors.username = 'Username must be at least 3 characters.';

    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required.';
    else if (!isValidPhone(formData.phone)) newErrors.phone = 'Enter a valid 10-digit phone number.';

    if (!formData.email.trim()) newErrors.email = 'Email address is required.';
    else if (!isValidEmail(formData.email)) newErrors.email = 'Enter a valid email address.';

    if (!formData.password) newErrors.password = 'Password is required.';
    else if (!isValidPassword(formData.password)) newErrors.password = 'Password must be at least 6 characters.';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      addToast('Please fix the errors in the form.', 'error');
      return;
    }

    setIsSubmitting(true);
    const result = register(formData);
    setIsSubmitting(false);

    if (result.success) {
      addToast(result.message, 'success', 4000);
      setFormData({ name: '', username: '', phone: '', email: '', password: '' });
      navigate('/');
    } else {
      addToast(result.message, 'error');
      setErrors({ email: result.message });
    }
  };

  return (
    <section className="main-container" id="home" style={{ marginTop: '80px', paddingBottom: '60px' }}>
      <article className="register-heading">
        <h1>Register</h1>
      </article>

      <form onSubmit={handleSubmit} id="form" noValidate>
        <h1 className="heading" style={{
          position: 'relative', top: '0', left: '0', animation: 'none',
          textShadow: 'none', color: '#130f40', fontSize: '28px',
          padding: '10px 0 20px', lineHeight: 'normal', textAlign: 'center'
        }}>
          Create Account
        </h1>

        <article className="info">
          {/* Name */}
          <div className="field-group">
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              autoFocus
              autoComplete="off"
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <span className="field-error">⚠ {errors.name}</span>}
          </div>

          {/* Username */}
          <div className="field-group">
            <input
              type="text"
              placeholder="Username"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              autoComplete="off"
              className={errors.username ? 'input-error' : ''}
            />
            {errors.username && <span className="field-error">⚠ {errors.username}</span>}
          </div>

          {/* Phone */}
          <div className="field-group">
            <input
              type="tel"
              placeholder="Phone (10 digits)"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              autoComplete="off"
              className={errors.phone ? 'input-error' : ''}
            />
            {errors.phone && <span className="field-error">⚠ {errors.phone}</span>}
          </div>

          {/* Email */}
          <div className="field-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
              style={{ textTransform: 'lowercase' }}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="field-error">⚠ {errors.email}</span>}
          </div>

          {/* Password */}
          <div className="field-group">
            <input
              type="password"
              placeholder="Password (min 6 chars)"
              name="password"
              id="pass"
              value={formData.password}
              onChange={handleChange}
              autoComplete="off"
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <span className="field-error">⚠ {errors.password}</span>}
          </div>
        </article>

        <input
          type="submit"
          value={isSubmitting ? 'Creating Account...' : 'Sign Up'}
          className="btn"
          id="submit"
          style={{ cursor: isSubmitting ? 'not-allowed' : 'pointer', marginTop: '10px' }}
          disabled={isSubmitting}
        />

        <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '14px' }}>
          Already have an account?{' '}
          <Link to="/" style={{ color: 'green', fontWeight: 'bold' }}>Login here</Link>
        </p>
      </form>
    </section>
  );
}
