import pool from "@/models/lib/db";

export type BMI = {
  height: number;
  weight: number;
  age: number;
  gender: string;
  user_id: number;
};

export const calculateBMI = async (bmi: BMI) => {
  const result = await pool.query<BMI>(
    `INSERT INTO bmi (height , weight , age , gender , user_id) VALUES ($1 , $2 , $3 , $4 , $5) RETURNING *`,
    [bmi.height, bmi.weight, bmi.age, bmi.gender, bmi.user_id]
  );

  return result.rows;
};

export const getBMIResultByUserId = async (id: number) => {
  const result = await pool.query(`SELECT * from bmi WHERE user_id = $1`, [id]);

  return result.rows;
};

