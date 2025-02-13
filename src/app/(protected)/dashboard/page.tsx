"use client";
import "leaflet/dist/leaflet.css";
import { Card, CardBody } from "@nextui-org/react";
import { useSessionContext } from "@/app/contexts/sessionContext";
import PlayerMatchmaking from "@/app/api/dashboard/matchmaking";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase/client";
import { Activity, Calendar, MapPin, Users } from "lucide-react";
import { MapContainer } from "react-leaflet";

interface Proposal {
  id: string;
  requester_id: string;
  receiver_id: string;
  skill_difference: number;
  status: string;
  expires_at: string;
  requester_accepted: boolean;
  receiver_accepted: boolean;
}
interface StatCardProps {
  title: string;
  value?: number | string;
  icon?: React.ReactNode;
}
export default function Dashboard() {
  const { session, userProfile } = useSessionContext();
  const [proposals, setProposals] = useState<Proposal[]>([]);

  useEffect(() => {
    const fetchProposals = async () => {
      const { data } = await supabase
        .from("match_proposals")
        .select("*")
        .or(
          `receiver_id.eq.${session?.user?.id},requester_id.eq.${session?.user?.id}`
        )
        .eq("status", "pending");

      setProposals(data as Proposal[]);
    };
  }, []);

  //TODO replace nextui components with own
  const CardItem = ({ text, subtext }: { text: string; subtext: any }) => {
    return (
      <Card>
        <CardBody>
          <h5 className="text-text text-center">{text}</h5>
          <p className="text-subtext align-center justify-center text-center my-2 font-bold">
            {subtext}
          </p>
        </CardBody>
      </Card>
    );
  };

  const StatCard = ({ title, value, icon }: StatCardProps) => {
    return (
      <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">{title}</p>
            <p className="text-3xl font-bold mt-1">{value}</p>
          </div>
          {icon && <div className="text-primary">{icon}</div>}
        </div>
      </div>
    );
  };

  return (
    <div className="">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <StatCard
            title="UTR Rating"
            value={userProfile?.utr_rating}
            // icon={<Trophy className="w-8 h-8" />}
          />
          <StatCard
            title="Level"
            value={userProfile?.level}
            icon={<Activity className="w-8 h-8" />}
          />
          <StatCard
            title="Wins"
            value={userProfile?.wins}
            // icon={<Trophy className="w-8 h-8" />}
          />
          <StatCard
            title="Losses"
            value={userProfile?.losses}
            icon={<Activity className="w-8 h-8" />}
          />
          <StatCard
            title="Win Streak"
            value={userProfile?.win_streak}
            icon={<Activity className="w-8 h-8" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Nearby Courts</h2>
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div className="h-[300px] rounded-lg overflow-hidden">
              <MapContainer
                center={[45.34472, -75.695]}
                zoom={12}
                className="h-full w-full"
              >
                {/* Map content */}
              </MapContainer>
            </div>
          </div>

          {/* Upcoming Matches */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Upcoming Matches</h2>
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-4">
              {/* Example match */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div>
                    <p className="font-medium">vs. John Doe</p>
                    <p className="text-sm text-gray-600">UTR Rating: 650</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">Today, 3:00 PM</p>
                  <p className="text-sm text-gray-600">Barrhaven Courts</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Recent Activity</h2>
              <Activity className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p>Won match against Sarah Smith</p>
                <p className="text-sm text-gray-600">2 hours ago</p>
              </div>
              {/* Add more activity items */}
            </div>
          </div>

          {/* Friends Online */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Friends Online</h2>
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <p className="font-medium">Mike Johnson</p>
                    <p className="text-sm text-gray-600">Looking for a match</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                  Invite
                </button>
              </div>
              {/* Add more online friends */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
