"use client";
import React, { useState } from "react";
import "./symptomChecker.css";
import InfoComponent from "../components/checker/InfoComponent/InfoComponent";
import Symptoms from "../components/checker/Symptoms/Symptoms";
import Conditions from "../components/checker/Conditions/Conditions";
import Details from "../components/checker/Details/Details";
import Treatments from "../components/checker/Treatments/Treatments";

const SymptomChecker = () => {
  
  const [activeIdx, setActiveIdx] = useState(0); 
   const steps = [
    { label: "INFO", component: <InfoComponent /> },
    { label: "SYMPTOMS", component: <Symptoms/> },
    { label: "CONDITIONS", component: <Conditions /> },
    { label: "DETAILS", component: <Details /> },
    { label: "TREATMENTS", component: <Treatments /> },
  ];
  console.log(activeIdx);
  return (
    <>
      <div className="SymptomCheckerDiv">
       
        <div className="navbar-container">
          <ul className="navbarChecker">
            {steps.map((step, idx) => {
              const isVisited = idx <= activeIdx;
              const isActive = idx === activeIdx;
              console.log(idx);
              return (
                <li
                  key={step.label}
                  className={`navbar-item ${isVisited ? "visited" : ""} ${
                    isActive ? "active" : ""
                  }`}
                >
                  <a href="#" onClick={() => setActiveIdx(idx)}>
                    <span className="menuChecker">{step.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="symptoms-page">
         {steps[activeIdx].component}
      </div>
    </>
  );
};

export default SymptomChecker;
