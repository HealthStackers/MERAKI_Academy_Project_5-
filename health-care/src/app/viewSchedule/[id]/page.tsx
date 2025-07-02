"use client";
import React, { useContext, useEffect, useState } from "react";
import "./viewSchedule.css";
import axios from "axios";
import { AuthContext } from "@/app/context/AuthContext";
import Footer from "../../components/footer";

const ViewSchedule = () => {
  const UID = localStorage.getItem("userId");
  const roleId = localStorage.getItem("roleId");
  const [appointments, SetAppointments] = useState([]);
  const [appointmentsDoc, SetAppointmentsDoc] = useState([]);

  const role = localStorage.getItem("role");
  console.log(appointments);
  const GetAppointments = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/appointments`, {
        params: {
          role: role,
          id: UID,
        },
      });
      SetAppointments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const GetAppointmentsDoctors = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/appointments/getDoctorAppointments`,
        {
          params: {
            id: UID,
          },
        }
      );
      SetAppointmentsDoc(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    GetAppointments();
    GetAppointmentsDoctors();
  });

  return (
    <div className="appointmentsPage">
      <div className="appointmentsCards">
        <h3 className="currentAppointment">Current Appointments »</h3>
        <div className="row">
          {appointments.length === 0 && !appointmentsDoc && <p>No appointments</p>}
          {appointmentsDoc.length === 0 && !appointments && <p>No appointments</p>}

          {roleId === "3" &&
            appointmentsDoc?.map((e, idx) => (
              <div key={idx} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100">
                  <div className="card-header text-bg-primary">
                    <strong>Appointment Type:</strong>{" "}
                    <span className="badge bg-light text-dark">
                      {e.appointmenttype}
                    </span>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      Patient: {e.firstname} {e.lastname}
                    </h5>

                    <p className="card-subtitle mb-2 text-muted">
                      <strong>Date:</strong> {e.dateappointment.split("T")[0]}{" "}
                      at {e.timeappointment}
                    </p>
                    <p className="card-subtitle mb-2 text-muted">
                      <strong>End Time:</strong> {e.Endtime}
                    </p>
                    <p className="card-subtitle mb-2">
                      <strong>Description:</strong> {e.description}
                    </p>
                    <p className="card-subtitle mb-2">
                      <strong>Blood Type:</strong> {e.bloodtype}
                    </p>
                    <p className="card-subtitle mb-2">
                      <strong>Country:</strong> {e.country}
                    </p>
                    <strong>Allergies:</strong>
                    <ul>
                      {e.symptoms?.map((symptom, i) => (
                        <li key={i}>{symptom}</li>
                      ))}
                    </ul>

                    <strong>Effected Body Parts:</strong>
                    <ul>
                      {e.effectedbodypart?.map((part, j) => (
                        <li key={j}>{part}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          {roleId === "2" &&
            appointments?.map((e, idx) => (
              <div key={idx} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100">
                  <div className="card-header text-bg-primary">
                    <strong>Appointment Type:</strong>{" "}
                    <span className="badge bg-light text-dark">
                      {e.appointmenttype}
                    </span>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">Dr. Name: {e.doctorname}</h5>

                    <p className="card-subtitle mb-2 text-muted">
                      <strong>Date:</strong> {e.dateappointment.split("T")[0]}{" "}
                      at {e.timeappointment}
                    </p>
                    <p className="card-subtitle mb-2 text-muted">
                      <strong>End Time:</strong> {e.Endtime}
                    </p>
                    <p className="card-subtitle mb-2">
                      <strong>Specialization</strong> {e.specializing}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ViewSchedule;
