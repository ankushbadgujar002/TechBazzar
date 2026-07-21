import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function useSectionLink() {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(
    (targetId) => (e) => {
      e.preventDefault();
      const scrollToTarget = () => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      };

      if (location.pathname === '/') {
        scrollToTarget();
      } else {
        navigate('/');
        setTimeout(scrollToTarget, 150);
      }
    },
    [location.pathname, navigate]
  );
}
