"use client"
import { createContext, useState, useEffect, ReactNode } from "react";


interface AuthContextType {
 token : string | null,
setToken :(t : string | null) => void
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
});

export function AuthProvider({children} : {children :ReactNode}) {
const [token , setToken] = useState<string | null> (null)


useEffect(()=>{
    const t = typeof window !== "undefined" ?localStorage.getItem("token") :null
     setToken(t);
})


return (
    <AuthContext.Provider value={{token , setToken}}>{children}</AuthContext.Provider>
)
}
















