/**
 * Input Sanitization Utility
 * Strips dangerous HTML characters to prevent XSS attacks
 */
export const sanitizeInput = (str) => {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>'"&]/g, (match) => {
    const escapeMap = {
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '&': '&amp;'
    };
    return escapeMap[match];
  });
};

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email);
};

/**
 * Validate phone number (10 digits)
 */
export const isValidPhone = (phone) => {
  return /^\d{10}$/.test(phone.replace(/\s/g, ''));
};

/**
 * Validate password strength (min 6 chars)
 */
export const isValidPassword = (password) => {
  return password.length >= 6;
};
