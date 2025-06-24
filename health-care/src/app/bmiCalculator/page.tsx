
"use client";
import React, { useState } from "react";
import axios from "axios";
import "./bmicalculator.css";
function bmiCalculator() {
  const [height, setHeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [bmiResult, setBmiResult] = useState<number>(0);

  const [underweight, setUnderweight] = useState("");
  const [healthy, setHealthy] = useState("");
  const [overweight, setOverweight] = useState("");
  const [obesity, setObesity] = useState("");

  console.log("height: ", height);
  console.log("weight: ", weight);
  console.log("result: ", (weight / (height * height)) * 10000);
  console.log("user_id: ", localStorage.getItem("userId"));

  const handleCalculate = () => {
    console.log("height: ", height);
    console.log("weight: ", weight);
    console.log("result: ", (weight / (height * height)) * 10000);
    console.log("user_id: ", localStorage.getItem("userId"));
    axios
      .post("http://localhost:3000/api/bmi", {
        height: height,
        weight: weight,
        age: null,
        gender: null,
        result: Number(((weight / (height * height)) * 10000).toFixed(1)),
        user_id: localStorage.getItem("userId"),
      })
      .then((result) => {
        console.log(result.data[0].result);
        setBmiResult(result.data[0].result);
        const checkResult: number = result.data[0].result;
        console.log("checkResult: ", checkResult);

        if (checkResult < 18.5) {
          setUnderweight("underweight");
          setHealthy("");
          setOverweight("");
          setObesity("");
        } else if (checkResult > 18.5 && checkResult < 24.9) {
          setHealthy("healthy");
          setUnderweight("");
          setOverweight("");
          setObesity("");
        } else if (checkResult > 24.9 && checkResult < 29.9) {
          setOverweight("overweight");
          setUnderweight("");
          setHealthy("");

          setObesity("");
        } else if (checkResult > 30) {
          setObesity("obesity");
          setUnderweight("");
          setHealthy("");
          setOverweight("");
        }

        console.log(healthy);
      })
      .catch((error) => {
        console.log(error);
      });
  };



export default BmiCalculator;

