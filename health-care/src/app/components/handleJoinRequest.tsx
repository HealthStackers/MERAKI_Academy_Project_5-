"use client";
import React from "react";
import axios from "axios";
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
  }
  const [token, settoken] = useState(localStorage.getItem("token") || null);
  const [allRequests, setAllRequests] = useState<allRequestsType[]>([]);
  const [requestId, setRequestId] = useState<number>(0);
  const [requestStatus, setRequestStatus] = useState<string>("");

  useEffect(() => {
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
  }, []);

  console.log("allRequests: ", allRequests);

  const handleEditStatus = (newStatus:string) => {
   
    console.log("requestId: ",requestId);
    
    console.log("newStatus: ",newStatus);
    
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
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="joinRequstPageInAdminPanel">
      <div className="AlljoinRequstsInAdminPanel">
        {allRequests.map((ele, i) => {
          return (
            <div key={i} className="joinRequstInAdminPanel">
              <div>
                Name: {ele.firstname} {ele.lastname}
              </div>
              <div>Specialization: {ele.specialization} </div>
              <div>City: {ele.city} </div>
              <div>Clinic Name: {ele.clinicname} </div>
              <div>Email: {ele.email} </div>
              <a href={ele.cvurl}>CV</a>
              <img
                      className="imageInSearchSectionss"
                src={ele.profilepictureurl} 
                alt="Image"
                width={200}
                height={120}
              />
              <div className="buttonsInHandleJoinRequest">
                <button className="" onClick={(e)=>{
                    setRequestId(ele.id)
                    handleEditStatus("approved")
                }}> Approved </button>
                <button onClick={(e)=>{
                    setRequestId(ele.id)
                    handleEditStatus("rejected")
                }}> Rejected</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HandleJoinRequest;
