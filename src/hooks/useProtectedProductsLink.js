import { useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export function useProtectedProductsLink() {
  const { isLoggedIn } = useAuth();
  const { addToast } = useToast();

  return useCallback(
    (e) => {
      if (!isLoggedIn) {
        e.preventDefault();
        addToast('You must be logged in to access Products!', 'warning');
      }
    },
    [isLoggedIn, addToast]
  );
}
