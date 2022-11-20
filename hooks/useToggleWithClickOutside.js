import { useCallback, useEffect, useState } from "react";

export const useToggleWithClickOutside = (ref) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleKeydown = useCallback((event) => {
    if (event.keyCode === 27) {
      setIsOpen(false);
      return;
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref?.current?.contains(e.target)) {
        return;
      }
      setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeydown);
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, ref, handleKeydown]);

  const toggle = useCallback((forceOpen) => setIsOpen(forceOpen), []);

  return { isOpen, toggle };
};
