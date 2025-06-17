import pool from "@/models/lib/db";
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";
import moment from "moment";
import { DateTime } from "next-auth/providers/kakao";
import { NextResponse } from "next/server";

export const AppointmentType = {
  "Check-ups": "Check-ups",
  Evaluations: "Evaluations",
  "Follow-up": "Follow-up",
} as const;

export const clockSystem = {
  "a.m.": "a.m.",
  "p.m.": "p.m.",
} as const;

export type clockSystem = (typeof clockSystem)[keyof typeof clockSystem];

export type AppointmentType =
  (typeof AppointmentType)[keyof typeof AppointmentType];

export const durationMap = {
  "Check-ups": "20 minutes",
  Evaluations: "30 minutes",
  "Follow-up": "15 minutes",
} as const;

export type DurationMap = typeof durationMap;

export type Appointment = {
  id?: number;
  DateAppointment: Date;
  BloodType: string;
  MedicalHistory: string;
  TimeAppointment: DateTime;
  clockSystem: clockSystem;
  DurationTime: DurationMap[AppointmentType];
  AppointmentType: AppointmentType;
  description: string;
  Gender: string;
  DoctorName: string;
  Specializing: string;
  is_deleted: 0;
  user_id: number;
  Disease_id: number;
};

export type UpdateAppointment = {
  DateAppointment: Date;
  BloodType: string;
  MedicalHistory: string;
  TimeAppointment: DateTime;
  clockSystem: clockSystem;
  DurationTime: DurationMap[AppointmentType];
  AppointmentType: AppointmentType;
  description: string;
  Gender: string;
  DoctorName: string;
  Specializing: string;
  user_id: number;
  Disease_id: number;
};
export const bookAppointment = async (appointment: Appointment) => {
  const result = await pool.query<Appointment>(
    `INSERT INTO Appointments (DateAppointment, BloodType, MedicalHistory, TimeAppointment,  clockSystem,DurationTime, AppointmentType, description, Gender, DoctorName, Specializing, user_id, Disease_id) 
SELECT $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12 , $13 
WHERE NOT EXISTS (
    SELECT 1
    FROM Appointments 
    WHERE DateAppointment = $1 AND user_id = $12
  AND DoctorName = $10::VARCHAR
  AND (
      (TimeAppointment, TimeAppointment + 
       CASE
           WHEN AppointmentType = 'Check-ups' THEN INTERVAL '20 minutes'
           WHEN AppointmentType = 'Evaluations' THEN INTERVAL '30 minutes'
           WHEN AppointmentType = 'Follow-up' THEN INTERVAL '15 minutes'
           ELSE INTERVAL '0 minutes'
       END) OVERLAPS
      ($4::time, $4::time + 
       CASE
           WHEN AppointmentType = 'Check-ups' THEN INTERVAL '20 minutes'
           WHEN AppointmentType = 'Evaluations' THEN INTERVAL '30 minutes'
           WHEN AppointmentType = 'Follow-up' THEN INTERVAL '15 minutes'
           ELSE INTERVAL '0 minutes'
       END)
  ))
 RETURNING *`,
    [
      appointment.DateAppointment,
      appointment.BloodType.trim(),
      appointment.MedicalHistory.trim(),
      appointment.TimeAppointment,
      appointment.clockSystem,
      (appointment.DurationTime = durationMap[appointment.AppointmentType]),
      appointment.AppointmentType,
      appointment.description.trim(),
      appointment.Gender.trim(),
      appointment.DoctorName.trim(),
      appointment.Specializing.trim(),
      appointment.user_id,
      appointment.Disease_id,
    ]
  );

  return result.rows;
};

export const getAppointmentByRoleName = async (name: string) => {
  const result = await pool.query(
    `SELECT * FROM Appointments FULL OUTER JOIN users ON users.id = Appointments.user_id 
    FULL OUTER JOIN role ON role.id = users.role_id WHERE role.role_name = $1`,
    [name]
  );

  return result.rows;
};

export const deleteAppointmentById = async (id: number) => {
  const result = await pool.query(
    `DELETE FROM Appointments WHERE id = $1 RETURNING *`,
    [id]
  );

  return result.rows;
};

