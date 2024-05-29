import React, { useState } from "react";

interface RegisterProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const [userId, setUserId] = useState<RegisterProps>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState<RegisterProps>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId({ ...userId, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let formError = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    if (!userId.name && !userId.email && !userId.password) {
      setFormError({
        ...formError,
        name: "Name is required",
        email: "Email is required",
        password: "Password is required",
      });
      return;
    }
    if (!userId.name) {
      setFormError({ ...formError, name: "Name is required" });
      return;
    }
    if (!userId.email) {
      setFormError({ ...formError, email: "Email is required" });
      return;
    }
    if (!userId.password) {
      setFormError({ ...formError, password: "Password is required" });
      return;
    }
    if (userId.password !== userId.confirmPassword) {
      setFormError({
        ...formError,
        confirmPassword: "Password does not match",
      });
      return;
    }

    setFormError(formError);
    console.log(userId);
  };
  return (
    <div className="flex justify-center items-center content-center h-screen bg-slate-300">
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={userId.name}
          onChange={handleChange}
        />
        <p className="text-red-500">{formError.name}</p>
        <label htmlFor="email">email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={userId.email}
          onChange={handleChange}
        />
        <p className="text-red-500">{formError.email}</p>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={userId.password}
          onChange={handleChange}
        />
        <p className="text-red-500">{formError.password}</p>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="confirmPassword"
          id="confirmPassword"
          name="confirmPassword"
          value={userId.confirmPassword}
          onChange={handleChange}
        />
        <p className="text-red-500">{formError.confirmPassword}</p>
        <button type="submit" className="bg-green-400 text-white p-2">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
