"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./adminPanel.css";
import { Appointment } from "@/models/lib/db/services/appointment";
import axios from "axios";
import Swal from "sweetalert2";

const AdminPanel = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [appointmentID, setAppointmentID] = useState<number | undefined>(
    undefined
  );
  const [msg, setMsg] = useState<string>("");

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

  useEffect(() => {
    getAppointments();
  }, []);

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
            onClick={() => toggleVisibility(0)}
            type="button"
            className="btn btn-outline-primary"
          >
            Delete a appointment
          </button>
           <button
            type="button"
            className="btn btn-outline-primary"
          >
            Delete a user
          </button>
          <button
            onClick={(e) => {}}
            type="button"
            className="btn btn-outline-primary"
          >
            Edit user&apos; info
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
      {activeIndex === 0 && (
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
                value={ele.description}
                style={{
                  backgroundColor: "#ffffff", // White background
                  color: "#000000", // Black text color
                }}
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
