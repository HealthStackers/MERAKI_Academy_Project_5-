"use client";
import { signIn } from "next-auth/react";
import React from "react";
import { useState } from "react";
import { getServerSession } from "next-auth";
import authOptions from "@/models/lib/authOptions";

function login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn("credentials", {
      password: form.password,
      email: form.email,
      callbackUrl: "/home",
    });
   
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        ></input>

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        ></input>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default login;
