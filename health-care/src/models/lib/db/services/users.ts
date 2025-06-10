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
  email: string;
  password: string;
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
    `INSERT INTO users (firstName , lastName, age, country,email , password,role_id) VALUES ($1 , $2 , $3 , $4 , $5 , $6 , $7) RETURNING *`,
    [
      newUser.firstName.toLocaleLowerCase(),
      newUser.lastName,
      newUser.age,
      newUser.country.toLocaleLowerCase(),
      newUser.email.toLocaleLowerCase(),
      await hashPassword(newUser.password),
      newUser.role_id,
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
    `UPDATE users SET firstName = COALESCE($1,firstName) , lastName = COALESCE($2,lastName), age = COALESCE($3 , age), country = COALESCE($4 , country),email =COALESCE($5 , email) , password = COALESCE($6,password ), is_deleted = COALESCE($7, is_deleted) WHERE id = $8 RETURNING *`,
    [
      UpdatedUser.firstName,
      UpdatedUser.lastName,
      UpdatedUser.age,
      UpdatedUser.country,
      UpdatedUser.email,
      UpdatedUser.password,
      UpdatedUser.is_deleted,
      id,
    ]
  );
  return result.rows;
};

export const DeleteUser = async (id: number) => {
  const result = await pool.query(`DELETE FROM USERS WHERE id = $1`, [id]);
};
