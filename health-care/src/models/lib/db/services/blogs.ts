import pool from "@/models/lib/db";

export type Blog = {
  id?: number;
  Title: string;
  TimeCreated ?: Date;
  body: string;
  doctor_id: number;
};

export const AddBlog = async (blog :Blog) => {
const result = await pool.query(`INSERT INTO blogs (Title , body , doctor_id) VALUES ($1 , $2 , $3) RETURNING *` , [blog.Title , blog.body , blog.doctor_id])
return result.rows;
};
