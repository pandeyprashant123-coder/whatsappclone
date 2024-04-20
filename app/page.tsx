"use client";
import { useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

import Login from "@/components/Login";
import Dashboard from "@/components/Dashboard";
export default function Home() {
  const [id, setId] = useLocalStorage("id");

  return id ? <Dashboard id={id} /> : <Login onIdSubmit={setId} />;
}
