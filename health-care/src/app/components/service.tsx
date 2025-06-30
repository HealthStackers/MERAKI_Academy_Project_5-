"use client";
import { service } from "@/models/lib/db/services/service";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

import './service.css'

const Service = () => {
  const { token, setToken, roleId, setRoleId, userId, setUserId } =
    useContext(AuthContext);

  const [image, setImage] = useState("");
  const [services, SetServices] = useState<service>({
    title: "",
    description: "",
    imageurl: "",
    doctor_id: Number(userId),
  });
  console.log(services);
  const uploadImage = () => {
    const data = new FormData();
    console.log("data", data);
    data.append("file", image);
    data.append("upload_preset", "JobSearch");
    data.append("cloud_name", "do0zwgmuh");
    data.append("resource_type", "image");
    fetch("https://api.cloudinary.com/v1_1/do0zwgmuh/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        SetServices({
          ...services,
          imageurl: data.secure_url,
        });
      })
      .catch((err) => console.log(err));
  };

  const [success, setSuccess] = useState<boolean>(false);

  const [msg, setMsg] = useState<string>("");

  const AddService = async () => {
    axios
      .post("http://localhost:3000/api/service", services)
      .then((res) => {
        setMsg("The Service has been Added");
        setTimeout(() => {
          setMsg("");
        }, 3000);
        Swal.fire({
          title: "the service Added!",
          text: "Your Service has been Added successfully.",
          icon: "success",
          confirmButtonText: "Okay",
        }).then(() => {
          location.reload();
        });
      })
      .catch((err) => {
        setSuccess(false);
        setMsg("The Service has been added");
        setTimeout(() => {
          setMsg("");
        }, 3000);
      });
  };

  return (
    <>
      <div className="ServiceDiv">
        <div className="ServiceSection">
          <input
            name="title"
            type="text"
            placeholder="Title"
            onChange={(e) => {
              SetServices({
                ...services,
                title: e.target.value,
              });
            }}
          />

          <div className="input-group mb-3">
            <textarea
              name="description"
              className="form-control"
              aria-label="With textarea"
              placeholder="Description"
              onChange={(e) => {
                SetServices({
                  ...services,
                  description: e.target.value,
                });
              }}
            ></textarea>
          </div>

          <input
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          ></input>
          <button
            type="button"
            className="btn btn-light btn-md addService"
            onClick={(e) => {
              uploadImage();
              // setTimeout(() => {
              //   window.location.reload();
              // }, 6000);
            }}
          >
            Upload Image
          </button>
          {/* <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            ></input>
          </div>
          <button
            className="submit"
            onClick={(e) => {
              Apply();
              uploadImage();
              setTimeout(() => {
                window.location.reload();
              }, 6000);
            }}>
             */}
        </div>
        <button
          type="button"
          className="btn btn-light btn-md addService"
          onClick={(e) => {
            AddService();
            uploadImage();
            // setTimeout(() => {
            //   window.location.reload();
            // }, 6000);
          }}
        >
          Add Service
        </button>
        {msg && (
          <div>
            {" "}
            <p className={success ? "success" : "failed"}>{msg}</p>
          </div>
        )}{" "}
      </div>
      
    </>
  );
};

export default Service;
