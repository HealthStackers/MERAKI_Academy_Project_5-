import React from "react";

import "./bmicalculator.css";
function BmiCalculator() {
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
                  <input className="heightInput"></input>
                  <div className="heightUnit">Centimeters (cm)</div>
                </div>
              </div>
              <div className="weightSection">
                <div className="weightSectionText"> Weight</div>
                <div className="weightInputAndUnit">
                  <input className="weightSectionInput"></input>
                  <div className="weightUnit">Kilograms (kg)</div>
                </div>
              </div>
              <button className="calculateInBmiPage">Calculate</button>
            </div>
          </div>

          <div className="bmiCategories">
            <h3 className="bmiCategoriesHeader">BMi Categories</h3>
            <div className="bmiCategoriesBox">
             <div className="bmiCategory">
              <div className="bmiCategoryTitle">BMI Category</div>
              <div className="bmiRangeTitle">BMI Range</div>
            </div>
            <div className="underweight">
              <div className="underweightText">Underweight</div>
              <div className="underweightNumber">Below 18.5</div>

            </div>
            <div className="healthy">
              <div className="healthyText">Healthy</div>
              <div className="healthyNumber">18.5 – 24.9</div>
            </div>

            <div className="overweight">
              <div className="overweightText">Overweight</div>
              <div className="overweightNumber">25.0 – 29.9</div>
            </div>

            <div className="obesity">
              <div className="obesityText">Obesity</div>
              <div className="obesityNumber">30.0 or above</div>
            </div>
            </div>
            

          </div>
        </div>
      </div>
    </div>
  );
}

export default BmiCalculator;

