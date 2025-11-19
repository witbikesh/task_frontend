import React, { createContext, useContext, useState } from "react";
import type { ILoginPayload, IRegisterPayload, IUser } from "../interface";
import axiosInstance from "../helpers/axios.instance";
import { AUTH_ENDPOINTS } from "../constants";
import { showError, showSuccess } from "../helpers/toast";

interface AuthContextType {
  isAuthenticated: boolean;
  user: IUser | null;
  loading: boolean;
  login: (payload: ILoginPayload) => Promise<boolean>;
  register: (payload: IRegisterPayload) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem("access_token");
  });

  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (payload: ILoginPayload): Promise<boolean> => {
    try {
      setLoading(true);

      const res = await axiosInstance.post(AUTH_ENDPOINTS.LOGIN, payload);

      localStorage.setItem("access_token", res?.data?.data?.accessToken);
      localStorage.setItem("user", JSON.stringify(res?.data?.data?.user));
      setIsAuthenticated(true);
      showSuccess(res?.data?.message);
      return true;
    } catch (error: any) {
      showError(
        error?.response?.data?.message || "Something went wrong during login"
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload: IRegisterPayload) => {
    try {
      setLoading(true);

      const res = await axiosInstance.post(AUTH_ENDPOINTS.REGISTER, payload);

      showSuccess(res?.data?.message);
      return true;
    } catch (error: any) {
      showError(
        error?.response?.data?.message || "Something went wrong during signup"
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth must be used inside AuthContextProvider");
  return context;
};
