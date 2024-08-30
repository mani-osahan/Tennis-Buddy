"use client";
import "leaflet/dist/leaflet.css";
import Sidebar from "@/app/ui/dashboard/sidebar/sidenav";
import { NavbarWrapper } from "../ui/dashboard/navbar/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
    <Sidebar className="h-full" />
    <div className="flex flex-col flex-1">
      <NavbarWrapper
        className="w-full bg-emerald-700 opacity-100"
        handleOpen={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <div className="flex lg:px-6">
          <div className="flex flex-1 justify-center gap-4 xl:gap-6 px-4 lg:px-0 flex-wrap xl:flex-nowrap sm:pt-10 mx-auto w-full z-0">
            <div className="static z-10">

              {children}

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
