"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./adminPanel.css";
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

const AdminPanel = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [appointmentID, setAppointmentID] = useState<number>(0);
  const [msg, setMsg] = useState<string>("");
  const [UpdateAppointment, setUpdateAppointments] = useState({});
  const [DurationTime, setDurationTime] = useState("");
  const [DiseaseId, setDiseaseId] = useState<number | string>("");
  const [UserId, setUserId] = useState<number | string>("");

  // Function to toggle visibility
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toggleVisibility = (index: any) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  console.log(appointmentID);

  console.log(appointments);

  const getAppointments = () => {
    axios
      .get("http://localhost:3000/api/appointments/all")
      .then((res) => {
        console.log("res", res);
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

  useEffect(() => {
    getAppointments();
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
            onClick={(e) => {}}
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
            onClick={(e) => {}}
            type="button"
            className="btn btn-outline-primary"
          >
            Get All Appointments
          </button>
          <button
            onClick={(e) => {}}
            type="button"
            className="btn btn-outline-primary"
          >
            Get All Patients
          </button>
          <button
            onClick={(e) => {}}
            type="button"
            className="btn btn-outline-primary"
          >
            Get All Doctors
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
                    setDurationTime(ele.durationtime)
                    setDiseaseId(ele.disease_id)
                    setUserId(ele.user_id)
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
            {" "}
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
