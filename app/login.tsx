import React from "react";
import LoginForm from "../components/Auth/Login";
import { useUser } from "../context/UserContext";

export default function LoginPage() {
  const { token, logout } = useUser();
  return <LoginForm token={token} />;
}
