"use client";
import { useFormState } from "react-dom";
import { signup } from "@/app/actions/auth";
import "@/app/ui/globals.css";
import { Input, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";
import axios from "axios";
import { EyeFilledIcon } from "@/app/ui/signup/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/app/ui/signup/eyeSlashFilledIcon";

export default function SignupForm() {
  const [isVisible, setIsVisible] = React.useState(false);
  const router = useRouter();
  const [user, setUser] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const onSignup = async () => {
    try {
      console.log("USERRR", user);
      const response = await axios.post("/api/users/signup", user);
      if (response.data.success) {
        console.log("SUCCESS", response);
        router.push(response.data.redirectTo);
      } else {
        console.error("Signup Failed:", response.data.error);
      }
    } catch (error: any) {
      console.log(`Signup External Failed: ${error}`);
    }
  };
  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className="relative py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
        <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
          <div className="rounded-xl bg-white shadow-xl">
            <div className="p-6 sm:p-16">
              <h1 className="mb-4 text-4xl text-green-500 font-bold">
                <span className="text-black">Let's get </span> Started
              </h1>

              <form className="mt-12 grid space-y-4" method="POST">
                <div className="gh-input-group">
                  <Input
                    id="name"
                    name="name"
                    label="Full Name"
                    value={user.name}
                    isRequired
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                </div>

                <div className="gh-input-group">
                  <Input
                    id="email"
                    name="email"
                    label="Email Address"
                    value={user.email}
                    isRequired
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </div>

                <div className="gh-input-group">
                  <Input
                    className="focus: outline-none"
                    onClick={toggleVisibility}
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    label="Password"
                    value={user.password}
                    isRequired
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                </div>

                <div className="w-full grid">
                  <Button
                    size="lg"
                    className="bg-black text-white"
                    onClick={onSignup}
                  >
                    Sign Up
                  </Button>
                </div>
              </form>
              <div className="flex items-center justify-between mt-5">
                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                <p>or</p>
                <span className="w-1/5 border-b dark:border-gray-400 md:w-1/4"></span>
              </div>

              <div className="mt-10 grid space-y-4">
                <button
                  className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
                >
                  <div className="relative flex items-center space-x-4 justify-center">
                    <img
                      src="https://tailus.io/sources/blocks/social/preview/images/google.svg"
                      className="grid left-0 w-5"
                      alt="google logo"
                    ></img>
                    <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                      Continue with Google
                    </span>
                  </div>
                </button>

                <button
                  className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
                                     hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
                >
                  <div className="relative flex items-center space-x-4 justify-center">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg"
                      className="grid left-0 w-5 "
                      alt="Facebook logo"
                    ></img>
                    <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                      Continue with Facebook
                    </span>
                  </div>
                </button>
              </div>

              <div className="mt-20 space-y-4 text-gray-600 text-center sm:-mb-8">
                <p className="text-xs">
                  By proceeding, you agree to our{" "}
                  <a href="#" className="underline">
                    Terms of Use
                  </a>{" "}
                  and confirm you have read our{" "}
                  <a href="#" className="underline">
                    Privacy and Cookie Statement
                  </a>
                  .
                </p>
                <p className="text-xs">
                  This site is protected by reCAPTCHA and the{" "}
                  <a href="#" className="underline">
                    Google Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="#" className="underline">
                    Terms of Service
                  </a>{" "}
                  apply.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
