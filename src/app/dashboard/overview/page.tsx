"use client";
import "leaflet/dist/leaflet.css";
import tennisAPI from "@/app/actions/tenniscourt_api";
import Sidebar from "@/app/ui/dashboard/sidebar/sidenav";
import DashboardNavbar from "../../ui/dashboard/dashboardHeader";
import TennisMap from "../../ui/dashboard/main/mapComponent";
import { Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { GeoJSONResponse } from "@/types";
import { NavbarWrapper } from "../../ui/dashboard/navbar/navbar";
import Menu from "@/app/ui/dashboard/menu/menu";

const Page: React.FC = () => {
  return (
      <div>
        <TennisComponent/>
      </div>
  );
};

export const TennisComponent = () => {
  const [data, setData] = useState<GeoJSONResponse | null>();
  useEffect(() => {
    const fetchData = async () => {
      const result = await tennisAPI();
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <div>{data ? <TennisMap data={data} /> : <Spinner color="success" />}</div>
  );
};


export default Page;
