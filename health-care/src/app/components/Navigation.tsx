"use client";
import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import Link from "next/link";
import { AuthContext } from "../context/AuthContext";
import { useSession } from "next-auth/react";

const Navigation = () => {
  const { data: session } = useSession();
  const { roleId, setRoleId, userId, setUserId } = useContext(AuthContext);

  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showJoinRequest, setShowJoinRequest] = useState(false);
  console.log("roleId: ", roleId);
  const [token, settoken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    const roleId = localStorage.getItem("roleId");
    if (roleId !== null) {
      if (+roleId === 1) {
        setShowAdminPanel(true);
        setShowJoinRequest(false);
      } else if (+roleId === 2) {
        setShowAdminPanel(false);
        setShowJoinRequest(true);
      } else if (+roleId === 3) {
        setShowAdminPanel(false);
        setShowJoinRequest(false);
      }
    }
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <button
            className="btn btn-outline-secondary d-lg-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileDrawer"
          >
            ☰
          </button>

          <a className="navbar-brand logo" href="/home">
            <span id="letter">M</span>ed<span id="letter">i</span>vo
          </a>

          <div className="collapse navbar-collapse desktop-menu">
            <ul className="navbar-nav">
              <div className="partOneInNavBar">
                <li className="nav-item active">
                  <a className="nav-link" href="home">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="blogs">
                    Blogs
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="symptomChecker">
                    Symptom Checker
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="bmiCalculator">
                    BMI
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    Services
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else
                      </a>
                    </li>
                  </ul>
                </li>
                {showAdminPanel && (
                  <li className="nav-item">
                    <a className="nav-link" href="adminPanel">
                      Admin Panel
                    </a>
                  </li>
                )}
                {showJoinRequest && (
                  <li className="nav-item">
                    <a className="nav-link" href="joinRequest">
                      Join Request
                    </a>
                  </li>
                )}
              </div>
              {!token && (
                <div className="partTwoInNavBar">
                  <li className="loginAndRegister">
                    <li className="nav-item">
                      {" "}
                      <a href="login" className="nav-link">
                        <button id="loginButtonInNavBar">Login</button>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="register" className="nav-link">
                        <button id="registerButtonInNavBar">Register</button>
                      </a>
                    </li>
                  </li>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div className="offcanvas offcanvas-start" id="mobileDrawer">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Menu</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Pricing
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Dropdown link
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
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
