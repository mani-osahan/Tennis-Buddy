"use client";
import { supabase } from "@/app/lib/supabase/client";
import { useEffect, useState } from "react";

export default function VerifyEmail() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const getSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    // console.log(session);
    return session;
  };

  // const refreshSession = async () => {
  //   const {
  //     data: { session },
  //   } = await supabase.auth.refreshSession();
  //   console.log(session);
  //   return session;
  // };

  useEffect(() => {
    getSession();
  }, []);

  const resendEmail = async () => {
    try {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user?.email) {
        setMessage("Email not found");
        return;
      }

      const { error } = await supabase.auth.resend({
        type: "signup",
        email: user.email,
      });

      // console.log(user)

      if (error) throw error;
      setMessage("Verification email sent");

      console.log(error);
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="modal-root"
      className="min-h-screen flex container m-auto px-6 text-gray-500 md:px-12 xl:px-40"
    >
      <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
        <div className="rounded-xl bg-white shadow-xl">
          <div className="p-6 sm:p-16">
            <h1 className="mb-4 text-4xl text-primary font-bold">
              <span className="text-secondary">
                Verify <span className="text-text">Email</span>
              </span>
            </h1>

            <p className="text-tertiary">Thank you for signing up!</p>
            <p>
              <br />
              Please check your email to confirm your verification.This helps us
              ensure the security of your Tennis Buddy account and lets you
              start finding matches right away!
            </p>

            <button
              onClick={resendEmail}
              disabled={loading}
              className="w-auto rounded-md flex m-auto border-2 border-primary text-primary hover:bg-primary hover:text-white hover:transition ease-in-out duration-300 p-2"
            >
              Resend Email
            </button>

            <p className="text-tertiary">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
