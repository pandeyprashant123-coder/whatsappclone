"use client";

import React, { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

type props = {
  onIdSubmit: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const Login = ({ onIdSubmit }: props) => {
  const idRef = useRef<HTMLInputElement>(null!);
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onIdSubmit(idRef.current.value);
  };
  const createNewId = () => {
    onIdSubmit(uuidv4());
  };
  return (
    <div className="flex items-center h-screen">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col my-3">
          <label htmlFor="messageBox">Enter your id</label>
          <input
            ref={idRef}
            type="text"
            name="id"
            id="id"
            required
            className="border-black border"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-400 rounded p-1 text-white mr-4"
        >
          Login
        </button>
        <button
          className="bg-zinc-400 rounded p-1 text-white"
          onClick={createNewId}
        >
          Create new Id
        </button>
      </form>
    </div>
  );
};

export default Login;
