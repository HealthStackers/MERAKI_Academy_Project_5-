import pool from "@/models/lib/db";
import { request } from "http";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export type RegisterUser = {
  id?: number;
  firstName: string;
  lastName: string;
  age: number;
  country: string;
  phoneNumber: string;
  email: string;
  password: string;
  role_id: number;
  is_deleted: 0;
};

export type UpdateUser = {
  firstName: string;
  lastName: string;
  age: number;
  country: string;
  phoneNumber: string;
  email: string;
  password: string;
  role_id: number;
  is_deleted: 0;
};

export type LoginUser = {
  email: string;
  password: string;
};

const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const comparePassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const Register = async (newUser: RegisterUser) => {
  const result = await pool.query<RegisterUser>(
    `INSERT INTO users (firstName , lastName, age, country, phoneNumber ,email , password , role_id) VALUES ($1 , $2 , $3 , $4 , $5 , $6 , $7 , $8) RETURNING *`,
    [
      newUser.firstName.toLocaleLowerCase(),
      newUser.lastName,
      newUser.age,
      newUser.country.toLocaleLowerCase(),
      newUser.phoneNumber,
      newUser.email.toLocaleLowerCase(),
      await hashPassword(newUser.password),
      2,
    ]
  );

  const user = result.rows[0];
  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role_id },
    process.env.NEXTAUTH_SECRET,
    {
      expiresIn: "1h",
    }
  );
  if (user) {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      country: user.country,
      email: user.email,
      password: user.password,
      role_id: user.role_id,
      is_deleted: 0,
      token: token,
    };
  }
};

export const Login = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * from users WHERE email = $1`, [
    email.toLocaleLowerCase(),
  ]);

  if (result) {
    const hashedPassword = result.rows[0].password;
    const isMatch = await comparePassword(password, hashedPassword);
    const user = result.rows[0];
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.NEXTAUTH_SECRET,
      {
        expiresIn: "1d",
      }
    );
    if (isMatch) {
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        country: user.country,
        phoneNumber: user.phoneNumber,
        email: user.email,
        password: user.password,
        role_id: user.role_id,
        is_deleted: 0,
        token: token,
      };
    } else {
      throw new Error("Failed please check the password");
    }
  } else {
    throw new Error("Invalid credentials");
  }
};

export const UpdateUser = async (id: number, UpdatedUser: UpdateUser) => {
  const result = await pool.query<UpdateUser>(
    `UPDATE users SET firstName = COALESCE($1,firstName) , lastName = COALESCE($2,lastName), age = COALESCE($3 , age), country = COALESCE($4 , country),phoneNumber =  COALESCE($5,phoneNumber )  , email =COALESCE($6 , email) , password = COALESCE($7,password ), role_id = COALESCE($8, role_id) ,is_deleted = COALESCE($9, is_deleted) WHERE id = $9 RETURNING *`,
    [
      UpdatedUser.firstName,
      UpdatedUser.lastName,
      UpdatedUser.age,
      UpdatedUser.country,
      UpdatedUser.phoneNumber,
      UpdatedUser.email,
      UpdatedUser.password,
      UpdatedUser.role_id,
      UpdatedUser.is_deleted,
      id,
    ]
  );
  return result.rows;
};

export const DeleteUser = async (id: number) => {
  const result = await pool.query(
    `DELETE FROM USERS WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows;
};
