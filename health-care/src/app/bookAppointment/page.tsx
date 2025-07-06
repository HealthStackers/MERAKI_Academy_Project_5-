"use client";
import React, { useContext, useEffect, useState } from "react";
import "./appointment.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Swal from "sweetalert2";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import {
  Appointment,
  AppointmentType,
  durationMap,
} from "@/models/lib/db/services/appointment";
import { AuthContext } from "../context/AuthContext";
import { clockSystem } from "@/models/lib/db/services/appointment";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../components/footer";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

// id ?:number
// DateAppointment: Date;
// BloodType: string;
// MedicalHistory: string;
// TimeAppointment: DateTime;
// clockSystem: clockSystem;
// DurationTime: DurationMap[AppointmentType];
// AppointmentType: AppointmentType;
// description: string;
// Gender: string;
// DoctorName: string;
// Specializing: string;
// is_deleted: 0;
// user_id: number;
// Disease_id: number;
const BookAppointment = () => {
  const router= useRouter()
  const { doctorIdInBookBtn, setDoctorIdInBookBtn } = useContext(AuthContext);
  console.log("doctorIdInBookBtn: ", doctorIdInBookBtn);
const [doctorId, setDoctorId] = useState<number>(0)
  const UID = localStorage.getItem("userId");
  const roleId = localStorage.getItem("roleId");
  const [AppointmentType, setAppointmentType] =
    useState<AppointmentType>("Check-ups");
  const [diseases, setDiseases] = useState([]);
  const [doctors, setDoctors] = useState([]);
  console.log(AppointmentType);
  const [appointments, setAppointments] = useState<Appointment>({
    BloodType: "",
    MedicalHistory: "",
    clockSystem: "a.m.",
    AppointmentType: AppointmentType,
    description: "",
    Gender: "",
    DoctorName: "",
    Specializing: "",
    is_deleted: 0,
    user_id: Number(UID),
    doctor_id: Number(doctorId),
    Disease_id: 0,
    role_id: 2,
  });

  console.log(appointments);
    console.log("doctorId" , doctorId);

  console.log(doctors);
  //
  const AddAppointment = () => {
    if (roleId !== "2") {
      toast.error("Appointment booking is available to patients only.");
      return;
    }

    axios
      .post(`http://localhost:3000/api/appointments/`, appointments)
      .then((res) => {
        console.log("res", res);
        Swal.fire({
          title: "the appointment Added!",
          text: "Your appointment has been Added successfully.",
          icon: "success",
          confirmButtonText: "Okay",
          
        }).then(() => {
          router.push("/home")
          //window.location.reload();
        });
        // console.log([...posts, res.data.jobs])
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const GetDiseases = () => {
    axios
      .get(`http://localhost:3000/api/diseases/AllDiseases`)
      .then((res) => {
        console.log("res", res.data);
        setDiseases(res.data);
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

  useEffect(() => {
    GetDiseases();
    getDoctors();
    const date = new Date();
    const firstDayOfCurrentMonth = new Date(
      date.getFullYear(),
      date.getMonth(),
      1
    );
    const minDate = firstDayOfCurrentMonth.toISOString().split("T")[0];
    flatpickr("#dateInput", {
      dateFormat: "Y-m-d",
      minDate: minDate,
      onChange: function (selectedDates, dateStr) {
        setAppointments({
          ...appointments,
          DateAppointment: new Date(dateStr),
        });
      },
    });
  }, []);

  return (
    <div className="AppointmentPanel">
      <div className="headingAppointment">
        <h3 className="heading">Book your next healthcare appointment</h3>
        <p className="subHeading">
          Find, book and add your favourite practitioners to your care team.
        </p>
      </div>
      <div className="AddDiv">
        <div className="appointments">
          <p className="introAppointment"></p>
        </div>

        <div className="appointmentInfoDiv">
          <span className="dateAppointment">Date Appointment :</span>
          <input id="dateInput" type="date" placeholder="Date Appointment" />
          <div className="AppointmentSection">
            <input
              type="text"
              placeholder="Blood Type"
              onChange={(e) => {
                setAppointments({
                  ...appointments,
                  BloodType: e.target.value,
                });
              }}
            />
            <textarea
              className="form-control"
              aria-label="With textarea"
              placeholder="Medical History"
              onChange={(e) => {
                setAppointments({
                  ...appointments,
                  MedicalHistory: e.target.value,
                });
              }}
            />
            <span className="timeAppointment">Time Appointment :</span>
            <input
              type="time"
              placeholder="TimeAppointment"
              onChange={(e) => {
                setAppointments({
                  ...appointments,
                  TimeAppointment: e.target.value,
                });
              }}
            />
            <select
              name="clockSystem"
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => {
                setAppointments({
                  ...appointments,
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
            />
            <select
              name="AppointmentType"
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => {
                const val = e.target.value as AppointmentType;
                setAppointmentType(val);
                setAppointments({
                  ...appointments,
                  AppointmentType: val,
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
                  setAppointments({
                    ...appointments,
                    description: e.target.value,
                  });
                }}
              ></textarea>
            </div>
            <input
              type="text"
              placeholder="Gender"
              onChange={(e) => {
                setAppointments({
                  ...appointments,
                  Gender: e.target.value,
                });
              }}
            />
            <select
              className="form-select"
              defaultValue={
                doctorIdInBookBtn.firstname + doctorIdInBookBtn.lastname
              }
              aria-label="Default select example"
              onChange={(e) => {
                const selectedName =
                  e.target.options[e.target.selectedIndex].text;
                const id = e.target.value; // Gets the selected doctor's ID
console.log("id ,id" , id)
                setAppointments((prev) => ({
                  ...prev,
                  doctor_id:Number(id),
                  DoctorName: selectedName,
                }));
                setDoctorId(Number(id))
              }}
            >
              <option value="" disabled>
                Select a Doctor
              </option>

              {doctorIdInBookBtn.firstname !== "" && (
                <option>
                  {doctorIdInBookBtn.firstname} {doctorIdInBookBtn.lastname}
                </option>
              )}

              {doctors?.map((ele, i) => (
                <option key={ele.id} value={ele.doctor_id}>
                  {ele.firstname} {ele.lastname}
                </option>
              ))}
            </select>

            <select
              className="form-select"
              defaultValue={doctorIdInBookBtn.specialization}
              aria-label="Select a Specializing"
              onChange={(e) => {
                console.log("doctorIdInBookBtn.specialization: ");

                setAppointments({
                  ...appointments,
                  Specializing: e.target.value,
                });
              }}
            >
              <option value="" disabled>
                Select a Specializing
              </option>

              {doctorIdInBookBtn.specialization !== "" && (
                <option>{doctorIdInBookBtn.specialization}</option>
              )}

              {doctors?.map((ele) => (
                <option key={ele.id}>{ele.specialization}</option>
              ))}
            </select>

            <select
              name="Disease"
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => {
                setAppointments({
                  ...appointments,
                  Disease_id: Number(e.target.value),
                });
              }}
            >
              <option selected disabled>
                Select a Disease
              </option>

              {diseases?.map((ele) => (
                <option key={ele.id} value={ele.id}>
                  {ele.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            className="btn btn-light btn-md addAppointment"
            onClick={AddAppointment}
          >
            Add an Appointment
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BookAppointment;
