"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import "./blog.css";

export default function BlogDetailsClient() {
  const params = useParams();
  const id = params?.id;
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/service/${id}`);
        setBlog(res.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message || "Error fetching service");
      } finally {
        setLoading(false);
      }
  }
  useEffect(() => {
    fetchBlog();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!blog) return <div>No data found.</div>;

  return (
    <>
    {loading ?  <div style={{ width: '4rem', height: '4rem',position:"relative", top:"100px" , marginBottom:"200px" , marginLeft:"60px" ,fontSize:"20px"}}>Loading...</div>: 
      <div className="BlogDiv">
        {blog.map((ele, indx) => (
          <>
            <p className="BlogNum">Blog {indx + 1} »</p>
            <img
              src={ele.imageurl}
              alt="Featured"
              className="post-header-img mb-4"
            />
            <h1 className="title mb-2">{ele.title}</h1>
            <div className="post-meta mb-4">
              by{" "}
              <strong className="name">
                {ele.firstname} {ele.lastname}
              </strong>{" "}
              • <span className="country">{ele.country}</span>
            </div>
            <div className="post-content">
              <p>{ele.body}</p>
              <div className="divider"></div>
            </div>
          </>
        ))}
      </div>}
    </>
  );
}
