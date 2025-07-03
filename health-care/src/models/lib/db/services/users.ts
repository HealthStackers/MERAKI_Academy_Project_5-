import pool from "@/models/lib/db";
import { request } from "http";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Secret } from "jsonwebtoken";

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
  userprofilepic?: string;
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
    process.env.NEXTAUTH_SECRET as Secret,
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

  if (result.rows.length === 0) {
    throw new Error("Invalid email or password");
  }
  if (result) {
    const hashedPassword = result.rows[0].password;
    const isMatch = await comparePassword(password, hashedPassword);
    const user = result.rows[0];
    const token = jwt.sign(
      { userId: user.id, email: user.email, roleId: user.role_id },
      process.env.NEXTAUTH_SECRET as Secret,
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
      throw new Error(" Please check the password");
    }
  } else {
    throw new Error("Invalid credentials");
  }
};

export const UpdateUser = async (id: number, UpdatedUser: UpdateUser) => {
  const result = await pool.query<UpdateUser>(
    `UPDATE users SET firstName = COALESCE($1,firstName) , lastName = COALESCE($2,lastName), age = COALESCE($3 , age), country = COALESCE($4 , country),phoneNumber =  COALESCE($5,phoneNumber )  , email =COALESCE($6 , email) , password = COALESCE($7,password ), role_id = COALESCE($8, role_id) ,is_deleted = COALESCE($9, is_deleted),userprofilepic = COALESCE($10, userprofilepic)   WHERE id = $11 RETURNING *`,
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
      UpdatedUser.userprofilepic,
      id,
    ]
  );
  return result.rows;
};


export const GetAllDoctors = async () => {
  const result = await pool.query(
    `SELECT
u.* ,
jr.*,
  u.id AS doctor_id,
    u.firstname, u.lastname,
      r.role_name,
        COUNT(a.id) AS total_appointments,
          COUNT(DISTINCT a.user_id) AS distinct_patients
          FROM users AS u
          INNER JOIN join_request AS jr
            ON u.id = jr.doctor_id
            INNER JOIN role AS r
              ON r.id = u.role_id
              LEFT JOIN appointments AS a
                ON u.id = a.user_id
                WHERE r.role_name = 'doctor'
                GROUP BY u.id, u.firstname, u.lastname, r.role_name,jr.id`
  );
  return result.rows;
};

export const GetAllPatients = async () => {
  const result = await pool.query(
    `SELECT u.*, d.* , a.* FROM users AS u
    LEFT JOIN Appointments AS a ON u.id = a.user_id 
      INNER JOIN role ON role.id = u.role_id 
      LEFT JOIN diseases AS d ON d.id = a.disease_id
    WHERE role.role_name = 'patient'
    group By u.id,a.user_id,d.id ,a.id`
  );
  return result.rows;
};

export const GetUserById = async (id: number) => {
  const result = await pool.query(
    `SELECT *
FROM join_request
FULL JOIN users ON users.id = join_request.doctor_id
WHERE users.id = $1`,
    [id]
  );

  return result.rows;
};

export const deleteUser = async (id: number) => {
  const result = await pool.query(
    `DELETE FROM users WHERE id = $1 ON DELETE CASCADE RETURNING * `,
    [id]
  );
  return result.rows;
};

export const getAllUsers = async () => {
  const result = await pool.query(
    `SELECT * FROM users `,
   
  );
  return result.rows;
};

//  SELECT
//   a.user_id,
//   STRING_AGG(DISTINCT d.name, ', ' ORDER BY d.name) AS diseases_list
// FROM appointments AS a
// JOIN diseases AS d
//   ON d.id = a.disease_id
// GROUP BY a.user_id
