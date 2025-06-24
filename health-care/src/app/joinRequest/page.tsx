"use client";
import axios from "axios";
import React from "react";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
                setAlertMessage("You Request has been submitted successfully")
                setShowAlertMessage(true)
                setTimeout(() => {
                setShowAlertMessage(false)
              }, 2000);
                console.log("json.secure_url: ", json.secure_url);

                console.log("cvUrl: ", cvUrl);

                setTimeout(() => {
                 location.reload()
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
        <div className="emailAndPictureInputSection">
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

          <div className="profilePictureSection">
            <div className=" uploadProfilePictureText">
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
            if (localStorage.getItem("submittedJoinRequest") === "true") {
              console.log("test Alread con");
              
              setShowAlertMessage(true)
              setAlertMessage("You already submitted a join request")
              setTimeout(() => {
                setShowAlertMessage(false)
                router.push("/home");
              }, 2000);
              
            } else {
              newRequest();
            }
          }}
        >
          {" "}
          Submit{" "}
        </button>
      </div>
      <Image
        className="imageInJoinRequestPage"
        src="/images/imageInJoinRequestPage.JPEG"
        alt="book An Apointment Image"
        width={600}
        height={400}
      />
      {showAlertMessage && <div className="alertMessageApproved">{alertMessage}</div>}
    </div>
  );
}

export default joinRequest;
