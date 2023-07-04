import { createContext, useState, useEffect } from 'react';

export const ActivateContext = createContext({
  activate: false,
  setActivate: (activate: boolean) => {},
});

export const ActivateProvider = ({ children }: any) => {
  const [activate, setActivate] = useState(false);
  useEffect(() => {
    const activate = localStorage.getItem('activate');
    if (activate) {
      setActivate(true);
    }
  }, []);
  return <ActivateContext.Provider value={{ activate, setActivate }}>{children}</ActivateContext.Provider>;
};
