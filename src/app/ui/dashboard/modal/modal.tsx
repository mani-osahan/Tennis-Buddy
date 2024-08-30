import React, { useState } from "react";
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
  Select,
  SelectItem,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Tag, TagLabel, TagCloseButton, Box } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { Feature } from "@/types";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { utrOptions } from "./utrRating";


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

const MarkerModal: React.FC<FeatureModalProps> = ({
  visible,
  onClose,
  feature,
}) => {
  if (!feature) return null;
  console.log(feature);


  return (
    <ChakraProvider>
      <Modal
        isOpen={visible}
        onOpenChange={onClose}
        size="4xl"
        scrollBehavior="outside"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h1>
              {feature.properties.PARKNAME ||
              feature.properties.PARKNAME !== null
                ? feature.properties.PARKNAME
                : feature.properties.CLUB}
            </h1>
          </ModalHeader>
          <ModalBody className="flex flex-col gap-1">
            {feature.properties.ADDRESS}
          </ModalBody>
          <ModalBody>
            <div className="flex w-full flex-col">
              <Tabs aria-label="Options" color="success">
                <Tab key="play" title="Play">
                  <Card>
                    <CardBody>
                      <div className="flex flex-col gap-4">
                        <div>
                          <strong>Matchmaking</strong>
                        </div>
                        <Select
                          items={utrOptions}
                          label="Select UTR Rating"
                          placeholder="UTR Rating"
                        >
                          {(utrOptions) => (
                            <SelectItem key={utrOptions.value}>
                              {utrOptions.value}
                            </SelectItem>
                          )}
                        </Select>

                        <div className="grid grid-col-5">
                          <strong className="mb-2 col-span-4">
                            Availability:{" "}
                          </strong>
                          <div className="border-2">
                            {/* <Table
                              aria-label="Days"
                              radius="sm"
                              isHeaderSticky
                              classNames={{
                                base: "max-h-[520px] ",
                                table: "min-h-[400px]",
                              }}
                              selectionBehavior="replace"
                              selectionMode="single"
                            >
                              <Header>
                                <HeaderRow>

                                {days.map((day) => (
                                  <HeaderCell>{day}</HeaderCell>
                                ))}
                                </HeaderRow>
                              </Header>
                              <Body>
                                {hours.map((time) => (
                                  <Row key={time} item={{id: time, value: time}}>
                                    <Cell>{time}</Cell>
                                  </Row>
                                ))}
                              </Body>
                            </Table> */}
                          </div>
                          {/* {days.map((day, index) => (
                            <div key={day} >
                     
                              <Tag
                                size="lg"
                                borderRadius="full"
                                variant={selectDay.includes(day) ? "solid" : "outline"}
                                colorScheme="green"
                                onClick={() => handleTagClick(day)}
                                style={{ cursor: 'pointer' }}
                              >
                                <TagLabel>{day}</TagLabel>
                                {selectDay.includes(day) ? <TagCloseButton/> : <></>}
                              </Tag>
                            </div>
                          ))} */}
                        </div>
                        <div className="mb-4"></div>
                        <div className="flex w-full gap-2">
                          <Button
                            color="secondary"
                            onPress={onClose}
                            className="w-1/3"
                            variant="ghost"
                            size="lg"
                          >
                            Invite Friends
                          </Button>
                          <Button
                            color="success"
                            onPress={onClose}
                            className="w-2/3"
                            size="lg"
                          >
                            Find Players
                          </Button>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="tournaments" title="Tournaments">
                  <Card>
                    <CardBody>
                          <Tabs aria-label="Options" color="primary" variant="underlined">
                            <Tab key="active_tournaments" title="Active Tournaments">
                                <Table>
                                  <TableHeader>
                                    <TableColumn>Test</TableColumn>
                                  </TableHeader>
                                  <TableBody>
                                    <TableRow key='1'>
                                      <TableCell>Test1</TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                            </Tab>
                            <Tab key="upcoming_tournaments" title="Upcoming Tournaments">

                            </Tab>
                          </Tabs>

                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="leaderboard" title="Leaderboard">
                  <Card>
                    <CardBody>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco l
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="details" title="Details">
                  <Card>
                    <CardBody className="flex flex-box w-auto h-auto">
                      <div className="grid grid-cols-2 gap-6 p-4 ">
                        <div>
                          <strong>ClubHouse:</strong>{" "}
                          {feature.properties.CLUBHOUSE}
                        </div>
                        <div>
                          <strong>Court Type: </strong>
                          {feature.properties.COURT_TYPE}
                        </div>
                        <div>
                          <strong># of Courts:</strong>{" "}
                          {feature.properties.NO_COURTS}
                        </div>
                        <div>
                          <strong>Practice Court: </strong>
                          {feature.properties.PRACTICE_COURT}
                        </div>
                        <div>
                          <strong>Backwall:</strong>{" "}
                          {feature.properties.BACKWALL}
                        </div>
                        <div>
                          <strong>Surface Type:</strong>{" "}
                          {feature.properties.SURFACE_COLOUR}
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                  <br />
                  <Card>
                    <CardBody>
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
                    </CardBody>
                  </Card>
                </Tab>
              </Tabs>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default MarkerModal;
