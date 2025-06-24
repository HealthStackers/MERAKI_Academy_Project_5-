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

  return (
    <div className="bmiPage">
      <div className="bmiHeaderAndText">
        <h2 className="bmiHeader">Calculate Your BMI</h2>
        <p className="bmiTesxt">
          Body mass index (BMI) is a measure of body fat based on height and
          weight that applies to adult men and women. Your BMI is just one piece
          of the puzzle. It’s based on height and weight but doesn’t take into
          account your muscle mass, bone density, or body composition. Your
          healthcare provider will consider whether your BMI is too high or too
          low for you.
        </p>
      </div>
      <div className="bmiCalculatorSection">
        <div className="bmiBoxes">
          <div className="bmiCalculations">
            <h3 className="bmiCalculatorHeaderSection">
              {" "}
              Adult BMI Calculator{" "}
            </h3>
            <div className="calculationBox">
              <div className="heightSection">
                <div className="heightText">Height</div>
                <div className="heightInputAndUnit">
                  <input
                    className="heightInput"
                    onChange={(e) => {
                      setHeight(+e.target.value);
                    }}
                  ></input>
                  <div className="heightUnit">Centimeters (cm)</div>
                </div>
              </div>
              <div className="weightSection">
                <div className="weightSectionText"> Weight</div>
                <div className="weightInputAndUnit">
                  <input
                    className="weightSectionInput"
                    onChange={(e) => {
                      setWeight(+e.target.value);
                    }}
                  ></input>
                  <div className="weightUnit">Kilograms (kg)</div>
                </div>
              </div>

              <button
                className="calculateInBmiPage"
                onClick={() => {
                  handleCalculate();
                }}
              >
                Calculate
              </button>
            </div>
          </div>

          <div className="bmiCategories">
            <h3 className="bmiCategoriesHeader">BMi Categories</h3>{" "}
            {bmiResult !== 0 && (
              <div className="bmiResult">Your BMI Result is: {bmiResult}</div>
            )}
            <div className="bmiCategoriesBox">
              <div className="bmiCategory">
                <span className="bmiCategoryTitle">BMI Category</span>
                <span className="bmiRangeTitle">BMI Range</span>
              </div>
              <div className="underweight" id={underweight}>
                <span className="underweightText">Underweight</span>
                <span className="underweightNumber">Below 18.5</span>
              </div>
              <div className="healthy" id={healthy}>
                <span className="healthyText">Healthy</span>
                <span className="healthyNumber">18.5 – 24.9</span>
              </div>

              <div className="overweight" id={overweight}>
                <span className="overweightText">Overweight</span>
                <span className="overweightNumber">25.0 – 29.9</span>
              </div>

              <div className="obesity" id={obesity}>
                <span className="obesityText">Obesity</span>
                <span className="obesityNumber">30 or Above</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default bmiCalculator;
