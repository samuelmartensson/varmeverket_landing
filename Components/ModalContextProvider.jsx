import { useContext, createContext, useState } from "react";

const ModalContext = createContext({});
export const useModalContext = () => useContext(ModalContext);

const ModalContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
