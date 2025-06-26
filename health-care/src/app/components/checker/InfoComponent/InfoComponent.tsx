"use client";
import React, { useContext, useState } from "react";
import "./InfoComponent.css";
import { AuthContext } from "@/app/context/AuthContext";

const InfoComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { info, setInfo, symptoms, setSymptoms,activeIdx, setActiveIdx } = useContext(AuthContext);

  console.log(info);
  return (
    <div className="InfoComponent">
      <div className="introSymptomChecker">
        <div className="TitleSymptomChecker">
          <p className="SymptomChecker">Symptom Checker</p>
          <span className="withBodyMap">WITH BODY MAP</span>
        </div>
        <p className="intro-text center">
          {" "}
          Identify possible conditions and treatment related to your symptoms.{" "}
        </p>
        <section className={`collapsible-section ${isOpen ? "active" : ""}`}>
          <button
            className="collapsible-btn"
            onClick={() => setIsOpen(!isOpen)}
          >
            This tool does not provide medical advice
            <span className="caret">▼</span>
          </button>
          <div className="collapsible-content">
            This tool is not intended to be a substitute for professional
            medical advice, diagnosis, or treatment. Always read the label
            before taking any over-the-counter (OTC) medications. The label
            identifies the active ingredient(s) and contains other important
            information including warnings about possible drug interactions and
            side effects. Always seek the advice of your physician or other
            qualified health provider with any questions you may have regarding
            a medical condition. Never disregard professional medical advice or
            delay in seeking it because of something you have read on WebMD! If
            you think you may have a medical emergency, call your doctor or 911
            immediately. WebMD does not recommend or endorse any specific
            products or services. Reliance on any information provided by WebMD
            is solely at your own risk.
            <p>Your detailed disclaimer …</p>
          </div>
        </section>
      </div>

      <form className="info-inputs">
        <div className="input-form-fields">
          <label htmlFor="age" className="label-text age">
            {" "}
            Age{" "}
          </label>
          <div className="input-field">
            <div className="webmd-input__div webmd-input-noLabel">
              <input
                className="webmd-input__inner"
                type="number"
                autoComplete="off"
                id="age"
                title="Age Input"
                aria-label="Enter search terms"
                onChange={(e) => {
                  setInfo((prev) => ({
                    ...prev,
                    age: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
        </div>
        <div className="input-form-fields">
          <label htmlFor="gender" className="label-text gender">
            {" "}
            Gender{" "}
          </label>
          <div id="gender">
            <button
              className="webmd-button webmd-button--primary webmd-button--medium male-button button-default"
              type="button"
              id="male"
              title="Male Button"
              value="Male"
              onClick={(e: React.MouseEvent<HTMLElement>) => {
                setInfo((prev) => ({
                  ...prev,
                  gender: "Male",
                }));
              }}
            >
              Male
            </button>
            <button
              className="webmd-button webmd-button--primary webmd-button--medium female-button button-default"
              type="button"
              id="female"
              title="Female Button"
              value="Female"
              onClick={(e: React.MouseEvent<HTMLElement>) => {
                setInfo((prev) => ({
                  ...prev,
                  gender: "Female",
                }));
              }}
            >
              Female
            </button>
          </div>
        </div>
         <button className="nextButtonInChecker" onClick={()=>{
        setActiveIdx(1)
      }}> Next</button>
      </form>
     
    </div>
  );
};

export default InfoComponent;
