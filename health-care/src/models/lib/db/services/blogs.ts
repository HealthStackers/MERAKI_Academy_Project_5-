import pool from "@/models/lib/db";

export type Blog = {
  id?: number;
  Title: string;
  TimeCreated?: Date;
  body: string;
  service_id: number;
  doctor_id: number;
};

export const AddBlog = async (blog: Blog) => {
  const result = await pool.query(
    `INSERT INTO blogs (Title , body , service_id,doctor_id) VALUES ($1 , $2 , $3 , $4) RETURNING *`,
    [blog.Title, blog.body, blog.service_id, blog.doctor_id]
  );
  return result.rows;
};
