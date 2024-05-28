"use client";
import "leaflet/dist/leaflet.css";
import tennisAPI from "@/app/actions/tenniscourt_api";
import Sidebar from "@/app/ui/dashboard/sidenav";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

export default function Page() {
  return (
    <div className="absolute">
      <Sidebar />
      <div className="abolsute h-28 border-3 rounded border-green-500">
        <MapContainer
          style={{ height: "100%", width: "100%" }}
          center={[45.34472, -75.695]}
          zoom={12}
          dragging={false}
          zoomControl={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          touchZoom={false}
          boxZoom={false}
          className="relative"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    </div>
  );
}
