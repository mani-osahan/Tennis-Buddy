"use client";
import Header from "./ui/main/header";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import Pricing from "./ui/main/pricingcard";

export default function Home() {
  return (
    <main >
      <Header />
      <div className="flex fit-items-center justify-center m-28 p-4 ">
        <div className="flex flex-box text-black text-center mt-46 m-1">
          <h1 className="text-9xl font-bold  md:text-5xl lg:text-6xl">
            <span className="text-green-500">Gamify</span> your Tennis
            Experience
            <br />
            to the<span className="text-green-500"> Next Level</span>
          </h1>
        </div>
      </div>


<div className="">

    <div className="p-2">

      <div className="flex flex-box h-[34rem] border-3 rounded border-green-500">

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

        </div>

      <div className="flex bg-green-500 text-black h-96">

      <div className="flex flex-col items-left justify-center m-14 ">
        <div className="relative text-left mt-46 m-1 z-0">
          <h1 className="text-4xl font-bold md:text-4xl lg:text-5xl ">
          <span className="text-white">Tennis Buddy </span> is designed to
            <br />
            gamify your next <span className="text-white">experience </span>
          </h1>
        </div>
        <a
          className="plausible-event-name=Signup-CTA-clicked text-white p-2 font-semibold z-index-0 text-xl lg:text-4xl inline-block tracking-tight hover:underline"
          href="/signup"
        >
          Try it for free →
        </a>
      </div>
      </div>
      <div className="flex text-black h-4/5 p-8 justify-center space-x-14 m-16">
          <Pricing pricingName="Free Tier"/> 
          <Pricing pricingName="Premium User"/> 
          <Pricing pricingName="Club Membership"/> 
      </div>
    </main>
  );
}
