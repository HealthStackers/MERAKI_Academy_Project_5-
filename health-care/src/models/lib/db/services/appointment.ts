import pool from "@/models/lib/db";
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

export const AppointmentType = {
  "Check-ups": "Check-ups",
  Evaluations: "Evaluations",
  "Follow-up": "Follow-up",
} as const;

export type AppointmentType =
  (typeof AppointmentType)[keyof typeof AppointmentType];

export const durationMap = {
  "Check-ups": "15-20 minutes",
  Evaluations: "30 minutes",
  "Follow-up": "20 minutes",
} as const;

export type DurationMap = typeof durationMap;

export type Appointment = {
  DateAppointment: Date;
  BloodType: string;
  MedicalHistory: string;
  TimeAppointment: Timestamp;
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

export const bookAppointment = async (appointment: Appointment) => {
  const result = await pool.query<Appointment>(
    `INSERT INTO Appointments (DateAppointment, BloodType, MedicalHistory, TimeAppointment, DurationTime, AppointmentType, description, Gender, DoctorName, Specializing, user_id, Disease_id) 
SELECT $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
WHERE NOT EXISTS (
    SELECT 1
    FROM Appointments
    WHERE TimeAppointment = $4
      AND DoctorName = $9::VARCHAR
) RETURNING *`,
    [
      appointment.DateAppointment,
      appointment.BloodType,
      appointment.MedicalHistory,
      appointment.TimeAppointment,
      (appointment.DurationTime = durationMap[appointment.AppointmentType]),
      appointment.AppointmentType,
      appointment.description,
      appointment.Gender,
      appointment.DoctorName,
      appointment.Specializing,
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
