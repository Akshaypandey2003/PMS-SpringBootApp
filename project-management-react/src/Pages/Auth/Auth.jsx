/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";
import { Button } from "@/components/ui/button";
import "./Auth.css";

export const Auth = () => {
  const [active, setActive] = useState("");
  return (
    <div className="loginContainer home-background h-screen">
      <div className=" box  w-[25rem] ">
        <div className="mainContainer login bg-black rounded-2xl">
          <div className="loginBox w-full p-10 space-y-5">
            {active ? <Login /> : <Signup />}
            <div>
              <span className="font-sans text-gray-400">
                {!active ? "Already have an account ?" : "Don't have account ?"}
            </span>
              <span
               
                className="border-b-2 border-blue-900 text-blue-900 mx-2 hover:cursor-pointer font-sans "
                onClick={() => setActive(!active)}
              >
                {!active ? "Signin" : "Signup"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
