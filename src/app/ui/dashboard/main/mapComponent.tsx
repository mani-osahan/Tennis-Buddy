"use client";
import React, { useState } from "react";
import { GetStaticProps } from "next";
import { GeoJSONResponse, Feature } from "@/types";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MarkerModal from "../modal/modal";

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    "https://maps.ottawa.ca/arcgis/rest/services/Parks_Inventory/MapServer/21/query?outFields=*&where=1%3D1&f=geojson"
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
  const DefaultIcon = L.icon({
    iconUrl: "/images/marker.png",
    shadowUrl: "/images/marker-shadow.png",
    iconSize: [28, 38],
    iconAnchor: [20, 20],
  });

  const outerBounds = [
    [50, 20],
    [50, 20]
  ]

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  const handleMarkerClick = (feature: Feature) => {
    setSelectedFeature(feature);
    setModalVisible(true);
  };

  L.Marker.prototype.options.icon = DefaultIcon;

  return (
    <div className="w-screen h-screen max-w-screen-2xl max-h-[85vh] size-fit border-8 rounded-lg border-white">
      <MapContainer
        style={{ height: "100%", width: "100%" }}
        center={[45.34472, -75.695]}
        zoom={12}
        minZoom={11}
        bounds={outerBounds}
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
            icon={DefaultIcon}
            eventHandlers={{
              mouseover: (event) => event.target.openPopup(),
              click: () => handleMarkerClick(feature),
            }}
          >
            <Tooltip>
              <strong>
                {feature.properties.PARKNAME ||
                feature.properties.PARKNAME !== null
                  ? feature.properties.PARKNAME
                  : feature.properties.CLUB}
              </strong>
              <br />
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>

      <MarkerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        feature={selectedFeature}
      />
    </div>
  );
};

export default TennisMap;
