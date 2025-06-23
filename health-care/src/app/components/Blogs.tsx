"use client";

import { Blog } from "@/models/lib/db/services/blogs";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "./blog.css";

const Blogs = () => {
  const { token, setToken, roleId, setRoleId, userId, setUserId } =
    useContext(AuthContext);
  const [ServiceID, SetServiceID] = useState<number | null>(null);
  console.log(ServiceID);
  const [blogs, SetBlogs] = useState<Blog>({
    Title: "",
    body: "",
    service_id: 0,
    doctor_id: Number(userId),
  });
  console.log(blogs);
  const [success, setSuccess] = useState<boolean>(false);
  useContext(AuthContext);
  const [msg, setMsg] = useState<string>("");
  const [services, setServices] = useState<string[]>([]);
  console.log(services);
  const AddBlog = async () => {
    axios
      .post("http://localhost:3000/api/blogs", blogs)
      .then((res) => {
        setMsg("The blog has been added");
        setSuccess(true);
        setTimeout(() => {
          setMsg("");
        }, 3000);
      })
      .catch((err) => {
        setSuccess(false);
        setMsg("The blog has not been added");
        setTimeout(() => {
          setMsg("");
        }, 3000);
      });
  };
  const GetServices = async () => {
    axios
      .get("http://localhost:3000/api/service")
      .then((res) => {
        setServices(res.data.data);
      })
      .catch((err) => {});
  };

  useEffect((e) => {
    GetServices();
  }, []);

  return (
    <>
      <div className="BlogsDiv">
        <div className="BlogSection">
          <span className="selectService">Select a Service :</span>

          <select
            className="form-select"
            multiple
            aria-label="multiple select example"
          >
            {services?.map((ele) => (
              <option
                key={ele.id}
                onClick={(e) => {
                  console.log(ele.id);
                  SetBlogs({
                    ...blogs,
                    service_id: Number(ele.id),
                  });
                  SetServiceID(ele.id);
                }}
                value={ele.id}
              >
                {ele.title}
              </option>
            ))}
          </select>
          <input
            name="title"
            type="text"
            placeholder="Title"
            onChange={(e) => {
              SetBlogs({
                ...blogs,
                Title: e.target.value,
              });
            }}
          />
          <textarea
            name="Body"
            className="form-control"
            aria-label="With textarea"
            placeholder="Body"
            onChange={(e) => {
              SetBlogs({
                ...blogs,
                body: e.target.value,
              });
            }}
          />
        </div>
        <button
          type="button"
          className="btn btn-light btn-md addBlog"
          onClick={AddBlog}
        >
          Add Blog
        </button>
        {msg && (
          <div>
            {" "}
            <p className={success ? "success" : "failed"}>{msg}</p>
          </div>
        )}{" "}
      </div>
    </>
  );
};

export default Blogs;
