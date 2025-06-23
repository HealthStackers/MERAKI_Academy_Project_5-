/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./adminPanel.css";
import "./appointment.css";
import "./get_doctors_patients.css";
import "./updateAppointment.css";
import axios from "axios";
import Swal from "sweetalert2";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import {
  Appointment,
  AppointmentType,
  UpdateAppointment,
  durationMap,
} from "@/models/lib/db/services/appointment";
import { clockSystem } from "@/models/lib/db/services/appointment";
import Disease from "../components/Disease";
import Blogs from "../components/Blogs";
import HandleJoinRequest from "../components/handleJoinRequest"

const AdminPanel = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [appointmentID, setAppointmentID] = useState<number>(0);
  const [msg, setMsg] = useState<string>("");
  const [UpdateAppointment, setUpdateAppointments] = useState({});
  const [DurationTime, setDurationTime] = useState("");
  const [DiseaseId, setDiseaseId] = useState<number | string>("");
  const [UserId, setUserId] = useState<number | string>("");
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toggleVisibility = (index: any) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  console.log(doctors);

  const getAppointments = () => {
    axios
      .get("http://localhost:3000/api/appointments/all")
      .then((res) => {
        setAppointments(res.data);
        // console.log([...posts, res.data.jobs])
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteAppointment = () => {
    axios
      .delete(
        `http://localhost:3000/api/appointments/deleteAppointment/` +
          appointmentID
      )
      .then((res) => {
        console.log("delete");
        setMsg("The an appointment has been deleted");
        setTimeout(() => {
          setMsg("");
        }, 3000);
        Swal.fire({
          title: "the appointment Deleted!",
          text: "Your appointment has been deleted successfully.",
          icon: "success",
          confirmButtonText: "Okay",
        }).then(() => {
          location.reload();
        });
      })
      .catch((err) => {
        setMsg("There is an error please check");
        setTimeout(() => {
          setMsg("");
        }, 3000);
      });
  };

  const updateAppointment = () => {
    axios
      .put(
        `http://localhost:3000/api/appointments/` + appointmentID,
        UpdateAppointment
      )
      .then((res) => {
        console.log("res", res);
        Swal.fire({
          title: "the appointment Updated!",
          text: "Your appointment has been Updated successfully.",
          icon: "success",
          confirmButtonText: "Okay",
        }).then(() => {
          window.location.reload();
        });
        // console.log([...posts, res.data.jobs])
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDoctors = () => {
    axios
      .get(`http://localhost:3000/api/users/allDoctors`)
      .then((res) => {
        setDoctors(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPatients = () => {
    axios
      .get(`http://localhost:3000/api/users/allPatients`)
      .then((res) => {
        setPatients(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAppointments();
    getDoctors();
    getPatients();
    const today = new Date();
    const firstDayOfCurrentMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );
    const minDate = firstDayOfCurrentMonth.toISOString().split("T")[0];
    flatpickr("#dateInput", {
      dateFormat: "Y-m-d",
      minDate: minDate,
      onChange: function (selectedDates, dateStr) {
        setUpdateAppointments({
          ...UpdateAppointment,
          DateAppointment: dateStr,
        });
      },
    });
  }, [UpdateAppointment, appointmentID]);

  return (
    <>
      <div className="AdminPanelContainer">
        <div className="ButtonsAdmin">
          <button
            onClick={(e) => {}}
            type="button"
            className="btn btn-outline-primary"
          >
            Add a service
          </button>
          <button
            onClick={() => toggleVisibility(1)}
            type="button"
            className="btn btn-outline-primary"
          >
            Add a disease
          </button>
          <button
            onClick={() => toggleVisibility(2)}
            type="button"
            className="btn btn-outline-primary"
          >
            Delete a appointment
          </button>
          <button type="button" className="btn btn-outline-primary">
            Delete a user
          </button>
          <button
            onClick={() => toggleVisibility(4)}
            type="button"
            className="btn btn-outline-primary"
          >
            Edit Appointment&apos; info
          </button>
          <button
            onClick={() => toggleVisibility(5)}
            type="button"
            className="btn btn-outline-primary"
          >
            Get All Appointments
          </button>
          <button
            onClick={() => toggleVisibility(6)}
            type="button"
            className="btn btn-outline-primary"
          >
            Get All Patients
          </button>
          <button
            onClick={() => toggleVisibility(7)}
            type="button"
            className="btn btn-outline-primary"
          >
            Get All Doctors
          </button>
          <button
            onClick={() => toggleVisibility(8)}
            type="button"
            className="btn btn-outline-primary"
          >
            Add a blog
          </button>
          <button
            onClick={() => toggleVisibility(9)}
            type="button"
            className="btn btn-outline-primary"
          >
            Join Requests
          </button>
        </div>
      </div>

      {activeIndex === 4 && (
        <div className="UpdateDiv">
          <div className="appointments">
            <p className="introAppointment">
              Select an appointment that you want to Update it.
            </p>
            <select
              className="form-select"
              multiple
              aria-label="multiple select example"
            >
              {appointments?.map((ele) => (
                <option
                  key={ele.id}
                  onClick={(e) => {
                    setAppointmentID(ele.appointment_id);
                    setDurationTime(ele.durationtime);
                    setDiseaseId(ele.disease_id);
                    setUserId(ele.user_id);
                  }}
                  value={ele.appointment_id}
                >
                  {ele.firstname} {ele.lastname} {ele.phonenumber}{" "}
                  {ele.appointmenttype} {ele.timeappointment}
                </option>
              ))}
            </select>
          </div>

          <div className="appointmentInfoDiv">
            <span className="dateAppointment">Date Appointment :</span>
            <input id="dateInput" type="date" placeholder="Date Appointment" />
            <div className="AppointmentSection">
              <input
                type="text"
                placeholder="Blood Type"
                onChange={(e) => {
                  setUpdateAppointments({
                    ...UpdateAppointment,
                    BloodType: e.target.value,
                  });
                }}
              />
              <textarea
                className="form-control"
                aria-label="With textarea"
                placeholder="Medical History"
                onChange={(e) => {
                  setUpdateAppointments({
                    ...UpdateAppointment,
                    MedicalHistory: e.target.value,
                  });
                }}
              />
              <span className="timeAppointment">Time Appointment :</span>
              <input
                type="time"
                placeholder="TimeAppointment"
                onChange={(e) => {
                  setUpdateAppointments({
                    ...UpdateAppointment,
                    TimeAppointment: e.target.value,
                  });
                }}
              />
              <select
                name="clockSystem"
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                  setUpdateAppointments({
                    ...UpdateAppointment,
                    clockSystem: e.target.value as clockSystem,
                  });
                }}
              >
                <option selected disabled>
                  Time Markers
                </option>
                <option value="a.m.">a.m.</option>
                <option value="p.m.">p.m.</option>
              </select>
              <input
                disabled
                name="DurationTime"
                type="text"
                placeholder="DurationTime"
                value={DurationTime}
              />
              <select
                name="AppointmentType"
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                  setUpdateAppointments({
                    ...UpdateAppointment,
                    AppointmentType: e.target.value as AppointmentType,
                  });
                }}
              >
                <option selected disabled>
                  Appointment Type
                </option>
                <option value="Check-ups">Check-ups</option>
                <option value="Evaluations">Evaluations</option>
                <option value="Follow-up">Follow-up</option>
              </select>

              <div className="input-group mb-3">
                <textarea
                  name="description"
                  className="form-control"
                  aria-label="With textarea"
                  placeholder="Description"
                  onChange={(e) => {
                    setUpdateAppointments({
                      ...UpdateAppointment,
                      description: e.target.value,
                    });
                  }}
                ></textarea>
              </div>
              <input
                type="text"
                placeholder="Gender"
                onChange={(e) => {
                  setUpdateAppointments({
                    ...UpdateAppointment,
                    Gender: e.target.value,
                  });
                }}
              />
              <input
                type="text"
                placeholder="Doctor Name"
                onChange={(e) => {
                  setUpdateAppointments({
                    ...UpdateAppointment,
                    DoctorName: e.target.value,
                  });
                }}
              />
              <input
                disabled
                type="text"
                value={UserId}
                placeholder="user_id"
                onChange={(e) => {
                  setUpdateAppointments({
                    ...UpdateAppointment,
                    user_id: Number(e.target.value),
                  });
                }}
              />
              <input
                disabled
                type="text"
                value={DiseaseId}
                placeholder="Disease_id"
                onChange={(e) => {
                  setUpdateAppointments({
                    ...UpdateAppointment,
                    Disease_id: Number(e.target.value),
                  });
                }}
              />
            </div>
            <button
              type="button"
              className="btn btn-light btn-md"
              onClick={updateAppointment}
            >
              Update an Appointment
            </button>
          </div>
        </div>
      )}

      {activeIndex === 2 && (
        <div className="deletePostDiv">
          <p className="introDelete">
            Select an appointment that you want to delete it.
          </p>
          <select
            className="form-select"
            multiple
            aria-label="multiple select example"
          >
            {appointments.map((ele) => (
              <option
                key={ele.id}
                onClick={() => {
                  {
                    console.log(ele);
                  }

                  setAppointmentID(ele.appointment_id);
                }}
                value={ele.appointment_id}
              >
                {ele.firstname} {ele.lastname} {ele.phonenumber}{" "}
                {ele.appointmenttype} {ele.timeappointment}
              </option>
            ))}
          </select>

          <button
            className="btnDelete"
            type="button"
            class="btn btn-light btn-md"
            onClick={(e) => {
              deleteAppointment();
            }}
          >
            Delete an appointment
          </button>
          {msg && (
            <div>
              {" "}
              <p className="msgDeleted">{msg}</p>
            </div>
          )}
        </div>
      )}

      {activeIndex === 1 && <Disease />}

      {activeIndex === 7 &&
        doctors?.map((ele) => {
          return (
            <div className="container">
              <div className="card shadow-sm">
                <div className="row g-0">
                  <div className="col-md-4 p-3 text-center">
                    <img
                      src={ele?.profilepictureurl}
                      className="img"
                      alt="Profile Picture"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title d-flex justify-content-between align-items-center name">
                        {ele?.firstname} {ele?.lastname}
                      </h5>
                      <p className="card-text text-muted title">
                        <i className="fas fa-briefcase "></i>
                        {ele?.role_name} {"in"} {ele?.specialization}
                      </p>
                      <p className="card-text country">
                        <small className="text-muted">
                          <i className="fas fa-map-marker-alt"></i>{" "}
                          {ele?.country}
                        </small>
                      </p>
                      <div className="border-top pt-2">
                        <div className="row text-center">
                          <div className="col">
                            <h6>Services</h6>
                            <strong>25</strong>
                          </div>
                          <div className="col border-start">
                            <h6>Treating patients</h6>
                            <strong>142</strong>
                          </div>
                          <div className="col border-start">
                            <h6>Blogs</h6>
                            <strong>289</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer bg-white">
                  <div className="d-flex justify-content-around">
                    <button className="btn btn-link text-decoration-none">
                      <i className="fas fa-user-plus"></i> Email : {ele?.email}
                    </button>
                    <button className="btn btn-link text-decoration-none">
                      <i className="fas fa-envelope"></i> Phone No. :{" "}
                      {ele?.phonenumber}
                    </button>
                    <button className="btn btn-link text-decoration-none">
                      <i className="fas fa-share"></i> CV : {ele?.cvurl}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      {activeIndex === 6 &&
        patients?.map((ele) => {
          return (
            <div className="container">
              <div className="card shadow-sm">
                <div className="row g-0">
                  <div className="col-md-4 p-3 text-center">
                    <img
                      src={ele?.userprofilepic}
                      className="img"
                      alt="Profile Picture"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title d-flex justify-content-between align-items-center name">
                        {ele?.firstname} {ele?.lastname}
                      </h5>
                      <p className="card-text text-muted email">
                        <i className="fas fa-briefcase "></i>
                        Email : {ele?.email}
                      </p>
                      <p className="card-text text-muted age">
                        <i className="fas fa-briefcase "></i>
                        Age : {ele?.age}
                      </p>
                      <p className="card-text country">
                        <small className="text-muted">
                          <i className="fas fa-map-marker-alt"></i> Country :{" "}
                          {ele?.country}
                        </small>
                      </p>
                      <p className="card-text phone">
                        <small className="text-muted">
                          <i className="fas fa-map-marker-alt"></i> Phone No. :
                          {ele?.phonenumber}
                        </small>
                      </p>
                      <p className="card-text disease">
                        <small className="text-muted">
                          <i className="fas fa-map-marker-alt"></i> Disease :
                          {ele?.name}
                        </small>
                      </p>
                      <p className="card-text effected">
                        <small className="text-muted">
                          <i className="fas fa-map-marker-alt"></i> Effected
                          Body Part :{ele?.effectedbodypart}
                        </small>
                      </p>
                    </div>
                    <div className="border-top pt-2">
                      <div className="row text-center">
                        <div className="col border-start">
                          <h6>Appointments</h6>
                          <strong>142</strong>
                        </div>
                        <div className="col border-start">
                          <h6>View Blogs</h6>
                          <strong>289</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      {activeIndex === 5 &&
        appointments?.map((ele, i) => {
          const date = new Date(ele?.dateappointment);

          return (
            <div className="card mb-3 appointmentCard">
              <div className="card-body">
                <h5 className="card-title">Appointment {i + 1}</h5>
                <p className="card-text">
                  Patient Name : {ele?.firstname} {ele?.lastname}
                </p>
                <p className="card-text">Email : {ele?.user_email}</p>
                <p className="card-text">Blood Type : {ele?.bloodtype}</p>
                <p className="card-text">Disease :{ele?.disease_name}</p>
                <p className="card-text">
                  {" "}
                  Medical History : {ele?.medicalhistory}
                </p>
                <p className="card-text">
                  Appointment Info. :{ele?.appointmenttype} -{" "}
                  {ele?.durationtime}
                </p>
                <p className="card-text">Doctor Name : Dr.{ele?.doctorname}</p>

                <hr></hr>
                <h6 className="des">Description</h6>
                <p className="card-text">{ele?.description}</p>
                <p className="card-text">
                  <small className="text-muted">
                    {date.toDateString()} {ele?.timeappointment}
                  </small>
                </p>
              </div>
            </div>
          );
        })}

      {activeIndex === 8 && <Blogs/>}
      {activeIndex === 9 && <HandleJoinRequest/>}
      <div>
        {/* Buttons to toggle visibility
        <button onClick={() => toggleVisibility(0)}>Toggle Content 1</button>
        <button onClick={() => toggleVisibility(1)}>Toggle Content 2</button>
        <button onClick={() => toggleVisibility(2)}>Toggle Content 3</button> */}

        {/* Conditionally render content based on active index */}
        {/* {activeIndex === 0 && <p>This is content 1</p>}
        {activeIndex === 1 && <p>This is content 2</p>}
        {activeIndex === 2 && <p>This is content 3</p>} */}
      </div>
    </>
  );
};

export default AdminPanel;
