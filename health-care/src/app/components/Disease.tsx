"use client";

import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "./disease.css";
import Swal from "sweetalert2";

interface Disease {
  name: string;
  effectedBodyPart: string[];
  symptoms: string[];
  treatments: string[];
}

const Disease = () => {
  const [diseases, SetDiseases] = useState<Disease>({
    name: "",
    effectedBodyPart: [],
    symptoms: [],
    treatments: [],
  });
  const [success, setSuccess] = useState<boolean>(false);
  const { token, setToken, roleId, setRoleId, userId, setUserId } =
    useContext(AuthContext);
  const [msg, setMsg] = useState<string>("");

  const AddDisease = async () => {
    axios
      .post("http://localhost:3000/api/diseases", diseases)
      .then((res) => {
        setMsg("The Disease has been added");
        setSuccess(true);
        setTimeout(() => {
          setMsg("");
        }, 3000);
      })
      .catch((err) => {
        setSuccess(false);
        setMsg("The Disease has not been added");
        setTimeout(() => {
          setMsg("");
        }, 3000);
      });
  };

  return (
    <>
      <div className="DiseaseDiv">
        <div className="DiseaseSection">
          <input
            name="name"
            type="text"
            placeholder="Name"
            onChange={(e) => {
              SetDiseases({
                ...diseases,
                name: e.target.value,
              });
            }}
          />
          <input
            name="effectedBodyPart"
            className="form-control"
            aria-label="With textarea"
            placeholder="Effected Body Part"
            onChange={(e) => {
              const BodyPartArr = e.target.value;
              const arr: string[] = BodyPartArr.split(",");
              SetDiseases({
                ...diseases,
                effectedBodyPart: arr,
              });
            }}
          />

          <div className="input-group mb-3">
            <textarea
              name="symptoms"
              className="form-control"
              aria-label="With textarea"
              placeholder="Symptoms"
              onChange={(e) => {
                const symptomsArr = e.target.value;
                const arr: string[] = symptomsArr.split(",");
                SetDiseases({
                  ...diseases,
                  symptoms: arr,
                });
              }}
            ></textarea>
          </div>
          <div className="input-group mb-3">
            <textarea
              name="treatments"
              className="form-control"
              aria-label="With textarea"
              placeholder="Treatments"
              onChange={(e) => {
                const treatmentsArr = e.target.value;
                const arr: string[] = treatmentsArr.split(",");
                SetDiseases({
                  ...diseases,
                  treatments: arr,
                });
              }}
            ></textarea>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-light btn-md addDisease"
          onClick={AddDisease}
        >
          Add Disease
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

export default Disease;
