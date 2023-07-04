import { createContext, useState } from 'react';

export const ErrorContext = createContext({
  error: '',
  setError: (error: string) => {},
});

export const ErrorProvider = ({ children }: any) => {
  const [error, setError] = useState('');
  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
      {error.length > 0 && (
        <div className="error-snackbar">
          <p>{error}</p>
        </div>
      )}
    </ErrorContext.Provider>
  );
};
