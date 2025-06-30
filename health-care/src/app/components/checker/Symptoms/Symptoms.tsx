/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./Symptoms.css";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "@/app/context/AuthContext";
import Footer from "../../../components/footer"


const Symptoms = () => {
  const inputRef = useRef(null);

  const { info, setInfo, symptoms, setSymptoms,activeIdx, setActiveIdx } = useContext(AuthContext);
  console.log(info);
  
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  console.log(symptoms);


  const handleAdd = () => {
    const newTag = inputRef.current.value.trim();
    if (newTag && !symptoms.includes(newTag)) {
      setSymptoms((prev) => [...prev, newTag]);
    }
    inputRef.current.value = "";
  };

 

  return (
    <div className="symptomsDiv">
      <div className="search-symptoms">
        <div className="enter-title"> What are your symptoms? </div>
        <div className="type-ahead" no-result-text="Sorry, no results.">
          <input
            ref={inputRef}
            type="text"
            className="form-control type-ahead-select taller"
            placeholder="Type your main symptom here"
            title=""
            autoComplete="off"
            onChange={(e) => {
              setInputValue(e.target.value);
              
            }}
          />
          <button className="AddSymptoms" type="button" onClick={handleAdd}>
            Add
          </button>
          <div className="TheSymptoms">
            <p className="MySymptoms">My Symptoms:</p>
            <div className="listSymptoms">
              <ul>
                {symptoms.map((tag, idx) => (
                  <>
                    <li key={idx} className="list">
                      <span className="tag">{tag}</span>
                      <span
                        key={idx}
                        title={`Remove ${tag}`}
                        role="button"
                        className="delete-icon"
                        onClick={(e) => {
                          //   tags.splice(idx, 1);
                          setSymptoms(
                            symptoms.filter((e, index) => {
                              console.log(index, idx);
                              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                              return index !== idx;
                            })
                          );
                          if (symptoms.length === 1) {
                            Swal.fire({
                              title: "No Symptoms is existing!",
                              text: "Please Add Symptoms.",
                              icon: "success",
                              confirmButtonText: "Okay",
                            }).then(() => {
                              window.location.reload();
                            });
                          }
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="14"
                          viewBox="0 0 10 14"
                        >
                          <path
                            fill-rule="nonzero"
                            d="M3.75 0l-.417 1h-2.5C.372 1 0 1.446 0 2v1h10V2c0-.554-.372-1-.833-1h-2.5L6.25 0h-2.5zM1 4l.7 9c.049.549.458 1 .9 1h4.8c.442 0 .851-.451.9-1L9 4H1z"
                          ></path>
                        </svg>
                      </span>
                    </li>
                    <hr></hr>
                  </>
                ))}
              </ul>
            </div>
          </div>
          <div className="navigationInChecker">
            <button className="nextButtonInChecker" onClick={()=>{
        setActiveIdx(0)
      }}> Previous</button>
      <button className="nextButtonInChecker" onClick={()=>{
        setActiveIdx(2)
      }}> Next</button>
          </div>
        </div>
        {/* <div className="validation-container fade-out">
          <span className="validation-text">false</span>
        </div> */}
      </div>
      <Footer/>
    </div>
  );
};

export default Symptoms;
