import { COOKIE_NAME_PRERENDER_BYPASS } from "next/dist/server/api-utils";
import pool from "../index";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { error } from "console";
export type POSTNewAdminUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role_id: number;
};

type userInfo = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role_id: number;
};

type loginInfo = {
  email: string;
  password: string;
};

const SECRT = process.env.NEXTAUTH_SECRET;
if (!SECRT) {
  throw new Error("JWT secret is not defined");
}
const TOKEN_EXP_TIME = process.env.TOKEN_EXP_TIME;

const generateToken = (user: userInfo) => {
  const payload = {
    userId: user.id,
    email: user.email,
    roleId: user.role_id,
  };

  return jwt.sign(payload, SECRT, {
    expiresIn: "7d",
  });
};

export const registerAdminUser = async (newAdmin: POSTNewAdminUser) => {
  const hashPassword = async (password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  };

  const result = await pool.query<POSTNewAdminUser>(
    "insert into users (firstname,lastname,email,password,role_id) values ($1,$2,$3,$4,$5)",
    [
      newAdmin.firstName.toLowerCase(),
      newAdmin.lastName.toLowerCase(),
      newAdmin.email.toLowerCase(),
      await hashPassword(newAdmin.password),
      newAdmin.role_id,
    ]
  );
  return result.rows;
};

export const loginAdminUser = async (loginInfo: loginInfo) => {
  const result = await pool.query<userInfo>(
    "select firstname,lastname,email,password,role_id  from users where email=$1",
    [loginInfo.email]
  );

  if (!result) {
  } else {
    const hashedPassword = result.rows[0].password;
    const isMatch = await bcrypt.compare(loginInfo.password, hashedPassword);
    if (!isMatch) {
      throw new Error("Failed please check the password");
    } else {
      const token = generateToken(result.rows[0]);
      return {
        firstName: result.rows[0].firstName,
        lastName: result.rows[0].lastName,
        email: result.rows[0].email,
        roleId: result.rows[0].role_id,
        password: result.rows[0].password,
        token: token,
      };
    }
  }
};
