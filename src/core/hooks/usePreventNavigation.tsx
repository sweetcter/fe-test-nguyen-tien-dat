import { useEffect, useRef, useState } from 'react';
import { useBlocker } from 'react-router';

const usePreventNavigation = (
  shouldConfirm: boolean | (() => boolean),
  shouldCheckSearch: boolean = false
) => {
  const [prevent, setPrevent] = useState(false);

  const shouldConfirmRef = useRef(shouldConfirm);

  const checkConfirm = () => {
    const val = shouldConfirmRef.current;
    return typeof val === 'function' ? val() : val;
  };

  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    const pathChanged = currentLocation.pathname !== nextLocation.pathname;
    const searchChanged = currentLocation.search !== nextLocation.search;
    return checkConfirm() && (pathChanged || (shouldCheckSearch && searchChanged));
  });

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!checkConfirm()) return;
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  useEffect(() => {
    const isConfirming = checkConfirm();
    if (blocker.state === 'blocked' && !isConfirming) {
      blocker.proceed();
      setPrevent(false);
    } else if (blocker.state === 'blocked' && isConfirming) {
      setPrevent(true);
    }
  }, [blocker, shouldConfirm]);

  return {
    prevent,
    setPrevent,
    blocker,
  };
};

export default usePreventNavigation;
