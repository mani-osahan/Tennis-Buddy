"use client";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

export default function SideBar(isOpen: any, toggleSidebar: any) {
  const logout = async () => {
    try {
      const router = useRouter();
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white flex flex-col p-4 transition-transform duration-300 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div>
        <h2>Dashboard</h2>
        <div className={`flex flex-col space-y-2`}>
          
          <Button className="mb-2 p-2 bg-white text-black rounded-lg hover:bg-green-400">
            Friends
          </Button>
          <Button className="mb-2 p-2 bg-white text-black rounded-lg hover:bg-green-400">
            Ranked
          </Button>
          <Button className="mb-2 p-2 bg-white text-black rounded-lg hover:bg-green-400">
            Leaderboard
          </Button>
          <Button className="mb-2 p-2 bg-white text-black rounded-lg hover:bg-green-400">
            Friends
          </Button>

          <Button
            onClick={logout}
            className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-red-400 hover:text-black md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <div className="hidden md:block">Sign Out</div>
          </Button>
          </div>
      </div>
    </div>
  );
}
