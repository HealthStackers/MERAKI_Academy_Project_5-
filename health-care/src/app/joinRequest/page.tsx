"use client";
import axios from "axios";
import React from "react";
import { useEffect, useState,useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./joinRequest.css";
function joinRequest() {
  const [token, settoken] = useState(localStorage.getItem("token") || null);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [clinicName, setClinicName] = useState<string>("");
  const [specialization, setSpecialization] = useState<string>("");
  const [cvUrl, setCvUrl] = useState<string>("");
  const [file, setFile] = useState(null);
  const [showAlertMessage, setShowAlertMessage] = useState<boolean>(false)
  const [alertMessage, setAlertMessage] = useState<string>("")
  const { roleId, setRoleId, userId, setUserId } = useContext(AuthContext);

  const newRequest = () => {
    if (!file) return alert("Select a PDF first");
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploadCv");
    data.append("resource_type", "raw");
    fetch("https://api.cloudinary.com/v1_1/dcq4kfehy/raw/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((json) => {
        setCvUrl(json.secure_url);
        axios
          .post(
            "http://localhost:3000/api/joinRequest",
            {
              firstName: firstName,
              lastName: lastName,
              email: email,
              city: city,
              clinicName: clinicName,
              specialization: specialization,
              cvUrl:json.secure_url,
              profilePicture:"sagkgsk",
              doctorId:userId
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((result) => {
            console.log("json.secure_url: ",json.secure_url);
            
            console.log("cvUrl: ",cvUrl);
            
console.log(result);

          })
          .catch((error) => {
            console.log(error);
            
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="joinRequestPage">
      <div className="joinRequestPageParts">
        <h3 className="headInJoinRequestPage">*Join MEDIVO Community.</h3>
        <p className="textInJoinRequestPage">
          {" "}
          Join our platform and start helping patients while growing your
          medical presence online.
        </p>

        <div className="nameInputSection">
          <div className="firstNameSection">
            <div className="textInInputInJoinRequest">First Name</div>
            <input
              placeholder="First Name"
              className="InputInJoinRequest"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            ></input>
          </div>
          <div className="lastNameSection">
            <div className="textInInputInJoinRequest">Last Name</div>
            <input
              placeholder="Last Name"
              className="InputInJoinRequest"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            ></input>
          </div>
        </div>

        <div className="emailSection">
          <div className="textInInputInJoinRequest">Email</div>
          <input
            placeholder="Email"
            className="InputInJoinRequest"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </div>

        <div className="citySection">
          <div className="textInInputInJoinRequest">City</div>
          <input
            placeholder="City"
            className="InputInJoinRequest"
            onChange={(e) => {
              setCity(e.target.value);
            }}
          ></input>
        </div>

        <div className="clinicNameSection">
          <div className="textInInputInJoinRequest">Clinic Name</div>
          <input
            placeholder="Clinic Name"
            className="InputInJoinRequest"
            onChange={(e) => {
              setClinicName(e.target.value);
            }}
          ></input>
        </div>

        <div className="specializationSection">
          <div className="textInInputInJoinRequest">Specialization</div>
          <input
            placeholder="Specialization"
            className="InputInJoinRequest"
            onChange={(e) => {
              setSpecialization(e.target.value);
            }}
          ></input>
        </div>

        <div className="cvSection">
          <div className=" uploadYourCvText"> Upload Your CV</div>
          <input
            type="file"
            accept=".pdf"
            className="uploadCv"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          ></input>
        </div>
        <button
          className="submitButtonInJoinRequest"
          onClick={() => {
            newRequest();
          }}
        >
          {" "}
          Submit{" "}
        </button>
      </div>
    </div>
  );
}

export default joinRequest;
