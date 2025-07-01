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

  const token = localStorage.getItem("token");
  const roleId = localStorage.getItem("roleId");
  const UID = localStorage.getItem("userId");

  const { setToken } = useContext(AuthContext);

  const { data: session } = useSession();

  const [services, setServices] = useState<servicesArray>([]);

  const handleLogout = async () => {
    setToken(null);
    localStorage.clear();

    sessionStorage.clear();

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
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light fixed-top"
        id="navBarSection"
      >
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <button
              className="btn btn-outline-secondary d-lg-none me-3"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#mobileDrawer"
              aria-label="Toggle navigation"
            >
              ☰
            </button>
              <a className="navbar-brand mb-0 logo" href="/home">
        <span id="letter">M</span>ed<span id="letter">i</span>vo
      </a>
          </div>

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
                    href={token ? "/symptomChecker" : undefined}
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
                  <a className="nav-link" href="/allDoctors">
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
          <div className="d-flex align-items-center">
            {token ? (
              <>
                <button
                  type="button"
                  className="btn btn-link p-0 me-2"
                  onClick={() => route.push(`/profile/${UID}`)}
                  aria-label="Profile"
                >
                  <FaUserCircle size={30} color="#216ecf" />
                </button>
                <button
                  className="btn btn-primary btn-m"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <a className="btn btn-primary btn-m" href="/login">
                Login
              </a>
            )}
          </div>
        </div>
      </nav>

      <div className="offcanvas offcanvas-start" id="mobileDrawer">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">
            <strong>Menu</strong>
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul
            className="navbar-nav"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
            }}
          >
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
            {roleId === "1" && (
              <li className="nav-item">
                <a className="nav-link" href="/adminPanel">
                  Admin Panel
                </a>
              </li>
            )}
            <li className="nav-item">
              <a className="nav-link" href="/allDoctors">
                All Doctors
              </a>
            </li>
            {roleId === "2" && (
              <li className="nav-item">
                <a className="nav-link" href="/joinRequest">
                  Join Request
                </a>
              </li>
            )}
            <li className="nav-item">
              <a className="nav-link" href="/contact">
                Contact
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
              <ul className="dropdown-menu" aria-labelledby="servicesDropdown">
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
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navigation;
