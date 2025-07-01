"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Footer from "../../components/footer"
import "./blog.css";

export default function BlogDetailsClient() {

  const params = useParams();
  const id = params?.id;
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/service/` + id);
        setBlog(res.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message || "Error fetching service");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!blog) return <div>No data found.</div>;

  return (
    <>
      <div className="BlogDiv">
        {blog.map((ele) => (
          <>
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
            </div>
          </>
        ))}
       
      </div>
       <Footer/>
    </>
  );
}
