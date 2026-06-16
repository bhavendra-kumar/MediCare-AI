import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AccessibilityContextType {
  isElderlyMode: boolean;
  toggleElderlyMode: () => void;
  fontSize: number;
}

const AccessibilityContext = createContext<AccessibilityContextType>({
  isElderlyMode: false,
  toggleElderlyMode: () => {},
  fontSize: 16,
});

export const useAccessibility = () => useContext(AccessibilityContext);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isElderlyMode, setIsElderlyMode] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const saved = await AsyncStorage.getItem('elderly_mode');
    if (saved === 'true') setIsElderlyMode(true);
  };

  const toggleElderlyMode = async () => {
    const newValue = !isElderlyMode;
    setIsElderlyMode(newValue);
    await AsyncStorage.setItem('elderly_mode', String(newValue));
  };

  const fontSize = isElderlyMode ? 20 : 16;

  return (
    <AccessibilityContext.Provider value={{ isElderlyMode, toggleElderlyMode, fontSize }}>
      {children}
    </AccessibilityContext.Provider>
  );
};
