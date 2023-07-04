import { createContext, useState } from 'react';

export const ErrorContext = createContext({
  error: false,
  setError: (error: boolean) => {},
});

export const ErrorProvider = ({ children }: any) => {
  const [error, setError] = useState(false);
  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
      {error && (
        <div>
          <p>Something went wrong. Please try again later.</p>
        </div>
      )}
    </ErrorContext.Provider>
  );
};
