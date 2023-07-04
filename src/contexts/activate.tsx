import { createContext, useState } from 'react';

export const ActivateContext = createContext({
  activate: false,
  setActivate: (activate: boolean) => {},
});

export const ActivateProvider = ({ children }: any) => {
  const [activate, setActivate] = useState(false);
  return <ActivateContext.Provider value={{ activate, setActivate }}>{children}</ActivateContext.Provider>;
};
