"use client";
import "leaflet/dist/leaflet.css";
import tennisAPI from "@/app/actions/tenniscourt_api";
import Sidebar from "@/app/ui/dashboard/sidenav";
import DashboardNavbar from "../ui/dashboard/dashboardHeader";
import TennisMap from "../ui/dashboard/mapComponent";
import {  Spinner } from '@nextui-org/react';
import { useEffect, useState } from "react";
import { GeoJSONResponse } from "@/types";


const Page:React.FC = () => {
  const [data, setData] = useState<GeoJSONResponse | null>()

  useEffect(() => {
    const fetchData = async () => {
        const result = await tennisAPI()
      setData(result)
    }

    fetchData()
  }, [])

  return (
    <div className="flex z-0">
      <div className="flex flex-col z-51 ">
        <Sidebar />
      </div>
      {/* <div className="fixed w-full h-24 z-50 bg-white justify-between items-center">
        <DashboardNavbar />
      </div> */}

      <div className="relative w-screen h-screen border-3 rounded border-green-500 z-0">
        {data ? <TennisMap data={data}/> : <Spinner/>}
      </div>
    </div>
  );
}

export default Page