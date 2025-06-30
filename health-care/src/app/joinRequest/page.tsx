/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import axios from "axios";
import React from "react";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Footer from "../components/footer"
import "./joinRequest.css";
function joinRequest() {
  const router = useRouter();
  const [token, settoken] = useState(localStorage.getItem("token") || null);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [clinicName, setClinicName] = useState<string>("");
  const [specialization, setSpecialization] = useState<string>("");
  const [cvUrl, setCvUrl] = useState<string>("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [showAlertMessage, setShowAlertMessage] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
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
        const cvSecureUrl = json.secure_url;
        const data = new FormData();
        if (image) data.append("file", image);
        data.append("upload_preset", "uploadCv");
        data.append("resource_type", "image");
        fetch("https://api.cloudinary.com/v1_1/dcq4kfehy/image/upload", {
          method: "POST",
          body: data,
        })
          .then((res) => res.json())
          .then((json) => {
            setImageUrl(json.secure_url);
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
                  cvUrl: cvSecureUrl,
                  profilePicture: json.secure_url,
                  doctorId: userId,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then((result) => {
                localStorage.setItem("submittedJoinRequest", "true");
                setAlertMessage("You Request has been submitted successfully");
                setShowAlertMessage(true);
                setTimeout(() => {
                  setShowAlertMessage(false);
                }, 2000);
                console.log("json.secure_url: ", json.secure_url);

                console.log("cvUrl: ", cvUrl);

                setTimeout(() => {
                  location.reload();
                }, 3000);
              })
              .catch((error) => {
                console.log(error);
              });
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmit = () => {
    if (localStorage.getItem("submittedJoinRequest") === "true") {
      setShowAlertMessage(true);
      setAlertMessage("You already submitted a join request");
      setTimeout(() => {
        setShowAlertMessage(false);
        router.push("/home");
      }, 1000);
    } else {
      newRequest();
    }
  };
  return (
    <div className="joinRequestPageContainer">
      <div className="joinRequestPageParts">
        <h3 className="headInJoinRequestPage">
          Become Part of Medivo – “Where Trust Meets Innovation”.
        </h3>
        <p className="textInJoinRequestPage">
          {" "}
          Join our platform and start helping patients while growing your
          medical presence online.
        </p>

        <section className="JoinRequestPage">
          <div className="containerJoinRequest">
            <div className="titleJoinRequest">Join as Doctor</div>
            <div className="content">
              <div className="user-JoinRequest">
                <div className="input-box">
                  <span className="details">First Name</span>
                  <input
                    className="inputInJoinRequest"
                    name="firstName"
                    type="text"
                    placeholder="Enter your First Name"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Last Name</span>
                  <input
                    className="inputInJoinRequest"
                    name="lastName"
                    type="text"
                    placeholder="Enter your Last Name"
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Email</span>
                  <input
                    className="inputInJoinRequest"
                    name="email"
                    type="text"
                    placeholder="Enter your Email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">City</span>
                  <input
                    className="inputInJoinRequest"
                    name="city"
                    type="text"
                    placeholder="Enter your City"
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Clinic Name</span>
                  <input
                    className="inputInJoinRequest"
                    name="clinicName"
                    type="text"
                    placeholder="Enter your Clinic Name"
                    onChange={(e) => {
                      setClinicName(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Specialization</span>
                  <input
                    className="inputInJoinRequest"
                    name="specialization"
                    type="specialization"
                    placeholder="Enter your Specialization"
                    onChange={(e) => {
                      setSpecialization(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="profilePictureSection">
                <div className="uploadProfilePictureText">
                  {" "}
                  Upload Profile Picture
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="uploadCv"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
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

              <button className="submitButtonInJoinRequest" onClick={onSubmit}> Submit </button>

              {showAlertMessage && (
                <div className="alertMessageApproved">{alertMessage}</div>
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer/>
    </div>
  );
}

export default joinRequest;
