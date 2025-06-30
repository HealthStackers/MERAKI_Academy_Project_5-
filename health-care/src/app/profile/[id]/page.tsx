/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useContext, useEffect, useState } from "react";
import "./profile.css";
import axios from "axios";
import Link from "next/link";
import { AuthContext } from "@/app/context/AuthContext";
import Swal from "sweetalert2";
import Footer from "../../components/footer"

const Profile = () => {
  const token = localStorage.getItem("token");
  const UID = localStorage.getItem("userId");
  const roleId = localStorage.getItem("roleId");
  const { role, SetRole } = useContext(AuthContext);
  localStorage.setItem("role", role);
  const [profile, setProfile] = useState([]);
  const [ProfilePic, SetProfilePic] = useState("");
  const [bloodType, setBloodType] = useState([]);
  const [diseaseName, setDiseaseName] = useState([]);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState("");

  console.log(profile);
  console.log(bloodType);
  console.log(diseaseName);

  const UpdateProfile = async (profilePic: string) => {
    try {
      await axios
        .put(`http://localhost:3000/api/users/profile/${UID}`, {
          userprofilepic: profilePic,
        })
        .then((res) => {
          console.log("res ,", res);
          Swal.fire({
            title: "The Image Added!",
            text: "Your Profile Image has been Added successfully.",
            icon: "success",
            confirmButtonText: "Okay",
          }).then(() => {
            window.location.reload();
          });
        });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async () => {
    if (!image) return;

    setLoading(true);

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "JobSearch");
    data.append("public_id", `avatar_${UID}_${Date.now()}`);
    data.append("cloud_name", "do0zwgmuh");
    data.append("resource_type", "image");

    try {
      const resp = await fetch(
        "https://api.cloudinary.com/v1_1/do0zwgmuh/image/upload",
        { method: "POST", body: data }
      );
      const result = await resp.json();

      if (!resp.ok) throw new Error(result.error?.message || resp.statusText);
      console.log(result);
      await UpdateProfile(result.secure_url);
    } catch (err) {
      console.error("Cloudinary upload error:", err);
    } finally {
      setLoading(false);
    }
  };

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
            <div className="ProfileImg">
              {" "}
              <img
                src={e.userprofilepic}
                alt="Avatar"
                className="rounded-circle mb-3"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
              <label
                className="btn btn-sm btn-light edit"
                title="Edit profile picture"
              >
                Edit
                <input
                  type="file"
                  accept="image/*"
                  className="visually-hidden"
                  onClick={(e) => {
                    e.target.value = "";
                  }}
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    uploadImage();
                  }}
                />
              </label>
            </div>

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
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={(e) => {
                      SetRole("doctor");
                    }}
                  >
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
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={(e) => {
                          SetRole("patient");
                        }}
                      >
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
