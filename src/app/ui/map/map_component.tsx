import { TileLayer, Popup, Marker } from "react-leaflet"; // Added Marker import
import { useMemo } from "react"
import { MapContainer } from "react-leaflet"
import { Feature } from "@/types";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

interface FeatureModalProps {
  visible: boolean;
  onClose: () => void;
  feature: Feature | null;
}

const DefaultIcon = L.icon({
  iconUrl: "/images/marker.png",
  shadowUrl: "/images/marker-shadow.png",
  iconSize: [28, 38],
  iconAnchor: [20, 20],
});




const MapComponent: React.FC<FeatureModalProps> = ({
  visible,
  onClose,
  feature,
}) => {
  if (!feature) return null;
  console.log(feature);


    return(
        <div className="flex flex-box w-auto h-40">
        <MapContainer
          style={{ height: "100%", width: "100%" }}
          center={[
            feature.geometry.coordinates[1],
            feature.geometry.coordinates[0],
          ]}
          zoom={15}
          zoomControl={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          touchZoom={false}
          boxZoom={false}
          dragging={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker
            position={[
              feature.geometry.coordinates[1],
              feature.geometry.coordinates[0],
            ]}
            icon={DefaultIcon}
          >
            <Popup>
              <strong></strong>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    )
}

export default MapComponent