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
  doctorId: string | null;
  setDoctorId: (dId: string | null) => void;
  info: { age: string; gender: string };
  setInfo: Dispatch<SetStateAction<{ age: string; gender: string }>>;
  symptoms: string[];
  setSymptoms: Dispatch<SetStateAction<string[]>>;
  conditions: string[];
  setConditions: Dispatch<SetStateAction<string[]>>;
  role: string | null;
  SetRole: (t: string | null) => void;
  allDoctors: {
    doctor_id: number;
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
  setAllDoctors: Dispatch<
    SetStateAction<
      {
        doctor_id: number;
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
      }[]
    >
  >;
  searchByLocation: boolean;
  setSearchByLocation: Dispatch<SetStateAction<boolean>>;
  searchBySpecialization: boolean;
  setSearchBySpecialization: Dispatch<SetStateAction<boolean>>;
  searchLocationValue: string;
  setSearchLocationValue: Dispatch<SetStateAction<string>>;
  searchSpecializationValue: string;
  setSearchSpecializationValue: Dispatch<SetStateAction<string>>;
  activeIdx: number;
  setActiveIdx: Dispatch<SetStateAction<number>>;
  doctorIdInBookBtn: {
    doctor_id: number;
    firstname: string;
    lastname: string;
    specialization: string;
    clinicname: string;
  };
  setDoctorIdInBookBtn: Dispatch<
    SetStateAction<{
      doctor_id: number;
      firstname: string;
      lastname: string;
      specialization: string;
      clinicname: string;
    }>
  >;


  doctorName: string;
  setDoctorName: Dispatch<SetStateAction<string>>;

}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  roleId: null,
  setRoleId: () => {},
  userId: null,
  setUserId: () => {},
  doctorId: null,
  setDoctorId: () => {},
  info: {
    age: "",
    gender: "",
  },
  setInfo: () => {},
  symptoms: [],
  setSymptoms: () => [],
  conditions: [],
  setConditions: () => [],
  role: null,
  SetRole: () => {},
  allDoctors: [],
  setAllDoctors: () => [],
  searchByLocation: false,
  setSearchByLocation: () => {},
  searchBySpecialization: false,
  setSearchBySpecialization: () => {},
  searchLocationValue: "",
  setSearchLocationValue: () => {},
  searchSpecializationValue: "",
  setSearchSpecializationValue: () => {},
  activeIdx: 0,
  setActiveIdx: () => {},
  doctorIdInBookBtn: {
    doctor_id: 0,
    firstname: "",
    lastname: "",
    specialization: "",
    clinicname: "",
  },
  setDoctorIdInBookBtn: () => {},
  doctorName: "",
  setDoctorName: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [roleId, setRoleId] = useState<string | null>(null);
  const [role, SetRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [doctorId, setDoctorId] = useState<string | null>(null);

  const [info, setInfo] = useState({
    age: "",
    gender: "",
  });
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [conditions, setConditions] = useState<string[]>([]);
  const [allDoctors, setAllDoctors] = useState<
    {
      doctor_id: number;
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
    }[]
  >([]);
  const [searchByLocation, setSearchByLocation] = useState<boolean>(false);
  const [searchBySpecialization, setSearchBySpecialization] =
    useState<boolean>(false);
  const [searchLocationValue, setSearchLocationValue] = useState<string>("");
  const [searchSpecializationValue, setSearchSpecializationValue] =
    useState<string>("");
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [doctorIdInBookBtn, setDoctorIdInBookBtn] = useState<{
    doctor_id: number;
    firstname: string;
    lastname: string;
    specialization: string;
    clinicname: string;
  }>({
    doctor_id: 0,
    firstname: "",
    lastname: "",
    specialization: "",
    clinicname: "",
  });

  const [doctorName, setDoctorName] = useState("");


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
        doctorId, 
        setDoctorId,
        info,
        setInfo,
        symptoms,
        setSymptoms,
        conditions,
        setConditions,
        role,
        SetRole,
        allDoctors,
        setAllDoctors,
        searchByLocation,
        setSearchByLocation,
        searchBySpecialization,
        setSearchBySpecialization,
        searchLocationValue,
        setSearchLocationValue,
        searchSpecializationValue,
        setSearchSpecializationValue,
        activeIdx,
        setActiveIdx,
        doctorIdInBookBtn,
        setDoctorIdInBookBtn,
        doctorName,
        setDoctorName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
