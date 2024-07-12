"use client";
import "leaflet/dist/leaflet.css";
import tennisAPI from "@/app/actions/tenniscourt_api";
import Sidebar from "@/app/ui/dashboard/sidebar/sidenav";
import DashboardNavbar from "../ui/dashboard/dashboardHeader";
import TennisMap from "../ui/dashboard/mapComponent";
import { Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { GeoJSONResponse } from "@/types";
import { NavbarWrapper } from "../ui/dashboard/navbar/navbar";
import Menu from "@/app/ui/dashboard/menu/menu";

const Page: React.FC = () => {
  const [data, setData] = useState<GeoJSONResponse | null>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await tennisAPI();
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar className="h-full" />
      <div className="flex flex-col flex-1">
        <NavbarWrapper className="w-full bg-emerald-700 opacity-100"/>
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <div className="flex lg:px-6">
            <div className="flex flex-1 justify-center gap-4 xl:gap-6 px-4 lg:px-0 flex-wrap xl:flex-nowrap sm:pt-10 mx-auto w-full z-0">
              <div className="static z-10">
                {data ? <TennisMap data={data} /> : <Spinner />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
