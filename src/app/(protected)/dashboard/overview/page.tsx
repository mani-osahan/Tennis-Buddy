"use client";
import "leaflet/dist/leaflet.css";
import tennisAPI from "@/app/actions/tenniscourt_api";
// import TennisMap from "../../ui/dashboard/main/mapComponent";
import { Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { GeoJSONResponse } from "@/types";

const Page: React.FC = () => {
  return (
      <div>
      </div>
  );
};

// export const TennisComponent = () => {
//   const [data, setData] = useState<GeoJSONResponse | null>();
//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await tennisAPI();
//       setData(result);
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>{data ? <TennisMap data={data} /> : <Spinner color="success" />}</div>
//   );
// };


export default Page;
