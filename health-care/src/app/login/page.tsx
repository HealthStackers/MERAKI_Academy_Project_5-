"use client";
import { signIn } from "next-auth/react";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./login.css";

const login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showErrorMessage, seteshowErrorMessage] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      password: form.password,
      email: form.email,
      callbackUrl: "/home",
    });
    if (result?.ok) {
      router.push("/home");
    } else {
      seteshowErrorMessage(true);
      if (result?.error) {
        setErrorMessage(result.error);
        setTimeout(() => {
          seteshowErrorMessage(false);
        }, 2000);
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="title">Login</div>
        <div className="content">
          <form onSubmit={onSubmit}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Password</span>
                <input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="button">
              <input type="submit" value="Login" />
            </div>

            <div>{showErrorMessage && <div>{errorMessage}</div>}</div>
          </form>
        </div>
      </div>
    </>
  );
}

export default login;
