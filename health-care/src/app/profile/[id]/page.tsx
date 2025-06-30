/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useContext, useEffect, useState } from "react";
import "./profile.css";
import axios from "axios";
import Link from "next/link";
import { AuthContext } from "@/app/context/AuthContext";
import Footer from "../../components/footer"


const Profile = () => {
  const token = localStorage.getItem("token");
  const UID = localStorage.getItem("userId");
  const roleId = localStorage.getItem("roleId");
  const { role, SetRole } = useContext(AuthContext);
  localStorage.setItem("role" , role)
  const [profile, setProfile] = useState([]);
  const [bloodType, setBloodType] = useState([]);
  const [diseaseName, setDiseaseName] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(profile);
  console.log(bloodType);
  console.log(diseaseName);
  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/users/profile/${UID}`
        );
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const getBloodType = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/appointments/getBloodType/${UID}`
        );
        setBloodType(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const getDiseaseName = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/diseases/getDiseaseName/${UID}`
        );
        setDiseaseName(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
    getBloodType();
    getDiseaseName();
  }, [UID]);

  return (
    <div className="profilePage">
      {profile.map((e, idx) => (
        <div
          key={idx}
          className="card profile-card mx-auto my-4"
          style={{ maxWidth: "400px", marginBottom:"200px"}}

        >
          <div className="card-body text-center">
            <img
              src={e.userprofilepic}
              alt="Avatar"
              className="rounded-circle mb-3"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
            <h4 className="card-title">{e.firstname}</h4>
            <p className="text-muted mb-3">{e.email}</p>
            <p>
              <strong>Phone:</strong> {e.phonenumber}
            </p>
            <p>
              <strong>Address:</strong> {e.country}
            </p>

            {token && roleId === "3" ? (
              <div className="doctor-fields text-start">
                <p>
                  <strong>Specialization:</strong> {e.specialization}
                </p>
                <p>
                  <strong>Clinic:</strong> {e.clinicname}
                </p>
                <p>
                  <strong>CV:</strong>{" "}
                  {e.cvurl ? (
                    <a href={e.cvurl} target="_blank	" rel="noopener noreferrer">
                      View
                    </a>
                  ) : (
                    "N/A"
                  )}
                </p>
                <Link href={`/viewSchedule/${UID}`} className="viewSchedulebtn">
                  {" "}
                  <button type="button" className="btn btn-primary" onClick={((e)=>{
                    SetRole('doctor')
                  })}>
                    View Schedule
                  </button>
                </Link>
              </div>
            ) : token && roleId === "2" ? (
              <div className="patient-fields text-start">
                <div className="patient-fields">
                  <p>
                    <strong>Age:</strong> {e.age}
                  </p>
                  {bloodType?.map((e, idx) => (
                    <p key={idx}>
                      <strong>Blood Type:</strong> {e.bloodtype}
                    </p>
                  ))}
                  <strong>Allergies:</strong>
                  <ul>
                    {diseaseName?.map((e, idx) => (
                      <li key={idx}>{e.name}</li>
                    ))}
                  </ul>
                  <div className="btns justify-content-center d-flex gap-2">
                    <Link href={`/viewSchedule/${UID}`}>
                      <button type="button" className="btn btn-primary" onClick={((e)=>{
                    SetRole('patient')
                  })}>
                        View Schedule
                      </button>
                    </Link>
                    <Link href="/bookAppointment">
                      <button type="button" className="btn btn-primary">
                        Book Appointment
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="head-office-fields text-start">
                <Link href="/adminPanel" className="adminPanel">
                  <button type="button" className="btn btn-primary">
                    Admin Panel
                  </button>
                </Link>
              </div>
            )}
          </div>
          
        </div>
      ))}
      <Footer/>
    </div>
  );
};

export default Profile;
