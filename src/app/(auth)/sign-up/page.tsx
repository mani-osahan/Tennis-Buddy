"use client";
import { useFormState } from "react-dom";
import "@/app/ui/globals.css";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Input from "../../ui/signup/input";
import { supabase } from "../../lib/supabase/client";

export default function SignupForm() {
  const [isVisible, setIsVisible] = React.useState(false);
  const router = useRouter();
  const [user, setUser] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const VerifyEmail = () => {
    return (
      <div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
        <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Verify Your Email Address
          </h2>
        </div>  
      </div>
    );
  };

  const validateForm = () => {
    let errors: any = {};
    if (!user.name) {
      errors.name = "Name is required";
    } else if (user.name.length < 3) {
      errors.name = "Name must be at least 3 characters";
    }
    if (!user.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(user.email)) {
      errors.email = "Invalid email address";
    }
    if (!user.password) {
      errors.password = "Password is required";
    } else if (user.password.length < 8 ) {
      errors.password = "Password must be at least 8 characters";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const onSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (validateForm()) {
      VerifyEmail();
      await supabase.auth.signUp({
        email: user.email,
        password: user.password,
      });

    } else {
      {
        isSubmitted && errors.name && (
          <p className="text-red-500">{errors.name}</p>
        );
      }
    }
  };
  return (
    <div className="relative py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
        <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
          <div className="rounded-xl bg-white shadow-xl">
            <div className="p-2 sm:px-14 sm:py-20 justify-center align-middle">
              <h1 className="mb-4 text-4xl text-green-500 font-bold">
                <span className="text-black">Let's get </span> Started
              </h1>

              <form className="max-w-md mx-auto w-full space-y-4" method="POST">
                <div className="space-y-1">
                  <label htmlFor="name">Full Name</label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={user.name}
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setUser({ ...user, name: e.target.value })
                    }
                  />
                  {isSubmitted && errors.name && (
                    <p className="text-red-500">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label htmlFor="email">Email Address</label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="john.doe@example.com"
                    value={user.email}
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label htmlFor="password">Password</label>
                  <Input
                    placeholder="**********"
                    type={isVisible ? "text" : "password"}
                    name="password"
                    value={user.password}
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password}</p>
                  )}
                </div>

                <div className="max-w-md w-full space-y-4">
                  <button
                    className="w-full bg-black text-white hover:bg-gray-800 font-bold py-2 px-4 rounded"
                    onClick={onSignup}
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
