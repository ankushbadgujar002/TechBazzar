/**
 * Password Hashing Utility (btoa-based, for demo/learning purposes)
 * In production, use bcrypt or Argon2 on the server side
 */
export const hashPassword = (password) => {
  try {
    return btoa(unescape(encodeURIComponent(password + '_techbazzar_salt')));
  } catch (e) {
    return btoa(password + '_techbazzar_salt');
  }
};

/**
 * Verify a raw password against a stored hash
 */
export const verifyPassword = (inputPassword, storedHash) => {
  return hashPassword(inputPassword) === storedHash;
};
