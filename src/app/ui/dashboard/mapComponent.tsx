import React, { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { GeoJSONResponse, Feature } from "@/types";
import { CircleMarker } from "react-leaflet";
import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import L from 'leaflet'
import "leaflet/dist/leaflet.css";
import tennisAPI from "@/app/actions/tenniscourt_api";


export const getStaticProps: GetStaticProps = async () => {
    const res = await fetch(
      'https://maps.ottawa.ca/arcgis/rest/services/Parks_Inventory/MapServer/21/query?outFields=*&where=1%3D1&f=geojson'
    );
    const data: GeoJSONResponse = await res.json();
  
    return {
      props: {
        data,
      },
    };
  };
  
interface MapComponentProps {
  data: GeoJSONResponse;
}

const TennisMap: React.FC<MapComponentProps> = ({ data }) => {

  const icon = L.icon({iconUrl: '../src/app/lib/images/marker.png'})

  return (
    <div className="w-screen h-screen">

      <MapContainer
        style={{ height: "100%", width: "100%" }}
        center={[45.34472, -75.695]}
        zoom={12}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {data.features.map((feature: Feature, index: number) => (
          <Marker
          key={index}
          position={[
            feature.geometry.coordinates[1],
            feature.geometry.coordinates[0],
          ]}
          icon={icon}
        >
          {feature.attributes && (
            <Popup>
              <strong>{feature.attributes.NAME}</strong>
              <br />
              {feature.attributes.ADDRESS}
            </Popup>
          )}
        </Marker>
        ))}

      </MapContainer>
    </div>
  );
};

export default TennisMap;
