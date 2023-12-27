"use client";
import React, { useState } from "react";
import { API_AUTH, API_REGISTER, SESION_DURATION_MINUTES } from "@/constants";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const Router = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let { message } = await fetch(API_AUTH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then((res) => res.json());

    if (message === "Login successful") {
      setMessage(message);
      document.getElementById("loginSuccess")?.classList.toggle("hidden");
      Router.push("/");
    } else {
      setMessage(message);
      document.getElementById("error")?.classList.toggle("hidden");
    }
  };

  const handleRegister = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    let { message } = await fetch(API_REGISTER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then((res) => res.json());

    if (message === "Login successful") {
      setMessage(message);
      document.getElementById("loginSuccess")?.classList.toggle("hidden");
      Router.push("/");
    } else {
      setMessage(message);
      document.getElementById("error")?.classList.toggle("hidden");
    }
  };

  return (
    <div className=" flex justify-center items-center w-screen h-screen">
      <div className=" flex flex-col justify-around items-center bg-red-400 rounded-2xl p-5 w-[300px] h-[400px] md:w-[600px]">
        <h1 className=" text-2xl font-bold border-b-4 border-dotted border-red-950">
          LogIn
        </h1>
        <form
          onSubmit={handleLogin}
          className=" flex flex-col items-center justify-around gap-4 w-full h-full"
        >
          <div className="flex flex-col gap-5 w-full">
            <label className=" flex flex-col-reverse">
              <input
                type="text"
                onChange={(event) => setUsername(event.target.value)}
                placeholder=""
                className=" peer pl-4 py-1 rounded-md outline outline-2 outline-red-500 focus:outline-red-700 w-full"
              />
              <span className=" block transition-transform peer-placeholder-shown:translate-x-4 peer-placeholder-shown:translate-y-7">
                Username
              </span>
            </label>
            <label className=" flex flex-col-reverse">
              <input
                type="password"
                onChange={(event) => setPassword(event.target.value)}
                placeholder=""
                className=" peer pl-4 py-1 outline outline-2 outline-red-500 focus:outline-red-700 rounded-md  w-full"
              />
              <span className=" block transition-transform peer-placeholder-shown:translate-x-4 peer-placeholder-shown:translate-y-7">
                Password
              </span>
            </label>
          </div>
          <p
            id="error"
            className=" uppercase font-bold text-center mt-5 hidden"
          >
            the credentials are invalid
          </p>
          <p
            id="registerSuccess"
            className=" uppercase font-bold text-center mt-5 hidden"
          >
            register success
          </p>
          <hr className=" w-[90%] h-1 rounded-3xl bg-red-700 shadow shadow-red-800" />
          <div className=" flex justify-around w-full">
            <button
              type="submit"
              className=" bg-red-50 py-5 px-6 rounded-xl outline outline-2 outline-red-500 hover:outline-red-800 hover:bg-red-500 transition-colors"
            >
              Login
            </button>
            <button
              type="button"
              onClick={handleRegister}
              className=" bg-red-50 py-5 px-6 rounded-xl outline outline-2 outline-red-500 hover:outline-red-800 hover:bg-red-500 transition-colors"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
