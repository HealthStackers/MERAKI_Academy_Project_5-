"use client";
import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import Link from "next/link";
import { AuthContext } from "../context/AuthContext";

const Navigation = () => {
  const { token, setToken } = useContext(AuthContext);

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div class="container-fluid">
          <button
            class="btn btn-outline-secondary d-lg-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileDrawer"
          >
            ☰
          </button>

          <a className="navbar-brand logo" href="#">
            <span id="letter">M</span>ed<span id="letter">i</span>vo
          </a>

          <div class="collapse navbar-collapse desktop-menu">
            <ul class="navbar-nav">
              <div className="partOneInNavBar">
                <li class="nav-item active">
                  <a class="nav-link" href="home">
                    Home
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="blogs">
                    Blogs
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="symptomChecker">
                    Symptom Checker
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="bmiCalculator">
                    BMI
                  </a>
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    Services
                  </a>
                  <ul class="dropdown-menu">
                    <li>
                      <a class="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Something else
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Contact
                  </a>
                </li>
              </div>
              <div className="partTwoInNavBar">
                <li className="loginAndRegister">
                  <li class="nav-item">
                    {" "}
                    <a href="login" class="nav-link" >
                      <button id="loginButtonInNavBar">Login</button>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="register" class="nav-link" >
                      <button id="registerButtonInNavBar">Register</button>
                    </a>
                  </li>
                </li>
              </div>
            </ul>
          </div>
          
        </div>
      </nav>

      <div class="offcanvas offcanvas-start" tabindex="-1" id="mobileDrawer">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title">Menu</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#">
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Features
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Pricing
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Dropdown link
              </a>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Something else
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navigation;
