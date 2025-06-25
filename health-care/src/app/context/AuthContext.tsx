"use client";
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";

interface AuthContextType {
  token: string | null;
  setToken: (t: string | null) => void;
  roleId: string | null;
  setRoleId: (rId: string | null) => void;
  userId: string | null;
  setUserId: (uId: string | null) => void;
  info: { age: string; gender: string };
  setInfo: Dispatch<SetStateAction<{ age: string; gender: string }>>;
  symptoms: string[];
  setSymptoms: Dispatch<SetStateAction<string[]>>;
  conditions: string[];
  setConditions: Dispatch<SetStateAction<string[]>>;
  allDoctors: {
  firstname: string;
  lastname: string;
  age: number;
  country: string;
  email: string;
  phonenumber: number;
  userprofilepic: string;
  role_id: number;
  specialization: string;
  clinicname: string;
  city: string;
}[];
  setAllDoctors: Dispatch<SetStateAction<{
  firstname: string;
  lastname: string;
  age: number;
  country: string;
  email: string;
  phonenumber: number;
  userprofilepic: string;
  role_id: number;
  specialization: string;
  clinicname: string;
  city: string;
}[]>>;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  roleId: null,
  setRoleId: () => {},
  userId: null,
  setUserId: () => {},
  info: {
    age: "",
    gender: "",
  },
  setInfo: () => {},
  symptoms: [],
  setSymptoms: () => [],
  conditions: [],
  setConditions: () => [],
  allDoctors:[],
setAllDoctors:()=>[]
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [roleId, setRoleId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const [info, setInfo] = useState({
    age: "",
    gender: "",
  });
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [conditions, setConditions] = useState<string[]>([]);
  const [allDoctors, setAllDoctors] = useState<{
  firstname: string;
  lastname: string;
  age: number;
  country: string;
  email: string;
  phonenumber: number;
  userprofilepic: string;
  role_id: number;
  specialization: string;
  clinicname: string;
  city: string;
}[]>([])

 
  useEffect(() => {
    const t =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    console.log("t: ", t);

    setToken(t);
    const uId =
      typeof window !== "undefined" ? localStorage.getItem("userId") : null;
    setUserId(uId);

    const rId =
      typeof window !== "undefined" ? localStorage.getItem("roleId") : null;
    setRoleId(rId);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        roleId,
        setRoleId,
        userId,
        setUserId,
        info,
        setInfo,
        symptoms,
        setSymptoms,
        conditions, 
        setConditions,
        allDoctors, 
        setAllDoctors
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
