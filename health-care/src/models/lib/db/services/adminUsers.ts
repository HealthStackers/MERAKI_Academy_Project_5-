import { COOKIE_NAME_PRERENDER_BYPASS } from "next/dist/server/api-utils";
import pool from "../index";
import bcrypt from "bcrypt"
export type POSTNewAdminUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role_id: number;
};

 export const registerAdminUser = async (newAdmin: POSTNewAdminUser) => {
  
    const hashPassword= async (password:string)=>{
        const hashedPassword= await bcrypt.hash(password,10)
        return hashedPassword
    }
   
  const result = await pool.query<POSTNewAdminUser>(
    "insert into users (firstname,lastname,email,password,role_id) values ($1,$2,$3,$4,$5)",
    [
      newAdmin.firstName.toLowerCase(),
      newAdmin.lastName.toLowerCase(),
      newAdmin.email.toLowerCase(),
    await hashPassword (newAdmin.password),
      newAdmin.role_id,
    ]
  );
  return result.rows
};
