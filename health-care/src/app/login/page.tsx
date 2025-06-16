"use client";
import { signIn } from "next-auth/react";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

function login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
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

        <button type="submit"> Login</button>

        <div>{showErrorMessage && <div>{errorMessage}</div>}</div>
      </form>
    </div>
  );
}

export default login;
