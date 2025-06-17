import Link from "next/link";
import React from "react";

const Navigation = () => {
  return (
    <div>
      <Link href="/adminPanel">Admin Panel</Link>
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
    </div>
  );
};

export default Navigation;
