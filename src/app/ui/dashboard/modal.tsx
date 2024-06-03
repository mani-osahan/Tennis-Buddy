import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Tab,
  Card,
  CardFooter,
  CardBody,
  Tabs,
  useDisclosure,
} from "@nextui-org/react";
import { GetStaticProps } from "next";
import { GeoJSONResponse, Feature } from "@/types";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Tooltip } from "@nextui-org/react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface FeatureModalProps {
  visible: boolean;
  onClose: () => void;
  feature: Feature;
}

const DefaultIcon = L.icon({
  iconUrl: "/images/marker.png",
  shadowUrl: "/images/marker-shadow.png",
  iconSize: [28, 38],
  iconAnchor: [20, 20],
});

const MarkerModal: React.FC<FeatureModalProps> = ({
  visible,
  onClose,
  feature,
}) => {
  if (!feature) return null;
  console.log(feature);

  return (
    <>
      <Modal isOpen={visible} onOpenChange={onClose} size="xl">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h1>{feature.properties.PARKNAME}</h1>
          </ModalHeader>
          <ModalBody className="flex flex-col gap-1">
            {feature.properties.ADDRESS}
          </ModalBody>
          <ModalBody>
            <div className="flex w-full flex-col">
              <Tabs aria-label="Options">
                <Tab key="overview" title="Overview">
                  <Card>
                    <CardBody>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco l
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="Description" title="Description">
                  <Card>
                    <CardBody>
                      <div className="flex flex-box w-auto h-40">
                      <MapContainer
                        style={{ height: "100%", width: "100%" }}
                        center={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]}
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
                          {feature.properties && (
                            <Popup>
                              <strong>{feature.properties.PARKNAME}</strong>
                              <br />
                              {feature.properties.ADDRESS}
                            </Popup>
                          )}
                        </Marker>
                      </MapContainer>
                      </div>
                    </CardBody>
                  </Card>
                </Tab>
              </Tabs>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button color="primary" onPress={onClose}>
              Action
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MarkerModal;
