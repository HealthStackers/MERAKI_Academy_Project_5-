import pool from "@/models/lib/db";
import { request } from "http";


type userDiseases = {
  user_id: number;
  disease_id: number;
};

export const userDiseases = async (user_disease: userDiseases) => {
  const result = await pool.query<userDiseases>(
    `INSERT INTO user_diseases (user_id, disease_id) VALUES ($1 , $2) RETURNING *`,
    [user_disease.user_id , user_disease.disease_id])

  return result.rows;
};