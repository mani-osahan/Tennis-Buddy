"use client";
import "leaflet/dist/leaflet.css";
import tennisAPI from "@/app/actions/tenniscourt_api";
import Sidebar from "@/app/ui/dashboard/sidenav"
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

export default function Page() {
    return (
      <div>

        <div className="flex h-screen">
          <Sidebar/>
        </div>
<div className="h-screen z-1 flex items-center justify-center 3xl:container bottom-3/4">
         <MapContainer
          style={{ height: "70% ", width: "70%" }}
          center={[45.344720, -75.69500]}
          zoom={12}
          dragging={false}
          zoomControl={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          touchZoom={false}
          boxZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    </div>
    )

  }