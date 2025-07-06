"use client";
import React, { useContext, useEffect, useState } from "react";
import "./viewSchedule.css";
import axios from "axios";
import { AuthContext } from "@/app/context/AuthContext";
import Footer from "../../components/footer";
import { error } from "console";

const ViewSchedule = () => {
  const UID = localStorage.getItem("userId");
  const roleId = localStorage.getItem("roleId");
  const [appointments, SetAppointments] = useState([]);
  const role = localStorage.getItem("role");
  const { doctorName, setDoctorName } = useContext(AuthContext);
  const [doctorAppointmentArray, setDoctorAppointmentArray] = useState([]);
  console.log(appointments);
  console.log("doctorName: ", doctorName);

  const GetAppointments = async () => {
    try {
      const res = await axios.get(` http://localhost:3000/api/appointments`, {
        params: {
          role: role,
          id: UID,
        },
      });
      SetAppointments(res.data);
      console.log("res.data: ", res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    GetAppointments();
  });

  if (roleId) {
    if (+roleId === 3) {
      useEffect(() => {
        axios
          .get("http://localhost:3000/api/appointments/all")
          .then((result) => {
            console.log("result.data: ", result.data);

            const arrayOfAppointments = result.data.filter((ele, i) => {
              return ele.doctorname === doctorName;
            });
            console.log("arraykk: ", arrayOfAppointments);
            setDoctorAppointmentArray(arrayOfAppointments);
          })
          .catch((error) => {
            console.log();
          });
      }, []);
    }
  }

  return (
    <div className="appointmentsPage">
      <div className="appointmentsCards">
        <h3 className="currentAppointment">Current Appointments »</h3>
        <div className="row">
          {doctorAppointmentArray.length === 0 && <p>No appointments</p>}
          {roleId === "3" &&
            doctorAppointmentArray?.map((e, idx) => (
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
                    <p className="card-subtitle mb-2">
                      <strong>Appointment Type:</strong> {e.appointmenttype}
                    </p>
                    <p className="card-subtitle mb-2 ">
                      <strong>Date:</strong> {e.dateappointment.split("T")[0]}{" "}
                      at {e.timeappointment}
                    </p>
                    <p className="card-subtitle mb-2">
                      <strong>Duration:</strong> {e.durationtime}
                    </p>

                    <p className="card-subtitle mb-2">
                      <strong>Description:</strong> {e.description}
                    </p>
                    <p className="card-subtitle mb-2">
                      <strong>Disease:</strong> {e.disease_name}
                    </p>

                    {/* <strong>Allergies:</strong>
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
                    </ul> */}
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
      <Footer />
    </div>
  );
};

export default ViewSchedule;
