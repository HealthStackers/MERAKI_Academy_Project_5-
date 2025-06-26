"use client";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navigation from "@/app/components/Navigation";
import "./home.css";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthContext } from "../context/AuthContext";
=======
import axios from "axios";


const Home = () => {
  const handleAction = () => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/bookAppointment");
    } else {
      toast.error("Please log in or register to access this feature");
    }
  };

  const { data: session } = useSession();
  const router = useRouter();

  const [test, setTest] = useState("");
  const {
    searchByLocation,
    setSearchByLocation,
    searchBySpecialization,
    setSearchBySpecialization,
    searchLocationValue,
    setSearchLocationValue,
    searchSpecializationValue,
    setSearchSpecializationValue,
  } = useContext(AuthContext);

  console.log(
    "searchBySpecialization: ",
    searchBySpecialization,
    "searchSpecializationValue: ",
    searchSpecializationValue
  );
  console.log(
    "searchByLocation: ",
    searchByLocation,
    "searchLocationValue: ",
    searchLocationValue
  );
=======
  const [services, setServices] = useState<string[]>([]);
console.log(services)
  const GetServices = async () => {
    axios
      .get("http://localhost:3000/api/service/withBlogs")
      .then((res) => {
        setServices(res.data.data);
      })
      .catch((err) => {});
  };


  useEffect(() => {
    GetServices();
    const isReload = sessionStorage.getItem("isReload");
    if (session) {
      localStorage.setItem("roleId", session.user.role_id.toString());
      localStorage.setItem("email", session.user.email);
      localStorage.setItem("userId", session.user.id.toString());
      localStorage.setItem("token", session.user.token);
    }
    if (!isReload) {
      sessionStorage.setItem("isReload", "true");
      window.location.reload();
    }
  }, []);

  return (
    <>
      <Navigation />
      <div>
      <div className="mastHead">

        <span className="headingInMastHead">
          More visibility and a better patient experience
        </span>
        <p className="headTextInMastHead">
          {" "}
          “Your health, our priority trusted care solutions”
        </p>
        <p className="bodyTextInMastHead">
          Empowering healthcare with innovative, user-friendly designs for
          medical professionals and institutions.
        </p>

        <button
          type="button"
          className="btn btn-outline-primary BlogsButton"
          onClick={(e) => {
            router.push("/blogs");
          }}
        >
          Blogs
        </button>
      </div>
      <div className="searchSection">
        <p className="textInsearchSection">Find Doctors Near You </p>
        <span className="searchBarAndButton">
          <svg
            className="iconInSearch"
            viewBox="0 0 20 20"
            fill="currentColor"
            color="#216ecf"
            xmlns="https://www.w3.org/2000/svg"
          >
            <path
              d="M4.5921 1.6665V3.86763H3.08846V6.9305C3.08838 8.07422 3.71356 9.1311 4.72849 9.70299C5.74342 10.2749 6.99388 10.2749 8.00881 9.70299C9.02374 9.1311 9.64892 8.07422 9.64884 6.9305V3.86763H8.15084V1.6665H11.9099V3.86763H11.9043V6.93087C11.9043 9.62966 9.86602 11.8726 7.2129 12.2705C7.3416 14.0985 8.93047 15.5428 10.8715 15.5428C12.897 15.5428 14.5391 13.9699 14.5392 12.0296L14.539 11.2262C13.7892 10.7491 13.2945 9.93009 13.2945 8.99984C13.2945 7.52708 14.5344 6.33317 16.0638 6.33317C17.5932 6.33317 18.833 7.52708 18.833 8.99984C18.833 10.2422 17.9507 11.2862 16.7566 11.5824L16.7561 12.0296C16.7561 15.1377 14.1162 17.6665 10.8715 17.6665C7.6732 17.6665 5.06257 15.2096 4.98847 12.1628C2.60166 11.5632 0.833008 9.44484 0.833008 6.93087V1.6665H4.5921ZM16.0638 8.61889C15.8453 8.61889 15.6682 8.78944 15.6682 8.99984C15.6682 9.15392 15.7646 9.29283 15.9124 9.35179C16.0602 9.41076 16.2304 9.37816 16.3435 9.26921C16.4567 9.16026 16.4905 8.99641 16.4293 8.85405C16.368 8.7117 16.2238 8.61889 16.0638 8.61889Z"
              fill="#7384d8"
            ></path>
          </svg>
          <input
            onChange={(e) => {
              setSearchByLocation(false);
              setSearchBySpecialization(true);
              setSearchSpecializationValue(e.target.value);
            }}
            className="searchInput"
            placeholder="Search By Specialization"
          ></input>

          <input
            onChange={(e) => {
              setSearchByLocation(true);
              setSearchBySpecialization(false);
              setSearchLocationValue(e.target.value);
            }}
            className="searchInput"
            placeholder="Search By Location"
          ></input>
          <button className="searchButton" onClick={()=>{
            router.push("./allDoctorAfterSearch")
          }}>
            
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="searchIcon"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
            Search
          </button>
        </span>
        <p className="text2InsearchSection">
          {" "}
          Access doctors’ profiles and qualifications.
        </p>
      </div>

      <div className="appointmentSectionHome">
        <div className="FeaturedServiceBannerModule-content">
          <small className="FeaturedServiceBannerModule-badge">New</small>
          <h2 className="FeaturedServiceBannerModule-title">
            Brighten your smile
          </h2>
          <p className="FeaturedServiceBannerModule-subtitle">
            Book your next dental appointment with ease
>>>>>>> main
          </p>

          <button
            type="button"
            className="btn btn-outline-primary BlogsButton"
            onClick={(e) => {
              handleAction();
            }}
          >
            Book
          </button>
        </div>
        <div className="searchSection">
          <p className="textInsearchSection">Find Doctors Near You </p>
          <span className="searchBarAndButton">
            <svg
              className="iconInSearch"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="https://www.w3.org/2000/svg"
            >
              <path
                d="M4.5921 1.6665V3.86763H3.08846V6.9305C3.08838 8.07422 3.71356 9.1311 4.72849 9.70299C5.74342 10.2749 6.99388 10.2749 8.00881 9.70299C9.02374 9.1311 9.64892 8.07422 9.64884 6.9305V3.86763H8.15084V1.6665H11.9099V3.86763H11.9043V6.93087C11.9043 9.62966 9.86602 11.8726 7.2129 12.2705C7.3416 14.0985 8.93047 15.5428 10.8715 15.5428C12.897 15.5428 14.5391 13.9699 14.5392 12.0296L14.539 11.2262C13.7892 10.7491 13.2945 9.93009 13.2945 8.99984C13.2945 7.52708 14.5344 6.33317 16.0638 6.33317C17.5932 6.33317 18.833 7.52708 18.833 8.99984C18.833 10.2422 17.9507 11.2862 16.7566 11.5824L16.7561 12.0296C16.7561 15.1377 14.1162 17.6665 10.8715 17.6665C7.6732 17.6665 5.06257 15.2096 4.98847 12.1628C2.60166 11.5632 0.833008 9.44484 0.833008 6.93087V1.6665H4.5921ZM16.0638 8.61889C15.8453 8.61889 15.6682 8.78944 15.6682 8.99984C15.6682 9.15392 15.7646 9.29283 15.9124 9.35179C16.0602 9.41076 16.2304 9.37816 16.3435 9.26921C16.4567 9.16026 16.4905 8.99641 16.4293 8.85405C16.368 8.7117 16.2238 8.61889 16.0638 8.61889Z"
                fill="#7384d8"
              ></path>
            </svg>
            <input
              className="searchInput"
              placeholder="Search By Specialization"
            ></input>
            <input
              className="searchInput"
              placeholder="Search By Location"
            ></input>
            <button className="searchButton">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="searchIcon"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
              Search
            </button>
          </span>
          <p className="text2InsearchSection">
            {" "}
            Access doctors’ profiles and qualifications.
          </p>
        </div>

<<<<<<< AddLoginLogoutButtons
        <div className="appointmentSectionHome">
          <div className="FeaturedServiceBannerModule-content">
            <small className="FeaturedServiceBannerModule-badge">New</small>
            <h2 className="FeaturedServiceBannerModule-title">
              Brighten your smile
            </h2>
            <p className="FeaturedServiceBannerModule-subtitle">
              Book your next dental appointment with ease
=======
      <div className="row gx-3 gy-4 services">
        {services.map((ele) => (
          <div
            className="col-sm-6 col-md-4 d-flex align-items-stretch"
            key={ele.service_id || ele.service_title}
          >
            <div className="card w-100 h-100 d-flex flex-column">
              <img
                className="card-img-top"
                src={ele.imageurl}
                alt={ele.service_title}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{ele.service_title}</h5>
                <p className="card-text">{ele.description}</p>
                <a href={`/blogs/${ele.service_id}`} className="btn btn-primary">
                  Learn more
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="howToUseSection">
        <p className="introHowToUseSection">How to use the webSite</p>
        <div className="searchDectionSection">
          <div className="textAndHeadInSearchSection">
            <h5 className="headInserchDectionSection">
              1- Search for a Doctor by Location and Specialization
            </h5>
            <p className="textInserchDectionSection">
              Our platform’s intuitive search tool allows patients to quickly
              find the right healthcare professional based on their geographical
              preference and medical needs.
>>>>>>> main
            </p>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={(e) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                handleAction();
              }}
            >
              Find an Appointment
            </button>
          </div>
          <div className="FeaturedServiceBannerModule-image">
            <img
              src="https://i.pinimg.com/736x/6c/92/d3/6c92d38a123128ed967d410f7eebd305.jpg"
              alt=""
              loading="lazy"
            />
          </div>
        </div>

        <div className="howToUseSection">
          <div className="searchDectionSection">
            <div className="textAndHeadInSearchSection">
              <h5 className="headInserchDectionSection">
                1- Search for a Doctor by Location and Specialization
              </h5>
              <p className="textInserchDectionSection">
                Our platform’s intuitive search tool allows patients to quickly
                find the right healthcare professional based on their
                geographical preference and medical needs.
              </p>
            </div>
            <Image
              className="imageInSearchSection"
              src="/images/imageinsearchforadoctorsector.PNG"
              alt="Doctor Image"
              width={500}
              height={300}
            />
          </div>

          <div className="searchDectionSection">
            <Image
              className="imageInSearchSection"
              src="/images/becomeADoctor.PNG"
              alt="become A Doctor Image"
              width={600}
              height={300}
            />
            <div className="textAndHeadInSearchSection">
              <h5 className="headInserchDectionSection">
                2- Become a Doctor and Share Blogs
              </h5>
              <p className="textInserchDectionSection">
                Our “Become a Doctor” portal invites licensed practitioners to
                join our community and build their online presence. After
                completing a straightforward registration process—verifying
                credentials and setting up a professional profile—doctors gain
                access to a suite of content-creation tools. They can publish
                insightful blog posts on topics ranging from preventative care
                to the latest research breakthroughs, positioning themselves as
                thought leaders.
              </p>
            </div>
          </div>

          <div className="searchDectionSection">
            <div className="textAndHeadInSearchSection">
              <h5 className="headInserchDectionSection">
                3- Book an Appointment with a Doctor
              </h5>
              <p className="textInserchDectionSection">
                Once a suitable physician is identified, patients can seamlessly
                schedule consultations through our appointment-booking module.
                The system displays each doctor’s real-time availability
                calendar, offering slots for in-person visits, telemedicine
                calls, or home visits where applicable. With just a few clicks,
                users select their preferred date and time, confirm their
                personal details, and book an appointment.{" "}
              </p>
            </div>
            <Image
              className="imageInSearchSection"
              src="/images/bookAnApointment.PNG"
              alt="book An Apointment Image"
              width={500}
              height={300}
            />
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Home;
