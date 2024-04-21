"use client";
import { useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

import Login from "@/components/Login";
import Dashboard from "@/components/Dashboard";
import { ContactsProvider } from "@/context/ContactProvider";
export default function Home() {
  const [id, setId] = useLocalStorage("id", null);
  const dashboard = (
    <ContactsProvider>
      <Dashboard id={id} />
    </ContactsProvider>
  );
  return id ? dashboard : <Login onIdSubmit={setId} />;
}
