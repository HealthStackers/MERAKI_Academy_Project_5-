"use client";
import React, { useContext, useEffect, useState } from "react";
import "./conditions.css";
import { AuthContext } from "@/app/context/AuthContext";
import Symptoms from "../Symptoms/Symptoms";
import axios from "axios";

const Conditions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { info, setInfo, symptoms, setSymptoms, conditions, setConditions } =
    useContext(AuthContext);
  const arr = symptoms.toString().split(",").join("/");
  console.log(arr);
  console.log(conditions);
  //   const [currentComponent, setCurrentComponent] = useState('symptoms');

  //   const handleSwitch = (component) => {
  //     setCurrentComponent(component);
  //   };
  //http://localhost:3000/api/diseases/diarrhea/body aches

  const getConditions = () => {
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
    getConditions();
  }, []);

  return (
    <div className="conditionsDiv">
      {(symptoms.length === 1 &&  conditions.length !== 0)? (
        <p className="warning">
          You received few matches. Try adding more symptoms to improve your
          results.
        </p>
      ) : (
        ""
      )}

      <div className="conditions">
        <div className="TheResults">
          <h3 className="heading"> Conditions that match your symptoms </h3>
          <section className={`collapsible-section ${isOpen ? "active" : ""}`}>
            <button
              className="collapsible-btn"
              onClick={() => setIsOpen(!isOpen)}
            >
              UNDERSTANDING YOUR RESULTS
              <span className="caret">▼</span>
            </button>
            <div className="collapsible-content">
              We try to show how well the symptoms you entered match the
              symptoms of each condition. It’s not the likelihood of having the
              condition Just because a condition is listed here, doesn’t mean
              that you have it. Some of the conditions on this list are less
              frequently diagnosed. Talk to your doctor to understand what your
              symptoms may mean.
            </div>
          </section>
          <ul className="conditionUl">
            {conditions.length === 0 ? (
              <p className="msgNoDisease">No Diseases please put correct symptoms </p>
            ) : Array.isArray(conditions) ? (
              conditions.map((e, idx) => (
                <li className="singleCondition" key={idx}>
                  <div className="condition" key={idx}>
                    {e.name}
                  </div>{" "}
                  <div></div>
                </li>
              ))
            ) : null}
          </ul>
        </div>
        <div className="info-panel">
          <div className="details">
            <div className="gender-details">
              <span className="infoTitle">Gender</span>
              <span className="infoDetails">{info.age}</span>
            </div>
            <div className="age-details">
              <span className="infoTitle">Age</span>
              <span className="infoDetails">{info.gender}</span>
            </div>
            <div>
              <span className="edit-link"> Edit </span>
            </div>
          </div>
          <div className="border"></div>
          <div className="symptom-details">
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
            <div>
              <span className="edit-link" onClick={(e) => {}}>
                Edit
              </span>
              {/* handleSwitch('symptoms')
              {currentComponent === "symptoms" && <Symptoms />} */}
              {/* {currentComponent !== "conditions" && <Conditions />} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conditions;
