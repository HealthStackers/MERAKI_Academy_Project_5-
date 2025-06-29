"use client";
import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { AuthContext } from "../context/AuthContext";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Navigation = () => {
  const route = useRouter();
  
   type servicesArray = {
    service_id: number;
    service_title: string;
    imageurl: string;
    description: string;
  }[];

  const { setToken } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const roleId = localStorage.getItem("roleId");
  const UID = localStorage.getItem("userId");
  const { data: session } = useSession();


  const [services, setServices] = useState<servicesArray>([]);

  const handleLogout = async () => {
    setToken(null);
    localStorage.clear();

    sessionStorage.clear()


    await signOut({ redirect: true, callbackUrl: "/login" }); // Redirects to login page after logout
  };

  // const [token, settoken] = useState(localStorage.getItem("token") || null);

  const GetServices = async () => {
    axios
      .get("http://localhost:3000/api/service/withBlogs")
      .then((res) => {
        setServices(res.data.data);
      })
      .catch((err) => {});
  };

  const profile = () => {
    route.push(`/profile/${UID}`);
  };

  useEffect(() => {
    GetServices();
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
                  <a className="nav-link" href="/home">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${token ? "" : "disabled"}`}
                    href={token ? "symptomChecker" : undefined}
                    aria-disabled={!token}
                    onClick={token ? undefined : (e) => e.preventDefault()}
                  >
                    Symptom Checker
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/bmiCalculator">
                    BMI
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="servicesDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Services
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="servicesDropdown"
                  >
                    {services.map((ele) => (
                      <li key={ele.service_id}>
                        <a
                          className="dropdown-item"
                          href={`/blogs/${ele.service_id}`}
                        >
                          {ele.service_title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>

                {roleId === "1" && (
                  <li className="nav-item">
                    <a className="nav-link" href="/adminPanel">
                      Admin Panel
                    </a>
                  </li>
                )}
                <li className="nav-item">

                  

                  <a className="nav-link" href="allDoctors">
                    All Doctors

                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/contact">
                    Contact
                  </a>
                </li>

                {roleId === "2" && (
                  <li className="nav-item">
                    <a className="nav-link" href="/joinRequest">
                      Join Request
                    </a>
                  </li>
                )}
              </div>
            </ul>
          </div>
          {token ? (
            <>
              <button
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  marginRight: "20px",
                }}
                onClick={(e) => {
                  profile();
                }}
              >
                <FaUserCircle
                  size={30}
                  color="#343b48"
                  style={{ marginRight: "8px" }}
                />
              </button>
              <button
                type="button"
                data-mdb-button-init
                data-mdb-ripple-init
                className="btn btn-primary btn-m logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              type="button"
              data-mdb-button-init
              data-mdb-ripple-init
              className="btn btn-primary btn-m login"
            >
              <a className="nav-link" href="login">
                Login
              </a>
            </button>
          )}
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
