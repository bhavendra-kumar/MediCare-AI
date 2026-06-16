import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import {
  getToken,
  removeToken,
} from "../store/authStorage";

interface User {
  name?: string;
  email?: string;
}

interface AuthContextType {

  user: User | null;

  token: string | null;

  loading: boolean;

  login: (
    token: string,
    userData?: User
  ) => void;

  logout: () => void;
}

export const AuthContext =
  createContext<AuthContextType>({
    user: null,
    token: null,
    loading: true,

    login: () => {},

    logout: () => {},
  });

interface Props {
  children: ReactNode;
}

export default function AuthProvider({
  children,
}: Props) {

  const [user, setUser] =
    useState<User | null>(null);

  const [token, setToken] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    checkAuth();

  }, []);

  const checkAuth = async () => {

    try {

      const storedToken =
        await getToken();

      if (storedToken) {

        setToken(storedToken);
      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  const login = (
    newToken: string,
    userData?: User
  ) => {

    setToken(newToken);

    if (userData) {
      setUser(userData);
    }
  };

  const logout = async () => {

    await removeToken();

    setToken(null);

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}