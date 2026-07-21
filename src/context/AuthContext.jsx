import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { hashPassword, verifyPassword } from '../utils/hash';
import { sanitizeInput } from '../utils/sanitize';

const AuthContext = createContext();

// 30 minutes session expiry
const SESSION_DURATION = 30 * 60 * 1000;

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('currentUser')) || null
  );
  const [sessionExpired, setSessionExpired] = useState(false);
  const sessionTimer = useRef(null);

  const clearSession = useCallback(() => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    setCurrentUser(null);
    if (sessionTimer.current) clearTimeout(sessionTimer.current);
  }, []);

  const resetSessionTimer = useCallback(() => {
    if (sessionTimer.current) clearTimeout(sessionTimer.current);
    sessionTimer.current = setTimeout(() => {
      clearSession();
      setSessionExpired(true); // Signal to Header to show toast
    }, SESSION_DURATION);
  }, [clearSession]);

  // Start timer when logged in
  useEffect(() => {
    if (isLoggedIn) {
      resetSessionTimer();
    }
    return () => {
      if (sessionTimer.current) clearTimeout(sessionTimer.current);
    };
  }, [isLoggedIn, resetSessionTimer]);

  // Reset timer on any user activity
  useEffect(() => {
    if (!isLoggedIn) return;
    const handleActivity = () => resetSessionTimer();
    window.addEventListener('click', handleActivity);
    window.addEventListener('keypress', handleActivity);
    return () => {
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('keypress', handleActivity);
    };
  }, [isLoggedIn, resetSessionTimer]);

  /**
   * Register a new user
   * Returns { success, message }
   */
  const register = (user) => {
    const sanitizedUser = {
      name: sanitizeInput(user.name.trim()),
      username: sanitizeInput(user.username.trim()),
      phone: sanitizeInput(user.phone.toString().trim()),
      email: sanitizeInput(user.email.trim().toLowerCase()),
      password: hashPassword(user.password),
    };

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = existingUsers.some(
      (u) =>
        u.email === sanitizedUser.email ||
        u.username === sanitizedUser.username ||
        u.phone === sanitizedUser.phone
    );

    if (userExists) {
      return { success: false, message: 'User already registered with the same Email, Username, or Phone!' };
    }

    existingUsers.push(sanitizedUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    return { success: true, message: 'Registration Successful! Please log in.' };
  };

  /**
   * Log in a user
   * Returns { success, message }
   */
  const login = (email, password) => {
    const sanitizedEmail = sanitizeInput(email.trim().toLowerCase());
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    const validUser = existingUsers.find(
      (user) => user.email === sanitizedEmail && verifyPassword(password, user.password)
    );

    if (validUser) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', JSON.stringify(validUser));
      setIsLoggedIn(true);
      setCurrentUser(validUser);
      resetSessionTimer();
      return { success: true, message: `Welcome back, ${validUser.name}! 🎉` };
    } else {
      return { success: false, message: 'Invalid email or password. Please try again.' };
    }
  };

  /**
   * Log out the current user
   * Returns { message }
   */
  const logout = () => {
    const userName = currentUser?.name || 'User';
    clearSession();
    return { message: `Goodbye, ${userName}! You have been logged out.` };
  };

  /**
   * Consume the session expired flag (call once from Header to show toast)
   */
  const consumeSessionExpired = () => {
    setSessionExpired(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        currentUser,
        sessionExpired,
        consumeSessionExpired,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
