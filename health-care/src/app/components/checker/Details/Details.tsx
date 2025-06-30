"use client"
import React, { useContext, useEffect, useState } from "react";
import "./details.css";
import { AuthContext } from "@/app/context/AuthContext";
import Symptoms from "../checker/Symptoms/Symptoms";
import Footer from "../../../components/footer"

import axios from "axios";

const Details = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { info, setInfo, symptoms, setSymptoms, conditions, setConditions,setActiveIdx } =
    useContext(AuthContext);
  const arr = symptoms.toString().split(",").join("/");
  console.log(arr);
  console.log(conditions);
 
  const getDetails = () => {
    axios
      .get(`http://localhost:3000/api/diseases/` + arr)
      .then((res) => {
        console.log(res.data.data);
        setConditions(res.data.data);
      
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div className="DetailsDiv">
      <div className="Details">
        <div className="Results">
          <p className="header"> Conditions that match your symptoms </p>
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
          <ul className="detailsUl">
            {conditions.length === 0 ? (
              <p className="msgNoDisease">
                No Diseases please put correct symptoms{" "}
              </p>
            ) : Array.isArray(conditions) ? (
              conditions.map((ele, idx) => (
                <li
                  className="singleDetail"
                  key={idx}
                  onClick={(e) => {
                    const condition = conditions[idx];
                    console.log(condition);
                    setTitle(condition.name);
                    setDescription(condition.description);
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

        {conditions.length === 0 ? (
          ""
        ) : (
          <div className="info">
            <div className="descriptionDiv">
              <h3>{title}</h3>
              <p className="description">{description}</p>
            </div>
            {description ? <div className="gray-border"></div>: ""}
          </div>
        )}

      </div>
       <div className="navigationInCheckerInDetials">
            <button className="nextButtonInChecker" onClick={()=>{
        setActiveIdx(2)
      }}> Previous</button>
      <button className="nextButtonInChecker" onClick={()=>{
        setActiveIdx(4)
      }}> Next</button>
          </div>
          <Footer/>
    </div>
  );
};

export default Details;
