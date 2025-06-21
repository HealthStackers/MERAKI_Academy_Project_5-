"use client";
import { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  setToken: (t: string | null) => void;
  roleId: string | null;
  setRoleId: (rId: string | null) => void;
  userId: string | null;
  setUserId: (uId: string | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  roleId: null,
  setRoleId: () => {},
  userId: null,
  setUserId: () => {},

});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [roleId, setRoleId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const t =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
      console.log("t: ",t);
      
    setToken(t);
    const uId =
      typeof window !== "undefined" ? localStorage.getItem("userId") : null;
    setUserId(uId);

    const rId =
      typeof window !== "undefined" ? localStorage.getItem("roleId") : null;
    setRoleId(rId);
  },[]);

  return (
    <AuthContext.Provider value={{ token, setToken,roleId, setRoleId,userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
}
