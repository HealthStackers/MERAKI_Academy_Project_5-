import pool from "../index";

type Disease = {
  id: number;
  name: string;
  effectedBodyPart: string;
  symptoms: [];
  treatments: [];
  user_id: number;
};

export const POSTAddDisease = async (newDisease: Disease) => {
  const result = await pool.query(
    "insert into diseases (name, effectedBodyPart, symptoms, treatments, user_id) values ($1,$2,$3,$4,$5)",
    [
      newDisease.name.toLowerCase(),
      newDisease.effectedBodyPart.toLowerCase(),
      newDisease.symptoms,
      newDisease.treatments,
      newDisease.user_id,
    ]
  );

  return result.rows;
};

export const GETDiseaseByTreatments = async (treatments: string) => {
  const result = await pool.query(
    "select * from diseases where treatments @> ARRAY[$1]",
    [treatments]
  );

  return result.rows;
};

export const GETDiseaseBySymptoms = async (symptoms: string) => {
  const result = await pool.query(
    "SELECT * FROM diseases WHERE symptoms @> ARRAY[$1]",
    [symptoms]
  );

  return result.rows;
};

export const GETDiseaseByEffectedBodyPart = async (
  effectedBodyPart: string
) => {
  const result = await pool.query(
    "select * from diseases where effectedBodyPart = ($1)",
    [effectedBodyPart]
  );

  return result.rows;
};
