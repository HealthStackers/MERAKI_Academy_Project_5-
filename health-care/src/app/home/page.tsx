"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
const home = () => {
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      localStorage.setItem("roleId", session.user.role_id.toString());
      localStorage.setItem("email", session.user.email);
      localStorage.setItem("userId", session.user.id.toString());
    }
  }, [session]);

  return <div>home</div>;
};

export default home;