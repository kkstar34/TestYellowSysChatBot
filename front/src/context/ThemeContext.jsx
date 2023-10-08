import { createContext, useContext, useState } from 'react';

// Créez un contexte pour le thème
const ThemeContext = createContext();

// Créez un composant fournisseur pour le thème
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark'); // Par défaut, le thème est clair

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'clear' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Utilisez un hook personnalisé pour accéder au contexte du thème
export const useTheme = () => {
  return useContext(ThemeContext);
};
