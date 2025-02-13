"use client";
import "@/app/ui/globals.css";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Script from "next/script";
import Input from "@/app/ui/signup/input";
import { supabase } from "../../lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      const { data: dataUser, error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: user.password,
      });

      if (error) throw error;

      if (dataUser && dataUser.user.email_confirmed_at) await router.push("/dashboard");
    } catch (e: any) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative py-16 bg-gradient-to-br from-gray-50 to-white">
      <Script src="" />
      <div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
        <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
          <div className="rounded-xl bg-white shadow-xl">
            <div className="p-6 sm:p-16">
              <h1 className="mb-4 text-4xl text-green-500 font-bold">
                <span className="text-black">Login</span>
              </h1>

              <form className="mt-12 grid space-y-4" onSubmit={onLogin}>
                <div className="space-y-2">
                  <Input
                    type="email"
                    name="email"
                    value={user.email}
                    required
                    placeholder="John.Doe@example.com"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Input
                    type="password"
                    name="password"
                    value={user.password}
                    placeholder="**********"
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                </div>

                <div className="max-w-md w-full space-y-4">
                  <button
                    disabled={loading}
                    className="w-full bg-black text-white hover:bg-gray-800 font-bold py-2 px-4 rounded"
                  >
                    {loading ? "Logging in..." : "Login"}
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
