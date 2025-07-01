'use client';
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import Symptoms from "../checker/Symptoms/Symptoms";
import axios from "axios";
import "./treatments.css";
import { useRouter } from 'next/navigation';
import Footer from "../../../components/footer"

const Treatments = () => {
  const router = useRouter()
  const [treatments, setTreatments] = useState<string[]>([]);
  const [hidden, setHidden] = useState(false);
  const [title, setTitle] = useState("");
  const { info, setInfo, symptoms, setSymptoms, conditions, setConditions } =
    useContext(AuthContext);
  const arr = symptoms.toString().split(",").join("/");

  const getDetails = () => {
    axios
      .get(`http://localhost:3000/api/diseases/` + arr)
      .then((res) => {
        console.log(res.data.data);
        setConditions(res.data.data);
        // console.log([...posts, res.data.jobs])
      })
      .catch((err) => {
        console.log(err);
      });
  };


  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div className="TreatmentsDiv">
      <div className="Treatments">
        <div className="ResultsTreatments">
          <p className="header"> Conditions that match your symptoms </p>
          <ul className="TreatmentsUl">
            {conditions.length === 0 ? (
              <p className="msgNoDiseaseTreatment">
                No Diseases please put correct symptoms{" "}
              </p>
            ) : Array.isArray(conditions) ? (
              conditions.map((ele, idx) => (
                <li
                  className="single_condition"
                  key={idx}
                  onClick={(e) => {
                    const condition = conditions[idx];
                    console.log(condition);
                    setTreatments(condition.treatments);
                    setTitle(condition.name);
                  }}
                >
                  <div className="detail" key={idx}>
                    {ele.name}
                  </div>{" "}
                  <div></div>
                </li>
              ))
            ) : null}
          </ul>
        </div>
        <div className="info">
          <div className="treatments_">
            <h3 className="titleDisease">{title}</h3>
          </div>
          {conditions.length === 0 ? (
            ""
          ) : (
            <>
              <div>
                <p className="para">
                  {" "}
                  <br></br>
                  Treatments{" "}
                  {Array.isArray(conditions)
                    ? treatments.map((ele, idx) => (
                        <li className="singleTreatment" key={idx}>
                          <div className="detail" key={idx}>
                            {ele}
                          </div>{" "}
                          <div></div>
                        </li>
                      ))
                    : null}
                </p>
              </div>
              <div className="gray-border"></div>
            </>
          )}
          {conditions.length === 0 ? (
            ""
          ) : (
            <>
              <br></br>

              <div className="questionDiv  ">
                {hidden ? <h5 className="thanks">Thank You</h5> : ""}
                <p className={`question ${hidden ? "hidden" : ""}`}>
                  Do you think you have this condition?
                </p>
                <div className="answers">
                  <button
                    className={`button ${hidden ? "hidden" : ""}`}
                    onClick={(e) => {
                      setHidden(true);
                    }}
                  >
                    Yes
                  </button>
                  <button
                    className={`button ${hidden ? "hidden" : ""}`}
                    onClick={(e) => {
                      setHidden(true);
                    }}
                  >
                    No
                  </button>
                  <button
                    className={`button ${hidden ? "hidden" : ""}`}
                    onClick={(e) => {
                      setHidden(true);
                    }}
                  >
                    Maybe
                  </button>
                </div>
              </div>
              <br></br>
              <div className="gray-border"></div>
            </>
          )}
          {conditions.length !== 0 ? (
            <div>
              <br></br>
              <h5 className="takeCareMsg">Take Care Of Yourself</h5>
              <ul>
                {" "}
                <li>
                  <strong>Adhere to medications and appointments</strong>:
                  Understand what each medication is for, follow dosing
                  precisely, and use reminders like pillboxes or apps. Keep
                  regular check-ups to adjust treatment and monitor progress
                </li>{" "}
                <li>
                  <strong>Eat a balanced diet and stay active</strong>: Fill
                  half your plate with fruits, vegetables, whole grains, and
                  lean proteins. Aim for moderate exercise—like walking or
                  yoga—for at least 150 minutes per week
                </li>{" "}
                <li>
                  <strong>Prioritize sleep and stress management</strong>: Get
                  7–8 hours of quality sleep each night. Use relaxation
                  techniques—deep breathing, meditation, or a warm bath—to ease
                  stress and boost healing
                </li>{" "}
                <li>
                  <strong>Monitor symptoms and vital signs</strong>: Keep a
                  diary or use apps to track measures like blood pressure,
                  glucose, symptoms, mood, and note any changes over time
                </li>{" "}
                <li>
                  <strong>Seek reliable health info and support</strong>: Ask
                  questions during visits, verify info with professionals (not
                  just Dr. Google), and share your journey with supportive
                  friends, family, or communities
                </li>{" "}
              </ul>
            </div>
          ) : (
            ""
          )}

          {/* <div className="symptom-details">
            <div className="test">
              <div className="infoTitle symptomTitle"> My Symptoms </div>
              <span className="infoDetails">
                {Array.isArray(symptoms)
                  ? symptoms.map((e, idx) => (
                      <div className="singleSymptom" key={idx}>
                        <p className="symptom" key={idx}>
                          {e}
                        </p>{" "}
                      </div>
                    ))
                  : null}
              </span>
            </div>
            
          </div> */}
        </div>
      </div>
       <div className="appointmentSectionHome">
        <div className="FeaturedServiceBannerModule-content">
          <small className="FeaturedServiceBannerModule-badge">New</small>
          <h2 className="FeaturedServiceBannerModule-title">
            Brighten your smile
          </h2>
          <p className="FeaturedServiceBannerModule-subtitle">
            Book your next dental appointment with ease
          </p>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={(e) => {
              router.push("/bookAppointment");
            }}
          >
            Find an Appointment
          </button>
        </div>
        <div className="FeaturedServiceBannerModule-image">
           <img
            src="/images/Book appointment image.png"
            alt=""
            loading="lazy"
          />
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Treatments;
