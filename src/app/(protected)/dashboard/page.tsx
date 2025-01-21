"use client";
import "leaflet/dist/leaflet.css";
import {
  Card,
  CardBody,
} from "@nextui-org/react";
import { useEffect} from "react";

const Page: React.FC = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {

        const res = await fetch("/api/users/dashboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ${token}'
          },
        });

        const data = await res.json();

        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const CardItem = ({ text }: { text: string }) => {
    return (
      <Card>
        <CardBody>
          <h5 className="text-text">{text}</h5>
          <p className="text-subtext">this is placeholder text</p>
        </CardBody>
      </Card>
    );
  };

  return (
    <div>
      <div className="relative h-100 w-100"></div>
      <div className="grid grid-cols-4 gap-4">
        <div className="">{<CardItem text="Matchmaking" />}</div>
        <div className="">{<CardItem text="Notifications or messages" />}</div>
        <div className="">{<CardItem text="Leaderboard" />}</div>
        <div className="">{<CardItem text="Friends Online" />}</div>
        <div className="">{<CardItem text="Wins/Losses" />}</div>
      </div>
    </div>
  );
};

export default Page;
