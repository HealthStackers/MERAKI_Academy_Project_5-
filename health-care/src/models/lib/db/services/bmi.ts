import pool from "@/models/lib/db";

export type BMI = {
  height: number;
  weight: number;
  age: number;
  gender: string;
};

export const calculateBMI = async (bmi: BMI) => {
  const result = await pool.query<BMI>(
    `INSERT INTO bmi (height , weight , age , gender) VALUES ($1 , $2 , $3 , $4) RETURNING *`,
    [bmi.height, bmi.weight, bmi.age, bmi.gender]
  );

  return result.rows;
};
