"use client";
import React from "react";
import axios, { all } from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";
import "./handleJoinRequests.css";

function HandleJoinRequest() {
  interface allRequestsType {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    city: string;
    clinicname: string;
    specialization: string;
    cvurl: string;
    profilepictureurl: string;
    status: string;
    doctor_id: number;
  }

  const [token, settoken] = useState(localStorage.getItem("token") || null);
  const [allRequests, setAllRequests] = useState<allRequestsType[]>([]);
  const [requestStatus, setRequestStatus] = useState<string>("");
  const [showAlertMessage, setshowAlertMessage] = useState<number>(0);
  const [alertMessage, setAlertMessage] = useState<string>("");

  const GetAllRequests = () => {
    axios
      .get<allRequestsType[]>("http://localhost:3000/api/joinRequest", {
        params: {
          status: "pending",
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log("result.data: ", result.data.data);
        setAllRequests(result.data.data);

      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditStatus = (requestId: number, newStatus: string) => {
    console.log("requestId: ", requestId);
    console.log("newStatus: ", newStatus);

    axios
      .put(
        "http://localhost:3000/api/joinRequest",
        {
          status: newStatus,
        },
        {
          params: {
            id: requestId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        if (newStatus === "rejected") {
          setshowAlertMessage(1);
          setAlertMessage("The Reqest has been rejected");
          setTimeout(() => {
            setshowAlertMessage(0);
          }, 2000);
        } else {
          setshowAlertMessage(2);
          setAlertMessage("The Reqest has been approved");
          setTimeout(() => {
            setshowAlertMessage(0);
          }, 2000);
         // window.location.reload();
        }

        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const HandleUpdateRole = (id: number) => {
    const doctorProfilePicture= allRequests.find((ele)=>{return ele.doctor_id===id})?.profilepictureurl
    console.log("doctorProfilePicture: ",doctorProfilePicture);
    
    axios
      .put(`http://localhost:3000/api/users/profile/` + id, {
        role_id: 3,
        userprofilepic: doctorProfilePicture,
      })
      .then((result) => {
        console.log("result in update role: ", result);
      })
      .catch((error) => {
        console.log("error in update role: ", error);
      });
  };

  useEffect(() => {
    GetAllRequests();
  }, [GetAllRequests]);

  console.log("allRequests: ", allRequests);

  return (
    <div className="joinRequstPageInAdminPanel">
      <div className="AlljoinRequstsInAdminPanel">
        {allRequests.map((ele, i) => {
          return (
            <div key={i} className="joinRequstInAdminPanel">
              <img
                className="imageInSearchSectionss"
                src={ele.profilepictureurl}
                alt="Image"
                width={150}
                height={100}
              />
              <div className="applicationDetails">
                <div className="nameInJoinRequestInAdminPanel">
                  Dr. {ele.firstname} {ele.lastname}
                </div>
                <div>
                  {" "}
                  <strong>Specialization:</strong> {ele.specialization}{" "}
                </div>
                <div>
                  <strong>City:</strong> {ele.city}{" "}
                </div>
                <div>
                  <strong>Clinic Name:</strong> {ele.clinicname}{" "}
                </div>
                <div>
                  <strong>Email:</strong> {ele.email}{" "}
                </div>
                <div>
                  <strong>Doctor CV:</strong> <a href={ele.cvurl}>View</a>{" "}
                </div>
                
              </div>
              <div className="buttonsInHandleJoinRequest">
                <button
                  className="approvedButtonInJoinRequest"
                  onClick={(e) => {
                    handleEditStatus(ele.id, "approved");
                    HandleUpdateRole(ele.doctor_id);
                  }}
                >
                  {" "}
                  Approve{" "}
                </button>
                <button
                  className="rejectedButtonInJoinRequest"
                  onClick={(e) => {
                    handleEditStatus(ele.id, "rejected");
                  }}
                >
                  {" "}
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {showAlertMessage === 1 && (
        <div className="alertMessageRejected">{alertMessage}</div>
      )}
      {showAlertMessage === 2 && (
        <div className="alertMessageApproved">{alertMessage}</div>
      )}
    </div>
  );
}

export default HandleJoinRequest;
