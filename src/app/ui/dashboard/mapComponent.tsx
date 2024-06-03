import React, { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { GeoJSONResponse, Feature } from "@/types";
import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import { Tooltip } from "@nextui-org/react";
import L from 'leaflet'
import "leaflet/dist/leaflet.css";
import MarkerModal from "./modal";

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

  const DefaultIcon = L.icon({
    iconUrl: '/images/marker.png' ,
    shadowUrl: '/images/marker-shadow.png',
    iconSize : [28,38],
    iconAnchor: [20,20]
  })

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<Feature >();

  const handleMarkerClick = (feature: Feature) => {
    setSelectedFeature(feature);
    setModalVisible(true);
  };

    L.Marker.prototype.options.icon = DefaultIcon

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
          icon={DefaultIcon}
          eventHandlers={{
            mouseover: (event) => event.target.openPopup() ,
            click: () =>  handleMarkerClick(feature)
          }}
        >
          
          {feature.properties && (
            <Popup>

              <strong>{feature.properties.PARKNAME}</strong>
              <br />
              {feature.properties.ADDRESS}
            </Popup>
          )}
        </Marker>
        ))}

      </MapContainer>

        <MarkerModal visible={modalVisible} onClose={() => setModalVisible(false)} feature={selectedFeature}/>

    </div>
  );
};

export default TennisMap;
