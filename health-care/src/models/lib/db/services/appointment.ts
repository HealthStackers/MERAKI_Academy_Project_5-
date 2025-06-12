import pool from "@/models/lib/db";
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";
export type Appointment = {
  DateAppointment: Date;
  BloodType: string;
  MedicalHistory: string;
  TimeAppointment: Timestamp;
  DurationTime: string;
  Reason: string;
  Gender: string;
  DoctorName: string;
  Specializing: string;
  is_deleted: 0;
  user_id: number;
  Disease_id: number;
};

export const bookAppointment = async (appointment: Appointment) => {
  const result = await pool.query<Appointment>(
    `INSERT INTO Appointments (DateAppointment , BloodType , MedicalHistory , TimeAppointment , DurationTime , Reason , Gender
, DoctorName , Specializing , user_id , Disease_id 
) VALUES ($1 , $2 , $3 , $4 , $5 , $6 , $7 , $8 , $9 , $10 , $11) RETURNING *`,
    [
      appointment.DateAppointment,
      appointment.BloodType,
      appointment.MedicalHistory,
      appointment.TimeAppointment,
      appointment.DurationTime,
      appointment.Reason,
      appointment.Gender,
      appointment.DoctorName,
      appointment.Specializing,
      appointment.user_id,
      appointment.Disease_id,
    ]
  );

  return result.rows;
};

export const getAppointmentByDoctor = async (name: string) => {
  const result = await pool.query(
    `SELECT * FROM Appointments FULL OUTER JOIN users ON users.id = Appointments.user_id 
    FULL OUTER JOIN role ON role.id = users.role_id WHERE role.role_name = $1`,
    [name]
  );

  return result.rows;
};