export const getAppointmentsByUserId = async (role: string, id: number) => {
  let result;
  const role_name: string = role.toLocaleLowerCase();
  if (role_name === "doctor") {
    result = await pool.query(
      `SELECT  DateAppointment , BloodType  , MedicalHistory , TimeAppointment , DurationTime ,  
      
       TimeAppointment + 
        CASE
            WHEN AppointmentType = 'Check-ups' THEN INTERVAL '20 minutes'
            WHEN AppointmentType = 'Evaluations' THEN INTERVAL '30 minutes'
            WHEN AppointmentType = 'Follow-up' THEN INTERVAL '15 minutes'
            ELSE INTERVAL '0 minutes'
        END AS "Endtime",
         AppointmentType , description , Gender , diseases.name , diseases.effectedBodyPart ,
     diseases.symptoms , diseases.symptoms, users.id ,users.firstName , users.lastName , users.age , users.country , users.email  FROM Appointments FULL OUTER JOIN users ON users.id = Appointments.user_id 
    FULL OUTER JOIN role ON role.id = users.role_id 
    FULL OUTER JOIN diseases ON diseases.id = Appointments.disease_id
    WHERE role.role_name = $1 AND  users.id = $2 `,
      [role, id]
    );
  } else if (role_name === "patient") {
    result = await pool.query(
      `SELECT   users.firstName , users.lastName  , users.country , users.email ,Appointments.DoctorName, Appointments.Specializing , DateAppointment ,  TimeAppointment , DurationTime  , 
        TimeAppointment + 
        CASE
            WHEN AppointmentType = 'Check-ups' THEN INTERVAL '20 minutes'
            WHEN AppointmentType = 'Evaluations' THEN INTERVAL '30 minutes'
            WHEN AppointmentType = 'Follow-up' THEN INTERVAL '15 minutes'
            ELSE INTERVAL '0 minutes'
        END AS "Endtime",
      AppointmentType  FROM Appointments FULL OUTER JOIN users ON users.id = Appointments.user_id 
    FULL OUTER JOIN role ON role.id = users.role_id 
    FULL OUTER JOIN diseases ON diseases.id = Appointments.disease_id
    WHERE role.role_name = $1 AND  users.id = $2 `,
      [role, id]
    );
  }

  return result?.rows;
};

export const UpdateAppointment = async (
  updateAppointment: UpdateAppointment,
  id: number
) => {
  const result = await pool.query<UpdateAppointment>(
    `UPDATE Appointments SET DateAppointment = COALESCE($1,DateAppointment) , 
   BloodType = COALESCE($2,BloodType) , MedicalHistory = COALESCE($3,MedicalHistory) , TimeAppointment = COALESCE($4,TimeAppointment) , clockSystem = COALESCE($5,clockSystem) , 
     DurationTime = COALESCE($6,DurationTime) , AppointmentType = COALESCE($7,AppointmentType) , 
     description = COALESCE($8,description) , Gender = COALESCE($9,Gender) , 
     DoctorName = COALESCE($10,DoctorName) , Specializing = COALESCE($11,Specializing)  , user_id = COALESCE($12,user_id) , Disease_id = COALESCE($13,Disease_id)
      WHERE id = $14 AND NOT EXISTS (
    SELECT 1
    FROM Appointments 
    WHERE DateAppointment = $1 AND user_id = $12
  AND DoctorName = $10::VARCHAR
  AND (
      (TimeAppointment, TimeAppointment + 
       CASE
           WHEN AppointmentType = 'Check-ups' THEN INTERVAL '20 minutes'
           WHEN AppointmentType = 'Evaluations' THEN INTERVAL '30 minutes'
           WHEN AppointmentType = 'Follow-up' THEN INTERVAL '15 minutes'
           ELSE INTERVAL '0 minutes'
       END) OVERLAPS
      ($4::time, $4::time + 
       CASE
           WHEN AppointmentType = 'Check-ups' THEN INTERVAL '20 minutes'
           WHEN AppointmentType = 'Evaluations' THEN INTERVAL '30 minutes'
           WHEN AppointmentType = 'Follow-up' THEN INTERVAL '15 minutes'
           ELSE INTERVAL '0 minutes'
       END)
  ))RETURNING *`,
    [
      updateAppointment.DateAppointment,
      updateAppointment.BloodType,
      updateAppointment.MedicalHistory,
      updateAppointment.TimeAppointment,
      updateAppointment.clockSystem,
      (updateAppointment.DurationTime =
        durationMap[updateAppointment.AppointmentType]),
      updateAppointment.AppointmentType,
      updateAppointment.description,
      updateAppointment.Gender,
      updateAppointment.DoctorName,
      updateAppointment.Specializing,
      updateAppointment.user_id,
      updateAppointment.Disease_id,
      id,
    ]
  );
  return result.rows;
};

export const getAllAppointments = async () => {
  const result = await pool.query(`SELECT Appointments.id AS appointment_id,
    Appointments.DateAppointment,
    Appointments.TimeAppointment,
    Appointments.BloodType,
    Appointments.MedicalHistory,
    Appointments.AppointmentType,
    Appointments.description,
    Appointments.disease_id,
    Appointments.DoctorName,
    Appointments.DurationTime,
    Appointments.is_deleted,
    Appointments.user_id,
    users.id AS user_id,
    users.firstName,
    users.lastName,
    users.email AS user_email,
    users.Age,
    role.id AS role_id,
    role.role_name AS role_name,
    diseases.id AS disease_id,
    diseases.Name AS disease_name FROM Appointments 
    FULL OUTER JOIN users ON users.id = Appointments.user_id 
    FULL OUTER JOIN role ON role.id = users.role_id
    FULL OUTER JOIN diseases ON diseases.id = Appointments.disease_id`);
  if (!result) {
    return NextResponse.json({ msg: "Error" });
  } else {
    return result.rows;
  }
};
